import { HelpTopic } from "@/types/trip";

export interface MatchResult {
  matched: boolean;
  topic?: HelpTopic;
  score?: number;
  candidates: HelpTopic[];
}

const TOPIC_KEYWORD_MAP: Record<HelpTopic, string[]> = {
  entry: [
    "visa", "k-eta", "keta", "passport", "entry", "immigration", "q-code", "qcode", "customs",
    "arrival", "flight", "boarding", "korean visa", "exempt", "entry requirements",
    "비자", "입국", "여권", "심사", "케이이티에이", "큐코드", "세관", "출입국"
  ],
  stay: [
    "hotel", "stay", "accommodation", "hostel", "airbnb", "neighborhood", "area", "quarter",
    "hongdae", "myeongdong", "gangnam", "hanok", "where should i stay", "where to stay",
    "place to stay", "which neighborhood",
    "숙소", "호텔", "동네", "홍대", "명동", "강남", "에어비앤비", "한옥", "어디 묵을까", "지역"
  ],
  destination: [
    "plan", "itinerary", "where to go", "where should i go", "cities", "schedule", "course",
    "route", "first trip", "days trip", "vibe", "seoul or busan", "plan my trip", "trip plan",
    "일정", "여행지", "계획", "코스", "루트", "어디 갈까", "도시 추천", "여행 일정"
  ],
  transit: [
    "subway", "train", "transit", "metro", "t-money", "tmoney", "climate card", "climate pass",
    "pass", "ktx", "srt", "bus", "transfer", "turnstile", "google maps", "naver map", "kakaomap",
    "which subway pass", "subway pass", "subway line", "use the subway", "subway card",
    "지하철", "대중교통", "교통카드", "티머니", "기후동행카드", "버스", "기차", "환승", "길찾기", "네이버지도", "구글맵"
  ],
  "rental-car": [
    "rental", "rent a car", "rental car", "car rental", "driving", "driver", "license", "licence", "idp",
    "international driving permit", "highway", "toll", "hi-pass", "jeju car", "rent a car in korea",
    "렌트", "렌터카", "렌트카", "운전", "국제면허", "국제운전면허", "면허증", "제주 렌트", "하이패스"
  ],
  delivery: [
    "delivery", "food", "order", "baemin", "yogiyo", "coupang", "card declined", "payment failed",
    "payment", "takeout", "restaurant", "chicken", "kiosk", "won't accept my card", "fail",
    "order food", "foreign card", "credit card", "foreign credit card", "accept my card",
    "배달", "음식", "주문", "배달앱", "배민", "요기요", "쿠팡이츠", "카드 결제", "결제 거절", "외국인 결제", "치킨", "키오스크"
  ],
};

function matchKeyword(text: string, kw: string): boolean {
  // If ASCII word/phrase, use word boundaries to prevent substring collisions (e.g., 'car' colliding with 'card')
  if (/^[a-z0-9\s'-]+$/i.test(kw)) {
    const escaped = kw.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    return regex.test(text);
  }
  // For Korean / mixed scripts, use substring search
  return text.includes(kw);
}

export function matchProblemToTopic(input: string): MatchResult {
  const normalized = input.trim().toLowerCase();
  const allTopics: HelpTopic[] = ["entry", "stay", "destination", "transit", "rental-car", "delivery"];

  if (!normalized) {
    return {
      matched: false,
      candidates: allTopics,
    };
  }

  const scores: Record<HelpTopic, number> = {
    entry: 0,
    stay: 0,
    destination: 0,
    transit: 0,
    "rental-car": 0,
    delivery: 0,
  };

  for (const topic of allTopics) {
    const keywords = TOPIC_KEYWORD_MAP[topic];
    for (const kw of keywords) {
      if (matchKeyword(normalized, kw)) {
        // Multi-word phrases get higher priority
        const weight = kw.includes(" ") ? 3 : 1.5;
        scores[topic] += weight;
      }
    }
  }

  const sortedTopics = (Object.keys(scores) as HelpTopic[]).sort(
    (a, b) => scores[b] - scores[a]
  );

  const bestTopic = sortedTopics[0];
  const bestScore = scores[bestTopic];
  const secondTopic = sortedTopics[1];
  const secondScore = scores[secondTopic];

  // Confident match threshold
  if (bestScore >= 1.5 && bestScore > secondScore) {
    return {
      matched: true,
      topic: bestTopic,
      score: bestScore,
      candidates: sortedTopics.slice(0, 3),
    };
  }

  // Not confident enough or tied: return candidates for user choice
  const nonZeroCandidates = sortedTopics.filter((t) => scores[t] > 0);
  return {
    matched: false,
    candidates: nonZeroCandidates.length > 0 ? nonZeroCandidates : allTopics,
  };
}
