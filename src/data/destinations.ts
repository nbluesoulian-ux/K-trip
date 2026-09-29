import { DestinationItem } from "@/types/trip";

export const DESTINATIONS: DestinationItem[] = [
  {
    id: "seoul",
    name: { en: "Seoul", ko: "서울" },
    subtitle: {
      en: "Food, nightlife, first-time Korea",
      ko: "미식, 활기찬 밤문화, 첫 한국 여행 필수 코스",
    },
    tags: [
      { en: "First trip", ko: "첫 여행 추천" },
      { en: "Nightlife", ko: "심야 명소" },
      { en: "No car needed", ko: "지하철 중심" },
    ],
    image: "/images/destinations/seoul.jpg",
    imageAlt: {
      en: "Seoul city twilight skyline and N Seoul Tower",
      ko: "황혼의 서울 도심 야경과 남산타워",
    },
    bestFor: {
      en: "First-timers wanting non-stop energy, street food & palaces",
      ko: "궁궐, K-컬처, 쇼핑과 잠들지 않는 도시의 에너지를 원하는 여행자",
    },
  },
  {
    id: "busan",
    name: { en: "Busan", ko: "부산" },
    subtitle: {
      en: "Beaches, markets, slower days",
      ko: "해변, 활기찬 어시장, 여유로운 바다 휴식",
    },
    tags: [
      { en: "Ocean view", ko: "오션뷰" },
      { en: "Seafood", ko: "해산물 미식" },
      { en: "Relaxed pace", ko: "여유로운 템포" },
    ],
    image: "/images/destinations/busan.jpg",
    imageAlt: {
      en: "Busan Haeundae coastal coastline at sunset",
      ko: "부산 해운대 해안가 일몰 풍경",
    },
    bestFor: {
      en: "Ocean lovers looking for beachside cafes & fresh seafood markets",
      ko: "바닷가 감성 카페와 신선한 자갈치 어시장을 즐기고 싶은 여행자",
    },
  },
  {
    id: "jeju",
    name: { en: "Jeju Island", ko: "제주도" },
    subtitle: {
      en: "Road trips, nature, ocean stays",
      ko: "로드트립, 화산 자연, 바다 전망 숙소",
    },
    tags: [
      { en: "Rental car", ko: "렌터카 필수" },
      { en: "Nature", ko: "청정 자연" },
      { en: "Ocean cafes", ko: "감성 카페" },
    ],
    image: "/images/destinations/jeju.jpg",
    imageAlt: {
      en: "Jeju emerald volcanic beach and blue waters",
      ko: "제주도의 에메랄드빛 해변과 맑은 바다",
    },
    bestFor: {
      en: "Road-trippers seeking volcanic peaks, quiet coastal villages & healing",
      ko: "성산일출봉, 오름, 해안 도로를 달리며 온전한 쉼을 원하는 여행자",
    },
  },
  {
    id: "gyeongju",
    name: { en: "Gyeongju", ko: "경주" },
    subtitle: {
      en: "History, calm streets, local stays",
      ko: "천년 고도 역사, 평화로운 골목, 고즈넉한 한옥",
    },
    tags: [
      { en: "Heritage", ko: "세계문화유산" },
      { en: "Quiet walks", ko: "한적한 산책" },
      { en: "Hanok stay", ko: "전통 한옥" },
    ],
    image: "/images/destinations/gyeongju.jpg",
    imageAlt: {
      en: "Traditional Hanok rooftops and lotus ponds in Gyeongju",
      ko: "경주의 고즈넉한 한옥 지붕과 연꽃 연못",
    },
    bestFor: {
      en: "Travelers seeking ancient tombs, slow strolls & authentic traditional vibe",
      ko: "불국사, 첨성대, 황리단길의 고즈넉한 정취를 사랑하는 여행자",
    },
  },
];
