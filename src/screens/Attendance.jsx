import { useState } from 'react';
import { useStore } from '../store';
import { Card, Btn, Badge, useLang } from '../components/ui';

export default function Attendance({ nav }) {
  const { langEn, members, toggleInOut, notify } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [q, setQ] = useState('');
  const [code, setCode] = useState('');
  const filtered = members.filter((m) => (m.code + m.fullName + m.nameEn).toLowerCase().includes(q.toLowerCase()));
  const present = members.filter((m) => m.inside);

  const checkByCode = () => {
    const m = members.find((x) => x.code.toLowerCase() === code.trim().toLowerCase());
    if (!m) { notify('⚠️ ' + (langEn ? 'Not found' : 'غير موجود'), code); return; }
    toggleInOut(m.id);
    notify('🕒 ' + (m.inside ? (langEn ? 'Check-out' : 'خروج') : (langEn ? 'Check-in' : 'دخول')), langEn ? m.nameEn : m.fullName);
    setCode('');
  };

  return (
    <div className="p-5">
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <input value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && checkByCode()}
          placeholder={langEn ? 'Scan member code...' : 'أدخل كود العضو أو امسح QR...'} dir="ltr"
          className="w-full max-w-sm bg-[#0d1a2e] border border-[#24405F] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4da3ff]" />
        <Btn onClick={checkByCode}>✅ {t('checkIn')}/{t('checkOut')}</Btn>
        <div className="flex-1" />
        <Badge color="orange" >{langEn ? 'Inside' : 'داخل'}: {present.length}</Badge>
        <Badge color="green">{langEn ? 'Present' : 'حاضر'}: {present.length}</Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {filtered.map((m) => (
          <Card key={m.id} className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl ${m.inside ? 'bg-green-500/15' : 'bg-[#1b2f4d]'}`}>🏃</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm">{langEn ? m.nameEn : m.fullName}</div>
              <div className="text-xs text-[#8fa6c3]">{m.code} • {langEn ? m.planEn : m.plan}</div>
            </div>
            <Btn variant={m.inside ? 'danger' : 'success'} className="px-3 py-1.5 text-xs" onClick={() => toggleInOut(m.id)}>
              {m.inside ? t('checkOut') : t('checkIn')}
            </Btn>
          </Card>
        ))}
        {filtered.length === 0 && <div className="text-center text-[#5F7391] py-10">{t('empty')}</div>}
      </div>
    </div>
  );
}
