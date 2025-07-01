const express = require("express");
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
    const response = await handleAudioChat(req.file.path); // Only OpenAI, no Firebase
    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

let mediaRecorder;
let audioChunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };
  });
}

function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");
    fetch("/api/audio-chat", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Chat response:", data.response);
      });
    audioChunks = [];
  };
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));