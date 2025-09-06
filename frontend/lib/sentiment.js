// Simple sentiment analysis for MindEase
// This is a basic implementation - in production, you'd use Hugging Face Transformers

export const analyzeSentiment = (text) => {
  const lowerText = text.toLowerCase();
  
  // Stress/Anxiety indicators
  const stressWords = [
    'stressed', 'anxious', 'worried', 'overwhelmed', 'panic', 'nervous',
    'tired', 'exhausted', 'burnout', 'pressure', 'deadline', 'exam',
    'test', 'interview', 'presentation', 'scared', 'fear', 'afraid'
  ];
  
  // Positive indicators
  const positiveWords = [
    'happy', 'good', 'great', 'amazing', 'wonderful', 'excited',
    'confident', 'proud', 'accomplished', 'grateful', 'blessed',
    'motivated', 'energized', 'optimistic', 'hopeful', 'peaceful'
  ];
  
  // Sadness indicators
  const sadWords = [
    'sad', 'depressed', 'down', 'lonely', 'empty', 'hopeless',
    'worthless', 'useless', 'failure', 'disappointed', 'hurt',
    'broken', 'lost', 'confused', 'stuck', 'trapped'
  ];
  
  // Anger indicators
  const angerWords = [
    'angry', 'mad', 'furious', 'irritated', 'annoyed', 'frustrated',
    'rage', 'hate', 'disgusted', 'bitter', 'resentful'
  ];
  
  // Crisis indicators
  const crisisWords = [
    'suicide', 'kill myself', 'end it all', 'not worth living',
    'better off dead', 'want to die', 'hurt myself', 'self harm'
  ];
  
  let stressScore = 0;
  let positiveScore = 0;
  let sadScore = 0;
  let angerScore = 0;
  let crisisScore = 0;
  
  // Count word occurrences
  stressWords.forEach(word => {
    if (lowerText.includes(word)) stressScore++;
  });
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveScore++;
  });
  
  sadWords.forEach(word => {
    if (lowerText.includes(word)) sadScore++;
  });
  
  angerWords.forEach(word => {
    if (lowerText.includes(word)) angerScore++;
  });
  
  crisisWords.forEach(word => {
    if (lowerText.includes(word)) crisisScore++;
  });
  
  // Determine primary emotion
  const scores = {
    stress: stressScore,
    positive: positiveScore,
    sad: sadScore,
    anger: angerScore,
    crisis: crisisScore
  };
  
  const maxScore = Math.max(...Object.values(scores));
  const primaryEmotion = Object.keys(scores).find(key => scores[key] === maxScore);
  
  // Crisis detection takes priority
  if (crisisScore > 0) {
    return {
      emotion: 'crisis',
      confidence: Math.min(crisisScore * 0.3, 1),
      suggestedActivity: 'crisis_support',
      responseStyle: 'crisis'
    };
  }
  
  // Determine response style and suggested activity
  let responseStyle = 'neutral';
  let suggestedActivity = null;
  
  switch (primaryEmotion) {
    case 'stress':
      responseStyle = 'empathetic';
      suggestedActivity = stressScore > 2 ? 'breathing' : 'sound_therapy';
      break;
    case 'sad':
      responseStyle = 'supportive';
      suggestedActivity = 'journaling';
      break;
    case 'anger':
      responseStyle = 'calming';
      suggestedActivity = 'breathing';
      break;
    case 'positive':
      responseStyle = 'celebratory';
      suggestedActivity = 'journaling';
      break;
    default:
      responseStyle = 'neutral';
      suggestedActivity = 'chat';
  }
  
  return {
    emotion: primaryEmotion,
    confidence: Math.min(maxScore * 0.2, 1),
    suggestedActivity,
    responseStyle
  };
};

export const getResponseStyle = (sentiment) => {
  const styles = {
    empathetic: {
      tone: 'warm and understanding',
      approach: 'acknowledge feelings and offer gentle support',
      emoji: '🤗'
    },
    supportive: {
      tone: 'encouraging and caring',
      approach: 'validate emotions and suggest positive actions',
      emoji: '💙'
    },
    calming: {
      tone: 'peaceful and grounding',
      approach: 'help regulate emotions with breathing and mindfulness',
      emoji: '🧘'
    },
    celebratory: {
      tone: 'enthusiastic and joyful',
      approach: 'amplify positive feelings and encourage reflection',
      emoji: '🎉'
    },
    crisis: {
      tone: 'urgent and caring',
      approach: 'immediate support and professional help',
      emoji: '🚨'
    },
    neutral: {
      tone: 'friendly and curious',
      approach: 'ask questions and explore feelings',
      emoji: '💭'
    }
  };
  
  return styles[sentiment.responseStyle] || styles.neutral;
};
