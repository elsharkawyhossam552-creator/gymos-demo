import { Card, useLang } from '../components/ui';
import { useStore } from '../store';

export default function Monitor({ nav }) {
  const { langEn, members, products, sales, notifs } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const today = sales.filter((s) => new Date(s.when).getDate() === new Date().getDate()).reduce((a, s) => a + s.total, 0);
  const month = sales.reduce((a, s) => a + s.total, 0);
  const active = members.filter((m) => m.status === 'active').length;
  const inside = members.filter((m) => m.inside).length;
  const low = products.filter((p) => p.stock <= p.minStock).length;

  return (
    <div className="p-4 space-y-3">
      <div className="text-center">
        <div className="text-xs text-[#8fa6c3]">{nav.appName}</div>
        <div className="w-2 h-2 mx-auto rounded-full bg-green-400 animate-pulse mt-1"></div>
        <div className="text-[11px] text-green-400">{new Date().toTimeString().slice(0, 5)} — {langEn ? 'LIVE' : 'مباشر'}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Card><div className="text-[10px] text-[#8fa6c3]">{t('todayRevenue')}</div><div className="text-lg font-extrabold text-[#4da3ff]">{today} {t('egp')}</div></Card>
        <Card><div className="text-[10px] text-[#8fa6c3]">{t('monthRevenue')}</div><div className="text-lg font-extrabold text-[#22c55e]">{month} {t('egp')}</div></Card>
        <Card><div className="text-[10px] text-[#8fa6c3]">{t('insideNow')}</div><div className="text-lg font-extrabold text-[#f59e0b]">{inside}</div></Card>
        <Card><div className="text-[10px] text-[#8fa6c3]">{t('activeMembers')}</div><div className="text-lg font-extrabold text-[#a855f7]">{active}</div></Card>
        <Card><div className="text-[10px] text-[#8fa6c3]">{t('lowStock')}</div><div className="text-lg font-extrabold text-red-400">{low}</div></Card>
        <Card><div className="text-[10px] text-[#8fa6c3]">🔔 {t('notifications')}</div><div className="text-lg font-extrabold text-[#22d3ee]">{notifs.length}</div></Card>
      </div>
      <Card>
        <div className="text-sm font-bold mb-2">🔔 {langEn ? 'Live notifications' : 'إشعارات مباشرة'}</div>
        <div className="space-y-1.5 text-xs max-h-72 overflow-y-auto">
          {notifs.length === 0 && <div className="text-[#5F7391]">{langEn ? 'Watch live activity here' : 'شاهد النشاط المباشر هنا'}</div>}
          {notifs.slice(0, 20).map((n) => (
            <div key={n.id} className="flex justify-between py-1 border-b border-[#16283f] last:border-0">
              <span>{n.title} — {n.body}</span><span className="text-[#5F7391]">{n.time}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="text-center text-[10px] text-[#5F7391]">{langEn ? 'Open on a phone to preview mobile layout' : 'افتح على هاتف لمعاينة شكل الهاتف'}</div>
    </div>
  );
}