const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { chat, transcribe, speak } = require("./index");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", chat);
app.post("/transcribe", transcribe);
app.post("/speak", speak);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));