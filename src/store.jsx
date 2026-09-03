import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { buildSeed, PLAN_NAMES, PLAN_PRICES } from './data/seed';

const StoreCtx = createContext(null);
const KEY = 'gymos_state_v1';
const AUTH_KEY = 'gymos_auth_v1';

export const USERS = [
  { id: 'u1', username: 'admin', password: 'admin123', nameAr: 'مدير النظام', nameEn: 'System Admin', role: 'admin' },
  { id: 'u2', username: 'reception', password: 'recep123', nameAr: 'الأستقبال', nameEn: 'Reception', role: 'reception' },
  { id: 'u3', username: 'trainer', password: 'trainer123', nameAr: 'المدرب', nameEn: 'Trainer', role: 'trainer' },
];

function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function seedSales(sql, n = 60) {
  const sales = [];
  const products = [...sql.products];
  let total = 0;
  for (let i = 0; i < n; i++) {
    const prod = products[i % products.length];
    const qty = 1 + (i % 3);
    const when = new Date();
    when.setHours(9 + (i % 12), Math.floor(Math.random() * 60), 0, 0);
    const totalp = prod.price * qty;
    total += totalp;
    sales.push({ id: 'S-' + (1000 + i), productName: prod.name, productNameEn: prod.nameEn, qty, price: prod.price, total: totalp, when: when.toISOString() });
  }
  return sales;
}

function storeState(state) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

export function StoreProvider({ children }) {
  const persisted = useRef(loadState());
  const fresh = useRef(null);
  if (!fresh.current) {
    const s = buildSeed();
    fresh.current = {
      members: s.members, products: s.products, sales: seedSales(s),
      employees: s.employees, workouts: s.workouts, equipment: s.equipment,
      classes: s.classes, leads: s.leads, guests: s.guests, expenses: s.expenses,
      notifs: [], cash: 25000, cashLog: [],
    };
  }
  const init = persisted.current || fresh.current;

  const [langEn, setLangEnState] = useState(init.langEn || false);
  const [members, setMembersState] = useState(init.members);
  const [products, setProductsState] = useState(init.products);
  const [employees, setEmployees] = useState(init.employees);
  const [sales, setSales] = useState(init.sales);
  const [notifs, setNotifs] = useState(init.notifs || []);
  const [cash, setCash] = useState(init.cash ?? 25000);
  const [cashLog, setCashLog] = useState(init.cashLog || []);
  const [page, setPage] = useState('dashboard');
  const [toastMsg, setToastMsg] = useState(null);
  const [user, setUser] = useState(() => {
    try { const r = localStorage.getItem(AUTH_KEY); return r ? JSON.parse(r) : USERS[0]; } catch { return USERS[0]; }
  });

  const stateRef = useRef({ langEn, members, products, employees, sales, notifs, cash, cashLog });
  stateRef.current = { langEn, members, products, employees, sales, notifs, cash, cashLog };

  useEffect(() => {
    storeState(stateRef.current);
  }, [langEn, members, products, employees, sales, notifs, cash, cashLog]);

  const setLangEn = (v) => setLangEnState(v);

  const notify = useCallback((t, b) => {
    const id = Math.random().toString(36).slice(2);
    setNotifs((p) => [{ id, title: t, body: b, time: new Date().toTimeString().slice(0, 5) }, ...p].slice(0, 40));
    setToastMsg({ id, title: t, body: b });
    setTimeout(() => setToastMsg(null), 3200);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const idx = Math.floor(Math.random() * 8);
      const m = stateRef.current.members[idx];
      if (m) notify('🔔 ' + (m.inside ? '🚪 خروج' : '✅ دخول'), m.fullName + (m.inside ? ' غادر الصالة' : ' دخل الصالة الآن'));
    }, 15000);
    return () => clearInterval(t);
  }, [notify]);

  const toggleInOut = useCallback((id) => {
    setMembersState((prev) => { const r = prev.map((m) => (m.id === id ? { ...m, inside: !m.inside, visits: m.inside ? m.visits : m.visits + 1 } : m)); return r; });
  }, []);

  const login = useCallback((username, password) => {
    const u = USERS.find((x) => x.username === username && x.password === password);
    if (!u) return false;
    setUser(u);
    localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    return true;
  }, []);
  const logout = useCallback(() => { localStorage.removeItem(AUTH_KEY); setUser(null); }, []);

  const value = {
    langEn, setLangEn,
    members, setMembers: setMembersState,
    products, setProducts: setProductsState,
    employees, setEmployees,
    sales, setSales,
    notifs, setNotifs, notify,
    cash, setCash,
    user, login, logout, USERS,
    page, setPage, toastMsg,
  };
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() { return useContext(StoreCtx); }

export function Plans() {
  return PLAN_NAMES.map((p, i) => ({ ar: p.ar, en: p.en, months: [1, 3, 6, 12][i], price: PLAN_PRICES[i] }));
}
