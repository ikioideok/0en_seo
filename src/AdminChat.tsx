import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { Send, User, Bell, Calendar, MessageCircle } from 'lucide-react';

interface ChatSession {
    userId: string;
    lastMessage: string;
    timestamp: string;
    unread: boolean;
}

interface Message {
    text: string;
    sender: 'admin' | 'user';
    timestamp: Date;
}

const socket: Socket = io('http://127.0.0.1:3001');

export default function AdminChat() {
    const [activeChats, setActiveChats] = useState<ChatSession[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Record<string, Message[]>>({});
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [isConnected, setIsConnected] = useState(socket.connected);

    const [activeTab, setActiveTab] = useState<'chat' | 'calendar'>('chat');
    const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());

    // Calendar State
    const [currentCalDate, setCurrentCalDate] = useState(new Date());


    useEffect(() => {
        // Request notification permission
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        function onConnect() {
            setIsConnected(true);
            console.log("Admin connected");
            socket.emit('join_room', { room: 'admin' });
            socket.emit('admin_init');
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log("Admin disconnected");
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);

        // Initial check
        if (socket.connected) {
            onConnect();
        }

        socket.on('active_chats_update', (chats: ChatSession[]) => {
            setActiveChats(chats);
        });

        socket.on('calendar_update', (dates: string[]) => {
            console.log('📅 Received calendar_update:', dates);
            setBlockedDates(new Set(dates));
        });

        socket.on('receive_message', (data: any) => {
            // data: { room, text, sender, userId }
            // ... (lines 70-139 unchanged)
            // --- Calendar Logic Removed (Dead Code) ---
            const newMsg: Message = {
                text: data.text,
                sender: 'user',
                timestamp: new Date()
            };

            setMessages(prev => ({
                ...prev,
                [data.userId]: [...(prev[data.userId] || []), newMsg]
            }));

            // Notify
            if (document.hidden || selectedUserId !== data.userId) {
                new Notification("New Message", { body: data.text });
            }
        });

        socket.on('history_response', (data: { userId: string, messages: any[] }) => {
            setMessages(prev => ({
                ...prev,
                [data.userId]: data.messages.map((m: any) => ({
                    text: m.text,
                    sender: m.sender,
                    timestamp: new Date(m.timestamp)
                }))
            }));
        });

        // Check for my own sent messages looping back?
        // Since we are the sender, we manually add to state usually, or get ack.
        // In this simple setup, we add manually when sending.

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('active_chats_update');
            socket.off('receive_message');
            socket.off('calendar_update');
        };
    }, [selectedUserId]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !selectedUserId) return;

        const newMsg: Message = {
            text: inputValue,
            sender: 'admin',
            timestamp: new Date()
        };

        // Emit to server
        socket.emit('send_message', {
            to: selectedUserId,
            text: inputValue,
            sender: 'admin'
        });

        // Update local state
        setMessages(prev => ({
            ...prev,
            [selectedUserId]: [...(prev[selectedUserId] || []), newMsg]
        }));
        setInputValue('');
    };

    const currentMessages = selectedUserId ? (messages[selectedUserId] || []) : [];

    // --- Calendar Logic ---
    const handlePrevMonth = () => setCurrentCalDate(new Date(currentCalDate.getFullYear(), currentCalDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentCalDate(new Date(currentCalDate.getFullYear(), currentCalDate.getMonth() + 1, 1));

    const calendarDays = () => {
        const year = currentCalDate.getFullYear();
        const month = currentCalDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];
        for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
        for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
        return days;
    };

    // Helper: Local YYYY-MM-DD
    const getLocalYYYYMMDD = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const toggleDateBlock = (date: Date) => {
        const dateStr = getLocalYYYYMMDD(date);
        console.log('👆 Toggling date (Clicked):', dateStr);
        socket.emit('toggle_blocked_date', dateStr);
    };


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar Navigation */}
            <div className="w-20 bg-slate-900 flex flex-col items-center py-6 gap-6 z-20 shadow-xl">
                <button
                    onClick={() => setActiveTab('chat')}
                    className={`p-3 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/10'}`}
                >
                    <MessageCircle size={24} className={activeTab === 'chat' ? '' : 'opacity-70'} />
                </button>
                <button
                    onClick={() => setActiveTab('calendar')}
                    className={`p-3 rounded-xl transition-all ${activeTab === 'calendar' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/10'}`}
                >
                    <Calendar size={24} className={activeTab === 'calendar' ? '' : 'opacity-70'} />
                </button>
            </div>

            {/* Chat View */}
            {activeTab === 'chat' && (
                <div className="flex-1 flex text-slate-900">
                    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center shadow-sm z-10">
                            <h1 className="font-bold text-lg">Inbox</h1>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} title={isConnected ? 'Connected' : 'Disconnected'}></div>
                                <Bell size={16} className={Notification.permission === 'granted' ? 'text-green-500' : 'text-gray-300'} />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {activeChats.map(chat => (
                                <div
                                    key={chat.userId}
                                    onClick={() => {
                                        setSelectedUserId(chat.userId);
                                        socket.emit('fetch_history', chat.userId);
                                    }}
                                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedUserId === chat.userId ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-sm text-slate-700 truncate w-24">
                                            {chat.userId === 'booking_bot' ? '🤖 Booking Bot' : `ID: ...${chat.userId.substr(-4)}`}
                                        </span>
                                        <span className="text-[10px] text-gray-400">{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <p className={`text-xs truncate ${chat.unread ? 'font-bold text-slate-900' : 'text-gray-500'}`}>
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            ))}
                            {activeChats.length === 0 && (
                                <div className="p-8 text-center text-gray-400 text-sm">No active chats</div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col bg-slate-50">
                        {selectedUserId ? (
                            <>
                                <div className="p-4 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-100 p-2 rounded-full">
                                            <User size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-800">User ID: {selectedUserId}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                    {currentMessages.length === 0 && (
                                        <div className="text-center text-gray-400 text-sm mt-10">Start the conversation...</div>
                                    )}
                                    {currentMessages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[70%] p-3 rounded-xl shadow-sm text-sm whitespace-pre-wrap ${msg.sender === 'admin' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-gray-200 rounded-bl-none'}`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>

                                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Type a reply..."
                                        />
                                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2">
                                            <Send size={18} /> Send
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-gray-400 flex-col gap-4">
                                <MessageCircle size={48} className="text-gray-300 opacity-20" />
                                <p>Select a chat to start messaging</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Calendar View */}
            {activeTab === 'calendar' && (
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Calendar Management</h2>
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-3xl font-bold text-slate-800">
                                    {currentCalDate.getFullYear()}年 {currentCalDate.getMonth() + 1}月
                                </h3>
                                <div className="flex gap-2">
                                    <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-slate-200">Previous</button>
                                    <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors border border-slate-200">Next</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-4 mb-4 text-center font-bold text-slate-400 border-b border-slate-100 pb-4">
                                <div className="text-red-400">Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div className="text-blue-400">Sat</div>
                            </div>

                            <div className="grid grid-cols-7 gap-4">
                                {calendarDays().map((date, i) => {
                                    if (!date) return <div key={`empty-${i}`} />;
                                    const dateStr = getLocalYYYYMMDD(date);
                                    const isBlocked = blockedDates.has(dateStr);

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => toggleDateBlock(date)}
                                            className={`
                                                aspect-video rounded-xl border flex flex-col items-center justify-center gap-1 transition-all
                                                ${isBlocked
                                                    ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'
                                                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-md'
                                                }
                                            `}
                                        >
                                            <span className={`text-2xl font-bold ${isBlocked ? 'text-red-500' : 'text-slate-700'}`}>{date.getDate()}</span>
                                            <span className="text-xs font-bold">
                                                {isBlocked ? '不可' : 'OK'}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                                <strong>💡 使い方:</strong> 日付をクリックすると「予約可/不可」を切り替えられます。赤くなっている日はユーザー側で選択できなくなります。
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


