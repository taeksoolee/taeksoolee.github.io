# taeksoolee.github.io

프론트엔드 개발자 이택수의 포트폴리오 및 개인 프로젝트 저장소입니다.

🌐 **[taeksoolee.com](https://taeksoolee.com)**

---

## 메인 포트폴리오

**`/`** — Lit Web Components 기반 포트폴리오 사이트.

| 스택 | |
|---|---|
| 컴포넌트 | Lit Web Components |
| 스타일 | Tailwind CSS, DaisyUI |
| 3D | Three.js (파티클 컨스텔레이션 배경) |
| 애니메이션 | GSAP 3 + ScrollTrigger |
| 폰트 | Pretendard, Sora |

**주요 기능**
- Three.js 파티클 컨스텔레이션 Hero 배경 (마우스 시차)
- 로딩 스크린 (0→100 카운터 + clipPath 전환)
- 커스텀 듀얼 링 커서 (mix-blend-mode difference)
- GSAP 텍스트 스크램블 효과 (글자 플리커 후 확정)
- CTA 마그네틱 버튼 + 스크롤 진행도 바
- ScrollTrigger 기반 stagger 카드 등장 / 3D tilt ProjectCard
- 통계 카운트업 섹션 (StatsSection)
- 앰비언트 오브 + 필름 그레인 오버레이

---

## 프로젝트 목록

### 🎮 3D Tetris
**`/projects/3d-tetris/`**

Three.js WebGL 기반 3D 테트리스 게임.

- 7종 테트로미노 + 고스트 피스 미리보기
- 라인 클리어 시 파티클 폭발 이펙트
- 점수 시스템 및 레벨업(속도 증가)
- 소프트 드롭 / 하드 드롭 지원
- PCF 소프트 쉐도우 맵핑

**스택:** Three.js, ES6 Modules

---

### 🖼️ Background Remover App
**`/projects/background-remover-app/`**

브라우저에서 실행되는 온디바이스 AI 배경 제거 도구.

- 서버 없이 브라우저에서 직접 AI 모델 추론
- 사용 모델: `briaai/RMBG-1.4`, `Xenova/modnet`
- 드래그 앤 드롭 업로드, before/after 비교 뷰
- 처리된 이미지 다운로드

**스택:** Alpine.js, Transformers.js (Hugging Face), IndexedDB

---

### 🌐 3D Portfolio Page
**`/projects/3d-page/portfoilo/`**

Three.js와 GSAP ScrollTrigger를 활용한 3D 스크롤 포트폴리오 페이지.

- 고정 캔버스 3D 배경 + 스크롤 연동 애니메이션
- 글래스모피즘 카드 레이아웃 (좌우 교차 배치)
- 네온 사이언 보더 글로우 효과

**스택:** Three.js 0.160, GSAP 3 + ScrollTrigger

---

### 📱 Mobile App Template
**`/projects/mobile-app-template/`**

소셜 기반 모바일 앱 UI 템플릿. 다수의 화면으로 구성된 멀티 페이지 구조.

| 화면 | 경로 |
|---|---|
| 홈(피드) | `home.html` |
| 로그인 / 회원가입 | `login.html` |
| 프로필 | `profile.html` |
| 메시지 | `message.html` |
| 검색 | `search.html` |
| 알림 | `notification.html` |
| 글 작성 | `create.html` |

- 중첩 탐색 구조 (설정 → 보안 → 비밀번호 변경 등)
- 모바일 퍼스트 반응형 레이아웃
- 북마크, 좋아요, 최근 본 게시물 등 세부 화면 포함

**스택:** Bulma CSS, Font Awesome

---

### 🎤 With Speech
**`/projects/with-speech/`**

Web Speech API를 활용한 한국어 음성 기반 텍스트 리더.

- STT (Speech-to-Text): 한국어 `ko-KR` 음성 인식
- TTS (Text-to-Speech): 단어 단위 추적, 재개 기능
- 음성 명령: `처음부터` / `멈춰·그만` / `다시 시작·재생` / `이전·뒤로`
- 재생 속도 0.85x (명확한 발음)

**스택:** Web Speech API (SpeechRecognition, SpeechSynthesis), Vanilla JS

---

### 📄 PDF Converter
**`/projects/pdf-convert/`**

여러 이미지를 하나의 PDF로 변환하는 브라우저 내 도구.

- 복수 이미지 선택 → 이미지당 PDF 1페이지 생성
- Canvas API로 이미지 변환 후 jsPDF로 패키징
- 완성된 PDF 즉시 다운로드

**스택:** jsPDF 2.5.1, Canvas API, File API

---

### 🖼️ Image Services (ImgBB)
**`/projects/image-services/imgbb.html`**

ImgBB 이미지 호스팅 서비스 연동 업로드 도구.

- ImgBB API 키 관리 및 이미지 업로드
- 업로드 이력 IndexedDB 로컬 캐싱
- 이미지 갤러리 캐러셀, 파일명 커스터마이즈

**스택:** Alpine.js, Dexie.js (IndexedDB), ImgBB API, Pico CSS

---

### 🎵 Music Synthesizer
**`/projects/music/`**

Web Audio API 기반 간단한 신시사이저.

- 버튼 클릭으로 음표 시퀀스 재생
- C2~C5 옥타브 범위 실시간 오디오 합성

**스택:** Tone.js 14.8.49

---

### 🐾 Pokemon Explorer
**`/projects/pokemon/`**

PokéAPI 연동 포켓몬 탐색기. AngularJS SPA.

- 리스트 뷰 (페이지네이션: first / prev / next / last)
- 상세 뷰 (스프라이트 이미지, 스탯)
- 검색 및 필터 기능
- Angular Route 기반 SPA 라우팅

**스택:** AngularJS 1.8.3, Angular Route, PokéAPI v2, Tailwind CSS

---

### 👤 Profile Card
**`/projects/profile-card/`**

클릭으로 펼쳐지는 인터랙티브 프로필/연락처 카드.

- 토글 애니메이션으로 상세 정보 표시
- GitHub / 블로그 / 이메일 소셜 링크
- SVG 아이콘 포함 (Rocketpunch)

**스택:** Vanilla JS, CSS, Font Awesome

---

### 📋 Resume
**`/projects/resume/`**

HTML/CSS로 작성된 이력서 페이지.

- 경력 타임라인 (NextCore Technology, HAEZOOM)
- 프로젝트별 기술 스택 기재
- Three.js, amcharts4 활용 프로젝트 포함

**스택:** HTML5, CSS, Font Awesome

---

### 🎇 Vibe Coding
**`/projects/vibe-coding/`**

창의적 코딩 실험 모음.

| 파일 | 내용 |
|---|---|
| `firework.html` | 클릭 위치에서 파티클 폭죽 발사 (물리 시뮬레이션) |
| `firework-emoji.html` | 이모지 파티클 버전 |
| `particle.html` | 파티클 시스템 데모 |
| `tetris.html` | Canvas 2D 테트리스 |
| `tetris-2.html` | 테트리스 변형 버전 |

**스택:** Canvas API, requestAnimationFrame, Vanilla JS

---

### 🖱️ Cursor Eyes
**`/projects/cursor-eyes/`**

마우스를 따라 움직이는 눈 인터랙션.

- 동공이 마우스 위치를 실시간 추적
- 클릭 시 배경색 8가지 순환

**스택:** Vanilla JS, CSS Transform

---

### 🕐 Digital Clock
**`/projects/digital-clock/`**

실시간 디지털 시계. HH:MM 형식 표시.

- 분 단위 자동 업데이트 (경과 시간 보정으로 정밀 동기화)

**스택:** Vanilla JS, Date API

---

### 📜 Scroll Snap
**`/projects/scroll-snap/`**

CSS Scroll Snap을 활용한 풀 뷰포트 슬라이드 네비게이션 데모.

- 섹션별 스냅 스크롤 (mandatory)
- 오른쪽 사이드 네비게이션 도트 인디케이터
- IntersectionObserver로 현재 섹션 감지
- 마지막 방문 섹션 LocalStorage 저장/복원

**스택:** CSS Scroll Snap, jQuery, IntersectionObserver, LocalStorage

---

### 🎨 Tools
**`/projects/tools/`**

소규모 유틸리티 도구 모음.

**Color Picker** (`color-picker.html`)
- RGB ↔ Hex 색상 변환기
- 실시간 색상 미리보기, 유효성 검사 (0~255, 올바른 Hex 형식)

**스택:** jQuery, Pico CSS

---

### 🍬 My Gifts
**`/projects/my-gifts/`**

특별한 날을 위한 선물 페이지 모음.

| 파일 | 내용 |
|---|---|
| `white-day-candy.html` | 화이트데이 캔디 인터랙티브 페이지 |

---

### 👻 Boo Snot
**`/projects/boo_snot/`**

CSS/JS 기반 단순 캐릭터 애니메이션 실험.

- 부우 캐릭터에서 코딱지가 튀어나오는 루프 애니메이션

**스택:** Vanilla JS, CSS

---

## 디렉토리 구조

```
taeksoolee.github.io/
├── index.html              # 메인 포트폴리오
├── sitemap.xml
├── robots.txt
├── CNAME                   # taeksoolee.com
├── lib/                    # Lit 공유 라이브러리
├── assets/                 # 폰트 등 정적 에셋
├── images/                 # 프로젝트 썸네일 등
├── v1/v1.0.2/              # 포트폴리오 컴포넌트 소스
│   └── components/
│       ├── AppCursor.mjs
│       ├── AppHeader.mjs
│       ├── AppFoooter.mjs
│       ├── HeroBannerSection.mjs
│       ├── ProfileSection.mjs
│       ├── StatsSection.mjs
│       ├── ProjectSection.mjs
│       ├── SpotLight.mjs
│       └── ui/ProjectCard.mjs
└── projects/               # 개별 프로젝트
    ├── 3d-tetris/
    ├── 3d-page/
    ├── background-remover-app/
    ├── boo_snot/
    ├── cursor-eyes/
    ├── digital-clock/
    ├── image-services/
    ├── mobile-app-template/
    ├── music/
    ├── my-gifts/
    ├── pdf-convert/
    ├── pokemon/
    ├── profile-card/
    ├── resume/
    ├── scroll-snap/
    ├── tools/
    ├── vibe-coding/
    └── with-speech/
```

---

## 개발 환경

빌드 도구 없이 순수 정적 파일로 구성되어 있습니다. 로컬 실행 시 CORS 이슈로 인해 HTTP 서버가 필요합니다.

```bash
# 예시 (http-server, Python 등)
npx http-server -c-1 -o
python3 -m http.server 8080
```
