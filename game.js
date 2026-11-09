// ============================================================
//  เกมเรียงบรรณานุกรม APA6 — game.js
//  รายวิชา ท31205 ห้องสมุดและสารสนเทศเพื่อการศึกษาค้นคว้า
//  ผู้สอน: นางสาวณภัทร บุญพูลเกิด
// ============================================================

'use strict';

/* ─────────────────────────────────────────────
   1. ข้อมูลคำถาม (อ้างอิงจากเอกสารประกอบการสอน)
───────────────────────────────────────────── */
const QUESTIONS = [
  // ══════════ ด่าน 1 — บรรณานุกรมหนังสือ: ผู้แต่งคนเดียว ══════════
  {
    id: 1,
    type: 'book',
    level: 'easy',
    title: 'หนังสือ — ผู้แต่งคนเดียว',
    sourceInfo: [
      { label: '👤 ผู้แต่ง', value: 'ก. (นามแฝง)' },
      { label: '📅 ปีพิมพ์', value: '2541' },
      { label: '📖 ชื่อหนังสือ', value: 'รูปศึกษาวิทยาของการสร้างสัญญาทางสังคยากรณ์' },
      { label: '📍 สถานที่พิมพ์', value: 'กรุงเทพฯ' },
      { label: '🏢 สำนักพิมพ์', value: 'มูลนิธิสดศรีสฤษดิ์วงศ์' }
    ],
    // ชิ้นส่วนที่ถูกต้องตามลำดับ
    correctOrder: [
      { text: 'ก.', cls: 'chip-author' },
      { text: '(2541).', cls: 'chip-year' },
      { text: 'รูปศึกษาวิทยาของการสร้างสัญญาทางสังคยากรณ์', cls: 'chip-title' },
      { text: '. กรุงเทพฯ:', cls: 'chip-place' },
      { text: 'มูลนิธิสดศรีสฤษดิ์วงศ์.', cls: 'chip-publisher' }
    ],
    correctText: 'ก. (2541). <em>รูปศึกษาวิทยาของการสร้างสัญญาทางสังคยากรณ์</em>. กรุงเทพฯ: มูลนิธิสดศรีสฤษดิ์วงศ์.',
    hint: '💡 เริ่มด้วยผู้แต่ง → ปีพิมพ์ → ชื่อหนังสือ → สถานที่ → สำนักพิมพ์'
  },

  // ══════════ ด่าน 2 — บรรณานุกรมหนังสือ: พิมพ์ครั้งที่ระบุ ══════════
  {
    id: 2,
    type: 'book',
    level: 'easy',
    title: 'หนังสือ — ระบุครั้งที่พิมพ์',
    sourceInfo: [
      { label: '👤 ผู้แต่ง', value: 'กาณจนา มาฟ้า' },
      { label: '📅 ปีพิมพ์', value: '2530' },
      { label: '📖 ชื่อหนังสือ', value: 'ชีวิตของคนดี' },
      { label: '🔄 ครั้งที่พิมพ์', value: 'พิมพ์ครั้งที่ 2' },
      { label: '📍 สถานที่พิมพ์', value: 'กรุงเทพฯ' },
      { label: '🏢 สำนักพิมพ์', value: 'โรงพิมพ์ต้นตั้งการ์ดจำกัด' }
    ],
    correctOrder: [
      { text: 'กาณจนา มาฟ้า.', cls: 'chip-author' },
      { text: '(2530).', cls: 'chip-year' },
      { text: 'ชีวิตของคนดี', cls: 'chip-title' },
      { text: '(พิมพ์ครั้งที่ 2).', cls: 'chip-edition' },
      { text: 'กรุงเทพฯ:', cls: 'chip-place' },
      { text: 'โรงพิมพ์ต้นตั้งการ์ดจำกัด.', cls: 'chip-publisher' }
    ],
    correctText: 'กาณจนา มาฟ้า. (2530). <em>ชีวิตของคนดี</em> (พิมพ์ครั้งที่ 2). กรุงเทพฯ: โรงพิมพ์ต้นตั้งการ์ดจำกัด.',
    hint: '💡 ชื่อหนังสือตามด้วยวงเล็บครั้งที่พิมพ์ ก่อนถึงสถานที่'
  },

  // ══════════ ด่าน 3 — บรรณานุกรมหนังสือ: ผู้แต่ง 2 คน ══════════
  {
    id: 3,
    type: 'book',
    level: 'easy',
    title: 'หนังสือ — ผู้แต่ง 2 คน',
    sourceInfo: [
      { label: '👤 ผู้แต่ง', value: 'สมหญิง วันทอง และ นุชนาฏ ชาญอนันต์' },
      { label: '📅 ปีพิมพ์', value: '2549' },
      { label: '📖 ชื่อหนังสือ', value: '1 ทศวรรษ วิทยากร' },
      { label: '🔄 ครั้งที่พิมพ์', value: 'พิมพ์ครั้งที่ 2' },
      { label: '📍 สถานที่พิมพ์', value: 'กรุงเทพฯ' },
      { label: '🏢 สำนักพิมพ์', value: 'โอเดียนสโตร์' }
    ],
    correctOrder: [
      { text: 'สมหญิง วันทอง', cls: 'chip-author' },
      { text: ', นุชนาฏ ชาญอนันต์.', cls: 'chip-author' },
      { text: '(2549).', cls: 'chip-year' },
      { text: '1 ทศวรรษ วิทยากร', cls: 'chip-title' },
      { text: '(พิมพ์ครั้งที่ 2).', cls: 'chip-edition' },
      { text: 'กรุงเทพฯ:', cls: 'chip-place' },
      { text: 'โอเดียนสโตร์.', cls: 'chip-publisher' }
    ],
    correctText: 'สมหญิง วันทอง, นุชนาฏ ชาญอนันต์. (2549). <em>1 ทศวรรษ วิทยากร</em> (พิมพ์ครั้งที่ 2). กรุงเทพฯ: โอเดียนสโตร์.',
    hint: '💡 ผู้แต่งหลายคน คั่นด้วยเครื่องหมายจุลภาค (,)'
  },

  // ══════════ ด่าน 4 — บรรณานุกรมหนังสือ: ผู้แต่ง 3 คน ══════════
  {
    id: 4,
    type: 'book',
    level: 'medium',
    title: 'หนังสือ — ผู้แต่ง 3 คน',
    sourceInfo: [
      { label: '👤 ผู้แต่ง', value: 'บาณี อนันตสุข, วันทิ วิทย์บุญธรรม และ เพชร ชาวอุดม' },
      { label: '📅 ปีพิมพ์', value: '2526' },
      { label: '📖 ชื่อหนังสือ', value: 'บรรณารักษศาสตร์' },
      { label: '📍 สถานที่พิมพ์', value: 'กรุงเทพฯ' },
      { label: '🏢 สำนักพิมพ์', value: 'โอเดียน' }
    ],
    correctOrder: [
      { text: 'บาณี อนันตสุข,', cls: 'chip-author' },
      { text: 'วันทิ วิทย์บุญธรรม', cls: 'chip-author' },
      { text: '& เพชร ชาวอุดม.', cls: 'chip-author' },
      { text: '(2526).', cls: 'chip-year' },
      { text: 'บรรณารักษศาสตร์', cls: 'chip-title' },
      { text: '. กรุงเทพฯ:', cls: 'chip-place' },
      { text: 'โอเดียน.', cls: 'chip-publisher' }
    ],
    correctText: 'บาณี อนันตสุข, วันทิ วิทย์บุญธรรม & เพชร ชาวอุดม. (2526). <em>บรรณารักษศาสตร์</em>. กรุงเทพฯ: โอเดียน.',
    hint: '💡 ผู้แต่ง 3 คน ใช้ & หน้าชื่อคนสุดท้าย'
  },

  // ══════════ ด่าน 5 — บรรณานุกรมหนังสือ: หน่วยงานเป็นผู้แต่ง ══════════
  {
    id: 5,
    type: 'book',
    level: 'medium',
    title: 'หนังสือ — หน่วยงานเป็นผู้แต่ง',
    sourceInfo: [
      { label: '🏛️ หน่วยงาน', value: 'กรมวิชาการ, กระทรวง' },
      { label: '📅 ปีพิมพ์', value: '2545' },
      { label: '📖 ชื่อหนังสือ', value: 'หลักสูตรการศึกษาขั้นพื้นฐาน' },
      { label: '📍 สถานที่พิมพ์', value: 'กรุงเทพฯ' },
      { label: '🏢 สำนักพิมพ์', value: 'โรงพิมพ์คุรุสภาลาดพร้าว' }
    ],
    correctOrder: [
      { text: 'กรมวิชาการ,', cls: 'chip-author' },
      { text: 'กระทรวง.', cls: 'chip-author' },
      { text: '(2545).', cls: 'chip-year' },
      { text: 'หลักสูตรการศึกษาขั้นพื้นฐาน', cls: 'chip-title' },
      { text: '. กรุงเทพฯ:', cls: 'chip-place' },
      { text: 'โรงพิมพ์คุรุสภาลาดพร้าว.', cls: 'chip-publisher' }
    ],
    correctText: 'กรมวิชาการ, กระทรวง. (2545). <em>หลักสูตรการศึกษาขั้นพื้นฐาน</em>. กรุงเทพฯ: โรงพิมพ์คุรุสภาลาดพร้าว.',
    hint: '💡 หน่วยงานที่มีสังกัด ใส่ชื่อหน่วยงาน, ตามด้วยชื่อกระทรวง'
  },

  // ══════════ ด่าน 6 — บรรณานุกรมออนไลน์: ผู้แต่งเดี่ยว ══════════
  {
    id: 6,
    type: 'online',
    level: 'easy',
    title: 'ออนไลน์ — ผู้แต่งเดี่ยว',
    sourceInfo: [
      { label: '👤 ผู้แต่ง', value: 'สมแสง เป็นพันธ์' },
      { label: '📅 ปีเผยแพร่', value: '2561' },
      { label: '🌐 ชื่อเรื่อง', value: 'วิธีทำระบบ CMYK กับ RGB ทั้ง 3 สีทำ' },
      { label: '📆 วันที่สืบค้น', value: '18 มีนาคม 2562' },
      { label: '🔗 URL', value: 'https://www.nupress.grad.nu.ac.th/cmyk-and-rgb/' }
    ],
    correctOrder: [
      { text: 'สมแสง เป็นพันธ์.', cls: 'chip-author' },
      { text: '(2561).', cls: 'chip-year' },
      { text: 'วิธีทำระบบ CMYK กับ RGB ทั้ง 3 สีทำ', cls: 'chip-title' },
      { text: '. สืบค้นเมื่อ 18 มีนาคม 2562,', cls: 'chip-retrieve' },
      { text: 'จาก https://www.nupress.grad.nu.ac.th/cmyk-and-rgb/', cls: 'chip-url' }
    ],
    correctText: 'สมแสง เป็นพันธ์. (2561). <em>วิธีทำระบบ CMYK กับ RGB ทั้ง 3 สีทำ</em>. สืบค้นเมื่อ 18 มีนาคม 2562, จาก https://www.nupress.grad.nu.ac.th/cmyk-and-rgb/',
    hint: '💡 ออนไลน์: หลังชื่อเรื่องใส่ "สืบค้นเมื่อ..." แล้วตามด้วย "จาก URL"'
  },

  // ══════════ ด่าน 7 — บรรณานุกรมออนไลน์: ไม่ระบุผู้แต่ง ══════════
  {
    id: 7,
    type: 'online',
    level: 'medium',
    title: 'ออนไลน์ — ไม่ระบุผู้แต่ง',
    sourceInfo: [
      { label: '👤 ผู้แต่ง', value: '(ไม่ระบุ)' },
      { label: '📅 ปีเผยแพร่', value: '2565' },
      { label: '🌐 ชื่อเรื่อง', value: 'ข้อมูลน่ารู้เกี่ยวกับห้องสมุด' },
      { label: '📆 วันที่สืบค้น', value: '17 กุมภาพันธ์ 2565' },
      { label: '🔗 URL', value: 'https://www.sgethai.com/article.com' }
    ],
    correctOrder: [
      { text: 'ไม่ระบุชื่อผู้แต่ง.', cls: 'chip-author' },
      { text: '(2565).', cls: 'chip-year' },
      { text: 'ข้อมูลน่ารู้เกี่ยวกับห้องสมุด', cls: 'chip-title' },
      { text: '. สืบค้นเมื่อ 17 กุมภาพันธ์ 2565,', cls: 'chip-retrieve' },
      { text: 'จาก https://www.sgethai.com/article.com', cls: 'chip-url' }
    ],
    correctText: 'ไม่ระบุชื่อผู้แต่ง. (2565). <em>ข้อมูลน่ารู้เกี่ยวกับห้องสมุด</em>. สืบค้นเมื่อ 17 กุมภาพันธ์ 2565, จาก https://www.sgethai.com/article.com',
    hint: '💡 เมื่อไม่ระบุผู้แต่ง ใส่ "ไม่ระบุชื่อผู้แต่ง." แทน'
  },

  // ══════════ ด่าน 8 — บรรณานุกรมออนไลน์: นามแฝง (นามปากกา) ══════════
  {
    id: 8,
    type: 'online',
    level: 'medium',
    title: 'ออนไลน์ — นามแฝง (นามปากกา)',
    sourceInfo: [
      { label: '👤 ผู้แต่ง', value: 'ไม้ดอก, (นามปากกา)' },
      { label: '📅 ปีเผยแพร่', value: '2562' },
      { label: '🌐 ชื่อเรื่อง', value: 'กล้วยไม้พันธุ์ต่างๆ' },
      { label: '📆 วันที่สืบค้น', value: '20 กุมภาพันธ์ 2565' },
      { label: '🔗 URL', value: 'https://www.naibann.com/22-types-of-orchid/' }
    ],
    correctOrder: [
      { text: 'ไม้ดอก,', cls: 'chip-author' },
      { text: '(นามปากกา).', cls: 'chip-author' },
      { text: '(2562).', cls: 'chip-year' },
      { text: 'กล้วยไม้พันธุ์ต่างๆ', cls: 'chip-title' },
      { text: '. สืบค้นเมื่อ 20 กุมภาพันธ์ 2565,', cls: 'chip-retrieve' },
      { text: 'จาก https://www.naibann.com/22-types-of-orchid/', cls: 'chip-url' }
    ],
    correctText: 'ไม้ดอก, (นามปากกา). (2562). <em>กล้วยไม้พันธุ์ต่างๆ</em>. สืบค้นเมื่อ 20 กุมภาพันธ์ 2565, จาก https://www.naibann.com/22-types-of-orchid/',
    hint: '💡 นามแฝง/นามปากกา: ใส่ชื่อ, (นามปากกา). ในวงเล็บ'
  },

  // ══════════ ด่าน 9 — บรรณานุกรมหนังสือ: E-book ══════════
  {
    id: 9,
    type: 'book',
    level: 'hard',
    title: 'E-book — หนังสืออิเล็กทรอนิกส์',
    sourceInfo: [
      { label: '👤 ผู้แต่ง', value: 'นักพัฒนา ก.' },
      { label: '📅 ปีพิมพ์', value: '2562' },
      { label: '📖 ชื่อหนังสือ', value: 'จริยธรรมสุขภาพ: แนวคิด ทฤษฎี และการประยุกต์' },
      { label: '🔄 ครั้งที่พิมพ์', value: 'พิมพ์ครั้งที่ 3' },
      { label: '📍 สถานที่พิมพ์', value: 'เชียงใหม่' },
      { label: '🏢 สำนักพิมพ์', value: 'วิทยานคร' },
      { label: '🔗 แหล่งค้นคืน', value: 'https://www.ookbee.com' }
    ],
    correctOrder: [
      { text: 'นักพัฒนา ก.', cls: 'chip-author' },
      { text: '(2562).', cls: 'chip-year' },
      { text: 'จริยธรรมสุขภาพ: แนวคิด ทฤษฎี และการประยุกต์', cls: 'chip-title' },
      { text: '(พิมพ์ครั้งที่ 3).', cls: 'chip-edition' },
      { text: 'เชียงใหม่:', cls: 'chip-place' },
      { text: 'วิทยานคร.', cls: 'chip-publisher' },
      { text: 'สืบค้นจาก https://www.ookbee.com', cls: 'chip-url' }
    ],
    correctText: 'นักพัฒนา ก. (2562). <em>จริยธรรมสุขภาพ: แนวคิด ทฤษฎี และการประยุกต์</em> (พิมพ์ครั้งที่ 3). เชียงใหม่: วิทยานคร. สืบค้นจาก https://www.ookbee.com',
    hint: '💡 E-book: เหมือนหนังสือทั่วไป แต่เพิ่ม "สืบค้นจาก URL" ต่อท้าย'
  },

  // ══════════ ด่าน 10 — บรรณานุกรมออนไลน์: หน่วยงานรัฐ ══════════
  {
    id: 10,
    type: 'online',
    level: 'hard',
    title: 'ออนไลน์ — หน่วยงานรัฐเป็นผู้แต่ง',
    sourceInfo: [
      { label: '🏛️ หน่วยงาน', value: 'กรมแรงงานสัมพันธ์, กระทรวง' },
      { label: '📅 ปีเผยแพร่', value: '2542' },
      { label: '🌐 ชื่อเรื่อง', value: 'ผลงาน 2541' },
      { label: '📍 สถานที่พิมพ์', value: 'กรุงเทพฯ' },
      { label: '🏢 สำนักพิมพ์', value: 'สำนักงานจัดกระทรวง กรมแรงงานสัมพันธ์' }
    ],
    correctOrder: [
      { text: 'กรมแรงงานสัมพันธ์,', cls: 'chip-author' },
      { text: 'กระทรวง.', cls: 'chip-author' },
      { text: '(2542).', cls: 'chip-year' },
      { text: 'ผลงาน 2541', cls: 'chip-title' },
      { text: '. กรุงเทพฯ:', cls: 'chip-place' },
      { text: 'สำนักงานจัดกระทรวง กรมแรงงานสัมพันธ์.', cls: 'chip-publisher' }
    ],
    correctText: 'กรมแรงงานสัมพันธ์, กระทรวง. (2542). <em>ผลงาน 2541</em>. กรุงเทพฯ: สำนักงานจัดกระทรวง กรมแรงงานสัมพันธ์.',
    hint: '💡 หน่วยงาน: ชื่อกรม, ชื่อกระทรวง. แล้วตามด้วยข้อมูลหนังสือตามปกติ'
  }
];

