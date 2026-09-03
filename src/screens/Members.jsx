import { useState } from 'react';
import { useStore, Plans } from '../store';
import { Card, Btn, Badge, Modal, Field, inputCls, Confirm, useLang } from '../components/ui';
import PhotoInput from '../components/PhotoInput';
import { QRCodeSVG } from 'qrcode.react';

const PLANS = Plans();

export default function Members({ nav }) {
  const { langEn, members, setMembers, notify } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [view, setView] = useState(null);
  const [form, setForm] = useState({
    fullName: '', phone: '', gender: 'ذكر', planIndex: 0, price: PLANS[0].price, photo: '',
  });

  const filtered = members.filter((m) => {
    const matchName = (m.fullName + m.nameEn + m.code).toLowerCase().includes(q.toLowerCase());
    const matchStatus = status === 'all' || m.status === status;
    return matchName && matchStatus;
  });

  const openNew = () => {
    setEdit(null);
    setForm({ fullName: '', phone: '', gender: 'ذكر', planIndex: 0, price: PLANS[0].price, photo: '' });
    setOpen(true);
  };
  const openEdit = (m) => {
    setEdit(m);
    setForm({ fullName: m.fullName, phone: m.phone, gender: m.gender, planIndex: PLANS.findIndex((p) => p.ar === m.plan), price: m.price, photo: m.photo || '' });
    setOpen(true);
  };
  const save = () => {
    const plan = PLANS[form.planIndex];
    const now = new Date();
    const end = new Date(); end.setMonth(end.getMonth() + plan.months);
    if (edit) {
      setMembers(members.map((m) => m.id === edit.id ? { ...m, ...form, plan: plan.ar, planEn: plan.en, endDate: end.toISOString().slice(0,10), status: 'active' } : m));
      notify('✔ ' + (langEn ? 'Member updated' : 'تم تعديل العضو'), form.fullName + (langEn ? ' renewed' : ' تم تجديده'));
    } else {
      const n = {
        id: 'M-' + Math.random().toString(36).slice(2, 8), code: 'M' + String(1000 + Math.floor(Math.random() * 900)),
        fullName: form.fullName, phone: form.phone, gender: form.gender, plan: plan.ar, planEn: plan.en,
        price: form.price, startDate: now.toISOString().slice(0,10), endDate: end.toISOString().slice(0,10),
        status: 'active', inside: false, balanceDue: 0, visits: 0, photo: form.photo, nameEn: form.fullName,
      };
      setMembers([n, ...members]);
      notify('🎉 ' + (langEn ? 'New member' : 'عضو جديد'), form.fullName + (langEn ? ' subscribed' : ' اشترك الآن'));
    }
    setOpen(false);
  };

  const daysLeft = (end) => Math.ceil((new Date(end) - new Date()) / 86400000);

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search')}
          className={`${inputCls} max-w-xs`} />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputCls} max-w-[150px]`}>
          <option value="all">{t('all')}</option>
          <option value="active">{t('active')}</option>
          <option value="expiring">{t('expiring')}</option>
          <option value="frozen">{t('frozen')}</option>
        </select>
        <div className="flex-1" />
        <Btn onClick={openNew}>+ {t('add')} {t('members')}</Btn>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-right text-[#8fa6c3] text-xs border-b border-[#1b2f4d]">
              <th className="p-3">{t('photo')}</th>
              <th className="p-3">{t('code')}</th>
              <th className="p-3">{t('name')}</th>
              <th className="p-3">{t('phone')}</th>
              <th className="p-3">{t('plan')}</th>
              <th className="p-3 hidden md:table-cell">{t('status')}</th>
              <th className="p-3 hidden md:table-cell">{t('dueDays')}</th>
              <th className="p-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td className="p-6 text-center text-[#5F7391]" colSpan={8}>{t('empty')}</td></tr>}
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-[#142639] hover:bg-[#152842] cursor-pointer" onClick={() => setView(m)}>
                <td className="p-3">
                  <div className="w-9 h-9 rounded-lg bg-[#152842] border border-[#24405F] flex items-center justify-center overflow-hidden text-sm">
                    {m.photo ? <img src={m.photo} className="w-full h-full object-cover" alt="" /> : '🕺'}
                  </div>
                </td>
                <td className="p-3 text-[#6ec1ff] font-bold">{m.code}</td>
                <td className="p-3 font-bold">{langEn ? m.nameEn : m.fullName}</td>
                <td className="p-3 text-[#a9c0dd]" dir="ltr">{m.phone}</td>
                <td className="p-3">{langEn ? m.planEn : m.plan}</td>
                <td className="p-3 hidden md:table-cell">
                  <Badge color={m.status === 'active' ? 'green' : m.status === 'expiring' ? 'amber' : 'slate'}>
                    {t(m.status)}
                  </Badge>
                </td>
                <td className="p-3 hidden md:table-cell text-[#a9c0dd]">{daysLeft(m.endDate)}</td>
                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2">
                    <Btn variant="ghost" className="px-2 py-1" onClick={() => openEdit(m)}>✎</Btn>
                    <Btn variant="ghost" className="px-2 py-1" onClick={() => setDel(m)}>🗑</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={(edit ? t('edit') : t('add')) + ' ' + t('members')}>
        <PhotoInput value={form.photo} onChange={(photo) => setForm({ ...form, photo })} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label={t('name')}><input className={inputCls} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></Field>
          <Field label={t('phone')}><input className={inputCls} dir="ltr" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label={t('gender')}>
            <select className={inputCls} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              <option>ذكر</option><option>أنثى</option>
            </select>
          </Field>
          <Field label={t('plan')}>
            <select className={inputCls} value={form.planIndex} onChange={(e) => setForm({ ...form, planIndex: +e.target.value, price: PLANS[+e.target.value].price })}>
              {PLANS.map((p, i) => <option key={i} value={i}>{langEn ? p.en : p.ar}</option>)}
            </select>
          </Field>
          <Field label={t('price')}><input className={inputCls} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} /></Field>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <Btn variant="ghost" onClick={() => setOpen(false)}>{t('cancel')}</Btn>
          <Btn onClick={save}>{t('save')}</Btn>
        </div>
      </Modal>

      {view && (
        <Modal open onClose={() => setView(null)} title={t('details')} width="max-w-2xl">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-2xl bg-[#1F6FEB]/15 border border-[#24405F] flex items-center justify-center text-5xl overflow-hidden">
              {view.photo ? <img src={view.photo} className="w-full h-full object-cover" alt="" /> : '🕺'}
            </div>
            <div>
              <div className="text-xl font-extrabold">{langEn ? view.nameEn : view.fullName}</div>
              <div className="text-sm text-[#8fa6c3]">{t('code')}: {view.code} • {view.gender} • {view.phone}</div>
              <div className="mt-1"><Badge color={view.status === 'active' ? 'green' : view.status === 'expiring' ? 'amber' : 'slate'}>{t(view.status)}</Badge></div>
              <div className="mt-3 grid grid-cols-3 gap-4 text-center text-sm">
                <div className="bg-[#152842] rounded-lg p-2"><div className="text-[#8fa6c3] text-xs">{t('plan')}</div><b>{langEn ? view.planEn : view.plan}</b></div>
                <div className="bg-[#152842] rounded-lg p-2"><div className="text-[#8fa6c3] text-xs">{t('dueDays')}</div><b className="text-[#f59e0b]">{Math.ceil((new Date(view.endDate) - new Date()) / 86400000)}</b></div>
                <div className="bg-[#152842] rounded-lg p-2"><div className="text-[#8fa6c3] text-xs">{t('visits')}</div><b className="text-[#4da3ff]">{view.visits}</b></div>
              </div>
              <div className="mt-3 text-xs text-[#a9c0dd]">{t('startDate')}: {view.startDate} → {t('endDate')}: {view.endDate}</div>
            </div>
            <div className="ml-auto flex flex-col items-center gap-1">
              <div className="bg-white p-2 rounded-lg"><QRCodeSVG value={view.code + '|' + view.fullName} size={96} /></div>
              <span className="text-[10px] text-[#5F7391]">{langEn ? 'Membership QR' : 'QR العضوية'}</span>
            </div>
          </div>
        </Modal>
      )}

      <Confirm open={!!del} onClose={() => setDel(null)} onOk={() => { setMembers(members.filter((m) => m.id !== del.id)); notify('🗑 ' + (langEn ? 'Member deleted' : 'تم حذف العضو'), del.fullName); }} message={del ? del.fullName : ''} />
    </div>
  );
}
