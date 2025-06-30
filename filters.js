const keywords = [
  "anxiety", "depression", "stress", "trauma", "grief", "sadness", "anger",
  "fear", "worry", "relationship", "breakup", "self-esteem", "confidence",
  "panic", "loneliness", "abuse", "healing", "coping", "mindfulness", "therapy"
];

function filterTherapy(text) {
  const lower = text.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}

module.exports = { filterTherapy };