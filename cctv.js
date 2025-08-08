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
.w_100{width: 100%!important}
.ui.two.column.main.grid>.column{padding:8px!important}
.ui.tree.accordion .accordion>.content, .ui.tree.accordion>.content{margin-left:10px}
.ui.foot.stuck.table>tfoot, .ui.head.stuck.table>thead{z-index: 9!important}
.ui.compact.selection.dropdown{padding:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ui.large.label{background-color:inherit!important;color:black!important;text-shadow:none}
</style>

<script src="public/custom/exceljs.min.js"></script>
<script src="public/custom/FileSaver.min.js"></script>

<script>

// col 22, row 30
async function exportExcel(exptblid, expsheetname, savefilename)
{ 
  // step 1. workbook 생성
  var wb = new ExcelJS.Workbook();

  // step 2. 시트 만들기 
  // var newWorksheet = excelHandler.getWorksheet();
  var nws =  wb.addWorksheet(expsheetname);
  ex_table = document.getElementById(exptblid);
  // ex_headers = Array.from(ex_table.querySelector('thead tr').children).map(th => th.textContent.trim());
  ex_headers = Array.from(ex_table.querySelector('thead').children).map(tr => 
      Array.from(tr.children).map(th => th.textContent.trim())
    );

  ex_rows = Array.from(ex_table.querySelector('tbody').children).map(tr => 
      Array.from(tr.children).map(td => td.textContent.trim())
    );

  ex_headers.forEach(row => {
    nws.addRow(row);
  });

  ex_rows.forEach(row => {
    nws.addRow(row);
  });
////////
  // all change 
  startCell = nws.getCell('A1');
  endCell = nws.getCell('V30');
  // Style 
  item_align = {horizontal: 'center', vertical: 'middle'};
  
  for (let rowNum = startCell.row; rowNum <= endCell.row; rowNum++) {
      for (let colNum = startCell.col; colNum <= endCell.col; colNum++) {
          cell = nws.getCell(rowNum, colNum);
          cell.border = {
              top: { style: 'thin', color: { argb: '000000' } },
              left: { style: 'thin', color: { argb: '000000' } },
              bottom: { style: 'thin', color: { argb: '000000' } },
              right: { style: 'thin', color: { argb: '000000' } }
          };
          cell.height =20;
          cell.font = { bold: false, name: "맑은 고딕", size:11,  color: { rgb: "ff0000" }};
      }
  }
  nws.getCell(1, 1).font = { bold: true, name: "맑은 고딕", size:20,  color: { rgb: "000000" }};
  nws.getRow(9).height = 3;
  nws.mergeCells('A1:G2'); // JSA Title
  nws.mergeCells('H1:V1'); // space 
  nws.mergeCells('N2:V2'); // 현장명 N

  nws.mergeCells('J3:J4'); // JSA Title
  nws.mergeCells('K3:L4'); // JSA Title

  nws.mergeCells('N3:P3'); // 작성자 N
  nws.mergeCells('N4:P4'); // 확인자 N
  nws.mergeCells('N5:P5'); // 검토자 N
  nws.mergeCells('N6:P6'); // 승인자 N

  nws.mergeCells('Q3:R3'); // 작성일자 Q
  nws.mergeCells('Q4:R4'); // 확인일자 Q
  nws.mergeCells('Q5:R5'); // 검토일자 Q
  nws.mergeCells('Q6:R6'); // 승인일자 Q
  nws.mergeCells('Q7:R7'); // 투입인원 Q

  nws.mergeCells('A3:C4'); // 작업명 A
  nws.mergeCells('A5:C5'); // 회사명 A
  nws.mergeCells('A6:C6'); // 필요보호구 A
  nws.mergeCells('A7:C7'); // 필요장비 A
  nws.mergeCells('A8:C8'); // 유해위험 A

  nws.mergeCells('D3:I4'); // 작업명 T
  nws.mergeCells('D5:L5'); // 회사명 T
  nws.mergeCells('D6:L6'); // 필요보호구 T
  nws.mergeCells('D7:P7'); // 필요장비 T
  nws.mergeCells('D8:V8'); // 유해위험 T

  item_bott_right_style = {bottom: { style: 'thick', color: { argb: '000000' }},right: { style: 'thick', color: { argb: '000000' }},top: { style: 'thin', color: { argb: '000000' }},left: { style: 'thin', color: { argb: '000000' }}};
  item_bott_left_style  = {bottom: { style: 'thick', color: { argb: '000000' } },left: { style: 'thick', color: { argb: '000000' }},top: { style: 'thin', color: { argb: '000000' }},right: { style: 'thin', color: { argb: '000000' }}};
  item_left_style  = {left: { style: 'thick', color: { argb: '000000' } },bottom: { style: 'thin', color: { argb: '000000' }},top: { style: 'thin', color: { argb: '000000' }},right: { style: 'thin', color: { argb: '000000' }}};
  item_right_style  = {right: { style: 'thick', color: { argb: '000000' } },bottom: { style: 'thin', color: { argb: '000000' }},top: { style: 'thin', color: { argb: '000000' }},left: { style: 'thin', color: { argb: '000000' }}};
  item_bottom_style  = {bottom: { style: 'thick', color: { argb: '000000' } },right: { style: 'thin', color: { argb: '000000' }},top: { style: 'thin', color: { argb: '000000' }},left: { style: 'thin', color: { argb: '000000' }}};
  item_top_style  = {top: { style: 'thick', color: { argb: '000000' } },bottom: { style: 'thin', color: { argb: '000000' }},right: { style: 'thin', color: { argb: '000000' }},left: { style: 'thin', color: { argb: '000000' }}};
  item_top_right_style  = {top: { style: 'thick', color: { argb: '000000' } },right: { style: 'think', color: { argb: '000000' }},bottom: { style: 'thin', color: { argb: '000000' }},left: { style: 'thin', color: { argb: '000000' }}};
  item_top_left_style  = {top: { style: 'thick', color: { argb: '000000' } },left: { style: 'think', color: { argb: '000000' }},right: { style: 'thin', color: { argb: '000000' }},bottom: { style: 'thin', color: { argb: '000000' }}};

  item_thin_all_white_style  = {top: { style: 'thin', color: { argb: 'ffffff' } },bottom: { style: 'thin', color: { argb: 'ffffff' }},right: { style: 'thin', color: { argb: 'ffffff' }},left: { style: 'thin', color: { argb: 'ffffff' }}};
  
  nws.getCell('A1').border  = item_thin_all_white_style;
  nws.getCell('H1').border  = item_thin_all_white_style;
  nws.getCell('I2').border  = item_thin_all_white_style;
  nws.getCell('J2').border  = item_thin_all_white_style;
  nws.getCell('K2').border  = item_thin_all_white_style;
  nws.getCell('L2').border  = item_thin_all_white_style;
  nws.getCell('H2').border  = item_thin_all_white_style;


  nws.getCell('D8').border  = item_bott_right_style; 
  nws.getCell('A8').border  = item_bott_left_style;
  nws.getCell('A8').alignment = item_align;

  nws.getCell('A3').border  = item_left_style;
  nws.getCell('A3').alignment = item_align;
  nws.getCell('A5').border  = item_left_style;
  nws.getCell('A5').alignment = item_align;
  nws.getCell('A6').border  = item_left_style;
  nws.getCell('A6').alignment = item_align;
  nws.getCell('A7').border  = item_left_style;
  nws.getCell('A7').alignment = item_align;


  nws.mergeCells('A10:A11'); // 순번 T
  nws.mergeCells('B10:D11'); // 작업단계 T
  nws.mergeCells('E10:I11'); // 유해위험요인 T
  nws.mergeCells('J10:P11'); // 대책 T
  nws.mergeCells('Q10:T10'); // 위험성평가 T
  nws.mergeCells('U10:V11'); // 조치자 T

  nws.getCell('A10').alignment = item_align;
  nws.getCell('B10').alignment = item_align;
  nws.getCell('E10').alignment = item_align;
  nws.getCell('J10').alignment = item_align;
  nws.getCell('Q10').alignment = item_align;
  nws.getCell('U10').alignment = item_align;

  nws.getCell('A10').border = item_top_left_style;
  nws.getCell('B10').border = item_top_style;
  nws.getCell('E10').border = item_top_style;
  nws.getCell('J10').border = item_top_style;
  nws.getCell('Q10').border = item_top_style;

  nws.getCell('Q11').alignment = item_align;
  nws.getCell('R11').alignment = item_align;
  nws.getCell('S11').alignment = item_align;
  nws.getCell('T11').alignment = item_align;
  //tbl 1
  nws.mergeCells('A12:A17');
  nws.getCell('A12').alignment = item_align;
  nws.getCell('A12').border  = item_left_style;

  nws.mergeCells('B12:D17');
  nws.getCell('B12').alignment = item_align;

  nws.mergeCells('E12:I12');
  nws.mergeCells('E13:I13');
  nws.mergeCells('E14:I14');
  nws.mergeCells('E15:I15');
  nws.mergeCells('E16:I16');
  nws.mergeCells('E17:I17');
  
  nws.mergeCells('J12:P12');
  nws.mergeCells('J13:P13');
  nws.mergeCells('J14:P14');
  nws.mergeCells('J15:P15');
  nws.mergeCells('J16:P16');
  nws.mergeCells('J17:P17');

  //tbl 2
  nws.mergeCells('A18:A26');
  nws.getCell('A18').alignment = item_align;
  nws.getCell('A18').border  = item_left_style;

  nws.mergeCells('B18:D26');
  nws.getCell('B18').alignment = item_align;

  nws.mergeCells('E18:I18');
  nws.mergeCells('E19:I19');
  nws.mergeCells('E20:I20');
  nws.mergeCells('E21:I21');
  nws.mergeCells('E22:I22');
  nws.mergeCells('E23:I23');
  nws.mergeCells('E24:I24');
  nws.mergeCells('E25:I25');
  nws.mergeCells('E26:I26');
  
  nws.mergeCells('J18:P18');
  nws.mergeCells('J19:P19');
  nws.mergeCells('J20:P20');
  nws.mergeCells('J21:P21');
  nws.mergeCells('J22:P22');
  nws.mergeCells('J23:P23');
  nws.mergeCells('J24:P24');
  nws.mergeCells('J25:P25');
  nws.mergeCells('J26:P26');

  //tbl 3
  nws.mergeCells('A27:A29');
  nws.getCell('A27').alignment = item_align;
  nws.getCell('A27').border  = item_left_style;

  nws.mergeCells('B27:D29');
  nws.getCell('B27').alignment = item_align;

  nws.mergeCells('E27:I27');
  nws.mergeCells('E28:I28');
  nws.mergeCells('E29:I29');
  
  nws.mergeCells('J27:P27');
  nws.mergeCells('J28:P28');
  nws.mergeCells('J29:P29');

  //tbl 4 
  nws.mergeCells('B30:S30');
  nws.mergeCells('T30:V30');

  //tbl all 조치자 
  nws.mergeCells('U12:V12');
  nws.mergeCells('U13:V13');
  nws.mergeCells('U14:V14');
  nws.mergeCells('U15:V15');
  nws.mergeCells('U16:V16');
  nws.mergeCells('U17:V17');
  nws.mergeCells('U18:V18');
  nws.mergeCells('U19:V19');
  nws.mergeCells('U20:V20');
  nws.mergeCells('U21:V21');
  nws.mergeCells('U22:V22');
  nws.mergeCells('U23:V23');
  nws.mergeCells('U24:V24');
  nws.mergeCells('U25:V25');
  nws.mergeCells('U26:V26');
  nws.mergeCells('U27:V27');
  nws.mergeCells('U28:V28');
  nws.mergeCells('U29:V29');
  
  nws.getCell('U10').border  = item_top_right_style;
  nws.getCell('U11').border  = item_right_style;
  nws.getCell('U12').border  = item_right_style;
  nws.getCell('U13').border  = item_right_style;
  nws.getCell('U14').border  = item_right_style;
  nws.getCell('U15').border  = item_right_style;
  nws.getCell('U16').border  = item_right_style;
  nws.getCell('U17').border  = item_right_style;
  nws.getCell('U18').border  = item_right_style;
  nws.getCell('U19').border  = item_right_style;
  nws.getCell('U20').border  = item_right_style;
  nws.getCell('U21').border  = item_right_style;
  nws.getCell('U22').border  = item_right_style;
  nws.getCell('U23').border  = item_right_style;
  nws.getCell('U24').border  = item_right_style;
  nws.getCell('U25').border  = item_right_style;
  nws.getCell('U26').border  = item_right_style;
  nws.getCell('U27').border  = item_right_style;
  nws.getCell('U28').border  = item_right_style;
  nws.getCell('U29').border  = item_right_style;
  nws.getCell('U30').border  = item_bott_right_style;
  nws.getCell('A30').border  = item_bott_left_style;
  nws.getCell('B30').border  = item_bottom_style;

  nws.mergeCells('S3:V3');
  nws.mergeCells('S4:V4');
  nws.mergeCells('S5:V5');
  nws.mergeCells('S6:V6');
  nws.mergeCells('S7:V7');

  nws.getCell('S3').border =item_right_style;
  nws.getCell('S4').border =item_right_style;
  nws.getCell('S5').border =item_right_style;
  nws.getCell('S6').border =item_right_style;
  nws.getCell('S7').border =item_right_style;


  nws.getCell('A3').border ={top: { style: 'thick', color: { argb: '000000' } },left: { style: 'thick', color: { argb: '000000' }},right: { style: 'thin', color: { argb: '000000' }},bottom: { style: 'thin', color: { argb: '000000' }}};
  nws.getCell('D3').border =item_top_style;
  nws.getCell('J3').border =item_top_style;
  nws.getCell('K3').border =item_top_style;

  nws.getCell('M2').border ={top: { style: 'thick', color: { argb: '000000' } },left: { style: 'thick', color: { argb: '000000' }},right: { style: 'thin', color: { argb: '000000' }},bottom: { style: 'thin', color: { argb: '000000' }}};
  nws.getCell('N2').border ={top: { style: 'thick', color: { argb: '000000' } },left: { style: 'thin', color: { argb: '000000' }},right: { style: 'thick', color: { argb: '000000' }},bottom: { style: 'thin', color: { argb: '000000' }}};
  
  nws.getRow(30).height = 40;
//
  imageId = wb.addImage({
    base64: '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',
    extension: 'png',
  });

  nws.addImage(imageId, 'T30:V30'); // Fits image in cell A1

mainCell = nws.getCell('A1');
// JSA(Job safety Analysis 작업안전분석)_수시위험성평가
mainCell.value = {
    'richText': [
        { 'font': { 'size': 24, 'bold': true }, 'text': 'JSA ' },
        { 'font': { 'size': 16, 'bold': true }, 'text': '(Job safety Analysis 작업안전분석)' },
        { 'font': { 'size': 11, 'bold': false }, 'text': '_수시위험성평가' }
    ]
}
//////////
    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), savefilename);
}

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
                설비코드
              </div>
              <div class="ui input">
                <input id="s_eq_code" name="s_eq_code" type="text" class="search" placeholder="검색어 입력.." style="height:38px">
              </div>
            </div>
            <div class="item no_pd">
              <div class="ui large label">
                설치장소
              </div>
              <div class="ui input">
                <input id="s_setup_place" name="s_setup_place" type="text" class="search" placeholder="검색어 입력.." style="height:38px">
              </div>
            </div>
            <div class="item no_pd">
              <div class="ui large label">
                Maker
              </div>
              <div class="ui input">
                <input id="s_maker" name="s_maker" type="text" class="search" placeholder="검색어 입력.." style="height:38px">
              </div>
            </div>
            <div class="item no_pd">
              <div class="ui large label">
                예방조치일일
              </div>
              <div class="ui input">
                <input id="pre_chk_dt" name="pre_chk_dt" type="date" placeholder="" value="">
              </div>
            </div>
            <div class="item no_pd">
              <div class="ui large label">
                사용구분
              </div>
              <select id="s_flag" class="ui compact selection dropdown" style="width:50px">
                <option selected value="Y">Y</option>
                <option value="N">N</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
          <div class="right menu">
            <button class="ui brown button" style="margin:0px 0px 0px 14px" onclick="fn_grid_resource(paging)">검색</button>
          </div>
        </div>
      </div>
      <div class="ui basic segment no_mg" style="height:calc(100% - 60px)">
        <div id="tbl_scroll" class="ui basic segment no_mg no_pd" style="height:100%;overflow:auto">
          <table class="ui celled head stuck selectable single line compact table">
            <thead>
              <tr>     
                <th class="center aligned">순번</th>
                <th class="center aligned">설비코드</th>
                <th class="center aligned">구분(TYPE)</th>
                <th class="center aligned">설치일</th>
                <th class="center aligned">공장</th>
                <th class="center aligned">설치장소</th>
                <th class="center aligned">규격</th>
                <th class="center aligned">모델</th>
                <th class="center aligned">메이커</th>
                <th class="center aligned">IP</th>
                <th class="center aligned">PORT</th>
                <th class="center aligned">RGB</th>
                <th class="center aligned">특성</th>
                <th class="center aligned">QR CODE</th>
                <th class="center aligned">예방조치일</th>
                <th class="center aligned">조치일자</th>
                <th class="center aligned">JSA</th>
                <th class="center aligned">Excel</th>
              </tr>
            </thead>
            <tbody id="resource_body"></tbody>
          </table>
        </div>
        <div id="paginationControls" class="center ui basic w_100 no_mg center aligned" style="text-align: center;">
            <button id="prevPage" class="center ui brown button" style="margin:0px 0px 0px 0px"  onclick="calcpage(-1);">prev</button>
            <span id="currentPage" class="center ui large label" >Page 1</span>
            <button id="nextPage" class="center ui brown button" style="margin:0px 0px 0px 0px"  onclick="calcpage(1)">Next</button>
        </div>
        <!-- <div id="tableContainer">
        </div> -->
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
<!-- end  -->
</div>

