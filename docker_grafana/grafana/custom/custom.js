function side_redraw(user) {
  var side_txt = `
  <div id="side_01" class="sidemenu-item dropdown">
    <a class="sidemenu-link" href="#">
      <span class="icon-circle sidemenu-icon">
        <div class="css-1vzus6i-Icon">
          <i class="paper plane icon" style="visibility: visible;"></i>
        </div>
      </span>
    </a>
    <ul class="dropdown-menu dropdown-menu--sidemenu" role="menu">
      <li class="side-menu-header">
        <a class="side-menu-header-link" href="#">
          <span class="sidemenu-item-text">CLARM</span>
        </a>
      </li>
      <li class="">
        <a href="/d/o8cFNf4Ik/main?orgId=1">
          <i class="chartline icon" style="visibility: visible;"></i>CLARM 메인
        </a>
      </li>
      <li class="">
        <a href="/d/vGcLd1vSk/msg-user-mapping?orgId=1">
          <i class="compress arrows alternate icon" style="visibility: visible;"></i>SNS ARN - USER 매핑
        </a>
      </li>
      <li class="">
        <a href="/d/19uyx8vSz/oncall-history?orgId=1&from=now-3h&to=now">
          <i class="history icon" style="visibility: visible;"></i>ONCALL HISTORY
        </a>
      </li>
      <li class="">
        <a href="/d/XGDMMfVSz/account-registration?orgId=1">
          <i class="address card icon" style="visibility: visible;"></i>계정 관리
        </a>
      </li>
      <li class="">
        <a href="/d/imGE13NIk/resource-registration?orgId=1">
          <i class="server icon" style="visibility: visible;"></i>리소스 관리
        </a>
      </li>
      <li class="">
        <a href="/d/wS4OnBVSk/code-registration?orgId=1">
          <i class="file code icon" style="visibility: visible;"></i>코드 관리
        </a>
      </li>
      <li class="">
        <a href="/d/YrkZxhDIk/user-registration?orgId=1">
          <i class="user icon" style="visibility: visible;"></i>유저 관리
        </a>
      </li>
    </ul>
  </div>
  <div id="side_02" class="sidemenu-item dropdown">
    <a class="sidemenu-link" href="#">
      <span class="icon-circle sidemenu-icon">
        <div class="css-1vzus6i-Icon">
          <i class="credit card icon" style="visibility: visible;"></i>
        </div>
      </span>
    </a>
    <ul class="dropdown-menu dropdown-menu--sidemenu" role="menu">
      <li class="side-menu-header">
        <a class="side-menu-header-link" href="#">
          <span class="sidemenu-item-text">CBILL</span>
        </a>
      </li>
      <li class="">
        <a href="/d/RdSi_T84z/biyonggwanri?orgId=1">
          <i class="chart bar icon" style="visibility: visible;"></i>CBILL Main
        </a>
      </li>
    </ul>
  </div>
  <div id="side_03" class="sidemenu-item dropdown">
    <a class="sidemenu-link" href="#">
      <span class="icon-circle sidemenu-icon">
        <div class="css-1vzus6i-Icon">
          <i class="cloud icon" style="visibility: visible;"></i>
        </div>
      </span>
    </a>
    <ul class="dropdown-menu dropdown-menu--sidemenu" role="menu">
      <li class="side-menu-header">
        <a class="side-menu-header-link" href="#">
          <span class="sidemenu-item-text">Cloud Part 업무 관리</span>
        </a>
      </li>
      <li class="">
        <a href="/d/ftjrWFw4k/excel-upload?orgId=1">
          <i class="file excel icon" style="visibility: visible;"></i>Excel Upload
        </a>
      </li>
    </ul>
  </div>
  `
  if (user==='admin'&&$('#side_01').length===0) {
    $('.sidemenu__top').append(side_txt)
  }
  else if ($('#side_01').length===0) {
    $('.sidemenu__top > div').html('')
    $('.sidemenu__top').append(side_txt)
  }
}


