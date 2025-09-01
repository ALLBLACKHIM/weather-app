import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

createChat({
    webhookUrl: 'https://rested-pegasus-publicly.ngrok-free.app/webhook/4a421fcc-9baa-4fda-8a30-43b936dff1a0/chat',//'http://localhost:5678/webhook/4a421fcc-9baa-4fda-8a30-43b936dff1a0/chat',
    webhookConfig: {
        method: 'POST',
        headers: {}
    },
    target: '#n8n-chat',
    mode: 'window',
    chatInputKey: 'chatInput',
    chatSessionKey: 'sessionId',
    loadPreviousSession: true,
    metadata: {},
    showWelcomeScreen: false,
    defaultLanguage: 'en',
    initialMessages: [
        'Hi there! 👋',
        'My name is Waer Nw. How can I assist you today?'
    ],
    i18n: {
        en: {
            title: 'Hi there! 👋',
            subtitle: "Start a chat. We're here to help you 24/7.",
            footer: '',
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your question..',
        },
    },
    enableStreaming: false,
});
