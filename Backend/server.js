const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const organizationRoutes = require("./routes/organizationRoutes");
const giverRoutes = require("./routes/giverRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/", (req, res) => {
    res.send("HelpLift Backend is running!");
});

app.use("/api/organizations", organizationRoutes);
app.use("/api/givers", giverRoutes);

app.listen(PORT, () => {
    console.log(`HelpLift server is running on port ${PORT}`);
});