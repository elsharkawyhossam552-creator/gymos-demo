import { useState } from 'react';
import { useStore } from '../store';
import { Card, Btn, Badge, Modal, Field, inputCls, Confirm, useLang } from '../components/ui';
import PhotoInput from '../components/PhotoInput';

const CATS = [
  { ar: 'مكملات', en: 'Supplements' }, { ar: 'مشروبات', en: 'Drinks' },
  { ar: 'إكسسوارات', en: 'Accessories' }, { ar: 'أغذية', en: 'Food' },
];

export default function Inventory({ nav }) {
  const { langEn, products, setProducts, notify } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  const [form, setForm] = useState({ name: '', nameEn: '', price: 100, cost: 60, stock: 10, minStock: 3, category: 0, photo: '' });

  const filtered = products.filter((p) => (p.name + p.nameEn).toLowerCase().includes(q.toLowerCase()));
  const low = products.filter((p) => p.stock <= p.minStock);

  const openEdit = (p) => {
    setEdit(p);
    setForm({ name: p.name, nameEn: p.nameEn, price: p.price, cost: p.cost, stock: p.stock, minStock: p.minStock, category: CATS.findIndex((c) => c.ar === p.category), photo: p.photo || '' });
  };
  const save = () => {
    const cat = CATS[form.category];
    if (edit) {
      setProducts(products.map((p) => p.id === edit.id ? { ...p, ...form, category: cat.ar, categoryEn: cat.en } : p));
      notify('✔ ' + (langEn ? 'Product updated' : 'تم تعديل المنتج'), form.name);
    } else {
      const n = { id: 'P-' + Math.random().toString(36).slice(2, 8), code: 'P' + String(100 + Math.floor(Math.random() * 900)), name: form.name, nameEn: form.nameEn, price: form.price, cost: form.cost, stock: form.stock, minStock: form.minStock, unit: 'قطعة', category: cat.ar, categoryEn: cat.en, photo: form.photo };
      setProducts([n, ...products]);
      notify('➕ ' + (langEn ? 'Product added' : 'تمت إضافة منتج'), form.name);
    }
    setOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search')} className={`${inputCls} max-w-xs`} />
        <div className="flex-1" />
        <Badge color="red">{t('lowStock')}: {low.length}</Badge>
        <Btn onClick={() => { setEdit(null); setForm({ name: '', nameEn: '', price: 100, cost: 60, stock: 10, minStock: 3, category: 0 }); setOpen(true); }}>+ {t('add')}</Btn>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-right text-[#8fa6c3] text-xs border-b border-[#1b2f4d]">
              <th className="p-3">{t('photo')}</th><th className="p-3">{t('code')}</th><th className="p-3">{t('name')}</th>
              <th className="p-3">{t('category')}</th><th className="p-3">{t('price')}</th>
              <th className="p-3">{t('stock')}</th><th className="p-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-[#142639] hover:bg-[#152842]">
                <td className="p-3">
                  <div className="w-9 h-9 rounded-lg bg-[#152842] border border-[#24405F] flex items-center justify-center overflow-hidden text-sm">
                    {p.photo ? <img src={p.photo} className="w-full h-full object-cover" alt="" /> : '📦'}
                  </div>
                </td>
                <td className="p-3 text-[#6ec1ff] font-bold">{p.code}</td>
                <td className="p-3 font-bold">{langEn ? p.nameEn : p.name}</td>
                <td className="p-3 text-[#a9c0dd]">{langEn ? p.categoryEn : p.category}</td>
                <td className="p-3">{p.price} {t('egp')}</td>
                <td className="p-3">
                  <Badge color={p.stock <= p.minStock ? 'red' : p.stock <= p.minStock * 2 ? 'amber' : 'green'}>{p.stock}</Badge>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Btn variant="ghost" className="px-2 py-1" onClick={() => openEdit(p)}>✎</Btn>
                    <Btn variant="ghost" className="px-2 py-1" onClick={() => setDel(p)}>🗑</Btn>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td className="p-6 text-center text-[#5F7391]" colSpan={7}>{t('empty')}</td></tr>}
          </tbody>
        </table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={(edit ? t('edit') : t('add'))}>
        <PhotoInput value={form.photo} onChange={(photo) => setForm({ ...form, photo })} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label={t('name') + ' (عربي)'}><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label={t('name') + ' (EN)'}><input className={inputCls} value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} /></Field>
          <Field label={t('category')}><select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: +e.target.value })}>{CATS.map((c, i) => <option key={i} value={i}>{langEn ? c.en : c.ar}</option>)}</select></Field>
          <Field label={t('price')}><input className={inputCls} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} /></Field>
          <Field label={t('cost')}><input className={inputCls} type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: +e.target.value })} /></Field>
          <Field label={t('stock')}><input className={inputCls} type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })} /></Field>
          <Field label={t('minStock')}><input className={inputCls} type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: +e.target.value })} /></Field>
        </div>
        <div className="flex gap-2 justify-end mt-4"><Btn variant="ghost" onClick={() => setOpen(false)}>{t('cancel')}</Btn><Btn onClick={save}>{t('save')}</Btn></div>
      </Modal>

      <Confirm open={!!del} onClose={() => setDel(null)} onOk={() => { setProducts(products.filter((p) => p.id !== del.id)); notify('🗑 ' + (langEn ? 'Product deleted' : 'تم حذف المنتج'), del.name); }} message={del ? (langEn ? del.nameEn : del.name) : ''} />
    </div>
  );
}
