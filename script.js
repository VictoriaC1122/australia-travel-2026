const STORAGE_KEYS = {
  lang: "australia-handbook-lang",
  currency: "australia-handbook-currency",
  checklist: "australia-handbook-checklist-v2",
  page: "australia-handbook-page",
};

const PAGE_IDS = ["overview", "flights", "stays", "itinerary", "map", "budget", "notes"];
const MOBILE_BREAKPOINT = 768;

const state = {
  lang: localStorage.getItem(STORAGE_KEYS.lang) || "zh-Hant",
  currency: localStorage.getItem(STORAGE_KEYS.currency) || "TWD",
  page: PAGE_IDS.includes(localStorage.getItem(STORAGE_KEYS.page)) ? localStorage.getItem(STORAGE_KEYS.page) : "overview",
};

const rates = {
  AUD: { symbol: "A$", audPerUnit: 1 },
  TWD: { symbol: "NT$", audPerUnit: 20.7 },
};

const dom = {};
let progressFrame = 0;
let resizeFrame = 0;

const t = {
  "zh-Hant": {
    languageSwitcher: "語言",
    currencySwitcher: "幣別",
    heroKicker: "Australia travel handbook",
    heroTitle: "澳洲旅行 2026",
    heroSubtitle: "2026 年 5 月 · 墨爾本進、雪梨出",
    heroChipDates: "2026 / 05 / 23 - 2026 / 05 / 30",
    heroChipRoute: "TPE → MEL · SYD → TPE",
    heroChipCities: "Melbourne · Sydney",
    heroDestinations: "Melbourne · Great Ocean Road · Sydney · Bondi · The Rocks",
    navOverview: "總覽",
    navFlights: "航班",
    navStays: "住宿",
    navItinerary: "行程",
    navMap: "地圖",
    navBudget: "預算",
    navNotes: "清單",
    overviewKicker: "Overview",
    overviewTitle: "這趟大概這樣玩",
    overviewLead: "前半段待在墨爾本，後半段換到雪梨，行程主線就照這樣走。",
    shortcutFlights: "航班",
    shortcutFlightsNote: "先看時間和航廈",
    shortcutItinerary: "每日行程",
    shortcutItineraryNote: "每天去哪直接看這頁",
    shortcutBudget: "預算",
    shortcutBudgetNote: "實際花費和預抓都在這",
    shortcutChecklist: "清單",
    shortcutChecklistNote: "出發前最後再確認",
    overviewHighlightsKicker: "Highlights",
    overviewHighlightsTitle: "這次安排的重點",
    overviewAlertsTitle: "重要提醒",
    overviewNotesTitle: "為什麼這樣排",
    flightsKicker: "Flights",
    flightsTitle: "航班",
    flightsLead: "國際線是墨爾本進、雪梨出，中間再接一段國內線。",
    flightsSummaryTitle: "航班資訊",
    flightPlanTitle: "移動提醒",
    staysKicker: "Stay",
    staysTitle: "住宿 / 移動",
    staysLead: "兩邊飯店都訂好了，這頁就放實際住宿、換城市安排和租車資訊。",
    cityRhythmTitle: "這樣住的好處",
    moveDayTitle: "城際移動日",
    moveOptionsTitle: "已訂交通 / 租車",
    itineraryKicker: "Itinerary",
    itineraryTitle: "每日行程",
    itineraryLead: "先照現在的訂單整理成主行程，另外也留一組可參考的版本。",
    itineraryActualKicker: "實際行程",
    itineraryRecommendKicker: "推薦行程",
    itineraryRecommendLead: "下面這組不是實際行程，是另外整理的參考版本。",
    budgetKicker: "Budget",
    budgetTitle: "預算",
    budgetLead: "這頁現在是半實際、半預抓。每個項目都有註明是實際還是預抓，飯店和租車已用實際金額，其它再慢慢補。",
    notesKicker: "Notes",
    notesTitle: "清單 / 連結",
    notesLead: "最後一頁放的是出發前會一直翻到的清單和連結。",
    mapKicker: "Map",
    mapTitle: "地圖",
    mapLead: "把這趟會用到的地點整理成可切換地圖。",
    mapDayLabel: "每日路線",
    mapRouteLink: "開啟完整路線",
    quickInfoTitle: "快速資訊",
    compactChecklistTitle: "出發前確認",
    checklistTitle: "行前清單",
    linksTitle: "實用連結",
    budgetItemHeading: "項目",
    budgetOriginalHeading: "AUD",
    budgetNoteHeading: "備註",
    budgetStatusActual: "實際",
    budgetStatusEstimated: "預抓",
    totalTripCostLabel: "兩人總預估",
    totalTripCostNote: "含機票、住宿、城際交通、餐食與門票",
    averageDailyLabel: "平均每日",
    averageDailyNote: "以 6 天估算",
    perPersonCostLabel: "每人預估",
    perPersonCostNote: "以兩人平均分攤估算",
    bookedLabel: "已確定支出",
    bookedNote: "目前已經有數字的部分",
    flexibleLabel: "還能調整",
    flexibleNote: "餐費、門票和部分交通還有彈性",
    locationLabel: "地點",
    estimatedCostLabel: "預估花費",
    transportLabel: "交通",
    reminderLabel: "提醒",
    timelineTitle: "時間軸",
    timelineFocusLabel: "今日重點",
    timelineTipLabel: "小提醒",
    checklistProgress: "完成",
    openLink: "開啟",
    dateText: "日期",
    classText: "艙等",
    airportLabel: "航廈 / 機場",
    fromLabel: "出發",
    toLabel: "抵達",
    costCardLabel: "花費",
    specsLabel: "規格",
    pickupLabel: "取車",
    seatsLabel: "座位",
    luggageLabel: "行李",
    transmissionLabel: "變速",
    fuelLabel: "動力",
  },
  en: {
    languageSwitcher: "Language",
    currencySwitcher: "Currency",
    heroKicker: "Australia travel handbook",
    heroTitle: "Australia Travel 2026",
    heroSubtitle: "May 2026 · Melbourne in, Sydney out",
    heroChipDates: "2026 / 05 / 23 - 2026 / 05 / 30",
    heroChipRoute: "TPE → MEL · SYD → TPE",
    heroChipCities: "Melbourne · Sydney",
    heroDestinations: "Melbourne · Great Ocean Road · Sydney · Bondi · The Rocks",
    navOverview: "Overview",
    navFlights: "Flights",
    navStays: "Stay",
    navItinerary: "Plan",
    navMap: "Map",
    navBudget: "Budget",
    navNotes: "Checklist",
    overviewKicker: "Overview",
    overviewTitle: "How this trip flows",
    overviewLead: "The first half stays in Melbourne, then the second half shifts to Sydney.",
    shortcutFlights: "Flights",
    shortcutFlightsNote: "Check times and terminals first",
    shortcutItinerary: "Daily plan",
    shortcutItineraryNote: "Open this when you want the day flow",
    shortcutBudget: "Budget",
    shortcutBudgetNote: "Booked costs and rough estimates together",
    shortcutChecklist: "Checklist",
    shortcutChecklistNote: "Open this right before departure",
    overviewHighlightsKicker: "Highlights",
    overviewHighlightsTitle: "Why this version works",
    overviewAlertsTitle: "Important reminders",
    overviewNotesTitle: "Why it is arranged this way",
    flightsKicker: "Flights",
    flightsTitle: "Flights",
    flightsLead: "The international flights arrive in Melbourne and depart from Sydney, with one domestic leg in between.",
    flightsSummaryTitle: "Flight details",
    flightPlanTitle: "Travel notes",
    staysKicker: "Stay",
    staysTitle: "Stay / Movement",
    staysLead: "Both hotels are already booked, so this page shows the actual stay setup, city transfer, and car details.",
    cityRhythmTitle: "Why this base works",
    moveDayTitle: "Move day",
    moveOptionsTitle: "Booked transport / Car",
    itineraryKicker: "Itinerary",
    itineraryTitle: "Day by day",
    itineraryLead: "This section follows your current bookings and keeps a separate reference version below.",
    itineraryActualKicker: "Actual itinerary",
    itineraryRecommendKicker: "Recommended itinerary",
    itineraryRecommendLead: "The set below is not your actual plan. It is a separate reference version.",
    budgetKicker: "Budget",
    budgetTitle: "Budget",
    budgetLead: "This page mixes actual amounts and estimates. Each item is labeled clearly.",
    notesKicker: "Notes",
    notesTitle: "Checklist / Links",
    notesLead: "The last page keeps the links and checklists you may want before departure.",
    mapKicker: "Map",
    mapTitle: "Map",
    mapLead: "Switch between the key places on a larger travel map.",
    mapDayLabel: "Daily routes",
    mapRouteLink: "Open full route",
    quickInfoTitle: "Quick info",
    compactChecklistTitle: "Before you go",
    checklistTitle: "Pre-trip checklist",
    linksTitle: "Useful links",
    budgetItemHeading: "Item",
    budgetOriginalHeading: "AUD",
    budgetNoteHeading: "Note",
    budgetStatusActual: "Actual",
    budgetStatusEstimated: "Estimate",
    totalTripCostLabel: "Estimated total for two",
    totalTripCostNote: "Flights, stays, intercity transport, food, and tickets",
    averageDailyLabel: "Average per day",
    averageDailyNote: "Based on 6 travel days",
    perPersonCostLabel: "Estimated per person",
    perPersonCostNote: "Split evenly for two people",
    bookedLabel: "Already locked in",
    bookedNote: "The parts that already have real numbers",
    flexibleLabel: "Still flexible",
    flexibleNote: "Meals, tickets, and part of the transport can still move",
    locationLabel: "Location",
    estimatedCostLabel: "Estimated cost",
    transportLabel: "Transport",
    reminderLabel: "Reminder",
    timelineTitle: "Timeline",
    timelineFocusLabel: "Focus",
    timelineTipLabel: "Tip",
    checklistProgress: "done",
    openLink: "Open",
    dateText: "Date",
    classText: "Cabin",
    airportLabel: "Airport",
    fromLabel: "From",
    toLabel: "To",
    costCardLabel: "Cost",
    specsLabel: "Specs",
    pickupLabel: "Pickup",
    seatsLabel: "Seats",
    luggageLabel: "Luggage",
    transmissionLabel: "Transmission",
    fuelLabel: "Fuel",
  },
};

