import https from 'https';

const url = 'https://forms.gle/FLUgSpqn2pLEE2TQ9';

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  if (res.headers.location) {
    console.log('Redirect Location:', res.headers.location);
  }
}).on('error', (err) => {
  console.error('Error:', err.message);
});
