require('dotenv').config();
const { handleAudioChat } = require('./openaiClient');

async function testIntegration() {
  try {
    // Use your actual audio file name here
    const audioFilePath = 'Backend_Hestia\\test_audio2.wav';
    const response = await handleAudioChat(audioFilePath);
    console.log('Chat response:', response);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testIntegration();