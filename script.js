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
      const category = product.category;
      if (!addedCategories.has(category)) {
        const categoryName = document.createElement("option");
        categoryName.value = category;
        categoryName.innerHTML = category;
        categories.appendChild(categoryName);
        addedCategories.add(category);
      }
    });
    renderProducts();
    renderPagination();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