/* ─────────────────────────────────────────────
   2. State ของเกม
───────────────────────────────────────────── */
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let hintUsed = false;
let correctCount = 0;
let wrongCount = 0;
let questions = [];           // คำถามที่สุ่มแล้ว
let selectedChip = null;      // chip ที่ถูกเลือกด้วยการแตะ
let dragSrcEl = null;         // chip ที่กำลัง drag

/* ─────────────────────────────────────────────
   3. ฟังก์ชันหลัก: หน้าจอ
───────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─────────────────────────────────────────────
   4. บทเรียน: สลับแท็บ
───────────────────────────────────────────── */
function switchTab(tabName) {
  // ซ่อนทุก tab-content
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('tab-' + tabName).classList.add('active');
  document.getElementById('tab-' + tabName + '-btn').classList.add('active');
}

/* ─────────────────────────────────────────────
   5. เริ่มเกม
───────────────────────────────────────────── */
function startGame() {
  // สุ่มคำถาม
  questions = shuffleArray([...QUESTIONS]);
  currentQuestionIndex = 0;
  score = 0;
  lives = 3;
  correctCount = 0;
  wrongCount = 0;

  document.getElementById('total-levels').textContent = questions.length;
  showScreen('screen-game');
  loadQuestion();
}

function restartGame() {
  startGame();
}

