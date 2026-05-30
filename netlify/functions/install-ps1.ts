import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { Context } from "@netlify/functions";

/**
 * Creates a secure, anonymous client ID by hashing the IP and User-Agent.
 * Resolves privacy concerns (no PII shared) while keeping client sessions stable in GA4.
 */
function getClientId(headers: Headers): string {
  const ip = headers.get("x-nf-client-connection-ip") || headers.get("client-ip") || "";
  const ua = headers.get("user-agent") || "";
  
  if (!ip && !ua) {
    return crypto.randomUUID();
  }
  
  return crypto.createHash("sha256").update(`${ip}-${ua}`).digest("hex");
}

/**
 * Dispatches an event to the GA4 Measurement Protocol.
 * Employs a quick timeout to ensure it never blocks script delivery if GA4 is slow.
 */
async function trackDownload(
  eventName: string,
  platform: string,
  request: Request
): Promise<void> {
  const measurementId = process.env.GA_MEASUREMENT_ID;
  const apiSecret = process.env.GA_API_SECRET;

  if (!measurementId || !apiSecret) {
    console.warn("Analytics: Missing GA_MEASUREMENT_ID or GA_API_SECRET in Netlify variables.");
    return;
  }

  const clientId = getClientId(request.headers);
  const country = request.headers.get("x-nf-country") || "";
  const region = request.headers.get("x-nf-region") || "";
  const city = request.headers.get("x-nf-city") || "";

  const payload = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params: {
          country,
          region,
          city,
          platform,
        },
      },
    ],
  };

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s strict timeout

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error(`Analytics: Measurement Protocol returned HTTP status ${res.status}`);
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.warn("Analytics: Tracking request timed out (non-blocking).");
    } else {
      console.error("Analytics: Tracking request failed:", error);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Netlify Function handler (API v2) for Serving and Tracking install.ps1
 */
export default async (request: Request, context: Context) => {
  let scriptContent = "";
  
  try {
    // Resolve absolute path to the bundled PowerShell script
    const filePath = path.join(process.cwd(), "scripts", "install.ps1");
    scriptContent = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error("Failed to read scripts/install.ps1:", err);
    return new Response("Error: Installer script not found.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Dispatch GA4 Measurement Protocol event
  const trackingPromise = trackDownload("install_ps1_download", "windows", request);
  
  if (typeof context.waitUntil === "function") {
    // Keep serverless runtime alive for background promise without blocking HTTP response
    context.waitUntil(trackingPromise);
  } else {
    // Local dev server fallback (wait for tracking to avoid socket hang)
    await trackingPromise;
  }

  // Return the installer PowerShell script content immediately
  return new Response(scriptContent, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
};
