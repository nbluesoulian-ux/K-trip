# 🛫 K-Trip (Korea Travel OS)

> **한국 여행, 계획부터 도착까지 마찰 없이 한 번에.**  
> *Your Korea Trip, Planned in Minutes — The Frictionless Travel Platform for Global Explorers.*

---

## 📖 프로젝트 소개 (Project Overview)

**K-Trip**은 외국인 및 한국 방문 여행객들이 입국 전부터 여행 종료 시까지 겪는 모든 현실적인 문제(교통카드, eSIM, 지도/네비게이션, 비자, 결제 등)를 빠르고 직관적으로 해결해 주는 **마찰 없는(Frictionless) 한국 여행 올인원 웹 플랫폼**입니다.

---

## ✨ 핵심 기능 (Key Features)

### 1. 🎬 GSAP Video Frame Scrubbing Hero
- **인천공항 착륙부터 서울 도심 도착까지**: 스크롤 동작과 정밀하게 동기화되는 GSAP ScrollTrigger 기반 비디오 스크러빙 인터랙션.
- 감성적인 트래블 비주얼과 함께 자연스럽게 서비스의 핵심 가치로 사용자를 유도합니다.

### 2. 💊 1:1 Capsule Hero Problem Solver
- 여행자가 자주 마주치는 핵심 키워드를 **1:1 캡슐(알약) 칩**과 **스마트 검색바**로 제공.
- 키워드 클릭 또는 검색 시 문제 매칭 알고리즘을 통해 상세 해결 가이드 팝오버를 즉시 띄워 마찰 없는 정보 탐색 지원.

### 3. 🗺️ 단계별 여행 가이드 (Step-by-Step Guides)
- **Before Landing (출발 전)**: K-ETA 비자, 환전/트래블카드, 여행자 보험.
- **Arrival (공항 도착)**: 공항철도(AREX), eSIM/SIM 수령, T-Money 교통카드.
- **On the Road (국내 이동)**: 카카오맵/네이버지도 사용법, KTX 예매, 배달앱 활용.
- **Emergency (긴급 지원)**: 1330 관광통역안내, 분실물 센터, 외국인 진료 병원.

### 4. 🧭 Local Concierge & Quick Tools
- 실시간 날씨, 오늘의 환율, 지하철 막차 시간, 비자 자격 퀵 체크 모달 및 인터랙티브 컨시어지 지원.

---

## 🛠️ 기술 스택 (Tech Stack)

| 구분 | 기술 |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `tw-animate-css` |
| **Animation** | [GSAP 3.15](https://greensock.com/gsap/) + ScrollTrigger |
| **UI Components** | [Base UI](https://base-ui.com/), [Shadcn UI](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/) |

---

## 🚀 시작하기 (Getting Started)

### 설치 및 로컬 실행

```bash
# 1. 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` (또는 지정 포트)으로 접속합니다.

### 프로덕션 빌드

```bash
npm run build
npm run start
```

---

## 📂 프로젝트 구조 (Directory Structure)

```
K-trip/
├── public/
│   ├── images/          # 주요 랜드마크 및 최적화 이미지
│   └── videos/          # GSAP 스크러빙 전용 배경 비디오
├── src/
│   ├── app/             # Next.js App Router (layout.tsx, page.tsx, globals.css)
│   ├── components/      # K-Trip 전용 UI 컴포넌트
│   │   ├── home/        # Hero, VideoScrubbing, ProblemSolver, Guides, Concierge 등
│   │   ├── illustrations/ # 인터랙티브 핀 및 팝업 애니메이션 래퍼
│   │   └── ui/          # Button, Dialog 등 공통 프리미티브
│   ├── data/            # 여행지, 실전 가이드북 정적 데이터
│   ├── lib/             # 문제 매칭 엔진(problem-matcher), 유틸리티 함수
│   └── types/           # 여행 관련 인터페이스 및 타입 정의
├── package.json
└── README.md
```

---

## 📄 라이선스 (License)

This project is licensed under the MIT License.