/* ─────────────────────────────────────────────
   6. โหลดคำถาม
───────────────────────────────────────────── */
function loadQuestion() {
  hintUsed = false;
  selectedChip = null;

  const q = questions[currentQuestionIndex];

  // อัปเดต header
  document.getElementById('score-display').textContent = score;
  document.getElementById('level-display').textContent = currentQuestionIndex + 1;
  updateLivesDisplay();

  // Progress bar
  const pct = (currentQuestionIndex / questions.length) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';

  // badge type
  const badge = document.getElementById('q-type-badge');
  if (q.type === 'book') {
    badge.textContent = '📗 ' + q.title;
    badge.style.background = 'linear-gradient(135deg, #059669, #10b981)';
  } else {
    badge.textContent = '🌐 ' + q.title;
    badge.style.background = 'linear-gradient(135deg, #0ea5e9, #06b6d4)';
  }

  // แสดงข้อมูลแหล่ง
  const infoContent = document.getElementById('source-info-content');
  infoContent.innerHTML = q.sourceInfo.map(item =>
    `<div class="info-row">
       <span class="info-row-label">${item.label}:</span>
       <span class="info-row-val">${item.value}</span>
     </div>`
  ).join('');

  // สร้างชิ้นส่วนสุ่ม
  renderDragItems(q);

  // ล้าง drop zone
  const dz = document.getElementById('drop-zone');
  dz.innerHTML = '<span class="drop-zone-placeholder">วางชิ้นส่วนที่นี่...</span>';

  // ซ่อน feedback
  document.getElementById('feedback-overlay').style.display = 'none';
}

