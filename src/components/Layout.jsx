import { useStore } from '../store';
import { useLang } from '../components/ui';

const NAV = [
  { key: 'dashboard', icon: '📊', en: 'Dashboard', ar: 'لوحة التحكم' },
  { key: 'pos', icon: '🛒', en: 'POS / Sales', ar: 'المبيعات (POS)' },
  { key: 'members', icon: '👥', en: 'Members', ar: 'الأعضاء' },
  { key: 'attendance', icon: '🕒', en: 'Attendance', ar: 'الحضور' },
  { key: 'inventory', icon: '📦', en: 'Inventory', ar: 'المخزون' },
  { key: 'training', icon: '🏋️', en: 'Training & Classes', ar: 'التدريب والحصص' },
  { key: 'hr', icon: '🧑‍💼', en: 'HR & Payroll', ar: 'الموارد البشرية' },
  { key: 'crm', icon: '🎯', en: 'Leads (CRM)', ar: 'العملاء المحتملون' },
  { key: 'cash', icon: '💰', en: 'Cash & Expenses', ar: 'الخزنة والمصروفات' },
  { key: 'guests', icon: '🎟️', en: 'Guests', ar: 'الضيوف' },
  { key: 'reports', icon: '📄', en: 'Reports', ar: 'التقارير' },
  { key: 'monitor', icon: '📡', en: 'Live Monitor', ar: 'مراقبة حية' },
  { key: 'ai', icon: '🤖', en: 'AI Coach', ar: 'المدرب الذكي' },
];

export function Sidebar({ nav, inner }) {
  return (
    <aside className="w-64 shrink-0 bg-[#0d1a2e] border-r border-[#1b2f4d] h-full flex flex-col">
      <div className="px-5 py-4 border-b border-[#1b2f4d] flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1F6FEB] to-[#0f3d82] flex items-center justify-center font-black">G</div>
        <div>
          <div className="font-extrabold leading-none">GymOS <span className="text-[#4da3ff]">ERP</span></div>
          <div className="text-[9px] text-[#5F7391]">{nav.appName}</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV.map((n) => (
          <button key={n.key} onClick={() => nav.go(n.key)}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition ${inner === n.key ? 'bg-[#1F6FEB]/15 text-[#6ec1ff] border-r-4 border-[#1F6FEB]' : 'text-[#a9c0dd] hover:bg-[#152842] border-r-4 border-transparent'}`}>
            <span>{n.icon}</span>
            <span className="font-bold">{nav.langEn ? n.en : n.ar}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-[#1b2f4d] text-[11px] text-[#5F7391] text-center">
        {nav.langEn ? 'Demo Mode • SQLite-style local' : 'وضع تجريبي • بيانات محلية'}
      </div>
    </aside>
  );
}

export function Topbar({ nav }) {
  const t = nav.t;
  const { notifs, sales, members, user, logout, langEn } = useStore();
  const inside = members.filter((m) => m.inside).length;
  const role = user ? (langEn ? user.role : user.role) : '';
  return (
    <header className="h-14 bg-[#0d1a2e] border-b border-[#1b2f4d] flex items-center gap-4 px-5 shrink-0">
      <div className="font-extrabold text-lg">{nav.activeTitle}</div>
      <div className="flex-1" />
      <button onClick={() => nav.go('ai')} className="bg-[#a855f7]/15 hover:bg-[#a855f7]/25 text-purple-300 border border-[#24405F] px-3 py-1.5 rounded-lg text-xs font-bold hidden md:block">🤖 AI</button>
      <span className="text-xs text-[#5F7391] hidden md:block">{t('welcome')}, <b className="text-[#a9c0dd]">{user ? (langEn ? user.nameEn : user.nameAr) : ''}</b> <span className="text-[#4da3ff]">({role})</span></span>
      <button onClick={nav.toggleLang}
        className="bg-[#17263b] hover:bg-[#1e3350] border border-[#24405F] px-3 py-1.5 rounded-lg text-xs font-bold">
        {langEn ? 'العربية' : 'English'}
      </button>
      <div className="relative">
        <div className="w-9 h-9 rounded-lg bg-[#17263b] border border-[#24405F] flex items-center justify-center text-lg relative cursor-pointer" onClick={nav.goOwner}>
          🔔
          {notifs.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] flex items-center justify-center font-bold">{notifs.length}</span>}
        </div>
      </div>
      <div className="w-9 h-9 rounded-lg bg-[#17263b] border border-[#24405F] flex items-center justify-center text-xs font-bold text-orange-400" title="Inside now">{inside}⚡</div>
      <button onClick={logout} title={t('logout')} className="bg-[#17263b] hover:bg-red-600/20 border border-[#24405F] px-3 py-1.5 rounded-lg text-xs font-bold text-red-300">⏻</button>
    </header>
  );
}
