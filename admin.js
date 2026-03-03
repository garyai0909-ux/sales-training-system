const STORAGE_KEYS = { bank: 'questionBank', records: 'trainingRecords', latestWrongSet: 'latestWrongSet' };

const DEFAULT_BANK = {
  version: 'v3',
  notes: '選項會隨機排序；answer 必須存在 options 內；已含新品介紹題組',
  questions: [
    {id:'q1', type:'基本QA', dimension:'產品知識', title:'關卡1｜品牌定位', question:'WEiZ 銷售主張是什麼？', options:['最低價導向','高顏值 + 實用 + 生活質感','只做企業大單','只賣手機殼'], answer:'高顏值 + 實用 + 生活質感', explain:'話術要圍繞質感生活與實用價值。', imageKey:''},
    {id:'q2', type:'基本QA', dimension:'產品知識', title:'關卡2｜快充知識', question:'PD 充電重點為何？', options:['瓦數越高一定越快','要看裝置協議 + 線材規格','只看品牌名','所有線都一樣'], answer:'要看裝置協議 + 線材規格', explain:'需同時確認裝置支援協議、瓦數與線材。', imageKey:'charger'},
    {id:'q3', type:'基本QA', dimension:'組合銷售', title:'關卡3｜搭配銷售', question:'行動電源最佳加購組合是？', options:['只賣主商品','行動電源+快充線+充電頭','先推最貴耳機','改賣喇叭'], answer:'行動電源+快充線+充電頭', explain:'組合銷售提升客單與完整體驗。', imageKey:'powerbank'},
    {id:'q4', type:'基本QA', dimension:'產品知識', title:'關卡4｜喇叭介紹', question:'介紹藍牙喇叭時，先強調？', options:['顏色隨機','音質情境 + 使用場景','包裝盒大小','是否漲價'], answer:'音質情境 + 使用場景', explain:'先情境，再規格。', imageKey:'speaker'},
    {id:'q5', type:'基本QA', dimension:'客戶信任', title:'關卡5｜售後保障', question:'客人最在意售後，第一句應該？', options:['先結帳再說','說明保固與客服流程','不要問太多','請客人自己找官網'], answer:'說明保固與客服流程', explain:'透明售後能提升信任。', imageKey:''},
    {id:'q6', type:'情境QA', dimension:'需求訪談', title:'關卡6｜預算型客人', question:'預算 1,500 元要快充方案，怎麼提案？', options:['推最高價','先問手機型號再提入門快充組','只推單一線材','叫客人回去想'], answer:'先問手機型號再提入門快充組', explain:'先需求訪談，才能精準提案。', imageKey:''},
    {id:'q7', type:'情境QA', dimension:'成交技巧', title:'關卡7｜猶豫客人', question:'客人說「我再看看」，怎麼做較好？', options:['放棄','1句總結利益點+差異點+保障','一直追問','改推無關商品'], answer:'1句總結利益點+差異點+保障', explain:'精準總結比硬推有效。', imageKey:''},
    {id:'q8', type:'情境QA', dimension:'競品應對', title:'關卡8｜競品比較', question:'客人拿競品比較時，正確做法？', options:['貶低競品','回到需求對照規格/保固/情境價值','說都一樣','叫他網路查'], answer:'回到需求對照規格/保固/情境價值', explain:'專業比較，不攻擊競品。', imageKey:''},
    {id:'q9', type:'情境QA', dimension:'組合銷售', title:'關卡9｜加購話術', question:'結帳前加購成功率最高策略？', options:['臨時硬推','以體驗缺口引導加購','隨便推薦','不提加購'], answer:'以體驗缺口引導加購', explain:'從體驗缺口切入最自然。', imageKey:''},
    {id:'q10', type:'情境QA', dimension:'成交技巧', title:'關卡10｜成交收尾', question:'成交前最後一步重點？', options:['催單','再次確認需求符合 + 交付與保固提醒','快速結束對話','忽略售後'], answer:'再次確認需求符合 + 交付與保固提醒', explain:'安心感是成交關鍵。', imageKey:''},
    {id:'q11', type:'新品介紹', dimension:'產品知識', title:'關卡11｜新品快充頭亮點', question:'介紹商城新品 65W 氮化鎵快充頭時，優先強調哪一點？', options:['包裝配色','體積小 + 多裝置充電效率','只能充手機','價格最低'], answer:'體積小 + 多裝置充電效率', explain:'新品介紹要先講價值情境，再補規格。', imageKey:'charger'},
    {id:'q12', type:'新品介紹', dimension:'需求訪談', title:'關卡12｜新品磁吸行動電源', question:'客人問新品磁吸行動電源是否適用，第一步應該？', options:['直接推薦最高容量','先確認手機型號與磁吸/無線充電支援','只說外型很好看','請客人自行查官網'], answer:'先確認手機型號與磁吸/無線充電支援', explain:'先做相容性訪談，避免錯配。', imageKey:'powerbank'},
    {id:'q13', type:'新品介紹', dimension:'組合銷售', title:'關卡13｜新品車充組合', question:'介紹新品車用快充時，最佳加購組合是？', options:['只賣車充本體','車充 + 快充線（Type-C/Lightning 依裝置）','改推藍牙喇叭','只賣最便宜線材'], answer:'車充 + 快充線（Type-C/Lightning 依裝置）', explain:'新品搭配完整方案可提升成交率與體驗。', imageKey:'charger'},
    {id:'q14', type:'新品介紹', dimension:'客戶信任', title:'關卡14｜新品保固疑慮', question:'客人擔心新品剛上市不穩定，怎麼回應最適合？', options:['保證永遠不壞','說明保固政策與換修流程，並提供實測情境','叫客人等半年','只說很多人買'], answer:'說明保固政策與換修流程，並提供實測情境', explain:'用可驗證資訊建立新品信任。', imageKey:''},
    {id:'q15', type:'新品介紹', dimension:'產品知識', title:'關卡15｜新品藍牙喇叭', question:'介紹新品藍牙喇叭時，哪種說法更專業？', options:['音量最大就最好','先描述使用場景，再補充音質與續航表現','只說外觀可愛','不需試聽'], answer:'先描述使用場景，再補充音質與續航表現', explain:'新品介紹需場景化，客人更容易理解。', imageKey:'speaker'},
    {id:'q16', type:'新品介紹', dimension:'競品應對', title:'關卡16｜新品與競品比較', question:'客人拿競品新品比較時，正確策略是？', options:['直接貶低競品','回到客人需求比較規格、保固與使用情境','說都差不多','拒絕比較'], answer:'回到客人需求比較規格、保固與使用情境', explain:'維持專業中立，聚焦客人決策依據。', imageKey:''},
    {id:'q17', type:'新品介紹', dimension:'成交技巧', title:'關卡17｜新品成交臨門', question:'客人對新品有興趣但猶豫，收尾話術應該？', options:['今天不買就沒了','總結新品對他需求的 2 個關鍵利益 + 保固安心點','一直沉默等待','改推舊款'], answer:'總結新品對他需求的 2 個關鍵利益 + 保固安心點', explain:'臨門一腳要精準、可感知、低壓力。', imageKey:''},
    {id:'q18', type:'新品介紹', dimension:'組合銷售', title:'關卡18｜新品展示順序', question:'展示新品系列時，較佳順序為何？', options:['先講最貴款再說','先需求分類，再展示對應新品組合','隨機拿商品介紹','直接報價'], answer:'先需求分類，再展示對應新品組合', explain:'結構化展示可縮短決策時間。', imageKey:''}
  ]
};

