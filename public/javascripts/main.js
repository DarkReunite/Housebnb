function showReg(){
  document.getElementById('regmodel').style.display='block';
}

function showLog(){
  document.getElementById('logmodel').style.display='block';
}
function showMenu(){
  document.getElementById('source').style.display='block';
}

function hide() {
  document.getElementById('regmodel').style.display="none";
  document.getElementById('logmodel').style.display="none";
}

// document.getElementById('regmodel').onclick = hide;
// document.getElementById('logmodel').onclick = hide;

/* 上传图片 未完成*/
// console.log("1");
// $("#img_input").on("change", function(e){
//   console.log("2");
//   var file = e.target.files[0];

//   if(!file.type.match('image.*')){
//     return false;
//   }

//   var reader = new FileReader();

//   reader.readAsDataURL(file);

//   reader.onload = function(arg){
//     var img = '<img class="preview" src="' + arg.target.result + '"alt="preview"/>';
//     $("#preview_box").empty().append(img);
//   }
// });