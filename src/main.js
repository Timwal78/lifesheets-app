// ═══════════════════════════════════════════════════════════════
// LifeSheets Super-App — Main Application
// by ScriptMasterLabs
// ═══════════════════════════════════════════════════════════════

import './styles.css';
import * as storage from './storage.js';

const state = {
  data: storage.load(),
  screen: 'home',    // home | module
  tab: 'home',       // home | track | career | build
  module: null,      // which module is open
};

// ─── MODULE DEFINITIONS ─────────────────────────────────────
const MODULES = {
  // HOME TAB
  dashboard:    { icon: '📊', name: 'Command Center', desc: 'Stats, rank & streak overview', tab: 'home', badge: '' },
  goals:        { icon: '🎯', name: 'Goal Decomposer', desc: 'Break big goals into daily wins', tab: 'home', badge: '' },
  // TRACK TAB
  habits:       { icon: '🔥', name: 'Habit Streaks', desc: 'Daily habits with streak heatmap', tab: 'track', badge: 'NEW' },
  budget:       { icon: '💰', name: 'Budget Tracker', desc: 'Income, expenses & net worth', tab: 'track', badge: 'NEW' },
  fitness:      { icon: '💪', name: 'Fitness Log', desc: 'Workouts, PRs & measurements', tab: 'track', badge: 'NEW' },
  // CAREER TAB
  resume:       { icon: '📄', name: 'Resume Builder', desc: 'Build a recruiter-grade resume', tab: 'career', badge: '' },
  coverletter:  { icon: '✉️', name: 'Cover Letter', desc: 'Job-specific cover letters', tab: 'career', badge: '' },
  linkedin:     { icon: '💼', name: 'LinkedIn Pro', desc: 'Optimize your profile', tab: 'career', badge: '' },
  // BUILD TAB
  businessplan: { icon: '🏗️', name: 'Business Plan', desc: 'Lean canvas & financial model', tab: 'build', badge: '' },
  marketing:    { icon: '📣', name: 'Marketing Lab', desc: 'Ad copy & SEO keywords', tab: 'build', badge: '' },
  calendar:     { icon: '📅', name: 'Content Calendar', desc: 'Plan your social posting', tab: 'build', badge: 'NEW' },
  kanban:       { icon: '📋', name: 'Project Board', desc: 'Kanban task management', tab: 'build', badge: 'NEW' },
};

const TABS = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'track', icon: '📊', label: 'Track' },
  { id: 'career', icon: '💼', label: 'Career' },
  { id: 'build', icon: '🚀', label: 'Build' },
];

// ─── TOAST ──────────────────────────────────────────────────
function toast(msg) {
  let t = document.querySelector('.toast');
  if (t) t.remove();
  t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2500);
}

// ─── SAVE HELPER ────────────────────────────────────────────
function persist() { storage.save(state.data); }

