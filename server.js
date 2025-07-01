const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const { chat, transcribe, speak } = require("./index");
const { handleAudioChat } = require("./openaiClient");
const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", chat);
app.post("/transcribe", transcribe);
app.post("/speak", speak);
app.post("/api/audio-chat", upload.single("audio"), async (req, res) => {
  try {
    const ext = path.extname(req.file.originalname) || ".mp3";
    const newPath = req.file.path + ext;
    fs.renameSync(req.file.path, newPath);

    // ✅ Now pass the renamed file to your handler
    const result = await handleAudioChat(newPath);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));