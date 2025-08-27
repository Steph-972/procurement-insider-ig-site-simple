export default async function handler(req, res){
  if(req.method !== "POST") return res.status(405).send('Method Not Allowed');
  try{
    const { email, listId, source = 'Instagram' } = req.body || {};
    if(!email || !listId) return res.status(400).send('Missing email or listId');
    const r = await fetch('https://api.brevo.com/v3/contacts',{
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'api-key': process.env.BREVO_API_KEY },
      body: JSON.stringify({ email, listIds:[Number(listId)], updateEnabled:true })
    });
    const data = await r.json();
    if(!r.ok) return res.status(r.status).send(data.message || 'Brevo error');
    // (optionnel) log consentement en console
    console.log('[CONSENT]', { email, listId:Number(listId), source, ts:new Date().toISOString() });
    return res.status(200).json({ ok:true });
  }catch(err){ return res.status(500).send('Server error'); }
}
