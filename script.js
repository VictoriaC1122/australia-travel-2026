const STORAGE_KEYS = {
  lang: "australia-handbook-lang",
  currency: "australia-handbook-currency",
  checklist: "australia-handbook-checklist-v1",
  page: "australia-handbook-page",
};

const PAGE_IDS = ["overview", "flights", "stays", "itinerary", "budget", "notes"];

const state = {
  lang: localStorage.getItem(STORAGE_KEYS.lang) || "zh-Hant",
  currency: localStorage.getItem(STORAGE_KEYS.currency) || "TWD",
  page: PAGE_IDS.includes(localStorage.getItem(STORAGE_KEYS.page)) ? localStorage.getItem(STORAGE_KEYS.page) : "overview",
};

const rates = {
  AUD: { symbol: "A$", audPerUnit: 1 },
  TWD: { symbol: "NT$", audPerUnit: 20.7 },
};

const t = {
  "zh-Hant": {
    languageSwitcher: "語言",
    currencySwitcher: "幣別",
    heroKicker: "Australia travel handbook",
    heroTitle: "澳洲旅行 2026",
    heroSubtitle: "2026 年 5 月 · 墨爾本進、雪梨出",
    heroDates: "2026 / 05 / 23 - 2026 / 05 / 30",
    heroDestinations: "Melbourne · Great Ocean Road · Sydney · Bondi · The Rocks",
    navOverview: "總覽",
    navFlights: "航班",
    navStays: "住宿 / 城市節奏",
    navItinerary: "行程",
    navBudget: "預算",
    navNotes: "清單 / 連結",
    overviewKicker: "總覽",
    overviewTitle: "這趟怎麼排",
    overviewLead: "用最少移動換到兩座城市的代表感，前段放鬆看墨爾本，後段收在雪梨海岸與港灣。",
    shortcutFlights: "航班",
    shortcutFlightsNote: "先核對機場與日期",
    shortcutItinerary: "每日行程",
    shortcutItineraryNote: "每天去哪裡直接看這裡",
    shortcutBudget: "預算",
    shortcutBudgetNote: "先抓一個舒服的花費範圍",
    shortcutChecklist: "清單",
    shortcutChecklistNote: "出發前最後再打開",
    overviewHighlightsKicker: "重點",
    overviewHighlightsTitle: "這版行程的重點",
    overviewAlertsTitle: "重要提醒",
    overviewNotesTitle: "安排理由",
    flightsKicker: "航班",
    flightsTitle: "航班",
    flightsLead: "目前已知是桃園飛墨爾本、雪梨飛回桃園，這種開口票很適合中段直接換城市。",
    flightsSummaryTitle: "航班資訊",
    flightPlanTitle: "銜接建議",
    staysKicker: "城市節奏",
    staysTitle: "住宿 / 城市節奏",
    staysLead: "因為你是墨爾本進、雪梨出，我先用 3 晚墨爾本加 2 晚雪梨來排，移動感和景點密度最平衡。",
    cityRhythmTitle: "城市節奏",
    moveDayTitle: "城際移動日",
    moveOptionsTitle: "中段交通選項",
    itineraryKicker: "行程",
    itineraryTitle: "每日行程",
    itineraryLead: "這份安排偏好拍照、散步、舒服吃飯，不走太硬的打卡衝刺。",
    budgetKicker: "預算",
    budgetTitle: "預算",
    budgetLead: "先抓一版中高舒適度預算，之後有實際飯店和澳洲內陸段票價再微調就好。",
    notesKicker: "清單",
    notesTitle: "清單 / 連結",
    notesLead: "把臨出發最常需要確認的東西集中在最後一頁。",
    budgetItemHeading: "項目",
    budgetOriginalHeading: "AUD",
    budgetNoteHeading: "備註",
    checklistTitle: "行前清單",
    linksTitle: "實用連結",
    openLink: "開啟",
    dateText: "日期",
    classText: "艙等",
    totalTripCostLabel: "兩人總預估",
    totalTripCostNote: "含機票、住宿、城際交通、餐食與門票",
    perPersonCostLabel: "每人預估",
    perPersonCostNote: "以兩人平均分攤估算",
    bookedLabel: "已確定支出",
    bookedNote: "目前先算國際機票",
    flexibleLabel: "可調整空間",
    flexibleNote: "飯店與內陸段還能依喜好變動",
    locationLabel: "地點",
    estimatedCostLabel: "預估花費",
    transportLabel: "交通",
    reminderLabel: "提醒",
    checklistProgress: "完成",
  },
  en: {
    languageSwitcher: "Language",
    currencySwitcher: "Currency",
    heroKicker: "Australia travel handbook",
    heroTitle: "Australia Travel 2026",
    heroSubtitle: "May 2026 · Melbourne in, Sydney out",
    heroDates: "2026 / 05 / 23 - 2026 / 05 / 30",
    heroDestinations: "Melbourne · Great Ocean Road · Sydney · Bondi · The Rocks",
    navOverview: "Overview",
    navFlights: "Flights",
    navStays: "Stay Rhythm",
    navItinerary: "Itinerary",
    navBudget: "Budget",
    navNotes: "Checklist / Links",
    overviewKicker: "Overview",
    overviewTitle: "How this trip flows",
    overviewLead: "The plan keeps transfers light: a relaxed Melbourne opening and a Sydney finish with harbor and coast.",
    shortcutFlights: "Flights",
    shortcutFlightsNote: "Confirm airports and dates first",
    shortcutItinerary: "Daily plan",
    shortcutItineraryNote: "Open this for each day",
    shortcutBudget: "Budget",
    shortcutBudgetNote: "See the comfortable spend range",
    shortcutChecklist: "Checklist",
    shortcutChecklistNote: "Open this right before departure",
    overviewHighlightsKicker: "Highlights",
    overviewHighlightsTitle: "Why this version works",
    overviewAlertsTitle: "Important reminders",
    overviewNotesTitle: "Planning logic",
    flightsKicker: "Flights",
    flightsTitle: "Flights",
    flightsLead: "You already have an open-jaw ticket, which makes a Melbourne-to-Sydney city switch the cleanest mid-trip move.",
    flightsSummaryTitle: "Flight details",
    flightPlanTitle: "Connection advice",
    staysKicker: "Stay rhythm",
    staysTitle: "Stay Rhythm",
    staysLead: "The default split is 3 nights in Melbourne and 2 nights in Sydney for the best balance of pace and movement.",
    cityRhythmTitle: "City rhythm",
    moveDayTitle: "Intercity move day",
    moveOptionsTitle: "Mid-trip transfer options",
    itineraryKicker: "Itinerary",
    itineraryTitle: "Day by Day",
    itineraryLead: "This version favors photos, walking, and good meals over rushing through a long checklist.",
    budgetKicker: "Budget",
    budgetTitle: "Budget",
    budgetLead: "This is a comfortable mid-high estimate that can be refined once hotels and the domestic leg are booked.",
    notesKicker: "Notes",
    notesTitle: "Checklist / Links",
    notesLead: "The final page keeps the most frequently needed pre-departure items in one place.",
    budgetItemHeading: "Item",
    budgetOriginalHeading: "AUD",
    budgetNoteHeading: "Note",
    checklistTitle: "Pre-trip checklist",
    linksTitle: "Useful links",
    openLink: "Open",
    dateText: "Date",
    classText: "Cabin",
    totalTripCostLabel: "Estimated total for two",
    totalTripCostNote: "Includes flights, stays, intercity transfer, food, and tickets",
    perPersonCostLabel: "Estimated per person",
    perPersonCostNote: "Split evenly for two people",
    bookedLabel: "Already locked in",
    bookedNote: "Currently counting the international flights",
    flexibleLabel: "Flexible spend",
    flexibleNote: "Hotels and the domestic leg can still move",
    locationLabel: "Location",
    estimatedCostLabel: "Estimated cost",
    transportLabel: "Transport",
    reminderLabel: "Reminder",
    checklistProgress: "done",
  },
};

