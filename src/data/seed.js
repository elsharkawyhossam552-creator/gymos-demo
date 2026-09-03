export const NAMES = {
  genders: [
    { ar: 'ذكر', en: 'Male' },
    { ar: 'أنثى', en: 'Female' },
  ],
  attendanceMethods: ['Fingerprint', 'Nfc', 'Qr', 'Barcode'],
};

const MEMBER_NAMES = [
  { name: 'أحمد محمد', en: 'Ahmed Mohamed' },
  { name: 'محمد عبدالله', en: 'Mohamed Abdallah' },
  { name: 'عمر خالد', en: 'Omar Khaled' },
  { name: 'مصطفى عصام', en: 'Mostafa Essam' },
  { name: 'كريم سامي', en: 'Karim Samy' },
  { name: 'يوسف إبراهيم', en: 'Youssef Ibrahim' },
  { name: 'حسن علي', en: 'Hassan Ali' },
  { name: 'طارق حسين', en: 'Tarek Hussein' },
  { name: 'خالد سمير', en: 'Khaled Samir' },
  { name: 'إسلام فؤاد', en: 'Islam Fouad' },
  { name: 'سارة أحمد', en: 'Sara Ahmed' },
  { name: 'مريم عادل', en: 'Mariam Adel' },
  { name: 'نور هشام', en: 'Nour Hisham' },
  { name: 'هند مصطفى', en: 'Hend Mostafa' },
  { name: 'منى إبراهيم', en: 'Mona Ibrahim' },
  { name: 'إيمان ياسر', en: 'Eman Yasser' },
  { name: 'عبدالرحمن طه', en: 'Abdulrahman Taha' },
  { name: 'زياد عادل', en: 'Ziad Adel' },
  { name: 'صالح منير', en: 'Saleh Moneer' },
  { name: 'حسام الدين', en: 'Hossam ElDin' },
];

const PLAN_NAMES = [
  { ar: 'شهري', en: 'Monthly' },
  { ar: 'ربع سنوي', en: 'Quarterly' },
  { ar: 'نصف سنوي', en: 'Half-Year' },
  { ar: 'سنوي', en: 'Yearly' },
];

const PLAN_MONTHS = [1, 3, 6, 12];
const PLAN_PRICES = [450, 1150, 2100, 3900];

const PRODUCT_NAMES = [
  { name: 'واي بروتين', en: 'Whey Protein', price: 1800, stock: 9, min: 5, unit: 'علبة' },
  { name: 'كرياتين', en: 'Creatine', price: 1200, stock: 14, min: 6, unit: 'علبة' },
  { name: 'مشروب طاقة', en: 'Energy Drink', price: 60, stock: 40, min: 20, unit: 'عبوة' },
  { name: 'ماء معدني 600مل', en: 'Water 600ml', price: 15, stock: 120, min: 40, unit: 'زجاجة' },
  { name: 'بار بروتين', en: 'Protein Bar', price: 90, stock: 25, min: 10, unit: 'قطعة' },
  { name: 'قفازات رفع', en: 'Lifting Gloves', price: 250, stock: 8, min: 4, unit: 'قطعة' },
  { name: 'حزام رفع', en: 'Lifting Belt', price: 450, stock: 6, min: 3, unit: 'قطعة' },
  { name: 'رباط ضغط', en: 'Knee Wrap', price: 200, stock: 3, min: 5, unit: 'قطعة' },
  { name: 'شايكر', en: 'Shaker', price: 110, stock: 18, min: 8, unit: 'قطعة' },
  { name: 'شاي أخضر', en: 'Green Tea', price: 45, stock: 30, min: 12, unit: 'علبة' },
  { name: 'عسل نحل', en: 'Honey', price: 180, stock: 12, min: 6, unit: 'عبوة' },
  { name: 'موز', en: 'Banana', price: 30, stock: 4, min: 10, unit: 'مجموعة' },
];

