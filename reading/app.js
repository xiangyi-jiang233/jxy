const chapters = [
  ["第1章 自动驾驶系统概论",1,8],
  ["第2章 自动驾驶的基础理论",9,55],
  ["第3章 自动驾驶的硬件平台",56,74],
  ["第4章 自动驾驶的软件平台",75,96],
  ["第5章 自动驾驶的感知模块",97,249],
  ["第6章 自动驾驶的高精地图",250,276],
  ["第7章 自动驾驶的定位模块",277,302],
  ["第8章 自动驾驶的规划模块",303,349],
  ["第9章 自动驾驶的控制模块",350,384],
  ["第10章 自动驾驶的仿真模拟模块",385,426],
  ["第11章 安全模型",427,446],
  ["第12章 自动和自主泊车",447,472],
  ["第13章 车联网",473,501],
  ["第14章 神经渲染技术",502,527],
  ["第15章 扩散模型",528,550]
];

const weekPlan = [
  {focus:"建立全局框架 + 计算机视觉基础",pages:"1-26",tasks:["第1章：分级、模块化、端到端、场景与数据闭环","第2章 2.1：计算机视觉底层/中层/高层","第2章 2.2-2.3：图像处理与优化基础","输出：画出“传感器→感知→定位→规划→控制”总链路","周测：解释模块化与端到端方案的差别"]},
  {focus:"机器学习基础 + 硬件平台",pages:"27-74",tasks:["第2章 2.4-2.6：机器学习、深度学习、模型压缩","第3章：摄像头、激光雷达、毫米波、IMU、GPS","第3章：CAN、线控底盘与计算平台","输出：列出 Robobus 中 ORIN、IPC 与传感器的职责","周测：为什么自动驾驶需要异构计算平台"]},
  {focus:"软件平台 + 标定",pages:"75-111",tasks:["第4章：AUTOSAR、V模型、ISO 26262、车载操作系统","重点：ROS、云平台、DevOps 与 MLOps","第5章 5.1：相机、雷达、IMU及多传感器标定","输出：把 ROS 2 节点/话题/TF 对应到软件平台","周测：外参与 TF 变换的关系"]},
  {focus:"单目视觉、深度估计与3D检测",pages:"112-144",tasks:["5.2 单目视觉障碍物测距","5.3 单目深度图估计：传统与深度学习方法","5.4 单目视觉3D障碍物检测","补充：高斯滤波、DoG、SIFT极值与亚像素定位","输出：说明单目尺度歧义从哪里来"]},
  {focus:"目标跟踪、融合与道路要素",pages:"145-199",tasks:["5.5 障碍物跟踪：单目标、多目标、深度学习跟踪","5.6 传感器融合：数据级与任务级","5.7-5.10：车道线、交通标志、信号灯、可驾驶区域","输出：用 ROS 2 话题画一条感知数据流","周测：数据级融合与任务级融合的适用场景"]},
  {focus:"双目、人体姿态、DMS与BEV",pages:"200-249",tasks:["5.11 双目视觉：立体匹配、在线标定、视差估计","5.12-5.13：人体姿态估计与驾驶人监控","5.14：IPM、深度、MLP、Transformer BEV","输出：比较单目、双目、激光雷达的深度来源","阶段测验：感知模块10题闭卷测试"]},
  {focus:"高精地图与定位",pages:"250-302",tasks:["第6章：高清地图、语义地图、车道线地图、SLAM","第7章：车道线、激光雷达与融合定位","重点：正态分布变换、粒子滤波、直方图滤波","输出：画 map→odom→base_link→sensor TF树","周测：定位模块输入、输出与失效表现"]},
  {focus:"预测与规划",pages:"303-349",tasks:["8.1：基本规划、Frenet坐标系、EM规划器","8.2-8.4：车辆/行人预测、行为学习与博弈","输出：区分路线、路径、轨迹、行为规划","工程映射：对应 Autoware Planning 相关话题","周测：规划为何需要预测模块"]},
  {focus:"车辆控制 + 仿真前半",pages:"350-405",tasks:["第9章：运动学/动力学、PID、LQR、MPC","理解路径稳定控制与轨迹稳定控制","第10章 10.1-10.4：传感器、交通、车辆与可视化模型","输出：解释 MPC Planner 的输入与输出","周测：为什么轨迹控制通常比单纯路径控制信息更多"]},
  {focus:"场景仿真、数字孪生与安全",pages:"406-446",tasks:["10.5-10.7：道路仿真、场景库、OpenSCENARIO、数字孪生","第11章：NHTSA、ISO 26262、SOTIF、RSS、网络安全","工程映射：MCAP→场景包→复现→Issue闭环","输出：制定一个≤20秒 failcase 场景验收清单","周测：功能安全与预期功能安全的区别"]},
  {focus:"泊车与车联网（选择性精读）",pages:"447-501",tasks:["第12章：环视标定、鱼眼感知、泊车规划与融合","第13章：V2X、边缘计算、车路协同与编队","输出：比较道路自动驾驶与低速泊车的传感器重点","输出：画出车—路—云协同数据链路","周测：边缘计算为什么适合车联网"]},
  {focus:"NeRF、扩散模型与全书整合",pages:"502-550",tasks:["第14章：NeRF原理、加速、动态场景、重打光与泛化","第15章：DDIM、SDE、图像/视频生成与新视图合成","只建立概念地图，不要求推导全部公式","结课输出：一张完整自动驾驶系统架构图","结课答辩：10分钟讲清数据从采集到车辆执行的全过程"]}
];

