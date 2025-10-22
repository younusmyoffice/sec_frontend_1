/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// Add headers
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-amz-date,x-amz-security-token,x-auth-token",
    );
    // Pass to next layer of middleware
    next();
});

// Point static path to dist
app.set("views", `${__dirname}../dist`);
app.use("/", express.static(path.join(__dirname, "..", "dist")));
app.use("/dist", express.static(path.join(__dirname, "..", "dist")));

const routes = require("./routes");

app.use("/", routes);

/** Get port from environment and store in Express. */
// const port = process.env.PORT || "4001";
const port =  "4001";
app.set("port", port);

/** Create HTTP server. */
const server = http.createServer(app);

/** Create Socket.IO server */
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

/** Socket.IO connection handling */
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle joining a room
    socket.on('join', ({ roomId, name }) => {
        socket.join(roomId);
        socket.to(roomId).emit('userList', `${name} joined the room`);
        console.log(`${name} joined room ${roomId}`);
    });

    // Handle joining a room (alternative event name)
    socket.on('joinRoom', ({ userID, roomID, doctorId, appointment_id }) => {
        console.log(`🚪 User ${userID} (${socket.id}) joining room ${roomID}`);
        socket.join(roomID);
        console.log(`✅ User ${userID} successfully joined room ${roomID}`);
        console.log(`📊 Room ${roomID} now has ${io.sockets.adapter.rooms.get(roomID)?.size || 0} members`);
        
        socket.to(roomID).emit('userList', `${userID} joined the room`);
        console.log(`📢 Notified other users in room ${roomID} that ${userID} joined`);
    });

    // Handle sending messages
    socket.on('message', (messageData) => {
        console.log(`📨 Raw message received:`, messageData);
        console.log(`📨 Message type:`, typeof messageData);
        console.log(`📨 Message keys:`, Object.keys(messageData || {}));
        
        const { roomID, data } = messageData;
        console.log(`📨 Extracted roomID:`, roomID);
        console.log(`📨 Extracted data:`, data);
        
        if (!roomID) {
            console.error(`❌ No roomID found in message:`, messageData);
            return;
        }
        
        console.log(`📨 Received message in room ${roomID}:`, data);
        console.log(`📨 Sender socket ID: ${socket.id}`);
        console.log(`📨 Room ${roomID} members:`, io.sockets.adapter.rooms.get(roomID)?.size || 0);
        
        // Broadcast to all users in the room (including sender for confirmation)
        io.to(roomID).emit('messageResponse', { 
            name: data.name, 
            text: data.text,
            id: data.id,
            socketID: data.socketID
        });
        console.log(`📤 Broadcasting message to room ${roomID}: ${data.text}`);
    });

    // Handle typing events
    socket.on('typing', ({ roomID, data }) => {
        socket.to(roomID).emit('typingResponse', data);
        console.log(`Typing in room ${roomID}: ${data}`);
    });

    // Handle file sharing
    socket.on('file', ({ roomId, file }) => {
        socket.to(roomId).emit('file', { 
            sender: socket.id, 
            fileName: file.name 
        });
        console.log(`File shared in room ${roomId}: ${file.name}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

/** Listen on provided port, on all network interfaces. */
server.listen(port, () => {
    console.log(`🚀 Server Running on port ${port}`);
    console.log(`🔌 Socket.IO server ready for connections`);
    console.log(`📡 Server URL: http://localhost:${port}`);
});
