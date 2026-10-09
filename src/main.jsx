import React,{useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {LayoutDashboard,Users,ChartNoAxesCombined,ShieldCheck,Search,ChevronRight,AlertTriangle,CheckCircle2,GraduationCap,CalendarCheck,BrainCircuit,BriefcaseBusiness,Activity,Upload,Filter,ArrowUpRight,Menu,X,Info} from "lucide-react";
import "./styles.css";

const students=[
{name:"Meena R",dept:"AI & Data Science",year:"II",score:71,risk:"Medium",attendance:81,cgpa:7.5,lms:70,engagement:73,placement:58,skills:76,feedback:78,segment:"Placement Gap",issues:["Placement readiness"],action:"Practice aptitude and mock interviews"},
{name:"Vijay K",dept:"Computer Science",year:"II",score:46,risk:"High",attendance:64,cgpa:6.0,lms:51,engagement:55,placement:42,skills:58,feedback:63,segment:"Intervention Required",issues:["Low attendance","Placement readiness"],action:"Create attendance recovery and placement practice plan"},
{name:"Srisudhan S",dept:"AI & Data Science",year:"II",score:82,risk:"Low",attendance:91,cgpa:8.2,lms:76,engagement:84,placement:72,skills:86,feedback:80,segment:"High Potential",issues:["Placement readiness"],action:"Assign DSA practice + mock interview"},
{name:"Arun Kumar",dept:"Computer Science",year:"III",score:42,risk:"High",attendance:62,cgpa:5.8,lms:48,engagement:51,placement:39,skills:54,feedback:61,segment:"Intervention Required",issues:["Low attendance","Academic performance","Placement readiness"],action:"Faculty intervention + attendance recovery plan"},
{name:"Priya S",dept:"Information Technology",year:"III",score:64,risk:"Medium",attendance:78,cgpa:7.1,lms:69,engagement:62,placement:48,skills:72,feedback:76,segment:"Placement Gap",issues:["Placement readiness"],action:"Placement preparation pathway"},
{name:"Rahul M",dept:"AI & Data Science",year:"II",score:88,risk:"Low",attendance:94,cgpa:8.8,lms:92,engagement:90,placement:86,skills:89,feedback:84,segment:"High Performer",issues:[],action:"Advanced projects + peer mentoring"},
{name:"Divya R",dept:"Electronics",year:"IV",score:57,risk:"Medium",attendance:73,cgpa:6.6,lms:57,engagement:68,placement:51,skills:63,feedback:70,segment:"Engagement Gap",issues:["LMS activity","Placement readiness"],action:"Learning engagement + placement plan"},
{name:"Karthik P",dept:"Mechanical",year:"III",score:75,risk:"Low",attendance:88,cgpa:7.9,lms:73,engagement:79,placement:69,skills:78,feedback:76,segment:"High Potential",issues:["Placement readiness"],action:"Mock interview + aptitude practice"}
];

const weights={Academic:30,Attendance:20,LMS:15,Engagement:10,Placement:15,Skills:5,Feedback:5};
const nav=[["overview","Overview",LayoutDashboard],["students","Students",Users],["analytics","Analytics",ChartNoAxesCombined],["interventions","Interventions",ShieldCheck]];

function scoreClass(r){return r==="High"?"high":r==="Medium"?"medium":"low"}

function AuthScreen({onLogin}) {
 const [mode,setMode]=useState("login");
 const [name,setName]=useState("");
 const [email,setEmail]=useState("");
 const [password,setPassword]=useState("");
 const [error,setError]=useState("");

 function submit(e){
  e.preventDefault();
  setError("");
  if(!email.trim() || !password.trim()){
   setError("Please enter your email and password.");
   return;
  }
  if(mode==="signup" && !name.trim()){
   setError("Please enter your name.");
   return;
  }
  onLogin(name.trim() || email.split("@")[0],email.trim());
 }

 return <div className="auth-screen">
  <form className="auth-card" onSubmit={submit}>
   <div className="logo auth-logo"><BrainCircuit size={27}/></div>
   <h1>EduPath <span>AI</span></h1>
   <p>Student Success Intelligence Platform</p>
   <div className="auth-tabs">
    <button type="button" className={mode==="login"?"auth-tab active":"auth-tab"} onClick={()=>{setMode("login");setError("");}}>Login</button>
    <button type="button" className={mode==="signup"?"auth-tab active":"auth-tab"} onClick={()=>{setMode("signup");setError("");}}>Sign up</button>
   </div>
   {mode==="signup"&&<label>Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your name" /></label>}
   <label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required /></label>
   <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter any demo password" required minLength={4}/></label>
   {error&&<div className="auth-error">{error}</div>}
   <button className="primary auth-submit" type="submit">{mode==="login"?"Login to dashboard":"Create demo account"} <ChevronRight size={17}/></button>
   <small className="auth-note">Demo only — do not use a real password. Accounts are not securely stored.</small>
  </form>
 </div>;
}

function App(){
 const [authUser,setAuthUser]=useState(null);
 
 const [page,setPage]=useState("overview"),[selected,setSelected]=useState(null),[query,setQuery]=useState(""),[risk,setRisk]=useState("All"),[mobile,setMobile]=useState(false);
 const filtered=useMemo(()=>students.filter(s=>(risk==="All"||s.risk===risk)&&(`${s.name} ${s.dept}`.toLowerCase().includes(query.toLowerCase()))),[query,risk]);
 const current=selected?students.find(s=>s.name===selected):null;
 if(!authUser) return <AuthScreen onLogin={(name,email)=>setAuthUser({name,email})}/>;
 return <div className="app">
  <header className="topbar"><div className="brand"><div className="logo"><BrainCircuit size={23}/></div><div><b>EduPath <span>AI</span></b><small>Student Success Intelligence</small></div></div><button className="mobile-btn" onClick={()=>setMobile(!mobile)}>{mobile?<X/>:<Menu/>}</button><div className="top-actions"><div className="live"><i/>Live analytics</div><button className="logout-btn" onClick={()=>setAuthUser(null)}>Logout</button><div className="avatar">{authUser.name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}</div></div></header>
  <aside className={mobile?"sidebar open":"sidebar"}><div className="side-label">WORKSPACE</div>{nav.map(([id,label,Icon])=><button className={page===id?"nav active":"nav"} onClick={()=>{setPage(id);setSelected(null);setMobile(false)}} key={id}><Icon size={18}/>{label}</button>)}<div className="side-label gap">DATA</div><button className="nav" onClick={()=>alert("Demo CSV import: connect your college data source in the next version.")}><Upload size={18}/>Import data</button><div className="side-card"><div className="side-icon"><ShieldCheck size={18}/></div><b>Decision ready</b><p>Scores are explainable and every risk flag has recommended action.</p></div></aside>
  <main className="main">
   {page==="overview"&&<Overview setPage={setPage} setSelected={setSelected}/>}
   {page==="students"&&<Students filtered={filtered} query={query} setQuery={setQuery} risk={risk} setRisk={setRisk} setSelected={setSelected}/>}
   {page==="analytics"&&<Analytics/>}
   {page==="interventions"&&<Interventions setSelected={setSelected}/>}
   {current&&<StudentDrawer student={current} close={()=>setSelected(null)}/>}
  </main>
 </div>
}

function PageHead({eyebrow,title,desc,children}){return <div className="pagehead"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{children}</div>}

function Overview({setPage,setSelected}){
 return <><PageHead eyebrow="KPMG CHALLENGE 04" title="Student Success Command Center" desc="Predict risk early, understand why it happens, and turn student data into targeted action."><button className="primary" onClick={()=>setPage("students")}>Explore students <ArrowUpRight size={17}/></button></PageHead>
 <div className="metrics">{[["1,248","Total students","Across 8 departments",Users],["78.4","Avg success score","â†‘ 6.2% this term",ChartNoAxesCombined],["126","At-risk students","10.1% of cohort",AlertTriangle],["91%","Avg attendance","â†‘ 2.8% this month",CalendarCheck]].map(([v,l,s,I])=><div className="metric" key={l}><div className="metric-icon"><I size={19}/></div><strong>{v}</strong><b>{l}</b><span>{s}</span></div>)}</div>
 <div className="grid2"><div className="panel chart-panel"><div className="panel-head"><div><h3>Success score distribution</h3><p>Current student cohort</p></div><span className="badge blue">Live</span></div><div className="bars">{[18,31,44,63,78,69,88,76,94,82,58,39].map((h,i)=><div className="bar-wrap" key={i}><div className="bar" style={{height:`${h}%`}}/><small>{50+i*5}</small></div>)}</div><div className="legend"><span><i className="dot blue-dot"/>Students by score band</span><span>Higher is healthier</span></div></div>
 <div className="panel"><div className="panel-head"><div><h3>Risk overview</h3><p>Students requiring attention</p></div><button className="text-btn" onClick={()=>setPage("students")}>View all <ChevronRight size={15}/></button></div><div className="risk-list">{[["High","126","Immediate intervention"],["Medium","241","Monitor & support"],["Low","881","On track"]].map(x=><div className="risk-row" key={x[0]}><div className={"risk-dot "+scoreClass(x[0])}/><div><b>{x[0]} risk</b><span>{x[2]}</span></div><strong>{x[1]}</strong></div>)}</div></div></div>
 <div className="grid3"><div className="panel segment-panel"><div className="panel-head"><div><h3>Student segments</h3><p>Actionable cohorts</p></div></div>{[["High Performer",32,"low"],["Placement Gap",21,"medium"],["Engagement Gap",14,"medium"],["Intervention Required",10,"high"]].map(x=><div className="segment" key={x[0]}><div><b>{x[0]}</b><span>{x[1]}% of students</span></div><div className={"progress "+x[2]}><i style={{width:`${x[1]*2.4}%`}}/></div></div>)}</div>
 <div className="panel insight"><div className="ai-title"><BrainCircuit size={20}/><b>AI intervention insight</b></div><h3>Placement readiness is the biggest avoidable risk.</h3><p>Students with strong academics but low placement scores are a high-impact intervention group.</p><button className="secondary" onClick={()=>setPage("interventions")}>See recommended actions</button></div>
 <div className="panel"><div className="panel-head"><div><h3>Recent alerts</h3><p>Latest model signals</p></div></div>{students.slice(0,3).map(s=><button className="alert-row" key={s.name} onClick={()=>setSelected(s.name)}><div className={"mini-score "+scoreClass(s.risk)}>{s.score}</div><div><b>{s.name}</b><span>{s.issues[0]||"Strong trajectory"}</span></div><ChevronRight size={16}/></button>)}</div></div>
 </>}

function Students({filtered,query,setQuery,risk,setRisk,setSelected}){
 return <><PageHead eyebrow="STUDENT 360" title="Students" desc="Search the unified student view and identify where faculty action will have the highest impact."/><div className="panel table-panel"><div className="toolbar"><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search student or department..."/></div><div className="filters">{["All","High","Medium","Low"].map(r=><button key={r} onClick={()=>setRisk(r)} className={risk===r?"filter active":"filter"}>{r==="All"?<Filter size={14}/>:null}{r}</button>)}</div></div><div className="table"><div className="tr th"><span>Student</span><span>Success score</span><span>Attendance</span><span>Placement</span><span>Segment</span><span>Risk</span><span/></div>{filtered.map(s=><button className="tr row" key={s.name} onClick={()=>setSelected(s.name)}><span className="student"><div className="initial">{s.name.split(" ").map(x=>x[0]).join("")}</div><div><b>{s.name}</b><small>{s.dept} Â· Year {s.year}</small></div></span><span><strong>{s.score}</strong><small>/100</small></span><span>{s.attendance}%</span><span>{s.placement}%</span><span><em className="tag">{s.segment}</em></span><span><em className={"status "+scoreClass(s.risk)}>{s.risk}</em></span><ChevronRight size={16}/></button>)}</div></div></>}

function Analytics(){
 return <><PageHead eyebrow="DECISION INTELLIGENCE" title="Analytics" desc="Understand the signals behind student success and where intervention can move outcomes."/>
 <div className="grid2">
  <div className="panel chart-panel">
   <div className="panel-head">
    <div>
     <h3>Attendance vs success score</h3>
     <p>Higher attendance generally aligns with stronger outcomes.</p>
    </div>
   </div>
   <div className="scatter">
    {students.map(s=>
     <div
      className={"bubble "+scoreClass(s.risk)}
      key={s.name}
      title={s.name}
      style={{left:`${s.attendance-58}%`,bottom:`${s.score-35}%`}}
     >
      {s.score}
     </div>
    )}
   </div>
   <div className="axis">
    <span>60%</span><span>70%</span><span>80%</span><span>90%</span><span>100%</span>
   </div>
  </div>

  <div className="panel">
   <div className="panel-head">
    <div>
     <h3>Score drivers</h3>
     <p>Model weighting used for Success Score</p>
    </div>
   </div>

   {Object.entries(weights).map(([k,v])=>
    <div className="driver" key={k}>
     <div>
      <b>{k}</b>
      <span>{v}% weight</span>
     </div>
     <div className="progress blue">
      <i style={{width:`${v*3}%`}}/>
     </div>
    </div>
   )}
  </div>

  <div className="panel full">
   <div className="panel-head">
    <div>
     <h3>Department snapshot</h3>
     <p>Average success score and risk concentration</p>
    </div>
   </div>

   <div className="dept-grid">
    {[
     ["AI & Data Science",84,8],
     ["Computer Science",79,12],
     ["Information Technology",76,14],
     ["Electronics",72,17],
     ["Mechanical",74,11],
     ["Civil",69,20]
    ].map(d=>
     <div className="dept" key={d[0]}>
      <div className="dept-top">
       <b>{d[0]}</b>
       <strong>{d[1]}</strong>
      </div>
      <div className="progress">
       <i style={{width:`${d[1]}%`}}/>
      </div>
      <small>{d[2]}% students at risk</small>
     </div>
    )}
   </div>
  </div>
 </div>
 </>
}
function Interventions({setSelected}){
 return <><PageHead eyebrow="ACTION CENTER" title="Recommended interventions" desc="Convert risk signals into specific, trackable faculty actions."/><div className="action-grid">{students.filter(s=>s.risk!=="Low").map(s=><div className="panel action-card" key={s.name}><div className="action-head"><div className={"mini-score "+scoreClass(s.risk)}>{s.score}</div><div><h3>{s.name}</h3><p>{s.dept} Â· Year {s.year}</p></div><em className={"status "+scoreClass(s.risk)}>{s.risk} risk</em></div><div className="issue-box"><AlertTriangle size={17}/><div><b>Primary signals</b><p>{s.issues.join(" Â· ")}</p></div></div><div className="recommend"><BrainCircuit size={17}/><div><b>Recommended action</b><p>{s.action}</p></div></div><button className="secondary" onClick={()=>setSelected(s.name)}>Open student 360 <ChevronRight size={15}/></button></div>)}</div></>}

function StudentDrawer({student:s,close}){
 return <div className="overlay" onClick={close}><div className="drawer" onClick={e=>e.stopPropagation()}><button className="close" onClick={close}><X size={18}/></button><div className="drawer-profile"><div className="big-avatar">{s.name.split(" ").map(x=>x[0]).join("")}</div><div><h2>{s.name}</h2><p>{s.dept} Â· Year {s.year}</p></div></div><div className="score-card"><span>Student Success Score</span><strong>{s.score}<small>/100</small></strong><em className={"status "+scoreClass(s.risk)}>{s.risk} risk</em></div><h3 className="drawer-title">Score drivers</h3>{Object.entries({Academic:s.score,Attendance:s.attendance,LMS:s.lms,Engagement:s.engagement,Placement:s.placement,Skills:s.skills,Feedback:s.feedback}).map(([k,v])=><div className="driver" key={k}><div><b>{k}</b><span>{v}/100</span></div><div className="progress"><i style={{width:`${v}%`}}/></div></div>)}<div className="why"><Info size={17}/><div><b>Why this flag?</b><p>{s.issues.length?s.issues.join(", ")+" need attention.":"No major risk indicators detected."}</p></div></div><div className="recommend"><BrainCircuit size={17}/><div><b>Next best action</b><p>{s.action}</p></div></div></div></div>
}

createRoot(document.getElementById("root")).render(<App/>);



