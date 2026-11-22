/* 영어 공부방 — 간격 반복 · 채점 · 기사 연결 · 발음 유틸 (DOM 없음) */
(function (root) {
  "use strict";
  var INTERVALS = [1, 3, 7, 21, 60];
  var nowOverride = null;

  function now() { return nowOverride ? new Date(nowOverride.getTime()) : new Date(); }
  function setNow(d) { nowOverride = d == null ? null : new Date(d); }

  function pad(n) { return String(n).padStart(2, "0"); }
  function todayStr(d) {
    d = d || now();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function parseDay(s) {
    var p = String(s || "").split("-");
    if (p.length !== 3) return null;
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return isNaN(d) ? null : d;
  }
  function addDays(dateStr, n) {
    var d = parseDay(dateStr) || now();
    d.setDate(d.getDate() + n);
    return todayStr(d);
  }
  function cmpDay(a, b) { return String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0; }

  function emptyMem() {
    return {
      items: {},
      notes: {},
      srs: {},
      settings: { newGoal: 5, reviewGoal: 10, speechRate: 1 },
      activity: {},
      misses: {}
    };
  }
  function normalizeMem(raw) {
    var m = emptyMem();
    if (!raw || typeof raw !== "object") return m;
    if (raw.items && typeof raw.items === "object") m.items = raw.items;
    if (raw.notes && typeof raw.notes === "object") m.notes = raw.notes;
    if (raw.srs && typeof raw.srs === "object") m.srs = raw.srs;
    if (raw.settings && typeof raw.settings === "object") {
      var g = Number(raw.settings.newGoal);
      var r = Number(raw.settings.reviewGoal);
      var s = Number(raw.settings.speechRate);
      if (g >= 1 && g <= 30) m.settings.newGoal = Math.round(g);
      if (r >= 1 && r <= 50) m.settings.reviewGoal = Math.round(r);
      if (s === 0.8 || s === 1 || s === 1.0) m.settings.speechRate = s === 1.0 ? 1 : s;
    }
    if (raw.activity && typeof raw.activity === "object") m.activity = raw.activity;
    if (raw.misses && typeof raw.misses === "object") m.misses = raw.misses;
    return m;
  }
  function migrateExport(data) {
    /* v1/v2: items + notes. v3+: srs, settings, activity, misses */
    return normalizeMem(data || {});
  }

  function defaultSettings(mem) {
    if (!mem.settings) mem.settings = { newGoal: 5, reviewGoal: 10, speechRate: 1 };
    if (!mem.settings.newGoal) mem.settings.newGoal = 5;
    if (!mem.settings.reviewGoal) mem.settings.reviewGoal = 10;
    if (!mem.settings.speechRate) mem.settings.speechRate = 1;
    return mem.settings;
  }

  function markActivity(mem, kind) {
    var day = todayStr();
    if (!mem.activity[day] || typeof mem.activity[day] !== "object") mem.activity[day] = { n: 0, reviews: 0, news: 0 };
    var a = mem.activity[day];
    a.n = (a.n || 0) + 1;
    if (kind === "review") a.reviews = (a.reviews || 0) + 1;
    else if (kind === "new") a.news = (a.news || 0) + 1;
    return a;
  }
  function todayActivity(mem) {
    var a = mem.activity[todayStr()];
    return a && typeof a === "object" ? a : { n: 0, reviews: 0, news: 0 };
  }
  function streak(mem) {
    var start = todayStr();
    if (!mem.activity[start] || !mem.activity[start].n) start = addDays(start, -1);
    var n = 0, d = start;
    while (mem.activity[d] && mem.activity[d].n > 0) {
      n += 1;
      d = addDays(d, -1);
    }
    return n;
  }
  function calendar(mem, days) {
    days = days || 30;
    var out = [], d = todayStr();
    for (var i = days - 1; i >= 0; i--) {
      var day = addDays(d, -i);
      var a = mem.activity[day];
      out.push({ day: day, n: a && a.n ? a.n : 0 });
    }
    return out;
  }

  /* ---------- text matching ---------- */
  function unify(s) {
    return String(s == null ? "" : s)
      .replace(/[’‘‛`]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/\u2026/g, "...");
  }
  function normAns(s) {
    return unify(s)
      .toLowerCase()
      .replace(/[.,!?…:;~]/g, " ")
      .replace(/[-/]/g, " ")
      .replace(/\s+/g, " ")
      .replace(/^(a|an|the)\s+/, "")
      .trim();
  }
  function escapeRe(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function looksEnglish(s) {
    s = String(s || "");
    var letters = (s.match(/[A-Za-z]/g) || []).length;
    return letters >= 6 && letters >= s.replace(/\s/g, "").length * 0.35;
  }
  var VERB_FORMS = {
    make: ["make", "makes", "made", "making"],
    take: ["take", "takes", "took", "taken", "taking"],
    have: ["have", "has", "had", "having"],
    do: ["do", "does", "did", "doing"],
    play: ["play", "plays", "played", "playing"],
    meet: ["meet", "meets", "met", "meeting"],
    cut: ["cut", "cuts", "cutting"],
    raise: ["raise", "raises", "raised", "raising"],
    pay: ["pay", "pays", "paid", "paying"],
    keep: ["keep", "keeps", "kept", "keeping"],
    draw: ["draw", "draws", "drew", "drawn", "drawing"],
    set: ["set", "sets", "setting"],
    issue: ["issue", "issues", "issued", "issuing"],
    conduct: ["conduct", "conducts", "conducted", "conducting"],
    reach: ["reach", "reaches", "reached", "reaching"],
    face: ["face", "faces", "faced", "facing"],
    pose: ["pose", "poses", "posed", "posing"],
    come: ["come", "comes", "came", "coming"],
    get: ["get", "gets", "got", "getting"],
    go: ["go", "goes", "went", "gone", "going"],
    think: ["think", "thinks", "thought", "thinking"],
    keep: ["keep", "keeps", "kept", "keeping"]
  };
  function chunkPatterns(it) {
    var raw = unify((it && it.chunk) || "");
    var parts = raw.split(/\s*\/\s*/);
    var out = [], seen = {};
    parts.forEach(function (p) {
      p = p.replace(/~ing/gi, "")
        .replace(/\.{2,}|…/g, " ")
        .replace(/[?!,]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (p.length < 3) return;
      var k = p.toLowerCase();
      if (seen[k]) return;
      seen[k] = 1;
      out.push(p);
    });
    return out;
  }
  function searchPatterns(it) {
    var base = chunkPatterns(it), out = [], seen = {};
    base.forEach(function (p) {
      var words = p.split(" ");
      var first = words[0].toLowerCase();
      var forms = VERB_FORMS[first];
      var variants = forms ? forms.map(function (v) { return [v].concat(words.slice(1)).join(" "); }) : [p];
      variants.forEach(function (v) {
        var k = v.toLowerCase();
        if (seen[k]) return;
        seen[k] = 1;
        out.push(v);
      });
    });
    return out;
  }
  function levenshtein(a, b) {
    a = String(a); b = String(b);
    var m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      prev = cur;
      cur = [];
    }
    return prev[n];
  }
  function matchAnswer(input, expected) {
    var a = normAns(input);
    var variants = String(expected || "").split(/\s*\/\s*/).map(function (v) { return normAns(v); }).filter(Boolean);
    if (!a) return { ok: false, closeness: "empty", expected: expected };
    var i, v, d, maxd;
    for (i = 0; i < variants.length; i++) {
      v = variants[i];
      if (a === v) return { ok: true, closeness: "exact", expected: expected };
    }
    for (i = 0; i < variants.length; i++) {
      v = variants[i];
      if (v.indexOf(a) === 0 && a.length >= Math.max(4, Math.floor(v.length * 0.75))) {
        return { ok: true, closeness: "close", expected: expected };
      }
      if (a.indexOf(v) === 0 && v.length >= Math.max(4, Math.floor(a.length * 0.75))) {
        return { ok: true, closeness: "close", expected: expected };
      }
      maxd = v.length <= 8 ? 1 : v.length <= 16 ? 2 : Math.max(2, Math.round(v.length * 0.15));
      d = levenshtein(a, v);
      if (d <= maxd) return { ok: true, closeness: "close", expected: expected };
    }
    return { ok: false, closeness: "wrong", expected: expected };
  }

  function clozeOf(exampleEn, chunk) {
    var text = String(exampleEn || "");
    var pats = searchPatterns({ chunk: chunk }).sort(function (a, b) { return b.length - a.length; });
    var i, re, m;
    for (i = 0; i < pats.length; i++) {
      re = new RegExp(escapeRe(pats[i]), "i");
      m = text.match(re);
      if (m) {
        return {
          before: text.slice(0, m.index),
          blank: m[0],
          after: text.slice(m.index + m[0].length),
          answer: m[0],
          found: true
        };
      }
    }
    return { before: text + (text ? "  (" : ""), blank: chunk, after: text ? ")" : "", answer: pats[0] || chunk, found: false };
  }

  /* ---------- SRS ---------- */
  function enroll(mem, key, opts) {
    opts = opts || {};
    if (mem.srs[key]) return mem.srs[key];
    var day = todayStr();
    if (opts.fromIso) {
      var parsed = new Date(opts.fromIso);
      if (!isNaN(parsed.getTime())) day = todayStr(parsed);
    }
    var due = addDays(day, opts.immediate ? 0 : 1);
    if (cmpDay(due, todayStr()) < 0) due = todayStr();
    mem.srs[key] = {
      due: due,
      interval: opts.interval != null ? opts.interval : (opts.fromIso ? 1 : 0),
      ease: 2.5,
      reps: opts.reps != null ? opts.reps : (opts.fromIso ? 1 : 0),
      lapses: 0,
      last: opts.fromIso || null,
      created: opts.fromIso || now().toISOString()
    };
    return mem.srs[key];
  }

  function grade(mem, key, quality) {
    quality = quality === "easy" || quality === "hard" || quality === "good" ? quality : "good";
    var card = mem.srs[key] || enroll(mem, key, { immediate: true, reps: 0, interval: 0 });
    var today = todayStr();
    var wasNew = !card.last || (card.reps || 0) === 0;
    markActivity(mem, wasNew ? "new" : "review");
    if (quality === "hard") {
      card.lapses = (card.lapses || 0) + 1;
      card.reps = 0;
      card.interval = 1;
      card.ease = Math.max(1.3, (card.ease || 2.5) - 0.2);
      card.due = addDays(today, 1);
      mem.misses[key] = {
        count: ((mem.misses[key] && mem.misses[key].count) || 0) + 1,
        last: now().toISOString(),
        reason: "hard"
      };
    } else {
      var ease = card.ease || 2.5;
      if (quality === "easy") ease = Math.min(3.2, ease + 0.15);
      card.ease = ease;
      card.reps = (card.reps || 0) + 1;
      var next;
      if (card.reps <= INTERVALS.length) {
        var idx = card.reps - 1;
        if (quality === "easy") idx = Math.min(INTERVALS.length - 1, idx + 1);
        next = INTERVALS[idx];
      } else {
        next = Math.max(60, Math.round((card.interval || 60) * ease));
        if (quality === "easy") next = Math.round(next * 1.3);
      }
      if (next < 1) next = 1;
      card.interval = next;
      card.due = addDays(today, next);
      if (mem.misses[key]) delete mem.misses[key];
    }
    card.last = now().toISOString();
    mem.srs[key] = card;
    return card;
  }

  function noteWrong(mem, key, typed) {
    var prev = mem.misses[key] || { count: 0 };
    mem.misses[key] = {
      count: prev.count + 1,
      last: now().toISOString(),
      reason: "wrong",
      typed: typed || prev.typed || ""
    };
  }

  function dueKeys(mem, today) {
    today = today || todayStr();
    var keys = Object.keys(mem.srs || {});
    return keys.filter(function (k) { return mem.srs[k] && cmpDay(mem.srs[k].due, today) <= 0; })
      .sort(function (a, b) { return cmpDay(mem.srs[a].due, mem.srs[b].due); });
  }

  function migrateDone(mem, doneKeysWithDates) {
    /* doneKeysWithDates: [{key, iso}] */
    var added = 0;
    (doneKeysWithDates || []).forEach(function (row) {
      if (!row || !row.key) return;
      if (mem.srs[row.key]) return;
      if (!row.iso && !mem.items[row.key]) return;
      enroll(mem, row.key, { fromIso: row.iso || mem.items[row.key], reps: 1, interval: 1 });
      added += 1;
    });
    return added;
  }

  /* ---------- article ↔ chunk index ---------- */
  function buildPatternList(CHUNKS) {
    var list = [];
    (CHUNKS || []).forEach(function (t) {
      (t.items || []).forEach(function (it) {
        searchPatterns(it).forEach(function (p) {
          list.push({ typeId: t.id, item: it, pattern: p, re: new RegExp("\\b" + escapeRe(p) + "\\b", "gi") });
        });
      });
    });
    list.sort(function (a, b) { return b.pattern.length - a.pattern.length; });
    return list;
  }
  function findMatches(text, patternList) {
    text = unify(String(text || ""));
    if (!text) return [];
    var occupied = [];
    var hits = [];
    function overlaps(s, e) {
      var i;
      for (i = 0; i < occupied.length; i++) {
        if (s < occupied[i].e && e > occupied[i].s) return true;
      }
      return false;
    }
    patternList.forEach(function (row) {
      row.re.lastIndex = 0;
      var m;
      var re = new RegExp(row.re.source, "gi");
      while ((m = re.exec(text))) {
        var s = m.index, e = s + m[0].length;
        if (overlaps(s, e)) continue;
        occupied.push({ s: s, e: e });
        hits.push({ start: s, end: e, text: m[0], typeId: row.typeId, item: row.item, pattern: row.pattern });
        if (re.lastIndex === m.index) re.lastIndex++;
      }
    });
    hits.sort(function (a, b) { return a.start - b.start; });
    return hits;
  }
  function articleFields(article) {
    var fields = [];
    function add(fid, label, text) {
      if (text && looksEnglish(text)) fields.push({ id: fid, label: label, text: String(text) });
    }
    var tc = article.titleCard || {};
    add("title-ultra", "제목 Ultra short", tc.ultra);
    add("title-biz", "제목 비즈니스 번역", tc.biz);
    add("title-ko", "제목 원문", tc.ko);
    (article.cards || []).forEach(function (c, i) {
      var n = c.no || (i + 2);
      add("card-" + n + "-ultra", "문장 " + (n - 1) + " Ultra short", c.ultra);
      add("card-" + n + "-biz", "문장 " + (n - 1) + " 비즈니스 번역", c.biz);
      add("card-" + n + "-ko", "문장 " + (n - 1) + " 원문", c.ko);
      (c.alts || []).forEach(function (alt, k) { add("card-" + n + "-alt-" + k, "문장 " + (n - 1) + " 대체 표현", alt); });
    });
    (article.translation || []).forEach(function (p, i) { add("tr-" + i, "전체 번역 " + (i + 1), p); });
    (article.expressions || []).forEach(function (row, i) {
      add("ex-" + (i + 1) + "-en", "핵심 표현 " + (i + 1), row && row[2]);
      add("ex-" + (i + 1) + "-ex", "핵심 표현 " + (i + 1) + " 예문", row && row[3]);
    });
    return fields;
  }
  function scanCorpus(ARTICLES, CHUNKS) {
    var patterns = buildPatternList(CHUNKS);
    var byChunk = {};
    var byArticle = {};
    (ARTICLES || []).forEach(function (a) {
      var fields = articleFields(a);
      var aHits = [];
      fields.forEach(function (f) {
        var matches = findMatches(f.text, patterns);
        matches.forEach(function (m) {
          var rec = {
            articleId: a.id,
            date: a.date,
            title: a.title,
            fieldId: f.id,
            fieldLabel: f.label,
            sentence: f.text,
            match: m.text,
            typeId: m.typeId,
            chunkId: m.item.id
          };
          aHits.push(rec);
          (byChunk[m.item.id] || (byChunk[m.item.id] = [])).push(rec);
        });
      });
      byArticle[a.id] = aHits;
    });
    return { byChunk: byChunk, byArticle: byArticle, patterns: patterns };
  }

  function highlight(text, patternList, hrefFn) {
    var src = String(text || "");
    var matches = findMatches(src, patternList);
    if (!matches.length) return null;
    var html = "", i, m, last = 0;
    function esc(s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }
    for (i = 0; i < matches.length; i++) {
      m = matches[i];
      html += esc(src.slice(last, m.start));
      var href = hrefFn ? hrefFn(m.typeId, m.item.id) : "#/chunks/" + encodeURIComponent(m.typeId) + "/" + encodeURIComponent(m.item.id);
      html += '<a class="chunk-hit" href="' + esc(href) + '" title="' + esc(m.item.chunk + " — " + (m.item.meaning || "")) + '">' + esc(src.slice(m.start, m.end)) + "</a>";
      last = m.end;
    }
    html += esc(src.slice(last));
    return { html: html, matches: matches };
  }

  /* ---------- catalog of reviewable items ---------- */
  function describeKey(key, CHUNKS, GRAMMAR, ARTICLES) {
    var parts, t, it, u, p, a, row, n;
    if (key.indexOf("chunk:") === 0) {
      var id = key.slice(6);
      for (t = 0; t < (CHUNKS || []).length; t++) {
        for (it = 0; it < (CHUNKS[t].items || []).length; it++) {
          p = CHUNKS[t].items[it];
          if (p.id === id) {
            return {
              key: key, kind: "chunk",
              promptKo: p.meaning, answer: p.chunk, emoji: p.emoji || "🗣",
              exampleEn: p.exampleEn, exampleKo: p.exampleKo,
              href: "#/chunks/" + encodeURIComponent(CHUNKS[t].id) + "/" + encodeURIComponent(p.id),
              title: p.chunk, typeTitle: CHUNKS[t].title
            };
          }
        }
      }
    } else if (key.indexOf("pattern:") === 0) {
      id = key.slice(8);
      for (t = 0; t < (GRAMMAR || []).length; t++) {
        u = GRAMMAR[t];
        for (it = 0; it < (u.patterns || []).length; it++) {
          p = u.patterns[it];
          if (p.id === id) {
            return {
              key: key, kind: "pattern",
              promptKo: (p.name || "") + " — " + (p.desc || ""),
              answer: p.form, emoji: "🧩",
              exampleEn: p.example, exampleKo: "",
              href: "#/grammar/" + encodeURIComponent(u.id),
              title: p.name, typeTitle: u.title
            };
          }
        }
      }
    } else if (key.indexOf("expr:") === 0) {
      parts = key.split(":");
      a = (ARTICLES || []).filter(function (x) { return x.id === parts[1]; })[0];
      n = Number(parts[2]) - 1;
      row = a && a.expressions && a.expressions[n];
      if (row) {
        return {
          key: key, kind: "expr",
          promptKo: row[1], answer: row[2], emoji: "📰",
          exampleEn: row[3], exampleKo: "",
          href: "#/articles/" + encodeURIComponent(a.id),
          title: row[2], typeTitle: a.title
        };
      }
    }
    return null;
  }

  function expressionKeys(article) {
    return (article.expressions || []).map(function (row, i) { return "expr:" + article.id + ":" + (i + 1); });
  }

  /* ---------- speech ---------- */
  function pickVoice(synth) {
    if (!synth || typeof synth.getVoices !== "function") return null;
    var voices = synth.getVoices() || [];
    var i, v, enUS = [], en = [];
    for (i = 0; i < voices.length; i++) {
      v = voices[i];
      if (/en-US/i.test(v.lang || "") || /United States/i.test(v.name || "")) enUS.push(v);
      else if (/^en(-|$)/i.test(v.lang || "") || /\bEnglish\b/i.test(v.name || "")) en.push(v);
    }
    return enUS[0] || en[0] || null;
  }
  function speakText(synth, text, rate, cb) {
    if (!synth || typeof synth.speak !== "function" || typeof root.SpeechSynthesisUtterance === "undefined") {
      if (cb) cb(new Error("unsupported"));
      return false;
    }
    try { if (typeof synth.cancel === "function") synth.cancel(); } catch (e1) {}
    var u = new root.SpeechSynthesisUtterance(String(text || ""));
    u.lang = "en-US";
    u.rate = rate === 0.8 ? 0.8 : 1;
    var voice = pickVoice(synth);
    if (voice) u.voice = voice;
    if (cb) {
      u.onend = function () { cb(null); };
      u.onerror = function (ev) { cb(ev || new Error("speak")); };
    }
    synth.speak(u);
    return true;
  }
  function speechSupported(synth) {
    return !!(synth && typeof synth.speak === "function" && typeof root.SpeechSynthesisUtterance !== "undefined");
  }
  function micSupported(nav, Rec) {
    Rec = Rec || root.MediaRecorder;
    nav = nav || root.navigator;
    return !!(Rec && nav && nav.mediaDevices && typeof nav.mediaDevices.getUserMedia === "function");
  }

  function shadowPauseMs(text, rate) {
    var words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
    var speakMs = Math.max(1200, words * (rate === 0.8 ? 520 : 400));
    var repeatMs = Math.max(1600, words * 550);
    return { speakMs: speakMs, repeatMs: repeatMs };
  }

  root.Study = {
    INTERVALS: INTERVALS,
    setNow: setNow,
    now: now,
    todayStr: todayStr,
    addDays: addDays,
    cmpDay: cmpDay,
    emptyMem: emptyMem,
    normalizeMem: normalizeMem,
    migrateExport: migrateExport,
    defaultSettings: defaultSettings,
    markActivity: markActivity,
    todayActivity: todayActivity,
    streak: streak,
    calendar: calendar,
    unify: unify,
    normAns: normAns,
    looksEnglish: looksEnglish,
    chunkPatterns: chunkPatterns,
    searchPatterns: searchPatterns,
    matchAnswer: matchAnswer,
    clozeOf: clozeOf,
    enroll: enroll,
    grade: grade,
    noteWrong: noteWrong,
    dueKeys: dueKeys,
    migrateDone: migrateDone,
    buildPatternList: buildPatternList,
    findMatches: findMatches,
    articleFields: articleFields,
    scanCorpus: scanCorpus,
    highlight: highlight,
    describeKey: describeKey,
    expressionKeys: expressionKeys,
    pickVoice: pickVoice,
    speakText: speakText,
    speechSupported: speechSupported,
    micSupported: micSupported,
    shadowPauseMs: shadowPauseMs
  };
})(typeof window !== "undefined" ? window : globalThis);
