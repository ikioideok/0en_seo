import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';

interface ChatWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

// ユーザーがGASをデプロイした後、このURLを.envまたは直接ここに設定してもらいます
const GAS_API_URL = import.meta.env.VITE_GAS_API_URL || '';

// Generate or retrieve persistent user ID
const getUserId = () => {
    const key = 'chat_user_id';
    let id = localStorage.getItem(key);
    if (!id) {
        id = 'user_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem(key, id);
    }
    return id;
};

const userId = getUserId();

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
    // Greeting state
    const hasGreetedKey = `has_greeted_${userId}`;
    const initialHasGreeted = sessionStorage.getItem(hasGreetedKey) === 'true';
    const hasGreeted = useRef(initialHasGreeted);

    const [messages, setMessages] = useState<Message[]>(() => {
        if (initialHasGreeted) {
            return [{
                id: 'g3',
                text: 'なにかお困りでしょうか？どのようなことでも構いませんので、お気軽にご相談くださいませ。',
                sender: 'bot',
                timestamp: new Date()
            }];
        }
        return [{
            id: 'welcome',
            text: 'ただいま担当者にお繋ぎしています',
            sender: 'bot',
            timestamp: new Date()
        }];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showAgentName, setShowAgentName] = useState(initialHasGreeted);
    const [isSending, setIsSending] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);

    // Initial Greeting Sequence
    useEffect(() => {
        const runGreetingSequence = async () => {
            // Only run if not greeted yet AND we still have the welcome message
            if (isOpen && !hasGreeted.current && messages.some(m => m.id === 'welcome')) {
                hasGreeted.current = true;
                sessionStorage.setItem(hasGreetedKey, 'true');

                // Initial delay
                await new Promise(r => setTimeout(r, 2000));

                const greetingMessages = [
                    'お世話になっております。',
                    '株式会社AIMAの大柳と申します。',
                    'なにかお困りでしょうか？どのようなことでも構いませんので、お気軽にご相談くださいませ。'
                ];

                for (let i = 0; i < greetingMessages.length; i++) {
                    setIsTyping(true);
                    await new Promise(r => setTimeout(r, 1000 + (Math.random() * 500)));
                    setIsTyping(false);
                    playNotificationSound();

                    const newMsg: Message = {
                        id: `g${i}`,
                        text: greetingMessages[i],
                        sender: 'bot',
                        timestamp: new Date()
                    };

                    setMessages(prev => {
                        // Remove loading message if it exists
                        const filtered = prev.filter(msg => msg.id !== 'welcome');
                        return [...filtered, newMsg];
                    });

                    await new Promise(r => setTimeout(r, 500));
                }

                setShowAgentName(true);
            }
        };

        runGreetingSequence();
    }, [isOpen]);

    // Polling Logic
    useEffect(() => {
        if (!isOpen || !GAS_API_URL) return;

        const pollMessages = async () => {
            try {
                // Poll for messages newer than last check
                const response = await fetch(`${GAS_API_URL}?action=poll&userId=${userId}`);
                if (!response.ok) return;

                const data = await response.json();
                if (data.messages && Array.isArray(data.messages)) {
                    // Filter out already displayed messages and user's own messages
                    const newMessages = data.messages.filter((m: any) =>
                        m.sender === 'bot' &&
                        !messages.some(existing => existing.id === m.id)
                    ).map((m: any) => ({
                        id: m.id,
                        text: m.text,
                        sender: 'bot',
                        timestamp: new Date(m.timestamp)
                    }));

                    if (newMessages.length > 0) {
                        playNotificationSound();
                        setMessages(prev => [...prev, ...newMessages]);
                    }
                }
            } catch (error) {
                console.error('Polling error:', error);
            }
        };

        // Poll every 5 seconds
        pollingInterval.current = setInterval(pollMessages, 5000);

        // Initial poll
        pollMessages();

        return () => {
            if (pollingInterval.current) clearInterval(pollingInterval.current);
        };
    }, [isOpen, messages]);

    const playNotificationSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;

            const ctx = new AudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

            oscillator.start();
            oscillator.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.error('Audio play failed', e);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!isOpen) return;
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const textToSend = inputValue;
        const tempId = Date.now().toString();

        const userMsg: Message = {
            id: tempId,
            text: textToSend,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsSending(true);

        try {
            if (GAS_API_URL) {
                // Send to GAS (Using no-cors if needed, but standard POST usually works with Web Apps)
                // Note: GAS Web Apps often need 'application/x-www-form-urlencoded' or handle JSON in specific ways
                // We'll use URL parameters for simplicity or standard POST

                await fetch(GAS_API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8', // Plain text to avoid CORS preflight issues effectively
                    },
                    body: JSON.stringify({
                        action: 'send',
                        userId: userId,
                        text: textToSend,
                        sender: 'user'
                    })
                });
            } else {
                console.warn('GAS_API_URL is not set. Message not sent to backend.');
            }
        } catch (error) {
            console.error('Send error:', error);
            // Optionally mark message as failed
        } finally {
            setIsSending(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-4 md:right-8 z-[60] w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 animate-in slide-in-from-bottom-10 fade-in duration-300">
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 rounded-t-2xl flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-white/10 p-1.5 rounded-full">
                        <MessageCircle size={18} />
                    </div>
                    <div>
                        <div className="font-bold text-sm">サポートチャット</div>
                        <div className="text-[10px] text-slate-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                            {showAgentName ? '担当者：大柳香織' : '担当者がオンライン'}
                        </div>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="hover:bg-white/10 p-1 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-white text-slate-700 border border-gray-100 rounded-tl-none'
                                }`}
                        >
                            {msg.id === 'welcome' ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                    <span>{msg.text}</span>
                                </div>
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                            )}
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-3 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 rounded-b-2xl">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="メッセージを入力..."
                        disabled={isSending}
                        className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isSending}
                        className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                </div>
            </form>
        </div>
    );
}
