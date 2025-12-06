/* -------------------------
   DARK MODE
--------------------------*/
function toggleMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }
    loadCart();
};

/* -------------------------
   MOBILE MENU
--------------------------*/
function toggleMenu() {
    let nav = document.getElementById("navMenu");
    nav.style.display = (nav.style.display === "flex") ? "none" : "flex";
}

/* -------------------------
   ADD TO CART
--------------------------*/
function addToCart(name, price, img) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, img });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    loadCart();
}

/* -------------------------
   LOAD CART PAGE
--------------------------*/
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");
    let total = 0;

    if (!container) return;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <button onclick="removeItem(${index})" class="btn-sm">Remove</button>
                </div>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText = "Total: $" + total;
}

function removeItem(i) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}

/* -------------------------
   PRODUCT IMAGE SWITCH
--------------------------*/
function changeImg(src) {
    let mainImg = document.getElementById("mainImg");
    if (mainImg) mainImg.src = src;
}

/* -------------------------
   PRODUCT SEARCH
--------------------------*/
function searchProducts() {
    let input = document.getElementById("searchInput");
    if (!input) return;

    let filter = input.value.toLowerCase();
    let cards = document.getElementsByClassName("product-card");

    for (let card of cards) {
        let title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(filter) ? "block" : "none";
    }
}
