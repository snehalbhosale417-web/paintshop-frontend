const cartContainer = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


function loadCart() {
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

      <button onclick="removeItem(${index})" style="background:red;">
        Remove ❌
      </button>
    `;

    cartContainer.appendChild(div);
  });

  const totalDiv = document.createElement("h2");
  totalDiv.innerText = "Total: ₹" + total;

  cartContainer.appendChild(totalDiv);
}


function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}


async function placeOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (!name || !phone || !address) {
    alert("Please fill all details");
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
    await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    alert("Order placed successfully 🎉");

    localStorage.removeItem("cart");
    window.location.href = "orders.html";

  } catch (err) {
    console.log(err);
    alert("Error placing order");
  }
}


loadCart();
