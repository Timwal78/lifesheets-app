// ═══════════════════════════════════════════
// LifeSheets — Storage Layer
// localStorage persistence with export/import
// ═══════════════════════════════════════════

const STORAGE_KEY = 'lifesheets_v2';

function defaultData() {
  return {
    version: 2,
    profile: { name: '', streak: 0, totalPoints: 0 },
    habits: [],
    goals: [],
    budget: { income: [], expenses: [], savingsGoal: 0 },
    fitness: { workouts: [], measurements: [] },
    resume: { sections: {} },
    coverLetter: { letters: [] },
    linkedin: { sections: {} },
    businessPlan: { canvas: {} },
    marketing: { campaigns: [] },
    calendar: { posts: [] },
    kanban: { todo: [], doing: [], done: [] },
    lastUpdated: null,
  };
}

export function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const data = JSON.parse(raw);
    return { ...defaultData(), ...data };
  } catch (e) {
    console.error('LifeSheets: load error', e);
    return defaultData();
  }
}

export function save(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('LifeSheets: save error', e);
  }
}

let _timer = null;
export function debouncedSave(data) {
  clearTimeout(_timer);
  _timer = setTimeout(() => save(data), 400);
}

export function exportJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LifeSheets_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve({ ...defaultData(), ...data });
      } catch (err) { reject(err); }
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsText(file);
  });
}

export function genId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}
