let data;
const list = document.querySelector(".list");
const categories = document.querySelector("#categoryFilter");

async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    data = await response.json();

    data.products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
      <div class="image">
        <img src=${product.thumbnail}>
      </div>
      <div class= "product-info">
        <h3 class="prod-title">${product.title}</h3>
        <p class="price">Price:$${product.price}</p>
        <p class="discount">Discount: ${product.discountPercentage}%</p>
        <p class="category">Catergory: ${product.category}</p>
        <p class="stock">Stock: ${product.stock}</p>
      </div>
      <div class="details">
        <button class="glow-on-hover" onclick="openProductInfoPage(${product.id})">Click for More Details</button>
      </div>
      `;
      list.appendChild(productElement);
    });
    const addedCategories = new Set();
    data.products.forEach((product) => {
      const category = product.category;
      if (!addedCategories.has(category)) {
        const categoryName = document.createElement("option");
        categoryName.innerHTML = `<p value="${product.category}">${product.category}</p>`;
        categories.appendChild(categoryName);
        addedCategories.add(category);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchData();
function openProductInfoPage(productId) {
  window.location.href = `productinfo.html?id=${productId}`;
}
