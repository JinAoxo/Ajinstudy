# react study 시작 (최근 정렬)

### 2022-12-11 : 2. react start - resetting

<https://jinaoxo.github.io/ReactStudy/reactstudy/src/App.js>

### 2022-11-24 : 1. react start

<https://jinaoxo.github.io/ReactStudy>

---

### react 설정법 정리

> - **vscode에서 설치하기**
>
>   1. node.js 를 google에서 검색해서 설치하기
>   2. vscode를 열어서 터미널에 **`npm -v` :** 로 버전확인 및 설치여부 확인하기
>   3. `**npm install -g create-react-app**` 위 명령어로 create-react 설치하기
>      에러가 뜬다면 sudo npm install create-react-app 입력 (맥의 경우)
>      /create-react-app 설치 확인 : `**create-react-app -V**`
>   4. `npx create-react-app 파일이름`
>   5. `cd 파일이름` **파일 경로 찾기 :** `dir / ls / cd`
>   6. `npm start`
>   7. `npm run start` → 화면 live
>
>   \*. [**react 가 연결되는 폴더의 경우**](https://www.inflearn.com/questions/482194/create-react-app%EC%97%90%EC%84%9C-node-modules%ED%8C%8C%EC%9D%BC-%EC%A7%80%EC%9B%8C%EC%A1%8C%EC%9D%84-%EA%B2%BD%EC%9A%B0) : public, src, package-lock.json, package.json, **node_modules** 가 생성 되어야 합니다. **node_modules** 가 삭제 된 경우 root 파일위치에서 `npm i` 를 입력해서 설치해 주어야 합니다.

<details>
<summary>8. errer log list</summary>

<div  markdown="1" >

> - '`DISABLE_ESLINT_PLUGIN=true react-scripts start : DISABLE_ESLINT_PLUGIN=true` 내부 또는 외부 명령으로 인식되지 않습니다' 에 관한 오류 발생시
>   - (예: Windows에서 실행하려는 경우) `"start": "set DISABLE_ESLINT_PLUGIN=true && react-scripts start"` 로 변경하는 경우 실행 됩니다.[참고](https://stackoverflow.com/questions/55821078/disable-eslint-that-create-react-app-provides)
> - 'npm i'를 했을 경우 errer fix가 안된다면 터미널에 안내 되는 데로 `npm audit fix --force` 사용해서 모든 문제 해결 하는 방법 사용
> - `'react-scripts'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다.` [참고](https://thespoiler.tistory.com/21)
> - `npm ERR! errno -4058` 오류시에 시도 해볼수 있는 방법 `npm cache clean --force`, `rm -rf node_modules`, `rm -rf package-lock.json`, `npm install`, `npm run dev` [참고](https://jae04099.tistory.com/entry/ERROR-npm-ERR-code-ELIFECYCLE-errno-1)
> - errer code: 'ERR_OSSL_EVP_UNSUPPORTED' 의 경우 기존 사용하던 버전에서 버전이 업그레이드 되면서 나타나는 에러로 react-scripts를 업그레이드 하면 문제 해결 `npm audit fix --force` , 업그레이드가 불가 하다면 nodejs 를 다운그레이드 하는 방법 or 기존 옵션 사용을 설정해서 사용 하는 방법 `react-scripts --openssl-legacy-provider start` 이 있음
> - `Failed to load plugin 'jsx-a11y' ` errer 의 경우 `npm install --force` 재설치가 가장 효율적인 방법 .... jsx-z11y 란? [참고](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)-> [해결중 해결 안됨 :setting 다시 함 ]
> - 해당 셋팅에 대해서 확인 필요 `package.json`
> - `"scripts": { "start": "set DISABLE_ESLINT_PLUGIN=true && react-scripts start",    "build": "DISABLE_ESLINT_PLUGIN=true react-scripts build",    "test": DISABLE_ESLINT_PLUGIN=true react-scripts test",    "eject": "react-scripts eject"  },`
> - Cannot find module 'babel-loader' 오류에 대해서 : `yarn add babel-loader` 설치 혹은 babel-loader 7.x 버전으로 설치

</div>
</details>

<details>
<summary>9. 명령어 정리</summary>

<div  markdown="1" >

> - `npm start` : 개발 서버를 시작
> - `npm run build` : 운영을 위해 앱을 정적 파일로 번들
> - `npm test` : 테스트 실행기를 시작
> - `npm run eject` : 이 도구를 제거하고 빌드 종속성, 구성 파일을 복사 그리고 스크립트를 앱 디렉터리에 입력/ 하면 돌아갈 수 없기 때문에 사용 금지
>   `cd reactstudy` `npm start`

</div>
</details>

<details>
<summary>10. package.json 수정 이슈</summary>

<div  markdown="1" >

> - 무슨 차이인지 확인 필요

> "scripts": {

> officepc-setting
> "start": "react-scripts start",
> "build": "react-scripts build",
> "test": "react-scripts test",
> "eject": "react-scripts eject"

> homepc-setting
> "start": "set DISABLE_ESLINT_PLUGIN=true && react-scripts start",
> "build": "DISABLE_ESLINT_PLUGIN=true react-scripts build",
> "test": "DISABLE_ESLINT_PLUGIN=true react-scripts test",
> "eject": "react-scripts eject"

> },

</div>
</details>

<details>
<summary>11. 병합 재배치 공부</summary>

<div  markdown="1" >

> - 병합 Fast-forward

</div>
</details>

<details>

---

## study log 정리

<details>
<summary>예전 study 정리</summary>

<!-- summary 아래 한칸 공백 두어야함 -->
<div  markdown="1" >

### 2022-06-02 : 이전 내용 AjinStudy git(html) 에서 관리

<https://jinaoxo.github.io/Ajinstudy/>

</div>
</details>
