<style>
.css-av2jgo-editorBox,.react-monaco-editor-container{height:500px!important}
.submenu-controls{height:42.28px;padding:0;display:flex!important;background-color:RGB(160,82,45)}
.css-1wm65c2 .scrollbar-view{overflow:auto!important;margin:0!important;min-height:100%!important;max-height:100%!important;width:100%}
.ui.brown.button{background-color:RGB(160,82,45)!important}
.gf-form{display: none}
.dashboard-content{padding:0}
.layout {min-height: calc(100% - 44.28px)!important;max-height: calc(100% - 44.28px)!important}
#panel-2 .panel-content>*, #panel-2 .panel-content>*>*{overflow: unset!important}
#panel-2 {width:100%!important;height:100%!important}
.h_100{height: 100%!important}
.ui.two.column.main.grid>.column{padding:8px!important}
.ui.tree.accordion .accordion>.content, .ui.tree.accordion>.content{margin-left:10px}
.ui.foot.stuck.table>tfoot, .ui.head.stuck.table>thead{z-index: 9!important}
.ui.compact.selection.dropdown{padding:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ui.large.label{background-color:inherit!important;color:black!important;text-shadow:none}
</style>
<script>
var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

var dt = today.toISOString().split('T')[0];
var n_dt = tomorrow.toISOString().split('T')[0];
var tm = new Date().toTimeString().split(' ')[0].substr(0,5);
</script>
<div class="ui two column grid no_mg h_100">
  <div class="eleven wide column h_100" style="padding-right:7px">
    <div class="ui raised segment no_mg h_100">
      <div class="ui basic segment no_mg" style="padding:4.5px 14px">
        <div class="ui secondary menu no_mg">
          <div class="left menu">
            <div class="item no_pd">
              <div class="ui large label">
                기준코드
              </div>
              <div class="ui input">
                <input id="s_jsa_code" type="text" class="search" placeholder="검색어 입력.." style="height:38px">
              </div>
            </div>
            <div class="item no_pd">
              <div class="ui large label">
                사용구분
              </div>
              <select id="s_use_flag" class="ui compact selection dropdown" style="width:50px">
                <option selected value="Y">Y</option>
                <option value="N">N</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div class="right menu">
            <button class="ui brown button" style="margin:0px 0px 0px 14px" onclick="fn_grid_resource()">검색</button>
          </div>
        </div>
      </div>
      <div class="ui basic segment no_mg" style="height:calc(100% - 49px)">
        <div class="ui basic segment no_mg no_pd" style="height:100%;overflow:auto">
          <table class="ui celled head stuck selectable single line compact table">
            <thead>
              <tr>
                <th class="center aligned">순번</th>
                <th class="center aligned">JSA CODE</th>
                <th class="center aligned">작업단계</th>
                <th class="center aligned">작업방법</th>
                <th class="center aligned">RISK</th>
                <th class="center aligned">유해위험요인</th>
                <th class="center aligned">대책</th>
                <th class="center aligned">빈도</th>
                <th class="center aligned">강도</th>
                <th class="center aligned">위험도</th>
                <th class="center aligned">합계</th>
                <th class="center aligned">등록일</th>             
              </tr>
            </thead>
            <tbody id="resource_body"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="five wide column h_100" style="padding-left:7px">
    <div class="ui raised segment no_mg h_100">
      <div class="ui basic segment no_mg">
        <h5 class="ui header no_mg">
          <i class="server icon"></i>
          <div id="account_header" class="content"></div>
        </h5>
      </div>
      <div id="account_grid" class="ui basic segment no_mg" style="height:calc(100% - 49px);overflow:auto"></div>
    </div>
  </div>
</div>
<script>
jQuery.noConflict();
$(document).ready(async () => {
  // fn_resource_grid();
  // fn_clarm_page();
  // fn_set_title();
  // await fn_drop_account();
  await fn_grid_resource();
  fn_resource_grid();
  if('${__user.login}' !== 'admin') {
    $('.sidemenu').css('display','none');
    $('.page-toolbar').css('display','none');
  }
})

/* ########## 메인화면 타이틀 시작 ########## */
// function fn_set_title() {
//   $('#main_title').html(`
//   <i class="pencil alternate icon"></i>
//   <div class="content">
//     리소스 관리
//     <div class="sub header">CLARM 리소스 관리</div>
//   </div>`)
// }
/* ########## 메인화면 타이틀 끝 ########## */

/* ########## 메뉴조회 시작 ########## */
// 계정명 메뉴 조회 함수
// async function fn_drop_account() {
//   let s_use_flag = $('#s_use_flag').val(),
//       s_account_name = $('#s_account_name');

//   const account_sql = `
//   SELECT ID
//        , ACCOUNT_NAME
//     FROM CLARM_BASIC_ORG_INFO
//    WHERE USE_FLAG = '${s_use_flag}'
//    ORDER BY ID
//   `;

//   const account_data = await get_data(5, account_sql);
//   if(!Array.isArray(account_data) || account_data.length === 0) {
//     console.log(account_data);
//     return;
//   }

//   s_account_name.empty();
//   account_data.forEach((obj)=>{
//     s_account_name.append(`<option value="${obj[0]}">${obj[1]}</option>`)   
//   })

//   s_account_name.on('change', function() {
//     fn_drop_resource()
//   })
// }

// async function fn_drop_resource() {
//   let s_use_flag       = $('#s_use_flag').val(),
//       s_account_name   = $('#s_account_name').val(),
//       s_resource_gubun = $('#s_resource_gubun');

//   let resource_sql = `
//   SELECT RESOURCE_GUBUN
//     FROM CLARM_RESOURCE_ORG_INFO
//    WHERE USE_FLAG = '${s_use_flag}'
//      AND BASIC_ID = '${s_account_name}'
//    GROUP BY 1
//    ORDER BY 1
//   `;

//   const resource_data = await get_data(5, resource_sql);
//   if(!Array.isArray(resource_data) || resource_data.length === 0) {
//     console.log(resource_data);
//     return;
//   }

//   s_resource_gubun.html(`<option value="all">전체</option>`);
//   resource_data.forEach((obj)=>{
//     s_resource_gubun.append(`<option value="${obj[0]}">${obj[0]}</option>`)   
//    })
// }
/* ########## 메뉴조회 끝 ########## */


/* ########## 메인화면 좌측 테이블 시작 ########## */
async function fn_grid_resource() {
  const use_flag = $('#s_use_flag').val(),
        s_jsa_code = $('#s_jsa_code').val();

  let sql = `
    SELECT 
        rmi.id, 
        rmi.jsa_code, 
        rmi.work_step, 
        rmi.work_type, 
        rmi.risk, 
        rmi.risk_cause, 
        rmi.risk_prepare, 
        rmi.frequency, 
        rmi.strength, 
        rmi.risk_degree, 
        rmi.grade, 
        rmi.flag, -- 11
        (frequency::Integer + strength :: Integer + risk_degree::Integer) as sum_grade,
        rmi.fst_reg_user_id, 
	      TO_CHAR(fst_reg_dttm,'YYYY-MM-DD HH24:mi:SS') as fst_reg_dttm ,
	      last_reg_user_id, 
	      TO_CHAR(last_mod_dttm,'YYYY-MM-DD HH24:mi:SS') as last_mod_dttm
    FROM itsm.risk_mgr_info rmi
   WHERE rmi.flag = '${use_flag}'`
  if(s_jsa_code) {
    sql += `
     AND rmi.jsa_code = '${s_jsa_code}'`
  }
    sql += `
   ORDER BY rmi.id, rmi.jsa_code
  `;
  const data = await get_data(1, sql);

  const tbody = $('#resource_body');
  tbody.empty()
  data.forEach((obj, index) => {
    let option = `
    <tr onclick="fn_resource_mod(${obj[0]})">
      <td class="center aligned">${index+1}</td>
      <td>${obj[1]}</td>
      <td>${obj[2]}</td>
      <td>${obj[3]}</td>
      <td class="center aligned">${obj[4]}</td>
      <td class="center aligned">${obj[5]}</td>
      <td class="center aligned">${obj[6]}</td>
      <td class="center aligned">${obj[7]}</td>
      <td class="center aligned">${obj[8]}</td>
      <td class="center aligned">${obj[9]}</td>
      <td class="center aligned">${obj[12]}</td>
      <td class="center aligned">${obj[14]}</td>`
      option += `</tr>`
    tbody.append(option)
  })
  $('.tab_detail').popup()
;
}
/* ########## 메인화면 좌측 테이블 끝 ########## */

/* ########## 리소스 등록 화면 시작 ########## */
async function fn_resource_grid() {
  const ag = $('#account_grid'), ah = $('#account_header');
  ah.html('JSA 등록')
  ag.empty();
  let option = `
  <form class="ui form" onsubmit="return false">
    <div class="two fields">
      <div class="field">
        <label>기준코드</label>
        <input type="text" id="i_jsa_code" placeholder="기준코드드 입력...">
      </div>
      <div class="field">
        <label>작업단계</label>
        <input type="text" id="i_work_stage_code" placeholder="작업단계 입력...">
      </div>
    </div>
    <div class="required field">
      <label>작업방법</label>
      <input type="text" id="i_catg1" placeholder="작업방법 입력...">
    </div>
    <div class="required field">
      <label>RISK</label>
      <input type="text" id="i_vatg2" placeholder="RISK 입력...">
    </div>
    <div class="required field">
      <label>유해위험요인</label>
      <input type="text" id="i_risk_factors" placeholder="유해위험요인 입력...">
    </div>
    <div class="required field">
      <label>대책</label>
      <input type="text" id="i_risk_plan" placeholder="대책 입력...">
    </div>
    <div class="two fields">
      <div class="required field">
        <label>빈도</label>
        <select id="i_fre_grade">`
        /* 리소스 구분 공통 코드 조회 */
        const rg_data = await get_data(1, `
        SELECT CODE
             , CODE_NAME
          FROM ITSM.ITSM_CODE
         WHERE PART = 'JSA_GRADE'
           AND FLAG = 'Y'
         ORDER BY CODE_NAME
        `);
        if (rg_data instanceof Error) {
          console.error("에러 발생: " + data.message);
        } else {
          rg_data.forEach(function(rg_row) {
            option += `<option value="${rg_row[0]}">${rg_row[1]}</option>`
          })
        }
        option += `
        </select>
      </div>
      <div class="required field">
        <label>강도</label>
        <select id="i_str_grade">`
        /* 리소스 구분 공통 코드 조회 */
        const rg_data1 = await get_data(1, `
        SELECT CODE
             , CODE_NAME
          FROM ITSM.ITSM_CODE
         WHERE PART = 'JSA_GRADE'
           AND FLAG = 'Y'
         ORDER BY CODE_NAME
        `);
        if (rg_data1 instanceof Error) {
          console.error("에러 발생: " + data.message);
        } else {
          rg_data1.forEach(function(rg_row) {
            option += `<option value="${rg_row[0]}">${rg_row[1]}</option>`
          })
        }
        option += `
        </select>
      </div>
    </div>
    <div class="two fields">
      <div class="required field">
        <label>위험도</label>
        <select id="i_risk_grade">`
        /* 리소스 구분 공통 코드 조회 */
        const rg_data2 = await get_data(1, `
        SELECT CODE
             , CODE_NAME
          FROM ITSM.ITSM_CODE
         WHERE PART = 'JSA_GRADE'
           AND FLAG = 'Y'
         ORDER BY CODE_NAME
        `);
        if (rg_data2 instanceof Error) {
          console.error("에러 발생: " + data.message);
        } else {
          rg_data2.forEach(function(rg_row) {
            option += `<option value="${rg_row[0]}">${rg_row[1]}</option>`
          })
        }
        option += `
        </select>
      </div>
      <div class="required field">
        <label>사용구분 (Y:사용, N:미사용, D:삭제)</label>
        <select id="i_flag">
          <option selected value="Y">Y</option>
          <option value="N">N</option>
          <option value="D">D</option>
        </select>
      </div>
    </div>
    <div class="required field">
      <label>등록자</label>
      <input type="text" id="i_reg_user" placeholder="등록자 입력...">
    </div>
    <button id="account_insert_btn" class="ui brown button">등록</button>
    <button class="ui button" onclick="fn_resource_grid()">취소</button>
  </form>`;
  ag.html(option);
  
  // $('#i_account_name').on('change', function() {
  //   let acc_idx = $(this).val();
  //   //$('#i_account_desc').html(acc_data[acc_idx][2]);
  // })

  // INSERT 버튼 클릭 시
  $('#account_insert_btn').on('click', async function() {
    const i_jsa_code             = $('#i_jsa_code').val(),         // 기준코드
          i_work_stage_code      = $('#i_work_stage_code').val(),  // 작업단계
          i_catg1                = $('#i_catg1').val(),            // CAGT1
          i_vatg2                = $('#i_vatg2').val(),            // VATG2
          i_risk_factors         = $('#i_risk_factors').val(),     // 유해위험요인
          i_risk_plan            = $('#i_risk_plan').val(),        // 대책
          i_fre_grade            = $('#i_fre_grade').val(),        // 빈도
          i_str_grade            = $('#i_str_grade').val(),        // 강도
          i_risk_grade           = $('#i_risk_grade').val(),       // 위험도
          i_flag                 = $('#i_flag').val(),             // 사용구분
          i_reg_user             = $('#i_reg_user').val();         // 등록자

    if(!i_jsa_code) {
      alert('기준코드 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_work_stage_code) {
      alert('작업단계 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_catg1) {
      alert('CAGT1 표시명은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_vatg2) {
      alert('VATG2 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_risk_factors) {
      alert('유해위험요인 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_risk_plan) {
      alert('대책 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_fre_grade) {
      alert('빈도 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_str_grade) {
      alert('강도 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_risk_grade) {
      alert('위험도 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_flag) {
      alert('사용구분 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_reg_user) {
      alert('등록자 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    }

    const sql = `
    INSERT INTO ITSM.RISK_MGR_INFO (
                ID
                ,JSA_CODE
                ,WORK_STEP
                ,WORK_TYPE
                ,RISK
                ,RISK_CAUSE
                ,RISK_PREPARE
                ,FREQUENCY
                ,STRENGTH
                ,RISK_DEGREE
                ,GRADE
                ,FLAG 
                ,FST_REG_USER_ID
                ,FST_REG_DTTM 
                ,LAST_REG_USER_ID
                ,LAST_MOD_DTTM 
           )
    VALUES (
           NEXTVAL('itsm.sq_itsm_jsa_rule_01')
         , '${i_jsa_code}'
         , '${i_work_stage_code}'
         , '${i_catg1}'
         , '${i_vatg2}'
         , '${i_risk_factors}'
         , '${i_risk_plan}'
         , '${i_fre_grade}'
         , '${i_str_grade}'
         , '${i_risk_grade}'
         , 'A'
         , '${i_flag}'
         , '${i_reg_user}'
         , CURRENT_TIMESTAMP
         , '${i_reg_user}'
         , CURRENT_TIMESTAMP
           )
    `
    const data = await get_data(1, sql);
    if (data instanceof Error) {
      console.error("에러 발생: " + data.message);
    } else {
      // 정상 결과 처리
      alert('등록 완료');
      await fn_grid_resource();
      await fn_resource_grid();
    }
  })
}
/* ########## 리소스 등록 화면 끝 ########## */

/* ########## 리소스 수정 화면 시작 ########## */
async function fn_resource_mod(e) {
  const ag = $('#account_grid'), ah = $('#account_header');
  ah.html('JSA 수정');
  if(!e) {
    console.error('항목이 없습니다');
    return false;
  }
  const sql = `
    SELECT rmi.id, 
        rmi.jsa_code, 
        rmi.WORK_STEP, 
        rmi.WORK_TYPE, 
        rmi.RISK, 
        rmi.RISK_CAUSE, 
        rmi.RISK_PREPARE, 
        rmi.FREQUENCY, 
        rmi.STRENGTH, 
        rmi.RISK_DEGREE, 
        rmi.grade, 
        rmi.flag, 
        (FREQUENCY::Integer + STRENGTH :: Integer + RISK_DEGREE::Integer) as sum_grade,
        rmi.fst_reg_user_id, 
	      TO_CHAR(fst_reg_dttm,'YYYY-MM-DD HH24:mi:SS') as fst_reg_dttm ,
	      last_reg_user_id, 
	      TO_CHAR(last_mod_dttm,'YYYY-MM-DD HH24:mi:SS') as last_mod_dttm
    FROM itsm.risk_mgr_info rmi
   WHERE rmi.id = ${e}
  `;
  const data = await get_data(1, sql);
  if(data.length === 0) {
    console.error('항목이 없습니다');
    return;
  }
  let option = `
  <form class="ui form" onsubmit="return false">
    <div class="two fields">
      <div class="field">
        <label>기준코드</label>
        <input type="text" id="u_jsa_code" placeholder="기준코드드 입력..." value="${data[0][1]}">
      </div>
      <div class="field">
        <label>작업단계</label>
        <input type="text" id="u_work_stage_code" placeholder="기준코드드 입력..." value ="${data[0][2]}">
      </div>
    </div>
    <div class="required field">
      <label>작업방법</label>
      <input type="text" id="u_catg1" value="${data[0][3]}">
    </div>
    <div class="required field">
      <label>RISK</label>
      <input type="text" id="u_vatg2" value="${data[0][4]}">
    </div>
    <div class="required field">
      <label>유해위험요인</label>
      <input type="text" id="u_risk_factors" value="${data[0][5]}">
    </div>
    <div class="required field">
      <label>대책</label>
      <input type="text" id="u_risk_plan" value="${data[0][6]}">
    </div>
    <div class="two fields">
      <div class="required field">
        <label>빈도</label>
        <select id="u_fre_grade">`
        /* 리소스 구분 공통 코드 조회 */
        const rg_data = await get_data(1, `
        SELECT CODE
             , CODE_NAME
          FROM ITSM.ITSM_CODE
         WHERE PART = 'JSA_GRADE'
           AND FLAG = 'Y'
         ORDER BY CODE_NAME
        `);
        if (rg_data instanceof Error) {
          console.error("에러 발생: " + data.message);
        } else {
          rg_data.forEach(function(rg_row) {
            if (rg_row[0] === data[0][7]) {
              option += `<option selected value="${rg_row[0]}">${rg_row[1]}</option>`
            } else {
              option += `<option value="${rg_row[0]}">${rg_row[1]}</option>`
            }
          })
        }
        option += `
        </select>
      </div>
      <div class="required field">
        <label>강도</label>
        <select id="u_str_grade">`
        /* 리소스 구분 공통 코드 조회 */
        const rg_data1 = await get_data(1, `
        SELECT CODE
             , CODE_NAME
          FROM ITSM.ITSM_CODE
         WHERE PART = 'JSA_GRADE'
           AND FLAG = 'Y'
         ORDER BY CODE_NAME
        `);
        if (rg_data instanceof Error) {
          console.error("에러 발생: " + data.message);
        } else {
          rg_data.forEach(function(rg_row) {
            if (rg_row[0] === data[0][8]) {
              option += `<option selected value="${rg_row[0]}">${rg_row[1]}</option>`
            } else {
              option += `<option value="${rg_row[0]}">${rg_row[1]}</option>`
            }
          })
        }
        option += `
        </select>
      </div>
    </div>
    <div class="two fields">
      <div class="required field">
        <label>위험도</label>
        <select id="u_risk_grade">`
        /* 리소스 구분 공통 코드 조회 */
        const rg_data2 = await get_data(1, `
        SELECT CODE
             , CODE_NAME
          FROM ITSM.ITSM_CODE
         WHERE PART = 'JSA_GRADE'
           AND FLAG = 'Y'
         ORDER BY CODE_NAME
        `);
        if (rg_data instanceof Error) {
          console.error("에러 발생: " + data.message);
        } else {
          rg_data.forEach(function(rg_row) {
            if (rg_row[0] === data[0][9]) {
              option += `<option selected value="${rg_row[0]}">${rg_row[1]}</option>`
            } else {
              option += `<option value="${rg_row[0]}">${rg_row[1]}</option>`
            }
          })
        }
        option += `
        </select>
      </div>
      <div class="required field">
        <label>사용구분 (Y:사용, N:미사용, D:삭제)</label>
        <select id="u_flag">`
        let u_y = "", u_n = "", u_d = "";
        switch(data[0][12]) {
          case 'N':
            u_n = 'selected ';
            break;
          case 'D':
            u_d = 'selected ';
            break;
          default:
            u_y = 'selected ';
            break;
        }
        option += `
          <option ${u_y}value="Y">Y</option>
          <option ${u_n}value="N">N</option>
          <option ${u_d}value="D">D</option>
        </select>
      </div>
    </div>
    <div class="two fields">
      <div class="field">
        <label>등록자</label>
        <div class="ui visible message no_mg" style="padding:9.5px 14px"><p>${data[0][13]}</p></div>
      </div>
      <div class="field">
        <label>등록일시</label>
        <div class="ui visible message no_mg" style="padding:9.5px 14px"><p>${data[0][14]}</p></div>
      </div>
    </div>
    <div class="two fields">
      <div class="required field">
        <label>수정자</label>
        <input type="text" id="u_mod_user" value="${data[0][15]}">
      </div>
      <div class="field">
        <label>수정일시</label>
        <div class="ui visible message no_mg" style="padding:9.5px 14px"><p>${data[0][16]}</p></div>
      </div>
    </div>
    <button id="account_update_btn" class="ui brown button">수정</button>
    <button class="ui button" onclick="fn_resource_grid()">취소</button>
  </form>`;
  ag.html(option);

  // 업데이트 버튼 클릭 시
  $('#account_update_btn').on('click', async function() {
    const u_jsa_code             = $('#u_jsa_code').val(),         // 기준코드
          u_work_stage_code      = $('#u_work_stage_code').val(),  // 작업단계
          u_catg1                = $('#u_catg1').val(),            // CAGT1
          u_vatg2                = $('#u_vatg2').val(),            // VATG2
          u_risk_factors         = $('#u_risk_factors').val(),     // 유해위험요인
          u_risk_plan            = $('#u_risk_plan').val(),        // 대책
          u_fre_grade            = $('#u_fre_grade').val(),        // 빈도
          u_str_grade            = $('#u_str_grade').val(),        // 강도
          u_risk_grade           = $('#u_risk_grade').val(),       // 위험도
          u_flag                 = $('#u_flag').val(),             // 사용구분
          u_mod_user             = $('#u_mod_user').val();         // 수정자

    if(!u_catg1) {
      alert('CAGT1 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_vatg2) {
      alert('VATG2 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_risk_factors) {
      alert('유해위험요인 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_risk_plan) {
      alert('대책 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_fre_grade) {
      alert('빈도 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_str_grade) {
      alert('강도 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_risk_grade) {
      alert('위험도 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_flag) {
      alert('사용구분 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_mod_user) {
      alert('수정자 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_jsa_code) {
      alert('기준코드 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_work_stage_code) {
      alert('작업단계 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    }


    const r_upd_sql = `
    UPDATE ITSM.RISK_MGR_INFO JSA
       SET JSA_CODE         = '${u_jsa_code}'
         , WORK_STEP        = '${u_work_stage_code}'
         , WORK_TYPE        = '${u_catg1}'
         , RISK             = '${u_vatg2}'
         , RISK_CAUSE       = '${u_risk_factors}'
         , RISK_PREPARE     = '${u_risk_plan}'
         , FREQUENCY        = '${u_fre_grade}'
         , STRENGTH         = '${u_str_grade}'
         , RISK_DEGREE      = '${u_risk_grade}'
         , FLAG             = '${u_flag}'
         , LAST_REG_USER_ID = '${u_mod_user}'
         , LAST_MOD_DTTM    = CURRENT_TIMESTAMP
     WHERE ID = ${data[0][0]}
    `
    const r_upd_data = await get_data(1, r_upd_sql);
    if (r_upd_data instanceof Error) {
      console.error("에러 발생: " + r_upd_data.message);
    } else {
      // 정상 결과 처리
      alert('수정 완료');
      await fn_grid_resource();
      await fn_resource_grid();
    }
  })
}
/* ########## 리소스 수정 화면 끝 ########## */
</script>