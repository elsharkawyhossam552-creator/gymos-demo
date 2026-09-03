import { useState } from 'react';
import { useStore, USERS } from '../store';

export default function Login({ nav }) {
  const { login, langEn, setLangEn } = useStore();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [err, setErr] = useState(null);

  const submit = () => {
    if (!login(username, password)) { setErr(langEn ? 'Wrong username or password' : 'اسم المستخدم أو كلمة المرور خاطئة'); }
  };

  const quick = (u) => { setUsername(u.username); setPassword(u.password); setErr(null); };

  return (
    <div dir={langEn ? 'ltr' : 'rtl'} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1626] to-[#0f3d82] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1F6FEB] to-[#0f3d82] flex items-center justify-center text-3xl font-black mb-3 shadow-xl">G</div>
          <div className="text-3xl font-extrabold">GymOS <span className="text-[#4da3ff]">ERP</span></div>
          <div className="text-[#8fa6c3] text-sm mt-1">{langEn ? 'Full Interactive Demo — Gym Management' : 'تجربة تفاعلية كاملة — نظام إدارة الصالات'}</div>
        </div>
        <div className="bg-[#101f36] border border-[#1b2f4d] rounded-2xl p-6 shadow-2xl">
          <div className="mb-5 flex flex-wrap gap-2">
            {USERS.map((u) => (
              <button key={u.id} onClick={() => quick(u)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#17263b] hover:bg-[#1e3350] border border-[#24405F] text-[#a9c0dd]">
                {langEn ? u.nameEn : u.nameAr}
              </button>
            ))}
            <button onClick={() => setLangEn(!langEn)} className="mr-auto px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1F6FEB]/15 text-[#6ec1ff] border border-[#24405F]">{langEn ? 'العربية' : 'EN'}</button>
          </div>
          <label className="block mb-3">
            <span className="text-xs text-[#8fa6c3] block mb-1">{langEn ? 'Username' : 'اسم المستخدم'}</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#0d1a2e] border border-[#24405F] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4da3ff]" dir="ltr" />
          </label>
          <label className="block mb-4">
            <span className="text-xs text-[#8fa6c3] block mb-1">{langEn ? 'Password' : 'كلمة المرور'}</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} className="w-full bg-[#0d1a2e] border border-[#24405F] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4da3ff]" dir="ltr" />
          </label>
          {err && <div className="text-red-400 text-xs mb-3">{err}</div>}
          <button onClick={submit} className="w-full bg-[#1F6FEB] hover:bg-[#1a5fc9] py-3 rounded-xl font-extrabold text-white transition">🔐 {langEn ? 'Sign in' : 'دخول'}</button>
          <div className="text-center text-[11px] text-[#5F7391] mt-4">
            {langEn ? 'Quick switch: Admin / Reception / Trainer' : 'تبديل سريع: مدير / استقبال / مدرب'}
          </div>
        </div>
      </div>
    </div>
  );
}
