const API_URL = "https://paintshop-snehal.onrender.com/api/orders";

async function loadOrders() {
  const container = document.getElementById("order-list");
  if (!container) return;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    container.innerHTML = "";

    if (!data || data.length === 0) {
      container.innerHTML = "<h3>No orders 📦</h3>";
      return;
    }

    data.forEach(order => {
      const div = document.createElement("div");
      div.className = "card";

      let items = "";

      order.items.forEach(i => {
        items += `<p>${i.name} - ₹${i.price}</p>`;
      });

      div.innerHTML = `
        <h3>Order</h3>
        ${items}
        <p><b>Total: ₹${order.total}</b></p>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.log("Order error:", err);
  }
}

loadOrders();
