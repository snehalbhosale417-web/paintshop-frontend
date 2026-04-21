const API_URL = "https://paintshop-snehal.onrender.com/api/products";

let allProducts = [];

async function loadProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    allProducts = data;
    displayProducts(allProducts);

  } catch (err) {
    console.log("Error:", err);
  }
}

function displayProducts(products) {
  const container = document.getElementById("product-list");

  if (!container) return;

  container.innerHTML = "";

  if (!products.length) {
    container.innerHTML = "<h3>No products found</h3>";
    return;
  }

  products.forEach(p => {

    const imgSrc = p.image
      ? (p.image.startsWith("http")
          ? p.image
          : "./images/" + p.image)
      : "./images/default.jpg";

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${imgSrc}">
      <h3>${p.name}</h3>
      <p><b>₹${p.price}</b></p>

      <button onclick="addToCart('${p.name}', ${p.price})">
        Add to Cart 🛒
      </button>
    `;

    container.appendChild(div);
  });
}

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

loadProducts();