const data = {
  heroSummary: [
    {
      label: { "zh-Hant": "天數", en: "Length" },
      value: { "zh-Hant": "6 天 5 夜", en: "6 days / 5 nights" },
    },
    {
      label: { "zh-Hant": "進出城市", en: "Flight pattern" },
      value: { "zh-Hant": "墨爾本進、雪梨出", en: "Into Melbourne, out of Sydney" },
    },
    {
      label: { "zh-Hant": "中段移動", en: "Mid-trip move" },
      value: { "zh-Hant": "建議 5/27 飛雪梨", en: "Fly to Sydney on May 27" },
    },
    {
      label: { "zh-Hant": "行程風格", en: "Travel style" },
      value: { "zh-Hant": "舒服散步 + 海岸 + 城市", en: "Relaxed city + coast + photos" },
    },
  ],
  keyInfo: [
    {
      label: { "zh-Hant": "去程落地", en: "Arrival" },
      value: { "zh-Hant": "5/24 10:40 墨爾本", en: "May 24, 10:40 Melbourne" },
      note: { "zh-Hant": "第一天不要排太滿", en: "Keep day one light" },
    },
    {
      label: { "zh-Hant": "最推薦移動日", en: "Best move day" },
      value: { "zh-Hant": "5/27 墨爾本 → 雪梨", en: "May 27 Melbourne to Sydney" },
      note: { "zh-Hant": "用中午前班機最順", en: "A late-morning flight works best" },
    },
    {
      label: { "zh-Hant": "回程起飛", en: "Departure" },
      value: { "zh-Hant": "5/29 22:10 雪梨", en: "May 29, 22:10 Sydney" },
      note: { "zh-Hant": "最後一天可再玩半天", en: "You still get most of the final day" },
    },
  ],
  overviewRecommendations: [
    {
      tag: { "zh-Hant": "墨爾本", en: "Melbourne" },
      title: { "zh-Hant": "市區 + 巷弄咖啡排一天半", en: "Give the CBD and laneways 1.5 days" },
      desc: { "zh-Hant": "剛落地先走輕鬆版，隔天再把維多利亞市場、巷弄和河岸串起來。", en: "Start gently after landing, then use the next full day for markets, laneways, and the river." },
    },
    {
      tag: { "zh-Hant": "郊區日", en: "Scenic day" },
      title: { "zh-Hant": "大洋路或企鵝島擇一", en: "Choose Great Ocean Road or Phillip Island" },
      desc: { "zh-Hant": "6 天行程不建議兩個都塞，選一個代表性日遊會更舒服。", en: "For a 6-day trip, one signature day trip is the sweet spot." },
    },
    {
      tag: { "zh-Hant": "雪梨", en: "Sydney" },
      title: { "zh-Hant": "港灣和海灘各留半天", en: "Keep half a day for harbor and half for beach" },
      desc: { "zh-Hant": "歌劇院、岩石區和邦代步道的節奏分開，拍照效果也比較好。", en: "Split the harbor and Bondi walk into separate windows for a better pace and better photos." },
    },
  ],
  importantAlerts: [
    {
      title: { "zh-Hant": "你的日期跨兩座城市，最好不要每天換飯店", en: "Do not hotel-hop too much" },
      desc: { "zh-Hant": "這趟的優勢是開口票，住宿只要鎖兩間就能讓整體很順。", en: "The open-jaw ticket already does the heavy lifting, so keeping only two hotel bases makes the trip much smoother." },
    },
    {
      title: { "zh-Hant": "5/27 建議直接飛，不建議火車", en: "Fly on May 27 instead of taking the train" },
      desc: { "zh-Hant": "墨爾本到雪梨火車太久，6 天行程會吃掉太多可玩時間。", en: "The train takes too long and would consume too much of a short trip." },
    },
    {
      title: { "zh-Hant": "5/29 回程很晚，白天仍可排海邊或港灣", en: "Your late return flight keeps the last day usable" },
      desc: { "zh-Hant": "只要預留傍晚回飯店拿行李、再去機場即可。", en: "You only need to leave time in the evening to collect luggage and head to the airport." },
    },
  ],
  overviewNotes: [
    {
      title: { "zh-Hant": "先慢後亮", en: "Soft opening, stronger finish" },
      desc: { "zh-Hant": "剛到澳洲先給墨爾本輕鬆城市感，後面再把雪梨最上鏡的海港和海岸收尾。", en: "Melbourne handles jet lag gently, while Sydney gives the trip a photogenic finish." },
    },
    {
      title: { "zh-Hant": "城際移動放在第 4 天", en: "Move cities on day four" },
      desc: { "zh-Hant": "這樣兩邊都能住得完整，不會有其中一座城市只踩到表面。", en: "This keeps both cities feeling complete instead of shallow." },
    },
    {
      title: { "zh-Hant": "預算先抓舒適版本", en: "Budget for comfort first" },
      desc: { "zh-Hant": "澳洲住宿和餐費波動大，先抓高一點，之後只會更輕鬆。", en: "Australian hotel and dining costs swing a lot, so a comfortable estimate is the safest baseline." },
    },
  ],
  flights: [
    {
      label: { "zh-Hant": "去程", en: "Outbound" },
      route: "TPE → MEL",
      date: "2026-05-23 / 2026-05-24",
      time: "23:30 → 10:40",
      cabin: { "zh-Hant": "CI 0057", en: "CI 0057" },
      airport: { "zh-Hant": "桃園第 2 航廈 → 墨爾本第 2 航廈", en: "Taoyuan T2 → Melbourne T2" },
    },
    {
      label: { "zh-Hant": "回程", en: "Return" },
      route: "SYD → TPE",
      date: "2026-05-29 / 2026-05-30",
      time: "22:10 → 05:40",
      cabin: { "zh-Hant": "CI 0052", en: "CI 0052" },
      airport: { "zh-Hant": "雪梨第 1 航廈 → 桃園第 2 航廈", en: "Sydney T1 → Taoyuan T2" },
    },
  ],
  flightNotes: [
    {
      title: { "zh-Hant": "第一天只排市區散步", en: "Keep the arrival day light" },
      desc: { "zh-Hant": "你 2026 年 5 月 24 日星期日 10:40 才到墨爾本，通關加進市區後已經接近中午。", en: "You land in Melbourne at 10:40 on Sunday, May 24, 2026, so by the time you clear the airport and reach the city it will be close to noon." },
    },
    {
      title: { "zh-Hant": "中段飛雪梨最省時間", en: "A domestic flight is the cleanest city switch" },
      desc: { "zh-Hant": "抓 5/27 上午或中午飛，抵達後還有半天可以排雪梨歌劇院或環形碼頭。", en: "Book a flight on May 27 in the late morning or around noon, and you still keep half a day in Sydney." },
    },
    {
      title: { "zh-Hant": "最後一天保留機場緩衝", en: "Protect the airport buffer on the final day" },
      desc: { "zh-Hant": "雪梨國際線建議提早 3 小時到，5/29 晚上回機場不要拖太晚。", en: "Sydney international departures are more comfortable with a 3-hour buffer, so do not cut the evening too fine on May 29." },
    },
  ],
  stayPlan: {
    title: { "zh-Hant": "建議住宿分配", en: "Suggested stay split" },
    subtitle: {
      "zh-Hant": "先把城市骨架排好，等你補上實際飯店後再替換地址與入住資訊。",
      en: "Set the city structure first, then swap in real hotel details later.",
    },
    chips: [
      { "zh-Hant": "墨爾本 3 晚", en: "3 nights Melbourne" },
      { "zh-Hant": "雪梨 2 晚", en: "2 nights Sydney" },
      { "zh-Hant": "兩間飯店就好", en: "Only two hotels" },
    ],
    notes: [
      {
        title: { "zh-Hant": "墨爾本住宿區", en: "Melbourne base" },
        value: { "zh-Hant": "CBD / Southern Cross 附近", en: "CBD / near Southern Cross" },
      },
      {
        title: { "zh-Hant": "雪梨住宿區", en: "Sydney base" },
        value: { "zh-Hant": "CBD / Circular Quay / Town Hall", en: "CBD / Circular Quay / Town Hall" },
      },
      {
        title: { "zh-Hant": "中段交通", en: "Intercity move" },
        value: { "zh-Hant": "澳洲國內線飛機", en: "Domestic flight" },
      },
    ],
  },
  cityRhythm: [
    {
      title: { "zh-Hant": "墨爾本適合慢一點", en: "Melbourne likes a slower pace" },
      desc: { "zh-Hant": "咖啡、巷弄、河岸和市場都靠近，住市中心會很省力。", en: "Coffee stops, laneways, river walks, and the market all stay easy from a central base." },
    },
    {
      title: { "zh-Hant": "雪梨景點更像一鏡到底", en: "Sydney rewards clean visual blocks" },
      desc: { "zh-Hant": "把港灣和海灘拆開排，照片和腳程都更舒服。", en: "Separating the harbor and beach days improves both energy and photography." },
    },
    {
      title: { "zh-Hant": "這樣回程壓力最小", en: "This also makes departure easier" },
      desc: { "zh-Hant": "最後一晚直接睡雪梨，不需要當天再從外地趕機場。", en: "Sleeping in Sydney the final night removes a lot of airport-day stress." },
    },
  ],
  moveDayTimeline: [
    {
      time: "09:00",
      title: { "zh-Hant": "墨爾本退房", en: "Check out in Melbourne" },
      desc: { "zh-Hant": "早餐後慢慢出門，保留市區到機場交通緩衝。", en: "Head out after breakfast and keep airport transfer time comfortable." },
    },
    {
      time: "12:00",
      title: { "zh-Hant": "飛往雪梨", en: "Fly to Sydney" },
      desc: { "zh-Hant": "中午前後班機最剛好，不會太早起也不會吃掉晚上。", en: "A flight around noon is the best balance." },
    },
    {
      time: "16:00",
      title: { "zh-Hant": "雪梨入住後散步", en: "Check in and take an easy walk" },
      desc: { "zh-Hant": "可先去 Circular Quay、The Rocks 或歌劇院外圍。", en: "Start with Circular Quay, The Rocks, or the Opera House exterior." },
    },
  ],
  moveOptions: [
    {
      title: { "zh-Hant": "Jetstar / Virgin / Qantas", en: "Jetstar / Virgin / Qantas" },
      duration: { "zh-Hant": "約 1.5 小時", en: "About 1.5 hrs" },
      start: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" },
      destination: { "zh-Hant": "雪梨機場", en: "Sydney Airport" },
      cost: { "zh-Hant": "常見 A$90 - A$180 / 人", en: "Often A$90 - A$180 pp" },
      desc: { "zh-Hant": "最適合你這種 6 天行程，時間效率遠高於火車。", en: "Best fit for a 6-day trip and far more time-efficient than rail." },
    },
    {
      title: { "zh-Hant": "火車", en: "Train" },
      duration: { "zh-Hant": "超過 10 小時", en: "10+ hrs" },
      start: { "zh-Hant": "墨爾本市區", en: "Melbourne city" },
      destination: { "zh-Hant": "雪梨市區", en: "Sydney city" },
      cost: { "zh-Hant": "不一定更便宜", en: "Not always cheaper" },
      desc: { "zh-Hant": "如果不是專程想體驗，不建議把這麼長的時間放進短旅行。", en: "Only worth it if the train itself is part of the goal." },
    },
  ],
  itinerary: [
    {
      day: { "zh-Hant": "Day 1", en: "Day 1" },
      date: "2026-05-24",
      plan: { "zh-Hant": "落地墨爾本，市區暖身", en: "Arrive in Melbourne and ease in" },
      location: { "zh-Hant": "Southbank / Flinders Street / Hosier Lane", en: "Southbank / Flinders Street / Hosier Lane" },
      costAud: 120,
      transport: { "zh-Hant": "機場進市區 + 市區步行", en: "Airport transfer + city walking" },
      reminder: { "zh-Hant": "晚上早點休息，隔天再排完整城市日。", en: "Rest early and use the next day for the full city plan." },
      open: true,
    },
    {
      day: { "zh-Hant": "Day 2", en: "Day 2" },
      date: "2026-05-25",
      plan: { "zh-Hant": "墨爾本巷弄、咖啡、市場日", en: "Melbourne laneways, coffee, and market day" },
      location: { "zh-Hant": "Queen Victoria Market / Degraves Street / Fitzroy", en: "Queen Victoria Market / Degraves Street / Fitzroy" },
      costAud: 180,
      transport: { "zh-Hant": "電車 + 步行", en: "Tram + walking" },
      reminder: { "zh-Hant": "午餐與咖啡排漂亮一點，這天很適合拍街景。", en: "Make lunch and coffee choices count. This is your best urban photo day." },
    },
    {
      day: { "zh-Hant": "Day 3", en: "Day 3" },
      date: "2026-05-26",
      plan: { "zh-Hant": "大洋路一日遊或企鵝島二選一", en: "Choose Great Ocean Road or Phillip Island" },
      location: { "zh-Hant": "維州郊區一日遊", en: "A signature Victoria day trip" },
      costAud: 320,
      transport: { "zh-Hant": "參加一日團最省心", en: "A guided day tour is easiest" },
      reminder: { "zh-Hant": "6 天行程只排一個遠程日遊最剛好。", en: "One long day trip is the sweet spot for this trip length." },
    },
    {
      day: { "zh-Hant": "Day 4", en: "Day 4" },
      date: "2026-05-27",
      plan: { "zh-Hant": "飛往雪梨，下午看港灣", en: "Fly to Sydney and spend the afternoon by the harbor" },
      location: { "zh-Hant": "Circular Quay / Sydney Opera House / The Rocks", en: "Circular Quay / Sydney Opera House / The Rocks" },
      costAud: 240,
      transport: { "zh-Hant": "國內線飛機 + 市區火車", en: "Domestic flight + airport train" },
      reminder: { "zh-Hant": "這天下午盡量只放港灣，不要再塞海灘。", en: "Keep this afternoon harbor-only and save the beach for tomorrow." },
    },
    {
      day: { "zh-Hant": "Day 5", en: "Day 5" },
      date: "2026-05-28",
      plan: { "zh-Hant": "邦代海灘到 Coogee 海岸步道", en: "Bondi to Coogee coastal walk" },
      location: { "zh-Hant": "Bondi / Tamarama / Bronte / Coogee", en: "Bondi / Tamarama / Bronte / Coogee" },
      costAud: 160,
      transport: { "zh-Hant": "巴士 + 步行", en: "Bus + walking" },
      reminder: { "zh-Hant": "海風大，帶薄外套和太陽眼鏡。", en: "Bring a light layer and sunglasses for the coast." },
    },
    {
      day: { "zh-Hant": "Day 6", en: "Day 6" },
      date: "2026-05-29",
      plan: { "zh-Hant": "雪梨最後半天，傍晚回飯店取行李後去機場", en: "Final Sydney half-day, then collect luggage and head to the airport" },
      location: { "zh-Hant": "QVB / Hyde Park / Darling Harbour 或自由採買", en: "QVB / Hyde Park / Darling Harbour or flexible shopping" },
      costAud: 150,
      transport: { "zh-Hant": "市區步行 + 機場線", en: "City walking + airport train" },
      reminder: { "zh-Hant": "國際線晚班機仍建議預留 3 小時報到。", en: "Keep a 3-hour buffer for the late-night international departure." },
    },
  ],
  budgetRows: [
    {
      item: { "zh-Hant": "國際機票", en: "International flights" },
      aud: 1000,
      note: { "zh-Hant": "先用兩人約 NT$20,700 換算", en: "Assumes about NT$20,700 total for two" },
    },
    {
      item: { "zh-Hant": "墨爾本住宿 3 晚", en: "Melbourne stay, 3 nights" },
      aud: 660,
      note: { "zh-Hant": "中段舒適型雙人房", en: "Comfort mid-range double room" },
    },
    {
      item: { "zh-Hant": "雪梨住宿 2 晚", en: "Sydney stay, 2 nights" },
      aud: 520,
      note: { "zh-Hant": "雪梨通常比墨爾本稍貴", en: "Sydney is usually a bit pricier" },
    },
    {
      item: { "zh-Hant": "墨爾本 → 雪梨國內線", en: "Melbourne to Sydney domestic flight" },
      aud: 260,
      note: { "zh-Hant": "兩人抓中間值", en: "Mid-range estimate for two" },
    },
    {
      item: { "zh-Hant": "機場 / 市區交通", en: "Airport and city transport" },
      aud: 150,
      note: { "zh-Hant": "含機場快線、電車、巴士", en: "Includes airport train, tram, and buses" },
    },
    {
      item: { "zh-Hant": "餐食", en: "Food" },
      aud: 700,
      note: { "zh-Hant": "兩人 6 天舒適吃法", en: "Comfortable dining pace for two" },
    },
    {
      item: { "zh-Hant": "一日遊 / 門票", en: "Day tour / tickets" },
      aud: 360,
      note: { "zh-Hant": "抓一個代表性日遊", en: "Assumes one signature day trip" },
    },
    {
      item: { "zh-Hant": "購物與彈性", en: "Shopping and cushion" },
      aud: 350,
      note: { "zh-Hant": "留給臨時加點或戰利品", en: "Flex for extras and souvenirs" },
    },
  ],
  checklistGroups: [
    {
      title: { "zh-Hant": "文件", en: "Documents" },
      items: [
        { id: "passport", title: { "zh-Hant": "護照效期", en: "Passport validity" }, desc: { "zh-Hant": "確認回程日後仍有足夠效期。", en: "Make sure it remains valid well beyond the return date." } },
        { id: "eta", title: { "zh-Hant": "澳洲簽證 / ETA", en: "Australia ETA / visa" }, desc: { "zh-Hant": "出發前務必完成。", en: "This should be completed before departure." } },
        { id: "insurance", title: { "zh-Hant": "旅遊保險", en: "Travel insurance" }, desc: { "zh-Hant": "建議把保單電子檔也存手機。", en: "Keep a digital copy on your phone too." } },
      ],
    },
    {
      title: { "zh-Hant": "訂單", en: "Bookings" },
      items: [
        { id: "mel-hotel", title: { "zh-Hant": "墨爾本飯店", en: "Melbourne hotel" }, desc: { "zh-Hant": "鎖定 5/24 到 5/27 的住宿。", en: "Lock in the stay from May 24 to May 27." } },
        { id: "syd-hotel", title: { "zh-Hant": "雪梨飯店", en: "Sydney hotel" }, desc: { "zh-Hant": "鎖定 5/27 到 5/29 的住宿。", en: "Lock in the stay from May 27 to May 29." } },
        { id: "domestic", title: { "zh-Hant": "澳洲內陸段機票", en: "Domestic Australia flight" }, desc: { "zh-Hant": "越早訂通常越划算。", en: "Usually cheaper when booked earlier." } },
      ],
    },
    {
      title: { "zh-Hant": "行李", en: "Packing" },
      items: [
        { id: "layer", title: { "zh-Hant": "薄外套", en: "Light layer" }, desc: { "zh-Hant": "5 月澳洲入秋，早晚會涼。", en: "Australia is in autumn in May, so mornings and nights can feel cool." } },
        { id: "shoes", title: { "zh-Hant": "好走的鞋", en: "Walking shoes" }, desc: { "zh-Hant": "雪梨海岸步道會走比較久。", en: "The Sydney coastal walk is easier with good shoes." } },
        { id: "adapter", title: { "zh-Hant": "澳規轉接頭", en: "AU travel adapter" }, desc: { "zh-Hant": "澳洲插座規格和台灣不同。", en: "Australia uses a different plug type from Taiwan." } },
      ],
    },
  ],
  usefulLinks: [
    {
      title: { "zh-Hant": "航班", en: "Flights" },
      links: [
        { label: { "zh-Hant": "華航官網", en: "China Airlines" }, href: "https://www.china-airlines.com/" },
        { label: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" }, href: "https://www.melbourneairport.com.au/" },
        { label: { "zh-Hant": "雪梨機場", en: "Sydney Airport" }, href: "https://www.sydneyairport.com.au/" },
      ],
    },
    {
      title: { "zh-Hant": "城市交通", en: "City transport" },
      links: [
        { label: { "zh-Hant": "PTV 墨爾本交通", en: "PTV Melbourne" }, href: "https://www.ptv.vic.gov.au/" },
        { label: { "zh-Hant": "Transport NSW", en: "Transport NSW" }, href: "https://transportnsw.info/" },
      ],
    },
    {
      title: { "zh-Hant": "靈感", en: "Inspiration" },
      links: [
        { label: { "zh-Hant": "Visit Melbourne", en: "Visit Melbourne" }, href: "https://whatson.melbourne.vic.gov.au/" },
        { label: { "zh-Hant": "Sydney.com", en: "Sydney.com" }, href: "https://www.sydney.com/" },
      ],
    },
  ],
};

function getText(entry) {
  if (typeof entry === "string") return entry;
  return entry?.[state.lang] ?? entry?.["zh-Hant"] ?? "";
}

function formatCurrency(aud, currency = state.currency) {
  const meta = rates[currency];
  return `${meta.symbol}${Math.round(aud * meta.audPerUnit).toLocaleString()}`;
}

function checklistState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.checklist) || "{}");
}

