import { Hono } from 'hono';

const app = new Hono();

app.get('/oauth/callback', async (c) => {
  const code = c.req.query('code');
  if (!code) {
    return c.text('No authorization code provided', 400);
  }

  const clientId = c.env?.OAUTH_CLIENT_ID || '';
  const clientSecret = c.env?.OAUTH_CLIENT_SECRET || '';

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await response.json() as { access_token?: string; error?: string };

  if (data.error) {
    return c.text(`OAuth error: ${data.error}`, 400);
  }

  if (!data.access_token) {
    return c.text('No access token received', 400);
  }

  const redirectUrl = c.env?.REDIRECT_URL || '/admin/';
  const script = `
    <script>
      window.opener.postMessage(
        ${JSON.stringify({ token: data.access_token, provider: 'github' })},
        "${c.env?.ORIGIN || '*'}"
      );
      window.close();
    </script>
  `;

  return c.html(script);
});

export default app;
