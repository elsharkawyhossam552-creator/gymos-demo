import { useState } from 'react';
import { L } from '../i18n';

export function useLang(lang) {
  const t = (key) => (L[lang] && L[lang][key]) || L.en[key] || key;
  return t;
}

export function Btn({ children, onClick, variant = 'primary', className = '', type = 'button' }) {
  const styles = {
    primary: 'bg-[#1F6FEB] hover:bg-[#1a5fc9] text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-[#17263b] hover:bg-[#1e3350] text-[#a9c0dd] border border-[#24405F]',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    warn: 'bg-amber-500 hover:bg-amber-600 text-black',
  }[variant];
  return (
    <button type={type} onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition ${styles} ${className}`}>
      {children}
    </button>
  );
}

export function Card({ children, className = '' }) {
  return <div className={`bg-[#101f36] border border-[#1b2f4d] rounded-2xl p-4 ${className}`}>{children}</div>;
}

export function StatCard({ icon, label, value, color = '#4da3ff', sub }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: color + '1a', color }}>{icon}</div>
        <div className="min-w-0">
          <div className="text-[#8fa6c3] text-xs">{label}</div>
          <div className="text-xl font-extrabold truncate">{value}</div>
          {sub && <div className="text-[10px] text-[#5F7391]">{sub}</div>}
        </div>
      </div>
    </Card>
  );
}

export function Badge({ children, color = 'slate' }) {
  const map = {
    green: 'bg-green-500/15 text-green-400',
    red: 'bg-red-500/15 text-red-400',
    amber: 'bg-amber-500/15 text-amber-400',
    blue: 'bg-blue-500/15 text-blue-400',
    slate: 'bg-slate-500/15 text-slate-300',
    purple: 'bg-purple-500/15 text-purple-300',
  };
  return <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${map[color] || map.slate}`}>{children}</span>;
}

export function Modal({ open, onClose, title, children, width = 'max-w-lg' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className={`bg-[#101f36] border border-[#24405F] rounded-2xl w-full ${width} max-h-[85vh] flex flex-col shadow-2xl`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1b2f4d]">
          <h3 className="font-extrabold">{title}</h3>
          <button onClick={onClose} className="text-[#8fa6c3] hover:text-white text-xl leading-none">×</button>
        </div>
        <div className="p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="text-xs text-[#8fa6c3] block mb-1">{label}</span>
      {children}
    </label>
  );
}

export const inputCls = "w-full bg-[#0d1a2e] border border-[#24405F] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4da3ff]";

export function Confirm({ open, onClose, onOk, message }) {
  const t = useLang('ar');
  return (
    <Modal open={open} onClose={onClose} title={t('confirmDelete')} width="max-w-sm">
      <p className="text-sm text-[#c6d6ec] mb-4">{message}</p>
      <div className="flex gap-2 justify-end">
        <Btn variant="ghost" onClick={onClose}>{t('cancel')}</Btn>
        <Btn variant="danger" onClick={() => { onOk(); onClose(); }}>{t('delete')}</Btn>
      </div>
    </Modal>
  );
}

export function Toasts({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 w-[360px]">
      {toasts.map((t) => (
        <div key={t.id} className="bg-[#123049] border border-[#2a4a75] rounded-xl px-4 py-3 shadow-xl text-sm animate-[fadeIn_.2s]">
          <b className="block text-[#6ec1ff]">{t.title}</b>
          <span className="text-[#c6d6ec]">{t.body}</span>
        </div>
      ))}
    </div>
  );
}

export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const push = (title, body) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((p) => [...p, { id, title, body }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 3500);
  };
  return { toasts, push };
}
