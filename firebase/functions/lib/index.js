"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logMood = exports.onMessageCreate = void 0;
const admin = require("firebase-admin");
const firestore_1 = require("firebase-functions/v2/firestore");
const https_1 = require("firebase-functions/v2/https");
admin.initializeApp();
const db = admin.firestore();
// --- Helper function ---
function analyzeSentiment(text) {
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
exports.onMessageCreate = (0, firestore_1.onDocumentCreated)("messages/{messageId}", async (event) => {
    const snap = event.data;
    if (!snap)
        return;
    const message = snap.data();
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
exports.logMood = (0, https_1.onCall)(async (request) => {
    const { auth, data } = request;
    if (!auth) {
        throw new https_1.HttpsError("unauthenticated", "Must be logged in");
    }
    const { mood, note } = data;
    const userId = auth.uid;
    const validMoods = ["happy", "sad", "anxious", "neutral"];
    if (!validMoods.includes(mood)) {
        throw new https_1.HttpsError("invalid-argument", "Invalid mood value");
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
    }
    catch (error) {
        console.error("Error logging mood:", error);
        throw new https_1.HttpsError("internal", "Failed to log mood");
    }
});
//# sourceMappingURL=index.js.map