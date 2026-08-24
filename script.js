const STORAGE_KEYS = {
  lang: "australia-handbook-lang",
  currency: "australia-handbook-currency",
  checklist: "australia-handbook-checklist-v3",
  page: "australia-handbook-page",
  budgetFilter: "australia-handbook-budget-filter",
  day: "australia-handbook-day",
};

const PAGE_IDS = ["overview", "flights", "stays", "itinerary", "map", "budget", "souvenirs", "notes"];

const DAY_GLANCE_ORDER = ["start", "area", "highlights", "energy", "walk", "wear", "food", "transport", "booking"];

const rates = {
  AUD: { symbol: "A$", audPerUnit: 1 },
  TWD: { symbol: "NT$", audPerUnit: 20.7 },
};

const dom = {};
let progressFrame = 0;

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
    overviewKicker: "The Journey",
    overviewTitle: "六天，從墨爾本走到雪梨港灣",
    overviewLead: "前半程住在墨爾本，安排市區散步、大洋路與 Phillip Island；5 月 27 日飛往雪梨，最後兩天留給港灣與市中心。",
    overviewRouteKicker: "Route Notes",
    overviewRouteTitle: "旅程沿著城市、海岸與港灣前進",
    overviewRouteLead: "同一區的景點排在一起，長途日只留必要停靠；走路、用餐與交通都能順著當天的方向安排。",
    overviewHighlightsKicker: "Highlights",
    overviewHighlightsTitle: "沿途會記得的幾個片刻",
    overviewHighlightsLead: "墨爾本巷弄的第一杯咖啡、大洋路的海風、企鵝上岸，以及雪梨港邊的早晨。",
    overviewDaysKicker: "Daily Notes",
    overviewDaysTitle: "六天行程，先看每天的重點",
    overviewDaysLead: "日期、區域、步行量與出發提醒都放在卡片上；需要早起或長途移動的日子一眼就能辨認。",
    overviewPracticalKicker: "On The Road",
    overviewPracticalTitle: "上路前，先把這些放在手邊",
    overviewPracticalLead: "航班、住宿、交通、穿搭與退稅分區收好，需要時展開查看，不必在長篇文字裡找資料。",
    flightsKicker: "Flight Notes",
    flightsTitle: "三段航班，一次看清",
    flightsLead: "5 月 23 日深夜從台北出發；5 月 27 日由墨爾本轉往雪梨；5 月 29 日晚間搭機返台。",
    flightPlanTitle: "機場時間",
    airportGuidesTitle: "出發與抵達安排",
    staysKicker: "Where We Stay",
    staysTitle: "兩座城市的落腳處",
    staysLead: "墨爾本住 Dorsett Melbourne，雪梨住 Sofitel Darling Harbour。5 月 27 日集中處理還車、國內線與入住。",
    stayAdvantagesTitle: "住宿位置與周邊動線",
    moveDayTitle: "5 月 27 日｜墨爾本到雪梨",
    moveOptionsTitle: "已確認的交通與備選方案",
    itineraryKicker: "Day By Day",
    itineraryTitle: "六天每日指南",
    itineraryLead: "每一天先列出出發時間、活動區域、步行量、穿搭與交通，再依上午、下午與晚間閱讀完整路線。",
    mapKicker: "Route Map",
    mapTitle: "每日路線與地圖",
    mapLead: "先選日期，再查看當天的主要區域與地圖；長途路線和市區散步分開呈現。",
    mapDayLabel: "每日路線",
    mapRouteLink: "開啟完整路線",
    budgetKicker: "Trip Costs",
    budgetTitle: "旅費概覽",
    budgetLead: "已付款、已有金額與尚待估算的項目分開標示，可切換幣別查看兩人總額與每人預算。",
    souvenirsKicker: "Bring Home",
    souvenirsTitle: "從澳洲帶回來",
    souvenirsLead: "超市零食可以提早買；蛋白石、Aesop 與羊毛小物留到市中心行程，再依來源、材質與行李空間挑選。",
    souvenirsTipsTitle: "怎麼買比較順",
    souvenirsSourcesTitle: "挑選方向",
    notesKicker: "Good To Know",
    notesTitle: "出發文件與旅途備忘",
    notesLead: "護照、ETA、訂單、穿搭與官方連結集中在這裡；出門前確認一次，途中也能快速重開。",
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
    totalTripCostLabel: "兩人整趟抓法",
    totalTripCostNote: "含機票、住宿、城際移動、餐食與門票",
    averageDailyLabel: "平均每日",
    averageDailyNote: "以 6 天主行程估算",
    perPersonCostLabel: "每人抓法",
    perPersonCostNote: "以兩人平均分攤估算",
    bookedLabel: "已先鎖定",
    bookedNote: "目前已經有金額或已付款的部分",
    flexibleLabel: "還有彈性",
    flexibleNote: "餐食、門票與部分交通仍可微調",
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
    overviewDaysLead: "Each card shows the date, area, walking load, and the days that require an early start or a longer transfer.",
    overviewPracticalKicker: "On The Road",
    overviewPracticalTitle: "Keep these details close",
    overviewPracticalLead: "Flights, hotels, transport, clothing, and tax-refund notes are grouped into short sections for quick reference.",
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
    itineraryLead: "Start with departure time, area, walking load, clothing, and transport, then read the full route by morning, afternoon, and evening.",
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
    notesLead: "Passport, ETA, bookings, packing notes, and official links are kept together for departure day and on-the-road checks.",
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
          "六天裡，先走墨爾本的巷弄與河岸，再開往大洋路和 Phillip Island；後半程換到雪梨，在港灣晨光與城市街區之間散步。",
        en: "The trip opens with Melbourne laneways and the river, stretches through coastline and road-trip air, then closes with Sydney harbour light, coffee, and a softer city rhythm.",
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
        note: { "zh-Hant": "5/23 晚班出發，5/30 清晨回到台北", en: "Late flight out on May 23, back in Taipei early on May 30" },
      },
      {
        label: { "zh-Hant": "兩座落腳處", en: "Two hotel bases" },
        value: { "zh-Hant": "Melbourne CBD / Darling Harbour", en: "Melbourne CBD / Darling Harbour" },
        note: { "zh-Hant": "前半段住墨爾本市中心，後半段住達令港，兩邊都方便早出晚歸", en: "A central city base first, then a harbour base for the Sydney half" },
      },
      {
        label: { "zh-Hant": "需留時間的日子", en: "Long-move days" },
        value: { "zh-Hant": "Day 2 / Day 3 / Day 4", en: "Day 2 / Day 3 / Day 4" },
        note: { "zh-Hant": "大洋路早起、Phillip Island 晚歸、第四天飛雪梨", en: "The coast day starts early, Phillip Island ends late, and Day 4 moves cities" },
      },
      {
        label: { "zh-Hant": "隨身重點", en: "Keep in the bag" },
        value: { "zh-Hant": "好走鞋 / 薄外套 / 防曬", en: "Walking shoes / light layer / sunscreen" },
        note: { "zh-Hant": "海邊與夜晚較冷，白天戶外行程仍需做好防曬", en: "Coast and evenings cool down faster, but daylight still calls for sun protection" },
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
        note: { "zh-Hant": "實際飛行跨兩個晚上，主行程集中在 5/24 到 5/29", en: "The flights span two nights, while the core land itinerary sits between May 24 and May 29" },
      },
      {
        label: { "zh-Hant": "主要城市 / 區域", en: "Main areas" },
        value: { "zh-Hant": "墨爾本 / 大洋路 / Phillip Island / 雪梨", en: "Melbourne / Great Ocean Road / Phillip Island / Sydney" },
        note: { "zh-Hant": "前半段城市加海岸，後半段港灣加市中心散步", en: "City and coast first, then harbour light and central Sydney" },
      },
      {
        label: { "zh-Hant": "旅行主題", en: "Trip themes" },
        value: { "zh-Hant": "城市散步、海岸線、公路風景、咖啡、野生動物", en: "City walking, coastline, road views, coffee, and wildlife" },
        note: { "zh-Hant": "兩個長途戶外日完整保留，其餘行程依區域安排", en: "The goal is not to cram the days full, but to leave the signature scenes enough room" },
      },
      {
        label: { "zh-Hant": "移動方式", en: "Transport" },
        value: { "zh-Hant": "飛機 / 租車 / 步行 / 市區交通", en: "Flights / rental car / walking / city transit" },
        note: { "zh-Hant": "墨爾本靠租車串長線，雪梨回到步行和大眾運輸", en: "Melbourne uses the car for the longer drives, while Sydney shifts back to walking and transit" },
      },
      {
        label: { "zh-Hant": "住宿區域", en: "Stay areas" },
        value: { "zh-Hant": "Dorsett Melbourne + Sofitel Darling Harbour", en: "Dorsett Melbourne + Sofitel Darling Harbour" },
        note: { "zh-Hant": "市中心與港邊各住一段，減少拖行李與跨區往返", en: "Both bases are comfortable for heading out early or returning later" },
      },
      {
        label: { "zh-Hant": "體力節奏", en: "Energy rhythm" },
        value: { "zh-Hant": "2 天戶外長線 + 2 天城市散步 + 1 天轉場 + 1 天收尾", en: "2 outdoor long-line days + 2 city walk days + 1 transfer day + 1 landing day" },
        note: { "zh-Hant": "Day 2、Day 3 車程長，Day 4 需要處理城際轉場", en: "Day 2, Day 3, and Day 4 need the most breathing room" },
      },
      {
        label: { "zh-Hant": "天氣與穿搭", en: "Weather and wear" },
        value: { "zh-Hant": "5 月入秋，市區溫和，海邊與夜晚偏涼", en: "Autumn in May, comfortable by day and cooler on the coast or at night" },
        note: { "zh-Hant": "好走鞋、可收納外套、防曬與墨鏡請隨身攜帶", en: "A light layer, walking shoes, sunscreen, and sunglasses all earn their place" },
      },
      {
        label: { "zh-Hant": "行前先記", en: "Watch first" },
        value: { "zh-Hant": "Day 2 早起、Day 3 晚歸、Day 4 飛機、Day 6 晚班機", en: "Day 2 early start, Day 3 late return, Day 4 flight, Day 6 late departure" },
        note: { "zh-Hant": "這四天先確認交通時間，再安排用餐與散步", en: "Leave those key windows to transport first and the rest of the trip becomes much easier" },
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
        desc: { "zh-Hant": "07:00 前離開墨爾本，午間在沿路小鎮補給，下午留給十二門徒岩與 Loch Ard Gorge。", en: "Day 2 needs the earliest start so the coast drive and major viewpoints still feel unhurried." },
      },
      {
        title: { "zh-Hant": "最晚回飯店｜Day 3", en: "The latest finish" },
        desc: { "zh-Hant": "企鵝歸巢結束後才開車回墨爾本；上午只排早午餐與近距離散步。", en: "Day 3 returns late from Penguin Parade, so the morning is better kept deliberately light." },
      },
      {
        title: { "zh-Hant": "轉場日｜Day 4", en: "The day that needs space" },
        desc: { "zh-Hant": "上午回飯店取行李、還車後前往機場；13:00 搭 JQ514 飛往雪梨。", en: "Day 4 is the car return, airport, domestic flight, and check-in day, so the morning should stay nearby and flexible." },
      },
      {
        title: { "zh-Hant": "城市散步｜Day 5–6", en: "The slowest stroll" },
        desc: { "zh-Hant": "歌劇院、Circular Quay、達令港與 QVB 分成兩天走，避免在回程日前跨區奔波。", en: "Day 5 and Day 6 both work best when you leave room for the harbour, the streets, and a comfortable meal." },
      },
    ],
    routeFlow: [
      {
        title: { "zh-Hant": "墨爾本市中心與 Southbank", en: "Melbourne CBD and Southbank" },
        days: { "zh-Hant": "Day 1 + Day 4 上午", en: "Day 1 + Day 4 morning" },
        desc: {
          "zh-Hant": "Degraves Street、Flinders Street Station、State Library 與 Yarra River 可一路步行串連；抵達日走前半段，離開墨爾本前再補周邊。",
          en: "Degraves Street, Flinders Street Station, the State Library, and the Yarra can all be linked naturally on foot, which is why this area works both as an opening and a soft half-day finish.",
        },
        meta: { "zh-Hant": "步行 / 市區短移動", en: "Walking / short city transfers" },
      },
      {
        title: { "zh-Hant": "Great Ocean Road 西段", en: "The western Great Ocean Road stretch" },
        days: { "zh-Hant": "Day 2", en: "Day 2" },
        desc: {
          "zh-Hant": "Lorne、Apollo Bay 作為午間補給，十二門徒岩、Loch Ard Gorge 與 London Arch 集中在下午，減少沿路折返。",
          en: "The point of this day is not to collect the most stops, but to keep the long drive, the food breaks, and the major afternoon viewpoints in one smooth coastal run.",
        },
        meta: { "zh-Hant": "租車 / 一日遊", en: "Rental car / day tour" },
      },
      {
        title: { "zh-Hant": "Phillip Island 海岸與企鵝", en: "Phillip Island coast and penguins" },
        days: { "zh-Hant": "Day 3 下午到深夜", en: "Day 3 afternoon into late night" },
        desc: {
          "zh-Hant": "上午留在墨爾本，午後自駕前往海岸；The Cerberus Beach House、Nobbies Centre 與 Penguin Parade 依序銜接。",
          en: "Keeping the morning soft and moving to the coast later makes the seaside dinner, the wind, and Penguin Parade feel like one connected experience instead of separate tasks.",
        },
        meta: { "zh-Hant": "租車自駕", en: "Self-drive" },
      },
      {
        title: { "zh-Hant": "達令港到 Circular Quay", en: "Darling Harbour to Circular Quay" },
        days: { "zh-Hant": "Day 4 晚上 + Day 5", en: "Day 4 evening + Day 5" },
        desc: {
          "zh-Hant": "抵達雪梨當晚先入住達令港；隔天從歌劇院與 Circular Quay 往回走，下午接海生館，晚上回到飯店周邊。",
          en: "Anchoring the hotel base first and saving the Opera House, Circular Quay, and aquarium for the next day keeps Sydney much calmer than trying to rush into the sights on arrival.",
        },
        meta: { "zh-Hant": "步行 / 火車 / 輕軌 / Uber", en: "Walking / train / light rail / Uber" },
      },
      {
        title: { "zh-Hant": "雪梨 CBD 與回程夜晚", en: "Sydney CBD and the departure night" },
        days: { "zh-Hant": "Day 6", en: "Day 6" },
        desc: {
          "zh-Hant": "QVB、Hyde Park 與午餐集中在市中心；17:30 回飯店取行李，19:00 前往 Sydney Airport。",
          en: "Keeping QVB, Hyde Park, and the final shopping in the same area makes it much easier to head back for luggage and get to the airport without the last day feeling scattered.",
        },
        meta: { "zh-Hant": "步行 + Airport Line / Uber", en: "Walking + airport line / Uber" },
      },
    ],
    highlights: [
      {
        title: { "zh-Hant": "墨爾本的晨間街區", en: "Melbourne in its morning city mood" },
        meta: { "zh-Hant": "Day 1｜Melbourne CBD", en: "Day 1 | Melbourne CBD" },
        desc: {
          "zh-Hant": "在 Degraves Street 吃早午餐，再走到老車站與州立圖書館。第一天先熟悉街區，也替長途飛行後保留體力。",
          en: "The trip does not open on a giant sight. It opens with coffee lanes, the old station, and the library, which feels much more true to the city itself.",
        },
        image: "./assets/melbourne-degraves.jpg",
        alt: { "zh-Hant": "墨爾本巷弄與咖啡街氣氛", en: "Melbourne laneway and coffee mood" },
      },
      {
        title: { "zh-Hant": "大洋路的海平線與斷崖", en: "The horizon and cliffs of the Great Ocean Road" },
        meta: { "zh-Hant": "Day 2｜Great Ocean Road", en: "Day 2 | Great Ocean Road" },
        desc: {
          "zh-Hant": "海景公路、小鎮停靠與斷崖觀景台構成一整天；十二門徒岩是主景，沿途路段同樣值得留意。",
          en: "The beauty of this day is not only the Apostles. It is the way the road, the wind, and the pauses along the coast slowly add up.",
        },
        image: "./assets/twelve-apostles.jpg",
        alt: { "zh-Hant": "大洋路與十二門徒岩", en: "Great Ocean Road and the Twelve Apostles" },
      },
      {
        title: { "zh-Hant": "Phillip Island 的海風與企鵝歸巢", en: "Phillip Island wind and the penguins returning ashore" },
        meta: { "zh-Hant": "Day 3｜Phillip Island", en: "Day 3 | Phillip Island" },
        desc: {
          "zh-Hant": "下午抵達 Phillip Island，先走海岸步道、吃晚餐，日落後再進場等候企鵝歸巢。",
          en: "The softer city rhythm gives way to coastline light and finally the penguins making their way back from the sea.",
        },
        image: "./assets/day3-phillip-island-sunset.jpg",
        alt: { "zh-Hant": "Phillip Island 海岸夕陽", en: "Phillip Island sunset coast" },
      },
      {
        title: { "zh-Hant": "雪梨港灣的早餐時光", en: "A Sydney harbour breakfast" },
        meta: { "zh-Hant": "Day 5｜Circular Quay", en: "Day 5 | Circular Quay" },
        desc: {
          "zh-Hant": "早餐安排在 Opera Quays 或 MCA Cafe，晨間光線較柔和，也能直接接上歌劇院與 Circular Quay 散步。",
          en: "Putting breakfast by the harbour lets the Opera House, the light, and the city waking up all belong to the same morning.",
        },
        image: "./assets/opera-house-harbour.jpg",
        alt: { "zh-Hant": "雪梨歌劇院與港灣景色", en: "Sydney Opera House and harbour view" },
      },
      {
        title: { "zh-Hant": "達令港夜色與最後的市區半日", en: "Darling Harbour nights and the final soft half-day" },
        meta: { "zh-Hant": "Day 4 - Day 6｜Sydney", en: "Day 4 - Day 6 | Sydney" },
        desc: {
          "zh-Hant": "兩晚都住達令港，Day 5 走港灣與海生館，Day 6 再到 QVB 和 Hyde Park，傍晚回飯店取行李。",
          en: "From Darling Harbour nights to the aquarium and a final QVB walk, Sydney closes the trip by settling into the city rather than rushing into another attraction sprint.",
        },
        image: "./assets/day6-qvb-sydney.jpg",
        alt: { "zh-Hant": "雪梨 QVB 與市中心街景", en: "Sydney QVB and central city streets" },
      },
    ],
    practicalInfo: [
      {
        title: { "zh-Hant": "航班與機場交通", en: "Flights and airport movement" },
        note: { "zh-Hant": "抵達、城際轉場與晚班回程", en: "Three flight segments, three different rhythms" },
        open: true,
        bullets: [
          {
            "zh-Hant": "5/24 10:40 抵達墨爾本後，通關、取車再進市區，第一天不適合再往太遠的地方衝。",
            en: "After the 10:40 Melbourne arrival, immigration, car pickup, and getting into town already fill the first part of the day, so it is better not to push too far.",
          },
          {
            "zh-Hant": "5/27 的 JQ514 13:00 起飛，上午只安排飯店周邊、取行李與還車。",
            en: "JQ514 departs at 13:00 on May 27, so the morning should stay near the city centre and the hotel luggage pickup.",
          },
          {
            "zh-Hant": "5/29 晚上從雪梨回程，傍晚先回飯店拿行李，再進機場會比邊逛邊拖著箱子輕鬆。",
            en: "The Sydney return flight is late at night, so it is much easier to reclaim the bags first and then head to the airport cleanly.",
          },
        ],
        links: [
          { label: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" }, href: "https://www.melbourneairport.com.au/" },
          { label: { "zh-Hant": "雪梨機場", en: "Sydney Airport" }, href: "https://www.sydneyairport.com.au/" },
        ],
      },
      {
        title: { "zh-Hant": "城市間移動", en: "Moving between places" },
        note: { "zh-Hant": "墨爾本靠車，雪梨回到步行", en: "Drive in Melbourne, walk again in Sydney" },
        bullets: [
          {
            "zh-Hant": "墨爾本段的大洋路和 Phillip Island 都是長線移動，租車可以把沿路停靠和回程節奏抓得比較自在。",
            en: "The Great Ocean Road and Phillip Island days both cover a lot of ground, and the rental car gives those stops more freedom.",
          },
          {
            "zh-Hant": "雪梨段改回步行、火車、輕軌與 Uber 的混搭，會比在港灣附近開車省心很多。",
            en: "In Sydney, mixing walking, train, light rail, and the occasional Uber is much easier than trying to keep a car around the harbour zones.",
          },
          {
            "zh-Hant": "Day 4 的重點是還車、機場、國內線與入住，不要再加一個遠點，整體會順很多。",
            en: "Day 4 works best when it is treated as a car return, airport, domestic flight, and check-in day without another far-away stop added on.",
          },
        ],
      },
      {
        title: { "zh-Hant": "住宿區域", en: "Hotel bases" },
        note: { "zh-Hant": "市中心三晚，達令港兩晚", en: "Both bases are practical" },
        bullets: [
          {
            "zh-Hant": "Dorsett Melbourne 讓 Day 1 的巷弄散步、Day 2 的一早出發和 Day 4 的最後半天都很方便。",
            en: "Dorsett Melbourne makes the laneway day, the early coast departure, and the final Melbourne half-day all easy to handle.",
          },
          {
            "zh-Hant": "Sofitel Darling Harbour 讓 Day 5 的港灣日和 Day 6 的最後補買都可以用步行加短程交通解決。",
            en: "Sofitel Darling Harbour keeps the harbour day and the final Sydney shopping day manageable with walking plus short transit hops.",
          },
          {
            "zh-Hant": "最後一晚已經在雪梨，不用再為回程前搬行李，心情會輕鬆很多。",
            en: "Being in Sydney already on the final night removes an extra luggage move before the return flight.",
          },
        ],
      },
      {
        title: { "zh-Hant": "餐桌與咖啡", en: "Meals and coffee" },
        note: { "zh-Hant": "把吃飯也當成旅行的一部分", en: "Meals are part of the travel rhythm too" },
        bullets: [
          {
            "zh-Hant": "Day 1 在 Degraves Street 安排早午餐，抵達後可直接從咖啡街開始市區步行。",
            en: "Degraves Street is the right kind of slow opener for Melbourne and a good way to let the city wake up around you.",
          },
          {
            "zh-Hant": "Day 3 可在 The Cerberus Beach House 用餐，再前往 Nobbies Centre 與 Penguin Parade。",
            en: "The Cerberus Beach House is not only a dinner stop; it also helps the coast rhythm begin before Penguin Parade.",
          },
          {
            "zh-Hant": "Day 5 早餐排在歌劇院附近，用餐後直接步行 Circular Quay，省下一次跨區移動。",
            en: "Placing breakfast near the Opera House gives the harbour morning more grace than treating it as a pure attraction sprint.",
          },
        ],
      },
      {
        title: { "zh-Hant": "天氣與穿搭", en: "Weather and what to wear" },
        note: { "zh-Hant": "5 月入秋，市區與海岸溫差明顯", en: "May sits in autumn, so layers work best" },
        bullets: [
          {
            "zh-Hant": "市區白天大多舒服，但海邊、日落後和企鵝歸巢這種戶外時段會明顯變冷。",
            en: "Daytime in the cities should feel comfortable, but the coast, sunset hours, and Penguin Parade all cool down noticeably faster.",
          },
          {
            "zh-Hant": "短袖或薄長袖打底，包內再放一件可收納的防風外套。",
            en: "The most reliable setup is a tee or light long sleeve with a packable layer on top.",
          },
          {
            "zh-Hant": "鞋子請以長時間走路舒服為第一優先，尤其是 Day 1、Day 5 和 Day 6。",
            en: "Comfortable walking shoes matter more than anything else, especially on Day 1, Day 5, and Day 6.",
          },
        ],
      },
      {
        title: { "zh-Hant": "防曬與戶外裝備", en: "Sun and outdoor gear" },
        note: { "zh-Hant": "海邊風大，但日照還是不能忽略", en: "Windy coast, still strong daylight" },
        bullets: [
          {
            "zh-Hant": "Day 2 大洋路、Day 3 Phillip Island 和 Day 5 港灣步行都建議帶防曬、墨鏡和水。",
            en: "The Great Ocean Road, Phillip Island, and the Sydney harbour day all deserve sunscreen, sunglasses, and water.",
          },
          {
            "zh-Hant": "帽子最好是能固定的款式，海邊風大時會比純造型款更實際。",
            en: "A hat that can handle wind works far better on the coast than one that is only for styling.",
          },
          {
            "zh-Hant": "行動電源、面紙和小包裝零食在長途移動日也很有用。",
            en: "A power bank, tissues, and a small snack become surprisingly useful on the longer movement days.",
          },
        ],
      },
      {
        title: { "zh-Hant": "購物與退稅", en: "Shopping and tax refund prep" },
        note: { "zh-Hant": "最後補買盡量集中在 Day 6", en: "Keep the last shopping mostly on Day 6" },
        bullets: [
          {
            "zh-Hant": "QVB、Hyde Park 一帶適合留最後一段補買，不需要在轉場日硬塞購物。",
            en: "QVB and the streets nearby are a good place to keep the final shopping, without forcing it into the transfer day.",
          },
          {
            "zh-Hant": "如果想在機場處理退稅，發票、護照資訊和商品最好先整理在一起，再多留一點回程前的時間。",
            en: "If you plan to handle tax refund steps at the airport, keep receipts, passport details, and relevant items together and leave extra time before the flight.",
          },
          {
            "zh-Hant": "零食或超市伴手禮可以在前幾天先分批買，不用留到最後一晚才集中處理。",
            en: "Snacks and supermarket gifts are easier to pick up in smaller rounds earlier in the trip rather than all at once at the end.",
          },
        ],
      },
      {
        title: { "zh-Hant": "網路、付款與插座", en: "Connectivity, payment, and plugs" },
        note: { "zh-Hant": "這些小事往往在旅途中最常用", en: "These are the quiet essentials" },
        bullets: [
          {
            "zh-Hant": "澳洲插座和台灣不同，澳規轉接頭一定要先放進行李。",
            en: "Australia uses a different plug type from Taiwan, so the AU adapter needs to be packed before anything else.",
          },
          {
            "zh-Hant": "信用卡和手機支付大多夠用，但還是留一點小額現金當備用會安心。",
            en: "Cards and mobile payments should cover most of the trip, though a small cash buffer is still reassuring.",
          },
          {
            "zh-Hant": "eSIM 或漫遊方案建議出發前就先確定，抵達日、長途移動日和回程夜晚都會很依賴網路。",
            en: "It is worth confirming the eSIM or roaming plan before departure, because the arrival day, long-drive days, and return night all lean on good signal.",
          },
        ],
      },
      {
        title: { "zh-Hant": "貼心提醒", en: "Gentle reminders" },
        note: { "zh-Hant": "四個需要特別抓時間的時段", en: "Save your energy for the scenes that matter" },
        bullets: [
          {
            "zh-Hant": "Day 2 早起、Day 3 晚歸、Day 4 搭國內線、Day 6 搭晚班機，這四天請先確認交通時間。",
            en: "Day 2 early start, Day 3 late return, Day 4 flight, and Day 6 late departure are the four windows that need the most breathing room.",
          },
          {
            "zh-Hant": "大洋路和 Phillip Island 都不要在回程後再加碼夜生活，隔天的感受會差很多。",
            en: "Both the Great Ocean Road and Phillip Island days are better without extra nightlife piled on after the return drive.",
          },
          {
            "zh-Hant": "如果想拍照，把時間留給早上港灣光線和傍晚河岸，比多塞一個點更值得。",
            en: "If photos matter, time spent on harbour morning light and riverside dusk is usually more rewarding than squeezing in one more stop.",
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
        "zh-Hant": "5/24 10:40 抵達墨爾本後，還有通關、取車和進市區的時間，第一天適合排城市慢步調，不適合再壓一個長線景點。",
        en: "Landing in Melbourne at 10:40 still leaves immigration, car pickup, and the ride into town, so the first day works much better as a slow city day than a long-distance push.",
      },
    },
    {
      title: { "zh-Hant": "JQ514 是整趟最關鍵的轉場", en: "JQ514 is the key transfer of the trip" },
      desc: {
        "zh-Hant": "5/27 13:00 從墨爾本飛雪梨，上午只留近距離活動和拿行李，會比勉強塞一個景點更輕鬆。",
        en: "The May 27 flight from Melbourne to Sydney is the main pivot of the trip, which is why the morning should stay close and luggage-friendly.",
      },
    },
    {
      title: { "zh-Hant": "回程是晚班國際線", en: "The return is a late-night international flight" },
      desc: {
        "zh-Hant": "Day 6 白天留在雪梨市中心，17:30 回飯店拿行李，國際線至少預留 3 小時。",
        en: "Day 6 still leaves a useful half-day in central Sydney, but the evening should first return for the luggage and then leave a generous airport buffer.",
      },
    },
  ],
  airportGuides: [
    {
      title: { "zh-Hant": "抵達墨爾本", en: "Landing in Melbourne" },
      desc: {
        "zh-Hant": "通關、取車與進市區約需半天；抵達後先吃早午餐，再依時間走車站、圖書館與河岸。",
        en: "Treat Day 1 as arrival, move into town, settle into a comfortable brunch, and only then start the city walk.",
      },
    },
    {
      title: { "zh-Hant": "墨爾本飛雪梨", en: "Flying Melbourne to Sydney" },
      desc: {
        "zh-Hant": "上午行程以 Melbourne Central、Emporium、Bourke Street 這種彼此靠近的區域為主，隨時可以折回飯店拿行李。",
        en: "Keep the morning around Melbourne Central, Emporium, and Bourke Street, so turning back for luggage stays easy.",
      },
    },
    {
      title: { "zh-Hant": "雪梨回程夜晚", en: "The Sydney departure night" },
      desc: {
        "zh-Hant": "如果最後一天有補買或散步，最好都留在 QVB、Hyde Park、Darling Harbour 這一帶，晚上回飯店拿行李不會太折返。",
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
        feature: { "zh-Hant": "適合第一天城市散步，也方便第二天一早往海岸線出發。", en: "Useful for the first city day and very convenient for the early coast departure." },
        note: { "zh-Hant": "連住三晚，市區行程可步行銜接，大洋路與 Phillip Island 也從同一處出發。", en: "The Melbourne half stays here, which keeps the laneways, the city, and the drive-out rhythm in one place." },
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
        feature: { "zh-Hant": "適合 Day 5 的港灣日、Day 6 的最後散步，也讓回程夜晚乾淨俐落。", en: "Well placed for the harbour day, the final Sydney walk, and a cleaner return-night routine." },
        note: { "zh-Hant": "連住兩晚；步行可到海生館與達令港，前往 Circular Quay 或 QVB 再搭短程交通。", en: "The Sydney half sits by Darling Harbour, so both evening views and daytime movement out to Circular Quay stay easy." },
        href: "https://all.accor.com/hotel/9729/index.en.shtml",
      },
    ],
    advantages: [
      {
        title: { "zh-Hant": "墨爾本市中心步行範圍", en: "Melbourne holds the city rhythm in the first base" },
        desc: {
          "zh-Hant": "Degraves Street、Flinders Street Station、State Library 與 Southbank 可依南北方向步行串連。",
          en: "Degraves Street, Flinders Street Station, the State Library, and Southbank can all live within one connected central-city rhythm.",
        },
      },
      {
        title: { "zh-Hant": "達令港串連港灣行程", en: "Sydney keeps the harbour mood in the second base" },
        desc: {
          "zh-Hant": "Day 5 的港灣早餐、歌劇院和海生館，回到達令港收夜色剛剛好。",
          en: "The harbour breakfast, Opera House, and aquarium day all close naturally back into Darling Harbour.",
        },
      },
      {
        title: { "zh-Hant": "回程前不用再搬一次行李", en: "No extra luggage move before the return" },
        desc: {
          "zh-Hant": "最後一晚已經在雪梨，讓 Day 6 可以把心力放在最後半天怎麼走，而不是再處理一次換飯店。",
          en: "Being in Sydney already on the final night means Day 6 can focus on the city instead of another hotel transfer.",
        },
      },
    ],
    moveDayTimeline: [
      {
        time: "09:00",
        title: { "zh-Hant": "墨爾本市區最後半日", en: "One last easy Melbourne window" },
        desc: { "zh-Hant": "早午餐、近距離購物或最後一段 city walk 都留在市中心，不用再拉遠。", en: "Keep brunch, short shopping, or the final city walk right in the centre rather than reaching farther out." },
      },
      {
        time: "11:30 - 12:00",
        title: { "zh-Hant": "回飯店拿行李，往機場走", en: "Pick up the bags and head for the airport" },
        desc: { "zh-Hant": "最晚 12:00 前離開市區，並把還車與國內線報到時間一起計入。", en: "Getting this part right is what makes the domestic flight feel easy." },
      },
      {
        time: "13:00",
        title: { "zh-Hant": "搭乘 JQ514 飛往雪梨", en: "Take JQ514 into Sydney" },
        desc: { "zh-Hant": "Melbourne 13:00 起飛，14:25 抵達 Sydney。", en: "Departs Melbourne at 13:00 and lands in Sydney at 14:25." },
      },
      {
        time: "16:30 後",
        title: { "zh-Hant": "入住達令港，晚餐留在附近", en: "Check in at Darling Harbour and keep the night soft" },
        desc: { "zh-Hant": "辦理入住後只安排達令港散步與晚餐，歌劇院和 Circular Quay 留到隔天。", en: "Settle gently into the new city and save the full harbour run for the next day." },
      },
    ],
    moveOptions: [
      {
        title: { "zh-Hant": "Jetstar JQ514", en: "Jetstar JQ514" },
        duration: { "zh-Hant": "1 小時 25 分", en: "1 hr 25 min" },
        start: { "zh-Hant": "MEL 第 4 航廈", en: "MEL Terminal 4" },
        destination: { "zh-Hant": "SYD 國內線 T2", en: "SYD Domestic T2" },
        cost: { "zh-Hant": "票價未補，但班機已確認", en: "Fare not added yet, flight confirmed" },
        desc: { "zh-Hant": "這一段是整趟最重要的城市轉場，上午請不要排得太滿。", en: "This is the key city transfer of the trip, so the morning should stay intentionally light." },
      },
      {
        title: { "zh-Hant": "Sixt 租車", en: "Sixt rental car" },
        duration: { "zh-Hant": "5/24 11:00 取車", en: "Pickup on May 24 at 11:00" },
        start: { "zh-Hant": "墨爾本機場", en: "Melbourne Airport" },
        destination: { "zh-Hant": "Toyota Corolla 或同級", en: "Toyota Corolla or similar" },
        costAud: 264.2,
        costSuffix: { "zh-Hant": "｜已付款", en: " | paid" },
        desc: { "zh-Hant": "Day 2 大洋路和 Day 3 Phillip Island 都靠這台車，把長線日的彈性留在自己手上。", en: "This car holds the Great Ocean Road and Phillip Island days together and keeps the longer days more flexible." },
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
        duration: { "zh-Hant": "Day 6 晚上會用到", en: "Useful on the final evening" },
        start: { "zh-Hant": "Darling Harbour / Sydney CBD", en: "Darling Harbour / Sydney CBD" },
        destination: { "zh-Hant": "Sydney Airport T1", en: "Sydney Airport T1" },
        cost: { "zh-Hant": "依行李量與當晚體力選擇", en: "Choose based on luggage and energy that evening" },
        desc: { "zh-Hant": "如果最後一天買得多或想省體力，就直接 Uber；若想穩定抓時間，Airport Line 也很直覺。", en: "If the last day ends with more shopping or lower energy, Uber is the easier call; if you want more predictable timing, the airport line is still straightforward." },
      },
    ],
  },
  days: [
    {
      id: "day1",
      day: { "zh-Hant": "Day 1", en: "Day 1" },
      date: "2026-05-24",
      city: { "zh-Hant": "Melbourne CBD / Southbank", en: "Melbourne CBD / Southbank" },
      theme: { "zh-Hant": "咖啡街區與河岸散步", en: "Laneways, coffee, and a riverside first day" },
      preview: {
        "zh-Hant": "10:40 抵達墨爾本。取車進市區後，從 Degraves Street、老車站一路走到 Yarra 河岸。",
        en: "There is no need to rush far on arrival. Let Melbourne laneways, the old station, and the Yarra open the trip slowly.",
      },
      intro: {
        "zh-Hant": "長途飛行後先留在市中心活動。午餐從 Degraves Street 開始，下午走車站與圖書館，傍晚到 Yarra 河邊吃飯；穿好走的鞋，包裡放一件薄外套。",
        en: "Today follows a city-waking-up pace. Good walking shoes, coffee, laneways, and the river all fit better than trying to force a bigger plan onto the arrival day.",
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
          note: { "zh-Hant": "通關與取車後，抵達市區大約已接近中午", en: "After immigration and the car pickup, the city walk really starts closer to midday" },
        },
        area: {
          value: { "zh-Hant": "Degraves Street / Flinders Street / State Library / Yarra River", en: "Degraves Street / Flinders Street / State Library / Yarra River" },
          note: { "zh-Hant": "今天都留在同一個城市核心，移動不需要拉遠", en: "Everything stays in one central city zone today" },
        },
        highlights: {
          value: { "zh-Hant": "晨間咖啡、老車站、圖書館圓頂、河岸夜色", en: "Coffee, the old station, the library dome, and river light" },
          note: { "zh-Hant": "以城市氛圍為主，不用把點塞滿", en: "The mood matters more than the count of stops" },
        },
        energy: {
          value: { "zh-Hant": "普通", en: "Steady" },
          note: { "zh-Hant": "長途飛行後只排市中心行程，避免第一天過度消耗", en: "Keep the arrival day easy and let the body settle in" },
        },
        walk: {
          value: { "zh-Hant": "中等", en: "Moderate" },
          note: { "zh-Hant": "主要是城市步行，偶爾短程移動", en: "Mostly city walking with only short transfers" },
        },
        wear: {
          value: { "zh-Hant": "好走鞋 + 薄外套", en: "Walking shoes and a light layer" },
          note: { "zh-Hant": "傍晚河邊會比白天再涼一點", en: "The river can feel cooler by evening" },
        },
        food: {
          value: { "zh-Hant": "Degraves Street 早午餐 / 河邊晚餐", en: "Brunch on Degraves Street / dinner by the river" },
          note: { "zh-Hant": "Day 1 的吃飯節奏可以慢一點", en: "The meal rhythm works best when kept slow" },
        },
        transport: {
          value: { "zh-Hant": "機場取車後進市區，市區以步行為主", en: "Pick up the car at the airport, then mostly walk in the city" },
          note: { "zh-Hant": "不需要再排一個遠距離景點", en: "No need to tack on a far-away stop" },
        },
        booking: {
          value: { "zh-Hant": "無硬性預約", en: "No hard booking pressure" },
          note: { "zh-Hant": "State Library 的圓頂閱覽室值得留一點時間", en: "Leave proper time for the domed reading room at the State Library" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜城市醒來", en: "Morning | The city wakes up" },
          title: { "zh-Hant": "Degraves Street 早午餐", en: "Brunch on Degraves Street" },
          desc: { "zh-Hant": "抵達市區後先吃早午餐，順便確認取車、停車與飯店入住時間，再開始步行行程。", en: "Start with the coffee lane and let arrival day begin with a real brunch rather than a rushed dash toward a major sight." },
          tags: [{ label: { "zh-Hant": "晨間咖啡", en: "Coffee" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "中午｜車站與廣場", en: "Midday | Station and square" },
          title: { "zh-Hant": "Flinders Street Station + Federation Square", en: "Flinders Street Station + Federation Square" },
          desc: { "zh-Hant": "這兩個點可以一起走，距離剛好，也很適合把第一天的城市照片留在這裡。", en: "These two places sit naturally together and make an easy place to anchor the first set of city photos." },
          tags: [{ label: { "zh-Hant": "城市地標", en: "City icons" }, tone: "city" }],
        },
        {
          period: { "zh-Hant": "下午｜書頁與室內留白", en: "Afternoon | Pages and indoor pause" },
          title: { "zh-Hant": "State Library Victoria", en: "State Library Victoria" },
          desc: { "zh-Hant": "圖書館是很好的室內緩衝點，圓頂閱覽室本身就很值得待一下。", en: "The library is a good indoor pause, and the domed reading room is worth a proper linger." },
          tags: [{ label: { "zh-Hant": "室內留白", en: "Indoor pause" }, tone: "note" }],
        },
        {
          period: { "zh-Hant": "傍晚｜河岸收尾", en: "Evening | Finish by the river" },
          title: { "zh-Hant": "Yarra River 散步與晚餐", en: "Yarra River walk and dinner" },
          desc: { "zh-Hant": "把第一天的最後留給河岸，散步加吃飯比再多塞一個點更剛好。", en: "Finishing the first day with the river, a walk, and dinner works much better than forcing one more stop." },
          tags: [{ label: { "zh-Hant": "河岸夜色", en: "Riverside evening" }, tone: "night" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "10:40", en: "10:40" },
          label: { "zh-Hant": "抵達", en: "Arrival" },
          title: { "zh-Hant": "抵達墨爾本，通關與取車", en: "Arrive in Melbourne, clear immigration, and collect the car" },
          note: { "zh-Hant": "通關、取車與進市區後通常已接近中午，第一段行程請保留彈性。", en: "The city walk usually starts closer to midday, so this first stretch should not be packed tightly." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "入境", en: "Immigration" }, tone: "transfer" }],
        },
        {
          time: { "zh-Hant": "12:00 左右", en: "Around 12:00" },
          label: { "zh-Hant": "咖啡", en: "Coffee" },
          title: { "zh-Hant": "Degraves Street 早午餐", en: "Brunch on Degraves Street" },
          note: { "zh-Hant": "用餐後沿 Degraves Street 往 Flinders Street Station 移動。", en: "This stretch is there to bring in the Melbourne mood, not to be rushed." },
          eventClass: "event-meal",
          flags: [{ label: { "zh-Hant": "慢步調", en: "Slow pace" }, tone: "food" }],
        },
        {
          time: { "zh-Hant": "下午", en: "Afternoon" },
          label: { "zh-Hant": "城市", en: "City" },
          title: { "zh-Hant": "Flinders Street Station、廣場與圖書館", en: "Station, square, and library" },
          note: { "zh-Hant": "這三段可以順著城市步行一路接起來，不必來回拉扯。", en: "These three parts can be connected in one natural city walk without unnecessary backtracking." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "步行", en: "Walking" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "傍晚", en: "Evening" },
          label: { "zh-Hant": "河岸", en: "River" },
          title: { "zh-Hant": "Yarra River 晚餐與收尾", en: "Dinner and a finish by the Yarra" },
          note: { "zh-Hant": "第一天不用追太多點，把夜色留在河邊就很剛好。", en: "The first day does not need more stops. Letting dusk settle by the river is enough." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "夜色", en: "Evening light" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "今天主要是城市步行，好走的鞋會比拍照鞋更重要。",
          en: "This is mostly a city walking day, so comfortable shoes matter more than photo shoes.",
        },
        {
          "zh-Hant": "傍晚河邊和室內外溫差會有感，薄外套放包裡最實際。",
          en: "The river and the indoor-outdoor shift can feel cooler by evening, so a light layer is worth carrying.",
        },
        {
          "zh-Hant": "通關與取車時間若比預期長，優先保留早午餐、圖書館與河岸，其餘景點可略過。",
          en: "There is no need to prove anything on arrival day. Letting the trip begin slowly is often what makes it feel like a real start.",
        },
      ],
    },
    {
      id: "day2",
      day: { "zh-Hant": "Day 2", en: "Day 2" },
      date: "2026-05-25",
      city: { "zh-Hant": "Great Ocean Road", en: "Great Ocean Road" },
      theme: { "zh-Hant": "海岸線、公路與斷崖大景", en: "Coastline, road air, and cliff-edge views" },
      preview: {
        "zh-Hant": "07:00 前離開墨爾本，經 Lorne、Apollo Bay 前往十二門徒岩；全天車程長，晚上直接回飯店休息。",
        en: "This day asks for an early start and a long drive, but the coastline steadily turns the hours into scenery.",
      },
      intro: {
        "zh-Hant": "今天是全程最長的公路日。午餐與補給放在沿路小鎮，下午集中走十二門徒岩、Loch Ard Gorge 與 London Arch；水、防曬、墨鏡與防風外套請隨身攜帶。",
        en: "Today belongs to the coastline and the road. The beauty is not only the Apostles, but also the wind, the horizon, and the pauses along the way. Bring water, sunscreen, sunglasses, and a layer.",
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
          note: { "zh-Hant": "越早出發，沿路停靠和下午主景就越從容", en: "The earlier the start, the easier the coast stops and main viewpoints feel" },
        },
        area: {
          value: { "zh-Hant": "Lorne / Apollo Bay / Twelve Apostles / Loch Ard Gorge / London Arch", en: "Lorne / Apollo Bay / Twelve Apostles / Loch Ard Gorge / London Arch" },
          note: { "zh-Hant": "停靠點依海岸公路由東往西排列", en: "The stops all unfold along the same coastal line" },
        },
        highlights: {
          value: { "zh-Hant": "海景公路、小鎮停靠、斷崖大景", en: "Sea-road views, town pauses, and cliff-edge scenery" },
          note: { "zh-Hant": "沿途公路視野與觀景停靠也是今天的重點", en: "The best part often builds gradually between the big sights" },
        },
        energy: {
          value: { "zh-Hant": "偏累，長途移動日", en: "Tiring, long-move day" },
          note: { "zh-Hant": "回到墨爾本通常已經不早，晚上就留給休息", en: "You will likely return to Melbourne late, so the night should stay easy" },
        },
        walk: {
          value: { "zh-Hant": "中等", en: "Moderate" },
          note: { "zh-Hant": "景點之間以車程為主，每個點是短步道和觀景停留", en: "The drive takes most of the day, with shorter walks at the actual viewpoints" },
        },
        wear: {
          value: { "zh-Hant": "好走鞋 + 防風薄外套 + 防曬", en: "Walking shoes, a wind layer, and sun protection" },
          note: { "zh-Hant": "海邊風大，帽子最好是穩一點的款式", en: "The coast gets windy, so a secure hat works better than a loose one" },
        },
        food: {
          value: { "zh-Hant": "Lorne 或 Apollo Bay 午間補給", en: "Lunch and coffee around Lorne or Apollo Bay" },
          note: { "zh-Hant": "沿路把休息點和吃飯放一起，回程會輕鬆很多", en: "Pairing lunch with a rest stop makes the return drive much easier" },
        },
        transport: {
          value: { "zh-Hant": "租車自駕或一日遊，全日以公路移動為主", en: "Self-drive or a tour, with the whole day centred on the road" },
          note: { "zh-Hant": "自駕請記得預留休息、加油與停車緩衝", en: "If driving, leave room for rest, fuel, and parking pauses" },
        },
        booking: {
          value: { "zh-Hant": "集合時間 / 停靠節奏", en: "Tour timing or stop rhythm" },
          note: { "zh-Hant": "如果跟團，重點是守集合時間；如果自駕，重點是不要貪多。", en: "If you join a tour, respect the timing. If you drive yourself, the key is not overloading the route." },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜出發與沿途風景", en: "Morning | Depart and watch the coast open" },
          title: { "zh-Hant": "07:00 前離開墨爾本", en: "Leave the city early and let the coastline take over" },
          desc: { "zh-Hant": "避開市區車流，也替午間補給與下午觀景台保留足夠時間。", en: "The earlier you leave Melbourne, the more complete the afternoon around the major views becomes." },
          tags: [{ label: { "zh-Hant": "早起", en: "Early start" }, tone: "warm" }],
        },
        {
          period: { "zh-Hant": "中午｜小鎮補給", en: "Midday | Small-town fuel stop" },
          title: { "zh-Hant": "Lorne 或 Apollo Bay 午餐", en: "Lunch around Lorne or Apollo Bay" },
          desc: { "zh-Hant": "午間休息放在沿路小鎮最剛好，補水、上洗手間和咖啡都能一起處理。", en: "A small coastal town pause works best for lunch, water, a toilet break, and another coffee if needed." },
          tags: [{ label: { "zh-Hant": "補給", en: "Fuel stop" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "下午｜大景集中段", en: "Afternoon | Main cliff-edge stretch" },
          title: { "zh-Hant": "Twelve Apostles、Loch Ard Gorge、London Arch", en: "Twelve Apostles, Loch Ard Gorge, and London Arch" },
          desc: { "zh-Hant": "三個觀景點距離相對集中，依現場風勢、停車與日照狀況調整停留時間。", en: "The main viewpoints sit best together in the afternoon, with the horizon, cliffs, and wind carrying the whole stretch." },
          tags: [{ label: { "zh-Hant": "海岸主景", en: "Coast highlight" }, tone: "coast" }],
        },
        {
          period: { "zh-Hant": "傍晚｜回程上路", en: "Evening | Begin the return" },
          title: { "zh-Hant": "傍晚開始返回墨爾本", en: "Let the return simply be the return" },
          desc: { "zh-Hant": "回程依路況約需數小時，途中安排一次休息與加油，不再新增景點。", en: "The day is already long, so once the major viewpoints are done, it is best to get back to the city steadily." },
          tags: [{ label: { "zh-Hant": "長途回程", en: "Long return" }, tone: "transfer" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "06:30 - 07:00", en: "06:30 - 07:00" },
          label: { "zh-Hant": "出發", en: "Depart" },
          title: { "zh-Hant": "離開墨爾本市區", en: "Leave Melbourne" },
          note: { "zh-Hant": "這天一早就出發，能把最好的光線和最不趕的節奏留在海岸線上。", en: "Starting early keeps the better light and the least rushed pace for the coastline itself." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "提早", en: "Early" }, tone: "warm" }],
        },
        {
          time: { "zh-Hant": "上午", en: "Morning" },
          label: { "zh-Hant": "沿途", en: "En route" },
          title: { "zh-Hant": "Lorne、Apollo Bay 一帶停靠", en: "Coastal pauses around Lorne and Apollo Bay" },
          note: { "zh-Hant": "在小鎮完成午餐、洗手間、補水與加油，避免下午主景之間再繞路。", en: "These stops are best used for rest, food, and fresh air, and they deepen the road-trip mood." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "小鎮補給", en: "Town break" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "下午", en: "Afternoon" },
          label: { "zh-Hant": "主景", en: "Highlights" },
          title: { "zh-Hant": "十二門徒岩與 Loch Ard Gorge", en: "Twelve Apostles and Loch Ard Gorge" },
          note: { "zh-Hant": "下午主景集中，停車後多為短步道；風大時注意帽子與隨身物品。", en: "This is the part of the day that deserves the most time from the scenery itself." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "海岸", en: "Coast" }, tone: "coast" }],
        },
        {
          time: { "zh-Hant": "20:00 - 22:00", en: "20:00 - 22:00" },
          label: { "zh-Hant": "回程", en: "Return" },
          title: { "zh-Hant": "回到墨爾本，晚上只留給休息", en: "Return to Melbourne and keep the night only for rest" },
          note: { "zh-Hant": "這天的體力花在海岸線上就夠了，不需要再安排夜生活。", en: "The energy for this day is already spent on the road and the coast, so there is no need to add nightlife." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "休息", en: "Rest" }, tone: "note" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "今天最重要的是早出發、沿路補水，還有不要把回程後的晚上再排滿。",
          en: "The three priorities today are leaving early, staying hydrated, and not filling the night after the return.",
        },
        {
          "zh-Hant": "海邊光線很好，但風也很大，防曬和防風要一起想。",
          en: "The coast can offer beautiful light and strong wind at the same time, so think sun and wind together.",
        },
        {
          "zh-Hant": "自駕請依天候與體力刪減停靠點，優先保留十二門徒岩與 Loch Ard Gorge。",
          en: "If one viewpoint feels especially right, stay with it a little longer instead of forcing every possible named stop.",
        },
      ],
    },
    {
      id: "day3",
      day: { "zh-Hant": "Day 3", en: "Day 3" },
      date: "2026-05-26",
      city: { "zh-Hant": "Melbourne → Phillip Island", en: "Melbourne → Phillip Island" },
      theme: { "zh-Hant": "慢城市午後，接上海風與企鵝歸巢", en: "A slower city morning that turns into sea wind and Penguin Parade" },
      preview: {
        "zh-Hant": "上午留在墨爾本吃早午餐，午後自駕前往 Phillip Island；海岸步道、晚餐與企鵝歸巢排在同一路線。",
        en: "Keep the morning softer and move to the coast later, so dinner by the sea and Penguin Parade feel like one complete arc.",
      },
      intro: {
        "zh-Hant": "上午只安排近距離早午餐或逛街，午后再往 Phillip Island。抵達後先走 Nobbies Centre 一帶，晚餐後進場等候企鵝；夜間海風強，需準備保暖外套。",
        en: "This is a good day for a little flexibility. Use the morning for a brunch or light browsing, then shift the mood toward coastline wind and the penguins returning ashore. The evening layer matters a lot.",
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
          value: { "zh-Hant": "上午不必太早，14:00 左右再往海邊走", en: "No need for an early start; head out around 14:00" },
          note: { "zh-Hant": "今天的重點在傍晚與晚上，不在早晨衝行程", en: "The weight of this day sits in the late afternoon and evening, not the morning" },
        },
        area: {
          value: { "zh-Hant": "Melbourne CBD / Phillip Island / Penguin Parade", en: "Melbourne CBD / Phillip Island / Penguin Parade" },
          note: { "zh-Hant": "白天在市區，傍晚後轉為海岸戶外行程", en: "The city by day and the coast by night bring two very different moods" },
        },
        highlights: {
          value: { "zh-Hant": "brunch、海邊晚餐、企鵝歸巢", en: "Brunch, a seaside dinner, and Penguin Parade" },
          note: { "zh-Hant": "海岸步道受風勢影響，出發前再確認天氣", en: "If the weather behaves, the whole day feels especially memorable" },
        },
        energy: {
          value: { "zh-Hant": "普通到偏累", en: "Steady to tiring" },
          note: { "zh-Hant": "白天輕鬆，但回程會晚，體力還是要保留", en: "The daytime stays light, but the return comes late and still asks for energy" },
        },
        walk: {
          value: { "zh-Hant": "低到中等", en: "Low to moderate" },
          note: { "zh-Hant": "主要是看點停留和園區步行", en: "Mostly shorter walks around stops and the parade area" },
        },
        wear: {
          value: { "zh-Hant": "厚一點的外套 + 好走鞋", en: "A warmer outer layer and good shoes" },
          note: { "zh-Hant": "企鵝歸巢後氣溫和海風都會明顯下來", en: "The temperature and wind feel very different once the penguin session starts" },
        },
        food: {
          value: { "zh-Hant": "市區 brunch / The Cerberus Beach House 晚餐", en: "City brunch / dinner at The Cerberus Beach House" },
          note: { "zh-Hant": "海邊晚餐剛好可以把海岸線節奏接進企鵝歸巢之前", en: "The seaside dinner bridges naturally into the penguin session" },
        },
        transport: {
          value: { "zh-Hant": "租車自駕，單程約 2 小時", en: "Self-drive, around 2 hours each way" },
          note: { "zh-Hant": "回程會是深夜，回到市區不建議再加其它安排", en: "The return reaches back into the night, so it is best not to add anything after it" },
        },
        booking: {
          value: { "zh-Hant": "企鵝歸巢票券 / 入場時段", en: "Penguin Parade tickets and entry timing" },
          note: { "zh-Hant": "下午出發前再對一次，會比較安心", en: "It is worth checking again before you leave in the afternoon" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜把城市放慢", en: "Morning | Slow the city down" },
          title: { "zh-Hant": "睡晚一點、咖啡或輕鬆逛街", en: "Sleep in, take coffee, or browse lightly" },
          desc: { "zh-Hant": "今天不需要像大洋路那樣一早就衝，把體力留給晚上的海邊風和回程。", en: "There is no need to push this morning like the coast day. Save the energy for the evening wind and late return." },
          tags: [{ label: { "zh-Hant": "留白", en: "Breathing room" }, tone: "note" }],
        },
        {
          period: { "zh-Hant": "下午｜往海邊切換", en: "Afternoon | Shift to the coast" },
          title: { "zh-Hant": "開往 Phillip Island", en: "Drive toward Phillip Island" },
          desc: { "zh-Hant": "離開城市後，今天的光線、氣味和節奏都會變得很不一樣。", en: "Once you leave the city behind, the light, the air, and the whole pace change noticeably." },
          tags: [{ label: { "zh-Hant": "自駕", en: "Drive" }, tone: "transfer" }],
        },
        {
          period: { "zh-Hant": "傍晚｜海邊餐桌", en: "Late afternoon | Seaside table" },
          title: { "zh-Hant": "The Cerberus Beach House", en: "The Cerberus Beach House" },
          desc: { "zh-Hant": "晚餐與洗手間在入園前處理完，避免 Penguin Parade 等候期間臨時離席。", en: "A proper dinner before the parade feels more like a real trip than rushing straight to the penguins." },
          tags: [{ label: { "zh-Hant": "海邊晚餐", en: "Seaside dinner" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "晚上｜企鵝歸巢", en: "Evening | Penguin Parade" },
          title: { "zh-Hant": "日落後等候企鵝上岸", en: "Save the day for the moment that matters" },
          desc: { "zh-Hant": "入場後依工作人員指引就座，日落後等待企鵝上岸；夜間請降低音量並遵守攝影規定。", en: "The moment the penguins come in from the sea is the part of the day worth truly slowing down for." },
          tags: [{ label: { "zh-Hant": "經典體驗", en: "Signature moment" }, tone: "outdoor" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "上午", en: "Morning" },
          label: { "zh-Hant": "城市", en: "City" },
          title: { "zh-Hant": "brunch、咖啡或最後一段輕鬆逛市區", en: "Brunch, coffee, or an easy final city wander" },
          note: { "zh-Hant": "今天的上午是柔軟的，不需要跟 Day 2 一樣把身體拉到很早。", en: "The morning stays deliberately soft and does not need the same early strain as Day 2." },
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
          note: { "zh-Hant": "先把吃飯和風景接在一起，再進企鵝園區，心情會更完整。", en: "Linking dinner to the coast before the penguin session makes the evening feel more complete." },
          eventClass: "event-meal",
          flags: [{ label: { "zh-Hant": "海邊", en: "Seaside" }, tone: "food" }],
        },
        {
          time: { "zh-Hant": "晚上", en: "Evening" },
          label: { "zh-Hant": "野生動物", en: "Wildlife" },
          title: { "zh-Hant": "企鵝歸巢", en: "Penguin Parade" },
          note: { "zh-Hant": "通常不能拍照，適合把手機放下來，安靜看一段。", en: "Photography is usually restricted, which makes this a good moment to put the phone away and simply watch." },
          eventClass: "event-outdoor",
          flags: [{ label: { "zh-Hant": "海風強", en: "Windy" }, tone: "outdoor" }],
        },
        {
          time: { "zh-Hant": "深夜", en: "Late night" },
          label: { "zh-Hant": "回程", en: "Return" },
          title: { "zh-Hant": "開回墨爾本市區", en: "Drive back to central Melbourne" },
          note: { "zh-Hant": "回到市區後直接休息，讓身體為隔天的轉場保留一點餘裕。", en: "Once back in Melbourne, it is best to rest directly and keep some margin for tomorrow's city transfer." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "晚歸", en: "Late finish" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "這天最重要的是晚上保暖，企鵝歸巢時的海風跟白天完全是不同世界。",
          en: "The most important thing today is warmth at night; the sea wind during Penguin Parade feels very different from daytime city weather.",
        },
        {
          "zh-Hant": "企鵝歸巢前先完成晚餐與洗手間，入場後就不必臨時離席。",
          en: "Sorting dinner and practical breaks before the parade makes the whole experience much more comfortable.",
        },
        {
          "zh-Hant": "企鵝歸巢後直接返回墨爾本，不再安排市區夜景或購物。",
          en: "The return comes late, so resist the urge to add a final city stop on top of it. Tomorrow will feel much better.",
        },
      ],
    },
    {
      id: "day4",
      day: { "zh-Hant": "Day 4", en: "Day 4" },
      date: "2026-05-27",
      city: { "zh-Hant": "Melbourne → Sydney", en: "Melbourne → Sydney" },
      theme: { "zh-Hant": "墨爾本收尾，午後飛往雪梨", en: "Wrap Melbourne, then fly into Sydney" },
      preview: {
        "zh-Hant": "上午在飯店附近吃早午餐，取行李、還車後搭 13:00 的 JQ514；抵達雪梨後先入住達令港。",
        en: "This day is not about squeezing in another attraction. It is about giving Melbourne a clean final half-day before the flight to Sydney.",
      },
      intro: {
        "zh-Hant": "今天以交通為主。上午活動範圍不要離飯店太遠，預留取行李、還車與國內線報到時間；抵達雪梨後只安排飯店周邊晚餐與散步。",
        en: "Treat today as a transfer day. The morning can still hold brunch and a final city walk, but from midday onward the focus belongs to luggage, the airport, and the first evening in Sydney. Comfort matters most.",
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
          note: { "zh-Hant": "今天的上午最好不要拉遠，隨時能回飯店拿行李最重要", en: "The morning works best when it stays close enough to return for the luggage easily" },
        },
        area: {
          value: { "zh-Hant": "Melbourne Central / Emporium / MEL T4 / Darling Harbour", en: "Melbourne Central / Emporium / MEL T4 / Darling Harbour" },
          note: { "zh-Hant": "整天其實就是兩段城市和一段航班", en: "The day really holds two city fragments with one flight between them" },
        },
        highlights: {
          value: { "zh-Hant": "Melbourne 最後半天、JQ514、雪梨第一晚", en: "The last Melbourne half-day, JQ514, and the first Sydney evening" },
          note: { "zh-Hant": "今天的亮點在節奏，不在點數量", en: "Today’s highlight is the rhythm itself, not the number of stops" },
        },
        energy: {
          value: { "zh-Hant": "普通", en: "Steady" },
          note: { "zh-Hant": "轉場本身就會花心力，不建議再排過滿", en: "The transfer already takes energy, so the day should not be overloaded" },
        },
        walk: {
          value: { "zh-Hant": "中等", en: "Moderate" },
          note: { "zh-Hant": "上午是城市步行，下午是機場動線", en: "The morning walks, the afternoon moves through airport flow" },
        },
        wear: {
          value: { "zh-Hant": "舒服好穿、方便進出機場的層次", en: "Comfortable layers that work well in airports" },
          note: { "zh-Hant": "這天不用為了拍照特別犧牲舒適度", en: "This is not the day to sacrifice comfort for an outfit" },
        },
        food: {
          value: { "zh-Hant": "Melbourne brunch / 機場輕食 / 達令港晚餐", en: "Melbourne brunch / airport snack / dinner by Darling Harbour" },
          note: { "zh-Hant": "不要讓機場時間把午餐拖得太狼狽", en: "Try not to let airport timing turn lunch into something messy" },
        },
        transport: {
          value: { "zh-Hant": "市區 → 飯店拿行李 → 機場 → JQ514 → Sydney", en: "City → hotel bags → airport → JQ514 → Sydney" },
          note: { "zh-Hant": "今天的移動方式很清楚，照節奏走就好", en: "The movement pattern is very clear today, and works best when left simple" },
        },
        booking: {
          value: { "zh-Hant": "13:00 JQ514", en: "13:00 JQ514" },
          note: { "zh-Hant": "請把中午前回飯店拿行李這件事放在時間軸中心", en: "Keep the hotel bag pickup before noon as the main anchor of the day" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜墨爾本最後一段", en: "Morning | One last Melbourne window" },
          title: { "zh-Hant": "早午餐與近距離 city walk", en: "Brunch and a nearby city walk" },
          desc: { "zh-Hant": "今天的活動範圍以飯店周邊和市中心商場街區為主，隨時能折返拿行李最重要。", en: "The useful zone today stays around the hotel and the central retail streets, because being able to turn back for luggage easily matters most." },
          tags: [{ label: { "zh-Hant": "近距離", en: "Nearby" }, tone: "city" }],
        },
        {
          period: { "zh-Hant": "中午｜行李與機場", en: "Midday | Luggage and airport" },
          title: { "zh-Hant": "把轉場本身排成主行程", en: "Make the transfer itself the main plan" },
          desc: { "zh-Hant": "11:30 前回飯店取行李，接著還車、報到並搭乘 13:00 的 JQ514。", en: "What matters most today is moving yourself comfortably and on time from Melbourne to Sydney, not squeezing in one more sight." },
          tags: [{ label: { "zh-Hant": "轉場", en: "Transfer" }, tone: "transfer" }],
        },
        {
          period: { "zh-Hant": "下午｜飛往雪梨", en: "Afternoon | Fly to Sydney" },
          title: { "zh-Hant": "JQ514 把旅程切成兩個城市節奏", en: "JQ514 divides the trip into two city moods" },
          desc: { "zh-Hant": "航程約 1 小時 25 分；抵達 SYD T2 後，再轉乘市區交通前往達令港。", en: "The flight itself is short, but emotionally it becomes a clear hinge between two halves of the trip." },
          tags: [{ label: { "zh-Hant": "班機", en: "Flight" }, tone: "warm" }],
        },
        {
          period: { "zh-Hant": "傍晚｜先穩住新城市", en: "Evening | Settle the new city first" },
          title: { "zh-Hant": "入住達令港，把雪梨留到明天完整展開", en: "Check in at Darling Harbour and let Sydney unfold properly tomorrow" },
          desc: { "zh-Hant": "辦理入住後在達令港用餐，飯店周邊散步即可，不再跨區前往 Circular Quay。", en: "A night view, dinner, and rest all work better here than racing into sightseeing on the first Sydney evening." },
          tags: [{ label: { "zh-Hant": "港邊夜色", en: "Harbour night" }, tone: "night" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "上午", en: "Morning" },
          label: { "zh-Hant": "城市", en: "City" },
          title: { "zh-Hant": "Melbourne Central、Emporium、Bourke Street 周邊", en: "Around Melbourne Central, Emporium, and Bourke Street" },
          note: { "zh-Hant": "這些點距離近，也最方便中途折回飯店。", en: "These areas stay close together and make the luggage return easiest." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "最後散步", en: "Final walk" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "11:30 - 12:00", en: "11:30 - 12:00" },
          label: { "zh-Hant": "行李", en: "Bags" },
          title: { "zh-Hant": "回飯店整理與取行李", en: "Return to the hotel for bags" },
          note: { "zh-Hant": "上午請以取行李、還車與準時抵達機場為優先。", en: "The core of the day is not another stop, but keeping the transfer smooth." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "重要", en: "Key anchor" }, tone: "transfer" }],
        },
        {
          time: { "zh-Hant": "13:00", en: "13:00" },
          label: { "zh-Hant": "飛行", en: "Flight" },
          title: { "zh-Hant": "JQ514 墨爾本飛雪梨", en: "JQ514 from Melbourne to Sydney" },
          note: { "zh-Hant": "這段飛行把旅程正式帶進第二個城市。", en: "This flight is what moves the trip into its second city." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "JQ514", en: "JQ514" }, tone: "warm" }],
        },
        {
          time: { "zh-Hant": "16:30 後", en: "After 16:30" },
          label: { "zh-Hant": "入住", en: "Check-in" },
          title: { "zh-Hant": "抵達達令港，雪梨第一晚放輕一點", en: "Arrive at Darling Harbour and keep the first Sydney night light" },
          note: { "zh-Hant": "今天晚上只要先把新城市收進來就好，重點放在明天。", en: "Tonight only needs to bring the new city into view. Save the bigger Sydney focus for tomorrow." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "新城市", en: "New city" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "今天最重要的是不要把上午排太遠，回飯店拿行李的餘裕一定要留。",
          en: "The main rule today is not to drift too far in the morning; the hotel return for luggage needs breathing room.",
        },
        {
          "zh-Hant": "穿著以長時間移動方便為主，證件、充電線與薄外套放在隨身行李。",
          en: "Dress for comfort. A good transfer day mood usually comes from not fighting your luggage or the airport.",
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
      city: { "zh-Hant": "Sydney Harbour / Darling Harbour", en: "Sydney Harbour / Darling Harbour" },
      theme: { "zh-Hant": "港灣晨光、歌劇院與海生館的一天", en: "Harbour morning light, the Opera House, and the aquarium" },
      preview: {
        "zh-Hant": "早餐從 Opera Quays 或 MCA Cafe 開始，沿 Circular Quay 走到歌劇院；下午回達令港逛海生館。",
        en: "Today works best as a slower harbour line that lets breakfast, the light, the Opera House, and the aquarium all connect naturally.",
      },
      intro: {
        "zh-Hant": "今天步行量較高，上午集中在歌劇院與 Circular Quay，下午轉入 SEA LIFE Sydney Aquarium，晚餐回達令港；請穿好走的鞋並準備防曬。",
        en: "This is one of the most Sydney-feeling days of the trip. Wear comfortable shoes, leave room for the harbour and Circular Quay light, and resist the urge to hurry. Sydney often looks best when it is given a little patience.",
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
          note: { "zh-Hant": "早一點到，光線和座位都比較舒服", en: "An earlier arrival helps with both the light and the seating" },
        },
        area: {
          value: { "zh-Hant": "Circular Quay / Sydney Opera House / Darling Harbour", en: "Circular Quay / Sydney Opera House / Darling Harbour" },
          note: { "zh-Hant": "上午集中在 Circular Quay，下午回到達令港", en: "The zone is concentrated today, so the day works best as a harbour-to-harbour glide" },
        },
        highlights: {
          value: { "zh-Hant": "港邊早餐、歌劇院、Circular Quay、SEA LIFE", en: "Harbour breakfast, the Opera House, Circular Quay, and SEA LIFE" },
          note: { "zh-Hant": "早餐地點與港灣步行在同一區，可減少早上轉乘", en: "Including breakfast here makes the whole day feel more like a true travel day instead of a straight attraction run" },
        },
        energy: {
          value: { "zh-Hant": "普通", en: "Steady" },
          note: { "zh-Hant": "今天不需要早起到很辛苦，但步行時間會比 Day 4 長", en: "It does not need the strain of an early start, but there is more walking than Day 4" },
        },
        walk: {
          value: { "zh-Hant": "中等偏多", en: "Moderate to moderately high" },
          note: { "zh-Hant": "港灣和市中心之間會走不少路", en: "There is a fair amount of walking between the harbour points and the city edge" },
        },
        wear: {
          value: { "zh-Hant": "好走鞋、防曬、墨鏡、薄外套", en: "Walking shoes, sunscreen, sunglasses, and a light layer" },
          note: { "zh-Hant": "白天日照明顯，傍晚回港邊時再加一層就好", en: "Daylight can feel quite bright, while the extra layer is mostly for later" },
        },
        food: {
          value: { "zh-Hant": "Wahlburgers Opera Quays 或 MCA Cafe / 達令港晚餐", en: "Wahlburgers Opera Quays or MCA Cafe / dinner at Darling Harbour" },
          note: { "zh-Hant": "早餐是今天很重要的開場，不要太隨便略過", en: "Breakfast is a real part of the day here, not just something to rush through" },
        },
        transport: {
          value: { "zh-Hant": "步行 + 輕軌 / 市區火車", en: "Walking + light rail / city train" },
          note: { "zh-Hant": "今天不太需要自駕，港灣步行反而是最好看的部分", en: "There is no real need for a car; walking the harbour is the day’s best feature" },
        },
        booking: {
          value: { "zh-Hant": "早餐稍早到 / 海生館票券確認", en: "Arrive a bit early for breakfast / confirm aquarium tickets" },
          note: { "zh-Hant": "想坐得更舒服或拍到好光線，早餐時間不要壓太晚", en: "If the seat and the light matter, do not leave breakfast too late" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜港灣早餐與晨間散步", en: "Morning | The harbour wakes slowly" },
          title: { "zh-Hant": "早餐排在歌劇院附近", en: "Place breakfast near the Opera House" },
          desc: { "zh-Hant": "選 Opera Quays 或 MCA Cafe，吃完可直接步行前往歌劇院與 Circular Quay。", en: "Putting breakfast by the harbour turns the day’s first light into part of the experience, not a thing you arrive at later." },
          tags: [{ label: { "zh-Hant": "港灣早餐", en: "Harbour breakfast" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "中午｜港邊散步", en: "Midday | Walk the harbour edge" },
          title: { "zh-Hant": "Circular Quay 與歌劇院一帶", en: "Circular Quay and the Opera House" },
          desc: { "zh-Hant": "這段不用走得太急，風景本身就值得留一點慢時間。", en: "This stretch is not meant to be rushed. The harbour itself deserves time." },
          tags: [{ label: { "zh-Hant": "城市大景", en: "City icon" }, tone: "coast" }],
        },
        {
          period: { "zh-Hant": "下午｜把重點換成室內", en: "Afternoon | Shift into an indoor note" },
          title: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" },
          desc: { "zh-Hant": "下午接海生館剛好，也讓整天的節奏有一段室內緩衝。", en: "The aquarium fits the afternoon well and gives the day a useful indoor reset." },
          tags: [{ label: { "zh-Hant": "室內段落", en: "Indoor pause" }, tone: "note" }],
        },
        {
          period: { "zh-Hant": "傍晚｜回到達令港", en: "Evening | Return to Darling Harbour" },
          title: { "zh-Hant": "晚餐與港灣夜色", en: "Dinner and harbour night light" },
          desc: { "zh-Hant": "海生館結束後已回到飯店附近，可直接安排晚餐並沿水岸散步。", en: "Closing back at Darling Harbour feels right, because the day then moves cleanly from daytime harbour light into night-time water views." },
          tags: [{ label: { "zh-Hant": "夜景", en: "Night view" }, tone: "night" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "08:00", en: "08:00" },
          label: { "zh-Hant": "早餐", en: "Breakfast" },
          title: { "zh-Hant": "Wahlburgers Opera Quays 或 MCA Cafe", en: "Wahlburgers Opera Quays or MCA Cafe" },
          note: { "zh-Hant": "讓這一天從港灣和餐桌一起開始，而不是空腹趕路。", en: "Let the day begin with the harbour and the table together rather than rushing out unfed." },
          eventClass: "event-meal",
          flags: [{ label: { "zh-Hant": "景好", en: "Great light" }, tone: "food" }],
        },
        {
          time: { "zh-Hant": "10:00 左右", en: "Around 10:00" },
          label: { "zh-Hant": "港灣", en: "Harbour" },
          title: { "zh-Hant": "歌劇院與 Circular Quay 散步", en: "Walk the Opera House and Circular Quay" },
          note: { "zh-Hant": "港邊日照與風勢都明顯，途中補擦防曬並留意飲水。", en: "This is the part of the day most worth moving through slowly." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "慢走", en: "Slow walk" }, tone: "coast" }],
        },
        {
          time: { "zh-Hant": "13:30", en: "13:30" },
          label: { "zh-Hant": "室內", en: "Indoor" },
          title: { "zh-Hant": "SEA LIFE Sydney Aquarium", en: "SEA LIFE Sydney Aquarium" },
          note: { "zh-Hant": "把室內段放在下午，很剛好也比較不容易累。", en: "An indoor stop in the afternoon balances the day nicely." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "轉室內", en: "Indoors" }, tone: "note" }],
        },
        {
          time: { "zh-Hant": "18:00", en: "18:00" },
          label: { "zh-Hant": "夜色", en: "Evening" },
          title: { "zh-Hant": "達令港晚餐與散步", en: "Dinner and a walk in Darling Harbour" },
          note: { "zh-Hant": "讓今天停在港邊的夜色就很好，不用再多塞點。", en: "Letting the day stop on harbour light is enough; there is no need to add more." },
          eventClass: "event-highlight",
          flags: [{ label: { "zh-Hant": "港邊收尾", en: "Harbour finish" }, tone: "night" }],
        },
      ],
      reminders: [
        {
          "zh-Hant": "今天步行量會比前一天高，好走鞋和防曬比任何穿搭靈感都重要。",
          en: "Walking load climbs again today, so good shoes and sun protection matter more than outfit ideas.",
        },
        {
          "zh-Hant": "早餐若想坐窗邊或拍晨間港景，建議提早抵達並預留候位時間。",
          en: "If the breakfast spot feels especially right, stay a little longer. That kind of travel feeling is often worth more than rushing to the next stop.",
        },
        {
          "zh-Hant": "海生館安排在下午，可避開較強日照，也讓雙腳有一段室內休息。",
          en: "The aquarium in the afternoon is not just convenient; it also gives the day a nice change in pace.",
        },
      ],
    },
    {
      id: "day6",
      day: { "zh-Hant": "Day 6", en: "Day 6" },
      date: "2026-05-29",
      city: { "zh-Hant": "Sydney CBD / Airport", en: "Sydney CBD / Airport" },
      theme: { "zh-Hant": "最後半天的城市節奏，晚上回程", en: "A final city half-day, then the night flight home" },
      preview: {
        "zh-Hant": "上午走 QVB、Hyde Park 與周邊街區，午餐後完成最後採買；17:30 回飯店取行李，19:00 前往機場。",
        en: "Today is about giving the final half-day to central Sydney, then heading back for the luggage and the airport cleanly in the evening.",
      },
      intro: {
        "zh-Hant": "白天活動集中在雪梨市中心，不安排遠郊。購物結束後回達令港取行李，國際線至少保留三小時報到與安檢時間。",
        en: "There is no need to squeeze out one more attraction. Let QVB, Hyde Park, and the final shopping take the daytime, then keep the evening for luggage and the flight home.",
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
          note: { "zh-Hant": "今天不必太早，把精神留給最後一段整理和回程", en: "There is no need to start especially early today" },
        },
        area: {
          value: { "zh-Hant": "QVB / Hyde Park / Darling Harbour / Sydney Airport", en: "QVB / Hyde Park / Darling Harbour / Sydney Airport" },
          note: { "zh-Hant": "白天集中在同一區，晚上再往機場走", en: "Keep the daytime in one area, then pivot to the airport in the evening" },
        },
        highlights: {
          value: { "zh-Hant": "最後一段城市散步、午餐、補買與回程夜晚", en: "The final city walk, lunch, shopping, and the departure night" },
          note: { "zh-Hant": "這一天的重點是收尾感，不是再衝一次景點", en: "The aim is a good ending, not another hard sightseeing push" },
        },
        energy: {
          value: { "zh-Hant": "輕鬆", en: "Light" },
          note: { "zh-Hant": "步調可以舒服一點，但晚上的國際線還是要留神", en: "The daytime can stay easy, but the evening flight still needs proper attention" },
        },
        walk: {
          value: { "zh-Hant": "中等", en: "Moderate" },
          note: { "zh-Hant": "最後補買和市區散步會讓步數還是有感", en: "The shopping and city walk still add up in steps" },
        },
        wear: {
          value: { "zh-Hant": "舒服、好收納，外套放手邊", en: "Comfortable, easy to pack, with a layer kept handy" },
          note: { "zh-Hant": "晚上進機場前後溫度和冷氣都可能有差", en: "Airport air-conditioning and the evening temperature can feel different again" },
        },
        food: {
          value: { "zh-Hant": "市區午餐 / 機場前簡單補給", en: "Lunch in the city / a simple airport snack later" },
          note: { "zh-Hant": "午餐時間可以順便把最後補買一起解決", en: "Lunch is a good time to fold in the last shopping round" },
        },
        transport: {
          value: { "zh-Hant": "步行 + Airport Line / Uber", en: "Walking + airport line / Uber" },
          note: { "zh-Hant": "如果戰利品變多或體力下降，晚上直接 Uber 會更輕鬆", en: "If shopping bags increase or energy drops, Uber often becomes the kinder option" },
        },
        booking: {
          value: { "zh-Hant": "22:10 國際線回程", en: "22:10 international departure" },
          note: { "zh-Hant": "傍晚請先回飯店拿行李，國際線至少抓 3 小時緩衝", en: "Return for the luggage first in the late afternoon and keep at least a three-hour buffer for the international flight" },
        },
      },
      routeFlow: [
        {
          period: { "zh-Hant": "上午｜最後一段市區散步", en: "Morning | One last city walk" },
          title: { "zh-Hant": "QVB、Hyde Park 與周邊街區", en: "QVB, Hyde Park, and the surrounding streets" },
          desc: { "zh-Hant": "這段很適合留給最後的城市感，不需要特別拉遠。", en: "This zone is enough for the final city feel without needing to reach farther away." },
          tags: [{ label: { "zh-Hant": "市中心", en: "CBD" }, tone: "city" }],
        },
        {
          period: { "zh-Hant": "中午｜午餐與補買", en: "Midday | Lunch and the final shopping round" },
          title: { "zh-Hant": "把最後想買的集中處理", en: "Handle the last things you want to buy" },
          desc: { "zh-Hant": "集中購買已確認的品項，並預留行李整理與回飯店時間。", en: "The shopping does not need to be ambitious today; only the things you really want are enough." },
          tags: [{ label: { "zh-Hant": "最後補買", en: "Last buys" }, tone: "food" }],
        },
        {
          period: { "zh-Hant": "傍晚｜回飯店與拿行李", en: "Late afternoon | Return and collect luggage" },
          title: { "zh-Hant": "把回程變得乾淨俐落", en: "Make the departure feel clean and calm" },
          desc: { "zh-Hant": "回飯店拿行李這一步請不要拖到太晚，會直接影響回程心情。", en: "Do not leave the luggage pickup too late, because it strongly shapes the whole feel of the departure." },
          tags: [{ label: { "zh-Hant": "時間緩衝", en: "Buffer" }, tone: "transfer" }],
        },
        {
          period: { "zh-Hant": "晚上｜往機場走", en: "Evening | Head to the airport" },
          title: { "zh-Hant": "把雪梨最後留在夜色裡", en: "Let Sydney end in night light" },
          desc: { "zh-Hant": "今晚只要好好收尾，不要讓回程變成最後的壓力。", en: "Tonight only needs to close the trip well without letting the return become the final stress point." },
          tags: [{ label: { "zh-Hant": "回程夜晚", en: "Departure night" }, tone: "night" }],
        },
      ],
      timeline: [
        {
          time: { "zh-Hant": "09:30", en: "09:30" },
          label: { "zh-Hant": "散步", en: "Walk" },
          title: { "zh-Hant": "QVB 與市中心街區", en: "QVB and the central streets" },
          note: { "zh-Hant": "今天白天不用切很多區，把最後一段城市感留在同一個範圍裡最舒服。", en: "There is no need to split the day across too many zones; keeping the last city hours together feels best." },
          eventClass: "event-city",
          flags: [{ label: { "zh-Hant": "收尾", en: "Final pass" }, tone: "city" }],
        },
        {
          time: { "zh-Hant": "13:00", en: "13:00" },
          label: { "zh-Hant": "午餐", en: "Lunch" },
          title: { "zh-Hant": "午餐與最後補買", en: "Lunch and the final shopping round" },
          note: { "zh-Hant": "把最後想帶回家的東西在這段處理掉，傍晚就能輕鬆一點。", en: "Getting the last purchases out of the way around lunch makes the evening much cleaner." },
          eventClass: "event-meal",
          flags: [{ label: { "zh-Hant": "補買", en: "Shopping" }, tone: "food" }],
        },
        {
          time: { "zh-Hant": "17:30", en: "17:30" },
          label: { "zh-Hant": "行李", en: "Bags" },
          title: { "zh-Hant": "回飯店拿行李", en: "Return to the hotel for luggage" },
          note: { "zh-Hant": "不要拖到太晚，讓自己留著比較從容的國際線緩衝。", en: "Do not delay this too far into the evening; a more generous international buffer feels much better." },
          eventClass: "event-transport",
          flags: [{ label: { "zh-Hant": "重要", en: "Important" }, tone: "transfer" }],
        },
        {
          time: { "zh-Hant": "19:00", en: "19:00" },
          label: { "zh-Hant": "機場", en: "Airport" },
          title: { "zh-Hant": "前往 Sydney Airport", en: "Head to Sydney Airport" },
          note: { "zh-Hant": "今晚就讓移動乾乾淨淨地結束，不需要再硬加一個點。", en: "Let the final movement stay clean tonight rather than forcing in one more stop." },
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
          en: "If the day is feeling good already, there is no need to scramble the departure rhythm just to add one more stop.",
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
    { item: { "zh-Hant": "餐食", en: "Meals" }, aud: 700, note: { "zh-Hant": "兩人 6 天舒服吃法", en: "A comfortable dining pace for two over the six core days" }, status: "estimated" },
    { item: { "zh-Hant": "一日遊 / 門票", en: "Day tour / tickets" }, aud: 360, note: { "zh-Hant": "抓一個代表性日遊與門票緩衝", en: "Allows for one signature day outing and ticket buffer" }, status: "estimated" },
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
        "zh-Hant": "蛋白石是澳洲辨識度較高的珠寶選擇；若要購買，請把證書、產地與預算放在外觀之前確認。",
        en: "If you want one souvenir that stays with the trip for a long time, opal still feels unmistakably Australian and quietly memorable.",
      },
      buy: {
        "zh-Hant": "建議在市區珠寶店比較，優先確認證書、產地、色澤與售後資訊。",
        en: "Best chosen slowly in a city jeweller, with more attention on certification, origin, and colour than on the cheapest ticket.",
      },
      range: { "zh-Hant": "價格感：從小墜飾到正式珠寶差異很大", en: "Price feel: ranges from small pendants to serious jewellery" },
      href: "https://www.australia.com/en-us/facts-and-planning/about-australia/australian-souvenirs.html",
    },
    {
      name: { "zh-Hant": "Tim Tam / 澳洲超市零食", en: "Tim Tam and supermarket snacks" },
      subname: { "zh-Hant": "Tim Tam / 巧克力餅乾 / 超市伴手禮", en: "Tim Tam / chocolate biscuits / supermarket gifts" },
      image: "./assets/souvenir-timtam-card.svg",
      tags: [
        { label: { "zh-Hant": "最好買", en: "Easy buy" }, tone: "food" },
        { label: { "zh-Hant": "機場也能補", en: "Airport friendly" }, tone: "transfer" },
      ],
      note: {
        "zh-Hant": "Tim Tam 與超市零食適合送人，也容易控制預算與數量；可在前幾天分批購入。",
        en: "If you want to clear the gift shopping early, Tim Tam and other supermarket snacks are still the easiest low-regret options.",
      },
      buy: {
        "zh-Hant": "Coles、Woolworths 和機場商店都好買；提早分批買會比最後一天一次扛回來輕鬆。",
        en: "They are easy to find at Coles, Woolworths, and the airport, and buying them in smaller rounds is easier than carrying them all on the last day.",
      },
      range: { "zh-Hant": "價格感：平價，適合多買幾盒", en: "Price feel: affordable and easy to buy in multiples" },
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
        en: "If you want something more polished that you will still use later, Aesop is a very easy final-day pick.",
      },
      buy: {
        "zh-Hant": "墨爾本和雪梨門市都不少，護手霜、香皂和隨身噴霧都很適合旅行後繼續用。",
        en: "Both Melbourne and Sydney have plenty of stores, and the smaller hand-care or aromatic items travel especially well.",
      },
      range: { "zh-Hant": "價格感：中高", en: "Price feel: mid to premium" },
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
        en: "Compared with a bulky coat, a scarf, shawl, or smaller wool piece is easier to carry and feels more like taking Australian autumn home.",
      },
      buy: {
        "zh-Hant": "優先選擇澳洲製或材質標示清楚的款式，並確認保養方式與行李空間。",
        en: "Pieces that are Australian-made or clearly labelled for fibre content are usually the safest bet for gifts or for yourself.",
      },
      range: { "zh-Hant": "價格感：中價位到高價位都有", en: "Price feel: mid to premium" },
      href: "https://www.sydney.com/articles/best-souvenirs-from-australia",
    },
  ],
  souvenirTips: [
    {
      title: { "zh-Hant": "超市伴手禮提早分批買", en: "Clear the easy gifts first" },
      desc: {
        "zh-Hant": "超市零食、Tim Tam 這種早一點買掉，最後一天才不會同時卡在購物、吃飯和回程節奏裡。",
        en: "Buying the easy snack-style gifts earlier means the final day does not have to juggle shopping, meals, and departure timing all at once.",
      },
    },
    {
      title: { "zh-Hant": "珠寶與保養品留在市中心挑", en: "Leave jewellery and polished buys for the end" },
      desc: {
        "zh-Hant": "蛋白石或 Aesop 可安排在 Day 6 的 QVB 與市中心區域，購買後再回飯店整理行李。",
        en: "The buys that deserve slow attention, like opal or Aesop, fit much better into Day 6 around central Sydney.",
      },
    },
    {
      title: { "zh-Hant": "羊毛和設計品先看來源", en: "Check provenance on wool and design buys" },
      desc: {
        "zh-Hant": "只要來源和材質標示清楚，通常買起來會更安心，也比較有紀念價值。",
        en: "When the provenance and material details are clearly shown, the purchase usually feels safer and more meaningful.",
      },
    },
  ],
  souvenirSources: [
    {
      title: { "zh-Hant": "挑選原則", en: "Selection logic" },
      desc: {
        "zh-Hant": "優先考量重量、保存方式、用途與澳洲產地標示，避免購買體積大或不易攜帶的品項。",
        en: "This page leans toward things that travel well, feel recognisable, and still get used later, rather than souvenir ideas that only photograph well in the moment.",
      },
    },
    {
      title: { "zh-Hant": "與這趟路線相符", en: "An extension of the trip mood" },
      desc: {
        "zh-Hant": "蛋白石、羊毛、澳洲品牌與超市零食，分別對應珠寶、秋季衣物、城市購物與送禮需求。",
        en: "The shopping choices try to stay aligned with the route itself: coast, autumn, Australian brands, and city life rather than an arbitrary shopping list.",
      },
    },
  ],
  checklistGroups: [
    {
      title: { "zh-Hant": "文件與入境", en: "Documents and entry" },
      items: [
        { id: "passport", title: { "zh-Hant": "護照效期", en: "Passport validity" }, desc: { "zh-Hant": "確認回程日後仍有足夠效期，並把護照拍照留在手機。", en: "Make sure the passport stays valid beyond the return date and keep a copy on your phone." } },
        { id: "eta", title: { "zh-Hant": "澳洲 ETA", en: "Australia ETA" }, desc: { "zh-Hant": "出發前務必完成，避免把入境文件拖到最後一刻。", en: "Finish the ETA before departure rather than leaving entry documents to the final moment." } },
        { id: "insurance", title: { "zh-Hant": "旅遊保險", en: "Travel insurance" }, desc: { "zh-Hant": "保單號碼與聯絡方式一起存到手機裡。", en: "Keep the policy number and contact details on your phone as well." } },
      ],
    },
    {
      title: { "zh-Hant": "訂單與票券", en: "Bookings and tickets" },
      items: [
        { id: "mel-hotel", title: { "zh-Hant": "墨爾本飯店", en: "Melbourne hotel" }, desc: { "zh-Hant": "5/24 到 5/27 的住宿已確認，地址和入住資料請先截圖。", en: "The Melbourne stay is confirmed; screenshot the address and check-in details before departure." } },
        { id: "syd-hotel", title: { "zh-Hant": "雪梨飯店", en: "Sydney hotel" }, desc: { "zh-Hant": "5/27 到 5/29 的住宿已確認，回程夜晚會用到。", en: "The Sydney stay is confirmed and becomes important again on the departure night." } },
        { id: "domestic", title: { "zh-Hant": "JQ514 國內線", en: "JQ514 domestic flight" }, desc: { "zh-Hant": "起飛時間 13:00，Day 4 請把拿行李和機場緩衝一起抓進去。", en: "The flight leaves at 13:00, so keep the luggage pickup and airport buffer tied to it." } },
        { id: "car", title: { "zh-Hant": "墨爾本租車", en: "Melbourne rental car" }, desc: { "zh-Hant": "取車、還車、駕照與信用卡文件放在同一個地方最安心。", en: "Keep the pickup, return, licence, and payment documents together for the rental day." } },
      ],
    },
    {
      title: { "zh-Hant": "行李與穿搭", en: "Packing and layers" },
      items: [
        { id: "layer", title: { "zh-Hant": "薄外套 / 稍厚外套", en: "Light layer and one warmer outer layer" }, desc: { "zh-Hant": "市區白天舒服，但大洋路、Phillip Island 和晚上回程都會用到。", en: "The cities can feel easy in the day, but the coast, Phillip Island, and the return night all call for it." } },
        { id: "shoes", title: { "zh-Hant": "好走的鞋", en: "Walking shoes" }, desc: { "zh-Hant": "Day 1、Day 5、Day 6 的步行量都不小，比任何拍照鞋都更值得。", en: "Day 1, Day 5, and Day 6 all ask enough walking to make this more important than any photo-focused shoe." } },
        { id: "adapter", title: { "zh-Hant": "澳規轉接頭", en: "AU plug adapter" }, desc: { "zh-Hant": "手機、相機、行動電源都會用到，這個不要留到最後想起來。", en: "Your phone, camera, and power bank all depend on this, so do not leave it to the last minute." } },
        { id: "license", title: { "zh-Hant": "駕照 / 國際駕照", en: "Driver's licence / IDP" }, desc: { "zh-Hant": "Day 2、Day 3 的長線移動都靠它，和租車文件放一起最穩。", en: "The longer driving days depend on it, so keep it with the rental car paperwork." } },
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
        driveTime: { "zh-Hant": "適合用早午餐打開旅程", en: "Good for opening the trip with brunch" },
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
        note: { "zh-Hant": "Phillip Island 晚上的重點", en: "The key evening moment on Phillip Island" },
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
        driveTime: { "zh-Hant": "Day 5、Day 6 都會以這裡為中心", en: "Day 5 and Day 6 both orbit from here" },
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
        driveTime: { "zh-Hant": "適合最後補買與午餐", en: "Good for final shopping and lunch" },
        open: "https://www.google.com/maps/search/?api=1&query=QVB+Sydney",
        embed: "https://www.google.com/maps?q=QVB+Sydney&output=embed",
      },
    ],
  },
};

function getInitialPage() {
  const hashPage = window.location.hash.replace(/^#/, "").split("/")[0];
  const storedPage = storage.get(STORAGE_KEYS.page);

  if (PAGE_IDS.includes(hashPage)) return hashPage;
  return PAGE_IDS.includes(storedPage) ? storedPage : "overview";
}

function getInitialBudgetFilter() {
  const storedBudgetFilter = storage.get(STORAGE_KEYS.budgetFilter);
  return ["all", "actual", "estimated"].includes(storedBudgetFilter) ? storedBudgetFilter : "all";
}

function getInitialSelectedDay() {
  const storedDay = storage.get(STORAGE_KEYS.day);
  return data.days.some((day) => day.id === storedDay) ? storedDay : data.days[0].id;
}

const state = {
  lang: storage.get(STORAGE_KEYS.lang) || "zh-Hant",
  currency: storage.get(STORAGE_KEYS.currency) || "TWD",
  page: getInitialPage(),
  budgetFilter: getInitialBudgetFilter(),
  selectedDay: getInitialSelectedDay(),
};

function getText(entry) {
  if (entry == null) return "";
  if (typeof entry === "string") return entry;
  return entry?.[state.lang] ?? entry?.["zh-Hant"] ?? "";
}

function formatCurrency(aud, currency = state.currency) {
  const meta = rates[currency];
  return `${meta.symbol}${Math.round(aud * meta.audPerUnit).toLocaleString()}`;
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

function getSelectedDay() {
  return data.days.find((day) => day.id === state.selectedDay) || data.days[0];
}

function getSelectedDayIndex() {
  const index = data.days.findIndex((day) => day.id === state.selectedDay);
  return index >= 0 ? index : 0;
}

function cacheDom() {
  dom.pageProgress = document.getElementById("pageProgress");
  dom.pageAnnouncer = document.getElementById("pageAnnouncer");
  dom.heroKicker = document.getElementById("heroKicker");
  dom.heroTitle = document.getElementById("heroTitle");
  dom.heroSubtitle = document.getElementById("heroSubtitle");
  dom.heroChipRow = document.getElementById("heroChipRow");
  dom.heroLead = document.getElementById("heroLead");
  dom.heroDestinations = document.getElementById("heroDestinations");
  dom.heroRhythm = document.getElementById("heroRhythm");
  dom.heroSummary = document.getElementById("heroSummary");
  dom.tripSnapshotGrid = document.getElementById("tripSnapshotGrid");
  dom.tripThemeChips = document.getElementById("tripThemeChips");
  dom.paceStrip = document.getElementById("paceStrip");
  dom.routeFlowGrid = document.getElementById("routeFlowGrid");
  dom.journeyHighlights = document.getElementById("journeyHighlights");
  dom.dayPreviewGrid = document.getElementById("dayPreviewGrid");
  dom.practicalInfoGrid = document.getElementById("practicalInfoGrid");
  dom.flightCards = document.getElementById("flightCards");
  dom.flightNotes = document.getElementById("flightNotes");
  dom.airportGuides = document.getElementById("airportGuides");
  dom.stayCards = document.getElementById("stayCards");
  dom.stayAdvantages = document.getElementById("stayAdvantages");
  dom.moveDayTimeline = document.getElementById("moveDayTimeline");
  dom.moveOptions = document.getElementById("moveOptions");
  dom.daySelector = document.getElementById("daySelector");
  dom.dayDetail = document.getElementById("dayDetail");
  dom.mapDayRoutes = document.getElementById("mapDayRoutes");
  dom.mapList = document.getElementById("mapList");
  dom.mapFrame = document.getElementById("mapFrame");
  dom.fullRouteLink = document.getElementById("fullRouteLink");
  dom.budgetSelectedHeading = document.getElementById("budgetSelectedHeading");
  dom.budgetHighlights = document.getElementById("budgetHighlights");
  dom.budgetTableBody = document.getElementById("budgetTableBody");
  dom.budgetCards = document.getElementById("budgetCards");
  dom.budgetFilterButtons = Array.from(document.querySelectorAll("[data-budget-filter]"));
  dom.souvenirsGrid = document.getElementById("souvenirsGrid");
  dom.souvenirTips = document.getElementById("souvenirTips");
  dom.souvenirSources = document.getElementById("souvenirSources");
  dom.checklistGroups = document.getElementById("checklistGroups");
  dom.linksGrid = document.getElementById("linksGrid");
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

function syncUrlHash() {
  const nextHash = state.page === "overview" ? "" : `#${state.page}`;
  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
  window.history.replaceState(null, "", nextUrl);
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

  dom.flightNotes.innerHTML = data.flightNotes
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");

  dom.airportGuides.innerHTML = data.airportGuides
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");
}

function renderStays() {
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

  dom.stayAdvantages.innerHTML = data.stays.advantages
    .map((item) => `<article class="bullet-card"><div class="bullet-title">${getText(item.title)}</div><div class="bullet-desc">${getText(item.desc)}</div></article>`)
    .join("");

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
  dom.daySelector.innerHTML = data.days
    .map(
      (day) => `
        <button class="day-selector-btn ${day.id === state.selectedDay ? "active" : ""}" type="button" data-day-select="${day.id}" aria-label="${getText(day.day)}" aria-pressed="${day.id === state.selectedDay}">
          <div class="day-selector-day">${getText(day.day)}</div>
          <div class="day-selector-city">${getText(day.city)}</div>
          <div class="day-selector-meta">${formatDateLabel(day.date, true)}</div>
        </button>
      `
    )
    .join("");

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
                    ${item.tags ? `<div class="tag-row" style="margin-top: 12px;">${item.tags.map((tag) => renderTag(tag)).join("")}</div>` : ""}
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
                      ${item.flags ? `<div class="timeline-flags" style="margin-top: 12px;">${item.flags.map((flag) => renderTag(flag, "timeline-flag")).join("")}</div>` : ""}
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
            ${day.reminders.map((item) => `<article class="reminder-card"><div class="bullet-desc" style="margin-top: 0;">${getText(item)}</div></article>`).join("")}
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
              <div class="info-line"><span class="info-label">${getText({ "zh-Hant": "價格感", en: "Price feel" })}</span><span class="info-value">${getText(item.range)}</span></div>
            </div>
            <a class="hotel-link" href="${item.href}" target="_blank" rel="noreferrer" aria-label="${getText(item.name)}">${t[state.lang].openLink}</a>
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
}

function updateLanguage(nextLang) {
  if (!nextLang || nextLang === state.lang) return;
  state.lang = nextLang;
  storage.set(STORAGE_KEYS.lang, state.lang);
  syncControls();
  renderAll();
  syncPageNavigation();
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

function updateChecklistItem(id, checked) {
  if (!id) return;
  const next = checklistState();
  next[id] = checked;
  saveChecklist(next);
  renderChecklist();
}

function setPage(page, { scroll = true } = {}) {
  if (!PAGE_IDS.includes(page)) return;
  state.page = page;
  storage.set(STORAGE_KEYS.page, page);
  syncUrlHash();
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
  } else if (scroll) {
    window.requestAnimationFrame(() => {
      dom.dayDetail?.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
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

function initApp() {
  cacheDom();
  renderAll();
  syncControls();
  syncPageNavigation();
  syncUrlHash();
  bindUIEvents();
  bindProgress();
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
