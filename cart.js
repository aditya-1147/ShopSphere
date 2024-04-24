const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const totalCostElement = document.getElementById("total-cost-value");
const emptyCartMessage = document.createElement("p");
emptyCartMessage.textContent = "Your cart is empty.";

function renderCartItems() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.appendChild(emptyCartMessage);
    totalCostElement.textContent = "0";
    return;
  }

  let totalCost = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemImage = document.createElement("img");
    itemImage.src = item.colors[0].img;
    itemImage.alt = item.title;

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = item.title;

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `Price: Rs.${item.price}`;

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const updateQuantityContainer = document.createElement("div");
    updateQuantityContainer.classList.add("update-quantity");

    const decreaseQuantity = document.createElement("button");
    decreaseQuantity.textContent = "-";
    decreaseQuantity.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      }
    });

    const increaseQuantity = document.createElement("button");
    increaseQuantity.textContent = "+";
    increaseQuantity.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    });

    const removeItem = document.createElement("button");
    removeItem.textContent = "Remove";
    removeItem.addEventListener("click", () => {
      const index = cart.findIndex(i => i.id === item.id);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    });

    updateQuantityContainer.appendChild(decreaseQuantity);
    updateQuantityContainer.appendChild(increaseQuantity);

    itemDetails.appendChild(itemTitle);
    itemDetails.appendChild(itemPrice);
    itemDetails.appendChild(itemQuantity);
    itemDetails.appendChild(updateQuantityContainer);
    itemDetails.appendChild(removeItem);

    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemDetails);

    cartItemsContainer.appendChild(cartItem);

    totalCost += item.price * item.quantity;
  });

  totalCostElement.textContent = "Rs." + totalCost.toFixed(2);
}

renderCartItems();