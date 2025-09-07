/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const http = require("http");

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
const port = process.env.PORT || "4000";
app.set("port", port);

/** Create HTTP server. */
const server = http.createServer(app);
/** Listen on provided port, on all network interfaces. */
server.listen(port, () => console.log(`Server Running on port ${port}`));
