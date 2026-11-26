#!/usr/bin/env node
/* node + jsdom tests for study engine and app UI. speechSynthesis is mocked. */
"use strict";
var fs = require("fs");
var path = require("path");
var assert = require("assert");
var Module = require("module");
var extra = [path.join(__dirname, "node_modules"), path.join(__dirname, "../node_modules"), "/tmp/jsdom-test/node_modules"];
process.env.NODE_PATH = extra.concat(process.env.NODE_PATH || "").join(path.delimiter);
Module._initPaths();

var ROOT = path.resolve(__dirname, "..");
var failed = 0, passed = 0;
function test(name, fn) {
  try {
    var r = fn();
    if (r && typeof r.then === "function") {
      return r.then(function () { passed += 1; console.log("ok  " + name); }).catch(function (e) {
        failed += 1; console.error("FAIL " + name + "\n  " + (e && e.stack || e));
      });
    }
    passed += 1;
    console.log("ok  " + name);
  } catch (e) {
    failed += 1;
    console.error("FAIL " + name + "\n  " + (e && e.stack || e));
  }
}

function loadStudy() {
  var vm = require("vm");
  var ctx = { console: console, setTimeout: setTimeout, clearTimeout: clearTimeout };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/study.js"), "utf8"), ctx, { filename: "study.js" });
  return ctx.Study;
}

/* ---------------- engine ---------------- */
var Study = loadStudy();

test("intervals are 1,3,7,21,60", function () {
  assert.strictEqual(JSON.stringify(Study.INTERVALS), JSON.stringify([1, 3, 7, 21, 60]));
});

test("good grades follow the interval ladder", function () {
  Study.setNow(new Date(2026, 10, 1, 12, 0, 0));
  var mem = Study.emptyMem();
  Study.enroll(mem, "chunk:a", { immediate: true });
  var days = [];
  ["good", "good", "good", "good", "good"].forEach(function (q) {
    var c = Study.grade(mem, "chunk:a", q);
    days.push(c.interval);
    Study.setNow(new Date(c.due + "T12:00:00"));
  });
  assert.deepStrictEqual(days, [1, 3, 7, 21, 60]);
  Study.setNow(null);
});

test("easy lengthens the interval; hard resets to 1 day", function () {
  Study.setNow(new Date(2026, 10, 1, 12, 0, 0));
  var mem = Study.emptyMem();
  Study.enroll(mem, "chunk:a", { immediate: true });
  var easy = Study.grade(mem, "chunk:a", "easy");
  assert.strictEqual(easy.interval, 3); /* skip first ladder step */
  var hard = Study.grade(mem, "chunk:a", "hard");
  assert.strictEqual(hard.interval, 1);
  assert.ok(hard.ease < 2.5);
  assert.ok(mem.misses["chunk:a"]);
  Study.grade(mem, "chunk:a", "good");
  assert.ok(!mem.misses["chunk:a"]);
  Study.setNow(null);
});

test("lenient answer matching", function () {
  assert.strictEqual(Study.matchAnswer("make a decision", "make a decision").closeness, "exact");
  assert.strictEqual(Study.matchAnswer("Make a Decision!", "make a decision").ok, true);
  assert.strictEqual(Study.matchAnswer("a make a decision", "make a decision").ok, true);
  assert.strictEqual(Study.matchAnswer("make a decison", "make a decision").ok, true); /* typo */
  assert.strictEqual(Study.matchAnswer("make a decision", "make a decision / take a decision").ok, true);
  assert.strictEqual(Study.matchAnswer("I\u2019m aware of", "I'm aware of").ok, true);
  assert.strictEqual(Study.matchAnswer("", "hello").closeness, "empty");
  assert.strictEqual(Study.matchAnswer("totally wrong phrase", "make a decision").ok, false);
});

test("cloze blanks the chunk in the example", function () {
  var cz = Study.clozeOf("The board will make a decision next week.", "make a decision");
  assert.strictEqual(cz.found, true);
  assert.ok(cz.before.indexOf("The board will") === 0);
  assert.ok(cz.after.indexOf("next week") !== -1);
  assert.ok(/make a decision/i.test(cz.answer));
});

