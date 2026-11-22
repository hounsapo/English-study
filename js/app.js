/* 영어 공부방 — 정적 SPA (해시 라우팅, 빌드 없음) */
(function () {
  "use strict";
  var ARTICLES = (window.ARTICLES || []).slice().sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });
  var GRAMMAR = window.GRAMMAR || [];
  var CHUNKS = window.CHUNKS || [];
  var STORE_KEY = "englishStudy.progress.v1";
  var app = document.getElementById("app");
  var hideMeanings = false;

  /* ---------- utils ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.getFullYear() + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + String(d.getDate()).padStart(2, "0");
  }
  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  /* ---------- progress store ---------- */
  var mem = { items: {}, notes: {} };
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && p.items) mem.items = p.items;
        mem.notes = (p && p.notes && typeof p.notes === "object") ? p.notes : (mem.notes || {});
      }
    } catch (e) { /* file:// or private mode */ }
    if (!mem.items) mem.items = {};
    if (!mem.notes) mem.notes = {};
    return mem;
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(mem)); } catch (e) {} }
  function isDone(key) { return !!mem.items[key]; }
  function doneAt(key) { return mem.items[key] || null; }
  function setDone(key, v) { if (v) mem.items[key] = new Date().toISOString(); else delete mem.items[key]; save(); }
  function getNote(id) { return (mem.notes && mem.notes[id]) || ""; }
  function setNote(id, text) {
    if (!mem.notes) mem.notes = {};
    if (String(text || "").trim()) mem.notes[id] = text;
    else delete mem.notes[id];
    save();
  }
  function flushNotes() {
    if (!app) return;
    app.querySelectorAll("textarea[data-note]").forEach(function (el) {
      setNote(el.getAttribute("data-note"), el.value);
    });
  }
  load();

  function keysArticles() { return ARTICLES.map(function (a) { return "article:" + a.id; }); }
  function keysUnits() { return GRAMMAR.map(function (u) { return "grammar:" + u.id; }); }
  function keysPatterns() { var k = []; GRAMMAR.forEach(function (u) { u.patterns.forEach(function (p) { k.push("pattern:" + p.id); }); }); return k; }
  function keysChunkTypes() { return CHUNKS.map(function (t) { return "chunktype:" + t.id; }); }
  function keysChunks() { var k = []; CHUNKS.forEach(function (t) { (t.items || []).forEach(function (it) { k.push("chunk:" + it.id); }); }); return k; }
  function typeChunkDone(t) { return (t.items || []).filter(function (it) { return isDone("chunk:" + it.id); }).length; }
  function count(keys) { return keys.filter(isDone).length; }
  function stats() {
    var a = keysArticles(), u = keysUnits(), p = keysPatterns(), ct = keysChunkTypes(), c = keysChunks();
    var all = a.concat(u, p, ct, c);
    return {
      articles: { done: count(a), total: a.length },
      units: { done: count(u), total: u.length },
      patterns: { done: count(p), total: p.length },
      chunkTypes: { done: count(ct), total: ct.length },
      chunks: { done: count(c), total: c.length },
      overall: { done: count(all), total: all.length }
    };
  }

  /* ---------- components ---------- */
  function bar(done, total) { return '<div class="progress" role="progressbar" aria-valuenow="' + pct(done, total) + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + pct(done, total) + '%"></span></div>'; }
  function statBox(label, s) {
    return '<div class="card stat"><div class="label">' + esc(label) + '</div><div class="num">' + pct(s.done, s.total) + '%</div>' + bar(s.done, s.total) + '<div class="small muted">' + s.done + ' / ' + s.total + ' 완료</div></div>';
  }
  function checkbox(key, label, sm) {
    var d = isDone(key);
    return '<label class="check' + (d ? " done" : "") + (sm ? " sm" : "") + '"><input type="checkbox" data-key="' + esc(key) + '"' + (d ? " checked" : "") + '> <span>' + esc(label || "학습 완료") + '</span>' +
      (d ? ' <span class="date">' + fmtDate(doneAt(key)) + '</span>' : "") + "</label>";
  }
  function colorKey() {
    return '<div class="colorkey">' +
      '<span><i style="background:#4a5260"></i>한국어 원문</span>' +
      '<span><i style="background:#2563eb"></i>Ultra short</span>' +
      '<span><i style="background:#15803d"></i>비즈니스 간결 번역</span>' +
      '<span><i style="background:#9aa1ad"></i>번역 설명</span>' +
      '<span><i style="background:#1b1f24"></i>대체 표현</span></div>';
  }
  function studyCard(c) {
    var h = '<div class="study"><div class="tag">' + (c.no === 1 ? "제목" : "문장 " + (c.no - 1)) + "</div>";
    h += '<div class="blk l-ko"><div class="lbl">한국어 원문</div><div class="txt">' + esc(c.ko) + "</div></div>";
    h += '<div class="blk l-ultra"><div class="lbl">ULTRA SHORT</div><div class="txt">' + esc(c.ultra) + "</div></div>";
    h += '<div class="blk l-biz"><div class="lbl">비즈니스 간결 번역</div><div class="txt">' + esc(c.biz) + "</div></div>";
    h += '<div class="blk l-note"><div class="lbl">번역 설명</div><div class="txt">' + esc(c.note) + "</div></div>";
    if (c.alts && c.alts.length) {
      h += '<div class="blk l-alt"><div class="lbl">대체 표현</div><div class="chips">' + c.alts.map(function (a) { return '<span class="chip">' + esc(a) + "</span>"; }).join("") + "</div></div>";
    }
    return h + "</div>";
  }
  function outletName(a) { return String(a.outlet || "").split(" (")[0]; }

  /* ---------- views ---------- */
  function viewHome() {
    var s = stats();
    var a = ARTICLES[0];
    var nextUnit = GRAMMAR.filter(function (u) { return !isDone("grammar:" + u.id); })[0];
    var nextChunk = CHUNKS.filter(function (t) { return !isDone("chunktype:" + t.id); })[0];
    var h = '<section class="hero"><h1>오늘도 한 걸음 👋</h1><p class="lead" style="margin:0">매일 뉴스 기사 한 편으로 비즈니스 영어 번역을 연습하고, 문법 구문과 표현 덩어리를 하나씩 정복해요.</p>' +
      '<div style="margin-top:18px">' + bar(s.overall.done, s.overall.total) + '<div class="small muted" style="margin-top:6px">전체 진도 ' + pct(s.overall.done, s.overall.total) + "% · " + s.overall.done + " / " + s.overall.total + " 항목</div></div></section>";

    h += '<div class="section"><div class="section-title">📰 오늘의 학습 기사</div>';
    if (a) {
      h += '<a class="card today" href="#/articles/' + esc(a.id) + '"><div class="row"><span class="pill green">' + esc(a.dateLabel) + '</span><span class="pill">' + esc(a.field) + "</span>" +
        (isDone("article:" + a.id) ? '<span class="done-badge">✓ 학습 완료</span>' : "") + '</div><div class="t">' + esc(a.title) + '</div><div class="sum">' + esc(a.summary) + '</div><div class="small muted" style="margin-top:10px">' + esc(outletName(a)) + " · " + esc(a.published) + ' · <span style="color:var(--accent);font-weight:600">공부하러 가기 →</span></div></a>';
    } else h += '<div class="card muted">아직 등록된 기사가 없어요.</div>';
    h += "</div>";

    h += '<div class="section"><div class="section-title">📊 진도 요약</div><div class="grid-3">' +
      statBox("학습 기사", s.articles) + statBox("문법 유닛", s.units) + statBox("세부 패턴", s.patterns) +
      statBox("표현 유형", s.chunkTypes) + statBox("표현 덩어리", s.chunks) + "</div></div>";

    h += '<div class="section"><div class="section-title">🗣 표현 덩어리</div>';
    h += '<p class="lead">단어를 하나씩 붙이지 않고, 자주 쓰는 덩어리로 통째로 익혀 보세요. 유형 ' + CHUNKS.length + "개 · 표현 " + s.chunks.total + "개</p>";
    if (nextChunk) h += '<div class="grid" style="margin-bottom:14px">' + chunkTypeCard(nextChunk, "다음 추천 유형") + "</div>";
    h += '<a class="unit-card" href="#/chunks"><div class="t">여섯 유형 한눈에 보기</div><div class="s">연어, 문장 서두, 전치사 구, 이디엄, 담화 표지어, 기능적 한 덩어리</div>' +
      bar(s.chunks.done, s.chunks.total) + '<div class="small muted" style="margin-top:6px">외운 표현 ' + s.chunks.done + " / " + s.chunks.total + "</div></a></div>";

    h += '<div class="section"><div class="section-title">🚀 바로 가기</div><div class="grid">';
    if (nextUnit) h += unitCard(nextUnit, "다음 추천 유닛");
    h += '<a class="unit-card" href="#/articles"><div class="t">🗂 날짜별 기사 아카이브</div><div class="s">지금까지 쌓인 기사 ' + ARTICLES.length + "편을 최신순으로 볼 수 있어요.</div></a>";
    h += '<a class="unit-card" href="#/grammar"><div class="t">📚 문법 구문 전체</div><div class="s">접속사부터 비즈니스 연결표현까지 ' + GRAMMAR.length + "개 유닛</div></a>";
    h += '<a class="unit-card" href="#/chunks"><div class="t">🗣 표현 덩어리</div><div class="s">연어·이디엄·담화 표지어를 통째로 외우고 내 문장을 만들어 보세요.</div></a>';
    h += '<a class="unit-card" href="#/progress"><div class="t">✅ 진도 관리</div><div class="s">완료 기록 보기, 내보내기/가져오기, 초기화</div></a>';
    h += "</div></div>";
    return h;
  }

  function viewArticles() {
    var h = '<h1>오늘의 학습 기사</h1><p class="lead">매일 아침 한국·미국에서 가장 많이 본 뉴스 한 편으로 비즈니스 영어 번역을 연습하는 누적 학습 페이지입니다. 최신 기사가 맨 위에 있습니다.</p>';
    var s = stats().articles;
    h += '<div class="card" style="margin-bottom:18px"><div class="row" style="justify-content:space-between"><b>기사 학습 진도</b><span class="small muted">' + s.done + " / " + s.total + "</span></div>" + '<div style="margin-top:8px">' + bar(s.done, s.total) + "</div></div>";
    h += '<div class="section-title">🗂 날짜별 아카이브</div><div class="archive">';
    ARTICLES.forEach(function (a, i) {
      var d = isDone("article:" + a.id);
      h += '<a class="item" href="#/articles/' + esc(a.id) + '"><div class="d">' + esc(a.date) + "</div><div><div class=\"t\">" + (i === 0 ? '<span class="pill green" style="margin-right:6px">오늘의 기사</span>' : "") + esc(a.title) + '</div><div class="f">' + esc(outletName(a)) + " · " + esc(a.field) + "</div></div>" +
        '<div class="chk" title="' + (d ? "학습 완료" : "미완료") + '">' + (d ? "✅" : "⬜") + "</div></a>";
    });
    return h + "</div>";
  }

  function viewArticle(id) {
    var idx = -1;
    ARTICLES.forEach(function (a, i) { if (a.id === id) idx = i; });
    if (idx < 0) return notFound();
    var a = ARTICLES[idx], key = "article:" + a.id;
    var h = '<div class="breadcrumb"><a href="#/articles">오늘의 학습 기사</a> › ' + esc(a.date) + "</div>";
    h += '<div class="row" style="justify-content:space-between;margin-bottom:10px"><select id="dateSelect" aria-label="날짜 선택">' +
      ARTICLES.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === a.id ? " selected" : "") + ">" + esc(x.date) + " · " + esc(x.title.length > 28 ? x.title.slice(0, 28) + "…" : x.title) + "</option>"; }).join("") +
      "</select>" + checkbox(key) + "</div>";

    h += '<section class="card" id="sec-info"><div class="day-banner" style="border-top:none;padding-top:0"><span class="pill ' + (idx === 0 ? "green" : "") + '">' + (idx === 0 ? "오늘의 기사 · " : "") + esc(a.dateLabel) + '</span><h1 style="font-size:22px;margin-top:10px">' + esc(a.title) + "</h1></div>";
    h += '<dl class="props"><dt>제목</dt><dd>' + esc(a.title) + "</dd><dt>출처</dt><dd><a href=\"" + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.outlet) + "</a></dd><dt>게시일</dt><dd>" + esc(a.published) + "</dd><dt>분야</dt><dd>" + esc(a.field) + "</dd>" +
      (a.basis ? "<dt>선정 기준</dt><dd>" + esc(a.basis) + "</dd>" : "") + "</dl>";
    h += '<div class="callout"><b>핵심 내용</b>' + esc(a.summary) + "</div>";
    h += '<div class="jump" aria-label="섹션 이동"><button data-jump="sec-1">1. 제목</button><button data-jump="sec-2">2~9. 문장</button><button data-jump="sec-10">10. 번역</button><button data-jump="sec-11">11. 핵심 표현</button><button data-jump="sec-src">원문</button></div></section>';

    h += '<section class="section" id="sec-1"><div class="section-title">1. 제목 분석</div>' + colorKey() + studyCard(a.titleCard) + "</section>";
    h += '<section class="section" id="sec-2"><div class="section-title">2~9. 문장별 분석</div>' + colorKey() + a.cards.map(studyCard).join("") + "</section>";
    var tLabel = a.translationLabel || (/요약/.test((a.translation || [])[0] || "") ? "10. 전체 영어 번역본 (요약 번역)" : "10. 전체 영어 번역본");
    h += '<section class="section" id="sec-10"><div class="section-title">' + esc(tLabel) + '</div><div class="card translation">' + (a.translation || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div></section>";
    h += '<section class="section" id="sec-11"><div class="section-title">11. 핵심 표현 20개</div><div class="table-wrap"><table><thead><tr><th>번호</th><th>한국어</th><th>영어 표현</th><th>예문</th></tr></thead><tbody>' +
      (a.expressions || []).map(function (r) { return '<tr><td class="no">' + esc(r[0]) + "</td><td>" + esc(r[1]) + '</td><td class="en">' + esc(r[2]) + '</td><td class="ex">' + esc(r[3]) + "</td></tr>"; }).join("") + "</tbody></table></div></section>";
    h += '<section class="section" id="sec-src"><div class="section-title">원문 기사</div><a class="card today" href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer"><div class="small muted">' + esc(outletName(a)) + " · " + esc(a.date) + '</div><div class="t" style="font-size:17px">' + esc(a.title) + ' ↗</div></a></section>';

    h += '<div class="card row" style="justify-content:space-between;margin-top:26px"><div><b>이 기사를 다 공부했나요?</b><div class="small muted">체크하면 진도에 반영돼요.</div></div>' + checkbox(key) + "</div>";
    var newer = ARTICLES[idx - 1], older = ARTICLES[idx + 1];
    h += '<div class="pager">' + (older ? '<a class="btn" href="#/articles/' + esc(older.id) + '">← 이전 기사 (' + esc(older.date) + ")</a>" : "<span></span>") +
      (newer ? '<a class="btn" href="#/articles/' + esc(newer.id) + '">다음 기사 (' + esc(newer.date) + ") →</a>" : "<span></span>") + "</div>";
    return h;
  }

  function unitCard(u, eyebrow) {
    var key = "grammar:" + u.id, d = isDone(key);
    var pDone = u.patterns.filter(function (p) { return isDone("pattern:" + p.id); }).length;
    return '<a class="unit-card' + (d ? " done" : "") + '" href="#/grammar/' + esc(u.id) + '">' + (eyebrow ? '<div class="pill accent" style="margin-bottom:8px">' + esc(eyebrow) + "</div>" : "") +
      '<div class="row" style="justify-content:space-between"><div class="t">' + esc(u.title) + "</div>" + (d ? '<span class="done-badge">✓ 완료</span>' : "") + '</div><div class="e">' + esc(u.en) + '</div><div class="s">' + esc(u.summary) + "</div>" +
      bar(pDone, u.patterns.length) + '<div class="small muted" style="margin-top:6px">패턴 ' + pDone + " / " + u.patterns.length + "</div></a>";
  }

  function viewGrammar() {
    var s = stats();
    var h = '<h1>문법 구문 학습</h1><p class="lead">구문 형태별로 정리된 유닛이에요. 설명 → 핵심 패턴 → 예문 → 자주 하는 실수 → 셀프 체크 순서로 공부하고, 끝나면 체크하세요.</p>';
    h += '<div class="grid-3" style="margin-bottom:22px">' + statBox("완료한 유닛", s.units) + statBox("완료한 세부 패턴", s.patterns) + "</div>";
    h += '<div class="grid">' + GRAMMAR.map(function (u) { return unitCard(u); }).join("") + "</div>";
    return h;
  }

  function viewUnit(id) {
    var idx = -1;
    GRAMMAR.forEach(function (u, i) { if (u.id === id) idx = i; });
    if (idx < 0) return notFound();
    var u = GRAMMAR[idx], key = "grammar:" + u.id;
    var h = '<div class="breadcrumb"><a href="#/grammar">문법 구문</a> › ' + esc(u.title) + "</div>";
    h += '<div class="row" style="justify-content:space-between"><div><h1 style="margin-bottom:0">' + esc(u.title) + '</h1><div class="muted" style="font-family:var(--en)">' + esc(u.en) + "</div></div>" + checkbox(key, "유닛 학습 완료") + "</div>";
    h += '<p class="lead" style="margin-top:10px">' + esc(u.summary) + "</p>";
    // explanation is trusted authored HTML (allows <b>, <i>)
    h += '<section class="card explain"><h3>📖 설명</h3>' + u.explanation.map(function (p) { return "<p>" + p + "</p>"; }).join("") + "</section>";
    h += '<section class="section"><div class="section-title">🧩 핵심 패턴</div>' + u.patterns.map(function (p) {
      return '<div class="pattern"><div class="head"><div class="name">' + esc(p.name) + "</div>" + checkbox("pattern:" + p.id, "익혔어요", true) + '</div><div class="form">' + esc(p.form) + '</div><div class="desc">' + esc(p.desc) + '</div><div class="ex">→ ' + esc(p.example) + "</div></div>";
    }).join("") + "</section>";
    h += '<section class="section"><div class="section-title">💬 예문 (' + u.examples.length + ')</div><div class="card"><ol class="examples">' + u.examples.map(function (e) {
      return '<li><div class="en">' + esc(e.en) + '</div><div class="ko">' + esc(e.ko) + "</div></li>";
    }).join("") + "</ol></div></section>";
    h += '<section class="section"><div class="section-title">⚠️ 자주 하는 실수</div><div class="card">' + u.mistakes.map(function (m) {
      return '<div class="mistake"><div class="w">✗ ' + esc(m.wrong) + '</div><div class="r">✓ ' + esc(m.right) + '</div><div class="y">' + esc(m.why) + "</div></div>";
    }).join("") + "</div></section>";
    h += '<section class="section"><div class="section-title">📝 셀프 체크</div>' + u.quiz.map(function (q, i) {
      return '<div class="quiz"><div class="q">Q' + (i + 1) + ". " + esc(q.q) + '</div><details><summary>정답 보기</summary><div class="a"><b>' + esc(q.a) + "</b><br>" + esc(q.explain) + "</div></details></div>";
    }).join("") + "</section>";
    h += '<div class="card row" style="justify-content:space-between;margin-top:26px"><div><b>이 유닛을 다 공부했나요?</b><div class="small muted">체크하면 진도에 반영돼요.</div></div>' + checkbox(key, "유닛 학습 완료") + "</div>";
    var prev = GRAMMAR[idx - 1], next = GRAMMAR[idx + 1];
    h += '<div class="pager">' + (prev ? '<a class="btn" href="#/grammar/' + esc(prev.id) + '">← ' + esc(prev.title) + "</a>" : "<span></span>") + (next ? '<a class="btn" href="#/grammar/' + esc(next.id) + '">' + esc(next.title) + " →</a>" : "<span></span>") + "</div>";
    return h;
  }

  function chunkTypeCard(t, eyebrow) {
    var key = "chunktype:" + t.id, d = isDone(key);
    var n = (t.items || []).length, done = typeChunkDone(t);
    return '<a class="unit-card' + (d ? " done" : "") + '" href="#/chunks/' + esc(t.id) + '">' + (eyebrow ? '<div class="pill accent" style="margin-bottom:8px">' + esc(eyebrow) + "</div>" : "") +
      '<div class="row" style="justify-content:space-between"><div class="t">' + esc(t.title) + "</div>" + (d ? '<span class="done-badge">✓ 완료</span>' : "") + '</div><div class="e">' + esc(t.en) + '</div><div class="s">' + esc(t.summary) + "</div>" +
      bar(done, n) + '<div class="small muted" style="margin-top:6px">외운 표현 ' + done + " / " + n + "</div></a>";
  }

  function viewChunks() {
    var s = stats();
    var h = '<h1>표현 덩어리</h1><p class="lead">영어를 단어 하나씩 조합하지 않고, 덩어리(Chunk / Collocation / Idiom)로 통째로 외우면 말할 때 머뭇거림이 줄고 표현이 자연스러워집니다. 아래 여섯 유형을 하나씩 익히고, 각 표현마다 내 상황의 문장을 만들어 소리 내어 말해 보세요.</p>';
    h += '<div class="grid-3" style="margin-bottom:22px">' + statBox("완료한 유형", s.chunkTypes) + statBox("외운 표현", s.chunks) + "</div>";
    h += '<div class="grid">' + CHUNKS.map(function (t) { return chunkTypeCard(t); }).join("") + "</div>";
    h += '<section class="section"><div class="section-title">💡 덩어리 암기 학습 팁</div>';
    h += '<div class="tip"><b>나만의 표현 노트 만들기</b>단순 단어장이 아니라 동사+명사, 전치사+명사 형태의 최소 2~3단어 조합으로 기록하세요. 각 카드의 ‘내 문장 만들기’ 칸이 그 노트 역할을 합니다.</div>';
    h += '<div class="tip"><b>패턴에 내 상황 적용하기</b>예컨대 <span style="font-family:var(--en);font-weight:600">I’m looking forward to ~ing</span>라는 덩어리를 외웠다면, 바로 <span style="font-family:var(--en);font-weight:600">I’m looking forward to taking a rest this weekend.</span>처럼 자신만의 문장을 만들어 입으로 뱉어 보는 것이 중요합니다.</div>';
    h += "</section>";
    return h;
  }

  function viewChunkType(id) {
    var idx = -1;
    CHUNKS.forEach(function (t, i) { if (t.id === id) idx = i; });
    if (idx < 0) return notFound();
    var t = CHUNKS[idx], key = "chunktype:" + t.id;
    var items = t.items || [];
    var done = typeChunkDone(t);
    var h = '<div class="chunk-page' + (hideMeanings ? " hide-meanings" : "") + '">';
    h += '<div class="breadcrumb"><a href="#/chunks">표현 덩어리</a> › ' + esc(t.title) + "</div>";
    h += '<div class="row" style="justify-content:space-between"><div><h1 style="margin-bottom:0">' + esc(t.title) + '</h1><div class="muted" style="font-family:var(--en)">' + esc(t.en) + "</div></div>" + checkbox(key, "유형 학습 완료") + "</div>";
    h += '<p class="lead" style="margin-top:10px">' + esc(t.summary) + "</p>";
    h += '<section class="card explain"><h3>📖 설명</h3>' + (t.explanation || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>";
    h += '<div class="row" style="justify-content:space-between;margin:18px 0 8px;align-items:center"><div><b>표현 ' + items.length + '개</b> <span class="small muted">외웠어요 ' + done + ' / ' + items.length + '</span></div>' +
      '<button type="button" class="btn" id="btnHideMeanings" aria-pressed="' + (hideMeanings ? "true" : "false") + '">' + (hideMeanings ? "뜻 보이기" : "뜻 가리기") + "</button></div>";
    h += '<div style="margin-bottom:16px">' + bar(done, items.length) + "</div>";
    h += items.map(function (it, i) {
      var noteId = "chunk:" + it.id;
      var note = getNote(noteId);
      return '<article class="chunk-card" id="chunk-' + esc(it.id) + '"><div class="head"><div><span class="pill" style="margin-bottom:8px">' + (i + 1) + " / " + items.length + '</span><h3 class="phrase">' + esc(it.chunk) + "</h3></div>" +
        checkbox(noteId, "외웠어요", true) + "</div>" +
        '<div class="meaning chunk-meaning">' + esc(it.meaning) + "</div>" +
        '<div class="ex"><div class="ex-en">' + esc(it.exampleEn) + '</div><div class="ex-ko chunk-ex-ko">' + esc(it.exampleKo) + "</div></div>" +
        '<label class="mynote-label" for="note-' + esc(it.id) + '">내 문장 만들기</label>' +
        '<textarea class="mynote" id="note-' + esc(it.id) + '" data-note="' + esc(noteId) + '" rows="2" placeholder="이 덩어리를 써서 내 상황의 영어 문장을 쓰고, 소리 내어 말해 보세요.">' + esc(note) + "</textarea></article>";
    }).join("");
    h += '<div class="card row" style="justify-content:space-between;margin-top:26px"><div><b>이 유형을 다 공부했나요?</b><div class="small muted">체크하면 진도에 반영돼요.</div></div>' + checkbox(key, "유형 학습 완료") + "</div>";
    var prev = CHUNKS[idx - 1], next = CHUNKS[idx + 1];
    h += '<div class="pager">' + (prev ? '<a class="btn" href="#/chunks/' + esc(prev.id) + '">← ' + esc(prev.title) + "</a>" : "<span></span>") + (next ? '<a class="btn" href="#/chunks/' + esc(next.id) + '">' + esc(next.title) + " →</a>" : "<span></span>") + "</div>";
    return h + "</div>";
  }

  function viewProgress() {
    var s = stats();
    var h = '<h1>진도 관리</h1><p class="lead">체크한 기록과 ‘내 문장 만들기’ 메모는 이 브라우저에 저장돼요. 다른 기기로 옮기려면 내보낸 JSON 파일을 그 기기에서 가져오세요.</p>';
    h += '<div class="grid-3">' + statBox("전체", s.overall) + statBox("학습 기사", s.articles) + statBox("문법 유닛", s.units) + statBox("세부 패턴", s.patterns) + statBox("표현 유형", s.chunkTypes) + statBox("표현 덩어리", s.chunks) + "</div>";
    h += '<div class="card row" style="margin-top:18px"><button class="btn primary" id="btnExport">⬇ 진도 내보내기 (JSON)</button><label class="btn" for="fileImport">⬆ 진도 가져오기</label><input type="file" id="fileImport" accept="application/json,.json" hidden><button class="btn danger" id="btnReset" style="margin-left:auto">초기화</button></div>';
    h += '<div class="section"><div class="section-title">📰 기사</div><div class="table-wrap"><table><thead><tr><th>날짜</th><th>제목</th><th>완료일</th></tr></thead><tbody>' +
      ARTICLES.map(function (a) { var k = "article:" + a.id; return '<tr><td style="white-space:nowrap">' + esc(a.date) + '</td><td><a href="#/articles/' + esc(a.id) + '">' + esc(a.title) + "</a></td><td>" + (isDone(k) ? '<span class="done-badge">✓ ' + fmtDate(doneAt(k)) + "</span>" : '<span class="muted">—</span>') + "</td></tr>"; }).join("") + "</tbody></table></div></div>";
    h += '<div class="section"><div class="section-title">📚 문법 유닛</div><div class="table-wrap"><table><thead><tr><th>유닛</th><th>패턴</th><th>완료일</th></tr></thead><tbody>' +
      GRAMMAR.map(function (u) { var k = "grammar:" + u.id; var pd = u.patterns.filter(function (p) { return isDone("pattern:" + p.id); }).length; return '<tr><td><a href="#/grammar/' + esc(u.id) + '">' + esc(u.title) + '</a> <span class="muted small">' + esc(u.en) + "</span></td><td>" + pd + " / " + u.patterns.length + "</td><td>" + (isDone(k) ? '<span class="done-badge">✓ ' + fmtDate(doneAt(k)) + "</span>" : '<span class="muted">—</span>') + "</td></tr>"; }).join("") + "</tbody></table></div></div>";
    h += '<div class="section"><div class="section-title">🗣 표현 덩어리</div><div class="table-wrap"><table><thead><tr><th>유형</th><th>외운 표현</th><th>완료일</th></tr></thead><tbody>' +
      CHUNKS.map(function (t) { var k = "chunktype:" + t.id; return '<tr><td><a href="#/chunks/' + esc(t.id) + '">' + esc(t.title) + '</a> <span class="muted small">' + esc(t.en) + "</span></td><td>" + typeChunkDone(t) + " / " + (t.items || []).length + "</td><td>" + (isDone(k) ? '<span class="done-badge">✓ ' + fmtDate(doneAt(k)) + "</span>" : '<span class="muted">—</span>') + "</td></tr>"; }).join("") + "</tbody></table></div></div>";
    return h;
  }

  function notFound() { return '<div class="card"><h2>페이지를 찾을 수 없어요</h2><p><a href="#/">홈으로</a></p></div>'; }

  /* ---------- router ---------- */
  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/").filter(Boolean);
    var section = parts[0] || "home", html;
    if (section === "home") html = viewHome();
    else if (section === "articles") html = parts[1] ? viewArticle(decodeURIComponent(parts[1])) : viewArticles();
    else if (section === "grammar") html = parts[1] ? viewUnit(decodeURIComponent(parts[1])) : viewGrammar();
    else if (section === "chunks") html = parts[1] ? viewChunkType(decodeURIComponent(parts[1])) : viewChunks();
    else if (section === "progress") html = viewProgress();
    else html = notFound();
    app.innerHTML = html;
    document.querySelectorAll("[data-nav]").forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-nav") === section); });
    var titles = { home: "홈", articles: "오늘의 학습 기사", grammar: "문법 구문", chunks: "표현 덩어리", progress: "진도" };
    var pageTitle = titles[section] || "영어 공부방";
    if (section === "chunks" && parts[1]) {
      var tObj = CHUNKS.filter(function (t) { return t.id === decodeURIComponent(parts[1]); })[0];
      if (tObj) pageTitle = tObj.title;
    }
    document.title = pageTitle + " · 영어 공부방";
    if (!route._keepScroll) window.scrollTo(0, 0);
    route._keepScroll = false;
  }
  function rerender() { flushNotes(); var y = window.scrollY; route._keepScroll = true; route(); window.scrollTo(0, y); }

  /* ---------- events ---------- */
  app.addEventListener("input", function (e) {
    var t = e.target;
    if (t.matches("textarea[data-note]")) setNote(t.getAttribute("data-note"), t.value);
  });
  app.addEventListener("change", function (e) {
    var t = e.target;
    if (t.matches('input[type="checkbox"][data-key]')) {
      flushNotes();
      setDone(t.getAttribute("data-key"), t.checked);
      toast(t.checked ? "학습 완료로 표시했어요 ✓" : "완료 표시를 해제했어요");
      rerender();
    } else if (t.id === "dateSelect") {
      location.hash = "#/articles/" + t.value;
    } else if (t.id === "fileImport" && t.files && t.files[0]) {
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(reader.result);
          if (!data || typeof data.items !== "object") throw new Error("형식 오류");
          var merge = confirm("기존 진도와 합칠까요?\n[확인] 합치기  ·  [취소] 가져온 내용으로 덮어쓰기");
          var incomingNotes = (data.notes && typeof data.notes === "object") ? data.notes : {};
          if (merge) {
            mem = { items: Object.assign({}, mem.items, data.items), notes: Object.assign({}, mem.notes, incomingNotes) };
          } else {
            mem = { items: data.items, notes: incomingNotes };
          }
          save(); toast("진도를 가져왔어요"); rerender();
        } catch (err) { alert("가져오기 실패: 올바른 진도 JSON 파일이 아니에요."); }
      };
      reader.readAsText(t.files[0]);
    }
  });
  app.addEventListener("click", function (e) {
    var hideBtn = e.target.closest("#btnHideMeanings");
    if (hideBtn) {
      hideMeanings = !hideMeanings;
      var page = app.querySelector(".chunk-page");
      if (page) page.classList.toggle("hide-meanings", hideMeanings);
      hideBtn.setAttribute("aria-pressed", hideMeanings ? "true" : "false");
      hideBtn.textContent = hideMeanings ? "뜻 보이기" : "뜻 가리기";
      toast(hideMeanings ? "뜻과 해석을 가렸어요. 영어로만 떠올려 보세요." : "뜻과 해석을 다시 보여 줄게요.");
      return;
    }
    var j = e.target.closest("[data-jump]");
    if (j) { var el = document.getElementById(j.getAttribute("data-jump")); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (e.target.id === "btnExport") {
      flushNotes();
      var payload = JSON.stringify({ app: "english-study-site", version: 2, exportedAt: new Date().toISOString(), items: mem.items, notes: mem.notes || {} }, null, 2);
      var blob = new Blob([payload], { type: "application/json" });
      var url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = "english-study-progress-" + new Date().toISOString().slice(0, 10) + ".json";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast("진도 파일을 내려받았어요");
    }
    if (e.target.id === "btnReset") {
      if (confirm("모든 학습 완료 기록과 ‘내 문장 만들기’ 메모를 지울까요? 되돌릴 수 없어요.\n(먼저 내보내기로 백업해 두는 걸 추천해요)")) { mem = { items: {}, notes: {} }; save(); toast("진도를 초기화했어요"); rerender(); }
    }
  });
  window.addEventListener("hashchange", route);
  window.addEventListener("storage", function (e) { if (e.key === STORE_KEY) { load(); rerender(); } });
  route();
})();