<div class="ui match modal" style="margin:auto;" >
  <div class="ui segment no_mg" style="height:800px">
    <h3 class="ui header">
      <i class="users icon"></i>
      <div class="content">
        설비 코드 With JSA Code Match
        <div id="modal_sns_arn" class="sub header"></div>
      </div>
    </h3>
    <div class="ui basic segment no_mg no_pd" style="width:100%;height:calc(100% - 96px)">
      <div class="ui top attached menu secondary no_mg">
        <div class="left item no_pd">
          <div class="ui icon input">
            <input type="text" class="search" placeholder="JSA Code 검색...">
            <i class="search icon"></i>
          </div>
        </div>
      </div>
      <div id="modal_table" class="ui bottom attached segment no_mg" style="height:calc(100% - 84px);width: calc(100% - 26px);"></div>
    </div>
    <div class="actions" style="margin-top:8px">
      <div class="ui approve button">적용</div>
      <div class="ui cancel button">취소</div>
    </div>
  </div>
</div>

<script>
let mpre_chk_dt = document.getElementById("pre_chk_dt");
mpre_chk_dt.value = dt;

jQuery.noConflict();
// rows = 스크롤을 내릴 때 마다 해당 수만큼 append
var paging = 1, rows = 30, max_rows = 9999, gv_data = '';

