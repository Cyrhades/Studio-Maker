document.addEventListener('DOMContentLoaded', () => {

  drawGameBoy('#GameBoy');

  document.querySelector('#screen').addEventListener('dblclick', (event) => {
    let doc = document;
    let el = event.currentTarget;
    if (null!=(doc.fullscreenElement || doc.mozFullScreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement)) {
      (doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen).apply(doc);
    } else {
      (el.requestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen || el.msRequestFullscreen || (()=>{})).apply(el);
    }
  });
});


function drawGameBoy(selector) {
  document.querySelector(selector).classList.add("gameboy");
  // affichage de la zone écran
  drawScreenArea(selector);
  // afficher le Logo Nintendo
  drawNintendoLogo(selector);
  // afficher les différents boutons
  drawControls(selector);
  // afficher le speaker
  drawSeaker(selector);
}

function drawScreenArea(selector) {
  document.querySelector(selector).innerHTML += `
  <div class="screen-area">        
    <div class="power">
      <div class="indicator">
        <div class="led"></div>
        <span class="arc" style="z-index:2"></span>
        <span class="arc" style="z-index:1"></span>
        <span class="arc" style="z-index:0"></span>
      </div>
      POWER
    </div>
    
    <canvas class="display" id="screen" width="160" height="144"></canvas>
    
    <div class="label">
      <div class="title">GAME BOY</div>
      <div class="subtitle"><span class="c">C</span><span class="o1">O</span><span class="l">L</span><span class="o2">O</span><span class="r">R</span></div> 
    </div>        
  </div>`;
}

function drawNintendoLogo(selector) {
  document.querySelector(selector).innerHTML += `<div class="nintendo">Nintendo</div>`;
}

function drawControls(selector) {
  let btns = ``;  
  ['up','right','down','left'].forEach(function(button) { btns += `<div class="${button}"><i class="fa fa-caret-${button}"></i></div>`; });
  document.querySelector(selector).innerHTML += `<div class="controls"><div class="dpad">${btns}<div class="middle"></div></div>
    <div class="a-b"><div class="b">B</div><div class="a">A</div></div></div>`;
  document.querySelector(selector).innerHTML += `<div class="start-select"><div class="select">SELECT</div><div class="start">START</div></div>`;
}

function drawSeaker(selector) {
  let dots = ``;
  for(let i =0; i<8; i++) {
    for(let j =0; j<8; j++) {
      let dotClass;
      if(i==0 && (j==0||j==7) || i==7 && (j==0||j==7)) {
        dotClass = `dot-placeholder`;
      } 
      else if(i%2==0 && j%2==0 || i%2==1 && j%2==1) {
        dotClass = `closed`;
      } 
      else {
        dotClass = `open`;
      }
      dots += `<div class="dot ${dotClass}"></div>`;
    }
  }
  document.querySelector(selector).innerHTML += `<div class="speaker">${dots}</div>`;
}