let editingId = null;
let bank = loadBank();

const $ = (id) => document.getElementById(id);
const tb = document.querySelector('#table tbody');

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function loadBank() {
  const custom = readJson(STORAGE_KEYS.bank, null);
  return custom?.questions?.length ? custom : structuredClone(DEFAULT_BANK);
}

function getRecords() { return readJson(STORAGE_KEYS.records, []); }

function validateBank(b) {
  const errors = [];
  const ids = new Set();
  if (!Array.isArray(b.questions) || !b.questions.length) errors.push('題庫不可為空');

  (b.questions || []).forEach((q, i) => {
    const prefix = `第${i + 1}題`;
    if (!q.id) errors.push(`${prefix}: 缺少 id`);
    if (q.id && ids.has(q.id)) errors.push(`${prefix}: id 重複 (${q.id})`);
    ids.add(q.id);
    if (!q.question?.trim()) errors.push(`${prefix}: 題目不可為空`);
    if (!Array.isArray(q.options) || q.options.filter(Boolean).length < 2) errors.push(`${prefix}: options 至少 2 個`);
    if (!q.options?.includes(q.answer)) errors.push(`${prefix}: answer 必須在 options 內`);
  });
  return errors;
}

function renderKpi(records) {
  const kpi = $('kpi');
  const total = records.length;
  const uniqueTrainees = new Set(records.map(r => r.name)).size;
  const avg = total ? (records.reduce((a, b) => a + b.score, 0) / total).toFixed(1) : '0';
  const passRate = total ? (records.filter(r => (r.score / (r.total || 1)) >= 0.72).length / total * 100).toFixed(1) : '0';

  kpi.innerHTML = [
    ['總訓練次數', total],
    ['參訓人數', uniqueTrainees],
    ['平均分數', avg],
    ['達標率(A以上)', `${passRate}%`]
  ].map(([k, v]) => `<div class="kpi"><small>${k}</small><b>${v}</b></div>`).join('');
}

