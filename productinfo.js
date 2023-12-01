document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetchProductDetails(productId);
  } else {
    console.error("Product ID not found in the URL.");
  }
});

async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await response.json();
    displayProductDetails(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

function displayProductDetails(product) {
  const imagesContainer = document.getElementById("productGallery");
  product.images.forEach((image) => {
    const images = document.createElement("img");
    images.src = image;
    imagesContainer.appendChild(images);
  });
  const detailContainer = document.getElementById("productDetails");
  const productDetails = `
  <div class="info">
    <h2>${product.title}</h2>
    <p>Price: $${product.price}</p>
    <p>Discount: ${product.discountPercentage}%</p>
    <p>Category: ${product.category}</p>
    <p>Stock: ${product.stock}</p>
    </div>
    <button onclick="goBack()">Go Back</button>
  `;

  detailContainer.innerHTML = productDetails;
}
function goBack() {
  window.history.back();
}
