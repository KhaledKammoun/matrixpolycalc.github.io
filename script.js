document.addEventListener("DOMContentLoaded", function() {
  function toggleSubmenu(id) {
    var submenus = document.getElementsByClassName("submenu");
    for (var i = 0; i < submenus.length; i++) {
      if (submenus[i].id !== id) {
        submenus[i].style.display = "none";
      }
    }
    var submenu = document.getElementById(id);
    if (submenu.style.display === "none" || submenu.style.display === "") {
      submenu.style.display = "flex";
    } else {
      submenu.style.display = "none";
    }
  }
  
  var menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(function(item) {
    item.addEventListener('click', function() {
      var submenuId = this.textContent.toLowerCase();
      toggleSubmenu(submenuId);
    });
  });
});
