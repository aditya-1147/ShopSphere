const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");
const cartIcon = document.querySelector(".cart-icon");

const products = [
  {
    id: 1,
    title: "Tshirt",
    price: 1999,
    desc: "Comfortable and versatile T-shirts made from premium cotton for everyday wear.",
    colors: [
      {
        code: "black",
        img: "./img/tshirtguy.png",
      },
      {
        code: "pink",
        img: "./img/tshirt white.png",
      },
    ],
  },
  {
    id: 2,
    title: "Sweatshirt",
    price: 2399,
    desc: "Cozy comfort meets effortless style in this must-have wardrobe staple",
    colors: [
      {
        code: "black",
        img: "./img/blacksweatshirt.png",
      },
      {
        code: "#5b3e31",
        img: "./img/brownsweatshirt.png",
      },
    ],
  },
  {
    id: 3,
    title: "Jackets",
    price: 2999,
    desc: "Effortlessly stylish outerwear pieces, perfect for transitional weather and layering.",
    colors: [
      {
        code: "black",
        img: "./img/blackjacket.png",
      },
      {
        code: "#760f13",
        img: "./img/brownjacket.png",
      },
    ],
  },
  {
    id: 4,
    title: "Trousers",
    price: 2299,
    desc: "Elevate your look with these versatile and tailored trousers, perfect for any occasion",
    colors: [
      {
        code: "black",
        img: "./img/blackjeans.png",
      },
      {
        code: "#3b93d0",
        img: "./img/bluejeans.png",
      },
    ],
  },
  {
    id: 5,
    title: "Cargos",
    price: 3399,
    desc: "A modern interpretation of classic cargo pants, featuring multiple pockets and a relaxed fit.",
    colors: [
      {
        code: "#b2beb5",
        img: "./img/cargosgreen.png",
      },
      {
        code: "black",
        img: "./img/blackcargos.png",
      },
    ],
  },
];


let choosenProduct = products[0];
let cart = [];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");
const currentProductDesc = document.querySelector(".productDesc");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    choosenProduct = products[index];

    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "Rs." + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
      currentProductDesc.textContent = choosenProduct.desc;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";

    choosenProduct.size = size.textContent;
  });
});

const addToCart = document.querySelector(".addToCart");
addToCart.addEventListener("click", () => {
  const existingProduct = cart.find(item => item.id === choosenProduct.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...choosenProduct, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartBadge();
});

function updateCartBadge() {
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartIcon.querySelector("span").textContent = cartItemsCount;
}

window.addEventListener("load", () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartBadge();
  }
});
// app.js or server.js

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000; // Or any other port you prefer

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle user data
app.post('/storeUserData', (req, res) => {
    const userData = req.body;

    // Append user data to a text file
    fs.appendFile('userDetails.txt', JSON.stringify(userData) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error storing user data');
        } else {
            console.log('User data stored successfully');
            res.status(200).send('User data stored successfully');
        }
    });
});

// Create the text file if it doesn't exist
fs.open('userDetails.txt', 'wx', (err, fd) => {
    if (err) {
        if (err.code === 'EEXIST') {
            console.log('File already exists');
            return;
        }
        console.error('Error creating file:', err);
        return;
    }
    console.log('File created successfully');
    fs.close(fd, (err) => {
        if (err) {
            console.error('Error closing file:', err);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

