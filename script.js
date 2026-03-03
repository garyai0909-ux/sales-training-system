const STORAGE_KEYS = {
  bank: 'questionBank',
  records: 'trainingRecords',
  latestWrongSet: 'latestWrongSet'
};

const PRODUCT_IMAGES = {
  powerbank: 'https://cdn-next.cybassets.com/media/W1siZiIsIjI1MjQ3L3Byb2R1Y3RzLzYyMDI3Mzk2LzE3NjM2MzQzMDVfZTllZGFmMTkyNzYyYjg4MmQ4YmEucG5nIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.png?sha=f8294895f8eaa28a',
  charger: 'https://cdn-next.cybassets.com/media/W1siZiIsIjI1MjQ3L3Byb2R1Y3RzLzYyMDI3MzExLzE3NjM2ODY5OTlfNzAxMTNmYWZiMTAxNGY4ZmE3MzYucG5nIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.png?sha=41d320d07a8855fa',
  speaker: 'https://cdn-next.cybassets.com/media/W1siZiIsIjI1MjQ3L3Byb2R1Y3RzLzU5NzA1NTU0LzE3NjQyOTc1OTNfMzRiYmM3MDQzNWU4NWQ2ZTk4NjYucG5nIl0sWyJwIiwidGh1bWIiLCI2MDB4NjAwIl1d.png?sha=f988654868079a7f'
};

const STAGE_ORDER = ['新人', '專員', '資深專員', '組長', '店長'];

