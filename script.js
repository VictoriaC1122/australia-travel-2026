const STORAGE_KEYS = {
  lang: "australia-handbook-lang",
  currency: "australia-handbook-currency",
  checklist: "australia-handbook-checklist-v2",
  page: "australia-handbook-page",
  budgetFilter: "australia-handbook-budget-filter",
};

const PAGE_IDS = ["overview", "flights", "stays", "itinerary", "map", "budget", "souvenirs", "notes"];
const MOBILE_BREAKPOINT = 768;

const state = {
  lang: localStorage.getItem(STORAGE_KEYS.lang) || "zh-Hant",
  currency: localStorage.getItem(STORAGE_KEYS.currency) || "TWD",
  page: PAGE_IDS.includes(localStorage.getItem(STORAGE_KEYS.page)) ? localStorage.getItem(STORAGE_KEYS.page) : "overview",
  budgetFilter: ["all", "actual", "estimated"].includes(localStorage.getItem(STORAGE_KEYS.budgetFilter))
    ? localStorage.getItem(STORAGE_KEYS.budgetFilter)
    : "all",
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
    navSouvenirs: "名產",
    navNotes: "清單",
    overviewKicker: "Overview",
    overviewTitle: "這趟怎麼玩",
    overviewLead: "前半段墨爾本，後半段雪梨。",
    overviewSnapshotKicker: "Travel Notes",
    overviewSnapshotTitle: "這趟想看到的畫面",
    overviewSnapshotLead: "先把幾個最期待的景色放在前面。",
    shortcutFlights: "航班",
    shortcutFlightsNote: "先看時間和航廈",
    shortcutItinerary: "每日行程",
    shortcutItineraryNote: "每天去哪直接看這頁",
    shortcutBudget: "預算",
    shortcutBudgetNote: "實際花費和預估都在這",
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
    budgetLead: "這頁現在是半實際、半預估。每個項目都有註明是實際還是預估，飯店和租車已用實際金額，其它再慢慢補。",
    souvenirsKicker: "Souvenirs",
    souvenirsTitle: "名產 / 值得買",
    souvenirsLead: "這頁整理的是這趟澳洲真的值得買、而且帶回去不會後悔的幾樣。以好買、辨識度高、送人也體面為主。",
    souvenirsTipsTitle: "買法備忘",
    souvenirsSourcesTitle: "資料方向",
    notesKicker: "Notes",
    notesTitle: "清單 / 連結",
    notesLead: "最後一頁放的是出發前會一直翻到的清單和連結。",
    mapKicker: "Map",
    mapTitle: "地圖",
    mapLead: "把這趟會用到的地點整理成可切換地圖。",
    mapDayLabel: "每日路線",
    mapRouteLink: "開啟完整路線",
    driveTimeLabel: "開車約",
    quickInfoTitle: "快速資訊",
    compactChecklistTitle: "出發前確認",
    checklistTitle: "行前清單",
    linksTitle: "實用連結",
    budgetItemHeading: "項目",
    budgetOriginalHeading: "AUD",
    budgetNoteHeading: "備註",
    budgetStatusActual: "實際",
    budgetStatusEstimated: "預估",
    budgetFilterAll: "全部",
    budgetFilterActual: "實際",
    budgetFilterEstimated: "預估",
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
    airportLabel: "機場",
    fromLabel: "出發",
    toLabel: "抵達",
    countryLabel: "國家",
    cityLabel: "城市",
    terminalLabel: "航廈",
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
    navSouvenirs: "Souvenirs",
    navNotes: "Checklist",
    overviewKicker: "Overview",
    overviewTitle: "Trip shape",
    overviewLead: "Melbourne first, then Sydney.",
    overviewSnapshotKicker: "Travel Notes",
    overviewSnapshotTitle: "The views to look forward to",
    overviewSnapshotLead: "A few scenes worth keeping in mind before the trip starts.",
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
    souvenirsKicker: "Souvenirs",
    souvenirsTitle: "Worth buying",
    souvenirsLead: "This page keeps the Australia buys that feel genuinely worth bringing home: easy to carry, recognisably local, and still nice enough for gifting.",
    souvenirsTipsTitle: "Shopping notes",
    souvenirsSourcesTitle: "Research notes",
    notesKicker: "Notes",
    notesTitle: "Checklist / Links",
    notesLead: "The last page keeps the links and checklists you may want before departure.",
    mapKicker: "Map",
    mapTitle: "Map",
    mapLead: "Switch between the key places on a larger travel map.",
    mapDayLabel: "Daily routes",
    mapRouteLink: "Open full route",
    driveTimeLabel: "Drive",
    quickInfoTitle: "Quick info",
    compactChecklistTitle: "Before you go",
    checklistTitle: "Pre-trip checklist",
    linksTitle: "Useful links",
    budgetItemHeading: "Item",
    budgetOriginalHeading: "AUD",
    budgetNoteHeading: "Note",
    budgetStatusActual: "Actual",
    budgetStatusEstimated: "Estimate",
    budgetFilterAll: "All",
    budgetFilterActual: "Actual",
    budgetFilterEstimated: "Estimate",
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
    countryLabel: "Country",
    cityLabel: "City",
    terminalLabel: "Terminal",
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
    { title: { "zh-Hant": "預算頁已分開實際和預估", en: "The budget page separates actual and estimated items" }, desc: { "zh-Hant": "飯店和租車用實際金額，其它另外標示。", en: "Hotels and the car use actual amounts, while the rest is labeled separately." } },
  ],
  overviewPhotoJournal: [
    {
      featured: true,
      title: { "zh-Hant": "雪梨歌劇院", en: "Sydney Opera House" },
      image: "./assets/opera-house-harbour.jpg",
      alt: { "zh-Hant": "雪梨歌劇院與海港景色", en: "Sydney Opera House with the harbour" },
      caption: { "zh-Hant": "最想先看到的就是這裡。", en: "This is the first view I want." },
    },
    {
      featured: false,
      title: { "zh-Hant": "墨爾本散步感", en: "Melbourne city mood" },
      image: "./assets/melbourne-degraves.jpg",
      alt: { "zh-Hant": "墨爾本街景與咖啡氣氛", en: "Melbourne laneway and cafe mood" },
      caption: { "zh-Hant": "想留一段慢慢走的時間。", en: "Saving time for a slow city walk." },
    },
    {
      featured: false,
      title: { "zh-Hant": "十二門徒岩", en: "Twelve Apostles" },
      image: "./assets/twelve-apostles.jpg",
      alt: { "zh-Hant": "十二門徒岩海岸景色", en: "The Twelve Apostles coastline" },
      caption: { "zh-Hant": "這天應該會很值得。", en: "This day should be worth it." },
    },
  ],
  flights: [
    {
      label: { "zh-Hant": "去程", en: "Outbound" },
      route: "TPE → MEL",
      date: "2026-05-23 / 2026-05-24",
      time: "23:30 → 10:40",
      cabin: { "zh-Hant": "CI 0057", en: "CI 0057" },
      airline: { "zh-Hant": "中華航空", en: "China Airlines" },
      logo: "./assets/airline-ci-badge.svg",
      from: {
        country: { "zh-Hant": "台灣", en: "Taiwan" },
        city: { "zh-Hant": "台北", en: "Taipei" },
        airport: { "zh-Hant": "桃園國際機場", en: "Taoyuan International Airport" },
        terminal: { "zh-Hant": "第 2 航廈", en: "Terminal 2" },
      },
      to: {
        country: { "zh-Hant": "澳洲", en: "Australia" },
        city: { "zh-Hant": "墨爾本", en: "Melbourne" },
        airport: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" },
        terminal: { "zh-Hant": "第 2 航廈", en: "Terminal 2" },
      },
    },
    {
      label: { "zh-Hant": "中段", en: "Domestic" },
      route: "MEL → SYD",
      date: "2026-05-27",
      time: "13:00 → 14:25",
      cabin: { "zh-Hant": "Jetstar JQ514", en: "Jetstar JQ514" },
      airline: { "zh-Hant": "Jetstar", en: "Jetstar" },
      logo: "./assets/airline-jetstar-badge.svg",
      from: {
        country: { "zh-Hant": "澳洲", en: "Australia" },
        city: { "zh-Hant": "墨爾本", en: "Melbourne" },
        airport: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" },
        terminal: { "zh-Hant": "第 4 航廈", en: "Terminal 4" },
      },
      to: {
        country: { "zh-Hant": "澳洲", en: "Australia" },
        city: { "zh-Hant": "雪梨", en: "Sydney" },
        airport: { "zh-Hant": "雪梨機場", en: "Sydney Airport" },
        terminal: { "zh-Hant": "國內線 T2", en: "Domestic Terminal 2" },
      },
    },
    {
      label: { "zh-Hant": "回程", en: "Return" },
      route: "SYD → TPE",
      date: "2026-05-29 / 2026-05-30",
      time: "22:10 → 05:40",
      cabin: { "zh-Hant": "CI 0052", en: "CI 0052" },
      airline: { "zh-Hant": "中華航空", en: "China Airlines" },
      logo: "./assets/airline-ci-badge.svg",
      from: {
        country: { "zh-Hant": "澳洲", en: "Australia" },
        city: { "zh-Hant": "雪梨", en: "Sydney" },
        airport: { "zh-Hant": "雪梨機場", en: "Sydney Airport" },
        terminal: { "zh-Hant": "第 1 航廈", en: "Terminal 1" },
      },
      to: {
        country: { "zh-Hant": "台灣", en: "Taiwan" },
        city: { "zh-Hant": "台北", en: "Taipei" },
        airport: { "zh-Hant": "桃園國際機場", en: "Taoyuan International Airport" },
        terminal: { "zh-Hant": "第 2 航廈", en: "Terminal 2" },
      },
    },
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
        name: { "zh-Hant": "墨爾本帝盛酒店", en: "Dorsett Melbourne" },
        subname: { "zh-Hant": "Dorsett Melbourne", en: "Melbourne Dorsett Hotel" },
        dates: { "zh-Hant": "5/24 - 5/27", en: "May 24 - May 27" },
        priceAud: 789.3,
        stars: { "zh-Hant": "4 星級", en: "4-star hotel" },
        feature: { "zh-Hant": "主打室內恆溫泳池與市中心 base", en: "Known for its heated indoor pool and central city base" },
        note: { "zh-Hant": "墨爾本這段住這裡，泳池和位置都很方便。", en: "This is the Melbourne base, with a convenient pool-and-city setup." },
        image: "https://www.dorsetthotels.com/images/dorsett-melbourne/facilities/dorsett-47-S360-desktop.webp",
        href: "https://www.dorsetthotels.com/dorsett-melbourne/",
      },
      {
        name: { "zh-Hant": "雪梨達令港索菲特酒店", en: "Sofitel Sydney Darling Harbour" },
        subname: { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" },
        dates: { "zh-Hant": "5/27 - 5/29", en: "May 27 - May 29" },
        priceAud: 899.6,
        stars: { "zh-Hant": "5 星級", en: "5-star luxury hotel" },
        feature: { "zh-Hant": "主打達令港海景、法式奢華感", en: "Known for Darling Harbour views and French luxury" },
        note: { "zh-Hant": "雪梨這段住這裡，重點就是達令港海景和整體質感。", en: "This is the Sydney stay, with harbour views and a more elevated luxury feel." },
        image: "https://m.ahstatic.com/is/image/accorhotels/aja_p_4445-57%3A3by2?dpr=on%2C1.5&fmt=jpg&hei=223&icc=sRGB&iccEmbed=true&op_usm=1.75%2C0.3%2C2%2C0&qlt=80&resMode=sharp2&wid=335",
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
      plan: { "zh-Hant": "咖啡一條街＋市區散步", en: "Degraves Street and a city walk" },
      focus: { "zh-Hant": "今天就留在市區，走咖啡街、老車站、圖書館和河邊。", en: "Keep this day in central Melbourne with coffee lanes, the station, the library, and the river." },
      location: { "zh-Hant": "Degraves Street / Flinders Street Station / Federation Square / State Library Victoria / Yarra River", en: "Degraves Street / Flinders Street Station / Federation Square / State Library Victoria / Yarra River" },
      costAud: 190,
      transport: { "zh-Hant": "市區步行 + 短程移動", en: "City walking and short transfers" },
      reminder: { "zh-Hant": "State Library 的圓頂閱覽室值得留一段時間，晚上再接 Yarra River。", en: "Leave proper time for the domed reading room at State Library Victoria, then move into Yarra River in the evening." },
      image: "./assets/day1-melbourne-skyline.jpg",
      imageAlt: { "zh-Hant": "墨爾本 Southbank 天際線", en: "Melbourne Southbank skyline" },
      timeline: [
        { time: { "zh-Hant": "上午", en: "Morning" }, title: { "zh-Hant": "Degraves Street 早午餐", en: "Brunch on Degraves Street" }, note: { "zh-Hant": "先把咖啡一條街排進來，這段很適合慢慢吃早午餐。", en: "Start on Degraves Street for a slower brunch and coffee stretch." } },
        { time: { "zh-Hant": "中午", en: "Midday" }, title: { "zh-Hant": "Flinders Street Station", en: "Flinders Street Station" }, note: { "zh-Hant": "車站這段可以和 Federation Square 一起走。", en: "Pair Flinders Street Station with a walk through Federation Square." } },
        { time: { "zh-Hant": "下午", en: "Afternoon" }, title: { "zh-Hant": "State Library Victoria", en: "State Library Victoria" }, note: { "zh-Hant": "圓頂閱覽室值得專門進去看一下。", en: "The domed reading room is worth making time for." } },
        { time: { "zh-Hant": "晚上", en: "Evening" }, title: { "zh-Hant": "Yarra River 散步＋晚餐", en: "Yarra River walk and dinner" }, note: { "zh-Hant": "晚上就留在河邊慢慢散步吃飯。", en: "Keep the evening by the river for a walk and dinner." } },
      ],
      open: true,
    },
    {
      day: { "zh-Hant": "Day 2", en: "Day 2" },
      date: "2026-05-25",
      city: { "zh-Hant": "Melbourne", en: "Melbourne" },
      plan: { "zh-Hant": "十二門徒岩｜大洋路一日遊", en: "Twelve Apostles | Great Ocean Road day trip" },
      focus: { "zh-Hant": "這天就是海岸線、斷崖和公路旅行感。", en: "This day is all about the coastline, cliffs, and the road-trip feel." },
      location: { "zh-Hant": "Great Ocean Road / Twelve Apostles / Loch Ard Gorge / London Arch", en: "Great Ocean Road / Twelve Apostles / Loch Ard Gorge / London Arch" },
      costAud: 320,
      transport: { "zh-Hant": "跟團或自駕｜大洋路", en: "Tour or self-drive | Great Ocean Road" },
      reminder: { "zh-Hant": "晚上回飯店休息就好，這天到市區通常已經很晚。", en: "Keep the evening easy back at the hotel, since you usually reach the city quite late." },
      image: "./assets/twelve-apostles.jpg",
      imageAlt: { "zh-Hant": "十二門徒岩海岸風景", en: "Twelve Apostles coastline" },
      timeline: [
        { time: { "zh-Hant": "07:00 前", en: "Before 07:00" }, title: { "zh-Hant": "從墨爾本出發", en: "Leave Melbourne" }, note: { "zh-Hant": "這天越早出發越好，整體會比較順。", en: "An early start helps the whole day feel easier." } },
        { time: { "zh-Hant": "沿途", en: "En route" }, title: { "zh-Hant": "沿路小鎮停靠", en: "Pause in coastal towns" }, note: { "zh-Hant": "Lorne 和 Apollo Bay 都很適合中途停一下。", en: "Lorne and Apollo Bay both work well as short coastal stops." } },
        { time: { "zh-Hant": "下午", en: "Afternoon" }, title: { "zh-Hant": "大洋路精華景點", en: "Great Ocean Road highlights" }, note: { "zh-Hant": "下午就把 Twelve Apostles、Loch Ard Gorge 和 London Arch 排在一起。", en: "Use the afternoon for the main run of Twelve Apostles, Loch Ard Gorge, and London Arch." } },
        { time: { "zh-Hant": "下午", en: "Afternoon" }, title: { "zh-Hant": "十二門徒岩", en: "Twelve Apostles" }, note: { "zh-Hant": "經典大景可以留久一點。", en: "Leave a little extra time for the classic big view." } },
        { time: { "zh-Hant": "下午", en: "Afternoon" }, title: { "zh-Hant": "Loch Ard Gorge / London Arch", en: "Loch Ard Gorge / London Arch" }, note: { "zh-Hant": "這兩個點接在一起很順。", en: "These two stops flow well one after the other." } },
        { time: { "zh-Hant": "20:00－22:00", en: "20:00-22:00" }, title: { "zh-Hant": "回到墨爾本", en: "Return to Melbourne" }, note: { "zh-Hant": "晚上通常這個時間回市區，回飯店休息就好。", en: "Most returns land back in the city around this window, so an easy night back at the hotel works best." } },
      ],
    },
    {
      day: { "zh-Hant": "Day 3", en: "Day 3" },
      date: "2026-05-26",
      city: { "zh-Hant": "Phillip Island", en: "Phillip Island" },
      plan: { "zh-Hant": "企鵝歸巢＋海邊晚餐", en: "Penguin Parade and a seaside dinner" },
      focus: { "zh-Hant": "這天節奏比較鬆，白天在市區慢慢走，傍晚接海邊晚餐和企鵝歸巢。", en: "This day keeps a softer pace with an easy city start, then a seaside dinner and Penguin Parade." },
      location: { "zh-Hant": "墨爾本市區 / Phillip Island / The Cerberus Beach House / Penguin Parade", en: "Central Melbourne / Phillip Island / The Cerberus Beach House / Penguin Parade" },
      costAud: 260,
      transport: { "zh-Hant": "租車自駕｜Phillip Island", en: "Self-drive | Phillip Island" },
      reminder: { "zh-Hant": "企鵝歸巢通常不能拍照，晚上海邊很冷，厚外套一定要帶。", en: "Photography is usually not allowed at Penguin Parade, and the coast gets very cold at night, so bring a proper outer layer." },
      image: "./assets/day3-phillip-island-sunset.jpg",
      imageAlt: { "zh-Hant": "Phillip Island 夕陽海景", en: "Phillip Island sunset coastline" },
      timeline: [
        { time: { "zh-Hant": "上午", en: "Morning" }, title: { "zh-Hant": "睡晚一點＋輕鬆逛市區", en: "Sleep in and keep the city easy" }, note: { "zh-Hant": "可以排 brunch、咖啡廳，或市區購物。", en: "Use the morning for brunch, a cafe, or some light city shopping." } },
        { time: { "zh-Hant": "14:00", en: "14:00" }, title: { "zh-Hant": "出發前往 Phillip Island", en: "Leave for Phillip Island" }, note: { "zh-Hant": "車程大約 2 小時。", en: "The drive is about two hours." } },
        { time: { "zh-Hant": "傍晚", en: "Late afternoon" }, title: { "zh-Hant": "海邊晚餐", en: "Seaside dinner" }, note: { "zh-Hant": "The Cerberus Beach House 可以接在企鵝前面。", en: "The Cerberus Beach House fits nicely before the penguin session." } },
        { time: { "zh-Hant": "晚上", en: "Evening" }, title: { "zh-Hant": "企鵝歸巢", en: "Penguin Parade" }, note: { "zh-Hant": "小企鵝會從海裡走回巢穴，是很經典的一段。", en: "The little penguins come up from the sea and head back to their burrows, which is the classic part of the evening." } },
        { time: { "zh-Hant": "深夜", en: "Late night" }, title: { "zh-Hant": "回墨爾本市區", en: "Return to central Melbourne" }, note: { "zh-Hant": "結束後再一路開回市區。", en: "Drive back into Melbourne after the penguin session ends." } },
      ],
    },
    {
      day: { "zh-Hant": "Day 4", en: "Day 4" },
      date: "2026-05-27",
      city: { "zh-Hant": "Melbourne → Sydney", en: "Melbourne → Sydney" },
      plan: { "zh-Hant": "輕鬆收尾＋飛雪梨", en: "Easy last Melbourne hours and flight to Sydney" },
      focus: { "zh-Hant": "上午留給最後逛街和早午餐，下午接 JQ514 飛雪梨。", en: "Use the morning for brunch and a final city round, then take JQ514 to Sydney in the afternoon." },
      location: { "zh-Hant": "Melbourne Central / Emporium / Bourke Street / MEL T4 / SYD", en: "Melbourne Central / Emporium / Bourke Street / MEL T4 / SYD" },
      costAud: 230,
      transport: { "zh-Hant": "市區移動 + 機場 + 國內線", en: "City movement + airport + domestic flight" },
      reminder: { "zh-Hant": "中午先回飯店拿行李，下午接 13:00 的 JQ514。", en: "Return to the hotel for bags around midday, then continue to the 13:00 JQ514 flight." },
      image: "./assets/day4-darling-harbour.jpg",
      imageAlt: { "zh-Hant": "雪梨達令港景色", en: "Sydney Darling Harbour view" },
      timeline: [
        { time: { "zh-Hant": "上午", en: "Morning" }, title: { "zh-Hant": "早午餐＋最後逛街", en: "Brunch and final shopping" }, note: { "zh-Hant": "Melbourne Central、Emporium 和 Bourke Street 可以排在這段。", en: "Use this window for Melbourne Central, Emporium, and Bourke Street." } },
        { time: { "zh-Hant": "中午", en: "Midday" }, title: { "zh-Hant": "回飯店拿行李", en: "Return for the bags" }, note: { "zh-Hant": "中午回飯店整理行李最剛好。", en: "This is the natural window to head back for the luggage." } },
        { time: { "zh-Hant": "下午", en: "Afternoon" }, title: { "zh-Hant": "飛雪梨 JQ514", en: "Fly to Sydney on JQ514" }, note: { "zh-Hant": "班機 13:00 起飛。", en: "The flight departs at 13:00." } },
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
      image: "./assets/opera-house-harbour.jpg",
      imageAlt: { "zh-Hant": "雪梨歌劇院與港灣", en: "Sydney Opera House and harbour" },
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
      image: "./assets/day6-qvb-sydney.jpg",
      imageAlt: { "zh-Hant": "雪梨 QVB 與市中心街景", en: "Sydney QVB and city streets" },
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
    { item: { "zh-Hant": "澳洲簽證 / ETA", en: "Australia ETA" }, aud: 40, note: { "zh-Hant": "官方 ETA App 服務費 A$20 / 人，兩人先抓 A$40", en: "Official ETA app service fee is A$20 per person, so A$40 for two" }, status: "estimated" },
    { item: { "zh-Hant": "墨爾本住宿 3 晚", en: "Melbourne stay, 3 nights" }, aud: 789.3, note: { "zh-Hant": "Dorsett Melbourne｜5/24 - 5/27｜NT$16,339", en: "Dorsett Melbourne | May 24 - May 27 | NT$16,339" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "雪梨住宿 2 晚", en: "Sydney stay, 2 nights" }, aud: 899.6, note: { "zh-Hant": "索菲特達令港｜5/27 - 5/29｜NT$18,621", en: "Sofitel Darling Harbour | May 27 - May 29 | NT$18,621" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "墨爾本 → 雪梨國內線", en: "Melbourne to Sydney domestic flight" }, aud: 260, note: { "zh-Hant": "JQ514 已訂，但截圖未顯示票價，先保留估算", en: "JQ514 is booked, but the fare was not shown in the screenshot, so this stays estimated" }, status: "estimated" },
    { item: { "zh-Hant": "墨爾本租車", en: "Melbourne rental car" }, aud: 264.2, note: { "zh-Hant": "Toyota Corolla 或同級｜NT$5,468｜已付款", en: "Toyota Corolla or similar | NT$5,468 | paid" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "機場 / 市區交通與停車", en: "Airport, city transport, and parking" }, aud: 180, note: { "zh-Hant": "含雪梨機場線、墨爾本停車或加油彈性", en: "Includes Sydney airport rail plus Melbourne parking or fuel cushion" }, status: "estimated" },
    { item: { "zh-Hant": "餐食", en: "Food" }, aud: 700, note: { "zh-Hant": "兩人 6 天舒服吃法", en: "Comfortable dining pace for two" }, status: "estimated" },
    { item: { "zh-Hant": "一日遊 / 門票", en: "Day tour / tickets" }, aud: 360, note: { "zh-Hant": "抓一個代表性日遊", en: "Assumes one signature day trip" }, status: "estimated" },
    { item: { "zh-Hant": "購物與彈性", en: "Shopping and cushion" }, aud: 350, note: { "zh-Hant": "留給臨時加點或戰利品", en: "Flex for extras and souvenirs" }, status: "estimated" },
  ],
  souvenirs: [
    {
      name: { "zh-Hant": "澳洲蛋白石飾品", en: "Australian opal jewellery" },
      subname: { "zh-Hant": "Opal ring / pendant / earrings", en: "Opal ring / pendant / earrings" },
      image: "./assets/souvenir-opal.jpg",
      tags: [
        { "zh-Hant": "辨識度高", en: "iconic" },
        { "zh-Hant": "送禮體面", en: "giftable" },
      ],
      note: {
        "zh-Hant": "澳洲最有代表性的名產之一，適合買一件真的會留很久的紀念品。",
        en: "One of the most recognisable Australian keepsakes, especially if you want one piece that lasts.",
      },
      buy: {
        "zh-Hant": "適合在市區珠寶店慢慢挑，重點看證書、產地和色澤，不要只看最低價。",
        en: "Best bought in a proper city jeweller. Focus on certification, origin, and colour play instead of the cheapest tag.",
      },
      range: { "zh-Hant": "價格帶：從小墜飾到正式珠寶差很多", en: "Price range: from small pendants to full jewellery pieces" },
      href: "https://www.australia.com/en-us/facts-and-planning/about-australia/australian-souvenirs.html",
    },
    {
      name: { "zh-Hant": "Tim Tam / 澳洲零食", en: "Tim Tam and Australia snacks" },
      subname: { "zh-Hant": "Tim Tam / 巧克力餅乾 / 超市伴手禮", en: "Tim Tam / chocolate biscuits / supermarket gifts" },
      image: "./assets/souvenir-timtam-card.svg",
      tags: [
        { "zh-Hant": "最好買", en: "easy buy" },
        { "zh-Hant": "機場也能補", en: "airport friendly" },
      ],
      note: {
        "zh-Hant": "如果想買輕鬆又不太會踩雷的伴手禮，Tim Tam 還是很實用。",
        en: "If you want the easiest low-risk gift, Tim Tam is still one of the most practical picks.",
      },
      buy: {
        "zh-Hant": "Coles、Woolworths、機場商店都好買；多口味一起帶最有感。",
        en: "Easy to buy at Coles, Woolworths, or airport shops. A mixed-flavour haul feels the most fun.",
      },
      range: { "zh-Hant": "價格帶：平價，適合多買幾盒", en: "Price range: affordable and easy to buy in multiples" },
      href: "https://www.australia.com/en-us/facts-and-planning/about-australia/australian-souvenirs.html",
    },
    {
      name: { "zh-Hant": "Aesop 護手霜 / 香氛保養", en: "Aesop hand balm and skincare" },
      subname: { "zh-Hant": "Aesop", en: "Aesop" },
      image: "./assets/souvenir-aesop-card.svg",
      tags: [
        { "zh-Hant": "澳洲品牌", en: "Australian brand" },
        { "zh-Hant": "高級感", en: "elevated" },
      ],
      note: {
        "zh-Hant": "如果想買比較高級、自己也會真的用到的東西，Aesop 很適合。",
        en: "If you want something a little more polished that you will actually use, Aesop is an easy yes.",
      },
      buy: {
        "zh-Hant": "墨爾本和雪梨門市很多，護手霜、香皂、隨身噴霧都很適合帶。",
        en: "Both Melbourne and Sydney have many stores. Hand balm, bar soap, and smaller aromatic products travel well.",
      },
      range: { "zh-Hant": "價格帶：中高", en: "Price range: mid to premium" },
      href: "https://www.aesop.com/",
    },
    {
      name: { "zh-Hant": "美麗諾羊毛 / 澳洲製羊毛小物", en: "Merino wool and Australian-made wool goods" },
      subname: { "zh-Hant": "Merino scarf / throw / knit accessories", en: "Merino scarf / throw / knit accessories" },
      image: "./assets/souvenir-merino.jpg",
      tags: [
        { "zh-Hant": "秋冬實用", en: "useful" },
        { "zh-Hant": "有質感", en: "textural" },
      ],
      note: {
        "zh-Hant": "比起買太大件的外套，小圍巾、披肩或拖鞋其實更好帶，也比較容易天天用。",
        en: "Instead of bulky outerwear, smaller wool pieces or slippers are easier to carry and much easier to use often.",
      },
      buy: {
        "zh-Hant": "挑澳洲製或清楚標示材質的款式，送人跟自己留都很穩。",
        en: "Look for Australian-made pieces or at least very clear fibre labels. They work well both as gifts and personal keepsakes.",
      },
      range: { "zh-Hant": "價格帶：中價位到高價位都有", en: "Price range: mid to premium" },
      href: "https://www.sydney.com/articles/best-souvenirs-from-australia",
    },
  ],
  souvenirTips: [
    {
      title: { "zh-Hant": "先買送人的，再買自己的", en: "Buy gift items first" },
      desc: {
        "zh-Hant": "零食、堅果這種可以先在超市處理，最後一天只留精品類或珠寶慢慢挑。",
        en: "Get the snack-style gifts done at supermarkets first, then leave the slower boutique shopping for the final day.",
      },
    },
    {
      title: { "zh-Hant": "羊毛和原住民藝術要看來源", en: "Check sourcing on wool and art" },
      desc: {
        "zh-Hant": "澳洲製、美麗諾材質、藝術家合作或授權資訊清楚的，通常更值得買。",
        en: "Australian-made labels, clear merino details, and transparent artist collaboration info are usually worth prioritising.",
      },
    },
    {
      title: { "zh-Hant": "機場補貨最適合零食類", en: "Use the airport for snack top-ups" },
      desc: {
        "zh-Hant": "Tim Tam、堅果這類最後補很方便；珠寶和設計品比較適合在市區慢慢看。",
        en: "Tim Tam and nuts are easy airport top-ups; jewellery and design pieces are better chosen slowly in town.",
      },
    },
  ],
  souvenirSources: [
    {
      title: { "zh-Hant": "研究基底", en: "Research base" },
      desc: {
        "zh-Hant": "這頁主要參考 Tourism Australia、Sydney.com、Aesop 官網與 Indigenous Art Code，再把適合這趟路線的東西收成一頁。",
        en: "This page pulls from Tourism Australia, Sydney.com, the Aesop site, and Indigenous Art Code, then narrows the list to what fits this trip best.",
      },
    },
    {
      title: { "zh-Hant": "挑選方向", en: "Selection logic" },
      desc: {
        "zh-Hant": "優先放進好帶、好買、送人不尷尬，而且回來真的還會用到的東西。",
        en: "The shortlist leans toward buys that travel well, are easy to find, gift well, and still feel useful after the trip.",
      },
    },
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
      title: { "zh-Hant": "卡片 / 哩程", en: "Card / miles" },
      links: [
        {
          label: { "zh-Hant": "中信華航聯名卡｜鼎尊無限卡", en: "CTBC China Airlines co-branded card | Infinite" },
          href: "https://www.ctbcbank.com/content/dam/minisite/long/creditcard/CTBCCI/product/index.html",
        },
        {
          label: { "zh-Hant": "鼎尊無限卡權益", en: "Infinite card benefits" },
          href: "https://www.ctbcbank.com/content/dam/minisite/long/creditcard/CTBCCI/product/feature.html",
        },
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
      { label: { "zh-Hant": "Day 1 墨爾本落地", en: "Day 1 Melbourne arrival" }, driveTime: { "zh-Hant": "機場到市區約 35 分", en: "Airport to city about 35 min" }, embed: "https://www.google.com/maps?q=Melbourne+Airport+Dorsett+Melbourne+Southbank&output=embed" },
      { label: { "zh-Hant": "Day 2 大洋路", en: "Day 2 Great Ocean Road" }, driveTime: { "zh-Hant": "市區到十二門徒岩約 4 小時 15 分", en: "City to Twelve Apostles about 4 hr 15 min" }, embed: "https://www.google.com/maps?q=Twelve+Apostles+Victoria+Loch+Ard+Gorge&output=embed" },
      { label: { "zh-Hant": "Day 3 企鵝歸巢", en: "Day 3 Penguin Parade" }, driveTime: { "zh-Hant": "市區到 Phillip Island 約 2 小時", en: "City to Phillip Island about 2 hr" }, embed: "https://www.google.com/maps?q=Penguin+Parade+Phillip+Island+Nobbies+Centre&output=embed" },
      { label: { "zh-Hant": "Day 5 歌劇院早餐＋海生館", en: "Day 5 breakfast + aquarium" }, driveTime: { "zh-Hant": "這天以步行 / 市區交通為主", en: "This day is mostly walking and city transit" }, embed: "https://www.google.com/maps?q=Wahlburgers+Opera+Quays+Sydney+Opera+House+SEA+LIFE+Sydney+Aquarium&output=embed" },
    ],
    points: [
      { title: { "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" }, note: { "zh-Hant": "墨爾本 base", en: "Melbourne base" }, driveTime: { "zh-Hant": "機場開車約 35 分", en: "About 35 min from the airport" }, open: "https://www.google.com/maps/search/?api=1&query=Dorsett+Melbourne", embed: "https://www.google.com/maps?q=Dorsett+Melbourne&output=embed" },
      { title: { "zh-Hant": "十二門徒岩", en: "Twelve Apostles" }, note: { "zh-Hant": "大洋路主景點", en: "Great Ocean Road highlight" }, driveTime: { "zh-Hant": "墨爾本市區開車約 4 小時 15 分", en: "About 4 hr 15 min from central Melbourne" }, open: "https://www.google.com/maps/search/?api=1&query=Twelve+Apostles+Victoria", embed: "https://www.google.com/maps?q=Twelve+Apostles+Victoria&output=embed" },
      { title: { "zh-Hant": "Loch Ard Gorge", en: "Loch Ard Gorge" }, note: { "zh-Hant": "十二門徒岩旁的岩岸景點", en: "Cliff-and-cove stop near the Apostles" }, driveTime: { "zh-Hant": "十二門徒岩開車約 6 分", en: "About 6 min from the Twelve Apostles" }, open: "https://www.google.com/maps/search/?api=1&query=Loch+Ard+Gorge", embed: "https://www.google.com/maps?q=Loch+Ard+Gorge&output=embed" },
      { title: { "zh-Hant": "企鵝歸巢", en: "Penguin Parade" }, note: { "zh-Hant": "Phillip Island Nature Parks", en: "Phillip Island Nature Parks" }, driveTime: { "zh-Hant": "墨爾本市區開車約 2 小時", en: "About 2 hr from central Melbourne" }, open: "https://www.google.com/maps/search/?api=1&query=Penguin+Parade+Phillip+Island", embed: "https://www.google.com/maps?q=Penguin+Parade+Phillip+Island&output=embed" },
      { title: { "zh-Hant": "Nobbies Centre", en: "Nobbies Centre" }, note: { "zh-Hant": "企鵝歸巢前的海岸線散步", en: "Coastal boardwalk before the parade" }, driveTime: { "zh-Hant": "企鵝歸巢園區開車約 10 分", en: "About 10 min from Penguin Parade" }, open: "https://www.google.com/maps/search/?api=1&query=Nobbies+Centre+Phillip+Island", embed: "https://www.google.com/maps?q=Nobbies+Centre+Phillip+Island&output=embed" },
      { title: { "zh-Hant": "Wahlburgers Opera Quays", en: "Wahlburgers Opera Quays" }, note: { "zh-Hant": "歌劇院 view 早餐", en: "Opera House view breakfast" }, driveTime: { "zh-Hant": "索菲特達令港過去開車約 12 分", en: "About 12 min by car from Sofitel Darling Harbour" }, open: "https://www.google.com/maps/search/?api=1&query=Wahlburgers+Opera+Quays", embed: "https://www.google.com/maps?q=Wahlburgers+Opera+Quays&output=embed" },
      { title: { "zh-Hant": "MCA Cafe", en: "MCA Cafe" }, note: { "zh-Hant": "另一個拍港灣 brunch 點", en: "Another harbour-view brunch stop" }, driveTime: { "zh-Hant": "索菲特達令港過去開車約 11 分", en: "About 11 min by car from Sofitel Darling Harbour" }, open: "https://www.google.com/maps/search/?api=1&query=MCA+Cafe+Sydney", embed: "https://www.google.com/maps?q=MCA+Cafe+Sydney&output=embed" },
      { title: { "zh-Hant": "Sydney Opera House", en: "Sydney Opera House" }, note: { "zh-Hant": "雪梨代表地標", en: "Sydney icon" }, driveTime: { "zh-Hant": "索菲特達令港過去開車約 13 分", en: "About 13 min by car from Sofitel Darling Harbour" }, open: "https://www.google.com/maps/search/?api=1&query=Sydney+Opera+House", embed: "https://www.google.com/maps?q=Sydney+Opera+House&output=embed" },
      { title: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" }, note: { "zh-Hant": "達令港海生館", en: "Darling Harbour aquarium" }, driveTime: { "zh-Hant": "索菲特達令港過去開車約 6 分", en: "About 6 min by car from Sofitel Darling Harbour" }, open: "https://www.google.com/maps/search/?api=1&query=SEA+LIFE+Sydney+Aquarium", embed: "https://www.google.com/maps?q=SEA+LIFE+Sydney+Aquarium&output=embed" },
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
  dom.overviewPhotoJournal = document.getElementById("overviewPhotoJournal");
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
  dom.budgetFilterButtons = Array.from(document.querySelectorAll("[data-budget-filter]"));
  dom.souvenirsGrid = document.getElementById("souvenirsGrid");
  dom.souvenirTips = document.getElementById("souvenirTips");
  dom.souvenirSources = document.getElementById("souvenirSources");
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
    souvenirs: getText({ "zh-Hant": "名產", en: "Souvenirs" }),
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

function renderOverviewPhotoJournal() {
  if (!dom.overviewPhotoJournal) return;

  dom.overviewPhotoJournal.innerHTML = data.overviewPhotoJournal
    .map(
      (item) => `
        <article class="photo-journal-card ${item.featured ? "featured" : ""}">
          <div class="photo-journal-frame">
            <img class="photo-journal-image" src="${item.image}" alt="${getText(item.alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
          </div>
          <div class="photo-journal-meta">
            <div class="route-title">${getText(item.title)}</div>
            <div class="bullet-desc">${getText(item.caption)}</div>
          </div>
        </article>
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
  const formatFlightStop = (stop) =>
    [
      `${t[state.lang].countryLabel}｜${getText(stop.country)}`,
      `${t[state.lang].cityLabel}｜${getText(stop.city)}`,
      `${t[state.lang].airportLabel}｜${getText(stop.airport)}`,
      `${t[state.lang].terminalLabel}｜${getText(stop.terminal)}`,
    ].join("<br />");

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
          <div class="info-line"><span class="info-label">${t[state.lang].fromLabel}</span><span class="info-value">${formatFlightStop(flight.from)}</span></div>
          <div class="info-line"><span class="info-label">${t[state.lang].toLabel}</span><span class="info-value">${formatFlightStop(flight.to)}</span></div>
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
                  <div class="hotel-spotlight-heading">
                    <div class="route-title">${getText(hotel.name)}</div>
                    ${hotel.subname ? `<div class="hotel-spotlight-subname">${getText(hotel.subname)}</div>` : ""}
                  </div>
                  <div class="hotel-spotlight-meta">
                    <span class="route-chip">${getText(hotel.dates)}</span>
                    ${hotel.stars ? `<span class="hotel-star-chip">${getText(hotel.stars)}</span>` : ""}
                  </div>
                </div>
                ${hotel.feature ? `<div class="hotel-feature">${getText(hotel.feature)}</div>` : ""}
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
            <figure class="itinerary-cover">
              <img class="itinerary-cover-image" src="${item.image}" alt="${getText(item.imageAlt)}" loading="lazy" decoding="async" />
            </figure>
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
  const budgetRows =
    state.budgetFilter === "all" ? data.budgetRows : data.budgetRows.filter((item) => item.status === state.budgetFilter);
  const totalAud = budgetRows.reduce((sum, item) => sum + item.aud, 0);
  const bookedAud = budgetRows.filter((item) => item.booked).reduce((sum, item) => sum + item.aud, 0);
  const perPersonAud = totalAud / 2;
  const averageDailyAud = totalAud / 6;
  const flexibleAud = totalAud - bookedAud;
  const getStatusLabel = (item) => (item.status === "actual" ? t[state.lang].budgetStatusActual : t[state.lang].budgetStatusEstimated);

  dom.budgetSelectedHeading.textContent = state.currency;
  dom.budgetFilterButtons?.forEach((button) => {
    const active = button.dataset.budgetFilter === state.budgetFilter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    const labelKey = `budgetFilter${button.dataset.budgetFilter.charAt(0).toUpperCase()}${button.dataset.budgetFilter.slice(1)}`;
    button.textContent = t[state.lang][labelKey];
  });

  const budgetHighlights = [
    { label: t[state.lang].totalTripCostLabel, note: t[state.lang].totalTripCostNote, aud: totalAud, primary: true },
    { label: t[state.lang].averageDailyLabel, note: t[state.lang].averageDailyNote, aud: averageDailyAud },
    { label: t[state.lang].perPersonCostLabel, note: t[state.lang].perPersonCostNote, aud: perPersonAud },
    { label: t[state.lang].bookedLabel, note: t[state.lang].bookedNote, aud: bookedAud },
    { label: t[state.lang].flexibleLabel, note: t[state.lang].flexibleNote, aud: flexibleAud },
  ];

  const [primaryHighlight, ...secondaryHighlights] = budgetHighlights;

  dom.budgetHighlights.innerHTML = `
    <article class="budget-overview-card budget-highlight-card budget-highlight-primary">
      <div class="summary-label">${primaryHighlight.label}</div>
      <div class="budget-main">${formatCurrency(primaryHighlight.aud)}</div>
      <div class="budget-original">${formatCurrency(primaryHighlight.aud, "AUD")}</div>
      <div class="budget-overview-note">${primaryHighlight.note}</div>
    </article>
    <div class="budget-overview-stats">
      ${secondaryHighlights
        .map(
          (item) => `
            <article class="budget-highlight-card budget-stat-card">
              <div class="summary-label">${item.label}</div>
              <div class="budget-main">${formatCurrency(item.aud)}</div>
              <div class="budget-original">${formatCurrency(item.aud, "AUD")}</div>
              <div class="budget-stat-note">${item.note}</div>
            </article>
          `
        )
        .join("")}
    </div>
  `;

  dom.budgetTableBody.innerHTML = budgetRows
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

  dom.budgetCards.innerHTML = budgetRows
    .map(
      (item) => `
        <article class="budget-card">
          <div class="budget-card-top">
            <div>
              <div class="summary-label">${getText(item.item)}</div>
              <div class="budget-card-note">${getText(item.note)}</div>
            </div>
            <span class="route-chip">${getStatusLabel(item)}</span>
          </div>
          <div class="budget-card-total">
            <div class="budget-main">${formatCurrency(item.aud)}</div>
            <div class="budget-original">${formatCurrency(item.aud, "AUD")}</div>
          </div>
          <div class="budget-card-breakdown">
            <div class="budget-card-line">
              <span class="price-label">${state.currency}</span>
              <span class="info-value">${formatCurrency(item.aud, state.currency)}</span>
            </div>
            <div class="budget-card-line">
              <span class="price-label">AUD</span>
              <span class="info-value">${formatCurrency(item.aud, "AUD")}</span>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderSouvenirs() {
  if (!dom.souvenirsGrid || !dom.souvenirTips || !dom.souvenirSources) return;

  dom.souvenirsGrid.innerHTML = data.souvenirs
    .map(
      (item) => `
        <article class="souvenir-card">
          <a class="souvenir-image-link" href="${item.href}" target="_blank" rel="noreferrer" aria-label="${getText(item.name)}">
            <img class="souvenir-image" src="${item.image}" alt="${getText(item.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
          </a>
          <div class="souvenir-body">
            <div class="souvenir-heading">
              <div class="route-title">${getText(item.name)}</div>
              <div class="souvenir-subname">${getText(item.subname)}</div>
            </div>
            <div class="pill-row">${item.tags.map((tag) => `<span class="pill">${getText(tag)}</span>`).join("")}</div>
            <div class="souvenir-note">${getText(item.note)}</div>
            <div class="souvenir-meta">
              <div class="info-line">
                <span class="info-label">${getText({ "zh-Hant": "怎麼買", en: "How to buy" })}</span>
                <span class="info-value">${getText(item.buy)}</span>
              </div>
              <div class="info-line">
                <span class="info-label">${getText({ "zh-Hant": "價格感", en: "Price feel" })}</span>
                <span class="info-value">${getText(item.range)}</span>
              </div>
            </div>
            <a class="hotel-spotlight-link" href="${item.href}" target="_blank" rel="noreferrer" aria-label="${getText(item.name)}">${t[state.lang].openLink}</a>
          </div>
        </article>
      `
    )
    .join("");

  dom.souvenirTips.innerHTML = data.souvenirTips
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");

  dom.souvenirSources.innerHTML = data.souvenirSources
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
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
          <span>${getText(route.label)}</span>
          ${route.driveTime ? `<span class="map-drive-time">${getText(route.driveTime)}</span>` : ""}
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
            ${point.driveTime ? `<div class="map-card-time">${t[state.lang].driveTimeLabel}｜${getText(point.driveTime)}</div>` : ""}
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
  renderOverviewPhotoJournal();
  renderOverview();
  renderFlights();
  renderStays();
  renderItinerary();
  renderBudget();
  renderSouvenirs();
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

function updateBudgetFilter(nextFilter) {
  if (!nextFilter || nextFilter === state.budgetFilter) return;
  state.budgetFilter = nextFilter;
  localStorage.setItem(STORAGE_KEYS.budgetFilter, state.budgetFilter);
  renderBudget();
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
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
}

function setPage(page, { scroll = true } = {}) {
  if (!PAGE_IDS.includes(page)) return;
  state.page = page;
  localStorage.setItem(STORAGE_KEYS.page, page);
  updateDocumentTitle();
  syncPageNavigation();

  if (!scroll) return;

  window.scrollTo({ top: 0, behavior: "smooth" });
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

    const budgetFilterButton = event.target.closest("[data-budget-filter]");
    if (budgetFilterButton) {
      updateBudgetFilter(budgetFilterButton.dataset.budgetFilter);
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
      if (isMobileLayout()) return;
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
