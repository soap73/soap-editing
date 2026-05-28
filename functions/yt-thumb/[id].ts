const SIZES = ['hqdefault', 'mqdefault', 'sddefault', 'maxresdefault'] as const;

export async function onRequest({ params, request }: { params: { id: string }; request: Request }) {
  const { id } = params;
  const url = new URL(request.url);
  const size = SIZES.includes(url.searchParams.get('size') as any) ? url.searchParams.get('size')! : 'hqdefault';

  const imageUrl = `https://img.youtube.com/vi/${id}/${size}.jpg`;

  const response = await fetch(imageUrl);

  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('CDN-Cache-Control', 'public, max-age=31536000, immutable');
  headers.delete('set-cookie');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
