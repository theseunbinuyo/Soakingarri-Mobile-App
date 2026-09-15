export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: number;
};

export function createMessage(role: ChatRole, text: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    text,
    createdAt: Date.now(),
  };
}

export const SUGGESTED_PROMPTS = [
  'Summarize my last training session',
  "What's my current pilot rank?",
  'Give me a tip to earn more knowledge points',
];

const MOCK_REPLIES = [
  "I'm running on placeholder logic for now — once the Soakingarri AI engine is connected, I'll give you a real answer here.",
  "Good question. The live model isn't wired up yet, so consider this a stand-in response.",
  "Noted. I'll be able to reason over this properly once the backend integration lands.",
];

// Stand-in for the real Soakingarri AI backend call; swap this out once that API exists.
export function getMockAssistantReply(userText: string): Promise<string> {
  const reply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
  const delay = 700 + Math.random() * 900;
  return new Promise((resolve) => setTimeout(() => resolve(reply), delay));
}
