/* Mobile nav toggle + archive lightbox */

// Inline SVG placeholder shown when a real image hasn't been added yet.
function placeholder(label) {
  var txt = (label || "Image").replace(/&/g, "&amp;").replace(/</g, "&lt;");
  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
    '<rect width="100%" height="100%" fill="#efe6d4"/>' +
    '<text x="50%" y="46%" font-family="Helvetica,Arial" font-size="34" ' +
    'fill="#b5651d" text-anchor="middle">&#9633;</text>' +
    '<text x="50%" y="64%" font-family="Helvetica,Arial" font-size="15" ' +
    'fill="#8a7a64" text-anchor="middle">' + txt + '</text></svg>';
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

document.addEventListener("DOMContentLoaded", function () {
  // Swap any image that fails to load for a labelled placeholder.
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      if (img.dataset.ph) return;          // avoid loops
      img.dataset.ph = "1";
      img.src = placeholder(img.alt || "Image coming soon");
    });
  });

  // --- Mobile menu ---
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  // --- Lightbox for gallery images ---
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector(".lb-cap");
    var close = lb.querySelector(".lb-close");

    document.querySelectorAll(".gallery img").forEach(function (img) {
      img.addEventListener("click", function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbCap.textContent = img.dataset.caption || img.alt || "";
        lb.classList.add("open");
      });
    });

    function hide() { lb.classList.remove("open"); lbImg.src = ""; }
    close.addEventListener("click", hide);
    lb.addEventListener("click", function (e) { if (e.target === lb) hide(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hide();
    });
  }
});
