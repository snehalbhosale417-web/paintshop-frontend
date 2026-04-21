const API_URL = "https://paintshop-snehal.onrender.com/api/orders";

const container = document.getElementById("order-list");

async function loadOrders() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    container.innerHTML = "";

    if (!data.length) {
      container.innerHTML = "<h3>No orders</h3>";
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
    console.log(err);
  }
}

loadOrders();
