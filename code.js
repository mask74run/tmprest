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
.w_100{width:100%!important}
.ui.two.column.main.grid>.column{padding:8px!important}
.ui.tree.accordion .accordion>.content, .ui.tree.accordion>.content{margin-left:10px}
.ui.foot.stuck.table>tfoot, .ui.head.stuck.table>thead{z-index: 9!important}
.ui.compact.selection.dropdown{padding:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ui.large.label{color:black!important;background-color:inherit!important;text-shadow:none}
</style>
<div class="ui two column grid no_mg w_100 h_100">
  <div class="eleven wide column h_100" style="padding-right:7px">
    <div class="ui raised segment no_mg h_100">
      <div class="ui basic horizontal segments no_mg">
        <div class="ui basic segment no_mg" style="padding:4.5px 14px">
          <div class="ui secondary menu no_mg">
            <div class="item no_mg no_pd">
              <h5 class="ui header no_mg">
                <i class="code icon"></i>
                <div class="content">
                  코드 조회
                </div>
              </h5>
            </div>
            <div class="right menu">
              <div class="item no_pd">
                <div class="ui large label">
                  사용구분
                </div>
                <select id="s_use_flag" class="ui compact selection dropdown" style="width:50px">
                  <option value="Y">Y</option>
                  <option value="N">N</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div class="item no_pd">
                <div class="ui large label">
                  대분류
                </div>
                <select id="s_division" class="ui compact selection dropdown" style="width:120px">
                  <option selected value="all">전체</option>
                </select>
              </div>
              <div class="item no_pd">
                <div class="ui large label">
                  중분류
                </div>
                <select id="s_part" class="ui compact selection dropdown">
                  <option selected value="all">전체</option>
                </select>
              </div>
              <button class="ui brown button no_mg" onclick="fn_set_code_body()">검색</button>
            </div>
          </div>
        </div>
      </div>
      <div class="ui basic segment no_mg" style="height:calc(100% - 49px)">
        <div class="ui basic segment no_mg no_pd" style="height:100%;overflow:auto">
          <table class="ui very compact tiny celled head stuck single line selectable table">
            <thead>
              <tr>
                <th class="center aligned">순번</th>
                <th class="center aligned">대분류</th>
                <th class="center aligned">대분류명</th>
                <th class="center aligned">중분류</th>
                <th class="center aligned">중분류명</th>
                <th class="center aligned">코드</th>
                <th class="center aligned">코드명</th>
                <th class="center aligned">코드값</th>
                <th class="center aligned">코드레벨</th>
                <th class="center aligned">사용여부</th>
                <th class="center aligned">등록자</th>
                <th class="center aligned">등록일시</th>
                <th class="center aligned">수정자</th>
                <th class="center aligned">수정일시</th>
              </tr>
            </thead>
            <tbody id="code_tab_body"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="five wide column h_100" style="padding-left:7px">
    <div class="ui raised segment no_mg h_100">
      <div class="ui basic segment no_mg">
        <h5 class="ui header no_mg">
          <i class="code icon"></i>
          <div id="code_header" class="content"></div>
        </h5>
      </div>
      <div id="code_grid" class="ui basic segment no_mg" style="height:calc(100% - 49px);overflow:auto"></div>
    </div>
  </div>
</div>
<script>
jQuery.noConflict();
$(document).ready(async () => {
  fn_clarm_page();          // clarm 공통 페이지 로딩
  fn_set_title();           // 타이틀 설정
  await fn_drop_division(); // 대분류 데이터 로딩 
  await fn_drop_part();     // 중분류 데이터 로딩
  fn_set_code_body();       // 좌측 메인 코드 테이블 로딩
  fn_code_add();            // 우측 코드 등록 화면 로딩
  if('${__user.login}' !== 'admin') {
    $('.sidemenu').css('display','none');
    $('.page-toolbar').css('display','none');
  }
})


// 메인화면 타이틀 시작
function fn_set_title() {
  $('#main_title').html(`
  <i class="pencil alternate icon"></i>
  <div class="content">
    코드 관리
    <div class="sub header">ITEM 코드 관리</div>
  </div>`)
}


// 대분류 메뉴 조회 함수
async function fn_drop_division() {
  let s_use_flag = $('#s_use_flag').val(),
      s_division = $('#s_division');

  const division_sql = `
  SELECT DIVISION
       , DIVISION_NAME
    FROM ITSM.ITSM_CODE
   WHERE FLAG = '${s_use_flag}'
   GROUP BY 1,2
   ORDER BY 1,2
  `;

  const division_data = await get_data(1, division_sql);
  if(!Array.isArray(division_data) || division_data.length === 0) {
    console.log(division_data);
    return;
  }

  if(s_division.length === 1) {
    division_data.forEach((obj)=>{
      s_division.append(`<option value="${obj[0]}">${obj[1]}</option>`)   
    })
  }
  s_division.on('change', function() {
    fn_drop_part()
  })
}


// 중분류 메뉴 조회 함수
async function fn_drop_part(division) {
  let s_use_flag   = $('#s_use_flag').val(),
      s_division = $('#s_division').val(),
      s_part     = $('#s_part');
  let part_sql = `
  SELECT CODE
       , CODE_NAME
    FROM (
         SELECT DISTINCT 'SYSTEM' DIVISION
              , PART AS CODE
              , PART_NAME CODE_NAME
           FROM ITSM.ITSM_CODE
          WHERE DIVISION = 'SYSTEM'
            AND FLAG = '${s_use_flag}'
          UNION ALL
         SELECT DISTINCT 'CODE' DIVISION
              , PART CODE
              , PART CODE_NAME
           FROM ITSM.ITSM_CODE
          WHERE DIVISION = 'CODE'
            AND FLAG = '${s_use_flag}'
         ) DAT
   WHERE 1=1`
  if(s_division !== 'all') {
    part_sql += `
     AND DAT.DIVISION = '${s_division}'`;
  }
    part_sql += `
   ORDER BY CODE
          , CODE_NAME`;

  const part_data = await get_data(1, part_sql);
  if(!Array.isArray(part_data) || part_data.length === 0) {
    console.log(part_data);
    return;
  }
  
  s_part.html(`<option selected value="all">전체</option>`);
  part_data.forEach((obj)=>{
    s_part.append(`<option value="${obj[0]}">${obj[1]}</option>`)   
  })
}

// 좌측 메인 코드 테이블 로딩
async function fn_set_code_body() {
  let s_use_flag = $('#s_use_flag').val(),
      s_division = $('#s_division').val(),
      s_part     = $('#s_part').val();

  let code_sql = `
  SELECT ID
       , DIVISION 대분류
       , DIVISION_NAME 대분류명
       , PART 중분류
       , PART_NAME 중분류명
       , CODE 코드
       , CODE_NAME 코드명
       , CODE_VALUE 코드값
       , LEVEL_CODE 코드레벨
       , FLAG 사용여부
       , FST_REG_USER_ID 등록자
       , TO_CHAR(FST_REG_DTTM, 'YY-MM-DD HH24:MI:SS') 등록일시
       , LAST_REG_USER_ID 수정자
       , TO_CHAR(LAST_MOD_DTTM, 'YY-MM-DD HH24:MI:SS') 수정일시
    FROM ITSM.ITSM_CODE
   WHERE 1=1`
  if (s_use_flag !== 'all') {
    code_sql += `
     AND FLAG = '${s_use_flag}'`
  }
  if (s_division !== 'all') {
    code_sql += `
     AND DIVISION = '${s_division}'`
  }
  if (s_division ==='all' && s_part !== 'all') {
    alert('대분류를 선택해주세요')
    return;
  }
  if (s_division === 'CODE' && s_part !== 'all') {
    code_sql += `
     AND PART = '${s_part}'`
  } else if(s_division === 'SYSTEM' && s_part !== 'all') {
    code_sql += `
     AND PART = '${s_part}'`
  }
  code_sql += `
   ORDER BY PART
          , CODE`;

  const code_data = await get_data(1, code_sql);
  let ctb = $('#code_tab_body');

  if(!Array.isArray(code_data) || code_data.length === 0) {
    console.log(code_data);
    ctb.empty();
    return;
  }
  ctb.empty()
  code_data.forEach(function(obj, index) {
    let use_yn;
    if (obj[9] === 'Y') {
      use_yn = 'green'
    } else {
      use_yn = 'red'
    }
    ctb.append(`
    <tr onclick="fn_code_mod(${obj[0]})">
      <td class="center aligned">${index+1}</td>
      <td>${obj[1]}</td>
      <td>${obj[2]}</td>
      <td>${obj[3]}</td>
      <td>${obj[4]}</td>
      <td>${obj[5]}</td>
      <td>${obj[6]}</td>
      <td>${obj[7]}</td>
      <td>${obj[8]}</td>
      <td class="center aligned ${use_yn}">${obj[9]}</td>
      <td class="center aligned">${obj[10]}</td>
      <td class="center aligned">${obj[11]}</td>
      <td class="center aligned">${obj[12]}</td>
      <td class="center aligned">${obj[13]}</td>
    </tr>
    `);
  })
}


// 우측 코드 등록 화면 로딩
function fn_code_add() {
  const ag = $('#code_grid'), ah = $('#code_header');
  ah.html('코드 등록')
  ag.html(`
  <form class="ui form" onsubmit="return false">
    <div class="required field">
      <label>대분류</label>
      <input type="text" id="i_division" placeholder="대분류">
    </div>
    <div class="required field">
      <label>대분류명</label>
      <input type="text" id="i_division_name" placeholder="대분류명">
    </div>
    <div class="required field">
      <label>중분류</label>
      <input type="text" id="i_part" placeholder="중분류">
    </div>
    <div class="required field">
      <label>중분류명</label>
      <input type="text" id="i_part_name" placeholder="중분류명">
    </div>
    <div class="required field">
      <label>코드</label>
      <input type="text" id="i_code" placeholder="코드">
    </div>
    <div class="required field">
      <label>코드명</label>
      <input type="text" id="i_code_name" placeholder="코드명">
    </div>
    <div class="required field">
      <label>코드값</label>
      <input type="text" id="i_code_value" placeholder="코드값">
    </div>
    <div class="required field">
      <label>코드 레벨</label>
      <input type="text" id="i_level_code" placeholder="코드 레벨">
    </div>
    <div class="two fields">
      <div class="required field">
        <label>사용여부</label>
        <select class="ui fluid dropdown" id="i_flag">
          <option>Y</option>
          <option>N</option>
        </select>
      </div>
      <div class="required field">
        <label>등록자</label>
        <input type="text" id="i_reg_user" placeholder="등록자">
      </div>
    </div>
    <button class="ui brown button" onclick="fn_code_add_btn()">등록</button>
    <button class="ui button" onclick="fn_code_add()">취소</button>
  </form>`)
}

async function fn_code_add_btn() {
  $('.required').removeClass('error');

  const i_ds = $('#i_division').val(),
        i_dn = $('#i_division_name').val(),
        i_pt = $('#i_part').val(),
        i_pn = $('#i_part_name').val(),
        i_cd = $('#i_code').val(),
        i_cn = $('#i_code_name').val(),
        i_cv = $('#i_code_value').val(),
        i_lc = $('#i_level_code').val(),
        i_uf = $('#i_flag').val(),
        i_ru = $('#i_reg_user').val()

  if(!i_ds) {
    alert('대분류는 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!i_dn) {
    alert('대분류명은 필수값입니다.')
    $('.required').addClass('error');
    return false;
  } else if (!i_pt) {
    alert('중분류는 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!i_pn) {
    alert('중분류명은 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!i_cd) {
    alert('코드는 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!i_cn) {
    alert('코드명은 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!i_cv) {
    alert('코드값은 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!i_lc) {
    alert('코드레벨은 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!i_ru) {
    alert('등록자는 필수값입니다.');
    $('.required').addClass('error');
    return false;
  }

  const code_ins_sql = `
  INSERT INTO ITSM.ITSM_CODE (
         ID
       , DIVISION
       , DIVISION_NAME
       , PART
       , PART_NAME
       , CODE
       , CODE_NAME
       , CODE_VALUE
       , LEVEL_CODE
       , FLAG
       , FST_REG_USER_ID
       , FST_REG_DTTM
       , LAST_REG_USER_ID
       , LAST_MOD_DTTM
         )
  VALUES (
         NEXTVAL('itsm.sq_itsm_code_01')
      , '${i_ds}'
      , '${i_dn}'
      , '${i_pt}'
      , '${i_pn}'
      , '${i_cd}'
      , '${i_cn}'
      , '${i_cv}'
      , '${i_lc}'
      , '${i_uf}'
      , '${i_ru}'
      , CURRENT_TIMESTAMP
      , '${i_ru}'
      , CURRENT_TIMESTAMP
        )
  RETURNING *
  `;

  const code_ins_data = await get_data(1, code_ins_sql);
  if (code_ins_data instanceof Error) {console.error("에러 발생: " + code_ins_data.message);return}
  
  // 정상 결과 처리
  alert(`정상 처리 완료  ID : ${code_ins_data[0][0]}`)
  await fn_set_code_body();
  await fn_code_add();
}

// 좌측 테이블 데이터 클릭 시 코드 수정화면 로딩
async function fn_code_mod(e) {
  const ag = $('#code_grid'), ah = $('#code_header');
  ah.html('코드 수정');
  if(!e) {
    console.error('항목이 없습니다');
    return false;
  }
  const sql = `
  SELECT ID
       , DIVISION 대분류
       , DIVISION_NAME 대분류명
       , PART 중분류
       , PART_NAME 중분류명
       , CODE 코드
       , CODE_NAME 코드명
       , CODE_VALUE 코드값
       , LEVEL_CODE 코드레벨
       , FLAG 사용여부
       , FST_REG_USER_ID 등록자
       , TO_CHAR(FST_REG_DTTM, 'YY-MM-DD HH24:MI:SS') 등록일시
       , LAST_REG_USER_ID 수정자
       , TO_CHAR(LAST_MOD_DTTM, 'YY-MM-DD HH24:MI:SS') 수정일시
    FROM ITSM.ITSM_CODE
   WHERE ID = ${e}
  `;
  const data = await get_data(1, sql);
  if(!Array.isArray(data) || data.length === 0) {
    console.log(data);
    return;
  }
  let option = `
  <form class="ui form" onsubmit="return false">
    <div class="field">
      <label>대분류</label>
      <input readonly type="text" id="u_division" value="${data[0][1]}" />
    </div>
    <div class="field">
      <label>대분류명</label>
      <input readonly type="text" id="u_division_name" value="${data[0][2]}">
    </div>
    <div class="field">
      <label>중분류</label>
      <input readonly type="text" id="u_part" value="${data[0][3]}">
    </div>
    <div class="field">
      <label>중분류명</label>
      <input readonly type="text" id="u_part_name" value="${data[0][4]}">
    </div>
    <div class="required field">
      <label>코드</label>
      <input type="text" id="u_code" id="u_code" value="${data[0][5]}">
    </div>
    <div class="required field">
      <label>코드명</label>
      <input type="text" id="u_code_name" value="${data[0][6]}">
    </div>
    <div class="required field">
      <label>코드값</label>
      <input type="text" id="u_code_value" value="${data[0][7]}">
    </div>
    <div class="required field">
      <label>코드 레벨</label>
      <input type="text" id="u_level_code" value="${data[0][8]}">
    </div>
    <div class="two fields">
      <div class="required field">
        <label>사용여부</label>
        <select class="ui fluid dropdown" id="u_flag">`
        switch(data[0][9]) {
          case 'Y':
            option += `
            <option selected value="Y">Y</option>
            <option value="N">N</option>
            <option value="D">D</option>`
            break;
          case 'N':
            option += `
            <option value="Y">Y</option>
            <option selected value="N">N</option>
            <option value="D">D</option>`
            break;
          case 'D':
            option += `
            <option value="Y">Y</option>
            <option value="N">N</option>
            <option selected value="D">D</option>`
            break;
          default:
            option += `
            <option selected value="Y">Y</option>
            <option value="N">N</option>
            <option value="D">D</option>`
            break;
        }
        option += `
        </select>
      </div>
      <div class="required field">
        <label>수정자</label>
        <input type="text" id="u_mod_user" value="${data[0][12]}">
      </div>
    </div>
    <button class="ui brown button" onclick="fn_code_mod_btn(${e})">수정</button>
    <button class="ui button" onclick="fn_code_add()">취소</button>
  </form>`;
  ag.html(option);
}

// 업데이트 버튼 클릭 시
async function fn_code_mod_btn(e) {
  $('.required').removeClass('error');

  const u_ds = $('#u_division').val(),
        u_dn = $('#u_division_name').val(),
        u_pt = $('#u_part').val(),
        u_pn = $('#u_part_name').val(),
        u_cd = $('#u_code').val(),
        u_cn = $('#u_code_name').val(),
        u_cv = $('#u_code_value').val(),
        u_lc = $('#u_level_code').val(),
        u_uf = $('#u_flag').val(),
        u_mu = $('#u_mod_user').val()

  if(!u_ds) {
    alert('대분류는 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!u_dn) {
    alert('대분류명은 필수값입니다.')
    $('.required').addClass('error');
    return false;
  } else if (!u_pt) {
    alert('중분류는 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!u_pn) {
    alert('중분류명은 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!u_cd) {
    alert('코드는 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!u_cn) {
    alert('코드명은 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!u_cv) {
    alert('코드값은 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!u_lc) {
    alert('코드레벨은 필수값입니다.');
    $('.required').addClass('error');
    return false;
  } else if (!u_mu) {
    alert('등록자는 필수값입니다.');
    $('.required').addClass('error');
    return false;
  }

  const code_upd_sql = `
  UPDATE ITSM.ITSM_CODE
     SET DIVISION         = '${u_ds}'        
       , DIVISION_NAME    = '${u_dn}'        
       , PART             = '${u_pt}'        
       , PART_NAME        = '${u_pn}'        
       , CODE             = '${u_cd}'        
       , CODE_NAME        = '${u_cn}'        
       , CODE_VALUE       = '${u_cv}'        
       , LEVEL_CODE       = '${u_lc}'        
       , FLAG             = '${u_uf}'        
       , LAST_REG_USER_ID = '${u_mu}'        
       , LAST_MOD_DTTM    = CURRENT_TIMESTAMP
   WHERE ID = ${e}
  RETURNING *
  `;

  const code_upd_data = await get_data(1, code_upd_sql);
  if (code_upd_data instanceof Error) {console.error("에러 발생: " + code_upd_data.message);return}
  
  // 정상 결과 처리
  alert(`정상 처리 완료  ID : ${code_upd_data[0][0]}`)
  await fn_set_code_body();
  await fn_code_add();
}
</script>