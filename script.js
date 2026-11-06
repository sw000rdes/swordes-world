/* ============================================
   swordes.world - shared script for every page
   ============================================ */

// When your merch store is ready, paste its web address between the quotes,
// e.g. "https://swordes.store". While it's empty, Merchandise buttons say "coming soon".
var MERCH_STORE_URL = "";

// The "Treasure Map" menu. Edit this list to change the menu on every page at once.
var MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Videos", href: "/video" },
  { label: "Tour Dates", href: "/tour" },
  { label: "Merchandise", href: "#merch" },
  { label: "Contact", href: "/contact" }
];

// ---- Build the top bar ----
var topbar = document.getElementById("topbar");
if (topbar) {
  var items = MENU_LINKS.map(function (link) {
    return '<li><a href="' + link.href + '">' + link.label + "</a></li>";
  }).join("");

  topbar.className = "topbar";
  topbar.innerHTML =
    '<a class="site-name" href="/"><img src="images/favicon.png" alt="">swordes.world</a>' +
    '<nav class="menu">' +
    '<button class="menu-button" type="button" aria-expanded="false">Treasure Map &#9662;</button>' +
    '<ul class="menu-list">' + items + "</ul>" +
    "</nav>";

  var menu = topbar.querySelector(".menu");
  var menuButton = topbar.querySelector(".menu-button");

  menuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    var isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });

  // Close the menu when tapping anywhere else
  document.addEventListener("click", function () {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
}

// ---- Merchandise links ----
document.querySelectorAll('a[href="#merch"]').forEach(function (link) {
  if (MERCH_STORE_URL) {
    link.href = MERCH_STORE_URL;
    link.target = "_blank";
    link.rel = "noopener";
  } else {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      alert("Merch coming soon! ☠");
    });
  }
});
