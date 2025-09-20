import * as admin from "firebase-admin";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { onCall, HttpsError } from "firebase-functions/v2/https";

admin.initializeApp();
const db = admin.firestore();

// --- Helper function ---
function analyzeSentiment(text: string): "positive" | "negative" | "neutral" {
  const negativeWords = ["stress", "anxiety", "worried", "sad", "depressed", "angry"];
  const positiveWords = ["happy", "joy", "peaceful", "calm", "excited", "grateful"];

  const lowerText = text.toLowerCase();

  if (negativeWords.some((word) => lowerText.includes(word))) {
    return "negative";
  }
  if (positiveWords.some((word) => lowerText.includes(word))) {
    return "positive";
  }
  return "neutral";
}

// --- Firestore Trigger (v2) ---
export const onMessageCreate = onDocumentCreated("messages/{messageId}", async (event) => {
  const snap = event.data;
  if (!snap) return;

  const message = snap.data() as { text: string; role: string };

  if (!message || message.role !== "user") {
    return;
  }

  const sentiment = analyzeSentiment(message.text);

  await snap.ref.update({
    sentiment,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});

// --- Callable Function (v2) ---
export const logMood = onCall(async (request) => {
  const { auth, data } = request;

  if (!auth) {
    throw new HttpsError("unauthenticated", "Must be logged in");
  }

  const { mood, note } = data as { mood: string; note?: string };
  const userId = auth.uid;

  const validMoods = ["happy", "sad", "anxious", "neutral"];
  if (!validMoods.includes(mood)) {
    throw new HttpsError("invalid-argument", "Invalid mood value");
  }

  const moodLog = {
    userId,
    mood,
    note: note || "",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  try {
    const docRef = await db.collection("moodLogs").add(moodLog);
    return { id: docRef.id };
  } catch (error) {
    console.error("Error logging mood:", error);
    throw new HttpsError("internal", "Failed to log mood");
  }
});
