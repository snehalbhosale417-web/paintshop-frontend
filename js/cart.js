const cartContainer = document.getElementById("cart-items");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
  cartContainer.innerHTML = "";

  if (!cart.length) {
    cartContainer.innerHTML = "<h2>Cart is empty</h2>";
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
      <button onclick="removeItem(${index})">Remove</button>
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

loadCart();
