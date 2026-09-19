import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = process.env.PAYPAL_MODE || 'sandbox';

  const isConfigured = Boolean(clientId && clientSecret && clientId !== 'MY_PAYPAL_CLIENT_ID');

  return res.status(200).json({
    isConfigured,
    paypalClientId: isConfigured ? clientId : null,
    mode: isConfigured ? mode : 'demo',
  });
}
