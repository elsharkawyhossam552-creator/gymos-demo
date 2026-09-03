import { StoreProvider, useStore } from './store';
import { Sidebar, Topbar } from './components/Layout';
import { useLang } from './components/ui';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Pos from './screens/Pos';
import Members from './screens/Members';
import Attendance from './screens/Attendance';
import Inventory from './screens/Inventory';
import Training from './screens/Training';
import Hr from './screens/Hr';
import Crm from './screens/Crm';
import Cash from './screens/Cash';
import Guests from './screens/Guests';
import Reports from './screens/Reports';
import Monitor from './screens/Monitor';
import Ai from './screens/Ai';

const SCREEN_KEYS = ['dashboard','pos','members','attendance','inventory','training','hr','crm','cash','guests','reports','monitor','ai'];

function Inner() {
  const { langEn, setLangEn, page, setPage, toastMsg, user, notifs } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');

  if (!user) return <Login nav={{ langEn, setLangEn, t }} />;

  const nav = {
    langEn, toggleLang: () => setLangEn(!langEn),
    go: setPage, goOwner: () => setPage('monitor'),
    goAi: () => setPage('ai'),
    t,
    activeTitle: t({ dashboard:'dashboard', pos:'pos', members:'members', attendance:'attendance', inventory:'inventory', training:'training', hr:'hr', crm:'crm', cash:'cash', guests:'guests', reports:'reports', monitor:'monitor', ai:'ai' }[page] || 'dashboard'),
    appName: t('appName'),
  };

  const SCREENS = {
    dashboard: <Dashboard nav={nav} key="d" />,
    pos: <Pos nav={nav} key="p" />,
    members: <Members nav={nav} key="m" />,
    attendance: <Attendance nav={nav} key="a" />,
    inventory: <Inventory nav={nav} key="i" />,
    training: <Training nav={nav} key="tr" />,
    hr: <Hr nav={nav} key="h" />,
    crm: <Crm nav={nav} key="c" />,
    cash: <Cash nav={nav} key="ca" />,
    guests: <Guests nav={nav} key="g" />,
    reports: <Reports nav={nav} key="r" />,
    monitor: <Monitor nav={nav} key="o" />,
    ai: <Ai nav={nav} key="ai" />,
  };

  return (
    <div dir={langEn ? 'ltr' : 'rtl'} className="h-screen flex bg-[#0b1626] overflow-hidden">
      <Sidebar nav={nav} inner={SCREEN_KEYS.includes(page) ? page : 'dashboard'} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar nav={nav} />
        <main className="flex-1 overflow-y-auto">
          {SCREENS[page] || SCREENS.dashboard}
        </main>
      </div>
      {toastMsg && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] bg-[#123049] border border-[#2a4a75] rounded-xl px-5 py-3 shadow-2xl text-center min-w-[320px]">
          <b className="block text-[#6ec1ff]">{toastMsg.title}</b>
          <span className="text-sm text-[#e4ecf7]">{toastMsg.body}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Inner />
    </StoreProvider>
  );
}