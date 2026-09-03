import { useState } from 'react';
import { useStore } from '../store';
import { Card, Btn, Badge, useLang } from '../components/ui';

const STATUS = { new: 'new', contact: 'contact', visit: 'visit', canceled: 'canceled' };

export default function Crm({ nav }) {
  const { langEn, seed, notify } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [view, setView] = useState(seed.leads[0]);
  const leads = seed.leads;

  const advance = (l) => {
    const order = ['new', 'contact', 'visit', 'canceled'];
    const idx = order.indexOf(l.status);
    const next = order[Math.min(idx + 1, 3)];
    notify('📞 ' + (langEn ? 'Lead updated' : 'تم تحديث العميل'), langEn ? l.nameEn : l.name + ' → ' + t(next));
    setView({ ...l, status: next });
  };

  const color = (s) => s === 'new' ? 'blue' : s === 'contact' ? 'amber' : s === 'visit' ? 'green' : 'red';

  return (
    <div className="p-5 grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-2">
        {leads.map((l) => (
          <Card key={l.id} className={`cursor-pointer ${view.id === l.id ? 'border-[#4da3ff]' : ''}`} onClick={() => setView(l)}>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-sm">{langEn ? l.nameEn : l.name}</div>
                <div className="text-xs text-[#8fa6c3]" dir="ltr">{l.phone}</div>
              </div>
              <Badge color={color(l.status)}>{t(l.status)}</Badge>
            </div>
          </Card>
        ))}
      </div>
      <div className="md:col-span-2">
        {view && (
          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xl font-extrabold">{langEn ? view.nameEn : view.name}</div>
                <div className="text-sm text-[#8fa6c3]" dir="ltr">{view.phone}</div>
                <div className="text-sm text-[#a9c0dd] mt-2">{t('source')}: {view.source} • {t('expected')}: {view.expected} {t('egp')}</div>
                <div className="mt-2"><Badge color={color(view.status)}>{t(view.status)}</Badge></div>
              </div>
              <Btn onClick={() => advance(view)}>➡ {t('advance', 'تقدم المرحلة')}</Btn>
            </div>
            <div className="flex items-center gap-2">
              {['new', 'contact', 'visit', 'canceled'].map((s) => (
                <div key={s} className={`flex-1 text-center py-2 rounded-lg text-xs font-bold ${s === view.status ? 'bg-[#1F6FEB] text-white' : s === 'canceled' ? 'bg-red-500/10 text-red-300' : 'bg-[#152842] text-[#8fa6c3]'}`}>
                  {t(s)}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