const defaultLevels = [
  {id:'q1', stage:'新人', type:'基本QA', dimension:'品牌認知', title:'關卡1｜品牌定位', q:'WEiZ 銷售主張是什麼？', opts:['最低價導向','高顏值 + 實用 + 生活質感','只做企業大單','只賣手機殼'], ans:'高顏值 + 實用 + 生活質感', exp:'話術要圍繞質感生活與實用價值。'},
  {id:'q2', stage:'新人', type:'基本QA', dimension:'快充知識', title:'關卡2｜PD 快充', q:'PD 充電重點為何？', opts:['瓦數越高一定越快','要看裝置協議 + 線材規格','只看品牌名','所有線都一樣'], ans:'要看裝置協議 + 線材規格', exp:'需同時確認協議、瓦數與線材。', img:PRODUCT_IMAGES.charger},
  {id:'q3', stage:'新人', type:'基本QA', dimension:'組合銷售', title:'關卡3｜加購組合', q:'行動電源最佳加購組合是？', opts:['只賣主商品','行動電源+快充線+充電頭','先推最貴耳機','改賣喇叭'], ans:'行動電源+快充線+充電頭', exp:'組合銷售提升客單與完整體驗。', img:PRODUCT_IMAGES.powerbank},
  {id:'q4', stage:'專員', type:'情境QA', dimension:'需求訪談', title:'關卡4｜預算型客人', q:'預算 1,500 元要快充方案，怎麼提案？', opts:['推最高價','先問手機型號再提入門快充組','只推單一線材','叫客人回去想'], ans:'先問手機型號再提入門快充組', exp:'先需求訪談，才能精準提案。'},
  {id:'q5', stage:'專員', type:'情境QA', dimension:'成交技巧', title:'關卡5｜猶豫客人', q:'客人說「我再看看」，怎麼做較好？', opts:['放棄','1句總結利益點+差異點+保障','一直追問','改推無關商品'], ans:'1句總結利益點+差異點+保障', exp:'精準總結比硬推有效。'},
  {id:'q6', stage:'專員', type:'情境QA', dimension:'競品應對', title:'關卡6｜競品比較', q:'客人拿競品比較時，正確做法？', opts:['貶低競品','回到需求對照規格/保固/情境價值','說都一樣','叫他網路查'], ans:'回到需求對照規格/保固/情境價值', exp:'專業比較，不攻擊競品。'},
  {id:'q7', stage:'資深專員', type:'新品QA', dimension:'新品介紹', title:'關卡7｜新品耳機 S12', q:'介紹 1MORE 開放式耳夾藍牙耳機 S12 時，第一個賣點應該怎麼講？', opts:['只講折扣','先講佩戴舒適與通勤場景','先講庫存很少','只講顏色'], ans:'先講佩戴舒適與通勤場景', exp:'新品介紹要先情境，再規格。'},
  {id:'q8', stage:'資深專員', type:'新品QA', dimension:'新品介紹', title:'關卡8｜新品相機 Y25', q:'Zumoji Y25 復古 CCD 迷你相機，對送禮客最適合的切入點？', opts:['像素參數背誦','復古外觀 + 即拍即分享情境','只講最低價','只講保固'], ans:'復古外觀 + 即拍即分享情境', exp:'送禮商品應先打情緒與使用情境。'},
  {id:'q9', stage:'資深專員', type:'新品QA', dimension:'新品介紹', title:'關卡9｜防爆充 5000mAh', q:'Allite 防爆充 5000mAh 新品，對日常通勤客建議話術是？', opts:['容量越大越好','輕便好帶、短時補電快','只講品牌歷史','不需要問手機型號'], ans:'輕便好帶、短時補電快', exp:'新品推薦需貼合客戶使用習慣。', img:PRODUCT_IMAGES.powerbank},
  {id:'q10', stage:'資深專員', type:'新品QA', dimension:'新品介紹', title:'關卡10｜Qi2 磁吸電源', q:'WEILIFE Qi2 磁吸無線充行動電源的主賣點是？', opts:['只能有線充電','磁吸對位方便、外出效率高','一定適用全部手機','只能在室內用'], ans:'磁吸對位方便、外出效率高', exp:'突出效率與便利性是關鍵。'},
  {id:'q11', stage:'組長', type:'管理QA', dimension:'訓練管理', title:'關卡11｜錯題管理', q:'組長看見新人常錯「快充規格」，最有效的處置是？', opts:['要求重考一次','安排10分鐘微訓練+示範話術','先不處理','只貼公告'], ans:'安排10分鐘微訓練+示範話術', exp:'管理者需用最小成本快速補強弱項。'},
  {id:'q12', stage:'組長', type:'管理QA', dimension:'門市營運', title:'關卡12｜新品銷售追蹤', q:'門市新品介紹轉換率下降，組長應先看什麼？', opts:['只看總營收','新品問答命中率與加購率','只看到店人數','只看天氣'], ans:'新品問答命中率與加購率', exp:'先找影響轉換的前置指標。'},
  {id:'q13', stage:'店長', type:'策略QA', dimension:'營運策略', title:'關卡13｜新品策略', q:'店長要推新品週，最先落地的三件事應包含？', opts:['降價、廣告、抽獎','目標客群、話術模板、KPI追蹤','只開會','只換海報'], ans:'目標客群、話術模板、KPI追蹤', exp:'策略要能執行與被追蹤。'},
  {id:'q14', stage:'店長', type:'策略QA', dimension:'跨部門協同', title:'關卡14｜客服銷售聯動', q:'如何讓客服與門市在新品上口徑一致？', opts:['各做各的','共用Q&A題庫與每週校準','只交給客服','只交給門市'], ans:'共用Q&A題庫與每週校準', exp:'跨部門一致口徑可提升成交與信任。'},
  {id:'q15', stage:'店長', type:'策略QA', dimension:'風險控管', title:'關卡15｜風險回覆', q:'面對價格/庫存不確定問題，店長標準做法是？', opts:['先承諾再說','明確標註待確認並限時回覆','忽略客戶','直接拒絕'], ans:'明確標註待確認並限時回覆', exp:'避免過度承諾，保留信任與可控性。'}
];

const $ = (id) => document.getElementById(id);
const safeParse = (txt, fallback) => { try { return JSON.parse(txt); } catch { return fallback; } };

function getStorage(key, fallback) {
  try { return safeParse(localStorage.getItem(key), fallback) ?? fallback; }
  catch { return fallback; }
}

function setStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

