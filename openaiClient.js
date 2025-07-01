const { OpenAI } = require("openai");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function transcribeAudio(audioFilePath) {
  const resp = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioFilePath),
    model: "whisper-1",
  });
  return resp.text;
}

async function getChatResponse(userInput) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a kind, empathetic therapy assistant." },
      { role: "user", content: userInput },
    ],
  });
  return completion.choices[0].message.content;
}

// Example usage:
async function handleAudioChat(audioFilePath) {
  const text = await transcribeAudio(audioFilePath);
  const response = await getChatResponse(text);
  return response;
}

let mediaRecorder;
let audioChunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };
  });
}

function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');
    fetch('/api/audio-chat', { method: 'POST', body: formData });
    audioChunks = [];
  };
}

module.exports = { transcribeAudio, getChatResponse, handleAudioChat };