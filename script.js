const STORAGE_KEYS = {
  lang: "australia-handbook-lang",
  currency: "australia-handbook-currency",
  checklist: "australia-handbook-checklist-v3",
  budgetFilter: "australia-handbook-budget-filter",
  day: "australia-handbook-day",
  exchangeRate: "australia-handbook-twd-rate",
};

const PAGE_IDS = ["overview", "flights", "stays", "itinerary", "map", "budget", "souvenirs", "notes"];
const MORE_PAGE_IDS = new Set(["flights", "budget", "souvenirs", "notes"]);

const DAY_GLANCE_ORDER = ["start", "area", "highlights", "energy", "walk", "wear", "food", "transport", "booking"];

const CURRENCY_META = {
  AUD: { symbol: "A$" },
  TWD: { symbol: "NT$" },
};
const DEFAULT_TWD_RATE = 20.7;
const TRIP_START = "2026-05-23";
const TRIP_END = "2026-05-30";

const dom = {};
let progressFrame = 0;
let exchangeRateTimer = 0;
let deferredInstallPrompt = null;

const storage = {
  get(key) {
    try {
      return window.localStorage?.getItem(key) ?? null;
    } catch (error) {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage?.setItem(key, value);
    } catch (error) {
      return false;
    }

    return true;
  },
};

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const t = {
  "zh-Hant": {
    languageSwitcher: "語言",
    currencySwitcher: "幣別",
    navOverview: "旅程總覽",
    navFlights: "航班",
    navStays: "住宿移動",
    navItinerary: "每日指南",
    navMap: "地圖",
    navBudget: "旅費",
    navSouvenirs: "帶回家",
    navNotes: "出發前",
    mobileNavOverview: "總覽",
    mobileNavItinerary: "行程",
    mobileNavStays: "住宿",
    mobileNavMore: "更多",
    mobileMoreTitle: "旅途工具",
    close: "關閉",
    installGuide: "加入手機主畫面",
    installGuideNote: "行程可離線開啟",
    installHelp: "iPhone：Safari「分享 → 加入主畫面」。",
    dataFreshnessNote: "版本 2026.10.02｜航班、票券、營業時間與路況以官方資訊為準。",
    flightDataStatus: "CI0057、JQ514、CI0052｜出發前複核航廈與時間。",
    stayDataStatus: "Dorsett Melbourne（3 晚）／Sofitel Darling Harbour（2 晚）｜房型與入住規則以訂單為準。",
    exchangeRateTitle: "預算換算匯率",
    exchangeRateNote: "手動估算，非即時牌告。",
    offlineStatus: "離線模式｜行程可讀；地圖與外部連結暫停。",
    onlineStatus: "網路已恢復。",
    tripBeforeLabel: "行前準備",
    tripActiveLabel: "今天的旅程",
    tripAfterLabel: "旅程手冊",
    tripDepartureLabel: "今晚出發",
    tripReturnLabel: "回程日",
    tripDatePassed: "原行程｜2026.05.23 - 05.30",
    daysUntilTrip: "天後出發",
    openDayGuide: "打開當日指南",
    openFirstDay: "先看第一天",
    openRouteMap: "查看路線地圖",
    openStay: "查看住宿",
    openDepartureNotes: "查看出發前確認",
    quickStart: "出發",
    quickWear: "穿搭",
    quickMove: "移動",
    guideDataNote: "版本 2026.10.02｜靜態資料",
    fixedSchedule: "固定時段",
    stayReference: "住宿參考",
    overviewKicker: "The Journey",
    overviewTitle: "六天，從墨爾本走到雪梨港灣",
    overviewLead: "墨爾本巷弄、大洋路、Phillip Island，接著飛往雪梨；六天從城市走到海岸，再回到港灣。",
    overviewRouteKicker: "Route Notes",
    overviewRouteTitle: "旅程沿著城市、海岸與港灣前進",
    overviewRouteLead: "Melbourne CBD → Great Ocean Road → Phillip Island → Darling Harbour → Circular Quay。",
    overviewHighlightsKicker: "Highlights",
    overviewHighlightsTitle: "沿途會記得的幾個片刻",
    overviewHighlightsLead: "巷弄咖啡、斷崖海風、日落後的企鵝，以及雪梨港邊的早晨。",
    overviewDaysKicker: "Daily Notes",
    overviewDaysTitle: "六天，六種旅行節奏",
    overviewDaysLead: "城市散步、海岸公路、野生動物、跨城飛行與港灣晨光。",
    overviewPracticalKicker: "On The Road",
    overviewPracticalTitle: "旅途實用資料",
    overviewPracticalLead: "航班、住宿、交通、穿搭、付款與退稅。",
    flightsKicker: "Flight Notes",
    flightsTitle: "三段航班，一次看清",
    flightsLead: "5 月 23 日深夜從台北出發；5 月 27 日由墨爾本轉往雪梨；5 月 29 日晚間搭機返台。",
    flightPlanTitle: "機場時間",
    airportGuidesTitle: "出發與抵達安排",
    staysKicker: "Where We Stay",
    staysTitle: "兩座城市的落腳處",
    staysLead: "Dorsett Melbourne 3 晚，Sofitel Darling Harbour 2 晚；5 月 27 日還車後飛往雪梨。",
    stayAdvantagesTitle: "住宿位置與周邊動線",
    moveDayTitle: "5 月 27 日｜墨爾本到雪梨",
    moveOptionsTitle: "已確認的交通與備選方案",
    itineraryKicker: "Day By Day",
    itineraryTitle: "六天每日指南",
    itineraryLead: "每天的區域、步行量、穿搭、交通與固定時段。",
    mapKicker: "Route Map",
    mapTitle: "每日路線與地圖",
    mapLead: "市區步行、海岸公路與跨城移動，按日期查看。",
    mapDayLabel: "每日路線",
    mapRouteLink: "開啟完整路線",
    budgetKicker: "Trip Costs",
    budgetTitle: "旅費概覽",
    budgetLead: "已付款、已有金額與估算項目；支援 AUD／TWD 切換。",
    souvenirsKicker: "Bring Home",
    souvenirsTitle: "從澳洲帶回來",
    souvenirsLead: "超市零食、蛋白石、Aesop 與羊毛小物；分散採買，Day 6 補齊。",
    souvenirsTipsTitle: "採買節奏",
    souvenirsSourcesTitle: "挑選筆記",
    notesKicker: "Good To Know",
    notesTitle: "出發文件與旅途備忘",
    notesLead: "護照、ETA、訂單、穿搭與官方連結。",
    checklistTitle: "出發前確認",
    linksTitle: "旅途中會用到的連結",
    budgetItemHeading: "項目",
    budgetOriginalHeading: "AUD",
    budgetNoteHeading: "備註",
    budgetStatusActual: "已有金額",
    budgetStatusEstimated: "估算中",
    budgetFilterAll: "全部",
    budgetFilterActual: "已有金額",
    budgetFilterEstimated: "估算中",
    totalTripCostLabel: "兩人總額",
    totalTripCostNote: "含機票、住宿、城際移動、餐食與門票",
    averageDailyLabel: "平均每日",
    averageDailyNote: "以 6 天主行程估算",
    perPersonCostLabel: "每人預算",
    perPersonCostNote: "以兩人平均分攤估算",
    bookedLabel: "已先鎖定",
    bookedNote: "已有金額或已付款",
    flexibleLabel: "還有彈性",
    flexibleNote: "餐食、門票與部分交通",
    openLink: "查看",
    dateText: "日期",
    classText: "班機 / 航段",
    airportLabel: "機場",
    fromLabel: "出發",
    toLabel: "抵達",
    countryLabel: "國家",
    cityLabel: "城市",
    terminalLabel: "航廈",
    costCardLabel: "費用",
    driveTimeLabel: "移動感",
    checklistProgress: "完成",
    todayAtGlanceTitle: "今日概覽",
    routeFlowTitle: "今日路線",
    timelineTitle: "時間表",
    reminderTitle: "貼心提醒",
    glanceStart: "出發時間",
    glanceArea: "主要區域",
    glanceHighlights: "今日亮點",
    glanceEnergy: "體力節奏",
    glanceWalk: "步行量",
    glanceWear: "天氣與穿搭",
    glanceFood: "今日餐桌",
    glanceTransport: "移動方式",
    glanceBooking: "預約 / 提醒",
    previewOpen: "看當日詳細指南",
    previousDay: "上一天",
    nextDay: "下一天",
  },
  en: {
    languageSwitcher: "Language",
    currencySwitcher: "Currency",
    navOverview: "Overview",
    navFlights: "Flights",
    navStays: "Stay",
    navItinerary: "Daily Guide",
    navMap: "Map",
    navBudget: "Budget",
    navSouvenirs: "Souvenirs",
    navNotes: "Before You Go",
    mobileNavOverview: "Overview",
    mobileNavItinerary: "Guide",
    mobileNavStays: "Stay",
    mobileNavMore: "More",
    mobileMoreTitle: "Travel toolkit",
    close: "Close",
    installGuide: "Add to home screen",
    installGuideNote: "Available offline",
    installHelp: "iPhone: Safari Share → Add to Home Screen.",
    dataFreshnessNote: "Version 2026.10.02 | Check flights, tickets, opening hours, and roads with official sources.",
    flightDataStatus: "CI0057, JQ514, CI0052 | Recheck terminals and times before departure.",
    stayDataStatus: "Dorsett Melbourne (3 nights) / Sofitel Darling Harbour (2 nights) | Booking terms apply.",
    exchangeRateTitle: "Budget exchange rate",
    exchangeRateNote: "A manual planning rate, not a live quoted rate.",
    offlineStatus: "You are offline. Saved itinerary details remain available; maps and external links need a connection.",
    onlineStatus: "Connection restored.",
    tripBeforeLabel: "Before the trip",
    tripActiveLabel: "Today's journey",
    tripAfterLabel: "Travel handbook",
    tripDepartureLabel: "Departure tonight",
    tripReturnLabel: "Return day",
    tripDatePassed: "Original itinerary | May 23-30, 2026",
    daysUntilTrip: "days to departure",
    openDayGuide: "Open today's guide",
    openFirstDay: "Start with Day 1",
    openRouteMap: "Open route map",
    openStay: "Open stay details",
    openDepartureNotes: "Open departure notes",
    quickStart: "Start",
    quickWear: "Wear",
    quickMove: "Move",
    guideDataNote: "Version 2026.10.02 | static data",
    fixedSchedule: "Fixed timing",
    stayReference: "Stay reference",
    overviewKicker: "The Journey",
    overviewTitle: "Six days from Melbourne to Sydney Harbour",
    overviewLead: "The first half covers Melbourne, the Great Ocean Road, and Phillip Island. Fly to Sydney on May 27, then finish with two harbour and city days.",
    overviewRouteKicker: "Route Notes",
    overviewRouteTitle: "City, coast, and harbour in one route",
    overviewRouteLead: "Nearby places stay together, while the long-distance days keep only the stops that fit the direction of travel.",
    overviewHighlightsKicker: "Highlights",
    overviewHighlightsTitle: "A few moments to remember",
    overviewHighlightsLead: "Coffee in Melbourne's laneways, sea wind on the Great Ocean Road, penguins ashore, and breakfast by Sydney Harbour.",
    overviewDaysKicker: "Daily Notes",
    overviewDaysTitle: "The six-day outline",
    overviewDaysLead: "City walks, coastal roads, wildlife, a domestic flight, and harbour mornings.",
    overviewPracticalKicker: "On The Road",
    overviewPracticalTitle: "Keep these details close",
    overviewPracticalLead: "Flights, hotels, transport, clothing, payment, and tax refund.",
    flightsKicker: "Flight Notes",
    flightsTitle: "Three flights at a glance",
    flightsLead: "Depart Taipei late on May 23, fly from Melbourne to Sydney on May 27, and return from Sydney on the evening of May 29.",
    flightPlanTitle: "Airport timing",
    airportGuidesTitle: "Departure and arrival plan",
    staysKicker: "Where We Stay",
    staysTitle: "Two city stays",
    staysLead: "Stay at Dorsett Melbourne, then Sofitel Darling Harbour. May 27 is reserved for the car return, domestic flight, and hotel check-in.",
    stayAdvantagesTitle: "Hotel locations and nearby routes",
    moveDayTitle: "May 27 | Melbourne to Sydney",
    moveOptionsTitle: "Confirmed transport and alternatives",
    itineraryKicker: "Day By Day",
    itineraryTitle: "Six-day travel guide",
    itineraryLead: "Daily areas, walking load, clothing, transport, and fixed times.",
    mapKicker: "Route Map",
    mapTitle: "Daily routes and maps",
    mapLead: "Choose a day to view its main area and map. Long drives and city walks are kept separate.",
    mapDayLabel: "Daily routes",
    mapRouteLink: "Open full route",
    budgetKicker: "Trip Costs",
    budgetTitle: "Trip cost overview",
    budgetLead: "Paid, confirmed, and estimated costs are clearly marked, with AUD and TWD views for the total and per-person budget.",
    souvenirsKicker: "Bring Home",
    souvenirsTitle: "What to bring home from Australia",
    souvenirsLead: "Buy supermarket gifts early, then compare opal, Aesop, and wool items during the central-city shopping window.",
    souvenirsTipsTitle: "How to shop this smoothly",
    souvenirsSourcesTitle: "Selection logic",
    notesKicker: "Good To Know",
    notesTitle: "Travel documents and quick references",
    notesLead: "Passport, ETA, bookings, packing notes, and official links.",
    checklistTitle: "Before you go",
    linksTitle: "Links you may actually use",
    budgetItemHeading: "Item",
    budgetOriginalHeading: "AUD",
    budgetNoteHeading: "Note",
    budgetStatusActual: "Known amount",
    budgetStatusEstimated: "Estimated",
    budgetFilterAll: "All",
    budgetFilterActual: "Known amount",
    budgetFilterEstimated: "Estimated",
    totalTripCostLabel: "Trip shape for two",
    totalTripCostNote: "Flights, hotels, city transfer, meals, and tickets",
    averageDailyLabel: "Average per day",
    averageDailyNote: "Based on the six core travel days",
    perPersonCostLabel: "Rough per person",
    perPersonCostNote: "Split evenly for two travellers",
    bookedLabel: "Already locked",
    bookedNote: "Parts that already have numbers or payments",
    flexibleLabel: "Still flexible",
    flexibleNote: "Meals, tickets, and some transport can still move",
    openLink: "Open",
    dateText: "Date",
    classText: "Flight",
    airportLabel: "Airport",
    fromLabel: "From",
    toLabel: "To",
    countryLabel: "Country",
    cityLabel: "City",
    terminalLabel: "Terminal",
    costCardLabel: "Cost",
    driveTimeLabel: "Movement",
    checklistProgress: "done",
    todayAtGlanceTitle: "Today at a Glance",
    routeFlowTitle: "Route Flow",
    timelineTitle: "Timeline",
    reminderTitle: "Special Reminder",
    glanceStart: "Start",
    glanceArea: "Area",
    glanceHighlights: "Highlights",
    glanceEnergy: "Energy",
    glanceWalk: "Walking",
    glanceWear: "Weather and wear",
    glanceFood: "Food and coffee",
    glanceTransport: "Transport",
    glanceBooking: "Booking note",
    previewOpen: "Open full day guide",
    previousDay: "Previous day",
    nextDay: "Next day",
  },
};