test("v2 export migrates and enrolls already-done items", function () {
  var incoming = Study.migrateExport({
    version: 2,
    items: { "chunk:col-make-a-decision": "2026-11-01T00:00:00.000Z" },
    notes: { "chunk:col-make-a-decision": "I will make a decision today." }
  });
  assert.strictEqual(incoming.notes["chunk:col-make-a-decision"], "I will make a decision today.");
  assert.deepStrictEqual(incoming.settings.newGoal, 5);
  Study.setNow(new Date(2026, 10, 22, 12, 0, 0));
  var added = Study.migrateDone(incoming, [
    { key: "chunk:col-make-a-decision", iso: incoming.items["chunk:col-make-a-decision"] }
  ]);
  assert.strictEqual(added, 1);
  var card = incoming.srs["chunk:col-make-a-decision"];
  assert.ok(card);
  assert.strictEqual(card.due, "2026-11-22"); /* past due clamped to today */
  Study.setNow(null);
});

test("streak counts consecutive days and allows an empty today", function () {
  Study.setNow(new Date(2026, 10, 22, 12, 0, 0));
  var mem = Study.emptyMem();
  mem.activity["2026-11-21"] = { n: 2 };
  mem.activity["2026-11-20"] = { n: 1 };
  assert.strictEqual(Study.streak(mem), 2);
  Study.markActivity(mem, "review");
  assert.strictEqual(Study.streak(mem), 3);
  mem.activity["2026-11-19"] = { n: 1 };
  /* already have 20-22; adding 19 after the fact — streak walks backward from today */
  assert.strictEqual(Study.streak(mem), 4);
  delete mem.activity["2026-11-21"];
  assert.strictEqual(Study.streak(mem), 1); /* only today */
  Study.setNow(null);
});

test("calendar has 30 days ending today", function () {
  Study.setNow(new Date(2026, 10, 22, 12, 0, 0));
  var mem = Study.emptyMem();
  mem.activity["2026-11-22"] = { n: 3 };
  var cal = Study.calendar(mem, 30);
  assert.strictEqual(cal.length, 30);
  assert.strictEqual(cal[29].day, "2026-11-22");
  assert.strictEqual(cal[29].n, 3);
  assert.strictEqual(cal[0].day, "2026-10-24");
  Study.setNow(null);
});

test("speechSynthesis mock speaks; missing API degrades", function () {
  var spoken = [];
  function Utterance(text) { this.text = text; this.lang = ""; this.rate = 1; this.onend = null; this.onerror = null; }
  var synth = {
    speak: function (u) { spoken.push(u); if (u.onend) u.onend(); },
    cancel: function () {},
    getVoices: function () { return [{ lang: "en-US", name: "Google US English" }]; }
  };
  var ctxStudy = (function () {
    var vm = require("vm");
    var ctx = {
      SpeechSynthesisUtterance: Utterance,
      speechSynthesis: synth,
      console: console
    };
    ctx.window = ctx;
    ctx.globalThis = ctx;
    vm.runInNewContext(fs.readFileSync(path.join(ROOT, "js/study.js"), "utf8"), ctx, { filename: "study.js" });
    return ctx.Study;
  })();
  assert.strictEqual(ctxStudy.speechSupported(synth), true);
  var ok = ctxStudy.speakText(synth, "Hello there", 0.8, null);
  assert.strictEqual(ok, true);
  assert.strictEqual(spoken.length, 1);
  assert.strictEqual(spoken[0].lang, "en-US");
  assert.strictEqual(spoken[0].rate, 0.8);
  assert.strictEqual(ctxStudy.speechSupported(null), false);
  assert.strictEqual(ctxStudy.speakText(null, "hi", 1, null), false);
  assert.strictEqual(ctxStudy.micSupported({ mediaDevices: null }, undefined), false);
});

