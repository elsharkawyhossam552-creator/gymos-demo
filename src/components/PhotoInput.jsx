import { useRef } from 'react';

export default function PhotoInput({ value, onChange, size = 88 }) {
  const ref = useRef(null);
  const pick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(f);
  };
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl border border-[#24405F] bg-[#0d1a2e] flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size }}>
        {value ? <img src={value} className="w-full h-full object-cover" alt="preview" /> : <span className="text-3xl">📷</span>}
      </div>
      <div className="space-y-1.5">
        <button onClick={() => ref.current.click()} className="bg-[#1F6FEB]/15 hover:bg-[#1F6FEB]/25 text-[#6ec1ff] text-xs font-bold px-3 py-1.5 rounded-lg">⬆ {value ? 'Change' : 'Upload'}</button>
        {value && <button onClick={() => onChange('')} className="block text-red-400 text-xs font-bold">✕ Remove</button>}
        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={pick} />
      </div>
    </div>
  );
}