/* ─────────────────────────────────────────────
   7. สร้าง Drag Items
───────────────────────────────────────────── */
function renderDragItems(q) {
  const pool = document.getElementById('drag-pool');
  pool.innerHTML = '';

  const shuffled = shuffleArray([...q.correctOrder]);

  shuffled.forEach((item, idx) => {
    const chip = createChip(item, idx, 'pool');
    pool.appendChild(chip);
  });

  setupDropZone();
}

function createChip(item, idx, location) {
  const chip = document.createElement('div');
  chip.className = 'drag-chip ' + item.cls;
  chip.textContent = item.text;
  chip.dataset.text = item.text;
  chip.dataset.cls = item.cls;
  chip.dataset.location = location;
  chip.draggable = true;

  // Desktop: drag events
  chip.addEventListener('dragstart', onDragStart);
  chip.addEventListener('dragend', onDragEnd);

  // Mobile & tap: click to select/place
  chip.addEventListener('click', onChipClick);

  return chip;
}

/* ─────────────────────────────────────────────
   8. Drop Zone Setup
───────────────────────────────────────────── */
function setupDropZone() {
  const dz = document.getElementById('drop-zone');
  dz.addEventListener('dragover', e => {
    e.preventDefault();
    dz.classList.add('drag-over');
  });
  dz.addEventListener('dragleave', () => dz.classList.remove('drag-over'));
  dz.addEventListener('drop', onDropToZone);

  // Pool also accepts drops (to return chips)
  const pool = document.getElementById('drag-pool');
  pool.addEventListener('dragover', e => e.preventDefault());
  pool.addEventListener('drop', onDropToPool);
}