function normalizeQuestion(q, i) {
  const options = Array.isArray(q.options || q.opts) ? (q.options || q.opts).map(x => String(x || '').trim()).filter(Boolean) : [];
  const answer = String(q.answer || q.ans || '').trim();
  if (!q.question && !q.q) return null;
  if (options.length < 2 || !answer || !options.includes(answer)) return null;
  return {
    id: String(q.id || `custom-${i + 1}`),
    stage: STAGE_ORDER.includes(q.stage) ? q.stage : '新人',
    type: q.type || '基本QA',
    dimension: q.dimension || '未分類',
    title: q.title || `關卡${i + 1}`,
    q: q.question || q.q,
    opts: options,
    ans: answer,
    exp: q.explain || q.exp || '—',
    img: q.imageUrl || PRODUCT_IMAGES[q.imageKey] || q.img || ''
  };
}

function loadBank() {
  const custom = getStorage(STORAGE_KEYS.bank, null);
  if (custom?.questions?.length) {
    const normalized = custom.questions.map(normalizeQuestion).filter(Boolean);
    if (normalized.length) return normalized;
  }
  return defaultLevels;
}

const startCard = $('startCard');
const gameCard = $('gameCard');
const resultCard = $('resultCard');
const progress = $('progress');
const scoreEl = $('score');
const titleEl = $('levelTitle');
const questionEl = $('question');
const optionsEl = $('options');
const feedbackEl = $('feedback');
const qImage = $('qImage');
const trainTag = $('trainTag');

let mode = 'all';
let idx = 0;
let score = 0;
let answered = false;
let activeLevels = [];
let revisitQueue = [];
let currentStage = '新人';
const sessionAnswers = [];

const shuffle = (arr) => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(v => v[1]);

function render() {
  const q = activeLevels[idx];
  if (!q) return;
  answered = false;
  progress.textContent = `第 ${idx + 1} / ${activeLevels.length} 關（${q.type}｜${q.stage}）`;
  scoreEl.textContent = `分數：${score}`;
  titleEl.textContent = q.title;
  questionEl.textContent = q.q;
  trainTag.textContent = `能力維度：${q.dimension || '未分類'}｜訓練階段：${currentStage}`;
  feedbackEl.textContent = '';
  $('nextBtn').disabled = true;
  optionsEl.innerHTML = '';

  if (q.img) { qImage.src = q.img; qImage.classList.remove('hidden'); }
  else qImage.classList.add('hidden');

  shuffle(q.opts).forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(opt, btn);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selected, btn) {
  if (answered) return;
  answered = true;
  const q = activeLevels[idx];
  const isRight = selected === q.ans;

  document.querySelectorAll('.option').forEach((b) => {
    b.disabled = true;
    if (b.textContent === q.ans) b.classList.add('correct');
  });

  if (isRight) {
    score += 10;
    btn.classList.add('correct');
    feedbackEl.textContent = `✅ 正確！${q.exp}`;
  } else {
    btn.classList.add('wrong');
    feedbackEl.textContent = `❌ 答錯了，已加入複訓。${q.exp}`;
    if (mode === 'wrong-only') revisitQueue.push(q);
  }

  sessionAnswers.push({
    qid: q.id,
    stage: q.stage,
    title: q.title,
    dimension: q.dimension,
    selected,
    correct: q.ans,
    isRight,
    mode,
    ts: Date.now()
  });

  scoreEl.textContent = `分數：${score}`;
  $('nextBtn').disabled = false;
}

function pullWrongPool(levels) {
  const records = getStorage(STORAGE_KEYS.records, []);
  const wrongCounter = {};
  records.forEach((r) => (r.answers || []).forEach((a) => {
    if (!a.isRight) wrongCounter[a.qid || a.title] = (wrongCounter[a.qid || a.title] || 0) + 1;
  }));

  const fromLatest = getStorage(STORAGE_KEYS.latestWrongSet, []);
  const set = new Set(fromLatest);
  const selected = levels.filter((q) => set.has(q.id) || set.has(q.title) || wrongCounter[q.id] > 0 || wrongCounter[q.title] > 0);
  selected.sort((a, b) => (wrongCounter[b.id] || wrongCounter[b.title] || 0) - (wrongCounter[a.id] || wrongCounter[a.title] || 0));
  return selected.slice(0, 20);
}

