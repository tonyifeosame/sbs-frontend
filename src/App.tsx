import { useState } from "react";
export default function App() {
  const [token,setToken]=useState(""); const [wins,setWins]=useState(42); const [losses,setLosses]=useState(8);
  const login=async()=>{const r=await fetch("http://localhost:8080/login",{method:"POST"});const d=await r.json();setToken(d.token);setWins(d.wins);setLosses(d.losses);}
  const postBet=async(win:boolean)=>{await fetch("http://localhost:8080/betslip",{method:"POST",headers:{"Authorization":token,"Content-Type":"application/json"},body:JSON.stringify({games:"ManU vs Arsenal",result:win})});
    const p=await fetch("http://localhost:8080/profile",{headers:{"Authorization":token}});const pp=await p.json();setWins(pp.wins);setLosses(pp.losses);}
  return (
    <div style={{fontFamily:"Arial",textAlign:"center",marginTop:"10%"}}>
      <h1>SureBetSlips</h1>
      {!token?<button onClick={login} style={{padding:"15px 40px",fontSize:"20px"}}>LOGIN</button>:
       <div>
         <h2>Wins: {wins} | Losses: {losses}</h2>
         <button onClick={()=>postBet(true)} style={{margin:"10px",padding:"12px 30px",background:"#4CAF50",color:"white",border:"none",borderRadius:"8px"}}>WIN</button>
         <button onClick={()=>postBet(false)} style={{margin:"10px",padding:"12px 30px",background:"#f44336",color:"white",border:"none",borderRadius:"8px"}}>LOSS</button>
       </div>}
    </div>
  );
}
