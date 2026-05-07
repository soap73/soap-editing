import { Hono } from 'hono';

const app = new Hono();

// Step 1: CMS opens popup here → handshake, then redirect to GitHub
app.get('/oauth/callback', (c) => {
  const clientId = c.env?.OAUTH_CLIENT_ID || '';
  const baseUrl = new URL(c.req.url).origin;
  const redirectUri = `${baseUrl}/callback`;
  const scope = c.req.query('scope') || 'repo,user';

  const githubUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&scope=${scope}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body>
<script>
  (function() {
    // Step 1: Tell the CMS we're authorizing
    window.opener.postMessage('authorizing:github', '*');

    // Step 2: Wait for CMS to confirm, then redirect to GitHub
    window.addEventListener('message', function handler(e) {
      if (e.data === 'authorizing:github') {
        window.removeEventListener('message', handler);
        window.location.href = ${JSON.stringify(githubUrl)};
      }
    });
  })();
</script>
</body>
</html>`;

  return c.html(html);
});

// Step 3: GitHub redirects here → exchange code for token
app.get('/callback', async (c) => {
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

  const payload = JSON.stringify({ token: data.access_token, provider: 'github' });
  const message = `authorization:github:success:${payload}`;
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body>
<script>
  (function() {
    window.opener.postMessage(${JSON.stringify(message)}, '*');
    setTimeout(function() { window.close(); }, 500);
  })();
</script>
</body>
</html>`;

  return c.html(html);
});

export default app;
