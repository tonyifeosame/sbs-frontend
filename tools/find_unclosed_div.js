const fs = require('fs');
const s = fs.readFileSync('src/UserProfile.tsx','utf8');
const lines = s.split('\n');
let count=0;
for (let i=0;i<lines.length;i++){
  const line = lines[i];
  const opens = (line.match(/<div\b/g)||[]).length;
  const closes = (line.match(/<\/div>/g)||[]).length;
  count += opens - closes;
  if (count < 0) {
    console.log('negative balance at line', i+1);
    break;
  }
  // if unmatched opening, show first line where count is > 0? we'll show first where count at end of file nonzero
}
console.log('final balance', count); 
// show nearby lines where the last change happened
if (count > 0) {
  // find last occurrence where cumulative count increased
  let cum=0; let lastLine=-1;
  for (let i=0;i<lines.length;i++){
    const line = lines[i];
    const opens = (line.match(/<div\b/g)||[]).length;
    const closes = (line.match(/<\/div>/g)||[]).length;
    const delta = opens-closes;
    cum += delta;
    if (cum > 0) lastLine = i+1;
  }
  console.log('possible region around line', lastLine);
  console.log(lines.slice(Math.max(0,lastLine-8), Math.min(lines.length,lastLine+8)).join('\n'));
}
