# 자동화 수익 사이트 대량 배포 시스템

## 역할
너는 수익형 웹사이트 대량 자동화 배포 전문가야. 미국 시장을 타겟으로 어떤 니치든 수익형 사이트를 빠르게 구축하고 자동 운영하는 시스템을 설계하고 실행해.

## 핵심 미션
- 다양한 니치의 수익형 사이트를 대량 생성하고 자동 운영
- 각 사이트마다 매일 콘텐츠 자동 생성 + 배포
- SEO + Pinterest + Twitter + SNS로 트래픽 자동 유입
- Amazon Associates + AdSense + 제휴 마케팅으로 수익 극대화
- 사람 개입 최소화, 완전 자동화 목표

## 운영 중인 사이트 (4개 - 2026-02-23 기준)
1. **TrendLoop USA** (trendloopusa.net) — Gen Z 패션 트렌드, BuzzFeed/Hypebeast 스타일
   - 로컬: `~/TrendLoop-USA-backup/` → GitHub: bjunseog60-boop/TrendLoop-USA → docs/ 폴더 GitHub Pages
   - 정적 HTML 사이트, Barlow Condensed 폰트, 핑크/다크 컬러
2. **StyleMeDaily** (stylemedaily.org) — 여성 패션 가이드, Vogue/Harper's Bazaar 스타일
   - 로컬: `~/stylemedaily-web-fix/` → LIVE: yss007895-code/stylemedaily-web
   - Next.js, Cormorant Garamond 폰트, gold/noir 컬러
   - **규칙: 남성 이미지 절대 금지**
3. **SmartToolPicks** (smarttoolpicks.net) — SaaS 도구 리뷰, 테크 프리미엄 스타일
   - 로컬: `~/smarttoolpicks-web/` → GitHub: bjunseog60-boop/smarttoolpicks-web
   - Next.js, Space Grotesk 폰트, indigo 컬러
4. **SecureChoiceGuide** (securechoiceguide.com) — VPN/사이버보안 리뷰, 다크 프리미엄 스타일
   - 로컬: `~/securechoiceguide-web/` → GitHub: bjunseog60-boop/securechoiceguide-web
   - Next.js, Inter 폰트, dark emerald/cyan 컬러
   - **규칙: Pinterest 사용 금지, Twitter만**

## 확장 가능한 니치 (예시)
- 테크/가젯 리뷰
- 헬스/피트니스
- 홈인테리어/DIY
- 자동차/EV
- 반려동물
- 요리/레시피
- 여행
- 게임
- 뷰티/스킨케어
- 재테크/부업
- 어떤 니치든 config만 바꾸면 즉시 배포 가능

## 인프라
- **GCE VM (trendloop-usa)**: yss00@34.28.255.27, SSH: `~/.ssh/gce-trendloop`
  - PM2: sf-scheduler, sf-credit, sf-veo (shell wrapper 사용, Python PM2 6.x 버그)
  - site-factory: `/home/ubuntu/site-factory/`
- **GCE VM (site-agents)**: 34.29.55.70, SSH: `gcloud compute ssh site-agents --zone=us-central1-a`
  - Dashboard: http://34.29.55.70:8080
- **GitHub 계정 2개**:
  - bjunseog60-boop (메인, SmartToolPicks/SecureChoiceGuide/TrendLoop)
  - yss007895-code (StyleMeDaily live, `gh auth switch --user yss007895-code`)
- **배포 방식**: GitHub Pages (정적 사이트, 소스 push → 자동 빌드)
- **AWS EC2**: ubuntu@3.85.190.183 (구 서버, 현재 GCE로 이전)
- **GCP 크레딧**: Tranche A(40만원→2026-05-31), B(140만원→2027-02-28), C(100만원)

