let data;
const list = document.querySelector(".list");
async function fetchData() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    data = await response.json();
    data.products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `<div class="image"><img src=${product.thumbnail}></div>
      `;
      list.appendChild(productElement);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
