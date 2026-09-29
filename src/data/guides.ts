import { SolutionGuide, HelpTopic } from "@/types/trip";

export const SOLUTION_GUIDES: SolutionGuide[] = [
  {
    slug: "entry",
    stage: "before-trip",
    title: {
      en: "Enter Korea",
      ko: "대한민국 입국 준비",
    },
    shortDescription: {
      en: "Visa, K-ETA and arrival steps",
      ko: "비자 면제 여부, K-ETA 및 입국 심사 절차",
    },
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=1000&q=85",
    imageAlt: {
      en: "Gyeongbokgung Palace entrance gate in Seoul",
      ko: "서울 경복궁 광화문 전경",
    },
    keywords: [
      "visa", "k-eta", "keta", "passport", "entry", "immigration", "q-code", "customs", "arrival", "flights",
      "비자", "입국", "여권", "심사", "케이이티에이", "큐코드"
    ],
    estimatedMinutes: 3,
    conciergeAvailable: true,
    badge: {
      en: "Must-check",
      ko: "필수 확인",
    },
    quickAction: {
      label: {
        en: "Check passport visa status",
        ko: "내 여권 비자 조건 확인",
      },
      actionType: "visa-check",
    },
    checklist: [
      { en: "Passport valid for at least 6 months", ko: "유효기간 6개월 이상 남은 여권" },
      { en: "K-ETA or Visa check completed", ko: "K-ETA 면제 대상 또는 비자 발급 여부 확인" },
      { en: "Q-Code health declaration submitted within 48h", ko: "출국 48시간 전 Q-Code 작성" },
      { en: "Return flight ticket details handy", ko: "귀국 또는 제3국 출국 항공권 준비" },
    ],
    steps: [
      {
        title: { en: "1. Confirm your K-ETA or Visa requirement", ko: "1. K-ETA 면제 또는 비자 필요 여부 확인" },
        description: {
          en: "Travelers from 22 countries (US, UK, Japan, Australia, Germany, etc.) are temporarily exempt from K-ETA through Dec 2026. Other eligible nationalities must apply online at k-eta.go.kr at least 72 hours before departure.",
          ko: "미국, 영국, 일본, 호주, 독일 등 22개국 국적자는 2026년 말까지 K-ETA가 한시 면제됩니다. 그 외 대상국은 공식 사이트(k-eta.go.kr)에서 최소 72시간 전 신청해야 합니다.",
        },
        tip: {
          en: "Watch out for unofficial scam websites charging high fees. The official fee is only 10,000 KRW (~$8 USD).",
          ko: "비공식 대행 사이트의 수수료 바가지에 유의하세요. 대한민국 정부 공식 수수료는 1만 원입니다.",
        },
      },
      {
        title: { en: "2. Fill out Q-Code before boarding", ko: "2. 탑승 전 Q-Code 모바일 검역 정보 입력" },
        description: {
          en: "Complete the online health declaration at qcode.kdca.go.kr up to 48 hours prior to departure to generate a QR code for express quarantine exit.",
          ko: "qcode.kdca.go.kr에서 항공기 탑승 전 미리 건강 상태를 입력하면 입국장 검역대를 QR코드로 신속 통과할 수 있습니다.",
        },
      },
      {
        title: { en: "3. Clear e-Gate / immigration at Incheon", ko: "3. 인천공항 입국 심사대 통과" },
        description: {
          en: "Present your passport and arrival card (or digital pass). Fingerprint scanning and camera facial capture take under 2 minutes at foreign national booths.",
          ko: "여권과 입국신고서를 제출합니다. 외국인 입국 심사대에서 지문 및 안면 촬영을 거치며 통상 2분 이내 완료됩니다.",
        },
      },
    ],
  },
  {
    slug: "stay",
    stage: "before-trip",
    title: {
      en: "Choose where to stay",
      ko: "숙소 위치 선택",
    },
    shortDescription: {
      en: "Find the right area for your trip",
      ko: "내 여행 스타일과 동선에 딱 맞는 지역 찾기",
    },
    image: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=1000&q=85",
    imageAlt: {
      en: "Traditional Hanok village alleyway in Seoul",
      ko: "고즈넉한 전주 및 북촌 한옥마을 골목길",
    },
    keywords: [
      "hotel", "stay", "accommodation", "neighborhood", "hongdae", "myeongdong", "gangnam", "hanok", "airbnb", "where to stay",
      "숙소", "호텔", "동네", "홍대", "명동", "강남", "한옥", "게스트하우스", "어디 묵을까"
    ],
    estimatedMinutes: 4,
    conciergeAvailable: true,
    badge: {
      en: "Neighborhoods",
      ko: "동네 가이드",
    },
    checklist: [
      { en: "Within 7-min walk from Subway Line 2 or Line 3", ko: "지하철 2호선 또는 3호선 도보 7분 이내" },
      { en: "Elevator access if bringing heavy luggage", ko: "대형 캐리어 소지 시 엘리베이터 유무 확인" },
      { en: "Check airport limousine bus stop proximity", ko: "인천공항 리무진 버스 정류장 인접성 확인" },
    ],
    steps: [
      {
        title: { en: "1. Match your neighborhood to your travel vibe", ko: "1. 내 여행 취향에 맞는 동네 선정" },
        description: {
          en: "Hongdae/Yeonnam: late-night energy, youth indie culture, direct AREX airport train. Myeongdong/Euljiro: first-timers, central location, easy palace access. Gangnam/Seongsu: fashion, flagship boutiques, modern cafes. Bukchon/Seochon: traditional quiet Hanok stays.",
          ko: "홍대/연남: 활기찬 밤문화, 청년 인디 문화, 공항철도 직통. 명동/을지로: 첫 여행자, 종로 궁궐 접근성 우수. 강남/성수: 트렌디 패션 및 카페 투어. 북촌/서촌: 고즈넉한 전통 한옥 체험.",
        },
      },
      {
        title: { en: "2. Prioritize Subway Line 2 (Green Circle)", ko: "2. 지하철 2호선(녹색 순환선) 접근성 우선" },
        description: {
          en: "Line 2 connects Hongdae, City Hall, Dongdaemun, Jamsil, and Gangnam without transfers. Staying within 500m of a Line 2 station cuts daily transit times by half.",
          ko: "2호선은 홍대, 시청, 동대문, 잠실, 강남을 환승 없이 연결합니다. 2호선 역 인근에 숙소를 잡으면 이동 시간이 절반으로 줄어듭니다.",
        },
      },
      {
        title: { en: "3. Watch out for hilly alleys in residential quarters", ko: "3. 구도심 언덕길 및 계단 주의" },
        description: {
          en: "Older neighborhoods like Itaewon, Haebangchon, and Ihwa-dong feature steep stairways. Look for ground-level access or check airport bus drop-off points.",
          ko: "해방촌, 이태원 언덕길, 이화동 등은 가파른 계단이 많으므로 무거운 캐리어가 있다면 평지 접근성을 미리 확인하세요.",
        },
      },
    ],
  },
  {
    slug: "destination",
    stage: "before-trip",
    title: {
      en: "Plan where to go",
      ko: "여행지 & 일정 계획",
    },
    shortDescription: {
      en: "Build a trip that fits your pace",
      ko: "무리한 이동 없이 여유롭고 알찬 다도시 코스",
    },
    image: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1000&q=85",
    imageAlt: {
      en: "Busan Haeundae coastal skyline",
      ko: "부산 해운대 해안 스카이라인",
    },
    keywords: [
      "plan", "itinerary", "where to go", "cities", "seoul", "busan", "jeju", "gyeongju", "schedule", "trip plan",
      "일정", "여행지", "도시", "서울", "부산", "제주", "경주", "코스", "계획"
    ],
    estimatedMinutes: 5,
    conciergeAvailable: true,
    badge: {
      en: "City routes",
      ko: "도시별 루트",
    },
    quickAction: {
      label: {
        en: "Help me choose a city",
        ko: "나에게 맞는 도시 추천받기",
      },
      actionType: "destination-picker",
    },
    checklist: [
      { en: "Limit to 1 city per 3-4 travel days", ko: "3~4일당 최대 1개 거점 도시로 제한" },
      { en: "Reserve KTX bullet train tickets 30 days in advance", ko: "KTX 고속철도는 30일 전 사전 예약" },
      { en: "Group daily activities by adjacent subway stops", ko: "하루 일정은 인접한 1~2개 행정구로 묶기" },
    ],
    steps: [
      {
        title: { en: "1. Pick your core multi-city combination", ko: "1. 여행 일수에 맞는 거점 도시 조합" },
        description: {
          en: "5 days: Seoul only. 7-8 days: Seoul (4 days) + Busan (3 days via 2.5h KTX). 10-12 days: Seoul (4 days) + Gyeongju (2 days) + Busan (3 days) + Jeju flight (3 days).",
          ko: "5일: 서울 집중 탐방. 7~8일: 서울(4일) + 부산(KTX 2.5시간 3일). 10~12일: 서울(4일) + 경주(2일) + 부산(3일) + 제주(국내선 3일).",
        },
      },
      {
        title: { en: "2. Reserve KTX on the official Korail website", ko: "2. KTX 공식 코레일 예약" },
        description: {
          en: "Book directly at letskorail.com without markup. Weekend morning seats to Busan sell out 2 weeks ahead during peak season.",
          ko: "letskorail.com 영문 사이트에서 정가로 직접 예약하세요. 주말 오전 서울-부산 KTX는 1~2주 전 매진될 수 있습니다.",
        },
      },
      {
        title: { en: "3. Cluster your day by geographic zones", ko: "3. 동선 낭비 없는 구역별 클러스터링" },
        description: {
          en: "Never crisscross Seoul: group Palaces + Bukchon on Day 1, Hongdae + Yeonnam on Day 2, and Gangnam + COEX on Day 3.",
          ko: "서울을 동서남북으로 횡단하지 마세요. 1일차 경복궁/북촌, 2일차 홍대/연남, 3일차 강남/코엑스처럼 구역을 묶으세요.",
        },
      },
    ],
  },
  {
    slug: "transit",
    stage: "in-korea",
    title: {
      en: "Use subway & trains",
      ko: "지하철 & 대중교통 이용",
    },
    shortDescription: {
      en: "Cards, routes and transfers",
      ko: "기후동행카드, 티머니, 환승 및 네이버지도 활용법",
    },
    image: "/images/n-seoul-tower.jpg",
    imageAlt: {
      en: "N Seoul Tower sunset panorama overlooking Seoul metro area",
      ko: "서울 도심 대중교통망과 남산 N서울타워 일몰 전경",
    },
    keywords: [
      "subway", "train", "transit", "metro", "t-money", "tmoney", "climate card", "climate", "pass", "ktx", "srt", "bus", "transfer",
      "지하철", "교통카드", "티머니", "기후동행카드", "버스", "기차", "환승", "길찾기"
    ],
    estimatedMinutes: 3,
    conciergeAvailable: true,
    badge: {
      en: "Daily transit",
      ko: "대중교통 완벽 정복",
    },
    checklist: [
      { en: "Download Naver Map or KakaoMap (English supported)", ko: "네이버지도 또는 카카오맵 영문판 다운로드" },
      { en: "Carry 20,000 KRW cash for T-Money card reloads", ko: "티머니 충전용 현금 2만 원 소지 (카드 충전 불가)" },
      { en: "Tag your card both getting on and getting off", ko: "승차 및 하차 시 단말기에 반드시 태그" },
    ],
    steps: [
      {
        title: { en: "1. Why Google Maps won't work for walking", ko: "1. 한국에서 구글맵 보행 안내가 안 되는 이유" },
        description: {
          en: "Korean national security regulations restrict high-resolution geographic data exports. Use Naver Map (supports English & Chinese) for exact subway exits, platform car numbers, and step-by-step walking routes.",
          ko: "정부 보안 규정상 구글맵은 한국 내 도보 내비게이션을 지원하지 않습니다. 지하철 출구 번호와 최적 탑승 칸까지 알려주는 네이버지도(영문 지원)를 설치하세요.",
        },
        tip: {
          en: "Set Naver Map language to English in Settings > Language.",
          ko: "네이버지도 앱 설정에서 언어를 English로 변경하면 모든 지하철역과 정류장이 영문으로 표시됩니다.",
        },
      },
      {
        title: { en: "2. Choose T-Money vs Seoul Climate Card", ko: "2. 티머니 vs 기후동행카드 선택 기준" },
        description: {
          en: "T-Money: pay-as-you-go, works nationwide on all subways, city buses, taxis, and convenience stores. Climate Card (Tourist Pass): unlimited rides in Seoul (1-day ~ 5-day options), but does not cover Shinbundang Line or trips outside Seoul.",
          ko: "티머니: 전국 모든 지하철, 시내버스, 택시, 편의점에서 결제 가능. 기후동행카드 관광권: 서울 시내 대중교통 무제한(1~5일권), 단 신분당선 및 서울 외 구간 제외.",
        },
      },
      {
        title: { en: "3. Subway etiquette & transfer discount rules", ko: "3. 무료 환승 할인 규칙 및 에티켓" },
        description: {
          en: "Tag your card within 30 minutes between subway and bus to get free transfer discounts. Keep quiet in carriages, and do not sit in designated priority seats (pregnant/elderly) even if empty.",
          ko: "하차 후 30분 이내 버스-지하철 환승 시 기본요금이 면제됩니다. 노약자석과 임산부 배려석은 비어 있어도 비워두는 것이 일반적입니다.",
        },
      },
    ],
  },
  {
    slug: "rental-car",
    stage: "both",
    title: {
      en: "Rent a car & drive",
      ko: "렌터카 대여 및 운전",
    },
    shortDescription: {
      en: "Licence, payment and pickup",
      ko: "국제면허증 지참 필수 규정 및 제주 드라이브 팁",
    },
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80",
    imageAlt: {
      en: "Scenic coastal road and sky capsule in Korea",
      ko: "한국 해안 도로 드라이브 및 바다 전경",
    },
    keywords: [
      "rental", "car", "rent a car", "driving", "license", "licence", "idp", "jeju car", "highway", "toll", "hi-pass",
      "렌트카", "렌터카", "운전", "국제면허", "국제운전면허증", "제주도 렌트", "하이패스"
    ],
    estimatedMinutes: 4,
    conciergeAvailable: true,
    badge: {
      en: "Island & Road trip",
      ko: "로드트립",
    },
    checklist: [
      { en: "Physical 1949 Geneva Convention IDP booklet (digital not accepted)", ko: "1949 제네바 협약 실물 국제운전면허증 (모바일/사진 불가)" },
      { en: "Valid home country driver's license + passport", ko: "자국 실물 운전면허증 및 여권 지참" },
      { en: "Credit card matching driver's passport name", ko: "운전자 명의의 신용카드" },
    ],
    steps: [
      {
        title: { en: "1. The strict physical IDP requirement", ko: "1. 실물 국제운전면허증 필수 지참" },
        description: {
          en: "Korean rental agencies (Lotte, SK, AJ) strictly reject photocopies, mobile photos, or digital translation apps. You MUST present the physical paper IDP booklet stamped with category 'B' issued under the 1949 Geneva Convention.",
          ko: "한국 렌터카 업체는 스마트폰 사진, 사본, 번역 공증을 인정하지 않습니다. 반드시 자국에서 발급받은 1949 제네바 협약 종이 면허증 실물을 제출해야 합니다.",
        },
      },
      {
        title: { en: "2. Where to rent vs where to avoid driving", ko: "2. 렌터카가 꼭 필요한 곳과 피해야 할 곳" },
        description: {
          en: "Do NOT rent a car in Seoul or Busan: gridlock traffic, expensive parking, and complex one-way lanes make subways faster. DO rent a car in Jeju or Gangwon countryside for coastal freedom.",
          ko: "서울과 부산 도심에서는 렌트하지 마세요. 극심한 정체와 주차난으로 지하철이 훨씬 빠릅니다. 제주도와 강원도 동해안 로드트립에 강력 추천합니다.",
        },
      },
      {
        title: { en: "3. Hi-Pass toll gates & speed camera alerts", ko: "3. 고속도로 하이패스 및 과속카메라" },
        description: {
          en: "Make sure your rental includes a Hi-Pass transponder to breeze through blue automated toll lanes. Korean navigation alerts chime 500m ahead of speed cameras—heed speed limit chimes.",
          ko: "렌터카에 하이패스 단말기가 장착되어 있는지 확인하세요. 파란색 유도선을 따라 통과하면 반납 시 톨게이트 비용을 일괄 정산할 수 있습니다.",
        },
      },
    ],
  },
  {
    slug: "delivery",
    stage: "in-korea",
    title: {
      en: "Order food & delivery",
      ko: "배달 및 음식 주문",
    },
    shortDescription: {
      en: "When apps or cards don't work",
      ko: "해외 카드 결제 거부 시 해결 방법 및 키오스크 주문",
    },
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=800&q=80",
    imageAlt: {
      en: "Korean dining table with delicious dishes",
      ko: "정갈한 한국 전통 음식 상차림",
    },
    keywords: [
      "delivery", "food", "order", "baemin", "yogiyo", "coupang", "card declined", "payment failed", "restaurant", "kiosk", "korean chicken",
      "배달", "음식", "주문", "배민", "쿠팡이츠", "카드 결제 실패", "외국인 결제", "치킨", "키오스크"
    ],
    estimatedMinutes: 3,
    conciergeAvailable: true,
    badge: {
      en: "Local food",
      ko: "야식 & 배달",
    },
    quickAction: {
      label: {
        en: "Ask local concierge to order for you",
        ko: "현지 담당자에게 배달 주문 부탁하기",
      },
      actionType: "concierge",
    },
    checklist: [
      { en: "Use apps that support foreign Visa/Mastercard without Korean cell verification", ko: "한국 통신사 본인인증 없이 해외 카드 결제되는 앱 사용" },
      { en: "Provide hotel room number and Korean delivery instructions", ko: "호텔 1층 로비 픽업 또는 객실 번호 메모 입력" },
      { en: "Ask hotel reception or KTrip concierge for cash-on-delivery", ko: "현지 카드 미지원 매장은 컨시어지 대행 요청" },
    ],
    steps: [
      {
        title: { en: "1. Why mainstream Korean delivery apps fail for tourists", ko: "1. 배민·요기요에서 해외 카드가 튕기는 이유" },
        description: {
          en: "Standard apps like Baemin and Yogiyo require a Korean resident registration number or Korean mobile carrier SMS verification. International cards get rejected at the PG gateway.",
          ko: "배달의민족과 요기요는 한국 통신사 본인 확인(KMC/NICE)을 요구하여 외국인 관광객의 해외 신용카드가 전자결제창(PG)에서 거절됩니다.",
        },
      },
      {
        title: { en: "2. The tourist-friendly delivery apps", ko: "2. 해외 카드가 지원되는 추천 앱" },
        description: {
          en: "Download Shuttle Delivery or Coupang Eats (English version). They accept foreign credit cards, provide full English menus, and deliver directly to hotels and Airbnbs.",
          ko: "셔틀 딜리버리(Shuttle) 또는 영문 지원 쿠팡이츠를 이용하세요. 외국 신용카드로 본인인증 없이 서울·부산 주요 지역 호텔로 야식을 주문할 수 있습니다.",
        },
        tip: {
          en: "Many Korean hotels require food deliveries to be picked up at the 1st floor lobby for guest safety.",
          ko: "대다수 호텔은 보안상 객실 앞 배달을 금지하므로 1층 로비나 정문에서 라이더를 만나 수령하세요.",
        },
      },
      {
        title: { en: "3. When an authentic spot isn't on English apps", ko: "3. 영문 앱에 없는 찐 로컬 맛집 주문법" },
        description: {
          en: "If you want a specific neighborhood fried chicken or pork belly spot, ask your hotel front desk or use the KTrip Local Concierge button below to have a local place the phone order for you.",
          ko: "영문 앱에 등록되지 않은 동네 찐 로컬 치킨이나 야식은 KTrip 현지 컨시어지에 요청하시면 현지 담당자가 전화 주문을 대신 진행해 드립니다.",
        },
      },
    ],
  },
];

export function getGuideBySlug(slug: HelpTopic): SolutionGuide | undefined {
  return SOLUTION_GUIDES.find((g) => g.slug === slug);
}

