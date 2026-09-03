import { useState } from 'react';
import { useStore } from '../store';
import { Card, Btn, Modal, useLang } from '../components/ui';

export default function Pos({ nav }) {
  const { langEn, products, setProducts, notify, members } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [q, setQ] = useState('');
  const [cart, setCart] = useState([]);
  const [payModal, setPayModal] = useState(false);
  const [payment, setPayment] = useState('cash');
  const [memberSel, setMemberSel] = useState('');

  const filtered = products.filter((p) => (p.name + p.nameEn).toLowerCase().includes(q.toLowerCase()));
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);

  const add = (p) => {
    if (p.stock <= 0) { notify('⚠️ ' + t('soldOut'), p.name); return; }
    setCart((c) => {
      const ex = c.find((x) => x.id === p.id);
      if (ex) return c.map((x) => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...p, qty: 1 }];
    });
    setProducts(products.map((x) => x.id === p.id ? { ...x, stock: x.stock - 1 } : x));
  };
  const remove = (id) => {
    const item = cart.find((x) => x.id === id);
    setProducts(products.map((x) => x.id === id ? { ...x, stock: x.stock + item.qty } : x));
    setCart(cart.filter((x) => x.id !== id));
  };
  const inc = (id) => {
    const item = cart.find((x) => x.id === id);
    if (item.stock <= 0) return;
    setProducts(products.map((x) => x.id === id ? { ...x, stock: x.stock - 1 } : x));
    setCart(cart.map((x) => x.id === id ? { ...x, qty: x.qty + 1 } : x));
  };
  const checkout = () => {
    notify((langEn ? '✔ Sale' : '✔ عملية بيع'), (memberSel ? (langEn ? 'Member: ' : 'عضو: ') + memberSel + ' • ' : '') + t('total') + ': ' + total + ' ' + t('egp'));
    const w = window.open('', '_blank');
    if (w) {
      const header = langEn ? 'GYM OS — Receipt' : 'GymOS — فاتورة';
      w.document.write(`<html dir="rtl"><head><title>${header}</title>
        <style>body{font-family:'Segoe UI',sans-serif;padding:32px;color:#111;max-width:360px;margin:auto}
        h1{font-size:18px;margin:0 0 4px}.sub{font-size:11px;color:#777;margin-bottom:16px}
        table{width:100%;border-collapse:collapse;font-size:12px}.line{border-bottom:1px dashed #ccc;padding:5px 0}
        .tot{margin-top:14px;font-size:15px;font-weight:700;border-top:2px solid #333;padding-top:8px}
        .foot{margin-top:22px;font-size:10px;color:#999;border-top:1px dashed #ccc;padding-top:8px}
        @media print{body{padding:0}}
        </style></head><body>
        <div style="text-align:center"><div style="background:#1F6FEB;color:#fff;font-weight:800;padding:8px;border-radius:10px;display:inline-block">GymOS ERP</div></div>
        <h1 style="text-align:center">${header}</h1>
        <div class="sub" style="text-align:center">${new Date().toLocaleString()}${memberSel ? '<br>' + (langEn ? 'Member' : 'العضو') + ': ' + memberSel : ''}</div>
        <table>${cart.map((c) => `<tr class="line"><td>${langEn ? c.nameEn : c.name} × ${c.qty}</td><td style="text-align:left">${c.price * c.qty} EGP</td></tr>`).join('')}</table>
        <div class="tot">${t('total')}: ${total} EGP</div>
        <div class="foot" style="text-align:center">GymOS — <span id="pBtn" style="color:#1F6FEB;cursor:pointer;font-weight:700">${langEn ? 'Print / Save PDF' : 'طباعة / حفظ PDF'}</span></div>
        </body></html>`);
      w.document.close(); w.focus();
    }
    setCart([]);
    setPayModal(false);
    setMemberSel('');
  };

  return (
    <div className="p-5 grid md:grid-cols-5 gap-4 h-[calc(100vh-6rem)]">
      <div className="md:col-span-3 flex flex-col">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('search')}
          className="w-full bg-[#0d1a2e] border border-[#24405F] rounded-lg px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-[#4da3ff]" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto flex-1">
          {filtered.map((p) => (
            <button key={p.id} onClick={() => add(p)} className="bg-[#101f36] border border-[#1b2f4d] rounded-xl p-3 text-right hover:border-[#4da3ff] transition text-left">
              {p.photo ? <img src={p.photo} className="w-16 h-16 object-cover rounded-lg mb-1" alt="" /> : <div className="text-3xl mb-1">📦</div>}
              <div className="font-bold text-sm leading-tight">{langEn ? p.nameEn : p.name}</div>
              <div className="text-xs text-[#8fa6c3]">{p.price} {t('egp')}</div>
              <div className={`text-[10px] mt-1 ${p.stock <= p.minStock ? 'text-red-400' : 'text-[#5F7391]'}`}>
                {t('stock')}: {p.stock}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Card className="md:col-span-2 flex flex-col h-full">
        <div className="font-bold mb-3">🛒 {t('cart')} ({cart.length})</div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {cart.length === 0 && <div className="text-center text-[#5F7391] text-sm py-10">{t('empty')}</div>}
          {cart.map((c) => (
            <div key={c.id} className="flex items-center gap-2 bg-[#152842] rounded-lg p-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">{langEn ? c.nameEn : c.name}</div>
                <div className="text-xs text-[#8fa6c3]">{c.price} × {c.qty}</div>
              </div>
              <button onClick={() => inc(c.id)} className="w-6 h-6 rounded bg-[#1F6FEB] text-white text-sm">+</button>
              <button onClick={() => setCart(cart.map((x) => x.id === c.id ? { ...x, qty: x.qty - 1 } : x).filter((x) => x.qty > 0))}
                className="w-6 h-6 rounded bg-[#1e3350] text-white text-sm">−</button>
              <button onClick={() => remove(c.id)} className="w-6 h-6 rounded bg-red-600/20 text-red-400 text-sm">×</button>
              <div className="w-20 text-left font-bold">{c.price * c.qty}</div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1b2f4d] pt-3 mt-3 space-y-2">
          <div className="flex justify-between text-lg font-extrabold">
            <span>{t('total')}</span><span className="text-[#4da3ff]">{total} {t('egp')}</span>
          </div>
          <Btn className="w-full" onClick={() => setPayModal(true)} disabled={cart.length === 0} >{t('checkout')}</Btn>
        </div>
      </Card>

      <Modal open={payModal} onClose={() => setPayModal(false)} title={t('payment')}>
        <Field label={t('memberName')}>
          <select value={memberSel} onChange={(e) => setMemberSel(e.target.value)} className="w-full bg-[#0d1a2e] border border-[#24405F] rounded-lg px-3 py-2 text-sm">
            <option value="">{langEn ? 'Walk-in / Guest' : 'عميل عابر / ضيف'}</option>
            {members.map((m) => <option key={m.id} value={langEn ? m.nameEn : m.fullName}>{langEn ? m.nameEn : m.fullName}</option>)}
          </select>
        </Field>
        <Field label={t('payment')}>
          <div className="flex gap-2">
            {['cash', 'card'].map((p) => (
              <button key={p} onClick={() => setPayment(p)}
                className={`flex-1 py-2 rounded-lg font-bold text-sm ${payment === p ? 'bg-[#1F6FEB] text-white' : 'bg-[#152842] text-[#8fa6c3]'}`}>
                {t(p)} {p === 'cash' ? '💵' : '💳'}
              </button>
            ))}
          </div>
        </Field>
        <div className="flex justify-between text-lg font-extrabold my-3"><span>{t('total')}</span><span className="text-[#4da3ff]">{total} {t('egp')}</span></div>
        <Btn className="w-full" onClick={checkout}>✔ {t('checkout')}</Btn>
      </Modal>
    </div>
  );
}

function Field({ label, children }) {
  return <label className="block mb-3"><span className="text-xs text-[#8fa6c3] block mb-1">{label}</span>{children}</label>;
}