test("article corpus finds real and inflected chunk hits, highlight wraps links", function () {
  var vm = require("vm");
  var ctx = { window: {}, console: console };
  ctx.window = ctx;
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data/chunks.js"), "utf8"), ctx, { filename: "chunks.js" });
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, "data/articles.js"), "utf8"), ctx, { filename: "articles.js" });
  var corpus = Study.scanCorpus(ctx.ARTICLES, ctx.CHUNKS);
  var total = Object.keys(corpus.byChunk).reduce(function (n, k) { return n + corpus.byChunk[k].length; }, 0);
  assert.ok(total >= 3, "expected some real article hits, got " + total);
  var pats = Study.searchPatterns({ chunk: "make a decision" });
  assert.ok(pats.some(function (p) { return /made a decision/i.test(p); }));
  var hits = Study.findMatches("The cabinet made a decision and came into effect yesterday, playing a key role.", corpus.patterns);
  var phrases = hits.map(function (h) { return h.pattern.toLowerCase(); }).join(" | ");
  assert.ok(/made a decision/.test(phrases), phrases);
  assert.ok(/came into effect|come into effect/.test(phrases), phrases);
  assert.ok(/play(ed|ing)? a key role/.test(phrases), phrases);
  var hl = Study.highlight("They have difficulty accessing the site.", corpus.patterns, function (t, id) {
    return "#/chunks/" + t + "/" + id;
  });
  assert.ok(hl && hl.html.indexOf("chunk-hit") !== -1);
  assert.ok(hl.html.indexOf("#/chunks/") !== -1);
});

/* ---------------- jsdom app ---------------- */
function loadApp(opts) {
  opts = opts || {};
  var jsdom = require("jsdom");
  var JSDOM = jsdom.JSDOM;
  var spoken = [];
  function Utterance(text) { this.text = text; this.lang = ""; this.rate = 1; this.voice = null; this.onend = null; this.onerror = null; }
  var html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  html = html.replace(/<script src="[^"]+"><\/script>/g, "");
  var dom = new JSDOM(html, {
    url: "https://hounsapo.github.io/English-study/",
    pretendToBeVisual: true,
    runScripts: "outside-only"
  });
  var w = dom.window;
  w.alert = function () {};
  w.confirm = function () { return opts.confirm !== false; };
  w.scrollTo = function () {};
  w.HTMLElement.prototype.scrollIntoView = function () {};
  if (opts.speech !== false) {
    w.SpeechSynthesisUtterance = Utterance;
    w.speechSynthesis = {
      speak: function (u) { spoken.push(u); if (u.onend) setTimeout(function () { u.onend(); }, 0); },
      cancel: function () {},
      getVoices: function () { return [{ lang: "en-US", name: "Google US English" }]; },
      addEventListener: function () {}
    };
  }
  /* no MediaRecorder / getUserMedia by default */
  delete w.MediaRecorder;
  if (!w.navigator) w.navigator = {};
  if (w.navigator.mediaDevices) delete w.navigator.mediaDevices;
  if (opts.store) {
    w.localStorage.setItem("englishStudy.progress.v1", JSON.stringify(opts.store));
  }
  ["data/articles.js", "data/grammar.js", "data/chunks.js", "js/study.js", "js/train.js", "js/app.js"].forEach(function (rel) {
    w.eval(fs.readFileSync(path.join(ROOT, rel), "utf8"));
  });
  return { dom: dom, window: w, document: w.document, spoken: spoken };
}

function go(ctx, hash) {
  ctx.window.location.hash = hash;
  ctx.window.dispatchEvent(new ctx.window.Event("hashchange"));
}