function saveChecklist(next) {
  localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(next));
}

function updateDocumentTitle() {
  const titles = {
    overview: getText({ "zh-Hant": "總覽", en: "Overview" }),
    flights: getText({ "zh-Hant": "航班", en: "Flights" }),
    stays: getText({ "zh-Hant": "住宿 / 城市節奏", en: "Stay Rhythm" }),
    itinerary: getText({ "zh-Hant": "行程", en: "Itinerary" }),
    budget: getText({ "zh-Hant": "預算", en: "Budget" }),
    notes: getText({ "zh-Hant": "清單 / 連結", en: "Checklist / Links" }),
  };
  document.title = `Australia Travel Handbook 2026 | ${titles[state.page]}`;
}

function renderI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (t[state.lang][key]) node.textContent = t[state.lang][key];
  });
  updateDocumentTitle();
}

function renderHero() {
  const root = document.getElementById("heroSummary");
  root.innerHTML = data.heroSummary
    .map((item) => `<article class="summary-card"><div class="summary-label">${getText(item.label)}</div><div class="summary-value">${getText(item.value)}</div></article>`)
    .join("");
}

function renderKeyInfo() {
  const root = document.getElementById("keyInfoBar");
  root.innerHTML = data.keyInfo
    .map(
      (item) => `
        <article class="key-info-card">
          <div class="summary-label">${getText(item.label)}</div>
          <div class="summary-value">${getText(item.value)}</div>
          <div class="budget-original">${getText(item.note)}</div>
        </article>
      `
    )
    .join("");
}

