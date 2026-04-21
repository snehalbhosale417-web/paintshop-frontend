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

// IMAGE FIX
function getImagePath(image) {
  if (!image) return "./images/default.jpg";
  if (image.startsWith("http")) return image;
  if (image.startsWith("images/")) return "./" + image;
  return "./images/" + image;
}

// DISPLAY PRODUCTS
function displayProducts(products) {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  if (!products || products.length === 0) {
    container.innerHTML = "<h3>No products found</h3>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    const imgSrc = getImagePath(p.image);

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

// SEARCH
const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(value) ||
      (p.category && p.category.toLowerCase().includes(value))
    );

    displayProducts(filtered);
  });
}

// ADD TO CART
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart 🛒");
}

loadProducts();