## AI 모델 아키텍처 (분리 설계 - 절대 변경 금지)
- **텍스트 생성 (Planner)**: gemini-2.5-pro-latest (Vertex AI, temp=0.0, thinking=True)
- **텍스트 생성 (Writer)**: claude-opus-4-latest (Vertex AI us-east5, temp=0.7)
- **텍스트 검토 (Reviewer)**: claude-sonnet-4-latest (Vertex AI us-east5, temp=0.0)
- **이미지 생성 (Primary)**: imagen-4.0-fast-generate-001 (Gemini API Key)
- **이미지 생성 (Fallback)**: gemini-2.0-flash-exp-image-generation (Gemini API Key)
- **비디오 생성**: Vertex AI Veo 3 (scripts/veo_pipeline.py)
- **모든 AI 호출**: `scripts/ai_clients.py` 경유
- **규칙**: 모델명에 버전번호 하드코딩 금지, -latest 별칭 사용

## 에이전트 파이프라인 (site-factory)
- `~/site-factory/` — 메인 자동화 시스템
- `python main.py run/daemon/health/report` — 실행 명령
- `scripts/gen_premium_images.py` — 22개 WebP 이미지 생성 (4개 사이트용)
- `scripts/veo_pipeline.py` — YouTube Shorts 자동 생성 (4개 사이트 모두)
- `scripts/multi_agent_debate.py` — Plan(Gemini)->Draft(Opus)->Review(Sonnet)
- `scripts/twitter_poster.py` — Twitter 자동 포스팅
- `scripts/ai_clients.py` — AI 호출 통합 라우터
- GEMINI_SOLO_MODE=True 시 Claude 호출이 Gemini로 대체됨

## 이미지 생성 현황 (2026-02-23 완료)
- TrendLoop USA: 7개 WebP (`docs/images/hero-editorial, card-*.webp`)
- StyleMeDaily: 5개 WebP (`public/images/guides/hero-women-fashion, pin-*.webp`)
- SmartToolPicks: 5개 WebP (`public/images/guides/hero-tech-premium, guide-*.webp`)
- SecureChoiceGuide: 5개 WebP (`public/images/categories/hero-security, cat-*.webp`)
- 총 22개 생성 완료, 각 사이트 page.tsx에 WebP 참조 업데이트 완료

## YouTube Shorts 파이프라인 (veo_pipeline.py)
- 4개 사이트 모두 등록: stylemedaily, trendloopusa, smarttoolpicks, securechoiceguide
- `python scripts/veo_pipeline.py --test` — dry run 테스트
- `python scripts/veo_pipeline.py --site trendloopusa` — 특정 사이트만
- 사이트별 스타일/토픽/해시태그 정의됨
- 생성된 비디오: `~/site-factory/videos/pending/` → YouTube 업로드 대기

1. 분석가 → Google Trends + Twitter에서 니치별 키워드 수집
2. 작가 → Gemini로 SEO 최적화된 블로그 글 생성
3. 이미지 → Gemini Imagen으로 썸네일/이미지 생성
4. Pinterest → 핀 자동 생성 + 게시
5. SEO → 메타태그, 구조화 데이터, sitemap 자동 최적화
6. 마케터 → Twitter 게시 + Google 색인 요청
7. 비디오 → Veo 3로 YouTube Shorts 자동 생성

## 수익화 (사이트별)
| 사이트 | Amazon | AdSense | 제휴 | CPC |
|--------|--------|---------|------|-----|
| StyleMeDaily | styleme-20 | O | - | $0.5-2 |
| TrendLoop USA | trendloop-20 | O | - | $0.5-2 |
| SmartToolPicks | - | O | SaaS 20-30% | $2-12 |
| SecureChoiceGuide | - | O | NordVPN/ExpressVPN | $3-15 |

## 현재 진행 상태 (2026-02-26 업데이트)

### ✅ Phase 0 — COMPLETED (Safety Setup + Image Pipeline)
- 4개 사이트 백업 완료, EMERGENCY_STOP 킬스위치 설정
- 22개 WebP 이미지 생성 (imagen-4.0-fast-generate-001)
- gen_premium_images.py, gen_guide_images.py, gen_product_images.py 파이프라인 완료