function renderOverview() {
  document.getElementById("overviewRecommendations").innerHTML = data.overviewRecommendations
    .map(
      (item) => `
        <article class="mini-stat-card">
          <div class="mini-stat-label">${getText(item.tag)}</div>
          <div class="mini-stat-value">${getText(item.title)}</div>
          <div class="budget-original">${getText(item.desc)}</div>
        </article>
      `
    )
    .join("");

  document.getElementById("importantAlerts").innerHTML = data.importantAlerts
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");

  document.getElementById("overviewNotes").innerHTML = data.overviewNotes
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");
}

function renderFlights() {
  document.getElementById("flightCards").innerHTML = data.flights
    .map(
      (flight) => `
        <article class="flight-card">
          <div class="flight-topline">
            <span class="day-chip">${getText(flight.label)}</span>
            <span class="date-label">${flight.date}</span>
          </div>
          <div class="flight-route">${flight.route}</div>
          <div class="flight-time">${flight.time}</div>
          <div class="info-line"><span class="info-label">${t[state.lang].dateText}</span><span class="info-value">${flight.date}</span></div>
          <div class="info-line"><span class="info-label">${t[state.lang].classText}</span><span class="info-value">${getText(flight.cabin)}</span></div>
          <div class="info-line"><span class="info-label">Airport</span><span class="info-value">${getText(flight.airport)}</span></div>
        </article>
      `
    )
    .join("");

  document.getElementById("flightNotes").innerHTML = data.flightNotes
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");
}

