import { useState } from 'react';
import { useStore } from '../store';
import { Card, Btn, useLang } from '../components/ui';

const TOPICS = [
  { k: 'overview', icon: '🧭', ar: 'شرح النظام كله', en: 'System overview' },
  { k: 'marketing', icon: '📣', ar: 'دليل التسويق وجلب العملاء', en: 'Marketing & acquiring clients' },
  { k: 'goals', icon: '🎯', ar: 'تحديد الأهداف القادمة', en: 'Setting next goals' },
  { k: 'finance', icon: '📊', ar: 'تحليل المكاسب والخسائر', en: 'Profit & loss analysis' },
  { k: 'ai', icon: '🤖', ar: 'يُكاسأرد ودرشة', en: 'Ask & chat' },
];

const GUIDES = {
  overview: (lang, t) => lang ? [
    'GymOS is a complete gym ERP. Here are the modules and how to use them:',
    '• Dashboard: today/month revenue, active members, people inside, low-stock alerts.',
    '• POS: add products to cart, choose a member, checkout with cash/card.',
    '• Members: add/edit/delete members, assign plans, view member 360 details.',
    '• Attendance: check members in/out by code for real-time occupancy.',
    '• Inventory: add products, stock levels, low-stock warnings.',
    '• Training & Classes: classes, exercises, equipment status.',
    '• HR: staff with salaries and roles.',
    '• CRM / Leads: track leads through stages (new→contact→visit).',
    '• Cash & Expenses: track floating cash and expenses.',
    '• Owner Monitor: live KPIs for the owner.',
    '• Reports: export printable PDF reports.',
    'Everything saves locally and works fully in the browser.',
  ] : [
    'نظام GymOS نظام إدارة صالة كامل. إليك الوحدات وكيفية استخدامها:',
    '• لوحة التحكم: إيراد اليوم/الشهر، الأعضاء النشطين، الموجودين داخل الصالة، تنبيهات المخزون المنخفض.',
    '• المبيعات (POS): أضف منتجات للسلة، اختر العضو، وأتم البيع نقدي أو بطاقة.',
    '• الأعضاء: أضف/عدّل/احذف الأعضاء، عيّن الباقات، اعرض الملف الكامل للعضو.',
    '• الحضور: سجّل دخول/خروج الأعضاء بالكود لمعرفة الإشغال اللحظي.',
    '• المخزون: أضف المنتجات ومستويات المخزون وتنبيهات النقص.',
    '• التدريب والحصص: حصص وتمارين وحالة المعدات.',
    '• الموارد البشرية: الموظفون بالرواتب والأدوار.',
    '• العملاء المحتملون (CRM): تابع العملاء بمراحل (جديد→تم الاتصال→زيارة).',
    '• الخزنة والمصروفات: تابع الخزنة والمصروفات.',
    '• مراقبة المالك: مؤشرات حية للمالك.',
    '• التقارير: تصدير تقارير PDF قابلة للطباعة.',
    'كل البيانات تُحفظ محلياً والنظام يعمل بالكامل في المتصفح.',
  ],
  marketing: (lang) => lang ? [
    'How to grow your gym and acquire clients:',
    '1. Lead generation: capture phone numbers via free trials, guest passes, and a signup form.',
    '2. Social media: post member transformations, class schedules, and promotions on Instagram/TikTok/Facebook daily.',
    '3. Referral program: give current members a free week or discount for every friend they bring.',
    '4. Local SEO: get your gym on Google Maps with photos, hours, and reviews; collect 5-star reviews.',
    '5. Partnership: team up with nutritionists, physiotherapists, and protein shops for cross-promotion.',
    '6. Retargeting: run small ad budgets boosting your best transformation posts.',
    '7. Offers: seasonal challenges (e.g., 8-week body transformation) create urgency and membership sales.',
    '8. Open House day: free classes + tours to convert visitors into members.',
    'Use the CRM module in GymOS to track every lead from first contact to membership.',
  ] : [
    'كيف تنمّي صالتك وتجلب عملاء:',
    '1. توليد العملاء المحتملين: اجمع أرقام الهواتف عبر تجربة مجانية، إقامة ضيافة، ونموذج تسجيل.',
    '2. السوشيال ميديا: انشر تحولات الأعضاء وجداول الحصص والعروض على إنستجرام/تيك توك/فيسبوك يومياً.',
    '3. برنامج إحالة: امنح الأعضاء الحاليين أسبوع مجاني أو خصم مقابل كل صديق يجلبونه.',
    '4. تحسين الظهور: أضف صالتك على خرائط جوجل مع صور وساعات العمل وتقييمات؛ واجمع تقييمات 5 نجوم.',
    '5. شراكات: تعاون مع أخصائيي تغذية وعلاج طبيعي ومحلات بروتين للتسويق المشترك.',
    '6. إعادة الاستهداف: شغّل ميزانيات إعلانية صغيرة لتعزيز أفضل منشورات التحول.',
    '7. عروض موسمية: تحديات مثل (تحول الجسم في 8 أسابيع) تخلق حماساً ومبيعات عضوية.',
    '8. يوم الأبواب المفتوحة: حصص مجانية وجولات لتحويل الزوار إلى أعضاء.',
    'استخدم وحدة العملاء المحتملين في GymOS لتتبع كل عميل من أول تواصل حتى العضوية.',
  ],
  goals: (lang) => lang ? [
    'How to set your next goals for success:',
    '1. SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound. E.g., "reach 300 active members by end of quarter".',
    '2. Revenue goal: set a monthly baseline from your current average, then target +20% growth. Break into daily/weekly targets.',
    '3. Retention: aim to keep 85%+ renewals — track expiring memberships and reach out before they lapse (GymOS alerts you).',
    '4. New-member goal: define how many new members/month and back-calculate how many leads you need (typical 30-40% close rate).',
    '5. Secondary revenue: target supplement/product sales = 20-30% of membership revenue.',
    '6. Action plan: weekly marketing posts, daily social contact, monthly offer review.',
    '7. Measure monthly in GymOS Owner Monitor and Reports; adjust before-forecasts to actuals.',
  ] : [
    'كيف تحدد أهدافك القادمة للنجاح:',
    '1. أهداف ذكية SMART: محددة وقابلة للقياس وقابلة للتحقيق وذات صلة ومحددة بزمن. مثال: "الوصول إلى 300 عضو نشط بنهاية الربع".',
    '2. هدف الإيراد: ضع خط أساس شهري من متوسطك الحالي ثم استهدف نمو +20%. وقّسمه لأهداف يومية/أسبوعية.',
    '3. الاحتفاظ: اهدف لإبقاء نسبة تجديد 85%+ — تابع الأعضاء المنتهية عضويتهم وتواصل قبل انتهائها (GymOS ينبّهك).',
    '4. هدف الأعضاء الجدد: حدد كم عضو جديد شهرياً واحسب بالعكس كم عميل محتمل تحتاج (نسبة إغلاق 30-40%).',
    '5. إيراد ثانوي: استهدف مبيعات المكملات/المنتجات = 20-30% من إيراد العضويات.',
    '6. خطة عمل: منشورات تسويقية أسبوعية، تواصل اجتماعي يومي، مراجعة عروض شهرية.',
    '7. قس شهرياً في مراقبة المالك والتقارير وعدّل الأرقام من التوقعات إلى الفعلية.',
  ],
  finance: (lang, t) => lang ? [
    'Profit & loss analysis for your gym:',
    '• Revenue sources: memberships (main), POS product sales, class/PT sessions, guest passes.',
    '• Fixed costs: rent, salaries, utilities — they stay constant each month.',
    '• Variable costs: products (cost-of-goods), marketing, maintenance.',
    '• Key metrics: Gross profit = revenue − product costs. Net profit = gross − all expenses.',
    '• In GymOS: the Dashboard shows revenue; Cash & Expenses tracks spend; Owner Monitor shows KPIs.',
    '• Break-even: monthly fixed costs ÷ average ticket = members needed to cover costs before profit.',
    '• Watch: low renewal (churn), low product margin, high expense ratio (>60% of revenue is risky).',
    '• Health check: aim for net margin 20-35% for a profitable gym.',
  ] : [
    'تحليل المكاسب والخسائر لصالتك:',
    '• مصادر الدخل: العضويات (الرئيسية)، مبيعات المنتجات في POS، جلسات الحصص/التدريب الخاص، بطاقات الضيافة.',
    '• التكاليف الثابتة: الإيجار، الرواتب، المرافق — ثابتة كل شهر.',
    '• التكاليف المتغيرة: المنتجات (تكلفة البضاعة)، التسويق، الصيانة.',
    '• المؤشرات الأساسية: الربح الإجمالي = الإيراد − تكلفة المنتجات. الربح الصافي = الإجمالي − كل المصروفات.',
    '• في GymOS: لوحة التحكم تعرض الإيراد؛ الخزنة والمصروفات تتبع الإنفاق؛ مراقبة المالك تعرض المؤشرات.',
    '• نقطة التعادل: التكاليف الثابتة الشهرية ÷ متوسط التذكرة = عدد الأعضاء اللازم لتغطية التكاليف قبل الربح.',
    '• انتبه: انخفاض التجديد (ترك الأعضاء)، هامش منتج منخفض، نسبة مصروفات عالية (أكثر من 60% من الإيراد خطر).',
    '• فحص الصحة: استهدف هامشاً صافياً 20-35% لصالة مربحة.',
  ],
};