const CATEGORIES = [
  { ar: 'مكملات', en: 'Supplements' },
  { ar: 'مشروبات', en: 'Drinks' },
  { ar: 'إكسسوارات', en: 'Accessories' },
  { ar: 'أغذية', en: 'Food' },
];

const SUPP_CUSTOMERS = [
  { name: 'شركة الشرق للمكملات', en: 'Orient Supplements Co', phone: '0100111111', balance: 12500 },
  { name: 'مؤسسة النيل للأغذية', en: 'Nile Food Est', phone: '0100222222', balance: 0 },
  { name: 'مستورد الخليج', en: 'Gulf Imports', phone: '0100333333', balance: 6800 },
];

const EMPLOYEE_NAMES = [
  { name: 'مصطفى محمود', en: 'Mostafa Mahmoud', role: 'مدرب رئيسي', roleEn: 'Head Trainer' },
  { name: 'علي حسن', en: 'Ali Hassan', role: 'مدرب لياقة', roleEn: 'Fitness Trainer' },
  { name: 'أحمد نبيل', en: 'Ahmed Nabil', role: 'مدرب كروس فت', roleEn: 'CrossFit Coach' },
  { name: 'سلمى عادل', en: 'Salma Adel', role: 'استقبال', roleEn: 'Receptionist' },
  { name: 'كريم فتحي', en: 'Karim Fathi', role: 'محاسب', roleEn: 'Accountant' },
  { name: 'هبة الله', en: 'Heba Allah', role: 'مدربة يوغا', roleEn: 'Yoga Instructor' },
];

const CLASS_NAMES = [
  { name: 'كروس فت', en: 'CrossFit', time: '6:00 ص' },
  { name: 'يوغا', en: 'Yoga', time: '9:00 ص' },
  { name: 'زومبا', en: 'Zumba', time: '7:00 م' },
  { name: 'ركلات', en: 'Boxing', time: '5:00 م' },
  { name: 'سبينينج', en: 'Spinning', time: '8:00 م' },
];

const EXERCISE_NAMES = [
  { name: 'بنش برس', en: 'Bench Press', group: 'صدر' },
  { name: 'سكوات', en: 'Squat', group: 'أرجل' },
  { name: 'دبل بايسبس', en: 'Dumbbell Curl', group: 'ذراع' },
  { name: 'شد ظهر', en: 'Lat Pulldown', group: 'ظهر' },
  { name: 'تفتيش كتف', en: 'Shoulder Press', group: 'كتف' },
  { name: 'بلانك', en: 'Plank', group: 'أساسيات' },
];

const EQUIPMENT_NAMES = [
  { name: 'بار أولمبي', en: 'Olympic Bar', type: 'أثقال' },
  { name: 'دمبل 50 كجم', en: 'Dumbbell 50kg', type: 'أثقال' },
  { name: 'أوربيتراك', en: 'Treadmill', type: 'كارديو' },
  { name: 'تريك سيب', en: 'Stationary Bike', type: 'كارديو' },
  { name: 'سميت ماشين', en: 'Smith Machine', type: 'أجهزة' },
  { name: 'اجهزة سحب', en: 'Lat Machine', type: 'أجهزة' },
];

const LEADS_STATUS = ['جديد', 'تم الاتصال', 'زيارة', 'ملغي'];
const GUEST = ['ضيافة عصير', 'جلسة حرة', 'تجربة حصة'];
const EXPENSE = ['إيجار', 'كهرباء', 'مياه', 'إنترنت', 'رواتب', 'صيانة', 'تسويق', 'مشتريات'];