const defaultState = {settings:{startDate:"2026-08-01",dailyMinutes:"45",studyDays:"5",theme:"light"},completedTasks:{},logs:[]};
let state = loadState();

function loadState(){
  try{
    const saved=JSON.parse(localStorage.getItem("adReadingSystemV1"));
    return saved?{...defaultState,...saved,settings:{...defaultState.settings,...(saved.settings||{})}}:structuredClone(defaultState);
  }catch(e){return structuredClone(defaultState);}
}
function persist(){localStorage.setItem("adReadingSystemV1",JSON.stringify(state));refreshAll();}
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function fmtDate(d){const x=new Date(d);if(Number.isNaN(x.getTime()))return"";return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`;}
function addDays(dateStr,n){const d=new Date(dateStr+"T12:00:00");d.setDate(d.getDate()+n);return fmtDate(d);}
function daysDiff(a,b){return Math.floor((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/86400000);}
function weekDates(i){const start=addDays(state.settings.startDate,i*7);return `${start} 至 ${addDays(start,6)}`;}
function currentWeekIndex(){const diff=daysDiff(state.settings.startDate,fmtDate(new Date()));if(diff<0)return 0;return Math.min(11,Math.floor(diff/7));}
function renderWeeks(){
  const root=document.getElementById("weeks");
  root.innerHTML=weekPlan.map((w,wi)=>{
    const done=w.tasks.filter((_,ti)=>state.completedTasks[`${wi}-${ti}`]).length;
    const pct=Math.round(done/w.tasks.length*100);
    return `<article class="card week-card"><div class="week-head"><div><span class="badge">第 ${wi+1} 周</span><h3>${esc(w.focus)}</h3></div><span class="week-range">${weekDates(wi)}</span></div><div class="week-focus">书内页码：${w.pages}</div><div class="task-list">${w.tasks.map((t,ti)=>{const id=`task-${wi}-${ti}`,key=`${wi}-${ti}`;return `<div class="task"><input id="${id}" type="checkbox" ${state.completedTasks[key]?"checked":""} onchange="toggleTask('${key}',this.checked)"/><label for="${id}">${esc(t)}</label></div>`;}).join("")}</div><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div><div class="muted small" style="margin-top:5px">${done}/${w.tasks.length} 项完成 · ${pct}%</div></article>`;
  }).join("");
}
function toggleTask(key,checked){if(checked)state.completedTasks[key]=true;else delete state.completedTasks[key];persist();}
function renderToday(){
  const wi=currentWeekIndex(),w=weekPlan[wi],today=fmtDate(new Date()),diff=Math.max(0,daysDiff(state.settings.startDate,today)),dayInWeek=diff%7;
  const taskIndex=Math.min(w.tasks.length-1,Math.floor(dayInWeek/(7/w.tasks.length)));
  const pending=w.tasks.findIndex((_,ti)=>!state.completedTasks[`${wi}-${ti}`]);
  const chosen=pending>=0?pending:taskIndex;
  document.getElementById("todayTask").innerHTML=`<strong>第 ${wi+1} 周 · ${esc(w.focus)}</strong><div style="font-size:20px;margin:6px 0">${esc(w.tasks[chosen])}</div><div class="chips"><span class="chip">页码 ${w.pages}</span><span class="chip">${state.settings.dailyMinutes} 分钟</span><span class="chip">${dayInWeek===6?"周复盘日":"阅读 + 工程映射"}</span></div>`;
}
function populateChapters(){document.getElementById("chapter").innerHTML=chapters.map((c,i)=>`<option value="${i}">${c[0]}（${c[1]}-${c[2]}页）</option>`).join("");}
function scoreNow(){return Math.round([...document.querySelectorAll(".score-input")].reduce((s,e)=>s+Number(e.value),0)/25*100);}
function outcome(score){if(score>=80)return{cls:"ok",title:"通过：可以继续",next:"明天先闭卷回忆5分钟；7天后抽查一次。",days:7};if(score>=60)return{cls:"warn",title:"基本理解：48小时内复习",next:"重画输入—处理—输出，并只回看卡住的小节。",days:2};return{cls:"bad",title:"暂未掌握：24小时内重学",next:"缩小到一个概念，补前置知识并举一个工程实例。",days:1};}
function updateOutputs(){document.querySelectorAll(".score-input").forEach(e=>e.nextElementSibling.value=e.value);const s=scoreNow(),o=outcome(s),box=document.getElementById("liveFeedback");box.className=`feedback ${o.cls}`;box.innerHTML=`<strong>${s}分 · ${o.title}</strong><br><span>${o.next}</span>`;}
function saveLog(){
  const topic=document.getElementById("topic").value.trim(),summary=document.getElementById("summary").value.trim();
  if(!topic||!summary){toast("请至少填写“本次主题”和“自己的话复述”");return;}
  const ci=Number(document.getElementById("chapter").value),score=scoreNow(),o=outcome(score),date=document.getElementById("logDate").value||fmtDate(new Date());
  state.logs.unshift({id:Date.now(),date,chapterIndex:ci,chapter:chapters[ci][0],minutes:Number(document.getElementById("minutes").value||0),pageFrom:document.getElementById("pageFrom").value,pageTo:document.getElementById("pageTo").value,topic,summary,keypoints:document.getElementById("keypoints").value.trim(),mapping:document.getElementById("mapping").value.trim(),question:document.getElementById("question").value.trim(),scores:[1,2,3,4,5].map(i=>Number(document.getElementById("s"+i).value)),score,feedback:o.title,reviewDate:addDays(date,o.days),reviewed:false});
  persist();toast("已保存，并加入自适应复习计划");
}
function clearForm(){["topic","summary","keypoints","mapping","question","pageFrom","pageTo"].forEach(id=>document.getElementById(id).value="");}
function deleteLog(id){if(!confirm("确认删除这条记录？"))return;state.logs=state.logs.filter(x=>x.id!==id);persist();}
function markReviewed(id){const log=state.logs.find(x=>x.id===id);if(log){log.reviewed=true;persist();toast("已完成复习");}}
function renderHistory(){
  const body=document.getElementById("historyBody");
  if(!state.logs.length){body.innerHTML=`<tr><td colspan="7" class="muted">还没有记录。完成一次学习后从上方提交。</td></tr>`;return;}
  body.innerHTML=state.logs.map(l=>{const o=outcome(l.score);return `<tr><td>${esc(l.date)}</td><td><strong>${esc(l.chapter)}</strong><br>${esc(l.topic)}</td><td>${l.pageFrom||"?"}-${l.pageTo||"?"}</td><td>${l.minutes}分钟</td><td><span class="badge ${o.cls}">${l.score}</span></td><td>${esc(l.feedback)}<br><span class="muted small">复习：${l.reviewDate}</span></td><td><button class="danger" onclick="deleteLog(${l.id})">删除</button></td></tr>`;}).join("");
}
function renderQueue(){
  const root=document.getElementById("reviewQueue"),q=state.logs.filter(l=>!l.reviewed).sort((a,b)=>a.reviewDate.localeCompare(b.reviewDate));
  if(!q.length){root.innerHTML=`<div class="muted">当前没有待复习内容。新记录会按自检分数自动加入。</div>`;return;}
  const today=fmtDate(new Date());
  root.innerHTML=q.map(l=>{const overdue=l.reviewDate<today,cls=l.score>=80?"ok":l.score>=60?"warn":"bad";return `<div class="queue-item"><div><span class="badge ${overdue?"bad":cls}">${overdue?"已到期":l.reviewDate}</span></div><div><strong>${esc(l.topic)}</strong><br><span class="muted small">${esc(l.chapter)} · 上次 ${l.score}分</span></div><button class="secondary" onclick="markReviewed(${l.id})">完成复习</button></div>`;}).join("");
}
function refreshStats(){const total=weekPlan.reduce((s,w)=>s+w.tasks.length,0),done=Object.keys(state.completedTasks).length;document.getElementById("overallProgress").textContent=Math.round(done/total*100)+"%";document.getElementById("studyMinutes").textContent=state.logs.reduce((s,l)=>s+l.minutes,0);document.getElementById("avgScore").textContent=state.logs.length?Math.round(state.logs.reduce((s,l)=>s+l.score,0)/state.logs.length):"--";document.getElementById("reviewCount").textContent=state.logs.filter(l=>!l.reviewed).length;}
function refreshAll(){document.documentElement.dataset.theme=state.settings.theme;document.getElementById("startDate").value=state.settings.startDate;document.getElementById("dailyMinutes").value=state.settings.dailyMinutes;document.getElementById("studyDays").value=state.settings.studyDays;renderToday();renderWeeks();renderHistory();renderQueue();refreshStats();updateOutputs();}
function bindSettings(){["startDate","dailyMinutes","studyDays"].forEach(id=>document.getElementById(id).addEventListener("change",e=>{state.settings[id]=e.target.value;persist();}));}
function toggleTheme(){state.settings.theme=state.settings.theme==="dark"?"light":"dark";persist();}
function exportData(){downloadBlob(new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),`自动驾驶阅读系统备份_${fmtDate(new Date())}.json`);}
function importData(ev){const file=ev.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);if(!data.settings||!Array.isArray(data.logs))throw new Error();state=data;persist();toast("备份已导入");}catch(e){alert("导入失败：文件格式不正确。");}};r.readAsText(file);ev.target.value="";}
function downloadBlob(blob,name){const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
function latestLogText(){const l=state.logs[0];if(!l)return"尚无学习记录。";return `日期：${l.date}\n章节：${l.chapter}\n主题：${l.topic}\n页码：${l.pageFrom||"?"}-${l.pageTo||"?"}\n自检分：${l.score}\n我的复述：${l.summary}\n3个关键点：${l.keypoints||"未填写"}\n工程映射：${l.mapping||"未填写"}\n未解决问题：${l.question||"未填写"}`;}
async function copyAIPrompt(){const prompt=`你是我的自动驾驶学习教练。下面是我阅读《自动驾驶系统开发》的最新记录：\n\n${latestLogText()}\n\n请完成：\n1. 判断我的理解中是否有概念错误或表达含糊；\n2. 用不超过200字补全最关键的知识；\n3. 出3道闭卷题：基础解释题、工程映射题、故障分析题各1道；\n4. 暂时不要给答案，等我回答后再评分；\n5. 评分时重点检查我能否对应到 ROS 2、Autoware、传感器输入输出和数据流。`;try{await navigator.clipboard.writeText(prompt);toast("提示词已复制");}catch(e){promptFallback(prompt);}}
function promptFallback(text){const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();toast("提示词已复制");}
function exportMarkdown(){const lines=["# 《自动驾驶系统开发》学习记录","",`- 导出日期：${fmtDate(new Date())}`,`- 计划完成度：${document.getElementById("overallProgress").textContent}`,`- 平均自检分：${document.getElementById("avgScore").textContent}`,`- 累计学习：${document.getElementById("studyMinutes").textContent} 分钟`,"","## 历史记录",""];state.logs.forEach(l=>{lines.push(`### ${l.date}｜${l.chapter}｜${l.topic}`,"",`- 页码：${l.pageFrom||"?"}-${l.pageTo||"?"}`,`- 时长：${l.minutes} 分钟`,`- 自检分：${l.score}`,`- 复习日期：${l.reviewDate}`,"","#### 我的复述","",l.summary||"未填写","","#### 关键点","",l.keypoints||"未填写","","#### 工程映射","",l.mapping||"未填写","","#### 未解决问题","",l.question||"未填写","");});downloadBlob(new Blob([lines.join("\n")],{type:"text/markdown;charset=utf-8"}),`自动驾驶学习报告_${fmtDate(new Date())}.md`);}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200);}
function init(){populateChapters();document.getElementById("logDate").value=fmtDate(new Date());bindSettings();refreshAll();}
init();
