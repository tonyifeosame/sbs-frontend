const fs=require('fs');
const s=fs.readFileSync('src/UserProfile.tsx','utf8');
const lines=s.split('\n');
let stack=[];
for (let i=0;i<lines.length;i++){
  const line=lines[i];
  const openRegex=/<div\b/gi;
  const closeRegex=/<\/div>/gi;
  let m;
  while ((m=openRegex.exec(line))!==null){ stack.push({line:i+1, text: line.trim()}); }
  while ((m=closeRegex.exec(line))!==null){ if (stack.length>0) stack.pop(); else console.log('extra close at', i+1); }
}
if (stack.length>0) console.log('unmatched opens:', stack.slice(-6)); else console.log('all matched');
