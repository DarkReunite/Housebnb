var model = document.getElementById('id01');
function show(){
  document.getElementById('id01').style.display='block';
  sytle='width:auto';
}
function hide(){
  document.getElementById('id01').style.display='none';
}
window.onclick = function(event){
  if(event.target == model){
    model.style.display = 'none';
  }
}