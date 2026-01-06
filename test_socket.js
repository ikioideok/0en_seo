import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

console.log("Attempting connection...");

socket.on("connect", () => {
    console.log("Connected to server! ID:", socket.id);
    // Emit the event we are debugging
    socket.emit("toggle_blocked_date", "2026-01-01");
});

socket.on("disconnect", () => {
    console.log("Disconnected");
});

// Wait a bit to see if server logs anything, then exit
setTimeout(() => {
    console.log("Done waiting, exiting.");
    process.exit(0);
}, 2000);
