let data;
const list = document.querySelector(".list");
const categories = document.querySelector("#categoryFilter");

const pageSize = 10;
let currentPage = 1;

async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    data = await response.json();
    const addedCategories = new Set();
    data.products.forEach((product) => {
      // only unique categories
      const category = product.category;
      if (!addedCategories.has(category)) {
        const categoryName = document.createElement("option");
        categoryName.value = category;
        categoryName.innerHTML = category;
        categories.appendChild(categoryName);
        addedCategories.add(category);
      }
    });
    renderProducts(); // render the page
    renderPagination(); // render the pagination
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderProducts() {
  // render the products for the page number we are in.
  list.innerHTML = "";
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedProducts = data.products.slice(startIndex, endIndex);

  displayedProducts.forEach((product) => {
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
      <p class="category">Category: ${product.category}</p>
      <p class="stock">Stock: ${product.stock}</p>
    </div>
    <div class="details">
      <button class="glow-on-hover" onclick="openProductInfoPage(${product.id})">Click for More Details</button>
    </div>
    `;
    list.appendChild(productElement);
  });
}
function applyFilters() {
  const selectedCategory = categories.value.toLowerCase();
  const searchTerm = searchInput.value.toLowerCase();

  list.innerHTML = "";

  data.products.forEach((product) => {
    const categoryMatches =
      selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory;
    const searchMatches =
      product.title.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);
    if (categoryMatches && searchMatches) {
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
        <p class="category">Category: ${product.category}</p>
        <p class="stock">Stock: ${product.stock}</p>
      </div>
      <div class="details">
        <button class="glow-on-hover" onclick="openProductInfoPage(${product.id})">Click for More Details</button>
      </div>
      `;
      list.appendChild(productElement);
    }
  });
}
function renderPagination() {
  const totalPages = Math.ceil(data.products.length / pageSize);

  const paginationContainer = document.querySelector(".pagination");
  if (paginationContainer) {
    paginationContainer.remove();
  }
  const paginationDiv = document.createElement("div");
  paginationDiv.classList.add("pagination");

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      renderPagination();
    }
  });

fetchData();
function openProductInfoPage(productId) {
  window.location.href = `productinfo.html?id=${productId}`;
}
