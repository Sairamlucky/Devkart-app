
const products = [
    {
        id: 1,
        name: "Developer T-Shirt",
        price: 999,
        category: "Clothing"
    },
    {
        id: 2,
        name: "Mechanical Keyboard",
        price: 4999,
        category: "Accessories"
    },
    {
        id: 3,
        name: "Programming Book",
        price: 799,
        category: "Books"
    },
    {
        id: 4,
        name: "Coding Hoodie",
        price: 1999,
        category: "Clothing"
    }
];
const container = document.getElementById("productcontainer");

if (container) {
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {

const product = products.find(p => p.id === id);

cart.push(product);

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

alert(product.name + " added to cart!");

}

function updateCartCount(){

const cartCount = document.getElementById("cart-count");

if(cartCount){
cartCount.textContent = cart.length;
}

}
updateCartCount();
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

if(cartItemsContainer){

let total = 0;

if(cart.length === 0){
cartItemsContainer.innerHTML = "<p>your cart is empty!</p>";
}
cartItemsContainer.innerHTML = cart.map((item,index) => {

total += item.price * (item.quantity || 1);

return `
<div class="cart-items">
<span>${item.name}</span>
<div>
<button onclick="decreaseQty(${index})">-</button>
<span>${item.quantity || 1}</span>
<button onclick="increaseQty(${index})">+</button>
</div>
<span>₹${item.price}</span>
<button onclick ="removeFromCart(${index})">Remove</button>
</div>
`;

}).join(" ");

cartTotal.textContent = total;

}
let Cart = JSON.parse(localStorage.getItem("cart")) || [];

function removeFromCart(index){
    cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    location.reload();
}
function increaseQty(index){
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    localStorage.setItem("cart",JSON.stringify(cart));
    location.reload();
}
function decreaseQty(index){
    if((cart[index].quantity || 1) > 1){
cart[index].quantity -= 1;
}else{
cart.splice(index,1);
}

localStorage.setItem("cart", JSON.stringify(cart));

location.reload();

}

function displayProducts(productList){

container.innerHTML= productList.map(product => `
<div class="product-card">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<p>${product.category}</p>
<button onclick="addToCart(${product.id})">
Add to Cart
</button>

</div>
`).join("");

}
displayProducts(products);
const searchInput = document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input", function(){

const searchValue = searchInput.value.toLowerCase();

const filtered = products.filter(product =>
product.name.toLowerCase().includes(searchValue)
);

displayProducts(filtered);

});

}
const categoryFilter = document.getElementById("categoryFilter");

if(categoryFilter){

categoryFilter.addEventListener("change", function(){

const category = categoryFilter.value;

if(category === "all"){
displayProducts(products);
}
else{

const filtered = products.filter(product =>
product.category === category
);

displayProducts(filtered);

}

});

}