function fakeAi(msg, topic, lang, data) {
  if (topic === 'ai') {
    const lower = msg.toLowerCase();
    if (lower.includes('marketing') || lower.includes('تسويق') || lower.includes('عملاء')) return GUIDES.marketing(lang);
    if (lower.includes('goal') || lower.includes('هدف') || lower.includes('نجاح')) return GUIDES.goals(lang);
    if (lower.includes('profit') || lower.includes('ربح') || lower.includes('خسارة') || lower.includes('مكسب')) return GUIDES.finance(lang);
    if (lower.includes('revenue') || lower.includes('ايراد') || lower.includes('اليوم')) return lang ? ['Current demo data:', `• Today revenue: ${data.today} EGP`, `• Month revenue: ${data.month} EGP`, `• Active members: ${data.active}`, `• Inside now: ${data.inside}`, 'This is interactive — make a sale or add a member and numbers update in real time.'] : ['بيانات التجربة الحالية:', `• إيراد اليوم: ${data.today} جنيه`, `• إيراد الشهر: ${data.month} جنيه`, `• الأعضاء النشطون: ${data.active}`, `• داخل الصالة الآن: ${data.inside}`, 'هذا تفاعلي — أتمن بيعة أو أضف عضو وستتحدث الأرقام لحظياً.'];
    return lang ? ['Ask me anything about GymOS! Example questions:', '• "How do I get more clients?" (marketing guide)', '• "What are my next goals?" (goal setting)', '• "How profitable is my gym?" (finance analysis)', '• "Show today revenue." (live data)', 'This demo answers with a guided coach. In production this connects to a real AI API.'] : ['اسألني أي شيء عن GymOS! أمثلة:', '• "كيف أجلب عملاء أكثر؟" (دليل التسويق)', '• "ما هي أهدافي القادمة؟" (تحديد الأهداف)', '• "كام ربح صالتي؟" (تحليل مالي)', '• "اعرض إيراد اليوم." (بيانات حية)', 'هذه التجربة تجيب كمدرب مرشد. في النسخة النهائية يتصل النظام بواجهة ذكاء اصطناعي حقيقية.'];
  }
  return GUIDES[topic](lang);
}

