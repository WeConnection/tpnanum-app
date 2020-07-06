# tpnanum-app
투명한 나눔 - React Native 기반 앱

## 실행 방법

- Node.js 설치
- CLI 에서, npm 을 사용하여 `expo-cli`, `yarn` 설치
  
```bash
npm i -g expo-cli yarn
```

- 의존성 다운로드

```bash
yarn install
```

- 앱 테스트 환경 실행

```bash
expo start
```

- 휴대전화에 Expo 앱 설치 후, 웹 브라우저 화면에 나온 QR 코드 스캔하여 앱 실행

## 앱 빌드

```bash
expo login # Expo.io 계정으로 로그인
expo build:android # Adnroid 빌드
expo build:ios # iOS 빌드
```