/* ─────────────────────────────────────────────
   9. Drag Events (Desktop)
───────────────────────────────────────────── */
function onDragStart(e) {
  dragSrcEl = this;
  this.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.dataset.text);
}

function onDragEnd() {
  this.classList.remove('dragging');
  document.getElementById('drop-zone').classList.remove('drag-over');
}

function onDropToZone(e) {
  e.preventDefault();
  const dz = document.getElementById('drop-zone');
  dz.classList.remove('drag-over');

  if (!dragSrcEl) return;

  // ถ้า chip อยู่ใน pool ให้ย้ายมา drop zone
  if (dragSrcEl.dataset.location === 'pool') {
    dragSrcEl.dataset.location = 'zone';
    dz.appendChild(dragSrcEl);
    removePlaceholder(dz);
  }
  // ถ้าอยู่ใน zone แล้วก็ไม่ต้องทำอะไร (ลำดับใน zone)
}

function onDropToPool(e) {
  e.preventDefault();
  if (!dragSrcEl) return;

  if (dragSrcEl.dataset.location === 'zone') {
    dragSrcEl.dataset.location = 'pool';
    document.getElementById('drag-pool').appendChild(dragSrcEl);
    checkDropZonePlaceholder();
  }
}

function removePlaceholder(dz) {
  const ph = dz.querySelector('.drop-zone-placeholder');
  if (ph) ph.remove();
}

