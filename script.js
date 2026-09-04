const products=[
{name:"Class 12 Physics Revision Notes",category:"School",price:49,icon:"⚛️"},
{name:"Class 10 Mathematics Notes",category:"School",price:39,icon:"📐"},
{name:"JEE Formula Handbook",category:"JEE",price:99,icon:"⚡"},
{name:"NEET Biology Quick Notes",category:"NEET",price:99,icon:"🧬"},
{name:"BBA Principles of Management",category:"Management",price:59,icon:"📊"},
{name:"Engineering Mathematics Notes",category:"Engineering",price:79,icon:"⚙️"},
{name:"MBBS Anatomy Basics",category:"Medical",price:89,icon:"🩺"},
{name:"Phonics Guide for Parents",category:"Parent Guide",price:49,icon:"🔤"},
{name:"Numbers Made Easy Guide",category:"Parent Guide",price:49,icon:"🔢"}
];
let cart=[];
function renderProducts(list=products){
 document.getElementById("products").innerHTML=list.map((p,i)=>`<article class="product"><div class="thumb">${p.icon}</div><h3>${p.name}</h3><p>${p.category} • Digital study material</p><div class="price-row"><span class="price">₹${p.price}</span><button class="add" onclick="addToCart(${products.indexOf(p)})">Add to Cart</button></div></article>`).join("");
}
function filterProducts(){const q=document.getElementById("search").value.toLowerCase();renderProducts(products.filter(p=>(p.name+p.category).toLowerCase().includes(q)))}
function addToCart(i){cart.push(products[i]);renderCart()}
function renderCart(){document.getElementById("cartCount").textContent=cart.length;const box=document.getElementById("cartItems");box.innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><span>${p.name}<br><b>₹${p.price}</b></span><button class="remove" onclick="removeItem(${i})">Remove</button></div>`).join(""):"<p class='muted'>Your cart is empty.</p>";document.getElementById("total").textContent=cart.reduce((a,p)=>a+p.price,0)}
function removeItem(i){cart.splice(i,1);renderCart()}
function toggleCart(){document.getElementById("drawer").classList.toggle("open");document.getElementById("overlay").classList.toggle("show")}
function checkout(){if(!cart.length)return alert("Your cart is empty.");toggleCart();document.getElementById("paymentModal").classList.add("show")}
function closePayment(){document.getElementById("paymentModal").classList.remove("show")}
function paymentDone(){closePayment();alert("Demo order confirmed! Real payment verification and PDF delivery will be connected later.");cart=[];renderCart()}
renderProducts();renderCart();
