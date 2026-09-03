import { useState } from 'react';
import { useStore } from '../store';
import { Card, Btn, Badge, Modal, Field, inputCls, useLang } from '../components/ui';

export default function Training({ nav }) {
  const { langEn, seed, notify } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [tab, setTab] = useState('classes');
  const [cls, setCls] = useState(null);

  const classes = seed.classes;

  return (
    <div className="p-5">
      <div className="flex gap-2 mb-4">
        {[{ k: 'classes', i: '🗓️' }, { k: 'workouts', i: '🏋️' }, { k: 'equipment', i: '🛠️' }].map((x) => (
          <button key={x.k} onClick={() => setTab(x.k)}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${tab === x.k ? 'bg-[#1F6FEB] text-white' : 'bg-[#17263b] text-[#a9c0dd]'}`}>
            {x.i} {t(['classes','workouts','equipment'].includes(x.k) ? x.k : x.k)}
          </button>
        ))}
      </div>

      {tab === 'classes' && (
        <div className="grid md:grid-cols-3 gap-4">
          {classes.map((c) => (
            <Card key={c.id} className="cursor-pointer hover:border-[#4da3ff]" onClick={() => setCls(c)}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-extrabold">{langEn ? c.nameEn : c.name}</div>
                  <div className="text-xs text-[#8fa6c3]">🕐 {c.time} • {t('trainer')}: {langEn ? '' : c.trainer}</div>
                </div>
                <span className="text-3xl">🎯</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-2 bg-[#152842] rounded-full overflow-hidden">
                  <div className="h-full bg-[#22c55e]" style={{ width: (c.booked / c.capacity) * 100 + '%' }}></div>
                </div>
                <span className="text-xs text-[#8fa6c3]">{c.booked}/{c.capacity}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'workouts' && (
        <div className="grid md:grid-cols-3 gap-3">
          {seed.workouts.map((w) => (
            <Card key={w.id} className="flex items-center gap-3">
              <div className="text-3xl">{w.photo || (w.group === 'صدر' ? '💪' : w.group === 'أرجل' ? '🦵' : w.group === 'ظهر' ? '🔙' : '🏋️')}</div>
              <div className="flex-1">
                <div className="font-bold">{langEn ? w.nameEn : w.name}</div>
                <div className="text-xs text-[#8fa6c3]">{t('group')}: {w.group} • {w.reps} reps • {w.seconds}s</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'equipment' && (
        <div className="grid md:grid-cols-3 gap-3">
          {seed.equipment.map((e) => (
            <Card key={e.id} className="flex items-center gap-3">
              <div className="text-3xl">🪑</div>
              <div className="flex-1">
                <div className="font-bold">{langEn ? e.nameEn : e.name}</div>
                <div className="text-xs text-[#8fa6c3]">{t('type')}: {e.type}</div>
              </div>
              <Badge color={e.status === 'صيانة' ? 'red' : 'green'}>{e.status === 'صيانة' ? (langEn ? 'Maintenance' : 'صيانة') : langEn ? 'Good' : 'جيد'}</Badge>
            </Card>
          ))}
        </div>
      )}

      {cls && (
        <Modal open onClose={() => setCls(null)} title={langEn ? cls.nameEn : cls.name}>
          <div className="text-sm space-y-2 text-[#a9c0dd]">
            <div>🕐 {t('time', 'الوقت')}: {cls.time}</div>
            <div>👤 {t('trainer')}: {cls.trainer}</div>
            <div>👥 {t('booked')}: {cls.booked} / {cls.capacity}</div>
          </div>
          <Btn className="mt-4 w-full" onClick={() => { notify('✔ ' + (langEn ? 'Booked' : 'تم الحجز'), langEn ? cls.nameEn : cls.name); setCls(null); }}>{t('bookSeat')}</Btn>
        </Modal>
      )}
    </div>
  );
}
