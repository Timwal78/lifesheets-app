var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=e((()=>{}));function r(){return{version:2,profile:{name:``,streak:0,totalPoints:0},habits:[],goals:[],budget:{income:[],expenses:[],savingsGoal:0},fitness:{workouts:[],measurements:[]},resume:{sections:{}},coverLetter:{letters:[]},linkedin:{sections:{}},businessPlan:{canvas:{}},marketing:{campaigns:[]},calendar:{posts:[]},kanban:{todo:[],doing:[],done:[]},lastUpdated:null}}function i(){try{let e=localStorage.getItem(l);if(!e)return r();let t=JSON.parse(e);return{...r(),...t}}catch(e){return console.error(`LifeSheets: load error`,e),r()}}function a(e){try{e.lastUpdated=new Date().toISOString(),localStorage.setItem(l,JSON.stringify(e))}catch(e){console.error(`LifeSheets: save error`,e)}}function o(e){clearTimeout(u),u=setTimeout(()=>a(e),400)}function s(e){let t=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`LifeSheets_Backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}function c(e){return new Promise((t,n)=>{let i=new FileReader;i.onload=e=>{try{let n=JSON.parse(e.target.result);t({...r(),...n})}catch(e){n(e)}},i.onerror=()=>n(Error(`File read error`)),i.readAsText(e)})}var l,u,d=e((()=>{l=`lifesheets_v2`,u=null})),f=t((()=>{n(),d();var e={data:i(),screen:`home`,tab:`home`,module:null},t={dashboard:{icon:`📊`,name:`Command Center`,desc:`Stats, rank & streak overview`,tab:`home`,badge:``},goals:{icon:`🎯`,name:`Goal Decomposer`,desc:`Break big goals into daily wins`,tab:`home`,badge:``},habits:{icon:`🔥`,name:`Habit Streaks`,desc:`Daily habits with streak heatmap`,tab:`track`,badge:`NEW`},budget:{icon:`💰`,name:`Budget Tracker`,desc:`Income, expenses & net worth`,tab:`track`,badge:`NEW`},fitness:{icon:`💪`,name:`Fitness Log`,desc:`Workouts, PRs & measurements`,tab:`track`,badge:`NEW`},resume:{icon:`📄`,name:`Resume Builder`,desc:`Build a recruiter-grade resume`,tab:`career`,badge:``},coverletter:{icon:`✉️`,name:`Cover Letter`,desc:`Job-specific cover letters`,tab:`career`,badge:``},linkedin:{icon:`💼`,name:`LinkedIn Pro`,desc:`Optimize your profile`,tab:`career`,badge:``},businessplan:{icon:`🏗️`,name:`Business Plan`,desc:`Lean canvas & financial model`,tab:`build`,badge:``},marketing:{icon:`📣`,name:`Marketing Lab`,desc:`Ad copy & SEO keywords`,tab:`build`,badge:``},calendar:{icon:`📅`,name:`Content Calendar`,desc:`Plan your social posting`,tab:`build`,badge:`NEW`},kanban:{icon:`📋`,name:`Project Board`,desc:`Kanban task management`,tab:`build`,badge:`NEW`}},r=[{id:`home`,icon:`🏠`,label:`Home`},{id:`track`,icon:`📊`,label:`Track`},{id:`career`,icon:`💼`,label:`Career`},{id:`build`,icon:`🚀`,label:`Build`}];function l(e){let t=document.querySelector(`.toast`);t&&t.remove(),t=document.createElement(`div`),t.className=`toast`,t.textContent=e,document.body.appendChild(t),requestAnimationFrame(()=>t.classList.add(`show`)),setTimeout(()=>{t.classList.remove(`show`),setTimeout(()=>t.remove(),300)},2500)}function u(){a(e.data)}function f(){let t=document.getElementById(`app`);t.innerHTML=`
    ${p()}
    <div class="screen active">
      ${e.screen===`home`?m():h(e.module)}
    </div>
    ${D()}
  `,O()}function p(){return`
    <div class="header">
      <div class="header-logo">
        <span class="logo-icon">⚡</span>
        <div>
          <h1>LifeSheets</h1>
          <div class="header-sub">by ScriptMasterLabs</div>
        </div>
      </div>
      <div class="header-actions">
        <button class="icon-btn" id="btn-export" title="Export">💾</button>
        <button class="icon-btn" id="btn-import" title="Import">📂</button>
        <input type="file" id="import-file" accept=".json" style="display:none">
      </div>
    </div>
  `}function m(){let n=Object.entries(t).filter(([,t])=>t.tab===e.tab),i=k(),a=e.data.profile.name||`Operator`,o=``;if(e.tab===`home`){let t=e.data.habits.length,n=new Date().toISOString().slice(0,10),r=e.data.habits.filter(e=>e.log&&e.log[n]).length,i=b(),a=A(e.data.profile.totalPoints||0);o=`
      <div class="section">
        <div class="stats-row">
          <div class="stat-card rank-card">
            <span class="rank-emoji">${a.emoji}</span>
            <div class="stat-value">${a.name}</div>
            <div class="stat-label">${e.data.profile.totalPoints||0} XP</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${i}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${r}/${t}</div>
            <div class="stat-label">Today</div>
          </div>
        </div>
      </div>
    `}return`
    <div style="padding-top:12px">
      <div class="section">
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:4px">${i},</p>
        <h2 style="font-size:22px;font-weight:800;margin-bottom:0">${a}</h2>
      </div>

      ${o}

      <div class="section">
        <div class="section-title">${r.find(t=>t.id===e.tab).icon} ${r.find(t=>t.id===e.tab).label} Modules</div>
        <div class="module-grid">
          ${n.map(([e,t])=>`
            <div class="module-card" data-module="${e}">
              ${t.badge?`<span class="module-badge badge-new">${t.badge}</span>`:``}
              <div class="module-icon">${t.icon}</div>
              <div class="module-name">${t.name}</div>
              <div class="module-desc">${t.desc}</div>
            </div>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function h(e){switch(e){case`dashboard`:return g();case`goals`:return x();case`habits`:return _();case`budget`:return S();case`fitness`:return C();case`resume`:return w(`resume`,`Resume Builder`,`📄`,[`Summary`,`Experience`,`Education`,`Skills`,`Certifications`]);case`coverletter`:return w(`coverLetter`,`Cover Letter`,`✉️`,[`Company`,`Position`,`Opening`,`Body`,`Closing`]);case`linkedin`:return w(`linkedin`,`LinkedIn Pro`,`💼`,[`Headline`,`About`,`Experience`,`Skills`,`Featured`]);case`businessplan`:return w(`businessPlan`,`Business Plan`,`🏗️`,[`Problem`,`Solution`,`Market`,`Revenue Model`,`Team`,`Financial Projections`]);case`marketing`:return w(`marketing`,`Marketing Lab`,`📣`,[`Target Audience`,`Value Proposition`,`Ad Headlines`,`Ad Body Copy`,`SEO Keywords`,`A/B Variants`]);case`calendar`:return T();case`kanban`:return E();default:return`<div class="empty-state"><div class="empty-icon">🚧</div><p>Module coming soon</p></div>`}}function g(){let t=A(e.data.profile.totalPoints||0),n=b(),r=e.data.habits.length,i=e.data.goals.length,a=(e.data.kanban.done||[]).length;return`
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">📊</span> COMMAND CENTER</div>
      <div class="stats-row">
        <div class="stat-card rank-card">
          <span class="rank-emoji">${t.emoji}</span>
          <div class="stat-value">${t.name}</div>
          <div class="stat-label">${e.data.profile.totalPoints||0} XP — Next: ${t.next}</div>
        </div>
        <div class="stat-card"><div class="stat-value">${n}</div><div class="stat-label">Day Streak</div></div>
        <div class="stat-card"><div class="stat-value">${r}</div><div class="stat-label">Habits</div></div>
        <div class="stat-card"><div class="stat-value">${i}</div><div class="stat-label">Goals</div></div>
        <div class="stat-card"><div class="stat-value">${a}</div><div class="stat-label">Tasks Done</div></div>
      </div>
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">👤</span> OPERATOR PROFILE</div>
      <div class="form-group">
        <label class="form-label">Call Sign</label>
        <input class="input-field" id="profile-name" value="${e.data.profile.name||``}" placeholder="Enter your name...">
      </div>
    </div>
  `}function _(){let t=new Date().toISOString().slice(0,10),n=e.data.habits||[];return`
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">🔥</span> HABIT STREAKS</div>
      ${n.length===0?`
        <div class="empty-state">
          <div class="empty-icon">🔥</div>
          <p>No habits yet. Start building consistency.</p>
        </div>
      `:n.map((e,n)=>{let r=e.log&&e.log[t],i=y(e);return`
          <div class="list-item">
            <div class="list-item-check ${r?`checked`:``}" data-habit-toggle="${n}">${r?`✓`:``}</div>
            <div class="list-item-content">
              <div class="list-item-title ${r?`completed`:``}">${e.name}</div>
              <div class="list-item-meta">🔥 ${i} day streak</div>
            </div>
            <div class="list-item-actions">
              <button class="list-item-delete" data-habit-delete="${n}">✕</button>
            </div>
          </div>
        `}).join(``)}
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">➕</span> ADD HABIT</div>
      <div style="display:flex;gap:8px">
        <input class="input-field" id="new-habit-name" placeholder="e.g. Meditate 10 min">
        <button class="btn btn-primary btn-sm" id="btn-add-habit" style="width:auto;white-space:nowrap">+ Add</button>
      </div>
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">📅</span> LAST 28 DAYS</div>
      <div class="heatmap-labels"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
      <div class="heatmap-grid">
        ${v()}
      </div>
    </div>
  `}function v(){let t=[],n=e.data.habits||[];for(let e=27;e>=0;e--){let r=new Date;r.setDate(r.getDate()-e);let i=r.toISOString().slice(0,10),a=n.filter(e=>e.log&&e.log[i]).length,o=a/(n.length||1),s=o===0?``:o<=.25?`level-1`:o<=.5?`level-2`:o<=.75?`level-3`:`level-4`;t.push(`<div class="heatmap-cell ${s}" title="${i}: ${a}/${n.length}"></div>`)}return t.join(``)}function y(e){let t=0,n=new Date;for(let r=0;r<365;r++){let r=n.toISOString().slice(0,10);if(e.log&&e.log[r])t++,n.setDate(n.getDate()-1);else break}return t}function b(){let t=e.data.habits||[];if(t.length===0)return 0;let n=0,r=new Date;for(let e=0;e<365;e++){let e=r.toISOString().slice(0,10);if(t.every(t=>t.log&&t.log[e]))n++,r.setDate(r.getDate()-1);else break}return n}function x(){let t=e.data.goals||[];return`
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">🎯</span> GOAL DECOMPOSER</div>
      ${t.length===0?`
        <div class="empty-state">
          <div class="empty-icon">🎯</div>
          <p>Break big goals into daily wins.</p>
        </div>
      `:t.map((e,t)=>`
        <div class="list-item">
          <div class="list-item-check ${e.done?`checked`:``}" data-goal-toggle="${t}">${e.done?`✓`:``}</div>
          <div class="list-item-content">
            <div class="list-item-title ${e.done?`completed`:``}">${e.text}</div>
            <div class="list-item-meta"><span class="tag tag-${e.level===`annual`?`gold`:e.level===`monthly`?`cyan`:`green`}">${e.level}</span></div>
          </div>
          <div class="list-item-actions">
            <button class="list-item-delete" data-goal-delete="${t}">✕</button>
          </div>
        </div>
      `).join(``)}
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">➕</span> ADD GOAL</div>
      <div class="form-group">
        <input class="input-field" id="new-goal-text" placeholder="What's the goal?">
      </div>
      <div class="form-group">
        <select class="select-field" id="new-goal-level">
          <option value="annual">🏆 Annual</option>
          <option value="monthly">📅 Monthly</option>
          <option value="weekly">📋 Weekly</option>
          <option value="daily" selected>🎯 Daily</option>
        </select>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-add-goal" style="margin-top:8px">+ Add Goal</button>
    </div>
  `}function S(){let t=e.data.budget||{income:[],expenses:[],savingsGoal:0},n=t.income.reduce((e,t)=>e+(t.amount||0),0),r=t.expenses.reduce((e,t)=>e+(t.amount||0),0),i=n-r;return`
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">💰</span> BUDGET TRACKER</div>
      <div class="budget-summary">
        <div class="budget-summary-card"><div class="budget-summary-value income-text">$${n.toLocaleString()}</div><div class="budget-summary-label">Income</div></div>
        <div class="budget-summary-card"><div class="budget-summary-value expense-text">$${r.toLocaleString()}</div><div class="budget-summary-label">Expenses</div></div>
        <div class="budget-summary-card"><div class="budget-summary-value net-text">$${i.toLocaleString()}</div><div class="budget-summary-label">Net</div></div>
      </div>
      ${n>0?`<div class="budget-bar"><div class="budget-bar-fill expense" style="width:${Math.min(100,r/n*100)}%"></div></div><p style="font-size:11px;color:var(--text-muted);margin-top:4px">${Math.round(r/n*100)}% spend rate</p>`:``}
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">📈</span> INCOME</div>
      ${t.income.map((e,t)=>`<div class="list-item"><div class="list-item-content"><div class="list-item-title">${e.label}</div><div class="list-item-meta income-text">+$${e.amount.toLocaleString()}</div></div><button class="list-item-delete" data-income-delete="${t}">✕</button></div>`).join(``)}
      <div style="display:flex;gap:8px;margin-top:8px">
        <input class="input-field" id="income-label" placeholder="Source" style="flex:1">
        <input class="input-field" id="income-amount" placeholder="$" type="number" style="width:100px">
        <button class="btn btn-primary btn-sm" id="btn-add-income" style="width:auto">+</button>
      </div>
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">📉</span> EXPENSES</div>
      ${t.expenses.map((e,t)=>`<div class="list-item"><div class="list-item-content"><div class="list-item-title">${e.label}</div><div class="list-item-meta expense-text">-$${e.amount.toLocaleString()}</div></div><button class="list-item-delete" data-expense-delete="${t}">✕</button></div>`).join(``)}
      <div style="display:flex;gap:8px;margin-top:8px">
        <input class="input-field" id="expense-label" placeholder="Category" style="flex:1">
        <input class="input-field" id="expense-amount" placeholder="$" type="number" style="width:100px">
        <button class="btn btn-primary btn-sm" id="btn-add-expense" style="width:auto">+</button>
      </div>
    </div>
  `}function C(){let t=e.data.fitness||{workouts:[],measurements:[]};return`
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">💪</span> FITNESS LOG</div>
      ${t.workouts.length===0?`<div class="empty-state"><div class="empty-icon">🏋️</div><p>Log your first workout</p></div>`:t.workouts.slice(-10).reverse().map((e,n)=>`
          <div class="list-item">
            <div class="list-item-content">
              <div class="list-item-title">${e.exercise}</div>
              <div class="list-item-meta">${e.sets}×${e.reps} @ ${e.weight}lbs — ${e.date}</div>
            </div>
            <button class="list-item-delete" data-workout-delete="${t.workouts.length-1-n}">✕</button>
          </div>
        `).join(``)}
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">➕</span> LOG WORKOUT</div>
      <div class="form-group"><input class="input-field" id="fit-exercise" placeholder="Exercise name"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Sets</label><input class="input-field" id="fit-sets" type="number" placeholder="3"></div>
        <div class="form-group"><label class="form-label">Reps</label><input class="input-field" id="fit-reps" type="number" placeholder="10"></div>
      </div>
      <div class="form-group"><label class="form-label">Weight (lbs)</label><input class="input-field" id="fit-weight" type="number" placeholder="135"></div>
      <button class="btn btn-primary btn-sm" id="btn-add-workout" style="margin-top:8px">+ Log Workout</button>
    </div>
  `}function w(t,n,r,i){let a=e.data[t]?.sections||{};return`
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">${r}</span> ${n.toUpperCase()}</div>
      ${i.map(e=>`
        <div class="form-group">
          <label class="form-label">${e}</label>
          <textarea class="textarea-field" data-text-field="${t}:${e}" placeholder="Enter your ${e.toLowerCase()}...">${a[e]||``}</textarea>
        </div>
      `).join(``)}
      <button class="btn btn-primary btn-sm" id="btn-save-text" data-text-key="${t}" style="margin-top:8px">💾 Save</button>
    </div>
  `}function T(){let t=e.data.calendar?.posts||[];return`
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">📅</span> CONTENT CALENDAR</div>
      ${t.length===0?`<div class="empty-state"><div class="empty-icon">📅</div><p>Plan your content. Stay consistent.</p></div>`:t.sort((e,t)=>e.date.localeCompare(t.date)).map((e,t)=>`
          <div class="list-item">
            <div class="list-item-check ${e.posted?`checked`:``}" data-post-toggle="${t}">${e.posted?`✓`:``}</div>
            <div class="list-item-content">
              <div class="list-item-title ${e.posted?`completed`:``}">${e.title}</div>
              <div class="list-item-meta">${e.platform} — ${e.date}</div>
            </div>
            <button class="list-item-delete" data-post-delete="${t}">✕</button>
          </div>
        `).join(``)}
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">➕</span> SCHEDULE POST</div>
      <div class="form-group"><input class="input-field" id="post-title" placeholder="Post topic"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Platform</label>
          <select class="select-field" id="post-platform"><option>X/Twitter</option><option>Instagram</option><option>LinkedIn</option><option>TikTok</option><option>YouTube</option><option>Discord</option></select>
        </div>
        <div class="form-group"><label class="form-label">Date</label><input class="input-field" id="post-date" type="date" value="${new Date().toISOString().slice(0,10)}"></div>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-add-post" style="margin-top:8px">+ Schedule</button>
    </div>
  `}function E(){let t=e.data.kanban||{todo:[],doing:[],done:[]},n=(e,t,n,r)=>`
    <div class="kanban-column">
      <div class="kanban-col-title" style="color:${r}">${e} <span class="kanban-col-count">${t.length}</span></div>
      ${t.map((e,t)=>`
        <div class="kanban-card" data-kanban-move="${n}:${t}">
          ${e.text}
          <div class="kanban-card-meta">${e.date||``}</div>
        </div>
      `).join(``)}
    </div>
  `;return`
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">📋</span> PROJECT BOARD</div>
      <div class="kanban-board">
        ${n(`TO DO`,t.todo,`todo`,`var(--text-secondary)`)}
        ${n(`DOING`,t.doing,`doing`,`var(--cyan)`)}
        ${n(`DONE`,t.done,`done`,`var(--accent)`)}
      </div>
    </div>
    <div class="widget">
      <div style="display:flex;gap:8px">
        <input class="input-field" id="kanban-text" placeholder="New task...">
        <button class="btn btn-primary btn-sm" id="btn-add-task" style="width:auto">+ Add</button>
      </div>
    </div>
  `}function D(){return`
    <nav class="bottom-nav">
      ${r.map(t=>`
        <button class="nav-item ${e.tab===t.id?`active`:``}" data-tab="${t.id}">
          <span>${t.icon}</span>
          <span>${t.label}</span>
        </button>
      `).join(``)}
    </nav>
  `}function O(){document.querySelectorAll(`[data-tab]`).forEach(t=>{t.addEventListener(`click`,()=>{e.tab=t.dataset.tab,e.screen=`home`,e.module=null,f()})}),document.querySelectorAll(`[data-module]`).forEach(t=>{t.addEventListener(`click`,()=>{e.screen=`module`,e.module=t.dataset.module,f()})}),document.querySelectorAll(`[data-back]`).forEach(t=>{t.addEventListener(`click`,()=>{e.screen=`home`,e.module=null,f()})});let t=document.getElementById(`btn-export`);t&&t.addEventListener(`click`,()=>{s(e.data),l(`Data exported ✓`)});let n=document.getElementById(`btn-import`),r=document.getElementById(`import-file`);n&&n.addEventListener(`click`,()=>r.click()),r&&r.addEventListener(`change`,async t=>{let n=t.target.files[0];n&&(e.data=await c(n),u(),f(),l(`Data imported ✓`))});let i=document.getElementById(`profile-name`);i&&i.addEventListener(`input`,t=>{e.data.profile.name=t.target.value,o(e.data)}),document.querySelectorAll(`[data-habit-toggle]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.habitToggle),r=e.data.habits[n];r.log||={};let i=new Date().toISOString().slice(0,10);r.log[i]=!r.log[i],r.log[i]&&(e.data.profile.totalPoints=(e.data.profile.totalPoints||0)+10),u(),f(),r.log[i]&&l(`🔥 +10 XP — Habit completed!`)})}),document.querySelectorAll(`[data-habit-delete]`).forEach(t=>{t.addEventListener(`click`,()=>{e.data.habits.splice(parseInt(t.dataset.habitDelete),1),u(),f()})});let a=document.getElementById(`btn-add-habit`);a&&a.addEventListener(`click`,()=>{let t=document.getElementById(`new-habit-name`).value.trim();t&&(e.data.habits.push({name:t,log:{}}),u(),f(),l(`Habit "${t}" added ✓`))}),document.querySelectorAll(`[data-goal-toggle]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.goalToggle);e.data.goals[n].done=!e.data.goals[n].done,e.data.goals[n].done&&(e.data.profile.totalPoints=(e.data.profile.totalPoints||0)+25),u(),f()})}),document.querySelectorAll(`[data-goal-delete]`).forEach(t=>{t.addEventListener(`click`,()=>{e.data.goals.splice(parseInt(t.dataset.goalDelete),1),u(),f()})});let d=document.getElementById(`btn-add-goal`);d&&d.addEventListener(`click`,()=>{let t=document.getElementById(`new-goal-text`).value.trim(),n=document.getElementById(`new-goal-level`).value;t&&(e.data.goals.push({text:t,level:n,done:!1}),u(),f(),l(`Goal added ✓`))});let p=document.getElementById(`btn-add-income`);p&&p.addEventListener(`click`,()=>{let t=document.getElementById(`income-label`).value.trim(),n=parseFloat(document.getElementById(`income-amount`).value)||0;!t||!n||(e.data.budget||(e.data.budget={income:[],expenses:[],savingsGoal:0}),e.data.budget.income.push({label:t,amount:n}),u(),f(),l(`Income added ✓`))});let m=document.getElementById(`btn-add-expense`);m&&m.addEventListener(`click`,()=>{let t=document.getElementById(`expense-label`).value.trim(),n=parseFloat(document.getElementById(`expense-amount`).value)||0;!t||!n||(e.data.budget||(e.data.budget={income:[],expenses:[],savingsGoal:0}),e.data.budget.expenses.push({label:t,amount:n}),u(),f(),l(`Expense added ✓`))}),document.querySelectorAll(`[data-income-delete]`).forEach(t=>{t.addEventListener(`click`,()=>{e.data.budget.income.splice(parseInt(t.dataset.incomeDelete),1),u(),f()})}),document.querySelectorAll(`[data-expense-delete]`).forEach(t=>{t.addEventListener(`click`,()=>{e.data.budget.expenses.splice(parseInt(t.dataset.expenseDelete),1),u(),f()})});let h=document.getElementById(`btn-add-workout`);h&&h.addEventListener(`click`,()=>{let t=document.getElementById(`fit-exercise`).value.trim(),n=parseInt(document.getElementById(`fit-sets`).value)||0,r=parseInt(document.getElementById(`fit-reps`).value)||0,i=parseFloat(document.getElementById(`fit-weight`).value)||0;t&&(e.data.fitness||(e.data.fitness={workouts:[],measurements:[]}),e.data.fitness.workouts.push({exercise:t,sets:n,reps:r,weight:i,date:new Date().toISOString().slice(0,10)}),e.data.profile.totalPoints=(e.data.profile.totalPoints||0)+15,u(),f(),l(`💪 +15 XP — Workout logged!`))}),document.querySelectorAll(`[data-workout-delete]`).forEach(t=>{t.addEventListener(`click`,()=>{e.data.fitness.workouts.splice(parseInt(t.dataset.workoutDelete),1),u(),f()})});let g=document.getElementById(`btn-save-text`);g&&g.addEventListener(`click`,()=>{let t=g.dataset.textKey;e.data[t]||(e.data[t]={sections:{}}),document.querySelectorAll(`[data-text-field^="${t}:"]`).forEach(n=>{let r=n.dataset.textField.split(`:`)[1];e.data[t].sections[r]=n.value}),u(),l(`${t} saved ✓`)}),document.querySelectorAll(`[data-post-toggle]`).forEach(t=>{t.addEventListener(`click`,()=>{let n=parseInt(t.dataset.postToggle);e.data.calendar.posts[n].posted=!e.data.calendar.posts[n].posted,e.data.calendar.posts[n].posted&&(e.data.profile.totalPoints=(e.data.profile.totalPoints||0)+5),u(),f()})}),document.querySelectorAll(`[data-post-delete]`).forEach(t=>{t.addEventListener(`click`,()=>{e.data.calendar.posts.splice(parseInt(t.dataset.postDelete),1),u(),f()})});let _=document.getElementById(`btn-add-post`);_&&_.addEventListener(`click`,()=>{let t=document.getElementById(`post-title`).value.trim(),n=document.getElementById(`post-platform`).value,r=document.getElementById(`post-date`).value;t&&(e.data.calendar||(e.data.calendar={posts:[]}),e.data.calendar.posts.push({title:t,platform:n,date:r,posted:!1}),u(),f(),l(`Post scheduled ✓`))}),document.querySelectorAll(`[data-kanban-move]`).forEach(t=>{t.addEventListener(`click`,()=>{let[n,r]=t.dataset.kanbanMove.split(`:`),i=parseInt(r),a=e.data.kanban[n][i];e.data.kanban[n].splice(i,1);let o=n===`todo`?`doing`:n===`doing`?`done`:`todo`;e.data.kanban[o].push(a),o===`done`&&(e.data.profile.totalPoints=(e.data.profile.totalPoints||0)+20),u(),f(),o===`done`&&l(`🎉 +20 XP — Task completed!`)})});let v=document.getElementById(`btn-add-task`);v&&v.addEventListener(`click`,()=>{let t=document.getElementById(`kanban-text`).value.trim();t&&(e.data.kanban||(e.data.kanban={todo:[],doing:[],done:[]}),e.data.kanban.todo.push({text:t,date:new Date().toISOString().slice(0,10)}),u(),f(),l(`Task added ✓`))})}function k(){let e=new Date().getHours();return e<12?`Good morning`:e<17?`Good afternoon`:`Good evening`}function A(e){let t=[{min:0,name:`RECRUIT`,emoji:`🚧`,next:`Specialist (100 XP)`},{min:100,name:`SPECIALIST`,emoji:`⭐`,next:`Operator (300 XP)`},{min:300,name:`OPERATOR`,emoji:`🔶`,next:`Commander (600 XP)`},{min:600,name:`COMMANDER`,emoji:`💎`,next:`Elite (1000 XP)`},{min:1e3,name:`ELITE`,emoji:`👑`,next:`Legend (2000 XP)`},{min:2e3,name:`LEGEND`,emoji:`🏆`,next:`MAX RANK`}];for(let n=t.length-1;n>=0;n--)if(e>=t[n].min)return t[n];return t[0]}f(),console.log(`%c⚡ LifeSheets by ScriptMasterLabs — BEASTMODE ACTIVATED`,`color: #39FF14; font-size: 14px; font-weight: bold;`)}));n(),f();