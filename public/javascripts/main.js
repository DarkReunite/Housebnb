function showReg(){
  document.getElementById('regModel').style.display='block';
}
function showLog(){
  document.getElementById('logModel').style.display='block';
}
function hide(){
  document.getElementById('regModel').style.display='none';
  document.getElementById('logModel').style.display='none';
}

var model = document.getElementById('RegLogmodel');

window.onclick = function(event){
  if(event.target == model){
    model.style.display = 'none';
  }
}