const data = {
  quickInfo: [
    { label: { "zh-Hant": "出發日期", en: "Departure" }, value: { "zh-Hant": "2026 / 05 / 23", en: "2026 / 05 / 23" } },
    { label: { "zh-Hant": "回程日期", en: "Return" }, value: { "zh-Hant": "2026 / 05 / 29", en: "2026 / 05 / 29" } },
    { label: { "zh-Hant": "入境城市", en: "Arrival city" }, value: { "zh-Hant": "Melbourne", en: "Melbourne" } },
    { label: { "zh-Hant": "出境城市", en: "Departure city" }, value: { "zh-Hant": "Sydney", en: "Sydney" } },
    { label: { "zh-Hant": "主要城市", en: "Core stops" }, value: { "zh-Hant": "Melbourne / Great Ocean Road / Sydney / Bondi / The Rocks", en: "Melbourne / Great Ocean Road / Sydney / Bondi / The Rocks" } },
  ],
  heroSummary: [
    { label: { "zh-Hant": "天數", en: "Length" }, value: { "zh-Hant": "6 天 5 夜", en: "6 days / 5 nights" } },
    { label: { "zh-Hant": "住宿", en: "Hotels" }, value: { "zh-Hant": "Dorsett Melbourne + 索菲特達令港", en: "Dorsett Melbourne + Sofitel Darling Harbour" } },
    { label: { "zh-Hant": "中段移動", en: "Mid-trip move" }, value: { "zh-Hant": "JQ514 5/27 13:00", en: "JQ514 · May 27 · 13:00" } },
    { label: { "zh-Hant": "墨爾本交通", en: "Melbourne transport" }, value: { "zh-Hant": "Toyota Corolla 已租", en: "Toyota Corolla booked" } },
  ],
  keyInfo: [
    { label: { "zh-Hant": "去程落地", en: "Arrival" }, value: { "zh-Hant": "5/24 10:40 墨爾本", en: "May 24 · 10:40 · Melbourne" }, note: { "zh-Hant": "第一天先排落地和入住", en: "Arrival and check-in are the main parts of day one" } },
    { label: { "zh-Hant": "最關鍵移動", en: "Main transfer" }, value: { "zh-Hant": "5/27 13:00 墨爾本 → 雪梨", en: "May 27 · 13:00 · MEL to SYD" }, note: { "zh-Hant": "Jetstar JQ514，14:25 抵達", en: "Jetstar JQ514, landing at 14:25" } },
    { label: { "zh-Hant": "回程起飛", en: "Departure" }, value: { "zh-Hant": "5/29 22:10 雪梨", en: "May 29 · 22:10 · Sydney" }, note: { "zh-Hant": "白天還有可用時間", en: "There is still usable time during the day" } },
  ],
  overviewRecommendations: [
    { tag: { "zh-Hant": "墨爾本", en: "Melbourne" }, title: { "zh-Hant": "前三晚都住 Dorsett Melbourne", en: "Three nights at Dorsett Melbourne" }, desc: { "zh-Hant": "5/24 到 5/27 都住同一間飯店。", en: "The same hotel is booked from May 24 to May 27." } },
    { tag: { "zh-Hant": "自駕日", en: "Drive day" }, title: { "zh-Hant": "墨爾本段有租車", en: "A rental car is booked in Melbourne" }, desc: { "zh-Hant": "5/24 11:00 在機場取車。", en: "The car pickup is at the airport on May 24 at 11:00." } },
    { tag: { "zh-Hant": "雪梨", en: "Sydney" }, title: { "zh-Hant": "最後兩晚住達令港", en: "The last two nights are in Darling Harbour" }, desc: { "zh-Hant": "5/27 到 5/29 住在達令港。", en: "The Sydney stay runs from May 27 to May 29 in Darling Harbour." } },
  ],
  importantAlerts: [
    { title: { "zh-Hant": "住宿分成兩段", en: "Two hotel bases" }, desc: { "zh-Hant": "墨爾本和雪梨各住一段。", en: "The hotels are split between Melbourne and Sydney." } },
    { title: { "zh-Hant": "5/27 會換城市", en: "May 27 is the city-transfer day" }, desc: { "zh-Hant": "JQ514 13:00 從墨爾本飛雪梨，14:25 抵達。", en: "JQ514 departs Melbourne at 13:00 and lands in Sydney at 14:25." } },
    { title: { "zh-Hant": "5/29 晚上回程", en: "The return flight is on the evening of May 29" }, desc: { "zh-Hant": "傍晚回飯店拿行李後再往機場走。", en: "Pick up the bags in the evening and then head to the airport." } },
    { title: { "zh-Hant": "租車安排在墨爾本段", en: "The rental car sits in the Melbourne segment" }, desc: { "zh-Hant": "取車時間是 5/24 11:00。", en: "The pickup time is May 24 at 11:00." } },
  ],
  overviewNotes: [
    { title: { "zh-Hant": "前半段是墨爾本", en: "Melbourne comes first" }, desc: { "zh-Hant": "抵達後先住 Dorsett Melbourne，再接自駕和市區安排。", en: "The trip starts with Dorsett Melbourne, then moves into the Melbourne days." } },
    { title: { "zh-Hant": "第 4 天飛雪梨", en: "Day four goes to Sydney" }, desc: { "zh-Hant": "5/27 用 JQ514 接到雪梨。", en: "JQ514 takes the trip into Sydney on May 27." } },
    { title: { "zh-Hant": "預算頁已分開實際和預抓", en: "The budget page separates actual and estimated items" }, desc: { "zh-Hant": "飯店和租車用實際金額，其它另外標示。", en: "Hotels and the car use actual amounts, while the rest is labeled separately." } },
  ],
  flights: [
    { label: { "zh-Hant": "去程", en: "Outbound" }, route: "TPE → MEL", date: "2026-05-23 / 2026-05-24", time: "23:30 → 10:40", cabin: { "zh-Hant": "CI 0057", en: "CI 0057" }, airport: { "zh-Hant": "桃園第 2 航廈 → 墨爾本第 2 航廈", en: "Taoyuan T2 → Melbourne T2" }, airline: { "zh-Hant": "中華航空", en: "China Airlines" }, logo: "./assets/airline-ci-badge.svg" },
    { label: { "zh-Hant": "中段", en: "Domestic" }, route: "MEL → SYD", date: "2026-05-27", time: "13:00 → 14:25", cabin: { "zh-Hant": "Jetstar JQ514", en: "Jetstar JQ514" }, airport: { "zh-Hant": "MEL 第 4 航廈 → SYD 國內 T2", en: "MEL T4 → SYD Domestic T2" }, airline: { "zh-Hant": "Jetstar", en: "Jetstar" }, logo: "./assets/airline-jetstar-badge.svg" },
    { label: { "zh-Hant": "回程", en: "Return" }, route: "SYD → TPE", date: "2026-05-29 / 2026-05-30", time: "22:10 → 05:40", cabin: { "zh-Hant": "CI 0052", en: "CI 0052" }, airport: { "zh-Hant": "雪梨第 1 航廈 → 桃園第 2 航廈", en: "Sydney T1 → Taoyuan T2" }, airline: { "zh-Hant": "中華航空", en: "China Airlines" }, logo: "./assets/airline-ci-badge.svg" },
  ],
  flightNotes: [
    { title: { "zh-Hant": "抵達時間", en: "Arrival timing" }, desc: { "zh-Hant": "2026/05/24 10:40 抵達墨爾本，通關和取車後大約會接近中午。", en: "You land in Melbourne at 10:40 on May 24, so after immigration and pickup it will be around midday." } },
    { title: { "zh-Hant": "JQ514", en: "JQ514" }, desc: { "zh-Hant": "2026/05/27 13:00 從墨爾本起飛，14:25 抵達雪梨。", en: "On May 27, JQ514 departs Melbourne at 13:00 and lands in Sydney at 14:25." } },
    { title: { "zh-Hant": "回程前往機場", en: "Airport timing for the return" }, desc: { "zh-Hant": "雪梨國際線這天預留約 3 小時。", en: "Leave around a three-hour buffer for the Sydney international flight." } },
    { title: { "zh-Hant": "租車取車", en: "Car pickup" }, desc: { "zh-Hant": "2026/05/24 11:00 在墨爾本機場取車。", en: "The rental car pickup is at Melbourne Airport on May 24 at 11:00." } },
  ],
  stayPlan: {
    title: { "zh-Hant": "已訂住宿分配", en: "Booked stay split" },
    subtitle: { "zh-Hant": "這頁放的是目前已訂好的住宿內容。", en: "This page shows the stays that are already booked." },
    chips: [{ "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" }, { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" }, { "zh-Hant": "已訂住宿", en: "Booked stays" }],
    hotels: [
      {
        name: { "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" },
        dates: { "zh-Hant": "5/24 - 5/27", en: "May 24 - May 27" },
        priceAud: 789.3,
        note: { "zh-Hant": "墨爾本這段住這裡。", en: "This is the Melbourne base for the trip." },
        image: "https://www.dorsetthotels.com/images/dorsett-melbourne/gallery/exterior/exteriormagic-thumb.webp",
        href: "https://www.dorsetthotels.com/dorsett-melbourne/",
      },
      {
        name: { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" },
        dates: { "zh-Hant": "5/27 - 5/29", en: "May 27 - May 29" },
        priceAud: 899.6,
        note: { "zh-Hant": "雪梨這段住這裡。", en: "This is the Sydney stay for the final part of the trip." },
        image: "https://www.ahstatic.com/photos/9729_ho_00_p_1024x768.jpg",
        href: "https://all.accor.com/hotel/9729/index.en.shtml",
      },
    ],
    notes: [
      { title: { "zh-Hant": "墨爾本", en: "Melbourne" }, valuePrefix: { "zh-Hant": "Dorsett Melbourne｜5/24 - 5/27｜", en: "Dorsett Melbourne | May 24 - May 27 | " }, aud: 789.3 },
      { title: { "zh-Hant": "雪梨", en: "Sydney" }, valuePrefix: { "zh-Hant": "索菲特達令港｜5/27 - 5/29｜", en: "Sofitel Darling Harbour | May 27 - May 29 | " }, aud: 899.6 },
      { title: { "zh-Hant": "房型 / 位置", en: "Room and location" }, value: { "zh-Hant": "墨爾本雙床陽台房｜雪梨達令港", en: "Melbourne twin with balcony | Sydney Darling Harbour" } },
    ],
  },
  cityRhythm: [
    { title: { "zh-Hant": "墨爾本住市區", en: "Melbourne stay" }, desc: { "zh-Hant": "Dorsett Melbourne 在前半段會用到。", en: "Dorsett Melbourne is used for the first part of the trip." } },
    { title: { "zh-Hant": "雪梨住達令港", en: "Sydney stay" }, desc: { "zh-Hant": "Sofitel Sydney Darling Harbour 是後半段住宿。", en: "Sofitel Sydney Darling Harbour is the base for the Sydney part." } },
    { title: { "zh-Hant": "最後一晚在雪梨", en: "Final night in Sydney" }, desc: { "zh-Hant": "回程前一晚住在雪梨。", en: "The night before departure is already in Sydney." } },
  ],
  moveDayTimeline: [
    { time: "09:00", title: { "zh-Hant": "墨爾本退房 / 還車", en: "Check out and return the car" }, desc: { "zh-Hant": "這天早上先處理還車。", en: "The morning is reserved for the car return." } },
    { time: "13:00", title: { "zh-Hant": "搭 JQ514 飛雪梨", en: "Take JQ514 to Sydney" }, desc: { "zh-Hant": "Jetstar JQ514，MEL 13:00 起飛，14:25 抵達 SYD。", en: "Jetstar JQ514 leaves MEL at 13:00 and lands in SYD at 14:25." } },
    { time: "16:30", title: { "zh-Hant": "入住達令港後散步", en: "Check in and walk around Darling Harbour" }, desc: { "zh-Hant": "先到索菲特達令港放行李。", en: "Drop the bags at Sofitel Darling Harbour first." } },
  ],
  moveOptions: [
    { title: { "zh-Hant": "Jetstar JQ514", en: "Jetstar JQ514" }, duration: { "zh-Hant": "1 小時 25 分", en: "1 hr 25 min" }, start: { "zh-Hant": "MEL 第 4 航廈", en: "MEL Terminal 4" }, destination: { "zh-Hant": "SYD 國內 T2", en: "SYD Domestic T2" }, cost: { "zh-Hant": "票價未補，班機已確認", en: "Fare not added, flight confirmed" }, desc: { "zh-Hant": "這段是已訂班機。", en: "This is the booked domestic flight." } },
    {
      title: { "zh-Hant": "Sixt 租車", en: "Sixt rental car" },
      duration: { "zh-Hant": "5/24 11:00 取車", en: "Pickup on May 24, 11:00" },
      start: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" },
      destination: { "zh-Hant": "Toyota Corolla 或同級", en: "Toyota Corolla or similar" },
      costAud: 264.2,
      costSuffix: { "zh-Hant": "｜已付款", en: " | paid" },
      desc: { "zh-Hant": "這台車會用在墨爾本這段。", en: "This car is used during the Melbourne part of the trip." },
      image: "./assets/corolla-rental-card.svg",
      imageAlt: { "zh-Hant": "Toyota Corolla 租車插畫", en: "Toyota Corolla rental illustration" },
      specs: [
        { label: { "zh-Hant": "座位", en: "Seats" }, value: { "zh-Hant": "5 人", en: "5 seats" } },
        { label: { "zh-Hant": "行李", en: "Luggage" }, value: { "zh-Hant": "3 件行李", en: "3 bags" } },
        { label: { "zh-Hant": "變速", en: "Transmission" }, value: { "zh-Hant": "自排", en: "Automatic" } },
        { label: { "zh-Hant": "動力", en: "Fuel" }, value: { "zh-Hant": "空調｜油電混合", en: "A/C | Hybrid" } },
      ],
    },
  ],
  itinerary: [
    {
      day: { "zh-Hant": "Day 1", en: "Day 1" },
      date: "2026-05-24",
      city: { "zh-Hant": "Melbourne", en: "Melbourne" },
      plan: { "zh-Hant": "落地墨爾本，取車後入住 Dorsett Melbourne", en: "Arrive in Melbourne, pick up the car, and check in at Dorsett Melbourne" },
      focus: { "zh-Hant": "今天的主線是落地、取車、入住。", en: "The main pieces today are arrival, pickup, and check-in." },
      location: { "zh-Hant": "墨爾本機場 / Dorsett Melbourne / Southbank", en: "Melbourne Airport / Dorsett Melbourne / Southbank" },
      costAud: 190,
      transport: { "zh-Hant": "機場取車 + 市區移動", en: "Airport car pickup + city movement" },
      reminder: { "zh-Hant": "Southbank、Flinders Street 和晚餐可以放在這天。", en: "Southbank, Flinders Street, and dinner can sit on this day." },
      timeline: [
        { time: { "zh-Hant": "10:40", en: "10:40" }, title: { "zh-Hant": "抵達墨爾本", en: "Land in Melbourne" }, note: { "zh-Hant": "先過關、領行李，讓身體跟上時差。", en: "Clear immigration, get bags, and ease into the day." } },
        { time: { "zh-Hant": "11:00", en: "11:00" }, title: { "zh-Hant": "在機場取車", en: "Pick up the rental car" }, note: { "zh-Hant": "Toyota Corolla 或同級，順手確認導航和保險文件。", en: "Collect the Toyota Corolla or similar and check navigation plus insurance." } },
        { time: { "zh-Hant": "13:00", en: "13:00" }, title: { "zh-Hant": "前往 Dorsett Melbourne 放行李", en: "Head to Dorsett Melbourne and drop bags" }, note: { "zh-Hant": "先到飯店放行李。", en: "Head to the hotel and drop the bags first." } },
        { time: { "zh-Hant": "16:00", en: "16:00" }, title: { "zh-Hant": "Southbank / Flinders Street 散步", en: "Southbank / Flinders Street walk" }, note: { "zh-Hant": "這天可以留一段市區散步。", en: "A short city walk can fit here." } },
      ],
      open: true,
    },
    {
      day: { "zh-Hant": "Day 2", en: "Day 2" },
      date: "2026-05-25",
      city: { "zh-Hant": "Melbourne", en: "Melbourne" },
      plan: { "zh-Hant": "大洋路＋十二門徒岩", en: "Great Ocean Road and the Twelve Apostles" },
      focus: { "zh-Hant": "這天走大洋路和十二門徒岩。", en: "This day is for the Great Ocean Road and the Twelve Apostles." },
      location: { "zh-Hant": "Great Ocean Road / 十二門徒岩", en: "Great Ocean Road / Twelve Apostles" },
      costAud: 320,
      transport: { "zh-Hant": "租車自駕｜海岸線", en: "Self-drive | coastal route" },
      reminder: { "zh-Hant": "這天移動時間會比較長。", en: "This day has the longest drive time." },
      timeline: [
        { time: { "zh-Hant": "07:30", en: "07:30" }, title: { "zh-Hant": "從墨爾本出發", en: "Leave Melbourne" }, note: { "zh-Hant": "早上從市區出發。", en: "Leave Melbourne in the morning." } },
        { time: { "zh-Hant": "10:30", en: "10:30" }, title: { "zh-Hant": "Memorial Arch / Lorne 一帶停靠", en: "Pause around Memorial Arch / Lorne" }, note: { "zh-Hant": "沿途可停觀景點和小鎮。", en: "Use the route for one lookout and a coastal stop." } },
        { time: { "zh-Hant": "12:30", en: "12:30" }, title: { "zh-Hant": "Apollo Bay 午餐", en: "Lunch in Apollo Bay" }, note: { "zh-Hant": "中午排在 Apollo Bay。", en: "Lunch sits in Apollo Bay." } },
        { time: { "zh-Hant": "15:30", en: "15:30" }, title: { "zh-Hant": "十二門徒岩", en: "Twelve Apostles" }, note: { "zh-Hant": "下午到十二門徒岩。", en: "Reach the Twelve Apostles in the afternoon." } },
        { time: { "zh-Hant": "16:30", en: "16:30" }, title: { "zh-Hant": "Loch Ard Gorge", en: "Loch Ard Gorge" }, note: { "zh-Hant": "後面再接 Loch Ard Gorge。", en: "Loch Ard Gorge follows after that." } },
        { time: { "zh-Hant": "20:30", en: "20:30" }, title: { "zh-Hant": "回到墨爾本", en: "Return to Melbourne" }, note: { "zh-Hant": "晚上回墨爾本。", en: "Return to Melbourne in the evening." } },
      ],
    },
    {
      day: { "zh-Hant": "Day 3", en: "Day 3" },
      date: "2026-05-26",
      city: { "zh-Hant": "Phillip Island", en: "Phillip Island" },
      plan: { "zh-Hant": "企鵝歸巢", en: "Penguin Parade" },
      focus: { "zh-Hant": "這天會走 Phillip Island 和企鵝歸巢。", en: "This day is for Phillip Island and Penguin Parade." },
      location: { "zh-Hant": "Phillip Island / Penguin Parade", en: "Phillip Island / Penguin Parade" },
      costAud: 260,
      transport: { "zh-Hant": "租車自駕｜Phillip Island", en: "Self-drive | Phillip Island" },
      reminder: { "zh-Hant": "企鵝歸巢時間會跟季節變動。", en: "Penguin Parade times shift with the season." },
      timeline: [
        { time: { "zh-Hant": "10:00", en: "10:00" }, title: { "zh-Hant": "往 Phillip Island 出發", en: "Drive toward Phillip Island" }, note: { "zh-Hant": "上午往 Phillip Island 走。", en: "Drive toward Phillip Island in the morning." } },
        { time: { "zh-Hant": "12:30", en: "12:30" }, title: { "zh-Hant": "San Remo / 海邊午餐", en: "San Remo / seaside lunch" }, note: { "zh-Hant": "中午在沿海一帶停留。", en: "Pause for lunch along the coast." } },
        { time: { "zh-Hant": "14:30", en: "14:30" }, title: { "zh-Hant": "Nobbies Boardwalk", en: "Nobbies Boardwalk" }, note: { "zh-Hant": "下午走 Nobbies 一帶。", en: "Spend the afternoon around the Nobbies." } },
        { time: { "zh-Hant": "17:30", en: "17:30" }, title: { "zh-Hant": "抵達企鵝歸巢園區", en: "Arrive at Penguin Parade" }, note: { "zh-Hant": "傍晚到企鵝歸巢園區。", en: "Arrive at Penguin Parade near sunset." } },
        { time: { "zh-Hant": "19:00", en: "19:00" }, title: { "zh-Hant": "企鵝歸巢", en: "Penguin Parade" }, note: { "zh-Hant": "晚上看企鵝歸巢。", en: "Watch Penguin Parade in the evening." } },
      ],
    },
    {
      day: { "zh-Hant": "Day 4", en: "Day 4" },
      date: "2026-05-27",
      city: { "zh-Hant": "Sydney", en: "Sydney" },
      plan: { "zh-Hant": "還車後搭 JQ514 飛雪梨，入住索菲特達令港", en: "Return the car, fly to Sydney on JQ514, and check in at Sofitel Darling Harbour" },
      focus: { "zh-Hant": "這天是墨爾本換到雪梨。", en: "This day is the transfer from Melbourne to Sydney." },
      location: { "zh-Hant": "MEL T4 / SYD T2 / Darling Harbour", en: "MEL T4 / SYD T2 / Darling Harbour" },
      costAud: 230,
      transport: { "zh-Hant": "租車還車 + 國內線 + 雪梨市區交通", en: "Car return + domestic flight + Sydney transfer" },
      reminder: { "zh-Hant": "下午接達令港和飯店入住。", en: "The afternoon continues with Darling Harbour and check-in." },
      timeline: [
        { time: { "zh-Hant": "09:00", en: "09:00" }, title: { "zh-Hant": "退房並處理還車", en: "Check out and return the car" }, note: { "zh-Hant": "先把租車收乾淨，進航廈心情會差很多。", en: "Finishing the car return early makes the airport leg much easier." } },
        { time: { "zh-Hant": "13:00", en: "13:00" }, title: { "zh-Hant": "搭乘 Jetstar JQ514", en: "Board Jetstar JQ514" }, note: { "zh-Hant": "MEL 第 4 航廈出發，14:25 抵達雪梨。", en: "Depart from MEL Terminal 4 and arrive in Sydney at 14:25." } },
        { time: { "zh-Hant": "16:00", en: "16:00" }, title: { "zh-Hant": "前往 Sofitel Sydney Darling Harbour", en: "Head to Sofitel Sydney Darling Harbour" }, note: { "zh-Hant": "先到飯店 check-in。", en: "Check in at the hotel first." } },
        { time: { "zh-Hant": "18:00", en: "18:00" }, title: { "zh-Hant": "達令港散步＋晚餐", en: "Darling Harbour walk and dinner" }, note: { "zh-Hant": "晚上留在達令港一帶。", en: "Stay around Darling Harbour in the evening." } },
      ],
    },
    {
      day: { "zh-Hant": "Day 5", en: "Day 5" },
      date: "2026-05-28",
      city: { "zh-Hant": "Sydney", en: "Sydney" },
      plan: { "zh-Hant": "歌劇院 view 早餐＋雪梨歌劇院＋海生館", en: "Opera House-view breakfast, the Opera House, and SEA LIFE" },
      focus: { "zh-Hant": "這天排歌劇院、港邊早餐和海生館。", en: "This day includes breakfast by the harbour, the Opera House, and the aquarium." },
      location: { "zh-Hant": "Wahlburgers Opera Quays / MCA Cafe / Sydney Opera House / SEA LIFE Sydney Aquarium", en: "Wahlburgers Opera Quays / MCA Cafe / Sydney Opera House / SEA LIFE Sydney Aquarium" },
      costAud: 220,
      transport: { "zh-Hant": "步行 + 輕軌 / 市區交通", en: "Walking + light rail / city transport" },
      reminder: { "zh-Hant": "早餐和歌劇院都排在上午。", en: "Breakfast and the Opera House are both set in the morning." },
      timeline: [
        { time: { "zh-Hant": "08:00", en: "08:00" }, title: { "zh-Hant": "歌劇院 view 早餐", en: "Opera House view breakfast" }, note: { "zh-Hant": "這天先排港邊早餐。", en: "Start the day with breakfast by the harbour." } },
        { time: { "zh-Hant": "10:00", en: "10:00" }, title: { "zh-Hant": "雪梨歌劇院 / Circular Quay", en: "Sydney Opera House / Circular Quay" }, note: { "zh-Hant": "早餐後接歌劇院和 Circular Quay。", en: "Continue with the Opera House and Circular Quay after breakfast." } },
        { time: { "zh-Hant": "13:30", en: "13:30" }, title: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" }, note: { "zh-Hant": "下午安排海生館。", en: "The aquarium sits in the afternoon." } },
        { time: { "zh-Hant": "18:00", en: "18:00" }, title: { "zh-Hant": "達令港晚餐 / 夜景", en: "Darling Harbour dinner / evening views" }, note: { "zh-Hant": "晚上回達令港一帶。", en: "Return to Darling Harbour in the evening." } },
      ],
    },
    {
      day: { "zh-Hant": "Day 6", en: "Day 6" },
      date: "2026-05-29",
      city: { "zh-Hant": "Sydney", en: "Sydney" },
      plan: { "zh-Hant": "雪梨最後半天，晚上回機場", en: "Final Sydney half-day, then head to the airport" },
      focus: { "zh-Hant": "白天留在市區，晚上去機場。", en: "Stay in the city during the day, then head to the airport at night." },
      location: { "zh-Hant": "QVB / Hyde Park / Darling Harbour / 雪梨機場", en: "QVB / Hyde Park / Darling Harbour / Sydney Airport" },
      costAud: 150,
      transport: { "zh-Hant": "市區步行 + 機場線", en: "City walking + airport train" },
      reminder: { "zh-Hant": "這天晚上是國際線回程。", en: "The international return flight is on this evening." },
      timeline: [
        { time: { "zh-Hant": "09:30", en: "09:30" }, title: { "zh-Hant": "最後一段市區散步", en: "One last city walk" }, note: { "zh-Hant": "白天還可以留在市區。", en: "The daytime can stay in the city." } },
        { time: { "zh-Hant": "13:00", en: "13:00" }, title: { "zh-Hant": "午餐＋最後補買", en: "Lunch and final shopping" }, note: { "zh-Hant": "中午接午餐和補買。", en: "Use midday for lunch and any last shopping." } },
        { time: { "zh-Hant": "17:30", en: "17:30" }, title: { "zh-Hant": "回飯店拿行李", en: "Return to the hotel for bags" }, note: { "zh-Hant": "傍晚回飯店拿行李。", en: "Return for the bags in the late afternoon." } },
        { time: { "zh-Hant": "19:00", en: "19:00" }, title: { "zh-Hant": "前往雪梨機場", en: "Head to Sydney Airport" }, note: { "zh-Hant": "晚上前往機場。", en: "Head to the airport in the evening." } },
      ],
    },
  ],
  recommendedItinerary: [
    {
      title: { "zh-Hant": "墨爾本參考版：大洋路", en: "Melbourne reference: Great Ocean Road" },
      note: { "zh-Hant": "這組不是實際行程，是另外整理的參考版本。", en: "This is not the actual itinerary. It is a separate reference version." },
      bullets: [
        { "zh-Hant": "早上提早出發，先停 Memorial Arch、Lorne。", en: "Leave early and start with Memorial Arch and Lorne." },
        { "zh-Hant": "中午留 Apollo Bay 或沿線小鎮午餐。", en: "Keep lunch around Apollo Bay or another coastal town." },
        { "zh-Hant": "下午主拍十二門徒岩與 Loch Ard Gorge。", en: "Use the afternoon for the Twelve Apostles and Loch Ard Gorge." },
      ],
    },
    {
      title: { "zh-Hant": "墨爾本參考版：Phillip Island", en: "Melbourne reference: Phillip Island" },
      note: { "zh-Hant": "這組不是實際行程，是另外整理的參考版本。", en: "This is not the actual itinerary. It is a separate reference version." },
      bullets: [
        { "zh-Hant": "中午前後出發，不用排得像大洋路那麼早。", en: "Leave around late morning instead of treating it like the coast day." },
        { "zh-Hant": "先走 San Remo、Nobbies 一帶海岸線。", en: "Start with San Remo and the Nobbies coastline." },
        { "zh-Hant": "傍晚進企鵝歸巢園區，晚上再回墨爾本。", en: "Head into Penguin Parade by late afternoon and return after the evening session." },
      ],
    },
    {
      title: { "zh-Hant": "雪梨參考版：歌劇院＋The Rocks＋海生館", en: "Sydney reference: Opera House, The Rocks, and aquarium" },
      note: { "zh-Hant": "這組不是實際行程，是另外整理的參考版本。", en: "This is not the actual itinerary. It is a separate reference version." },
      bullets: [
        { "zh-Hant": "早餐選歌劇院 view 店，再接 Circular Quay。", en: "Start with an Opera House-view breakfast and then move into Circular Quay." },
        { "zh-Hant": "中午把 The Rocks 或港邊散步排進來。", en: "Use midday for The Rocks or a longer harbour walk." },
        { "zh-Hant": "下午再接 SEA LIFE Sydney Aquarium。", en: "Move into SEA LIFE Sydney Aquarium in the afternoon." },
      ],
    },
  ],
  budgetRows: [
    { item: { "zh-Hant": "國際機票", en: "International flights" }, aud: 1000, note: { "zh-Hant": "先用兩人約 NT$20,700 換算", en: "Assumes about NT$20,700 total for two" }, booked: true, status: "estimated" },
    { item: { "zh-Hant": "墨爾本住宿 3 晚", en: "Melbourne stay, 3 nights" }, aud: 789.3, note: { "zh-Hant": "Dorsett Melbourne｜5/24 - 5/27｜NT$16,339", en: "Dorsett Melbourne | May 24 - May 27 | NT$16,339" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "雪梨住宿 2 晚", en: "Sydney stay, 2 nights" }, aud: 899.6, note: { "zh-Hant": "索菲特達令港｜5/27 - 5/29｜NT$18,621", en: "Sofitel Darling Harbour | May 27 - May 29 | NT$18,621" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "墨爾本 → 雪梨國內線", en: "Melbourne to Sydney domestic flight" }, aud: 260, note: { "zh-Hant": "JQ514 已訂，但截圖未顯示票價，先保留估算", en: "JQ514 is booked, but the fare was not shown in the screenshot, so this stays estimated" }, status: "estimated" },
    { item: { "zh-Hant": "墨爾本租車", en: "Melbourne rental car" }, aud: 264.2, note: { "zh-Hant": "Toyota Corolla 或同級｜NT$5,468｜已付款", en: "Toyota Corolla or similar | NT$5,468 | paid" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "機場 / 市區交通與停車", en: "Airport, city transport, and parking" }, aud: 180, note: { "zh-Hant": "含雪梨機場線、墨爾本停車或加油彈性", en: "Includes Sydney airport rail plus Melbourne parking or fuel cushion" }, status: "estimated" },
    { item: { "zh-Hant": "餐食", en: "Food" }, aud: 700, note: { "zh-Hant": "兩人 6 天舒服吃法", en: "Comfortable dining pace for two" }, status: "estimated" },
    { item: { "zh-Hant": "一日遊 / 門票", en: "Day tour / tickets" }, aud: 360, note: { "zh-Hant": "抓一個代表性日遊", en: "Assumes one signature day trip" }, status: "estimated" },
    { item: { "zh-Hant": "購物與彈性", en: "Shopping and cushion" }, aud: 350, note: { "zh-Hant": "留給臨時加點或戰利品", en: "Flex for extras and souvenirs" }, status: "estimated" },
  ],
  checklistGroups: [
    {
      title: { "zh-Hant": "文件", en: "Documents" },
      items: [
        { id: "passport", title: { "zh-Hant": "護照效期", en: "Passport validity" }, desc: { "zh-Hant": "確認回程日後仍有足夠效期。", en: "Make sure it stays valid beyond the return date." } },
        { id: "eta", title: { "zh-Hant": "澳洲簽證 / ETA", en: "Australia ETA / visa" }, desc: { "zh-Hant": "出發前務必完成。", en: "Finish this before departure." } },
        { id: "insurance", title: { "zh-Hant": "旅遊保險", en: "Travel insurance" }, desc: { "zh-Hant": "保單電子檔也一起留在手機。", en: "Keep the policy copy on your phone too." } },
      ],
    },
    {
      title: { "zh-Hant": "訂單", en: "Bookings" },
      items: [
        { id: "mel-hotel", title: { "zh-Hant": "墨爾本飯店", en: "Melbourne hotel" }, desc: { "zh-Hant": "5/24 到 5/27 的住宿已確認。", en: "The stay from May 24 to May 27 is confirmed." } },
        { id: "syd-hotel", title: { "zh-Hant": "雪梨飯店", en: "Sydney hotel" }, desc: { "zh-Hant": "5/27 到 5/29 的住宿已確認。", en: "The stay from May 27 to May 29 is confirmed." } },
        { id: "domestic", title: { "zh-Hant": "澳洲內陸段機票", en: "Domestic Australia flight" }, desc: { "zh-Hant": "JQ514 已訂，起飛時間 13:00。", en: "JQ514 is booked with a 13:00 departure." } },
        { id: "car", title: { "zh-Hant": "墨爾本租車", en: "Melbourne rental car" }, desc: { "zh-Hant": "確認取車、還車與駕照文件。", en: "Double-check pickup, return, and driving documents." } },
      ],
    },
    {
      title: { "zh-Hant": "行李", en: "Packing" },
      items: [
        { id: "layer", title: { "zh-Hant": "薄外套", en: "Light layer" }, desc: { "zh-Hant": "5 月澳洲入秋，早晚偏涼。", en: "Australia is in autumn in May, so mornings and nights can feel cool." } },
        { id: "shoes", title: { "zh-Hant": "好走的鞋", en: "Walking shoes" }, desc: { "zh-Hant": "雪梨海岸步道會走比較久。", en: "The Sydney coastal walk is easier with good shoes." } },
        { id: "adapter", title: { "zh-Hant": "澳規轉接頭", en: "AU adapter" }, desc: { "zh-Hant": "澳洲插座和台灣不同。", en: "Australia uses a different plug type from Taiwan." } },
        { id: "license", title: { "zh-Hant": "駕照 / 國際駕照", en: "Driver's license / IDP" }, desc: { "zh-Hant": "租車那天會用到，和取車文件放一起最方便。", en: "Keep this with the pickup documents for the rental day." } },
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
        { label: { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" }, href: "https://all.accor.com/hotel/9729/index.en.shtml" },
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
    {
      title: { "zh-Hant": "歌劇院 view 早餐", en: "Opera House view breakfast" },
      links: [
        { label: { "zh-Hant": "Wahlburgers Opera Quays", en: "Wahlburgers Opera Quays" }, href: "https://wahlburgers.com.au/locations/opera-quays/" },
        { label: { "zh-Hant": "MCA Cafe", en: "MCA Cafe" }, href: "https://www.mca.com.au/visit/dining/" },
        { label: { "zh-Hant": "Sydney Opera House", en: "Sydney Opera House" }, href: "https://www.sydneyoperahouse.com/" },
        { label: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" }, href: "https://www.visitsealife.com/sydney/" },
      ],
    },
    {
      title: { "zh-Hant": "景點官方", en: "Official attractions" },
      links: [
        { label: { "zh-Hant": "Twelve Apostles", en: "Twelve Apostles" }, href: "https://www.parks.vic.gov.au/places-to-see/sites/twelve-apostles" },
        { label: { "zh-Hant": "Penguin Parade", en: "Penguin Parade" }, href: "https://www.penguins.org.au/attractions/penguin-parade/" },
        { label: { "zh-Hant": "The Nobbies", en: "The Nobbies" }, href: "https://www.penguins.org.au/attractions/reserves/the-nobbies/" },
      ],
    },
  ],
  map: {
    fullRoute: {
      href: "https://www.google.com/maps/dir/Melbourne+Airport/Dorsett+Melbourne/Twelve+Apostles+Victoria/Loch+Ard+Gorge/San+Remo+Victoria/Nobbies+Centre+Phillip+Island/Penguin+Parade+Phillip+Island/Sofitel+Sydney+Darling+Harbour/Wahlburgers+Opera+Quays/Sydney+Opera+House/SEA+LIFE+Sydney+Aquarium/Sydney+Airport",
    },
    dayRoutes: [
      { label: { "zh-Hant": "Day 1 墨爾本落地", en: "Day 1 Melbourne arrival" }, embed: "https://www.google.com/maps?q=Melbourne+Airport+Dorsett+Melbourne+Southbank&output=embed" },
      { label: { "zh-Hant": "Day 2 大洋路", en: "Day 2 Great Ocean Road" }, embed: "https://www.google.com/maps?q=Twelve+Apostles+Victoria+Loch+Ard+Gorge&output=embed" },
      { label: { "zh-Hant": "Day 3 企鵝歸巢", en: "Day 3 Penguin Parade" }, embed: "https://www.google.com/maps?q=Penguin+Parade+Phillip+Island+Nobbies+Centre&output=embed" },
      { label: { "zh-Hant": "Day 5 歌劇院早餐＋海生館", en: "Day 5 breakfast + aquarium" }, embed: "https://www.google.com/maps?q=Wahlburgers+Opera+Quays+Sydney+Opera+House+SEA+LIFE+Sydney+Aquarium&output=embed" },
    ],
    points: [
      { title: { "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" }, note: { "zh-Hant": "墨爾本 base", en: "Melbourne base" }, open: "https://www.google.com/maps/search/?api=1&query=Dorsett+Melbourne", embed: "https://www.google.com/maps?q=Dorsett+Melbourne&output=embed" },
      { title: { "zh-Hant": "十二門徒岩", en: "Twelve Apostles" }, note: { "zh-Hant": "大洋路主景點", en: "Great Ocean Road highlight" }, open: "https://www.google.com/maps/search/?api=1&query=Twelve+Apostles+Victoria", embed: "https://www.google.com/maps?q=Twelve+Apostles+Victoria&output=embed" },
      { title: { "zh-Hant": "Loch Ard Gorge", en: "Loch Ard Gorge" }, note: { "zh-Hant": "十二門徒岩旁的岩岸景點", en: "Cliff-and-cove stop near the Apostles" }, open: "https://www.google.com/maps/search/?api=1&query=Loch+Ard+Gorge", embed: "https://www.google.com/maps?q=Loch+Ard+Gorge&output=embed" },
      { title: { "zh-Hant": "企鵝歸巢", en: "Penguin Parade" }, note: { "zh-Hant": "Phillip Island Nature Parks", en: "Phillip Island Nature Parks" }, open: "https://www.google.com/maps/search/?api=1&query=Penguin+Parade+Phillip+Island", embed: "https://www.google.com/maps?q=Penguin+Parade+Phillip+Island&output=embed" },
      { title: { "zh-Hant": "Nobbies Centre", en: "Nobbies Centre" }, note: { "zh-Hant": "企鵝歸巢前的海岸線散步", en: "Coastal boardwalk before the parade" }, open: "https://www.google.com/maps/search/?api=1&query=Nobbies+Centre+Phillip+Island", embed: "https://www.google.com/maps?q=Nobbies+Centre+Phillip+Island&output=embed" },
      { title: { "zh-Hant": "Wahlburgers Opera Quays", en: "Wahlburgers Opera Quays" }, note: { "zh-Hant": "歌劇院 view 早餐", en: "Opera House view breakfast" }, open: "https://www.google.com/maps/search/?api=1&query=Wahlburgers+Opera+Quays", embed: "https://www.google.com/maps?q=Wahlburgers+Opera+Quays&output=embed" },
      { title: { "zh-Hant": "MCA Cafe", en: "MCA Cafe" }, note: { "zh-Hant": "另一個拍港灣 brunch 點", en: "Another harbour-view brunch stop" }, open: "https://www.google.com/maps/search/?api=1&query=MCA+Cafe+Sydney", embed: "https://www.google.com/maps?q=MCA+Cafe+Sydney&output=embed" },
      { title: { "zh-Hant": "Sydney Opera House", en: "Sydney Opera House" }, note: { "zh-Hant": "雪梨代表地標", en: "Sydney icon" }, open: "https://www.google.com/maps/search/?api=1&query=Sydney+Opera+House", embed: "https://www.google.com/maps?q=Sydney+Opera+House&output=embed" },
      { title: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" }, note: { "zh-Hant": "達令港海生館", en: "Darling Harbour aquarium" }, open: "https://www.google.com/maps/search/?api=1&query=SEA+LIFE+Sydney+Aquarium", embed: "https://www.google.com/maps?q=SEA+LIFE+Sydney+Aquarium&output=embed" },
    ],
  },
};

function getText(entry) {
  if (typeof entry === "string") return entry;
  return entry?.[state.lang] ?? entry?.["zh-Hant"] ?? "";
}

function formatCurrency(aud, currency = state.currency) {
  const meta = rates[currency];
  return `${meta.symbol}${Math.round(aud * meta.audPerUnit).toLocaleString()}`;
}

function cacheDom() {
  dom.pageProgress = document.getElementById("pageProgress");
  dom.heroSummary = document.getElementById("heroSummary");
  dom.keyInfoBar = document.getElementById("keyInfoBar");
  dom.quickInfoGrid = document.getElementById("quickInfoGrid");
  dom.overviewMiniChecklist = document.getElementById("overviewMiniChecklist");
  dom.overviewRecommendations = document.getElementById("overviewRecommendations");
  dom.importantAlerts = document.getElementById("importantAlerts");
  dom.overviewNotes = document.getElementById("overviewNotes");
  dom.flightCards = document.getElementById("flightCards");
  dom.flightNotes = document.getElementById("flightNotes");
  dom.stayPlanCard = document.getElementById("stayPlanCard");
  dom.cityRhythm = document.getElementById("cityRhythm");
  dom.moveDayTimeline = document.getElementById("moveDayTimeline");
  dom.moveOptions = document.getElementById("moveOptions");
  dom.itineraryList = document.getElementById("itineraryList");
  dom.recommendedItineraryList = document.getElementById("recommendedItineraryList");
  dom.budgetSelectedHeading = document.getElementById("budgetSelectedHeading");
  dom.budgetHighlights = document.getElementById("budgetHighlights");
  dom.budgetTableBody = document.getElementById("budgetTableBody");
  dom.budgetCards = document.getElementById("budgetCards");
  dom.mapList = document.getElementById("mapList");
  dom.mapFrame = document.getElementById("mapFrame");
  dom.mapDayRoutes = document.getElementById("mapDayRoutes");
  dom.fullRouteLink = document.getElementById("fullRouteLink");
  dom.checklistGroups = document.getElementById("checklistGroups");
  dom.linksGrid = document.getElementById("linksGrid");
}

function checklistState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.checklist) || "{}");
}

function saveChecklist(next) {
  localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify(next));
}

function isMobileLayout() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function updateDocumentTitle() {
  const titles = {
    overview: getText({ "zh-Hant": "總覽", en: "Overview" }),
    flights: getText({ "zh-Hant": "航班", en: "Flights" }),
    stays: getText({ "zh-Hant": "住宿", en: "Stay" }),
    itinerary: getText({ "zh-Hant": "行程", en: "Itinerary" }),
    map: getText({ "zh-Hant": "地圖", en: "Map" }),
    budget: getText({ "zh-Hant": "預算", en: "Budget" }),
    notes: getText({ "zh-Hant": "清單", en: "Checklist" }),
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
  dom.heroSummary.innerHTML = data.heroSummary
    .map(
      (item) => `
        <article class="summary-card">
          <div class="summary-label">${getText(item.label)}</div>
          <div class="summary-value">${getText(item.value)}</div>
        </article>
      `
    )
    .join("");
}

function renderKeyInfo() {
  dom.keyInfoBar.innerHTML = data.keyInfo
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

function renderQuickInfo() {
  dom.quickInfoGrid.innerHTML = data.quickInfo
    .map(
      (item) => `
        <article class="quick-info-card">
          <div class="summary-label">${getText(item.label)}</div>
          <div class="info-value">${getText(item.value)}</div>
        </article>
      `
    )
    .join("");
}

function renderOverviewMiniChecklist() {
  const saved = checklistState();
  const items = [
    data.checklistGroups[0].items[0],
    data.checklistGroups[0].items[1],
    data.checklistGroups[1].items[2],
    data.checklistGroups[2].items[3],
  ];
  dom.overviewMiniChecklist.innerHTML = items
    .map(
      (item) => `
        <label class="mini-check">
          <input class="check-input" type="checkbox" data-check="${item.id}" ${saved[item.id] ? "checked" : ""} />
          <span class="mini-check-body">
            <span class="mini-check-mark" aria-hidden="true"></span>
            <span>
              <span class="check-title">${getText(item.title)}</span>
              <span class="check-desc">${getText(item.desc)}</span>
            </span>
          </span>
        </label>
      `
    )
    .join("");
}

function renderOverview() {
  dom.overviewRecommendations.innerHTML = data.overviewRecommendations
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

  dom.importantAlerts.innerHTML = data.importantAlerts
    .map(
      (item) => `
        <article class="alert-card">
          <div class="bullet-title">${getText(item.title)}</div>
          <div class="bullet-desc">${getText(item.desc)}</div>
        </article>
      `
    )
    .join("");

  dom.overviewNotes.innerHTML = data.overviewNotes
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");
}

function renderFlights() {
  dom.flightCards.innerHTML = data.flights
    .map(
      (flight) => `
        <article class="flight-card">
          <img class="airline-badge" src="${flight.logo}" alt="${getText(flight.airline)}" loading="lazy" decoding="async" />
          <div class="flight-topline">
            <span class="day-chip">${getText(flight.label)}</span>
            <span class="date-label">${flight.date}</span>
          </div>
          <div class="flight-route">${flight.route}</div>
          <div class="flight-time">${flight.time}</div>
          <div class="info-line"><span class="info-label">${t[state.lang].dateText}</span><span class="info-value">${flight.date}</span></div>
          <div class="info-line"><span class="info-label">${t[state.lang].classText}</span><span class="info-value">${getText(flight.cabin)}</span></div>
          <div class="info-line"><span class="info-label">${t[state.lang].airportLabel}</span><span class="info-value">${getText(flight.airport)}</span></div>
        </article>
      `
    )
    .join("");

  dom.flightNotes.innerHTML = data.flightNotes
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");
}

function renderStays() {
  const stay = data.stayPlan;
  const formatStayLine = (item) => (item.aud ? `${getText(item.valuePrefix)}${formatCurrency(item.aud)}` : getText(item.value));
  const formatStayCost = (aud, suffix) => `${formatCurrency(aud)}${suffix ? getText(suffix) : ""}`;
  dom.stayPlanCard.innerHTML = `
    <h3>${getText(stay.title)}</h3>
    <p class="budget-original">${getText(stay.subtitle)}</p>
    <div class="pill-row">${stay.chips.map((chip) => `<span class="pill">${getText(chip)}</span>`).join("")}</div>
    <div class="hotel-spotlight-list">
      ${stay.hotels
        .map(
          (hotel) => `
            <article class="hotel-spotlight-card">
              <a class="hotel-spotlight-image-link" href="${hotel.href}" target="_blank" rel="noreferrer" aria-label="${getText(hotel.name)}">
                <img class="hotel-spotlight-image" src="${hotel.image}" alt="${getText(hotel.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.closest('.hotel-spotlight-card').classList.add('hotel-spotlight-fallback'); this.remove();" />
              </a>
              <div class="hotel-spotlight-body">
                <div class="hotel-spotlight-top">
                  <div class="route-title">${getText(hotel.name)}</div>
                  <span class="route-chip">${getText(hotel.dates)}</span>
                </div>
                <div class="price-value">${formatCurrency(hotel.priceAud)}</div>
                <div class="budget-original">${formatCurrency(hotel.priceAud, "AUD")}</div>
                <div class="bullet-desc">${getText(hotel.note)}</div>
                <a class="hotel-spotlight-link" href="${hotel.href}" target="_blank" rel="noreferrer" aria-label="${getText(hotel.name)}">${t[state.lang].openLink}</a>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
    <div class="price-stack">
      ${stay.notes
        .map(
          (item) => `
            <div class="price-row">
              <div class="price-label">${getText(item.title)}</div>
              <div class="price-value">${formatStayLine(item)}</div>
              ${item.aud ? `<div class="budget-original">${formatCurrency(item.aud, "AUD")}</div>` : ""}
            </div>
          `
        )
        .join("")}
    </div>
  `;

  dom.cityRhythm.innerHTML = data.cityRhythm
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");

  dom.moveDayTimeline.innerHTML = data.moveDayTimeline
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

  dom.moveOptions.innerHTML = data.moveOptions
    .map(
      (item) => `
        <article class="route-card">
          ${item.image ? `<img class="route-card-image" src="${item.image}" alt="${getText(item.imageAlt)}" loading="lazy" decoding="async" />` : ""}
          <div class="route-top">
            <div>
              <div class="route-title">${getText(item.title)}</div>
              <div class="bullet-desc">${getText(item.desc)}</div>
            </div>
            <span class="route-chip">${getText(item.duration)}</span>
          </div>
          <div class="info-line"><span class="info-label">${t[state.lang].fromLabel}</span><span class="info-value">${getText(item.start)}</span></div>
          <div class="info-line"><span class="info-label">${t[state.lang].toLabel}</span><span class="info-value">${getText(item.destination)}</span></div>
          <div class="info-line"><span class="info-label">${t[state.lang].costCardLabel}</span><span class="info-value">${item.costAud ? formatStayCost(item.costAud, item.costSuffix) : getText(item.cost)}</span></div>
          ${item.specs ? `<div class="route-spec-grid">${item.specs
            .map(
              (spec) => `
                <div class="route-spec-card">
                  <div class="info-label">${getText(spec.label)}</div>
                  <div class="info-value">${getText(spec.value)}</div>
                </div>
              `
            )
            .join("")}</div>` : ""}
        </article>
      `
    )
    .join("");
}

function renderItinerary() {
  dom.itineraryList.innerHTML = data.itinerary
    .map(
      (item) => `
        <details class="itinerary-card" ${item.open ? "open" : ""}>
          <summary class="accordion-summary">
            <div class="itinerary-summary-header">
              <span class="day-chip">${getText(item.day)}</span>
              <span class="date-label">${item.date}</span>
            </div>
            <div class="itinerary-summary-topline">
              <span class="city-chip">${getText(item.city)}</span>
            </div>
            <h3>${getText(item.plan)}</h3>
          </summary>
          <div class="accordion-body">
            <article class="itinerary-focus-card">
              <div class="itinerary-meta-label">${t[state.lang].timelineFocusLabel}</div>
              <div class="itinerary-focus-text">${getText(item.focus)}</div>
            </article>
            <div class="itinerary-dayline" aria-label="${t[state.lang].timelineTitle}">
              ${item.timeline
                .map(
                  (slot) => `
                    <article class="itinerary-timeline-item">
                      <div class="itinerary-timeline-time">${getText(slot.time)}</div>
                      <div class="itinerary-timeline-dot" aria-hidden="true"></div>
                      <div class="itinerary-timeline-content">
                        <div class="bullet-title">${getText(slot.title)}</div>
                        <div class="timeline-desc">${getText(slot.note)}</div>
                      </div>
                    </article>
                  `
                )
                .join("")}
            </div>
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
            <article class="alert-card itinerary-tip-card">
              <div class="itinerary-meta-label">${t[state.lang].timelineTipLabel}</div>
              <div class="bullet-desc">${getText(item.reminder)}</div>
            </article>
          </div>
        </details>
      `
    )
    .join("");

  if (!dom.recommendedItineraryList) return;

  dom.recommendedItineraryList.innerHTML = data.recommendedItinerary
    .map(
      (item) => `
        <article class="recommend-card">
          <div class="flight-topline">
            <div class="route-title">${getText(item.title)}</div>
            <span class="route-chip">${t[state.lang].itineraryRecommendKicker}</span>
          </div>
          <div class="bullet-desc">${getText(item.note)}</div>
          <div class="bullet-stack recommend-bullet-stack">
            ${item.bullets.map((bullet) => `<article class="bullet-card"><div class="bullet-desc">${getText(bullet)}</div></article>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderBudget() {
  const totalAud = data.budgetRows.reduce((sum, item) => sum + item.aud, 0);
  const bookedAud = data.budgetRows.filter((item) => item.booked).reduce((sum, item) => sum + item.aud, 0);
  const perPersonAud = totalAud / 2;
  const averageDailyAud = totalAud / 6;
  const flexibleAud = totalAud - bookedAud;
  const getStatusLabel = (item) => (item.status === "actual" ? t[state.lang].budgetStatusActual : t[state.lang].budgetStatusEstimated);

  dom.budgetSelectedHeading.textContent = state.currency;

  dom.budgetHighlights.innerHTML = [
    { label: t[state.lang].totalTripCostLabel, note: t[state.lang].totalTripCostNote, aud: totalAud, primary: true },
    { label: t[state.lang].averageDailyLabel, note: t[state.lang].averageDailyNote, aud: averageDailyAud },
    { label: t[state.lang].perPersonCostLabel, note: t[state.lang].perPersonCostNote, aud: perPersonAud },
    { label: t[state.lang].bookedLabel, note: t[state.lang].bookedNote, aud: bookedAud },
    { label: t[state.lang].flexibleLabel, note: t[state.lang].flexibleNote, aud: flexibleAud },
  ]
    .map(
      (item) => `
        <article class="budget-highlight-card ${item.primary ? "budget-highlight-primary" : ""}">
          <div class="bullet-title">${item.label}</div>
          <div class="budget-main">${formatCurrency(item.aud)}</div>
          <div class="budget-original">${formatCurrency(item.aud, "AUD")} · ${item.note}</div>
        </article>
      `
    )
    .join("");

  dom.budgetTableBody.innerHTML = data.budgetRows
    .map(
      (item) => `
        <tr>
          <td>${getText(item.item)} <span class="route-chip">${getStatusLabel(item)}</span></td>
          <td>${formatCurrency(item.aud, "TWD")}</td>
          <td>${formatCurrency(item.aud, "AUD")}</td>
          <td>${getText(item.note)}</td>
        </tr>
      `
    )
    .join("");

  dom.budgetCards.innerHTML = data.budgetRows
    .map(
      (item) => `
        <article class="budget-card">
          <div class="flight-topline">
            <div class="summary-label">${getText(item.item)}</div>
            <span class="route-chip">${getStatusLabel(item)}</span>
          </div>
          <div class="budget-card-metrics">
            <div>
              <div class="price-label">TWD</div>
              <div class="budget-main">${formatCurrency(item.aud, "TWD")}</div>
            </div>
            <div>
              <div class="price-label">AUD</div>
              <div class="budget-main">${formatCurrency(item.aud, "AUD")}</div>
            </div>
          </div>
          <div class="budget-original">${getText(item.note)}</div>
        </article>
      `
    )
    .join("");
}

function renderChecklist() {
  const saved = checklistState();
  dom.checklistGroups.innerHTML = data.checklistGroups
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
  dom.linksGrid.innerHTML = data.usefulLinks
    .map(
      (group) => `
        <article class="link-block">
          <h3>${getText(group.title)}</h3>
          <div class="link-list">
            ${group.links
              .map(
                (link) => `
                  <a class="link-button large-link-button" href="${link.href}" target="_blank" rel="noreferrer" aria-label="${getText(link.label)}">
                    <span>${getText(link.label)}</span>
                    <span class="link-button-meta">${t[state.lang].openLink}</span>
                  </a>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderMap() {
  if (!dom.mapList || !dom.mapFrame || !dom.mapDayRoutes || !dom.fullRouteLink) return;

  dom.fullRouteLink.href = data.map.fullRoute.href;
  dom.mapDayRoutes.innerHTML = data.map.dayRoutes
    .map(
      (route, index) => `
        <button class="map-day-button ${index === 0 ? "active" : ""}" type="button" data-map-embed="${route.embed}" aria-label="${getText(route.label)}">
          ${getText(route.label)}
        </button>
      `
    )
    .join("");

  dom.mapList.innerHTML = data.map.points
    .map(
      (point) => `
        <article class="map-card">
          <button class="map-card-button" type="button" data-map-embed="${point.embed}" aria-label="${getText(point.title)}">
            <div class="bullet-title">${getText(point.title)}</div>
            <div class="bullet-desc">${getText(point.note)}</div>
          </button>
          <a class="map-open-link" href="${point.open}" target="_blank" rel="noreferrer" aria-label="${getText(point.title)}">${t[state.lang].openLink}</a>
        </article>
      `
    )
    .join("");

  dom.mapFrame.src = data.map.dayRoutes[0].embed;
}

function renderAll() {
  renderI18n();
  renderHero();
  renderKeyInfo();
  renderQuickInfo();
  renderOverviewMiniChecklist();
  renderOverview();
  renderFlights();
  renderStays();
  renderItinerary();
  renderBudget();
  renderMap();
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

function updateLanguage(nextLang) {
  if (!nextLang || nextLang === state.lang) return;
  state.lang = nextLang;
  localStorage.setItem(STORAGE_KEYS.lang, state.lang);
  syncControls();
  renderAll();
  syncPageNavigation();
}

function updateCurrency(nextCurrency) {
  if (!nextCurrency || nextCurrency === state.currency) return;
  state.currency = nextCurrency;
  localStorage.setItem(STORAGE_KEYS.currency, state.currency);
  syncControls();
  renderBudget();
  renderStays();
  renderItinerary();
}

function updateChecklistItem(id, checked) {
  if (!id) return;
  const next = checklistState();
  next[id] = checked;
  saveChecklist(next);
  renderOverviewMiniChecklist();
  renderChecklist();
}

function syncPageNavigation() {
  document.querySelectorAll("[data-page-link]").forEach((button) => {
    const active = button.dataset.pageLink === state.page;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });

  document.querySelectorAll("[data-page-panel]").forEach((panel) => {
    const active = panel.dataset.pagePanel === state.page;
    if (isMobileLayout()) {
      panel.hidden = false;
      panel.classList.add("active");
    } else {
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    }
  });
}

function setPage(page, { scroll = true } = {}) {
  if (!PAGE_IDS.includes(page)) return;
  state.page = page;
  localStorage.setItem(STORAGE_KEYS.page, page);
  updateDocumentTitle();
  syncPageNavigation();

  if (!scroll) return;

  if (isMobileLayout()) {
    document.getElementById(`section-${page}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function bindUIEvents() {
  document.addEventListener("click", (event) => {
    const langButton = event.target.closest("[data-lang]");
    if (langButton) {
      updateLanguage(langButton.dataset.lang);
      return;
    }

    const currencyButton = event.target.closest("[data-currency]");
    if (currencyButton) {
      updateCurrency(currencyButton.dataset.currency);
      return;
    }

    const pageButton = event.target.closest("[data-page-link]");
    if (pageButton) {
      setPage(pageButton.dataset.pageLink);
      return;
    }

    const mapButton = event.target.closest("[data-map-embed]");
    if (mapButton && dom.mapFrame) {
      dom.mapFrame.src = mapButton.dataset.mapEmbed;
      document.querySelectorAll(".map-day-button").forEach((node) => node.classList.toggle("active", node === mapButton));
      document.querySelectorAll(".map-card").forEach((card) => card.classList.toggle("active", card.contains(mapButton)));
    }
  });

  document.addEventListener("change", (event) => {
    const checkInput = event.target.closest("[data-check]");
    if (checkInput) updateChecklistItem(checkInput.dataset.check, checkInput.checked);
  });
}

function updateProgress() {
  if (!dom.pageProgress) return;
  progressFrame = 0;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
  dom.pageProgress.style.transform = `scaleX(${ratio})`;
}

function queueProgressUpdate() {
  if (progressFrame) return;
  progressFrame = window.requestAnimationFrame(updateProgress);
}

function bindProgress() {
  updateProgress();
  window.addEventListener("scroll", queueProgressUpdate, { passive: true });
  window.addEventListener("resize", queueProgressUpdate, { passive: true });
}

function bindMobileSectionObserver() {
  if (!("IntersectionObserver" in window)) return;
  const sections = PAGE_IDS.map((page) => document.getElementById(`section-${page}`)).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      if (!isMobileLayout()) return;
      let nextPage = "";
      let highestRatio = 0;

      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio <= highestRatio) return;
        highestRatio = entry.intersectionRatio;
        nextPage = entry.target.dataset.pagePanel || "";
      });

      if (!nextPage || nextPage === state.page) return;
      state.page = nextPage;
      localStorage.setItem(STORAGE_KEYS.page, nextPage);
      syncPageNavigation();
      updateDocumentTitle();
    },
    {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: "-12% 0px -45% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function queueNavigationSync() {
  if (resizeFrame) return;
  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = 0;
    syncPageNavigation();
    updateProgress();
  });
}

function bindResize() {
  window.addEventListener("resize", queueNavigationSync, { passive: true });
}

cacheDom();
renderAll();
bindUIEvents();
syncControls();
syncPageNavigation();
bindProgress();
bindMobileSectionObserver();
bindResize();