function sleep(ms){return new Promise((r) => setTimeout(r, ms))}
function nvl(e){if (!e){return 0}else{return e}}
async function fn_get_grafana(t){try{let a={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({from:"$__from()",to:"$__to()",queries:[{refId:"A",intervalMs:6e4,maxDataPoints:647,datasourceId:1,rawSql:t,format:"table"}]})},r=await fetch("/api/tsdb/query",a),e=await r.json();return 200==r.status?e.results.A.tables[0]:console.log(e.results.A.error);e.results.A.error}catch(s){return s}}
async function get_cdms_data(t){try{let a={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({from:"$__from()",to:"$__to()",queries:[{refId:"A",intervalMs:6e4,maxDataPoints:647,datasourceId:2,rawSql:t,format:"table"}]})},r=await fetch("/api/tsdb/query",a),e=await r.json();return 200==r.status?e.results.A.tables[0]:console.log(e.results.A.error);e.results.A.error}catch(s){return s}}
async function get_data(t,e){let a={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({from:"$__from()",to:"$__to()",queries:[{refId:"A",intervalMs:6e4,maxDataPoints:647,datasourceId:t,rawSql:e,format:"table"}]})};try{let s=await fetch("/api/tsdb/query",a),r=await s.json();if(s.ok)return r.results.A.tables[0].rows;if(r.results)throw Error(`DB ERROR : ${r.results.A.error}`);throw Error(`API ERROR : ${r.message}`)}catch(o){return new Error(o.message)}}

/* ##### 전역 변수 설정 ##### */
var p_main     = '/d/o8cFNf4Ik/main?orgId=1',
    p_account  = '/d/XGDMMfVSz/account-registration?orgId=1',
    p_resource = '/d/imGE13NIk/resource-registration?orgId=1', 
    p_code     = '/d/wS4OnBVSk/code-registration?orgId=1',
    p_user     = '/d/YrkZxhDIk/user-registration?orgId=1',
    p_mu_match = '/d/vGcLd1vSk/msg-user-mapping?orgId=1',
    p_oncall   = '/d/19uyx8vSz/oncall-history?orgId=1&from=now-3h&to=now',
    p_terra    = '/d/3LDFdvOHk/terraform-registration?orgId=1',
    p_match    = '/d/5cLFLtOHk/terraform-match-list?orgId=1',
    p_source   = '/d/owP82FdHk/terraform-source-list?orgId=1',
    p_hclgen   = '/d/y-mIBzcNz/terraform-hcl-generator-list?orgId=1'
/* ########################## */

async function fn_clarm_page() {
  const parentClass = $('.submenu-controls');
  const headerDiv = `
<div id="headerDiv" class="ui grid no_mg" style="width:100%">
  <div class="three wide column" style="padding:4px 14px">
    <h5 id="main_title" class="ui inverted header no_mg">
      <i class="sidebar icon"></i>
      <div id="main_title" class="content"></div>
    </h5>
  </div>
  <div id="main_menu" class="twelve wide right aligned column no_pd"></div>
  <div class="right aligned column" style="padding:4px">
    <div class="ui compact tiny menu">
      <div class="ui mini dropdown clarm item" style="padding-top:4px;padding-bottom:4px">
        Clarm Menu
        <i class="sidebar icon"></i>
        <div class="menu">
          <a class="item" href="${p_main}">
            CLARM 메인
          </a>
	  <a class="item" href="${p_mu_match}">
	    SNS ARN - USER 매핑
	  </a>
	  <a class="item" href="${p_oncall}">
	    ONCALL HISTORY
	  </a>
          <div class="item">
            <i class="left dropdown icon"></i>
            <span class="text">관리</span>
              <div class="left menu">
                <a class="item" href="${p_account}">
                  계정 관리
                </a>
		<a class="item" href="${p_resource}">
		  리소스 관리
		</a>
                <a class="item" href="${p_code}">
                  코드 관리
                </a>
                <a class="item" href="${p_user}">
                  유저 관리
                </a>
              </div>
          </div>
          <div class="item">
            <i class="left dropdown icon"></i>
            <span class="text">Terraform 관리</span>
              <div class="left menu">
                <a class="item" href="${p_terra}">
                  Terraform  관리
                </a>
                <a class="item" href="${p_match}">
                  Terraform Match List관리
                </a>
                <a class="item" href="${p_source}">
                  Terraform Source List관리
                </a>
                <a class="item" href="${p_hclgen}">
                  Terraform HCL List관리
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  $('#headerDiv').empty();
  parentClass.prepend(headerDiv);
  $('.ui.dropdown.clarm').dropdown({on:'hover'});
}
