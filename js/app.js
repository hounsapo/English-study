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
  var mem = Study.emptyMem();
  var corpusCache = null;
  function getCorpus() {
    if (!corpusCache) corpusCache = Study.scanCorpus(ARTICLES, CHUNKS);
    return corpusCache;
  }
  function migrateExisting() {
    var rows = [];
    Object.keys(mem.items || {}).forEach(function (k) {
      if (k.indexOf("chunk:") === 0 || k.indexOf("pattern:") === 0) {
        rows.push({ key: k, iso: mem.items[k] });
      }
      if (k.indexOf("article:") === 0) {
        var art = ARTICLES.filter(function (a) { return a.id === k.slice(8); })[0];
        if (art) {
          Study.expressionKeys(art).forEach(function (ek) {
            rows.push({ key: ek, iso: mem.items[k] });
          });
        }
      }
    });
    return Study.migrateDone(mem, rows);
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) mem = Study.normalizeMem(JSON.parse(raw));
      else mem = Study.emptyMem();
    } catch (e) {
      mem = Study.emptyMem();
    }
    if (migrateExisting()) save();
    return mem;
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(mem)); } catch (e) {} }
  function isDone(key) { return !!mem.items[key]; }
  function doneAt(key) { return mem.items[key] || null; }
  function setDone(key, v) {
    if (v) {
      var already = !!mem.items[key];
      mem.items[key] = mem.items[key] || new Date().toISOString();
      if (key.indexOf("chunk:") === 0 || key.indexOf("pattern:") === 0) {
        Study.enroll(mem, key, { fromIso: mem.items[key] });
      }
      if (key.indexOf("article:") === 0) {
        var art = ARTICLES.filter(function (a) { return a.id === key.slice(8); })[0];
        if (art) {
          Study.expressionKeys(art).forEach(function (ek) {
            Study.enroll(mem, ek, { fromIso: mem.items[key] });
          });
        }
      }
      if (!already) {
        var kind = (key.indexOf("chunk:") === 0 || key.indexOf("pattern:") === 0) ? "new" : null;
        Study.markActivity(mem, kind);
      }
    } else {
      delete mem.items[key];
    }
    save();
  }
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
    h += '<div class="blk l-ko"><div class="lbl">한국어 원문</div><div class="txt">' + enBlock(c.ko) + "</div></div>";
    h += '<div class="blk l-ultra"><div class="lbl">ULTRA SHORT</div><div class="txt">' + enBlock(c.ultra) + "</div></div>";
    h += '<div class="blk l-biz"><div class="lbl">비즈니스 간결 번역</div><div class="txt">' + enBlock(c.biz) + "</div></div>";
    h += '<div class="blk l-note"><div class="lbl">번역 설명</div><div class="txt">' + esc(c.note) + "</div></div>";
    if (c.alts && c.alts.length) {
      h += '<div class="blk l-alt"><div class="lbl">대체 표현</div><div class="chips">' + c.alts.map(function (a) { return '<span class="chip">' + enBlock(a) + "</span>"; }).join("") + "</div></div>";
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

    h += goalWidget();

    h += '<div class="section"><div class="section-title">📰 오늘의 학습 기사</div>';
    if (a) {
      h += '<a class="card today" href="#/articles/' + esc(a.id) + '"><div class="row"><span class="pill green">' + esc(a.dateLabel) + '</span><span class="pill">' + esc(a.field) + "</span>" +
        (isDone("article:" + a.id) ? '<span class="done-badge">✓ 학습 완료</span>' : "") + '</div><div class="t">' + esc(a.title) + '</div><div class="sum">' + esc(a.summary) + '</div><div class="small muted" style="margin-top:10px">' + esc(outletName(a)) + " · " + esc(a.published) + ' · <span style="color:var(--accent);font-weight:600">공부하러 가기 →</span></div></a>';
      h += '<a class="card tr-cta" href="#/train/' + esc(a.id) + '"><b>✍️ 오늘의 표현 훈련</b><span class="small muted">뜻 → 영어 → 예문 빈칸 → 내 문장, 틀린 표현은 다시 · 지난 기사 복습도 섞여 나와요' + (window.Train && window.Train.todayCount() ? ' · 오늘 ' + window.Train.todayCount() + '개 풀었어요' : '') + '</span></a>';
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
    h += '<a class="unit-card" href="#/train"><div class="t">✍️ 출력 훈련</div><div class="s">오늘의 기사 핵심 표현을 뜻만 보고 영어로 떠올리기</div></a>';
    h += '<a class="unit-card" href="#/review"><div class="t">🔁 오늘의 복습</div><div class="s">간격 반복, 떠올리기, 빈칸 채우기, 따라 말하기</div></a>';
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
      "</select>" + rateToggle() + checkbox(key) + "</div>";

    h += '<section class="card" id="sec-info"><div class="day-banner" style="border-top:none;padding-top:0"><span class="pill ' + (idx === 0 ? "green" : "") + '">' + (idx === 0 ? "오늘의 기사 · " : "") + esc(a.dateLabel) + '</span><h1 style="font-size:22px;margin-top:10px">' + esc(a.title) + "</h1></div>";
    h += '<dl class="props"><dt>제목</dt><dd>' + esc(a.title) + "</dd><dt>출처</dt><dd><a href=\"" + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.outlet) + "</a></dd><dt>게시일</dt><dd>" + esc(a.published) + "</dd><dt>분야</dt><dd>" + esc(a.field) + "</dd>" +
      (a.basis ? "<dt>선정 기준</dt><dd>" + esc(a.basis) + "</dd>" : "") + "</dl>";
    h += '<div class="callout"><b>핵심 내용</b>' + esc(a.summary) + "</div>";
    h += '<div class="jump" aria-label="섹션 이동"><button data-jump="sec-1">1. 제목</button><button data-jump="sec-2">2~9. 문장</button><button data-jump="sec-10">10. 번역</button><button data-jump="sec-11">11. 핵심 표현</button><button data-jump="sec-src">원문</button></div><div class="row" style="margin-top:14px"><a class="btn primary" href="#/train/' + esc(a.id) + '">✍️ 이 기사 표현 훈련</a><span class="small muted">핵심 표현을 뜻만 보고 영어로 떠올려 보세요</span></div></section>';

    h += '<section class="section" id="sec-1"><div class="section-title">1. 제목 분석</div>' + colorKey() + studyCard(a.titleCard) + "</section>";
    h += '<section class="section" id="sec-2"><div class="section-title">2~9. 문장별 분석</div>' + colorKey() + a.cards.map(studyCard).join("") + "</section>";
    var tLabel = a.translationLabel || (/요약/.test((a.translation || [])[0] || "") ? "10. 전체 영어 번역본 (요약 번역)" : "10. 전체 영어 번역본");
    h += '<section class="section" id="sec-10"><div class="section-title">' + esc(tLabel) + '</div><div class="card translation">' + (a.translation || []).map(function (p) { return "<p>" + enBlock(p) + "</p>"; }).join("") + "</div></section>";
    h += '<section class="section" id="sec-11"><div class="section-title">11. 핵심 표현 20개</div><div class="table-wrap"><table><thead><tr><th>번호</th><th>한국어</th><th>영어 표현</th><th>예문</th></tr></thead><tbody>' +
      (a.expressions || []).map(function (r) { return '<tr><td class="no">' + esc(r[0]) + "</td><td>" + esc(r[1]) + '</td><td class="en">' + enBlock(r[2]) + '</td><td class="ex">' + enBlock(r[3]) + "</td></tr>"; }).join("") + "</tbody></table></div></section>";
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
      return '<div class="pattern"><div class="head"><div class="name">' + esc(p.name) + "</div>" + checkbox("pattern:" + p.id, "익혔어요", true) + '</div><div class="form">' + esc(p.form) + '</div><div class="desc">' + esc(p.desc) + '</div><div class="ex">→ ' + esc(p.example) + " " + speakBtn(p.example) + "</div></div>";
    }).join("") + "</section>";
    h += '<section class="section"><div class="section-title">💬 예문 (' + u.examples.length + ')</div><div class="card"><ol class="examples">' + u.examples.map(function (e) {
      return '<li><div class="en">' + esc(e.en) + " " + speakBtn(e.en) + '</div><div class="ko">' + esc(e.ko) + "</div></li>";
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


  function itemById(id) {
    var found = null;
    CHUNKS.forEach(function (t) { (t.items || []).forEach(function (it) { if (it.id === id) found = { type: t, item: it }; }); });
    return found;
  }
  function chunkHref(typeId, itemId) { return "#/chunks/" + encodeURIComponent(typeId) + "/" + encodeURIComponent(itemId); }
  function relLink(x) {
    var body = '<span class="rel-phrase">' + esc(x.phrase) + '</span><span class="rel-meaning">' + esc(x.meaning) + "</span>";
    if (x.id && x.typeId) return '<a class="rel-item is-link" href="' + esc(chunkHref(x.typeId, x.id)) + '">' + body + "</a>";
    return '<span class="rel-item">' + body + "</span>";
  }
  function relMap(it) {
    var groups = [
      { key: "similar", label: "비슷 ≈", cls: "is-similar" },
      { key: "derived", label: "파생 →", cls: "is-derived" },
      { key: "opposite", label: "반대 ↔", cls: "is-opposite" }
    ];
    var has = groups.some(function (g) { return it[g.key] && it[g.key].length; });
    if (!has) return "";
    var h = '<aside class="rel-map" aria-label="비슷한 표현, 파생 표현, 반대 표현"><div class="rel-hub">' + esc(it.emoji || "") + " " + esc(it.chunk) + '</div><div class="rel-branches">';
    groups.forEach(function (g) {
      var arr = it[g.key] || [];
      if (!arr.length) return;
      h += '<div class="rel-col ' + g.cls + '"><div class="rel-k">' + g.label + "</div>" + arr.map(relLink).join("") + "</div>";
    });
    return h + "</div></aside>";
  }
  function vizWrap(cls, label, inner) {
    return '<div class="viz ' + cls + '" role="img" aria-label="' + esc(label) + '">' + inner + "</div>";
  }
  function clusterVisual(cluster, items) {
    var kind = cluster.visual || "theme";
    var vd = cluster.visualData || {};
    var label = cluster.title + " 그림";
    if (kind === "mindmap") {
      var inner = '<div class="viz-hub">' + esc(vd.center || cluster.title) + (vd.centerKo ? '<div class="viz-ko">' + esc(vd.centerKo) + "</div>" : "") + "</div>";
      inner += '<div class="viz-spokes">' + items.map(function (it) {
        return '<span class="viz-chip">' + esc(it.emoji || "") + " " + esc(it.chunk) + "</span>";
      }).join("") + "</div>";
      return vizWrap("viz-mindmap", label, inner);
    }
    if (kind === "flow") {
      var steps = vd.steps || [];
      var inner = steps.map(function (s, i) {
        var box = '<div class="viz-step"><div class="viz-en">' + esc(s.en || s) + "</div>" + (s.ko ? '<div class="viz-ko">' + esc(s.ko) + "</div>" : "") + "</div>";
        return (i ? '<div class="viz-arrow" aria-hidden="true">→</div>' : "") + box;
      }).join("");
      return vizWrap("viz-flow", label, inner);
    }
    if (kind === "formality") {
      var arr = vd.items || [];
      var inner = '<div class="viz-scale-labels"><span class="viz-ko">일상·편한 말</span><span class="viz-ko">격식·공손한 말</span></div>';
      inner += '<div class="viz-bar" aria-hidden="true"></div><div class="viz-marks">';
      inner += arr.map(function (s) {
        var left = ((s.level - 1) / 3) * 100;
        return '<div class="viz-mark" style="left:' + left + '%"><span class="viz-en">' + esc(s.label) + '</span><span class="viz-ko">' + esc(s.ko || "") + "</span></div>";
      }).join("") + "</div>";
      return vizWrap("viz-formality", label, inner);
    }
    if (kind === "spatial") {
      var inner = (vd.preps || []).map(function (pr) {
        return '<div class="viz-prep"><div class="viz-prep-word">' + esc(pr.prep) + '</div><div class="viz-ko">' + esc(pr.ko) + '</div><div class="viz-prep-ex">' + (pr.examples || []).map(function (e) { return "<div>" + esc(e) + "</div>"; }).join("") + "</div></div>";
      }).join("");
      return vizWrap("viz-spatial", label, inner);
    }
    if (kind === "inout") {
      var col = function (title, list) {
        return '<div class="viz-io"><div class="viz-io-h">' + esc(title) + "</div>" + (list || []).map(function (s) { return '<div class="viz-chip">' + esc(s) + "</div>"; }).join("") + "</div>";
      };
      var inner = col("→ " + (vd.out || "일으키다"), vd.outItems) + '<div class="viz-arrow" aria-hidden="true">⇄</div>' + col("← " + (vd.in || "기울이다"), vd.inItems);
      return vizWrap("viz-inout", label, inner);
    }
    if (kind === "process") {
      var steps = vd.steps || items.map(function (it) { return it.chunk; });
      var inner = steps.map(function (s, i) {
        return (i ? '<div class="viz-arrow" aria-hidden="true">→</div>' : "") + '<div class="viz-step"><div class="viz-num">' + (i + 1) + '</div><div class="viz-en">' + esc(s) + "</div></div>";
      }).join("");
      return vizWrap("viz-flow viz-process", label, inner);
    }
    if (kind === "scale") {
      var inner = '<div class="viz-scale-labels"><span class="viz-en">' + esc(vd.low || "") + '</span><span class="viz-en">' + esc(vd.high || "") + '</span></div><div class="viz-bar" aria-hidden="true"></div>';
      inner += '<div class="viz-marks">' + items.map(function (it, i) {
        var left = items.length === 1 ? 50 : (i / (items.length - 1)) * 100;
        return '<div class="viz-mark" style="left:' + left + '%"><span>' + esc(it.emoji || "") + " " + esc(it.chunk) + "</span></div>";
      }).join("") + "</div>";
      return vizWrap("viz-formality viz-scale", label, inner);
    }
    if (kind === "timeline") {
      var inner = '<div class="viz-time"><div class="viz-step"><div class="viz-en">' + esc(vd.start || "") + '</div><div class="viz-ko">' + esc(vd.startKo || "") + '</div></div><div class="viz-bar" style="flex:1;margin:18px 10px 0"></div><div class="viz-step"><div class="viz-en">' + esc(vd.end || "") + '</div><div class="viz-ko">' + esc(vd.endKo || "") + "</div></div></div>";
      return vizWrap("viz-timeline", label, inner);
    }
    if (kind === "fork") {
      var inner = '<div class="viz-fork">';
      inner += '<div class="viz-step viz-from"><div class="viz-en">' + esc(vd.from || "앞말") + "</div></div>";
      inner += '<svg class="viz-fork-svg" viewBox="0 0 80 80" aria-hidden="true"><path d="M8 40 H40 M40 40 L72 16 M40 40 L72 64" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/></svg>';
      inner += '<div class="viz-fork-ends">';
      if (vd.mid) inner += '<div class="viz-step"><div class="viz-en">' + esc(vd.mid) + '</div><div class="viz-ko">' + esc(vd.midKo || "") + "</div></div>";
      inner += '<div class="viz-step"><div class="viz-en">' + esc(vd.left || "") + '</div><div class="viz-ko">' + esc(vd.leftKo || "") + "</div></div>";
      inner += '<div class="viz-step"><div class="viz-en">' + esc(vd.right || "") + '</div><div class="viz-ko">' + esc(vd.rightKo || "") + "</div></div>";
      inner += "</div></div>";
      return vizWrap("viz-fork-wrap", label, inner);
    }
    if (kind === "iceberg") {
      var svg = '<svg viewBox="0 0 260 160" class="viz-iceberg-svg" aria-hidden="true"><defs><linearGradient id="iceg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs><rect x="0" y="70" width="260" height="90" fill="#bfdbfe" opacity=".55"/><path d="M70 70 L110 18 L150 70 Z" fill="url(#iceg)" stroke="#2563eb" stroke-width="1.5"/><path d="M70 70 L40 150 L180 150 L150 70 Z" fill="#3b82f6" opacity=".45" stroke="#1d4ed8" stroke-width="1.5"/><line x1="16" y1="70" x2="244" y2="70" stroke="#1d4ed8" stroke-dasharray="4 4"/><text x="130" y="14" text-anchor="middle" font-size="11" fill="#1e3a8a">the tip</text><text x="130" y="132" text-anchor="middle" font-size="11" fill="#1e3a8a">아래가 더 크다</text></svg>';
      return vizWrap("viz-iceberg", label, svg + '<div class="viz-ko" style="text-align:center">눈에 보이는 것은 일부, 진짜 규모는 수면 아래</div>');
    }
    if (kind === "bubbles") {
      var inner = items.map(function (it) {
        return '<div class="viz-bubble"><span>' + esc(it.emoji || "") + '</span><div class="viz-en">' + esc(it.chunk) + "</div></div>";
      }).join("");
      return vizWrap("viz-bubbles", label, inner);
    }
    if (kind === "highlight" || kind === "zoom" || kind === "theme" || kind === "contrast") {
      var inner = items.map(function (it) {
        return '<span class="viz-chip">' + esc(it.emoji || "") + " " + esc(it.chunk) + "</span>";
      }).join("");
      return vizWrap("viz-theme", label, inner);
    }
    return "";
  }
  function chunkCard(it, i, total) {
    var noteId = "chunk:" + it.id;
    var note = getNote(noteId);
    return '<article class="chunk-card" id="chunk-' + esc(it.id) + '"><div class="head"><div><span class="pill" style="margin-bottom:8px">' + (i + 1) + " / " + total + '</span><h3 class="phrase"><span class="chunk-emoji" aria-hidden="true">' + esc(it.emoji || "") + "</span> " + esc(it.chunk) + " " + speakBtn(it.chunk, "표현 듣기") + "</h3></div>" +
      checkbox(noteId, "외웠어요", true) + "</div>" +
      '<div class="meaning chunk-meaning">' + esc(it.meaning) + "</div>" +
      '<div class="ex"><div class="ex-en">' + esc(it.exampleEn) + " " + speakBtn(it.exampleEn, "예문 듣기") + '</div><div class="ex-ko chunk-ex-ko">' + esc(it.exampleKo) + "</div></div>" +
      relMap(it) +
      articleHitsHtml(it.id) +
      '<label class="mynote-label" for="note-' + esc(it.id) + '">내 문장 만들기</label>' +
      '<textarea class="mynote" id="note-' + esc(it.id) + '" data-note="' + esc(noteId) + '" rows="2" placeholder="이 덩어리를 써서 내 상황의 영어 문장을 쓰고, 소리 내어 말해 보세요.">' + esc(note) + "</textarea></article>";
  }
  function compareCard(c) {
    function side(id, phrase, meaning, note) {
      var found = id ? itemById(id) : null;
      var ch = phrase, mn = meaning, em = "", href = "";
      if (found) {
        ch = found.item.chunk; mn = found.item.meaning; em = found.item.emoji || "";
        href = chunkHref(found.type.id, found.item.id);
      }
      var title = (em ? em + " " : "") + ch;
      var head = href ? '<a href="' + esc(href) + '">' + esc(title) + "</a>" : '<span class="viz-en">' + esc(title) + "</span>";
      return '<div class="compare-side">' + head + '<div class="compare-ko">' + esc(mn || "") + "</div>" + (note ? '<div class="small muted compare-ko">' + esc(note) + "</div>" : "") + "</div>";
    }
    var h = '<article class="compare-card"><div class="compare-title">' + esc(c.title) + '</div><div class="compare-pair">';
    h += side(c.leftId, c.leftPhrase, c.leftMeaning, c.leftNote);
    h += '<div class="compare-vs" aria-hidden="true">vs</div>';
    h += side(c.rightId, c.rightPhrase, c.rightMeaning, c.rightNote);
    h += '</div><p class="compare-diff">' + esc(c.diff) + "</p></article>";
    return h;
  }

  function chunkTypeCard(t, eyebrow) {
    var key = "chunktype:" + t.id, d = isDone(key);
    var n = (t.items || []).length, done = typeChunkDone(t);
    var nc = (t.clusters || []).length;
    return '<a class="unit-card' + (d ? " done" : "") + '" href="#/chunks/' + esc(t.id) + '">' + (eyebrow ? '<div class="pill accent" style="margin-bottom:8px">' + esc(eyebrow) + "</div>" : "") +
      '<div class="row" style="justify-content:space-between"><div class="t">' + esc(t.title) + "</div>" + (d ? '<span class="done-badge">✓ 완료</span>' : "") + '</div><div class="e">' + esc(t.en) + '</div><div class="s">' + esc(t.summary) + "</div>" +
      bar(done, n) + '<div class="small muted" style="margin-top:6px">묶음 ' + nc + "개 · 외운 표현 " + done + " / " + n + "</div></a>";
  }

  function viewChunks() {
    var s = stats();
    var nClusters = CHUNKS.reduce(function (n, t) { return n + (t.clusters || []).length; }, 0);
    var h = '<h1>표현 덩어리</h1><p class="lead">영어를 단어 하나씩 조합하지 않고, 덩어리(Chunk / Collocation / Idiom)로 통째로 외우면 말할 때 머뭇거림이 줄고 표현이 자연스러워집니다. 비슷한 표현끼리 묶어 두었고, 각 카드에서 비슷·반대·파생 가지로 넓혀 외울 수 있어요.</p>';
    h += '<div class="grid-3" style="margin-bottom:22px">' + statBox("완료한 유형", s.chunkTypes) + statBox("외운 표현", s.chunks) + "</div>";
    h += '<div class="grid">' + CHUNKS.map(function (t) { return chunkTypeCard(t); }).join("") + "</div>";
    h += '<section class="section"><div class="section-title">💡 덩어리 암기 학습 팁</div>';
    h += '<div class="tip"><b>비슷한 표현끼리 묶기</b>여섯 유형 안에 의미 묶음 ' + nClusters + "개가 있습니다. 묶음의 한 줄 설명과 그림을 먼저 보고, 구성원이 어떻게 다른지 비교하세요.</div>";
    h += '<div class="tip"><b>반대·파생으로 넓히기</b>각 카드 아래 초록 가지는 비슷한 말(≈), 파란 가지는 파생형(→), 빨간 가지는 반대말(↔)입니다. 사이트에 있는 표현은 눌러 바로 이동할 수 있어요.</div>';
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
    var byId = {};
    items.forEach(function (it) { byId[it.id] = it; });
    var clusters = t.clusters || [];
    var compares = t.compares || [];
    var done = typeChunkDone(t);
    var h = '<div class="chunk-page' + (hideMeanings ? " hide-meanings" : "") + '">';
    h += '<div class="breadcrumb"><a href="#/chunks">표현 덩어리</a> › ' + esc(t.title) + "</div>";
    h += '<div class="row" style="justify-content:space-between"><div><h1 style="margin-bottom:0">' + esc(t.title) + '</h1><div class="muted" style="font-family:var(--en)">' + esc(t.en) + "</div></div>" + checkbox(key, "유형 학습 완료") + "</div>";
    h += '<p class="lead" style="margin-top:10px">' + esc(t.summary) + "</p>";
    h += '<section class="card explain"><h3>📖 설명</h3>' + (t.explanation || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</section>";
    h += '<div class="row" style="justify-content:space-between;margin:18px 0 8px;align-items:center"><div><b>표현 ' + items.length + '개</b> <span class="small muted">묶음 ' + clusters.length + "개 · 외웠어요 " + done + " / " + items.length + "</span></div>" +
      '<span class="row">' + rateToggle() + '<button type="button" class="btn" id="btnHideMeanings" aria-pressed="' + (hideMeanings ? "true" : "false") + '">' + (hideMeanings ? "뜻 보이기" : "뜻 가리기") + "</button></span></div>";
    h += '<div style="margin-bottom:16px">' + bar(done, items.length) + "</div>";
    if (clusters.length) {
      h += '<div class="jump" aria-label="묶음 이동">' + clusters.map(function (c) {
        return '<button type="button" data-jump="cluster-' + esc(c.id) + '">' + esc(c.title) + "</button>";
      }).join("") + (compares.length ? '<button type="button" data-jump="sec-compare">헷갈리는 짝</button>' : "") + "</div>";
    }
    var used = {};
    var num = 0;
    if (clusters.length) {
      clusters.forEach(function (c) {
        var cItems = (c.itemIds || []).map(function (cid) { return byId[cid]; }).filter(Boolean);
        cItems.forEach(function (it) { used[it.id] = true; });
        h += '<section class="cluster" id="cluster-' + esc(c.id) + '">';
        h += '<div class="cluster-head"><h2 class="cluster-title">' + esc(c.title) + '</h2><div class="small muted">표현 ' + cItems.length + "개</div></div>";
        if (c.hook) h += '<p class="cluster-hook">' + esc(c.hook) + "</p>";
        h += clusterVisual(c, cItems);
        h += cItems.map(function (it) { num += 1; return chunkCard(it, num - 1, items.length); }).join("");
        h += "</section>";
      });
    }
    var rest = items.filter(function (it) { return !used[it.id]; });
    if (rest.length) {
      h += '<section class="cluster" id="cluster-other"><div class="cluster-head"><h2 class="cluster-title">그 밖의 표현</h2></div>';
      h += rest.map(function (it) { num += 1; return chunkCard(it, num - 1, items.length); }).join("");
      h += "</section>";
    }
    if (!clusters.length) {
      h += items.map(function (it, i) { return chunkCard(it, i, items.length); }).join("");
    }
    if (compares.length) {
      h += '<section class="section" id="sec-compare"><div class="section-title">⚖️ 헷갈리기 쉬운 짝</div>';
      h += '<p class="lead">뜻이 비슷해 보이거나 모양이 닮아 섞이기 쉬운 짝입니다. 차이를 읽고, 카드의 반대·비슷 가지와 함께 외워 보세요.</p>';
      h += compares.map(compareCard).join("");
      h += "</section>";
    }
    h += '<div class="card row" style="justify-content:space-between;margin-top:26px"><div><b>이 유형을 다 공부했나요?</b><div class="small muted">체크하면 진도에 반영돼요.</div></div>' + checkbox(key, "유형 학습 완료") + "</div>";
    var prev = CHUNKS[idx - 1], next = CHUNKS[idx + 1];
    h += '<div class="pager">' + (prev ? '<a class="btn" href="#/chunks/' + esc(prev.id) + '">← ' + esc(prev.title) + "</a>" : "<span></span>") + (next ? '<a class="btn" href="#/chunks/' + esc(next.id) + '">' + esc(next.title) + " →</a>" : "<span></span>") + "</div>";
    return h + "</div>";
  }

  function viewProgress() {
    var s = stats();
    var h = '<h1>진도 관리</h1><p class="lead">체크한 기록과 ‘내 문장 만들기’ 메모와 복습 간격은 이 브라우저에 저장돼요. 다른 기기로 옮기려면 내보낸 JSON 파일을 그 기기에서 가져오세요.</p>';
    h += '<div class="card" style="margin-bottom:18px"><div class="row" style="justify-content:space-between"><div><b>연속 학습 ' + Study.streak(mem) + "일</b><div class=\"small muted\">복습 기한 " + Study.dueKeys(mem).length + "개 · 오답 " + Object.keys(mem.misses || {}).length + "개</div></div><a class=\"btn\" href=\"#/review\">오늘의 복습</a></div>";
    h += '<div class="small muted" style="margin:12px 0 6px">최근 30일</div>' + calendarHtml(30) + "</div>";
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

  function speakBtn(text, label) {
    text = String(text || "").trim();
    if (!text) return "";
    return '<button type="button" class="speak-btn" data-speak="' + esc(text) + '" title="듣기" aria-label="' + esc(label || "영어 듣기") + '">🔊</button>';
  }
  function rateToggle() {
    var r = Study.defaultSettings(mem).speechRate;
    return '<span class="rate-toggle" role="group" aria-label="말하기 속도">' +
      '<span class="small muted">속도</span>' +
      '<button type="button" class="btn sm' + (r === 0.8 ? " primary" : "") + '" data-rate="0.8">0.8×</button>' +
      '<button type="button" class="btn sm' + (r === 1 ? " primary" : "") + '" data-rate="1">1×</button></span>';
  }
  function enHtml(text) {
    text = String(text || "");
    if (!text) return "";
    var hit = Study.looksEnglish(text) ? Study.highlight(text, getCorpus().patterns, function (typeId, id) { return chunkHref(typeId, id); }) : null;
    return hit ? hit.html : esc(text);
  }
  function enBlock(text) {
    if (!text) return esc(text);
    return enHtml(text) + (Study.looksEnglish(text) ? " " + speakBtn(text) : "");
  }
  function calendarHtml(days) {
    var cells = Study.calendar(mem, days || 30);
    var today = Study.todayStr();
    return '<div class="cal" aria-label="최근 30일 학습">' + cells.map(function (c) {
      var on = c.n > 0, isToday = c.day === today;
      var title = c.day + (c.n ? " · " + c.n + "회 학습" : " · 기록 없음");
      return '<span class="cal-d' + (on ? " on" : "") + (isToday ? " is-today" : "") + '" title="' + esc(title) + '"></span>';
    }).join("") + "</div>";
  }
  function articleHitsHtml(chunkId) {
    var hits = (getCorpus().byChunk[chunkId] || []).slice();
    if (!hits.length) return "";
    var seen = {}, uniq = [];
    hits.forEach(function (h) {
      var k = h.articleId + "::" + h.sentence;
      if (seen[k]) return;
      seen[k] = 1;
      uniq.push(h);
    });
    return '<div class="article-hits"><div class="mynote-label">기사에서 만난 문장</div>' + uniq.map(function (h) {
      var href = "#/articles/" + encodeURIComponent(h.articleId);
      return '<a class="hit-row" href="' + esc(href) + '"><span class="small muted">' + esc(h.date) + " · " + esc(h.fieldLabel) + '</span><div class="hit-en">' + enHtml(h.sentence) + "</div></a>";
    }).join("") + "</div>";
  }
  function goalWidget() {
    var s = Study.defaultSettings(mem);
    var act = Study.todayActivity(mem);
    var due = Study.dueKeys(mem).length;
    var st = Study.streak(mem);
    var misses = Object.keys(mem.misses || {}).length;
    var h = '<section class="card review-widget" id="today-review">';
    h += '<div class="row" style="justify-content:space-between;align-items:flex-start"><div><div class="section-title" style="border:0;padding:0;margin:0 0 6px">🔁 오늘의 복습</div>';
    h += '<p class="lead" style="margin:0">복습할 표현 <b>' + due + "개</b> · 연속 학습 <b>" + st + "일</b>" + (misses ? " · 오답 " + misses + "개" : "") + "</p></div>";
    h += '<a class="btn primary" href="#/review">복습하러 가기</a></div>';
    h += '<div class="goal-grid">';
    h += '<div><div class="small muted">새 표현 ' + act.news + " / " + s.newGoal + "</div>" + bar(Math.min(act.news, s.newGoal), s.newGoal) + "</div>";
    h += '<div><div class="small muted">복습 ' + act.reviews + " / " + s.reviewGoal + "</div>" + bar(Math.min(act.reviews, s.reviewGoal), s.reviewGoal) + "</div>";
    h += "</div>";
    h += '<div class="small muted" style="margin:12px 0 6px">최근 30일</div>' + calendarHtml(30);
    h += "</section>";
    return h;
  }
  function describe(key) { return Study.describeKey(key, CHUNKS, GRAMMAR, ARTICLES); }
  function buildQueue(mode) {
    var due = Study.dueKeys(mem).filter(describe);
    var s = Study.defaultSettings(mem);
    var news = [];
    if (mode !== "review-only") {
      CHUNKS.forEach(function (t) {
        (t.items || []).forEach(function (it) {
          var k = "chunk:" + it.id;
          if (!mem.srs[k] && news.length < s.newGoal) news.push(k);
        });
      });
    }
    if (mode === "cloze" || mode === "shadow") {
      due = due.filter(function (k) { var d = describe(k); return d && d.exampleEn; });
      news = news.filter(function (k) { var d = describe(k); return d && d.exampleEn; });
    }
    return due.concat(news);
  }

  var quiz = { mode: null, queue: [], index: 0, revealed: false, lastMatch: null, typed: "" };
  var shadow = { running: false, paused: false, index: 0, queue: [], timer: null, recUrl: null, media: null };

  function stopShadow() {
    shadow.paused = true;
    shadow.running = false;
    if (shadow.timer) { clearTimeout(shadow.timer); shadow.timer = null; }
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    try { if (shadow.media && shadow.media.state === "recording") shadow.media.stop(); } catch (e2) {}
  }

  function viewReview() {
    var s = Study.defaultSettings(mem);
    var act = Study.todayActivity(mem);
    var due = Study.dueKeys(mem);
    var st = Study.streak(mem);
    var missN = Object.keys(mem.misses || {}).length;
    var h = '<h1>오늘의 복습</h1><p class="lead">외운 표현을 1·3·7·21·60일 간격으로 다시 만납니다. 떠올리기나 빈칸 채우기로 스스로 채점하면, 쉬움은 간격이 길어지고 어려움은 내일 다시 나와요.</p>';
    h += '<div class="grid-3">' +
      '<div class="card stat"><div class="label">오늘 남은 복습</div><div class="num">' + due.length + '</div><div class="small muted">기한이 된 표현</div></div>' +
      '<div class="card stat"><div class="label">연속 학습일</div><div class="num">' + st + '</div><div class="small muted">하루라도 공부하면 이어집니다</div></div>' +
      '<div class="card stat"><div class="label">오답 노트</div><div class="num">' + missN + '</div><div class="small muted"><a href="#/review/misses">집중 다시 풀기</a></div></div></div>';
    h += '<div class="card" style="margin-top:16px"><div class="row" style="justify-content:space-between"><b>오늘 목표</b>' + rateToggle() + "</div>";
    h += '<div class="goal-grid" style="margin-top:12px">';
    h += '<label>새 표현 <input id="newGoal" class="goal-input" type="number" min="1" max="30" value="' + s.newGoal + '"> <span class="small muted">' + act.news + " / " + s.newGoal + " 완료</span></label>";
    h += '<label>복습 <input id="reviewGoal" class="goal-input" type="number" min="1" max="50" value="' + s.reviewGoal + '"> <span class="small muted">' + act.reviews + " / " + s.reviewGoal + " 완료</span></label>";
    h += "</div>" + '<div style="margin-top:10px">' + bar(Math.min(act.news, s.newGoal), s.newGoal) + '<div style="height:8px"></div>' + bar(Math.min(act.reviews, s.reviewGoal), s.reviewGoal) + "</div></div>";
    h += '<div class="small muted" style="margin:16px 0 6px">최근 30일 학습</div>' + calendarHtml(30);
    h += '<div class="grid" style="margin-top:22px">';
    h += '<a class="unit-card" href="#/review/recall"><div class="t">🧠 떠올리기</div><div class="s">한국어 뜻을 보고 영어 덩어리를 떠올리거나 적어 보세요. 쉬움·보통·어려움으로 다음 복습일이 달라집니다.</div></a>';
    h += '<a class="unit-card" href="#/review/cloze"><div class="t">✏️ 빈칸 채우기</div><div class="s">예문에서 덩어리가 빠진 자리를 채워 보세요. 채점은 같은 간격 반복에 반영됩니다.</div></a>';
    h += '<a class="unit-card" href="#/review/shadow"><div class="t">🎧 듣고 따라 말하기</div><div class="s">원어 발음을 듣고, 따라 말할 시간을 가진 뒤 다음 문장으로 넘어갑니다.</div></a>';
    h += '<a class="unit-card" href="#/review/misses"><div class="t">📝 오답 노트</div><div class="s">어려웠거나 틀린 표현만 모아 다시 풀어 보세요.</div></a>';
    h += "</div>";
    if (due.length) {
      h += '<div class="section"><div class="section-title">오늘 기한이 된 표현</div><div class="table-wrap"><table><thead><tr><th>표현</th><th>뜻</th><th>기한</th></tr></thead><tbody>';
      h += due.slice(0, 20).map(function (k) {
        var d = describe(k), card = mem.srs[k];
        if (!d) return "";
        return '<tr><td><a href="' + esc(d.href) + '">' + esc(d.title) + "</a></td><td>" + esc(d.promptKo) + "</td><td>" + esc(card.due) + "</td></tr>";
      }).join("") + "</tbody></table></div>" + (due.length > 20 ? '<p class="small muted">외 ' + (due.length - 20) + "개</p>" : "") + "</div>";
    }
    return h;
  }

  function ensureQuiz(mode) {
    if (quiz.mode !== mode || !quiz.queue.length) {
      quiz.mode = mode;
      quiz.queue = mode === "misses" ? Object.keys(mem.misses || {}).filter(describe) : buildQueue(mode);
      quiz.index = 0;
      quiz.revealed = false;
      quiz.lastMatch = null;
      quiz.typed = "";
    }
    if (quiz.index >= quiz.queue.length) quiz.index = quiz.queue.length;
  }
  function quizProgress() {
    return '<div class="small muted">문항 ' + Math.min(quiz.index + 1, quiz.queue.length) + " / " + quiz.queue.length + "</div>";
  }
  function gradeButtons() {
    return '<div class="row grade-row"><button type="button" class="btn danger" data-grade="hard">어려움</button><button type="button" class="btn" data-grade="good">보통</button><button type="button" class="btn primary" data-grade="easy">쉬움</button></div><p class="small muted">어려움은 내일 다시, 보통은 다음 간격, 쉬움은 간격을 더 늘립니다.</p>';
  }
  function viewRecall() {
    ensureQuiz("recall");
    if (!quiz.queue.length) return '<h1>떠올리기</h1><p class="lead">지금은 복습하거나 새로 외울 표현이 없어요. 표현 덩어리에서 ‘외웠어요’를 체크하거나, 나중에 다시 와 주세요.</p><p><a class="btn" href="#/review">복습 홈</a></p>';
    if (quiz.index >= quiz.queue.length) {
      return '<h1>떠올리기</h1><div class="card"><p>오늘의 카드를 모두 봤어요. 잘했어요!</p><p><a class="btn primary" href="#/review">복습 홈</a></p></div>';
    }
    var d = describe(quiz.queue[quiz.index]);
    var h = '<div class="breadcrumb"><a href="#/review">오늘의 복습</a> › 떠올리기</div>';
    h += '<div class="row" style="justify-content:space-between"><h1 style="margin:0">떠올리기</h1>' + rateToggle() + "</div>" + quizProgress();
    h += '<section class="card quiz-card"><div class="quiz-emoji">' + esc(d.emoji || "🗣") + '</div>';
    h += '<p class="quiz-prompt">' + esc(d.promptKo) + "</p>";
    h += '<p class="small muted">' + esc(d.typeTitle || "") + (d.kind === "pattern" ? " · 문법 패턴" : d.kind === "expr" ? " · 기사 핵심 표현" : "") + "</p>";
    if (!quiz.revealed) {
      h += '<label class="mynote-label" for="recallInput">영어로 적어 보세요 (말해 보고 정답 보기만 해도 됩니다)</label>';
      h += '<input id="recallInput" class="mynote quiz-input" type="text" autocomplete="off" value="' + esc(quiz.typed) + '" placeholder="영어 표현">';
      h += '<div class="row" style="margin-top:12px"><button type="button" class="btn primary" id="btnCheckAnswer">확인</button><button type="button" class="btn" id="btnReveal">정답 보기</button></div>';
    } else {
      var fb = quiz.lastMatch;
      if (fb && fb.closeness === "exact") h += '<div class="fb ok">정답입니다. 정확히 맞았어요.</div>';
      else if (fb && fb.ok) h += '<div class="fb close">거의 맞았어요. 정답은 <b>' + esc(d.answer) + "</b> 입니다.</div>";
      else if (fb && fb.closeness === "empty") h += '<div class="fb muted">스스로 채점해 보세요. 정답은 <b>' + esc(d.answer) + "</b> 입니다.</div>";
      else if (fb) h += '<div class="fb no">아쉬워요. 정답은 <b>' + esc(d.answer) + "</b> 입니다.</div>";
      else h += '<div class="fb muted">정답은 <b>' + esc(d.answer) + "</b> 입니다.</div>";
      h += '<div class="ex" style="margin-top:12px"><div class="ex-en">' + esc(d.exampleEn || d.answer) + " " + speakBtn(d.exampleEn || d.answer) + '</div>' + (d.exampleKo ? '<div class="ex-ko">' + esc(d.exampleKo) + "</div>" : "") + "</div>";
      h += '<p><a href="' + esc(d.href) + '">표현 카드로 가기 →</a></p>';
      h += gradeButtons();
    }
    return h + "</section>";
  }
  function viewCloze() {
    ensureQuiz("cloze");
    if (!quiz.queue.length) return '<h1>빈칸 채우기</h1><p class="lead">예문이 있는 복습 카드가 지금은 없어요.</p><p><a class="btn" href="#/review">복습 홈</a></p>';
    if (quiz.index >= quiz.queue.length) {
      return '<h1>빈칸 채우기</h1><div class="card"><p>오늘의 빈칸을 모두 채웠어요.</p><p><a class="btn primary" href="#/review">복습 홈</a></p></div>';
    }
    var d = describe(quiz.queue[quiz.index]);
    var cz = Study.clozeOf(d.exampleEn, d.answer);
    var h = '<div class="breadcrumb"><a href="#/review">오늘의 복습</a> › 빈칸 채우기</div>';
    h += '<div class="row" style="justify-content:space-between"><h1 style="margin:0">빈칸 채우기</h1>' + rateToggle() + "</div>" + quizProgress();
    h += '<section class="card quiz-card">';
    h += '<p class="cloze-sent"><span class="en">' + esc(cz.before) + '</span><span class="cloze-blank">______</span><span class="en">' + esc(cz.after) + "</span> " + speakBtn(d.exampleEn) + "</p>";
    if (d.exampleKo) h += '<p class="ex-ko">' + esc(d.exampleKo) + "</p>";
    if (!quiz.revealed) {
      h += '<label class="mynote-label" for="recallInput">빈칸에 들어갈 영어 표현</label>';
      h += '<input id="recallInput" class="mynote quiz-input" type="text" autocomplete="off" value="' + esc(quiz.typed) + '">';
      h += '<div class="row" style="margin-top:12px"><button type="button" class="btn primary" id="btnCheckAnswer">확인</button></div>';
    } else {
      var fb = quiz.lastMatch;
      if (fb && fb.ok) h += '<div class="fb ok">' + (fb.closeness === "exact" ? "정답입니다." : "거의 맞았어요.") + " <b>" + esc(cz.answer || d.answer) + "</b></div>";
      else h += '<div class="fb no">정답은 <b>' + esc(cz.answer || d.answer) + "</b> 입니다.</div>";
      h += '<p class="ex-en">' + esc(d.exampleEn) + "</p>";
      h += gradeButtons();
    }
    return h + "</section>";
  }
  function viewMisses() {
    var keys = Object.keys(mem.misses || {}).filter(describe);
    var h = '<div class="breadcrumb"><a href="#/review">오늘의 복습</a> › 오답 노트</div><h1>오답 노트</h1>';
    h += '<p class="lead">어려움으로 표시했거나, 떠올리기·빈칸에서 틀린 표현입니다. 여기서 다시 풀면 간격 반복에도 반영돼요.</p>';
    if (!keys.length) return h + '<div class="card">지금은 오답이 없어요. 복습할 때 틀린 표현이 여기 모입니다.</div>';
    h += '<p><a class="btn primary" href="#/review/recall" id="btnRetryMisses">오답으로 떠올리기</a></p>';
    h += '<div class="table-wrap"><table><thead><tr><th>표현</th><th>뜻</th><th>횟수</th><th>최근</th></tr></thead><tbody>';
    h += keys.map(function (k) {
      var d = describe(k), m = mem.misses[k];
      return '<tr><td><a href="' + esc(d.href) + '">' + esc(d.title) + "</a></td><td>" + esc(d.promptKo) + "</td><td>" + (m.count || 1) + "</td><td>" + esc(fmtDate(m.last)) + "</td></tr>";
    }).join("") + "</tbody></table></div>";
    return h;
  }
  function viewShadow() {
    var supported = Study.speechSupported(window.speechSynthesis);
    var mic = Study.micSupported();
    if (!shadow.queue.length) shadow.queue = buildQueue("shadow");
    var h = '<div class="breadcrumb"><a href="#/review">오늘의 복습</a> › 듣고 따라 말하기</div>';
    h += '<div class="row" style="justify-content:space-between"><h1 style="margin:0">듣고 따라 말하기</h1>' + rateToggle() + "</div>";
    h += '<p class="lead">영어 문장을 듣고, 잠시 멈추는 동안 따라 말한 뒤 다음 문장으로 넘어갑니다.' + (supported ? "" : " 이 브라우저는 음성 읽기를 지원하지 않아, 문장을 보고 스스로 읽어 보세요.") + "</p>";
    if (!shadow.queue.length) return h + '<div class="card">따라 말할 예문이 있는 카드가 지금은 없어요.</div>';
    var i = Math.min(shadow.index, shadow.queue.length - 1);
    var d = describe(shadow.queue[i]);
    h += '<section class="card quiz-card" id="shadowPanel">';
    h += '<div class="small muted">문장 ' + (i + 1) + " / " + shadow.queue.length + "</div>";
    h += '<p class="quiz-prompt">' + esc(d.emoji || "") + " " + esc(d.title) + " " + speakBtn(d.exampleEn || d.answer) + "</p>";
    h += '<p class="ex-en" id="shadowText">' + esc(d.exampleEn || d.answer) + "</p>";
    if (d.exampleKo) h += '<p class="ex-ko">' + esc(d.exampleKo) + "</p>";
    h += '<p class="small" id="shadowStatus">' + (shadow.running && !shadow.paused ? "재생 중이거나, 따라 말할 시간입니다." : "시작을 누르면 한 문장씩 재생됩니다.") + "</p>";
    h += '<div class="row">';
    h += '<button type="button" class="btn primary" id="btnShadowStart">' + (shadow.running && !shadow.paused ? "일시정지" : "시작") + "</button>";
    h += '<button type="button" class="btn" id="btnShadowNext">다음</button>';
    h += '<button type="button" class="btn" id="btnShadowStop">그만두기</button>';
    h += "</div>";
    if (mic) {
      h += '<div class="row" style="margin-top:12px"><button type="button" class="btn" id="btnShadowRec">내 목소리 녹음</button><button type="button" class="btn" id="btnShadowStopRec">녹음 종료</button></div>';
      h += '<audio id="shadowPlayback" controls style="margin-top:10px;width:100%"' + (shadow.recUrl ? ' src="' + esc(shadow.recUrl) + '"' : " hidden") + "></audio>";
    } else {
      h += '<p class="small muted">이 브라우저는 마이크 녹음을 지원하지 않아요. 듣기와 따라 말하기는 그대로 사용할 수 있습니다.</p>';
    }
    return h + "</section>";
  }

  function currentQuizItem() {
    var key = quiz.queue[quiz.index];
    return key ? describe(key) : null;
  }
  function revealQuiz(fromCheck) {
    var inp = document.getElementById("recallInput");
    if (inp) quiz.typed = inp.value;
    var d = currentQuizItem();
    if (!d) return;
    var expected = d.answer;
    if (quiz.mode === "cloze") {
      var cz = Study.clozeOf(d.exampleEn, d.answer);
      expected = cz.answer || d.answer;
    }
    quiz.lastMatch = Study.matchAnswer(quiz.typed, expected);
    if (fromCheck && !quiz.lastMatch.ok && String(quiz.typed || "").trim()) {
      Study.noteWrong(mem, d.key, quiz.typed);
    }
    quiz.revealed = true;
    save();
    rerender();
  }
  function applyGrade(quality) {
    var key = quiz.queue[quiz.index];
    if (!key) return;
    Study.grade(mem, key, quality);
    if (!mem.items[key] && (key.indexOf("chunk:") === 0 || key.indexOf("pattern:") === 0 || key.indexOf("expr:") === 0)) {
      mem.items[key] = new Date().toISOString();
    }
    save();
    quiz.index += 1;
    quiz.revealed = false;
    quiz.lastMatch = null;
    quiz.typed = "";
    rerender();
  }
  function refreshShadowPanel() {
    route._keepScroll = true;
    route();
  }
  function advanceShadow() {
    if (shadow.index >= shadow.queue.length - 1) {
      shadow.running = false;
      shadow.paused = true;
      refreshShadowPanel();
      var done = document.getElementById("shadowStatus");
      if (done) done.textContent = "오늘의 따라 말하기를 마쳤어요.";
      return;
    }
    shadow.index += 1;
    refreshShadowPanel();
    if (shadow.running && !shadow.paused) runShadowStep();
  }
  function runShadowStep() {
    if (!shadow.running || shadow.paused) return;
    var d = describe(shadow.queue[shadow.index]);
    if (!d) { advanceShadow(); return; }
    var text = d.exampleEn || d.answer || "";
    var rate = Study.defaultSettings(mem).speechRate;
    var times = Study.shadowPauseMs(text, rate);
    shadow.gen = (shadow.gen || 0) + 1;
    var gen = shadow.gen;
    var status = document.getElementById("shadowStatus");
    if (status) status.textContent = "듣고 있어요…";
    var spoken = Study.speakText(window.speechSynthesis, text, rate, function () {
      if (shadow.gen !== gen || shadow.paused) return;
      if (status) status.textContent = "따라 말하세요";
      shadow.timer = setTimeout(function () {
        if (shadow.gen !== gen || shadow.paused) return;
        advanceShadow();
      }, times.repeatMs);
    });
    if (!spoken) {
      if (status) status.textContent = "문장을 읽고 따라 말하세요";
      shadow.timer = setTimeout(function () {
        if (shadow.gen !== gen || shadow.paused) return;
        advanceShadow();
      }, times.speakMs + times.repeatMs);
    }
  }
  function toggleShadow() {
    if (shadow.running && !shadow.paused) {
      shadow.paused = true;
      shadow.gen = (shadow.gen || 0) + 1;
      if (shadow.timer) { clearTimeout(shadow.timer); shadow.timer = null; }
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
      var st = document.getElementById("shadowStatus");
      var btn = document.getElementById("btnShadowStart");
      if (st) st.textContent = "일시정지했어요.";
      if (btn) btn.textContent = "계속";
      return;
    }
    if (!shadow.queue.length) shadow.queue = buildQueue("shadow");
    shadow.running = true;
    shadow.paused = false;
    var btn2 = document.getElementById("btnShadowStart");
    if (btn2) btn2.textContent = "일시정지";
    runShadowStep();
  }
  function startMic() {
    if (!Study.micSupported()) { toast("이 브라우저에서는 녹음을 지원하지 않아요."); return; }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var recChunks = [];
      var media = new MediaRecorder(stream);
      shadow.media = media;
      media.ondataavailable = function (ev) { if (ev.data && ev.data.size) recChunks.push(ev.data); };
      media.onstop = function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
        if (shadow.recUrl) URL.revokeObjectURL(shadow.recUrl);
        var blob = new Blob(recChunks, { type: media.mimeType || "audio/webm" });
        shadow.recUrl = URL.createObjectURL(blob);
        var a = document.getElementById("shadowPlayback");
        if (a) { a.src = shadow.recUrl; a.hidden = false; }
      };
      media.start();
      toast("녹음을 시작했어요");
    }).catch(function () { toast("마이크 권한을 허용해 주세요."); });
  }
  function stopMic() {
    try { if (shadow.media && shadow.media.state === "recording") shadow.media.stop(); } catch (e) {}
  }

  function notFound() { return '<div class="card"><h2>페이지를 찾을 수 없어요</h2><p><a href="#/">홈으로</a></p></div>'; }

  /* ---------- router ---------- */
  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var parts = hash.split("/").filter(Boolean);
    var section = parts[0] || "home", html;
    if (section !== "review" || parts[1] !== "shadow") stopShadow();
    if (section !== "train" && window.Train) window.Train.leave();
    if (section === "home") html = viewHome();
    else if (section === "articles") html = parts[1] ? viewArticle(decodeURIComponent(parts[1])) : viewArticles();
    else if (section === "grammar") html = parts[1] ? viewUnit(decodeURIComponent(parts[1])) : viewGrammar();
    else if (section === "chunks") html = parts[1] ? viewChunkType(decodeURIComponent(parts[1])) : viewChunks();
    else if (section === "review") {
      if (parts[1] === "recall") html = viewRecall();
      else if (parts[1] === "cloze") html = viewCloze();
      else if (parts[1] === "shadow") html = viewShadow();
      else if (parts[1] === "misses") html = viewMisses();
      else html = viewReview();
    }
    else if (section === "progress") html = viewProgress();
    else if (section === "train" && window.Train) html = window.Train.view(parts.map(decodeURIComponent), ARTICLES);
    else html = notFound();
    app.innerHTML = html;
    document.querySelectorAll("[data-nav]").forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-nav") === section); });
    var titles = { home: "홈", articles: "오늘의 학습 기사", grammar: "문법 구문", chunks: "표현 덩어리", review: "오늘의 복습", progress: "진도", train: "출력 훈련" };
    var pageTitle = titles[section] || "영어 공부방";
    if (section === "review") {
      var sub = { recall: "떠올리기", cloze: "빈칸 채우기", shadow: "듣고 따라 말하기", misses: "오답 노트" };
      if (parts[1] && sub[parts[1]]) pageTitle = sub[parts[1]];
    }
    var navRev = document.querySelector('[data-nav="review"]');
    if (navRev) {
      var dueN = Study.dueKeys(mem).length;
      navRev.innerHTML = "오늘의 복습" + (dueN ? ' <span class="nav-badge">' + dueN + "</span>" : "");
    }
    if (section === "chunks" && parts[1]) {
      var tObj = CHUNKS.filter(function (t) { return t.id === decodeURIComponent(parts[1]); })[0];
      if (tObj) pageTitle = tObj.title;
    }
    document.title = pageTitle + " · 영어 공부방";
    var jumpId = (section === "chunks" && parts[2]) ? ("chunk-" + decodeURIComponent(parts[2])) : null;
    var jumpEl = jumpId ? document.getElementById(jumpId) : null;
    if (jumpEl) {
      route._keepScroll = false;
      window.setTimeout(function () { if (jumpEl.scrollIntoView) jumpEl.scrollIntoView({ behavior: "smooth", block: "start" }); jumpEl.classList.add("flash"); }, 0);
    } else if (!route._keepScroll) {
      window.scrollTo(0, 0);
    }
    route._keepScroll = false;
  }
  function rerender() { flushNotes(); var y = window.scrollY; route._keepScroll = true; route(); window.scrollTo(0, y); }

  /* ---------- events ---------- */
  app.addEventListener("input", function (e) {
    var t = e.target;
    if (t.matches("textarea[data-note]")) setNote(t.getAttribute("data-note"), t.value);
    if (t.id === "recallInput") quiz.typed = t.value;
  });
  app.addEventListener("change", function (e) {
    var t = e.target;
    if (window.Train && window.Train.onChange(e)) return;
    if (t.matches('input[type="checkbox"][data-key]')) {
      flushNotes();
      setDone(t.getAttribute("data-key"), t.checked);
      toast(t.checked ? "학습 완료로 표시했어요 ✓" : "완료 표시를 해제했어요");
      rerender();
    } else if (t.id === "dateSelect") {
      location.hash = "#/articles/" + t.value;
    } else if (t.id === "newGoal" || t.id === "reviewGoal") {
      var n = Number(t.value);
      mem.settings = Study.defaultSettings(mem);
      if (t.id === "newGoal" && n >= 1 && n <= 30) mem.settings.newGoal = Math.round(n);
      if (t.id === "reviewGoal" && n >= 1 && n <= 50) mem.settings.reviewGoal = Math.round(n);
      save();
    } else if (t.id === "fileImport" && t.files && t.files[0]) {
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(reader.result);
          if (!data || typeof data.items !== "object") throw new Error("형식 오류");
          var merge = confirm("기존 진도와 합칠까요?\n[확인] 합치기  ·  [취소] 가져온 내용으로 덮어쓰기");
          var imported = Study.migrateExport(data);
          if (merge) {
            mem.items = Object.assign({}, mem.items, imported.items);
            mem.notes = Object.assign({}, mem.notes, imported.notes);
            mem.srs = Object.assign({}, mem.srs, imported.srs);
            mem.activity = Object.assign({}, mem.activity, imported.activity);
            mem.misses = Object.assign({}, mem.misses, imported.misses);
            mem.settings = Object.assign({}, Study.defaultSettings(mem), imported.settings);
          } else {
            mem = imported;
          }
          migrateExisting();
          save(); toast("진도를 가져왔어요"); rerender();
        } catch (err) { alert("가져오기 실패: 올바른 진도 JSON 파일이 아니에요."); }
      };
      reader.readAsText(t.files[0]);
    }
  });
  app.addEventListener("keydown", function (e) {
    if (window.Train && window.Train.onKey && window.Train.onKey(e)) return;
    if (e.key === "Enter" && e.target && e.target.id === "recallInput") {
      e.preventDefault();
      var chk = document.getElementById("btnCheckAnswer");
      if (chk) chk.click();
    }
  });
  app.addEventListener("click", function (e) {
    if (window.Train && window.Train.onClick(e, rerender)) return;
    var sp = e.target.closest("[data-speak]");
    if (sp) {
      e.preventDefault();
      var ok = Study.speakText(window.speechSynthesis, sp.getAttribute("data-speak"), Study.defaultSettings(mem).speechRate, null);
      if (!ok) toast("이 브라우저에서는 음성 읽기를 지원하지 않아요.");
      return;
    }
    var rateBtn = e.target.closest("[data-rate]");
    if (rateBtn) {
      e.preventDefault();
      mem.settings = Study.defaultSettings(mem);
      mem.settings.speechRate = Number(rateBtn.getAttribute("data-rate")) === 0.8 ? 0.8 : 1;
      save();
      if (shadow.running && !shadow.paused) {
        document.querySelectorAll("[data-rate]").forEach(function (b) {
          b.classList.toggle("primary", b.getAttribute("data-rate") === String(mem.settings.speechRate));
        });
      } else {
        rerender();
      }
      return;
    }
    if (e.target.id === "btnCheckAnswer") { revealQuiz(true); return; }
    if (e.target.id === "btnReveal") { revealQuiz(false); return; }
    var g = e.target.closest("[data-grade]");
    if (g) { applyGrade(g.getAttribute("data-grade")); return; }
    if (e.target.closest("#btnRetryMisses")) {
      quiz.mode = "misses";
      quiz.queue = Object.keys(mem.misses || {}).filter(describe);
      quiz.index = 0;
      quiz.revealed = false;
      quiz.lastMatch = null;
      quiz.typed = "";
      return;
    }
    if (e.target.id === "btnShadowStart") { toggleShadow(); return; }
    if (e.target.id === "btnShadowNext") {
      shadow.gen = (shadow.gen || 0) + 1;
      if (shadow.timer) { clearTimeout(shadow.timer); shadow.timer = null; }
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (err) {}
      advanceShadow();
      return;
    }
    if (e.target.id === "btnShadowStop") { stopShadow(); shadow.index = 0; rerender(); return; }
    if (e.target.id === "btnShadowRec") { startMic(); return; }
    if (e.target.id === "btnShadowStopRec") { stopMic(); return; }
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
      var payload = JSON.stringify({
        app: "english-study-site",
        version: 3,
        exportedAt: new Date().toISOString(),
        items: mem.items,
        notes: mem.notes || {},
        srs: mem.srs || {},
        settings: Study.defaultSettings(mem),
        activity: mem.activity || {},
        misses: mem.misses || {}
      }, null, 2);
      var blob = new Blob([payload], { type: "application/json" });
      var url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = "english-study-progress-" + new Date().toISOString().slice(0, 10) + ".json";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      toast("진도 파일을 내려받았어요");
    }
    if (e.target.id === "btnReset") {
      if (confirm("모든 학습 완료 기록, 복습 간격, 오답 노트와 ‘내 문장 만들기’ 메모를 지울까요? 되돌릴 수 없어요.\n(먼저 내보내기로 백업해 두는 걸 추천해요)")) { mem = Study.emptyMem(); save(); toast("진도를 초기화했어요"); rerender(); }
    }
  });
  window.addEventListener("hashchange", route);
  window.addEventListener("storage", function (e) { if (e.key === STORE_KEY) { load(); rerender(); } });
  if (window.speechSynthesis && speechSynthesis.addEventListener) {
    speechSynthesis.addEventListener("voiceschanged", function () {});
  }
  window.__ES = {
    getMem: function () { return mem; },
    setMem: function (m) { mem = Study.normalizeMem(m); save(); },
    load: load,
    setDone: setDone,
    getCorpus: getCorpus,
    route: route,
    rerender: rerender,
    quiz: quiz,
    shadow: shadow
  };
  if (window.Train && window.Train.init) window.Train.init({ getMem: function () { return mem; }, save: save, getNote: getNote });
  route();
})();
