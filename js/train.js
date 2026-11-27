/* 출력 훈련 · 오늘의 표현 (#/train, #/train/<articleId>)
 * 오늘 기사 핵심 표현 20개 + 지난 기사에서 틀렸거나 복습 기한이 된 표현 최대 5개를 섞어서
 *   1) 한국어 뜻 → 영어 표현 떠올리기
 *   2) 맞히면 예문 빈칸 채우기 (예문에서 표현을 찾을 수 있을 때)
 *   3) 내 업무 문장 한 줄 만들기 (진도 저장소의 notes, 키 expr:<articleId>:<n>)
 * 라운드가 끝나면 틀린 표현만 다시, 모두 맞힐 때까지 반복합니다.
 * 각 표현의 첫 시도 결과는 기존 간격 반복(오늘의 복습)에 반영합니다: 둘 다 맞힘 → good, 아니면 hard(+오답 노트).
 * 훈련 기록(점수판·7일 그래프)은 englishStudy.train.v1 에 따로 저장합니다.
 * app.js 가 Train.init({ getMem, save, getNote }) 으로 진도 저장소를 넘겨 줍니다.
 */
(function (root) {
  "use strict";
  var KEY = "englishStudy.train.v1", MIX = 5;
  var B = null; /* bridge from app.js */
  var st = { artId: null, queue: [], i: 0, stage: "meaning", last: null, retry: [], round: 1, graded: {}, arts: [] };
  var T = load();

  function load() {
    try { var r = JSON.parse(root.localStorage.getItem(KEY) || "null"); if (r && r.log) return r; } catch (e) {}
    return { log: [], best: {} };
  }
  function saveT() { try { root.localStorage.setItem(KEY, JSON.stringify(T)); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function today() { return root.Study ? root.Study.todayStr() : new Date().toISOString().slice(0, 10); }
  function mem() { return B && B.getMem ? B.getMem() : null; }
  function hint(en) { return String(en).split(/\s+/).map(function (w) { return w.replace(/^([^A-Za-z]*[A-Za-z])([A-Za-z'’-]*)/, function (_, a, b) { return a + b.replace(/[A-Za-z]/g, "_"); }); }).join(" "); }
  function plain(en) { return String(en || "").split(/\s*\/\s*/)[0].replace(/\(.*?\)/g, " ").replace(/\s+/g, " ").trim(); }
  function matches(input, expected) { return !!(root.Study && input && root.Study.matchAnswer(input, String(expected).replace(/\(.*?\)/g, "").replace(/\s+/g, " ")).ok); }

  /* ---------- 문항 만들기 ---------- */
  function itemsOf(a) {
    return (a.expressions || []).map(function (r, i) {
      return r && r[2] ? { key: "expr:" + a.id + ":" + (i + 1), art: a, n: i + 1, no: r[0], ko: r[1], en: r[2], ex: r[3] || "", past: false } : null;
    }).filter(Boolean);
  }
  function itemByKey(key) {
    var p = key.split(":"), a = st.arts.filter(function (x) { return x.id === p[1]; })[0];
    if (!a) return null;
    var it = itemsOf(a).filter(function (x) { return x.key === key; })[0];
    if (it) it.past = true;
    return it || null;
  }
  function pastMix(a) {
    var m = mem(); if (!m) return [];
    var t = today(), seen = {}, out = [];
    var miss = Object.keys(m.misses || {}).filter(function (k) { return k.indexOf("expr:") === 0; })
      .sort(function (x, y) { return (m.misses[y].count || 0) - (m.misses[x].count || 0); });
    var due = Object.keys(m.srs || {}).filter(function (k) { return k.indexOf("expr:") === 0 && m.srs[k].due <= t; })
      .sort(function (x, y) { return m.srs[x].due < m.srs[y].due ? -1 : 1; });
    miss.concat(due).forEach(function (k) {
      if (out.length >= MIX || seen[k] || k.indexOf("expr:" + a.id + ":") === 0) return;
      seen[k] = 1; var it = itemByKey(k); if (it) out.push(it);
    });
    return out;
  }
  function buildQueue(a) {
    var own = itemsOf(a), past = pastMix(a), q = own.slice(), step = past.length ? Math.max(2, Math.floor(own.length / past.length)) : 0;
    past.forEach(function (it, j) { q.splice(Math.min(q.length, (j + 1) * step + j), 0, it); });
    return q;
  }
  function reset(a) { st.artId = a.id; st.queue = buildQueue(a); st.i = 0; st.stage = "meaning"; st.last = null; st.retry = []; st.round = 1; st.graded = {}; }
  function cloze(it) {
    if (!it.ex || !root.Study) return null;
    /* 전체 표현 → 대안(A / B) → 괄호 앞뒤 조각 → 4글자 이상 단어 순으로, 예문에서 찾은 가장 긴 조각을 가림 */
    var cands = [], best = null;
    String(it.en).split(/\s*\/\s*/).forEach(function (v) {
      cands.push(v.replace(/\(.*?\)/g, " ").replace(/\s+/g, " ").trim());
      v.split(/\(.*?\)|[,;]/).forEach(function (seg) { seg = seg.trim(); if (seg) cands.push(seg); });
      v.replace(/\(.*?\)/g, " ").split(/\s+/).forEach(function (w) { if (w.replace(/[^A-Za-z]/g, "").length >= 4) cands.push(w); });
    });
    cands.forEach(function (p) {
      if (!p) return;
      var c = root.Study.clozeOf(it.ex, p);
      if (c && c.found && (!best || c.answer.length > best.answer.length)) best = c;
    });
    return best;
  }

  /* ---------- 기록 ---------- */
  function record(it, ok) {
    T.log.push({ d: today(), a: it.art.id, k: "expr", n: it.n, s: ok ? 100 : 0 });
    if (T.log.length > 4000) T.log = T.log.slice(-4000);
    var bk = it.art.id + ":expr:" + it.n;
    if (T.best[bk] == null || (ok ? 100 : 0) > T.best[bk]) T.best[bk] = ok ? 100 : 0;
    saveT();
  }
  function gradeSrs(it, ok, typed) {
    var m = mem(); if (!m || !root.Study || st.graded[it.key]) return;
    st.graded[it.key] = 1;
    if (!ok) root.Study.noteWrong(m, it.key, typed || "");
    root.Study.grade(m, it.key, ok ? "good" : "hard");
    if (!m.items[it.key]) m.items[it.key] = new Date().toISOString();
    if (B.save) B.save();
  }

  /* ---------- 점수판 ---------- */
  function score(a) {
    var keys = Object.keys(T.best).filter(function (k) { return k.indexOf(a.id + ":expr:") === 0; });
    return { tried: keys.length, ok: keys.filter(function (k) { return T.best[k] >= 100; }).length, total: itemsOf(a).length };
  }
  function bar(n, t) { var p = t ? Math.round(100 * n / t) : 0; return '<div class="progress" role="progressbar" aria-valuenow="' + p + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + p + '%"></span></div>'; }
  function weekHtml() {
    var days = [], i, d = today();
    for (i = 6; i >= 0; i--) days.push(root.Study ? root.Study.addDays(d, -i) : d);
    var w = days.map(function (x) {
      var es = T.log.filter(function (e) { return e.d === x && e.k === "expr"; });
      return { d: x, n: es.length, ok: es.filter(function (e) { return e.s >= 100; }).length };
    });
    var mx = Math.max.apply(null, [5].concat(w.map(function (x) { return x.n; })));
    return '<div class="tr-week" aria-label="최근 7일 표현 훈련">' + w.map(function (x) {
      return '<div class="tr-day"><div class="tr-col"><span style="height:' + Math.round(100 * x.n / mx) + '%"></span></div><div class="tr-avg">' + (x.n ? Math.round(100 * x.ok / x.n) + "%" : "–") + '</div><div class="small muted">' + esc(x.d.slice(5).replace("-", "/")) + "</div></div>";
    }).join("") + '</div><div class="small muted" style="margin-top:6px">막대 = 하루 푼 횟수(다시 풀기 포함) · 숫자 = 그날 정답률</div>';
  }
  function dueCount() {
    var m = mem(); if (!m) return 0; var t = today();
    return Object.keys(m.srs || {}).filter(function (k) { return k.indexOf("expr:") === 0 && m.srs[k].due <= t; }).length;
  }

  /* ---------- 화면 ---------- */
  function view(parts, ARTICLES) {
    st.arts = ARTICLES;
    var a = parts[1] ? ARTICLES.filter(function (x) { return x.id === parts[1]; })[0] : ARTICLES[0];
    if (!a) return '<div class="card"><h2>훈련할 기사가 없어요</h2><p><a href="#/articles">기사 목록</a></p></div>';
    if (st.artId !== a.id) reset(a);
    var s = score(a), isToday = a.id === ARTICLES[0].id, nPast = st.queue.filter(function (x) { return x.past; }).length;
    var h = '<div class="train-page"><div class="breadcrumb"><a href="#/articles/' + esc(a.id) + '">오늘의 학습 기사</a> › 오늘의 표현</div>';
    h += '<section class="hero"><div class="row"><span class="pill green">' + (isToday ? "오늘의 기사 · " : "") + esc(a.dateLabel || a.date) + '</span><span class="pill">' + esc(a.field || "") + '</span></div>' +
      '<h1 style="font-size:22px;margin-top:10px">' + esc(a.title) + '</h1><p class="lead" style="margin:0">핵심 표현 ' + s.total + "개" + (nPast ? " + 지난 기사 복습 " + nPast + "개" : "") +
      '를 뜻만 보고 영어로 떠올립니다. 맞히면 예문 빈칸, 그다음 내 문장 한 줄. 틀린 표현은 모두 맞힐 때까지 다시 나옵니다.</p>' +
      '<div class="row" style="margin-top:14px"><select id="trArticle" aria-label="기사 선택">' + ARTICLES.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === a.id ? " selected" : "") + ">" + esc(x.date) + " · " + esc(x.title.length > 26 ? x.title.slice(0, 26) + "…" : x.title) + "</option>"; }).join("") + "</select></div></section>";
    h += '<div class="section"><div class="section-title">📊 이 기사 표현 점수</div><div class="grid-3">' +
      '<div class="card stat"><div class="label">맞힌 표현</div><div class="num">' + s.ok + " / " + s.total + "</div>" + bar(s.ok, s.total) + '<div class="small muted">한 번이라도 맞힌 표현</div></div>' +
      '<div class="card stat"><div class="label">풀어 본 표현</div><div class="num">' + s.tried + " / " + s.total + "</div>" + bar(s.tried, s.total) + '<div class="small muted">정답 여부와 상관없이</div></div>' +
      '<div class="card stat"><div class="label">복습 기한 표현</div><div class="num">' + dueCount() + '</div><div class="small muted">결과는 <a href="#/review">오늘의 복습</a>에 이어집니다</div></div>' +
      '</div><div class="card" style="margin-top:14px">' + weekHtml() + "</div></div>";
    h += '<div id="trBody">' + body() + "</div></div>";
    return h;
  }

  function head(it) {
    return '<div class="row" style="justify-content:space-between"><div class="row"><div class="tag">' + (st.round > 1 ? "다시 풀기 · " : "") + "핵심 표현 " + esc(it.no) + "</div>" +
      (it.past ? '<span class="pill amber">지난 기사 복습 · ' + esc(it.art.date) + "</span>" : "") + '</div><span class="small muted">' + (st.i + 1) + " / " + st.queue.length + "</span></div>";
  }
  function noteBox(it) {
    var v = B && B.getNote ? B.getNote(it.key) : "";
    return '<div class="blk"><label class="lbl" for="trNote">내 문장 한 줄 · 이 표현으로 내 업무(PF·딜) 상황을 영어로</label>' +
      '<textarea class="mynote tr-input" id="trNote" data-note="' + esc(it.key) + '" rows="2" placeholder="예: ' + esc(plain(it.en)) + ' …">' + esc(v) + "</textarea>" +
      '<div class="small muted">자동 저장 · 소리 내어 한 번 읽어 보세요</div></div>';
  }
  function body() {
    if (!st.queue.length) return '<div class="card muted">이 기사에는 핵심 표현이 없어요.</div>';
    if (st.i >= st.queue.length) {
      if (st.retry.length) {
        return '<div class="card"><h2>' + (st.round > 1 ? "다시 풀기 " + (st.round - 1) + "회차 끝" : "한 바퀴 끝") + " · 틀린 표현 " + st.retry.length + "개</h2>" +
          '<p class="muted">바로 다시 떠올려야 오래 남습니다. 모두 맞힐 때까지 틀린 것만 돌립니다.</p>' +
          '<div class="chips" style="margin:10px 0">' + st.retry.map(function (it) { return '<span class="chip">' + esc(it.ko) + "</span>"; }).join("") + "</div>" +
          '<div class="row"><button type="button" class="btn primary" data-trretry="1">틀린 것만 다시 (' + st.retry.length + ")</button></div></div>";
      }
      var s = st.arts.length ? score(st.arts.filter(function (x) { return x.id === st.artId; })[0]) : { ok: 0, total: 0 };
      return '<div class="card"><h2>오늘의 표현 완료 🎉</h2><p class="muted">모든 표현을 맞혔어요' + (st.round > 1 ? " (다시 풀기 " + (st.round - 1) + "회)" : "") +
        '. 틀렸던 표현은 내일 <a href="#/review">오늘의 복습</a>에 다시 나옵니다. 이 기사 맞힌 표현 ' + s.ok + " / " + s.total + '.</p>' +
        '<div class="row"><button type="button" class="btn primary" data-trrestart="1">처음부터 다시</button><a class="btn" href="#/review">오늘의 복습</a><a class="btn" href="#/articles/' + esc(st.artId) + '">기사 분석 보기</a></div></div>';
    }
    var it = st.queue[st.i], r = st.last, cl = cloze(it), h = '<div class="study">' + head(it);
    h += '<div class="blk l-ko"><div class="lbl">한국어 뜻</div><div class="txt">' + esc(it.ko) + "</div></div>";
    if (st.stage === "meaning") {
      h += '<input id="trExpr" class="tr-input" type="text" placeholder="영어 표현" spellcheck="false" autocomplete="off" autocapitalize="off">' +
        '<div class="row" style="margin-top:10px"><button type="button" class="btn primary" data-trcheck="meaning">확인</button><button type="button" class="btn" data-trhint="1">힌트</button><button type="button" class="btn" data-trskip="meaning">모르겠어요</button></div><div class="small muted tr-hint" id="trHint"></div>';
    } else if (st.stage === "cloze") {
      h += '<div class="tr-score ok"><b>정답</b><span>' + esc(it.en) + "</span></div>";
      h += '<div class="blk l-ultra"><div class="lbl">2단계 · 예문 빈칸 채우기 (문장에 맞는 형태로)</div><div class="txt tr-cloze">' + esc(cl.before) + '<span class="tr-blank">' + "_".repeat(Math.min(18, Math.max(6, cl.answer.length))) + "</span>" + esc(cl.after) + "</div></div>" +
        '<input id="trCloze" class="tr-input" type="text" placeholder="빈칸에 들어갈 말" spellcheck="false" autocomplete="off" autocapitalize="off">' +
        '<div class="row" style="margin-top:10px"><button type="button" class="btn primary" data-trcheck="cloze">확인</button><button type="button" class="btn" data-trskip="cloze">모르겠어요</button></div>';
    } else {
      var ok = r.meaningOk && r.clozeOk !== false;
      if (ok) h += '<div class="tr-score ok"><b>정답</b><span>' + (r.clozeOk ? "뜻·예문 빈칸 모두 맞힘" : "") + "</span></div>";
      else if (r.meaningOk && r.clozeOk === false) h += '<div class="small muted" style="margin:14px 0 4px">뜻은 맞혔지만 예문 빈칸을 놓쳤어요' + (r.clozeUser ? " (내 답: " + esc(r.clozeUser) + ")" : "") + "</div>";
      else if (r.user) h += '<div class="small muted" style="margin:14px 0 4px">내 답: ' + esc(r.user) + "</div>";
      h += '<div class="blk l-biz"><div class="lbl">영어 표현</div><div class="txt">' + esc(it.en) + ' <button type="button" class="speak-btn" data-speak="' + esc(plain(it.en)) + '" aria-label="듣기">🔊</button></div></div>';
      if (it.ex) h += '<div class="blk l-ultra"><div class="lbl">예문</div><div class="txt">' + esc(it.ex) + ' <button type="button" class="speak-btn" data-speak="' + esc(it.ex) + '" aria-label="예문 듣기">🔊</button></div></div>';
      if (it.past) h += '<div class="small muted">출처: ' + esc(it.art.date) + " · " + esc(it.art.title) + "</div>";
      h += noteBox(it);
      h += '<div class="row" style="margin-top:16px"><button type="button" class="btn primary" data-trnext="1">다음 표현 →</button></div>';
    }
    return h + "</div>";
  }

  /* ---------- 진행 ---------- */
  function finishItem(it) {
    var r = st.last, ok = r.meaningOk && r.clozeOk !== false;
    gradeSrs(it, ok, r.meaningOk ? r.clozeUser : r.user);
    if (!ok) st.retry.push(it);
    st.stage = "result";
  }
  function onClick(e, rerender) {
    var t = e.target.closest("button"); if (!t || !e.target.closest(".train-page")) return false;
    var d = t.dataset, it = st.queue[st.i];
    if (d.trcheck === "meaning" || d.trskip === "meaning") {
      var v = d.trskip ? "" : (document.getElementById("trExpr").value || "").trim();
      if (!d.trskip && !v) return true;
      var ok = matches(v, it.en);
      st.last = { meaningOk: ok, user: v, clozeOk: null };
      record(it, ok);
      if (ok && cloze(it)) st.stage = "cloze"; else finishItem(it);
      rerender(); return true;
    }
    if (d.trcheck === "cloze" || d.trskip === "cloze") {
      var c = cloze(it), w = d.trskip ? "" : (document.getElementById("trCloze").value || "").trim();
      if (!d.trskip && !w) return true;
      st.last.clozeOk = !!w && (matches(w, c.answer) || matches(w, plain(it.en)));
      st.last.clozeUser = w;
      finishItem(it); rerender(); return true;
    }
    if (d.trnext) { st.i++; st.stage = "meaning"; st.last = null; rerender(); return true; }
    if (d.trretry) {
      var seen = {};
      st.queue = st.retry.filter(function (x) { if (seen[x.key]) return false; seen[x.key] = 1; return true; });
      st.retry = []; st.i = 0; st.stage = "meaning"; st.last = null; st.round++; rerender(); return true;
    }
    if (d.trrestart) { var a = st.arts.filter(function (x) { return x.id === st.artId; })[0]; if (a) reset(a); rerender(); return true; }
    if (d.trhint) { var hEl = document.getElementById("trHint"); if (hEl) hEl.textContent = "힌트: " + hint(plain(it.en)); return true; }
    return false;
  }
  function onChange(e) {
    if (e.target && e.target.id === "trArticle") { root.location.hash = "#/train/" + e.target.value; return true; }
    return false;
  }
  function onKey(e) {
    if (e.key !== "Enter" || !e.target) return false;
    var id = e.target.id, sel = id === "trExpr" ? '[data-trcheck="meaning"]' : id === "trCloze" ? '[data-trcheck="cloze"]' : null;
    if (!sel) return false;
    e.preventDefault(); var b = document.querySelector(sel); if (b) b.click(); return true;
  }
  function init(bridge) { B = bridge; }
  function leave() {}
  function todayCount() { var d = today(); return T.log.filter(function (e) { return e.d === d && e.k === "expr"; }).length; }

  root.Train = { init: init, view: view, onClick: onClick, onChange: onChange, onKey: onKey, leave: leave, todayCount: todayCount, _state: st, _cloze: cloze };
})(window);
