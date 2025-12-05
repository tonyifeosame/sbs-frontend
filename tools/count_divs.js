const fs = require('fs');
const s = fs.readFileSync('src/UserProfile.tsx','utf8');
const opens = (s.match(/<div\b/g) || []).length;
const closes = (s.match(/<\/div>/g) || []).length;
console.log('opens', opens, 'closes', closes);
