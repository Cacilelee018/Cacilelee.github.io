# 이승희 Artist Portfolio

GitHub Pages에 바로 올릴 수 있는 이승희 아티스트 포트폴리오 원페이지 사이트입니다. 애니메이션, 음악, 공연 현장, 웹 CV, 작가 소개, 연락처를 한 페이지에 정리하는 용도입니다.

## 현재 반영된 정보

- 이름: 이승희
- 이메일: cacile.lee.018@gmail.com
- 주요 매체: Animation, Audiovisual, Sound, Performance
- 웹 CV 구성: Project Experience, Exhibitions / Performances, Professional Programs, Certifications / Skills

## 파일 구조

```text
artist-portfolio-template/
├── index.html
├── styles.css
├── script.js
├── README.md
├── .nojekyll
└── assets/
    ├── images/
    ├── videos/
    └── documents/
```

현재 페이지는 PDF 다운로드를 사용하지 않습니다. CV는 `index.html` 안의 웹 이력 섹션에서 직접 수정합니다.

## 교체할 내용

### 기본 정보

`index.html`에서 아래 텍스트와 링크를 필요에 맞게 바꾸세요.

- Hero 소개 문구
- Animation 설명
- Music 링크와 설명
- Live 공연 현장 이미지
- CV 웹 이력
- About 작가 소개
- Instagram 링크

SEO와 공유 미리보기를 위해 `<head>` 안의 아래 항목도 바꾸는 것을 권장합니다.

- `<title>`
- `meta name="description"`
- `og:title`
- `og:description`
- `og:url`

### 이미지

이미지는 `assets/images/` 폴더에 넣고 `index.html`의 파일명을 바꾸면 됩니다.

권장 파일명:

```text
background-stars.jpg
video-poster.jpg
live-placeholder.jpg
live-nuri-01.jpg
og-image.jpg
```

피하면 좋은 파일명:

```text
최종 이미지.jpg
작업 사진 1.JPG
my image final final.png
```

GitHub Pages에서는 영문 소문자, 숫자, 하이픈을 사용하는 파일명이 가장 안전합니다.

### 폰트

기본 폰트는 눈누에서 제공하는 `서울남산체` 웹폰트입니다.

```css
@font-face {
  font-family: "SeoulNamsan";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/SeoulNamsanM.woff") format("woff");
  font-weight: normal;
  font-display: swap;
}

--font-sans: "SeoulNamsan", "Pretendard", "SUIT", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", ui-sans-serif, system-ui, sans-serif;
--font-display: "SeoulNamsan", "Pretendard", "SUIT", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", ui-sans-serif, system-ui, sans-serif;
```

다른 폰트로 바꾸고 싶으면 `styles.css` 상단의 `@font-face`, `--font-sans`, `--font-display` 값을 수정하면 됩니다.

### 애니메이션

첫 번째 애니메이션 카드는 현재 "애니메이션 링크 준비 중" 자리로 두었습니다. 유튜브를 쓰는 경우:

1. 영상 페이지에서 공유 또는 임베드 주소를 복사합니다.
2. `index.html`의 `id="video"` 섹션에서 `video-placeholder` div를 지우고 iframe embed 코드를 넣습니다.

mp4 파일을 직접 올리는 경우:

1. `assets/videos/` 폴더에 mp4 파일을 넣습니다.
2. `index.html`에서 `assets/videos/sample-video.mp4`를 새 파일명으로 바꿉니다.
3. 영상 포스터 이미지는 `assets/images/video-poster.jpg`처럼 따로 넣는 것을 권장합니다.

긴 영상은 GitHub 저장소 용량과 로딩 속도에 부담이 될 수 있으므로 YouTube 임베드를 권장합니다.

### YouTube 음악 플레이어

`Music` 섹션에는 YouTube 음악 링크가 들어 있습니다. `file://`로 여는 로컬 미리보기에서는 YouTube 정책상 임베드 오류가 날 수 있어 링크 카드로 표시되고, GitHub Pages처럼 `https://`로 배포되면 페이지 안 플레이어로 표시됩니다.

