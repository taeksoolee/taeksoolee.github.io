# Background Remover App

AI 기반 이미지 배경 제거 웹 애플리케이션입니다.  
브라우저에서 직접 동작하며, 별도의 서버 없이 최신 AI 모델을 활용해 이미지를 처리합니다.

## 주요 기능

- 이미지 업로드 및 드래그 앤 드롭 지원
- AI 모델을 통한 배경 제거 (누끼 따기)
- 결과 이미지 다운로드
- 완전 클라이언트 사이드 동작

## 사용된 AI 모델

- [briaai/RMBG-1.4](https://huggingface.co/briaai/RMBG-1.4)  
  - 인물/사물의 배경을 자연스럽게 제거하는 이미지 세그멘테이션 모델
- [Xenova/modnet](https://huggingface.co/Xenova/modnet)  
  - 인물 사진에 특화된 배경 제거 모델

모델은 [Transformers.js](https://huggingface.co/docs/transformers.js)를 통해 브라우저에서 직접 로드됩니다.

## 주요 파일 구조

```
background-remover-app/
├── index.html                # 메인 페이지
├── app.mjs                   # briaai/RMBG-1.4 기반 배경 제거 로직
├── app_briaai_rmbg.mjs       # briaai/RMBG-1.4 전용 모듈
├── app_xenova_modnet.mjs     # Xenova/modnet 전용 모듈
├── libs.mjs                  # 외부 라이브러리 및 공통 유틸
├── white-bg-remove.html      # 흰색 배경 제거 전용 툴
├── package.json              # 개발용 패키지 정보
└── README.md                 # 이 문서
```

## 실행 방법

1. 저장소를 클론합니다.
2. http-server 등으로 로컬 서버를 실행합니다.
   ```sh
   npm install
   npm run start
   ```
3. 브라우저에서 `http://localhost:8080/background-remover-app/` 접속

## 참고

- 모든 AI 모델은 Hugging Face Hub에서 직접 로드됩니다.
- 모델 로딩 시 최초 100~200MB 정도의 리소스가 다운로드될 수 있습니다.
- 완전 오프라인 환경에서는 동작하지 않습니다.

---
