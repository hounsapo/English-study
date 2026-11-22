/*
 * 표현 덩어리(Chunk) 학습 데이터
 * 각 유형: id, title, en, summary, explanation[], clusters[], compares[], items[]
 * items[].id 는 진도 체크·메모 키로 쓰입니다. 바꾸면 기록이 사라지니 주의하세요.
 * 체크 키: chunktype:<유형id>, chunk:<항목id>
 * clusters[].itemIds 는 items[].id 를 가리킵니다.
 * items[] 의 similar / opposite / derived 에서 id·typeId 가 있으면 사이트 안 링크로 연결됩니다.
 */
window.CHUNKS = [
  {
    "id": "collocations",
    "title": "연어",
    "en": "Collocations",
    "summary": "자연스럽게 함께 어울려 쓰이는 단어 조합을 통째로 익힙니다.",
    "explanation": [
      "연어는 의미는 통하더라도 원어민이 실제로 함께 쓰는 짝이 정해져 있는 표현입니다. 예를 들어 ‘결정을 하다’는 make a decision이지 do a decision이 아닙니다.",
      "동사+명사, 형용사+명사처럼 최소 2~3단어를 한 덩어리로 외우면 뉴스·업무 문장을 읽고 말할 때 훨씬 자연스러워집니다.",
      "비슷한 표현끼리 묶어 두었고, 각 카드에는 비슷(≈)·반대(↔)·파생(→) 가지가 있습니다. 사이트에 있는 표현은 눌러 바로 이동할 수 있습니다."
    ],
    "clusters": [
      {
        "id": "col-c-make",
        "title": "make로 결과를 만들다",
        "visual": "mindmap",
        "hook": "make는 ‘결과를 만들어 내다’입니다. 결정·진전·차이처럼 없던 성과를 만들 때 쓰고, 일반 활동에는 do를 씁니다.",
        "visualData": {
          "center": "make",
          "centerKo": "만들다 · 이루다"
        },
        "itemIds": [
          "col-make-a-decision",
          "col-make-progress",
          "col-make-an-effort",
          "col-make-a-difference",
          "col-lose-ground"
        ]
      },
      {
        "id": "col-c-take",
        "title": "take로 맡거나 받아들이다",
        "visual": "mindmap",
        "hook": "take는 ‘자기 쪽으로 가져와 맡다’입니다. chance는 위험을 감수하고, responsibility는 책임을 떠맡으며, into account는 고려 사항을 받아들입니다.",
        "visualData": {
          "center": "take",
          "centerKo": "맡다 · 받아들이다"
        },
        "itemIds": [
          "col-take-a-chance",
          "col-take-into-account",
          "col-take-responsibility",
          "col-take-action"
        ]
      },
      {
        "id": "col-c-do",
        "title": "do로 일·활동을 하다",
        "visual": "mindmap",
        "hook": "do는 ‘이미 있는 일이나 활동을 하다’입니다. business나 one’s best처럼 수행하는 느낌이고, 새로운 결과를 만들 때는 make를 씁니다.",
        "visualData": {
          "center": "do",
          "centerKo": "하다 · 수행하다"
        },
        "itemIds": [
          "col-do-business",
          "col-do-ones-best"
        ]
      },
      {
        "id": "col-c-have",
        "title": "have로 상태·경험을 갖다",
        "visual": "mindmap",
        "hook": "have는 ‘어떤 상태나 경험을 갖다’입니다. impact는 영향이 있음을, difficulty는 어려움을 겪고 있음을 나타냅니다.",
        "visualData": {
          "center": "have",
          "centerKo": "갖다 · 겪다"
        },
        "itemIds": [
          "col-have-an-impact",
          "col-have-difficulty"
        ]
      },
      {
        "id": "col-c-attention",
        "title": "관심·위험·주목",
        "visual": "inout",
        "hook": "관심을 ‘일으키거나(raise/draw/pose) 기울이는(pay)’ 동사들입니다. 나가는 신호와 들어오는 주의를 구분해 외우세요.",
        "visualData": {
          "out": "일으키다 · 보내다",
          "outItems": [
            "raise concerns",
            "draw attention",
            "pose a threat"
          ],
          "in": "기울이다 · 받다",
          "inItems": [
            "pay close attention"
          ]
        },
        "itemIds": [
          "col-raise-concerns",
          "col-draw-attention",
          "col-pose-a-threat",
          "col-pay-close-attention"
        ]
      },
      {
        "id": "col-c-official",
        "title": "공식 절차와 성과",
        "visual": "process",
        "hook": "합의·조사·발표·선례·발효·마감처럼 공식 절차의 동사+명사 짝입니다. 주어가 기관이나 회사일 때 뉴스에서 자주 나옵니다.",
        "visualData": {
          "steps": [
            "survey",
            "agreement",
            "statement",
            "precedent",
            "deadline",
            "effect"
          ]
        },
        "itemIds": [
          "col-conduct-a-survey",
          "col-reach-an-agreement",
          "col-issue-a-statement",
          "col-set-a-precedent",
          "col-meet-a-deadline",
          "col-come-into-effect"
        ]
      },
      {
        "id": "col-c-adj",
        "title": "형용사+명사로 정도를 말하다",
        "visual": "scale",
        "hook": "형용사가 정도를 고정하는 짝입니다. heavy rain, tight deadline, strong growth처럼 ‘어떤 비/마감/성장’이 아니라 관용적으로 붙는 형용사를 통째로 외우세요.",
        "visualData": {
          "low": "light / loose / weak",
          "high": "heavy / tight / strong"
        },
        "itemIds": [
          "col-heavy-rain",
          "col-tight-deadline",
          "col-strong-growth"
        ]
      },
      {
        "id": "col-c-respond",
        "title": "과제에 대응하는 표현",
        "visual": "theme",
        "hook": "과제에 맞서거나(face), 역할을 하거나(play), 비용을 줄이거나(cut), 염두에 두는(keep in mind) 대응 표현입니다.",
        "itemIds": [
          "col-face-a-challenge",
          "col-play-a-key-role",
          "col-cut-costs",
          "col-keep-in-mind"
        ]
      }
    ],
    "compares": [
      {
        "id": "cmp-make-do",
        "title": "make vs do",
        "leftId": "col-make-a-decision",
        "rightId": "col-do-business",
        "diff": "make는 결정·진전·차이처럼 새로운 결과를 ‘만들어 낼’ 때, do는 business·one’s best처럼 일이나 활동을 ‘수행할’ 때 씁니다. do a decision, make business는 어색합니다.",
        "leftNote": "결과를 만들다",
        "rightNote": "일을 하다"
      },
      {
        "id": "cmp-progress-ground",
        "title": "make progress vs lose ground",
        "leftId": "col-make-progress",
        "rightId": "col-lose-ground",
        "diff": "make progress는 앞으로 나가는 진전, lose ground는 입지가 좁아지거나 경쟁에서 밀리는 반대 방향입니다. 비슷한 짝으로 gain ground ↔ lose ground도 자주 씁니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-draw-pay",
        "title": "draw attention vs pay close attention",
        "leftId": "col-draw-attention",
        "rightId": "col-pay-close-attention",
        "diff": "draw attention은 다른 사람의 관심을 ‘끌어내는’ 것이고, pay close attention은 내가 관심을 ‘기울이는’ 것입니다. 방향이 반대입니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-account-mind",
        "title": "take into account vs keep in mind",
        "leftId": "col-take-into-account",
        "rightId": "col-keep-in-mind",
        "diff": "둘 다 ‘고려하다’에 가깝지만, take into account는 계산·판단에 반영한다는 느낌, keep in mind는 잊지 말고 염두에 두라는 당부에 더 자주 씁니다.",
        "leftNote": null,
        "rightNote": null
      }
    ],
    "items": [
      {
        "id": "col-make-a-decision",
        "chunk": "make a decision",
        "meaning": "결정하다",
        "exampleEn": "The board will make a decision on the merger next week.",
        "exampleKo": "이사회는 다음 주에 합병에 대한 결정을 내릴 것이다.",
        "emoji": "🧭",
        "similar": [
          {
            "phrase": "reach a decision",
            "meaning": "결정에 이르다"
          },
          {
            "phrase": "come to a decision",
            "meaning": "결정을 내리다"
          }
        ],
        "opposite": [
          {
            "phrase": "put off a decision",
            "meaning": "결정을 미루다"
          },
          {
            "phrase": "remain undecided",
            "meaning": "결정을 내리지 못한 채로 있다"
          }
        ],
        "derived": [
          {
            "phrase": "decision-making",
            "meaning": "의사결정"
          },
          {
            "phrase": "decisive",
            "meaning": "결단력 있는"
          }
        ]
      },
      {
        "id": "col-make-progress",
        "chunk": "make progress",
        "meaning": "진전을 이루다",
        "exampleEn": "Talks made little progress on the wage issue.",
        "exampleKo": "협상은 임금 문제에서 거의 진전을 이루지 못했다.",
        "emoji": "📈",
        "similar": [
          {
            "phrase": "make headway",
            "meaning": "진전을 이루다"
          },
          {
            "phrase": "gain ground",
            "meaning": "입지를 넓히다"
          }
        ],
        "opposite": [
          {
            "phrase": "lose ground",
            "meaning": "입지가 좁아지다, 뒤처지다",
            "typeId": "collocations",
            "id": "col-lose-ground"
          },
          {
            "phrase": "stall",
            "meaning": "정체되다"
          }
        ],
        "derived": [
          {
            "phrase": "a progress report",
            "meaning": "진행 보고"
          },
          {
            "phrase": "a work in progress",
            "meaning": "진행 중인 작업"
          }
        ]
      },
      {
        "id": "col-make-an-effort",
        "chunk": "make an effort",
        "meaning": "노력을 하다",
        "exampleEn": "The staff made an effort to finish the inventory before closing.",
        "exampleKo": "직원들은 문을 닫기 전에 재고 조사를 끝내려고 노력했다.",
        "emoji": "💪",
        "similar": [
          {
            "phrase": "make an attempt",
            "meaning": "시도하다"
          },
          {
            "phrase": "do one’s best",
            "meaning": "최선을 다하다",
            "typeId": "collocations",
            "id": "col-do-ones-best"
          }
        ],
        "opposite": [
          {
            "phrase": "make no effort",
            "meaning": "전혀 노력하지 않다"
          },
          {
            "phrase": "give up",
            "meaning": "포기하다"
          }
        ],
        "derived": [
          {
            "phrase": "a collective effort",
            "meaning": "공동의 노력"
          },
          {
            "phrase": "effortless",
            "meaning": "수월한, 힘들이지 않은"
          }
        ]
      },
      {
        "id": "col-make-a-difference",
        "chunk": "make a difference",
        "meaning": "변화를 만들다, 차이를 낳다",
        "exampleEn": "Small process changes can make a difference in delivery times.",
        "exampleKo": "작은 공정 변화도 배송 시간에 차이를 만들 수 있다.",
        "emoji": "🌟",
        "similar": [
          {
            "phrase": "have an impact",
            "meaning": "영향을 미치다",
            "typeId": "collocations",
            "id": "col-have-an-impact"
          },
          {
            "phrase": "change the outcome",
            "meaning": "결과를 바꾸다"
          }
        ],
        "opposite": [
          {
            "phrase": "make no difference",
            "meaning": "아무런 차이가 없다"
          },
          {
            "phrase": "be of no consequence",
            "meaning": "중요하지 않다"
          }
        ],
        "derived": [
          {
            "phrase": "a difference-maker",
            "meaning": "판도를 바꾸는 사람·요인"
          }
        ]
      },
      {
        "id": "col-lose-ground",
        "chunk": "lose ground",
        "meaning": "입지가 좁아지다, 뒤처지다",
        "exampleEn": "The brand lost ground to cheaper competitors last year.",
        "exampleKo": "그 브랜드는 작년에 더 싼 경쟁 업체들에 입지를 잃었다.",
        "emoji": "📉",
        "similar": [
          {
            "phrase": "fall behind",
            "meaning": "뒤처지다"
          },
          {
            "phrase": "lose market share",
            "meaning": "시장 점유율을 잃다"
          }
        ],
        "opposite": [
          {
            "phrase": "make progress",
            "meaning": "진전을 이루다",
            "typeId": "collocations",
            "id": "col-make-progress"
          },
          {
            "phrase": "gain ground",
            "meaning": "입지를 넓히다"
          }
        ],
        "derived": [
          {
            "phrase": "regain lost ground",
            "meaning": "잃었던 입지를 되찾다"
          }
        ]
      },
      {
        "id": "col-take-a-chance",
        "chunk": "take a chance",
        "meaning": "기회를 잡다, 모험하다",
        "exampleEn": "We decided to take a chance on the new market, even though demand was uncertain.",
        "exampleKo": "수요가 불확실했지만 우리는 그 새 시장에 한번 걸어 보기로 했다.",
        "emoji": "🎲",
        "similar": [
          {
            "phrase": "take a risk",
            "meaning": "위험을 감수하다"
          },
          {
            "phrase": "take a gamble",
            "meaning": "모험을 걸다"
          }
        ],
        "opposite": [
          {
            "phrase": "play it safe",
            "meaning": "안전하게 가다"
          },
          {
            "phrase": "avoid the risk",
            "meaning": "위험을 피하다"
          }
        ],
        "derived": [
          {
            "phrase": "take one’s chances",
            "meaning": "운에 맡겨 보다"
          }
        ]
      },
      {
        "id": "col-take-into-account",
        "chunk": "take into account",
        "meaning": "~을 고려하다, 감안하다",
        "exampleEn": "The forecast takes into account possible delays in the supply chain.",
        "exampleKo": "그 전망은 공급망에서 생길 수 있는 지연을 고려하고 있다.",
        "emoji": "🧮",
        "similar": [
          {
            "phrase": "take into consideration",
            "meaning": "고려하다"
          },
          {
            "phrase": "keep in mind",
            "meaning": "염두에 두다",
            "typeId": "collocations",
            "id": "col-keep-in-mind"
          }
        ],
        "opposite": [
          {
            "phrase": "leave out of account",
            "meaning": "고려하지 않다"
          },
          {
            "phrase": "ignore",
            "meaning": "무시하다"
          }
        ],
        "derived": [
          {
            "phrase": "accounting for",
            "meaning": "~을 설명·반영하여"
          },
          {
            "phrase": "take account of",
            "meaning": "~을 고려하다"
          }
        ]
      },
      {
        "id": "col-take-responsibility",
        "chunk": "take responsibility",
        "meaning": "책임을 지다",
        "exampleEn": "The CEO took responsibility for the data breach and apologized.",
        "exampleKo": "최고경영자는 개인정보 유출에 대해 책임을 지고 사과했다.",
        "emoji": "🫡",
        "similar": [
          {
            "phrase": "assume responsibility",
            "meaning": "책임을 맡다"
          },
          {
            "phrase": "be accountable for",
            "meaning": "~에 대해 책임을 지다"
          }
        ],
        "opposite": [
          {
            "phrase": "shift the blame",
            "meaning": "책임을 전가하다"
          },
          {
            "phrase": "dodge responsibility",
            "meaning": "책임을 피하다"
          }
        ],
        "derived": [
          {
            "phrase": "a sense of responsibility",
            "meaning": "책임감"
          },
          {
            "phrase": "responsible",
            "meaning": "책임 있는"
          }
        ]
      },
      {
        "id": "col-take-action",
        "chunk": "take action",
        "meaning": "조치를 취하다",
        "exampleEn": "The regulator promised to take action against unsafe products.",
        "exampleKo": "규제 당국은 안전하지 않은 제품에 대해 조치를 취하겠다고 약속했다.",
        "emoji": "⚡",
        "similar": [
          {
            "phrase": "take steps",
            "meaning": "조치를 취하다"
          },
          {
            "phrase": "act on",
            "meaning": "~에 따라 행동하다"
          }
        ],
        "opposite": [
          {
            "phrase": "take no action",
            "meaning": "조치를 취하지 않다"
          },
          {
            "phrase": "sit on one’s hands",
            "meaning": "손 놓고 있다"
          }
        ],
        "derived": [
          {
            "phrase": "an action plan",
            "meaning": "실행 계획"
          },
          {
            "phrase": "actionable",
            "meaning": "바로 실행할 수 있는"
          }
        ]
      },
      {
        "id": "col-do-business",
        "chunk": "do business",
        "meaning": "사업을 하다, 거래하다",
        "exampleEn": "We have done business with that supplier for ten years.",
        "exampleKo": "우리는 그 공급업체와 10년째 거래해 왔다.",
        "emoji": "🏢",
        "similar": [
          {
            "phrase": "conduct business",
            "meaning": "사업을 하다"
          },
          {
            "phrase": "trade with",
            "meaning": "거래하다"
          }
        ],
        "opposite": [
          {
            "phrase": "cease doing business",
            "meaning": "거래를 중단하다"
          },
          {
            "phrase": "cut ties",
            "meaning": "관계를 끊다"
          }
        ],
        "derived": [
          {
            "phrase": "a business partner",
            "meaning": "사업 파트너"
          },
          {
            "phrase": "businesslike",
            "meaning": "업무다운, 실무적인"
          }
        ]
      },
      {
        "id": "col-do-ones-best",
        "chunk": "do one’s best",
        "meaning": "최선을 다하다",
        "exampleEn": "We did our best to meet the original deadline.",
        "exampleKo": "우리는 원래 마감을 지키려고 최선을 다했다.",
        "emoji": "🏅",
        "similar": [
          {
            "phrase": "make an effort",
            "meaning": "노력을 하다",
            "typeId": "collocations",
            "id": "col-make-an-effort"
          },
          {
            "phrase": "give it one’s all",
            "meaning": "전력을 다하다"
          }
        ],
        "opposite": [
          {
            "phrase": "do a half-hearted job",
            "meaning": "건성으로 하다"
          },
          {
            "phrase": "make no effort",
            "meaning": "전혀 노력하지 않다"
          }
        ],
        "derived": [
          {
            "phrase": "the best I can",
            "meaning": "내가 할 수 있는 최선"
          }
        ]
      },
      {
        "id": "col-have-an-impact",
        "chunk": "have an impact",
        "meaning": "영향을 미치다",
        "exampleEn": "The rate hike will have an impact on mortgage payments.",
        "exampleKo": "금리 인상은 주택담보대출 상환액에 영향을 미칠 것이다.",
        "emoji": "💥",
        "similar": [
          {
            "phrase": "make a difference",
            "meaning": "차이를 만들다",
            "typeId": "collocations",
            "id": "col-make-a-difference"
          },
          {
            "phrase": "have an effect",
            "meaning": "영향을 주다"
          }
        ],
        "opposite": [
          {
            "phrase": "have little impact",
            "meaning": "영향이 거의 없다"
          },
          {
            "phrase": "make no difference",
            "meaning": "차이가 없다"
          }
        ],
        "derived": [
          {
            "phrase": "impactful",
            "meaning": "영향력 있는"
          },
          {
            "phrase": "a high-impact change",
            "meaning": "영향이 큰 변화"
          }
        ]
      },
      {
        "id": "col-have-difficulty",
        "chunk": "have difficulty",
        "meaning": "어려움을 겪다",
        "exampleEn": "Several factories have difficulty finding skilled workers.",
        "exampleKo": "몇몇 공장은 숙련 인력을 구하는 데 어려움을 겪고 있다.",
        "emoji": "😓",
        "similar": [
          {
            "phrase": "have trouble",
            "meaning": "애를 먹다"
          },
          {
            "phrase": "struggle to",
            "meaning": "~하느라 애쓰다"
          }
        ],
        "opposite": [
          {
            "phrase": "have no difficulty",
            "meaning": "어려움 없이 ~하다"
          },
          {
            "phrase": "find it easy",
            "meaning": "쉽게 느끼다"
          }
        ],
        "derived": [
          {
            "phrase": "difficulty in -ing",
            "meaning": "~하는 데 어려움"
          },
          {
            "phrase": "a difficult task",
            "meaning": "어려운 일"
          }
        ]
      },
      {
        "id": "col-raise-concerns",
        "chunk": "raise concerns",
        "meaning": "우려를 제기하다",
        "exampleEn": "Several lawmakers raised concerns about the impact on small businesses.",
        "exampleKo": "몇몇 의원들은 중소기업에 미칠 영향에 대해 우려를 제기했다.",
        "emoji": "😟",
        "similar": [
          {
            "phrase": "express concerns",
            "meaning": "우려를 표하다"
          },
          {
            "phrase": "voice concerns",
            "meaning": "우려를 말하다"
          }
        ],
        "opposite": [
          {
            "phrase": "allay concerns",
            "meaning": "우려를 가라앉히다"
          },
          {
            "phrase": "ease concerns",
            "meaning": "우려를 덜다"
          }
        ],
        "derived": [
          {
            "phrase": "a matter of concern",
            "meaning": "우려되는 문제"
          },
          {
            "phrase": "concerning",
            "meaning": "우려되는"
          }
        ]
      },
      {
        "id": "col-draw-attention",
        "chunk": "draw attention",
        "meaning": "관심을 끌다, 이목을 모으다",
        "exampleEn": "The report drew attention to gaps in the pension system.",
        "exampleKo": "그 보고서는 연금 제도의 허점에 관심을 모았다.",
        "emoji": "✨",
        "similar": [
          {
            "phrase": "attract attention",
            "meaning": "관심을 끌다"
          },
          {
            "phrase": "catch someone’s eye",
            "meaning": "눈길을 끌다"
          }
        ],
        "opposite": [
          {
            "phrase": "go unnoticed",
            "meaning": "눈에 띄지 않다"
          },
          {
            "phrase": "escape notice",
            "meaning": "주의를 피하다"
          }
        ],
        "derived": [
          {
            "phrase": "attention-grabbing",
            "meaning": "이목을 끄는"
          },
          {
            "phrase": "an attention-getter",
            "meaning": "관심을 끄는 것"
          }
        ]
      },
      {
        "id": "col-pose-a-threat",
        "chunk": "pose a threat",
        "meaning": "위협이 되다, 위협을 가하다",
        "exampleEn": "Cyberattacks pose a threat to hospitals as well as banks.",
        "exampleKo": "사이버 공격은 은행뿐 아니라 병원에도 위협이 된다.",
        "emoji": "⚠️",
        "similar": [
          {
            "phrase": "present a threat",
            "meaning": "위협이 되다"
          },
          {
            "phrase": "pose a risk",
            "meaning": "위험이 되다"
          }
        ],
        "opposite": [
          {
            "phrase": "pose no threat",
            "meaning": "위협이 되지 않다"
          },
          {
            "phrase": "be harmless",
            "meaning": "해가 없다"
          }
        ],
        "derived": [
          {
            "phrase": "a threat assessment",
            "meaning": "위협 평가"
          },
          {
            "phrase": "threatening",
            "meaning": "위협적인"
          }
        ]
      },
      {
        "id": "col-pay-close-attention",
        "chunk": "pay close attention",
        "meaning": "세심한 주의를 기울이다",
        "exampleEn": "Investors are paying close attention to the central bank’s next move.",
        "exampleKo": "투자자들은 중앙은행의 다음 조치에 세심한 주의를 기울이고 있다.",
        "emoji": "👀",
        "similar": [
          {
            "phrase": "keep a close eye on",
            "meaning": "주의 깊게 지켜보다"
          },
          {
            "phrase": "take note of",
            "meaning": "유념하다"
          }
        ],
        "opposite": [
          {
            "phrase": "pay little attention",
            "meaning": "거의 주의를 기울이지 않다"
          },
          {
            "phrase": "overlook",
            "meaning": "간과하다"
          }
        ],
        "derived": [
          {
            "phrase": "attention to detail",
            "meaning": "세부 사항에 대한 주의"
          },
          {
            "phrase": "attentive",
            "meaning": "주의를 기울이는"
          }
        ]
      },
      {
        "id": "col-conduct-a-survey",
        "chunk": "conduct a survey",
        "meaning": "설문조사·조사를 실시하다",
        "exampleEn": "The ministry conducted a survey of 2,000 households last month.",
        "exampleKo": "해당 부처는 지난달 2,000가구를 대상으로 설문조사를 실시했다.",
        "emoji": "📋",
        "similar": [
          {
            "phrase": "carry out a survey",
            "meaning": "조사를 실시하다"
          },
          {
            "phrase": "do a survey",
            "meaning": "설문조사를 하다"
          }
        ],
        "opposite": [
          {
            "phrase": "rely on anecdotal evidence",
            "meaning": "일화적 근거에만 의존하다"
          }
        ],
        "derived": [
          {
            "phrase": "survey results",
            "meaning": "조사 결과"
          },
          {
            "phrase": "a survey-based study",
            "meaning": "설문에 기반한 연구"
          }
        ]
      },
      {
        "id": "col-reach-an-agreement",
        "chunk": "reach an agreement",
        "meaning": "합의에 이르다",
        "exampleEn": "After a 12-hour negotiation, the two sides reached an agreement.",
        "exampleKo": "12시간에 걸친 협상 끝에 양측은 합의에 이르렀다.",
        "emoji": "🤝",
        "similar": [
          {
            "phrase": "come to an agreement",
            "meaning": "합의에 이르다"
          },
          {
            "phrase": "strike a deal",
            "meaning": "거래를 성사시키다"
          }
        ],
        "opposite": [
          {
            "phrase": "reach an impasse",
            "meaning": "교착 상태에 빠지다"
          },
          {
            "phrase": "break off talks",
            "meaning": "협상을 결렬시키다"
          }
        ],
        "derived": [
          {
            "phrase": "a legally binding agreement",
            "meaning": "법적 구속력이 있는 합의"
          },
          {
            "phrase": "mutually agreed",
            "meaning": "상호 합의된"
          }
        ]
      },
      {
        "id": "col-issue-a-statement",
        "chunk": "issue a statement",
        "meaning": "성명을 발표하다",
        "exampleEn": "The company issued a statement denying the rumors of a sale.",
        "exampleKo": "회사는 매각 설을 부인하는 성명을 발표했다.",
        "emoji": "📢",
        "similar": [
          {
            "phrase": "release a statement",
            "meaning": "성명을 내다"
          },
          {
            "phrase": "put out a statement",
            "meaning": "성명을 발표하다"
          }
        ],
        "opposite": [
          {
            "phrase": "decline to comment",
            "meaning": "논평을 거부하다"
          },
          {
            "phrase": "remain silent",
            "meaning": "침묵하다"
          }
        ],
        "derived": [
          {
            "phrase": "an official statement",
            "meaning": "공식 성명"
          },
          {
            "phrase": "a press statement",
            "meaning": "보도 자료 성격의 성명"
          }
        ]
      },
      {
        "id": "col-set-a-precedent",
        "chunk": "set a precedent",
        "meaning": "선례를 남기다",
        "exampleEn": "The ruling could set a precedent for similar cases.",
        "exampleKo": "그 판결은 비슷한 사건에 대한 선례가 될 수 있다.",
        "emoji": "📚",
        "similar": [
          {
            "phrase": "establish a precedent",
            "meaning": "선례를 만들다"
          }
        ],
        "opposite": [
          {
            "phrase": "break with precedent",
            "meaning": "선례를 깨다"
          },
          {
            "phrase": "treat as a one-off",
            "meaning": "일회성으로 다루다"
          }
        ],
        "derived": [
          {
            "phrase": "a precedent-setting ruling",
            "meaning": "선례가 되는 판결"
          },
          {
            "phrase": "unprecedented",
            "meaning": "전례 없는"
          }
        ]
      },
      {
        "id": "col-meet-a-deadline",
        "chunk": "meet a deadline",
        "meaning": "마감을 지키다, 기한을 맞추다",
        "exampleEn": "The team worked late to meet the deadline for the quarterly report.",
        "exampleKo": "팀은 분기 보고서 마감을 맞추기 위해 늦게까지 일했다.",
        "emoji": "⏰",
        "similar": [
          {
            "phrase": "hit a deadline",
            "meaning": "마감을 맞추다"
          },
          {
            "phrase": "deliver on time",
            "meaning": "제시간에 전달하다"
          }
        ],
        "opposite": [
          {
            "phrase": "miss a deadline",
            "meaning": "마감을 놓치다"
          }
        ],
        "derived": [
          {
            "phrase": "a tight deadline",
            "meaning": "촉박한 마감",
            "typeId": "collocations",
            "id": "col-tight-deadline"
          },
          {
            "phrase": "deadline-driven",
            "meaning": "마감에 쫓기는"
          }
        ]
      },
      {
        "id": "col-come-into-effect",
        "chunk": "come into effect",
        "meaning": "발효되다, 시행되다",
        "exampleEn": "The new labor law will come into effect on January 1.",
        "exampleKo": "새 노동법은 1월 1일부터 발효된다.",
        "emoji": "📜",
        "similar": [
          {
            "phrase": "take effect",
            "meaning": "효력이 발생하다"
          },
          {
            "phrase": "enter into force",
            "meaning": "발효되다"
          }
        ],
        "opposite": [
          {
            "phrase": "be suspended",
            "meaning": "효력이 정지되다"
          },
          {
            "phrase": "be repealed",
            "meaning": "폐지되다"
          }
        ],
        "derived": [
          {
            "phrase": "the effective date",
            "meaning": "시행일, 발효일"
          }
        ]
      },
      {
        "id": "col-heavy-rain",
        "chunk": "heavy rain",
        "meaning": "억수같이 내리는 비, 폭우",
        "exampleEn": "Heavy rain forced the outdoor event to be postponed.",
        "exampleKo": "폭우로 야외 행사가 연기되었다.",
        "emoji": "🌧️",
        "similar": [
          {
            "phrase": "a downpour",
            "meaning": "폭우, 억수"
          },
          {
            "phrase": "pouring rain",
            "meaning": "쏟아지는 비"
          }
        ],
        "opposite": [
          {
            "phrase": "light rain",
            "meaning": "가벼운 비"
          },
          {
            "phrase": "a light shower",
            "meaning": "가벼운 소나기"
          }
        ],
        "derived": [
          {
            "phrase": "rainfall",
            "meaning": "강우, 강수량"
          },
          {
            "phrase": "rain-soaked",
            "meaning": "비에 흠뻑 젖은"
          }
        ]
      },
      {
        "id": "col-tight-deadline",
        "chunk": "a tight deadline",
        "meaning": "촉박한 마감",
        "exampleEn": "The team delivered the proposal under a tight deadline.",
        "exampleKo": "팀은 촉박한 마감 안에 제안서를 제출했다.",
        "emoji": "⏳",
        "similar": [
          {
            "phrase": "a short deadline",
            "meaning": "짧은 기한"
          },
          {
            "phrase": "time is tight",
            "meaning": "시간이 빠듯하다"
          }
        ],
        "opposite": [
          {
            "phrase": "a generous deadline",
            "meaning": "여유 있는 마감"
          },
          {
            "phrase": "a flexible deadline",
            "meaning": "유연한 마감"
          }
        ],
        "derived": [
          {
            "phrase": "a deadline extension",
            "meaning": "마감 연장"
          },
          {
            "phrase": "meet a deadline",
            "meaning": "마감을 지키다",
            "typeId": "collocations",
            "id": "col-meet-a-deadline"
          }
        ]
      },
      {
        "id": "col-strong-growth",
        "chunk": "strong growth",
        "meaning": "강한 성장, 견조한 성장",
        "exampleEn": "Online sales showed strong growth in the third quarter.",
        "exampleKo": "온라인 매출은 3분기에 강한 성장세를 보였다.",
        "emoji": "📊",
        "similar": [
          {
            "phrase": "solid growth",
            "meaning": "견실한 성장"
          },
          {
            "phrase": "robust growth",
            "meaning": "튼튼한 성장"
          }
        ],
        "opposite": [
          {
            "phrase": "weak growth",
            "meaning": "약한 성장"
          },
          {
            "phrase": "a sharp decline",
            "meaning": "급격한 감소"
          }
        ],
        "derived": [
          {
            "phrase": "a growth rate",
            "meaning": "성장률"
          },
          {
            "phrase": "growth-driven",
            "meaning": "성장이 이끄는"
          }
        ]
      },
      {
        "id": "col-face-a-challenge",
        "chunk": "face a challenge",
        "meaning": "어려움·과제에 직면하다",
        "exampleEn": "Manufacturers face a challenge from rising raw material costs.",
        "exampleKo": "제조업체들은 원자재 비용 상승이라는 어려움에 직면해 있다.",
        "emoji": "🧗",
        "similar": [
          {
            "phrase": "encounter a challenge",
            "meaning": "과제에 맞닥뜨리다"
          },
          {
            "phrase": "be confronted with",
            "meaning": "~에 직면하다"
          }
        ],
        "opposite": [
          {
            "phrase": "avoid a challenge",
            "meaning": "과제를 피하다"
          },
          {
            "phrase": "shrink from a challenge",
            "meaning": "과제 앞에서 움츠러들다"
          }
        ],
        "derived": [
          {
            "phrase": "a challenging task",
            "meaning": "도전적인 과제"
          },
          {
            "phrase": "challenging",
            "meaning": "힘든, 도전적인"
          }
        ]
      },
      {
        "id": "col-play-a-key-role",
        "chunk": "play a key role",
        "meaning": "핵심적인 역할을 하다",
        "exampleEn": "Exports play a key role in the country’s economic recovery.",
        "exampleKo": "수출은 그 나라의 경제 회복에서 핵심적인 역할을 한다.",
        "emoji": "🔑",
        "similar": [
          {
            "phrase": "play a central role",
            "meaning": "중심적 역할을 하다"
          },
          {
            "phrase": "be instrumental in",
            "meaning": "~에 중요한 역할을 하다"
          }
        ],
        "opposite": [
          {
            "phrase": "play a minor role",
            "meaning": "부수적인 역할만 하다"
          },
          {
            "phrase": "be on the sidelines",
            "meaning": "주변만 지키다"
          }
        ],
        "derived": [
          {
            "phrase": "a key player",
            "meaning": "핵심 인물·기업"
          }
        ]
      },
      {
        "id": "col-cut-costs",
        "chunk": "cut costs",
        "meaning": "비용을 절감하다",
        "exampleEn": "The airline plans to cut costs by reducing unprofitable routes.",
        "exampleKo": "그 항공사는 수익성이 낮은 노선을 줄여 비용을 절감할 계획이다.",
        "emoji": "✂️",
        "similar": [
          {
            "phrase": "reduce costs",
            "meaning": "비용을 줄이다"
          },
          {
            "phrase": "trim expenses",
            "meaning": "경비를 깎다"
          }
        ],
        "opposite": [
          {
            "phrase": "drive up costs",
            "meaning": "비용을 끌어올리다"
          },
          {
            "phrase": "increase spending",
            "meaning": "지출을 늘리다"
          }
        ],
        "derived": [
          {
            "phrase": "cost-cutting",
            "meaning": "비용 절감"
          },
          {
            "phrase": "cost-effective",
            "meaning": "비용 대비 효율적인"
          }
        ]
      },
      {
        "id": "col-keep-in-mind",
        "chunk": "keep in mind",
        "meaning": "염두에 두다, 명심하다",
        "exampleEn": "Keep in mind that the figures are seasonally adjusted.",
        "exampleKo": "그 수치가 계절 조정된 것이라는 점을 염두에 두세요.",
        "emoji": "🧠",
        "similar": [
          {
            "phrase": "bear in mind",
            "meaning": "명심하다"
          },
          {
            "phrase": "take into account",
            "meaning": "고려하다",
            "typeId": "collocations",
            "id": "col-take-into-account"
          }
        ],
        "opposite": [
          {
            "phrase": "lose sight of",
            "meaning": "잊어버리다, 놓치다"
          },
          {
            "phrase": "forget",
            "meaning": "잊다"
          }
        ],
        "derived": [
          {
            "phrase": "a reminder",
            "meaning": "상기시키는 것"
          },
          {
            "phrase": "mindful",
            "meaning": "유념하는"
          }
        ]
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
      "콤마나 that, if 뒤에 이어지는 내용만 바꿔 가며 여러 상황에서 소리 내어 연습해 보세요.",
      "비슷한 표현끼리 묶어 두었고, 각 카드에는 비슷(≈)·반대(↔)·파생(→) 가지가 있습니다. 사이트에 있는 표현은 눌러 바로 이동할 수 있습니다."
    ],
    "clusters": [
      {
        "id": "ss-c-opinion",
        "title": "의견을 열다",
        "visual": "bubbles",
        "hook": "내 입장을 먼저 밝혀 두는 틀입니다. concerned는 조금 주관적이고 단호하고, perspective와 view는 관점을 내세우는 느낌입니다.",
        "itemIds": [
          "ss-as-far-as-im-concerned",
          "ss-from-my-perspective",
          "ss-in-my-view"
        ]
      },
      {
        "id": "ss-c-request",
        "title": "정중히 요청하거나 양해를 구하다",
        "visual": "formality",
        "hook": "부탁은 완곡할수록 공손합니다. mind if는 일상에, wondering과 possible은 업무 이메일에 잘 씁니다.",
        "visualData": {
          "items": [
            {
              "id": "ss-do-you-mind-if-i",
              "label": "Do you mind if I…?",
              "level": 1,
              "ko": "일상"
            },
            {
              "id": "ss-i-was-wondering-if",
              "label": "I was wondering if…",
              "level": 2,
              "ko": "정중"
            },
            {
              "id": "ss-if-i-may-id-like-to",
              "label": "If I may, I’d like to…",
              "level": 3,
              "ko": "격식"
            },
            {
              "id": "ss-would-it-be-possible-to",
              "label": "Would it be possible to…?",
              "level": 4,
              "ko": "매우 격식"
            }
          ]
        },
        "itemIds": [
          "ss-do-you-mind-if-i",
          "ss-i-was-wondering-if",
          "ss-if-i-may-id-like-to",
          "ss-would-it-be-possible-to"
        ]
      },
      {
        "id": "ss-c-emphasize",
        "title": "요점을 강조하다",
        "visual": "highlight",
        "hook": "중요한 점을 앞에 두는 틀입니다. goes without saying은 이미 분명한 것, emphasize·point·worth noting은 지금 강조할 것입니다.",
        "itemIds": [
          "ss-it-goes-without-saying",
          "ss-what-id-like-to-emphasize",
          "ss-the-point-i-want-to-make",
          "ss-its-worth-noting-that"
        ]
      },
      {
        "id": "ss-c-explain",
        "title": "설명하고 구체화하다",
        "visual": "zoom",
        "hook": "말을 쉽게 바꾸거나, 뜻을 풀거나, 더 구체적으로 좁히는 틀입니다. simply는 쉽게, specific은 자세히, explain은 풀어 설명합니다.",
        "itemIds": [
          "ss-to-put-it-simply",
          "ss-what-this-means-is-that",
          "ss-to-be-more-specific",
          "ss-allow-me-to-explain"
        ]
      },
      {
        "id": "ss-c-steer",
        "title": "논점을 이끌다",
        "visual": "flow",
        "hook": "질문을 던지거나, 앞 내용을 전제로 다음 말을 이끌거나, 회의를 여는 틀입니다.",
        "visualData": {
          "steps": [
            {
              "en": "I’d like to start by…",
              "ko": "열기"
            },
            {
              "en": "The question is whether…",
              "ko": "쟁점"
            },
            {
              "en": "With that in mind…",
              "ko": "다음 행동"
            }
          ]
        },
        "itemIds": [
          "ss-id-like-to-start-by",
          "ss-the-question-is-whether",
          "ss-with-that-in-mind"
        ]
      },
      {
        "id": "ss-c-disagree",
        "title": "이견을 정중히 꺼내다",
        "visual": "formality",
        "hook": "반대 의견을 부드럽게 꺼내는 틀입니다. due respect는 이견 앞에 깔개를 깔고, correct me는 확인을 구하며 조심스럽게 말합니다.",
        "visualData": {
          "items": [
            {
              "id": "ss-correct-me-if-im-wrong",
              "label": "Correct me if I’m wrong, but…",
              "level": 2,
              "ko": "확인"
            },
            {
              "id": "ss-with-all-due-respect",
              "label": "With all due respect…",
              "level": 4,
              "ko": "격식 있는 이견"
            }
          ]
        },
        "itemIds": [
          "ss-correct-me-if-im-wrong",
          "ss-with-all-due-respect"
        ]
      }
    ],
    "compares": [
      {
        "id": "cmp-concerned-view",
        "title": "As far as I’m concerned vs In my view",
        "leftId": "ss-as-far-as-im-concerned",
        "rightId": "ss-in-my-view",
        "diff": "둘 다 의견을 열지만, as far as I’m concerned는 ‘내가 관여하는 범위에서는/내 입장에서는’처럼 조금 더 주관적이고 단호할 수 있습니다. in my view는 한 가지 견해로서 제시하는 느낌이 강합니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-mind-possible",
        "title": "Do you mind if I vs Would it be possible to",
        "leftId": "ss-do-you-mind-if-i",
        "rightId": "ss-would-it-be-possible-to",
        "diff": "Do you mind if I는 일상에서 양해를 구하는 짧고 편한 요청입니다. Would it be possible to는 한 층 격식을 갖춘 업무용 요청입니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-saying-noting",
        "title": "It goes without saying vs It’s worth noting",
        "leftId": "ss-it-goes-without-saying",
        "rightId": "ss-its-worth-noting-that",
        "diff": "It goes without saying은 이미 당연한 사실을 전제로 할 때, It’s worth noting은 지나치기 쉽지만 지금 주목할 점을 새로 짚을 때 씁니다.",
        "leftNote": null,
        "rightNote": null
      }
    ],
    "items": [
      {
        "id": "ss-as-far-as-im-concerned",
        "chunk": "As far as I’m concerned, …",
        "meaning": "내 생각에는…, 내가 보기에…",
        "exampleEn": "As far as I’m concerned, the proposal is ready to go.",
        "exampleKo": "제 생각에는 그 제안은 바로 진행해도 됩니다.",
        "emoji": "👤",
        "similar": [
          {
            "phrase": "in my view",
            "meaning": "제 견해로는"
          },
          {
            "phrase": "from my perspective",
            "meaning": "제 관점에서는"
          }
        ],
        "opposite": [
          {
            "phrase": "from someone else’s point of view",
            "meaning": "다른 사람의 관점에서는"
          }
        ],
        "derived": [
          {
            "phrase": "as far as I know",
            "meaning": "내가 알기로는 (관련 표현, 뜻은 ‘지식의 범위’)"
          }
        ]
      },
      {
        "id": "ss-from-my-perspective",
        "chunk": "From my perspective, …",
        "meaning": "제 관점에서는…",
        "exampleEn": "From my perspective, the delay is a cash-flow issue, not a demand issue.",
        "exampleKo": "제 관점에서는 그 지연은 수요 문제가 아니라 현금 흐름 문제입니다.",
        "emoji": "👓",
        "similar": [
          {
            "phrase": "from my point of view",
            "meaning": "제 관점에서"
          },
          {
            "phrase": "in my view",
            "meaning": "제 견해로는"
          },
          {
            "phrase": "as far as I’m concerned",
            "meaning": "내 생각에는"
          }
        ],
        "opposite": [
          {
            "phrase": "from another perspective",
            "meaning": "다른 관점에서"
          },
          {
            "phrase": "from their point of view",
            "meaning": "그들의 관점에서는"
          }
        ],
        "derived": [
          {
            "phrase": "a perspective on",
            "meaning": "~에 대한 시각"
          }
        ]
      },
      {
        "id": "ss-in-my-view",
        "chunk": "In my view, …",
        "meaning": "제 견해로는…",
        "exampleEn": "In my view, the tax cut will have only a modest effect.",
        "exampleKo": "제 견해로는 그 감세는 효과가 크지 않을 것입니다.",
        "emoji": "💭",
        "similar": [
          {
            "phrase": "in my opinion",
            "meaning": "제 의견으로는"
          },
          {
            "phrase": "from my perspective",
            "meaning": "제 관점에서는"
          },
          {
            "phrase": "as far as I’m concerned",
            "meaning": "내 생각에는"
          }
        ],
        "opposite": [
          {
            "phrase": "in their view",
            "meaning": "그들의 견해로는"
          }
        ],
        "derived": [
          {
            "phrase": "a point of view",
            "meaning": "관점"
          }
        ]
      },
      {
        "id": "ss-do-you-mind-if-i",
        "chunk": "Do you mind if I …?",
        "meaning": "제가 ~해도 될까요?",
        "exampleEn": "Do you mind if I join the call 10 minutes late?",
        "exampleKo": "제가 회의에 10분 늦게 들어가도 될까요?",
        "emoji": "🙏",
        "similar": [
          {
            "phrase": "would you mind if I",
            "meaning": "제가 ~해도 괜찮을까요"
          },
          {
            "phrase": "is it okay if I",
            "meaning": "제가 ~해도 될까요"
          }
        ],
        "opposite": [
          {
            "phrase": "I’d rather you didn’t",
            "meaning": "차라리 안 해 주셨으면 합니다"
          }
        ],
        "derived": [
          {
            "phrase": "if you don’t mind",
            "meaning": "괜찮으시다면"
          },
          {
            "phrase": "mind if I",
            "meaning": "내가 ~해도 돼?"
          }
        ]
      },
      {
        "id": "ss-i-was-wondering-if",
        "chunk": "I was wondering if …",
        "meaning": "~인지 궁금합니다, ~해 주실 수 있을까요 (완곡한 요청)",
        "exampleEn": "I was wondering if you could share the latest draft with us.",
        "exampleKo": "최신 초안을 저희와 공유해 주실 수 있을지 문의드립니다.",
        "emoji": "🤔",
        "similar": [
          {
            "phrase": "I wanted to ask if",
            "meaning": "~인지 여쭙고 싶었습니다"
          },
          {
            "phrase": "would it be possible to",
            "meaning": "~하는 것이 가능할까요",
            "typeId": "sentence-starters",
            "id": "ss-would-it-be-possible-to"
          }
        ],
        "opposite": [
          {
            "phrase": "Can you…? (more direct)",
            "meaning": "할 수 있나요? (공손함이 덜한 형태)"
          }
        ],
        "derived": [
          {
            "phrase": "I wonder whether",
            "meaning": "~인지 궁금하다"
          }
        ]
      },
      {
        "id": "ss-if-i-may-id-like-to",
        "chunk": "If I may, I’d like to …",
        "meaning": "괜찮으시다면 ~하고 싶습니다",
        "exampleEn": "If I may, I’d like to add one more point before we vote.",
        "exampleKo": "괜찮으시다면, 표결 전에 한 가지를 더 말씀드리고 싶습니다.",
        "emoji": "🙋",
        "similar": [
          {
            "phrase": "if I could just",
            "meaning": "잠깐 ~해도 된다면"
          },
          {
            "phrase": "allow me to",
            "meaning": "~하게 해 주십시오"
          }
        ],
        "opposite": [
          {
            "phrase": "I won’t take up more time",
            "meaning": "더 시간을 뺏지 않겠습니다"
          }
        ],
        "derived": [
          {
            "phrase": "if I may say so",
            "meaning": "이런 말씀 드려도 된다면"
          },
          {
            "phrase": "may I",
            "meaning": "~해도 될까요"
          }
        ]
      },
      {
        "id": "ss-would-it-be-possible-to",
        "chunk": "Would it be possible to …?",
        "meaning": "~하는 것이 가능할까요?",
        "exampleEn": "Would it be possible to move the meeting to Thursday afternoon?",
        "exampleKo": "회의를 목요일 오후로 옮기는 것이 가능할까요?",
        "emoji": "💌",
        "similar": [
          {
            "phrase": "could we",
            "meaning": "우리가 ~할 수 있을까요"
          },
          {
            "phrase": "I was wondering if",
            "meaning": "~인지 궁금합니다",
            "typeId": "sentence-starters",
            "id": "ss-i-was-wondering-if"
          },
          {
            "phrase": "would you be able to",
            "meaning": "~해 주실 수 있을까요"
          }
        ],
        "opposite": [
          {
            "phrase": "it wouldn’t be possible to",
            "meaning": "~하는 것은 가능하지 않을 것입니다"
          }
        ],
        "derived": [
          {
            "phrase": "if possible",
            "meaning": "가능하다면"
          },
          {
            "phrase": "a possible option",
            "meaning": "가능한 선택"
          }
        ]
      },
      {
        "id": "ss-it-goes-without-saying",
        "chunk": "It goes without saying that …",
        "meaning": "~은 말할 필요도 없다",
        "exampleEn": "It goes without saying that customer data must be protected.",
        "exampleKo": "고객 데이터를 보호해야 한다는 것은 말할 필요도 없습니다.",
        "emoji": "👌",
        "similar": [
          {
            "phrase": "needless to say",
            "meaning": "말할 것도 없이"
          },
          {
            "phrase": "it is obvious that",
            "meaning": "~은 분명하다"
          }
        ],
        "opposite": [
          {
            "phrase": "it is far from obvious that",
            "meaning": "~은 결코 분명하지 않다"
          },
          {
            "phrase": "it remains to be seen whether",
            "meaning": "~인지는 두고 봐야 한다"
          }
        ],
        "derived": [
          {
            "phrase": "a given",
            "meaning": "당연한 것"
          },
          {
            "phrase": "self-evident",
            "meaning": "자명한"
          }
        ]
      },
      {
        "id": "ss-what-id-like-to-emphasize",
        "chunk": "What I’d like to emphasize is that …",
        "meaning": "제가 강조하고 싶은 것은 ~라는 점이다",
        "exampleEn": "What I’d like to emphasize is that this is a temporary measure.",
        "exampleKo": "제가 강조하고 싶은 것은 이것이 임시 조치라는 점입니다.",
        "emoji": "💡",
        "similar": [
          {
            "phrase": "the point I want to make is that",
            "meaning": "요점은 ~이다",
            "typeId": "sentence-starters",
            "id": "ss-the-point-i-want-to-make"
          },
          {
            "phrase": "I want to stress that",
            "meaning": "~을 강조하고 싶다"
          }
        ],
        "opposite": [
          {
            "phrase": "I don’t want to overstate",
            "meaning": "과장하고 싶지는 않다"
          }
        ],
        "derived": [
          {
            "phrase": "an emphasis on",
            "meaning": "~에 대한 강조"
          },
          {
            "phrase": "emphatic",
            "meaning": "단호한, 강조하는"
          }
        ]
      },
      {
        "id": "ss-the-point-i-want-to-make",
        "chunk": "The point I want to make is that …",
        "meaning": "제가 말하고 싶은 요점은 ~이다",
        "exampleEn": "The point I want to make is that we need more time, not more staff.",
        "exampleKo": "제가 말하고 싶은 요점은 사람이 더 필요한 게 아니라 시간이 더 필요하다는 것입니다.",
        "emoji": "🎯",
        "similar": [
          {
            "phrase": "my point is that",
            "meaning": "제 말은 ~입니다"
          },
          {
            "phrase": "what I’d like to emphasize is that",
            "meaning": "강조하고 싶은 것은 ~이다",
            "typeId": "sentence-starters",
            "id": "ss-what-id-like-to-emphasize"
          }
        ],
        "opposite": [
          {
            "phrase": "that’s not the point",
            "meaning": "그게 요점이 아닙니다"
          }
        ],
        "derived": [
          {
            "phrase": "a talking point",
            "meaning": "논점, 이야깃거리"
          },
          {
            "phrase": "to the point",
            "meaning": "핵심을 찌르는"
          }
        ]
      },
      {
        "id": "ss-its-worth-noting-that",
        "chunk": "It’s worth noting that …",
        "meaning": "~라는 점은 주목할 만하다",
        "exampleEn": "It’s worth noting that unemployment fell even as hiring slowed.",
        "exampleKo": "채용이 둔화됐는데도 실업률이 떨어졌다는 점은 주목할 만합니다.",
        "emoji": "📌",
        "similar": [
          {
            "phrase": "it should be noted that",
            "meaning": "~을 알아 두어야 한다"
          },
          {
            "phrase": "note that",
            "meaning": "~을 유의하라"
          }
        ],
        "opposite": [
          {
            "phrase": "it is hardly worth mentioning that",
            "meaning": "굳이 언급할 정도는 아니다"
          }
        ],
        "derived": [
          {
            "phrase": "a noteworthy point",
            "meaning": "주목할 점"
          },
          {
            "phrase": "notably",
            "meaning": "특히, 주목할 만하게"
          }
        ]
      },
      {
        "id": "ss-to-put-it-simply",
        "chunk": "To put it simply, …",
        "meaning": "간단히 말해…",
        "exampleEn": "To put it simply, we spent more than we earned last quarter.",
        "exampleKo": "간단히 말해, 지난 분기에 우리는 번 돈보다 더 많이 썼습니다.",
        "emoji": "✏️",
        "similar": [
          {
            "phrase": "simply put",
            "meaning": "간단히 말해"
          },
          {
            "phrase": "in short",
            "meaning": "짧게 말해"
          },
          {
            "phrase": "to put it another way",
            "meaning": "다른 말로 하면",
            "typeId": "discourse-markers",
            "id": "dm-to-put-it-another-way"
          }
        ],
        "opposite": [
          {
            "phrase": "it’s more complicated than that",
            "meaning": "그렇게 단순하지 않다"
          },
          {
            "phrase": "to put it more carefully",
            "meaning": "더 조심스럽게 말하면"
          }
        ],
        "derived": [
          {
            "phrase": "a simple way to put it",
            "meaning": "간단히 표현하는 방법"
          }
        ]
      },
      {
        "id": "ss-what-this-means-is-that",
        "chunk": "What this means is that …",
        "meaning": "이것이 뜻하는 바는 ~이다",
        "exampleEn": "What this means is that prices are likely to stay high into next year.",
        "exampleKo": "이것은 물가가 내년까지 높게 유지될 가능성이 크다는 뜻입니다.",
        "emoji": "🔎",
        "similar": [
          {
            "phrase": "in other words",
            "meaning": "다시 말해",
            "typeId": "discourse-markers",
            "id": "dm-in-other-words"
          },
          {
            "phrase": "that is to say",
            "meaning": "즉"
          }
        ],
        "opposite": [
          {
            "phrase": "this does not mean that",
            "meaning": "이것이 ~를 뜻하는 것은 아니다"
          }
        ],
        "derived": [
          {
            "phrase": "the meaning of this",
            "meaning": "이것이 갖는 의미"
          }
        ]
      },
      {
        "id": "ss-to-be-more-specific",
        "chunk": "To be more specific, …",
        "meaning": "더 구체적으로 말하면…",
        "exampleEn": "To be more specific, three of the five plants will close by June.",
        "exampleKo": "더 구체적으로 말하면, 다섯 곳의 공장 중 세 곳이 6월까지 문을 닫을 것입니다.",
        "emoji": "🔬",
        "similar": [
          {
            "phrase": "more precisely",
            "meaning": "더 정확히 말하면"
          },
          {
            "phrase": "to be more exact",
            "meaning": "더 정확히 말해"
          },
          {
            "phrase": "namely",
            "meaning": "즉"
          }
        ],
        "opposite": [
          {
            "phrase": "to speak more generally",
            "meaning": "더 일반적으로 말하면"
          },
          {
            "phrase": "in broader terms",
            "meaning": "더 넓게 말하면"
          }
        ],
        "derived": [
          {
            "phrase": "a specific example",
            "meaning": "구체적인 예"
          },
          {
            "phrase": "specifically",
            "meaning": "구체적으로"
          }
        ]
      },
      {
        "id": "ss-allow-me-to-explain",
        "chunk": "Allow me to explain …",
        "meaning": "~을 설명드리겠습니다",
        "exampleEn": "Allow me to explain why the numbers look different from last year.",
        "exampleKo": "수치가 작년과 달라 보이는 이유를 설명드리겠습니다.",
        "emoji": "🗣️",
        "similar": [
          {
            "phrase": "let me explain",
            "meaning": "설명드리겠습니다"
          },
          {
            "phrase": "let me walk you through",
            "meaning": "차근차근 안내드리겠습니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I won’t go into detail",
            "meaning": "세부까지는 들어가지 않겠습니다"
          },
          {
            "phrase": "let’s skip the explanation",
            "meaning": "설명은 생략합시다"
          }
        ],
        "derived": [
          {
            "phrase": "an explanation",
            "meaning": "설명"
          },
          {
            "phrase": "explanatory",
            "meaning": "설명하는"
          }
        ]
      },
      {
        "id": "ss-id-like-to-start-by",
        "chunk": "I’d like to start by …",
        "meaning": "먼저 ~하는 것으로 시작하고 싶다",
        "exampleEn": "I’d like to start by thanking everyone who worked on the report.",
        "exampleKo": "먼저 보고서 작업에 참여해 주신 모든 분께 감사드립니다.",
        "emoji": "▶️",
        "similar": [
          {
            "phrase": "let me begin by",
            "meaning": "먼저 ~하는 것으로 시작하겠습니다"
          },
          {
            "phrase": "I’ll start with",
            "meaning": "~부터 시작하겠습니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I’d like to close by",
            "meaning": "마지막으로 ~하며 마치겠습니다"
          },
          {
            "phrase": "let me end with",
            "meaning": "~로 마치겠습니다"
          }
        ],
        "derived": [
          {
            "phrase": "a starting point",
            "meaning": "출발점"
          },
          {
            "phrase": "to start with",
            "meaning": "우선"
          }
        ]
      },
      {
        "id": "ss-the-question-is-whether",
        "chunk": "The question is whether …",
        "meaning": "문제는 ~인지 여부이다",
        "exampleEn": "The question is whether the recovery can last without government support.",
        "exampleKo": "문제는 정부 지원 없이도 회복이 지속될 수 있는지입니다.",
        "emoji": "❓",
        "similar": [
          {
            "phrase": "the issue is whether",
            "meaning": "쟁점은 ~인지 여부이다"
          },
          {
            "phrase": "it remains to be seen whether",
            "meaning": "~인지는 두고 봐야 한다"
          }
        ],
        "opposite": [
          {
            "phrase": "there is no question that",
            "meaning": "~라는 데는 의문의 여지가 없다"
          }
        ],
        "derived": [
          {
            "phrase": "a question of",
            "meaning": "~의 문제"
          },
          {
            "phrase": "unquestionably",
            "meaning": "의심할 여지 없이"
          }
        ]
      },
      {
        "id": "ss-with-that-in-mind",
        "chunk": "With that in mind, …",
        "meaning": "그 점을 염두에 두면…",
        "exampleEn": "With that in mind, we should delay the product launch by a month.",
        "exampleKo": "그 점을 염두에 두면, 제품 출시를 한 달 미루는 것이 좋겠습니다.",
        "emoji": "🧩",
        "similar": [
          {
            "phrase": "bearing that in mind",
            "meaning": "그 점을 염두에 두고"
          },
          {
            "phrase": "accordingly",
            "meaning": "그에 따라"
          }
        ],
        "opposite": [
          {
            "phrase": "regardless of that",
            "meaning": "그와 상관없이"
          },
          {
            "phrase": "that aside",
            "meaning": "그건 접어 두고"
          }
        ],
        "derived": [
          {
            "phrase": "keep in mind",
            "meaning": "염두에 두다",
            "typeId": "collocations",
            "id": "col-keep-in-mind"
          }
        ]
      },
      {
        "id": "ss-correct-me-if-im-wrong",
        "chunk": "Correct me if I’m wrong, but …",
        "meaning": "제가 틀린 거라면 정정해 주세요. 그런데…",
        "exampleEn": "Correct me if I’m wrong, but the contract expires at the end of March.",
        "exampleKo": "제가 틀린 거라면 정정해 주세요. 계약이 3월 말에 만료되는 것 아닌가요?",
        "emoji": "✍️",
        "similar": [
          {
            "phrase": "if I understand correctly",
            "meaning": "제가 올바르게 이해했다면"
          },
          {
            "phrase": "am I right in thinking that",
            "meaning": "~라고 생각하면 맞나요"
          }
        ],
        "opposite": [
          {
            "phrase": "I’m certain that",
            "meaning": "~라고 확신합니다"
          }
        ],
        "derived": [
          {
            "phrase": "a correction",
            "meaning": "정정"
          },
          {
            "phrase": "incorrectly",
            "meaning": "잘못되게"
          }
        ]
      },
      {
        "id": "ss-with-all-due-respect",
        "chunk": "With all due respect, …",
        "meaning": "존중하는 마음으로 말씀드리지만… (이견을 정중히 꺼낼 때)",
        "exampleEn": "With all due respect, I don’t think the data supports that conclusion.",
        "exampleKo": "존중하는 마음으로 말씀드리지만, 그 결론을 데이터가 뒷받침한다고 생각하지 않습니다.",
        "emoji": "🎩",
        "similar": [
          {
            "phrase": "I respectfully disagree",
            "meaning": "정중히 동의하기 어렵습니다"
          },
          {
            "phrase": "I mean no disrespect, but",
            "meaning": "무례하려는 것은 아닙니다만"
          }
        ],
        "opposite": [
          {
            "phrase": "I completely agree",
            "meaning": "전적으로 동의합니다"
          }
        ],
        "derived": [
          {
            "phrase": "respectfully",
            "meaning": "정중히"
          }
        ]
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
      "뉴스와 보고서에서 특히 자주 나오니, 전치사+명사 조합을 표현 노트에 그대로 옮겨 적어두세요.",
      "비슷한 표현끼리 묶어 두었고, 각 카드에는 비슷(≈)·반대(↔)·파생(→) 가지가 있습니다. 사이트에 있는 표현은 눌러 바로 이동할 수 있습니다."
    ],
    "clusters": [
      {
        "id": "prep-c-about",
        "title": "기준·관련",
        "visual": "spatial",
        "hook": "‘~에 대해 말하면’ 계열입니다. in terms of는 어떤 기준으로 보면, regarding·with regard to는 그 안건에 관해, in light of는 그 사실을 고려하여입니다.",
        "visualData": {
          "preps": [
            {
              "prep": "in",
              "ko": "범위·안",
              "examples": [
                "in terms of",
                "in light of"
              ]
            },
            {
              "prep": "with / regarding",
              "ko": "관련",
              "examples": [
                "with regard to",
                "regarding"
              ]
            }
          ]
        },
        "itemIds": [
          "prep-in-terms-of",
          "prep-regarding",
          "prep-with-regard-to",
          "prep-in-connection-with",
          "prep-in-light-of"
        ]
      },
      {
        "id": "prep-c-basis",
        "title": "근거·일치",
        "visual": "spatial",
        "hook": "판단의 근거이거나 기준에 맞다는 뜻입니다. on the basis of는 근거, in accordance with는 규정 준수, in line with는 기대·방향과 부합입니다.",
        "visualData": {
          "preps": [
            {
              "prep": "on",
              "ko": "근거·위",
              "examples": [
                "on the basis of"
              ]
            },
            {
              "prep": "in",
              "ko": "틀 안",
              "examples": [
                "in accordance with",
                "in line with"
              ]
            }
          ]
        },
        "itemIds": [
          "prep-on-the-basis-of",
          "prep-in-accordance-with",
          "prep-in-line-with"
        ]
      },
      {
        "id": "prep-c-purpose",
        "title": "목적·대표·수단",
        "visual": "spatial",
        "hook": "목적을 나타내는 with a view to·for the sake of, 대표하는 on behalf of, 수단인 by means of를 묶었습니다. by no means(결코 ~아니다)와 혼동하지 마세요.",
        "visualData": {
          "preps": [
            {
              "prep": "for / with",
              "ko": "목적",
              "examples": [
                "for the sake of",
                "with a view to"
              ]
            },
            {
              "prep": "on",
              "ko": "대표",
              "examples": [
                "on behalf of"
              ]
            },
            {
              "prep": "by",
              "ko": "수단",
              "examples": [
                "by means of"
              ]
            }
          ]
        },
        "itemIds": [
          "prep-with-a-view-to",
          "prep-for-the-sake-of",
          "prep-on-behalf-of",
          "prep-by-means-of"
        ]
      },
      {
        "id": "prep-c-result",
        "title": "결과·조건·추가",
        "visual": "flow",
        "hook": "원인에 따른 결과(as a result of), 일이 닥쳤을 때(in the event of), 반응(in response to), 보탬(in addition to)입니다.",
        "visualData": {
          "steps": [
            {
              "en": "원인·요청",
              "ko": "앞서 일어난 일"
            },
            {
              "en": "as a result of / in response to",
              "ko": "연결"
            },
            {
              "en": "결과·대응",
              "ko": "뒤에 오는 일"
            }
          ]
        },
        "itemIds": [
          "prep-as-a-result-of",
          "prep-in-the-event-of",
          "prep-in-response-to",
          "prep-in-addition-to"
        ]
      },
      {
        "id": "prep-c-concession",
        "title": "양보·대가·무관",
        "visual": "contrast",
        "hook": "장애가 있어도(in spite of / in the face of), 무언가를 희생하여(at the expense of), 조건과 상관없이(regardless of)입니다. in light of(고려하여)와 in spite of(불구하고)를 구별하세요.",
        "itemIds": [
          "prep-in-spite-of",
          "prep-in-the-face-of",
          "prep-at-the-expense-of",
          "prep-regardless-of"
        ]
      },
      {
        "id": "prep-c-time",
        "title": "시간의 시야",
        "visual": "timeline",
        "hook": "단기 비용과 장기 이익을 나란히 말할 때 짝으로 자주 나옵니다. in the short run은 가까운 효과, in the long run은 길게 본 결과입니다.",
        "visualData": {
          "start": "in the short run",
          "startKo": "단기",
          "end": "in the long run",
          "endKo": "장기"
        },
        "itemIds": [
          "prep-in-the-short-run",
          "prep-in-the-long-run"
        ]
      }
    ],
    "compares": [
      {
        "id": "cmp-terms-regarding",
        "title": "in terms of vs regarding",
        "leftId": "prep-in-terms-of",
        "rightId": "prep-regarding",
        "diff": "regarding는 단순히 ‘~에 관하여’입니다. in terms of는 ‘어떤 기준·측면으로 보면’이라는 렌즈가 있습니다. In terms of revenue(매출 면에서)처럼 ‘척도’가 있을 때 in terms of가 자연스럽습니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-light-spite",
        "title": "in light of vs in spite of",
        "leftId": "prep-in-light-of",
        "rightId": "prep-in-spite-of",
        "diff": "in light of는 그 사실을 ‘고려하여, 때문에’ 판단을 바꿉니다. in spite of는 그 사실 ‘에도 불구하고’ 원래 방향이 유지됩니다. 원인과 양보의 차이입니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-sake-expense",
        "title": "for the sake of vs at the expense of",
        "leftId": "prep-for-the-sake-of",
        "rightId": "prep-at-the-expense-of",
        "diff": "for the sake of는 무엇을 지키기 위해, at the expense of는 무엇을 희생시키며입니다. 한 쪽을 위하면 다른 쪽이 대가일 때 자주 대비됩니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-means-nomeans",
        "title": "by means of vs by no means (주의)",
        "leftId": "prep-by-means-of",
        "rightId": null,
        "diff": "모양이 비슷하지만 뜻이 완전히 다릅니다. by means of는 ‘~을 통해, ~을 수단으로’이고, by no means는 ‘결코 ~아니다’입니다. 반대말도, 파생어도 아닙니다. 통째로 따로 외우세요.",
        "leftNote": "~을 통해",
        "rightNote": null,
        "rightPhrase": "by no means",
        "rightMeaning": "결코 ~아니다"
      }
    ],
    "items": [
      {
        "id": "prep-in-terms-of",
        "chunk": "in terms of …",
        "meaning": "~의 관점에서, ~면에서",
        "exampleEn": "In terms of revenue, this was our strongest quarter in five years.",
        "exampleKo": "매출 면에서 이번 분기는 5년 만에 가장 좋은 실적이었습니다.",
        "emoji": "📐",
        "similar": [
          {
            "phrase": "with regard to",
            "meaning": "~에 관하여",
            "typeId": "prepositional-phrases",
            "id": "prep-with-regard-to"
          },
          {
            "phrase": "regarding",
            "meaning": "~에 관하여",
            "typeId": "prepositional-phrases",
            "id": "prep-regarding"
          },
          {
            "phrase": "when it comes to",
            "meaning": "~에 관해서 말하자면"
          }
        ],
        "opposite": [
          {
            "phrase": "leaving aside",
            "meaning": "~은 접어 두고"
          },
          {
            "phrase": "aside from",
            "meaning": "~은 별도로"
          }
        ],
        "derived": [
          {
            "phrase": "in economic terms",
            "meaning": "경제적인 관점에서"
          },
          {
            "phrase": "a term",
            "meaning": "용어, 조건"
          }
        ]
      },
      {
        "id": "prep-regarding",
        "chunk": "regarding …",
        "meaning": "~에 관하여",
        "exampleEn": "The memo answers several questions regarding the new policy.",
        "exampleKo": "그 메모는 새 정책에 관한 여러 질문에 답하고 있다.",
        "emoji": "📎",
        "similar": [
          {
            "phrase": "with regard to",
            "meaning": "~에 관하여",
            "typeId": "prepositional-phrases",
            "id": "prep-with-regard-to"
          },
          {
            "phrase": "as regards",
            "meaning": "~에 관해"
          },
          {
            "phrase": "in terms of",
            "meaning": "~의 관점에서",
            "typeId": "prepositional-phrases",
            "id": "prep-in-terms-of"
          }
        ],
        "opposite": [
          {
            "phrase": "regardless of",
            "meaning": "~에 상관없이",
            "typeId": "prepositional-phrases",
            "id": "prep-regardless-of"
          }
        ],
        "derived": [
          {
            "phrase": "regards",
            "meaning": "안부, 관련"
          }
        ]
      },
      {
        "id": "prep-with-regard-to",
        "chunk": "with regard to …",
        "meaning": "~에 관하여, ~에 대해",
        "exampleEn": "With regard to the budget, we still need approval from finance.",
        "exampleKo": "예산과 관련해서는 아직 재무 부서의 승인이 필요합니다.",
        "emoji": "📎",
        "similar": [
          {
            "phrase": "regarding",
            "meaning": "~에 관하여",
            "typeId": "prepositional-phrases",
            "id": "prep-regarding"
          },
          {
            "phrase": "in regard to",
            "meaning": "~에 관하여"
          },
          {
            "phrase": "in terms of",
            "meaning": "~의 관점에서",
            "typeId": "prepositional-phrases",
            "id": "prep-in-terms-of"
          }
        ],
        "opposite": [
          {
            "phrase": "regardless of",
            "meaning": "~에 상관없이",
            "typeId": "prepositional-phrases",
            "id": "prep-regardless-of"
          }
        ],
        "derived": [
          {
            "phrase": "regards",
            "meaning": "안부인사, 관련"
          },
          {
            "phrase": "as regards",
            "meaning": "~에 관해"
          }
        ]
      },
      {
        "id": "prep-in-connection-with",
        "chunk": "in connection with …",
        "meaning": "~와 관련하여",
        "exampleEn": "Three executives were questioned in connection with the accounting case.",
        "exampleKo": "회계 사건과 관련하여 임원 세 명이 조사를 받았다.",
        "emoji": "🔗",
        "similar": [
          {
            "phrase": "in relation to",
            "meaning": "~와 관련하여"
          },
          {
            "phrase": "related to",
            "meaning": "~와 관련된"
          },
          {
            "phrase": "regarding",
            "meaning": "~에 관하여",
            "typeId": "prepositional-phrases",
            "id": "prep-regarding"
          }
        ],
        "opposite": [
          {
            "phrase": "unrelated to",
            "meaning": "~와 무관한"
          },
          {
            "phrase": "having no connection with",
            "meaning": "~와 관련이 없는"
          }
        ],
        "derived": [
          {
            "phrase": "a connection",
            "meaning": "관련, 연결"
          },
          {
            "phrase": "disconnect",
            "meaning": "단절"
          }
        ]
      },
      {
        "id": "prep-in-light-of",
        "chunk": "in light of …",
        "meaning": "~을 고려하여, ~에 비추어",
        "exampleEn": "In light of the new data, we have revised our forecast downward.",
        "exampleKo": "새로운 데이터를 고려하여 우리는 전망치를 하향 조정했습니다.",
        "emoji": "💡",
        "similar": [
          {
            "phrase": "given",
            "meaning": "~을 고려할 때"
          },
          {
            "phrase": "considering",
            "meaning": "~을 고려하여"
          },
          {
            "phrase": "in view of",
            "meaning": "~에 비추어"
          }
        ],
        "opposite": [
          {
            "phrase": "in spite of",
            "meaning": "~에도 불구하고",
            "typeId": "prepositional-phrases",
            "id": "prep-in-spite-of"
          }
        ],
        "derived": [
          {
            "phrase": "highlight",
            "meaning": "강조하다"
          },
          {
            "phrase": "shine a light on",
            "meaning": "~을 조명하다"
          }
        ]
      },
      {
        "id": "prep-on-the-basis-of",
        "chunk": "on the basis of …",
        "meaning": "~에 근거하여",
        "exampleEn": "The loan was approved on the basis of the revised business plan.",
        "exampleKo": "그 대출은 수정된 사업 계획을 근거로 승인되었다.",
        "emoji": "📄",
        "similar": [
          {
            "phrase": "based on",
            "meaning": "~에 근거하여"
          },
          {
            "phrase": "on the grounds of",
            "meaning": "~을 이유로"
          }
        ],
        "opposite": [
          {
            "phrase": "without foundation",
            "meaning": "근거 없이"
          },
          {
            "phrase": "on no basis",
            "meaning": "아무런 근거 없이"
          }
        ],
        "derived": [
          {
            "phrase": "a basis for",
            "meaning": "~의 근거"
          },
          {
            "phrase": "basic",
            "meaning": "기본적인"
          }
        ]
      },
      {
        "id": "prep-in-accordance-with",
        "chunk": "in accordance with …",
        "meaning": "~에 따라, ~에 준하여",
        "exampleEn": "The bonus was paid in accordance with the labor agreement.",
        "exampleKo": "보너스는 노사 합의에 따라 지급되었다.",
        "emoji": "⚖️",
        "similar": [
          {
            "phrase": "in line with",
            "meaning": "~에 부합하여",
            "typeId": "prepositional-phrases",
            "id": "prep-in-line-with"
          },
          {
            "phrase": "in compliance with",
            "meaning": "~을 준수하여"
          },
          {
            "phrase": "pursuant to",
            "meaning": "~에 따라 (법률·격식)"
          }
        ],
        "opposite": [
          {
            "phrase": "in violation of",
            "meaning": "~을 위반하여"
          },
          {
            "phrase": "contrary to",
            "meaning": "~에 반하여"
          }
        ],
        "derived": [
          {
            "phrase": "accordingly",
            "meaning": "그에 따라"
          },
          {
            "phrase": "an accord",
            "meaning": "합의"
          }
        ]
      },
      {
        "id": "prep-in-line-with",
        "chunk": "in line with …",
        "meaning": "~에 부합하여, ~에 따라",
        "exampleEn": "The rate decision was in line with market expectations.",
        "exampleKo": "금리 결정은 시장의 기대에 부합했다.",
        "emoji": "📏",
        "similar": [
          {
            "phrase": "consistent with",
            "meaning": "~와 일치하여"
          },
          {
            "phrase": "in accordance with",
            "meaning": "~에 따라",
            "typeId": "prepositional-phrases",
            "id": "prep-in-accordance-with"
          }
        ],
        "opposite": [
          {
            "phrase": "out of line with",
            "meaning": "~와 어긋나서"
          },
          {
            "phrase": "at odds with",
            "meaning": "~와 불화하여, 어긋나서"
          }
        ],
        "derived": [
          {
            "phrase": "align with",
            "meaning": "~와 맞추다"
          },
          {
            "phrase": "alignment",
            "meaning": "정렬, 부합"
          }
        ]
      },
      {
        "id": "prep-with-a-view-to",
        "chunk": "with a view to …",
        "meaning": "~할 목적으로, ~을 염두에 두고",
        "exampleEn": "The bank raised capital with a view to expanding overseas.",
        "exampleKo": "그 은행은 해외 확장을 염두에 두고 자본을 확충했다.",
        "emoji": "🎯",
        "similar": [
          {
            "phrase": "with the aim of",
            "meaning": "~할 목적으로"
          },
          {
            "phrase": "in order to",
            "meaning": "~하기 위해"
          }
        ],
        "opposite": [
          {
            "phrase": "with no intention of",
            "meaning": "~할 생각 없이"
          }
        ],
        "derived": [
          {
            "phrase": "in view of (주의: 뜻이 다름)",
            "meaning": "~을 고려하여 (목적은 아님)"
          }
        ]
      },
      {
        "id": "prep-for-the-sake-of",
        "chunk": "for the sake of …",
        "meaning": "~을 위하여, ~을 위해서",
        "exampleEn": "For the sake of transparency, we published the full list of donors.",
        "exampleKo": "투명성을 위해 우리는 기부자 명단 전체를 공개했습니다.",
        "emoji": "🎁",
        "similar": [
          {
            "phrase": "for the purpose of",
            "meaning": "~할 목적으로"
          },
          {
            "phrase": "in the interest of",
            "meaning": "~을 위하여"
          }
        ],
        "opposite": [
          {
            "phrase": "at the expense of",
            "meaning": "~을 희생하여",
            "typeId": "prepositional-phrases",
            "id": "prep-at-the-expense-of"
          }
        ],
        "derived": [
          {
            "phrase": "for its own sake",
            "meaning": "그 자체로서"
          }
        ]
      },
      {
        "id": "prep-on-behalf-of",
        "chunk": "on behalf of …",
        "meaning": "~을 대표해서, ~을 대신하여",
        "exampleEn": "On behalf of the team, I’d like to thank you for your support.",
        "exampleKo": "팀을 대표하여 성원에 감사드립니다.",
        "emoji": "🪪",
        "similar": [
          {
            "phrase": "in the name of",
            "meaning": "~의 이름으로"
          },
          {
            "phrase": "representing",
            "meaning": "~을 대표하여"
          }
        ],
        "opposite": [
          {
            "phrase": "on one’s own behalf",
            "meaning": "자신을 위해, 개인적으로"
          },
          {
            "phrase": "in a personal capacity",
            "meaning": "개인 자격으로"
          }
        ],
        "derived": [
          {
            "phrase": "a representative",
            "meaning": "대표자"
          },
          {
            "phrase": "on our behalf",
            "meaning": "우리를 대신하여"
          }
        ]
      },
      {
        "id": "prep-by-means-of",
        "chunk": "by means of …",
        "meaning": "~에 의하여, ~을 통해",
        "exampleEn": "The company cut emissions by means of a shift to renewable energy.",
        "exampleKo": "그 회사는 재생에너지로의 전환을 통해 배출량을 줄였다.",
        "emoji": "🛠️",
        "similar": [
          {
            "phrase": "through",
            "meaning": "~을 통해"
          },
          {
            "phrase": "by using",
            "meaning": "~을 사용하여"
          },
          {
            "phrase": "via",
            "meaning": "~을 거쳐"
          }
        ],
        "opposite": [
          {
            "phrase": "without the aid of",
            "meaning": "~의 도움 없이"
          },
          {
            "phrase": "without using",
            "meaning": "~을 쓰지 않고"
          }
        ],
        "derived": [
          {
            "phrase": "a means of",
            "meaning": "~의 수단"
          },
          {
            "phrase": "a means to an end",
            "meaning": "목적을 위한 수단"
          }
        ]
      },
      {
        "id": "prep-as-a-result-of",
        "chunk": "as a result of …",
        "meaning": "~의 결과로",
        "exampleEn": "As a result of the strike, deliveries were delayed by two weeks.",
        "exampleKo": "파업의 결과로 배송이 2주 늦어졌다.",
        "emoji": "➡️",
        "similar": [
          {
            "phrase": "because of",
            "meaning": "~때문에"
          },
          {
            "phrase": "due to",
            "meaning": "~로 인해"
          },
          {
            "phrase": "owing to",
            "meaning": "~로 인하여"
          }
        ],
        "opposite": [
          {
            "phrase": "in spite of",
            "meaning": "~에도 불구하고",
            "typeId": "prepositional-phrases",
            "id": "prep-in-spite-of"
          },
          {
            "phrase": "despite",
            "meaning": "~에도 불구하고"
          }
        ],
        "derived": [
          {
            "phrase": "as a result",
            "meaning": "그 결과",
            "typeId": "discourse-markers",
            "id": "dm-as-a-result"
          },
          {
            "phrase": "resulting from",
            "meaning": "~에서 비롯된"
          }
        ]
      },
      {
        "id": "prep-in-the-event-of",
        "chunk": "in the event of …",
        "meaning": "~하는 경우에, ~이 발생하면",
        "exampleEn": "In the event of a delay, passengers will be notified by text.",
        "exampleKo": "지연이 발생할 경우 승객에게 문자로 안내됩니다.",
        "emoji": "🚨",
        "similar": [
          {
            "phrase": "in case of",
            "meaning": "~할 경우에"
          },
          {
            "phrase": "if … should happen",
            "meaning": "~가 일어날 경우"
          }
        ],
        "opposite": [
          {
            "phrase": "in the absence of",
            "meaning": "~이 없을 경우에"
          },
          {
            "phrase": "unless",
            "meaning": "~하지 않는 한"
          }
        ],
        "derived": [
          {
            "phrase": "in the event that",
            "meaning": "~할 경우에 (절을 이끌 때)"
          }
        ]
      },
      {
        "id": "prep-in-response-to",
        "chunk": "in response to …",
        "meaning": "~에 대응하여, ~에 대한 응답으로",
        "exampleEn": "In response to customer complaints, the app released a fix the same day.",
        "exampleKo": "고객 불만에 대응하여 그 앱은 당일 수정 버전을 내놓았다.",
        "emoji": "↩️",
        "similar": [
          {
            "phrase": "in answer to",
            "meaning": "~에 대한 답으로"
          },
          {
            "phrase": "reacting to",
            "meaning": "~에 반응하여"
          }
        ],
        "opposite": [
          {
            "phrase": "on one’s own initiative",
            "meaning": "자발적으로"
          },
          {
            "phrase": "without being asked",
            "meaning": "요청 받지 않고"
          }
        ],
        "derived": [
          {
            "phrase": "a response",
            "meaning": "대응, 응답"
          },
          {
            "phrase": "unresponsive",
            "meaning": "반응이 없는"
          }
        ]
      },
      {
        "id": "prep-in-addition-to",
        "chunk": "in addition to …",
        "meaning": "~에 더하여, ~외에도",
        "exampleEn": "In addition to higher wages, the union asked for more flexible hours.",
        "exampleKo": "노조는 임금 인상 외에도 더 유연한 근무 시간을 요구했다.",
        "emoji": "➕",
        "similar": [
          {
            "phrase": "as well as",
            "meaning": "~뿐 아니라"
          },
          {
            "phrase": "besides",
            "meaning": "~외에"
          },
          {
            "phrase": "on top of",
            "meaning": "~에 더해"
          }
        ],
        "opposite": [
          {
            "phrase": "instead of",
            "meaning": "~ 대신에"
          },
          {
            "phrase": "excluding",
            "meaning": "~을 제외하고"
          }
        ],
        "derived": [
          {
            "phrase": "an additional cost",
            "meaning": "추가 비용"
          },
          {
            "phrase": "additionally",
            "meaning": "추가로"
          }
        ]
      },
      {
        "id": "prep-in-spite-of",
        "chunk": "in spite of …",
        "meaning": "~에도 불구하고",
        "exampleEn": "In spite of the recession, the firm hired 200 more workers.",
        "exampleKo": "경기 침체에도 불구하고 그 회사는 직원 200명을 더 채용했다.",
        "emoji": "🪨",
        "similar": [
          {
            "phrase": "despite",
            "meaning": "~에도 불구하고"
          },
          {
            "phrase": "notwithstanding",
            "meaning": "~에도 불구하고 (격식)"
          }
        ],
        "opposite": [
          {
            "phrase": "because of",
            "meaning": "~때문에"
          },
          {
            "phrase": "in light of",
            "meaning": "~을 고려하여",
            "typeId": "prepositional-phrases",
            "id": "prep-in-light-of"
          }
        ],
        "derived": [
          {
            "phrase": "spite (주의: 뜻이 다름)",
            "meaning": "악의 (숙어 in spite of와 어원만 같고 뜻은 다름)"
          }
        ]
      },
      {
        "id": "prep-in-the-face-of",
        "chunk": "in the face of …",
        "meaning": "~에 직면하여, ~에도 불구하고",
        "exampleEn": "In the face of falling demand, the factory reduced overtime.",
        "exampleKo": "수요 감소에 직면하여 공장은 잔업을 줄였다.",
        "emoji": "🧱",
        "similar": [
          {
            "phrase": "when confronted with",
            "meaning": "~에 직면했을 때"
          },
          {
            "phrase": "in spite of",
            "meaning": "~에도 불구하고",
            "typeId": "prepositional-phrases",
            "id": "prep-in-spite-of"
          }
        ],
        "opposite": [
          {
            "phrase": "in the absence of",
            "meaning": "~이 없는 상황에서"
          }
        ],
        "derived": [
          {
            "phrase": "face a challenge",
            "meaning": "어려움에 직면하다",
            "typeId": "collocations",
            "id": "col-face-a-challenge"
          },
          {
            "phrase": "come face to face with",
            "meaning": "~와 정면으로 마주하다"
          }
        ]
      },
      {
        "id": "prep-at-the-expense-of",
        "chunk": "at the expense of …",
        "meaning": "~을 희생하여, ~을 대가로",
        "exampleEn": "The company grew market share at the expense of profit margins.",
        "exampleKo": "그 회사는 이익률을 희생하면서 시장 점유율을 늘렸다.",
        "emoji": "💸",
        "similar": [
          {
            "phrase": "at the cost of",
            "meaning": "~을 대가로"
          },
          {
            "phrase": "to the detriment of",
            "meaning": "~에 손해가 되게"
          }
        ],
        "opposite": [
          {
            "phrase": "for the sake of",
            "meaning": "~을 위하여",
            "typeId": "prepositional-phrases",
            "id": "prep-for-the-sake-of"
          },
          {
            "phrase": "without sacrificing",
            "meaning": "~을 희생하지 않고"
          }
        ],
        "derived": [
          {
            "phrase": "an expense",
            "meaning": "비용"
          },
          {
            "phrase": "at little expense",
            "meaning": "거의 비용 없이"
          }
        ]
      },
      {
        "id": "prep-regardless-of",
        "chunk": "regardless of …",
        "meaning": "~에 상관없이, ~와 무관하게",
        "exampleEn": "The rule applies to all staff, regardless of rank.",
        "exampleKo": "그 규정은 직급에 상관없이 모든 직원에게 적용됩니다.",
        "emoji": "🚫",
        "similar": [
          {
            "phrase": "irrespective of",
            "meaning": "~와 무관하게"
          },
          {
            "phrase": "no matter",
            "meaning": "~에 상관없이"
          }
        ],
        "opposite": [
          {
            "phrase": "depending on",
            "meaning": "~에 따라"
          },
          {
            "phrase": "with regard to",
            "meaning": "~에 관하여",
            "typeId": "prepositional-phrases",
            "id": "prep-with-regard-to"
          }
        ],
        "derived": [
          {
            "phrase": "regardless",
            "meaning": "어쨌든, 상관없이"
          }
        ]
      },
      {
        "id": "prep-in-the-short-run",
        "chunk": "in the short run",
        "meaning": "단기적으로는",
        "exampleEn": "In the short run, the hiring freeze will save money.",
        "exampleKo": "단기적으로는 채용 동결이 비용을 아껴 줄 것입니다.",
        "emoji": "⏱️",
        "similar": [
          {
            "phrase": "in the short term",
            "meaning": "단기적으로"
          },
          {
            "phrase": "in the near term",
            "meaning": "가까운 시일 안에"
          }
        ],
        "opposite": [
          {
            "phrase": "in the long run",
            "meaning": "장기적으로는",
            "typeId": "prepositional-phrases",
            "id": "prep-in-the-long-run"
          },
          {
            "phrase": "in the long term",
            "meaning": "장기적으로"
          }
        ],
        "derived": [
          {
            "phrase": "a short-run cost",
            "meaning": "단기 비용"
          }
        ]
      },
      {
        "id": "prep-in-the-long-run",
        "chunk": "in the long run",
        "meaning": "장기적으로는, 길게 보면",
        "exampleEn": "In the long run, investing in training will reduce turnover.",
        "exampleKo": "장기적으로는 교육에 투자하는 것이 이직을 줄일 것입니다.",
        "emoji": "🔭",
        "similar": [
          {
            "phrase": "over the long term",
            "meaning": "장기적으로"
          },
          {
            "phrase": "in the long term",
            "meaning": "장기적으로는"
          }
        ],
        "opposite": [
          {
            "phrase": "in the short run",
            "meaning": "단기적으로는",
            "typeId": "prepositional-phrases",
            "id": "prep-in-the-short-run"
          },
          {
            "phrase": "in the short term",
            "meaning": "단기적으로"
          }
        ],
        "derived": [
          {
            "phrase": "a long-run effect",
            "meaning": "장기 효과"
          }
        ]
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
      "아래는 업무·뉴스에서도 자주 듣는 표현 위주입니다. 너무 희귀하거나 구어체에만 쓰는 말은 넣지 않았습니다.",
      "비슷한 표현끼리 묶어 두었고, 각 카드에는 비슷(≈)·반대(↔)·파생(→) 가지가 있습니다. 사이트에 있는 표현은 눌러 바로 이동할 수 있습니다."
    ],
    "clusters": [
      {
        "id": "idm-c-conclusion",
        "title": "요점과 결론",
        "visual": "highlight",
        "hook": "잡다한 이야기를 걷어 내고 ‘결국 남는 것’을 가리킵니다. bottom line은 핵심(또는 손익), at the end of the day는 궁극적 판단, rule of thumb은 대략적인 기준입니다.",
        "itemIds": [
          "idm-at-the-end-of-the-day",
          "idm-the-bottom-line",
          "idm-a-rule-of-thumb"
        ]
      },
      {
        "id": "idm-c-together",
        "title": "협력과 소통",
        "visual": "theme",
        "hook": "같은 이해(on the same page), 같은 처지(in the same boat), 정보 공유(in the loop / touch base), 서로 이득(win-win)을 묶었습니다. 동의와 공동운명을 구별하세요.",
        "itemIds": [
          "idm-on-the-same-page",
          "idm-in-the-same-boat",
          "idm-keep-someone-in-the-loop",
          "idm-touch-base",
          "idm-a-win-win-situation"
        ]
      },
      {
        "id": "idm-c-startend",
        "title": "시작·마무리·원점",
        "visual": "process",
        "hook": "일을 띄우고(get the ball rolling), 오늘은 접고(call it a day), 실패해 처음으로 돌아가는(back to square one) 흐름입니다.",
        "visualData": {
          "steps": [
            "get the ball rolling",
            "call it a day",
            "back to square one"
          ]
        },
        "itemIds": [
          "idm-get-the-ball-rolling",
          "idm-call-it-a-day",
          "idm-back-to-square-one"
        ]
      },
      {
        "id": "idm-c-effort",
        "title": "노력의 온도",
        "visual": "scale",
        "hook": "얼마나 쉽게, 얼마나 애쓰느냐의 표현입니다. piece of cake는 아주 쉽고, extra mile은 기대 이상, cut corners는 대충, outside the box는 틀을 깨는 생각입니다.",
        "visualData": {
          "low": "cut corners",
          "high": "go the extra mile"
        },
        "itemIds": [
          "idm-a-piece-of-cake",
          "idm-go-the-extra-mile",
          "idm-cut-corners",
          "idm-think-outside-the-box"
        ]
      },
      {
        "id": "idm-c-hidden",
        "title": "뜻밖과 이면",
        "visual": "iceberg",
        "hook": "눈에 보이는 것이 전부가 아니거나, 갑자기 닥치거나, 걸러 들어야 하는 표현입니다. 빙산은 ‘드러난 것은 일부’를 그림으로 기억하세요.",
        "itemIds": [
          "idm-out-of-the-blue",
          "idm-a-blessing-in-disguise",
          "idm-the-tip-of-the-iceberg",
          "idm-on-thin-ice",
          "idm-take-with-a-grain-of-salt"
        ]
      }
    ],
    "compares": [
      {
        "id": "cmp-corners-mile",
        "title": "cut corners vs go the extra mile",
        "leftId": "idm-cut-corners",
        "rightId": "idm-go-the-extra-mile",
        "diff": "cut corners는 비용이나 절차를 줄이며 대충 하는 부정적인 표현, go the extra mile은 기대 이상으로 애쓰는 긍정적인 반대입니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-ball-square",
        "title": "get the ball rolling vs back to square one",
        "leftId": "idm-get-the-ball-rolling",
        "rightId": "idm-back-to-square-one",
        "diff": "get the ball rolling은 일을 시작하거나 흐름을 띄우는 것이고, back to square one은 실패·거절 등으로 처음으로 돌아가는 것입니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-page-boat",
        "title": "on the same page vs in the same boat",
        "leftId": "idm-on-the-same-page",
        "rightId": "idm-in-the-same-boat",
        "diff": "on the same page는 이해나 의견이 같다(정렬)는 뜻이고, in the same boat는 처지나 곤경을 함께한다는 뜻입니다. 회의 전 이해를 맞출 때는 same page, 어려운 상황을 공유할 때는 same boat입니다.",
        "leftNote": null,
        "rightNote": null
      }
    ],
    "items": [
      {
        "id": "idm-at-the-end-of-the-day",
        "chunk": "at the end of the day",
        "meaning": "결국에는, 궁극적으로",
        "exampleEn": "At the end of the day, what matters is whether customers come back.",
        "exampleKo": "결국 중요한 것은 고객이 다시 찾아오느냐입니다.",
        "emoji": "🌇",
        "similar": [
          {
            "phrase": "when all is said and done",
            "meaning": "모든 것이 끝나고 나면"
          },
          {
            "phrase": "in the final analysis",
            "meaning": "궁극적으로 분석하면"
          },
          {
            "phrase": "the bottom line",
            "meaning": "핵심은",
            "typeId": "idioms",
            "id": "idm-the-bottom-line"
          }
        ],
        "opposite": [
          {
            "phrase": "at first glance",
            "meaning": "언뜻 보기에는"
          },
          {
            "phrase": "to begin with",
            "meaning": "우선, 애초에"
          }
        ],
        "derived": [
          {
            "phrase": "end-of-day (EOD)",
            "meaning": "업무 종료 시점 (관련 업무 표현)"
          }
        ]
      },
      {
        "id": "idm-the-bottom-line",
        "chunk": "the bottom line",
        "meaning": "핵심, 요점 (회계에서는 최종 손익)",
        "exampleEn": "The bottom line is that we can’t launch until the safety tests are done.",
        "exampleKo": "핵심은 안전 시험이 끝날 때까지 출시할 수 없다는 것입니다.",
        "emoji": "🧾",
        "similar": [
          {
            "phrase": "the upshot",
            "meaning": "결론, 요지"
          },
          {
            "phrase": "the long and short of it",
            "meaning": "요컨대"
          },
          {
            "phrase": "at the end of the day",
            "meaning": "결국",
            "typeId": "idioms",
            "id": "idm-at-the-end-of-the-day"
          }
        ],
        "opposite": [
          {
            "phrase": "a side issue",
            "meaning": "부차적인 문제"
          },
          {
            "phrase": "beside the point",
            "meaning": "요점에서 벗어난"
          }
        ],
        "derived": [
          {
            "phrase": "the company’s bottom line",
            "meaning": "회사의 최종 손익"
          }
        ]
      },
      {
        "id": "idm-a-rule-of-thumb",
        "chunk": "a rule of thumb",
        "meaning": "경험칙, 대략적인 기준",
        "exampleEn": "As a rule of thumb, we keep cash reserves equal to three months of expenses.",
        "exampleKo": "경험칙으로, 우리는 비용 3개월분에 해당하는 현금 보유액을 유지합니다.",
        "emoji": "👍",
        "similar": [
          {
            "phrase": "a rough guide",
            "meaning": "대략적인 지침"
          },
          {
            "phrase": "a practical estimate",
            "meaning": "실용적인 추정치"
          }
        ],
        "opposite": [
          {
            "phrase": "an exact formula",
            "meaning": "정확한 공식"
          },
          {
            "phrase": "a hard-and-fast rule",
            "meaning": "융통성 없는 규칙"
          }
        ],
        "derived": [
          {
            "phrase": "a rule-of-thumb estimate",
            "meaning": "경험칙에 따른 추산"
          }
        ]
      },
      {
        "id": "idm-on-the-same-page",
        "chunk": "on the same page",
        "meaning": "같은 이해·생각을 공유하다",
        "exampleEn": "Let’s have a short call so we’re all on the same page before the meeting.",
        "exampleKo": "회의 전에 모두가 같은 이해를 갖도록 짧게 통화하죠.",
        "emoji": "📄",
        "similar": [
          {
            "phrase": "in agreement",
            "meaning": "의견이 같다"
          },
          {
            "phrase": "of one mind",
            "meaning": "한마음으로"
          },
          {
            "phrase": "aligned",
            "meaning": "방향이 맞춰진"
          }
        ],
        "opposite": [
          {
            "phrase": "at odds",
            "meaning": "의견이 어긋나다"
          },
          {
            "phrase": "talk past each other",
            "meaning": "서로 말이 엇갈리다"
          }
        ],
        "derived": [
          {
            "phrase": "get on the same page",
            "meaning": "이해를 맞추다"
          }
        ]
      },
      {
        "id": "idm-in-the-same-boat",
        "chunk": "in the same boat",
        "meaning": "같은 처지에 있다",
        "exampleEn": "Small shops and large chains are in the same boat when rents go up.",
        "exampleKo": "임대료가 오르면 작은 가게나 대형 체인이나 같은 처지다.",
        "emoji": "🚣",
        "similar": [
          {
            "phrase": "in the same situation",
            "meaning": "같은 상황에 있다"
          },
          {
            "phrase": "in this together",
            "meaning": "함께 이 일을 겪고 있다"
          }
        ],
        "opposite": [
          {
            "phrase": "on opposite sides",
            "meaning": "서로 반대편에 있다"
          },
          {
            "phrase": "in a different position",
            "meaning": "처지가 다르다"
          }
        ],
        "derived": [
          {
            "phrase": "we’re all in the same boat",
            "meaning": "우리 모두 같은 처지다"
          }
        ]
      },
      {
        "id": "idm-keep-someone-in-the-loop",
        "chunk": "keep someone in the loop",
        "meaning": "진행 상황을 공유하다, 소식을 빠짐없이 알려 주다",
        "exampleEn": "Please keep me in the loop on any changes to the schedule.",
        "exampleKo": "일정에 변동이 있으면 저에게도 공유해 주세요.",
        "emoji": "🔁",
        "similar": [
          {
            "phrase": "keep someone informed",
            "meaning": "계속 알려 주다"
          },
          {
            "phrase": "keep someone posted",
            "meaning": "소식을 전하다"
          },
          {
            "phrase": "copy someone in",
            "meaning": "참조로 넣다"
          }
        ],
        "opposite": [
          {
            "phrase": "leave someone out of the loop",
            "meaning": "정보를 빼놓다"
          },
          {
            "phrase": "keep someone in the dark",
            "meaning": "모르게 하다"
          }
        ],
        "derived": [
          {
            "phrase": "in the loop",
            "meaning": "정보를 공유받는 상태"
          },
          {
            "phrase": "out of the loop",
            "meaning": "정보에서 제외된 상태"
          }
        ]
      },
      {
        "id": "idm-touch-base",
        "chunk": "touch base",
        "meaning": "간단히 연락하다, 짧게 확인하다",
        "exampleEn": "I’ll touch base with legal and get back to you tomorrow.",
        "exampleKo": "법무 팀과 한번 확인하고 내일 다시 연락드리겠습니다.",
        "emoji": "📞",
        "similar": [
          {
            "phrase": "check in",
            "meaning": "안부를 묻거나 진행을 확인하다"
          },
          {
            "phrase": "have a quick word",
            "meaning": "짧게 이야기하다"
          },
          {
            "phrase": "catch up briefly",
            "meaning": "잠깐 근황을 나누다"
          }
        ],
        "opposite": [
          {
            "phrase": "lose touch",
            "meaning": "연락이 끊기다"
          },
          {
            "phrase": "go silent",
            "meaning": "소식이 없다"
          }
        ],
        "derived": [
          {
            "phrase": "a quick touch-base",
            "meaning": "짧은 확인 통화·회의 (업무 구어)"
          }
        ]
      },
      {
        "id": "idm-a-win-win-situation",
        "chunk": "a win-win situation",
        "meaning": "서로 이득이 되는 상황",
        "exampleEn": "Sharing the warehouse created a win-win situation for both companies.",
        "exampleKo": "창고를 공유하면서 두 회사 모두에 이득이 되는 상황이 되었다.",
        "emoji": "🏆",
        "similar": [
          {
            "phrase": "mutually beneficial",
            "meaning": "서로에게 이득이 되는"
          },
          {
            "phrase": "a two-way gain",
            "meaning": "쌍방의 이득"
          }
        ],
        "opposite": [
          {
            "phrase": "a zero-sum game",
            "meaning": "한쪽이 이득이면 한쪽이 손해인 상황"
          },
          {
            "phrase": "a lose-lose situation",
            "meaning": "양쪽 모두 손해인 상황"
          }
        ],
        "derived": [
          {
            "phrase": "a win-win deal",
            "meaning": "윈윈 거래"
          }
        ]
      },
      {
        "id": "idm-get-the-ball-rolling",
        "chunk": "get the ball rolling",
        "meaning": "일을 시작하다, 분위기를 띄우다",
        "exampleEn": "I’ll send a rough outline to get the ball rolling.",
        "exampleKo": "일을 시작하기 위해 대략적인 개요를 보내 드리겠습니다.",
        "emoji": "⚽",
        "similar": [
          {
            "phrase": "get started",
            "meaning": "시작하다"
          },
          {
            "phrase": "set things in motion",
            "meaning": "일을 움직이기 시작하다"
          },
          {
            "phrase": "kick things off",
            "meaning": "시작하다"
          }
        ],
        "opposite": [
          {
            "phrase": "put on hold",
            "meaning": "보류하다"
          },
          {
            "phrase": "back to square one",
            "meaning": "원점으로 돌아가다",
            "typeId": "idioms",
            "id": "idm-back-to-square-one"
          }
        ],
        "derived": [
          {
            "phrase": "keep the ball rolling",
            "meaning": "흐름을 이어 가다"
          }
        ]
      },
      {
        "id": "idm-call-it-a-day",
        "chunk": "call it a day",
        "meaning": "오늘 일은 여기까지 하다, 작업을 마치다",
        "exampleEn": "We’ve fixed the critical bugs, so let’s call it a day.",
        "exampleKo": "치명적인 오류는 고쳤으니 오늘은 이만 마무리합시다.",
        "emoji": "🚪",
        "similar": [
          {
            "phrase": "wrap up",
            "meaning": "마무리하다"
          },
          {
            "phrase": "finish for now",
            "meaning": "일단 마치다"
          }
        ],
        "opposite": [
          {
            "phrase": "keep going",
            "meaning": "계속하다"
          },
          {
            "phrase": "go the extra mile",
            "meaning": "한 걸음 더 애쓰다",
            "typeId": "idioms",
            "id": "idm-go-the-extra-mile"
          }
        ],
        "derived": [
          {
            "phrase": "that will be all for today",
            "meaning": "오늘은 여기까지입니다"
          }
        ]
      },
      {
        "id": "idm-back-to-square-one",
        "chunk": "back to square one",
        "meaning": "원점으로 돌아가다",
        "exampleEn": "The court rejected the deal, so we’re back to square one.",
        "exampleKo": "법원이 그 합의를 받아들이지 않아 우리는 원점으로 돌아갔다.",
        "emoji": "1️⃣",
        "similar": [
          {
            "phrase": "back to the drawing board",
            "meaning": "계획 단계부터 다시 하다"
          },
          {
            "phrase": "start over",
            "meaning": "처음부터 다시 하다"
          }
        ],
        "opposite": [
          {
            "phrase": "be back on track",
            "meaning": "다시 궤도에 오르다"
          },
          {
            "phrase": "get the ball rolling",
            "meaning": "일을 시작하다",
            "typeId": "idioms",
            "id": "idm-get-the-ball-rolling"
          }
        ],
        "derived": [
          {
            "phrase": "square one",
            "meaning": "출발점, 원점"
          }
        ]
      },
      {
        "id": "idm-a-piece-of-cake",
        "chunk": "a piece of cake",
        "meaning": "식은 죽 먹기",
        "exampleEn": "Once we had the data, writing the report was a piece of cake.",
        "exampleKo": "데이터만 갖추고 나니 보고서 작성은 식은 죽 먹기였다.",
        "emoji": "🍰",
        "similar": [
          {
            "phrase": "easy as pie",
            "meaning": "아주 쉽다"
          },
          {
            "phrase": "a breeze",
            "meaning": "식은 죽 먹기"
          },
          {
            "phrase": "child’s play",
            "meaning": "애들 장난"
          }
        ],
        "opposite": [
          {
            "phrase": "easier said than done",
            "meaning": "말은 쉽고 실행은 어렵다"
          },
          {
            "phrase": "an uphill battle",
            "meaning": "험난한 싸움"
          },
          {
            "phrase": "no walk in the park",
            "meaning": "결코 쉽지 않다"
          }
        ],
        "derived": [
          {
            "phrase": "a cakewalk",
            "meaning": "아주 쉬운 일"
          }
        ]
      },
      {
        "id": "idm-go-the-extra-mile",
        "chunk": "go the extra mile",
        "meaning": "한 걸음 더 애쓰다, 기대 이상으로 하다",
        "exampleEn": "The support team went the extra mile to restore the client’s data overnight.",
        "exampleKo": "지원 팀은 밤새 고객 데이터를 복구하기 위해 한 걸음 더 애썼다.",
        "emoji": "🏃",
        "similar": [
          {
            "phrase": "go above and beyond",
            "meaning": "기대 이상으로 하다"
          },
          {
            "phrase": "make an extra effort",
            "meaning": "추가로 노력하다"
          }
        ],
        "opposite": [
          {
            "phrase": "do the bare minimum",
            "meaning": "최소한만 하다"
          },
          {
            "phrase": "cut corners",
            "meaning": "대충 하다",
            "typeId": "idioms",
            "id": "idm-cut-corners"
          }
        ],
        "derived": [
          {
            "phrase": "the extra mile",
            "meaning": "그 이상의 노력"
          }
        ]
      },
      {
        "id": "idm-cut-corners",
        "chunk": "cut corners",
        "meaning": "대충 하다, 비용·절차를 깎다 (부정적)",
        "exampleEn": "If we cut corners on testing, we may pay for it later.",
        "exampleKo": "테스트를 대충 하면 나중에 대가를 치를 수 있습니다.",
        "emoji": "✂️",
        "similar": [
          {
            "phrase": "take shortcuts",
            "meaning": "지름길을 택하다, 절차를 건너뛰다"
          },
          {
            "phrase": "skimp on",
            "meaning": "~을 인색하게 하다, 대충하다"
          }
        ],
        "opposite": [
          {
            "phrase": "go the extra mile",
            "meaning": "한 걸음 더 애쓰다",
            "typeId": "idioms",
            "id": "idm-go-the-extra-mile"
          },
          {
            "phrase": "do a thorough job",
            "meaning": "꼼꼼히 하다"
          }
        ],
        "derived": [
          {
            "phrase": "corner-cutting",
            "meaning": "대충하기, 비용·절차 줄이기"
          }
        ]
      },
      {
        "id": "idm-think-outside-the-box",
        "chunk": "think outside the box",
        "meaning": "기존의 틀을 깨고 생각하다, 창의적으로 생각하다",
        "exampleEn": "We need to think outside the box to cut costs without layoffs.",
        "exampleKo": "해고 없이 비용을 줄이려면 기존의 틀을 깨고 생각해야 합니다.",
        "emoji": "📦",
        "similar": [
          {
            "phrase": "take a creative approach",
            "meaning": "창의적으로 접근하다"
          },
          {
            "phrase": "break the mold",
            "meaning": "틀을 깨다"
          }
        ],
        "opposite": [
          {
            "phrase": "think in conventional terms",
            "meaning": "기존 방식대로 생각하다"
          },
          {
            "phrase": "stick to the playbook",
            "meaning": "정해진 방법만 따르다"
          }
        ],
        "derived": [
          {
            "phrase": "an out-of-the-box idea",
            "meaning": "틀을 깬 아이디어"
          }
        ]
      },
      {
        "id": "idm-out-of-the-blue",
        "chunk": "out of the blue",
        "meaning": "갑자기, 난데없이",
        "exampleEn": "The CEO resigned out of the blue, without naming a successor.",
        "exampleKo": "후임자를 지명하지 않은 채 CEO가 갑자기 사임했다.",
        "emoji": "⚡",
        "similar": [
          {
            "phrase": "all of a sudden",
            "meaning": "갑자기"
          },
          {
            "phrase": "without warning",
            "meaning": "예고 없이"
          },
          {
            "phrase": "from nowhere",
            "meaning": "느닷없이"
          }
        ],
        "opposite": [
          {
            "phrase": "as expected",
            "meaning": "예상대로"
          },
          {
            "phrase": "as planned",
            "meaning": "계획대로"
          },
          {
            "phrase": "predictably",
            "meaning": "예상대로"
          }
        ],
        "derived": [
          {
            "phrase": "a bolt from the blue",
            "meaning": "청천벽력, 갑작스러운 사건"
          }
        ]
      },
      {
        "id": "idm-a-blessing-in-disguise",
        "chunk": "a blessing in disguise",
        "meaning": "전화위복, 겉보기엔 나쁜 일이 오히려 득이 됨",
        "exampleEn": "Losing that client was a blessing in disguise; it pushed us to improve the product.",
        "exampleKo": "그 고객을 잃은 것은 전화위복이었다. 제품 개선을 서두르게 되었기 때문이다.",
        "emoji": "🎁",
        "similar": [
          {
            "phrase": "a hidden blessing",
            "meaning": "숨은 복"
          },
          {
            "phrase": "a stroke of luck in hindsight",
            "meaning": "지나고 보니 행운이었던 일"
          }
        ],
        "opposite": [
          {
            "phrase": "a poisoned chalice",
            "meaning": "겉보기엔 좋지만 실속은 해로운 것"
          }
        ],
        "derived": [
          {
            "phrase": "blessings in disguise",
            "meaning": "전화위복인 일들"
          }
        ]
      },
      {
        "id": "idm-the-tip-of-the-iceberg",
        "chunk": "the tip of the iceberg",
        "meaning": "빙산의 일각",
        "exampleEn": "The refunds we issued are only the tip of the iceberg.",
        "exampleKo": "우리가 지급한 환불은 빙산의 일각일 뿐입니다.",
        "emoji": "🗻",
        "similar": [
          {
            "phrase": "only a fraction",
            "meaning": "극히 일부일 뿐"
          },
          {
            "phrase": "just the beginning of the problem",
            "meaning": "문제의 시작일 뿐"
          }
        ],
        "opposite": [
          {
            "phrase": "the whole picture",
            "meaning": "전체 그림"
          },
          {
            "phrase": "the full extent",
            "meaning": "전모"
          }
        ],
        "derived": [
          {
            "phrase": "below the surface",
            "meaning": "표면 아래, 숨은 부분"
          }
        ]
      },
      {
        "id": "idm-on-thin-ice",
        "chunk": "on thin ice",
        "meaning": "아슬아슬한 처지에 있다, 입장이 위태롭다",
        "exampleEn": "After missing two deadlines, the contractor is on thin ice.",
        "exampleKo": "마감을 두 번 놓친 뒤 그 하청업체는 입장이 매우 불안해졌다.",
        "emoji": "🧊",
        "similar": [
          {
            "phrase": "in a precarious position",
            "meaning": "위태로운 입장에 있다"
          },
          {
            "phrase": "walking a tightrope",
            "meaning": "아슬아슬하게 줄타기하다"
          }
        ],
        "opposite": [
          {
            "phrase": "on solid ground",
            "meaning": "안정된 입장에 있다"
          },
          {
            "phrase": "in a safe position",
            "meaning": "안전한 처지에 있다"
          }
        ],
        "derived": [
          {
            "phrase": "skate on thin ice",
            "meaning": "위험한 선을 밟다"
          }
        ]
      },
      {
        "id": "idm-take-with-a-grain-of-salt",
        "chunk": "take something with a grain of salt",
        "meaning": "걸러서 듣다, 액면 그대로 믿지 않다",
        "exampleEn": "Take the early polling numbers with a grain of salt; the sample is small.",
        "exampleKo": "초기 여론조사 수치는 표본이 작으니 걸러서 보세요.",
        "emoji": "🧂",
        "similar": [
          {
            "phrase": "be skeptical of",
            "meaning": "~을 회의적으로 보다"
          },
          {
            "phrase": "not take at face value",
            "meaning": "액면 그대로 받아들이지 않다"
          }
        ],
        "opposite": [
          {
            "phrase": "take at face value",
            "meaning": "액면 그대로 믿다"
          },
          {
            "phrase": "take as gospel",
            "meaning": "절대적으로 믿다"
          }
        ],
        "derived": [
          {
            "phrase": "a pinch of salt",
            "meaning": "한 꼬집의 소금 (영국식 유사 표현)"
          }
        ]
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
      "회의에서 바로 쓸 수 있도록, 앞뒤 문장과 함께 소리 내어 연습해 보세요.",
      "비슷한 표현끼리 묶어 두었고, 각 카드에는 비슷(≈)·반대(↔)·파생(→) 가지가 있습니다. 사이트에 있는 표현은 눌러 바로 이동할 수 있습니다."
    ],
    "clusters": [
      {
        "id": "dm-c-contrast",
        "title": "대조·양보",
        "visual": "fork",
        "hook": "앞 내용을 인정한 뒤 다른 면을 답니다. on the other hand는 대등한 다른 측면, on the contrary는 앞 말을 뒤집어 부정, that said·nevertheless는 ‘그래도’의 양보입니다.",
        "visualData": {
          "from": "앞말",
          "left": "On the other hand",
          "leftKo": "다른 측면",
          "right": "On the contrary",
          "rightKo": "앞말 부정"
        },
        "itemIds": [
          "dm-on-the-other-hand",
          "dm-on-the-contrary",
          "dm-that-said",
          "dm-having-said-that",
          "dm-nevertheless",
          "dm-at-the-same-time"
        ]
      },
      {
        "id": "dm-c-add",
        "title": "추가·예시·초점",
        "visual": "flow",
        "hook": "같은 방향으로 보태거나(what’s more), 예를 들거나(for instance), 그중 하나를 부각하거나(in particular), 순서를 열거나(first of all)입니다.",
        "visualData": {
          "steps": [
            {
              "en": "First of all",
              "ko": "순서"
            },
            {
              "en": "What’s more",
              "ko": "추가"
            },
            {
              "en": "For instance / In particular",
              "ko": "예시·초점"
            }
          ]
        },
        "itemIds": [
          "dm-whats-more",
          "dm-for-instance",
          "dm-in-particular",
          "dm-first-of-all"
        ]
      },
      {
        "id": "dm-c-rephrase",
        "title": "바꿔 말하기·솔직함",
        "visual": "highlight",
        "hook": "같은 내용을 쉽게 다시 말하거나(in other words), 사실을 분명히 하거나(as a matter of fact), 솔직한 태도를 드러냅니다(to be honest).",
        "itemIds": [
          "dm-in-other-words",
          "dm-to-put-it-another-way",
          "dm-as-a-matter-of-fact",
          "dm-to-be-honest-with-you"
        ]
      },
      {
        "id": "dm-c-shift",
        "title": "화제 전환",
        "visual": "flow",
        "hook": "직전 말에 이어서 곁가지를 꺼내거나(speaking of which), 새 가지를 덧붙이거나(by the way), 다른 곳에서 동시에 일어나는 일을 말하거나(meanwhile), 조건에 따라 다음을 정합니다(in that case).",
        "visualData": {
          "steps": [
            {
              "en": "앞 화제",
              "ko": "지금 하던 말"
            },
            {
              "en": "Speaking of which / By the way",
              "ko": "전환"
            },
            {
              "en": "새 이야기",
              "ko": "곁가지·관련 화제"
            }
          ]
        },
        "itemIds": [
          "dm-speaking-of-which",
          "dm-by-the-way",
          "dm-meanwhile",
          "dm-in-that-case"
        ]
      },
      {
        "id": "dm-c-close",
        "title": "결과·결론",
        "visual": "flow",
        "hook": "원인에 따른 결과(as a result), 모든 것을 고려한 판단(all things considered), 요점 정리(to sum up)로 말을 닫습니다.",
        "visualData": {
          "steps": [
            {
              "en": "사실·근거",
              "ko": "앞에서 나온 내용"
            },
            {
              "en": "As a result / All things considered",
              "ko": "정리"
            },
            {
              "en": "To sum up",
              "ko": "결론"
            }
          ]
        },
        "itemIds": [
          "dm-as-a-result",
          "dm-all-things-considered",
          "dm-to-sum-up"
        ]
      }
    ],
    "compares": [
      {
        "id": "cmp-otherhand-contrary",
        "title": "on the other hand vs on the contrary",
        "leftId": "dm-on-the-other-hand",
        "rightId": "dm-on-the-contrary",
        "diff": "on the other hand는 앞 말을 인정한 채 다른 측면을 덧붙입니다. (비싸다. 반면에 튼튼하다.) on the contrary는 앞 말이 틀렸다고 뒤집어 말합니다. (비싸지 않다. 그와 반대로 오히려 싸다.)",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-said-whatsmore",
        "title": "that said vs what’s more",
        "leftId": "dm-that-said",
        "rightId": "dm-whats-more",
        "diff": "that said(그리고 having said that)는 앞 내용을 인정한 뒤 제한이나 반전을 답니다. what’s more는 같은 방향으로 정보를 하나 더 보탭니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-result-nevertheless",
        "title": "as a result vs nevertheless",
        "leftId": "dm-as-a-result",
        "rightId": "dm-nevertheless",
        "diff": "as a result는 앞 일의 결과를 이끕니다. nevertheless는 앞 일에도 불구하고 예상과 다른 일이 이어짐을 이끕니다. 인과와 양보의 차이입니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-btw-speaking",
        "title": "by the way vs speaking of which",
        "leftId": "dm-by-the-way",
        "rightId": "dm-speaking-of-which",
        "diff": "speaking of which는 방금 나온 말에 걸려 관련 화제로 넘어갑니다. by the way는 꼭 직전 말과 연결되지 않아도 되는, 보다 자유로운 곁가지입니다.",
        "leftNote": null,
        "rightNote": null
      }
    ],
    "items": [
      {
        "id": "dm-on-the-other-hand",
        "chunk": "on the other hand",
        "meaning": "반면에, 다른 한편으로",
        "exampleEn": "The plan would create jobs. On the other hand, it would raise the deficit.",
        "exampleKo": "그 계획은 일자리를 만들 것입니다. 반면에 재정적자도 늘릴 것입니다.",
        "emoji": "↔️",
        "similar": [
          {
            "phrase": "by contrast",
            "meaning": "대조적으로"
          },
          {
            "phrase": "alternatively",
            "meaning": "다른 한편으로는"
          }
        ],
        "opposite": [
          {
            "phrase": "similarly",
            "meaning": "마찬가지로 (같은 방향)"
          },
          {
            "phrase": "on the contrary",
            "meaning": "그와 반대로 (앞말을 뒤집어 부정함)",
            "typeId": "discourse-markers",
            "id": "dm-on-the-contrary"
          }
        ],
        "derived": [
          {
            "phrase": "the other hand",
            "meaning": "다른 한쪽"
          }
        ]
      },
      {
        "id": "dm-on-the-contrary",
        "chunk": "on the contrary",
        "meaning": "그와 반대로 (앞 말을 부정하고 반대 사실을 말함)",
        "exampleEn": "The plan is not too expensive. On the contrary, it may save money in the first year.",
        "exampleKo": "그 계획은 너무 비싸지 않습니다. 그와 반대로, 첫해에 비용을 절약할 수도 있습니다.",
        "emoji": "🔄",
        "similar": [
          {
            "phrase": "quite the opposite",
            "meaning": "정반대이다"
          },
          {
            "phrase": "far from it",
            "meaning": "전혀 그렇지 않다"
          },
          {
            "phrase": "not at all",
            "meaning": "전혀 아니다"
          }
        ],
        "opposite": [
          {
            "phrase": "on the other hand",
            "meaning": "반면에 (앞말을 부정하지 않고 다른 측면만 덧붙임)",
            "typeId": "discourse-markers",
            "id": "dm-on-the-other-hand"
          }
        ],
        "derived": [
          {
            "phrase": "a contrary view",
            "meaning": "반대 견해"
          },
          {
            "phrase": "contrary to",
            "meaning": "~에 반하여"
          }
        ]
      },
      {
        "id": "dm-that-said",
        "chunk": "that said",
        "meaning": "그렇긴 하지만, 그런데도",
        "exampleEn": "Sales were weak in Europe. That said, demand in Asia remained strong.",
        "exampleKo": "유럽 매출은 부진했습니다. 그렇긴 하지만 아시아 수요는 여전히 견조했습니다.",
        "emoji": "↩️",
        "similar": [
          {
            "phrase": "having said that",
            "meaning": "그렇다고는 해도",
            "typeId": "discourse-markers",
            "id": "dm-having-said-that"
          },
          {
            "phrase": "nevertheless",
            "meaning": "그럼에도",
            "typeId": "discourse-markers",
            "id": "dm-nevertheless"
          },
          {
            "phrase": "still",
            "meaning": "그래도"
          }
        ],
        "opposite": [
          {
            "phrase": "what’s more",
            "meaning": "게다가 (같은 방향으로 덧붙임)",
            "typeId": "discourse-markers",
            "id": "dm-whats-more"
          },
          {
            "phrase": "moreover",
            "meaning": "더욱이"
          }
        ],
        "derived": [
          {
            "phrase": "that being said",
            "meaning": "그렇긴 하지만"
          }
        ]
      },
      {
        "id": "dm-having-said-that",
        "chunk": "having said that",
        "meaning": "그렇다고는 해도, 그런 점에서",
        "exampleEn": "The design looks great. Having said that, we still need to cut the cost.",
        "exampleKo": "디자인은 훌륭해 보입니다. 그렇다고는 해도, 비용은 여전히 줄여야 합니다.",
        "emoji": "↩️",
        "similar": [
          {
            "phrase": "that said",
            "meaning": "그렇긴 하지만",
            "typeId": "discourse-markers",
            "id": "dm-that-said"
          },
          {
            "phrase": "even so",
            "meaning": "그렇다 해도"
          },
          {
            "phrase": "nevertheless",
            "meaning": "그럼에도",
            "typeId": "discourse-markers",
            "id": "dm-nevertheless"
          }
        ],
        "opposite": [
          {
            "phrase": "what’s more",
            "meaning": "게다가",
            "typeId": "discourse-markers",
            "id": "dm-whats-more"
          },
          {
            "phrase": "moreover",
            "meaning": "더욱이"
          }
        ],
        "derived": [
          {
            "phrase": "that being said",
            "meaning": "그렇긴 하지만"
          }
        ]
      },
      {
        "id": "dm-nevertheless",
        "chunk": "nevertheless",
        "meaning": "그럼에도 불구하고",
        "exampleEn": "The data is incomplete. Nevertheless, the trend is clear.",
        "exampleKo": "데이터가 완전하지는 않습니다. 그럼에도 추세는 분명합니다.",
        "emoji": "🪨",
        "similar": [
          {
            "phrase": "nonetheless",
            "meaning": "그럼에도"
          },
          {
            "phrase": "even so",
            "meaning": "그렇다 해도"
          },
          {
            "phrase": "however",
            "meaning": "그러나"
          },
          {
            "phrase": "that said",
            "meaning": "그렇긴 하지만",
            "typeId": "discourse-markers",
            "id": "dm-that-said"
          }
        ],
        "opposite": [
          {
            "phrase": "therefore",
            "meaning": "그러므로 (양보가 아니라 결과)"
          },
          {
            "phrase": "accordingly",
            "meaning": "따라서"
          }
        ],
        "derived": [
          {
            "phrase": "nonetheless (거의 같은 말)",
            "meaning": "거의 동일한 유의어"
          }
        ]
      },
      {
        "id": "dm-at-the-same-time",
        "chunk": "at the same time",
        "meaning": "동시에, 그러면서도",
        "exampleEn": "We want to grow quickly. At the same time, we can’t ignore quality.",
        "exampleKo": "우리는 빠르게 성장하고 싶습니다. 그러면서도 품질을 무시할 수는 없습니다.",
        "emoji": "⏱️",
        "similar": [
          {
            "phrase": "meanwhile",
            "meaning": "한편",
            "typeId": "discourse-markers",
            "id": "dm-meanwhile"
          },
          {
            "phrase": "equally",
            "meaning": "마찬가지로, 동시에"
          },
          {
            "phrase": "yet",
            "meaning": "그러면서도"
          }
        ],
        "opposite": [
          {
            "phrase": "at a different time",
            "meaning": "다른 시점에"
          },
          {
            "phrase": "separately",
            "meaning": "따로"
          }
        ],
        "derived": [
          {
            "phrase": "simultaneous",
            "meaning": "동시의"
          }
        ]
      },
      {
        "id": "dm-whats-more",
        "chunk": "what’s more",
        "meaning": "게다가, 더욱이",
        "exampleEn": "The bid came in under budget. What’s more, the vendor can start next week.",
        "exampleKo": "입찰가가 예산 아래로 들어왔습니다. 게다가 그 업체는 다음 주부터 착수할 수 있습니다.",
        "emoji": "➕",
        "similar": [
          {
            "phrase": "moreover",
            "meaning": "더욱이"
          },
          {
            "phrase": "furthermore",
            "meaning": "게다가"
          },
          {
            "phrase": "in addition",
            "meaning": "덧붙여"
          }
        ],
        "opposite": [
          {
            "phrase": "that said",
            "meaning": "그렇긴 하지만",
            "typeId": "discourse-markers",
            "id": "dm-that-said"
          },
          {
            "phrase": "however",
            "meaning": "그러나"
          }
        ],
        "derived": [
          {
            "phrase": "more to the point",
            "meaning": "더 핵심적인 것은"
          }
        ]
      },
      {
        "id": "dm-for-instance",
        "chunk": "for instance",
        "meaning": "예를 들어",
        "exampleEn": "Some costs are hard to cut. For instance, rent is fixed for three years.",
        "exampleKo": "일부 비용은 줄이기 어렵습니다. 예를 들어 임대료는 3년 동안 고정입니다.",
        "emoji": "👉",
        "similar": [
          {
            "phrase": "for example",
            "meaning": "예를 들어"
          },
          {
            "phrase": "e.g.",
            "meaning": "예를 들어"
          },
          {
            "phrase": "such as",
            "meaning": "~와 같은"
          }
        ],
        "opposite": [
          {
            "phrase": "in general",
            "meaning": "일반적으로"
          },
          {
            "phrase": "as a rule",
            "meaning": "대체로"
          }
        ],
        "derived": [
          {
            "phrase": "an instance of",
            "meaning": "~의 사례"
          },
          {
            "phrase": "in this instance",
            "meaning": "이번 경우에는"
          }
        ]
      },
      {
        "id": "dm-in-particular",
        "chunk": "in particular",
        "meaning": "특히",
        "exampleEn": "The slowdown hit manufacturers. In particular, chipmakers saw orders fall.",
        "exampleKo": "둔화는 제조업을 강타했다. 특히 반도체 업체들의 주문이 줄었다.",
        "emoji": "⭐",
        "similar": [
          {
            "phrase": "especially",
            "meaning": "특히"
          },
          {
            "phrase": "particularly",
            "meaning": "특히"
          },
          {
            "phrase": "specifically",
            "meaning": "구체적으로"
          }
        ],
        "opposite": [
          {
            "phrase": "in general",
            "meaning": "일반적으로"
          },
          {
            "phrase": "as a whole",
            "meaning": "전체적으로"
          }
        ],
        "derived": [
          {
            "phrase": "a particular case",
            "meaning": "특정 사례"
          }
        ]
      },
      {
        "id": "dm-first-of-all",
        "chunk": "first of all",
        "meaning": "우선, 무엇보다 먼저",
        "exampleEn": "First of all, we need to agree on the timeline.",
        "exampleKo": "우선, 일정에 합의해야 합니다.",
        "emoji": "1️⃣",
        "similar": [
          {
            "phrase": "first",
            "meaning": "먼저"
          },
          {
            "phrase": "to begin with",
            "meaning": "우선"
          },
          {
            "phrase": "in the first place",
            "meaning": "애초에, 우선"
          }
        ],
        "opposite": [
          {
            "phrase": "lastly",
            "meaning": "마지막으로"
          },
          {
            "phrase": "to sum up",
            "meaning": "요약하면",
            "typeId": "discourse-markers",
            "id": "dm-to-sum-up"
          }
        ],
        "derived": [
          {
            "phrase": "the first point",
            "meaning": "첫 번째 요점"
          }
        ]
      },
      {
        "id": "dm-in-other-words",
        "chunk": "in other words",
        "meaning": "다시 말해, 즉",
        "exampleEn": "The factory ran at 60 percent capacity. In other words, it was far from busy.",
        "exampleKo": "공장은 가동률 60%로 돌아갔다. 다시 말해, 전혀 바쁜 상태가 아니었다.",
        "emoji": "🔁",
        "similar": [
          {
            "phrase": "to put it another way",
            "meaning": "다른 말로 하면",
            "typeId": "discourse-markers",
            "id": "dm-to-put-it-another-way"
          },
          {
            "phrase": "that is",
            "meaning": "즉"
          },
          {
            "phrase": "namely",
            "meaning": "바로, 즉"
          }
        ],
        "opposite": [
          {
            "phrase": "for instance",
            "meaning": "예를 들어 (바꿔 말하기가 아니라 예시)",
            "typeId": "discourse-markers",
            "id": "dm-for-instance"
          }
        ],
        "derived": [
          {
            "phrase": "worded differently",
            "meaning": "달리 표현된"
          }
        ]
      },
      {
        "id": "dm-to-put-it-another-way",
        "chunk": "to put it another way",
        "meaning": "다른 말로 하면",
        "exampleEn": "To put it another way, we are growing too fast for our systems to keep up.",
        "exampleKo": "다른 말로 하면, 우리 시스템이 따라가지 못할 만큼 빠르게 성장하고 있습니다.",
        "emoji": "🔄",
        "similar": [
          {
            "phrase": "in other words",
            "meaning": "다시 말해",
            "typeId": "discourse-markers",
            "id": "dm-in-other-words"
          },
          {
            "phrase": "to rephrase",
            "meaning": "말을 바꿔 하면"
          }
        ],
        "opposite": [
          {
            "phrase": "to put it more vaguely",
            "meaning": "더 모호하게 말하면"
          }
        ],
        "derived": [
          {
            "phrase": "another way of putting it",
            "meaning": "다른 표현 방식"
          }
        ]
      },
      {
        "id": "dm-as-a-matter-of-fact",
        "chunk": "as a matter of fact",
        "meaning": "사실, 실은",
        "exampleEn": "As a matter of fact, we already tested that idea last year.",
        "exampleKo": "사실, 우리는 그 아이디어를 작년에 이미 시험해 봤습니다.",
        "emoji": "✅",
        "similar": [
          {
            "phrase": "in fact",
            "meaning": "사실"
          },
          {
            "phrase": "actually",
            "meaning": "실제로는"
          },
          {
            "phrase": "indeed",
            "meaning": "정말로, 사실"
          }
        ],
        "opposite": [
          {
            "phrase": "supposedly",
            "meaning": "그렇다고들 하지만, 실제인지는 불분명하다"
          },
          {
            "phrase": "not in fact",
            "meaning": "사실은 그렇지 않다"
          }
        ],
        "derived": [
          {
            "phrase": "a matter-of-fact tone",
            "meaning": "담담하고 사실적인 말투 (파생 형용사, 뜻이 조금 달라짐)"
          }
        ]
      },
      {
        "id": "dm-to-be-honest-with-you",
        "chunk": "to be honest with you",
        "meaning": "솔직히 말해서",
        "exampleEn": "To be honest with you, I don’t think we’ll finish by Friday.",
        "exampleKo": "솔직히 말해서, 금요일까지 끝낼 수 있을 것 같지는 않습니다.",
        "emoji": "🙋",
        "similar": [
          {
            "phrase": "frankly",
            "meaning": "솔직히"
          },
          {
            "phrase": "to tell you the truth",
            "meaning": "사실을 말하자면"
          },
          {
            "phrase": "in all honesty",
            "meaning": "정말 솔직히"
          }
        ],
        "opposite": [
          {
            "phrase": "to put it mildly",
            "meaning": "완곡히 말하면 (더 부드럽게)"
          }
        ],
        "derived": [
          {
            "phrase": "honesty",
            "meaning": "정직함"
          }
        ]
      },
      {
        "id": "dm-speaking-of-which",
        "chunk": "speaking of which",
        "meaning": "말이 나와서 말인데",
        "exampleEn": "The report is due on Monday. Speaking of which, who is writing the summary?",
        "exampleKo": "보고서는 월요일까지입니다. 말이 나와서 말인데, 요약은 누가 쓰나요?",
        "emoji": "💬",
        "similar": [
          {
            "phrase": "that reminds me",
            "meaning": "그러고 보니, 생각난 김에"
          },
          {
            "phrase": "on that note",
            "meaning": "그 연장선에서"
          },
          {
            "phrase": "while we’re on the subject",
            "meaning": "그 이야기가 나온 김에"
          }
        ],
        "opposite": [
          {
            "phrase": "getting back to the point",
            "meaning": "본론으로 돌아가서"
          },
          {
            "phrase": "to return to the subject",
            "meaning": "원래 주제로 돌아가서"
          }
        ],
        "derived": [
          {
            "phrase": "speaking of",
            "meaning": "~이야기가 나와서"
          }
        ]
      },
      {
        "id": "dm-by-the-way",
        "chunk": "by the way",
        "meaning": "그런데, 덧붙이자면",
        "exampleEn": "By the way, did you see the revised price list?",
        "exampleKo": "그런데, 수정된 가격표 보셨나요?",
        "emoji": "👋",
        "similar": [
          {
            "phrase": "incidentally",
            "meaning": "덧붙이자면"
          },
          {
            "phrase": "speaking of which",
            "meaning": "말이 나와서 말인데 (직전 화제와 더 직접 연결)",
            "typeId": "discourse-markers",
            "id": "dm-speaking-of-which"
          }
        ],
        "opposite": [
          {
            "phrase": "back to the main point",
            "meaning": "본론으로 돌아가서"
          },
          {
            "phrase": "to return to the subject",
            "meaning": "원래 주제로 돌아가서"
          }
        ],
        "derived": [
          {
            "phrase": "a side note",
            "meaning": "옆가지 메모"
          },
          {
            "phrase": "a by-the-way remark",
            "meaning": "슬쩍 덧붙인 말"
          }
        ]
      },
      {
        "id": "dm-meanwhile",
        "chunk": "meanwhile",
        "meaning": "한편, 그와 동시에",
        "exampleEn": "The government announced tax cuts. Meanwhile, local governments warned of shortfalls.",
        "exampleKo": "정부는 감세를 발표했다. 한편 지방정부는 재원 부족을 경고했다.",
        "emoji": "⏸️",
        "similar": [
          {
            "phrase": "in the meantime",
            "meaning": "그 동안에"
          },
          {
            "phrase": "at the same time",
            "meaning": "동시에",
            "typeId": "discourse-markers",
            "id": "dm-at-the-same-time"
          }
        ],
        "opposite": [
          {
            "phrase": "afterwards",
            "meaning": "그 후에"
          },
          {
            "phrase": "later",
            "meaning": "나중에"
          }
        ],
        "derived": [
          {
            "phrase": "the meantime",
            "meaning": "그 사이"
          }
        ]
      },
      {
        "id": "dm-in-that-case",
        "chunk": "in that case",
        "meaning": "그렇다면, 그럴 경우에는",
        "exampleEn": "If the client wants changes, we’ll need another week. In that case, let’s reset the deadline.",
        "exampleKo": "고객이 수정을 원하면 일주일이 더 필요합니다. 그렇다면 마감을 다시 잡죠.",
        "emoji": "↪️",
        "similar": [
          {
            "phrase": "if so",
            "meaning": "그렇다면"
          },
          {
            "phrase": "under those circumstances",
            "meaning": "그런 상황에서는"
          }
        ],
        "opposite": [
          {
            "phrase": "otherwise",
            "meaning": "그렇지 않다면"
          },
          {
            "phrase": "if not",
            "meaning": "그렇지 않으면"
          }
        ],
        "derived": [
          {
            "phrase": "in this case",
            "meaning": "이 경우에는"
          }
        ]
      },
      {
        "id": "dm-as-a-result",
        "chunk": "as a result",
        "meaning": "그 결과",
        "exampleEn": "Shipping costs soared. As a result, several retailers raised prices.",
        "exampleKo": "운송비가 급등했다. 그 결과 몇몇 유통업체가 가격을 올렸다.",
        "emoji": "➡️",
        "similar": [
          {
            "phrase": "therefore",
            "meaning": "그러므로"
          },
          {
            "phrase": "consequently",
            "meaning": "그 결과"
          },
          {
            "phrase": "thus",
            "meaning": "따라서"
          }
        ],
        "opposite": [
          {
            "phrase": "nevertheless",
            "meaning": "그럼에도 불구하고",
            "typeId": "discourse-markers",
            "id": "dm-nevertheless"
          },
          {
            "phrase": "even so",
            "meaning": "그렇다 해도"
          }
        ],
        "derived": [
          {
            "phrase": "as a result of",
            "meaning": "~의 결과로",
            "typeId": "prepositional-phrases",
            "id": "prep-as-a-result-of"
          },
          {
            "phrase": "a resulting change",
            "meaning": "그에 따른 변화"
          }
        ]
      },
      {
        "id": "dm-all-things-considered",
        "chunk": "all things considered",
        "meaning": "모든 것을 고려하면",
        "exampleEn": "All things considered, postponing the launch was the safer choice.",
        "exampleKo": "모든 것을 고려하면, 출시를 미룬 것이 더 안전한 선택이었습니다.",
        "emoji": "⚖️",
        "similar": [
          {
            "phrase": "on balance",
            "meaning": "종합적으로 보면"
          },
          {
            "phrase": "all in all",
            "meaning": "대체로"
          },
          {
            "phrase": "taking everything into account",
            "meaning": "모든 것을 고려하여"
          }
        ],
        "opposite": [
          {
            "phrase": "looking at only one factor",
            "meaning": "한 요소만 보고"
          },
          {
            "phrase": "narrowly speaking",
            "meaning": "좁게 보면"
          }
        ],
        "derived": [
          {
            "phrase": "a considered view",
            "meaning": "숙고한 견해"
          }
        ]
      },
      {
        "id": "dm-to-sum-up",
        "chunk": "to sum up",
        "meaning": "요약하면",
        "exampleEn": "To sum up, we should delay the project until funding is confirmed.",
        "exampleKo": "요약하면, 자금이 확정될 때까지 프로젝트를 미뤄야 합니다.",
        "emoji": "🧾",
        "similar": [
          {
            "phrase": "in summary",
            "meaning": "요약하면"
          },
          {
            "phrase": "to summarize",
            "meaning": "요약하자면"
          },
          {
            "phrase": "in short",
            "meaning": "짧게 말해"
          }
        ],
        "opposite": [
          {
            "phrase": "to begin with",
            "meaning": "우선, 먼저"
          },
          {
            "phrase": "first of all",
            "meaning": "우선",
            "typeId": "discourse-markers",
            "id": "dm-first-of-all"
          }
        ],
        "derived": [
          {
            "phrase": "a summary",
            "meaning": "요약"
          },
          {
            "phrase": "a summing-up",
            "meaning": "총정리"
          }
        ]
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
      "특히 I’m looking forward to 뒤에는 동명사(-ing)가 옵니다. 외운 뒤에는 반드시 내 상황의 문장으로 바꿔 입으로 말해 보세요.",
      "비슷한 표현끼리 묶어 두었고, 각 카드에는 비슷(≈)·반대(↔)·파생(→) 가지가 있습니다. 사이트에 있는 표현은 눌러 바로 이동할 수 있습니다."
    ],
    "clusters": [
      {
        "id": "utt-c-thanks",
        "title": "감사와 기대",
        "visual": "bubbles",
        "hook": "감사를 전하거나(I appreciate it), 감사에 답하거나(Don’t mention it), 제안에 호응하거나(That would be great), 앞일을 기대할 때(I’m looking forward to it) 씁니다.",
        "itemIds": [
          "utt-i-appreciate-it",
          "utt-dont-mention-it",
          "utt-that-would-be-great",
          "utt-im-looking-forward-to-it"
        ]
      },
      {
        "id": "utt-c-sorry",
        "title": "사과와 배려",
        "visual": "theme",
        "hook": "기다리게 한 사과, 문제 없다는 안심, 못 알아들은 정정 요청, 그리고 방금 한 말을 접는 Never mind를 묶었습니다.",
        "itemIds": [
          "utt-sorry-to-keep-you-waiting",
          "utt-thats-not-a-problem",
          "utt-could-you-say-that-again",
          "utt-never-mind"
        ]
      },
      {
        "id": "utt-c-choice",
        "title": "거절·선택·참여",
        "visual": "fork",
        "hook": "하기 싫을 때는 I’d rather not, 결정을 상대에게 맡길 때는 It’s up to you, 참여할 때는 Count me in입니다. 세 표현의 방향을 그림으로 구별하세요.",
        "visualData": {
          "from": "제안",
          "left": "I’d rather not",
          "leftKo": "거절",
          "right": "Count me in",
          "rightKo": "참여",
          "mid": "It’s up to you",
          "midKo": "상대에게 맡김"
        },
        "itemIds": [
          "utt-id-rather-not",
          "utt-its-up-to-you",
          "utt-count-me-in"
        ]
      },
      {
        "id": "utt-c-follow",
        "title": "후속과 배려 제안",
        "visual": "flow",
        "hook": "내가 다시 연락하거나(I’ll get back to you), 상대에게 문을 열어 두거나(Let me know / Feel free), 관계를 이어 가거나, 일을 맡겠다는 약속입니다.",
        "visualData": {
          "steps": [
            {
              "en": "I’ll take care of it",
              "ko": "내가 처리"
            },
            {
              "en": "I’ll get back to you",
              "ko": "다시 연락"
            },
            {
              "en": "Let’s stay in touch",
              "ko": "관계 유지"
            }
          ]
        },
        "itemIds": [
          "utt-ill-get-back-to-you",
          "utt-let-me-know-if-you-need-anything",
          "utt-feel-free-to-ask",
          "utt-ill-take-care-of-it",
          "utt-lets-stay-in-touch",
          "utt-ill-keep-that-in-mind"
        ]
      },
      {
        "id": "utt-c-agree",
        "title": "이해와 동의",
        "visual": "scale",
        "hook": "이해의 강도입니다. That makes sense는 ‘타당하다’, I see your point는 ‘요지는 알겠다’(반박이 이어질 수도), I couldn’t agree more는 전적인 동의입니다.",
        "visualData": {
          "low": "I see your point",
          "high": "I couldn’t agree more"
        },
        "itemIds": [
          "utt-that-makes-sense",
          "utt-i-see-your-point",
          "utt-i-couldnt-agree-more"
        ]
      }
    ],
    "compares": [
      {
        "id": "cmp-appreciate-mention",
        "title": "I appreciate it vs Don’t mention it",
        "leftId": "utt-i-appreciate-it",
        "rightId": "utt-dont-mention-it",
        "diff": "I appreciate it은 내가 감사를 전하는 말입니다. Don’t mention it은 상대의 감사에 답하는 말입니다(You’re welcome과 같은 자리). 역할이 반대이므로 바꿔 쓰지 마세요.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-rather-count",
        "title": "I’d rather not vs Count me in",
        "leftId": "utt-id-rather-not",
        "rightId": "utt-count-me-in",
        "diff": "I’d rather not은 정중한 거절, Count me in은 참여 의사입니다. 결정을 상대에게 맡길 때는 It’s up to you를 씁니다.",
        "leftNote": null,
        "rightNote": null
      },
      {
        "id": "cmp-point-agree",
        "title": "I see your point vs I couldn’t agree more",
        "leftId": "utt-i-see-your-point",
        "rightId": "utt-i-couldnt-agree-more",
        "diff": "I see your point는 ‘요지는 이해한다’는 말로, 뒤에 반박이 올 수 있습니다. I couldn’t agree more는 그 이상 동의할 수 없을 만큼 전적으로 찬성한다는 뜻입니다.",
        "leftNote": null,
        "rightNote": null
      }
    ],
    "items": [
      {
        "id": "utt-i-appreciate-it",
        "chunk": "I appreciate it.",
        "meaning": "감사합니다, 고마워요",
        "exampleEn": "Thanks for sending the files so quickly. I appreciate it.",
        "exampleKo": "파일을 빨리 보내 주셔서 감사합니다.",
        "emoji": "🙏",
        "similar": [
          {
            "phrase": "thank you",
            "meaning": "감사합니다"
          },
          {
            "phrase": "that’s kind of you",
            "meaning": "친절하시네요"
          },
          {
            "phrase": "I’m grateful",
            "meaning": "감사드립니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I don’t appreciate that",
            "meaning": "그건 고마운 일이 아닙니다"
          }
        ],
        "derived": [
          {
            "phrase": "I appreciate your -ing",
            "meaning": "~해 주셔서 감사합니다"
          },
          {
            "phrase": "much appreciated",
            "meaning": "대단히 감사합니다"
          }
        ]
      },
      {
        "id": "utt-dont-mention-it",
        "chunk": "Don’t mention it.",
        "meaning": "천만에요, 별말씀을요",
        "exampleEn": "“Thank you for covering my shift.” “Don’t mention it.”",
        "exampleKo": "“제 근무를 대신해 주셔서 감사합니다.” “천만에요.”",
        "emoji": "🤍",
        "similar": [
          {
            "phrase": "you’re welcome",
            "meaning": "천만에요"
          },
          {
            "phrase": "no problem",
            "meaning": "괜찮아요"
          },
          {
            "phrase": "my pleasure",
            "meaning": "제 기쁨입니다"
          }
        ],
        "opposite": [
          {
            "phrase": "you owe me one",
            "meaning": "이번엔 내가 도와준 거야 (농담조의 반대 태도)"
          }
        ],
        "derived": [
          {
            "phrase": "not to mention (주의: 뜻이 다름)",
            "meaning": "~은 말할 것도 없고 (감사 응답이 아님)"
          }
        ]
      },
      {
        "id": "utt-that-would-be-great",
        "chunk": "That would be great.",
        "meaning": "그러면 좋겠어요",
        "exampleEn": "If you could share the slides in advance, that would be great.",
        "exampleKo": "슬라이드를 미리 공유해 주시면 좋겠습니다.",
        "emoji": "😊",
        "similar": [
          {
            "phrase": "that would be wonderful",
            "meaning": "그러면 정말 좋겠어요"
          },
          {
            "phrase": "I’d like that",
            "meaning": "그러면 좋겠습니다"
          },
          {
            "phrase": "perfect",
            "meaning": "완벽합니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I’d rather not",
            "meaning": "차라리 안 하는 게 좋겠어요",
            "typeId": "utterances",
            "id": "utt-id-rather-not"
          },
          {
            "phrase": "that wouldn’t work for me",
            "meaning": "제게는 어려울 것 같습니다"
          }
        ],
        "derived": [
          {
            "phrase": "it would be great if",
            "meaning": "~하면 좋겠습니다"
          }
        ]
      },
      {
        "id": "utt-im-looking-forward-to-it",
        "chunk": "I’m looking forward to it. / I’m looking forward to ~ing",
        "meaning": "기대하고 있어요. 뒤에 명사 또는 동명사(-ing)가 옵니다.",
        "exampleEn": "I’m looking forward to taking a rest this weekend.",
        "exampleKo": "이번 주말에 쉬는 것이 기대됩니다.",
        "emoji": "☀️",
        "similar": [
          {
            "phrase": "I can’t wait",
            "meaning": "정말 기대돼요"
          },
          {
            "phrase": "I’m excited about it",
            "meaning": "그 일이 기대됩니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I’m dreading it",
            "meaning": "그 일이 두렵습니다"
          },
          {
            "phrase": "I’m not looking forward to it",
            "meaning": "기대되지 않습니다"
          }
        ],
        "derived": [
          {
            "phrase": "look forward to + -ing",
            "meaning": "~하기를 기대하다"
          },
          {
            "phrase": "looking forward to hearing from you",
            "meaning": "연락을 기다리겠습니다"
          }
        ]
      },
      {
        "id": "utt-sorry-to-keep-you-waiting",
        "chunk": "Sorry to keep you waiting.",
        "meaning": "기다리게 해서 죄송합니다",
        "exampleEn": "Sorry to keep you waiting. The previous meeting ran over.",
        "exampleKo": "기다리게 해서 죄송합니다. 이전 회의가 길어졌습니다.",
        "emoji": "⏳",
        "similar": [
          {
            "phrase": "sorry for the delay",
            "meaning": "늦어져서 죄송합니다"
          },
          {
            "phrase": "thanks for your patience",
            "meaning": "기다려 주셔서 감사합니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I won’t keep you",
            "meaning": "오래 붙잡지 않겠습니다"
          }
        ],
        "derived": [
          {
            "phrase": "keep someone waiting",
            "meaning": "누군가를 기다리게 하다"
          }
        ]
      },
      {
        "id": "utt-thats-not-a-problem",
        "chunk": "That’s not a problem.",
        "meaning": "문제없습니다",
        "exampleEn": "If you need to push the call back an hour, that’s not a problem.",
        "exampleKo": "통화를 한 시간 미루셔도 문제없습니다.",
        "emoji": "👌",
        "similar": [
          {
            "phrase": "no problem",
            "meaning": "문제없어요"
          },
          {
            "phrase": "that’s fine",
            "meaning": "괜찮습니다"
          },
          {
            "phrase": "don’t worry about it",
            "meaning": "걱정하지 마세요"
          }
        ],
        "opposite": [
          {
            "phrase": "that could be a problem",
            "meaning": "그게 문제가 될 수 있습니다"
          },
          {
            "phrase": "I’m afraid that’s an issue",
            "meaning": "그게 문제가 될 것 같습니다"
          }
        ],
        "derived": [
          {
            "phrase": "problematic",
            "meaning": "문제가 되는"
          }
        ]
      },
      {
        "id": "utt-could-you-say-that-again",
        "chunk": "Could you say that again?",
        "meaning": "다시 한 번 말씀해 주시겠어요?",
        "exampleEn": "Sorry, I didn’t catch that. Could you say that again?",
        "exampleKo": "죄송합니다, 잘 못 들었습니다. 다시 한 번 말씀해 주시겠어요?",
        "emoji": "🔁",
        "similar": [
          {
            "phrase": "pardon?",
            "meaning": "네? 다시 말씀해 주시겠어요?"
          },
          {
            "phrase": "could you repeat that?",
            "meaning": "다시 반복해 주시겠어요?"
          },
          {
            "phrase": "I didn’t catch that",
            "meaning": "잘 못 들었습니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I heard you clearly",
            "meaning": "잘 들었습니다"
          },
          {
            "phrase": "no need to repeat that",
            "meaning": "반복하실 필요 없습니다"
          }
        ],
        "derived": [
          {
            "phrase": "once again",
            "meaning": "다시 한 번"
          },
          {
            "phrase": "say again",
            "meaning": "다시 말하다"
          }
        ]
      },
      {
        "id": "utt-never-mind",
        "chunk": "Never mind.",
        "meaning": "신경 쓰지 마세요, 괜찮아요 (방금 한 말이나 부탁을 취소할 때도 씁니다)",
        "exampleEn": "I thought I lost the file, but here it is. Never mind.",
        "exampleKo": "파일을 잃어버린 줄 알았는데 여기 있네요. 신경 쓰지 마세요.",
        "emoji": "🙅",
        "similar": [
          {
            "phrase": "forget it",
            "meaning": "됐어, 잊어"
          },
          {
            "phrase": "it’s nothing",
            "meaning": "아무것도 아니에요"
          },
          {
            "phrase": "don’t worry about it",
            "meaning": "걱정하지 마세요"
          }
        ],
        "opposite": [
          {
            "phrase": "please pay attention to this",
            "meaning": "이것만은 짚고 넘어가 주세요"
          },
          {
            "phrase": "this still matters",
            "meaning": "이건 여전히 중요합니다"
          }
        ],
        "derived": [
          {
            "phrase": "never you mind",
            "meaning": "상관하지 마 (조금 다른, 선을 긋는 표현)"
          }
        ]
      },
      {
        "id": "utt-id-rather-not",
        "chunk": "I’d rather not.",
        "meaning": "차라리 안 하는 게 좋겠어요, ~하고 싶지 않습니다",
        "exampleEn": "I’d rather not discuss salary over email. Can we talk tomorrow?",
        "exampleKo": "급여 이야기는 이메일로 하고 싶지 않습니다. 내일 말씀 나누시죠?",
        "emoji": "🚫",
        "similar": [
          {
            "phrase": "I’d prefer not to",
            "meaning": "하지 않는 편이 좋겠습니다"
          },
          {
            "phrase": "I’m afraid I can’t",
            "meaning": "죄송하지만 어렵겠습니다"
          },
          {
            "phrase": "no thank you",
            "meaning": "괜찮습니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I’d be happy to",
            "meaning": "기꺼이 하겠습니다"
          },
          {
            "phrase": "count me in",
            "meaning": "저도 넣을게요",
            "typeId": "utterances",
            "id": "utt-count-me-in"
          }
        ],
        "derived": [
          {
            "phrase": "I’d rather + inf.",
            "meaning": "차라리 ~하는 편이 낫다"
          }
        ]
      },
      {
        "id": "utt-its-up-to-you",
        "chunk": "It’s up to you.",
        "meaning": "너(당신)한테 달렸어요, 당신이 정하세요",
        "exampleEn": "We can meet today or tomorrow. It’s up to you.",
        "exampleKo": "오늘 만나도 되고 내일 만나도 됩니다. 당신이 정하세요.",
        "emoji": "🫵",
        "similar": [
          {
            "phrase": "it’s your call",
            "meaning": "당신이 결정하세요"
          },
          {
            "phrase": "I’ll leave it to you",
            "meaning": "당신에게 맡길게요"
          }
        ],
        "opposite": [
          {
            "phrase": "I’ll decide",
            "meaning": "제가 결정하겠습니다"
          },
          {
            "phrase": "you have no choice",
            "meaning": "선택의 여지가 없습니다"
          }
        ],
        "derived": [
          {
            "phrase": "the decision is yours",
            "meaning": "결정은 당신의 몫입니다"
          }
        ]
      },
      {
        "id": "utt-count-me-in",
        "chunk": "Count me in.",
        "meaning": "저도 넣어 주세요, 참여할게요",
        "exampleEn": "If you’re forming a working group, count me in.",
        "exampleKo": "작업반을 만드신다면 저도 넣으세요.",
        "emoji": "✋",
        "similar": [
          {
            "phrase": "I’m in",
            "meaning": "저요, 참여합니다"
          },
          {
            "phrase": "I’ll join",
            "meaning": "참여할게요"
          },
          {
            "phrase": "you can include me",
            "meaning": "저를 넣어 주세요"
          }
        ],
        "opposite": [
          {
            "phrase": "count me out",
            "meaning": "저는 빼 주세요"
          },
          {
            "phrase": "I’d rather not",
            "meaning": "안 하는 편이 좋겠어요",
            "typeId": "utterances",
            "id": "utt-id-rather-not"
          }
        ],
        "derived": [
          {
            "phrase": "count someone in",
            "meaning": "누군가를 포함하다"
          }
        ]
      },
      {
        "id": "utt-ill-get-back-to-you",
        "chunk": "I’ll get back to you.",
        "meaning": "다시 연락드릴게요",
        "exampleEn": "I need to check with finance first. I’ll get back to you this afternoon.",
        "exampleKo": "먼저 재무 팀에 확인해 봐야 합니다. 오늘 오후에 다시 연락드리겠습니다.",
        "emoji": "📞",
        "similar": [
          {
            "phrase": "I’ll follow up",
            "meaning": "이어서 연락드리겠습니다"
          },
          {
            "phrase": "I’ll be in touch",
            "meaning": "연락드리겠습니다"
          },
          {
            "phrase": "I’ll let you know",
            "meaning": "알려 드리겠습니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I won’t be able to follow up",
            "meaning": "후속 연락을 드리기 어려울 것 같습니다"
          }
        ],
        "derived": [
          {
            "phrase": "a follow-up",
            "meaning": "후속 연락·조치"
          },
          {
            "phrase": "get back to someone",
            "meaning": "다시 연락하다"
          }
        ]
      },
      {
        "id": "utt-let-me-know-if-you-need-anything",
        "chunk": "Let me know if you need anything.",
        "meaning": "필요하신 게 있으면 말씀해 주세요",
        "exampleEn": "I’ve uploaded the draft. Let me know if you need anything.",
        "exampleKo": "초안을 올려 두었습니다. 필요하신 게 있으면 말씀해 주세요.",
        "emoji": "💌",
        "similar": [
          {
            "phrase": "feel free to ask",
            "meaning": "부담 없이 물어보세요",
            "typeId": "utterances",
            "id": "utt-feel-free-to-ask"
          },
          {
            "phrase": "don’t hesitate to reach out",
            "meaning": "편하게 연락하세요"
          }
        ],
        "opposite": [
          {
            "phrase": "please don’t contact me unless necessary",
            "meaning": "꼭 필요한 경우가 아니면 연락을 삼가 주세요"
          }
        ],
        "derived": [
          {
            "phrase": "if you need anything else",
            "meaning": "다른 필요한 것이 있으면"
          },
          {
            "phrase": "let me know",
            "meaning": "알려 주세요"
          }
        ]
      },
      {
        "id": "utt-feel-free-to-ask",
        "chunk": "Feel free to ask.",
        "meaning": "부담 없이 물어보세요",
        "exampleEn": "If anything in the contract is unclear, feel free to ask.",
        "exampleKo": "계약서에서 불분명한 부분이 있으면 편하게 물어보세요.",
        "emoji": "🤗",
        "similar": [
          {
            "phrase": "don’t hesitate to ask",
            "meaning": "망설이지 말고 물어보세요"
          },
          {
            "phrase": "let me know if you need anything",
            "meaning": "필요하시면 말씀해 주세요",
            "typeId": "utterances",
            "id": "utt-let-me-know-if-you-need-anything"
          }
        ],
        "opposite": [
          {
            "phrase": "I’d rather you didn’t ask",
            "meaning": "질문은 삼가 주셨으면 합니다"
          }
        ],
        "derived": [
          {
            "phrase": "feel free to + inf.",
            "meaning": "편하게 ~하세요"
          }
        ]
      },
      {
        "id": "utt-ill-take-care-of-it",
        "chunk": "I’ll take care of it.",
        "meaning": "제가 처리할게요",
        "exampleEn": "Don’t worry about the reservation. I’ll take care of it.",
        "exampleKo": "예약은 걱정하지 마세요. 제가 처리할게요.",
        "emoji": "🛠️",
        "similar": [
          {
            "phrase": "I’ll handle it",
            "meaning": "제가 처리할게요"
          },
          {
            "phrase": "leave it with me",
            "meaning": "제게 맡기세요"
          },
          {
            "phrase": "I’ll see to it",
            "meaning": "제가 챙길게요"
          }
        ],
        "opposite": [
          {
            "phrase": "you’ll have to handle it yourself",
            "meaning": "직접 처리하셔야 합니다"
          },
          {
            "phrase": "that’s not my job",
            "meaning": "제 소관이 아닙니다"
          }
        ],
        "derived": [
          {
            "phrase": "taken care of",
            "meaning": "처리된"
          }
        ]
      },
      {
        "id": "utt-lets-stay-in-touch",
        "chunk": "Let’s stay in touch.",
        "meaning": "계속 연락해요, 소식을 주고받아요",
        "exampleEn": "It was good to meet you. Let’s stay in touch.",
        "exampleKo": "만나 뵙게 되어 반가웠습니다. 계속 연락하죠.",
        "emoji": "📱",
        "similar": [
          {
            "phrase": "let’s keep in touch",
            "meaning": "계속 연락해요"
          },
          {
            "phrase": "I’ll be in touch",
            "meaning": "연락드릴게요"
          },
          {
            "phrase": "let’s not lose touch",
            "meaning": "연락 끊지 말아요"
          }
        ],
        "opposite": [
          {
            "phrase": "let’s leave it here",
            "meaning": "오늘은 여기까지 하죠"
          }
        ],
        "derived": [
          {
            "phrase": "stay in touch",
            "meaning": "계속 연락하다"
          },
          {
            "phrase": "in touch with",
            "meaning": "~와 연락하는"
          }
        ]
      },
      {
        "id": "utt-ill-keep-that-in-mind",
        "chunk": "I’ll keep that in mind.",
        "meaning": "명심할게요, 기억해 두겠습니다",
        "exampleEn": "Thanks for the warning about the delay. I’ll keep that in mind.",
        "exampleKo": "지연 가능성 알려 주셔서 감사합니다. 명심하겠습니다.",
        "emoji": "🧠",
        "similar": [
          {
            "phrase": "I’ll bear that in mind",
            "meaning": "명심하겠습니다"
          },
          {
            "phrase": "I’ll remember that",
            "meaning": "기억해 두겠습니다"
          },
          {
            "phrase": "keep in mind",
            "meaning": "염두에 두다",
            "typeId": "collocations",
            "id": "col-keep-in-mind"
          }
        ],
        "opposite": [
          {
            "phrase": "that won’t change my mind",
            "meaning": "그 때문에 생각은 바뀌지 않습니다"
          },
          {
            "phrase": "I’ll ignore that",
            "meaning": "그건 무시하겠습니다"
          }
        ],
        "derived": [
          {
            "phrase": "a reminder",
            "meaning": "상기시키는 말"
          }
        ]
      },
      {
        "id": "utt-that-makes-sense",
        "chunk": "That makes sense.",
        "meaning": "이해가 됩니다, 그럴 만합니다, 타당합니다",
        "exampleEn": "If traffic is heavier in the evening, a morning launch makes sense.",
        "exampleKo": "저녁에 트래픽이 더 높다면, 오전에 출시하는 것이 타당합니다.",
        "emoji": "💡",
        "similar": [
          {
            "phrase": "that’s reasonable",
            "meaning": "타당합니다"
          },
          {
            "phrase": "I can see that",
            "meaning": "이해가 됩니다"
          },
          {
            "phrase": "fair enough",
            "meaning": "그럴 만합니다"
          }
        ],
        "opposite": [
          {
            "phrase": "that doesn’t make sense",
            "meaning": "앞뒤가 맞지 않습니다"
          },
          {
            "phrase": "I’m not following",
            "meaning": "이해가 안 됩니다"
          }
        ],
        "derived": [
          {
            "phrase": "it makes sense to",
            "meaning": "~하는 것이 타당하다"
          },
          {
            "phrase": "sensible",
            "meaning": "분별 있는"
          }
        ]
      },
      {
        "id": "utt-i-see-your-point",
        "chunk": "I see your point.",
        "meaning": "무슨 말씀인지 알겠습니다, 요지는 이해합니다",
        "exampleEn": "I see your point, but I still think we should wait for the test results.",
        "exampleKo": "말씀은 이해합니다만, 그래도 시험 결과를 기다리는 편이 낫다고 생각합니다.",
        "emoji": "👀",
        "similar": [
          {
            "phrase": "I understand where you’re coming from",
            "meaning": "왜 그렇게 생각하시는지는 알겠습니다"
          },
          {
            "phrase": "I take your point",
            "meaning": "요지는 이해합니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I don’t see your point",
            "meaning": "요지가 파악되지 않습니다"
          },
          {
            "phrase": "I disagree entirely",
            "meaning": "전혀 동의하지 않습니다"
          }
        ],
        "derived": [
          {
            "phrase": "point taken",
            "meaning": "알겠습니다, 받아들이겠습니다"
          }
        ]
      },
      {
        "id": "utt-i-couldnt-agree-more",
        "chunk": "I couldn’t agree more.",
        "meaning": "전적으로 동의합니다",
        "exampleEn": "I couldn’t agree more — we should put safety first.",
        "exampleKo": "전적으로 동의합니다. 안전을 최우선으로 해야죠.",
        "emoji": "💯",
        "similar": [
          {
            "phrase": "I completely agree",
            "meaning": "완전히 동의합니다"
          },
          {
            "phrase": "exactly",
            "meaning": "바로 그겁니다"
          },
          {
            "phrase": "I’m with you on that",
            "meaning": "그 점에는 저도 같은 생각입니다"
          }
        ],
        "opposite": [
          {
            "phrase": "I couldn’t disagree more",
            "meaning": "전혀 동의할 수 없습니다"
          },
          {
            "phrase": "I see your point, but…",
            "meaning": "요지는 알지만… (부분 동의)"
          }
        ],
        "derived": [
          {
            "phrase": "agreed",
            "meaning": "동의합니다"
          },
          {
            "phrase": "agreement",
            "meaning": "동의"
          }
        ]
      }
    ]
  }
];