function aggregate(records) {
  const wrongMap = {};
  const dimMap = {};
  const trendMap = {};

  records.forEach(r => {
    const day = (r.finishedAt || '').slice(0, 10);
    if (!trendMap[day]) trendMap[day] = {score:0, total:0, count:0};
    trendMap[day].score += r.score || 0;
    trendMap[day].total += r.total || 0;
    trendMap[day].count += 1;

    (r.answers || []).forEach(a => {
      const q = a.title || a.qid;
      if (!a.isRight) wrongMap[q] = (wrongMap[q] || 0) + 1;
      const d = a.dimension || '未分類';
      dimMap[d] = dimMap[d] || {right:0,total:0};
      dimMap[d].total += 1;
      if (a.isRight) dimMap[d].right += 1;
    });
  });

  return { wrongMap, dimMap, trendMap };
}

function renderInsights(records) {
  const { wrongMap, dimMap, trendMap } = aggregate(records);
  const topWrong = Object.entries(wrongMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const dimStats = Object.entries(dimMap)
    .map(([k,v]) => ({k, acc: v.total ? ((v.right / v.total) * 100).toFixed(1) : 0}))
    .sort((a,b)=>a.acc-b.acc);

  $('insights').innerHTML = `
    <p><b>常錯題 Top5：</b>${topWrong.length ? topWrong.map(([k,v])=>`${k}(${v})`).join('、') : '目前無資料'}</p>
    <p><b>能力維度弱項：</b>${dimStats.length ? dimStats.slice(0,3).map(x=>`${x.k}(${x.acc}%)`).join('、') : '目前無資料'}</p>
  `;

  const trendRows = Object.entries(trendMap).sort((a,b)=>a[0].localeCompare(b[0])).slice(-14);
  $('trend').innerHTML = '<b>近14日學員趨勢（平均得分率）</b><br>' +
    (trendRows.length ? trendRows.map(([d,v]) => `${d}: ${((v.score / (v.total || 1)) * 100).toFixed(1)}% (${v.count}人次)`).join('<br>') : '目前無資料');

  return { wrongMap, dimStats, trendRows };
}

function renderTable(records) {
  const key = $('searchName').value.trim();
  const list = key ? records.filter(r => r.name?.includes(key)) : records;
  tb.innerHTML = '';

  list.forEach(r => {
    const right = (r.answers || []).filter(x => x.isRight).length;
    const total = (r.answers || []).length || 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.name || '-'}</td><td>${r.stage || '新人'}</td><td>${r.mode || 'all'}</td><td>${r.score}/${r.total}</td><td>${new Date(r.finishedAt).toLocaleString()}</td><td>${((right/total)*100).toFixed(1)}%</td><td><button data-id="${r.id}">查看</button></td>`;
    tb.appendChild(tr);
  });

  tb.querySelectorAll('button').forEach(btn => {
    btn.onclick = () => {
      const r = list.find(x => x.id === Number(btn.dataset.id));
      if (!r) return;
      const lines = [
        `學員：${r.name}`,
        `階段：${r.stage || '新人'}`,
        `模式：${r.mode || 'all'}`, 
        `分數：${r.score}/${r.total}`,
        `完成：${new Date(r.finishedAt).toLocaleString()}`,
        '--- 答題明細 ---'
      ];
      (r.answers || []).forEach((a,i) => lines.push(`${i+1}. ${a.title} ｜ 你的答案：${a.selected} ｜ 正確：${a.correct} ｜ ${a.isRight ? '✅' : '❌'} ｜ ${a.dimension || ''}`));
      $('detail').textContent = lines.join('\n');
    };
  });
}

function exportCsv(records, stats) {
  const rows = [['name','stage','mode','score','total','finishedAt','accuracy']];
  records.forEach(r => {
    const total = (r.answers || []).length || 1;
    const right = (r.answers || []).filter(a=>a.isRight).length;
    rows.push([r.name, r.stage || '新人', r.mode, r.score, r.total, r.finishedAt, `${((right / total) * 100).toFixed(1)}%`]);
  });
  rows.push([],['常錯題','次數']);
  Object.entries(stats.wrongMap).sort((a,b)=>b[1]-a[1]).forEach(x => rows.push(x));

  const csv = rows.map(r => r.map(x => `"${String(x ?? '').replaceAll('"','""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'training-manager-report.csv';
  a.click();
}

function exportXlsx(records, stats) {
  if (!window.XLSX) return alert('XLSX 套件載入失敗');
  const wb = XLSX.utils.book_new();
  const summary = [['姓名','階段','模式','分數','滿分','完成時間']];
  records.forEach(r => summary.push([r.name, r.stage || '新人', r.mode, r.score, r.total, new Date(r.finishedAt).toLocaleString()]));
  const ws1 = XLSX.utils.aoa_to_sheet(summary);

  const wrong = [['常錯題','次數']];
  Object.entries(stats.wrongMap).sort((a,b)=>b[1]-a[1]).forEach(r => wrong.push(r));
  const ws2 = XLSX.utils.aoa_to_sheet(wrong);

  const dims = [['能力維度','正確率']];
  stats.dimStats.forEach(d => dims.push([d.k, `${d.acc}%`]));
  const ws3 = XLSX.utils.aoa_to_sheet(dims);

  XLSX.utils.book_append_sheet(wb, ws1, 'Records');
  XLSX.utils.book_append_sheet(wb, ws2, 'TopWrong');
  XLSX.utils.book_append_sheet(wb, ws3, 'Dimensions');
  XLSX.writeFile(wb, 'training-manager-report.xlsx');
}

function collectForm() {
  const options = [$('fOpt1').value, $('fOpt2').value, $('fOpt3').value, $('fOpt4').value].map(s => s.trim()).filter(Boolean);
  return {
    id: $('fId').value.trim(),
    title: $('fTitle').value.trim(),
    type: $('fType').value.trim() || '基本QA',
    dimension: $('fDimension').value.trim() || '未分類',
    question: $('fQuestion').value.trim(),
    options,
    answer: $('fAnswer').value.trim(),
    explain: $('fExplain').value.trim(),
    imageKey: $('fImageKey').value.trim()
  };
}

function fillForm(q) {
  $('fId').value = q.id || '';
  $('fTitle').value = q.title || '';
  $('fType').value = q.type || '基本QA';
  $('fDimension').value = q.dimension || '未分類';
  $('fQuestion').value = q.question || '';
  $('fOpt1').value = q.options?.[0] || '';
  $('fOpt2').value = q.options?.[1] || '';
  $('fOpt3').value = q.options?.[2] || '';
  $('fOpt4').value = q.options?.[3] || '';
  $('fAnswer').value = q.answer || '';
  $('fExplain').value = q.explain || '';
  $('fImageKey').value = q.imageKey || '';
}

function clearForm() {
  fillForm({ type:'基本QA', dimension:'產品知識', options:[] });
  editingId = null;
  $('editorTitle').textContent = '新增題目';
  $('addOrUpdateBtn').textContent = '新增題目';
  $('cancelEditBtn').classList.add('hidden');
}

function renderQuestionList() {
  const wrap = $('questionList');
  wrap.innerHTML = bank.questions.map(q => `
    <div class="q-row">
      <div><b>${q.id}</b>｜${q.title} <small>(${q.dimension || '未分類'})</small><br><small>${q.question}</small></div>
      <div class="row wrap" style="gap:6px;">
        <button class="secondary" data-edit="${q.id}">編輯</button>
        <button class="danger" data-del="${q.id}">刪除</button>
      </div>
    </div>
  `).join('');

  wrap.querySelectorAll('[data-edit]').forEach(btn => {
    btn.onclick = () => {
      editingId = btn.dataset.edit;
      const q = bank.questions.find(x => x.id === editingId);
      fillForm(q);
      $('editorTitle').textContent = `編輯題目：${q.id}`;
      $('addOrUpdateBtn').textContent = '更新題目';
      $('cancelEditBtn').classList.remove('hidden');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
  });

  wrap.querySelectorAll('[data-del]').forEach(btn => {
    btn.onclick = () => {
      if (!confirm(`確定刪除 ${btn.dataset.del}？`)) return;
      bank.questions = bank.questions.filter(q => q.id !== btn.dataset.del);
      renderQuestionList();
    };
  });
}

function showValidation(errors) {
  const box = $('bankErrors');
  if (!errors.length) {
    box.classList.add('hidden');
    box.textContent = '';
    return;
  }
  box.classList.remove('hidden');
  box.innerHTML = `<b>題庫驗證失敗：</b><br>${errors.join('<br>')}`;
}

function bootstrap() {
  const records = getRecords();
  renderKpi(records);
  const stats = renderInsights(records);
  renderTable(records);
  renderQuestionList();
  clearForm();

  $('searchName').oninput = () => renderTable(getRecords());

  $('addOrUpdateBtn').onclick = () => {
    const q = collectForm();
    const draft = { ...bank, questions: editingId ? bank.questions.map(x => x.id === editingId ? q : x) : [...bank.questions, q] };
    const errs = validateBank(draft);
    showValidation(errs);
    if (errs.length) return;
    bank = draft;
    renderQuestionList();
    clearForm();
  };

  $('cancelEditBtn').onclick = clearForm;

  $('validateBankBtn').onclick = () => {
    const errs = validateBank(bank);
    showValidation(errs);
    if (!errs.length) alert('✅ 題庫驗證通過');
  };

  $('saveBankBtn').onclick = () => {
    const errs = validateBank(bank);
    showValidation(errs);
    if (errs.length) return;
    localStorage.setItem(STORAGE_KEYS.bank, JSON.stringify(bank));
    alert('✅ 題庫已儲存，遊戲頁重新開始即生效');
  };

  $('resetBankBtn').onclick = () => {
    if (!confirm('恢復預設題庫？')) return;
    localStorage.removeItem(STORAGE_KEYS.bank);
    bank = structuredClone(DEFAULT_BANK);
    renderQuestionList();
    clearForm();
    showValidation([]);
  };

  $('clearBtn').onclick = () => {
    if (!confirm('確定要清空所有訓練紀錄？')) return;
    localStorage.removeItem(STORAGE_KEYS.records);
    localStorage.removeItem(STORAGE_KEYS.latestWrongSet);
    location.reload();
  };

  $('exportCsvBtn').onclick = () => exportCsv(getRecords(), stats);
  $('exportXlsxBtn').onclick = () => exportXlsx(getRecords(), stats);
}

bootstrap();