가장 쉬운 방법:

1. YouTube 영상 주소에서 `watch?v=` 뒤의 영상 ID를 확인합니다.
2. `index.html`의 `id="sound"` 섹션에서 `data-video-id` 값을 바꿉니다.
3. 로컬 미리보기용 링크 카드의 `href`도 같은 YouTube 주소로 바꿉니다.

현재 적용된 음악 링크:

```html
data-video-id="1IC2ZjBzmBI"
```

다른 YouTube 영상으로 바꾸려면 `1IC2ZjBzmBI` 부분만 새 영상 ID로 교체하면 됩니다.

### 공연 현장

공연 현장 기록 이미지는 `assets/images/` 폴더에 넣고 `index.html`의 `id="live"` 섹션에서 파일명을 바꾸면 됩니다.

예시:

```html
<img src="assets/images/live-performance-01.jpg" alt="공연명 현장 기록">
```

클릭했을 때 크게 보이는 이미지도 같은 버튼의 `data-live-image` 값을 함께 바꿔야 합니다.

```html
<button data-live-image="assets/images/live-performance-01.jpg" data-live-caption="공연명 / 장소 / 연도">
```

공연 현장 기록 파일명 예시:

```text
live-performance-01.jpg
sound-performance-2026.jpg
stage-rehearsal-01.webp
```

현재 적용된 공연 현장 이미지는 `assets/images/live-nuri-01.jpg`입니다. 아직 실제 사진을 넣지 않은 공연 카드는 업로드한 배경 이미지를 바탕으로 만든 `assets/images/live-placeholder.jpg`를 사용합니다.

## 동적 요소 수정

이 템플릿에는 가벼운 동적 요소가 포함되어 있습니다.

- 상단 대표 작업 키워드 모션 창
- 배경 위에 떠다니는 문양 이미지
- 공연 현장 확대 모달
- 스크롤 등장 효과
- 맨 위로 이동 버튼

## GitHub Pages 배포 방법

1. GitHub에서 `내아이디.github.io` 이름의 Public repository를 만듭니다.
2. 이 템플릿 안의 파일과 폴더를 저장소 루트에 업로드합니다.
3. 저장소에서 `Settings`로 이동합니다.
4. 왼쪽 메뉴에서 `Pages`를 엽니다.
5. `Build and deployment`에서 `Deploy from a branch`를 선택합니다.
6. Branch는 `main`, Folder는 `/root`로 선택하고 저장합니다.
7. 몇 분 뒤 `https://내아이디.github.io` 주소로 접속합니다.

## 업데이트 방법

작업을 추가하거나 문구를 바꾼 뒤 GitHub에 다시 업로드하거나 Codex에게 수정 요청을 하면 됩니다.

예시 요청:

```text
Animation 섹션의 설명을 새 작업 내용으로 바꿔줘.
제목은 "Blue Room Test"이고 유튜브 임베드 링크를 넣어줘.
```

## 접근성 및 모바일 호환

이 템플릿에는 다음 항목이 포함되어 있습니다.

- 모바일 우선 반응형 레이아웃
- 키보드 접근 가능한 메뉴와 모달
- 이미지 lazy loading
- skip link
- 대체 텍스트 예시
- 사용자의 `prefers-reduced-motion` 설정을 고려한 애니메이션 완화
- Open Graph 메타태그
- Instagram 인앱 브라우저를 고려한 정적 HTML/CSS/JS 구조
- 외부 빌드 도구 없이 GitHub Pages에서 바로 실행되는 구성

## 공개 전 확인

- 공개 권한이 없는 이미지나 영상은 올리지 마세요.
- 전화번호, 집 주소, 계약서, 비공개 클라이언트 자료는 Public 저장소에 넣지 마세요.
- 모든 이미지에 본인이 이해할 수 있는 파일명을 붙이세요.
- 모바일에서 제목과 이미지가 잘리지 않는지 확인하세요.
