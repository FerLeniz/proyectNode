function changeMode() {
  let status=document.getElementById('statusButton')
  console.log(status.textContent)
  if(status.textContent == 'Off'){
    status.textContent ='On'
    console.log('cae en if')
  }else{
    status.textContent ='Off'
  }
  var element = document.body;
  element.classList.toggle("darkMode");
}

document.getElementById("liveToastBtn").onclick = function() {
  var myAlert =document.getElementById('liveToast'); 
  var bsAlert = new bootstrap.Toast(myAlert);
  bsAlert.show();
}