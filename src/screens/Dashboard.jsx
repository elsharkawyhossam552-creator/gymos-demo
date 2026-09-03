import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from 'recharts';
import { useStore } from '../store';
import { Card, StatCard } from '../components/ui';

const MONTH_KEYS = ['ينا', 'فبر', 'مار', 'أبر', 'ماي', 'يون', 'يول', 'أغس', 'سبت', 'أكت', 'نوف', 'ديس'];
const MONTH_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function Dashboard({ nav }) {
  const { sales, members, products, notifs, notify } = useStore();
  const t = nav.t;
  const todayRevenue = sales.sales.filter((s) => new Date(s.when).getDate() === new Date().getDate())
    .reduce((a, s) => a + s.total, 0);
  const monthRevenue = sales.sales.reduce((a, s) => a + s.total, 0);
  const active = members.filter((m) => m.status === 'active').length;
  const inside = members.filter((m) => m.inside).length;
  const lowStock = products.filter((p) => p.stock <= p.minStock);

  const chartData = useMemo(() => {
    const now = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now); d.setDate(d.getDate() - i);
      const daySales = sales.sales.filter((s) => new Date(s.when).toDateString() === d.toDateString())
        .reduce((a, s) => a + s.total, 0);
      days.push({ day: d.getDate(), sales: daySales });
    }
    return days;
  }, [sales]);

  const monthChart = useMemo(() => {
    const now = new Date();
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      data.push({ month: nav.langEn ? MONTH_EN[d.getMonth()] : MONTH_KEYS[d.getMonth()], revenue: 12000 + Math.floor(Math.random() * 16000) });
    }
    return data;
  }, [nav.langEn]);

  const alerts = [
    ...lowStock.map((p) => ({ type: 'danger', txt: `${p.name} — ${p.stock}/${p.minStock}`, icon: '📦' })),
    ...members.filter((m) => m.status === 'expiring').slice(0, 3).map((m) => ({ type: 'warn', txt: `${m.fullName} — ${t('expiring')}`, icon: '⏳' })),
    ...members.filter((m) => m.balanceDue > 0).slice(0, 2).map((m) => ({ type: 'purple', txt: `${m.fullName} — ${t('outstandingDebt')}: ${m.balanceDue}`, icon: '💳' })),
  ];

  return (
    <div className="p-5 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="💵" label={t('todayRevenue')} value={todayRevenue.toLocaleString() + ' ' + t('egp')} color="#4da3ff" />
        <StatCard icon="📈" label={t('monthRevenue')} value={monthRevenue.toLocaleString() + ' ' + t('egp')} color="#22c55e" />
        <StatCard icon="🏃" label={t('insideNow')} value={inside} color="#f59e0b" />
        <StatCard icon="👥" label={t('activeMembers')} value={active} color="#a855f7" sub={`${members.length} ${nav.langEn ? 'total' : 'إجمالي'}`} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <div className="text-sm font-bold mb-3">📈 {t('soldToday')} — 7 {nav.langEn ? 'days' : 'أيام'}</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4da3ff" stopOpacity={0.4}/><stop offset="100%" stopColor="#4da3ff" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="#1b2f4d" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#5F7391" tickLine={false} axisLine={false} />
              <YAxis stroke="#5F7391" tickLine={false} axisLine={false} width={30} />
              <Tooltip contentStyle={{ background: '#101f36', border: '1px solid #24405F', borderRadius: 8 }} />
              <Area type="monotone" dataKey="sales" stroke="#4da3ff" fill="url(#g)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <div className="space-y-4">
          <Card>
            <div className="text-sm font-bold mb-3">🔴 {t('alerts')}</div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {alerts.length === 0 && <div className="text-xs text-[#5F7391]">✓ {nav.langEn ? 'All good' : 'كل شيء جيد'}</div>}
              {alerts.map((a, i) => (
                <div key={i} className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                  a.type === 'danger' ? 'bg-red-500/10 text-red-300' : a.type === 'warn' ? 'bg-amber-500/10 text-amber-300' : 'bg-purple-500/10 text-purple-300'}`}>
                  {a.icon}{a.txt}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="text-sm font-bold mb-3">⚡ {t('quickActions')}</div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => nav.go('pos')} className="bg-[#1F6FEB]/15 hover:bg-[#1F6FEB]/25 text-[#6ec1ff] rounded-lg py-2 text-xs font-bold">🛒 {t('pos')}</button>
              <button onClick={() => nav.go('members')} className="bg-[#22c55e]/15 hover:bg-[#22c55e]/25 text-green-400 rounded-lg py-2 text-xs font-bold">➕ {t('add')} {t('members')}</button>
              <button onClick={() => nav.go('attendance')} className="bg-[#f59e0b]/15 hover:bg-[#f59e0b]/25 text-amber-400 rounded-lg py-2 text-xs font-bold">🕒 {t('checkIn')}</button>
              <button onClick={() => nav.go('reports')} className="bg-[#a855f7]/15 hover:bg-[#a855f7]/25 text-purple-300 rounded-lg py-2 text-xs font-bold">📄 {t('reports')}</button>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <div className="text-sm font-bold mb-3">📊 {t('revenueMonthTitle')}</div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthChart}>
            <CartesianGrid stroke="#1b2f4d" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" stroke="#5F7391" tickLine={false} axisLine={false} />
            <YAxis stroke="#5F7391" tickLine={false} axisLine={false} width={35} />
            <Tooltip contentStyle={{ background: '#101f36', border: '1px solid #24405F', borderRadius: 8 }} />
            <Bar dataKey="revenue" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div className="text-sm font-bold mb-3">🕓 {t('activity')}</div>
        <div className="space-y-1.5 text-xs">
          {notifs.length === 0 && <div className="text-[#5F7391]">{nav.langEn ? 'No recent activity yet' : 'لا يوجد نشاط بعد'}</div>}
          {notifs.slice(0, 6).map((n) => (
            <div key={n.id} className="flex justify-between py-1 border-b border-[#16283f] last:border-0">
              <span>{n.title} — {n.body}</span>
              <span className="text-[#5F7391]">{n.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