function renderStays() {
  const stay = data.stayPlan;
  document.getElementById("stayPlanCard").innerHTML = `
    <h3>${getText(stay.title)}</h3>
    <p class="budget-original">${getText(stay.subtitle)}</p>
    <div class="pill-row">${stay.chips.map((chip) => `<span class="pill">${getText(chip)}</span>`).join("")}</div>
    <div class="price-stack">
      ${stay.notes
        .map(
          (item) => `
            <div class="price-row">
              <div class="price-label">${getText(item.title)}</div>
              <div class="price-value">${getText(item.value)}</div>
            </div>
          `
        )
        .join("")}
    </div>
  `;

  document.getElementById("cityRhythm").innerHTML = data.cityRhythm
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");

  document.getElementById("moveDayTimeline").innerHTML = data.moveDayTimeline
    .map(
      (item) => `
        <article class="timeline-card">
          <div class="timeline-time">${item.time}</div>
          <div>
            <div class="bullet-title">${getText(item.title)}</div>
            <div class="timeline-desc">${getText(item.desc)}</div>
          </div>
        </article>
      `
    )
    .join("");

  document.getElementById("moveOptions").innerHTML = data.moveOptions
    .map(
      (item) => `
        <article class="route-card">
          <div class="route-top">
            <div>
              <div class="route-title">${getText(item.title)}</div>
              <div class="bullet-desc">${getText(item.desc)}</div>
            </div>
            <span class="route-chip">${getText(item.duration)}</span>
          </div>
          <div class="info-line"><span class="info-label">From</span><span class="info-value">${getText(item.start)}</span></div>
          <div class="info-line"><span class="info-label">To</span><span class="info-value">${getText(item.destination)}</span></div>
          <div class="info-line"><span class="info-label">Cost</span><span class="info-value">${getText(item.cost)}</span></div>
        </article>
      `
    )
    .join("");
}

