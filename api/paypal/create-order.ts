import type { VercelRequest, VercelResponse } from '@vercel/node';

async function getPayPalAccessToken(clientId: string, clientSecret: string, isLive: boolean) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const baseUrl = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

  const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to get PayPal access token: ${errorText}`);
  }

  const data = await res.json();
  return { token: data.access_token, baseUrl };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = process.env.PAYPAL_MODE || 'sandbox';
  const isLive = mode === 'live';

  const isConfigured = Boolean(clientId && clientSecret && clientId !== 'MY_PAYPAL_CLIENT_ID');

  // If real credentials are missing, return a clean Demo/Test Order
  if (!isConfigured) {
    const demoOrderId = `DEMO-ORDER-${Date.now()}`;
    return res.status(200).json({
      id: demoOrderId,
      status: 'CREATED',
      mode: 'demo',
      amount: '50.00',
      currency: 'USD',
      message: 'Demo mode active. No real PayPal API credentials configured.',
    });
  }

  try {
    const { token, baseUrl } = await getPayPalAccessToken(clientId!, clientSecret!, isLive);

    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '50.00',
            },
            description: 'Enterprise ATS Resume Evaluation - Recruitz Solution',
          },
        ],
      }),
    });

    if (!orderRes.ok) {
      const errText = await orderRes.text();
      return res.status(500).json({ error: 'Failed to create PayPal order', details: errText });
    }

    const orderData = await orderRes.json();
    return res.status(200).json({
      id: orderData.id,
      status: orderData.status,
      mode: isLive ? 'live' : 'sandbox',
      amount: '50.00',
      currency: 'USD',
    });
  } catch (err: any) {
    console.error('PayPal Order Creation Error:', err);
    return res.status(500).json({ error: 'PayPal service error', details: err.message });
  }
}