function uid(p) { return p + '-' + Math.random().toString(36).slice(2, 8); }

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function buildSeed() {
  const now = new Date();
  const members = MEMBER_NAMES.map((m, i) => {
    const planIdx = Math.floor(Math.random() * PLAN_NAMES.length);
    const status = Math.random() < 0.8 ? 'Active' : (Math.random() < 0.5 ? 'Expiring' : 'Frozen');
    const start = daysAgo(Math.floor(Math.random() * 300));
    const months = PLAN_MONTHS[planIdx];
    const end = new Date(start);
    end.setMonth(end.getMonth() + months);
    const active = new Date() <= end && status === 'Active';
    return {
      id: uid('M'),
      code: 'M' + String(1000 + i),
      fullName: m.name,
      nameEn: m.en,
      phone: '010' + String(5000000 + i * 137),
      gender: i % 3 === 0 ? 'أنثى' : 'ذكر',
      plan: PLAN_NAMES[planIdx].ar,
      planEn: PLAN_NAMES[planIdx].en,
      price: PLAN_PRICES[planIdx],
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      status: active ? 'active' : (status === 'Expiring' ? 'expiring' : 'frozen'),
      inside: false,
      balanceDue: Math.random() < 0.2 ? Math.round(Math.random() * 800) : 0,
      visits: Math.floor(Math.random() * 90),
      photo: '',
    };
  });

  const products = PRODUCT_NAMES.map((p, i) => ({
    id: uid('P'),
    code: 'P' + String(100 + i),
    name: p.name,
    nameEn: p.en,
    category: CATEGORIES[Math.floor(i / 3) % CATEGORIES.length].ar,
    categoryEn: CATEGORIES[Math.floor(i / 3) % CATEGORIES.length].en,
    price: p.price,
    cost: Math.round(p.price * 0.6),
    stock: p.stock,
    minStock: p.min,
    unit: p.unit,
    photo: '',
  }));

  const suppliers = SUPP_CUSTOMERS.map((s, i) => ({
    id: uid('S'),
    name: s.name,
    nameEn: s.en,
    phone: s.phone,
    balance: s.balance,
  }));

  const employees = EMPLOYEE_NAMES.map((e, i) => ({
    id: uid('E'),
    name: e.name,
    nameEn: e.en,
    role: e.role,
    roleEn: e.roleEn,
    phone: '010' + String(7000000 + i * 211),
    salary: [8000, 6000, 6500, 4500, 7000, 5000][i],
    present: false,
    photo: '',
  }));

  const workouts = EXERCISE_NAMES.map((e, i) => ({
    id: uid('W'),
    name: e.name,
    nameEn: e.en,
    group: e.group,
    seconds: 60 + i * 10,
    reps: 8 + i,
    photo: '',
  }));

  const equipment = EQUIPMENT_NAMES.map((e, i) => ({
    id: uid('Q'),
    name: e.name,
    nameEn: e.en,
    type: e.type,
    status: i % 4 === 0 ? 'صيانة' : 'جيد',
    photo: '',
  }));

  const classes = CLASS_NAMES.map((c, i) => ({
    id: uid('C'),
    name: c.name,
    nameEn: c.en,
    time: c.time,
    trainer: (i % 5) === 0 ? 'مصطفى محمود' : 'علي حسن',
    capacity: 15,
    booked: Math.floor(Math.random() * 15),
  }));

  const leads = LEADS_STATUS.map((s, i) => ({
    id: uid('L'),
    name: LEADS_STATUS[i] === 'ملغي' ? 'أشرف محمد' : ['حمدي محمود', 'ياسمين عادل', 'بيتر حنا', 'محمد سيد'][i],
    nameEn: LEADS_STATUS[i] === 'ملغي' ? 'Ashraf Mohamed' : ['Hamdy', 'Yasmine', 'Peter', 'Mohamed'][i],
    phone: '011' + String(4000000 + i * 313),
    source: ['إنستجرام', 'فيسبوك', 'تيك توك', 'صديق'][i],
    status: s,
    expected: [450, 1150, 2100, 3900][i],
  }));

  const guests = GUEST.map((g, i) => ({
    id: uid('G'),
    name: ['أمير سيد', 'هاني عوض', 'نادين رمزي'][i],
    nameEn: ['Amir', 'Hany', 'Nadine'][i],
    type: g,
    date: daysAgo(i).toISOString().slice(0, 10),
  }));

  return { members, products, suppliers, employees, workouts, equipment, classes, leads, guests, expenses: EXPENSE };
}

export { PLAN_NAMES, PLAN_PRICES, CATEGORIES };
