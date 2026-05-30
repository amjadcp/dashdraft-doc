/**
 * Centralized Google Analytics 4 Helper Module for DashDraft
 * Handles dynamic script initialization, type-safe event tracking, and SPA route monitoring.
 */

// Define standard types for our analytics events to make future expansion easy and type-safe.
export type AnalyticsEvent =
  | {
      name: "page_view";
      params: {
        page_path: string;
        page_title?: string;
        page_location?: string;
      };
    }
  | {
      name: "install_button_click";
      params: {
        platform: "macos" | "linux" | "windows" | "unknown";
        location: string; // e.g. "hero", "cta", "install-section", "install-guide"
        action_type: "click" | "copy";
      };
    }
  | {
      name: "docs_opened";
      params: {
        doc_title: string;
        doc_path: string;
      };
    }
  | {
      name: "github_opened";
      params?: Record<string, never>;
    };

// Declare global window properties for TypeScript compilation safety
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Dynamically injects Google Analytics 4 tag script and initializes dataLayer.
 * Reads the Measurement ID from Vite environment variables (VITE_GA_MEASUREMENT_ID).
 */
export function initGA(): void {
  if (typeof window === "undefined") return;

  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) {
    console.warn("Analytics: VITE_GA_MEASUREMENT_ID environment variable is missing.");
    return;
  }

  // Prevent duplicate script injection
  if (document.getElementById("ga-script-loader")) return;

  try {
    // 1. Set up gtag function and dataLayer array
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments);
    };

    window.gtag("js", new Date());

    // Enable page view tracking automatically or handle it manually in SPA router transitions.
    // For single page apps, we want to handle page views manually to get accurate metrics.
    window.gtag("config", measurementId, {
      send_page_view: false, // Turned off to prevent double views (initial page load vs router change)
    });

    // 2. Inject official script tag asynchronously
    const script = document.createElement("script");
    script.id = "ga-script-loader";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;

    document.head.appendChild(script);
  } catch (error) {
    console.error("Analytics: Failed to initialize GA4 script", error);
  }
}

/**
 * Base tracking function. Safe to call anywhere.
 * Gracefully ignores tracking in SSR or if script failed to load.
 */
export function trackEvent(
  name: AnalyticsEvent["name"],
  params?: Record<string, any>
): void {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  try {
    window.gtag("event", name, params);
  } catch (error) {
    console.error(`Analytics: Error tracking event "${name}"`, error);
  }
}

/**
 * Tracks SPA page navigation view.
 * @param path The current path (e.g. /docs/installation)
 * @param title Optional title of the page
 */
export function trackPageView(path: string, title?: string): void {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("config", measurementId, {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  } catch (error) {
    console.error("Analytics: Error tracking page view", error);
  }
}

/**
 * Helper to track installation clicks or copying install commands.
 */
export function trackInstallButtonClick(
  platform: "macos" | "linux" | "windows" | "unknown",
  location: string,
  actionType: "click" | "copy" = "click"
): void {
  trackEvent("install_button_click", {
    platform,
    location,
    action_type: actionType,
  });
}

/**
 * Helper to track when documentation pages are opened.
 */
export function trackDocsOpened(docTitle: string, docPath: string): void {
  trackEvent("docs_opened", {
    doc_title: docTitle,
    doc_path: docPath,
  });
}

/**
 * Helper to track GitHub repository opens.
 */
export function trackGithubOpened(): void {
  trackEvent("github_opened");
}
