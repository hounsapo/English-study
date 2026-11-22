# 영어 공부방 (English Study Site)

빌드가 필요 없는 정적 사이트(HTML/CSS/JS)입니다.
- **로컬**: `index.html`을 더블클릭해서 브라우저로 열면 바로 동작합니다.
- **배포**: 폴더를 그대로 GitHub Pages / Netlify / Cloudflare Pages에 올리면 됩니다. (`.nojekyll` 포함)

## 구조
```
index.html          페이지 틀 (해시 라우팅: #/, #/articles, #/articles/<id>, #/grammar, #/grammar/<id>, #/progress)
css/style.css       스타일 (색상 코드: 원문 회색 / Ultra short 파랑 / 비즈니스 번역 굵은 초록+왼쪽 바 / 설명 연회색)
js/app.js           렌더링 · 진도 저장(localStorage) · 내보내기/가져오기
data/articles.js    오늘의 학습 기사 데이터  ← 매일 자동화가 여기만 수정
data/grammar.js     문법 구문 유닛 데이터
screenshots/        확인용 스크린샷
```

## 새 기사 추가하기 (data/articles.js만 수정)
`window.ARTICLES = [ ... ]` 배열 **맨 앞**에 객체 하나를 추가하세요. (사이트는 date 기준으로 최신순 정렬하므로 순서가 틀려도 괜찮습니다.)

```js
{
  "id": "d20261123",                       // 고유 ID: d + YYYYMMDD (진도 체크 키로 사용, 바꾸지 마세요)
  "date": "2026-11-23",                    // YYYY-MM-DD
  "dateLabel": "2026년 11월 23일 (월)",
  "title": "기사 제목",
  "outlet": "연합뉴스 (Yonhap News)",      // 괄호 앞부분이 짧은 매체명으로 쓰입니다
  "url": "https://...",
  "published": "2026년 11월 23일 07:10 (KST)",
  "field": "경제 · 고용",
  "basis": "선정 기준 설명 (선택)",          // 없으면 생략 가능
  "summary": "핵심 내용 2~3문장",
  "titleCard": { "no": 1, "ko": "제목 원문", "ultra": "Ultra short", "biz": "비즈니스 간결 번역", "note": "번역 설명" },
  "cards": [                               // 문장 2~9 (no: 2~9), alts = 대체 표현 칩
    { "no": 2, "ko": "...", "ultra": "...", "biz": "...", "note": "...", "alts": ["...", "..."] }
  ],
  "translation": ["문단1", "문단2"],        // 10. 전체 번역(본/요약)
  "translationLabel": "10. 전체 영어 번역본", // 선택. 생략 시 자동(첫 문단에 '요약'이 있으면 '(요약 번역)' 표시)
  "expressions": [["1", "한국어", "영어 표현", "예문"]]  // 11. 핵심 표현 20개
}
```
미국 기사를 고른 날에는 `ko` 자리에 영어 원문, `ultra`/`biz`에 한국어 해석 등을 넣고 `translationLabel`을 `"10. 전체 한국어 번역본"`으로 지정하면 됩니다.

## 진도
- 기사 / 문법 유닛 / 세부 패턴마다 ‘학습 완료’ 체크 → 브라우저 localStorage(`englishStudy.progress.v1`)에 완료 시각과 함께 저장.
- 진도 페이지에서 JSON 내보내기·가져오기(합치기/덮어쓰기)·초기화.
- 체크 키: `article:<id>`, `grammar:<unitId>`, `pattern:<patternId>`.

## 문법 유닛 추가
`data/grammar.js`의 `window.GRAMMAR` 배열에 같은 형식의 객체를 추가합니다. `explanation` 문단은 `<b>`, `<i>` 태그를 쓸 수 있습니다(그 외 필드는 텍스트로 표시).
