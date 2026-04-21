const API_URL = "https://paintshop-snehal.onrender.com/api/products";

let allProducts = [];

// LOAD PRODUCTS
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

    // ✅ FIXED IMAGE HANDLING (VERY IMPORTANT)
    let imgSrc = "./images/default.jpg";

    if (p.image) {
      if (p.image.startsWith("http")) {
        imgSrc = p.image;
      } else if (p.image.startsWith("images/")) {
        imgSrc = "./" + p.image;
      } else {
        imgSrc = "./images/" + p.image;
      }
    }

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${imgSrc}" 
           style="width:100%; border-radius:10px; height:180px; object-fit:cover;">

      <h3>${p.name}</h3>
      <p><b>₹${p.price}</b></p>

      <button onclick="addToCart('${p.name}', ${p.price})">
        Add to Cart 🛒
      </button>
    `;

    container.appendChild(div);
  });
}

// SEARCH FUNCTION
const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(value) ||
      p.category?.toLowerCase().includes(value)
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

// INITIAL LOAD
loadProducts();
