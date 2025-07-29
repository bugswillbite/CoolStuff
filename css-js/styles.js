const productWrapper = document.querySelector(".product-wrapper");
const productCard = document.querySelector(".product-card");
const cardWidth = productCard.offsetWidth + 10; 

function scrollProducts(direction) 
{
    const scrollAmount = cardWidth * visibleCards; 
    productWrapper.scrollLeft += direction * scrollAmount;
}
const productWrapper1 = document.querySelector(".product-wrapper1");
const productCard1 = document.querySelector(".product-card1");
const cardWidth1 = productCard1.offsetWidth + 10; // Card width + gap
const visibleCards1 = 4; // Number of cards visible at a time

function scrollProducts1(direction) {
    const scrollAmount1 = cardWidth1 * visibleCards1; // Scroll by multiple cards
    productWrapper1.scrollLeft += direction * scrollAmount;
}
document.addEventListener("DOMContentLoaded", function () {
    // Product list 1 (first slider)
    const productList = document.querySelector(".product-list");
    const productWrapper = document.querySelector(".product-wrapper");
    const scrollAmount = 220; // Adjust to fit card width + gap
    let currentScroll = 0;

    window.scrollProducts = function (direction) {
        const maxScroll = productList.scrollWidth - productWrapper.clientWidth;
        currentScroll += direction * scrollAmount;

        if (currentScroll < 0) currentScroll = 0;
        if (currentScroll > maxScroll) currentScroll = maxScroll;

        productList.style.transform = `translateX(-${currentScroll}px)`;
    };

    // Product list 2 (second slider)
    const productList1 = document.querySelector(".product-list1");
    const productWrapper1 = document.querySelector(".product-wrapper1");
    const scrollAmount1 = 220; // Adjust to fit card width + gap
    let currentScroll1 = 0;

    window.scrollProducts1 = function (direction) {
        const maxScroll = productList1.scrollWidth - productWrapper1.clientWidth;
        currentScroll1 += direction * scrollAmount1;

        if (currentScroll1 < 0) currentScroll1 = 0;
        if (currentScroll1 > maxScroll) currentScroll1 = maxScroll;

        productList1.style.transform = `translateX(-${currentScroll1}px)`;
    };

    // Optional: add event listeners for buttons to make sure they are clickable
    document.querySelector(".scroll-btn.left").addEventListener("click", function() {
        scrollProducts(-1); // Move left on first product list
    });

    document.querySelector(".scroll-btn.right").addEventListener("click", function() {
        scrollProducts(1); // Move right on first product list
    });

    document.querySelector(".scroll-btn.left1").addEventListener("click", function() {
        scrollProducts1(-1); // Move left on second product list
    });

    document.querySelector(".scroll-btn.right1").addEventListener("click", function() {
        scrollProducts1(1); // Move right on second product list
    });
});