export default function Ai({ nav }) {
  const { langEn, members, sales } = useStore();
  const t = useLang(langEn ? 'en' : 'ar');
  const [topic, setTopic] = useState('overview');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const today = sales.filter((s) => new Date(s.when).getDate() === new Date().getDate()).reduce((a, s) => a + s.total, 0);
  const month = sales.reduce((a, s) => a + s.total, 0);
  const active = members.filter((m) => m.status === 'active').length;
  const inside = members.filter((m) => m.inside).length;
  const data = { today, month, active, inside };

  const guide = GUIDES[topic](langEn);

  const ask = () => {
    if (!msg.trim()) return;
    const reply = fakeAi(msg, 'ai', langEn, data);
    setChats((c) => [{ q: msg, a: reply, id: Math.random().toString(36).slice(2) }, ...c]);
    setMsg('');
  };

  return (
    <div className="p-5 grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-2">
        <div className="text-sm font-bold mb-1">🤖 {langEn ? 'AI Coach' : 'المدرب الذكي'}</div>
        {TOPICS.map((x) => (
          <button key={x.k} onClick={() => setTopic(x.k)}
            className={`w-full text-right px-4 py-2.5 rounded-xl text-sm font-bold transition ${topic === x.k ? 'bg-[#1F6FEB] text-white' : 'bg-[#101f36] border border-[#1b2f4d] text-[#a9c0dd] hover:border-[#4da3ff]'}`}>
            {x.icon} {langEn ? x.en : x.ar}
          </button>
        ))}
      </div>

      <div className="md:col-span-2 space-y-4">
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <div className="font-bold">💡 {langEn ? 'Live business data' : 'بيانات عمل حية'}</div>
          </div>
          <div className="grid grid-cols-4 gap-3 text-center text-sm">
            <div className="bg-[#152842] rounded-lg p-3"><div className="text-[#8fa6c3] text-[10px]">{t('todayRevenue')}</div><b className="text-[#4da3ff]">{today}</b></div>
            <div className="bg-[#152842] rounded-lg p-3"><div className="text-[#8fa6c3] text-[10px]">{t('monthRevenue')}</div><b className="text-[#22c55e]">{month}</b></div>
            <div className="bg-[#152842] rounded-lg p-3"><div className="text-[#8fa6c3] text-[10px]">{t('activeMembers')}</div><b className="text-[#a855f7]">{active}</b></div>
            <div className="bg-[#152842] rounded-lg p-3"><div className="text-[#8fa6c3] text-[10px]">{t('insideNow')}</div><b className="text-[#f59e0b]">{inside}</b></div>
          </div>
        </Card>

        <Card>
          <div className="font-bold mb-2">{guide.length ? '📘 ' + (langEn ? 'Guide' : 'الدليل') : ''}</div>
          <div className="space-y-2">
            {guide.map((g, i) => (
              <p key={i} className="text-sm text-[#c6d6ec] leading-relaxed">{g}</p>
            ))}
          </div>
        </Card>

        <Card className="border-[#2a4a75]">
          <div className="font-bold mb-3">💬 {langEn ? 'Ask the AI coach' : 'اسأل المدرب الذكي'}</div>
          <div className="space-y-3 mb-3 max-h-64 overflow-y-auto">
            {chats.length === 0 && <div className="text-xs text-[#5F7391]">{langEn ? 'Type a question below (marketing, goals, profits, or live data).' : 'اكتب سؤالاً بالأسفل (تسويق، أهداف، أرباح، أو بيانات حية).'}</div>}
            {chats.map((c) => (
              <div key={c.id}>
                <div className="text-xs font-bold bg-[#1F6FEB]/15 text-[#6ec1ff] px-3 py-1.5 rounded-lg inline-block mb-1.5">🧑 {c.q}</div>
                <div className="bg-[#0d1a2e] border border-[#1b2f4d] rounded-lg p-3 text-sm text-[#c6d6ec] space-y-1">
                  {c.a.map((l, j) => <p key={j}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && ask()}
              placeholder={langEn ? 'Ask about marketing, goals, profits...' : 'اسأل عن التسويق، الأهداف، الأرباح...'}
              className="flex-1 bg-[#0d1a2e] border border-[#24405F] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#4da3ff]" />
            <Btn onClick={ask}>➤</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}
