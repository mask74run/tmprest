<style>
.dashboard-container {
  background-image: url('/public/custom/sky-2152463_960_720.jpg')!important;
  background-size : cover;
}
.page-toolbar {
  background-color: transparent!important;
}
.mg {
  margin: 0!important;
}
</style>
<div style="margin-top: 100px" class="ui container">
  <div class="ui three stackable cards mg">
    <div id="card_01" style="display:none;" class="ui card">
      <div class="content">
        <div class="header"><i style="color:#8bcbc8" class="bell icon"></i><span style="color:#8bcbc8">기준관리</span><span style="color:#a0c1b8">[DX 다온]</span></div>
        <div class="meta">기준 JSA</div>
        <div id="card_01_desc" style="display:none" class="description">
          기준관리 (JSA)
        </div>
      </div>
      <div class="extra content center aligned">
        <a href="/d/-7G8XJYHk/jsa?orgId=1" class="ui teal button">기준관리 (JSA) 바로가기</a>
      </div>
    </div>
    <div id="card_02" class="ui card" style="display:none;">
      <div class="content">
        <div class="header"><i style="color:#613a43" class="credit card icon"></i><span style="color:#613a43">설비관리</span><span style="color:#935462">[DX 다온]</span></div>
        <div class="meta">설비 CCTV</div>
        <div id="card_02_desc" style="display:none" class="description">
          설비관리 (CCTV)
        </div>
      </div>
      <div class="extra content center aligned">
        <a href="/d/9s17ylYHz/cctv_screen?orgId=1" class="ui orange button">설비관리 (CCTV) 바로가기</a>
      </div>
    </div>
    <div id="card_03" class="ui card" style="display:none">
      <div class="content">
        <div class="header"><i style="color:#709fb0" class="cloud icon"></i><span style="color:#709fb0">Code 관리</span><span style="color:#a0c1b8">[DX 다온]</span> </div>
        <div class="meta">Code 관리</div>
        <div id="card_03_desc" style="display:none" class="description">
          <span style="color:black;font-weight:400">Code 관리</span>
        </div>
      </div>
      <div class="extra content center aligned">
        <a href="/d/0C_SylLHz/code-gwanri?orgId=1" class="ui blue button">Code 관리 바로가기</a>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript" src="/public/custom/custom.js"></script>
<script>
jQuery.noConflict()
$(document).ready(async function() {
  side_redraw('${__user.login}')
  var isHovered = false
  if($('#card_01').css('display')==='none') {
    $('#card_01').transition('slide down')
    await sleep(50)
    $('#card_01_desc').transition('slide right')
    await sleep(200)
    $('#card_02').transition('slide down')
    await sleep(50)
    $('#card_02_desc').transition('slide right')
    await sleep(200)
    $('#card_03').transition('slide down')
    await sleep(50)
    $('#card_03_desc').transition('slide right')
    await sleep(200)
    // $('#card_04').transition('slide down')
    // await sleep(50)
    // $('#card_04_desc').transition('slide right')
    // await sleep(200)
    // $('#card_05').transition('slide down')
    // await sleep(50)
    // $('#card_05_desc').transition('slide right')
    // await sleep(200)
    // $('#card_06').transition('slide down')
    // await sleep(50)
    // $('#card_06_desc').transition('slide right')
  }
  $('.ui.button').on('mouseover', function() {
    if(!isHovered) {
      $(this).transition('jiggle')
      isHovered = true
    }
  })
  $('.ui.button').on('mouseleave', function() {
    isHovered = false
  })
})
</script>