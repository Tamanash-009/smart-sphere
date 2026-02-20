import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let chatModel = null;

const LEGAL_SYSTEM_PROMPT = `You are LegalEase AI, a helpful legal assistant specializing in Indian law. You help citizens understand their legal rights in simple, clear language.

Your expertise covers:
- Consumer Protection Act, 2019
- Code on Wages, 2019
- IT Act, 2000 (Cybercrimes)
- Indian Penal Code (IPC) / Bharatiya Nyaya Sanhita (BNS)
- Right to Information Act, 2005
- Labour laws and workplace rights
- Fundamental Rights (Articles 14-32)
- Tenant and property rights

Rules:
1. Always respond in simple, easy-to-understand language
2. Cite specific sections of Indian law when relevant
3. Include practical next steps the user can take
4. ALWAYS add a disclaimer that this is educational information, not legal advice
5. Keep responses concise but informative (2-4 paragraphs max)
6. If you don't know something, say so honestly
7. Focus on Indian jurisdiction unless asked otherwise`;

const SIMPLIFY_SYSTEM_PROMPT = `You are a legal document simplifier. Your job is to take complex legal text and rewrite it in plain, simple English that anyone can understand.

Rules:
1. Replace all legal jargon with everyday words
2. Break long sentences into shorter ones
3. Use bullet points for lists of obligations or rights
4. Highlight key deadlines, penalties, or important numbers
5. Add a "Key Takeaways" section at the end with 3-5 bullet points
6. Keep the same meaning — never change the legal intent
7. Format the output clearly with headings and spacing`;

function initializeGemini() {
    if (!API_KEY) {
        console.warn('Gemini API key not set. Using mock responses. Set VITE_GEMINI_API_KEY in .env');
        return false;
    }
    try {
        genAI = new GoogleGenerativeAI(API_KEY);
        chatModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        return true;
    } catch (error) {
        console.error('Failed to initialize Gemini:', error);
        return false;
    }
}

const isInitialized = initializeGemini();

// Mock responses for when API key is not available
const MOCK_RESPONSES = {
    default: "I can help clarify that in the context of Indian law. However, the Gemini API key is not configured. Please add your VITE_GEMINI_API_KEY to the .env file to enable real AI responses.",
    consumer: "Under the Consumer Protection Act, 2019, you have the right to file a complaint against unfair trade practices. You can approach the District Consumer Forum for claims up to ₹1 crore.\n\n⚠️ This is educational information, not legal advice.",
    labor: "The Code on Wages, 2019 consolidates four existing labour laws and ensures timely payment of minimum wages to all employees across all sectors.\n\n⚠️ This is educational information, not legal advice.",
    cyber: "The IT Act, 2000 (amended 2008) addresses cybercrimes including hacking (Sec. 66), identity theft (Sec. 66C), and cyber terrorism (Sec. 66F). Penalties range from 3 years to life imprisonment.\n\n⚠️ This is educational information, not legal advice.",
    rti: "Under the Right to Information Act, 2005, any citizen can request information from a public authority within 30 days. The fee is just ₹10. You can file an RTI application online at rtionline.gov.in.\n\n⚠️ This is educational information, not legal advice.",
};

function getMockResponse(message) {
    const lower = message.toLowerCase();
    if (lower.includes('consumer')) return MOCK_RESPONSES.consumer;
    if (lower.includes('labor') || lower.includes('labour') || lower.includes('wage')) return MOCK_RESPONSES.labor;
    if (lower.includes('cyber') || lower.includes('hack') || lower.includes('online')) return MOCK_RESPONSES.cyber;
    if (lower.includes('rti') || lower.includes('information')) return MOCK_RESPONSES.rti;
    return MOCK_RESPONSES.default;
}

/**
 * Send a legal question to Gemini AI
 */
export async function legalChat(message) {
    if (!isInitialized || !chatModel) {
        await new Promise(resolve => setTimeout(resolve, 600));
        return { reply: getMockResponse(message) };
    }

    try {
        const result = await chatModel.generateContent([
            { text: LEGAL_SYSTEM_PROMPT },
            { text: `User question: ${message}` }
        ]);
        const response = result.response;
        return { reply: response.text() };
    } catch (error) {
        console.error('Gemini chat error:', error);
        if (error.message?.includes('quota') || error.message?.includes('429')) {
            return { reply: "I'm receiving too many requests right now. Please try again in a minute. (Rate limit: 15 requests/minute on free tier)" };
        }
        return { reply: "I encountered an error processing your question. Please try again shortly.\n\n⚠️ If this persists, check that your API key is valid." };
    }
}

/**
 * Simplify a legal document using Gemini AI
 */
export async function simplifyDocument(text) {
    if (!isInitialized || !chatModel) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            simplified: "**API Key Required**\n\nTo simplify real documents, please add your Gemini API key to the `.env` file:\n\n```\nVITE_GEMINI_API_KEY=your_key_here\n```\n\nGet a free key at [Google AI Studio](https://aistudio.google.com/apikey).",
            original: text
        };
    }

    try {
        const prompt = `${SIMPLIFY_SYSTEM_PROMPT}\n\n--- LEGAL DOCUMENT ---\n${text}\n--- END ---\n\nPlease simplify this document:`;
        const result = await chatModel.generateContent(prompt);
        const response = result.response;
        return {
            simplified: response.text(),
            original: text
        };
    } catch (error) {
        console.error('Gemini simplify error:', error);
        return {
            simplified: "Failed to simplify this document. Please try again.\n\nError: " + (error.message || "Unknown error"),
            original: text
        };
    }
}

export { isInitialized as isAIAvailable };
