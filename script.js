window.onload = function() {
  const productGrid = document.getElementById("productGrid");

  db.ref("products").on("value", snapshot => {
    productGrid.innerHTML = "";
    snapshot.forEach(child => {
      const data = child.val();
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${data.image}" alt="${data.name}" />
        <h3>${data.name}</h3>
        <p>₹${data.price}</p>
      `;
      productGrid.appendChild(card);
    });
  });
};
