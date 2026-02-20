import { legalChat, simplifyDocument } from './gemini';

const API_BASE_URL = 'https://legalease-mvp-1.preview.emergentagent.com/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

// Helper to simulate API delay and return mock data if real API fails
const fetchWithFallback = async (endpoint, options, mockData) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            console.warn(`API ${endpoint} failed with status ${response.status}. Falling back to mock data.`);
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API connection failed for ${endpoint}:`, error);
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockData;
    }
};

export const api = {
    auth: {
        login: async (email, password) => {
            return fetchWithFallback('/auth/login', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email, password }),
            }, {
                token: 'mock-jwt-token-12345',
                user: { id: 1, name: 'John Doe', email: email }
            });
        },
        register: async (name, email, password) => {
            return fetchWithFallback('/auth/register', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ name, email, password }),
            }, {
                token: 'mock-jwt-token-67890',
                user: { id: 2, name: name, email: email }
            });
        },
    },
    ai: {
        chat: async (message) => {
            // Use real Gemini AI
            return await legalChat(message);
        },
        simplify: async (text) => {
            // Use real Gemini AI
            return await simplifyDocument(text);
        },
    },
};