$(document).ready(async () => {
  fn_resource_grid();

  await fn_grid_resource(paging);
  if('${__user.login}' !== 'admin') {
    $('.sidemenu').css('display','none');
    $('.page-toolbar').css('display','none');
  }
})

//###### page pre next button ######
async function calcpage(val) {
  paging = paging + eval(val);
  if (paging <= 0) paging = 1;
  await fn_grid_resource (paging);
}

//###### render Table next button ######
async function renderTable(data, pageIndex, totalPages) {

    const currentPageSpan = document.getElementById('currentPage');
    currentPageSpan.textContent = `Page ${pageIndex} of ${totalPages}`;

    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    prevButton.disabled = pageIndex === 1;
    nextButton.disabled = pageIndex === totalPages;
}

/* ########## 메인화면 좌측 테이블 시작 ########## */
async function fn_grid_resource(paging) {
  const flag          = $('#s_flag').val(),            //사용구분
        s_eq_code     = $('#s_eq_code').val(),         //설비코드
        s_setup_place = $('#s_setup_place').val(),     //설치장소
        s_maker       = $('#s_maker').val(),           //makert
        s_pre_chk_dt  = $('#s_pre_chk_dt').val();      //예방조치일 
  if (paging===0) paging = 1;
  let sql ='';
  ////
  sql =`
        SELECT  count(*)   data,
               '${paging}' pageindex , 
              (count(*) / 30)  totalpages
        FROM  ITSM.PLANT_INFO PI2 
        WHERE PI2.FLAG = '${flag}'`;
  if(s_eq_code) {
    sql += `
    AND PI2.EQ_CODE like concat('${s_eq_code}','%')` ;
  }
  if(s_setup_place) {
    sql += `
    AND PI2.SETUP_PLACE  like concat('${s_setup_place}', '%')` ;
  }
  if(s_maker) {
    sql += `
    AND PI2.MAKER  like concat('${s_maker}', '%')` ;
  }
  console.log (sql);
  gv_data = await get_data(1, sql);
  renderTable(gv_data[0][0], gv_data[0][1], gv_data[0][2]);
  console.log (gv_data[0][0]);
  console.log (gv_data[0][1]);
  console.log (gv_data[0][2]);
  ////
  sql = `
    SELECT
      PI2.ID,
      PI2.EQ_CODE,
      PI2.GUBUN,
      TO_CHAR(PI2.SETUP_DT, 'YYYY-MM-DD HH24:MI:SS'),
      PI2.FAC_CD,
      PI2.SETUP_PLACE,
      PI2.SPEC,
      PI2.MODEL, 
      PI2.MAKER,
      PI2.IP_ADDR,
      PI2.COM_PORT,
      PI2.RGB,
      PI2.NOTI,
      PI2.QR_CD,
      TO_CHAR(PI2.PRE_CHK_DT, 'YYYY-MM-DD HH24:MI:SS'),
      TO_CHAR(PI2.EFFEC_DT, 'YYYY-MM-DD HH24:MI:SS'),
      PI2.FLAG,
      PI2.FST_REG_USER_ID,
      TO_CHAR(PI2.FST_REG_DTTM, 'YYYY-MM-DD HH24:MI:SS'),
      PI2.LAST_REG_USER_ID,
      TO_CHAR(PI2.LAST_MOD_DTTM, 'YYYY-MM-DD HH24:MI:SS'),
      RANK() OVER (ORDER BY PI2.ID, PI2.EQ_CODE)  IDX     -- 22 
    FROM
      ITSM.PLANT_INFO PI2 
   WHERE PI2.FLAG = '${flag}'`
  if(s_eq_code) {
    sql += `
     AND PI2.EQ_CODE like concat('${s_eq_code}','%')` ;
  }
  if(s_setup_place) {
    sql += `
     AND PI2.SETUP_PLACE  like concat('${s_setup_place}', '%')` ;
  }
  if(s_maker) {
    sql += `
     AND PI2.MAKER  like concat('${s_maker}', '%')` ;
  }

    sql += `
   ORDER BY PI2.ID, PI2.EQ_CODE
  `;

   sql += `\n LIMIT ${rows} OFFSET (${paging} - 1) * ${rows};`;


  gv_data = await get_data(1, sql);
  const tbody = $('#resource_body');
  tbody.empty()
  gv_data.forEach((obj, index) => {
    let option = `
    <tr onclick="fn_resource_mod(${obj[0]})">
      <td class="center aligned">${obj[21]}</td>
      <td>${obj[1]}</td>
      <td>${obj[2]}</td>
      <td>${obj[3]}</td>
      <td>${obj[4]}</td>
      <td>${obj[5]}</td> 
      <td>${obj[6]}</td> 
      <td>${obj[7]}</td>
      <td>${obj[8]}</td>
      <td>${obj[9]}</td>
      <td>${obj[10]}</td>
      <td class="center aligned">${obj[11]}</td>
      <td class="center aligned">${obj[12]}</td>
      <td class="center aligned">${obj[13]}</td>
      <td class="center aligned">${obj[14]}</td>
      <td class="center aligned">${obj[15]}</td>
      <td class="center aligned no_pd"><button class="ui button teal no_mg" style="padding:8px 10px!important" onclick="jsa_match_on(${obj[0]})">Match</button></td>
      <td class="center aligned no_pd"><button class="ui button teal no_mg" style="padding:8px 10px!important" onclick="export_excel_on(${obj[0]})">Excel</button></td>`
      option += `</tr>`
    tbody.append(option)
  })
;
}

// // 스크롤 이동 시 이벤트
// $('#tbl_scroll').scroll(function() {
//   var container = $(this);
//   var scrollHeight = container.prop('scrollHeight');
//   var scrollTop = container.scrollTop();
//   var containerHeight = Math.ceil(container.innerHeight());

//   // 스크롤이 끝에 다다른 경우
//   if (scrollTop + containerHeight >= scrollHeight/1.2) {
//     if(paging < gv_data.length) {
//       // paging += rows
//       paging += 1;
//       fn_grid_resource(paging);
//     }
//   }else{
//     alert((scrollTop + containerHeight));
//     paging -= 1;
//   }
// });
/* ########## 메인화면 좌측 테이블 끝 ########## */