function checkDropZonePlaceholder() {
  const dz = document.getElementById('drop-zone');
  const chips = dz.querySelectorAll('.drag-chip');
  if (chips.length === 0) {
    dz.innerHTML = '<span class="drop-zone-placeholder">วางชิ้นส่วนที่นี่...</span>';
  }
}

/* ─────────────────────────────────────────────
   10. Click / Tap Events (Mobile-friendly)
───────────────────────────────────────────── */
function onChipClick() {
  const chip = this;
  const dz = document.getElementById('drop-zone');
  const pool = document.getElementById('drag-pool');

  // ถ้าอยู่ใน pool → เอาไป drop zone
  if (chip.dataset.location === 'pool') {
    // ถ้ามี chip ที่เลือกค้างอยู่ ให้ deselect ก่อน
    if (selectedChip) {
      selectedChip.style.outline = '';
      selectedChip = null;
    }
    chip.dataset.location = 'zone';
    dz.appendChild(chip);
    removePlaceholder(dz);
  } else if (chip.dataset.location === 'zone') {
    // ถ้าอยู่ใน zone → คืนไป pool
    chip.dataset.location = 'pool';
    pool.appendChild(chip);
    checkDropZonePlaceholder();
  }
}

/* ─────────────────────────────────────────────
   11. ตรวจคำตอบ
───────────────────────────────────────────── */
function checkAnswer() {
  const dz = document.getElementById('drop-zone');
  const chips = dz.querySelectorAll('.drag-chip');
  const q = questions[currentQuestionIndex];

  if (chips.length === 0) {
    showToast('⚠️ กรุณาวางชิ้นส่วนก่อนตรวจคำตอบ!');
    return;
  }

  if (chips.length < q.correctOrder.length) {
    showToast(`⚠️ ยังวางไม่ครบ! ต้องการ ${q.correctOrder.length} ชิ้น มีแค่ ${chips.length} ชิ้น`);
    return;
  }

  // เปรียบเทียบ text ตามลำดับ
  const userOrder = Array.from(chips).map(c => c.dataset.text);
  const correctOrder = q.correctOrder.map(o => o.text);

  const isCorrect = userOrder.join('|') === correctOrder.join('|');

  if (isCorrect) {
    // ✅ ถูกต้อง
    const basePoints = q.level === 'easy' ? 10 : q.level === 'medium' ? 15 : 20;
    const pts = hintUsed ? Math.max(basePoints - 5, 1) : basePoints;
    score += pts;
    correctCount++;
    showFeedback(true, pts, q);

    // เอฟเฟกต์ drop zone
    dz.classList.add('correct-flash');
    setTimeout(() => dz.classList.remove('correct-flash'), 600);
  } else {
    // ❌ ผิด
    lives--;
    wrongCount++;
    showFeedback(false, 0, q);

    dz.classList.add('wrong-shake');
    setTimeout(() => dz.classList.remove('wrong-shake'), 500);

    if (lives <= 0) {
      // หมดชีวิต → แสดงหน้าผลลัพธ์
      setTimeout(() => showResult(), 1500);
    }
  }

  updateLivesDisplay();
  document.getElementById('score-display').textContent = score;
}

