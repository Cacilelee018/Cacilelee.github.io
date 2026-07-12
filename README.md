# Artist Portfolio Template

GitHub Pages에 바로 올릴 수 있는 아티스트용 원페이지 포트폴리오 템플릿입니다. 애니메이션 캡처 이미지, 영상 작업, 음악, 공연 기록, 작가노트, 웹 CV, PDF CV, 연락처를 한 페이지에 정리하는 용도입니다.

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

## 교체할 내용

### 기본 정보

`index.html`에서 아래 텍스트를 본인 정보로 바꾸세요.

- `Artist Name`
- 한 줄 소개 문장
- Artist Statement
- About
- 이메일 주소
- Instagram / Vimeo 링크
- SoundCloud 링크
- CV 항목

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
hero-still.jpg
work-01.jpg
work-02.jpg
still-01.jpg
profile.jpg
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

기본 폰트는 외부 로딩 없이 빠르게 보이는 깔끔한 산세리프 스택입니다.

```css
--font-sans: "Pretendard", "SUIT", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", ui-sans-serif, system-ui, sans-serif;
--font-display: "Pretendard", "SUIT", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", ui-sans-serif, system-ui, sans-serif;
```

폰트를 바꾸고 싶으면 `styles.css` 상단의 `--font-sans`, `--font-display` 값만 수정하면 됩니다.

### 영상

유튜브 또는 비메오를 쓰는 경우:

1. 영상 페이지에서 공유 또는 임베드 주소를 복사합니다.
2. `index.html`의 `<iframe src="...">` 값을 교체합니다.

mp4 파일을 직접 올리는 경우:

1. `assets/videos/` 폴더에 mp4 파일을 넣습니다.
2. `index.html`에서 `assets/videos/sample-video.mp4`를 새 파일명으로 바꿉니다.
3. 영상 포스터 이미지는 `assets/images/video-poster.jpg`처럼 따로 넣는 것을 권장합니다.

긴 영상은 GitHub 저장소 용량과 로딩 속도에 부담이 될 수 있으므로 YouTube/Vimeo 임베드를 권장합니다.

### SoundCloud 음악 플레이어

`Sound / Music` 섹션에는 SoundCloud 임베드 플레이어가 들어 있습니다.

가장 쉬운 방법:

1. SoundCloud에서 올린 트랙 또는 플레이리스트 페이지를 엽니다.
2. `Share` 또는 `공유`를 누릅니다.
3. `Embed` 코드를 복사합니다.
4. `index.html`의 `id="sound"` 섹션 안에 있는 `<iframe ...></iframe>` 부분을 복사한 embed 코드로 바꿉니다.

직접 URL만 바꾸는 경우에는 아래 부분의 `YOUR_TRACK_ID`를 본인 트랙 ID로 교체합니다.

```html
src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/YOUR_TRACK_ID&color=%239b3d2f..."
```

플레이리스트를 넣을 때는 `tracks` 대신 SoundCloud에서 제공하는 playlist embed 코드를 그대로 붙여 넣는 편이 안전합니다.

### 공연 현장 사진

공연 사진은 `assets/images/` 폴더에 넣고 `index.html`의 `id="live"` 섹션에서 파일명을 바꾸면 됩니다.

예시:

```html
<img src="assets/images/live-performance-01.jpg" alt="공연명 현장 사진">
```

사진을 클릭했을 때 크게 보이는 이미지도 같은 버튼의 `data-live-image` 값을 함께 바꿔야 합니다.

```html
<button data-live-image="assets/images/live-performance-01.jpg" data-live-caption="공연명 / 장소 / 연도">
```

공연 사진 파일명 예시:

```text
live-performance-01.jpg
sound-performance-2026.jpg
stage-rehearsal-01.webp
```

### PDF CV

PDF 이력서는 아래 위치에 넣으세요.

```text
assets/documents/artist-cv.pdf
```

파일명이 다르면 `index.html`의 `href="assets/documents/artist-cv.pdf"`도 함께 바꿔야 합니다.

## 프로젝트 모달 수정

대표 작업의 상세 내용은 `script.js`의 `projects` 객체에서 수정합니다.

```js
"project-01": {
  title: "작업 제목",
  meta: "Animation / 2026",
  image: "assets/images/work-01.jpg",
  alt: "작업 이미지를 설명하는 대체 텍스트",
  description: "작업 설명",
  facts: {
    Runtime: "04:12",
    Medium: "2D animation",
    Role: "Direction, animation, editing"
  }
}
```

`index.html`의 버튼에는 같은 id를 넣어야 합니다.

```html
<button data-project="project-01">
```

## 동적 요소 수정

이 템플릿에는 가벼운 동적 요소가 포함되어 있습니다.

- Hero 프레임 슬라이더
- Works 카테고리 필터와 표시 개수
- Animation Stills의 `Grid / Sequence` 보기 전환
- Project Detail 모달의 이전/다음 작업 이동
- 공연 현장 사진 확대 모달
- 스크롤 등장 효과
- 작업 제목 티커
- 맨 위로 이동 버튼

Hero 프레임 슬라이더 이미지는 `script.js`의 `heroFrames` 배열에서 바꿉니다.

```js
const heroFrames = [
  {
    src: "assets/images/hero-still.jpg",
    alt: "작업 이미지를 설명하는 대체 텍스트",
    caption: "Frame 01 - 짧은 설명"
  }
];
```

프레임 수를 4개보다 늘리거나 줄이면 `index.html`의 아래 숫자도 함께 바꿔주세요.

```html
<input data-frame-range type="range" min="0" max="3" value="0">
```

예를 들어 프레임이 6개라면 `max="5"`로 바꾸면 됩니다.

작업 제목 티커는 `index.html`의 `work-ticker` 영역에서 문구를 바꿉니다. 화면 크기가 바뀌어도 끊기지 않도록 `work-ticker__group` 두 개가 완전히 같은 문구 순서를 갖게 유지하세요.

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
Works 섹션에 새 프로젝트를 추가해줘.
제목은 "Blue Room Test"이고 이미지는 assets/images/blue-room.jpg를 사용해줘.
```

```text
작가노트를 아래 문장으로 바꿔줘.
...
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
- PDF CV에 개인정보가 과하게 들어가지 않았는지 확인하세요.