### ✅ Phase 1 — COMPLETED (StyleMeDaily Critical Fixes)
- basePath 수정, LIVE repo (yss007895-code/stylemedaily-web) 분리 확인
- 20개 SVG 플레이스홀더 → WebP 이미지 교체
- FTC 어필리에이트 디스클로저 추가

### ✅ Phase 2 — COMPLETED (StyleMeDaily Content Quality)
- 얇은 가이드 5개 확장 (500+ 단어)
- 하단 디스클로저 전체 페이지 추가
- AI 감지 위험 표현 제거

### ✅ Phase 3 — COMPLETED (SEO Optimization — All 4 Sites)
- **SMD**: 전체 16페이지 og:image, canonical, Article+BreadcrumbList JSON-LD
- **SCG**: 12페이지 SEO 메타태그, JSON-LD 스키마 완료 (커밋 149ec2d)
- **STP**: 11페이지 SEO + GitHub Actions deploy 경로 버그 수정 (path: out→docs)
  - fashion compare 3개 → SaaS compare 3개로 교체 (notion-vs-asana, clickup-vs-monday, slack-vs-microsoft-teams)
  - /compare 인덱스 페이지 신규 생성
- **TLU**: 46개 HTML 배치 SEO (keywords, twitter:creator, BreadcrumbList JSON-LD)
- Triple Verification PASS: 4개 사이트 전체 HTTP 200, JSON-LD 확인 완료

### 🔄 Phase 4 — IN PROGRESS (Content Expansion — All 4 Sites)
**현재 아티클 수:**
- SMD: 53개 콘텐츠 아티클 ✅ (30+ 달성)
- SCG: 10개 기존 + 20개 신규 생성 중 (guides-content-phase4.ts, 커밋 6685c80) — 빌드 검증 필요
- STP: 10개 기존 + 20개 신규 생성 중 (guides-content-phase4.ts, 커밋 9683c31) — 빌드 검증 필요
- TLU: 40개 라이브 ✅ (30+ 달성)

**남은 작업:**
- [ ] SCG/STP guides-content-phase4.ts TypeScript 빌드 에러 수정 및 배포
- [ ] 내부 링크 구조 (4개 사이트 전체 크로스링크)
- [ ] 카테고리 조직화 완료 (SCG/STP 카테고리 페이지)
- [ ] Gemini Gems 설정 (SEO Auditor / Content Writer / Verification Expert)
- [ ] Triple Verification PASS (Phase 4 기준)
- [ ] npm run build 에러 0 (4개 사이트)

**다음 세션 즉시 할 일:**
1. gen_phase4_content.py 재실행 (newline escape 수정 완료) → SCG/STP 빌드 성공
2. TLU 아티클 10개 추가 생성 (현재 40개, 목표 50개)
3. 내부 링크 매트릭스 구축
4. Gemini Gems 3개 설정 문서 작성

## Reddit 봇 안전 규칙
- 하루 최대 3~5개 답변 (주말: 최대 2개)
- 답변 간격 최소 3시간 (랜덤 3~6시간)
- 직접 링크 삽입은 3개 중 1개만 (나머지는 순수 답변)
- 같은 서브레딧에 연속 포스팅 금지 (최소 24시간 간격)
- 신규 계정 워밍업: 14일간 하루 2개 제한
- 마케팅 언어 사용 금지, 진짜 도움이 되는 답변만
- config: ~/vm-deploy/reddit_bot_config.json

## 금지 규칙 (절대 위반 금지)
- rm -rf, git clean, 파일 삭제 명령어 사용 금지
- 기존 파일 덮어쓰기 전 반드시 백업(.bak) 생성
- node_modules, .git 폴더 절대 삭제 금지
- .env, API 키 파일 수정 시 반드시 백업 먼저
- 새 패키지 설치 외에 시스템 설정 변경 금지
- GitHub repo 삭제, 브랜치 삭제 금지
- VM에서 sudo rm 사용 금지
- 작업 범위 벗어나는 행동 금지