/* ─────────────────────────────────────────────
   12. Feedback Popup
───────────────────────────────────────────── */
function showFeedback(correct, pts, q) {
  const overlay = document.getElementById('feedback-overlay');
  const icon = document.getElementById('feedback-icon');
  const title = document.getElementById('feedback-title');
  const msg = document.getElementById('feedback-msg');
  const correctBox = document.getElementById('correct-answer-box');
  const btnNext = document.getElementById('btn-next');

  if (correct) {
    icon.textContent = '🎉';
    title.className = 'feedback-title success';
    title.textContent = 'ถูกต้อง!';
    msg.textContent = `ยอดเยี่ยมมาก! คุณได้รับ +${pts} คะแนน`;
    correctBox.innerHTML = `<h4>✅ บรรณานุกรมที่ถูกต้อง</h4><p>${q.correctText}</p>`;
  } else {
    icon.textContent = lives > 0 ? '😕' : '💔';
    title.className = 'feedback-title error';
    title.textContent = lives > 0 ? 'ยังไม่ถูกต้อง!' : 'หมดชีวิต!';
    msg.textContent = lives > 0
      ? `ลองดูเฉลยและลองใหม่อีกครั้ง`
      : `คะแนนสุดท้าย: ${score} คะแนน`;
    correctBox.innerHTML = `<h4>📋 เฉลยที่ถูกต้อง</h4><p>${q.correctText}</p>`;
  }

  if (lives <= 0) {
    btnNext.textContent = '📊 ดูผลลัพธ์';
    btnNext.onclick = showResult;
  } else {
    const isLast = currentQuestionIndex >= questions.length - 1;
    btnNext.textContent = isLast ? '🏆 ดูผลลัพธ์' : 'ถัดไป →';
    btnNext.onclick = isLast ? showResult : nextQuestion;
  }

  overlay.style.display = 'flex';
}

