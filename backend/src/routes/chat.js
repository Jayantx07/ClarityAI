import { Router } from 'express';

const router = Router();

// Empathetic responses based on mood and content
function generateEmpatheticResponse(userInput) {
  const input = userInput.toLowerCase();
  
  // Sad/Low mood detection
  if (input.includes('😞') || input.includes('😢') || input.includes('😔') || 
      input.includes('sad') || input.includes('tough') || input.includes('difficult') ||
      input.includes('mushkil') || input.includes('problem') || input.includes('upset')) {
    
    const activities = [
      "2 minute deep breathing - slowly inhale for 4 counts, hold for 4, exhale for 6",
      "positive affirmation - 'I am strong and capable, bad times don't last forever'",
      "recall one good thing that happened today, no matter how small"
    ];
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    return {
      reply: `I'm really sorry you're feeling down. It's okay, bad din sabke hote hain. Tum strong ho aur kal better hoga. Kya tum ${randomActivity} try karna chahoge?`,
      mood: 'low',
      suggestedActivity: randomActivity
    };
  }
  
  // Happy/Positive mood detection
  if (input.includes('😊') || input.includes('😄') || input.includes('😃') || 
      input.includes('happy') || input.includes('good') || input.includes('great') ||
      input.includes('relaxed') || input.includes('peaceful') || input.includes('accha')) {
    
    return {
      reply: `That's awesome! I'm glad you're feeling positive. Keep this energy going, maybe note down one chhoti si cheez jo aaj tumhe happy banayi. You're doing great! 🌟`,
      mood: 'positive',
      suggestedActivity: 'gratitude journaling'
    };
  }
  
  // Neutral mood detection
  if (input.includes('😐') || input.includes('😑') || input.includes('normal') || 
      input.includes('okay') || input.includes('fine') || input.includes('theek')) {
    
    return {
      reply: `Sometimes normal is good too 🙂. Balance bhi zaroori hai. Tum ek chhota sa gratitude thought likh sakte ho — ek chhoti si cheez jiske liye tum thankful ho.`,
      mood: 'neutral',
      suggestedActivity: 'gratitude reflection'
    };
  }
  
  // Default empathetic response
  return {
    reply: `I hear you and I'm here to listen. Thank you for sharing that with me. Kya tum apne feelings ke baare mein aur detail mein bata sakte ho? I want to understand better how I can support you.`,
    mood: 'unknown',
    suggestedActivity: 'open conversation'
  };
}

router.post('/', async (req, res) => {
  const { messages } = req.body || {};
  
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ 
        error: 'Messages array is required',
        reply: "Hi! I'm ClarityAI, your friendly companion. How are you feeling today? 😊"
      });
    }
    
    const lastMessage = messages[messages.length - 1];
    const userInput = lastMessage.content || '';
    
    // TODO: Integrate Gemini API or Hugging Face with LangChain here for more sophisticated responses
    // - Requires GEMINI_API_KEY or HUGGINGFACE_API_KEY
    // - Consider safety prompts and system personas (CBT-inspired, empathetic)
    // - For now, using rule-based empathetic responses
    
    const response = generateEmpatheticResponse(userInput);
    
    // Award gamification points for chat engagement
    try {
      const gamificationRes = await fetch(`${process.env.API_BASE_URL || 'http://localhost:8080'}/api/gamification/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: 'anon', 
          activity: 'chat_engagement', 
          points: 10 
        })
      });
      
      if (gamificationRes.ok) {
        const gamificationData = await gamificationRes.json();
        console.log(`Awarded ${gamificationData.stats.points} points for chat engagement`);
      }
    } catch (error) {
      console.error('Failed to award gamification points:', error);
    }
    
    return res.json({
      reply: response.reply,
      mood: response.mood,
      suggestedActivity: response.suggestedActivity,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ 
      error: 'Something went wrong',
      reply: "I'm having trouble right now, but I'm still here for you. Can you try again in a moment?"
    });
  }
});

export default router;



