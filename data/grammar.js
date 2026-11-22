/*
 * 문법 구문 학습 데이터
 * 각 유닛: id, title(한국어), en(영어명), summary, explanation[], patterns[], examples[], mistakes[], quiz[]
 * patterns[].id 는 진도 체크용 고유 ID 입니다. 바꾸면 해당 체크 기록이 사라지니 주의하세요.
 */
window.GRAMMAR = [
  {
    id: "conjunctions",
    title: "접속사",
    en: "Conjunctions",
    summary: "등위·종속·상관 접속사로 문장과 문장을 논리적으로 연결합니다.",
    explanation: [
      "접속사는 단어·구·절을 이어 주는 말입니다. 대등한 두 요소를 잇는 <b>등위접속사</b>, 주절에 부사절·명사절을 붙이는 <b>종속접속사</b>, 짝을 이뤄 쓰는 <b>상관접속사</b>가 있습니다.",
      "뉴스·비즈니스 영어에서는 원인(because, as), 양보(although, while), 조건(if, unless), 대조(but, whereas)를 정확히 고르는 것이 논리 전달의 핵심입니다."
    ],
    patterns: [
      { id: "conj-coord", name: "등위접속사", form: "A and / but / or / so / yet B", desc: "문법적으로 대등한 두 요소를 연결. 절과 절을 이을 때 보통 쉼표 + 접속사.", example: "Sales rose, but profits fell." },
      { id: "conj-subord", name: "종속접속사", form: "Although / Because / If / When / While + S V, 주절", desc: "부사절(이유·양보·조건·시간)이나 명사절(that, whether)을 이끔. 부사절이 앞에 오면 쉼표.", example: "Although demand slowed, the company raised prices." },
      { id: "conj-correl", name: "상관접속사", form: "both A and B / either A or B / neither A nor B / not only A but (also) B / whether A or B", desc: "짝으로 쓰며 A와 B는 같은 품사·형태(병렬 구조)여야 함.", example: "The plan affects not only employees but also suppliers." }
    ],
    examples: [
      { en: "Exports increased, and the trade surplus widened for the third month.", ko: "수출이 늘었고 무역흑자는 3개월째 확대됐다." },
      { en: "The policy was popular, yet it failed to pass the National Assembly.", ko: "그 정책은 인기가 있었지만 국회를 통과하지 못했다." },
      { en: "Although inflation eased, the central bank kept rates unchanged.", ko: "물가 상승세가 둔화됐지만 중앙은행은 금리를 동결했다." },
      { en: "Because hiring slowed, youth unemployment edged up.", ko: "채용이 둔화되면서 청년 실업률이 소폭 상승했다." },
      { en: "Unless costs come down, margins will remain under pressure.", ko: "비용이 내려가지 않으면 이익률은 계속 압박을 받을 것이다." },
      { en: "While older workers gained jobs, employment among people in their 20s declined.", ko: "고령층 일자리는 늘어난 반면 20대 고용은 감소했다." },
      { en: "Both labor and management agreed to resume talks next week.", ko: "노사 양측 모두 다음 주에 협상을 재개하기로 합의했다." },
      { en: "The board will decide whether to expand the plant or close it.", ko: "이사회는 공장을 증설할지 폐쇄할지 결정할 것이다." },
      { en: "Neither the union nor the ministry commented on the report.", ko: "노조도 노동부도 그 보도에 대해 논평하지 않았다." }
    ],
    mistakes: [
      { wrong: "Although demand slowed, but the company raised prices.", right: "Although demand slowed, the company raised prices.", why: "although와 but을 한 문장에 같이 쓰지 않습니다. 하나만 쓰세요." },
      { wrong: "Not only the plan is costly but also risky.", right: "The plan is not only costly but also risky.", why: "not only A but also B에서 A와 B의 형태를 맞춥니다(형용사-형용사)." },
      { wrong: "Neither the CEO nor the directors was present.", right: "Neither the CEO nor the directors were present.", why: "either/neither A or/nor B는 동사를 B(가까운 쪽)에 일치시킵니다." }
    ],
    quiz: [
      { q: "빈칸: ___ the market recovered, investors remained cautious. (회복했음에도)", a: "Although (Even though)", explain: "양보의 종속접속사." },
      { q: "빈칸: You can apply online ___ visit a branch.", a: "or (either … or)", explain: "선택을 나타내는 등위접속사." },
      { q: "어색한 곳을 고치세요: Both the price and the quality is important.", a: "is → are", explain: "both A and B는 복수 취급." }
    ]
  },
  {
    id: "gerunds",
    title: "동명사",
    en: "Gerunds (-ing)",
    summary: "동사에 -ing를 붙여 명사처럼 쓰는 형태 — 주어·목적어·전치사의 목적어.",
    explanation: [
      "동명사(V-ing)는 '~하는 것'이라는 뜻으로 명사 자리에 들어갑니다. 주어, 동사의 목적어, 그리고 특히 <b>전치사의 목적어</b>로 자주 쓰입니다.",
      "어떤 동사는 목적어로 동명사만 받습니다(avoid, consider, delay, deny, finish, postpone, suggest, recommend 등). 'look forward to, be committed to, object to'의 to는 전치사이므로 뒤에 동명사가 옵니다."
    ],
    patterns: [
      { id: "ger-subject", name: "주어 동명사", form: "V-ing … + 단수동사", desc: "동명사 주어는 단수 취급.", example: "Raising the retirement age requires legislation." },
      { id: "ger-object", name: "동명사만 목적어로 받는 동사", form: "avoid / consider / delay / postpone / suggest / recommend + V-ing", desc: "to부정사를 쓰면 틀림.", example: "The firm is considering cutting its workforce." },
      { id: "ger-prep", name: "전치사 + 동명사", form: "by / without / after / before / instead of / despite + V-ing", desc: "전치사 뒤 동사는 반드시 -ing.", example: "The bank cut costs by closing branches." },
      { id: "ger-to", name: "to(전치사) + 동명사", form: "look forward to / be committed to / be used to / contribute to + V-ing", desc: "to가 전치사인 숙어 — 동사원형 아님.", example: "We look forward to working with you." }
    ],
    examples: [
      { en: "Reflecting work history in credit scores could help freelancers get loans.", ko: "근로 이력을 신용평가에 반영하는 것은 프리랜서들의 대출에 도움이 될 수 있다." },
      { en: "The ministry recommended extending the program for another year.", ko: "부처는 그 프로그램을 1년 더 연장할 것을 권고했다." },
      { en: "Investors avoided buying tech stocks ahead of the earnings report.", ko: "투자자들은 실적 발표를 앞두고 기술주 매수를 피했다." },
      { en: "After reviewing the data, the committee postponed voting on the bill.", ko: "자료를 검토한 뒤 위원회는 법안 표결을 연기했다." },
      { en: "The company is committed to reducing carbon emissions by 2030.", ko: "그 회사는 2030년까지 탄소 배출을 줄이는 데 전념하고 있다." },
      { en: "Instead of raising wages, the firm offered one-time bonuses.", ko: "그 회사는 임금을 올리는 대신 일회성 보너스를 지급했다." },
      { en: "Despite posting record profits, the chipmaker saw its shares fall.", ko: "사상 최대 이익을 냈음에도 그 반도체 업체의 주가는 떨어졌다." },
      { en: "Thank you for sending the revised proposal so quickly.", ko: "수정 제안서를 빨리 보내 주셔서 감사합니다." }
    ],
    mistakes: [
      { wrong: "We look forward to work with you.", right: "We look forward to working with you.", why: "look forward to의 to는 전치사 → 동명사." },
      { wrong: "They suggested to delay the launch.", right: "They suggested delaying the launch.", why: "suggest는 동명사(또는 that절)를 목적어로 받습니다." },
      { wrong: "Cutting costs are the top priority.", right: "Cutting costs is the top priority.", why: "동명사 주어는 단수 취급." }
    ],
    quiz: [
      { q: "괄호 안 동사를 알맞게: The board decided to postpone (announce) the merger.", a: "announcing", explain: "postpone + V-ing." },
      { q: "빈칸: She improved efficiency by ___ (automate) the process.", a: "automating", explain: "전치사 by + 동명사." },
      { q: "맞는 문장? 'I'm used to work late.'", a: "틀림 → I'm used to working late.", explain: "be used to(~에 익숙하다)의 to는 전치사." }
    ]
  },
  {
    id: "infinitives",
    title: "to부정사",
    en: "To-infinitives",
    summary: "to + 동사원형 — 명사·형용사·부사 역할, 목적·계획·의도를 표현.",
    explanation: [
      "to부정사는 '~하는 것(명사)', '~할(형용사)', '~하기 위해 / ~해서(부사)' 등 다양한 역할을 합니다.",
      "plan, aim, decide, agree, expect, fail, hope, refuse, seek 등은 to부정사를 목적어로 받습니다. 뉴스에서는 'be expected to', 'be set to', 'aim to' 처럼 미래·계획을 나타내는 표현이 매우 흔합니다."
    ],
    patterns: [
      { id: "inf-object", name: "동사 + to부정사", form: "plan / aim / decide / agree / fail / seek / refuse + to V", desc: "미래 지향·의도의 동사들.", example: "The government plans to raise the minimum wage." },
      { id: "inf-purpose", name: "목적의 to부정사", form: "(in order) to V / so as to V", desc: "'~하기 위해'. 문두에 오면 쉼표.", example: "To attract talent, the firm raised salaries." },
      { id: "inf-adj", name: "형용사적 용법", form: "명사 + to V", desc: "'~할 명사'. plan to, decision to, effort to, ability to.", example: "The decision to cut jobs drew criticism." },
      { id: "inf-news", name: "뉴스 미래 표현", form: "be expected to / be set to / be likely to / be due to + V", desc: "예정·전망.", example: "The bill is set to take effect next year." },
      { id: "inf-obj-comp", name: "목적어 + to부정사", form: "urge / ask / allow / require / encourage + O + to V", desc: "누구에게 ~하라고/하도록.", example: "The union urged the ministry to act quickly." }
    ],
    examples: [
      { en: "The FKTU urged the labor ministry to draw up a bill on extending the retirement age.", ko: "한국노총은 노동부에 정년연장 법안을 마련하라고 촉구했다." },
      { en: "The central bank is expected to hold rates steady this month.", ko: "중앙은행은 이번 달 금리를 동결할 것으로 예상된다." },
      { en: "To ease the burden on small businesses, the city will cut fees.", ko: "소상공인 부담을 덜기 위해 시는 수수료를 인하할 것이다." },
      { en: "The two sides failed to reach an agreement.", ko: "양측은 합의에 이르지 못했다." },
      { en: "New rules require employers to disclose pay gaps.", ko: "새 규정은 고용주에게 임금 격차를 공개하도록 요구한다." },
      { en: "Efforts to boost youth employment have had limited success.", ko: "청년 고용을 늘리려는 노력은 제한적인 성과를 거뒀다." },
      { en: "The startup aims to go public within two years.", ko: "그 스타트업은 2년 안에 상장하는 것을 목표로 한다." },
      { en: "It is important to review the contract before signing it.", ko: "서명하기 전에 계약서를 검토하는 것이 중요하다." }
    ],
    mistakes: [
      { wrong: "The company decided cutting jobs.", right: "The company decided to cut jobs.", why: "decide는 to부정사를 목적어로 받습니다." },
      { wrong: "The union urged the ministry act quickly.", right: "The union urged the ministry to act quickly.", why: "urge + 목적어 + to V." },
      { wrong: "For reduce costs, we outsourced IT.", right: "To reduce costs, we outsourced IT.", why: "목적은 to부정사(For + 동사원형 X)." }
    ],
    quiz: [
      { q: "빈칸: The law is ___ to take effect in March. (예정이다)", a: "set (due / scheduled)", explain: "be set to V = ~할 예정이다." },
      { q: "고치세요: They allowed us using the facility.", a: "using → to use", explain: "allow + O + to V." },
      { q: "빈칸(동명사/to부정사): We agreed ___ (share) the costs.", a: "to share", explain: "agree + to V." }
    ]
  },
  {
    id: "participles",
    title: "분사 · 분사구문",
    en: "Participles & Participle Clauses",
    summary: "현재분사(-ing)·과거분사(-ed)로 명사를 꾸미거나, 접속사+주어를 줄여 문장을 간결하게.",
    explanation: [
      "<b>현재분사(V-ing)</b>는 능동·진행('~하는'), <b>과거분사(V-ed/p.p.)</b>는 수동·완료('~된')의 의미로 명사를 수식합니다.",
      "<b>분사구문</b>은 'When/Because/As + 주어 + 동사' 를 분사로 줄인 것입니다. 기사 영어에서 '~하며, ~해서'를 처리할 때 가장 많이 쓰입니다. 예: Nvidia fell 14%, <i>slipping</i> to fourth place."
    ],
    patterns: [
      { id: "part-modify", name: "분사의 명사 수식", form: "the rising costs / the proposed bill / workers aged 60 or older", desc: "한 단어면 앞, 구를 이루면 뒤에서 수식.", example: "The proposed bill faces opposition." },
      { id: "part-result", name: "결과의 분사구문", form: "S V …, V-ing (결과)", desc: "'~하며 / ~해서 결국 ~하다'. 기사의 숫자 변화 표현에 필수.", example: "Shares fell 5%, wiping out this year's gains." },
      { id: "part-time-reason", name: "시간·이유의 분사구문", form: "V-ing / Having p.p. …, S V", desc: "When/Because/After를 생략. 주절 주어와 같아야 함.", example: "Having missed its targets, the firm cut its forecast." },
      { id: "part-passive", name: "수동 분사구문", form: "(Being) p.p. …, S V", desc: "'~되어서'. Based on, Compared with, Faced with 등.", example: "Compared with last year, sales rose 8%." }
    ],
    examples: [
      { en: "Nvidia fell 14.01% to a 52-week low, slipping to fourth place in market capitalization.", ko: "엔비디아는 14.01% 하락해 52주 신저가를 기록하며 시가총액 4위로 주저앉았다." },
      { en: "Regular workers aged 60 or older accounted for most of the increase.", ko: "60세 이상 상용직 근로자가 증가분의 대부분을 차지했다." },
      { en: "Faced with rising costs, many restaurants raised menu prices.", ko: "비용 상승에 직면해 많은 식당이 메뉴 가격을 올렸다." },
      { en: "The Dow entered correction territory, having fallen more than 10% from its peak.", ko: "다우지수는 고점 대비 10% 넘게 하락하며 조정 국면에 진입했다." },
      { en: "Based on the survey, the ministry revised its employment outlook.", ko: "설문 결과를 바탕으로 부처는 고용 전망을 수정했다." },
      { en: "The growing number of platform workers has prompted new policies.", ko: "늘어나는 플랫폼 노동자 수가 새로운 정책을 촉발했다." },
      { en: "Citing weak demand, the automaker suspended production at two plants.", ko: "수요 부진을 이유로 그 자동차 업체는 두 공장의 생산을 중단했다." },
      { en: "Compared with a year earlier, exports rose 12.3%.", ko: "1년 전과 비교해 수출은 12.3% 증가했다." }
    ],
    mistakes: [
      { wrong: "The results were very surprised.", right: "The results were very surprising.", why: "결과가 '놀라움을 주는' 것 → 현재분사. 사람이 놀란 것이면 surprised." },
      { wrong: "Walking into the office, the lights were off.", right: "Walking into the office, I found the lights off.", why: "분사구문의 의미상 주어는 주절 주어와 같아야 합니다(현수 분사 오류)." },
      { wrong: "Compare with last year, sales rose.", right: "Compared with last year, sales rose.", why: "'비교되어' → 과거분사 Compared." }
    ],
    quiz: [
      { q: "알맞은 형태: the (propose / proposed / proposing) reform", a: "proposed", explain: "'제안된' 개혁 → 수동의 과거분사." },
      { q: "분사구문으로: Because it missed its targets, the firm cut its forecast.", a: "Having missed its targets, the firm cut its forecast.", explain: "주절보다 앞선 일 → Having p.p." },
      { q: "빈칸: Oil prices jumped 6%, ___ (push) inflation higher.", a: "pushing", explain: "결과의 분사구문." }
    ]
  },
  {
    id: "relatives",
    title: "관계사",
    en: "Relative Pronouns & Adverbs",
    summary: "who·which·that·whose(관계대명사), where·when·why(관계부사)로 명사에 정보를 덧붙입니다.",
    explanation: [
      "관계대명사는 앞의 명사(선행사)를 꾸미는 절을 이끕니다. 사람은 who, 사물은 which, 둘 다 that, 소유는 whose. 선행사를 포함하는 what은 '~하는 것'.",
      "<b>제한적 용법</b>(쉼표 없음)은 범위를 좁히고, <b>계속적 용법</b>(쉼표 + who/which)은 추가 정보를 덧붙입니다. 계속적 용법에는 that을 쓰지 않습니다. 관계부사 where(장소), when(시간), why(이유)는 '전치사 + which'로 바꿀 수 있습니다."
    ],
    patterns: [
      { id: "rel-pron", name: "관계대명사 who / which / that", form: "N + who/which/that + (S) V", desc: "목적격은 생략 가능.", example: "Workers who lose their jobs can apply for benefits." },
      { id: "rel-whose-what", name: "whose / what", form: "N + whose + N … / what + (S) V", desc: "whose = 소유, what = the thing(s) that.", example: "What investors fear most is a recession." },
      { id: "rel-nonrestrict", name: "계속적 용법", form: "N, which/who …", desc: "앞 문장 전체를 받을 수도 있음(, which).", example: "The index fell 5%, which erased this year's gains." },
      { id: "rel-adv", name: "관계부사 where / when / why", form: "N(장소/시간/이유) + where/when/why + S V", desc: "= 전치사 + which.", example: "This is the plant where the chips are made." }
    ],
    examples: [
      { en: "Freelancers who have stable work histories may qualify for lower rates.", ko: "안정적인 근로 이력이 있는 프리랜서는 더 낮은 금리를 받을 수 있다." },
      { en: "The Nasdaq plunged 5.3%, which wiped out all of its gains for the year.", ko: "나스닥은 5.3% 폭락했고, 이로 인해 올해 상승분이 모두 사라졌다." },
      { en: "The company, whose shares hit a record high last month, announced layoffs.", ko: "지난달 주가가 사상 최고치를 기록한 그 회사가 감원을 발표했다." },
      { en: "What the union wants is a legal guarantee of job security.", ko: "노조가 원하는 것은 고용 안정의 법적 보장이다." },
      { en: "2026 is the year when the new pension rules take effect.", ko: "2026년은 새 연금 규정이 시행되는 해이다." },
      { en: "That is the reason why many young people are leaving regional cities.", ko: "그것이 많은 청년들이 지방 도시를 떠나는 이유다." },
      { en: "The report that the ministry released yesterday shows rising unemployment.", ko: "부처가 어제 발표한 보고서는 실업률 상승을 보여 준다." },
      { en: "Seoul is a city where startup funding has grown rapidly.", ko: "서울은 스타트업 투자가 빠르게 늘어난 도시다." }
    ],
    mistakes: [
      { wrong: "The CEO, that joined in 2020, resigned.", right: "The CEO, who joined in 2020, resigned.", why: "계속적 용법(쉼표)에는 that을 쓰지 않습니다." },
      { wrong: "This is the office which I work.", right: "This is the office where I work. / … which I work in.", why: "work는 자동사 → 관계부사 또는 전치사 필요." },
      { wrong: "The thing what matters is speed.", right: "What matters is speed. / The thing that matters is speed.", why: "what은 선행사를 포함하므로 앞에 명사를 두지 않습니다." }
    ],
    quiz: [
      { q: "빈칸: Employees ___ contracts expire this year will be reviewed.", a: "whose", explain: "직원'의' 계약 → 소유격." },
      { q: "빈칸: Prices rose sharply, ___ hurt consumer spending.", a: "which", explain: "앞 문장 전체를 받는 계속적 용법." },
      { q: "빈칸: I remember the day ___ the merger was announced.", a: "when (on which)", explain: "시간 선행사 → when." }
    ]
  },
  {
    id: "prepositional-phrases",
    title: "전치사구",
    en: "Prepositional Phrases",
    summary: "수치 변화·원인·기준을 나타내는 전치사구 — 기사 영어의 뼈대.",
    explanation: [
      "전치사 + 명사(구)는 형용사·부사처럼 쓰여 정보를 더합니다. 경제 기사에서는 <b>증감 폭(by)</b>, <b>도달점(to)</b>, <b>출발점(from)</b>, <b>원인(amid, due to, on)</b>, <b>기준(compared with, year on year)</b>을 정확히 구분해야 합니다.",
      "rise by 5%(5% 만큼 상승) vs rise to 5%(5%까지 상승)처럼 전치사 하나로 의미가 완전히 달라집니다."
    ],
    patterns: [
      { id: "prep-change", name: "수치 변화", form: "rise/fall by X / to X / from X to Y", desc: "by=변화폭, to=도착 수치.", example: "Unemployment fell by 0.2 percentage points to 3.1%." },
      { id: "prep-cause", name: "원인·배경", form: "amid / due to / because of / on / owing to + N", desc: "amid = ~ 속에서(배경). on = 뉴스 헤드라인에서 원인.", example: "Stocks slid amid recession fears." },
      { id: "prep-compare", name: "비교·기준", form: "compared with / from a year earlier / year on year / in terms of", desc: "기준 시점 표시.", example: "Sales rose 8% from a year earlier." },
      { id: "prep-compound", name: "복합 전치사", form: "in line with / in response to / on behalf of / in charge of / in addition to", desc: "비즈니스 문서 필수 표현.", example: "In response to the criticism, the firm revised its policy." }
    ],
    examples: [
      { en: "The Nasdaq plunged 5.3% on a tech selloff.", ko: "나스닥은 기술주 매도로 5.3% 폭락했다." },
      { en: "Bond prices rose amid growing caution over AI investment.", ko: "AI 투자에 대한 경계감이 커지는 가운데 채권 가격이 올랐다." },
      { en: "The VIX closed at 35.89, up 26.2% from the previous session.", ko: "VIX는 전장보다 26.2% 오른 35.89로 마감했다." },
      { en: "Exports rose 12% year on year in October.", ko: "10월 수출은 전년 동월 대비 12% 증가했다." },
      { en: "In line with market expectations, the bank kept its rate at 3.25%.", ko: "시장 예상대로 은행은 금리를 3.25%로 유지했다." },
      { en: "In addition to salary, employees receive housing support.", ko: "직원들은 급여 외에 주거 지원도 받는다." },
      { en: "The ministry signed the agreement on behalf of the government.", ko: "부처가 정부를 대표해 협약에 서명했다." },
      { en: "The number of regular workers in their 20s fell by 120,000.", ko: "20대 상용직 근로자 수는 12만 명 감소했다." }
    ],
    mistakes: [
      { wrong: "Prices increased 3% to last year.", right: "Prices increased 3% from last year. / compared with last year", why: "기준 시점은 from 또는 compared with." },
      { wrong: "Due to the strike happened, …", right: "Due to the strike, … / Because the strike happened, …", why: "전치사(due to) 뒤에는 절이 아니라 명사." },
      { wrong: "The rate rose by 4% (도달 수치를 말할 때)", right: "The rate rose to 4%.", why: "최종 수치는 to, 변화 폭은 by." }
    ],
    quiz: [
      { q: "빈칸: Inflation slowed ___ 2.1% in October. (2.1%가 됨)", a: "to", explain: "도달 수치 → to." },
      { q: "빈칸: Shares fell ___ concerns over weak demand. (~에 대한 우려 속에)", a: "amid", explain: "배경·분위기 → amid." },
      { q: "빈칸: ___ response to customer feedback, we updated the app.", a: "In", explain: "in response to = ~에 대응하여." }
    ]
  },
  {
    id: "modals",
    title: "조동사",
    en: "Modal Verbs",
    summary: "can·could·may·might·must·should·would로 가능성·의무·추측·정중함을 표현.",
    explanation: [
      "조동사는 동사원형 앞에서 화자의 판단(가능성, 의무, 허가, 추측)을 더합니다. 뉴스에서는 전망·불확실성(could, may, might), 정책 의무(must, should, will have to)를 자주 씁니다.",
      "비즈니스 이메일에서는 could/would를 쓰면 훨씬 정중해집니다. 과거 추측은 '조동사 + have p.p.' (must have, should have, could have)."
    ],
    patterns: [
      { id: "modal-possibility", name: "가능성·전망", form: "may / might / could + V", desc: "확신도: could ≈ may > might.", example: "The rate hike could slow consumer spending." },
      { id: "modal-obligation", name: "의무·권고", form: "must / have to / should / be required to + V", desc: "must=강한 의무, should=권고.", example: "Employers must provide safety training." },
      { id: "modal-polite", name: "정중한 요청", form: "Could you … ? / Would you mind V-ing … ? / I would appreciate it if …", desc: "비즈니스 메일 필수.", example: "Could you send me the updated figures?" },
      { id: "modal-perfect", name: "조동사 + have p.p.", form: "must have / should have / could have / might have + p.p.", desc: "과거에 대한 추측·후회.", example: "The firm should have disclosed the risk earlier." }
    ],
    examples: [
      { en: "Higher borrowing costs could weigh on corporate investment.", ko: "차입 비용 상승은 기업 투자에 부담이 될 수 있다." },
      { en: "The policy may help platform workers access cheaper loans.", ko: "그 정책은 플랫폼 노동자들이 더 저렴한 대출을 받는 데 도움이 될 수 있다." },
      { en: "Companies with 50 or more employees must comply with the new rule.", ko: "직원 50명 이상 기업은 새 규정을 준수해야 한다." },
      { en: "The government should not rely solely on the National Assembly.", ko: "정부는 국회에만 의존해서는 안 된다." },
      { en: "Would you be available for a call on Tuesday afternoon?", ko: "화요일 오후에 통화 가능하실까요?" },
      { en: "I would appreciate it if you could review the draft by Friday.", ko: "금요일까지 초안을 검토해 주시면 감사하겠습니다." },
      { en: "Analysts say the selloff might continue into next week.", ko: "분석가들은 매도세가 다음 주까지 이어질 수 있다고 말한다." },
      { en: "The company must have underestimated the demand.", ko: "그 회사는 수요를 과소평가했음이 틀림없다." }
    ],
    mistakes: [
      { wrong: "We must to submit the report.", right: "We must submit the report.", why: "조동사 뒤에는 to 없이 동사원형." },
      { wrong: "He can speaks three languages.", right: "He can speak three languages.", why: "조동사 뒤 동사원형(3인칭 -s 없음)." },
      { wrong: "You should have call me.", right: "You should have called me.", why: "조동사 + have + 과거분사." }
    ],
    quiz: [
      { q: "더 정중하게: Send me the file.", a: "Could you (please) send me the file?", explain: "Could you …? 로 요청." },
      { q: "빈칸: The meeting ___ be postponed if the CEO can't attend. (~할 수도)", a: "may / might / could", explain: "가능성." },
      { q: "과거 후회: 우리는 더 일찍 시작했어야 했다.", a: "We should have started earlier.", explain: "should have p.p." }
    ]
  },
  {
    id: "conditionals",
    title: "가정법",
    en: "Conditionals & Subjunctive",
    summary: "if 조건문(0·1·2·3형식)과 가정법 — 시나리오·전망·가정의 표현.",
    explanation: [
      "<b>1형식(현실 조건)</b>: If + 현재, will + V — 실제로 일어날 수 있는 일. <b>2형식(가정법 과거)</b>: If + 과거, would + V — 현재 사실의 반대·가능성 낮은 일. <b>3형식(가정법 과거완료)</b>: If + had p.p., would have p.p. — 과거 사실의 반대.",
      "비즈니스 문서에서는 if를 생략한 도치(Should you have any questions…, Had we known…)와 'unless, provided that, as long as, in case' 같은 조건 표현도 자주 씁니다. 요구·제안 동사(recommend, insist, require) 뒤 that절에는 동사원형을 씁니다(가정법 현재)."
    ],
    patterns: [
      { id: "cond-first", name: "1형식(현실 조건)", form: "If + S 현재, S will + V", desc: "if절에는 will을 쓰지 않음.", example: "If rates rise, borrowing costs will increase." },
      { id: "cond-second", name: "2형식(가정법 과거)", form: "If + S 과거(were), S would + V", desc: "현재와 반대 / 가능성 낮음.", example: "If we had more staff, we would expand faster." },
      { id: "cond-third", name: "3형식(가정법 과거완료)", form: "If + S had p.p., S would have p.p.", desc: "과거와 반대.", example: "If the bill had passed, wages would have risen." },
      { id: "cond-inversion", name: "if 생략 도치 · 조건 표현", form: "Should you …, / Had S p.p., / unless / provided that / as long as", desc: "격식 있는 비즈니스 문체.", example: "Should you have any questions, please contact me." },
      { id: "cond-mandative", name: "요구·제안의 that절", form: "recommend / insist / require / propose + that + S + 동사원형", desc: "(should) 생략, 동사원형.", example: "The panel recommended that the age limit be raised." }
    ],
    examples: [
      { en: "If the retirement age is extended, companies will need to revise their wage systems.", ko: "정년이 연장되면 기업들은 임금 체계를 손봐야 할 것이다." },
      { en: "If inflation were lower, the central bank would cut rates.", ko: "물가가 더 낮다면 중앙은행은 금리를 내릴 텐데." },
      { en: "Had investors known about the SEC probe, they would have sold earlier.", ko: "투자자들이 SEC 조사에 대해 알았다면 더 일찍 팔았을 것이다." },
      { en: "Should you need further information, please let us know.", ko: "추가 정보가 필요하시면 알려 주십시오." },
      { en: "The deal will go ahead provided that regulators approve it.", ko: "규제 당국이 승인한다면 거래는 진행될 것이다." },
      { en: "Unless the two sides compromise, the strike will continue.", ko: "양측이 타협하지 않으면 파업은 계속될 것이다." },
      { en: "The union insisted that the government submit a bill this year.", ko: "노조는 정부가 올해 법안을 제출해야 한다고 주장했다." },
      { en: "If I were in your position, I would negotiate a longer contract.", ko: "내가 당신 입장이라면 더 긴 계약을 협상하겠다." }
    ],
    mistakes: [
      { wrong: "If it will rain tomorrow, we will cancel.", right: "If it rains tomorrow, we will cancel.", why: "조건의 if절에는 미래라도 현재시제." },
      { wrong: "If I was you, I would accept.", right: "If I were you, I would accept.", why: "가정법 과거에서 be동사는 격식체로 were." },
      { wrong: "If we had invested, we would earn more.", right: "If we had invested, we would have earned more.", why: "과거 사실 반대 → would have p.p." }
    ],
    quiz: [
      { q: "빈칸: If the economy ___ (grow) faster, unemployment would fall.", a: "grew", explain: "가정법 과거." },
      { q: "if 생략 도치로: If you have any questions, please call.", a: "Should you have any questions, please call.", explain: "Should 도치." },
      { q: "빈칸: The board recommended that he ___ (step) down.", a: "step", explain: "요구·제안 that절 → 동사원형." }
    ]
  },
  {
    id: "comparisons",
    title: "비교구문",
    en: "Comparatives & Superlatives",
    summary: "비교급·최상급·배수·the 비교급 the 비교급으로 수치와 정도를 비교.",
    explanation: [
      "형용사/부사를 비교급(-er, more), 최상급(-est, most)으로 바꿔 비교합니다. 경제 기사에서는 '역대 최대(the largest ever / record)', '~배(twice as … as, three times)', '~할수록 더(The more…, the more…)'가 단골입니다.",
      "비교 대상의 형태를 맞추는 것(병렬)과 than 뒤 대명사(that of, those of) 처리에 주의하세요."
    ],
    patterns: [
      { id: "comp-basic", name: "비교급 + than", form: "-er / more … than", desc: "much, far, significantly로 강조.", example: "Exports grew much faster than imports." },
      { id: "comp-super", name: "최상급", form: "the -est / the most … (in/of/ever)", desc: "the + 서수 + 최상급(두 번째로 큰).", example: "It was the largest drop since 2020." },
      { id: "comp-as", name: "원급·배수 비교", form: "as … as / twice as … as / X times larger than", desc: "not as(so) … as = ~만큼 ~하지 않다.", example: "Youth unemployment is twice as high as the national average." },
      { id: "comp-the-the", name: "the 비교급, the 비교급", form: "The + 비교급 S V, the + 비교급 S V", desc: "~할수록 더 ~하다.", example: "The longer the strike lasts, the bigger the losses." }
    ],
    examples: [
      { en: "The Nasdaq fell more sharply than the Dow and the S&P 500.", ko: "나스닥은 다우와 S&P500보다 더 가파르게 하락했다." },
      { en: "This was the company's steepest one-day drop in two years.", ko: "이는 그 회사의 2년 만에 가장 큰 하루 낙폭이었다." },
      { en: "Workers in their 60s now outnumber those in their 20s.", ko: "현재 60대 근로자가 20대 근로자보다 많다." },
      { en: "The cost of living in Seoul is higher than that of Busan.", ko: "서울의 생활비는 부산의 생활비보다 높다." },
      { en: "Chip exports were nearly three times larger than a year ago.", ko: "반도체 수출은 1년 전보다 거의 세 배 많았다." },
      { en: "The more data lenders have, the more accurately they can assess risk.", ko: "대출 기관이 데이터를 많이 가질수록 위험을 더 정확히 평가할 수 있다." },
      { en: "Growth was not as strong as analysts had expected.", ko: "성장세는 분석가들이 예상한 만큼 강하지 않았다." },
      { en: "The firm remained the second-largest company by market value.", ko: "그 회사는 시가총액 기준 두 번째로 큰 기업 자리를 유지했다." }
    ],
    mistakes: [
      { wrong: "Sales were more higher than expected.", right: "Sales were higher than expected. / much higher", why: "비교급을 이중으로 쓰지 않습니다. 강조는 much/far." },
      { wrong: "Seoul's population is larger than Busan.", right: "Seoul's population is larger than that of Busan (Busan's).", why: "인구 vs 인구로 비교 대상을 맞춥니다." },
      { wrong: "It is the most large market.", right: "It is the largest market.", why: "1~2음절 형용사는 -est." }
    ],
    quiz: [
      { q: "빈칸: The ___ we wait, the ___ it will cost. (long / much)", a: "longer / more", explain: "the 비교급, the 비교급." },
      { q: "영작: 수입은 수출의 절반 수준이었다.", a: "Imports were half as large as exports.", explain: "배수 비교 half as … as." },
      { q: "고치세요: This is the worse result ever.", a: "worse → worst", explain: "ever와 함께 최상급." }
    ]
  },
  {
    id: "passive",
    title: "수동태",
    en: "Passive Voice",
    summary: "be + p.p. — 행위자보다 대상·결과가 중요할 때, 뉴스·보고서의 기본 문체.",
    explanation: [
      "수동태는 '누가 했는지'보다 '무엇이 어떻게 되었는지'를 강조할 때 씁니다. 뉴스에서는 행위자가 분명하지 않거나 중요하지 않을 때(The bill was passed), 보도·전망을 전할 때(is expected to, is said to, It is reported that) 자주 사용합니다.",
      "시제별 형태: is p.p. / was p.p. / has been p.p. / is being p.p. / will be p.p. / must be p.p."
    ],
    patterns: [
      { id: "pass-basic", name: "기본 수동태", form: "S + be + p.p. (+ by 행위자)", desc: "행위자는 필요할 때만.", example: "The agreement was signed on Tuesday." },
      { id: "pass-tense", name: "시제·조동사 수동태", form: "has been p.p. / is being p.p. / will be p.p. / can be p.p.", desc: "완료·진행·미래·조동사.", example: "The plan is being reviewed by the ministry." },
      { id: "pass-report", name: "보도 수동태", form: "It is reported/said/expected that … / S is said to V", desc: "출처를 흐리며 전달.", example: "Nvidia is reported to be under SEC investigation." },
      { id: "pass-get", name: "주의할 수동 표현", form: "be reflected in / be subject to / be required to / be based on", desc: "자주 쓰는 수동 연어.", example: "Work history will be reflected in credit scores." }
    ],
    examples: [
      { en: "Work records of platform workers will be reflected in credit evaluations.", ko: "플랫폼 노동자의 근로 이력이 신용평가에 반영될 예정이다." },
      { en: "The memorandum of understanding was signed by the ministry and financial authorities.", ko: "업무협약은 노동부와 금융당국이 체결했다." },
      { en: "Nvidia's accounting practices are reportedly being investigated by the SEC.", ko: "엔비디아의 회계 처리 방식이 SEC의 조사를 받고 있는 것으로 알려졌다." },
      { en: "It is expected that the bill will be submitted by the end of the year.", ko: "법안은 연말까지 제출될 것으로 예상된다." },
      { en: "More than 300 jobs have been cut since January.", ko: "1월 이후 300개 넘는 일자리가 감축됐다." },
      { en: "All employees are required to complete the training by June.", ko: "모든 직원은 6월까지 교육을 이수해야 한다." },
      { en: "The figures are based on data from Statistics Korea.", ko: "수치는 통계청 자료를 바탕으로 한다." },
      { en: "The meeting has been rescheduled to next Monday.", ko: "회의가 다음 주 월요일로 변경되었다." }
    ],
    mistakes: [
      { wrong: "The accident was happened yesterday.", right: "The accident happened yesterday.", why: "happen, occur, rise, fall 같은 자동사는 수동태가 없습니다." },
      { wrong: "The report will publish next week.", right: "The report will be published next week.", why: "보고서는 '발표되는' 대상 → 수동." },
      { wrong: "Prices were risen by 5%.", right: "Prices rose 5%. / Prices were raised by 5%.", why: "rise(자동사) vs raise(타동사) 구분." }
    ],
    quiz: [
      { q: "수동태로: The board approved the budget.", a: "The budget was approved (by the board).", explain: "목적어를 주어로." },
      { q: "빈칸: The factory ___ ___ ___ (build) right now.", a: "is being built", explain: "진행 수동태." },
      { q: "맞는 것: Unemployment (was increased / increased) last month.", a: "increased", explain: "자동사 increase(늘다)." }
    ]
  },
  {
    id: "inversion-emphasis",
    title: "도치 · 강조",
    en: "Inversion & Emphasis",
    summary: "부정어 도치, It is … that 강조구문, do 강조로 핵심을 부각합니다.",
    explanation: [
      "<b>부정어 도치</b>: Never, Rarely, Not only, Only after, Little 등 부정·제한 표현이 문장 앞에 오면 조동사 + 주어 순서로 도치됩니다. 격식 있는 보고서·연설에서 강조 효과가 큽니다.",
      "<b>It is A that …</b> 강조구문은 A를 강조합니다. <b>do/does/did + 동사원형</b>은 동사를 강조합니다('정말로 ~하다'). What 강조(What we need is …)도 자주 씁니다."
    ],
    patterns: [
      { id: "inv-negative", name: "부정어 도치", form: "Never / Rarely / Seldom / Little + 조동사 + S + V", desc: "부정 부사가 문두로.", example: "Rarely has the market fallen so fast." },
      { id: "inv-only-notonly", name: "Not only / Only + 부사구 도치", form: "Not only + 조동사 + S V, but … / Only after/when … + 조동사 + S V", desc: "강조 + 도치.", example: "Only after the probe began did the shares fall." },
      { id: "emph-itthat", name: "It is … that 강조구문", form: "It is/was + 강조어 + that …", desc: "주어·목적어·부사구 강조.", example: "It was tech stocks that led the decline." },
      { id: "emph-do-what", name: "do 강조 · What 강조", form: "do/does/did + V / What S V is …", desc: "동사·내용 강조.", example: "We do value your feedback." }
    ],
    examples: [
      { en: "Not only did the Nasdaq erase its gains, but it also dragged Asian chip stocks lower.", ko: "나스닥은 상승분을 모두 반납했을 뿐 아니라 아시아 반도체주까지 끌어내렸다." },
      { en: "Rarely have chip stocks fallen this sharply in a single day.", ko: "반도체주가 하루에 이렇게 급락한 적은 드물다." },
      { en: "It is workers in their 60s that are driving job growth.", ko: "고용 증가를 이끌고 있는 것은 바로 60대 근로자들이다." },
      { en: "Only when the government acts will the issue be resolved.", ko: "정부가 행동해야만 그 문제는 해결될 것이다." },
      { en: "Never before has the retirement debate been so intense.", ko: "정년 논쟁이 이렇게 뜨거웠던 적은 없었다." },
      { en: "What freelancers need most is fair access to credit.", ko: "프리랜서에게 가장 필요한 것은 공정한 신용 접근성이다." },
      { en: "The policy did help some workers, but its impact was limited.", ko: "그 정책은 일부 근로자에게 분명 도움이 되었지만 효과는 제한적이었다." },
      { en: "Little did investors expect such a steep selloff.", ko: "투자자들은 그렇게 급격한 매도세를 거의 예상하지 못했다." }
    ],
    mistakes: [
      { wrong: "Never I have seen such growth.", right: "Never have I seen such growth.", why: "부정어 문두 → 조동사 + 주어 도치." },
      { wrong: "Only after the meeting we understood.", right: "Only after the meeting did we understand.", why: "Only + 부사구 문두 → did + S + 동사원형." },
      { wrong: "It was in 2020 when the company went public.", right: "It was in 2020 that the company went public.", why: "강조구문은 기본적으로 that을 씁니다." }
    ],
    quiz: [
      { q: "도치로: We seldom see such strong demand.", a: "Seldom do we see such strong demand.", explain: "Seldom + do + S + V." },
      { q: "강조구문: 'The CEO announced the plan.'에서 the CEO 강조", a: "It was the CEO that (who) announced the plan.", explain: "It was … that." },
      { q: "빈칸: Not only ___ prices rise, but wages also fell. (did / were)", a: "did", explain: "일반동사 과거 → did 도치." }
    ]
  },
  {
    id: "transitions",
    title: "비즈니스 연결표현",
    en: "Transition Phrases",
    summary: "however·therefore·in addition 등 문장 사이의 논리를 이어 주는 연결어.",
    explanation: [
      "연결표현(접속부사·전환어)은 문장과 문장, 문단과 문단 사이의 논리 관계를 보여 줍니다. 접속사와 달리 문장을 직접 잇지 못하므로 <b>마침표나 세미콜론 뒤 + 쉼표</b>로 씁니다: …; however, … / … . However, …",
      "기능별로 묶어서 외우면 보고서·이메일·발표에서 바로 쓸 수 있습니다: 추가, 대조, 결과, 예시, 순서, 요약."
    ],
    patterns: [
      { id: "trans-add", name: "추가", form: "In addition / Moreover / Furthermore / Also / On top of that", desc: "정보를 덧붙일 때.", example: "In addition, the bank will lower its fees." },
      { id: "trans-contrast", name: "대조·양보", form: "However / Nevertheless / On the other hand / By contrast / Meanwhile", desc: "앞 내용과 반대·대비.", example: "By contrast, employment among people in their 20s fell." },
      { id: "trans-result", name: "결과·인과", form: "Therefore / As a result / Consequently / Accordingly / Hence", desc: "앞 내용의 결과.", example: "As a result, the index entered correction territory." },
      { id: "trans-example", name: "예시·구체화", form: "For example / For instance / In particular / Specifically", desc: "구체적인 사례.", example: "In particular, chip stocks were hit hard." },
      { id: "trans-sequence", name: "순서·요약", form: "First / Next / Finally / In short / Overall / To sum up", desc: "발표·보고서 구조.", example: "Overall, the outlook remains uncertain." }
    ],
    examples: [
      { en: "Older workers drove job growth. By contrast, employment among people in their 20s and 30s declined.", ko: "고령 근로자가 고용 증가를 이끌었다. 반면 20·30대 고용은 감소했다." },
      { en: "Tech stocks plunged; as a result, the Nasdaq gave back all of its 2026 gains.", ko: "기술주가 폭락했고, 그 결과 나스닥은 2026년 상승분을 모두 반납했다." },
      { en: "The program lowers interest rates. In addition, it raises loan limits for freelancers.", ko: "그 프로그램은 금리를 낮춘다. 게다가 프리랜서의 대출 한도도 높인다." },
      { en: "Demand remains strong. Nevertheless, the company expects slower growth next year.", ko: "수요는 여전히 강하다. 그럼에도 불구하고 회사는 내년 성장 둔화를 예상한다." },
      { en: "Several sectors were affected. In particular, semiconductors fell more than 10%.", ko: "여러 업종이 영향을 받았다. 특히 반도체주는 10% 넘게 떨어졌다." },
      { en: "Meanwhile, bond prices rose as investors sought safe assets.", ko: "한편 투자자들이 안전자산을 찾으면서 채권 가격은 올랐다." },
      { en: "Costs have risen sharply. Therefore, we propose a 5% price adjustment.", ko: "비용이 크게 올랐습니다. 따라서 5% 가격 조정을 제안합니다." },
      { en: "To sum up, the new policy benefits workers but raises costs for employers.", ko: "요약하면, 새 정책은 근로자에게 이롭지만 고용주의 비용을 늘린다." },
      { en: "First, we will review the data. Next, we will share our recommendations.", ko: "먼저 자료를 검토하겠습니다. 다음으로 권고안을 공유하겠습니다." }
    ],
    mistakes: [
      { wrong: "Sales rose, however profits fell.", right: "Sales rose; however, profits fell. / Sales rose. However, profits fell.", why: "however는 접속사가 아니므로 쉼표만으로 두 절을 잇지 못합니다." },
      { wrong: "On the other hand, I like coffee. (대조 대상 없이)", right: "In addition / Also …", why: "on the other hand는 앞 내용과 대조될 때만." },
      { wrong: "Besides of the cost, …", right: "Besides the cost, … / In addition to the cost, …", why: "besides는 of 없이 씁니다." }
    ],
    quiz: [
      { q: "빈칸(결과): Demand fell. ___, the plant cut output.", a: "As a result / Consequently / Therefore", explain: "결과의 연결어." },
      { q: "빈칸(대조): Exports rose. ___, imports declined.", a: "Meanwhile / By contrast / On the other hand", explain: "대비." },
      { q: "구두점을 고치세요: The deal was delayed, nevertheless it went ahead.", a: "The deal was delayed; nevertheless, it went ahead.", explain: "접속부사는 세미콜론/마침표 + 쉼표." }
    ]
  }
];