function renderItinerary() {
  document.getElementById("itineraryList").innerHTML = data.itinerary
    .map(
      (item) => `
        <details class="itinerary-card" ${item.open ? "open" : ""}>
          <summary class="accordion-summary">
            <div class="flight-topline"><span class="day-chip">${getText(item.day)}</span><span class="date-label">${item.date}</span></div>
            <h3>${getText(item.plan)}</h3>
          </summary>
          <div class="accordion-body">
            <div class="itinerary-meta-grid">
              <div class="itinerary-meta-card">
                <div class="itinerary-meta-label">${t[state.lang].locationLabel}</div>
                <div class="itinerary-meta-value">${getText(item.location)}</div>
              </div>
              <div class="itinerary-meta-card">
                <div class="itinerary-meta-label">${t[state.lang].estimatedCostLabel}</div>
                <div class="itinerary-meta-value">${formatCurrency(item.costAud)}</div>
                <div class="budget-original">${formatCurrency(item.costAud, "AUD")}</div>
              </div>
              <div class="itinerary-meta-card">
                <div class="itinerary-meta-label">${t[state.lang].transportLabel}</div>
                <div class="itinerary-meta-value">${getText(item.transport)}</div>
              </div>
              <div class="itinerary-meta-card">
                <div class="itinerary-meta-label">${t[state.lang].reminderLabel}</div>
                <div class="itinerary-meta-value">${getText(item.reminder)}</div>
              </div>
            </div>
          </div>
        </details>
      `
    )
    .join("");
}