/* ########## 리소스 등록 화면 시작 ########## */
async function fn_resource_grid() {
  const ag = $('#account_grid'), ah = $('#account_header');
  ah.html('설비정보 등록')
  ag.empty();
  let option = `
  <form class="ui form" onsubmit="return false">
    <div class="two fields">
      <div class="field">
        <label>설비코드</label>
        <input type="text" id="i_eq_code" placeholder="설비코드 입력...">
      </div>
      <div class="field">
        <label>구분</label>
        <input type="text" id="i_gubun" placeholder="구 입력...">
      </div>
    </div>
    <div class="required field">
      <label>공장</label>
      <input type="text" id="i_fac_cd" placeholder="공장...">
    </div>
    <div class="required field">
      <label>설치장소</label>
      <input type="text" id="i_setup_place" placeholder="설치장소...">
    </div>
    <div class="three  fields">
      <div class="required field">
        <label>규격</label>
        <input type="text" id="i_spec" placeholder="규격 입력...">
      </div>
      <div class="required field">
        <label>모델</label>
        <input type="text" id="i_model" placeholder="모델 입력...">
      </div>
      <div class="required field">
        <label>메이커</label>
        <input type="text" id="i_maker" placeholder="메이커 입력...">
      </div>
    </div>
    <div class="three  fields">
      <div class="required field">
        <label>ip</label>
        <input type="text" id="i_ip_addr" placeholder="ip 입력...">
      </div>
      <div class="required field">
        <label>port</label>
        <input type="text" id="i_com_port" placeholder="port 입력...">
      </div>
      <div class="required field">
        <label>RGB</label>
        <input type="text" id="i_rgb" placeholder="RGB 입력...">
      </div>
    </div>
    <div class="required field">
      <label>특성</label>
      <input type="text" id="i_noti" placeholder="특성 입력...">
    </div>
    <div class="required field">
      <label>QR</label>
      <input type="text" id="i_qr_cd" placeholder="QR 입력...">
    </div>
    <div class="three  fields">
      <div class="required field">
        <label>예방조치일</label>
        <input id="pre_chk_dt" name="i_pre_chk_dt" type="date" placeholder="" value="`+dt+`">
      </div>    
      <div class="required field">
        <label>조치일</label>
        <input id="pre_chk_dt" name="i_effec_dt" type="date" placeholder="" value="`+dt+`">
      </div>
      <div class="required field">
        <label>사용구분(Y:사용,N:미사용, D:삭제)</label>
        <select id="i_flag">
          <option selected value="Y">Y</option>
          <option value="N">N</option>
          <option value="D">D</option>
        </select>
      </div>
    </div>
    <div class="required field">
      <label>등록자</label>
      <input type="text" id="i_fst_reg_user_id" placeholder="등록자 입력...">
    </div>
    <button id="account_insert_btn" class="ui brown button">등록</button>
    <button class="ui button" onclick="fn_resource_grid()">취소</button>
  </form>`;
  ag.html(option);
  
  $('#i_account_name').on('change', function() {
    let acc_idx = $(this).val();
    //$('#i_account_desc').html(acc_data[acc_idx][2]);
  })

  // INSERT 버튼 클릭 시
  $('#account_insert_btn').on('click', async function() {
    const i_eq_code          = $('#i_eq_code').val(),             // 설비코드
          i_gubun            = $('#i_gubun').val(),               // 구분
          i_fac_cd           = $('#i_fac_cd').val(),              // 공장
          i_setup_place      = $('#i_setup_place').val(),         // 설치장소 
          i_spec             = $('#i_spec').val(),                // 규격
          i_model            = $('#i_model').val(),               // 모델
          i_maker            = $('#i_maker').val(),               // 메이커
          i_ip_addr          = $('#i_ip_addr').val(),             // ip
          i_com_port         = $('#i_com_port').val(),            // port
          i_rgb              = $('#i_rgb').val(),                 // RGB
          i_noti             = $('#i_noti').val(),                // 특성
          i_qr_cd            = $('#i_qr_cd').val(),               // QR
          i_pre_chk_dt       = $('#i_pre_chk_dt').val(),          // 예방조치일
          i_effec_dt         = $('#i_effec_dt').val(),            // 조치일
          i_flag             = $('#i_flag').val(),                // 사용구분
          i_last_reg_user_id = $('#i_fst_reg_user_id').val();     // 등록자

    if(!i_eq_code) {
      alert('설비코드 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_gubun) {
      alert('구분 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_fac_cd) {
      alert('공장은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_setup_place) {
      alert('설치장소은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_spec) {
      alert('규격은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_model) {
      alert('모델은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_maker) {
      alert('메이커 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_ip_addr) {
      alert('IP은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_com_port) {
      alert('port은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_rgb) {
      alert('RGB은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_noti) {
      alert('공장은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_qr_cd) {
      alert('QR 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    // } else if (!i_pre_chk_dt) {
    //   alert('예방조치일 필수값입니다.');
    //   $('.required.field').removeClass('error');
    //   $('.required.field').addClass('error');
    //   return false;
    // } else if (!i_effec_dt) {
    //   alert('조치일 필수값입니다.');
    //   $('.required.field').removeClass('error');
    //   $('.required.field').addClass('error');
    //   return false;
    } else if (!i_flag) {
      alert('사용구분 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!i_fst_reg_user_id) {
      alert('등록자 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    }

    const sql = `
    INSERT INTO ITSM.PLANT_INFO (
              ID,
              EQ_CODE,
              GUBUN,
              SETUP_DT,
              FAC_CD,
              SETUP_PLACE,
              SPEC,
              MODEL,
              MAKER,
              IP_ADDR,
              COM_PORT,
              RGB,
              NOTI,
              QR_CD,
              PRE_CHK_DT,
              EFFEC_DT,
              FLAG,
              FST_REG_USER_ID,
              FST_REG_DTTM,
              LAST_REG_USER_ID,
              LAST_MOD_DTTM
           )
    VALUES (
           NEXTVAL('itsm.sq_itsm_plant_info_01')
         , '${i_eq_code}'
         , '${i_gubun}'
         , CURRENT_TIMESTAMP
         , '${i_fac_cd}'
         , '${i_setup_place}'
         , '${i_spec}'
         , '${i_model}'
         , '${i_maker}'
         , '${i_ip_addr}'
         , '${i_com_port}'
         , '${i_rgb}'
         , '${i_noti}'
         , '${i_qr_cd}'
         , CURRENT_TIMESTAMP
         , CURRENT_TIMESTAMP
         , '${i_flag}'
         ,  '${i_fst_reg_user_id}'
         , CURRENT_TIMESTAMP
         , '${i_fst_reg_user_id}'
         , CURRENT_TIMESTAMP
           )
    `
    const data = await get_data(1, sql);
    if (data instanceof Error) {
      console.error("에러 발생: " + data.message);
    } else {
      // 정상 결과 처리
      alert('등록 완료');
      await fn_grid_resource(0);
      await fn_resource_grid();
    }
  })
}
/* ########## 리소스 등록 화면 끝 ########## */

/* ########## 리소스 수정 화면 시작 ########## */
async function fn_resource_mod(e) {
  const ag = $('#account_grid'), ah = $('#account_header');
  ah.html('설비정보 수정');
  if(!e) {
    console.error('항목이 없습니다');
    return false;
  }
  const sql = `
    SELECT
      PI2.ID,
      PI2.EQ_CODE,
      PI2.GUBUN,
      TO_CHAR(PI2.SETUP_DT, 'YYYY-MM-DD'),
      PI2.FAC_CD,
      PI2.SETUP_PLACE,
      PI2.SPEC,
      PI2.MODEL, 
      PI2.MAKER,
      PI2.IP_ADDR,
      PI2.COM_PORT,
      PI2.RGB,
      PI2.NOTI,
      PI2.QR_CD,
      TO_CHAR(PI2.PRE_CHK_DT, 'YYYY-MM-DD'),
      TO_CHAR(PI2.EFFEC_DT, 'YYYY-MM-DD'),
      PI2.FLAG,
      PI2.FST_REG_USER_ID,
      TO_CHAR(PI2.FST_REG_DTTM, 'YYYY-MM-DD HH24:MI:SS'),
      PI2.LAST_REG_USER_ID,
      TO_CHAR(PI2.LAST_MOD_DTTM, 'YYYY-MM-DD HH24:MI:SS')
    FROM
      ITSM.PLANT_INFO PI2 
   WHERE PI2.ID = ${e}
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
        <label>설비코드</label>
        <input type="text" id="u_eq_code" value="${data[0][1]}">
      </div>
      <div class="field">
        <label>구분</label>
        <input type="text" id="u_gubun" value="${data[0][2]}">
      </div>
    </div>
    <div class="required field">
      <label>공장</label>
      <input type="text" id="u_fac_cd" value="${data[0][4]}">
    </div>
    <div class="required field">
      <label>설치장소</label>
      <input type="text" id="u_setup_place" value="${data[0][5]}">
    </div>
    <div class="three  fields">
      <div class="required field">
        <label>규격</label>
        <input type="text" id="u_spec" value="${data[0][6]}">
      </div>
      <div class="required field">
        <label>모델</label>
        <input type="text" id="u_model" placeholder="모델 입력..." value="${data[0][7]}">
      </div>
      <div class="required field">
        <label>메이커</label>
        <input type="text" id="u_maker" placeholder="메이커 입력..." value="${data[0][8]}">
      </div>
  </div>
  <div class="three  fields">
    <div class="required field">
      <label>ip</label>
      <input type="text" id="u_ip_addr" placeholder="ip 입력..." value="${data[0][9]}">
    </div>
    <div class="required field">
      <label>port</label>
      <input type="text" id="u_com_port" placeholder="port 입력..." value="${data[0][10]}">
    </div>
    <div class="required field">
      <label>RGB</label>
      <input type="text" id="u_rgb" placeholder="RGB 입력..." value="${data[0][11]}">
    </div>
  </div>
  <div class="required field">
    <label>특성</label>
    <input type="text" id="u_noti" placeholder="특성 입력..."  value="${data[0][12]}">
  </div>
  <div class="required field">
    <label>QR</label>
    <input type="text" id="u_qr_cd" placeholder="QR 입력..."   value="${data[0][13]}">
  </div>
  <div class="three  fields">
    <div class="required field">
      <label>예방조치일</label>
      <input id="u_pre_chk_dt" name="u_pre_chk_dt" type="date" placeholder="" value="${data[0][14]}">
    </div>    
    <div class="required field">
      <label>조치일</label>
      <input id="u_effec_dt" name="u_effec_dt" type="date" placeholder="" value="${data[0][15]}">
    </div>
      <div class="required field">
        <label>사용구분 (Y:사용, N:미사용, D:삭제)</label>
        <select id="u_flag">`
        let u_y = "", u_n = "", u_d = "";
        switch(data[0][7]) {
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
        <div class="ui visible message no_mg" style="padding:9.5px 14px"><p>${data[0][17]}</p></div>
      </div>
      <div class="field">
        <label>등록일시</label>
        <div class="ui visible message no_mg" style="padding:9.5px 14px"><p>${data[0][18]}</p></div>
      </div>
    </div>
    <div class="two fields">
      <div class="required field">
        <label>수정자</label>
        <input type="text" id="u_last_reg_user_id" value="${data[0][19]}">
      </div>
      <div class="field">
        <label>수정일시</label>
        <div class="ui visible message no_mg" style="padding:9.5px 14px"><p>${data[0][20]}</p></div>
      </div>
    </div>
    <button id="account_update_btn" class="ui brown button">수정</button>
    <button class="ui button" onclick="fn_resource_grid()">취소</button>
  </form>`;

  ag.html(option);

  // 업데이트 버튼 클릭 시
  $('#account_update_btn').on('click', async function() {
    const u_eq_code          = $('#u_eq_code').val(),             // 설비코드
          u_gubun            = $('#u_gubun').val(),               // 구분
          u_fac_cd           = $('#u_fac_cd').val(),              // 공장
          u_setup_place      = $('#u_setup_place').val(),         // 설치장소 
          u_spec             = $('#u_spec').val(),                // 규격
          u_model            = $('#u_model').val(),               // 모델
          u_maker            = $('#u_maker').val(),               // 메이커
          u_ip_addr          = $('#u_ip_addr').val(),             // ip
          u_com_port         = $('#u_com_port').val(),            // port
          u_rgb              = $('#u_rgb').val(),                 // RGB
          u_noti             = $('#u_noti').val(),                // 특성
          u_qr_cd            = $('#u_qr_cd').val(),               // QR
          u_pre_chk_dt       = $('#u_pre_chk_dt').val(),          // 예방조치일
          u_effec_dt         = $('#u_effec_dt').val(),            // 조치일
          u_flag             = $('#u_flag').val(),                // 사용구분
          u_last_reg_user_id = $('#u_last_reg_user_id').val();    // 수정자

    if(!u_eq_code) {
      alert('설비코드 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_gubun) {
      alert('구분 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_fac_cd) {
      alert('공장은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_setup_place) {
      alert('설치장소은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_spec) {
      alert('규격은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_model) {
      alert('모델은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_maker) {
      alert('메이커 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_ip_addr) {
      alert('IP은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_com_port) {
      alert('port은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_rgb) {
      alert('RGB은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_noti) {
      alert('공장은 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_qr_cd) {
      alert('QR 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_pre_chk_dt) {
      alert('예방조치일 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_effec_dt) {
      alert('조치일 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_flag) {
      alert('사용구분 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    } else if (!u_last_reg_user_id) {
      alert('수정자 필수값입니다.');
      $('.required.field').removeClass('error');
      $('.required.field').addClass('error');
      return false;
    }


    const r_upd_sql = `
    UPDATE ITSM.PLANT_INFO
       SET 	EQ_CODE          = '${u_eq_code}',
            GUBUN            = '${u_gubun}',           
            FAC_CD           = '${u_fac_cd}',          
            SETUP_PLACE      = '${u_setup_place}',     
            SPEC             = '${u_spec}',            
            MODEL            = '${u_model}',           
            MAKER            = '${u_maker}',           
            IP_ADDR          = '${u_ip_addr}',         
            COM_PORT         = '${u_com_port}',        
            RGB              = '${u_rgb}',             
            NOTI             = '${u_noti}',            
            QR_CD            = '${u_qr_cd}',           
            PRE_CHK_DT       = '${u_pre_chk_dt}',      
            EFFEC_DT         = '${u_effec_dt}',        
            FLAG             = '${u_flag}',            
            LAST_REG_USER_ID = '${u_last_reg_user_id}',
            LAST_MOD_DTTM    = CURRENT_TIMESTAMP
     WHERE ID = ${data[0][0]}
    `
    const r_upd_data = await get_data(1, r_upd_sql);
    if (r_upd_data instanceof Error) {
      console.error("에러 발생: " + r_upd_data.message);
    } else {
      // 정상 결과 처리
      alert('수정 완료');
      await fn_grid_resource(0);
      await fn_resource_grid();
    }
  })
}
/* ########## 리소스 수정 화면 끝 ########## */

/* ########## Match 테이블 조회 함수 끝   ########## */
async function jsa_match_on(plan_id) {
  
  let mtitle = "설비코드 & Match JSA Match";  
  $('#m_org_nm').val("p_org_nm");
  $('#modal_sns_arn').html(mtitle); // 모달 헤더 추가
  $('#modal_table').html(`
  <div class="ui basic segment no_mg no_pd h_100" style="overflow:auto">
    <table class="ui head stuck celled table selectable" style="table-layout: fixed; width:calc(100% - 2px)">
      <thead>
        <tr>
          <th class="center aligned" style="white-space: nowrap; overflow: hidden; width: 25px;">체크</th>
          <th class="left aligned" style="white-space: nowrap; overflow: hidden; width: 100px;">JSA Code</th>
          <th class="left aligned" style="white-space: nowrap; overflow: hidden; width: 250px;">작업 단계</th>
          <th class="center aligned" style="white-space: nowrap; overflow: hidden; width: 100px;">매칭일자</th>
        </tr>
      </thead>
      <tbody id="modal_tbody">
      </tbody>
    </table>
  </div>
  `);

  let modal_user_sql = `
      select jr.id
              ,jr.jsa_code
              ,jr.work_step
              ,to_CHAR(pmj.fst_reg_dttm, 'YYYY-MM-DD') as fst_reg_dttm        
      from  risk_mgr_info jr left join plant_match_jsa pmj on jr.id = pmj.jsa_id and pmj.plant_id  = '${plan_id}'
      ORDER BY jr.jsa_code, pmj.seq
  `;
  const modal_user_data = await get_data(1, modal_user_sql);
  if(modal_user_data instanceof Error){console.error("에러 발생: " + modal_user_data.message);return};

  let users = []; // 유저 체크
  let mt = $('#modal_tbody');
  mt.empty();

  modal_user_data.forEach(function(obj) {
    let checked = '';
    if (obj[3]) {
      checked = 'checked';
      users.push(obj[0]);
    }
    mt.append(`
        <tr>
          <td class="center aligned" style="white-space: nowrap; overflow: hidden"><div class="ui checkbox" data-value="${obj[0]}"><input type="checkbox" ${checked} class="user_check"><label>체크</label></div></td>
          <td class="center aligned" style="white-space: nowrap; overflow: hidden">${obj[1]}</td>
          <td class="center aligned" style="white-space: nowrap; overflow: hidden">${obj[2]}</td>      
          <td class="center aligned" style="white-space: nowrap; overflow: hidden">${obj[3]}</td>
        </tr>
        `);
  });

  $('.ui.match.modal')
    .modal({
      closable  : false,
      onDeny    : function(){
        return;
      },
      onApprove :  function() {
        fn_call_modal(plan_id, 'pmu', 'msl');
      }
    })
    .modal('show')
  ;

  async function fn_call_modal(plan_id, pmu, msl) {
    await fn_update_match(plan_id, pmu, msl);
    await fn_grid_main();
  }

  async function fn_update_match(plan_id, pmu, msl) {

    // 체크 된 사용자를 루핑돌며 UPSERT
    if(users.length > 0) {
      users.forEach(async function(obj) {
      let sql = ` UPDATE ITSM.PLANT_MATCH_JSA
            SET STATS_CD ='C' 
               , LAST_REG_USER_ID = '${__user.login}'
               , LAST_MOD_DTTM    = CURRENT_TIMESTAMP
          WHERE PLANT_ID ='${plan_id}' AND JSA_ID = '${obj}'
          RETURNING *
        `;
      let mod_status_data = await get_data(1, sql);

      if(mod_status_data instanceof Error){console.error("에러 발생: " + mod_status_data.message);return};

      // update 후 값이 있으면 skip 
      if (mod_status_data.length <= 0 )
      {
        sql = `
          INSERT 	into ITSM.PLANT_MATCH_JSA (
              ID,
              EQ_CODE,
              PLANT_ID,
              SEQ,
              JSA_ID,
              JSA_CODE,
              STATS_CD,
              FST_REG_USER_ID,
              FST_REG_DTTM,
              LAST_REG_USER_ID,
              LAST_MOD_DTTM)
          VALUES (
                  nextval('sq_itsm_plant_match_jsa_01')
                  , (select eq_code from plant_info where id = '${plan_id}')
                  , '${plan_id}'
                  , COALESCE((SELECT MAX(SEQ) FROM ITSM.PLANT_MATCH_JSA WHERE PLANT_ID = ${plan_id}), 0) + 1
                  , '${obj}'
                  , (select jsa_code from risk_mgr_info where id = '${obj}')
                  , 'C'
                  , '${__user.login}'
                  , CURRENT_TIMESTAMP
                  , '${__user.login}'
                  , CURRENT_TIMESTAMP
                  )
            `;        
        mod_status_data = await get_data(1, sql);
        if(mod_status_data instanceof Error){console.error("에러 발생: " + mod_status_data.message);return};
      }
    });

    } // users.length 체크 된 사용자를 루핑돌며 UPSERT
  } // end func fn_update_match

  /* ##### 체크 박스 핸들러 ##### */
  // 체크박스 상태 변경 시 이벤트 핸들러
  $('.user_check').change(function() {
    var value = $(this).closest('.checkbox').data('value');

    if ($(this).is(':checked')) {
      // 체크된 경우 배열에 추가
      users.push(value);
    } else {
      // 체크가 해제된 경우 배열에서 제거
      users = users.filter(function(item) {
        return item !== value;
      });
    }
  });
  /* ##### 체크 박스 핸들러 ##### */
} // end async function jsa_match_on
/* ########## Match 테이블 조회 함수 끝   ########## */
/* ########## export 테이블 조회 함수 시작   ########## */
async function export_excel_on(plan_id) {

  let mtitle = "설비코드 & Match JSA Match";  
  
  let mtbl = $('#modal_table');
  mtbl.empty();

  let excel_user_sql = `
				SELECT PMJ.ID
					,PMJ.SEQ
					, PI2.ID
					, PI2.EQ_CODE 
					, PI2.ID
					, PI2.FAC_CD
					, PI2.SETUP_PLACE
					, PI2.SPEC
					, PI2.MODEL
					, PI2.MAKER
					, PI2.IP_ADDR 
					, PI2.COM_PORT
					, PI2.RGB
					, RMI.JSA_CODE
					, RMI.WORK_STEP
					, RMI.WORK_TYPE
					, RMI.RISK
					, RMI.RISK_CAUSE
					, RMI.RISK_PREPARE
					, RMI.FREQUENCY 
					, RMI.STRENGTH 
					, RMI.RISK_DEGREE 
					, RMI.GRADE
          , TO_CHAR(current_timestamp, 'YYYY-MM-DD HH24:mi:SS') cur_dt
				FROM PLANT_MATCH_JSA PMJ LEFT JOIN RISK_MGR_INFO RMI ON PMJ.JSA_CODE = RMI.JSA_CODE ,
					PLANT_INFO PI2
				WHERE PMJ.PLANT_ID = '${plan_id}'
					AND PMJ.PLANT_ID  = PI2.ID 
          AND PMJ.JSA_CODE LIKE 'A%'
				ORDER BY RMI.jsa_code, pmj.seq  `;
  const excel_user_data = await get_data(1, excel_user_sql);
  if(excel_user_data instanceof Error){console.error("에러 발생: " + excel_user_data.message);return};

  let mtbltmp ='';
  mtbltmp += `
  <div class="ui basic segment no_mg no_pd h_100" style="overflow:auto">
    <table id="tableData" class="ui selectable celled compact single line striped unstackable structured head stuck table tbl_font">
    <thead>
        <!-- 1 row 22 col-->
        <tr>
            <th class="center aligned">JSA(Job Safety Analysis 작업분석) _ 수시위험성평가</th>
            <th class="center aligned" >&nbsp;</th>  <!-  1-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="center aligned" >&nbsp;</th>  <!-  4--> 
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9--> 
            <th class="center aligned" >&nbsp;</th>  <!- 10--> 
            <th class="center aligned" >&nbsp;</th>  <!- 11--> 
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned" >&nbsp;</th>  <!- 13--> 
            <th class="center aligned" >&nbsp;</th>  <!- 14--> 
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >&nbsp;</th>  <!- 17--> 
            <th class="center aligned" >&nbsp;</th>  <!- 18--> 
            <th class="center aligned" >&nbsp;</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
        </tr>
        <!-- 2 row 22 col-->
        <tr>
            <th class="center aligned" >&nbsp;</th>  <!-  1-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="center aligned" >&nbsp;</th>  <!-  4--> 
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9--> 
            <th class="center aligned" >WO 번호</th> <!-- wo 번호 10 -->
            <th class="center aligned" >&nbsp;</th>  <!- 11--> 
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned">현장명</th> <!-- 현장명--><!-- 13 -->
            <th class="center aligned" >&nbsp;</th>  <!- 14--> 
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >&nbsp;</th>  <!- 17--> 
            <th class="center aligned" >&nbsp;</th>  <!- 18--> 
            <th class="center aligned" >&nbsp;</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
            <th class="center aligned" >&nbsp;</th>  <!- 22--> 
        </tr>
        <!-- 3 row -->
        <tr>
            <th class="center aligned" >작업명</th> <!--작업명-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="center aligned" >&nbsp;</th>  <!-  4 Title --> 
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9--> 
            <td class="center aligned" >작업구분</td> <!--작업구분 10-->
            <th class="center aligned" > □ 일반작업   □ 위험작업</th> <!--11-->
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned">작성자</th> <!--작성자 13-->
            <th class="center aligned" >${__user.name}</th> <!--14-->
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >작성일자</th> <!--작성일자-->
            <th class="center aligned" >&nbsp;</th>  <!- 18--> 
            <th class="center aligned" >${excel_user_data[0][23]}</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
            <th class="center aligned" >&nbsp;</th>  <!- 22--> 
        </tr>
        <!-- 4 row -->
        <tr>
            <th class="center aligned" >&nbsp;</th>  <!-  1-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="center aligned" >&nbsp;</th>  <!-  4--> 
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9--> 
            <th class="center aligned" >&nbsp;</th>  <!- 10--> 
            <th class="center aligned" >&nbsp;</th>  <!- 11--> 
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned">확인자</th> <!--확인자 13 -->
            <th class="center aligned" >${__user.name}</th> <!--14-->
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >확인일자</th> <!--확인일자-->
            <th class="center aligned" >&nbsp;</th>  <!- 18--> 
            <th class="center aligned" >${excel_user_data[0][23]}</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
            <th class="center aligned" >&nbsp;</th>  <!- 22--> 
        </tr>
        <!-- 5 row -->
        <tr>
            <th class="center aligned" >회사명</th> <!--회사명-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="center aligned" >&nbsp;</th>  <!-  4 Title --> 
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9-->
            <th class="center aligned" >&nbsp;</th>  <!- 10--> 
            <th class="center aligned" >&nbsp;</th>  <!- 11--> 
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned">검토자</th> <!--검토자 13-->
            <th class="center aligned" >${__user.name}</th> <!--14-->
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >검토일자</th> <!--확인일자-->
            <th class="center aligned" >&nbsp;</th>  <!- 18--> 
            <th class="center aligned" >&nbsp;</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
            <th class="center aligned" >&nbsp;</th>  <!- 22--> 
        </tr>
        <!-- 6 row -->
        <tr>
            <th class="center aligned" >필요 보호구</th> <!--필요 보호구-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="center aligned" >&nbsp;</th>  <!-  4 Title --> 
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9-->
            <th class="center aligned" >&nbsp;</th>  <!- 10--> 
            <th class="center aligned" >&nbsp;</th>  <!- 11--> 
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned" >승인자</th> <!--승인자 13-->
            <th class="center aligned" >${__user.name}</th> <!--14-->
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >승인일자</th> <!--확인일자-->
            <th class="center aligned" >&nbsp;</th>  <!- 18--> 
            <th class="center aligned" >&nbsp;</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
            <th class="center aligned" >&nbsp;</th>  <!- 22--> 
        </tr>
        <!-- 7 row -->
        <tr>
            <th class="center aligned" colspan="3">필요 장비/공구</th> <!--필요 장비/공구-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="center aligned" >&nbsp;</th>  <!-  4 Title --> 
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9-->
            <th class="center aligned" >&nbsp;</th>  <!- 10--> 
            <th class="center aligned" >&nbsp;</th>  <!- 11--> 
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned" >&nbsp;</th>  <!- 13--> 
            <th class="center aligned" >&nbsp;</th>  <!- 14--> 
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >투입인원</th> <!--투입인원 17-->
            <th class="center aligned" >&nbsp; 명</th>  <!- 18--> 
            <th class="center aligned" >&nbsp;</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
            <th class="center aligned" >&nbsp;</th>  <!- 22--> 
        </tr>
        <!-- 8 row -->
        <tr>
            <th class="center aligned" >핵심유해위험</th> <!--핵심유해위험-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="left aligned">&nbsp;□가동설비접근&nbsp;□추락위험&nbsp;□밀폐공간&nbsp;□전기작업&nbsp;□중량물취급&nbsp;□A형사다리&nbsp;□이동기기구역&nbsp;□고온고열&nbsp;□전동기기취급&nbsp;□용접작업&nbsp;□고소작업차&nbsp;□전기실출입</th>
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9-->
            <th class="center aligned" >&nbsp;</th>  <!- 10--> 
            <th class="center aligned" >&nbsp;</th>  <!- 11--> 
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned" >&nbsp;</th>  <!- 13--> 
            <th class="center aligned" >&nbsp;</th>  <!- 14--> 
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >&nbsp;</th>  <!--17-->
            <th class="center aligned" >&nbsp;</th>  <!- 18--> 
            <th class="center aligned" >&nbsp;</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
            <th class="center aligned" >&nbsp;</th>  <!- 22--> 
        </tr>
        <!-- 9 row space -->
        <tr>
            <th class="center aligned" >&nbsp;</th>  <!-  1-->
            <th class="center aligned" >&nbsp;</th>  <!-  2--> 
            <th class="center aligned" >&nbsp;</th>  <!-  3--> 
            <th class="center aligned" >&nbsp;</th>  <!-  4--> 
            <th class="center aligned" >&nbsp;</th>  <!-  5--> 
            <th class="center aligned" >&nbsp;</th>  <!-  6--> 
            <th class="center aligned" >&nbsp;</th>  <!-  7--> 
            <th class="center aligned" >&nbsp;</th>  <!-  8--> 
            <th class="center aligned" >&nbsp;</th>  <!-  9--> 
            <th class="center aligned" >&nbsp;</th>  <!- 10--> 
            <th class="center aligned" >&nbsp;</th>  <!- 11--> 
            <th class="center aligned" >&nbsp;</th>  <!- 12--> 
            <th class="center aligned" >&nbsp;</th>  <!- 13--> 
            <th class="center aligned" >&nbsp;</th>  <!- 14--> 
            <th class="center aligned" >&nbsp;</th>  <!- 15--> 
            <th class="center aligned" >&nbsp;</th>  <!- 16--> 
            <th class="center aligned" >&nbsp;</th>  <!- 17--> 
            <th class="center aligned" >&nbsp;</th>  <!- 18--> 
            <th class="center aligned" >&nbsp;</th>  <!- 19--> 
            <th class="center aligned" >&nbsp;</th>  <!- 20--> 
            <th class="center aligned" >&nbsp;</th>  <!- 21--> 
            <th class="center aligned" >&nbsp;</th>  <!- 22--> 
        </tr>
    </thead>
    `;
    
    mtbltmp += `
    <tbody id="resource_body">
        <!-- 10-->
        <tr>
            <td class="center aligned" >순번</td>                   <!-  1-->
            <td class="center aligned" >작업단계 <br>(Steps)</td>   <!-  2--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  3--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  4--> 

            <td class="center aligned" >유해위험요인 (Hazards)</td>  <!-  5--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  6--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  7--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  8--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  9--> 

            <td class="center aligned" >대책 <br>(Controls)</td>    <!- 10--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 11--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 12--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 13--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 14--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 15--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 16--> 

            <td class="center aligned" >위험성평가 (Controls)</td>   <!- 17--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 18--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 19--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 20--> 
            <td class="center aligned" >조치자</td>                 <!- 21--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 22--> 
        </tr>
        <tr>
            <td class="center aligned" >&nbsp;</td>                 <!-  1-->
            <td class="center aligned" >&nbsp;</td>                 <!-  2--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  3--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  4--> 

            <td class="center aligned" >&nbsp;</td>                 <!-  5--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  6--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  7--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  8--> 
            <td class="center aligned" >&nbsp;</td>                 <!-  9--> 

            <td class="center aligned" >&nbsp;</td>                 <!- 10--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 11--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 12--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 13--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 14--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 15--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 16--> 
            <td class="center aligned">빈도</td>   <!--빈도 -->
            <td class="center aligned">강도</td>   <!--강도 -->
            <td class="center aligned">위험도</td> <!--위험도 -->
            <td class="center aligned">등급</td>   <!--등급 -->
            <td class="center aligned" >&nbsp;</td>                 <!- 21--> 
            <td class="center aligned" >&nbsp;</td>                 <!- 22--> 
        </tr>
      `;
      let flaged = 'N';
      excel_user_data.forEach(function(obj) 
      {
        
        // 준비단계 :6 
        mtbltmp +=`
        <tr>
            <td class="center aligned" >1 </td>
            <td class="center middle"  >준비단계</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" > ${obj[17]}</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >${obj[18]}</td>            
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned">${obj[19]}</td>
            <td class="center aligned">${obj[20]}</td>
            <td class="center aligned">${obj[21]}</td>
            <td class="center aligned">${obj[22]}</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
          </tr>
          `;
        flaged = "Y";
      });

      let _size = excel_user_data.length;
      let loop_cnt = 6 - _size;
      for (var i=0; i<loop_cnt; i++)
      {
        mtbltmp +=`
        <tr>
            <td class="center aligned" >&nbsp;</td>
            <td class="center middle"  >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>            
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
          </tr>
          `;
        flaged ="Y";
      }

      flaged = '';
    //   mtbltmp +=`
    //       <!-- 작업실시 :9 -->
    //       <tr>
    //           <td class="center aligned" rowspan="9">2 </td> <!--순번-->
    //           <td class="center aligned" rowspan="9" colspan="3" >작업실시</td>   <!--작업실시 -->
    //     `;
      let excel_user_sql_p2 = `
            SELECT PMJ.ID
              ,PMJ.SEQ
              , PI2.ID
              , PI2.EQ_CODE 
              , PI2.ID
              , PI2.FAC_CD
              , PI2.SETUP_PLACE
              , PI2.SPEC
              , PI2.MODEL
              , PI2.MAKER
              , PI2.IP_ADDR 
              , PI2.COM_PORT
              , PI2.RGB
              , RMI.JSA_CODE
              , RMI.WORK_STEP
              , RMI.WORK_TYPE
              , RMI.RISK
              , RMI.RISK_CAUSE
              , RMI.RISK_PREPARE
              , RMI.FREQUENCY 
              , RMI.STRENGTH 
              , RMI.RISK_DEGREE 
              , RMI.GRADE
            FROM PLANT_MATCH_JSA PMJ LEFT JOIN RISK_MGR_INFO RMI ON PMJ.JSA_CODE = RMI.JSA_CODE ,
              PLANT_INFO PI2
            WHERE PMJ.PLANT_ID = '${plan_id}'
              AND PMJ.PLANT_ID  = PI2.ID 
              AND PMJ.JSA_CODE LIKE 'B%'
            ORDER BY RMI.jsa_code, pmj.seq  `;
      const excel_user_data_p2 = await get_data(1, excel_user_sql_p2);
      if(excel_user_data_p2 instanceof Error){console.error("에러 발생: " + excel_user_data_p2.message);return};

      excel_user_data_p2.forEach(function(obj) 
      {
//         if (flaged) {mtbltmp +=`<tr>`};
        
// //
//           <tr>
//               <td class="center aligned" rowspan="9">2 </td> <!--순번-->
//               <td class="center aligned" rowspan="9" colspan="3" >작업실시</td>   <!--작업실시 -->

// //        
        // 작업실시 : 9 
        mtbltmp +=`
          <tr>
            <td class="center aligned" >2 </td>
            <td class="center middle"  >작업실시</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" > ${obj[17]}</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >${obj[18]}</td>            
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned">${obj[19]}</td>
            <td class="center aligned">${obj[20]}</td>
            <td class="center aligned">${obj[21]}</td>
            <td class="center aligned">${obj[22]}</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
          </tr>
          `;
        flaged = "Y";
      });
      // 작업실시 : 9 
      _size = excel_user_data_p2.length;
      loop_cnt = 9 - _size;
      for (var i=0; i<loop_cnt; i++)
      {
        // if ( flaged ) mtbltmp +=` <tr>`
        mtbltmp +=`
          <tr>
            <td class="center aligned" >&nbsp;</td>
            <td class="center middle"  >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>            
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
           </tr>
          `;
          flaged ="Y";
      }

      flaged = '';
    //   mtbltmp +=`
    //       <!-- 작업실시 :9 -->
    //       <tr>
    //           <td class="center aligned" rowspan="3">3 </td> <!--순번-->
    //           <td class="center aligned" colspan="3" rowspan="3">작업종료</td>   <!--작업실시 -->
    //     `;
      let excel_user_sql_p3 = `
            SELECT PMJ.ID
              ,PMJ.SEQ
              , PI2.ID
              , PI2.EQ_CODE 
              , PI2.ID
              , PI2.FAC_CD
              , PI2.SETUP_PLACE
              , PI2.SPEC
              , PI2.MODEL
              , PI2.MAKER
              , PI2.IP_ADDR 
              , PI2.COM_PORT
              , PI2.RGB
              , RMI.JSA_CODE
              , RMI.WORK_STEP
              , RMI.WORK_TYPE
              , RMI.RISK
              , RMI.RISK_CAUSE
              , RMI.RISK_PREPARE
              , RMI.FREQUENCY 
              , RMI.STRENGTH 
              , RMI.RISK_DEGREE 
              , RMI.GRADE
            FROM PLANT_MATCH_JSA PMJ LEFT JOIN RISK_MGR_INFO RMI ON PMJ.JSA_CODE = RMI.JSA_CODE ,
              PLANT_INFO PI2
            WHERE PMJ.PLANT_ID = '${plan_id}'
              AND PMJ.PLANT_ID  = PI2.ID 
              AND PMJ.JSA_CODE LIKE 'C%'
            ORDER BY RMI.jsa_code, pmj.seq  `;
      const excel_user_data_p3 = await get_data(1, excel_user_sql_p3);
      if(excel_user_data_p3 instanceof Error){console.error("에러 발생: " + excel_user_data_p3.message);return};

      excel_user_data_p3.forEach(function(obj) 
      {
        // 작업종료 : 3 
        mtbltmp +=`
          <tr>
            <td class="center aligned" >3 </td>
            <td class="center middle"  >작업종료</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" > ${obj[17]}</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >${obj[18]}</td>            
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned">${obj[19]}</td>
            <td class="center aligned">${obj[20]}</td>
            <td class="center aligned">${obj[21]}</td>
            <td class="center aligned">${obj[22]}</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
          </tr>
          `;
        flaged = "Y";
      });
      // 작업종료 : 3 
      _size = excel_user_data_p3.length;
      loop_cnt = 3 - _size;
      for (var i=0; i<loop_cnt; i++)
      {
        mtbltmp +=`
          <tr>
            <td class="center aligned" >&nbsp;</td>
            <td class="center middle"  >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>            
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>     
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
            <td class="center aligned" >&nbsp;</td>
           </tr>
          `;
          flaged ="Y";
      }
    mtbltmp +=`
        <!-- 서명 :3 -->
        <tr>
            <td class="center aligned" >서명 </td> <!--순번-->
            <td class="center aligned" >&nbsp;</td>  <!-  2--> 
            <td class="center aligned" >&nbsp;</td>  <!-  3--> 
            <td class="center aligned" >&nbsp;</td>  <!-  4--> 
            <td class="center aligned" >&nbsp;</td>  <!-  5--> 
            <td class="center aligned" >&nbsp;</td>  <!-  6--> 
            <td class="center aligned" >&nbsp;</td>  <!-  7--> 
            <td class="center aligned" >&nbsp;</td>  <!-  8--> 
            <td class="center aligned" >&nbsp;</td>  <!-  9--> 
            <td class="center aligned" >&nbsp;</td>  <!- 10--> 
            <td class="center aligned" >&nbsp;</td>  <!- 11--> 
            <td class="center aligned" >&nbsp;</td>  <!- 12--> 
            <td class="center aligned" >&nbsp;</td>  <!- 13--> 
            <td class="center aligned" >&nbsp;</td>  <!- 14--> 
            <td class="center aligned" >&nbsp;</td>  <!- 15--> 
            <td class="center aligned" >&nbsp;</td>  <!- 16--> 
            <td class="center aligned" >&nbsp;</td>  <!- 17--> 
            <td class="center aligned" >&nbsp;</td>  <!- 18--> 
            <td class="center aligned" >&nbsp;</td>  <!- 19--> 
            <td class="center aligned" >&nbsp;<div><img src="data:image/png;base64,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" style="width: 100"/></div> &nbsp;</td>   <!--작업실시 -->
            <td class="center aligned" >&nbsp;</td>  <!- 21--> 
            <td class="center aligned" >&nbsp;</td>  <!- 22-->             
        </tr>
        <!--  row space -->
        <tr>
            <td class="center aligned" >&nbsp;</td>  <!-  1-->
            <td class="center aligned" >&nbsp;</td>  <!-  2--> 
            <td class="center aligned" >&nbsp;</td>  <!-  3--> 
            <td class="center aligned" >&nbsp;</td>  <!-  4--> 
            <td class="center aligned" >&nbsp;</td>  <!-  5--> 
            <td class="center aligned" >&nbsp;</td>  <!-  6--> 
            <td class="center aligned" >&nbsp;</td>  <!-  7--> 
            <td class="center aligned" >&nbsp;</td>  <!-  8--> 
            <td class="center aligned" >&nbsp;</td>  <!-  9--> 
            <td class="center aligned" >&nbsp;</td>  <!- 10--> 
            <td class="center aligned" >&nbsp;</td>  <!- 11--> 
            <td class="center aligned" >&nbsp;</td>  <!- 12--> 
            <td class="center aligned" >&nbsp;</td>  <!- 13--> 
            <td class="center aligned" >&nbsp;</td>  <!- 14--> 
            <td class="center aligned" >&nbsp;</td>  <!- 15--> 
            <td class="center aligned" >&nbsp;</td>  <!- 16--> 
            <td class="center aligned" >&nbsp;</td>  <!- 17--> 
            <td class="center aligned" >&nbsp;</td>  <!- 18--> 
            <td class="center aligned" >&nbsp;</td>  <!- 19--> 
            <td class="center aligned" >&nbsp;</td>  <!- 20--> 
            <td class="center aligned" >&nbsp;</td>  <!- 21--> 
            <td class="center aligned" >&nbsp;</td>  <!- 22--> 
        </tr>
    </tbody>
    </table>
  </div>
  `;
  mtbl.append(mtbltmp);
  exportExcel("tableData", "print1", "excel_data.xlsx");

}
/* ########## export 테이블 조회 함수 끝   ########## */
</script>
