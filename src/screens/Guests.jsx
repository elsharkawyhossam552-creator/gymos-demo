import { useStore } from '../store';
import { Card, Badge, useLang } from '../components/ui';

export default function Guests({ nav }) {
  const { langEn, seed } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  return (
    <div className="p-5">
      <div className="grid md:grid-cols-3 gap-4">
        {seed.guests.map((g) => (
          <Card key={g.id} className="flex items-center gap-3">
            <div className="text-3xl">🎟️</div>
            <div className="flex-1">
              <div className="font-extrabold">{langEn ? g.nameEn : g.name}</div>
              <div className="text-xs text-[#8fa6c3]">{t('type')}: {g.type} • {g.date}</div>
            </div>
            <Badge color="blue">{t('guest')}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
