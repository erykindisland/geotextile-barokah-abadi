// src/_worker.ts
export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Serve static assets via Cloudflare KV binding (ASSETS)
    const response = await env.ASSETS.fetch(request);
    const pathname = new URL(request.url).pathname;
    // Apply long‑term caching for static assets (images, CSS, JS, SVG)
    if (/\.(png|webp|js|css|svg)$/.test(pathname)) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
      return new Response(response.body, { ...response, headers: newHeaders });
    }
    return response;
  },
};
