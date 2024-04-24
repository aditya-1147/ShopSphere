const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cart-items");
const totalCostElement = document.getElementById("total-cost-value");
const checkoutForm = document.getElementById("checkout-form");

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  let totalCost = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemImage = document.createElement("img");


    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = item.title;

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `Price: Rs.${item.price}`;

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeItemFromCart(index);
    });

    itemDetails.appendChild(itemTitle);
    itemDetails.appendChild(itemPrice);
    itemDetails.appendChild(itemQuantity);
    itemDetails.appendChild(removeButton);

    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemDetails);

    cartItemsContainer.appendChild(cartItem);

    totalCost += item.price * item.quantity;
  });

  totalCostElement.textContent = totalCost.toFixed(2);
}

function removeItemFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}

renderCartItems();

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  localStorage.removeItem("cart");
  
  window.location.href = "orderPlaced.html";
});