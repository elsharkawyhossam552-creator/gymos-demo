import { Card, Badge, useLang, StatCard } from '../components/ui';
import { useStore } from '../store';

export default function Owner({ nav }) {
  const { langEn, members, products, sales, notifs } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const today = sales.sales.filter((s) => new Date(s.when).getDate() === new Date().getDate()).reduce((a, s) => a + s.total, 0);
  const active = members.filter((m) => m.status === 'active').length;
  const inside = members.filter((m) => m.inside).length;
  const lowStock = products.filter((p) => p.stock <= p.minStock);
  const debt = members.filter((m) => m.balanceDue > 0).reduce((a, m) => a + m.balanceDue, 0);
  const expiring = members.filter((m) => m.status === 'expiring');

  return (
    <div className="p-5 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        <span className="text-sm font-bold text-green-400">{langEn ? 'LIVE — auto-refresh' : 'مباشر — تحديث تلقائي'}</span>
        <span className="text-xs text-[#5F7391]">• {new Date().toTimeString().slice(0, 5)}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="💵" label={t('todayRevenue')} value={today.toLocaleString() + ' ' + t('egp')} color="#4da3ff" />
        <StatCard icon="📈" label={t('monthRevenue')} value={sales.total.toLocaleString() + ' ' + t('egp')} color="#22c55e" />
        <StatCard icon="🏃" label={t('insideNow')} value={inside} color="#f59e0b" />
        <StatCard icon="👥" label={t('activeMembers')} value={active} color="#a855f7" />
        <StatCard icon="📦" label={t('lowStock')} value={lowStock.length} color="#ef4444" />
        <StatCard icon="⏳" label={langEn ? 'Expiring soon' : 'ينتهي قريباً'} value={expiring.length} color="#f97316" />
        <StatCard icon="💳" label={t('outstandingDebt')} value={debt.toLocaleString() + ' ' + t('egp')} color="#eab308" />
        <StatCard icon="🔔" label={t('notifications')} value={notifs.length} color="#22d3ee" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="text-sm font-bold mb-3">{t('alerts')}</div>
          <div className="space-y-2">
            {lowStock.map((p) => <div key={p.id} className="text-xs bg-red-500/10 text-red-300 px-3 py-2 rounded-lg">📦 {langEn ? p.nameEn : p.name} — {t('stock')}: {p.stock}/{p.minStock}</div>)}
            {expiring.map((m) => <div key={m.id} className="text-xs bg-amber-500/10 text-amber-300 px-3 py-2 rounded-lg">⏳ {langEn ? m.nameEn : m.fullName} — {m.endDate}</div>)}
            {lowStock.length + expiring.length === 0 && <div className="text-xs text-[#5F7391]">✓ {langEn ? 'All good' : 'كل شيء جيد'}</div>}
          </div>
        </Card>
        <Card>
          <div className="text-sm font-bold mb-3">{t('activity')}</div>
          <div className="space-y-1.5 text-xs max-h-60 overflow-y-auto">
            {notifs.length === 0 && <div className="text-[#5F7391]">{langEn ? 'Live activity will appear here' : 'النشاط المباشر يظهر هنا'}</div>}
            {notifs.map((n) => <div key={n.id} className="flex justify-between py-1 border-b border-[#16283f] last:border-0"><span>{n.title} — {n.body}</span><span className="text-[#5F7391]">{n.time}</span></div>)}
          </div>
        </Card>
      </div>
    </div>
  );
}
