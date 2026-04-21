const API_URL = "https://paintshop-snehal.onrender.com/api/orders";

function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<h2 style='text-align:center;'>Cart is empty 🛒</h2>";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="removeItem(${index})">Remove ❌</button>
    `;

    cartContainer.appendChild(div);
  });

  const totalDiv = document.createElement("h2");
  totalDiv.style.textAlign = "center";
  totalDiv.innerText = "Total: ₹" + total;

  cartContainer.appendChild(totalDiv);
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
}

// 🟢 PLACE ORDER FUNCTION (FIXED)
async function placeOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!name || !phone || !address) {
    alert("Please fill all details");
    return;
  }

  if (cart.length === 0) {
    alert("Cart is empty 🛒");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const orderData = {
    name,
    phone,
    address,
    payment: "COD",
    items: cart,
    total
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!res.ok) {
      throw new Error("Order failed");
    }

    alert("Order placed successfully 🎉");

    localStorage.removeItem("cart");

    window.location.href = "orders.html";

  } catch (err) {
    console.log("Order Error:", err);
    alert("Error placing order ❌");
  }
}

loadCart();
