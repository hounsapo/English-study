/*
 * 표현 덩어리(Chunk) 학습 데이터
 * 각 유형: id, title(한국어), en, summary, explanation[], items[]
 * items[].id 는 진도 체크용 고유 ID 입니다. 바꾸면 해당 체크·메모 기록이 사라지니 주의하세요.
 * 체크 키: chunktype:<유형id>, chunk:<항목id>
 */
window.CHUNKS = [
  {
    "id": "collocations",
    "title": "연어",
    "en": "Collocations",
    "summary": "자연스럽게 함께 어울려 쓰이는 단어 조합을 통째로 익힙니다.",
    "explanation": [
      "연어는 의미는 통하더라도 원어민이 실제로 함께 쓰는 짝이 정해져 있는 표현입니다. 예를 들어 ‘결정을 하다’는 make a decision이지 do a decision이 아닙니다.",
      "동사+명사, 형용사+명사처럼 최소 2~3단어를 한 덩어리로 외우면 뉴스·업무 문장을 읽고 말할 때 훨씬 자연스러워집니다."
    ],
    "items": [
      {
        "id": "col-make-a-decision",
        "chunk": "make a decision",
        "meaning": "결정하다",
        "exampleEn": "The board will make a decision on the merger next week.",
        "exampleKo": "이사회는 다음 주에 합병에 대한 결정을 내릴 것이다."
      },
      {
        "id": "col-take-a-chance",
        "chunk": "take a chance",
        "meaning": "기회를 잡다, 모험하다",
        "exampleEn": "We decided to take a chance on the new market, even though demand was uncertain.",
        "exampleKo": "수요가 불확실했지만 우리는 그 새 시장에 한번 걸어 보기로 했다."
      },
      {
        "id": "col-heavy-rain",
        "chunk": "heavy rain",
        "meaning": "억수같이 내리는 비, 폭우",
        "exampleEn": "Heavy rain forced the outdoor event to be postponed.",
        "exampleKo": "폭우로 야외 행사가 연기되었다."
      },
      {
        "id": "col-reach-an-agreement",
        "chunk": "reach an agreement",
        "meaning": "합의에 이르다",
        "exampleEn": "After a 12-hour negotiation, the two sides reached an agreement.",
        "exampleKo": "12시간에 걸친 협상 끝에 양측은 합의에 이르렀다."
      },
      {
        "id": "col-raise-concerns",
        "chunk": "raise concerns",
        "meaning": "우려를 제기하다",
        "exampleEn": "Several lawmakers raised concerns about the impact on small businesses.",
        "exampleKo": "몇몇 의원들은 중소기업에 미칠 영향에 대해 우려를 제기했다."
      },
      {
        "id": "col-play-a-key-role",
        "chunk": "play a key role",
        "meaning": "핵심적인 역할을 하다",
        "exampleEn": "Exports play a key role in the country’s economic recovery.",
        "exampleKo": "수출은 그 나라의 경제 회복에서 핵심적인 역할을 한다."
      },
      {
        "id": "col-take-into-account",
        "chunk": "take into account",
        "meaning": "~을 고려하다, 감안하다",
        "exampleEn": "The forecast takes into account possible delays in the supply chain.",
        "exampleKo": "그 전망은 공급망에서 생길 수 있는 지연을 고려하고 있다."
      },
      {
        "id": "col-meet-a-deadline",
        "chunk": "meet a deadline",
        "meaning": "마감을 지키다, 기한을 맞추다",
        "exampleEn": "The team worked late to meet the deadline for the quarterly report.",
        "exampleKo": "팀은 분기 보고서 마감을 맞추기 위해 늦게까지 일했다."
      },
      {
        "id": "col-make-progress",
        "chunk": "make progress",
        "meaning": "진전을 이루다",
        "exampleEn": "Talks made little progress on the wage issue.",
        "exampleKo": "협상은 임금 문제에서 거의 진전을 이루지 못했다."
      },
      {
        "id": "col-come-into-effect",
        "chunk": "come into effect",
        "meaning": "발효되다, 시행되다",
        "exampleEn": "The new labor law will come into effect on January 1.",
        "exampleKo": "새 노동법은 1월 1일부터 발효된다."
      },
      {
        "id": "col-conduct-a-survey",
        "chunk": "conduct a survey",
        "meaning": "설문조사·조사를 실시하다",
        "exampleEn": "The ministry conducted a survey of 2,000 households last month.",
        "exampleKo": "해당 부처는 지난달 2,000가구를 대상으로 설문조사를 실시했다."
      },
      {
        "id": "col-face-a-challenge",
        "chunk": "face a challenge",
        "meaning": "어려움·과제에 직면하다",
        "exampleEn": "Manufacturers face a challenge from rising raw material costs.",
        "exampleKo": "제조업체들은 원자재 비용 상승이라는 어려움에 직면해 있다."
      },
      {
        "id": "col-issue-a-statement",
        "chunk": "issue a statement",
        "meaning": "성명을 발표하다",
        "exampleEn": "The company issued a statement denying the rumors of a sale.",
        "exampleKo": "회사는 매각 설을 부인하는 성명을 발표했다."
      },
      {
        "id": "col-cut-costs",
        "chunk": "cut costs",
        "meaning": "비용을 절감하다",
        "exampleEn": "The airline plans to cut costs by reducing unprofitable routes.",
        "exampleKo": "그 항공사는 수익성이 낮은 노선을 줄여 비용을 절감할 계획이다."
      },
      {
        "id": "col-pay-close-attention",
        "chunk": "pay close attention",
        "meaning": "세심한 주의를 기울이다",
        "exampleEn": "Investors are paying close attention to the central bank’s next move.",
        "exampleKo": "투자자들은 중앙은행의 다음 조치에 세심한 주의를 기울이고 있다."
      },
      {
        "id": "col-take-responsibility",
        "chunk": "take responsibility",
        "meaning": "책임을 지다",
        "exampleEn": "The CEO took responsibility for the data breach and apologized.",
        "exampleKo": "최고경영자는 개인정보 유출에 대해 책임을 지고 사과했다."
      },
      {
        "id": "col-pose-a-threat",
        "chunk": "pose a threat",
        "meaning": "위협이 되다, 위협을 가하다",
        "exampleEn": "Cyberattacks pose a threat to hospitals as well as banks.",
        "exampleKo": "사이버 공격은 은행뿐 아니라 병원에도 위협이 된다."
      },
      {
        "id": "col-draw-attention",
        "chunk": "draw attention",
        "meaning": "관심을 끌다, 이목을 모으다",
        "exampleEn": "The report drew attention to gaps in the pension system.",
        "exampleKo": "그 보고서는 연금 제도의 허점에 관심을 모았다."
      },
      {
        "id": "col-set-a-precedent",
        "chunk": "set a precedent",
        "meaning": "선례를 남기다",
        "exampleEn": "The ruling could set a precedent for similar cases.",
        "exampleKo": "그 판결은 비슷한 사건에 대한 선례가 될 수 있다."
      },
      {
        "id": "col-keep-in-mind",
        "chunk": "keep in mind",
        "meaning": "염두에 두다, 명심하다",
        "exampleEn": "Keep in mind that the figures are seasonally adjusted.",
        "exampleKo": "그 수치가 계절 조정된 것이라는 점을 염두에 두세요."
      }
    ]
  },
  {
    "id": "sentence-starters",
    "title": "고정된 문장 서두",
    "en": "Sentence Starters",
    "summary": "의견이나 질문을 열 때 틀이 되는 문장 앞부분을 통째로 익힙니다.",
    "explanation": [
      "문장 서두는 말문을 여는 ‘틀’입니다. 앞부분만 입에 붙으면 뒤에 내 내용을 넣기만 하면 되므로, 회의·이메일·발표에서 머뭇거림이 줄어듭니다.",
      "콤마나 that, if 뒤에 이어지는 내용만 바꿔 가며 여러 상황에서 소리 내어 연습해 보세요."
    ],
    "items": [
      {
        "id": "ss-as-far-as-im-concerned",
        "chunk": "As far as I’m concerned, …",
        "meaning": "내 생각에는…, 내가 보기에…",
        "exampleEn": "As far as I’m concerned, the proposal is ready to go.",
        "exampleKo": "제 생각에는 그 제안은 바로 진행해도 됩니다."
      },
      {
        "id": "ss-it-goes-without-saying",
        "chunk": "It goes without saying that …",
        "meaning": "~은 말할 필요도 없다",
        "exampleEn": "It goes without saying that customer data must be protected.",
        "exampleKo": "고객 데이터를 보호해야 한다는 것은 말할 필요도 없습니다."
      },
      {
        "id": "ss-do-you-mind-if-i",
        "chunk": "Do you mind if I …?",
        "meaning": "제가 ~해도 될까요?",
        "exampleEn": "Do you mind if I join the call 10 minutes late?",
        "exampleKo": "제가 회의에 10분 늦게 들어가도 될까요?"
      },
      {
        "id": "ss-from-my-perspective",
        "chunk": "From my perspective, …",
        "meaning": "제 관점에서는…",
        "exampleEn": "From my perspective, the delay is a cash-flow issue, not a demand issue.",
        "exampleKo": "제 관점에서는 그 지연은 수요 문제가 아니라 현금 흐름 문제입니다."
      },
      {
        "id": "ss-what-id-like-to-emphasize",
        "chunk": "What I’d like to emphasize is that …",
        "meaning": "제가 강조하고 싶은 것은 ~라는 점이다",
        "exampleEn": "What I’d like to emphasize is that this is a temporary measure.",
        "exampleKo": "제가 강조하고 싶은 것은 이것이 임시 조치라는 점입니다."
      },
      {
        "id": "ss-the-point-i-want-to-make",
        "chunk": "The point I want to make is that …",
        "meaning": "제가 말하고 싶은 요점은 ~이다",
        "exampleEn": "The point I want to make is that we need more time, not more staff.",
        "exampleKo": "제가 말하고 싶은 요점은 사람이 더 필요한 게 아니라 시간이 더 필요하다는 것입니다."
      },
      {
        "id": "ss-in-my-view",
        "chunk": "In my view, …",
        "meaning": "제 견해로는…",
        "exampleEn": "In my view, the tax cut will have only a modest effect.",
        "exampleKo": "제 견해로는 그 감세는 효과가 크지 않을 것입니다."
      },
      {
        "id": "ss-id-like-to-start-by",
        "chunk": "I’d like to start by …",
        "meaning": "먼저 ~하는 것으로 시작하고 싶다",
        "exampleEn": "I’d like to start by thanking everyone who worked on the report.",
        "exampleKo": "먼저 보고서 작업에 참여해 주신 모든 분께 감사드립니다."
      },
      {
        "id": "ss-if-i-may-id-like-to",
        "chunk": "If I may, I’d like to …",
        "meaning": "괜찮으시다면 ~하고 싶습니다",
        "exampleEn": "If I may, I’d like to add one more point before we vote.",
        "exampleKo": "괜찮으시다면, 표결 전에 한 가지를 더 말씀드리고 싶습니다."
      },
      {
        "id": "ss-would-it-be-possible-to",
        "chunk": "Would it be possible to …?",
        "meaning": "~하는 것이 가능할까요?",
        "exampleEn": "Would it be possible to move the meeting to Thursday afternoon?",
        "exampleKo": "회의를 목요일 오후로 옮기는 것이 가능할까요?"
      },
      {
        "id": "ss-i-was-wondering-if",
        "chunk": "I was wondering if …",
        "meaning": "~인지 궁금합니다, ~해 주실 수 있을까요 (완곡한 요청)",
        "exampleEn": "I was wondering if you could share the latest draft with us.",
        "exampleKo": "최신 초안을 저희와 공유해 주실 수 있을지 문의드립니다."
      },
      {
        "id": "ss-to-put-it-simply",
        "chunk": "To put it simply, …",
        "meaning": "간단히 말해…",
        "exampleEn": "To put it simply, we spent more than we earned last quarter.",
        "exampleKo": "간단히 말해, 지난 분기에 우리는 번 돈보다 더 많이 썼습니다."
      },
      {
        "id": "ss-what-this-means-is-that",
        "chunk": "What this means is that …",
        "meaning": "이것이 뜻하는 바는 ~이다",
        "exampleEn": "What this means is that prices are likely to stay high into next year.",
        "exampleKo": "이것은 물가가 내년까지 높게 유지될 가능성이 크다는 뜻입니다."
      },
      {
        "id": "ss-the-question-is-whether",
        "chunk": "The question is whether …",
        "meaning": "문제는 ~인지 여부이다",
        "exampleEn": "The question is whether the recovery can last without government support.",
        "exampleKo": "문제는 정부 지원 없이도 회복이 지속될 수 있는지입니다."
      },
      {
        "id": "ss-its-worth-noting-that",
        "chunk": "It’s worth noting that …",
        "meaning": "~라는 점은 주목할 만하다",
        "exampleEn": "It’s worth noting that unemployment fell even as hiring slowed.",
        "exampleKo": "채용이 둔화됐는데도 실업률이 떨어졌다는 점은 주목할 만합니다."
      },
      {
        "id": "ss-with-that-in-mind",
        "chunk": "With that in mind, …",
        "meaning": "그 점을 염두에 두면…",
        "exampleEn": "With that in mind, we should delay the product launch by a month.",
        "exampleKo": "그 점을 염두에 두면, 제품 출시를 한 달 미루는 것이 좋겠습니다."
      },
      {
        "id": "ss-allow-me-to-explain",
        "chunk": "Allow me to explain …",
        "meaning": "~을 설명드리겠습니다",
        "exampleEn": "Allow me to explain why the numbers look different from last year.",
        "exampleKo": "수치가 작년과 달라 보이는 이유를 설명드리겠습니다."
      },
      {
        "id": "ss-to-be-more-specific",
        "chunk": "To be more specific, …",
        "meaning": "더 구체적으로 말하면…",
        "exampleEn": "To be more specific, three of the five plants will close by June.",
        "exampleKo": "더 구체적으로 말하면, 다섯 곳의 공장 중 세 곳이 6월까지 문을 닫을 것입니다."
      },
      {
        "id": "ss-with-all-due-respect",
        "chunk": "With all due respect, …",
        "meaning": "존중하는 마음으로 말씀드리지만… (이견을 정중히 꺼낼 때)",
        "exampleEn": "With all due respect, I don’t think the data supports that conclusion.",
        "exampleKo": "존중하는 마음으로 말씀드리지만, 그 결론을 데이터가 뒷받침한다고 생각하지 않습니다."
      },
      {
        "id": "ss-correct-me-if-im-wrong",
        "chunk": "Correct me if I’m wrong, but …",
        "meaning": "제가 틀린 거라면 정정해 주세요. 그런데…",
        "exampleEn": "Correct me if I’m wrong, but the contract expires at the end of March.",
        "exampleKo": "제가 틀린 거라면 정정해 주세요. 계약이 3월 말에 만료되는 것 아닌가요?"
      }
    ]
  },
  {
    "id": "prepositional-phrases",
    "title": "전치사 매개 표현",
    "en": "Prepositional Phrases",
    "summary": "특정 전치사와 명사가 결합해 하나의 의미를 이루는 구를 익힙니다.",
    "explanation": [
      "전치사 구는 in, on, by, for 같은 전치사와 명사가 뭉쳐 하나의 의미 단위가 됩니다. 단어를 따로 해석하면 뜻이 어색해지므로, 구 전체를 하나의 덩어리로 외우는 것이 효율적입니다.",
      "뉴스와 보고서에서 특히 자주 나오니, 전치사+명사 조합을 표현 노트에 그대로 옮겨 적어두세요."
    ],
    "items": [
      {
        "id": "prep-in-terms-of",
        "chunk": "in terms of …",
        "meaning": "~의 관점에서, ~면에서",
        "exampleEn": "In terms of revenue, this was our strongest quarter in five years.",
        "exampleKo": "매출 면에서 이번 분기는 5년 만에 가장 좋은 실적이었습니다."
      },
      {
        "id": "prep-on-behalf-of",
        "chunk": "on behalf of …",
        "meaning": "~을 대표해서, ~을 대신하여",
        "exampleEn": "On behalf of the team, I’d like to thank you for your support.",
        "exampleKo": "팀을 대표하여 성원에 감사드립니다."
      },
      {
        "id": "prep-by-means-of",
        "chunk": "by means of …",
        "meaning": "~에 의하여, ~을 통해",
        "exampleEn": "The company cut emissions by means of a shift to renewable energy.",
        "exampleKo": "그 회사는 재생에너지로의 전환을 통해 배출량을 줄였다."
      },
      {
        "id": "prep-in-light-of",
        "chunk": "in light of …",
        "meaning": "~을 고려하여, ~에 비추어",
        "exampleEn": "In light of the new data, we have revised our forecast downward.",
        "exampleKo": "새로운 데이터를 고려하여 우리는 전망치를 하향 조정했습니다."
      },
      {
        "id": "prep-with-regard-to",
        "chunk": "with regard to …",
        "meaning": "~에 관하여, ~에 대해",
        "exampleEn": "With regard to the budget, we still need approval from finance.",
        "exampleKo": "예산과 관련해서는 아직 재무 부서의 승인이 필요합니다."
      },
      {
        "id": "prep-in-accordance-with",
        "chunk": "in accordance with …",
        "meaning": "~에 따라, ~에 준하여",
        "exampleEn": "The bonus was paid in accordance with the labor agreement.",
        "exampleKo": "보너스는 노사 합의에 따라 지급되었다."
      },
      {
        "id": "prep-for-the-sake-of",
        "chunk": "for the sake of …",
        "meaning": "~을 위하여, ~을 위해서",
        "exampleEn": "For the sake of transparency, we published the full list of donors.",
        "exampleKo": "투명성을 위해 우리는 기부자 명단 전체를 공개했습니다."
      },
      {
        "id": "prep-in-the-event-of",
        "chunk": "in the event of …",
        "meaning": "~하는 경우에, ~이 발생하면",
        "exampleEn": "In the event of a delay, passengers will be notified by text.",
        "exampleKo": "지연이 발생할 경우 승객에게 문자로 안내됩니다."
      },
      {
        "id": "prep-in-addition-to",
        "chunk": "in addition to …",
        "meaning": "~에 더하여, ~외에도",
        "exampleEn": "In addition to higher wages, the union asked for more flexible hours.",
        "exampleKo": "노조는 임금 인상 외에도 더 유연한 근무 시간을 요구했다."
      },
      {
        "id": "prep-regardless-of",
        "chunk": "regardless of …",
        "meaning": "~에 상관없이, ~와 무관하게",
        "exampleEn": "The rule applies to all staff, regardless of rank.",
        "exampleKo": "그 규정은 직급에 상관없이 모든 직원에게 적용됩니다."
      },
      {
        "id": "prep-as-a-result-of",
        "chunk": "as a result of …",
        "meaning": "~의 결과로",
        "exampleEn": "As a result of the strike, deliveries were delayed by two weeks.",
        "exampleKo": "파업의 결과로 배송이 2주 늦어졌다."
      },
      {
        "id": "prep-at-the-expense-of",
        "chunk": "at the expense of …",
        "meaning": "~을 희생하여, ~을 대가로",
        "exampleEn": "The company grew market share at the expense of profit margins.",
        "exampleKo": "그 회사는 이익률을 희생하면서 시장 점유율을 늘렸다."
      },
      {
        "id": "prep-in-the-face-of",
        "chunk": "in the face of …",
        "meaning": "~에 직면하여, ~에도 불구하고",
        "exampleEn": "In the face of falling demand, the factory reduced overtime.",
        "exampleKo": "수요 감소에 직면하여 공장은 잔업을 줄였다."
      },
      {
        "id": "prep-on-the-basis-of",
        "chunk": "on the basis of …",
        "meaning": "~에 근거하여",
        "exampleEn": "The loan was approved on the basis of the revised business plan.",
        "exampleKo": "그 대출은 수정된 사업 계획을 근거로 승인되었다."
      },
      {
        "id": "prep-in-line-with",
        "chunk": "in line with …",
        "meaning": "~에 부합하여, ~에 따라",
        "exampleEn": "The rate decision was in line with market expectations.",
        "exampleKo": "금리 결정은 시장의 기대에 부합했다."
      },
      {
        "id": "prep-in-response-to",
        "chunk": "in response to …",
        "meaning": "~에 대응하여, ~에 대한 응답으로",
        "exampleEn": "In response to customer complaints, the app released a fix the same day.",
        "exampleKo": "고객 불만에 대응하여 그 앱은 당일 수정 버전을 내놓았다."
      },
      {
        "id": "prep-in-connection-with",
        "chunk": "in connection with …",
        "meaning": "~와 관련하여",
        "exampleEn": "Three executives were questioned in connection with the accounting case.",
        "exampleKo": "회계 사건과 관련하여 임원 세 명이 조사를 받았다."
      },
      {
        "id": "prep-in-spite-of",
        "chunk": "in spite of …",
        "meaning": "~에도 불구하고",
        "exampleEn": "In spite of the recession, the firm hired 200 more workers.",
        "exampleKo": "경기 침체에도 불구하고 그 회사는 직원 200명을 더 채용했다."
      },
      {
        "id": "prep-in-the-long-run",
        "chunk": "in the long run",
        "meaning": "장기적으로는, 길게 보면",
        "exampleEn": "In the long run, investing in training will reduce turnover.",
        "exampleKo": "장기적으로는 교육에 투자하는 것이 이직을 줄일 것입니다."
      },
      {
        "id": "prep-with-a-view-to",
        "chunk": "with a view to …",
        "meaning": "~할 목적으로, ~을 염두에 두고",
        "exampleEn": "The bank raised capital with a view to expanding overseas.",
        "exampleKo": "그 은행은 해외 확장을 염두에 두고 자본을 확충했다."
      }
    ]
  },
  {
    "id": "idioms",
    "title": "관용 표현 및 이디엄",
    "en": "Idioms & Fixed Phrases",
    "summary": "단어 그대로 해석되지 않는 관용적 덩어리를 익힙니다.",
    "explanation": [
      "이디엄은 각 단어의 뜻을 더해도 전체 의미가 나오지 않습니다. piece of cake를 ‘케이크 한 조각’으로 읽으면 안 되는 것처럼, 통째로 하나의 뜻으로 외워야 합니다.",
      "아래는 업무·뉴스에서도 자주 듣는 표현 위주입니다. 너무 희귀하거나 구어체에만 쓰는 말은 넣지 않았습니다."
    ],
    "items": [
      {
        "id": "idm-a-piece-of-cake",
        "chunk": "a piece of cake",
        "meaning": "식은 죽 먹기",
        "exampleEn": "Once we had the data, writing the report was a piece of cake.",
        "exampleKo": "데이터만 갖추고 나니 보고서 작성은 식은 죽 먹기였다."
      },
      {
        "id": "idm-at-the-end-of-the-day",
        "chunk": "at the end of the day",
        "meaning": "결국에는, 궁극적으로",
        "exampleEn": "At the end of the day, what matters is whether customers come back.",
        "exampleKo": "결국 중요한 것은 고객이 다시 찾아오느냐입니다."
      },
      {
        "id": "idm-out-of-the-blue",
        "chunk": "out of the blue",
        "meaning": "갑자기, 난데없이",
        "exampleEn": "The CEO resigned out of the blue, without naming a successor.",
        "exampleKo": "후임자를 지명하지 않은 채 CEO가 갑자기 사임했다."
      },
      {
        "id": "idm-on-the-same-page",
        "chunk": "on the same page",
        "meaning": "같은 이해·생각을 공유하다",
        "exampleEn": "Let’s have a short call so we’re all on the same page before the meeting.",
        "exampleKo": "회의 전에 모두가 같은 이해를 갖도록 짧게 통화하죠."
      },
      {
        "id": "idm-the-bottom-line",
        "chunk": "the bottom line",
        "meaning": "핵심, 요점 (회계에서는 최종 손익)",
        "exampleEn": "The bottom line is that we can’t launch until the safety tests are done.",
        "exampleKo": "핵심은 안전 시험이 끝날 때까지 출시할 수 없다는 것입니다."
      },
      {
        "id": "idm-a-win-win-situation",
        "chunk": "a win-win situation",
        "meaning": "서로 이득이 되는 상황",
        "exampleEn": "Sharing the warehouse created a win-win situation for both companies.",
        "exampleKo": "창고를 공유하면서 두 회사 모두에 이득이 되는 상황이 되었다."
      },
      {
        "id": "idm-in-the-same-boat",
        "chunk": "in the same boat",
        "meaning": "같은 처지에 있다",
        "exampleEn": "Small shops and large chains are in the same boat when rents go up.",
        "exampleKo": "임대료가 오르면 작은 가게나 대형 체인이나 같은 처지다."
      },
      {
        "id": "idm-call-it-a-day",
        "chunk": "call it a day",
        "meaning": "오늘 일은 여기까지 하다, 작업을 마치다",
        "exampleEn": "We’ve fixed the critical bugs, so let’s call it a day.",
        "exampleKo": "치명적인 오류는 고쳤으니 오늘은 이만 마무리합시다."
      },
      {
        "id": "idm-get-the-ball-rolling",
        "chunk": "get the ball rolling",
        "meaning": "일을 시작하다, 분위기를 띄우다",
        "exampleEn": "I’ll send a rough outline to get the ball rolling.",
        "exampleKo": "일을 시작하기 위해 대략적인 개요를 보내 드리겠습니다."
      },
      {
        "id": "idm-think-outside-the-box",
        "chunk": "think outside the box",
        "meaning": "기존의 틀을 깨고 생각하다, 창의적으로 생각하다",
        "exampleEn": "We need to think outside the box to cut costs without layoffs.",
        "exampleKo": "해고 없이 비용을 줄이려면 기존의 틀을 깨고 생각해야 합니다."
      },
      {
        "id": "idm-a-rule-of-thumb",
        "chunk": "a rule of thumb",
        "meaning": "경험칙, 대략적인 기준",
        "exampleEn": "As a rule of thumb, we keep cash reserves equal to three months of expenses.",
        "exampleKo": "경험칙으로, 우리는 비용 3개월분에 해당하는 현금 보유액을 유지합니다."
      },
      {
        "id": "idm-go-the-extra-mile",
        "chunk": "go the extra mile",
        "meaning": "한 걸음 더 애쓰다, 기대 이상으로 하다",
        "exampleEn": "The support team went the extra mile to restore the client’s data overnight.",
        "exampleKo": "지원 팀은 밤새 고객 데이터를 복구하기 위해 한 걸음 더 애썼다."
      },
      {
        "id": "idm-keep-someone-in-the-loop",
        "chunk": "keep someone in the loop",
        "meaning": "진행 상황을 공유하다, 소식을 빠짐없이 알려 주다",
        "exampleEn": "Please keep me in the loop on any changes to the schedule.",
        "exampleKo": "일정에 변동이 있으면 저에게도 공유해 주세요."
      },
      {
        "id": "idm-touch-base",
        "chunk": "touch base",
        "meaning": "간단히 연락하다, 짧게 확인하다",
        "exampleEn": "I’ll touch base with legal and get back to you tomorrow.",
        "exampleKo": "법무 팀과 한번 확인하고 내일 다시 연락드리겠습니다."
      },
      {
        "id": "idm-cut-corners",
        "chunk": "cut corners",
        "meaning": "대충 하다, 비용·절차를 깎다 (부정적)",
        "exampleEn": "If we cut corners on testing, we may pay for it later.",
        "exampleKo": "테스트를 대충 하면 나중에 대가를 치를 수 있습니다."
      },
      {
        "id": "idm-on-thin-ice",
        "chunk": "on thin ice",
        "meaning": "아슬아슬한 처지에 있다, 입장이 위태롭다",
        "exampleEn": "After missing two deadlines, the contractor is on thin ice.",
        "exampleKo": "마감을 두 번 놓친 뒤 그 하청업체는 입장이 매우 불안해졌다."
      },
      {
        "id": "idm-a-blessing-in-disguise",
        "chunk": "a blessing in disguise",
        "meaning": "전화위복, 겉보기엔 나쁜 일이 오히려 득이 됨",
        "exampleEn": "Losing that client was a blessing in disguise; it pushed us to improve the product.",
        "exampleKo": "그 고객을 잃은 것은 전화위복이었다. 제품 개선을 서두르게 되었기 때문이다."
      },
      {
        "id": "idm-the-tip-of-the-iceberg",
        "chunk": "the tip of the iceberg",
        "meaning": "빙산의 일각",
        "exampleEn": "The refunds we issued are only the tip of the iceberg.",
        "exampleKo": "우리가 지급한 환불은 빙산의 일각일 뿐입니다."
      },
      {
        "id": "idm-back-to-square-one",
        "chunk": "back to square one",
        "meaning": "원점으로 돌아가다",
        "exampleEn": "The court rejected the deal, so we’re back to square one.",
        "exampleKo": "법원이 그 합의를 받아들이지 않아 우리는 원점으로 돌아갔다."
      },
      {
        "id": "idm-take-with-a-grain-of-salt",
        "chunk": "take something with a grain of salt",
        "meaning": "걸러서 듣다, 액면 그대로 믿지 않다",
        "exampleEn": "Take the early polling numbers with a grain of salt; the sample is small.",
        "exampleKo": "초기 여론조사 수치는 표본이 작으니 걸러서 보세요."
      }
    ]
  },
  {
    "id": "discourse-markers",
    "title": "담화 표지어",
    "en": "Discourse Markers",
    "summary": "대화나 글의 흐름을 전환·대조·정리할 때 쓰는 추임새를 익힙니다.",
    "explanation": [
      "담화 표지어는 내용을 바꾸거나, 반대 의견을 꺼내거나, 예시를 들거나, 말을 마무리할 때 쓰는 ‘이음매’입니다. 문장 앞이나 중간에 통째로 넣으면 논리 흐름이 분명해집니다.",
      "회의에서 바로 쓸 수 있도록, 앞뒤 문장과 함께 소리 내어 연습해 보세요."
    ],
    "items": [
      {
        "id": "dm-on-the-other-hand",
        "chunk": "on the other hand",
        "meaning": "반면에, 다른 한편으로",
        "exampleEn": "The plan would create jobs. On the other hand, it would raise the deficit.",
        "exampleKo": "그 계획은 일자리를 만들 것입니다. 반면에 재정적자도 늘릴 것입니다."
      },
      {
        "id": "dm-to-be-honest-with-you",
        "chunk": "to be honest with you",
        "meaning": "솔직히 말해서",
        "exampleEn": "To be honest with you, I don’t think we’ll finish by Friday.",
        "exampleKo": "솔직히 말해서, 금요일까지 끝낼 수 있을 것 같지는 않습니다."
      },
      {
        "id": "dm-speaking-of-which",
        "chunk": "speaking of which",
        "meaning": "말이 나와서 말인데",
        "exampleEn": "The report is due on Monday. Speaking of which, who is writing the summary?",
        "exampleKo": "보고서는 월요일까지입니다. 말이 나와서 말인데, 요약은 누가 쓰나요?"
      },
      {
        "id": "dm-that-said",
        "chunk": "that said",
        "meaning": "그렇긴 하지만, 그런데도",
        "exampleEn": "Sales were weak in Europe. That said, demand in Asia remained strong.",
        "exampleKo": "유럽 매출은 부진했습니다. 그렇긴 하지만 아시아 수요는 여전히 견조했습니다."
      },
      {
        "id": "dm-in-other-words",
        "chunk": "in other words",
        "meaning": "다시 말해, 즉",
        "exampleEn": "The factory ran at 60 percent capacity. In other words, it was far from busy.",
        "exampleKo": "공장은 가동률 60%로 돌아갔다. 다시 말해, 전혀 바쁜 상태가 아니었다."
      },
      {
        "id": "dm-as-a-matter-of-fact",
        "chunk": "as a matter of fact",
        "meaning": "사실, 실은",
        "exampleEn": "As a matter of fact, we already tested that idea last year.",
        "exampleKo": "사실, 우리는 그 아이디어를 작년에 이미 시험해 봤습니다."
      },
      {
        "id": "dm-by-the-way",
        "chunk": "by the way",
        "meaning": "그런데, 덧붙이자면",
        "exampleEn": "By the way, did you see the revised price list?",
        "exampleKo": "그런데, 수정된 가격표 보셨나요?"
      },
      {
        "id": "dm-all-things-considered",
        "chunk": "all things considered",
        "meaning": "모든 것을 고려하면",
        "exampleEn": "All things considered, postponing the launch was the safer choice.",
        "exampleKo": "모든 것을 고려하면, 출시를 미룬 것이 더 안전한 선택이었습니다."
      },
      {
        "id": "dm-having-said-that",
        "chunk": "having said that",
        "meaning": "그렇다고는 해도, 그런 점에서",
        "exampleEn": "The design looks great. Having said that, we still need to cut the cost.",
        "exampleKo": "디자인은 훌륭해 보입니다. 그렇다고는 해도, 비용은 여전히 줄여야 합니다."
      },
      {
        "id": "dm-to-put-it-another-way",
        "chunk": "to put it another way",
        "meaning": "다른 말로 하면",
        "exampleEn": "To put it another way, we are growing too fast for our systems to keep up.",
        "exampleKo": "다른 말로 하면, 우리 시스템이 따라가지 못할 만큼 빠르게 성장하고 있습니다."
      },
      {
        "id": "dm-meanwhile",
        "chunk": "meanwhile",
        "meaning": "한편, 그와 동시에",
        "exampleEn": "The government announced tax cuts. Meanwhile, local governments warned of shortfalls.",
        "exampleKo": "정부는 감세를 발표했다. 한편 지방정부는 재원 부족을 경고했다."
      },
      {
        "id": "dm-nevertheless",
        "chunk": "nevertheless",
        "meaning": "그럼에도 불구하고",
        "exampleEn": "The data is incomplete. Nevertheless, the trend is clear.",
        "exampleKo": "데이터가 완전하지는 않습니다. 그럼에도 추세는 분명합니다."
      },
      {
        "id": "dm-as-a-result",
        "chunk": "as a result",
        "meaning": "그 결과",
        "exampleEn": "Shipping costs soared. As a result, several retailers raised prices.",
        "exampleKo": "운송비가 급등했다. 그 결과 몇몇 유통업체가 가격을 올렸다."
      },
      {
        "id": "dm-for-instance",
        "chunk": "for instance",
        "meaning": "예를 들어",
        "exampleEn": "Some costs are hard to cut. For instance, rent is fixed for three years.",
        "exampleKo": "일부 비용은 줄이기 어렵습니다. 예를 들어 임대료는 3년 동안 고정입니다."
      },
      {
        "id": "dm-in-particular",
        "chunk": "in particular",
        "meaning": "특히",
        "exampleEn": "The slowdown hit manufacturers. In particular, chipmakers saw orders fall.",
        "exampleKo": "둔화는 제조업을 강타했다. 특히 반도체 업체들의 주문이 줄었다."
      },
      {
        "id": "dm-to-sum-up",
        "chunk": "to sum up",
        "meaning": "요약하면",
        "exampleEn": "To sum up, we should delay the project until funding is confirmed.",
        "exampleKo": "요약하면, 자금이 확정될 때까지 프로젝트를 미뤄야 합니다."
      },
      {
        "id": "dm-first-of-all",
        "chunk": "first of all",
        "meaning": "우선, 무엇보다 먼저",
        "exampleEn": "First of all, we need to agree on the timeline.",
        "exampleKo": "우선, 일정에 합의해야 합니다."
      },
      {
        "id": "dm-whats-more",
        "chunk": "what’s more",
        "meaning": "게다가, 더욱이",
        "exampleEn": "The bid came in under budget. What’s more, the vendor can start next week.",
        "exampleKo": "입찰가가 예산 아래로 들어왔습니다. 게다가 그 업체는 다음 주부터 착수할 수 있습니다."
      },
      {
        "id": "dm-in-that-case",
        "chunk": "in that case",
        "meaning": "그렇다면, 그럴 경우에는",
        "exampleEn": "If the client wants changes, we’ll need another week. In that case, let’s reset the deadline.",
        "exampleKo": "고객이 수정을 원하면 일주일이 더 필요합니다. 그렇다면 마감을 다시 잡죠."
      },
      {
        "id": "dm-at-the-same-time",
        "chunk": "at the same time",
        "meaning": "동시에, 그러면서도",
        "exampleEn": "We want to grow quickly. At the same time, we can’t ignore quality.",
        "exampleKo": "우리는 빠르게 성장하고 싶습니다. 그러면서도 품질을 무시할 수는 없습니다."
      }
    ]
  },
  {
    "id": "utterances",
    "title": "기능적 한 덩어리",
    "en": "Institutionalized Utterances",
    "summary": "상황만 오면 패턴 그대로 바로 나오는 정형화된 일상·업무 표현을 익힙니다.",
    "explanation": [
      "기능적 한 덩어리는 거의 문장 통째로 굳어진 말입니다. 감사, 양보, 약속, 거절처럼 자주 반복되는 상황에서 단어를 조립하지 않고 그대로 꺼내면 됩니다.",
      "특히 I’m looking forward to 뒤에는 동명사(-ing)가 옵니다. 외운 뒤에는 반드시 내 상황의 문장으로 바꿔 입으로 말해 보세요."
    ],
    "items": [
      {
        "id": "utt-i-appreciate-it",
        "chunk": "I appreciate it.",
        "meaning": "감사합니다, 고마워요",
        "exampleEn": "Thanks for sending the files so quickly. I appreciate it.",
        "exampleKo": "파일을 빨리 보내 주셔서 감사합니다."
      },
      {
        "id": "utt-never-mind",
        "chunk": "Never mind.",
        "meaning": "신경 쓰지 마세요, 괜찮아요 (방금 한 말이나 부탁을 취소할 때도 씁니다)",
        "exampleEn": "I thought I lost the file, but here it is. Never mind.",
        "exampleKo": "파일을 잃어버린 줄 알았는데 여기 있네요. 신경 쓰지 마세요."
      },
      {
        "id": "utt-its-up-to-you",
        "chunk": "It’s up to you.",
        "meaning": "너(당신)한테 달렸어요, 당신이 정하세요",
        "exampleEn": "We can meet today or tomorrow. It’s up to you.",
        "exampleKo": "오늘 만나도 되고 내일 만나도 됩니다. 당신이 정하세요."
      },
      {
        "id": "utt-that-would-be-great",
        "chunk": "That would be great.",
        "meaning": "그러면 좋겠어요",
        "exampleEn": "If you could share the slides in advance, that would be great.",
        "exampleKo": "슬라이드를 미리 공유해 주시면 좋겠습니다."
      },
      {
        "id": "utt-ill-get-back-to-you",
        "chunk": "I’ll get back to you.",
        "meaning": "다시 연락드릴게요",
        "exampleEn": "I need to check with finance first. I’ll get back to you this afternoon.",
        "exampleKo": "먼저 재무 팀에 확인해 봐야 합니다. 오늘 오후에 다시 연락드리겠습니다."
      },
      {
        "id": "utt-let-me-know-if-you-need-anything",
        "chunk": "Let me know if you need anything.",
        "meaning": "필요하신 게 있으면 말씀해 주세요",
        "exampleEn": "I’ve uploaded the draft. Let me know if you need anything.",
        "exampleKo": "초안을 올려 두었습니다. 필요하신 게 있으면 말씀해 주세요."
      },
      {
        "id": "utt-that-makes-sense",
        "chunk": "That makes sense.",
        "meaning": "이해가 됩니다, 그럴 만합니다, 타당합니다",
        "exampleEn": "If traffic is heavier in the evening, a morning launch makes sense.",
        "exampleKo": "저녁에 트래픽이 더 높다면, 오전에 출시하는 것이 타당합니다."
      },
      {
        "id": "utt-i-see-your-point",
        "chunk": "I see your point.",
        "meaning": "무슨 말씀인지 알겠습니다, 요지는 이해합니다",
        "exampleEn": "I see your point, but I still think we should wait for the test results.",
        "exampleKo": "말씀은 이해합니다만, 그래도 시험 결과를 기다리는 편이 낫다고 생각합니다."
      },
      {
        "id": "utt-feel-free-to-ask",
        "chunk": "Feel free to ask.",
        "meaning": "부담 없이 물어보세요",
        "exampleEn": "If anything in the contract is unclear, feel free to ask.",
        "exampleKo": "계약서에서 불분명한 부분이 있으면 편하게 물어보세요."
      },
      {
        "id": "utt-ill-take-care-of-it",
        "chunk": "I’ll take care of it.",
        "meaning": "제가 처리할게요",
        "exampleEn": "Don’t worry about the reservation. I’ll take care of it.",
        "exampleKo": "예약은 걱정하지 마세요. 제가 처리할게요."
      },
      {
        "id": "utt-sorry-to-keep-you-waiting",
        "chunk": "Sorry to keep you waiting.",
        "meaning": "기다리게 해서 죄송합니다",
        "exampleEn": "Sorry to keep you waiting. The previous meeting ran over.",
        "exampleKo": "기다리게 해서 죄송합니다. 이전 회의가 길어졌습니다."
      },
      {
        "id": "utt-id-rather-not",
        "chunk": "I’d rather not.",
        "meaning": "차라리 안 하는 게 좋겠어요, ~하고 싶지 않습니다",
        "exampleEn": "I’d rather not discuss salary over email. Can we talk tomorrow?",
        "exampleKo": "급여 이야기는 이메일로 하고 싶지 않습니다. 내일 말씀 나누시죠?"
      },
      {
        "id": "utt-thats-not-a-problem",
        "chunk": "That’s not a problem.",
        "meaning": "문제없습니다",
        "exampleEn": "If you need to push the call back an hour, that’s not a problem.",
        "exampleKo": "통화를 한 시간 미루셔도 문제없습니다."
      },
      {
        "id": "utt-could-you-say-that-again",
        "chunk": "Could you say that again?",
        "meaning": "다시 한 번 말씀해 주시겠어요?",
        "exampleEn": "Sorry, I didn’t catch that. Could you say that again?",
        "exampleKo": "죄송합니다, 잘 못 들었습니다. 다시 한 번 말씀해 주시겠어요?"
      },
      {
        "id": "utt-i-couldnt-agree-more",
        "chunk": "I couldn’t agree more.",
        "meaning": "전적으로 동의합니다",
        "exampleEn": "I couldn’t agree more — we should put safety first.",
        "exampleKo": "전적으로 동의합니다. 안전을 최우선으로 해야죠."
      },
      {
        "id": "utt-lets-stay-in-touch",
        "chunk": "Let’s stay in touch.",
        "meaning": "계속 연락해요, 소식을 주고받아요",
        "exampleEn": "It was good to meet you. Let’s stay in touch.",
        "exampleKo": "만나 뵙게 되어 반가웠습니다. 계속 연락하죠."
      },
      {
        "id": "utt-count-me-in",
        "chunk": "Count me in.",
        "meaning": "저도 넣어 주세요, 참여할게요",
        "exampleEn": "If you’re forming a working group, count me in.",
        "exampleKo": "작업반을 만드신다면 저도 넣으세요."
      },
      {
        "id": "utt-ill-keep-that-in-mind",
        "chunk": "I’ll keep that in mind.",
        "meaning": "명심할게요, 기억해 두겠습니다",
        "exampleEn": "Thanks for the warning about the delay. I’ll keep that in mind.",
        "exampleKo": "지연 가능성 알려 주셔서 감사합니다. 명심하겠습니다."
      },
      {
        "id": "utt-dont-mention-it",
        "chunk": "Don’t mention it.",
        "meaning": "천만에요, 별말씀을요",
        "exampleEn": "“Thank you for covering my shift.” “Don’t mention it.”",
        "exampleKo": "“제 근무를 대신해 주셔서 감사합니다.” “천만에요.”"
      },
      {
        "id": "utt-im-looking-forward-to-it",
        "chunk": "I’m looking forward to it. / I’m looking forward to ~ing",
        "meaning": "기대하고 있어요. 뒤에 명사 또는 동명사(-ing)가 옵니다.",
        "exampleEn": "I’m looking forward to taking a rest this weekend.",
        "exampleKo": "이번 주말에 쉬는 것이 기대됩니다."
      }
    ]
  }
];