function renderBudget() {
  const totalAud = data.budgetRows.reduce((sum, item) => sum + item.aud, 0);
  const bookedAud = data.budgetRows[0].aud;
  const perPersonAud = totalAud / 2;
  const flexibleAud = totalAud - bookedAud;
  document.getElementById("budgetSelectedHeading").textContent = state.currency;

  document.getElementById("budgetHighlights").innerHTML = [
    { label: t[state.lang].totalTripCostLabel, note: t[state.lang].totalTripCostNote, aud: totalAud },
    { label: t[state.lang].perPersonCostLabel, note: t[state.lang].perPersonCostNote, aud: perPersonAud },
    { label: t[state.lang].bookedLabel, note: t[state.lang].bookedNote, aud: bookedAud },
    { label: t[state.lang].flexibleLabel, note: t[state.lang].flexibleNote, aud: flexibleAud },
  ]
    .map(
      (item) => `
        <article class="content-panel">
          <div class="bullet-title">${item.label}</div>
          <div class="budget-main">${formatCurrency(item.aud)}</div>
          <div class="budget-original">${formatCurrency(item.aud, "AUD")} · ${item.note}</div>
        </article>
      `
    )
    .join("");

  document.getElementById("budgetTableBody").innerHTML = data.budgetRows
    .map(
      (item) => `
        <tr>
          <td>${getText(item.item)}</td>
          <td>${formatCurrency(item.aud)}</td>
          <td>${formatCurrency(item.aud, "AUD")}</td>
          <td>${getText(item.note)}</td>
        </tr>
      `
    )
    .join("");

  document.getElementById("budgetCards").innerHTML = data.budgetRows
    .map(
      (item) => `
        <article class="budget-card">
          <div class="summary-label">${getText(item.item)}</div>
          <div class="budget-main">${formatCurrency(item.aud)}</div>
          <div class="budget-original">${formatCurrency(item.aud, "AUD")} · ${getText(item.note)}</div>
        </article>
      `
    )
    .join("");
}