function nextQuestion() {
  document.getElementById('feedback-overlay').style.display = 'none';
  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

/* ─────────────────────────────────────────────
   13. คำใบ้
───────────────────────────────────────────── */
function useHint() {
  if (hintUsed) {
    showToast('💡 ใช้คำใบ้ไปแล้วในข้อนี้');
    return;
  }
  hintUsed = true;
  const q = questions[currentQuestionIndex];
  showToast(q.hint, 4000);
}

/* ─────────────────────────────────────────────
   14. รีเซ็ตข้อปัจจุบัน
───────────────────────────────────────────── */
function resetCurrentQuestion() {
  loadQuestion();
}

/* ─────────────────────────────────────────────
   15. ยืนยันก่อนออก
───────────────────────────────────────────── */
function confirmBack() {
  if (confirm('⚠️ ต้องการออกจากเกมหรือไม่? คะแนนจะหายไป')) {
    showScreen('screen-home');
  }
}

/* ─────────────────────────────────────────────
   16. แสดงผลลัพธ์
───────────────────────────────────────────── */
function showResult() {
  document.getElementById('feedback-overlay').style.display = 'none';

  const maxScore = questions.reduce((acc, q) => {
    return acc + (q.level === 'easy' ? 10 : q.level === 'medium' ? 15 : 20);
  }, 0);

  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;

  // Trophy & title
  let trophy, title, msg, stars;
  if (pct >= 90) {
    trophy = '🏆'; title = 'ยอดเยี่ยมมาก!';
    msg = 'คุณเชี่ยวชาญการเขียนบรรณานุกรม APA6 แล้ว! 🎓';
    stars = '⭐⭐⭐';
  } else if (pct >= 70) {
    trophy = '🥈'; title = 'ดีมาก!';
    msg = 'คุณเข้าใจหลักการเขียนบรรณานุกรมเป็นอย่างดี ลองฝึกเพิ่มเติมนะ 😊';
    stars = '⭐⭐';
  } else if (pct >= 50) {
    trophy = '🥉'; title = 'พยายามต่อไป!';
    msg = 'คุณเริ่มเข้าใจแล้ว! กลับไปอ่านบทเรียนอีกครั้งแล้วเล่นใหม่นะ 💪';
    stars = '⭐';
  } else {
    trophy = '📚'; title = 'ฝึกอีกนิดนะ!';
    msg = 'กลับไปศึกษาบทเรียนก่อน แล้วมาลองเล่นใหม่อีกครั้ง 📖';
    stars = '';
  }

  document.getElementById('result-trophy').textContent = trophy;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-score').textContent = score;
  document.getElementById('result-score-max').textContent = `จาก ${maxScore} คะแนน`;
  document.getElementById('result-stars').textContent = stars;
  document.getElementById('result-msg').textContent = msg;

  document.getElementById('result-summary').innerHTML = `
    <div class="result-summary-item">✅ ถูก<strong>${correctCount}</strong>ข้อ</div>
    <div class="result-summary-item">❌ ผิด<strong>${wrongCount}</strong>ข้อ</div>
    <div class="result-summary-item">📊 ได้<strong>${Math.round(pct)}%</strong></div>
  `;

  // Progress bar = 100%
  document.getElementById('progress-bar').style.width = '100%';

  showScreen('screen-result');
}

/* ─────────────────────────────────────────────
   17. อัปเดตชีวิต
───────────────────────────────────────────── */
function updateLivesDisplay() {
  const display = document.getElementById('lives-display');
  display.textContent = '❤️'.repeat(Math.max(lives, 0)) || '💔';
}

/* ─────────────────────────────────────────────
   18. Toast Notification
───────────────────────────────────────────── */
function showToast(msg, duration = 2500) {
  // ลบ toast เก่า
  const old = document.getElementById('toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
    background: rgba(30,20,70,0.95); color: white;
    padding: 0.8rem 1.5rem; border-radius: 999px;
    font-family: var(--font); font-size: 0.95rem;
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
    z-index: 9999; white-space: nowrap;
    animation: fadeIn 0.3s ease;
    max-width: 90vw; white-space: normal; text-align: center;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/* ─────────────────────────────────────────────
   19. Score Popup Animation
───────────────────────────────────────────── */
function showScorePopup(pts, positive = true) {
  const pop = document.createElement('div');
  pop.className = 'score-popup' + (positive ? '' : ' negative');
  pop.textContent = (positive ? '+' : '') + pts;
  pop.style.left = (Math.random() * 60 + 20) + '%';
  pop.style.top = '40%';
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 1100);
}

/* ─────────────────────────────────────────────
   20. Utility: สุ่มอาร์เรย์
───────────────────────────────────────────── */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ─────────────────────────────────────────────
   21. Particles Background
───────────────────────────────────────────── */
function createParticles() {
  const container = document.getElementById('particles');
  const colors = [
    'rgba(124,58,237,0.6)', 'rgba(168,85,247,0.5)',
    'rgba(6,182,212,0.5)', 'rgba(245,158,11,0.4)',
    'rgba(236,72,153,0.4)', 'rgba(255,255,255,0.3)'
  ];

  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      background: ${color};
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

/* ─────────────────────────────────────────────
   22. Init
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
});
