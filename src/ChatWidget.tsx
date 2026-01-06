import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';
import io, { Socket } from 'socket.io-client';

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

// Generate random ID for this session
const userId = 'user_' + Math.random().toString(36).substr(2, 9);
const socket: Socket = io('http://localhost:3001');

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: 'ただいま担当者にお繋ぎしています',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showAgentName, setShowAgentName] = useState(false);
    const hasGreeted = useRef(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Simulate typing and greeting on open
    // Simulate typing and greeting on open
    useEffect(() => {
        const runGreetingSequence = async () => {
            if (isOpen && !hasGreeted.current) {
                hasGreeted.current = true;

                // Initial delay
                await new Promise(r => setTimeout(r, 5000));

                // Message 1
                setIsTyping(true);
                await new Promise(r => setTimeout(r, 1000));
                setIsTyping(false);
                playNotificationSound();
                setMessages(prev => [
                    ...prev.filter(msg => msg.id !== 'welcome'),
                    {
                        id: 'g1',
                        text: 'お世話になっております。',
                        sender: 'bot',
                        timestamp: new Date()
                    }
                ]);

                // Message 2
                setIsTyping(true);
                await new Promise(r => setTimeout(r, 1200));
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    id: 'g2',
                    text: '株式会社AIMAの大柳と申します。',
                    sender: 'bot',
                    timestamp: new Date()
                }]);

                // Message 3
                setIsTyping(true);
                await new Promise(r => setTimeout(r, 1500));
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    id: 'g3',
                    text: 'なにかお困りでしょうか？どのようなことでも構いませんので、お気軽にご相談くださいませ。',
                    sender: 'bot',
                    timestamp: new Date()
                }]);

                // Show agent name after full greeting
                setShowAgentName(true);
            }
        };

        runGreetingSequence();
    }, [isOpen]);

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
            oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
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
        if (isOpen) {
            scrollToBottom();
            // Ensure we join room when opening, if connected
            if (socket.connected) {
                socket.emit('join_room', { room: userId });
            }
        }
    }, [messages, isOpen, isTyping]);

    useEffect(() => {
        function onConnect() {
            console.log("ChatWidget connected");
            socket.emit('join_room', { room: userId });
        }

        socket.on('connect', onConnect);
        if (socket.connected) {
            onConnect();
        }

        socket.on('receive_message', (data: any) => {
            // Admin reply
            const botMsg: Message = {
                id: Date.now().toString(),
                text: data.text,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        });

        return () => {
            socket.off('connect', onConnect);
            socket.off('receive_message');
        };
    }, []);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Send to server
        socket.emit('send_message', {
            room: 'admin',
            text: userMsg.text,
            sender: 'user',
            userId: userId
        });
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
                        className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}
