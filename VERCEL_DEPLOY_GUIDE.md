# Vercel 배포 가이드

## 1. 사전 준비

- GitHub 계정 (https://github.com)
- Vercel 계정 (https://vercel.com) - GitHub로 가입 권장
- Node.js 설치 (https://nodejs.org)

---

## 2. 프로젝트 클론 받기

### 2-1. 보일러플레이트 클론
터미널(또는 Git Bash)을 열고 원하는 폴더로 이동 후:

```bash
git clone https://github.com/[세미나레포주소]/deploy-seminar-fe.git
cd deploy-seminar-fe
```

### 2-2. 로컬에서 테스트 (선택)
```bash
npm install
npm run dev
```
브라우저에서 `http://localhost:5173` 접속하여 앱 확인

---

## 3. 본인 GitHub 레포지토리 만들기

### 3-1. 기존 Git 연결 해제
클론 받은 폴더에서 기존 원격 저장소 연결을 제거합니다:

```bash
rm -rf .git
git init
```

### 3-2. GitHub에서 새 레포지토리 생성
1. GitHub 접속 후 우측 상단 **+** 버튼 클릭
2. **New repository** 선택
3. Repository name 입력 (예: `my-todo-app`)
4. **Create repository** 클릭 (README 추가 체크 해제!)

### 3-3. 코드 Push
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[본인아이디]/[레포지토리명].git
git push -u origin main
```

---

## 4. Vercel에서 배포하기

### 4-1. Vercel 접속 및 로그인
1. https://vercel.com 접속
2. **Continue with GitHub** 클릭하여 로그인

### 4-2. 프로젝트 가져오기
1. 대시보드에서 **Add New...** → **Project** 클릭
2. **Import Git Repository** 에서 방금 만든 레포지토리 찾기
3. **Import** 클릭

### 4-3. 환경 변수 설정 (중요!)
1. **Environment Variables** 섹션 찾기
2. 아래 내용 입력:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://test-server-agaf.onrender.com`
3. **Add** 버튼 클릭

### 4-4. 배포 실행
1. **Deploy** 버튼 클릭
2. 배포 완료까지 1-2분 대기
3. 완료 후 제공되는 URL로 접속하여 확인!

---

## 5. 배포 확인

배포가 완료되면 `https://[프로젝트명].vercel.app` 형태의 URL이 생성됩니다.
해당 URL로 접속하여 Todo 앱이 정상 작동하는지 확인하세요.

---

## 6. 자주 발생하는 문제

### API 연결이 안 돼요
- Vercel 대시보드 → Settings → Environment Variables에서 `VITE_API_URL`이 올바르게 설정되었는지 확인
- 환경 변수 변경 후에는 **Redeploy** 필요!
  - Deployments 탭 → 최신 배포의 ... 메뉴 → Redeploy 클릭

### 빌드 실패
- `npm run build` 명령어가 로컬에서 잘 작동하는지 먼저 확인
- 에러 메시지를 읽고 문제되는 코드 수정 후 다시 Push

### 코드 수정 후 반영이 안 돼요
- GitHub에 Push하면 Vercel이 자동으로 다시 배포합니다
- Deployments 탭에서 배포 상태 확인 가능

### `rm -rf .git` 명령어가 안 돼요 (Windows)
Windows CMD에서는 다음 명령어를 사용하세요:
```cmd
rmdir /s /q .git
```
또는 Git Bash를 사용하면 `rm -rf .git`이 작동합니다.

---

## 7. 유용한 팁

- **Preview 배포**: main 브랜치가 아닌 다른 브랜치에 Push하면 Preview URL이 생성됩니다
- **롤백**: 문제 발생 시 이전 배포 버전으로 쉽게 롤백 가능
- **도메인 연결**: Settings → Domains에서 커스텀 도메인 연결 가능

---

## 환경 변수 정리

| 변수명 | 설명 | 예시 값 |
|--------|------|---------|
| `VITE_API_URL` | 백엔드 API 서버 주소 | `https://test-server-agaf.onrender.com` |

---

## 전체 흐름 요약

```
1. 보일러플레이트 클론
   ↓
2. 로컬 테스트 (npm install → npm run dev)
   ↓
3. 기존 .git 삭제 → 새로 git init
   ↓
4. 본인 GitHub에 새 레포 생성
   ↓
5. 코드 Push
   ↓
6. Vercel에서 Import + 환경변수 설정
   ↓
7. Deploy 완료!
```
