const API_URL = "http://localhost:3000/api/products";

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

  if (products.length === 0) {
    container.innerHTML = "<h3>No products found</h3>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.image || 'images/default.jpg'}" 
           style="width:100%; border-radius:10px; height:180px; object-fit:cover;">
      
      <h3>${p.name}</h3>
      <p><b>₹${p.price}</b></p>

      <button onclick="addToCart('${p.name}', ${p.price})">
        Add to Cart 🛒
      </button>

      <button onclick="deleteProduct('${p._id}')" 
              style="background:red; margin-top:5px;">
        Delete 🗑
      </button>

      <button onclick="editProduct('${p._id}', '${p.name}', ${p.price}, '${p.image}')" 
              style="background:blue; margin-top:5px;">
        Edit ✏
      </button>
    `;

    container.appendChild(div);
  });
}


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

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart 🛒");
}


function deleteProduct(id) {
  fetch(API_URL + "/" + id, {
    method: "DELETE"
  })
  .then(() => {
    alert("Product Deleted 🗑");
    loadProducts();
  })
  .catch(err => console.log(err));
}

function editProduct(id, oldName, oldPrice, oldImage) {
  const name = prompt("Enter new name:", oldName);
  const price = prompt("Enter new price:", oldPrice);
  const image = prompt("Enter new image URL:", oldImage);

  if (!name || !price) return;

  fetch(API_URL + "/" + id, {
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


loadProducts();