function renderChecklist() {
  const saved = checklistState();
  document.getElementById("checklistGroups").innerHTML = data.checklistGroups
    .map((group) => {
      const completed = group.items.filter((item) => saved[item.id]).length;
      return `
        <article class="checklist-group-card">
          <div class="checklist-group-top">
            <div>
              <div class="bullet-title">${getText(group.title)}</div>
              <div class="budget-original">${completed} / ${group.items.length} ${t[state.lang].checklistProgress}</div>
            </div>
            <span class="progress-pill">${Math.round((completed / group.items.length) * 100)}%</span>
          </div>
          <div class="checklist-list">
            ${group.items
              .map(
                (item) => `
                  <article class="checklist-card">
                    <label class="check-toggle">
                      <input class="check-input" type="checkbox" data-check="${item.id}" ${saved[item.id] ? "checked" : ""} />
                      <span class="check-body">
                        <span class="check-mark" aria-hidden="true"></span>
                        <span>
                          <span class="check-title">${getText(item.title)}</span>
                          <span class="check-desc">${getText(item.desc)}</span>
                        </span>
                      </span>
                    </label>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderLinks() {
  document.getElementById("linksGrid").innerHTML = data.usefulLinks
    .map(
      (group) => `
        <article class="link-block">
          <h3>${getText(group.title)}</h3>
          <div class="link-list">
            ${group.links
              .map(
                (link) => `
                  <div class="link-row">
                    <span class="bullet-desc">${getText(link.label)}</span>
                    <a class="link-button" href="${link.href}" target="_blank" rel="noreferrer">${t[state.lang].openLink}</a>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderAll() {
  renderI18n();
  renderHero();
  renderKeyInfo();
  renderOverview();
  renderFlights();
  renderStays();
  renderItinerary();
  renderBudget();
  renderChecklist();
  renderLinks();
}

function syncControls() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === state.lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-currency]").forEach((button) => {
    const active = button.dataset.currency === state.currency;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function bindControls() {
  syncControls();
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      localStorage.setItem(STORAGE_KEYS.lang, state.lang);
      syncControls();
      renderAll();
      bindChecklist();
    });
  });

  document.querySelectorAll("[data-currency]").forEach((button) => {
    button.addEventListener("click", () => {
      state.currency = button.dataset.currency;
      localStorage.setItem(STORAGE_KEYS.currency, state.currency);
      syncControls();
      renderBudget();
      renderItinerary();
    });
  });
}

function bindChecklist() {
  document.querySelectorAll("[data-check]").forEach((input) => {
    input.addEventListener("change", () => {
      const next = checklistState();
      next[input.dataset.check] = input.checked;
      saveChecklist(next);
      renderChecklist();
      bindChecklist();
    });
  });
}

function syncPageNavigation() {
  document.querySelectorAll("[data-page-link]").forEach((button) => {
    const active = button.dataset.pageLink === state.page;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });
  document.querySelectorAll("[data-page-panel]").forEach((panel) => {
    const active = panel.dataset.pagePanel === state.page;
    panel.classList.toggle("active", active);
  });
}

function setPage(page, { scroll = true } = {}) {
  if (!PAGE_IDS.includes(page)) return;
  state.page = page;
  localStorage.setItem(STORAGE_KEYS.page, page);
  updateDocumentTitle();
  syncPageNavigation();
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindPageNavigation() {
  document.querySelectorAll("[data-page-link]").forEach((button) => {
    button.addEventListener("click", () => setPage(button.dataset.pageLink));
  });
}

function bindProgress() {
  const bar = document.getElementById("pageProgress");
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    bar.style.width = `${Math.min(Math.max(ratio, 0), 100)}%`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

renderAll();
bindControls();
bindChecklist();
bindPageNavigation();
syncPageNavigation();
bindProgress();