// ─── RENDER ENGINE ──────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderHeader()}
    <div class="screen active">
      ${state.screen === 'home' ? renderHome() : renderModule(state.module)}
    </div>
    ${renderNav()}
  `;
  bindEvents();
}

// ─── HEADER ─────────────────────────────────────────────────
function renderHeader() {
  return `
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
  `;
}

// ─── HOME SCREEN ────────────────────────────────────────────
function renderHome() {
  const tabModules = Object.entries(MODULES).filter(([,m]) => m.tab === state.tab);
  const greeting = getGreeting();
  const name = state.data.profile.name || 'Operator';

  let dashSection = '';
  if (state.tab === 'home') {
    const totalHabits = state.data.habits.length;
    const todayStr = new Date().toISOString().slice(0, 10);
    const completedToday = state.data.habits.filter(h => h.log && h.log[todayStr]).length;
    const streak = calcStreak();
    const rank = getRank(state.data.profile.totalPoints || 0);

    dashSection = `
      <div class="section">
        <div class="stats-row">
          <div class="stat-card rank-card">
            <span class="rank-emoji">${rank.emoji}</span>
            <div class="stat-value">${rank.name}</div>
            <div class="stat-label">${state.data.profile.totalPoints || 0} XP</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${streak}</div>
            <div class="stat-label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${completedToday}/${totalHabits}</div>
            <div class="stat-label">Today</div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div style="padding-top:12px">
      <div class="section">
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:4px">${greeting},</p>
        <h2 style="font-size:22px;font-weight:800;margin-bottom:0">${name}</h2>
      </div>

      ${dashSection}

      <div class="section">
        <div class="section-title">${TABS.find(t => t.id === state.tab).icon} ${TABS.find(t => t.id === state.tab).label} Modules</div>
        <div class="module-grid">
          ${tabModules.map(([key, m]) => `
            <div class="module-card" data-module="${key}">
              ${m.badge ? `<span class="module-badge badge-new">${m.badge}</span>` : ''}
              <div class="module-icon">${m.icon}</div>
              <div class="module-name">${m.name}</div>
              <div class="module-desc">${m.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ─── MODULE ROUTER ──────────────────────────────────────────
function renderModule(mod) {
  switch (mod) {
    case 'dashboard': return renderDashboard();
    case 'goals': return renderGoals();
    case 'habits': return renderHabits();
    case 'budget': return renderBudget();
    case 'fitness': return renderFitness();
    case 'resume': return renderTextModule('resume', 'Resume Builder', '📄', ['Summary', 'Experience', 'Education', 'Skills', 'Certifications']);
    case 'coverletter': return renderTextModule('coverLetter', 'Cover Letter', '✉️', ['Company', 'Position', 'Opening', 'Body', 'Closing']);
    case 'linkedin': return renderTextModule('linkedin', 'LinkedIn Pro', '💼', ['Headline', 'About', 'Experience', 'Skills', 'Featured']);
    case 'businessplan': return renderTextModule('businessPlan', 'Business Plan', '🏗️', ['Problem', 'Solution', 'Market', 'Revenue Model', 'Team', 'Financial Projections']);
    case 'marketing': return renderTextModule('marketing', 'Marketing Lab', '📣', ['Target Audience', 'Value Proposition', 'Ad Headlines', 'Ad Body Copy', 'SEO Keywords', 'A/B Variants']);
    case 'calendar': return renderCalendar();
    case 'kanban': return renderKanban();
    default: return '<div class="empty-state"><div class="empty-icon">🚧</div><p>Module coming soon</p></div>';
  }
}

// ─── DASHBOARD MODULE ───────────────────────────────────────
function renderDashboard() {
  const rank = getRank(state.data.profile.totalPoints || 0);
  const streak = calcStreak();
  const habitCount = state.data.habits.length;
  const goalCount = state.data.goals.length;
  const kanbanDone = (state.data.kanban.done || []).length;

  return `
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">📊</span> COMMAND CENTER</div>
      <div class="stats-row">
        <div class="stat-card rank-card">
          <span class="rank-emoji">${rank.emoji}</span>
          <div class="stat-value">${rank.name}</div>
          <div class="stat-label">${state.data.profile.totalPoints || 0} XP — Next: ${rank.next}</div>
        </div>
        <div class="stat-card"><div class="stat-value">${streak}</div><div class="stat-label">Day Streak</div></div>
        <div class="stat-card"><div class="stat-value">${habitCount}</div><div class="stat-label">Habits</div></div>
        <div class="stat-card"><div class="stat-value">${goalCount}</div><div class="stat-label">Goals</div></div>
        <div class="stat-card"><div class="stat-value">${kanbanDone}</div><div class="stat-label">Tasks Done</div></div>
      </div>
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">👤</span> OPERATOR PROFILE</div>
      <div class="form-group">
        <label class="form-label">Call Sign</label>
        <input class="input-field" id="profile-name" value="${state.data.profile.name || ''}" placeholder="Enter your name...">
      </div>
    </div>
  `;
}

// ─── HABITS MODULE ──────────────────────────────────────────
function renderHabits() {
  const todayStr = new Date().toISOString().slice(0, 10);
  const habits = state.data.habits || [];

  return `
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">🔥</span> HABIT STREAKS</div>
      ${habits.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">🔥</div>
          <p>No habits yet. Start building consistency.</p>
        </div>
      ` : habits.map((h, i) => {
        const done = h.log && h.log[todayStr];
        const hStreak = calcHabitStreak(h);
        return `
          <div class="list-item">
            <div class="list-item-check ${done ? 'checked' : ''}" data-habit-toggle="${i}">${done ? '✓' : ''}</div>
            <div class="list-item-content">
              <div class="list-item-title ${done ? 'completed' : ''}">${h.name}</div>
              <div class="list-item-meta">🔥 ${hStreak} day streak</div>
            </div>
            <div class="list-item-actions">
              <button class="list-item-delete" data-habit-delete="${i}">✕</button>
            </div>
          </div>
        `;
      }).join('')}
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
        ${renderHeatmap()}
      </div>
    </div>
  `;
}

function renderHeatmap() {
  const cells = [];
  const habits = state.data.habits || [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const count = habits.filter(h => h.log && h.log[ds]).length;
    const total = habits.length || 1;
    const pct = count / total;
    const level = pct === 0 ? '' : pct <= 0.25 ? 'level-1' : pct <= 0.5 ? 'level-2' : pct <= 0.75 ? 'level-3' : 'level-4';
    cells.push(`<div class="heatmap-cell ${level}" title="${ds}: ${count}/${habits.length}"></div>`);
  }
  return cells.join('');
}

function calcHabitStreak(h) {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const ds = d.toISOString().slice(0, 10);
    if (h.log && h.log[ds]) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

function calcStreak() {
  const habits = state.data.habits || [];
  if (habits.length === 0) return 0;
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 365; i++) {
    const ds = d.toISOString().slice(0, 10);
    const allDone = habits.every(h => h.log && h.log[ds]);
    if (allDone) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

// ─── GOALS MODULE ───────────────────────────────────────────
function renderGoals() {
  const goals = state.data.goals || [];
  return `
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">🎯</span> GOAL DECOMPOSER</div>
      ${goals.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">🎯</div>
          <p>Break big goals into daily wins.</p>
        </div>
      ` : goals.map((g, i) => `
        <div class="list-item">
          <div class="list-item-check ${g.done ? 'checked' : ''}" data-goal-toggle="${i}">${g.done ? '✓' : ''}</div>
          <div class="list-item-content">
            <div class="list-item-title ${g.done ? 'completed' : ''}">${g.text}</div>
            <div class="list-item-meta"><span class="tag tag-${g.level === 'annual' ? 'gold' : g.level === 'monthly' ? 'cyan' : 'green'}">${g.level}</span></div>
          </div>
          <div class="list-item-actions">
            <button class="list-item-delete" data-goal-delete="${i}">✕</button>
          </div>
        </div>
      `).join('')}
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
  `;
}

// ─── BUDGET MODULE ──────────────────────────────────────────
function renderBudget() {
  const b = state.data.budget || { income: [], expenses: [], savingsGoal: 0 };
  const totalIncome = b.income.reduce((s, i) => s + (i.amount || 0), 0);
  const totalExpenses = b.expenses.reduce((s, e) => s + (e.amount || 0), 0);
  const net = totalIncome - totalExpenses;

  return `
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">💰</span> BUDGET TRACKER</div>
      <div class="budget-summary">
        <div class="budget-summary-card"><div class="budget-summary-value income-text">$${totalIncome.toLocaleString()}</div><div class="budget-summary-label">Income</div></div>
        <div class="budget-summary-card"><div class="budget-summary-value expense-text">$${totalExpenses.toLocaleString()}</div><div class="budget-summary-label">Expenses</div></div>
        <div class="budget-summary-card"><div class="budget-summary-value net-text">$${net.toLocaleString()}</div><div class="budget-summary-label">Net</div></div>
      </div>
      ${totalIncome > 0 ? `<div class="budget-bar"><div class="budget-bar-fill expense" style="width:${Math.min(100, (totalExpenses / totalIncome) * 100)}%"></div></div><p style="font-size:11px;color:var(--text-muted);margin-top:4px">${Math.round((totalExpenses / totalIncome) * 100)}% spend rate</p>` : ''}
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">📈</span> INCOME</div>
      ${b.income.map((item, i) => `<div class="list-item"><div class="list-item-content"><div class="list-item-title">${item.label}</div><div class="list-item-meta income-text">+$${item.amount.toLocaleString()}</div></div><button class="list-item-delete" data-income-delete="${i}">✕</button></div>`).join('')}
      <div style="display:flex;gap:8px;margin-top:8px">
        <input class="input-field" id="income-label" placeholder="Source" style="flex:1">
        <input class="input-field" id="income-amount" placeholder="$" type="number" style="width:100px">
        <button class="btn btn-primary btn-sm" id="btn-add-income" style="width:auto">+</button>
      </div>
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">📉</span> EXPENSES</div>
      ${b.expenses.map((item, i) => `<div class="list-item"><div class="list-item-content"><div class="list-item-title">${item.label}</div><div class="list-item-meta expense-text">-$${item.amount.toLocaleString()}</div></div><button class="list-item-delete" data-expense-delete="${i}">✕</button></div>`).join('')}
      <div style="display:flex;gap:8px;margin-top:8px">
        <input class="input-field" id="expense-label" placeholder="Category" style="flex:1">
        <input class="input-field" id="expense-amount" placeholder="$" type="number" style="width:100px">
        <button class="btn btn-primary btn-sm" id="btn-add-expense" style="width:auto">+</button>
      </div>
    </div>
  `;
}

// ─── FITNESS MODULE ─────────────────────────────────────────
function renderFitness() {
  const f = state.data.fitness || { workouts: [], measurements: [] };
  return `
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">💪</span> FITNESS LOG</div>
      ${f.workouts.length === 0 ? `<div class="empty-state"><div class="empty-icon">🏋️</div><p>Log your first workout</p></div>` :
        f.workouts.slice(-10).reverse().map((w, i) => `
          <div class="list-item">
            <div class="list-item-content">
              <div class="list-item-title">${w.exercise}</div>
              <div class="list-item-meta">${w.sets}×${w.reps} @ ${w.weight}lbs — ${w.date}</div>
            </div>
            <button class="list-item-delete" data-workout-delete="${f.workouts.length - 1 - i}">✕</button>
          </div>
        `).join('')}
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
  `;
}

// ─── TEXT MODULE (Resume, Cover Letter, LinkedIn, Business Plan, Marketing) ──
function renderTextModule(key, title, icon, fields) {
  const sections = state.data[key]?.sections || {};
  return `
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">${icon}</span> ${title.toUpperCase()}</div>
      ${fields.map(f => `
        <div class="form-group">
          <label class="form-label">${f}</label>
          <textarea class="textarea-field" data-text-field="${key}:${f}" placeholder="Enter your ${f.toLowerCase()}...">${sections[f] || ''}</textarea>
        </div>
      `).join('')}
      <button class="btn btn-primary btn-sm" id="btn-save-text" data-text-key="${key}" style="margin-top:8px">💾 Save</button>
    </div>
  `;
}

// ─── CALENDAR MODULE ────────────────────────────────────────
function renderCalendar() {
  const posts = state.data.calendar?.posts || [];
  return `
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">📅</span> CONTENT CALENDAR</div>
      ${posts.length === 0 ? `<div class="empty-state"><div class="empty-icon">📅</div><p>Plan your content. Stay consistent.</p></div>` :
        posts.sort((a, b) => a.date.localeCompare(b.date)).map((p, i) => `
          <div class="list-item">
            <div class="list-item-check ${p.posted ? 'checked' : ''}" data-post-toggle="${i}">${p.posted ? '✓' : ''}</div>
            <div class="list-item-content">
              <div class="list-item-title ${p.posted ? 'completed' : ''}">${p.title}</div>
              <div class="list-item-meta">${p.platform} — ${p.date}</div>
            </div>
            <button class="list-item-delete" data-post-delete="${i}">✕</button>
          </div>
        `).join('')}
    </div>
    <div class="widget">
      <div class="widget-title"><span class="icon">➕</span> SCHEDULE POST</div>
      <div class="form-group"><input class="input-field" id="post-title" placeholder="Post topic"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Platform</label>
          <select class="select-field" id="post-platform"><option>X/Twitter</option><option>Instagram</option><option>LinkedIn</option><option>TikTok</option><option>YouTube</option><option>Discord</option></select>
        </div>
        <div class="form-group"><label class="form-label">Date</label><input class="input-field" id="post-date" type="date" value="${new Date().toISOString().slice(0, 10)}"></div>
      </div>
      <button class="btn btn-primary btn-sm" id="btn-add-post" style="margin-top:8px">+ Schedule</button>
    </div>
  `;
}

// ─── KANBAN MODULE ──────────────────────────────────────────
function renderKanban() {
  const k = state.data.kanban || { todo: [], doing: [], done: [] };
  const renderCol = (title, items, colKey, color) => `
    <div class="kanban-column">
      <div class="kanban-col-title" style="color:${color}">${title} <span class="kanban-col-count">${items.length}</span></div>
      ${items.map((item, i) => `
        <div class="kanban-card" data-kanban-move="${colKey}:${i}">
          ${item.text}
          <div class="kanban-card-meta">${item.date || ''}</div>
        </div>
      `).join('')}
    </div>
  `;

  return `
    <button class="back-btn" data-back>← Back</button>
    <div class="widget">
      <div class="widget-title"><span class="icon">📋</span> PROJECT BOARD</div>
      <div class="kanban-board">
        ${renderCol('TO DO', k.todo, 'todo', 'var(--text-secondary)')}
        ${renderCol('DOING', k.doing, 'doing', 'var(--cyan)')}
        ${renderCol('DONE', k.done, 'done', 'var(--accent)')}
      </div>
    </div>
    <div class="widget">
      <div style="display:flex;gap:8px">
        <input class="input-field" id="kanban-text" placeholder="New task...">
        <button class="btn btn-primary btn-sm" id="btn-add-task" style="width:auto">+ Add</button>
      </div>
    </div>
  `;
}

// ─── NAV ────────────────────────────────────────────────────
function renderNav() {
  return `
    <nav class="bottom-nav">
      ${TABS.map(t => `
        <button class="nav-item ${state.tab === t.id ? 'active' : ''}" data-tab="${t.id}">
          <span>${t.icon}</span>
          <span>${t.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

// ─── EVENT BINDING ──────────────────────────────────────────
function bindEvents() {
  // Nav tabs
  document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', () => {
      state.tab = el.dataset.tab;
      state.screen = 'home';
      state.module = null;
      render();
    });
  });

  // Module cards
  document.querySelectorAll('[data-module]').forEach(el => {
    el.addEventListener('click', () => {
      state.screen = 'module';
      state.module = el.dataset.module;
      render();
    });
  });

  // Back button
  document.querySelectorAll('[data-back]').forEach(el => {
    el.addEventListener('click', () => {
      state.screen = 'home';
      state.module = null;
      render();
    });
  });

  // Export
  const btnExport = document.getElementById('btn-export');
  if (btnExport) btnExport.addEventListener('click', () => { storage.exportJSON(state.data); toast('Data exported ✓'); });

  // Import
  const btnImport = document.getElementById('btn-import');
  const importFile = document.getElementById('import-file');
  if (btnImport) btnImport.addEventListener('click', () => importFile.click());
  if (importFile) importFile.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    state.data = await storage.importJSON(file);
    persist();
    render();
    toast('Data imported ✓');
  });

  // Profile name
  const profileName = document.getElementById('profile-name');
  if (profileName) profileName.addEventListener('input', (e) => { state.data.profile.name = e.target.value; storage.debouncedSave(state.data); });

  // === HABITS ===
  document.querySelectorAll('[data-habit-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const i = parseInt(el.dataset.habitToggle);
      const h = state.data.habits[i];
      if (!h.log) h.log = {};
      const todayStr = new Date().toISOString().slice(0, 10);
      h.log[todayStr] = !h.log[todayStr];
      if (h.log[todayStr]) state.data.profile.totalPoints = (state.data.profile.totalPoints || 0) + 10;
      persist();
      render();
      if (h.log[todayStr]) toast('🔥 +10 XP — Habit completed!');
    });
  });

  document.querySelectorAll('[data-habit-delete]').forEach(el => {
    el.addEventListener('click', () => { state.data.habits.splice(parseInt(el.dataset.habitDelete), 1); persist(); render(); });
  });

  const btnAddHabit = document.getElementById('btn-add-habit');
  if (btnAddHabit) btnAddHabit.addEventListener('click', () => {
    const input = document.getElementById('new-habit-name');
    const name = input.value.trim();
    if (!name) return;
    state.data.habits.push({ name, log: {} });
    persist();
    render();
    toast(`Habit "${name}" added ✓`);
  });

  // === GOALS ===
  document.querySelectorAll('[data-goal-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const i = parseInt(el.dataset.goalToggle);
      state.data.goals[i].done = !state.data.goals[i].done;
      if (state.data.goals[i].done) state.data.profile.totalPoints = (state.data.profile.totalPoints || 0) + 25;
      persist();
      render();
    });
  });

  document.querySelectorAll('[data-goal-delete]').forEach(el => {
    el.addEventListener('click', () => { state.data.goals.splice(parseInt(el.dataset.goalDelete), 1); persist(); render(); });
  });

  const btnAddGoal = document.getElementById('btn-add-goal');
  if (btnAddGoal) btnAddGoal.addEventListener('click', () => {
    const text = document.getElementById('new-goal-text').value.trim();
    const level = document.getElementById('new-goal-level').value;
    if (!text) return;
    state.data.goals.push({ text, level, done: false });
    persist();
    render();
    toast('Goal added ✓');
  });

  // === BUDGET ===
  const btnAddIncome = document.getElementById('btn-add-income');
  if (btnAddIncome) btnAddIncome.addEventListener('click', () => {
    const label = document.getElementById('income-label').value.trim();
    const amount = parseFloat(document.getElementById('income-amount').value) || 0;
    if (!label || !amount) return;
    if (!state.data.budget) state.data.budget = { income: [], expenses: [], savingsGoal: 0 };
    state.data.budget.income.push({ label, amount });
    persist(); render(); toast('Income added ✓');
  });

  const btnAddExpense = document.getElementById('btn-add-expense');
  if (btnAddExpense) btnAddExpense.addEventListener('click', () => {
    const label = document.getElementById('expense-label').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value) || 0;
    if (!label || !amount) return;
    if (!state.data.budget) state.data.budget = { income: [], expenses: [], savingsGoal: 0 };
    state.data.budget.expenses.push({ label, amount });
    persist(); render(); toast('Expense added ✓');
  });

  document.querySelectorAll('[data-income-delete]').forEach(el => {
    el.addEventListener('click', () => { state.data.budget.income.splice(parseInt(el.dataset.incomeDelete), 1); persist(); render(); });
  });

  document.querySelectorAll('[data-expense-delete]').forEach(el => {
    el.addEventListener('click', () => { state.data.budget.expenses.splice(parseInt(el.dataset.expenseDelete), 1); persist(); render(); });
  });

  // === FITNESS ===
  const btnAddWorkout = document.getElementById('btn-add-workout');
  if (btnAddWorkout) btnAddWorkout.addEventListener('click', () => {
    const exercise = document.getElementById('fit-exercise').value.trim();
    const sets = parseInt(document.getElementById('fit-sets').value) || 0;
    const reps = parseInt(document.getElementById('fit-reps').value) || 0;
    const weight = parseFloat(document.getElementById('fit-weight').value) || 0;
    if (!exercise) return;
    if (!state.data.fitness) state.data.fitness = { workouts: [], measurements: [] };
    state.data.fitness.workouts.push({ exercise, sets, reps, weight, date: new Date().toISOString().slice(0, 10) });
    state.data.profile.totalPoints = (state.data.profile.totalPoints || 0) + 15;
    persist(); render(); toast('💪 +15 XP — Workout logged!');
  });

  document.querySelectorAll('[data-workout-delete]').forEach(el => {
    el.addEventListener('click', () => { state.data.fitness.workouts.splice(parseInt(el.dataset.workoutDelete), 1); persist(); render(); });
  });

  // === TEXT MODULES (Resume, Cover Letter, etc.) ===
  const btnSaveText = document.getElementById('btn-save-text');
  if (btnSaveText) btnSaveText.addEventListener('click', () => {
    const key = btnSaveText.dataset.textKey;
    if (!state.data[key]) state.data[key] = { sections: {} };
    document.querySelectorAll(`[data-text-field^="${key}:"]`).forEach(ta => {
      const field = ta.dataset.textField.split(':')[1];
      state.data[key].sections[field] = ta.value;
    });
    persist();
    toast(`${key} saved ✓`);
  });

  // === CALENDAR ===
  document.querySelectorAll('[data-post-toggle]').forEach(el => {
    el.addEventListener('click', () => {
      const i = parseInt(el.dataset.postToggle);
      state.data.calendar.posts[i].posted = !state.data.calendar.posts[i].posted;
      if (state.data.calendar.posts[i].posted) state.data.profile.totalPoints = (state.data.profile.totalPoints || 0) + 5;
      persist(); render();
    });
  });

  document.querySelectorAll('[data-post-delete]').forEach(el => {
    el.addEventListener('click', () => { state.data.calendar.posts.splice(parseInt(el.dataset.postDelete), 1); persist(); render(); });
  });

  const btnAddPost = document.getElementById('btn-add-post');
  if (btnAddPost) btnAddPost.addEventListener('click', () => {
    const title = document.getElementById('post-title').value.trim();
    const platform = document.getElementById('post-platform').value;
    const date = document.getElementById('post-date').value;
    if (!title) return;
    if (!state.data.calendar) state.data.calendar = { posts: [] };
    state.data.calendar.posts.push({ title, platform, date, posted: false });
    persist(); render(); toast('Post scheduled ✓');
  });

  // === KANBAN ===
  document.querySelectorAll('[data-kanban-move]').forEach(el => {
    el.addEventListener('click', () => {
      const [col, idx] = el.dataset.kanbanMove.split(':');
      const i = parseInt(idx);
      const item = state.data.kanban[col][i];
      state.data.kanban[col].splice(i, 1);
      const next = col === 'todo' ? 'doing' : col === 'doing' ? 'done' : 'todo';
      state.data.kanban[next].push(item);
      if (next === 'done') state.data.profile.totalPoints = (state.data.profile.totalPoints || 0) + 20;
      persist(); render();
      if (next === 'done') toast('🎉 +20 XP — Task completed!');
    });
  });

  const btnAddTask = document.getElementById('btn-add-task');
  if (btnAddTask) btnAddTask.addEventListener('click', () => {
    const text = document.getElementById('kanban-text').value.trim();
    if (!text) return;
    if (!state.data.kanban) state.data.kanban = { todo: [], doing: [], done: [] };
    state.data.kanban.todo.push({ text, date: new Date().toISOString().slice(0, 10) });
    persist(); render(); toast('Task added ✓');
  });
}

// ─── HELPERS ────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getRank(xp) {
  const ranks = [
    { min: 0, name: 'RECRUIT', emoji: '🚧', next: 'Specialist (100 XP)' },
    { min: 100, name: 'SPECIALIST', emoji: '⭐', next: 'Operator (300 XP)' },
    { min: 300, name: 'OPERATOR', emoji: '🔶', next: 'Commander (600 XP)' },
    { min: 600, name: 'COMMANDER', emoji: '💎', next: 'Elite (1000 XP)' },
    { min: 1000, name: 'ELITE', emoji: '👑', next: 'Legend (2000 XP)' },
    { min: 2000, name: 'LEGEND', emoji: '🏆', next: 'MAX RANK' },
  ];
  for (let i = ranks.length - 1; i >= 0; i--) {
    if (xp >= ranks[i].min) return ranks[i];
  }
  return ranks[0];
}

// ─── BOOT ───────────────────────────────────────────────────
render();
console.log('%c⚡ LifeSheets by ScriptMasterLabs — BEASTMODE ACTIVATED', 'color: #39FF14; font-size: 14px; font-weight: bold;');