test("existing localStorage keys and notes are preserved; checking enrolls SRS", function () {
  var store = {
    items: { "chunk:col-make-a-decision": "2026-11-10T00:00:00.000Z" },
    notes: { "chunk:col-make-a-decision": "Keep this sentence." }
  };
  var ctx = loadApp({ store: store });
  var mem = ctx.window.__ES.getMem();
  assert.strictEqual(mem.notes["chunk:col-make-a-decision"], "Keep this sentence.");
  assert.ok(mem.items["chunk:col-make-a-decision"]);
  assert.ok(mem.srs["chunk:col-make-a-decision"], "already-done chunk should be enrolled");
  go(ctx, "#/chunks/collocations/col-make-a-decision");
  var ta = ctx.document.querySelector("textarea[data-note='chunk:col-make-a-decision']");
  assert.ok(ta, "note textarea should be present; html starts " + ctx.document.getElementById("app").innerHTML.slice(0, 200));
  assert.strictEqual(ta.value, "Keep this sentence.");
  go(ctx, "#/chunks/collocations");
  var box = Array.prototype.find.call(ctx.document.querySelectorAll("input[data-key^='chunk:']"), function (el) {
    return el.getAttribute("data-key") !== "chunk:col-make-a-decision" && !el.checked;
  });
  assert.ok(box, "expected an unchecked chunk checkbox, got " + ctx.document.querySelectorAll("input[data-key]").length);
  var key = box.getAttribute("data-key");
  box.checked = true;
  box.dispatchEvent(new ctx.window.Event("change", { bubbles: true }));
  mem = ctx.window.__ES.getMem();
  assert.ok(mem.items[key], key);
  assert.ok(mem.srs[key], key);
  ctx.dom.window.close();
});

test("review routes render Korean UI", function () {
  var ctx = loadApp();
  go(ctx, "#/");
  var home = ctx.document.getElementById("app").innerHTML;
  assert.ok(home.indexOf("오늘의 복습") !== -1);
  assert.ok(ctx.document.querySelector(".cal"));
  go(ctx, "#/review");
  assert.ok(ctx.document.getElementById("app").textContent.indexOf("떠올리기") !== -1);
  assert.ok(ctx.document.getElementById("newGoal"));
  go(ctx, "#/review/recall");
  assert.ok(/떠올리기/.test(ctx.document.title + ctx.document.getElementById("app").textContent));
  go(ctx, "#/review/cloze");
  assert.ok(/빈칸 채우기/.test(ctx.document.title + ctx.document.getElementById("app").textContent));
  go(ctx, "#/review/shadow");
  assert.ok(/듣고 따라 말하기/.test(ctx.document.title + ctx.document.getElementById("app").textContent));
  assert.ok(ctx.document.getElementById("btnShadowStart"));
  go(ctx, "#/review/misses");
  assert.ok(/오답 노트/.test(ctx.document.title + ctx.document.getElementById("app").textContent));
  go(ctx, "#/progress");
  assert.ok(ctx.document.querySelector(".cal"));
  ctx.dom.window.close();
});

