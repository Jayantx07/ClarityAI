const SELF_HARM_KEYWORDS = [
  // Minimal keyword list; replace with robust NLP in production
  'suicide', 'kill myself', 'self harm', 'end my life', 'harm myself'
];

export default function crisisMiddleware(req, res, next) {
  try {
    const text = JSON.stringify(req.body || {}).toLowerCase();
    const flagged = SELF_HARM_KEYWORDS.some(k => text.includes(k));
    if (flagged) {
      // Fail-safe: respond with helpline info; frontend should also have a banner
      return res.status(307).json({
        crisis: true,
        message: 'It looks like you may need urgent help. You are not alone.',
        helplines: [
          { name: 'AASRA', phone: '+91-9820466726', url: 'https://aasra.info' },
          { name: 'Vandrevala Foundation', phone: '+91-9999666555', url: 'https://www.vandrevalafoundation.com/' }
        ]
      });
    }
  } catch (_) {
    // Always continue; never block legitimate traffic due to middleware errors
  }
  next();
}




