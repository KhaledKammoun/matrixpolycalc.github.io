function toggleSubmenu(id) {
  var submenus = document.getElementsByClassName("submenu");
  for (var i = 0; i < submenus.length; i++) {
    if (submenus[i].id !== id) {
      submenus[i].style.display = "none";
    }
  }
  var submenu = document.getElementById(id);
  var warning = document.getElementById("warning");
  if (submenu.style.display === "none") {
    submenu.style.display = "flex";
    warning.style.display = "none";
  } else {
    submenu.style.display = "none";
    warning.style.display = "flex";
  }
}
var addBtn = document.getElementById("addBtn");
var input1 = document.getElementById("poly1");
var input2 = document.getElementById("poly2");
var resultDiv = document.getElementById("pol-result");

addBtn.addEventListener("click", function() {
  var poly1 = input1.value;
  var poly2 = input2.value;
  resultDiv.style.display = "block";
  resultDiv.innerHTML = "Result: " + poly1 + " + " + poly2;
});
var mat1Btn = document.getElementById("mat1Btn");
var mat2Btn = document.getElementById("mat2Btn");
var mat1Container = document.getElementById("mat1Container");
var mat2Container = document.getElementById("mat2Container");

mat1Btn.addEventListener("click", function() {
  mat1Container.innerHTML = "";
  var numRows = document.getElementById("mat1NumRows").value;
  var numCols = document.getElementById("mat1NumCols").value;
  // code to create matrix with numRows rows and numCols columns, and append it to mat1Container
});

mat2Btn.addEventListener("click", function() {
  mat2Container.innerHTML = "";
  var numRows = document.getElementById("mat2NumRows").value;
  var numCols = document.getElementById("mat2NumCols").value;
  // code to create matrix with numRows rows and numCols columns, and append it to mat2Container
});
function showPolyResult() {
  var result = document.getElementById("polyResult").value;
  var resultContainer = document.getElementById("polyResultContainer");
  resultContainer.innerHTML = result;
  var warningDiv = document.getElementById("warningDiv");
  warningDiv.style.display = "flex";
}

function showMatResult() {
  var result = document.getElementById("matResult").value;
  var resultContainer = document.getElementById("matResultContainer");
  resultContainer.innerHTML = result;
  var warningDiv = document.getElementById("warningDiv");
  warningDiv.style.display = "flex";
}