function stageAllowed(stage, qStage) {
  return STAGE_ORDER.indexOf(qStage) <= STAGE_ORDER.indexOf(stage);
}

function start(playMode) {
  const name = $('traineeName').value.trim();
  if (!name) return alert('請先輸入姓名');

  mode = playMode;
  currentStage = $('traineeStage').value;
  const levels = loadBank().filter((q) => stageAllowed(currentStage, q.stage || '新人'));
  revisitQueue = [];

  activeLevels = mode === 'wrong-only' ? pullWrongPool(levels) : [...levels];
  if (!activeLevels.length) return alert(mode === 'wrong-only' ? '目前沒有錯題可複訓' : '題庫為空，請到後台設定題目');

  startCard.classList.add('hidden');
  resultCard.classList.add('hidden');
  gameCard.classList.remove('hidden');
  idx = 0;
  score = 0;
  sessionAnswers.length = 0;
  render();
}

function buildDimensionStats(answers) {
  const map = {};
  answers.forEach((a) => {
    const key = a.dimension || '未分類';
    map[key] = map[key] || { total: 0, right: 0 };
    map[key].total += 1;
    if (a.isRight) map[key].right += 1;
  });
  return Object.entries(map).map(([dimension, v]) => ({
    dimension,
    accuracy: v.total ? Number(((v.right / v.total) * 100).toFixed(1)) : 0,
    total: v.total
  }));
}

function saveRecord() {
  const name = $('traineeName').value.trim();
  const stage = $('traineeStage').value;
  const records = getStorage(STORAGE_KEYS.records, []);
  const wrongIds = sessionAnswers.filter(a => !a.isRight).map(a => a.qid);
  const payload = {
    id: Date.now(),
    name,
    stage,
    mode,
    score,
    total: activeLevels.length * 10,
    finishedAt: new Date().toISOString(),
    answers: sessionAnswers,
    dimensionStats: buildDimensionStats(sessionAnswers),
    wrongIds
  };
  records.unshift(payload);
  setStorage(STORAGE_KEYS.records, records.slice(0, 1000));
  setStorage(STORAGE_KEYS.latestWrongSet, [...new Set(wrongIds)]);
}

function showResult() {
  saveRecord();
  const wrong = sessionAnswers.filter((a) => !a.isRight);
  const total = activeLevels.length * 10;

  $('finalName').textContent = `學員：${$('traineeName').value.trim()}｜階段：${$('traineeStage').value}`;
  $('finalScore').textContent = `總分：${score} / ${total}`;
  const ratio = total ? score / total : 0;
  const rank = ratio >= 0.85 ? 'S（銷售教練）' : ratio >= 0.72 ? 'A（可上線）' : ratio >= 0.6 ? 'B（再強化）' : 'C（建議重訓）';
  $('finalRank').textContent = `評級：${rank}`;

  if (wrong.length) {
    const weak = buildDimensionStats(wrong.map(a => ({...a, isRight:false}))).slice(0, 2).map(x => x.dimension).join('、');
    $('finalHint').textContent = `本次錯題 ${wrong.length} 題。建議先複訓：${weak || '核心題型'}。`;
  } else {
    $('finalHint').textContent = '恭喜全對！可挑戰錯題模式複盤團隊常見失誤。';
  }
}

$('startBtn').onclick = () => start('all');
$('startWrongBtn').onclick = () => start('wrong-only');
$('retryBtn').onclick = () => location.reload();
$('retryWrongBtn').onclick = () => start('wrong-only');

$('nextBtn').onclick = () => {
  idx += 1;
  if (idx >= activeLevels.length && mode === 'wrong-only' && revisitQueue.length) {
    activeLevels = [...activeLevels, ...revisitQueue.splice(0, 5)];
  }

  if (idx < activeLevels.length) return render();
  gameCard.classList.add('hidden');
  resultCard.classList.remove('hidden');
  showResult();
};