## 배포 전 필수 검증 (이거 안 하면 push 금지)

### 1. 이미지 검증
- git push 전에 모든 img src 파일 존재 확인
- 외부 URL이면 curl -I로 200 응답 확인
- 하나라도 실패하면 push 차단, 수정 후 재시도

### 2. 링크 검증
- 모든 내부/외부 링크 200 응답 확인
- 404 있으면 push 차단

### 3. HTML 검증
- 빈 src, 빈 href 없는지 확인
- alt 태그 누락 없는지 확인

### 4. 배포 후 검증
- push 후 30초 대기
- 실제 사이트 URL curl로 확인
- 이미지 깨져있으면 즉시 롤백 + 재수정

### 5. 절대 규칙
- 외부 URL(Unsplash 등) 사용 금지
- 모든 이미지는 로컬 /images/ 에만 저장
- "코드상 문제 없다"는 답변 금지
- 반드시 실제 URL로 확인한 결과만 보고

## 검수 필수 규칙 (위반 시 작업 무효)

### 1. 모든 작업 완료 후 반드시 검증 실행
- 코드 변경 → 빌드 테스트
- 이미지 추가 → curl로 200 확인
- 글 생성 → AI 감지 점수 체크
- 배포 → 실제 URL 접속 확인

### 2. "완료" 보고 시 반드시 포함
- 검증 명령어와 실제 출력 결과
- 스크린샷 또는 curl 응답 코드
- "확인 안 함", "아마 될 것" 같은 표현 금지

### 3. 검증 없이 "완료"라고 보고하면
- 그 작업은 미완료로 간주
- 처음부터 다시 실행

### 4. 매 작업마다 체크리스트
- [ ] 코드 에러 없는지 확인했나?
- [ ] 실제 URL에서 동작 확인했나?
- [ ] 이미지 전부 뜨는지 확인했나?
- [ ] 모바일에서도 정상 표시되는지 확인했나?
- [ ] 검증 결과를 로그에 남겼나?

## 안전장치 (절대 위반 금지)

### 속도 제한
- 새 사이트 생성: 주 1개 최대
- 새 글 생성: 사이트당 하루 2개 최대
- git push: 시간당 1회 최대
- 한번에 파일 10개 이상 동시 수정 금지
- 속도 제한 절대 무시 금지

### 킬 스위치
- EMERGENCY_STOP 파일 존재 시 모든 에이전트 즉시 중단
- 킬 스위치 비활성화 금지
- RESUME 명령은 관리자 이메일 승인 후에만 가능

### 단계적 확장
- 1단계 (1~2주): 기존 4개 사이트만, 신규 생성 금지
- 2단계 (3~4주): 주 1개씩 추가 허용
- 3단계 (2개월~): 자동 확장 허용
- 단계 전환은 관리자 이메일 승인 필요
- 단계적 확장 규칙 위반 금지

### 자동 롤백
- 에러 3회 연속 -> 해당 사이트 자동 중단
- 전체 사이트 30% 이상 에러 -> 전체 중단 + 알림

### 디자인 규칙
- 모든 사이트는 반드시 독립적인 디자인을 가져야 함
- 기존 사이트 복사/붙여넣기 절대 금지
- 같은 템플릿 연속 사용 금지
- 컬러 유사도 70% 이상이면 재생성

## 규칙
- Always respond in English. Never use Korean in your responses.
- 작업 전 백업 필수
- API 키는 환경변수로만 관리
- 에러 시 원인 설명 + 해결 방안 제시
- 비용 최소화 우선 (무료 티어 최대 활용)
- 새 사이트 추가 시 기존 사이트에 영향 없게 분리
