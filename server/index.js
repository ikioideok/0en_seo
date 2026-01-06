import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'chat_data.json');

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow all for debugging
        methods: ["GET", "POST"],
    },
});

// State
let activeChats = new Map(); // userId -> { id, lastMessage, timestamp, unread }
let messageStore = {}; // userId -> [Message]
let blockedDates = new Set(); // Set<"YYYY-MM-DD">

// Load data
try {
    if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        const data = JSON.parse(raw);
        if (data.activeChats) {
            activeChats = new Map(data.activeChats);
        }
        if (data.messageStore) {
            messageStore = data.messageStore;
        }
        if (data.blockedDates) {
            blockedDates = new Set(data.blockedDates);
        }
        console.log('Loaded chat data from disk.');
    }
} catch (e) {
    console.error('Failed to load chat data:', e);
}

function saveData() {
    try {
        const data = {
            activeChats: Array.from(activeChats.entries()),
            messageStore: messageStore,
            blockedDates: Array.from(blockedDates)
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Failed to save chat data:', e);
    }
}

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // User joins their own room or admin room
    socket.on('join_room', (data) => {
        socket.join(data.room);
        console.log(`User ${socket.id} joined room: ${data.room}`);
    });

    // Fetch history (Admin mostly)
    socket.on('fetch_history', (userId) => {
        const history = messageStore[userId] || [];
        socket.emit('history_response', { userId, messages: history });
    });

    // User sends message
    socket.on('send_message', (data) => {
        console.log(`Msg from ${data.sender} (${data.userId || 'admin'}): ${data.text}`);

        // Persist message
        const targetId = data.sender === 'user' ? data.userId : data.to;

        if (!messageStore[targetId]) {
            messageStore[targetId] = [];
        }

        // Add timestamp if missing
        if (!data.timestamp) data.timestamp = new Date();

        messageStore[targetId].push(data);

        if (data.sender === 'user') {
            // Forward to admin
            socket.to('admin').emit('receive_message', data);

            // Update active list
            activeChats.set(data.userId, {
                userId: data.userId,
                lastMessage: data.text,
                timestamp: new Date(),
                unread: true
            });
            // Broadcast updated list to admin
            io.to('admin').emit('active_chats_update', Array.from(activeChats.values()));

            // Notify admin specifically
            socket.to('admin').emit('notify_admin', {
                title: `New Message from ID: ${data.userId.substr(0, 4)}...`,
                body: data.text
            });

        } else if (data.sender === 'admin') {
            // Forward to specific user
            socket.to(data.to).emit('receive_message', data);

            // Update active list (mark read)
            if (activeChats.has(data.to)) {
                const chat = activeChats.get(data.to);
                chat.lastMessage = `(You): ${data.text}`;
                chat.unread = false;
                activeChats.set(data.to, chat);
                io.to('admin').emit('active_chats_update', Array.from(activeChats.values()));
            }
        }

        // Save to disk
        saveData();
    });

    // Check for admin initializing to send initial list
    socket.on('admin_init', () => {
        socket.emit('active_chats_update', Array.from(activeChats.values()));
        socket.emit('calendar_update', Array.from(blockedDates));
    });

    // --- Calendar Events ---
    socket.on('get_calendar_data', () => {
        socket.emit('calendar_update', Array.from(blockedDates));
    });

    socket.on('toggle_blocked_date', (dateStr) => {
        console.log('Backend Received toggle:', dateStr);
        if (blockedDates.has(dateStr)) {
            blockedDates.delete(dateStr);
        } else {
            blockedDates.add(dateStr);
        }
        // Broadcast to everyone (Admins and Users) so UI updates instantly
        io.emit('calendar_update', Array.from(blockedDates));
        saveData();
    });

    socket.on('submit_booking', (bookingData) => {
        const { date, time, customer } = bookingData; // customer: { company, email }

        // Notify Admin
        io.to('admin').emit('notify_admin', {
            title: '📅 New Booking Request',
            body: `${customer.company} requested ${date} at ${time}`
        });

        // Also send as a chat message from "System" or the user
        // We simulate a user message so it appears in the chat list
        const bookingMsg = {
            sender: 'user',
            userId: 'booking_bot', // Special ID or can be the user's socket ID if we tracked it
            text: `【予約リクエスト】\n日時: ${date} ${time}\n会社名: ${customer.company}\nEmail: ${customer.email}`,
            timestamp: new Date()
        };

        // Add to a specific booking channel or just main admin chat? 
        // For simplicity, let's treat it as a message from the user if we had their ID, 
        // but here we might not have a connected chat session for the form user.
        // So we send it to Admin Room directly.
        io.to('admin').emit('receive_message', bookingMsg);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    });
});

server.listen(3001, () => {
    console.log('SERVER RUNNING on port 3001');
});
