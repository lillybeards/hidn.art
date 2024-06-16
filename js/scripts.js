// script.js

document.addEventListener("DOMContentLoaded", function () {
    var imageContainers = document.querySelectorAll(".image-container");

    imageContainers.forEach(function (container) {
        var caption = container.querySelector(".caption");
        var originalCaption = caption.textContent;
        var hoverCaption = caption.getAttribute("data-hover-caption");

        container.addEventListener("mouseenter", function () {
            caption.textContent = hoverCaption;
        });

        container.addEventListener("mouseleave", function () {
            caption.textContent = originalCaption;
        });
    });
});
