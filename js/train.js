/* 출력 훈련 — 오늘의 학습 기사로 '먼저 만들고 → 정답과 비교'하는 훈련 (#/train, #/train/<articleId>)
 * 1) 역번역  2) 받아쓰기  3) 핵심 표현 떠올리기  4) 요약 말하기 4/3/2
 * 기록은 localStorage(englishStudy.train.v1)에 따로 저장합니다. 기존 진도 키(englishStudy.progress.v1)는 건드리지 않습니다.
 * app.js 의존: window.Study (speakText, matchAnswer, looksEnglish)
 */
(function (root) {
  "use strict";
  var KEY = "englishStudy.train.v1";
  var TABS = [
    { id: "trans", label: "① 역번역", desc: "한국어 문장만 보고 영어로 먼저 써 본 뒤, 비즈니스 번역과 비교합니다." },
    { id: "dict", label: "② 받아쓰기", desc: "비즈니스 번역 문장을 듣고 들리는 대로 받아 적습니다. 놓친 단어가 표시됩니다." },
    { id: "expr", label: "③ 핵심 표현", desc: "핵심 표현 20개를 한국어 뜻만 보고 영어로 떠올립니다." },
    { id: "sum", label: "④ 요약 말하기", desc: "기사 내용을 영어로 90초 → 60초 → 45초 세 번 말합니다. 시간이 줄수록 말이 빨라지고 매끄러워집니다." }
  ];
  var SECS = [90, 60, 45];
  var st = { art: null, tab: "trans", i: 0, done: false, last: null, plays: 0, round: 0, res: [], timer: null, left: 0, rec: null, rate: 1 };
  var T = load();

  function load() {
    try { var r = JSON.parse(root.localStorage.getItem(KEY) || "null"); if (r && r.log) return r; } catch (e) {}
    return { log: [], best: {} };
  }
  function save() { try { root.localStorage.setItem(KEY, JSON.stringify(T)); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function today() { return root.Study ? root.Study.todayStr() : new Date().toISOString().slice(0, 10); }
  function record(kind, no, score, extra) {
    var e = { d: today(), a: st.art.id, k: kind, n: no, s: Math.round(score) };
    if (extra) Object.keys(extra).forEach(function (k) { e[k] = extra[k]; });
    T.log.push(e); if (T.log.length > 4000) T.log = T.log.slice(-4000);
    var bk = st.art.id + ":" + kind + ":" + no;
    if (T.best[bk] == null || score > T.best[bk]) T.best[bk] = Math.round(score);
    save();
  }

  /* ---------- 비교 (단어 단위 LCS) ---------- */
  function norm(s) {
    return String(s || "").toLowerCase().replace(/[’‘]/g, "'").replace(/[“”"]/g, " ").replace(/\(.*?\)/g, " ")
      .replace(/[^a-z0-9가-힣%'\s-]/g, " ").split(/\s+/).filter(Boolean);
  }
  function compare(user, target) {
    var a = norm(user), b = norm(target), m = a.length, n = b.length, i, j;
    if (!m || !n) return { score: 0, html: esc(target), extra: [] };
    var T2 = []; for (i = 0; i <= m; i++) { T2.push(new Array(n + 1).fill(0)); }
    for (i = m - 1; i >= 0; i--) for (j = n - 1; j >= 0; j--) T2[i][j] = a[i] === b[j] ? T2[i + 1][j + 1] + 1 : Math.max(T2[i + 1][j], T2[i][j + 1]);
    var ma = {}, mb = {}; i = 0; j = 0;
    while (i < m && j < n) { if (a[i] === b[j]) { ma[i] = mb[j] = 1; i++; j++; } else if (T2[i + 1][j] >= T2[i][j + 1]) i++; else j++; }
    var bi = 0;
    var html = String(target).split(/\s+/).map(function (w) {
      var k = norm(w); if (!k.length) return esc(w);
      var hit = k.map(function () { return !!mb[bi++]; }).every(Boolean);
      return hit ? esc(w) : '<span class="tr-miss">' + esc(w) + "</span>";
    }).join(" ");
    return { score: 200 * T2[0][0] / (m + n), html: html, extra: a.filter(function (w, x) { return !ma[x]; }) };
  }
  function hint(en) { return String(en).split(/\s+/).map(function (w) { return w.replace(/^([^A-Za-z]*[A-Za-z])([A-Za-z'’-]*)/, function (_, a, b) { return a + b.replace(/[A-Za-z]/g, "_"); }); }).join(" "); }

  /* 기사 카드 → 훈련 문항 (미국 기사 날은 ko에 영어 원문이 들어 있으므로 방향을 뒤집음) */
  function sentences(a) {
    return [a.titleCard].concat(a.cards || []).filter(Boolean).map(function (c) {
      var koIsKo = /[가-힣]/.test(c.ko || "");
      return { no: c.no, prompt: koIsKo ? c.ko : c.biz, answer: koIsKo ? c.biz : c.ko, ultra: koIsKo ? c.ultra : "", note: c.note, alts: koIsKo ? (c.alts || []) : [] };
    }).filter(function (x) { return x.prompt && x.answer && !/[가-힣]/.test(x.answer); });
  }
  function exprs(a) { return (a.expressions || []).filter(function (r) { return r[2]; }); }

  /* ---------- 점수판 ---------- */
  function stats(a) {
    var L = T.log.filter(function (e) { return e.a === a.id; });
    function avgBest(kind, total) {
      var keys = Object.keys(T.best).filter(function (k) { return k.indexOf(a.id + ":" + kind + ":") === 0; });
      var sum = keys.reduce(function (s, k) { return s + T.best[k]; }, 0);
      return { n: keys.length, total: total, avg: keys.length ? Math.round(sum / keys.length) : null };
    }
    var flu = L.filter(function (e) { return e.k === "sum" && e.wpm; });
    return { trans: avgBest("trans", sentences(a).length), dict: avgBest("dict", sentences(a).length), expr: avgBest("expr", exprs(a).length),
      wpm: flu.length ? flu[flu.length - 1].wpm : null, wpmFirst: flu.length ? flu[0].wpm : null };
  }
  function bar(n, t) { var p = t ? Math.round(100 * n / t) : 0; return '<div class="progress" role="progressbar" aria-valuenow="' + p + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + p + '%"></span></div>'; }
  function box(label, v, sub, n, t) {
    return '<div class="card stat"><div class="label">' + label + '</div><div class="num">' + v + '</div>' + (t != null ? bar(n, t) : "") + '<div class="small muted">' + sub + "</div></div>";
  }
  function week() {
    var days = [], i, d = today();
    for (i = 6; i >= 0; i--) days.push(root.Study ? root.Study.addDays(d, -i) : d);
    return days.map(function (x) {
      var es = T.log.filter(function (e) { return e.d === x && e.k !== "sum"; });
      var avg = es.length ? Math.round(es.reduce(function (s, e) { return s + e.s; }, 0) / es.length) : null;
      return { d: x, n: es.length, avg: avg };
    });
  }
  function weekHtml() {
    var w = week(), mx = Math.max.apply(null, [5].concat(w.map(function (x) { return x.n; })));
    return '<div class="tr-week" aria-label="최근 7일 출력 훈련">' + w.map(function (x) {
      return '<div class="tr-day"><div class="tr-col"><span style="height:' + Math.round(100 * x.n / mx) + '%"></span></div><div class="tr-avg">' + (x.avg == null ? "–" : x.avg) + '</div><div class="small muted">' + esc(x.d.slice(5).replace("-", "/")) + "</div></div>";
    }).join("") + '</div><div class="small muted" style="margin-top:6px">막대 = 하루 훈련 문항 수 · 숫자 = 그날 평균 점수</div>';
  }

  /* ---------- 화면 ---------- */
  function view(parts, ARTICLES) {
    var a = parts[1] ? ARTICLES.filter(function (x) { return x.id === parts[1]; })[0] : ARTICLES[0];
    if (!a) return '<div class="card"><h2>훈련할 기사가 없어요</h2><p><a href="#/articles">기사 목록</a></p></div>';
    if (!st.art || st.art.id !== a.id) { stopTimer(); st.art = a; st.i = 0; st.done = false; st.last = null; st.round = 0; st.res = []; }
    st.ARTICLES = ARTICLES;
    var s = stats(a), isToday = a.id === ARTICLES[0].id;
    var h = '<div class="train-page"><div class="breadcrumb"><a href="#/articles/' + esc(a.id) + '">오늘의 학습 기사</a> › 출력 훈련</div>';
    h += '<section class="hero"><div class="row"><span class="pill green">' + (isToday ? "오늘의 기사 · " : "") + esc(a.dateLabel || a.date) + '</span><span class="pill">' + esc(a.field || "") + '</span></div>' +
      '<h1 style="font-size:22px;margin-top:10px">' + esc(a.title) + '</h1><p class="lead" style="margin:0">읽기 전에 먼저 만들어 보세요. 정답은 내가 쓴 뒤에만 보입니다. 직접 떠올린 문장이 훨씬 오래 남습니다.</p>' +
      '<div class="row" style="margin-top:14px"><select id="trArticle" aria-label="기사 선택">' + ARTICLES.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === a.id ? " selected" : "") + ">" + esc(x.date) + " · " + esc(x.title.length > 26 ? x.title.slice(0, 26) + "…" : x.title) + "</option>"; }).join("") + "</select></div></section>";
    h += '<div class="section"><div class="section-title">📊 이 기사 출력 점수</div><div class="grid-3">' +
      box("역번역", s.trans.avg == null ? "–" : s.trans.avg + "점", s.trans.n + " / " + s.trans.total + " 문장 · 최고점 평균", s.trans.n, s.trans.total) +
      box("받아쓰기", s.dict.avg == null ? "–" : s.dict.avg + "%", s.dict.n + " / " + s.dict.total + " 문장", s.dict.n, s.dict.total) +
      box("핵심 표현", s.expr.avg == null ? "–" : s.expr.avg + "점", s.expr.n + " / " + s.expr.total + " 표현", s.expr.n, s.expr.total) +
      box("요약 말하기", s.wpm == null ? "–" : s.wpm + " wpm", s.wpmFirst != null && s.wpm !== s.wpmFirst ? "처음 " + s.wpmFirst + " wpm → 지금 " + s.wpm + " wpm" : "마지막 45초 라운드 속도") +
      '</div><div class="card" style="margin-top:14px">' + weekHtml() + "</div></div>";
    h += '<div class="tr-tabs" role="tablist">' + TABS.map(function (t) { return '<button type="button" role="tab" class="btn' + (t.id === st.tab ? " primary" : "") + '" data-trtab="' + t.id + '" aria-selected="' + (t.id === st.tab) + '">' + t.label + "</button>"; }).join("") + "</div>";
    var tab = TABS.filter(function (t) { return t.id === st.tab; })[0];
    h += '<p class="small muted" style="margin:10px 0 12px">' + esc(tab.desc) + "</p>";
    h += '<div id="trBody">' + body() + "</div></div>";
    return h;
  }
  function body() {
    if (st.tab === "trans") return transView();
    if (st.tab === "dict") return dictView();
    if (st.tab === "expr") return exprView();
    return sumView();
  }
  function micBtn(target) { return recSupported() ? '<button type="button" class="btn" data-trmic="' + target + '">🎙 말하기</button>' : ""; }
  function finished(kind, n, total) {
    var keys = Object.keys(T.best).filter(function (k) { return k.indexOf(st.art.id + ":" + kind + ":") === 0; });
    var avg = keys.length ? Math.round(keys.reduce(function (s, k) { return s + T.best[k]; }, 0) / keys.length) : 0;
    return '<div class="card"><h2>끝까지 했어요 · 평균 ' + avg + "점</h2><p class=\"muted\">" + total + '개를 직접 만들어 봤어요. 점수가 낮은 문장만 골라 다시 하면 효과가 큽니다.</p><div class="row"><button type="button" class="btn primary" data-trrestart="1">처음부터 다시</button>' +
      '<a class="btn" href="#/articles/' + esc(st.art.id) + '">기사 분석 보기</a></div></div>';
  }

  function transView() {
    var L = sentences(st.art);
    if (!L.length) return '<div class="card muted">이 기사에는 역번역할 문장이 없어요.</div>';
    if (st.i >= L.length) return finished("trans", st.i, L.length);
    var c = L[st.i], r = st.last;
    var h = '<div class="study"><div class="row" style="justify-content:space-between"><div class="tag">' + (c.no === 1 ? "제목" : "문장 " + (c.no - 1)) + '</div><span class="small muted">' + (st.i + 1) + " / " + L.length + "</span></div>";
    h += '<div class="blk l-ko"><div class="lbl">한국어 원문</div><div class="txt">' + esc(c.prompt) + "</div></div>";
    if (!r) {
      h += '<div class="blk"><label class="lbl" for="trAns">내 영어 번역</label><textarea id="trAns" class="tr-input" rows="4" placeholder="투자제안서 톤의 영어로 써 보세요" spellcheck="false" autocomplete="off"></textarea>' +
        '<div class="row" style="margin-top:10px"><button type="button" class="btn primary" data-trcheck="trans">제출</button>' + micBtn("trAns") + '<button type="button" class="btn" data-trhint="1">힌트</button><button type="button" class="btn" data-trskip="trans">모르겠어요</button></div><div class="small muted tr-hint" id="trHint"></div></div>';
    } else {
      h += '<div class="blk"><div class="lbl">내 번역</div><div class="txt tr-mine">' + esc(r.user || "(건너뜀)") + "</div></div>";
      h += '<div class="tr-score"><b>' + Math.round(r.score) + '</b><span>점 · 비즈니스 번역과 단어 일치도</span></div>';
      h += '<div class="blk l-biz"><div class="lbl">비즈니스 간결 번역 · <span class="tr-miss">밑줄</span> = 내가 놓친 단어</div><div class="txt">' + r.html + ' <button type="button" class="speak-btn" data-speak="' + esc(c.answer) + '" aria-label="듣기">🔊</button></div></div>';
      if (c.ultra) h += '<div class="blk l-ultra"><div class="lbl">ULTRA SHORT</div><div class="txt">' + esc(c.ultra) + "</div></div>";
      if (c.note) h += '<div class="blk l-note"><div class="lbl">번역 설명</div><div class="txt">' + esc(c.note) + "</div></div>";
      if (c.alts.length) h += '<div class="blk l-alt"><div class="lbl">대체 표현 — 내 문장에 써 봤나요?</div><div class="chips">' + c.alts.map(function (x) { return '<span class="chip">' + esc(x) + "</span>"; }).join("") + "</div></div>";
      h += '<div class="row" style="margin-top:16px"><button type="button" class="btn primary" data-trnext="1">다음 문장 →</button><button type="button" class="btn" data-trretry="1">다시 써 보기</button></div>';
    }
    return h + "</div>";
  }

  function dictView() {
    var L = sentences(st.art);
    if (!L.length) return '<div class="card muted">이 기사에는 받아쓰기할 문장이 없어요.</div>';
    if (st.i >= L.length) return finished("dict", st.i, L.length);
    var c = L[st.i], r = st.last;
    var h = '<div class="study"><div class="row" style="justify-content:space-between"><div class="tag">' + (c.no === 1 ? "제목" : "문장 " + (c.no - 1)) + '</div><span class="small muted">' + (st.i + 1) + " / " + L.length + "</span></div>";
    h += '<div class="row" style="margin:6px 0 14px"><button type="button" class="btn primary" data-trplay="1">🔊 듣기</button>' +
      '<button type="button" class="btn sm' + (st.rate === 0.8 ? " primary" : "") + '" data-trrate="0.8">0.8×</button><button type="button" class="btn sm' + (st.rate === 1 ? " primary" : "") + '" data-trrate="1">1×</button>' +
      '<span class="small muted" id="trPlays">재생 ' + st.plays + "회</span></div>";
    if (!r) {
      h += '<textarea id="trDict" class="tr-input" rows="3" placeholder="들리는 대로 입력" spellcheck="false" autocomplete="off"></textarea><div class="row" style="margin-top:10px"><button type="button" class="btn primary" data-trcheck="dict">채점</button><button type="button" class="btn" data-trskip="dict">정답 보기</button></div>';
    } else {
      h += '<div class="tr-score"><b>' + Math.round(r.score) + '</b><span>% 받아 적음</span></div>';
      h += '<div class="blk l-biz"><div class="lbl">정답 · <span class="tr-miss">밑줄</span> = 못 들은 단어</div><div class="txt">' + r.html + "</div></div>";
      if (r.extra && r.extra.length) h += '<div class="small muted">잘못 들은 단어: ' + esc(r.extra.join(", ")) + "</div>";
      h += '<div class="blk l-ko"><div class="lbl">한국어 원문</div><div class="txt">' + esc(c.prompt) + "</div></div>";
      h += '<div class="row" style="margin-top:16px"><button type="button" class="btn primary" data-trnext="1">다음 문장 →</button></div>';
    }
    return h + "</div>";
  }

  function exprView() {
    var L = exprs(st.art);
    if (!L.length) return '<div class="card muted">이 기사에는 핵심 표현이 없어요.</div>';
    if (st.i >= L.length) return finished("expr", st.i, L.length);
    var e = L[st.i], r = st.last;
    var h = '<div class="study"><div class="row" style="justify-content:space-between"><div class="tag">핵심 표현 ' + esc(e[0]) + '</div><span class="small muted">' + (st.i + 1) + " / " + L.length + "</span></div>";
    h += '<div class="blk l-ko"><div class="lbl">한국어 뜻</div><div class="txt">' + esc(e[1]) + "</div></div>";
    if (!r) {
      h += '<input id="trExpr" class="tr-input" type="text" placeholder="영어 표현" spellcheck="false" autocomplete="off" autocapitalize="off"><div class="row" style="margin-top:10px"><button type="button" class="btn primary" data-trcheck="expr">확인</button><button type="button" class="btn" data-trhint="1">힌트</button><button type="button" class="btn" data-trskip="expr">모르겠어요</button></div><div class="small muted tr-hint" id="trHint"></div>';
    } else {
      h += '<div class="tr-score ' + (r.ok ? "ok" : "no") + '"><b>' + (r.ok ? "정답" : "다시") + "</b><span>" + esc(r.user ? "내 답: " + r.user : "건너뜀") + "</span></div>";
      h += '<div class="blk l-biz"><div class="lbl">영어 표현</div><div class="txt">' + esc(e[2]) + ' <button type="button" class="speak-btn" data-speak="' + esc(e[2]) + '" aria-label="듣기">🔊</button></div></div>';
      if (e[3]) h += '<div class="blk l-ultra"><div class="lbl">예문</div><div class="txt">' + esc(e[3]) + ' <button type="button" class="speak-btn" data-speak="' + esc(e[3]) + '" aria-label="예문 듣기">🔊</button></div></div>';
      h += '<div class="row" style="margin-top:16px"><button type="button" class="btn primary" data-trnext="1">다음 표현 →</button></div>';
    }
    return h + "</div>";
  }

  function sumView() {
    var a = st.art, r = st.round;
    var h = '<div class="card"><div class="callout" style="margin-top:0"><b>이 내용을 영어로 말해 보세요</b>' + esc(a.summary) + "</div>";
    h += '<div class="tr-timer" id="trTimer">' + (r < 3 ? (st.timer ? st.left : SECS[r]) : 0) + '</div><div class="small muted" style="text-align:center">' + (r < 3 ? "라운드 " + (r + 1) + " / 3 · " + SECS[r] + "초" : "3라운드 완료") + "</div>";
    if (r < 3) {
      h += '<textarea id="trSum" class="tr-input" rows="5" placeholder="' + (recSupported() ? "시작을 누르면 말한 내용이 받아 적힙니다. 키보드로 입력해도 됩니다." : "말하듯 빠르게 입력하세요 (휴대폰은 키보드의 🎙 받아쓰기를 써도 됩니다)") + '" spellcheck="false"></textarea>' +
        '<div class="row" style="margin-top:10px"><button type="button" class="btn primary" data-trgo="1">' + (st.timer ? "라운드 끝내기" : "시작") + "</button></div>";
    }
    if (st.res.length) {
      var mx = Math.max.apply(null, [1].concat(st.res.map(function (x) { return x.wpm; })));
      h += '<div style="margin-top:16px">' + st.res.map(function (x, i) {
        return '<div class="tr-round"><span>' + SECS[i] + '초</span><div class="progress"><span style="width:' + Math.round(100 * x.wpm / mx) + '%"></span></div><b>' + x.wpm + " wpm</b><span class=\"small muted\">핵심 표현 " + x.used + "개</span></div>";
      }).join("") + "</div>";
    }
    if (r >= 3) {
      var last = st.res[2], used = usedExprs(last.txt);
      h += '<div class="blk l-biz" style="margin-top:16px"><div class="lbl">비교: 전체 영어 번역</div><div class="txt">' + (a.translation || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div></div>";
      h += '<div class="small muted">마지막 라운드에서 쓴 핵심 표현: ' + (used.length ? esc(used.join(", ")) : "없음 — 다음엔 ③에서 익힌 표현을 2~3개 넣어 보세요") + "</div>";
      h += '<div class="row" style="margin-top:14px"><button type="button" class="btn primary" data-trrestart="1">다시 세 라운드</button></div>';
    }
    return h + "</div>";
  }
  function usedExprs(txt) {
    var t = " " + norm(txt).join(" ") + " ";
    return exprs(st.art).map(function (e) { return String(e[2]).split(/\s*\/\s*/)[0]; }).filter(function (p) {
      var k = norm(p.replace(/\(.*?\)/g, " ")).filter(function (w) { return w.length > 2; });
      return k.length && t.indexOf(" " + k.join(" ") + " ") >= 0;
    });
  }

  /* ---------- 음성 인식 (Chrome·Edge·Safari 지원 시) ---------- */
  function recSupported() { return !!(root.SpeechRecognition || root.webkitSpeechRecognition); }
  function startRec(ta, btn) {
    var R = root.SpeechRecognition || root.webkitSpeechRecognition;
    if (!R || !ta) return;
    if (st.rec) { try { st.rec.stop(); } catch (e) {} return; }
    var rec = new R(), base = ta.value ? ta.value.trim() + " " : "", fin = "";
    rec.lang = "en-US"; rec.interimResults = true; rec.continuous = true;
    rec.onresult = function (ev) {
      var interim = "", i;
      for (i = ev.resultIndex; i < ev.results.length; i++) { if (ev.results[i].isFinal) fin += ev.results[i][0].transcript + " "; else interim += ev.results[i][0].transcript; }
      ta.value = base + fin + interim;
    };
    rec.onend = function () { st.rec = null; if (btn) { btn.textContent = "🎙 말하기"; btn.classList.remove("primary"); } };
    rec.onerror = function () {};
    try { rec.start(); st.rec = rec; if (btn) { btn.textContent = "■ 멈추기"; btn.classList.add("primary"); } } catch (e) { st.rec = null; }
  }
  function stopRec() { if (st.rec) { try { st.rec.stop(); } catch (e) {} } }

  /* ---------- 요약 말하기 타이머 ---------- */
  function stopTimer() { if (st.timer) { clearInterval(st.timer); st.timer = null; } stopRec(); }
  function startRound(rerender) {
    st.left = SECS[st.round];
    var ta = document.getElementById("trSum");
    if (ta) ta.value = "";
    st.timer = setInterval(function () {
      st.left--; var el = document.getElementById("trTimer"); if (el) el.textContent = st.left;
      if (st.left <= 0) endRound(rerender);
    }, 1000);
    var go = document.querySelector("[data-trgo]"); if (go) go.textContent = "라운드 끝내기";
    if (recSupported()) startRec(ta, null);
    if (ta) ta.focus();
  }
  function endRound(rerender) {
    var ta = document.getElementById("trSum"), txt = ta ? ta.value : "";
    var used = Math.max(5, SECS[st.round] - Math.max(0, st.left));
    stopTimer();
    var words = String(txt).trim().split(/\s+/).filter(Boolean).length, wpm = Math.round(words / used * 60);
    st.res.push({ wpm: wpm, txt: txt, used: usedExprs(txt).length });
    st.round++;
    if (st.round >= 3) record("sum", 0, Math.min(100, wpm), { wpm: wpm });
    rerender();
  }

  /* ---------- 이벤트 ---------- */
  function onClick(e, rerender) {
    var t = e.target.closest("button"); if (!t || !e.target.closest(".train-page")) return false;
    var d = t.dataset;
    if (d.trtab) { stopTimer(); st.tab = d.trtab; st.i = 0; st.last = null; st.plays = 0; st.round = 0; st.res = []; rerender(); return true; }
    if (d.trcheck || d.trskip) {
      stopRec();
      var kind = d.trcheck || d.trskip, skip = !!d.trskip, L, c, v;
      if (kind === "expr") {
        var ex = exprs(st.art)[st.i]; v = skip ? "" : (document.getElementById("trExpr").value || "").trim();
        if (!skip && !v) return true;
        var m = root.Study && v ? root.Study.matchAnswer(v, ex[2].replace(/\(.*?\)/g, "").replace(/\s+/g, " ")) : { ok: false };
        st.last = { ok: !!m.ok, user: v }; record("expr", ex[0], m.ok ? 100 : 0);
      } else {
        L = sentences(st.art); c = L[st.i];
        v = skip ? "" : (document.getElementById(kind === "trans" ? "trAns" : "trDict").value || "").trim();
        if (!skip && !v) return true;
        var r = skip ? { score: 0, html: esc(c.answer), extra: [] } : compare(v, c.answer);
        if (kind === "trans" && c.ultra && !skip) { var r2 = compare(v, c.ultra); if (r2.score > r.score) r.score = r2.score; }
        r.user = v; st.last = r; record(kind, c.no, r.score, kind === "dict" ? { plays: st.plays } : null);
      }
      rerender(); return true;
    }
    if (d.trnext) { st.i++; st.last = null; st.plays = 0; rerender(); return true; }
    if (d.trretry) { st.last = null; rerender(); return true; }
    if (d.trrestart) { stopTimer(); st.i = 0; st.last = null; st.round = 0; st.res = []; rerender(); return true; }
    if (d.trhint) {
      var ans = st.tab === "expr" ? exprs(st.art)[st.i][2] : sentences(st.art)[st.i].answer;
      var hEl = document.getElementById("trHint"); if (hEl) hEl.textContent = "힌트: " + hint(ans); return true;
    }
    if (d.trplay) {
      st.plays++; var pe = document.getElementById("trPlays"); if (pe) pe.textContent = "재생 " + st.plays + "회";
      var ok = root.Study && root.Study.speakText(root.speechSynthesis, sentences(st.art)[st.i].answer, st.rate, null);
      if (!ok && pe) pe.textContent = "이 브라우저에서는 음성 읽기를 지원하지 않아요";
      return true;
    }
    if (d.trrate) { st.rate = Number(d.trrate) === 0.8 ? 0.8 : 1; document.querySelectorAll("[data-trrate]").forEach(function (b) { b.classList.toggle("primary", b.dataset.trrate === String(st.rate)); }); return true; }
    if (d.trmic) { startRec(document.getElementById(d.trmic), t); return true; }
    if (d.trgo) { if (st.timer) endRound(rerender); else startRound(rerender); return true; }
    return false;
  }
  function onChange(e) {
    if (e.target && e.target.id === "trArticle") { root.location.hash = "#/train/" + e.target.value; return true; }
    return false;
  }
  function leave() { stopTimer(); }
  function todayCount() { var d = today(); return T.log.filter(function (e) { return e.d === d; }).length; }

  root.Train = { view: view, onClick: onClick, onChange: onChange, leave: leave, todayCount: todayCount, compare: compare, _state: st, _reset: function () { T = { log: [], best: {} }; save(); } };
})(window);
