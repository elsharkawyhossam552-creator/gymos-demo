import { useState } from 'react';
import { useStore } from '../store';
import { Card, Btn, Modal, Field, inputCls, useLang } from '../components/ui';

export default function Cash({ nav }) {
  const { langEn, seed, notify } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [cash, setCash] = useState(25000);
  const [expenses, setExpenses] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ expense: seed.expenses[0], amount: 100, note: '' });

  const todayExpenses = expenses.reduce((a, e) => a + e.amount, 0);

  const save = () => {
    setCash((c) => c - form.amount);
    setExpenses([{ id: 'X-' + Math.random().toString(36).slice(2, 8), expense: form.expense, amount: form.amount, note: form.note }, ...expenses]);
    notify('💸 ' + (langEn ? 'Expense added' : 'تمت إضافة مصروف'), form.expense + ': ' + form.amount);
    setOpen(false);
    setForm({ expense: seed.expenses[0], amount: 100, note: '' });
  };

  return (
    <div className="p-5">
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <Card><div className="text-xs text-[#8fa6c3]">{t('cash')}</div><div className="text-2xl font-extrabold text-green-400">{cash.toLocaleString()} {t('egp')}</div></Card>
        <Card><div className="text-xs text-[#8fa6c3]">{t('expense')} {langEn ? 'today' : 'اليوم'}</div><div className="text-2xl font-extrabold text-red-400">{todayExpenses.toLocaleString()} {t('egp')}</div></Card>
        <div className="flex items-end"><Btn onClick={() => setOpen(true)}>+ {t('add')} {t('expense')}</Btn></div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-right text-[#8fa6c3] text-xs border-b border-[#1b2f4d]">
            <th className="p-3">{t('expense')}</th><th className="p-3">{t('amount')}</th><th className="p-3">{t('details')}</th><th className="p-3">{t('time')}</th>
          </tr></thead>
          <tbody>
            {expenses.length === 0 && <tr><td className="p-6 text-center text-[#5F7391]" colSpan={4}>{t('empty')}</td></tr>}
            {expenses.map((e) => (
              <tr key={e.id} className="border-b border-[#142639]">
                <td className="p-3 font-bold">{e.expense}</td>
                <td className="p-3 text-red-400">{e.amount} {t('egp')}</td>
                <td className="p-3 text-[#a9c0dd]">{e.note}</td>
                <td className="p-3 text-[#5F7391]">{new Date().toTimeString().slice(0, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={t('expense')}>
        <Field label={t('expense')}>
          <select className={inputCls} value={form.expense} onChange={(e) => setForm({ ...form, expense: e.target.value })}>
            {seed.expenses.map((x) => <option key={x}>{x}</option>)}
          </select>
        </Field>
        <Field label={t('amount')}><input className={inputCls} type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: +e.target.value })} /></Field>
        <Field label={t('details')}><input className={inputCls} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
        <div className="flex gap-2 justify-end"><Btn variant="ghost" onClick={() => setOpen(false)}>{t('cancel')}</Btn><Btn onClick={save}>{t('save')}</Btn></div>
      </Modal>
    </div>
  );
}