const data = {
  trip: {
    hero: {
      kicker: { "zh-Hant": "2026 Australia Travel Guide", en: "2026 Australia Travel Guide" },
      title: { "zh-Hant": "澳洲旅行手冊", en: "Australia Travel Guide" },
      subtitle: {
        "zh-Hant": "2026 年 5 月 23 日晚班出發，5 月 30 日清晨返抵台北",
        en: "Late-night departure on May 23, back in Taipei on the morning of May 30",
      },
      lead: {
        "zh-Hant":
          "先走墨爾本巷弄與河岸，再開往大洋路和 Phillip Island；後半程在雪梨港灣與城市街區收尾。",
        en: "Melbourne laneways and the Yarra, two coastal drives, then Sydney Harbour and the central city.",
      },
      destinations: {
        "zh-Hant": "Melbourne · Great Ocean Road · Phillip Island · Sydney Harbour · Darling Harbour · Sydney CBD",
        en: "Melbourne · Great Ocean Road · Phillip Island · Sydney Harbour · Darling Harbour · Sydney CBD",
      },
      chips: [
        { "zh-Hant": "航班 05.23 - 05.30", en: "Flights · May 23 - May 30" },
        { "zh-Hant": "主行程 6 天 5 夜", en: "Core trip · 6 days / 5 nights" },
        { "zh-Hant": "TPE → Melbourne · Sydney → TPE", en: "TPE → Melbourne · Sydney → TPE" },
      ],
    },
    heroSummary: [
      {
        label: { "zh-Hant": "主行程", en: "Core travel days" },
        value: { "zh-Hant": "5/24 - 5/29", en: "May 24 - May 29" },
        note: { "zh-Hant": "5/23 深夜出發｜5/30 清晨返抵台北", en: "Late flight out on May 23, back in Taipei early on May 30" },
      },
      {
        label: { "zh-Hant": "兩座落腳處", en: "Two hotel bases" },
        value: { "zh-Hant": "Melbourne CBD / Darling Harbour", en: "Melbourne CBD / Darling Harbour" },
        note: { "zh-Hant": "墨爾本市中心 3 晚｜達令港 2 晚", en: "A central city base first, then a harbour base for the Sydney half" },
      },
      {
        label: { "zh-Hant": "需留時間的日子", en: "Long-move days" },
        value: { "zh-Hant": "Day 2 / Day 3 / Day 4", en: "Day 2 / Day 3 / Day 4" },
        note: { "zh-Hant": "大洋路早出｜Phillip Island 晚歸｜Day 4 飛雪梨", en: "The coast day starts early, Phillip Island ends late, and Day 4 moves cities" },
      },
      {
        label: { "zh-Hant": "隨身裝備", en: "Keep in the bag" },
        value: { "zh-Hant": "好走鞋 / 薄外套 / 防曬", en: "Walking shoes / light layer / sunscreen" },
        note: { "zh-Hant": "海邊與夜晚偏冷；白天戶外注意日曬", en: "Coast and evenings cool down faster, but daylight still calls for sun protection" },
      },
    ],
    heroRhythm: [
      { label: { "zh-Hant": "5/25 早起走大洋路", en: "Day 2 early coast day" }, tone: "coast" },
      { label: { "zh-Hant": "5/26 傍晚看企鵝", en: "Day 3 sea wind and penguins" }, tone: "outdoor" },
      { label: { "zh-Hant": "5/27 飛往雪梨", en: "Day 4 fly to Sydney" }, tone: "transfer" },
      { label: { "zh-Hant": "5/29 晚班機返台", en: "Day 6 late return flight" }, tone: "night" },
    ],
    snapshot: [
      {
        label: { "zh-Hant": "天數", en: "Length" },
        value: { "zh-Hant": "6 天 5 夜主行程", en: "6 days / 5 nights" },
        note: { "zh-Hant": "飛行跨 2 晚｜陸上行程 5/24 - 5/29", en: "The flights span two nights, while the core land itinerary sits between May 24 and May 29" },
      },
      {
        label: { "zh-Hant": "主要城市 / 區域", en: "Main areas" },
        value: { "zh-Hant": "墨爾本 / 大洋路 / Phillip Island / 雪梨", en: "Melbourne / Great Ocean Road / Phillip Island / Sydney" },
        note: { "zh-Hant": "城市 → 海岸 → 港灣", en: "City and coast first, then harbour light and central Sydney" },
      },
      {
        label: { "zh-Hant": "旅行主題", en: "Trip themes" },
        value: { "zh-Hant": "城市散步、海岸線、公路風景、咖啡、野生動物", en: "City walking, coastline, road views, coffee, and wildlife" },
        note: { "zh-Hant": "2 天長線戶外｜其餘依街區步行", en: "Two long outdoor days, with the rest grouped by neighbourhood" },
      },
      {
        label: { "zh-Hant": "移動方式", en: "Transport" },
        value: { "zh-Hant": "飛機 / 租車 / 步行 / 市區交通", en: "Flights / rental car / walking / city transit" },
        note: { "zh-Hant": "墨爾本長線自駕｜雪梨步行與大眾運輸", en: "Melbourne uses the car for the longer drives, while Sydney shifts back to walking and transit" },
      },
      {
        label: { "zh-Hant": "住宿區域", en: "Stay areas" },
        value: { "zh-Hant": "Dorsett Melbourne + Sofitel Darling Harbour", en: "Dorsett Melbourne + Sofitel Darling Harbour" },
        note: { "zh-Hant": "市中心與港邊各一段", en: "A city-centre base followed by a harbour stay" },
      },
      {
        label: { "zh-Hant": "體力節奏", en: "Energy rhythm" },
        value: { "zh-Hant": "2 天戶外長線 + 2 天城市散步 + 1 天轉場 + 1 天收尾", en: "2 outdoor long-line days + 2 city walk days + 1 transfer day + 1 landing day" },
        note: { "zh-Hant": "Day 2、3 長途自駕｜Day 4 跨城轉場", en: "Day 2 and Day 3 are long drives; Day 4 changes cities" },
      },
      {
        label: { "zh-Hant": "天氣與穿搭", en: "Weather and wear" },
        value: { "zh-Hant": "5 月入秋，市區溫和，海邊與夜晚偏涼", en: "Autumn in May, comfortable by day and cooler on the coast or at night" },
        note: { "zh-Hant": "好走鞋、可收納外套、防曬、墨鏡", en: "Walking shoes, a packable layer, sunscreen, and sunglasses" },
      },
      {
        label: { "zh-Hant": "行前先記", en: "Watch first" },
        value: { "zh-Hant": "Day 2 早起、Day 3 晚歸、Day 4 飛機、Day 6 晚班機", en: "Day 2 early start, Day 3 late return, Day 4 flight, Day 6 late departure" },
        note: { "zh-Hant": "交通固定後，再排用餐與散步", en: "Lock transport first, then meals and walks" },
      },
    ],
    themes: [
      { "zh-Hant": "城市散步", en: "City walking" },
      { "zh-Hant": "海岸線", en: "Coastline" },
      { "zh-Hant": "公路日", en: "Road day" },
      { "zh-Hant": "咖啡與早午餐", en: "Coffee and brunch" },
      { "zh-Hant": "野生動物", en: "Wildlife" },
      { "zh-Hant": "港灣晨光", en: "Harbour mornings" },
      { "zh-Hant": "最後補買", en: "Last shopping" },
      { "zh-Hant": "戶外與海風", en: "Outdoor wind" },
    ],
    pace: [
      {
        title: { "zh-Hant": "最早出門｜Day 2", en: "The earliest day" },
        desc: { "zh-Hant": "07:00 前離開墨爾本；小鎮午餐，午後走十二門徒岩與 Loch Ard Gorge。", en: "Leave Melbourne before 07:00; lunch in a coastal town, then Twelve Apostles and Loch Ard Gorge." },
      },
      {
        title: { "zh-Hant": "最晚回飯店｜Day 3", en: "The latest finish" },
        desc: { "zh-Hant": "上午早午餐與近距離散步；企鵝歸巢後夜間返回墨爾本。", en: "Brunch and a nearby walk in the morning; return to Melbourne after Penguin Parade." },
      },
      {
        title: { "zh-Hant": "轉場日｜Day 4", en: "The day that needs space" },
        desc: { "zh-Hant": "上午回飯店取行李、還車後前往機場；13:00 搭 JQ514 飛往雪梨。", en: "Day 4 is the car return, airport, domestic flight, and check-in day, so the morning should stay nearby and flexible." },
      },
      {
        title: { "zh-Hant": "城市散步｜Day 5–6", en: "The slowest stroll" },
        desc: { "zh-Hant": "Day 5 走歌劇院、Circular Quay 與達令港；Day 6 留給 QVB、Hyde Park 與回程。", en: "Day 5 covers the Opera House, Circular Quay, and Darling Harbour; Day 6 stays with QVB, Hyde Park, and departure." },
      },
    ],
    routeFlow: [
      {
        title: { "zh-Hant": "墨爾本市中心與 Southbank", en: "Melbourne CBD and Southbank" },
        days: { "zh-Hant": "Day 1 + Day 4 上午", en: "Day 1 + Day 4 morning" },
        desc: {
          "zh-Hant": "Degraves Street → Flinders Street Station → State Library → Yarra River；抵達日走主線，離城前補周邊。",
          en: "Walk Degraves Street, Flinders Street Station, the State Library, and the Yarra in one central route.",
        },
        meta: { "zh-Hant": "步行 / 市區短移動", en: "Walking / short city transfers" },
      },
      {
        title: { "zh-Hant": "Great Ocean Road 西段", en: "The western Great Ocean Road stretch" },
        days: { "zh-Hant": "Day 2", en: "Day 2" },
        desc: {
          "zh-Hant": "Lorne、Apollo Bay 午間補給；十二門徒岩、Loch Ard Gorge、London Arch 集中在午後。",
          en: "The point of this day is not to collect the most stops, but to keep the long drive, the food breaks, and the major afternoon viewpoints in one smooth coastal run.",
        },
        meta: { "zh-Hant": "租車 / 一日遊", en: "Rental car / day tour" },
      },
      {
        title: { "zh-Hant": "Phillip Island 海岸與企鵝", en: "Phillip Island coast and penguins" },
        days: { "zh-Hant": "Day 3 下午到深夜", en: "Day 3 afternoon into late night" },
        desc: {
          "zh-Hant": "上午墨爾本，午後自駕往海岸；The Cerberus Beach House → Nobbies Centre → Penguin Parade。",
          en: "Melbourne in the morning, then The Cerberus Beach House, Nobbies Centre, and Penguin Parade.",
        },
        meta: { "zh-Hant": "租車自駕", en: "Self-drive" },
      },
      {
        title: { "zh-Hant": "達令港到 Circular Quay", en: "Darling Harbour to Circular Quay" },
        days: { "zh-Hant": "Day 4 晚上 + Day 5", en: "Day 4 evening + Day 5" },
        desc: {
          "zh-Hant": "抵達當晚入住達令港；隔天從歌劇院、Circular Quay 走回海生館，夜晚回到飯店周邊。",
          en: "Check in at Darling Harbour, then cover the Opera House, Circular Quay, and aquarium on Day 5.",
        },
        meta: { "zh-Hant": "步行 / 火車 / 輕軌 / Uber", en: "Walking / train / light rail / Uber" },
      },
      {
        title: { "zh-Hant": "雪梨 CBD 與回程夜晚", en: "Sydney CBD and the departure night" },
        days: { "zh-Hant": "Day 6", en: "Day 6" },
        desc: {
          "zh-Hant": "QVB、Hyde Park 與午餐留在市中心；17:30 取行李，19:00 前往 Sydney Airport。",
          en: "Keep QVB, Hyde Park, lunch, and final shopping within central Sydney before the airport transfer.",
        },
        meta: { "zh-Hant": "步行 + Airport Line / Uber", en: "Walking + airport line / Uber" },
      },
    ],
    highlights: [
      {
        title: { "zh-Hant": "墨爾本的晨間街區", en: "A morning in Melbourne's laneways" },
        meta: { "zh-Hant": "Day 1｜Melbourne CBD", en: "Day 1 | Melbourne CBD" },
        desc: {
          "zh-Hant": "Degraves Street 早午餐，接著走老車站與州立圖書館；傍晚沿 Yarra River 收尾。",
          en: "Brunch on Degraves Street, followed by the old station, State Library, and the Yarra at dusk.",
        },
        image: "./assets/melbourne-degraves.jpg",
        alt: { "zh-Hant": "墨爾本巷弄與咖啡街氣氛", en: "Melbourne laneway and coffee mood" },
      },
      {
        title: { "zh-Hant": "大洋路的海平線與斷崖", en: "The horizon and cliffs of the Great Ocean Road" },
        meta: { "zh-Hant": "Day 2｜Great Ocean Road", en: "Day 2 | Great Ocean Road" },
        desc: {
          "zh-Hant": "海景公路、小鎮停靠與斷崖觀景台串成一日；十二門徒岩是午後主景。",
          en: "Coastal road, town stops, and cliff lookouts, with the Twelve Apostles as the afternoon centrepiece.",
        },
        image: "./assets/twelve-apostles.jpg",
        alt: { "zh-Hant": "大洋路與十二門徒岩", en: "Great Ocean Road and the Twelve Apostles" },
      },
      {
        title: { "zh-Hant": "Phillip Island 的海風與企鵝歸巢", en: "Phillip Island wind and the penguins returning ashore" },
        meta: { "zh-Hant": "Day 3｜Phillip Island", en: "Day 3 | Phillip Island" },
        desc: {
          "zh-Hant": "下午抵達 Phillip Island，先走海岸步道、吃晚餐，日落後再進場等候企鵝歸巢。",
          en: "An afternoon coast drive, dinner by the water, and penguins coming ashore after sunset.",
        },
        image: "./assets/day3-phillip-island-sunset.jpg",
        alt: { "zh-Hant": "Phillip Island 海岸夕陽", en: "Phillip Island sunset coast" },
      },
      {
        title: { "zh-Hant": "雪梨港灣的早餐時光", en: "A Sydney harbour breakfast" },
        meta: { "zh-Hant": "Day 5｜Circular Quay", en: "Day 5 | Circular Quay" },
        desc: {
          "zh-Hant": "Opera Quays 或 MCA Cafe 早餐；沿歌劇院、Circular Quay 開始港灣散步。",
          en: "Breakfast at Opera Quays or MCA Cafe, followed by the Opera House and Circular Quay.",
        },
        image: "./assets/opera-house-harbour.jpg",
        alt: { "zh-Hant": "雪梨歌劇院與港灣景色", en: "Sydney Opera House and harbour view" },
      },
      {
        title: { "zh-Hant": "達令港夜色與最後的市區半日", en: "Darling Harbour nights and the final city half-day" },
        meta: { "zh-Hant": "Day 4 - Day 6｜Sydney", en: "Day 4 - Day 6 | Sydney" },
        desc: {
          "zh-Hant": "Day 5 港灣與海生館；Day 6 QVB、Hyde Park，傍晚回飯店取行李。",
          en: "Day 5 covers the harbour and aquarium; Day 6 stays with QVB, Hyde Park, and the return flight.",
        },
        image: "./assets/day6-qvb-sydney.jpg",
        alt: { "zh-Hant": "雪梨 QVB 與市中心街景", en: "Sydney QVB and central city streets" },
      },
    ],
    practicalInfo: [
      {
        title: { "zh-Hant": "航班與機場交通", en: "Flights and airport movement" },
        note: { "zh-Hant": "抵達、國內線、晚班回程", en: "Arrival, domestic transfer, and late return" },
        open: true,
        bullets: [
          {
            "zh-Hant": "5/24 10:40 抵達墨爾本；通關、取車後進市區，午後走 CBD。",
            en: "Arrive in Melbourne at 10:40, clear immigration, collect the car, and spend the afternoon in the CBD.",
          },
          {
            "zh-Hant": "5/27 JQ514 13:00 起飛；上午留在飯店周邊，11:30 前取行李、還車。",
            en: "JQ514 departs at 13:00 on May 27, so the morning should stay near the city centre and the hotel luggage pickup.",
          },
          {
            "zh-Hant": "5/29 晚班回程；17:30 取行李，19:00 前往 Sydney Airport T1。",
            en: "For the late Sydney return, collect bags at 17:30 and leave for Terminal 1 at 19:00.",
          },
        ],
        links: [
          { label: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" }, href: "https://www.melbourneairport.com.au/" },
          { label: { "zh-Hant": "雪梨機場", en: "Sydney Airport" }, href: "https://www.sydneyairport.com.au/" },
        ],
      },
      {
        title: { "zh-Hant": "城市間移動", en: "Moving between places" },
        note: { "zh-Hant": "墨爾本自駕｜雪梨步行與大眾運輸", en: "Drive in Melbourne; walk and take transit in Sydney" },
        bullets: [
          {
            "zh-Hant": "大洋路與 Phillip Island 為長線自駕；沿途停靠依日照、路況調整。",
            en: "The Great Ocean Road and Phillip Island days both cover a lot of ground, and the rental car gives those stops more freedom.",
          },
          {
            "zh-Hant": "雪梨使用步行、火車、輕軌與 Uber；港灣區不留租車。",
            en: "Use walking, trains, light rail, and Uber in Sydney; return the car before the flight.",
          },
          {
            "zh-Hant": "Day 4｜取行李、還車、國內線、入住；不排遠程停靠。",
            en: "Day 4 covers bags, car return, the domestic flight, and hotel check-in; no distant stops.",
          },
        ],
      },
      {
        title: { "zh-Hant": "住宿區域", en: "Hotel bases" },
        note: { "zh-Hant": "市中心三晚，達令港兩晚", en: "Both bases are practical" },
        bullets: [
          {
            "zh-Hant": "Dorsett Melbourne｜Day 1 巷弄散步、Day 2 早出、Day 4 市區半日。",
            en: "Dorsett Melbourne makes the laneway day, the early coast departure, and the final Melbourne half-day all easy to handle.",
          },
          {
            "zh-Hant": "Sofitel Darling Harbour｜Day 5 港灣、Day 6 補買；步行搭配短程交通。",
            en: "Sofitel Darling Harbour keeps the harbour day and the final Sydney shopping day manageable with walking plus short transit hops.",
          },
          {
            "zh-Hant": "最後兩晚皆住雪梨；回程日不更換住宿。",
            en: "Being in Sydney already on the final night removes an extra luggage move before the return flight.",
          },
        ],
      },
      {
        title: { "zh-Hant": "餐桌與咖啡", en: "Meals and coffee" },
        note: { "zh-Hant": "巷弄咖啡、海邊晚餐、港灣早餐", en: "Laneway coffee, seaside dinner, harbour breakfast" },
        bullets: [
          {
            "zh-Hant": "Day 1｜Degraves Street 早午餐，接 CBD 步行路線。",
            en: "Day 1: brunch on Degraves Street, followed by the central walking route.",
          },
          {
            "zh-Hant": "Day 3｜The Cerberus Beach House 晚餐，接 Nobbies Centre 與 Penguin Parade。",
            en: "Day 3: dinner at The Cerberus Beach House before Nobbies Centre and Penguin Parade.",
          },
          {
            "zh-Hant": "Day 5｜歌劇院附近早餐，接 Circular Quay 港灣步行。",
            en: "Day 5: breakfast near the Opera House, followed by Circular Quay on foot.",
          },
        ],
      },
      {
        title: { "zh-Hant": "天氣與穿搭", en: "Weather and what to wear" },
        note: { "zh-Hant": "5 月入秋｜市區溫和，海岸與夜晚偏冷", en: "Autumn in May; mild cities, cooler coast and evenings" },
        bullets: [
          {
            "zh-Hant": "市區白天溫和；海邊、日落後與企鵝歸巢時段明顯轉冷。",
            en: "City days are mild; the coast, sunset, and Penguin Parade turn noticeably cooler.",
          },
          {
            "zh-Hant": "短袖或薄長袖打底，包內再放一件可收納的防風外套。",
            en: "The most reliable setup is a tee or light long sleeve with a packable layer on top.",
          },
          {
            "zh-Hant": "Day 1、5、6 步行較多；穿長時間走路不磨腳的鞋。",
            en: "Comfortable walking shoes matter more than anything else, especially on Day 1, Day 5, and Day 6.",
          },
        ],
      },
      {
        title: { "zh-Hant": "防曬與戶外裝備", en: "Sun and outdoor gear" },
        note: { "zh-Hant": "海邊風強｜日照仍明顯", en: "Windy coast, still strong daylight" },
        bullets: [
          {
            "zh-Hant": "Day 2、3、5｜防曬、墨鏡、飲水。",
            en: "Days 2, 3, and 5: sunscreen, sunglasses, and water.",
          },
          {
            "zh-Hant": "海岸帽款選可固定、防風的款式。",
            en: "Use a secure, wind-resistant hat on the coast.",
          },
          {
            "zh-Hant": "長途日隨身：行動電源、面紙、小包裝零食。",
            en: "A power bank, tissues, and a small snack become surprisingly useful on the longer movement days.",
          },
        ],
      },
      {
        title: { "zh-Hant": "購物與退稅", en: "Shopping and tax refund prep" },
        note: { "zh-Hant": "Day 6 集中補買", en: "Final shopping on Day 6" },
        bullets: [
          {
            "zh-Hant": "QVB、Hyde Park 一帶留給最後補買；Day 4 轉場日不排購物。",
            en: "QVB and the streets nearby are a good place to keep the final shopping, without forcing it into the transfer day.",
          },
          {
            "zh-Hant": "機場退稅：發票、護照資料與商品集中收納；回程提早到場。",
            en: "If you plan to handle tax refund steps at the airport, keep receipts, passport details, and relevant items together and leave extra time before the flight.",
          },
          {
            "zh-Hant": "零食與超市伴手禮分批採買，最後一晚只補缺口。",
            en: "Buy supermarket gifts in small rounds; use Day 6 only to fill gaps.",
          },
        ],
      },
      {
        title: { "zh-Hant": "網路、付款與插座", en: "Connectivity, payment, and plugs" },
        note: { "zh-Hant": "澳規插座、行動網路、付款備援", en: "AU plug, mobile data, and payment backup" },
        bullets: [
          {
            "zh-Hant": "澳洲使用 Type I 插座；攜帶澳規轉接頭。",
            en: "Australia uses a different plug type from Taiwan, so the AU adapter needs to be packed before anything else.",
          },
          {
            "zh-Hant": "主要使用信用卡與手機支付；另備少量現金。",
            en: "Cards and mobile payments should cover most of the trip, though a small cash buffer is still reassuring.",
          },
          {
            "zh-Hant": "出發前啟用 eSIM 或漫遊；抵達、長途自駕與回程皆需網路。",
            en: "Activate eSIM or roaming before departure; arrival, road trips, and the return night need data.",
          },
        ],
      },
      {
        title: { "zh-Hant": "貼心提醒", en: "Gentle reminders" },
        note: { "zh-Hant": "四個固定節點", en: "Four fixed timing points" },
        bullets: [
          {
            "zh-Hant": "Day 2 早出｜Day 3 晚歸｜Day 4 國內線｜Day 6 晚班機。",
            en: "Day 2 early start, Day 3 late return, Day 4 flight, and Day 6 late departure are the four windows that need the most breathing room.",
          },
          {
            "zh-Hant": "大洋路與 Phillip Island 回程後直接休息，不續排夜間行程。",
            en: "Return directly to the hotel after Great Ocean Road and Phillip Island.",
          },
          {
            "zh-Hant": "拍照時段：雪梨港灣早晨、Yarra River 傍晚。",
            en: "Photo windows: Sydney Harbour in the morning and the Yarra at dusk.",
          },
        ],
      },
    ],
  },
  flights: [
    {
      label: { "zh-Hant": "去程", en: "Outbound" },
      route: "TPE → MEL",
      date: "2026-05-23 / 2026-05-24",
      time: "23:30 → 10:40",
      cabin: { "zh-Hant": "中華航空 CI0057", en: "China Airlines CI0057" },
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
      label: { "zh-Hant": "轉場", en: "Domestic" },
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
      cabin: { "zh-Hant": "中華航空 CI0052", en: "China Airlines CI0052" },
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
    {
      title: { "zh-Hant": "去程是跨夜抵達", en: "The outbound is an overnight arrival" },
      desc: {
        "zh-Hant": "5/24 10:40 抵達；通關、取車後進市區。第一天僅走 Melbourne CBD 與 Southbank。",
        en: "Arrive in Melbourne at 10:40; clear immigration, collect the car, and spend the afternoon in the CBD and Southbank.",
      },
    },
    {
      title: { "zh-Hant": "JQ514 是整趟最關鍵的轉場", en: "JQ514 is the key transfer of the trip" },
      desc: {
        "zh-Hant": "5/27 13:00 墨爾本飛雪梨；上午留在 CBD，11:30 前取行李並前往機場。",
        en: "The May 27 flight from Melbourne to Sydney is the main pivot of the trip, which is why the morning should stay close and luggage-friendly.",
      },
    },
    {
      title: { "zh-Hant": "回程是晚班國際線", en: "The return is a late-night international flight" },
      desc: {
        "zh-Hant": "Day 6 白天留在 Sydney CBD；17:30 取行李，國際線預留至少 3 小時。",
        en: "Day 6 still leaves a useful half-day in central Sydney, but the evening should first return for the luggage and then leave a generous airport buffer.",
      },
    },
  ],
  airportGuides: [
    {
      title: { "zh-Hant": "抵達墨爾本", en: "Landing in Melbourne" },
      desc: {
        "zh-Hant": "通關、取車、進市區約半天；早午餐後走車站、圖書館與河岸。",
        en: "Immigration, car pickup, and the city transfer take roughly half a day; begin with brunch, then walk the station, library, and river.",
      },
    },
    {
      title: { "zh-Hant": "墨爾本飛雪梨", en: "Flying Melbourne to Sydney" },
      desc: {
        "zh-Hant": "上午範圍：Melbourne Central、Emporium、Bourke Street；11:30 前回飯店取行李。",
        en: "Keep the morning around Melbourne Central, Emporium, and Bourke Street, so turning back for luggage stays easy.",
      },
    },
    {
      title: { "zh-Hant": "雪梨回程夜晚", en: "The Sydney departure night" },
      desc: {
        "zh-Hant": "最後半日：QVB、Hyde Park、Darling Harbour；17:30 回飯店取行李。",
        en: "If the final day includes shopping or a walk, keeping it around QVB, Hyde Park, and Darling Harbour makes the hotel return much cleaner.",
      },
    },
  ],
  stays: {
    hotels: [
      {
        name: { "zh-Hant": "墨爾本帝盛酒店", en: "Dorsett Melbourne" },
        subname: { "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" },
        area: { "zh-Hant": "Melbourne CBD", en: "Melbourne CBD" },
        dates: { "zh-Hant": "5/24 - 5/27", en: "May 24 - May 27" },
        priceAud: 789.3,
        image: "./assets/day1-melbourne-skyline.jpg",
        imageAlt: { "zh-Hant": "墨爾本天際線與市中心氛圍", en: "Melbourne skyline and city mood" },
        tags: [
          { label: { "zh-Hant": "市中心住宿", en: "Central base" }, tone: "city" },
          { label: { "zh-Hant": "大洋路前半段", en: "Melbourne half" }, tone: "coast" },
        ],
        feature: { "zh-Hant": "Melbourne CBD 步行圈｜大洋路與 Phillip Island 自駕起點。", en: "Melbourne CBD walking base and departure point for both road trips." },
        note: { "zh-Hant": "連住 3 晚；Day 1 市區、Day 2 大洋路、Day 3 Phillip Island。", en: "Three nights covering the city, Great Ocean Road, and Phillip Island." },
        href: "https://www.dorsetthotels.com/dorsett-melbourne/",
      },
      {
        name: { "zh-Hant": "雪梨達令港索菲特酒店", en: "Sofitel Sydney Darling Harbour" },
        subname: { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" },
        area: { "zh-Hant": "Darling Harbour", en: "Darling Harbour" },
        dates: { "zh-Hant": "5/27 - 5/29", en: "May 27 - May 29" },
        priceAud: 899.6,
        image: "./assets/day4-darling-harbour.jpg",
        imageAlt: { "zh-Hant": "雪梨達令港與水岸景色", en: "Darling Harbour waterside view" },
        tags: [
          { label: { "zh-Hant": "港邊夜景", en: "Harbour nights" }, tone: "night" },
          { label: { "zh-Hant": "回程前住宿", en: "Final base" }, tone: "transfer" },
        ],
        feature: { "zh-Hant": "Darling Harbour 水岸｜步行至海生館，短程前往 Circular Quay 與 QVB。", en: "Darling Harbour waterfront, walkable to the aquarium and a short ride to Circular Quay or QVB." },
        note: { "zh-Hant": "連住 2 晚；Day 5 港灣、Day 6 市中心與回程。", en: "Two nights covering the harbour, central city, and departure day." },
        href: "https://all.accor.com/hotel/9729/index.en.shtml",
      },
    ],
    advantages: [
      {
        title: { "zh-Hant": "墨爾本市中心步行範圍", en: "Central Melbourne walking area" },
        desc: {
          "zh-Hant": "Degraves Street、Flinders Street Station、State Library、Southbank 皆在 CBD 步行動線。",
          en: "Degraves Street, Flinders Street Station, the State Library, and Southbank share one CBD walking route.",
        },
      },
      {
        title: { "zh-Hant": "達令港串連港灣行程", en: "Darling Harbour as the Sydney base" },
        desc: {
          "zh-Hant": "Day 5：港灣早餐、歌劇院、Circular Quay、海生館，夜晚回到達令港。",
          en: "The harbour breakfast, Opera House, and aquarium day all close naturally back into Darling Harbour.",
        },
      },
      {
        title: { "zh-Hant": "最後兩晚固定住雪梨", en: "No extra luggage move before the return" },
        desc: {
          "zh-Hant": "最後兩晚不換住宿；Day 6 退房後寄放行李，傍晚取回。",
          en: "Being in Sydney already on the final night means Day 6 can focus on the city instead of another hotel transfer.",
        },
      },
    ],
    moveDayTimeline: [
      {
        time: "09:00",
        title: { "zh-Hant": "墨爾本市區最後半日", en: "One last easy Melbourne window" },
        desc: { "zh-Hant": "早午餐、近距離購物或 city walk；範圍留在 Melbourne CBD。", en: "Brunch, nearby shopping, or a city walk within Melbourne CBD." },
      },
      {
        time: "11:30 - 12:00",
        title: { "zh-Hant": "回飯店拿行李，往機場走", en: "Pick up the bags and head for the airport" },
        desc: { "zh-Hant": "11:30 前取行李；還車與國內線報到納入移動時間。", en: "Collect bags by 11:30, allowing time for the car return and domestic check-in." },
      },
      {
        time: "13:00",
        title: { "zh-Hant": "搭乘 JQ514 飛往雪梨", en: "Take JQ514 into Sydney" },
        desc: { "zh-Hant": "Melbourne 13:00 起飛，14:25 抵達 Sydney。", en: "Departs Melbourne at 13:00 and lands in Sydney at 14:25." },
      },
      {
        time: "16:30 後",
        title: { "zh-Hant": "入住達令港，晚餐留在附近", en: "Check in and dine near Darling Harbour" },
        desc: { "zh-Hant": "入住後走達令港與晚餐；歌劇院、Circular Quay 排在 Day 5。", en: "Check in, walk Darling Harbour, and have dinner; Opera House and Circular Quay follow on Day 5." },
      },
    ],
    moveOptions: [
      {
        title: { "zh-Hant": "Jetstar JQ514", en: "Jetstar JQ514" },
        duration: { "zh-Hant": "1 小時 25 分", en: "1 hr 25 min" },
        start: { "zh-Hant": "MEL 第 4 航廈", en: "MEL Terminal 4" },
        destination: { "zh-Hant": "SYD 國內線 T2", en: "SYD Domestic T2" },
        cost: { "zh-Hant": "票價未補，但班機已確認", en: "Fare not added yet, flight confirmed" },
        desc: { "zh-Hant": "Day 4 固定航班；上午只排 CBD 近距離行程。", en: "Fixed Day 4 flight; keep the morning within central Melbourne." },
      },
      {
        title: { "zh-Hant": "Sixt 租車", en: "Sixt rental car" },
        duration: { "zh-Hant": "5/24 11:00 取車", en: "Pickup on May 24 at 11:00" },
        start: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" },
        destination: { "zh-Hant": "Toyota Corolla 或同級", en: "Toyota Corolla or similar" },
        costAud: 264.2,
        costSuffix: { "zh-Hant": "｜已付款", en: " | paid" },
        desc: { "zh-Hant": "Day 2 大洋路、Day 3 Phillip Island；長線行程依天候與路況調整停靠。", en: "For Great Ocean Road on Day 2 and Phillip Island on Day 3; stops adjust to weather and traffic." },
        image: "./assets/corolla-rental-card.svg",
        imageAlt: { "zh-Hant": "Toyota Corolla 租車卡片", en: "Toyota Corolla rental card" },
        specs: [
          { label: { "zh-Hant": "座位", en: "Seats" }, value: { "zh-Hant": "5 人", en: "5 seats" } },
          { label: { "zh-Hant": "行李", en: "Luggage" }, value: { "zh-Hant": "3 件", en: "3 bags" } },
          { label: { "zh-Hant": "變速", en: "Transmission" }, value: { "zh-Hant": "自排", en: "Automatic" } },
          { label: { "zh-Hant": "動力", en: "Fuel" }, value: { "zh-Hant": "油電混合", en: "Hybrid" } },
        ],
      },
      {
        title: { "zh-Hant": "Sydney Airport Line / Uber", en: "Sydney Airport Line / Uber" },
        duration: { "zh-Hant": "Day 6 晚間", en: "Final evening" },
        start: { "zh-Hant": "Darling Harbour / Sydney CBD", en: "Darling Harbour / Sydney CBD" },
        destination: { "zh-Hant": "Sydney Airport T1", en: "Sydney Airport T1" },
        cost: { "zh-Hant": "依行李量與即時車資選擇", en: "Choose based on luggage and live fare" },
        desc: { "zh-Hant": "行李多時搭 Uber；Airport Line 班次較固定。", en: "Use Uber with more luggage; Airport Line offers fixed schedules." },
      },
    ],
  },
  days: [
    {
      id: "day1",
      day: { "zh-Hant": "Day 1", en: "Day 1" },
      date: "2026-05-24",
      status: { label: { "zh-Hant": "保留彈性", en: "Flexible" }, tone: "flexible" },
      city: { "zh-Hant": "Melbourne CBD / Southbank", en: "Melbourne CBD / Southbank" },
      theme: { "zh-Hant": "咖啡街區與河岸散步", en: "Laneways, coffee, and a riverside first day" },
      preview: {
        "zh-Hant": "10:40 抵達墨爾本。取車進市區後，從 Degraves Street、老車站一路走到 Yarra 河岸。",
        en: "Arrive in Melbourne at 10:40, collect the car, then walk from Degraves Street and the old station to the Yarra.",
      },
      intro: {
        "zh-Hant": "抵達日留在市中心。Degraves Street 早午餐，午後走車站與圖書館，傍晚沿 Yarra River 用餐；好走鞋，薄外套隨身。",
        en: "Arrival day stays central: Degraves Street brunch, the station and library, then dinner by the Yarra. Pack walking shoes and a light layer.",
      },
      image: "./assets/day1-melbourne-skyline.jpg",
      imageAlt: { "zh-Hant": "墨爾本 Southbank 天際線", en: "Melbourne Southbank skyline" },
      highlights: [
        { "zh-Hant": "Degraves Street", en: "Degraves Street" },
        { "zh-Hant": "Flinders Street Station", en: "Flinders Street Station" },
        { "zh-Hant": "State Library Victoria", en: "State Library Victoria" },
        { "zh-Hant": "Yarra River 晚餐", en: "Yarra River dinner" },
      ],
      tags: [
        { label: { "zh-Hant": "城市散步日", en: "City walk day" }, tone: "city" },
        { label: { "zh-Hant": "步行中等", en: "Moderate walking" }, tone: "walk" },
        { label: { "zh-Hant": "薄外套", en: "Light layer" }, tone: "layer" },
      ],
      glance: {
        start: {
          value: { "zh-Hant": "10:40 抵達後進市區", en: "Into the city after the 10:40 arrival" },
          note: { "zh-Hant": "通關、取車後約中午抵達市區", en: "Reach the city around noon after immigration and car pickup" },
        },
        area: {
          value: { "zh-Hant": "Degraves Street / Flinders Street / State Library / Yarra River", en: "Degraves Street / Flinders Street / State Library / Yarra River" },
          note: { "zh-Hant": "全日集中在 CBD 與 Southbank", en: "Everything stays in one central city zone today" },
        },
        highlights: {
          value: { "zh-Hant": "晨間咖啡、老車站、圖書館圓頂、河岸夜色", en: "Coffee, the old station, the library dome, and river light" },
          note: { "zh-Hant": "巷弄、老建築、室內圓頂與河岸", en: "Laneways, old architecture, a domed interior, and the river" },
        },
        energy: {
          value: { "zh-Hant": "普通", en: "Steady" },
          note: { "zh-Hant": "抵達日；市中心步行為主", en: "Arrival day with central-city walking" },
        },
        walk: {
          value: { "zh-Hant": "中等", en: "Moderate" },
          note: { "zh-Hant": "主要是城市步行，偶爾短程移動", en: "Mostly city walking with only short transfers" },
        },
        wear: {
          value: { "zh-Hant": "好走鞋 + 薄外套", en: "Walking shoes and a light layer" },
          note: { "zh-Hant": "傍晚河岸降溫", en: "The river cools down by evening" },
        },
        food: {
          value: { "zh-Hant": "Degraves Street 早午餐 / 河邊晚餐", en: "Brunch on Degraves Street / dinner by the river" },
          note: { "zh-Hant": "早午餐與晚餐皆在步行路線上", en: "Brunch and dinner sit on the walking route" },
        },
        transport: {
          value: { "zh-Hant": "機場取車後進市區，市區以步行為主", en: "Pick up the car at the airport, then mostly walk in the city" },
          note: { "zh-Hant": "不離開市中心步行圈", en: "Stay within the central walking zone" },
        },
        booking: {
          value: { "zh-Hant": "無硬性預約", en: "No hard booking pressure" },
          note: { "zh-Hant": "State Library 圓頂閱覽室預留停留時間", en: "Allow time for the State Library's domed reading room" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜城市醒來", en: "Morning | The city wakes up" },
          title: { "zh-Hant": "Degraves Street 早午餐", en: "Brunch on Degraves Street" },
          desc: { "zh-Hant": "抵達市區後吃早午餐；確認停車與入住時間，再開始步行。", en: "Brunch after reaching the city; confirm parking and check-in timing before the walk." },
          tags: [{ label: { "zh-Hant": "晨間咖啡", en: "Coffee" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "中午｜車站與廣場", en: "Midday | Station and square" },
          title: { "zh-Hant": "Flinders Street Station + Federation Square", en: "Flinders Street Station + Federation Square" },
          desc: { "zh-Hant": "沿 Degraves Street 步行至老車站與 Federation Square；兩點隔街相望。", en: "Walk from Degraves Street to the old station and Federation Square across the road." },
          tags: [{ label: { "zh-Hant": "城市地標", en: "City icons" }, tone: "city" }],
        },
        {
          period: { "zh-Hant": "下午｜書頁與室內留白", en: "Afternoon | Pages and indoor pause" },
          title: { "zh-Hant": "State Library Victoria", en: "State Library Victoria" },
          desc: { "zh-Hant": "進入圓頂閱覽室，安排一段室內停留。", en: "Step into the domed reading room for an indoor pause." },
          tags: [{ label: { "zh-Hant": "室內留白", en: "Indoor pause" }, tone: "note" }],
        },
        {
          period: { "zh-Hant": "傍晚｜河岸收尾", en: "Evening | Finish by the river" },
          title: { "zh-Hant": "Yarra River 散步與晚餐", en: "Yarra River walk and dinner" },
          desc: { "zh-Hant": "沿 Yarra River 散步，在 Southbank 一帶用晚餐。", en: "Walk along the Yarra River and have dinner around Southbank." },
          tags: [{ label: { "zh-Hant": "河岸夜色", en: "Riverside evening" }, tone: "night" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "10:40", en: "10:40" },
          label: { "zh-Hant": "抵達", en: "Arrival" },
          title: { "zh-Hant": "抵達墨爾本，通關與取車", en: "Arrive in Melbourne, clear immigration, and collect the car" },
          note: { "zh-Hant": "通關、取車、進市區約需半天；抵達時間依現場調整。", en: "Immigration, car pickup, and the city transfer take roughly half a day." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "入境", en: "Immigration" }, tone: "transfer" }],
        },
        {
          time: { "zh-Hant": "12:00 左右", en: "Around 12:00" },
          label: { "zh-Hant": "咖啡", en: "Coffee" },
          title: { "zh-Hant": "Degraves Street 早午餐", en: "Brunch on Degraves Street" },
          note: { "zh-Hant": "用餐後沿 Degraves Street 往 Flinders Street Station 移動。", en: "Walk from Degraves Street to Flinders Street Station after brunch." },
          eventClass: "event-meal",
          flags: [{ label: { "zh-Hant": "慢步調", en: "Slow pace" }, tone: "food" }],
        },
        {
          time: { "zh-Hant": "下午", en: "Afternoon" },
          label: { "zh-Hant": "城市", en: "City" },
          title: { "zh-Hant": "Flinders Street Station、廣場與圖書館", en: "Station, square, and library" },
          note: { "zh-Hant": "Flinders Street → Federation Square → State Library，單向步行。", en: "Walk one way from Flinders Street to Federation Square and the State Library." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "步行", en: "Walking" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "傍晚", en: "Evening" },
          label: { "zh-Hant": "河岸", en: "River" },
          title: { "zh-Hant": "Yarra River 晚餐與收尾", en: "Dinner and a finish by the Yarra" },
          note: { "zh-Hant": "沿 Southbank 水岸散步並用晚餐。", en: "Walk the Southbank waterfront and stop for dinner." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "夜色", en: "Evening light" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "城市步行日｜穿已走習慣、不磨腳的鞋。",
          en: "City walking day: wear broken-in shoes.",
        },
        {
          "zh-Hant": "傍晚河岸偏涼｜薄外套放在隨身包。",
          en: "The river cools down at dusk; keep a light layer in the day bag.",
        },
        {
          "zh-Hant": "若入境延誤：保留早午餐、State Library、Yarra River；其餘略過。",
          en: "If arrival runs late, keep brunch, the State Library, and the Yarra; skip the rest.",
        },
      ],
    },
    {
      id: "day2",
      day: { "zh-Hant": "Day 2", en: "Day 2" },
      date: "2026-05-25",
      status: { label: { "zh-Hant": "早起長途", en: "Early long drive" }, tone: "drive" },
      city: { "zh-Hant": "Great Ocean Road", en: "Great Ocean Road" },
      theme: { "zh-Hant": "海岸線、公路與斷崖大景", en: "Coastline, road air, and cliff-edge views" },
      preview: {
        "zh-Hant": "07:00 前離開墨爾本，經 Lorne、Apollo Bay 前往十二門徒岩；全天車程長，晚上直接回飯店休息。",
        en: "Leave Melbourne before 07:00, pass Lorne and Apollo Bay, then continue to the Twelve Apostles; return to the hotel at night.",
      },
      intro: {
        "zh-Hant": "全程最長公路日。Lorne 或 Apollo Bay 午餐補給；午後走十二門徒岩、Loch Ard Gorge、London Arch。隨身帶水、防曬、墨鏡與防風外套。",
        en: "The longest road day: lunch and supplies in a coastal town, then Twelve Apostles, Loch Ard Gorge, and London Arch. Pack water, sunscreen, sunglasses, and a wind layer.",
      },
      image: "./assets/twelve-apostles.jpg",
      imageAlt: { "zh-Hant": "大洋路海岸線與十二門徒岩", en: "Great Ocean Road coastline and the Twelve Apostles" },
      highlights: [
        { "zh-Hant": "Lorne", en: "Lorne" },
        { "zh-Hant": "Apollo Bay", en: "Apollo Bay" },
        { "zh-Hant": "Twelve Apostles", en: "Twelve Apostles" },
        { "zh-Hant": "Loch Ard Gorge", en: "Loch Ard Gorge" },
      ],
      tags: [
        { label: { "zh-Hant": "偏累", en: "Higher energy" }, tone: "transfer" },
        { label: { "zh-Hant": "早起日", en: "Early start" }, tone: "warm" },
        { label: { "zh-Hant": "防曬", en: "Sun protection" }, tone: "coast" },
      ],
      glance: {
        start: {
          value: { "zh-Hant": "07:00 前離開墨爾本", en: "Leave Melbourne before 07:00" },
          note: { "zh-Hant": "06:30 - 07:00 離開市區", en: "Leave the city between 06:30 and 07:00" },
        },
        area: {
          value: { "zh-Hant": "Lorne / Apollo Bay / Twelve Apostles / Loch Ard Gorge / London Arch", en: "Lorne / Apollo Bay / Twelve Apostles / Loch Ard Gorge / London Arch" },
          note: { "zh-Hant": "停靠點依海岸公路由東往西排列", en: "The stops all unfold along the same coastal line" },
        },
        highlights: {
          value: { "zh-Hant": "海景公路、小鎮停靠、斷崖大景", en: "Sea-road views, town pauses, and cliff-edge scenery" },
          note: { "zh-Hant": "海景公路與沿途觀景停靠", en: "Coastal road views and lookout stops" },
        },
        energy: {
          value: { "zh-Hant": "偏累，長途移動日", en: "Tiring, long-move day" },
          note: { "zh-Hant": "預計 20:00 - 22:00 返回墨爾本", en: "Expected Melbourne return: 20:00-22:00" },
        },
        walk: {
          value: { "zh-Hant": "中等", en: "Moderate" },
          note: { "zh-Hant": "景點之間以車程為主，每個點是短步道和觀景停留", en: "The drive takes most of the day, with shorter walks at the actual viewpoints" },
        },
        wear: {
          value: { "zh-Hant": "好走鞋 + 防風薄外套 + 防曬", en: "Walking shoes, a wind layer, and sun protection" },
          note: { "zh-Hant": "海邊風強；帽款需可固定", en: "The coast gets windy; use a secure hat" },
        },
        food: {
          value: { "zh-Hant": "Lorne 或 Apollo Bay 午間補給", en: "Lunch and coffee around Lorne or Apollo Bay" },
          note: { "zh-Hant": "午餐、洗手間、補水與加油同站完成", en: "Combine lunch, toilets, water, and fuel in one stop" },
        },
        transport: {
          value: { "zh-Hant": "租車自駕或一日遊，全日以公路移動為主", en: "Self-drive or a tour, with the whole day centred on the road" },
          note: { "zh-Hant": "預留休息、加油與停車時間", en: "Allow time for rest, fuel, and parking" },
        },
        booking: {
          value: { "zh-Hant": "集合時間 / 停靠節奏", en: "Tour timing or stop rhythm" },
          note: { "zh-Hant": "跟團：準時集合｜自駕：依路況刪減停靠", en: "Tour: meet on time; self-drive: trim stops for road conditions" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜出發與沿途風景", en: "Morning | Depart and watch the coast open" },
          title: { "zh-Hant": "07:00 前離開墨爾本", en: "Leave Melbourne before 07:00" },
          desc: { "zh-Hant": "06:30 - 07:00 出發；避開市區尖峰，下午抵達主要觀景台。", en: "Leave between 06:30 and 07:00 to clear the city before peak traffic." },
          tags: [{ label: { "zh-Hant": "早起", en: "Early start" }, tone: "warm" }],
        },
        {
          period: { "zh-Hant": "中午｜小鎮補給", en: "Midday | Small-town fuel stop" },
          title: { "zh-Hant": "Lorne 或 Apollo Bay 午餐", en: "Lunch around Lorne or Apollo Bay" },
          desc: { "zh-Hant": "在沿路小鎮完成午餐、咖啡、補水、洗手間與加油。", en: "Stop in a coastal town for lunch, coffee, water, toilets, and fuel." },
          tags: [{ label: { "zh-Hant": "補給", en: "Fuel stop" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "下午｜大景集中段", en: "Afternoon | Main cliff-edge stretch" },
          title: { "zh-Hant": "Twelve Apostles、Loch Ard Gorge、London Arch", en: "Twelve Apostles, Loch Ard Gorge, and London Arch" },
          desc: { "zh-Hant": "三個觀景點距離相對集中，依現場風勢、停車與日照狀況調整停留時間。", en: "The three main viewpoints sit close together; adjust time for wind, parking, and daylight." },
          tags: [{ label: { "zh-Hant": "海岸主景", en: "Coast highlight" }, tone: "coast" }],
        },
        {
          period: { "zh-Hant": "傍晚｜回程上路", en: "Evening | Begin the return" },
          title: { "zh-Hant": "傍晚開始返回墨爾本", en: "Let the return simply be the return" },
          desc: { "zh-Hant": "回程依路況約需數小時，途中安排一次休息與加油，不再新增景點。", en: "The return takes several hours; stop once for rest and fuel, with no additional sights." },
          tags: [{ label: { "zh-Hant": "長途回程", en: "Long return" }, tone: "transfer" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "06:30 - 07:00", en: "06:30 - 07:00" },
          label: { "zh-Hant": "出發", en: "Depart" },
          title: { "zh-Hant": "離開墨爾本市區", en: "Leave Melbourne" },
          note: { "zh-Hant": "06:30 - 07:00 出發；早餐可外帶上車。", en: "Leave between 06:30 and 07:00; breakfast can be taken away." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "提早", en: "Early" }, tone: "warm" }],
        },
        {
          time: { "zh-Hant": "上午", en: "Morning" },
          label: { "zh-Hant": "沿途", en: "En route" },
          title: { "zh-Hant": "Lorne、Apollo Bay 一帶停靠", en: "Coastal pauses around Lorne and Apollo Bay" },
          note: { "zh-Hant": "午餐、洗手間、補水、加油集中處理。", en: "Combine lunch, toilets, water, and fuel in one stop." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "小鎮補給", en: "Town break" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "下午", en: "Afternoon" },
          label: { "zh-Hant": "主景", en: "Highlights" },
          title: { "zh-Hant": "十二門徒岩與 Loch Ard Gorge", en: "Twelve Apostles and Loch Ard Gorge" },
          note: { "zh-Hant": "下午主景集中，停車後多為短步道；風大時注意帽子與隨身物品。", en: "Main viewpoints are in the afternoon; expect short walks and strong wind." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "海岸", en: "Coast" }, tone: "coast" }],
        },
        {
          time: { "zh-Hant": "20:00 - 22:00", en: "20:00 - 22:00" },
          label: { "zh-Hant": "回程", en: "Return" },
          title: { "zh-Hant": "返回墨爾本", en: "Return to Melbourne" },
          note: { "zh-Hant": "依路況約 20:00 - 22:00 抵達；回飯店休息。", en: "Arrive around 20:00-22:00 depending on traffic, then rest at the hotel." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "休息", en: "Rest" }, tone: "note" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "06:30 - 07:00 出發｜沿路補水｜回程後不續排活動。",
          en: "The three priorities today are leaving early, staying hydrated, and not filling the night after the return.",
        },
        {
          "zh-Hant": "海岸日照與風勢並存｜防曬、防風外套、可固定帽款。",
          en: "Coast conditions: bright sun and strong wind. Pack sunscreen and a wind layer.",
        },
        {
          "zh-Hant": "自駕依天候與體力刪減停靠；優先保留十二門徒岩與 Loch Ard Gorge。",
          en: "Trim stops for weather and energy; keep Twelve Apostles and Loch Ard Gorge first.",
        },
      ],
    },
    {
      id: "day3",
      day: { "zh-Hant": "Day 3", en: "Day 3" },
      date: "2026-05-26",
      status: { label: { "zh-Hant": "票券先確認", en: "Confirm tickets" }, tone: "booking" },
      city: { "zh-Hant": "Melbourne → Phillip Island", en: "Melbourne → Phillip Island" },
      theme: { "zh-Hant": "慢城市午後，接上海風與企鵝歸巢", en: "A slower city morning that turns into sea wind and Penguin Parade" },
      preview: {
        "zh-Hant": "上午留在墨爾本吃早午餐，午後自駕前往 Phillip Island；海岸步道、晚餐與企鵝歸巢排在同一路線。",
        en: "Brunch in Melbourne, then drive to Phillip Island for the coast walk, dinner, and Penguin Parade.",
      },
      intro: {
        "zh-Hant": "上午在 Melbourne CBD 早午餐或逛街，14:00 左右前往 Phillip Island。抵達後走 Nobbies Centre，晚餐後進場等候企鵝；夜間海風強，攜帶保暖外套。",
        en: "Brunch or nearby shopping in the morning; leave for Phillip Island around 14:00. Visit Nobbies Centre, dine before entry, and pack a warm outer layer.",
      },
      image: "./assets/day3-phillip-island-sunset.jpg",
      imageAlt: { "zh-Hant": "Phillip Island 夕陽海景", en: "Phillip Island sunset coastline" },
      highlights: [
        { "zh-Hant": "Melbourne brunch", en: "Melbourne brunch" },
        { "zh-Hant": "The Cerberus Beach House", en: "The Cerberus Beach House" },
        { "zh-Hant": "Penguin Parade", en: "Penguin Parade" },
        { "zh-Hant": "晚上海風", en: "Night-time sea wind" },
      ],
      tags: [
        { label: { "zh-Hant": "晚歸日", en: "Late return" }, tone: "night" },
        { label: { "zh-Hant": "保暖外套", en: "Warmer layer" }, tone: "layer" },
        { label: { "zh-Hant": "野生動物", en: "Wildlife" }, tone: "outdoor" },
      ],
      glance: {
        start: {
          value: { "zh-Hant": "上午留白，14:00 左右往海邊", en: "Open morning; head to the coast around 14:00" },
          note: { "zh-Hant": "上午留白｜14:00 左右出發", en: "Open morning; depart around 14:00" },
        },
        area: {
          value: { "zh-Hant": "Melbourne CBD / Phillip Island / Penguin Parade", en: "Melbourne CBD / Phillip Island / Penguin Parade" },
          note: { "zh-Hant": "白天市區｜傍晚後海岸戶外", en: "City by day; coast outdoors after dusk" },
        },
        highlights: {
          value: { "zh-Hant": "brunch、海邊晚餐、企鵝歸巢", en: "Brunch, a seaside dinner, and Penguin Parade" },
          note: { "zh-Hant": "海岸步道依風勢調整；出發前查天氣", en: "Adjust the coast walk for wind; check weather before leaving" },
        },
        energy: {
          value: { "zh-Hant": "普通到偏累", en: "Steady to tiring" },
          note: { "zh-Hant": "白天輕量｜深夜回到墨爾本", en: "Light daytime; late return to Melbourne" },
        },
        walk: {
          value: { "zh-Hant": "低到中等", en: "Low to moderate" },
          note: { "zh-Hant": "主要是看點停留和園區步行", en: "Mostly shorter walks around stops and the parade area" },
        },
        wear: {
          value: { "zh-Hant": "厚一點的外套 + 好走鞋", en: "A warmer outer layer and good shoes" },
          note: { "zh-Hant": "日落後降溫，觀景區海風強", en: "Temperatures drop after sunset and the viewing area is windy" },
        },
        food: {
          value: { "zh-Hant": "市區 brunch / The Cerberus Beach House 晚餐", en: "City brunch / dinner at The Cerberus Beach House" },
          note: { "zh-Hant": "入園前完成晚餐與洗手間", en: "Finish dinner and toilets before entry" },
        },
        transport: {
          value: { "zh-Hant": "租車自駕，單程約 2 小時", en: "Self-drive, around 2 hours each way" },
          note: { "zh-Hant": "深夜回程；抵達市區後直接回飯店", en: "Late-night return; head straight to the hotel" },
        },
        booking: {
          value: { "zh-Hant": "企鵝歸巢票券 / 入場時段", en: "Penguin Parade tickets and entry timing" },
          note: { "zh-Hant": "出發前複核票券、入場與日落時間", en: "Recheck tickets, entry time, and sunset before departure" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜市區留白", en: "Morning | Open city time" },
          title: { "zh-Hant": "早午餐或近距離逛街", en: "Brunch or nearby browsing" },
          desc: { "zh-Hant": "活動範圍留在 Melbourne CBD；14:00 左右取車出發。", en: "Stay within Melbourne CBD and leave by car around 14:00." },
          tags: [{ label: { "zh-Hant": "留白", en: "Breathing room" }, tone: "note" }],
        },
        {
          period: { "zh-Hant": "下午｜往海邊切換", en: "Afternoon | Shift to the coast" },
          title: { "zh-Hant": "開往 Phillip Island", en: "Drive toward Phillip Island" },
          desc: { "zh-Hant": "單程約 2 小時；途中安排一次短暫補給。", en: "The drive takes about two hours, with one short supply stop." },
          tags: [{ label: { "zh-Hant": "自駕", en: "Drive" }, tone: "transfer" }],
        },
        {
          period: { "zh-Hant": "傍晚｜海邊餐桌", en: "Late afternoon | Seaside table" },
          title: { "zh-Hant": "The Cerberus Beach House", en: "The Cerberus Beach House" },
          desc: { "zh-Hant": "晚餐與洗手間在入園前處理完，避免 Penguin Parade 等候期間臨時離席。", en: "Finish dinner and toilets before entering the Penguin Parade area." },
          tags: [{ label: { "zh-Hant": "海邊晚餐", en: "Seaside dinner" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "晚上｜企鵝歸巢", en: "Evening | Penguin Parade" },
          title: { "zh-Hant": "Penguin Parade｜日落後企鵝上岸", en: "Penguin Parade after sunset" },
          desc: { "zh-Hant": "入場後依工作人員指引就座，日落後等待企鵝上岸；夜間請降低音量並遵守攝影規定。", en: "Follow staff seating directions, keep voices low, and observe photography restrictions." },
          tags: [{ label: { "zh-Hant": "經典體驗", en: "Signature moment" }, tone: "outdoor" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "上午", en: "Morning" },
          label: { "zh-Hant": "城市", en: "City" },
          title: { "zh-Hant": "brunch、咖啡或最後一段輕鬆逛市區", en: "Brunch, coffee, or an easy final city wander" },
          note: { "zh-Hant": "早午餐、咖啡或近距離購物；不離開 CBD。", en: "Brunch, coffee, or nearby shopping within the CBD." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "慢一點", en: "Take it slow" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "14:00", en: "14:00" },
          label: { "zh-Hant": "出發", en: "Depart" },
          title: { "zh-Hant": "從墨爾本前往 Phillip Island", en: "Leave Melbourne for Phillip Island" },
          note: { "zh-Hant": "單程約 2 小時，途中可以視狀況安排短暫補給。", en: "The drive is about two hours, with room for a short practical stop if needed." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "車程", en: "Drive" }, tone: "transfer" }],
        },
        {
          time: { "zh-Hant": "傍晚", en: "Late afternoon" },
          label: { "zh-Hant": "餐桌", en: "Dinner" },
          title: { "zh-Hant": "The Cerberus Beach House 海邊晚餐", en: "Dinner at The Cerberus Beach House" },
          note: { "zh-Hant": "用餐後完成洗手間，再前往企鵝園區。", en: "Finish dinner and toilets before heading to the penguin reserve." },
          eventClass: "event-meal",
          flags: [{ label: { "zh-Hant": "海邊", en: "Seaside" }, tone: "food" }],
        },
        {
          time: { "zh-Hant": "晚上", en: "Evening" },
          label: { "zh-Hant": "野生動物", en: "Wildlife" },
          title: { "zh-Hant": "企鵝歸巢", en: "Penguin Parade" },
          note: { "zh-Hant": "依現場規定禁止攝影；降低音量並遵循工作人員指引。", en: "Photography is restricted; keep voices low and follow staff directions." },
          eventClass: "event-outdoor",
          flags: [{ label: { "zh-Hant": "海風強", en: "Windy" }, tone: "outdoor" }],
        },
        {
          time: { "zh-Hant": "深夜", en: "Late night" },
          label: { "zh-Hant": "回程", en: "Return" },
          title: { "zh-Hant": "開回墨爾本市區", en: "Drive back to central Melbourne" },
          note: { "zh-Hant": "深夜抵達；回飯店休息，隔日為飛雪梨轉場。", en: "Late arrival; return to the hotel before tomorrow's Sydney transfer." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "晚歸", en: "Late finish" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "日落後明顯降溫｜保暖外套、防風層、好走鞋。",
          en: "Temperatures drop after sunset: pack a warm outer layer, wind protection, and walking shoes.",
        },
        {
          "zh-Hant": "入園前完成晚餐與洗手間；入場後依工作人員指引。",
          en: "Finish dinner and toilets before entry, then follow staff directions.",
        },
        {
          "zh-Hant": "企鵝歸巢後直接返回墨爾本，不再安排市區夜景或購物。",
          en: "Return directly to Melbourne after Penguin Parade; no additional city stops.",
        },
      ],
    },
    {
      id: "day4",
      day: { "zh-Hant": "Day 4", en: "Day 4" },
      date: "2026-05-27",
      status: { label: { "zh-Hant": "固定航班", en: "Fixed flight" }, tone: "fixed" },
      city: { "zh-Hant": "Melbourne → Sydney", en: "Melbourne → Sydney" },
      theme: { "zh-Hant": "墨爾本收尾，午後飛往雪梨", en: "Wrap Melbourne, then fly into Sydney" },
      preview: {
        "zh-Hant": "上午在飯店附近吃早午餐，取行李、還車後搭 13:00 的 JQ514；抵達雪梨後先入住達令港。",
        en: "Brunch near the hotel, collect bags, return the car, and take JQ514 at 13:00; check in at Darling Harbour after arrival.",
      },
      intro: {
        "zh-Hant": "跨城轉場日。上午留在飯店與 Melbourne CBD 周邊；11:30 前取行李，還車後搭 13:00 JQ514。抵達雪梨後入住達令港，晚餐與散步留在飯店周邊。",
        en: "Transfer day: stay near Melbourne CBD, collect bags by 11:30, return the car, and take JQ514 at 13:00. Dinner and a walk stay near Darling Harbour.",
      },
      image: "./assets/day4-darling-harbour.jpg",
      imageAlt: { "zh-Hant": "雪梨達令港與水岸夜景", en: "Darling Harbour waterside scene" },
      highlights: [
        { "zh-Hant": "Melbourne brunch", en: "Melbourne brunch" },
        { "zh-Hant": "Emporium / Bourke Street", en: "Emporium / Bourke Street" },
        { "zh-Hant": "Jetstar JQ514", en: "Jetstar JQ514" },
        { "zh-Hant": "Darling Harbour 夜色", en: "Darling Harbour evening" },
      ],
      tags: [
        { label: { "zh-Hant": "長途移動日", en: "Transfer day" }, tone: "transfer" },
        { label: { "zh-Hant": "舒服穿", en: "Comfort wear" }, tone: "layer" },
        { label: { "zh-Hant": "拿行李", en: "Luggage day" }, tone: "note" },
      ],
      glance: {
        start: {
          value: { "zh-Hant": "上午留在 Melbourne CBD", en: "Stay near Melbourne CBD in the morning" },
          note: { "zh-Hant": "11:30 前回飯店取行李", en: "Return to the hotel for bags by 11:30" },
        },
        area: {
          value: { "zh-Hant": "Melbourne Central / Emporium / MEL T4 / Darling Harbour", en: "Melbourne Central / Emporium / MEL T4 / Darling Harbour" },
          note: { "zh-Hant": "Melbourne CBD → MEL T4 → SYD T2 → Darling Harbour", en: "Melbourne CBD → MEL T4 → SYD T2 → Darling Harbour" },
        },
        highlights: {
          value: { "zh-Hant": "Melbourne 最後半天、JQ514、雪梨第一晚", en: "The last Melbourne half-day, JQ514, and the first Sydney evening" },
          note: { "zh-Hant": "上午墨爾本，傍晚達令港", en: "Melbourne in the morning, Darling Harbour by evening" },
        },
        energy: {
          value: { "zh-Hant": "普通", en: "Steady" },
          note: { "zh-Hant": "國內線轉場；不排遠程景點", en: "Domestic transfer with no distant sights" },
        },
        walk: {
          value: { "zh-Hant": "中等", en: "Moderate" },
          note: { "zh-Hant": "上午是城市步行，下午是機場動線", en: "The morning walks, the afternoon moves through airport flow" },
        },
        wear: {
          value: { "zh-Hant": "舒服好穿、方便進出機場的層次", en: "Comfortable layers that work well in airports" },
          note: { "zh-Hant": "輕便分層；證件與充電線放隨身行李", en: "Comfortable layers; documents and charger in carry-on" },
        },
        food: {
          value: { "zh-Hant": "Melbourne brunch / 機場輕食 / 達令港晚餐", en: "Melbourne brunch / airport snack / dinner by Darling Harbour" },
          note: { "zh-Hant": "早午餐後出發；另備機場輕食", en: "Leave after brunch and keep an airport snack ready" },
        },
        transport: {
          value: { "zh-Hant": "市區 → 飯店拿行李 → 機場 → JQ514 → Sydney", en: "City → hotel bags → airport → JQ514 → Sydney" },
          note: { "zh-Hant": "固定順序：取行李、還車、報到、飛行、入住", en: "Fixed order: bags, car return, check-in, flight, hotel" },
        },
        booking: {
          value: { "zh-Hant": "13:00 JQ514", en: "13:00 JQ514" },
          note: { "zh-Hant": "11:30 取行李｜13:00 起飛｜14:25 抵達", en: "11:30 bags | 13:00 departure | 14:25 arrival" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜墨爾本最後一段", en: "Morning | One last Melbourne window" },
          title: { "zh-Hant": "早午餐與近距離 city walk", en: "Brunch and a nearby city walk" },
          desc: { "zh-Hant": "飯店周邊、Melbourne Central、Emporium、Bourke Street；11:30 前折返取行李。", en: "Stay near the hotel, Melbourne Central, Emporium, and Bourke Street; collect bags by 11:30." },
          tags: [{ label: { "zh-Hant": "近距離", en: "Nearby" }, tone: "city" }],
        },
        {
          period: { "zh-Hant": "中午｜行李與機場", en: "Midday | Luggage and airport" },
          title: { "zh-Hant": "取行李、還車、國內線報到", en: "Bags, car return, and domestic check-in" },
          desc: { "zh-Hant": "11:30 前回飯店取行李，接著還車、報到並搭乘 13:00 的 JQ514。", en: "Collect bags by 11:30, return the car, check in, and take JQ514 at 13:00." },
          tags: [{ label: { "zh-Hant": "轉場", en: "Transfer" }, tone: "transfer" }],
        },
        {
          period: { "zh-Hant": "下午｜飛往雪梨", en: "Afternoon | Fly to Sydney" },
          title: { "zh-Hant": "JQ514｜Melbourne → Sydney", en: "JQ514 | Melbourne to Sydney" },
          desc: { "zh-Hant": "航程約 1 小時 25 分；抵達 SYD T2 後，再轉乘市區交通前往達令港。", en: "Flight time is about 1 hour 25 minutes; transfer from SYD T2 to Darling Harbour." },
          tags: [{ label: { "zh-Hant": "班機", en: "Flight" }, tone: "warm" }],
        },
        {
          period: { "zh-Hant": "傍晚｜達令港入住", en: "Evening | Darling Harbour check-in" },
          title: { "zh-Hant": "飯店周邊晚餐與水岸散步", en: "Dinner and a waterfront walk near the hotel" },
          desc: { "zh-Hant": "辦理入住後在達令港用餐，飯店周邊散步即可，不再跨區前往 Circular Quay。", en: "Check in, dine at Darling Harbour, and stay within the hotel area for the evening." },
          tags: [{ label: { "zh-Hant": "港邊夜色", en: "Harbour night" }, tone: "night" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "上午", en: "Morning" },
          label: { "zh-Hant": "城市", en: "City" },
          title: { "zh-Hant": "Melbourne Central、Emporium、Bourke Street 周邊", en: "Around Melbourne Central, Emporium, and Bourke Street" },
          note: { "zh-Hant": "三區相鄰；步行後原路折返飯店。", en: "The three areas are adjacent and walkable from the hotel." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "最後散步", en: "Final walk" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "11:30 - 12:00", en: "11:30 - 12:00" },
          label: { "zh-Hant": "行李", en: "Bags" },
          title: { "zh-Hant": "回飯店整理與取行李", en: "Return to the hotel for bags" },
          note: { "zh-Hant": "11:30 前取行李；接續還車與國內線報到。", en: "Collect bags by 11:30, then return the car and check in." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "重要", en: "Key anchor" }, tone: "transfer" }],
        },
        {
          time: { "zh-Hant": "13:00", en: "13:00" },
          label: { "zh-Hant": "飛行", en: "Flight" },
          title: { "zh-Hant": "JQ514 墨爾本飛雪梨", en: "JQ514 from Melbourne to Sydney" },
          note: { "zh-Hant": "13:00 MEL T4 起飛｜14:25 SYD T2 抵達。", en: "Depart MEL T4 at 13:00; arrive SYD T2 at 14:25." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "JQ514", en: "JQ514" }, tone: "warm" }],
        },
        {
          time: { "zh-Hant": "16:30 後", en: "After 16:30" },
          label: { "zh-Hant": "入住", en: "Check-in" },
          title: { "zh-Hant": "抵達達令港", en: "Arrive at Darling Harbour" },
          note: { "zh-Hant": "入住、晚餐、水岸散步；不跨區前往 Circular Quay。", en: "Check in, dinner, and a waterfront walk; no cross-city trip to Circular Quay." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "新城市", en: "New city" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "上午不離開 CBD｜11:30 前取行李｜預留還車與報到時間。",
          en: "The main rule today is not to drift too far in the morning; the hotel return for luggage needs breathing room.",
        },
        {
          "zh-Hant": "轉場穿搭｜輕便分層；證件、充電線、薄外套放隨身行李。",
          en: "Wear light layers; keep documents, charging cable, and a light jacket in carry-on.",
        },
        {
          "zh-Hant": "雪梨第一晚留在達令港，歌劇院與 Circular Quay 排在隔天上午。",
          en: "The first Sydney evening only needs to settle the new base. There is no reason to cram the whole harbour in immediately.",
        },
      ],
    },
    {
      id: "day5",
      day: { "zh-Hant": "Day 5", en: "Day 5" },
      date: "2026-05-28",
      status: { label: { "zh-Hant": "票券先確認", en: "Confirm tickets" }, tone: "booking" },
      city: { "zh-Hant": "Sydney Harbour / Darling Harbour", en: "Sydney Harbour / Darling Harbour" },
      theme: { "zh-Hant": "港灣晨光、歌劇院與海生館的一天", en: "Harbour morning light, the Opera House, and the aquarium" },
      preview: {
        "zh-Hant": "早餐從 Opera Quays 或 MCA Cafe 開始，沿 Circular Quay 走到歌劇院；下午回達令港逛海生館。",
        en: "Breakfast at Opera Quays or MCA Cafe, a Circular Quay and Opera House walk, then the aquarium at Darling Harbour.",
      },
      intro: {
        "zh-Hant": "港灣步行日。08:00 在 Opera Quays 或 MCA Cafe 早餐，上午走歌劇院與 Circular Quay；13:30 進 SEA LIFE Sydney Aquarium，晚餐回達令港。好走鞋、防曬、墨鏡。",
        en: "Harbour walking day: breakfast at Opera Quays or MCA Cafe at 08:00, the Opera House and Circular Quay, then SEA LIFE at 13:30 and dinner at Darling Harbour.",
      },
      image: "./assets/opera-house-harbour.jpg",
      imageAlt: { "zh-Hant": "雪梨歌劇院與港灣", en: "Sydney Opera House and harbour" },
      highlights: [
        { "zh-Hant": "Wahlburgers Opera Quays", en: "Wahlburgers Opera Quays" },
        { "zh-Hant": "MCA Cafe", en: "MCA Cafe" },
        { "zh-Hant": "Sydney Opera House", en: "Sydney Opera House" },
        { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" },
      ],
      tags: [
        { label: { "zh-Hant": "城市散步日", en: "City walk day" }, tone: "city" },
        { label: { "zh-Hant": "防曬", en: "Sunscreen" }, tone: "coast" },
        { label: { "zh-Hant": "港灣晨光", en: "Harbour morning" }, tone: "food" },
      ],
      glance: {
        start: {
          value: { "zh-Hant": "08:00 左右港邊早餐", en: "Breakfast by the harbour around 08:00" },
          note: { "zh-Hant": "提早抵達可預留候位與拍照時間", en: "Arrive early for seating and photos" },
        },
        area: {
          value: { "zh-Hant": "Circular Quay / Sydney Opera House / Darling Harbour", en: "Circular Quay / Sydney Opera House / Darling Harbour" },
          note: { "zh-Hant": "上午 Circular Quay｜下午 Darling Harbour", en: "Circular Quay in the morning; Darling Harbour in the afternoon" },
        },
        highlights: {
          value: { "zh-Hant": "港邊早餐、歌劇院、Circular Quay、SEA LIFE", en: "Harbour breakfast, the Opera House, Circular Quay, and SEA LIFE" },
          note: { "zh-Hant": "早餐與上午步行位於同一港區", en: "Breakfast and the morning walk share one harbour zone" },
        },
        energy: {
          value: { "zh-Hant": "普通", en: "Steady" },
          note: { "zh-Hant": "08:00 開始｜步行量高於 Day 4", en: "08:00 start with more walking than Day 4" },
        },
        walk: {
          value: { "zh-Hant": "中等偏多", en: "Moderate to moderately high" },
          note: { "zh-Hant": "Circular Quay 與港邊步行時間較長", en: "Longer walking around Circular Quay and the waterfront" },
        },
        wear: {
          value: { "zh-Hant": "好走鞋、防曬、墨鏡、薄外套", en: "Walking shoes, sunscreen, sunglasses, and a light layer" },
          note: { "zh-Hant": "白天日照明顯；傍晚港邊加薄外套", en: "Bright daylight; add a light layer by the harbour at dusk" },
        },
        food: {
          value: { "zh-Hant": "Wahlburgers Opera Quays 或 MCA Cafe / 達令港晚餐", en: "Wahlburgers Opera Quays or MCA Cafe / dinner at Darling Harbour" },
          note: { "zh-Hant": "08:00 港邊早餐｜18:00 達令港晚餐", en: "08:00 harbour breakfast; 18:00 dinner at Darling Harbour" },
        },
        transport: {
          value: { "zh-Hant": "步行 + 輕軌 / 市區火車", en: "Walking + light rail / city train" },
          note: { "zh-Hant": "無自駕；跨區使用輕軌或市區火車", en: "No car; use light rail or city train between zones" },
        },
        booking: {
          value: { "zh-Hant": "早餐稍早到 / 海生館票券確認", en: "Arrive a bit early for breakfast / confirm aquarium tickets" },
          note: { "zh-Hant": "複核早餐營業時間與 SEA LIFE 票券", en: "Recheck breakfast opening hours and SEA LIFE tickets" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜港灣早餐與晨間散步", en: "Morning | The harbour wakes slowly" },
          title: { "zh-Hant": "Opera Quays 或 MCA Cafe 早餐", en: "Breakfast at Opera Quays or MCA Cafe" },
          desc: { "zh-Hant": "選 Opera Quays 或 MCA Cafe，吃完可直接步行前往歌劇院與 Circular Quay。", en: "Putting breakfast by the harbour turns the day’s first light into part of the experience, not a thing you arrive at later." },
          tags: [{ label: { "zh-Hant": "港灣早餐", en: "Harbour breakfast" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "中午｜港邊散步", en: "Midday | Walk the harbour edge" },
          title: { "zh-Hant": "Circular Quay 與歌劇院一帶", en: "Circular Quay and the Opera House" },
          desc: { "zh-Hant": "沿港邊步行，經 Circular Quay 前往歌劇院；途中補擦防曬。", en: "Walk the waterfront through Circular Quay to the Opera House; reapply sunscreen en route." },
          tags: [{ label: { "zh-Hant": "城市大景", en: "City icon" }, tone: "coast" }],
        },
        {
          period: { "zh-Hant": "下午｜海生館", en: "Afternoon | Aquarium" },
          title: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" },
          desc: { "zh-Hant": "13:30 入場；下午轉入室內，結束後步行回飯店周邊。", en: "Enter at 13:30, then walk back toward the hotel area afterward." },
          tags: [{ label: { "zh-Hant": "室內段落", en: "Indoor pause" }, tone: "note" }],
        },
        {
          period: { "zh-Hant": "傍晚｜回到達令港", en: "Evening | Return to Darling Harbour" },
          title: { "zh-Hant": "晚餐與港灣夜色", en: "Dinner and harbour night light" },
          desc: { "zh-Hant": "海生館結束後已回到飯店附近，可直接安排晚餐並沿水岸散步。", en: "After the aquarium, dine near the hotel and walk the Darling Harbour waterfront." },
          tags: [{ label: { "zh-Hant": "夜景", en: "Night view" }, tone: "night" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "08:00", en: "08:00" },
          label: { "zh-Hant": "早餐", en: "Breakfast" },
          title: { "zh-Hant": "Wahlburgers Opera Quays 或 MCA Cafe", en: "Wahlburgers Opera Quays or MCA Cafe" },
          note: { "zh-Hant": "Opera Quays 看歌劇院；MCA Cafe 看 Circular Quay。", en: "Opera Quays faces the Opera House; MCA Cafe looks over Circular Quay." },
          eventClass: "event-meal",
          flags: [{ label: { "zh-Hant": "景好", en: "Great light" }, tone: "food" }],
        },
        {
          time: { "zh-Hant": "10:00 左右", en: "Around 10:00" },
          label: { "zh-Hant": "港灣", en: "Harbour" },
          title: { "zh-Hant": "歌劇院與 Circular Quay 散步", en: "Walk the Opera House and Circular Quay" },
          note: { "zh-Hant": "港邊日照與風勢都明顯，途中補擦防曬並留意飲水。", en: "The harbour is bright and windy; reapply sunscreen and drink water." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "慢走", en: "Slow walk" }, tone: "coast" }],
        },
        {
          time: { "zh-Hant": "13:30", en: "13:30" },
          label: { "zh-Hant": "室內", en: "Indoor" },
          title: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" },
          note: { "zh-Hant": "13:30 入場；票券與最後入場時間事先複核。", en: "Enter at 13:30; recheck tickets and last entry time." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "轉室內", en: "Indoors" }, tone: "note" }],
        },
        {
          time: { "zh-Hant": "18:00", en: "18:00" },
          label: { "zh-Hant": "夜色", en: "Evening" },
          title: { "zh-Hant": "達令港晚餐與散步", en: "Dinner and a walk in Darling Harbour" },
          note: { "zh-Hant": "18:00 晚餐；飯後沿 Darling Harbour 水岸散步。", en: "Dinner at 18:00, followed by a Darling Harbour waterfront walk." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "港邊收尾", en: "Harbour finish" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "港灣步行量較高｜好走鞋、防曬、墨鏡、飲水。",
          en: "Walking load climbs again today, so good shoes and sun protection matter more than outfit ideas.",
        },
        {
          "zh-Hant": "窗邊座位與晨間港景｜提早抵達，預留候位時間。",
          en: "For window seating and morning harbour photos, arrive early and allow queue time.",
        },
        {
          "zh-Hant": "13:30 海生館｜避開午後日照，轉入室內步行。",
          en: "The aquarium in the afternoon is not just convenient; it also gives the day a nice change in pace.",
        },
      ],
    },
    {
      id: "day6",
      day: { "zh-Hant": "Day 6", en: "Day 6" },
      date: "2026-05-29",
      status: { label: { "zh-Hant": "回程時間固定", en: "Fixed return" }, tone: "fixed" },
      city: { "zh-Hant": "Sydney CBD / Airport", en: "Sydney CBD / Airport" },
      theme: { "zh-Hant": "最後半天的城市節奏，晚上回程", en: "A final city half-day, then the night flight home" },
      preview: {
        "zh-Hant": "上午走 QVB、Hyde Park 與周邊街區，午餐後完成最後採買；17:30 回飯店取行李，19:00 前往機場。",
        en: "Walk QVB, Hyde Park, and central Sydney; collect bags at 17:30 and leave for the airport at 19:00.",
      },
      intro: {
        "zh-Hant": "白天活動集中在雪梨市中心，不安排遠郊。購物結束後回達令港取行李，國際線至少保留三小時報到與安檢時間。",
        en: "Keep the day in central Sydney: QVB, Hyde Park, lunch, and final shopping. Collect bags at 17:30 and allow at least three hours for the international flight.",
      },
      image: "./assets/day6-qvb-sydney.jpg",
      imageAlt: { "zh-Hant": "雪梨 QVB 與市中心街道", en: "Sydney QVB and city streets" },
      highlights: [
        { "zh-Hant": "QVB", en: "QVB" },
        { "zh-Hant": "Hyde Park", en: "Hyde Park" },
        { "zh-Hant": "最後補買", en: "Last shopping" },
        { "zh-Hant": "Sydney Airport", en: "Sydney Airport" },
      ],
      tags: [
        { label: { "zh-Hant": "輕鬆", en: "Lighter day" }, tone: "city" },
        { label: { "zh-Hant": "最後補買", en: "Last shopping" }, tone: "food" },
        { label: { "zh-Hant": "晚班機", en: "Late flight" }, tone: "night" },
      ],
      glance: {
        start: {
          value: { "zh-Hant": "09:30 左右開始市中心散步", en: "Start the city walk around 09:30" },
          note: { "zh-Hant": "上午退房並寄放行李", en: "Check out and store luggage in the morning" },
        },
        area: {
          value: { "zh-Hant": "QVB / Hyde Park / Darling Harbour / Sydney Airport", en: "QVB / Hyde Park / Darling Harbour / Sydney Airport" },
          note: { "zh-Hant": "白天 Sydney CBD｜傍晚 Darling Harbour｜晚上機場", en: "Sydney CBD by day, Darling Harbour at dusk, airport at night" },
        },
        highlights: {
          value: { "zh-Hant": "最後一段城市散步、午餐、補買與回程夜晚", en: "The final city walk, lunch, shopping, and the departure night" },
          note: { "zh-Hant": "市中心散步、午餐、採買、回程", en: "City walk, lunch, shopping, and departure" },
        },
        energy: {
          value: { "zh-Hant": "輕鬆", en: "Light" },
          note: { "zh-Hant": "白天輕量｜晚間固定航班", en: "Light daytime; fixed evening flight" },
        },
        walk: {
          value: { "zh-Hant": "中等", en: "Moderate" },
          note: { "zh-Hant": "QVB、Hyde Park 與市中心購物步行", en: "Walking around QVB, Hyde Park, and central shops" },
        },
        wear: {
          value: { "zh-Hant": "舒服、好收納，外套放手邊", en: "Comfortable, easy to pack, with a layer kept handy" },
          note: { "zh-Hant": "薄外套留在隨身行李，機場可直接取用", en: "Keep a light layer in carry-on for the airport" },
        },
        food: {
          value: { "zh-Hant": "市區午餐 / 機場前簡單補給", en: "Lunch in the city / a simple airport snack later" },
          note: { "zh-Hant": "午餐與採買集中在 QVB 周邊", en: "Keep lunch and shopping around QVB" },
        },
        transport: {
          value: { "zh-Hant": "步行 + Airport Line / Uber", en: "Walking + airport line / Uber" },
          note: { "zh-Hant": "行李多：Uber｜時間固定：Airport Line", en: "More luggage: Uber; fixed schedule: Airport Line" },
        },
        booking: {
          value: { "zh-Hant": "22:10 國際線回程", en: "22:10 international departure" },
          note: { "zh-Hant": "17:30 取行李｜19:00 前往機場｜22:10 起飛", en: "17:30 bags | 19:00 airport transfer | 22:10 departure" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜最後一段市區散步", en: "Morning | One last city walk" },
          title: { "zh-Hant": "QVB、Hyde Park 與周邊街區", en: "QVB, Hyde Park, and the surrounding streets" },
          desc: { "zh-Hant": "QVB → Hyde Park → 周邊街區；全程留在 Sydney CBD。", en: "QVB to Hyde Park and nearby streets, all within Sydney CBD." },
          tags: [{ label: { "zh-Hant": "市中心", en: "CBD" }, tone: "city" }],
        },
        {
          period: { "zh-Hant": "中午｜午餐與補買", en: "Midday | Lunch and the final shopping round" },
          title: { "zh-Hant": "午餐與最後採買", en: "Lunch and final shopping" },
          desc: { "zh-Hant": "集中購買已確認的品項，並預留行李整理與回飯店時間。", en: "Buy confirmed items only and allow time to repack and return to the hotel." },
          tags: [{ label: { "zh-Hant": "最後補買", en: "Last buys" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "傍晚｜回飯店與拿行李", en: "Late afternoon | Return and collect luggage" },
          title: { "zh-Hant": "17:30 回飯店取行李", en: "Collect bags at 17:30" },
          desc: { "zh-Hant": "核對護照、退稅單據、電子用品與隨身行李。", en: "Check passports, tax-refund documents, electronics, and carry-on bags." },
          tags: [{ label: { "zh-Hant": "時間緩衝", en: "Buffer" }, tone: "transfer" }],
        },
        {
          period: { "zh-Hant": "晚上｜往機場走", en: "Evening | Head to the airport" },
          title: { "zh-Hant": "19:00 前往 Sydney Airport T1", en: "Leave for Sydney Airport T1 at 19:00" },
          desc: { "zh-Hant": "搭 Airport Line 或 Uber；國際線預留至少 3 小時。", en: "Take the Airport Line or Uber and allow at least three hours for the international flight." },
          tags: [{ label: { "zh-Hant": "回程夜晚", en: "Departure night" }, tone: "night" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "09:30", en: "09:30" },
          label: { "zh-Hant": "散步", en: "Walk" },
          title: { "zh-Hant": "QVB 與市中心街區", en: "QVB and the central streets" },
          note: { "zh-Hant": "QVB、Hyde Park 與周邊街區集中在 Sydney CBD。", en: "QVB, Hyde Park, and nearby streets stay within Sydney CBD." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "收尾", en: "Final pass" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "13:00", en: "13:00" },
          label: { "zh-Hant": "午餐", en: "Lunch" },
          title: { "zh-Hant": "午餐與最後補買", en: "Lunch and the final shopping round" },
          note: { "zh-Hant": "只購買已確認品項；預留整理行李時間。", en: "Buy only confirmed items and leave time to repack." },
          eventClass: "event-meal",
          flags: [{ label: { "zh-Hant": "補買", en: "Shopping" }, tone: "food" }],
        },
        {
          time: { "zh-Hant": "17:30", en: "17:30" },
          label: { "zh-Hant": "行李", en: "Bags" },
          title: { "zh-Hant": "回飯店拿行李", en: "Return to the hotel for luggage" },
          note: { "zh-Hant": "固定節點；購物或用餐延誤時縮短市區行程。", en: "Fixed timing; shorten the city plan if lunch or shopping runs late." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "重要", en: "Important" }, tone: "transfer" }],
        },
        {
          time: { "zh-Hant": "19:00", en: "19:00" },
          label: { "zh-Hant": "機場", en: "Airport" },
          title: { "zh-Hant": "前往 Sydney Airport", en: "Head to Sydney Airport" },
          note: { "zh-Hant": "Airport Line 或 Uber｜CI0052 22:10 起飛。", en: "Airport Line or Uber; CI0052 departs at 22:10." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "22:10 起飛", en: "22:10 departure" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "17:30 回飯店取行李，若購物或用餐延誤，優先縮短市區行程。",
          en: "The most common mistake on a last day is returning for luggage too late, so protect that timing first.",
        },
        {
          "zh-Hant": "戰利品較多或體力下降時，從飯店直接叫 Uber 前往機場。",
          en: "If shopping or lunch runs late, shorten the city route and keep the 17:30 luggage pickup.",
        },
        {
          "zh-Hant": "護照、退稅單據與隨身電子用品在離開飯店前再確認一次。",
          en: "Letting the trip end on a city walk and the evening light is usually far more memorable than a frantic last-minute rush.",
        },
      ],
    },
  ],
  budgetRows: [
    { item: { "zh-Hant": "國際機票", en: "International flights" }, aud: 1000, note: { "zh-Hant": "先用兩人約 NT$20,700 換算", en: "Converted from about NT$20,700 total for two" }, booked: true, status: "estimated" },
    { item: { "zh-Hant": "澳洲簽證 / ETA", en: "Australia ETA" }, aud: 40, note: { "zh-Hant": "官方 ETA App 服務費 A$20 / 人，兩人先抓 A$40", en: "Official ETA app service fee at A$20 per person, so A$40 for two" }, status: "estimated" },
    { item: { "zh-Hant": "墨爾本住宿 3 晚", en: "Melbourne stay, 3 nights" }, aud: 789.3, note: { "zh-Hant": "Dorsett Melbourne｜5/24 - 5/27｜NT$16,339", en: "Dorsett Melbourne | May 24 - May 27 | NT$16,339" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "雪梨住宿 2 晚", en: "Sydney stay, 2 nights" }, aud: 899.6, note: { "zh-Hant": "Sofitel Darling Harbour｜5/27 - 5/29｜NT$18,621", en: "Sofitel Darling Harbour | May 27 - May 29 | NT$18,621" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "墨爾本 → 雪梨國內線", en: "Melbourne to Sydney domestic flight" }, aud: 260, note: { "zh-Hant": "JQ514 已訂，但截圖未顯示票價，先保留估算", en: "JQ514 is booked, but the fare was not captured, so it stays estimated" }, status: "estimated" },
    { item: { "zh-Hant": "墨爾本租車", en: "Melbourne rental car" }, aud: 264.2, note: { "zh-Hant": "Toyota Corolla 或同級｜NT$5,468｜已付款", en: "Toyota Corolla or similar | NT$5,468 | paid" }, booked: true, status: "actual" },
    { item: { "zh-Hant": "機場 / 市區交通與停車", en: "Airport, city transport, and parking" }, aud: 180, note: { "zh-Hant": "含雪梨機場線、墨爾本停車或加油彈性", en: "Includes Sydney airport rail plus Melbourne parking or fuel buffer" }, status: "estimated" },
    { item: { "zh-Hant": "餐食", en: "Meals" }, aud: 700, note: { "zh-Hant": "兩人 6 天餐食預算", en: "Meal budget for two over six days" }, status: "estimated" },
    { item: { "zh-Hant": "一日遊 / 門票", en: "Day tour / tickets" }, aud: 360, note: { "zh-Hant": "一日遊與門票預留", en: "Allowance for a day tour and tickets" }, status: "estimated" },
    { item: { "zh-Hant": "購物與彈性", en: "Shopping and buffer" }, aud: 350, note: { "zh-Hant": "留給臨時加點或戰利品", en: "For extras, last-minute add-ons, or souvenirs" }, status: "estimated" },
  ],
  souvenirs: [
    {
      name: { "zh-Hant": "澳洲蛋白石飾品", en: "Australian opal jewellery" },
      subname: { "zh-Hant": "Opal ring / pendant / earrings", en: "Opal ring / pendant / earrings" },
      image: "./assets/souvenir-opal.jpg",
      tags: [
        { label: { "zh-Hant": "辨識度高", en: "Iconic" }, tone: "coast" },
        { label: { "zh-Hant": "紀念感強", en: "Keepsake" }, tone: "night" },
      ],
      note: {
        "zh-Hant": "澳洲代表性珠寶；購買前核對證書、產地、色澤與預算。",
        en: "A recognisably Australian jewellery option; check certification, origin, colour, and budget before purchase.",
      },
      buy: {
        "zh-Hant": "市區珠寶店比價；確認證書、產地、色澤與售後資訊。",
        en: "Compare city jewellers and check certification, origin, colour, and after-sales information.",
      },
      range: { "zh-Hant": "價格：小墜飾到正式珠寶，差異較大", en: "Price: from small pendants to fine jewellery" },
      href: "https://www.australia.com/en-us/facts-and-planning/about-australia/australian-souvenirs.html",
    },
    {
      name: { "zh-Hant": "Tim Tam / 澳洲超市零食", en: "Tim Tam and supermarket snacks" },
      subname: { "zh-Hant": "Tim Tam / 巧克力餅乾 / 超市伴手禮", en: "Tim Tam / chocolate biscuits / supermarket gifts" },
      image: "./assets/souvenir-timtam-card.svg",
      tags: [
        { label: { "zh-Hant": "容易採買", en: "Easy buy" }, tone: "food" },
        { label: { "zh-Hant": "機場也能補", en: "Airport friendly" }, tone: "transfer" },
      ],
      note: {
        "zh-Hant": "送禮與分享用；價格、口味與數量容易控制，前幾天分批採買。",
        en: "Easy gifts with controllable price and quantity; buy them in small rounds early in the trip.",
      },
      buy: {
        "zh-Hant": "Coles、Woolworths、機場商店皆有販售；分批購入，避免回程日集中裝箱。",
        en: "Available at Coles, Woolworths, and airport shops; buy in small rounds instead of packing everything on Day 6.",
      },
      range: { "zh-Hant": "價格：平價，可多盒分裝", en: "Price: affordable and easy to buy in multiples" },
      href: "https://www.australia.com/en-us/facts-and-planning/about-australia/australian-souvenirs.html",
    },
    {
      name: { "zh-Hant": "Aesop 護手霜 / 香氛保養", en: "Aesop hand balm and aromatic care" },
      subname: { "zh-Hant": "Aesop", en: "Aesop" },
      image: "./assets/souvenir-aesop-card.svg",
      tags: [
        { label: { "zh-Hant": "澳洲品牌", en: "Australian brand" }, tone: "city" },
        { label: { "zh-Hant": "有質感", en: "Elevated" }, tone: "warm" },
      ],
      note: {
        "zh-Hant": "Aesop 門市在兩座城市都容易找到，護手霜、香皂與小容量香氛也較方便放入行李。",
        en: "Stores are available in both cities; hand balm, soap, and travel-size fragrance pack easily.",
      },
      buy: {
        "zh-Hant": "墨爾本、雪梨皆有門市；護手霜、香皂與隨身噴霧較好收納。",
        en: "Available in Melbourne and Sydney; smaller hand-care and aromatic products are easier to pack.",
      },
      range: { "zh-Hant": "價格：中高", en: "Price: mid to premium" },
      href: "https://www.aesop.com/",
    },
    {
      name: { "zh-Hant": "美麗諾羊毛 / 澳洲製羊毛小物", en: "Merino wool and Australian-made wool goods" },
      subname: { "zh-Hant": "Merino scarf / throw / knit accessories", en: "Merino scarf / throw / knit accessories" },
      image: "./assets/souvenir-merino.jpg",
      tags: [
        { label: { "zh-Hant": "秋冬實用", en: "Useful" }, tone: "outdoor" },
        { label: { "zh-Hant": "手感好", en: "Textural" }, tone: "note" },
      ],
      note: {
        "zh-Hant": "小圍巾、披肩與羊毛配件比大件外套好收納；購買前先查看產地與材質比例。",
        en: "Scarves, shawls, and small wool accessories pack more easily than coats; check origin and fibre content.",
      },
      buy: {
        "zh-Hant": "優先選擇澳洲製或材質標示清楚的款式，並確認保養方式與行李空間。",
        en: "Choose Australian-made items or clear fibre labels; check care instructions and luggage space.",
      },
      range: { "zh-Hant": "價格：中價位到高價位", en: "Price: mid to premium" },
      href: "https://www.sydney.com/articles/best-souvenirs-from-australia",
    },
  ],
  souvenirTips: [
    {
      title: { "zh-Hant": "超市伴手禮提早分批買", en: "Clear the easy gifts first" },
      desc: {
        "zh-Hant": "Tim Tam 與超市零食在前幾天分批購入；Day 6 僅補缺口。",
        en: "Buy Tim Tam and supermarket snacks in small rounds; use Day 6 only to fill gaps.",
      },
    },
    {
      title: { "zh-Hant": "珠寶與保養品留在市中心挑", en: "Leave jewellery and polished buys for the end" },
      desc: {
        "zh-Hant": "蛋白石或 Aesop 可安排在 Day 6 的 QVB 與市中心區域，購買後再回飯店整理行李。",
        en: "Place opal or Aesop shopping around QVB and central Sydney on Day 6.",
      },
    },
    {
      title: { "zh-Hant": "羊毛和設計品先看來源", en: "Check provenance on wool and design buys" },
      desc: {
        "zh-Hant": "核對澳洲製標示、纖維比例、保養方式與退換規則。",
        en: "Check Australian-made labels, fibre content, care instructions, and returns.",
      },
    },
  ],
  souvenirSources: [
    {
      title: { "zh-Hant": "挑選原則", en: "Selection logic" },
      desc: {
        "zh-Hant": "優先考量重量、保存方式、用途與澳洲產地標示，避免購買體積大或不易攜帶的品項。",
        en: "Prioritise weight, storage, practical use, and Australian origin labels.",
      },
    },
    {
      title: { "zh-Hant": "與這趟路線相符", en: "Matched to this route" },
      desc: {
        "zh-Hant": "蛋白石、羊毛、澳洲品牌與超市零食，分別對應珠寶、秋季衣物、城市購物與送禮需求。",
        en: "Opal, wool, Australian brands, and supermarket gifts cover jewellery, autumn clothing, city shopping, and gifts.",
      },
    },
  ],
  checklistGroups: [
    {
      title: { "zh-Hant": "文件與入境", en: "Documents and entry" },
      items: [
        { id: "passport", title: { "zh-Hant": "護照效期", en: "Passport validity" }, desc: { "zh-Hant": "效期涵蓋回程日；手機留存護照影本。", en: "Validity covers the return date; keep a copy on the phone." } },
        { id: "eta", title: { "zh-Hant": "澳洲 ETA", en: "Australia ETA" }, desc: { "zh-Hant": "出發前完成並截圖核准狀態。", en: "Complete before departure and save a screenshot of approval." } },
        { id: "insurance", title: { "zh-Hant": "旅遊保險", en: "Travel insurance" }, desc: { "zh-Hant": "手機留存保單號碼、承保內容與聯絡方式。", en: "Save the policy number, coverage, and contacts on the phone." } },
      ],
    },
    {
      title: { "zh-Hant": "訂單與票券", en: "Bookings and tickets" },
      items: [
        { id: "mel-hotel", title: { "zh-Hant": "墨爾本飯店", en: "Melbourne hotel" }, desc: { "zh-Hant": "5/24 - 5/27｜地址、訂單與入住資料離線截圖。", en: "May 24-27 | save the address, booking, and check-in details offline." } },
        { id: "syd-hotel", title: { "zh-Hant": "雪梨飯店", en: "Sydney hotel" }, desc: { "zh-Hant": "5/27 - 5/29｜地址、訂單與行李寄放規則離線截圖。", en: "May 27-29 | save the address, booking, and luggage-storage rules offline." } },
        { id: "domestic", title: { "zh-Hant": "JQ514 國內線", en: "JQ514 domestic flight" }, desc: { "zh-Hant": "13:00 起飛｜11:30 取行李｜預留還車與報到時間。", en: "13:00 departure | 11:30 bags | allow time for car return and check-in." } },
        { id: "car", title: { "zh-Hant": "墨爾本租車", en: "Melbourne rental car" }, desc: { "zh-Hant": "取還車資料、駕照、國際駕照與信用卡集中收納。", en: "Keep pickup, return, licence, IDP, and card documents together." } },
      ],
    },
    {
      title: { "zh-Hant": "行李與穿搭", en: "Packing and layers" },
      items: [
        { id: "layer", title: { "zh-Hant": "薄外套 / 保暖外套", en: "Light layer and one warmer outer layer" }, desc: { "zh-Hant": "薄外套用於市區與機場；保暖外套用於大洋路與 Phillip Island 夜間。", en: "Light layer for cities and airports; warmer layer for the coast and Phillip Island at night." } },
        { id: "shoes", title: { "zh-Hant": "好走的鞋", en: "Walking shoes" }, desc: { "zh-Hant": "Day 1、5、6 城市步行；穿已走習慣、不磨腳的鞋。", en: "City walking on Days 1, 5, and 6; wear broken-in shoes." } },
        { id: "adapter", title: { "zh-Hant": "澳規轉接頭", en: "AU plug adapter" }, desc: { "zh-Hant": "Type I 規格；供手機、相機與行動電源充電。", en: "Type I plug for phone, camera, and power-bank charging." } },
        { id: "license", title: { "zh-Hant": "駕照 / 國際駕照", en: "Driver's licence / IDP" }, desc: { "zh-Hant": "Day 2、3 自駕使用；與租車文件放在一起。", en: "Required for driving on Days 2 and 3; store with rental documents." } },
      ],
    },
  ],
  usefulLinks: [
    {
      title: { "zh-Hant": "航班與機場", en: "Flights and airports" },
      links: [
        { label: { "zh-Hant": "華航官網", en: "China Airlines" }, href: "https://www.china-airlines.com/" },
        { label: { "zh-Hant": "Jetstar 管理訂單", en: "Jetstar manage booking" }, href: "https://booking.jetstar.com/" },
        { label: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" }, href: "https://www.melbourneairport.com.au/" },
        { label: { "zh-Hant": "雪梨機場", en: "Sydney Airport" }, href: "https://www.sydneyairport.com.au/" },
      ],
    },
    {
      title: { "zh-Hant": "住宿與交通", en: "Stay and transport" },
      links: [
        { label: { "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" }, href: "https://www.dorsetthotels.com/dorsett-melbourne/" },
        { label: { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" }, href: "https://all.accor.com/hotel/9729/index.en.shtml" },
        { label: { "zh-Hant": "Sixt Australia", en: "Sixt Australia" }, href: "https://www.sixt.com.au/" },
        { label: { "zh-Hant": "PTV 墨爾本交通", en: "PTV Melbourne" }, href: "https://www.ptv.vic.gov.au/" },
        { label: { "zh-Hant": "Transport NSW", en: "Transport NSW" }, href: "https://transportnsw.info/" },
      ],
    },
    {
      title: { "zh-Hant": "卡片與哩程", en: "Cards and miles" },
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
      title: { "zh-Hant": "景點與票券", en: "Attractions and tickets" },
      links: [
        { label: { "zh-Hant": "Twelve Apostles", en: "Twelve Apostles" }, href: "https://www.parks.vic.gov.au/places-to-see/sites/twelve-apostles" },
        { label: { "zh-Hant": "Penguin Parade", en: "Penguin Parade" }, href: "https://www.penguins.org.au/attractions/penguin-parade/" },
        { label: { "zh-Hant": "Sydney Opera House", en: "Sydney Opera House" }, href: "https://www.sydneyoperahouse.com/" },
        { label: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" }, href: "https://www.visitsealife.com/sydney/" },
      ],
    },
    {
      title: { "zh-Hant": "餐桌與城市靈感", en: "Dining and city inspiration" },
      links: [
        { label: { "zh-Hant": "Wahlburgers Opera Quays", en: "Wahlburgers Opera Quays" }, href: "https://wahlburgers.com.au/locations/opera-quays/" },
        { label: { "zh-Hant": "MCA Cafe", en: "MCA Cafe" }, href: "https://www.mca.com.au/visit/dining/" },
        { label: { "zh-Hant": "Visit Melbourne", en: "Visit Melbourne" }, href: "https://whatson.melbourne.vic.gov.au/" },
        { label: { "zh-Hant": "Sydney.com", en: "Sydney.com" }, href: "https://www.sydney.com/" },
      ],
    },
  ],
  map: {
    fullRoute: {
      href: "https://www.google.com/maps/dir/Melbourne+Airport/Dorsett+Melbourne/Degraves+Street+Melbourne/State+Library+Victoria/Twelve+Apostles+Victoria/Loch+Ard+Gorge/Penguin+Parade+Phillip+Island/Sofitel+Sydney+Darling+Harbour/Wahlburgers+Opera+Quays/Sydney+Opera+House/SEA+LIFE+Sydney+Aquarium/QVB+Sydney/Sydney+Airport",
    },
    dayRoutes: [
      {
        label: { "zh-Hant": "Day 1 墨爾本市中心", en: "Day 1 Melbourne CBD" },
        driveTime: { "zh-Hant": "機場進市區後以步行為主", en: "After the airport arrival, the city moves mostly on foot" },
        embed: "https://www.google.com/maps?q=Degraves+Street+Melbourne+Flinders+Street+Station+State+Library+Victoria+Yarra+River&output=embed",
      },
      {
        label: { "zh-Hant": "Day 2 大洋路", en: "Day 2 Great Ocean Road" },
        driveTime: { "zh-Hant": "市區到十二門徒岩約 4 小時 15 分", en: "City to Twelve Apostles about 4 hr 15 min" },
        embed: "https://www.google.com/maps?q=Twelve+Apostles+Victoria+Loch+Ard+Gorge+London+Arch&output=embed",
      },
      {
        label: { "zh-Hant": "Day 3 Phillip Island", en: "Day 3 Phillip Island" },
        driveTime: { "zh-Hant": "市區到 Penguin Parade 約 2 小時", en: "City to Penguin Parade about 2 hr" },
        embed: "https://www.google.com/maps?q=Phillip+Island+Penguin+Parade+The+Cerberus+Beach+House&output=embed",
      },
      {
        label: { "zh-Hant": "Day 4 墨爾本飛雪梨", en: "Day 4 Melbourne to Sydney" },
        driveTime: { "zh-Hant": "市區 → 機場 → 達令港", en: "City → airport → Darling Harbour" },
        embed: "https://www.google.com/maps?q=Melbourne+Central+Emporium+Melbourne+Airport+Sydney+Airport+Sofitel+Sydney+Darling+Harbour&output=embed",
      },
      {
        label: { "zh-Hant": "Day 5 雪梨港灣", en: "Day 5 Sydney Harbour" },
        driveTime: { "zh-Hant": "這天以步行 / 市區交通為主", en: "This day is mostly walking and city transit" },
        embed: "https://www.google.com/maps?q=Wahlburgers+Opera+Quays+Sydney+Opera+House+SEA+LIFE+Sydney+Aquarium+Darling+Harbour&output=embed",
      },
      {
        label: { "zh-Hant": "Day 6 市中心到機場", en: "Day 6 CBD to airport" },
        driveTime: { "zh-Hant": "QVB → 飯店拿行李 → 機場", en: "QVB → hotel bags → airport" },
        embed: "https://www.google.com/maps?q=QVB+Sydney+Hyde+Park+Sofitel+Sydney+Darling+Harbour+Sydney+Airport&output=embed",
      },
    ],
    points: [
      {
        title: { "zh-Hant": "Dorsett Melbourne", en: "Dorsett Melbourne" },
        note: { "zh-Hant": "墨爾本三晚住宿", en: "Melbourne base" },
        driveTime: { "zh-Hant": "從機場開車約 35 分", en: "About 35 min from the airport" },
        open: "https://www.google.com/maps/search/?api=1&query=Dorsett+Melbourne",
        embed: "https://www.google.com/maps?q=Dorsett+Melbourne&output=embed",
      },
      {
        title: { "zh-Hant": "Degraves Street", en: "Degraves Street" },
        note: { "zh-Hant": "Day 1 咖啡街區", en: "Day 1 coffee lane" },
        driveTime: { "zh-Hant": "Day 1 早午餐起點", en: "Day 1 brunch start" },
        open: "https://www.google.com/maps/search/?api=1&query=Degraves+Street+Melbourne",
        embed: "https://www.google.com/maps?q=Degraves+Street+Melbourne&output=embed",
      },
      {
        title: { "zh-Hant": "十二門徒岩", en: "Twelve Apostles" },
        note: { "zh-Hant": "大洋路代表性景觀", en: "Signature Great Ocean Road view" },
        driveTime: { "zh-Hant": "從市區開車約 4 小時 15 分", en: "About 4 hr 15 min from central Melbourne" },
        open: "https://www.google.com/maps/search/?api=1&query=Twelve+Apostles+Victoria",
        embed: "https://www.google.com/maps?q=Twelve+Apostles+Victoria&output=embed",
      },
      {
        title: { "zh-Hant": "Loch Ard Gorge", en: "Loch Ard Gorge" },
        note: { "zh-Hant": "接在十二門徒岩之後很順", en: "Flows naturally after the Apostles" },
        driveTime: { "zh-Hant": "距離十二門徒岩約 6 分鐘", en: "Around 6 min from the Twelve Apostles" },
        open: "https://www.google.com/maps/search/?api=1&query=Loch+Ard+Gorge",
        embed: "https://www.google.com/maps?q=Loch+Ard+Gorge&output=embed",
      },
      {
        title: { "zh-Hant": "Penguin Parade", en: "Penguin Parade" },
        note: { "zh-Hant": "Day 3 晚間固定行程", en: "Fixed evening event on Day 3" },
        driveTime: { "zh-Hant": "從墨爾本開車約 2 小時", en: "About 2 hr from Melbourne" },
        open: "https://www.google.com/maps/search/?api=1&query=Penguin+Parade+Phillip+Island",
        embed: "https://www.google.com/maps?q=Penguin+Parade+Phillip+Island&output=embed",
      },
      {
        title: { "zh-Hant": "Nobbies Centre", en: "Nobbies Centre" },
        note: { "zh-Hant": "企鵝歸巢前的海岸線步道", en: "A coastal boardwalk before Penguin Parade" },
        driveTime: { "zh-Hant": "距離企鵝歸巢園區約 10 分鐘", en: "About 10 min from Penguin Parade" },
        open: "https://www.google.com/maps/search/?api=1&query=Nobbies+Centre+Phillip+Island",
        embed: "https://www.google.com/maps?q=Nobbies+Centre+Phillip+Island&output=embed",
      },
      {
        title: { "zh-Hant": "Sofitel Sydney Darling Harbour", en: "Sofitel Sydney Darling Harbour" },
        note: { "zh-Hant": "雪梨兩晚住宿", en: "Sydney base" },
        driveTime: { "zh-Hant": "Day 5、Day 6 住宿中心", en: "Base for Days 5 and 6" },
        open: "https://www.google.com/maps/search/?api=1&query=Sofitel+Sydney+Darling+Harbour",
        embed: "https://www.google.com/maps?q=Sofitel+Sydney+Darling+Harbour&output=embed",
      },
      {
        title: { "zh-Hant": "Wahlburgers Opera Quays", en: "Wahlburgers Opera Quays" },
        note: { "zh-Hant": "可看歌劇院的港邊早餐", en: "Breakfast with an Opera House view" },
        driveTime: { "zh-Hant": "從達令港出發約 12 分", en: "About 12 min from Darling Harbour" },
        open: "https://www.google.com/maps/search/?api=1&query=Wahlburgers+Opera+Quays",
        embed: "https://www.google.com/maps?q=Wahlburgers+Opera+Quays&output=embed",
      },
      {
        title: { "zh-Hant": "MCA Cafe", en: "MCA Cafe" },
        note: { "zh-Hant": "另一個港灣早餐 / 午間選項", en: "Another harbour breakfast or lunch option" },
        driveTime: { "zh-Hant": "從達令港出發約 11 分", en: "About 11 min from Darling Harbour" },
        open: "https://www.google.com/maps/search/?api=1&query=MCA+Cafe+Sydney",
        embed: "https://www.google.com/maps?q=MCA+Cafe+Sydney&output=embed",
      },
      {
        title: { "zh-Hant": "Sydney Opera House", en: "Sydney Opera House" },
        note: { "zh-Hant": "Day 5 的港灣主景", en: "The main harbour icon on Day 5" },
        driveTime: { "zh-Hant": "從達令港出發約 13 分", en: "About 13 min from Darling Harbour" },
        open: "https://www.google.com/maps/search/?api=1&query=Sydney+Opera+House",
        embed: "https://www.google.com/maps?q=Sydney+Opera+House&output=embed",
      },
      {
        title: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" },
        note: { "zh-Hant": "Day 5 下午的室內段", en: "Day 5 indoor afternoon segment" },
        driveTime: { "zh-Hant": "從達令港出發很近", en: "Very close to Darling Harbour" },
        open: "https://www.google.com/maps/search/?api=1&query=SEA+LIFE+Sydney+Aquarium",
        embed: "https://www.google.com/maps?q=SEA+LIFE+Sydney+Aquarium&output=embed",
      },
      {
        title: { "zh-Hant": "QVB", en: "QVB" },
        note: { "zh-Hant": "Day 6 最後一段市中心", en: "Day 6 final city window" },
        driveTime: { "zh-Hant": "Day 6 午餐與最後採買", en: "Day 6 lunch and final shopping" },
        open: "https://www.google.com/maps/search/?api=1&query=QVB+Sydney",
        embed: "https://www.google.com/maps?q=QVB+Sydney&output=embed",
      },
    ],
  },
};

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTripContext(date = new Date()) {
  const today = localDateKey(date);
  const day = data.days.find((item) => item.date === today) || null;

  if (today < TRIP_START) {
    const current = new Date(`${today}T12:00:00`);
    const departure = new Date(`${TRIP_START}T12:00:00`);
    return { phase: "before", daysUntil: Math.ceil((departure - current) / 86400000), day: null };
  }
  if (today > TRIP_END) return { phase: "after", day: null };
  if (today === TRIP_START) return { phase: "departure", day: data.days[0] };
  if (today === TRIP_END) return { phase: "return", day: data.days.at(-1) };
  return { phase: "active", day: day || data.days[0] };
}

function getHashParts() {
  return window.location.hash.replace(/^#/, "").split("/").filter(Boolean);
}

function getInitialPage() {
  const [hashPage] = getHashParts();
  return PAGE_IDS.includes(hashPage) ? hashPage : "overview";
}

function getInitialBudgetFilter() {
  const storedBudgetFilter = storage.get(STORAGE_KEYS.budgetFilter);
  return ["all", "actual", "estimated"].includes(storedBudgetFilter) ? storedBudgetFilter : "all";
}

function getInitialSelectedDay() {
  const [, hashDay] = getHashParts();
  if (data.days.some((day) => day.id === hashDay)) return hashDay;

  const tripContext = getTripContext();
  if (["active", "departure", "return"].includes(tripContext.phase) && tripContext.day) return tripContext.day.id;

  const storedDay = storage.get(STORAGE_KEYS.day);
  return data.days.some((day) => day.id === storedDay) ? storedDay : data.days[0].id;
}

function getInitialExchangeRate() {
  const value = Number(storage.get(STORAGE_KEYS.exchangeRate));
  return Number.isFinite(value) && value >= 1 && value <= 100 ? value : DEFAULT_TWD_RATE;
}

const state = {
  lang: storage.get(STORAGE_KEYS.lang) || "zh-Hant",
  currency: storage.get(STORAGE_KEYS.currency) || "TWD",
  page: getInitialPage(),
  budgetFilter: getInitialBudgetFilter(),
  selectedDay: getInitialSelectedDay(),
  exchangeRate: getInitialExchangeRate(),
};

function getText(entry) {
  if (entry == null) return "";
  if (typeof entry === "string") return entry;
  return entry?.[state.lang] ?? entry?.["zh-Hant"] ?? "";
}

function formatCurrency(aud, currency = state.currency) {
  const factor = currency === "TWD" ? state.exchangeRate : 1;
  return `${CURRENCY_META[currency].symbol}${Math.round(aud * factor).toLocaleString()}`;
}

function formatDateLabel(dateString, compact = false) {
  const date = new Date(`${dateString}T12:00:00`);
  if (state.lang === "zh-Hant") {
    const weekdays = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return compact ? `${month}/${day}・${weekdays[date.getDay()]}` : `${date.getFullYear()} / ${month} / ${day} ・ ${weekdays[date.getDay()]}`;
  }

  return new Intl.DateTimeFormat("en-AU", compact ? { month: "short", day: "numeric", weekday: "short" } : { year: "numeric", month: "short", day: "numeric", weekday: "short" }).format(date);
}

function renderTag(tag, className = "travel-tag") {
  return `<span class="${className}${tag.tone ? ` tone-${tag.tone}` : ""}">${getText(tag.label ?? tag)}</span>`;
}

function renderItems(target, items, template) {
  if (!target) return;
  target.innerHTML = items.map(template).join("");
}

function renderBulletCards(target, items) {
  renderItems(
    target,
    items,
    (item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`
  );
}

function getSelectedDay() {
  return data.days.find((day) => day.id === state.selectedDay) || data.days[0];
}

function getSelectedDayIndex() {
  const index = data.days.findIndex((day) => day.id === state.selectedDay);
  return index >= 0 ? index : 0;
}

function cacheDom() {
  const ids = [
    "pageProgress", "pageAnnouncer", "networkStatus", "heroKicker", "heroTitle", "heroSubtitle", "heroChipRow", "heroLead", "heroDestinations",
    "heroRhythm", "heroSummary", "tripNowCard", "tripSnapshotGrid", "tripThemeChips", "paceStrip", "routeFlowGrid", "journeyHighlights",
    "dayPreviewGrid", "practicalInfoGrid", "flightDataStatus", "flightCards", "flightNotes", "airportGuides", "stayDataStatus", "stayCards",
    "stayAdvantages", "moveDayTimeline", "moveOptions", "daySelector", "dayDetail", "mapDayRoutes", "mapList", "mapFrame", "fullRouteLink",
    "exchangeRateInput", "budgetSelectedHeading", "budgetHighlights", "budgetTableBody", "budgetCards", "souvenirsGrid", "souvenirTips",
    "souvenirSources", "checklistGroups", "linksGrid", "moreMenu", "moreMenuButton", "installAppButton"
  ];
  ids.forEach((id) => {
    dom[id] = document.getElementById(id);
  });
  dom.budgetFilterButtons = Array.from(document.querySelectorAll("[data-budget-filter]"));
}

function checklistState() {
  try {
    return JSON.parse(storage.get(STORAGE_KEYS.checklist) || "{}");
  } catch (error) {
    return {};
  }
}

function saveChecklist(next) {
  storage.set(STORAGE_KEYS.checklist, JSON.stringify(next));
}

function scrollToMainContent() {
  const target = document.getElementById("mainContent");
  if (!target) return;
  target.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

function announce(message) {
  if (!dom.pageAnnouncer || !message) return;
  dom.pageAnnouncer.textContent = "";
  window.setTimeout(() => {
    dom.pageAnnouncer.textContent = message;
  }, 20);
}

function syncUrlHash(mode = "replace") {
  const dayPath = state.page === "itinerary" ? `/${state.selectedDay}` : "";
  const nextHash = state.page === "overview" ? "" : `#${state.page}${dayPath}`;
  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
  window.history[`${mode}State`](null, "", nextUrl);
}

function applyUrlState() {
  const [hashPage, hashDay] = getHashParts();
  const nextPage = PAGE_IDS.includes(hashPage) ? hashPage : "overview";
  const dayChanged = nextPage === "itinerary" && data.days.some((day) => day.id === hashDay) && hashDay !== state.selectedDay;

  state.page = nextPage;
  if (dayChanged) {
    state.selectedDay = hashDay;
    storage.set(STORAGE_KEYS.day, hashDay);
    renderItinerary();
  }
  updateDocumentTitle();
  syncPageNavigation();
}

function updateDocumentTitle() {
  const titles = {
    overview: t[state.lang].navOverview,
    flights: t[state.lang].navFlights,
    stays: t[state.lang].navStays,
    itinerary: t[state.lang].navItinerary,
    map: t[state.lang].navMap,
    budget: t[state.lang].navBudget,
    souvenirs: t[state.lang].navSouvenirs,
    notes: t[state.lang].navNotes,
  };

  document.title = `2026 Australia Travel Guide | ${titles[state.page]}`;
}

function renderI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (t[state.lang][key]) node.textContent = t[state.lang][key];
  });
  updateDocumentTitle();
}

function renderTripNow() {
  const context = getTripContext();
  const fallbackDay = context.day || data.days[0];
  let label = t[state.lang].tripAfterLabel;
  let title = state.lang === "zh-Hant" ? "墨爾本、海岸公路與雪梨港灣" : "Melbourne, the coast road, and Sydney Harbour";
  let note = t[state.lang].tripDatePassed;
  let metrics = [
    [state.lang === "zh-Hant" ? "日期" : "Dates", state.lang === "zh-Hant" ? "2026.05.23 - 05.30" : "May 23 - May 30, 2026"],
    [state.lang === "zh-Hant" ? "主行程" : "Core trip", state.lang === "zh-Hant" ? "6 天 5 夜" : "6 days / 5 nights"],
    [t[state.lang].quickMove, "Melbourne → Sydney"],
  ];
  let actions = `
    <button class="trip-now-action primary" type="button" data-open-day="${fallbackDay.id}" data-target-page="itinerary">${t[state.lang].openFirstDay}</button>
    <button class="trip-now-action" type="button" data-open-map-day="${fallbackDay.id}">${t[state.lang].openRouteMap}</button>
  `;

  if (context.phase === "before") {
    label = t[state.lang].tripBeforeLabel;
    title = state.lang === "zh-Hant" ? `${context.daysUntil} ${t[state.lang].daysUntilTrip}` : `${context.daysUntil} ${t[state.lang].daysUntilTrip}`;
    note = state.lang === "zh-Hant" ? "行前確認｜護照、ETA、航班、長途日裝備" : "Pre-departure | passport, ETA, flights, and road-day gear";
    metrics = [
      [t[state.lang].quickStart, "05/23 · 23:30 CI0057"],
      [state.lang === "zh-Hant" ? "第一站" : "First stop", "Melbourne CBD"],
      [state.lang === "zh-Hant" ? "先準備" : "Pack first", state.lang === "zh-Hant" ? "護照 / ETA / 薄外套" : "Passport / ETA / light layer"],
    ];
    actions = `
      <button class="trip-now-action primary" type="button" data-page-link="notes">${t[state.lang].openDepartureNotes}</button>
      <button class="trip-now-action" type="button" data-open-day="day1" data-target-page="itinerary">${t[state.lang].openFirstDay}</button>
    `;
  }

  if (context.phase === "active" && context.day) {
    const day = context.day;
    label = `${t[state.lang].tripActiveLabel}｜${getText(day.day)}`;
    title = getText(day.theme);
    note = `${formatDateLabel(day.date)} · ${getText(day.city)}`;
    metrics = [
      [t[state.lang].quickStart, getText(day.glance.start.value)],
      [t[state.lang].quickWear, getText(day.glance.wear.value)],
      [t[state.lang].quickMove, getText(day.glance.transport.value)],
    ];
    actions = `
      <button class="trip-now-action primary" type="button" data-open-day="${day.id}" data-target-page="itinerary">${t[state.lang].openDayGuide}</button>
      <button class="trip-now-action" type="button" data-open-map-day="${day.id}">${t[state.lang].openRouteMap}</button>
      <button class="trip-now-action" type="button" data-page-link="stays">${t[state.lang].openStay}</button>
    `;
  }

  if (context.phase === "departure") {
    label = t[state.lang].tripDepartureLabel;
    title = state.lang === "zh-Hant" ? "23:30 從桃園出發，明早抵達墨爾本" : "Depart Taoyuan at 23:30 and land in Melbourne tomorrow";
    note = state.lang === "zh-Hant" ? "隨身行李｜護照、ETA、充電設備、薄外套" : "Carry-on | passport, ETA, charging gear, and a light layer";
    metrics = [
      [t[state.lang].quickStart, "CI0057 · TPE T2"],
      [state.lang === "zh-Hant" ? "抵達" : "Arrival", "05/24 · 10:40 MEL T2"],
      [state.lang === "zh-Hant" ? "抵達後" : "After landing", state.lang === "zh-Hant" ? "通關 / 取車 / 進市區" : "Immigration / car / city"],
    ];
    actions = `
      <button class="trip-now-action primary" type="button" data-page-link="flights">${state.lang === "zh-Hant" ? "查看航班" : "Open flights"}</button>
      <button class="trip-now-action" type="button" data-open-day="day1" data-target-page="itinerary">${t[state.lang].openFirstDay}</button>
    `;
  }

  if (context.phase === "return") {
    label = t[state.lang].tripReturnLabel;
    title = state.lang === "zh-Hant" ? "05:40 返抵台北" : "Arrive in Taipei at 05:40";
    note = state.lang === "zh-Hant" ? "下機前確認｜護照、退稅單據、隨身電子用品" : "Before leaving the aircraft | passport, tax papers, electronics";
    metrics = [
      [state.lang === "zh-Hant" ? "航班" : "Flight", "CI0052"],
      [state.lang === "zh-Hant" ? "抵達" : "Arrival", "05:40 · TPE T2"],
      [state.lang === "zh-Hant" ? "最後確認" : "Final check", state.lang === "zh-Hant" ? "護照 / 單據 / 隨身物" : "Passport / papers / carry-on"],
    ];
    actions = `<button class="trip-now-action primary" type="button" data-open-day="day6" data-target-page="itinerary">${state.lang === "zh-Hant" ? "重看最後一天" : "Review the final day"}</button>`;
  }

  dom.tripNowCard.innerHTML = `
    <div class="trip-now-topline">
      <span class="trip-status-dot phase-${context.phase}" aria-hidden="true"></span>
      <span class="trip-now-label">${label}</span>
      <span class="trip-now-data">${t[state.lang].guideDataNote}</span>
    </div>
    <div class="trip-now-title">${title}</div>
    <div class="trip-now-note">${note}</div>
    <div class="trip-now-metrics">
      ${metrics.map(([metricLabel, value]) => `<div><span>${metricLabel}</span><strong>${value}</strong></div>`).join("")}
    </div>
    <div class="trip-now-actions">${actions}</div>
  `;
}

function renderHero() {
  const hero = data.trip.hero;

  dom.heroKicker.textContent = getText(hero.kicker);
  dom.heroTitle.textContent = getText(hero.title);
  dom.heroSubtitle.textContent = getText(hero.subtitle);
  dom.heroLead.textContent = getText(hero.lead);
  dom.heroDestinations.textContent = getText(hero.destinations);

  dom.heroChipRow.innerHTML = hero.chips.map((chip) => `<span class="hero-chip">${getText(chip)}</span>`).join("");
  dom.heroRhythm.innerHTML = data.trip.heroRhythm.map((item) => `<span class="rhythm-chip tone-${item.tone}">${getText(item.label)}</span>`).join("");
  dom.heroSummary.innerHTML = data.trip.heroSummary
    .map(
      (item) => `
        <article class="hero-summary-card">
          <div class="hero-summary-label">${getText(item.label)}</div>
          <div class="hero-summary-value">${getText(item.value)}</div>
          <div class="hero-summary-note">${getText(item.note)}</div>
        </article>
      `
    )
    .join("");
  renderTripNow();
}

function renderOverview() {
  dom.tripSnapshotGrid.innerHTML = data.trip.snapshot
    .map(
      (item) => `
        <article class="snapshot-card">
          <div class="snapshot-label">${getText(item.label)}</div>
          <div class="snapshot-value">${getText(item.value)}</div>
          <div class="snapshot-note">${getText(item.note)}</div>
        </article>
      `
    )
    .join("");

  dom.tripThemeChips.innerHTML = data.trip.themes.map((item) => `<span class="theme-chip">${getText(item)}</span>`).join("");

  dom.paceStrip.innerHTML = data.trip.pace
    .map(
      (item) => `
        <article class="pace-card">
          <div class="pace-title">${getText(item.title)}</div>
          <div class="pace-desc">${getText(item.desc)}</div>
        </article>
      `
    )
    .join("");

  dom.routeFlowGrid.innerHTML = data.trip.routeFlow
    .map(
      (item) => `
        <article class="route-overview-card">
          <div class="route-overview-top">
            <div>
              <div class="route-overview-title">${getText(item.title)}</div>
              <div class="route-overview-note">${getText(item.days)}</div>
            </div>
            <span class="route-chip">${getText(item.meta)}</span>
          </div>
          <div class="route-overview-body">${getText(item.desc)}</div>
        </article>
      `
    )
    .join("");

  dom.journeyHighlights.innerHTML = data.trip.highlights
    .map(
      (item) => `
        <article class="highlight-card">
          <div class="highlight-image-wrap">
            <img class="highlight-image" src="${item.image}" alt="${getText(item.alt)}" loading="lazy" decoding="async" />
          </div>
          <div class="highlight-body">
            <div class="eyebrow">${getText(item.meta)}</div>
            <div class="highlight-title">${getText(item.title)}</div>
            <div class="highlight-desc">${getText(item.desc)}</div>
          </div>
        </article>
      `
    )
    .join("");

  dom.dayPreviewGrid.innerHTML = data.days
    .map(
      (day) => `
        <button class="day-preview-card" type="button" data-open-day="${day.id}" data-target-page="itinerary" aria-label="${getText(day.day)}">
          <div class="day-preview-top">
            <div class="day-preview-city">${getText(day.city)}</div>
            <div class="day-preview-date">${getText(day.day)} · ${formatDateLabel(day.date, true)}</div>
          </div>
          ${renderTag(day.status, "status-pill")}
          <div class="day-preview-theme">${getText(day.theme)}</div>
          <div class="day-preview-highlights">
            ${day.highlights.slice(0, 4).map((item) => `<span class="day-preview-highlight">${getText(item)}</span>`).join("")}
          </div>
          <div class="tag-row">${day.tags.map((tag) => renderTag(tag)).join("")}</div>
          <div class="day-preview-desc">${getText(day.preview)}</div>
          <div class="day-preview-cta">${t[state.lang].previewOpen}</div>
        </button>
      `
    )
    .join("");

  dom.practicalInfoGrid.innerHTML = data.trip.practicalInfo
    .map(
      (item) => `
        <details class="practical-card" ${item.open ? "open" : ""}>
          <summary class="practical-summary">
            <div class="practical-summary-copy">
              <div class="practical-title">${getText(item.title)}</div>
              <div class="practical-note">${getText(item.note)}</div>
            </div>
          </summary>
          <div class="practical-body">
            <div class="practical-bullets">
              ${item.bullets.map((bullet) => `<div class="practical-bullet">${getText(bullet)}</div>`).join("")}
            </div>
            ${
              item.links
                ? `<div class="practical-links">${item.links
                    .map(
                      (link) => `
                        <a class="practical-link" href="${link.href}" target="_blank" rel="noreferrer" aria-label="${getText(link.label)}">
                          <span>${getText(link.label)}</span>
                          <span class="link-button-meta">${t[state.lang].openLink}</span>
                        </a>
                      `
                    )
                    .join("")}</div>`
                : ""
            }
          </div>
        </details>
      `
    )
    .join("");
}

function renderFlights() {
  const formatStop = (stop) =>
    [`${t[state.lang].countryLabel}｜${getText(stop.country)}`, `${t[state.lang].cityLabel}｜${getText(stop.city)}`, `${t[state.lang].airportLabel}｜${getText(stop.airport)}`, `${t[state.lang].terminalLabel}｜${getText(stop.terminal)}`].join("<br />");

  dom.flightDataStatus.innerHTML = `<span class="status-pill tone-fixed">${t[state.lang].fixedSchedule}</span><span>${t[state.lang].flightDataStatus}</span>`;

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
          <div class="info-line"><span class="info-label">${t[state.lang].fromLabel}</span><span class="info-value">${formatStop(flight.from)}</span></div>
          <div class="info-line"><span class="info-label">${t[state.lang].toLabel}</span><span class="info-value">${formatStop(flight.to)}</span></div>
        </article>
      `
    )
    .join("");

  renderBulletCards(dom.flightNotes, data.flightNotes);
  renderBulletCards(dom.airportGuides, data.airportGuides);
}

function renderStays() {
  dom.stayDataStatus.innerHTML = `<span class="status-pill tone-flexible">${t[state.lang].stayReference}</span><span>${t[state.lang].stayDataStatus}</span>`;
  dom.stayCards.innerHTML = data.stays.hotels
    .map(
      (hotel) => `
        <article class="stay-card">
          <div class="stay-image-wrap">
            <img class="stay-image" src="${hotel.image}" alt="${getText(hotel.imageAlt)}" loading="lazy" decoding="async" />
          </div>
          <div class="stay-content">
            <div class="flight-topline">
              <span class="day-chip">${getText(hotel.area)}</span>
              <span class="date-label">${getText(hotel.dates)}</span>
            </div>
            <div class="route-title">${getText(hotel.name)}</div>
            <div class="souvenir-subname">${getText(hotel.subname)}</div>
            <div class="pill-row">${hotel.tags.map((tag) => renderTag(tag, "pill")).join("")}</div>
            <div class="bullet-desc">${getText(hotel.note)}</div>
            <div class="stay-price">
              <div class="price-value">${formatCurrency(hotel.priceAud)}</div>
              <div class="budget-original">${formatCurrency(hotel.priceAud, "AUD")}</div>
            </div>
            <div class="stay-footer">
              <div class="info-value">${getText(hotel.feature)}</div>
              <a class="hotel-link" href="${hotel.href}" target="_blank" rel="noreferrer" aria-label="${getText(hotel.name)}">${t[state.lang].openLink}</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  renderBulletCards(dom.stayAdvantages, data.stays.advantages);

  dom.moveDayTimeline.innerHTML = data.stays.moveDayTimeline
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

  dom.moveOptions.innerHTML = data.stays.moveOptions
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
          <div class="info-line"><span class="info-label">${t[state.lang].costCardLabel}</span><span class="info-value">${item.costAud ? `${formatCurrency(item.costAud)}${getText(item.costSuffix)}` : getText(item.cost)}</span></div>
          ${
            item.specs
              ? `<div class="route-spec-grid">${item.specs
                  .map(
                    (spec) => `
                      <div class="route-spec-card">
                        <div class="info-label">${getText(spec.label)}</div>
                        <div class="info-value">${getText(spec.value)}</div>
                      </div>
                    `
                  )
                  .join("")}</div>`
              : ""
          }
        </article>
      `
    )
    .join("");
}

function renderItinerary() {
  const tripContext = getTripContext();
  const currentDayId = tripContext.phase === "active" ? tripContext.day?.id : null;

  dom.daySelector.innerHTML = data.days
    .map(
      (day) => `
        <button class="day-selector-btn ${day.id === state.selectedDay ? "active" : ""} ${day.id === currentDayId ? "is-today" : ""}" type="button" data-day-select="${day.id}" aria-label="${getText(day.day)}" aria-pressed="${day.id === state.selectedDay}">
          <div class="day-selector-day">${getText(day.day)}</div>
          <div class="day-selector-city">${getText(day.city)}</div>
          <div class="day-selector-meta">${formatDateLabel(day.date, true)}</div>
          <div class="day-selector-status">${getText(day.status.label)}</div>
        </button>
      `
    )
    .join("");

  window.requestAnimationFrame(() => {
    const activeButton = dom.daySelector.querySelector(".day-selector-btn.active");
    if (!activeButton || dom.daySelector.scrollWidth <= dom.daySelector.clientWidth) return;
    const left = activeButton.offsetLeft - (dom.daySelector.clientWidth - activeButton.offsetWidth) / 2;
    dom.daySelector.scrollTo({ left: Math.max(0, left), behavior: "auto" });
  });

  const day = getSelectedDay();
  const dayIndex = getSelectedDayIndex();
  const previousDay = data.days[dayIndex - 1] || null;
  const nextDay = data.days[dayIndex + 1] || null;

  dom.dayDetail.innerHTML = `
    <article class="day-guide-card">
      <div class="day-guide-hero">
        <img class="day-guide-image" src="${day.image}" alt="${getText(day.imageAlt)}" loading="lazy" decoding="async" />
        <div class="day-guide-overlay">
          <div class="day-guide-dayline">
            <span class="day-chip">${getText(day.day)}</span>
            <span class="day-guide-date">${formatDateLabel(day.date)}</span>
            ${renderTag(day.status, "status-pill")}
          </div>
          <h3 class="day-guide-city">${getText(day.city)}</h3>
          <div class="day-guide-theme">${getText(day.theme)}</div>
          <p class="day-guide-intro">${getText(day.intro)}</p>
          <div class="tag-row">${day.tags.map((tag) => renderTag(tag)).join("")}</div>
        </div>
      </div>
      <div class="day-guide-content">
        <section class="content-panel">
          <div class="panel-kicker">${t[state.lang].todayAtGlanceTitle}</div>
          <div class="glance-grid">
            ${DAY_GLANCE_ORDER.map(
              (key) => `
                <article class="glance-card">
                  <div class="glance-label">${t[state.lang][`glance${key.charAt(0).toUpperCase()}${key.slice(1)}`]}</div>
                  <div class="glance-value">${getText(day.glance[key].value)}</div>
                  <div class="glance-note">${getText(day.glance[key].note)}</div>
                </article>
              `
            ).join("")}
          </div>
        </section>
        <section class="content-panel">
          <div class="panel-kicker">${t[state.lang].routeFlowTitle}</div>
          <div class="route-flow-list">
            ${day.routeFlow
              .map(
                (item) => `
                  <article class="route-flow-card">
                    <div class="route-flow-period">${getText(item.period)}</div>
                    <div class="route-flow-title">${getText(item.title)}</div>
                    <div class="route-flow-desc">${getText(item.desc)}</div>
                    ${item.tags ? `<div class="tag-row route-flow-tags">${item.tags.map((tag) => renderTag(tag)).join("")}</div>` : ""}
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
        <section class="content-panel">
          <div class="panel-kicker">${t[state.lang].timelineTitle}</div>
          <div class="timeline-track">
            ${day.timeline
              .map(
                (item) => `
                  <article class="timeline-event ${item.eventClass}">
                    <div class="timeline-event-time">${getText(item.time)}</div>
                    <div class="timeline-event-body">
                      <span class="timeline-event-tag">${getText(item.label)}</span>
                      <div class="timeline-event-title">${getText(item.title)}</div>
                      <div class="timeline-event-note">${getText(item.note)}</div>
                      ${item.flags ? `<div class="timeline-flags">${item.flags.map((flag) => renderTag(flag, "timeline-flag")).join("")}</div>` : ""}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
        <section class="content-panel">
          <div class="panel-kicker">${t[state.lang].reminderTitle}</div>
          <div class="reminder-grid">
            ${day.reminders.map((item) => `<article class="reminder-card"><div class="bullet-desc">${getText(item)}</div></article>`).join("")}
          </div>
        </section>
        <div class="day-detail-nav">
          <button class="day-detail-nav-btn ${previousDay ? "" : "disabled"}" type="button" ${previousDay ? `data-day-select="${previousDay.id}"` : "disabled"} aria-label="${t[state.lang].previousDay}">
            <span class="day-detail-nav-label">${t[state.lang].previousDay}</span>
            <span class="day-detail-nav-value">${previousDay ? `${getText(previousDay.day)} · ${getText(previousDay.city)}` : "—"}</span>
          </button>
          <button class="day-detail-nav-btn ${nextDay ? "" : "disabled"}" type="button" ${nextDay ? `data-day-select="${nextDay.id}"` : "disabled"} aria-label="${t[state.lang].nextDay}">
            <span class="day-detail-nav-label">${t[state.lang].nextDay}</span>
            <span class="day-detail-nav-value">${nextDay ? `${getText(nextDay.day)} · ${getText(nextDay.city)}` : "—"}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderBudget() {
  const rows = state.budgetFilter === "all" ? data.budgetRows : data.budgetRows.filter((item) => item.status === state.budgetFilter);
  const totalAud = rows.reduce((sum, item) => sum + item.aud, 0);
  const bookedAud = rows.filter((item) => item.booked).reduce((sum, item) => sum + item.aud, 0);
  const perPersonAud = totalAud / 2;
  const averageDailyAud = totalAud / data.days.length;
  const flexibleAud = totalAud - bookedAud;
  const getStatusLabel = (item) => (item.status === "actual" ? t[state.lang].budgetStatusActual : t[state.lang].budgetStatusEstimated);

  dom.exchangeRateInput.value = state.exchangeRate.toFixed(1);
  dom.budgetSelectedHeading.textContent = state.currency;

  dom.budgetFilterButtons.forEach((button) => {
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

  const [primary, ...secondary] = budgetHighlights;

  dom.budgetHighlights.innerHTML = `
    <article class="budget-overview-card budget-highlight-card budget-highlight-primary">
      <div class="summary-label">${primary.label}</div>
      <div class="budget-main">${formatCurrency(primary.aud)}</div>
      <div class="budget-original">${formatCurrency(primary.aud, "AUD")}</div>
      <div class="budget-overview-note">${primary.note}</div>
    </article>
    <div class="budget-overview-stats">
      ${secondary
        .map(
          (item) => `
            <article class="budget-highlight-card">
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

  dom.budgetTableBody.innerHTML = rows
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

  dom.budgetCards.innerHTML = rows
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
  dom.souvenirsGrid.innerHTML = data.souvenirs
    .map(
      (item) => `
        <article class="souvenir-card">
          <a class="souvenir-image-link" href="${item.href}" target="_blank" rel="noreferrer" aria-label="${getText(item.name)}">
            <img class="souvenir-image" src="${item.image}" alt="${getText(item.name)}" loading="lazy" decoding="async" />
          </a>
          <div class="souvenir-body">
            <div class="souvenir-heading">
              <div class="route-title">${getText(item.name)}</div>
              <div class="souvenir-subname">${getText(item.subname)}</div>
            </div>
            <div class="pill-row">${item.tags.map((tag) => renderTag(tag, "pill")).join("")}</div>
            <div class="souvenir-note">${getText(item.note)}</div>
            <div class="souvenir-meta">
              <div class="info-line"><span class="info-label">${getText({ "zh-Hant": "怎麼買", en: "How to buy" })}</span><span class="info-value">${getText(item.buy)}</span></div>
              <div class="info-line"><span class="info-label">${getText({ "zh-Hant": "價格", en: "Price" })}</span><span class="info-value">${getText(item.range)}</span></div>
            </div>
            <a class="hotel-link" href="${item.href}" target="_blank" rel="noreferrer" aria-label="${getText(item.name)}">${t[state.lang].openLink}</a>
          </div>
        </article>
      `
    )
    .join("");

  renderBulletCards(dom.souvenirTips, data.souvenirTips);
  renderBulletCards(dom.souvenirSources, data.souvenirSources);
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
                  <a class="link-button" href="${link.href}" target="_blank" rel="noreferrer" aria-label="${getText(link.label)}">
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

function setMapEmbed(embed) {
  if (!embed || !dom.mapFrame) return;

  dom.mapFrame.src = embed;
  dom.mapFrame.dataset.currentEmbed = embed;

  document.querySelectorAll(".map-day-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.mapEmbed === embed);
  });

  document.querySelectorAll(".map-card").forEach((card) => {
    const button = card.querySelector("[data-map-embed]");
    card.classList.toggle("active", button?.dataset.mapEmbed === embed);
  });
}

function renderMap() {
  const fallbackEmbed = data.map.dayRoutes[0].embed;
  const currentEmbed = dom.mapFrame?.dataset.currentEmbed || fallbackEmbed;

  dom.fullRouteLink.href = data.map.fullRoute.href;

  dom.mapDayRoutes.innerHTML = data.map.dayRoutes
    .map(
      (route) => `
        <button class="map-day-button ${route.embed === currentEmbed ? "active" : ""}" type="button" data-map-embed="${route.embed}" aria-label="${getText(route.label)}" aria-pressed="${route.embed === currentEmbed}">
          <span>${getText(route.label)}</span>
          <span class="map-drive-time">${getText(route.driveTime)}</span>
        </button>
      `
    )
    .join("");

  dom.mapList.innerHTML = data.map.points
    .map(
      (point) => `
        <article class="map-card ${point.embed === currentEmbed ? "active" : ""}">
          <button class="map-card-button" type="button" data-map-embed="${point.embed}" aria-label="${getText(point.title)}">
            <div class="bullet-title">${getText(point.title)}</div>
            <div class="bullet-desc">${getText(point.note)}</div>
            <div class="map-card-time">${t[state.lang].driveTimeLabel}｜${getText(point.driveTime)}</div>
          </button>
          <a class="map-open-link" href="${point.open}" target="_blank" rel="noreferrer" aria-label="${getText(point.title)}">${t[state.lang].openLink}</a>
        </article>
      `
    )
    .join("");

  setMapEmbed(currentEmbed);
}

function renderAll() {
  renderI18n();
  renderHero();
  renderOverview();
  renderFlights();
  renderStays();
  renderItinerary();
  renderBudget();
  renderSouvenirs();
  renderChecklist();
  renderLinks();
  renderMap();
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

function syncPageNavigation() {
  document.body.dataset.activePage = state.page;

  document.querySelectorAll("[data-page-link]").forEach((button) => {
    const active = button.dataset.pageLink === state.page;
    button.classList.toggle("active", active);
    if (active) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  document.querySelectorAll("[data-page-panel]").forEach((panel) => {
    const active = panel.dataset.pagePanel === state.page;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });

  const moreActive = MORE_PAGE_IDS.has(state.page);
  dom.moreMenuButton?.classList.toggle("active", moreActive);
  if (moreActive) dom.moreMenuButton?.setAttribute("aria-current", "page");
  else dom.moreMenuButton?.removeAttribute("aria-current");
}

function updateLanguage(nextLang) {
  if (!nextLang || nextLang === state.lang) return;
  state.lang = nextLang;
  storage.set(STORAGE_KEYS.lang, state.lang);
  syncControls();
  renderAll();
  syncPageNavigation();
  updateNetworkStatus();
  announce(state.lang === "zh-Hant" ? "已切換成繁體中文" : "Switched to English");
}

function updateCurrency(nextCurrency) {
  if (!nextCurrency || nextCurrency === state.currency) return;
  state.currency = nextCurrency;
  storage.set(STORAGE_KEYS.currency, state.currency);
  syncControls();
  renderStays();
  renderItinerary();
  renderBudget();
  announce(`${state.currency} ${state.lang === "zh-Hant" ? "已更新" : "updated"}`);
}

function updateBudgetFilter(nextFilter) {
  if (!nextFilter || nextFilter === state.budgetFilter) return;
  state.budgetFilter = nextFilter;
  storage.set(STORAGE_KEYS.budgetFilter, state.budgetFilter);
  renderBudget();
}

function updateExchangeRate(value) {
  const nextRate = Number(value);
  if (!Number.isFinite(nextRate) || nextRate < 1 || nextRate > 100) {
    dom.exchangeRateInput.value = state.exchangeRate.toFixed(1);
    return;
  }

  state.exchangeRate = Math.round(nextRate * 10) / 10;
  storage.set(STORAGE_KEYS.exchangeRate, String(state.exchangeRate));
  renderStays();
  renderItinerary();
  renderBudget();
  announce(state.lang === "zh-Hant" ? `估算匯率已更新為 ${state.exchangeRate}` : `Planning rate updated to ${state.exchangeRate}`);
}

function updateChecklistItem(id, checked) {
  if (!id) return;
  const next = checklistState();
  next[id] = checked;
  saveChecklist(next);
  renderChecklist();
}

function setPage(page, { scroll = true } = {}) {
  if (!PAGE_IDS.includes(page)) return;
  const pageChanged = state.page !== page;
  state.page = page;
  if (dom.moreMenu?.open) dom.moreMenu.close();
  syncUrlHash(pageChanged ? "push" : "replace");
  updateDocumentTitle();
  syncPageNavigation();
  if (scroll) {
    if (page === "overview") {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    } else {
      scrollToMainContent();
    }
  }
  announce(t[state.lang][`nav${page.charAt(0).toUpperCase()}${page.slice(1)}`] || page);
}

function setDay(dayId, { switchPage = false, scroll = true } = {}) {
  if (!data.days.some((day) => day.id === dayId)) return;
  state.selectedDay = dayId;
  storage.set(STORAGE_KEYS.day, dayId);
  renderItinerary();
  const selectedDay = getSelectedDay();
  announce(`${getText(selectedDay.day)} · ${getText(selectedDay.city)}`);

  if (switchPage) {
    setPage("itinerary");
  } else {
    syncUrlHash();
  }

  if (!switchPage && scroll) {
    window.requestAnimationFrame(() => {
      dom.dayDetail?.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
  }
}

function openDayMap(dayId) {
  const dayIndex = data.days.findIndex((day) => day.id === dayId);
  const route = data.map.dayRoutes[dayIndex];
  if (!route) return;
  setMapEmbed(route.embed);
  setPage("map");
}

function openMoreMenu() {
  if (!dom.moreMenu?.showModal) return;
  dom.moreMenu.showModal();
  dom.moreMenuButton?.setAttribute("aria-expanded", "true");
}

function updateNetworkStatus({ restored = false } = {}) {
  if (!dom.networkStatus) return;
  const offline = !navigator.onLine;
  dom.networkStatus.textContent = offline ? t[state.lang].offlineStatus : t[state.lang].onlineStatus;
  dom.networkStatus.hidden = !offline && !restored;
  dom.networkStatus.classList.toggle("is-online", !offline);

  if (restored && !offline) {
    window.setTimeout(() => {
      dom.networkStatus.hidden = true;
    }, 2400);
  }
}

function setupInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    dom.installAppButton.hidden = false;
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    dom.installAppButton.hidden = true;
    if (dom.moreMenu?.open) dom.moreMenu.close();
  });
}

async function installGuide() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  dom.installAppButton.hidden = true;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || window.location.protocol === "file:") return;
  navigator.serviceWorker.register("./sw.js").catch((error) => console.warn("[travel-guide:offline]", error));
}

function bindUIEvents() {
  document.addEventListener("click", (event) => {
    const moreButton = event.target.closest("[data-more-menu]");
    if (moreButton) {
      openMoreMenu();
      return;
    }

    const closeMoreButton = event.target.closest("[data-more-close]");
    if (closeMoreButton) {
      dom.moreMenu?.close();
      return;
    }

    const installButton = event.target.closest("#installAppButton");
    if (installButton) {
      installGuide();
      return;
    }

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

    const openMapButton = event.target.closest("[data-open-map-day]");
    if (openMapButton) {
      openDayMap(openMapButton.dataset.openMapDay);
      return;
    }

    const budgetFilterButton = event.target.closest("[data-budget-filter]");
    if (budgetFilterButton) {
      updateBudgetFilter(budgetFilterButton.dataset.budgetFilter);
      return;
    }

    const dayPreviewButton = event.target.closest("[data-open-day]");
    if (dayPreviewButton) {
      setDay(dayPreviewButton.dataset.openDay, { switchPage: dayPreviewButton.dataset.targetPage === "itinerary" });
      return;
    }

    const daySelectorButton = event.target.closest("[data-day-select]");
    if (daySelectorButton) {
      setDay(daySelectorButton.dataset.daySelect);
      return;
    }

    const mapButton = event.target.closest("[data-map-embed]");
    if (mapButton) {
      setMapEmbed(mapButton.dataset.mapEmbed);
    }
  });

  document.addEventListener("change", (event) => {
    const checkInput = event.target.closest("[data-check]");
    if (checkInput) updateChecklistItem(checkInput.dataset.check, checkInput.checked);

    if (event.target === dom.exchangeRateInput) updateExchangeRate(event.target.value);
  });

  document.addEventListener("input", (event) => {
    if (event.target !== dom.exchangeRateInput) return;
    window.clearTimeout(exchangeRateTimer);
    exchangeRateTimer = window.setTimeout(() => updateExchangeRate(event.target.value), 320);
  });

  dom.moreMenu?.addEventListener("click", (event) => {
    if (event.target === dom.moreMenu) dom.moreMenu.close();
  });
  dom.moreMenu?.addEventListener("close", () => dom.moreMenuButton?.setAttribute("aria-expanded", "false"));

  window.addEventListener("offline", () => updateNetworkStatus());
  window.addEventListener("online", () => updateNetworkStatus({ restored: true }));
  window.addEventListener("hashchange", applyUrlState);
  window.addEventListener("popstate", applyUrlState);
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

function initApp() {
  cacheDom();
  renderAll();
  syncControls();
  syncPageNavigation();
  syncUrlHash();
  bindUIEvents();
  bindProgress();
  setupInstallPrompt();
  updateNetworkStatus();
  registerServiceWorker();
  document.body.dataset.appReady = "true";
  window.__travelGuideReady = true;

  if (window.location.hash && state.page !== "overview") {
    window.requestAnimationFrame(() => {
      document.getElementById("mainContent")?.scrollIntoView({ block: "start", behavior: "auto" });
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    try {
      initApp();
    } catch (error) {
      document.body.dataset.appReady = "error";
      console.error("[travel-guide:init]", error);
    }
  }, { once: true });
} else {
  try {
    initApp();
  } catch (error) {
    document.body.dataset.appReady = "error";
    console.error("[travel-guide:init]", error);
  }
}