test("article pages highlight chunk links; chunk cards link back", function () {
  var ctx = loadApp();
  var corpus = ctx.window.__ES.getCorpus();
  var chunkId = Object.keys(corpus.byChunk)[0];
  assert.ok(chunkId, "need at least one corpus hit");
  var hit = corpus.byChunk[chunkId][0];
  go(ctx, "#/articles/" + hit.articleId);
  var links = ctx.document.querySelectorAll("a.chunk-hit");
  assert.ok(links.length >= 1, "article should highlight chunks");
  var href = links[0].getAttribute("href");
  assert.ok(/^#\/chunks\//.test(href), href);
  var typeId = corpus.byChunk[chunkId][0].typeId;
  go(ctx, "#/chunks/" + typeId + "/" + chunkId);
  var back = ctx.document.querySelector(".article-hits");
  assert.ok(back, "chunk card should show article sentences");
  assert.ok(back.textContent.indexOf("기사에서 만난 문장") !== -1);
  assert.ok(back.querySelector("a[href='#/articles/" + hit.articleId + "']"));
  ctx.dom.window.close();
});

test("speaker buttons call mocked speechSynthesis; degrade without it", function () {
  var ctx = loadApp();
  go(ctx, "#/chunks/collocations");
  var btn = ctx.document.querySelector("[data-speak]");
  assert.ok(btn, "chunk page should have speaker buttons");
  btn.click();
  assert.ok(ctx.spoken.length >= 1, "click should speak");
  assert.strictEqual(ctx.spoken[0].lang, "en-US");
  ctx.dom.window.close();

  var quiet = loadApp({ speech: false });
  go(quiet, "#/review/shadow");
  var page = quiet.document.getElementById("app").textContent;
  assert.ok(/지원하지 않/.test(page) || quiet.document.getElementById("btnShadowStart"), "shadow page still usable");
  /* mic should be mentioned as unsupported or hidden */
  assert.ok(/마이크/.test(page) || !quiet.document.getElementById("btnShadowRec") || /지원하지/.test(page));
  quiet.dom.window.close();
});

test("recall grades update SRS and export is version 3", function () {
  var ctx = loadApp();
  /* enroll one due card */
  var mem = ctx.window.__ES.getMem();
  Study.setNow(null);
  ctx.window.Study.enroll(mem, "chunk:col-make-a-decision", { immediate: true });
  ctx.window.__ES.setMem(mem);
  go(ctx, "#/review/recall");
  var app = ctx.document.getElementById("app");
  assert.ok(app.textContent.indexOf("떠올리기") !== -1);
  var input = ctx.document.getElementById("recallInput");
  if (input) {
    input.value = "make a decision";
    ctx.document.getElementById("btnCheckAnswer").click();
    assert.ok(/정답/.test(ctx.document.getElementById("app").textContent));
    var easy = ctx.document.querySelector("[data-grade='easy']");
    assert.ok(easy);
    easy.click();
    var after = ctx.window.__ES.getMem();
    assert.ok(after.srs["chunk:col-make-a-decision"].interval >= 1);
    assert.ok(after.items["chunk:col-make-a-decision"]);
  }
  /* export */
  var created = [];
  ctx.window.URL.createObjectURL = function (b) { created.push(b); return "blob:test"; };
  ctx.window.URL.revokeObjectURL = function () {};
  var orig = ctx.window.Blob;
  var captured = null;
  ctx.window.Blob = function (parts, opts) { captured = parts[0]; return new orig(parts, opts); };
  go(ctx, "#/progress");
  ctx.document.getElementById("btnExport").click();
  assert.ok(captured, "export should produce JSON");
  var data = JSON.parse(captured);
  assert.strictEqual(data.version, 3);
  assert.ok(data.srs);
  assert.ok(data.settings);
  assert.ok(data.activity);
  ctx.dom.window.close();
});

test("importing a v2 file migrates into v3 memory", function () {
  var ctx = loadApp();
  var v2 = {
    app: "english-study-site",
    version: 2,
    items: { "chunk:col-make-a-decision": "2026-11-01T00:00:00.000Z", "article:d20261112": "2026-11-12T00:00:00.000Z" },
    notes: { "chunk:col-make-a-decision": "imported note" }
  };
  var imported = ctx.window.Study.migrateExport(v2);
  ctx.window.__ES.setMem(imported);
  ctx.window.__ES.load();
  var mem = ctx.window.__ES.getMem();
  /* load() already ran migrateExisting once at boot; after setMem we need migrate via load */
  /* __ES.load re-reads localStorage — setMem already saved */
  ctx.window.__ES.load();
  mem = ctx.window.__ES.getMem();
  assert.strictEqual(mem.notes["chunk:col-make-a-decision"], "imported note");
  assert.ok(mem.srs["chunk:col-make-a-decision"], "chunk from v2 should be enrolled");
  /* article expressions enrolled */
  var exprKeys = Object.keys(mem.srs).filter(function (k) { return k.indexOf("expr:d20261112:") === 0; });
  assert.ok(exprKeys.length >= 1, "article completion should enroll expressions");
  ctx.dom.window.close();
});

/* ---------------- 출력 훈련 ---------------- */
function latest(w) { return w.ARTICLES.slice().sort(function (x, y) { return x.date < y.date ? 1 : -1; })[0]; }
function answerFor(w, it) { return String(it.en).split("/")[0].replace(/\(.*?\)/g, " ").replace(/\s+/g, " ").trim(); }
function solveCurrent(ctx, right) {
  var d = ctx.document, w = ctx.window, st = w.Train._state, it = st.queue[st.i];
  if (right) { d.getElementById("trExpr").value = answerFor(w, it); d.querySelector('[data-trcheck="meaning"]').click(); }
  else d.querySelector('[data-trskip="meaning"]').click();
  if (d.getElementById("trCloze")) {
    var c = w.Study.clozeOf(it.ex, answerFor(w, it));
    if (right) { d.getElementById("trCloze").value = c.answer; d.querySelector('[data-trcheck="cloze"]').click(); }
    else d.querySelector('[data-trskip="cloze"]').click();
  }
  d.querySelector("[data-trnext]").click();
  return it;
}
test("train: meaning → cloze → note, grades into SRS, answer hidden first", function () {
  var ctx = loadApp(); var d = ctx.document, w = ctx.window;
  go(ctx, "#/train");
  var a = latest(w), st = w.Train._state;
  assert.ok(!d.querySelector("[data-trtab]"), "only expression practice");
  assert.strictEqual(st.queue.length, a.expressions.length, "fresh user: no past mix");
  assert.ok(d.getElementById("trBody").textContent.indexOf(a.expressions[0][2]) < 0, "answer hidden before check");
  var it = st.queue[0];
  d.getElementById("trExpr").value = answerFor(w, it);
  d.querySelector('[data-trcheck="meaning"]').click();
  if (w.Study.clozeOf(it.ex, answerFor(w, it)).found) {
    assert.ok(d.getElementById("trCloze"), "cloze step after correct meaning");
    d.getElementById("trCloze").value = w.Study.clozeOf(it.ex, answerFor(w, it)).answer;
    d.querySelector('[data-trcheck="cloze"]').click();
  }
  assert.ok(d.querySelector(".tr-score.ok"), "correct");
  assert.ok(d.querySelector('textarea[data-note="' + it.key + '"]'), "my sentence box");
  var mem = w.__ES.getMem();
  assert.ok(mem.srs[it.key] && mem.srs[it.key].reps === 1, "graded good into SRS");
  ctx.dom.window.close();
});
test("train: wrong items repeat until all correct; misses go to review", function () {
  var ctx = loadApp(); var d = ctx.document, w = ctx.window;
  go(ctx, "#/train");
  var st = w.Train._state, n = st.queue.length, wrong = [];
  for (var i = 0; i < n; i++) { var it = solveCurrent(ctx, i >= 2); if (i < 2) wrong.push(it.key); }
  assert.ok(d.querySelector("[data-trretry]"), "retry button");
  d.querySelector("[data-trretry]").click();
  assert.strictEqual(st.queue.length, 2, "only wrong items");
  solveCurrent(ctx, true); solveCurrent(ctx, true);
  assert.ok(/완료/.test(d.getElementById("trBody").textContent), "done after all correct");
  var mem = w.__ES.getMem();
  wrong.forEach(function (k) { assert.ok(mem.misses[k], "miss noted"); assert.strictEqual(mem.srs[k].reps, 0, "graded hard once"); });
  ctx.dom.window.close();
});
test("train: mixes up to 5 past-article misses", function () {
  var ctx0 = loadApp(); var w0 = ctx0.window;
  var arts = w0.ARTICLES.slice().sort(function (x, y) { return x.date < y.date ? 1 : -1; });
  var old = arts[1], misses = {}, srs = {};
  for (var i = 1; i <= 7; i++) { misses["expr:" + old.id + ":" + i] = { count: 1, last: "2026-11-20T00:00:00.000Z", reason: "hard" }; }
  ctx0.dom.window.close();
  var ctx = loadApp({ store: { items: {}, notes: {}, srs: srs, misses: misses } }); var w = ctx.window;
  go(ctx, "#/train");
  var past = w.Train._state.queue.filter(function (x) { return x.past; });
  assert.strictEqual(past.length, 5, "5 past items mixed in");
  assert.ok(/지난 기사 복습/.test(ctx.document.body.textContent));
  ctx.dom.window.close();
});
test("home and article pages link to output training", function () {
  var ctx = loadApp(); var d = ctx.document;
  go(ctx, "#/");
  assert.ok(d.querySelector('a.tr-cta[href^="#/train/"]'));
  go(ctx, "#/articles");
  var first = d.querySelector('a.item').getAttribute("href");
  go(ctx, first);
  assert.ok(d.querySelector('a[href^="#/train/"]'));
  ctx.dom.window.close();
});

var code = failed ? 1 : 0;
process.exitCode = code;
if (failed) {
  console.error("\n" + failed + " failed, " + passed + " passed");
} else {
  console.log("\n" + passed + " passed");
}
