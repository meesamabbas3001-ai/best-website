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

  const { orderId } = req.body || {};

  if (!orderId) {
    return res.status(400).json({ error: 'Missing orderId parameter' });
  }

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = process.env.PAYPAL_MODE || 'sandbox';
  const isLive = mode === 'live';

  const isConfigured = Boolean(clientId && clientSecret && clientId !== 'MY_PAYPAL_CLIENT_ID');

  // Handle Demo Mode Capture
  if (!isConfigured || String(orderId).startsWith('DEMO-ORDER-')) {
    const demoCaptureId = `DEMO-CAPTURE-${Date.now()}`;
    return res.status(200).json({
      success: true,
      orderId,
      captureId: demoCaptureId,
      status: 'COMPLETED',
      mode: 'demo',
      isDemo: true,
      amountPaid: '$50.00 USD (Demo Mode)',
      message: 'Test payment captured successfully in Demo Mode.',
    });
  }

  try {
    const { token, baseUrl } = await getPayPalAccessToken(clientId!, clientSecret!, isLive);

    const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!captureRes.ok) {
      const errText = await captureRes.text();
      return res.status(400).json({ error: 'Failed to capture PayPal payment', details: errText });
    }

    const captureData = await captureRes.json();

    if (captureData.status === 'COMPLETED') {
      const captureId = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id || captureData.id;
      return res.status(200).json({
        success: true,
        orderId,
        captureId,
        status: 'COMPLETED',
        mode: isLive ? 'live' : 'sandbox',
        isDemo: false,
        amountPaid: '$50.00 USD',
      });
    } else {
      return res.status(400).json({
        success: false,
        orderId,
        status: captureData.status,
        error: 'PayPal payment was not completed.',
      });
    }
  } catch (err: any) {
    console.error('PayPal Order Capture Error:', err);
    return res.status(500).json({ error: 'PayPal server capture error', details: err.message });
  }
}
