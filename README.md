# tmprest

'''''''''''''''
---------------

# A. grafana 시작하는방법

  1. cmder 실행한다.
  2. 실행위치로 이동한다. </br>
      $> cd C:\app\grafana-7.5.17\bin
  3. 실행 명령어를 입력한다. </br>
      $> start grafana-server.exe
  4. 크롬 브라우져를 실행한다.
  5. 접속 URL 을 입력한다 </br>
      <http://localhost:3000>
  6. 계정 및 비번을 입력한다. </br>
      id : admin </br>
      pw : admin

# B. grafana 종료하는방법

  1. 실행 중인 grafana server 에서 "ctrl + c" 명령어를 입력한다.</br>
     ->  수행중인 grafana 종료됨

# C. Table 생성 및 재생성

### 1. Table 목록

---

|영문 Table | 한글 Table |
|:---|:---|
|**itsm_code** | cdmd meta code 관리|
|**plant_info** | 설비 관리 -CCTV|
|**jsa_rule** | jsa 기준관리|
|**plant_match_jsa** | cctv 설비  match jsa tbl|
|**work_order** | Work Order tbl|
|**utility_info** | MRO 관리, 보호장구|

### 2. Table script  목록

---

|파일명|
|:---|
|tbl_itsm_code.sql|
|tbl_jsa_rule.sql|
|tbl_plant_info.sql|
|tbl_plant_match_jsa.sql|
|tbl_utility_info.sql|
|tbl_work_order.sql|

### ※. sql 구문별 설명

``` sql
-- itsm.itsm_code definition   : 참고 정보

-- Drop table                  : 참고 정보

-- DROP TABLE itsm.itsm_code;  : Table 재생성시 필요함. 

-- : table 생성, pk 생성, index 생성, table ,커멘트 
CREATE TABLE itsm.itsm_code (
);
CREATE INDEX ix_itsm_code_01 ON itsm.itsm_code USING btree (part, code, flag);
COMMENT ON TABLE itsm.itsm_code IS 'cdmd meta code 관리';

-- Column comments : 컬럼 커멘트 
 ,,,,

-- Permissions     : 권한 설정 
 ,,,,
```

### ※. talbe 생성 Step by Step

<br>1. DBeaver 접속  : 접속후 상단 메뉴에서  "sql 편집기" >> "새 SQL 편집기" 선택한다.
<br>2. github site 접근 : <https://github.com/mask74run/tmprest/tree/master>
<br>3. 파일 열기 : tbl_utility_info.sql (예를 들어설명합니다.)
<br>4. 3번 파일내에 "DROP TABLE " 주석 해제 "--" 삭제
<br>5. 4번작업까지 한후에 3번 전체 내용을 복사해서
<br>   1번작업후 sql 영역에 붙여넣기 한다.
<br>6. 5작업후 전체선택(ctrl + a)    한다.
<br>7. 해당 편집기 바로 위에 "▶" 클릭한다. 또는(ctrl + Enter) 실행한다.
<br>8. DBeaver "Drop,,, "  alert 창이 뜨면 "확인" 버튼을 클릭한다.
<br>--완료 -
<br>※.실행후 DBeaver 화면 하단에 결과 메세지가 출력된다.
<br>     또는
<br>   DBeaver 종료후 재접속해보면 반영여부를 확인가능하다.

<br>   동일한 방법으로 SQL 파일을 모두 실행한다.
