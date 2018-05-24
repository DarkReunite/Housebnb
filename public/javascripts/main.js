function show(){
  document.getElementById('RegLogmodel').style.display='block';
}
function hide(){
  document.getElementById('RegLogmodel').style.display='none';
}

var model = document.getElementById('RegLogmodel');

window.onclick = function(event){
  if(event.target == model){
    model.style.display = 'none';
  }
}