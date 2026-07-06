/*-----------------------------------------------------------------------------------

 Template Name:SpaceWebApp
 Template URI: themes.wromo.com/spacewebapp
 Description: This is E-commerce website
 Author: Wromo
 Author URI: https://strict-web.com/user/wromo

 ----------------------------------------------------------------------------------- */

// 01.Compare-btn Js 
// 02.Cart Notification js
// 08.Tap on Top (Vanilla JS)



/*===================== 
 Compare-btn Js 
==========================*/
// Select all elements with the class 'compare'
const compareButtons = document.querySelectorAll(".add-compare");

// Add event listener to each 'compare' element
compareButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Select all the div elements with class 'item'
        const items = document.getElementById("compareDiv");

        // Loop through each 'item' div and add the 'highlight' class
        items.classList.add("show");
    });
});


/*================================
 Add To Cart Notification js
  ==================================*/
window.addEventListener("load", () => {
    const setupButton = (buttonSelector, messageSelector) => {
        const buttons = document.querySelectorAll(buttonSelector);
        buttons.forEach((button) => {
            button.addEventListener("click", function () {
                const messageContainer = document.querySelector(messageSelector);
                const progressBar = messageContainer.querySelector(".progress");

                messageContainer.classList.add("show");
                progressBar.style.width = "0%";

                let progress = 0;
                const interval = setInterval(() => {
                    if (progress >= 100) {
                        clearInterval(interval);
                    } else {
                        progress++;
                        progressBar.style.width = progress + "%";
                    }
                }, 40); // 4000ms / 100 steps = 40ms per step

                setTimeout(() => {
                    messageContainer.classList.remove("show");
                    progressBar.style.width = "0%"; // Reset the progress bar
                }, 4000);
            });
        });
    };

    //   setupButton(".addtocart-btn", ".addToCart");
    setupButton(".wishlist-btn", ".addToWishlist");
});


/*=====================
 Tap on Top (Vanilla JS)
 ==========================*/
document.addEventListener("DOMContentLoaded", function() {
    const tapTopBtn = document.querySelector('.tap-top');

    if (!tapTopBtn) return; 

    tapTopBtn.style.transition = "opacity 0.4s ease, visibility 0.4s ease";
    tapTopBtn.style.opacity = "0";
    tapTopBtn.style.visibility = "hidden";

    window.addEventListener('scroll', function () {
        if (window.scrollY > 600) {
            tapTopBtn.style.opacity = "1";
            tapTopBtn.style.visibility = "visible";
        } else {
            tapTopBtn.style.opacity = "0";
            tapTopBtn.style.visibility = "hidden";
        }
    });

    tapTopBtn.addEventListener('click', function (e) {
        e.preventDefault(); // 
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
});