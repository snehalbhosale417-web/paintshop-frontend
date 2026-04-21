const API_URL = "http://localhost:3000/api/orders";

/* ✅ FIXED ID */
const container = document.getElementById("order-list");

/* 📦 LOAD ORDERS */
async function loadOrders() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    container.innerHTML = ""; // ✅ clear old data

    if (data.length === 0) {
      container.innerHTML = "<h3 style='text-align:center;'>No orders found</h3>";
      return;
    }

    data.forEach(order => {
      const div = document.createElement("div");
      div.className = "card";

      let itemsHTML = "";

      order.items.forEach(item => {
        itemsHTML += `<p>${item.name} - ₹${item.price}</p>`;
      });

      div.innerHTML = `
        <h3>📦 Order</h3>
        ${itemsHTML}
        <hr>
        <p><b>Total: ₹${order.total}</b></p>
        <p style="font-size:12px;">${new Date(order.createdAt).toLocaleString()}</p>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.log("Error loading orders:", err);
  }
}

/* ▶ START */
loadOrders();