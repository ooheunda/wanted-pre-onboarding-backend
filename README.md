# Twoted

## 📌 개요

- 기업의 채용을 위한 웹 서비스 api
- 원티드 프리온보딩 백엔드 인턴십 선발 과제
- 📃 API Test (Swagger, '/api')
- [🗃️ Entity Relationship Diagram](https://drawsql.app/teams/me-662/diagrams/pre-ob-twoted)

### 👩‍💻 기술 스택

||Stack|
|---|---|
|**Runtime**|<img src="https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white" />|
|**Language**|<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white" />|
|**Framework**|<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />|
|**DataBase**|<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" /> <img src="https://img.shields.io/badge/typeorm-FE0803?style=for-the-badge&logo=typeorm&logoColor=white" />|
|**Test**|<img src="https://img.shields.io/badge/jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />|
|**Environment**|<img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white" />|
|**Deployment**|<img src="https://img.shields.io/badge/aws ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"> <img src="https://img.shields.io/badge/aws rds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">|
|**etc**|<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"> <img src="https://img.shields.io/badge/passport-34E27A?style=for-the-badge&logo=passport&logoColor=white"> <img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">|

## 👔 구현 기능

### 필수 요구사항
- [x] 채용공고 등록
- [x] 채용공고 목록 조회
- [x] 채용공고 상세 조회
- [x] 채용공고 수정
- [x] 채용공고 삭제

### 선택 요구사항
- [x] 채용공고 목록 조회 - 검색
- [x] 채용공고 상세 조회 - 회사가 올린 다른 공고 포함
- [x] 채용공고 지원

### 추가 구현사항
- [x] 채용공고 목록 조회 - 페이지네이션
- [x] 구직자/회사 회원가입
- [x] 구직자/회사 로그인
- [x] API별 접근 제한 (인가)

## 🔐 .env

```env
# common
PORT=number

# Database
DB_HOST="your host"
DB_PORT=number
DB_USERNAME="your name"
DB_PASSWORD="your password"
DB_NAME="your db name"
DB_SYNC=boolean

# Auth
JWT_SECRET_KEY="your key"
BCRYPT_SALT=number
```

## 📂 폴더 구조
```
  |-src
  |  |-common
  |  |  |-types
  |  |  |  |-history-status.enum.ts
  |  |  |  |-payload.type.ts
  |  |  |  |-user-role.type.ts
  |  |  |  |-region.enum.ts
  |  |  |-decorators
  |  |  |  |-user-role.decorator.ts
  |  |  |  |-user-info.decorator.ts
  |  |  |-guards
  |  |  |  |-user-role.guard.ts
  |  |  |-entities
  |  |  |  |-user.entity.ts
  |  |  |  |-company.entity.ts
  |  |  |  |-base-model.entity.ts
  |  |  |  |-history.entity.ts
  |  |  |  |-post.entity.ts
  |  |-auth
  |  |  |-jwt.strategy.ts
  |  |  |-auth.module.ts
  |  |-posts
  |  |  |-dto
  |  |  |  |-link.dto.ts
  |  |  |  |-create-post.dto.ts
  |  |  |  |-update-post.dto.ts
  |  |  |-posts.controller.ts
  |  |  |-posts.service.spec.ts
  |  |  |-posts.module.ts
  |  |  |-posts.service.ts
  |  |  |-posts.controller.spec.ts
  |  |-users
  |  |  |-dto
  |  |  |  |-signup-user.dto.ts
  |  |  |  |-signin-user.dto.ts
  |  |  |-users.service.ts
  |  |  |-users.controller.ts
  |  |  |-users.module.ts
  |  |  |-users.service.spec.ts
  |  |  |-users.controller.spec.ts
  |  |-companies
  |  |  |-dto
  |  |  |  |-signin-company.dto.ts
  |  |  |  |-signup-company.dto.ts
  |  |  |-companies.service.spec.ts
  |  |  |-companies.controller.ts
  |  |  |-companies.controller.spec.ts
  |  |  |-companies.service.ts
  |  |  |-companies.module.ts
  |  |-app.module.ts
  |  |-main.ts
  |-test
  |  |-app.e2e-spec.ts
  |  |-jest-e2e.json
  |-nest-cli.json
  |-README.md
  |-.gitignore
  |-package-lock.json
  |-package.json
  |-tsconfig.build.json
  |-.env
  |-.prettierrc
  |-.eslintrc.js
  |-tsconfig.json
```

## 💻 How To

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
