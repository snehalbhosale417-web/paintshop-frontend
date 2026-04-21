const API_URL = "https://paintshop-snehal.onrender.com/api/products";

let allProducts = [];

// LOAD PRODUCTS FROM BACKEND
async function loadProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    allProducts = data;
    displayProducts(allProducts);

  } catch (err) {
    console.log("Error loading products:", err);
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
    const div = document.createElement("div");
    div.className = "card";

    // SAFE IMAGE HANDLING
    const imgSrc = p.image?.startsWith("http")
      ? p.image
      : `./${p.image || "images/default.jpg"}`;

    div.innerHTML = `
      <img src="${imgSrc}" 
        style="width:100%; border-radius:10px; height:180px; object-fit:cover;">

      <h3>${p.name}</h3>
      <p><b>₹${p.price}</b></p>

      <button onclick="addToCart('${p.name}', ${p.price})">
        Add to Cart 🛒
      </button>

      <button onclick="deleteProduct('${p._id}')" style="background:red; margin-top:5px;">
        Delete 🗑
      </button>

      <button onclick="editProduct('${p._id}', '${p.name}', ${p.price}, '${p.image}')" style="background:blue; margin-top:5px;">
        Edit ✏
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

// DELETE PRODUCT
function deleteProduct(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    alert("Product Deleted 🗑");
    loadProducts();
  })
  .catch(err => console.log(err));
}

// EDIT PRODUCT
function editProduct(id, oldName, oldPrice, oldImage) {
  const name = prompt("Enter new name:", oldName);
  const price = prompt("Enter new price:", oldPrice);
  const image = prompt("Enter new image URL:", oldImage);

  if (!name || !price) return;

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      price: Number(price),
      image
    })
  })
  .then(() => {
    alert("Product Updated ✏");
    loadProducts();
  })
  .catch(err => console.log(err));
}

// INITIAL LOAD
loadProducts();
