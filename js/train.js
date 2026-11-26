/* 출력 훈련 — 오늘의 학습 기사 핵심 표현을 한국어 뜻만 보고 영어로 떠올리는 훈련 (#/train, #/train/<articleId>)
 * 기록은 localStorage(englishStudy.train.v1)에 따로 저장합니다. 기존 진도 키(englishStudy.progress.v1)는 건드리지 않습니다.
 * app.js 의존: window.Study (matchAnswer, todayStr, addDays)
 */
(function (root) {
  "use strict";
  var KEY = "englishStudy.train.v1";
  var st = { art: null, i: 0, last: null };
  var T = load();

  function load() {
    try { var r = JSON.parse(root.localStorage.getItem(KEY) || "null"); if (r && r.log) return r; } catch (e) {}
    return { log: [], best: {} };
  }
  function save() { try { root.localStorage.setItem(KEY, JSON.stringify(T)); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function today() { return root.Study ? root.Study.todayStr() : new Date().toISOString().slice(0, 10); }
  function record(no, score) {
    T.log.push({ d: today(), a: st.art.id, k: "expr", n: no, s: score });
    if (T.log.length > 4000) T.log = T.log.slice(-4000);
    var bk = st.art.id + ":expr:" + no;
    if (T.best[bk] == null || score > T.best[bk]) T.best[bk] = score;
    save();
  }
  function exprs(a) { return (a.expressions || []).filter(function (r) { return r[2]; }); }
  function hint(en) { return String(en).split(/\s+/).map(function (w) { return w.replace(/^([^A-Za-z]*[A-Za-z])([A-Za-z'’-]*)/, function (_, a, b) { return a + b.replace(/[A-Za-z]/g, "_"); }); }).join(" "); }
  function isExpr(e) { return e.k === "expr"; }

  /* ---------- 점수판 ---------- */
  function score(a) {
    var keys = Object.keys(T.best).filter(function (k) { return k.indexOf(a.id + ":expr:") === 0; });
    var ok = keys.filter(function (k) { return T.best[k] >= 100; }).length;
    return { tried: keys.length, ok: ok, total: exprs(a).length };
  }
  function bar(n, t) { var p = t ? Math.round(100 * n / t) : 0; return '<div class="progress" role="progressbar" aria-valuenow="' + p + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + p + '%"></span></div>'; }
  function weekHtml() {
    var days = [], i, d = today();
    for (i = 6; i >= 0; i--) days.push(root.Study ? root.Study.addDays(d, -i) : d);
    var w = days.map(function (x) {
      var es = T.log.filter(function (e) { return e.d === x && isExpr(e); });
      return { d: x, n: es.length, ok: es.filter(function (e) { return e.s >= 100; }).length };
    });
    var mx = Math.max.apply(null, [5].concat(w.map(function (x) { return x.n; })));
    return '<div class="tr-week" aria-label="최근 7일 표현 훈련">' + w.map(function (x) {
      return '<div class="tr-day"><div class="tr-col"><span style="height:' + Math.round(100 * x.n / mx) + '%"></span></div><div class="tr-avg">' + (x.n ? Math.round(100 * x.ok / x.n) + "%" : "–") + '</div><div class="small muted">' + esc(x.d.slice(5).replace("-", "/")) + "</div></div>";
    }).join("") + '</div><div class="small muted" style="margin-top:6px">막대 = 하루 푼 표현 수 · 숫자 = 그날 정답률</div>';
  }

  /* ---------- 화면 ---------- */
  function view(parts, ARTICLES) {
    var a = parts[1] ? ARTICLES.filter(function (x) { return x.id === parts[1]; })[0] : ARTICLES[0];
    if (!a) return '<div class="card"><h2>훈련할 기사가 없어요</h2><p><a href="#/articles">기사 목록</a></p></div>';
    if (!st.art || st.art.id !== a.id) { st.art = a; st.i = 0; st.last = null; }
    var s = score(a), isToday = a.id === ARTICLES[0].id;
    var h = '<div class="train-page"><div class="breadcrumb"><a href="#/articles/' + esc(a.id) + '">오늘의 학습 기사</a> › 오늘의 표현</div>';
    h += '<section class="hero"><div class="row"><span class="pill green">' + (isToday ? "오늘의 기사 · " : "") + esc(a.dateLabel || a.date) + '</span><span class="pill">' + esc(a.field || "") + '</span></div>' +
      '<h1 style="font-size:22px;margin-top:10px">' + esc(a.title) + '</h1><p class="lead" style="margin:0">핵심 표현 ' + s.total + '개를 한국어 뜻만 보고 영어로 떠올려 보세요. 정답은 내가 답한 뒤에만 보입니다.</p>' +
      '<div class="row" style="margin-top:14px"><select id="trArticle" aria-label="기사 선택">' + ARTICLES.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === a.id ? " selected" : "") + ">" + esc(x.date) + " · " + esc(x.title.length > 26 ? x.title.slice(0, 26) + "…" : x.title) + "</option>"; }).join("") + "</select></div></section>";
    h += '<div class="section"><div class="section-title">📊 이 기사 표현 점수</div><div class="grid-3">' +
      '<div class="card stat"><div class="label">맞힌 표현</div><div class="num">' + s.ok + " / " + s.total + "</div>" + bar(s.ok, s.total) + '<div class="small muted">한 번이라도 맞힌 표현</div></div>' +
      '<div class="card stat"><div class="label">풀어 본 표현</div><div class="num">' + s.tried + " / " + s.total + "</div>" + bar(s.tried, s.total) + '<div class="small muted">정답 여부와 상관없이</div></div>' +
      '</div><div class="card" style="margin-top:14px">' + weekHtml() + "</div></div>";
    h += '<div id="trBody">' + exprView() + "</div></div>";
    return h;
  }

  function exprView() {
    var L = exprs(st.art);
    if (!L.length) return '<div class="card muted">이 기사에는 핵심 표현이 없어요.</div>';
    if (st.i >= L.length) {
      var s = score(st.art);
      return '<div class="card"><h2>끝까지 했어요 · ' + s.ok + " / " + s.total + ' 맞힘</h2><p class="muted">틀린 표현만 다시 떠올려 보면 오래 남습니다.</p><div class="row"><button type="button" class="btn primary" data-trrestart="1">처음부터 다시</button>' +
        '<a class="btn" href="#/articles/' + esc(st.art.id) + '">기사 분석 보기</a></div></div>';
    }
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

  /* ---------- 이벤트 ---------- */
  function onClick(e, rerender) {
    var t = e.target.closest("button"); if (!t || !e.target.closest(".train-page")) return false;
    var d = t.dataset;
    if (d.trcheck || d.trskip) {
      var ex = exprs(st.art)[st.i], skip = !!d.trskip, v = skip ? "" : (document.getElementById("trExpr").value || "").trim();
      if (!skip && !v) return true;
      var m = root.Study && v ? root.Study.matchAnswer(v, ex[2].replace(/\(.*?\)/g, "").replace(/\s+/g, " ")) : { ok: false };
      st.last = { ok: !!m.ok, user: v }; record(ex[0], m.ok ? 100 : 0);
      rerender(); return true;
    }
    if (d.trnext) { st.i++; st.last = null; rerender(); return true; }
    if (d.trrestart) { st.i = 0; st.last = null; rerender(); return true; }
    if (d.trhint) { var hEl = document.getElementById("trHint"); if (hEl) hEl.textContent = "힌트: " + hint(exprs(st.art)[st.i][2]); return true; }
    return false;
  }
  function onChange(e) {
    if (e.target && e.target.id === "trArticle") { root.location.hash = "#/train/" + e.target.value; return true; }
    return false;
  }
  function onKey(e) {
    if (e.key === "Enter" && e.target && e.target.id === "trExpr") { e.preventDefault(); var b = document.querySelector("[data-trcheck]"); if (b) b.click(); return true; }
    return false;
  }
  function leave() {}
  function todayCount() { var d = today(); return T.log.filter(function (e) { return e.d === d && isExpr(e); }).length; }

  root.Train = { view: view, onClick: onClick, onChange: onChange, onKey: onKey, leave: leave, todayCount: todayCount, _state: st };
})(window);
