export const CATEGORIES = ["코킹", "에어컨", "도배", "인테리어", "청소"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Worker = {
  id: string;
  name: string;
  rating: number;
  totalJobs: number;
  region: string;
  bio: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Product = {
  id: string;
  workerId: string;
  category: Category;
  title: string;
  priceFrom: number;
  priceTo: number;
  duration?: string;
  imageUrl: string;
  galleryUrls: string[];
  description: string;
  highlights: string[];
  reviews: Review[];
};

export const hasVideo = (p: Product) => Boolean(p.duration);

const unsplash = (id: string, w = 1200, q = 75) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const workers: Record<string, Worker> = {
  "w-001": {
    id: "w-001",
    name: "김재훈",
    rating: 4.9,
    totalJobs: 127,
    region: "서울 강남·송파",
    bio: "10년차 코킹·실리콘 전문. 매 작업 영상 기록으로 신뢰드립니다.",
  },
  "w-002": {
    id: "w-002",
    name: "박민석",
    rating: 4.8,
    totalJobs: 84,
    region: "서울 마포·서대문",
    bio: "에어컨 설치 7년. 깔끔한 배관 마감과 사후 점검까지.",
  },
  "w-003": {
    id: "w-003",
    name: "이지연",
    rating: 4.9,
    totalJobs: 213,
    region: "경기 분당·판교",
    bio: "도배·장판 전문 14년. 합지부터 실크까지 풀시공.",
  },
  "w-004": {
    id: "w-004",
    name: "정성호",
    rating: 4.7,
    totalJobs: 56,
    region: "서울 강서·양천",
    bio: "원룸·투룸 부분 인테리어 전문. 견적 명확하게 드립니다.",
  },
  "w-005": {
    id: "w-005",
    name: "최은영",
    rating: 4.9,
    totalJobs: 178,
    region: "서울 노원·도봉",
    bio: "입주청소 8년. 사진·영상 기록 + 재방문 무료.",
  },
};

export const products: Product[] = [
  {
    id: "p-001",
    workerId: "w-001",
    category: "코킹",
    title: "욕실 실리콘 풀 재시공",
    priceFrom: 120000,
    priceTo: 180000,
    duration: "12:34",
    imageUrl: unsplash("1552321554-5fefe8c9ef14"),
    galleryUrls: [
      unsplash("1564540583246-934409427776"),
      unsplash("1620626011761-996317b8d101"),
      unsplash("1556910103-1c02745aae4d"),
      unsplash("1605276374104-dee2a0ed3cd6"),
    ],
    description:
      "기존 실리콘을 완전히 제거하고 곰팡이 처리 후 프리미엄 실리콘으로 재시공합니다. 욕조·세면대·바닥 코너까지 전부 포함.",
    highlights: [
      "기존 실리콘 100% 제거 후 시공",
      "곰팡이 방지제 사전 처리",
      "전 과정 영상 기록 + 1년 A/S",
    ],
    reviews: [
      {
        id: "r-001",
        author: "김O진",
        rating: 5,
        text: "작업 영상 보고 결정했는데 진짜 깔끔하게 해주셨어요. 곰팡이 다시 안 생긴 지 6개월 째.",
        date: "2026-03-12",
      },
      {
        id: "r-002",
        author: "박O민",
        rating: 5,
        text: "기존 실리콘 뜯어내는 거부터 다 영상으로 보내주셔서 신뢰갔어요.",
        date: "2026-02-28",
      },
      {
        id: "r-003",
        author: "이O수",
        rating: 4,
        text: "전체적으로 만족. 약속시간보다 30분 늦으셨던 게 살짝 아쉬움.",
        date: "2026-02-15",
      },
    ],
  },
  {
    id: "p-002",
    workerId: "w-002",
    category: "에어컨",
    title: "벽걸이 에어컨 설치 + 배관",
    priceFrom: 180000,
    priceTo: 260000,
    duration: "08:12",
    imageUrl: unsplash("1626806787461-102c1bfaaea1"),
    galleryUrls: [
      unsplash("1565182999561-18d7dc61c393"),
      unsplash("1574691250077-03a929faece5"),
      unsplash("1502672023488-70e25813eb80"),
    ],
    description:
      "신규 벽걸이 에어컨 설치 및 배관 작업. 외부 배관 트림 마감까지 깔끔하게 처리합니다.",
    highlights: [
      "배관 길이 5m 기본 포함",
      "벽 천공 + 외부 마감 트림",
      "시운전 영상 + 누설 점검 보고서",
    ],
    reviews: [
      {
        id: "r-004",
        author: "최O호",
        rating: 5,
        text: "다른 데서 견적 30 받았다가 여기서 22에 했는데 영상 기록까지 받음. 만족.",
        date: "2026-04-02",
      },
      {
        id: "r-005",
        author: "한O리",
        rating: 5,
        text: "외부 배관 트림 깔끔. 옆집 사장님도 칭찬하심.",
        date: "2026-03-22",
      },
    ],
  },
  {
    id: "p-003",
    workerId: "w-003",
    category: "도배",
    title: "원룸 합지 도배 풀시공",
    priceFrom: 320000,
    priceTo: 420000,
    duration: "24:50",
    imageUrl: unsplash("1618220179428-22790b461013"),
    galleryUrls: [
      unsplash("1611348586804-61bf6c080437"),
      unsplash("1600585154340-be6161a56a0c"),
      unsplash("1567538096630-e0c55bd6374c"),
      unsplash("1493663284031-b7e3aefcae8e"),
    ],
    description:
      "원룸 전체 벽지 풀시공. 기존 벽지 제거, 면 정리, 합지 도배까지. 도배지 4종 선택 가능.",
    highlights: [
      "기존 벽지 제거 + 면 보수 포함",
      "합지 4종 중 선택",
      "이사 일정 맞춤 시공 가능",
    ],
    reviews: [
      {
        id: "r-006",
        author: "김O은",
        rating: 5,
        text: "이사 전날 급하게 부탁드렸는데 하루만에 끝내주심. 마감도 깔끔.",
        date: "2026-03-30",
      },
      {
        id: "r-007",
        author: "윤O지",
        rating: 5,
        text: "샘플 보내주셔서 고르기 편했어요. 영상으로 작업 과정 확인 가능한 게 좋음.",
        date: "2026-03-15",
      },
      {
        id: "r-008",
        author: "장O철",
        rating: 5,
        text: "벽지 제거할 때 면이 떡진 거 추가비용 없이 보수해주심. 추천합니다.",
        date: "2026-02-20",
      },
    ],
  },
  {
    id: "p-004",
    workerId: "w-001",
    category: "코킹",
    title: "주방 싱크대 실리콘 시공",
    priceFrom: 60000,
    priceTo: 90000,
    imageUrl: unsplash("1556909114-f6e7ad7d3136"),
    galleryUrls: [
      unsplash("1503387762-592deb58ef4e"),
      unsplash("1560448204-e02f11c3d0e2"),
    ],
    description:
      "싱크대 코너·후드 주변 실리콘 부분 시공. 작은 작업도 영상 기록 포함.",
    highlights: [
      "싱크대 + 후드 + 가스레인지 주변 일괄",
      "1년 A/S 보장",
      "당일 시공 가능 (서울권)",
    ],
    reviews: [
      {
        id: "r-009",
        author: "이O주",
        rating: 5,
        text: "작은 일인데도 꼼꼼하게 해주심. 영상까지 받으니 든든.",
        date: "2026-04-10",
      },
    ],
  },
  {
    id: "p-005",
    workerId: "w-004",
    category: "인테리어",
    title: "원룸 부분 리모델링 (벽·바닥·조명)",
    priceFrom: 1800000,
    priceTo: 2800000,
    duration: "1:08:22",
    imageUrl: unsplash("1586023492125-27b2c045efd7"),
    galleryUrls: [
      unsplash("1556228720-195a672e8a03"),
      unsplash("1583847268964-b28dc8f51f92"),
      unsplash("1542144582-1ba00456b5e3"),
      unsplash("1622372738946-62e02505feb3"),
    ],
    description:
      "원룸 단위 부분 인테리어. 도배 + 장판 + 조명 교체 + 줄눈/코킹 마감까지 패키지로.",
    highlights: [
      "도배·장판·조명 일괄 시공",
      "사전 3D 시뮬레이션 제공",
      "주차별 진행 영상 공유",
    ],
    reviews: [
      {
        id: "r-010",
        author: "강O희",
        rating: 5,
        text: "3D로 미리 보여주셔서 안심하고 진행. 비포-애프터 영상 받았는데 가족들이 다 놀람.",
        date: "2026-03-08",
      },
      {
        id: "r-011",
        author: "조O민",
        rating: 4,
        text: "기간이 예정보다 2일 늦어진 게 아쉬움. 결과물은 만족.",
        date: "2026-02-12",
      },
    ],
  },
  {
    id: "p-006",
    workerId: "w-005",
    category: "청소",
    title: "이사·입주 풀 청소 (10평~20평)",
    priceFrom: 220000,
    priceTo: 380000,
    duration: "32:18",
    imageUrl: unsplash("1581578731548-c64695cc6952"),
    galleryUrls: [
      unsplash("1631889993959-41b4e9c6e3c5"),
      unsplash("1505691938895-1758d7feb511"),
      unsplash("1622372738946-62e02505feb3"),
    ],
    description:
      "이사 직후 입주 전 풀 청소. 욕실·주방·창틀·새시·붙박이 내부까지.",
    highlights: [
      "전 영역 영상 기록",
      "재방문 1회 무료 (7일 이내)",
      "친환경 세제 사용",
    ],
    reviews: [
      {
        id: "r-012",
        author: "박O연",
        rating: 5,
        text: "창틀 곰팡이까지 다 닦아주심. 영상 보내주셔서 안 빠진 곳 확인 가능.",
        date: "2026-04-15",
      },
      {
        id: "r-013",
        author: "송O서",
        rating: 5,
        text: "재방문 무료라 안심. 다음 이사 때도 부를 듯.",
        date: "2026-03-25",
      },
    ],
  },
  {
    id: "p-007",
    workerId: "w-002",
    category: "에어컨",
    title: "에어컨 분해 청소 (벽걸이)",
    priceFrom: 90000,
    priceTo: 130000,
    imageUrl: unsplash("1565182999561-18d7dc61c393"),
    galleryUrls: [
      unsplash("1626806787461-102c1bfaaea1"),
      unsplash("1574691250077-03a929faece5"),
    ],
    description:
      "벽걸이 에어컨 완전 분해 청소. 송풍팬·열교환기·필터까지 분리 후 고압 세척.",
    highlights: [
      "완전 분해 후 고압 세척",
      "곰팡이·세균 제거 + 향균 코팅",
      "전·후 송풍 비교 영상 제공",
    ],
    reviews: [
      {
        id: "r-014",
        author: "유O한",
        rating: 5,
        text: "에어컨 켰을 때 나던 쉰내가 완전 사라짐. 분해 영상 보고 나니 더 신뢰감.",
        date: "2026-04-20",
      },
    ],
  },
  {
    id: "p-008",
    workerId: "w-003",
    category: "도배",
    title: "거실 실크벽지 부분 시공",
    priceFrom: 480000,
    priceTo: 680000,
    imageUrl: unsplash("1611348586804-61bf6c080437"),
    galleryUrls: [
      unsplash("1618220179428-22790b461013"),
      unsplash("1600585154340-be6161a56a0c"),
      unsplash("1567538096630-e0c55bd6374c"),
    ],
    description:
      "거실 한 면 또는 전체 실크벽지 시공. 무늬 매칭과 모서리 마감까지 정밀하게.",
    highlights: [
      "실크 8종 샘플 사전 발송",
      "무늬 매칭 + 모서리 정밀 마감",
      "기존 벽지 보수 포함",
    ],
    reviews: [
      {
        id: "r-015",
        author: "한O경",
        rating: 5,
        text: "무늬 결 맞추는 거 진짜 꼼꼼하심. 거실 분위기가 완전 바뀜.",
        date: "2026-03-18",
      },
      {
        id: "r-016",
        author: "오O서",
        rating: 5,
        text: "샘플 8개나 보내주셔서 고르기 편했어요.",
        date: "2026-02-25",
      },
    ],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getWorker(id: string) {
  return workers[id];
}

export function formatPriceRange(from: number, to: number) {
  const f = Math.round(from / 10000);
  const t = Math.round(to / 10000);
  return f === t ? `${f}만원` : `${f}~${t}만원`;
}
