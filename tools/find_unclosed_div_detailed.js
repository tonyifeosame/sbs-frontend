const fs = require('fs');
const s = fs.readFileSync('src/UserProfile.tsx','utf8');
const lines = s.split('\n');
let count=0;
for (let i=0;i<lines.length;i++){
  const line = lines[i];
  const opens = (line.match(/<div\b/g)||[]).length;
  const closes = (line.match(/<\/div>/g)||[]).length;
  count += opens - closes;
  if (opens>0||closes>0) console.log(`${i+1}: opens=${opens} closes=${closes} cum=${count} -> ${line.trim()}`);
}
console.log('FINAL:', count);
