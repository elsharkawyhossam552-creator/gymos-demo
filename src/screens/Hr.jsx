import { Card, Badge, useLang } from '../components/ui';
import { useStore } from '../store';

export default function Hr({ nav }) {
  const { langEn, seed } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const present = seed.employees.filter((e) => e.present).length;

  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card><div className="text-xs text-[#8fa6c3]">{t('staff')} ({t('all')})</div><div className="text-2xl font-extrabold text-[#4da3ff]">{seed.employees.length}</div></Card>
        <Card><div className="text-xs text-[#8fa6c3]">{langEn ? 'Present' : 'حاضر'}</div><div className="text-2xl font-extrabold text-green-400">{present}</div></Card>
        <Card><div className="text-xs text-[#8fa6c3]">{t('salary')} {langEn ? 'total' : 'إجمالي'}</div><div className="text-2xl font-extrabold text-[#f59e0b]">{seed.employees.reduce((a, e) => a + e.salary, 0).toLocaleString()} {t('egp')}</div></Card>
      </div>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-right text-[#8fa6c3] text-xs border-b border-[#1b2f4d]">
            <th className="p-3">{t('photo')}</th><th className="p-3">{t('name')}</th><th className="p-3">{t('role')}</th><th className="p-3">{t('phone')}</th><th className="p-3">{t('salary')}</th><th className="p-3">{t('status')}</th>
          </tr></thead>
          <tbody>
            {seed.employees.map((e) => (
              <tr key={e.id} className="border-b border-[#142639] hover:bg-[#152842]">
                <td className="p-3">
                  <div className="w-9 h-9 rounded-lg bg-[#152842] border border-[#24405F] flex items-center justify-center overflow-hidden text-sm">
                    {e.photo ? <img src={e.photo} className="w-full h-full object-cover" alt="" /> : '🧑‍💼'}
                  </div>
                </td>
                <td className="p-3 font-bold">{langEn ? e.nameEn : e.name}</td>
                <td className="p-3 text-[#a9c0dd]">{langEn ? e.roleEn : e.role}</td>
                <td className="p-3 text-[#a9c0dd]" dir="ltr">{e.phone}</td>
                <td className="p-3">{e.salary.toLocaleString()} {t('egp')}</td>
                <td className="p-3"><Badge color={e.present ? 'green' : 'slate'}>{e.present ? t('present') : t('absent')}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
