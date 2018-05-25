function showReg(){
  document.getElementById('regmodel').style.display='block';
}

function showLog(){
  document.getElementById('logmodel').style.display='block';
}
function showMenu(){
  document.getElementById('source').style.display='block'
}

function hide() {
  document.getElementById('regmodel').style.display="none";
  document.getElementById('logmodel').style.display="none";
}

document.getElementById('regmodel').onclick = hide;
document.getElementById('logmodel').onclick = hide;
