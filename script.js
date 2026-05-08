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
    navStays: "住宿",
    navItinerary: "行程",
    navBudget: "預算",
    navNotes: "清單",
    overviewKicker: "總覽",
    overviewTitle: "這趟大概這樣玩",
    overviewLead: "前半段放在墨爾本，節奏舒服一點；後半段換到雪梨，把港灣和海邊收進來，整體不會太趕。",
    shortcutFlights: "航班",
    shortcutFlightsNote: "先看時間和航廈",
    shortcutItinerary: "每日行程",
    shortcutItineraryNote: "每天去哪直接看這頁",
    shortcutBudget: "預算",
    shortcutBudgetNote: "實際花費和預抓都在這",
    shortcutChecklist: "清單",
    shortcutChecklistNote: "出發前最後再確認",
    overviewHighlightsKicker: "重點",
    overviewHighlightsTitle: "這次安排的重點",
    overviewAlertsTitle: "重要提醒",
    overviewNotesTitle: "為什麼這樣排",
    flightsKicker: "航班",
    flightsTitle: "航班",
    flightsLead: "國際線是墨爾本進、雪梨出，中間再接一段國內線，城市轉換會很順。",
    flightsSummaryTitle: "航班資訊",
    flightPlanTitle: "移動提醒",
    staysKicker: "城市節奏",
    staysTitle: "住宿 / 移動",
    staysLead: "兩邊飯店都訂好了，現在這頁就直接看實際住宿、換城市的節奏，還有租車怎麼搭配最順。",
    cityRhythmTitle: "這樣住的好處",
    moveDayTitle: "城際移動日",
    moveOptionsTitle: "已訂交通 / 租車",
    itineraryKicker: "行程",
    itineraryTitle: "每日行程",
    itineraryLead: "先照你現在的訂單把骨架排好，留一點彈性，不做那種從早衝到晚的滿版行程。",
    budgetKicker: "預算",
    budgetTitle: "預算",
    budgetLead: "這頁現在是半實際、半預抓。飯店和租車用已訂金額，其它還能再慢慢修。",
    notesKicker: "清單",
    notesTitle: "清單 / 連結",
    notesLead: "最後一頁就放出發前真的會反覆打開的東西，少翻頁。",
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
    notesTitle: "Checklist",
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
      label: { "zh-Hant": "住宿", en: "Hotels" },
      value: { "zh-Hant": "Dorsett Melbourne + 索菲特達令港", en: "Dorsett Melbourne + Sofitel Darling Harbour" },
    },
    {
      label: { "zh-Hant": "中段移動", en: "Mid-trip move" },
      value: { "zh-Hant": "JQ514 5/27 13:00", en: "JQ514 on May 27 at 13:00" },
    },
    {
      label: { "zh-Hant": "墨爾本交通", en: "Melbourne transport" },
      value: { "zh-Hant": "已租 Toyota Corolla", en: "Toyota Corolla booked" },
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
      value: { "zh-Hant": "5/27 13:00 墨爾本 → 雪梨", en: "May 27, 13:00 Melbourne to Sydney" },
      note: { "zh-Hant": "Jetstar JQ514，14:25 抵達", en: "Jetstar JQ514, arriving at 14:25" },
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
      title: { "zh-Hant": "已住 Dorsett Melbourne 三晚", en: "Three nights at Dorsett Melbourne" },
      desc: { "zh-Hant": "5/24 到 5/27 住在市區，第一段行程可以很穩，不需要再搬行李。", en: "You are set in the city from May 24 to May 27, so the first part of the trip can stay stable." },
    },
    {
      tag: { "zh-Hant": "郊區日", en: "Scenic day" },
      title: { "zh-Hant": "有租車，墨爾本可改自駕版", en: "The Melbourne segment can be self-drive now" },
      desc: { "zh-Hant": "你 5/24 11:00 就在墨爾本機場取車，市區、海岸或近郊的自由度會比原本高很多。", en: "With an airport pickup at 11:00 on May 24, Melbourne becomes much more flexible for city and scenic plans." },
    },
    {
      tag: { "zh-Hant": "雪梨", en: "Sydney" },
      title: { "zh-Hant": "已住雪梨達令港索菲特 2 晚", en: "Two nights at Sofitel Sydney Darling Harbour" },
      desc: { "zh-Hant": "5/27 到 5/29 住達令港，最後兩天可以把港灣、購物和回機場節奏排得很順。", en: "Staying at Darling Harbour from May 27 to May 29 makes the final two days flow cleanly." },
    },
  ],
  importantAlerts: [
    {
      title: { "zh-Hant": "你的日期跨兩座城市，最好不要每天換飯店", en: "Do not hotel-hop too much" },
      desc: { "zh-Hant": "這趟本來就已經是開口票，只住兩間飯店最省力，不需要再把自己搞得一直搬行李。", en: "The open-jaw ticket already does the heavy lifting, so keeping only two hotel bases makes the trip much smoother." },
    },
    {
      title: { "zh-Hant": "5/27 建議直接飛，不建議火車", en: "Fly on May 27 instead of taking the train" },
      desc: { "zh-Hant": "這段現在已經訂好 JQ514，2026/05/27 13:00 從 MEL 起飛、14:25 到 SYD，不早不晚，剛好。", en: "This leg is now set on JQ514, departing MEL at 13:00 on May 27, 2026 and arriving SYD at 14:25." },
    },
    {
      title: { "zh-Hant": "5/29 回程很晚，白天仍可排海邊或港灣", en: "Your late return flight keeps the last day usable" },
      desc: { "zh-Hant": "白天還是可以安排，只要傍晚記得回飯店拿行李，再往機場走就好。", en: "You only need to leave time in the evening to collect luggage and head to the airport." },
    },
    {
      title: { "zh-Hant": "租車已訂但要留意市區停車", en: "The rental car is booked, but city parking matters" },
      desc: { "zh-Hant": "墨爾本市中心停車不便宜，所以車子比較適合拿來跑郊區；市區反而不用每段都開。", en: "CBD parking in Melbourne is not cheap, so check hotel parking and consider using the car mainly for the scenic day." },
    },
  ],
  overviewNotes: [
    {
      title: { "zh-Hant": "先慢後亮", en: "Soft opening, stronger finish" },
      desc: { "zh-Hant": "剛到先進 Dorsett Melbourne 安頓，前半段留給墨爾本和自駕彈性，後半段再把雪梨港灣慢慢走完。", en: "Start by settling into Dorsett Melbourne, keep Melbourne flexible with the car, then finish with Sydney harbour." },
    },
    {
      title: { "zh-Hant": "城際移動放在第 4 天", en: "Move cities on day four" },
      desc: { "zh-Hant": "現在兩邊住宿日期和 JQ514 已經接起來了，所以 5/27 換城不會亂。", en: "Your hotel dates now line up cleanly with the midday JQ514 transfer on May 27." },
    },
    {
      title: { "zh-Hant": "預算可以改成半實際版", en: "The budget can now be half actual, half estimated" },
      desc: { "zh-Hant": "墨爾本飯店、雪梨飯店和租車都已經有實際數字，剩下餐費、門票和 Jetstar 票價再慢慢補。", en: "Both hotels and the car now have real costs, leaving meals, tickets, and the Jetstar fare as the main flexible items." },
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
      desc: { "zh-Hant": "這段已經訂好 JQ514：2026/05/27 13:00 墨爾本起飛、14:25 抵達雪梨，第 4 航廈飛第 2 航廈。", en: "The domestic leg is now booked on JQ514: departing Melbourne at 13:00 and arriving Sydney at 14:25, Terminal 4 to Terminal 2." },
    },
    {
      title: { "zh-Hant": "最後一天保留機場緩衝", en: "Protect the airport buffer on the final day" },
      desc: { "zh-Hant": "雪梨國際線建議提早 3 小時到，5/29 晚上回機場不要拖太晚。", en: "Sydney international departures are more comfortable with a 3-hour buffer, so do not cut the evening too fine on May 29." },
    },
    {
      title: { "zh-Hant": "墨爾本租車已排在落地後", en: "The Melbourne car pickup is right after arrival" },
      desc: { "zh-Hant": "2026/05/24 11:00 在墨爾本機場取 Toyota Corolla 或同級車，所以第一天就能直接接自駕節奏。", en: "A Toyota Corolla or similar is set for pickup at Melbourne Airport at 11:00 on May 24, which affects whether you drive straight away on arrival day." },
    },
  ],
  stayPlan: {
    title: { "zh-Hant": "已訂住宿分配", en: "Booked stay split" },
    subtitle: {
      "zh-Hant": "兩邊住宿都補齊了，這頁就直接放實際訂單內容，不再用假設版。",
      en: "Both city stays are now known, so the site can show the actual booking setup.",
    },
    chips: [
      { "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" },
      { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" },
      { "zh-Hant": "兩間飯店已接好日期", en: "Dates already align" },
    ],
    notes: [
      {
        title: { "zh-Hant": "墨爾本", en: "Melbourne" },
        value: { "zh-Hant": "Dorsett Melbourne｜5/24 - 5/27｜NT$16,339", en: "Dorsett Melbourne | May 24 - May 27 | NT$16,339" },
      },
      {
        title: { "zh-Hant": "雪梨", en: "Sydney" },
        value: { "zh-Hant": "索菲特達令港｜5/27 - 5/29｜NT$18,621", en: "Sofitel Darling Harbour | May 27 - May 29 | NT$18,621" },
      },
      {
        title: { "zh-Hant": "房型 / 位置", en: "Room and location" },
        value: { "zh-Hant": "墨爾本雙床陽台房｜雪梨達令港", en: "Melbourne twin with balcony | Sydney Darling Harbour" },
      },
    ],
  },
  cityRhythm: [
    {
      title: { "zh-Hant": "墨爾本適合慢一點", en: "Melbourne likes a slower pace" },
      desc: { "zh-Hant": "Dorsett Melbourne 本身很適合住市區，但因為你有租車，停車和還車時間要先想好。", en: "Dorsett Melbourne is great for the city, but the rental car adds parking and return timing to think about." },
    },
    {
      title: { "zh-Hant": "雪梨景點更像一鏡到底", en: "Sydney rewards clean visual blocks" },
      desc: { "zh-Hant": "住達令港的好處就是雪梨最後兩天可以排得很順，港灣、購物和回機場都好接。", en: "A Darling Harbour base works nicely for splitting the harbour, QVB, and final shopping into separate pockets." },
    },
    {
      title: { "zh-Hant": "這樣回程壓力最小", en: "This also makes departure easier" },
      desc: { "zh-Hant": "最後一晚直接睡雪梨，不需要當天再從外地趕機場。", en: "Sleeping in Sydney the final night removes a lot of airport-day stress." },
    },
  ],
  moveDayTimeline: [
    {
      time: "09:00",
      title: { "zh-Hant": "墨爾本退房 / 還車", en: "Check out and return the car in Melbourne" },
      desc: { "zh-Hant": "如果車一路用到 5/27，早上先把還車處理完，再進航廈會比較安心。", en: "If you keep the car through May 27, returning it before entering the terminal is the cleanest flow." },
    },
    {
      time: "13:00",
      title: { "zh-Hant": "飛往雪梨", en: "Fly to Sydney" },
      desc: { "zh-Hant": "Jetstar JQ514，MEL 13:00 起飛，14:25 抵達 SYD。", en: "Jetstar JQ514 departs MEL at 13:00 and lands in SYD at 14:25." },
    },
    {
      time: "16:30",
      title: { "zh-Hant": "雪梨入住後散步", en: "Check in and take an easy walk" },
      desc: { "zh-Hant": "先到索菲特達令港放行李，剩下就看精神去港灣或在達令港附近慢慢走。", en: "Drop bags at Sofitel Darling Harbour first, then decide between the harbour or the Darling Harbour area." },
    },
  ],
  moveOptions: [
    {
      title: { "zh-Hant": "Jetstar JQ514", en: "Jetstar JQ514" },
      duration: { "zh-Hant": "1 小時 25 分", en: "1 hr 25 min" },
      start: { "zh-Hant": "MEL 第 4 航廈", en: "MEL Terminal 4" },
      destination: { "zh-Hant": "SYD 國內 T2", en: "SYD Domestic T2" },
      cost: { "zh-Hant": "票價未補，但班機已確認", en: "Fare not added yet, flight confirmed" },
      desc: { "zh-Hant": "這段已經是實際訂到的班機，不是暫抓的建議。", en: "This is no longer a suggestion. It is the actual booked intercity flight." },
    },
    {
      title: { "zh-Hant": "Sixt 租車", en: "Sixt rental car" },
      duration: { "zh-Hant": "5/24 11:00 取車", en: "Pickup on May 24, 11:00" },
      start: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" },
      destination: { "zh-Hant": "Toyota Corolla 或同級", en: "Toyota Corolla or similar" },
      cost: { "zh-Hant": "NT$5,468｜付款待補", en: "NT$5,468 | payment pending" },
      desc: { "zh-Hant": "這台車最適合拿來跑近郊、自駕景點或 5/26 的郊區日，市區反而不用硬開。", en: "The car is most useful for suburbs, scenic driving, or the day-trip slot, rather than for all CBD movement." },
    },
  ],
  itinerary: [
    {
      day: { "zh-Hant": "Day 1", en: "Day 1" },
      date: "2026-05-24",
      plan: { "zh-Hant": "落地墨爾本，取車後入住 Dorsett Melbourne", en: "Arrive in Melbourne, pick up the car, and check in at Dorsett Melbourne" },
      location: { "zh-Hant": "墨爾本機場 / Dorsett Melbourne / Southbank", en: "Melbourne Airport / Dorsett Melbourne / Southbank" },
      costAud: 190,
      transport: { "zh-Hant": "機場取車 + 市區移動", en: "Airport car pickup + city movement" },
      reminder: { "zh-Hant": "如果當天累，就留 Southbank、Flinders Street 和晚餐就好，不要硬塞。", en: "If you feel tired, keep it to Southbank, Flinders Street, and dinner." },
      open: true,
    },
    {
      day: { "zh-Hant": "Day 2", en: "Day 2" },
      date: "2026-05-25",
      plan: { "zh-Hant": "墨爾本市區、巷弄、咖啡與市場日", en: "Melbourne CBD, laneways, coffee, and market day" },
      location: { "zh-Hant": "Queen Victoria Market / Degraves Street / Fitzroy / Carlton", en: "Queen Victoria Market / Degraves Street / Fitzroy / Carlton" },
      costAud: 180,
      transport: { "zh-Hant": "步行為主，車盡量少開", en: "Mostly walking, with minimal driving" },
      reminder: { "zh-Hant": "有車不代表市區一定要開，這天把車停好慢慢走反而比較舒服。", en: "Having a car does not mean you should drive the CBD all day." },
    },
    {
      day: { "zh-Hant": "Day 3", en: "Day 3" },
      date: "2026-05-26",
      plan: { "zh-Hant": "最適合安排自駕郊區日", en: "Best day for the self-drive scenic plan" },
      location: { "zh-Hant": "大洋路 / 莫寧頓 / Yarra Valley 三選一", en: "Great Ocean Road / Mornington / Yarra Valley" },
      costAud: 360,
      transport: { "zh-Hant": "租車自駕", en: "Self-drive with the rental car" },
      reminder: { "zh-Hant": "既然有 Corolla，這天做成自駕版會比跟團更划算也更自由。", en: "Since you have the Corolla, this day is a stronger fit for self-driving than a guided tour." },
    },
    {
      day: { "zh-Hant": "Day 4", en: "Day 4" },
      date: "2026-05-27",
      plan: { "zh-Hant": "還車後搭 JQ514 飛雪梨，入住索菲特達令港", en: "Return the car, fly to Sydney on JQ514, and check in at Sofitel Darling Harbour" },
      location: { "zh-Hant": "MEL T4 / SYD T2 / Darling Harbour", en: "MEL T4 / SYD T2 / Darling Harbour" },
      costAud: 230,
      transport: { "zh-Hant": "租車還車 + 國內線 + 雪梨市區交通", en: "Car return + domestic flight + Sydney city transfer" },
      reminder: { "zh-Hant": "這天下午不要再貪心，把達令港和港灣走一小段就夠了。", en: "A light Darling Harbour and harbour walk is enough for this afternoon." },
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
      location: { "zh-Hant": "QVB / Hyde Park / Darling Harbour / 雪梨機場", en: "QVB / Hyde Park / Darling Harbour / Sydney Airport" },
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
      booked: true,
    },
    {
      item: { "zh-Hant": "墨爾本住宿 3 晚", en: "Melbourne stay, 3 nights" },
      aud: 789.3,
      note: { "zh-Hant": "Dorsett Melbourne｜5/24 - 5/27｜NT$16,339", en: "Dorsett Melbourne | May 24 - May 27 | NT$16,339" },
      booked: true,
    },
    {
      item: { "zh-Hant": "雪梨住宿 2 晚", en: "Sydney stay, 2 nights" },
      aud: 899.6,
      note: { "zh-Hant": "索菲特達令港｜5/27 - 5/29｜NT$18,621", en: "Sofitel Darling Harbour | May 27 - May 29 | NT$18,621" },
      booked: true,
    },
    {
      item: { "zh-Hant": "墨爾本 → 雪梨國內線", en: "Melbourne to Sydney domestic flight" },
      aud: 260,
      note: { "zh-Hant": "JQ514 已訂，但截圖未顯示票價，先保留估算", en: "JQ514 is booked, but the fare was not shown in the screenshot, so this stays estimated" },
    },
    {
      item: { "zh-Hant": "墨爾本租車", en: "Melbourne rental car" },
      aud: 264.2,
      note: { "zh-Hant": "Toyota Corolla 或同級｜NT$5,468｜付款待補", en: "Toyota Corolla or similar | NT$5,468 | payment pending" },
      booked: true,
    },
    {
      item: { "zh-Hant": "機場 / 市區交通與停車", en: "Airport, city transport, and parking" },
      aud: 180,
      note: { "zh-Hant": "含雪梨機場線、墨爾本停車或加油彈性", en: "Includes Sydney airport rail plus Melbourne parking or fuel cushion" },
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
        { id: "car", title: { "zh-Hant": "墨爾本租車", en: "Melbourne rental car" }, desc: { "zh-Hant": "確認取車、還車與駕照文件。", en: "Confirm pickup, return, and driving documents." } },
      ],
    },
    {
      title: { "zh-Hant": "行李", en: "Packing" },
      items: [
        { id: "layer", title: { "zh-Hant": "薄外套", en: "Light layer" }, desc: { "zh-Hant": "5 月澳洲入秋，早晚會涼。", en: "Australia is in autumn in May, so mornings and nights can feel cool." } },
        { id: "shoes", title: { "zh-Hant": "好走的鞋", en: "Walking shoes" }, desc: { "zh-Hant": "雪梨海岸步道會走比較久。", en: "The Sydney coastal walk is easier with good shoes." } },
        { id: "adapter", title: { "zh-Hant": "澳規轉接頭", en: "AU travel adapter" }, desc: { "zh-Hant": "澳洲插座規格和台灣不同。", en: "Australia uses a different plug type from Taiwan." } },
        { id: "license", title: { "zh-Hant": "駕照 / 國際駕照", en: "Driver's license / IDP" }, desc: { "zh-Hant": "既然有租車，這個不要漏。", en: "Do not forget this if you are driving." } },
      ],
    },
  ],
  usefulLinks: [
    {
      title: { "zh-Hant": "航班", en: "Flights" },
      links: [
        { label: { "zh-Hant": "華航官網", en: "China Airlines" }, href: "https://www.china-airlines.com/" },
        { label: { "zh-Hant": "Jetstar 管理訂單", en: "Jetstar manage booking" }, href: "https://booking.jetstar.com/" },
        { label: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" }, href: "https://www.melbourneairport.com.au/" },
        { label: { "zh-Hant": "雪梨機場", en: "Sydney Airport" }, href: "https://www.sydneyairport.com.au/" },
      ],
    },
    {
      title: { "zh-Hant": "住宿與交通", en: "Hotels and transport" },
      links: [
        { label: { "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" }, href: "https://www.dorsetthotels.com/dorsett-melbourne/" },
        { label: { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" }, href: "https://all.accor.com/hotel/8757/index.en.shtml" },
        { label: { "zh-Hant": "Sixt 澳洲", en: "Sixt Australia" }, href: "https://www.sixt.com.au/" },
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
  const bookedAud = data.budgetRows.filter((item) => item.booked).reduce((sum, item) => sum + item.aud, 0);
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
