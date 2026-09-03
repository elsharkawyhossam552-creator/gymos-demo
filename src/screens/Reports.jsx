import { useState } from 'react';
import { useStore } from '../store';
import { Card, Btn, Badge, useLang } from '../components/ui';

const REPORTS = [
  { k: 'inventoryReport', icon: '📦' },
  { k: 'revenueReport', icon: '📈' },
  { k: 'membersReport', icon: '👥' },
  { k: 'salesReport', icon: '🛒' },
  { k: 'attendanceReport', icon: '🕒' },
];

export default function Reports({ nav }) {
  const { langEn, members, products, sales } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [sel, setSel] = useState('inventoryReport');
  const [gen, setGen] = useState(null);

  const rows = () => {
    switch (sel) {
      case 'inventoryReport': return products.map((p) => [langEn ? p.nameEn : p.name, p.category, String(p.stock), p.price + ' ' + t('egp')]);
      case 'membersReport': return members.map((m) => [m.code, langEn ? m.nameEn : m.fullName, m.phone, langEn ? m.planEn : m.plan]);
      case 'salesReport': return sales.sales.map((s) => [langEn ? s.productNameEn : s.productName, String(s.qty), s.price + ' ' + t('egp'), s.total + ' ' + t('egp')]);
      case 'attendanceReport': return members.slice(0, 15).map((m) => [m.code, langEn ? m.nameEn : m.fullName, String(m.inside ? 1 : 0), String(m.visits)]);
      case 'revenueReport': return [['Day', sales.sales.length + ' sales', undefined, sales.total + ' ' + t('egp')]];
      default: return [];
    }
  };

  const generate = () => {
    const title = t(sel);
    const headers = {
      inventoryReport: [t('name'), t('category'), t('stock'), t('price')],
      membersReport: [t('code'), t('name'), t('phone'), t('plan')],
      salesReport: [t('product'), t('qty'), t('unitPrice'), t('total')],
      attendanceReport: [t('code'), t('name'), t('present') + '(1/0)', t('visits')],
      revenueReport: [t('name'), t('qty'), '', t('total')],
    }[sel];
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html dir="rtl"><head><title>${title}</title>
      <style>body{font-family:'Segoe UI',sans-serif;padding:40px;color:#111}
      h1{font-size:22px;margin-bottom:4px}h2{font-weight:400;font-size:14px;color:#666;margin:0 0 24px}
      table{width:100%;border-collapse:collapse;font-size:13px}
      th{background:#1F6FEB;color:#fff;text-align:right;padding:8px 10px}
      td{border-bottom:1px solid #ddd;padding:7px 10px}
      .foot{margin-top:24px;font-weight:700;font-size:15px}
      .brand{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
      .logo{background:#1F6FEB;color:#fff;font-weight:800;padding:8px 14px;border-radius:10px}
      @media print{body{padding:0}}
      </style></head><body>
      <div class="brand"><div class="logo">GymOS ERP</div>
      <div><span>GYM OS REPORT</span><h2>${new Date().toLocaleDateString()} — ${new Date().toTimeString().slice(0,5)}</h2></div></div>
      <h1>${title}</h1>
      <table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows().map((r) => `<tr>${r.map((c) => `<td>${c ?? ''}</td>`).join('')}</tr>`).join('')}</tbody></table>
      </body></html>`);
    w.document.close();
    w.focus();
    setGen(true);
    setTimeout(() => setGen(false), 2000);
  };

  return (
    <div className="p-5">
      <div className="grid md:grid-cols-3 gap-4 mb-5">
        {REPORTS.map((r) => (
          <Card key={r.k} className={`cursor-pointer ${sel === r.k ? 'border-[#4da3ff]' : ''}`} onClick={() => setSel(r.k)}>
            <div className="text-2xl mb-1">{r.icon}</div>
            <div className="font-bold text-sm">{t(r.k)}</div>
          </Card>
        ))}
      </div>
      <div className="text-sm text-[#8fa6c3] mb-4">💡 {t('reportsHint')}</div>
      <div className="flex gap-3 items-center">
        <Btn onClick={generate}>🖨️ {t('exportPdf')} — {t(sel)}</Btn>
        {gen && <span className="text-green-400 text-sm">✔ {t('generatePdf')}</span>}
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="font-bold mb-2 text-sm">📄 {t(sel)}</div>
        <table className="w-full text-sm">
          <thead><tr className="text-right text-[#8fa6c3] text-xs border-b border-[#1b2f4d]">
            {(sel === 'inventoryReport' ? [t('name'), t('category'), t('stock'), t('price')] :
              sel === 'membersReport' ? [t('code'), t('name'), t('phone'), t('plan')] :
              sel === 'salesReport' ? [t('product'), t('qty'), t('unitPrice'), t('total')] :
              [t('code'), t('name'), t('present'), t('visits')]).map((h) => <th key={h} className="p-3">{h}</th>)}
          </tr></thead>
          <tbody>
            {rows().map((r, i) => (
              <tr key={i} className="border-b border-[#142639]">
                {r.map((c, j) => <td key={j} className="p-3 text-[#a9c0dd]">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
