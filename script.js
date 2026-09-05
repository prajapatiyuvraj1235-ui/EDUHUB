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
async function checkout() {
  if (!cart.length) {
    return alert("Your cart is empty.");
  }

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  try {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: total
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Unable to create order");
    }

    const options = {
      key: "rzp_live_TYEbKFykHJiglx",
      amount: data.order.amount,
      currency: data.order.currency,
      name: "EDUHUB",
      description: "Digital Study Material",
      order_id: data.order.id,

      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);

        cart = [];
        renderCart();
        closePayment();
      },

      prefill: {
        name: "",
        email: "",
        contact: ""
      },

      theme: {
        color: "#2563eb"
      }
    };

    const razorpay = new Razorpay(options);

    razorpay.on("payment.failed", function (response) {
      alert("Payment failed. Please try again.");
      console.error(response.error);
    });

    razorpay.open();

  } catch (error) {
    console.error(error);
    alert("Unable to start payment. Please try again.");
  }
}function closePayment(){document.getElementById("paymentModal").classList.remove("show")}
function paymentDone(){closePayment();alert("Demo order confirmed! Real payment verification and PDF delivery will be connected later.");cart=[];renderCart()}
renderProducts();renderCart();
