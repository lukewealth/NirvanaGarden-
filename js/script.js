
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  section.forEach(sec =>{

    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height){
      navLinks.forEach(links =>{
        links.classList.remove('active');
        document.querySelector('header .navbar a[href*='+id+']').classList.add('active');
      });
    };

  });

}

document.querySelector('#search-icon').onclick = () =>{
  document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
  document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop:true,
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;




// open cart modal
const cart = document.querySelector('#cart');
const cartModalOverlay = document.querySelector('.cart-modal-overlay');

cart.addEventListener('click', () => {
  if (cartModalOverlay.style.transform === 'translateX(-200%)'){
    cartModalOverlay.style.transform = 'translateX(0)';
  } else {
    cartModalOverlay.style.transform = 'translateX(-200%)';
  }
})
// end of open cart modal

// close cart modal
const closeBtn = document.querySelector ('#close-btn');

closeBtn.addEventListener('click', () => {
  cartModalOverlay.style.transform = 'translateX(-200%)';
});

cartModalOverlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-modal-overlay')){
    cartModalOverlay.style.transform = 'translateX(-200%)'
  }
})
// end of close cart modal

// add products to cart
const addToCart = document.getElementsByClassName('add-to-cart');
const productRow = document.getElementsByClassName('product-row');

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener('click', addToCartClicked)
}

function addToCartClicked (event) {
  button = event.target;
  var cartItem = button.parentElement;
  var price = cartItem.getElementsByClassName('product-price')[0].innerText;
  
  var imageSrc = cartItem.getElementsByClassName('product-image')[0].src;
  addItemToCart (price, imageSrc);
  updateCartPrice()
}

function addItemToCart (price, imageSrc) {
  var productRow = document.createElement('div');
  productRow.classList.add('product-row');
  var productRows = document.getElementsByClassName('product-rows')[0];
  var cartImage = document.getElementsByClassName('cart-image');
  
  for (var i = 0; i < cartImage.length; i++){
    if (cartImage[i].src == imageSrc){
      alert ('This item has already been added to the cart')
      return;
    }
  }
  
  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="cart-price">${price}</span>
        <input class="product-quantity" type="number" value="1">
        <button class="remove-btn">Remove</button>
        </div>
        
      `
  productRow.innerHTML = cartRowItems;
  productRows.append(productRow);
  productRow.getElementsByClassName('remove-btn')[0].addEventListener('click', removeItem)
  productRow.getElementsByClassName('product-quantity')[0].addEventListener('change', changeQuantity)
  updateCartPrice()
}
// end of add products to cart

// Remove products from cart
const removeBtn = document.getElementsByClassName('remove-btn');
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i]
  button.addEventListener('click', removeItem)
}

function removeItem (event) {
  btnClicked = event.target
  btnClicked.parentElement.parentElement.remove()
  updateCartPrice()
}

// update quantity input
var quantityInput = document.getElementsByClassName('product-quantity')[0];

for (var i = 0; i < quantityInput; i++){
  input = quantityInput[i]
  input.addEventListener('change', changeQuantity)
}

function changeQuantity(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0){
    input.value = 1
  }
  updateCartPrice()
}
// end of update quantity input

// update total price
function updateCartPrice() {
  var total = 0
  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i]
  var priceElement = cartRow.getElementsByClassName('cart-price')[0]
  var quantityElement = cartRow.getElementsByClassName('product-quantity')[0]
  var price = parseFloat(priceElement.innerText.replace('$', ''))
  var quantity = quantityElement.value
  total = total + (price * quantity )
    
  }
  document.getElementsByClassName('total-price')[0].innerText =  '$' + total

document.getElementsByClassName('cart-quantity')[0].textContent = i /= 2
}
// end of update total price

// purchase items
const purchaseBtn = document.querySelector('.purchase-btn');

const closeCartModal = document.querySelector('.cart-modal');

purchaseBtn.addEventListener('click', purchaseBtnClicked)

function purchaseBtnClicked () {
  alert ('Thank you for your purchase');
  cartModalOverlay.style.transform= 'translateX(-100%)'
 var cartItems = document.getElementsByClassName('product-rows')[0]
 while (cartItems.hasChildNodes()) {
   cartItems.removeChild(cartItems.firstChild)
   
 }
  updateCartPrice()
}
// end of purchase items

//alert user if cart is empty



(function() {
  // VARS
  const productsContainer = document.querySelector("#grid");
  const cartContainer = document.querySelector("#shopping-cart");
  const cartContent = document.querySelector("#cart-content");
  const toggleCartBtn = document.querySelector("#toggle-cart-btn");
  const clearCartBtn = document.querySelector("#clear-cart");
  const checkoutBtn = document.querySelector("#checkout-btn");
  const totalPriceContainer = document.querySelector("#total-price");

  // FUNCTIONS

  function toggleCart() {
    // toggle shopping cart visibility
    cartContainer.classList.toggle("open");
  }

  function getLSContent() {
    // get contents from local storage.
    // if nothing is there, create an empty array
    const lsContent = JSON.parse(localStorage.getItem("products")) || [];
    return lsContent;
  }

  function setLSContent(lsContent) {
    // save content inside local storage
    localStorage.setItem("products", JSON.stringify(lsContent));
  }

  function calculateTotal(prices) {
    // calculate the total price in the cart
    return prices.reduce(function(prev, next) {
      return prev + next;
    }, 0);
  }

  function getCartItemPrices() {
    // extract the price numbers from the cart items to calculate total
    const prices = [];
    // retrieve the td element in the cart where the product price is stored
    // for each product in the cart
    let nums = cartContent.querySelectorAll("tr td:nth-child(3)");

    // iterate over each td node and extract the price
    // strip the $ sign from the text, turn the string into
    // a number and push the number into the prices array
    if (nums.length > 0) {
      for (let cell = 0; cell < nums.length; cell++) {
        let num = nums[cell].innerText;
        num = num.replace(/[^\d]/g, "");
        num = parseFloat(num);
        prices.push(num);
      }
      // return the prices array
      return prices;
    } else {
      return;
    }
  }

  function displayCartTotal() {
    // display the total cost in the cart
    const prices = getCartItemPrices();
    let total = 0;
    if (prices) {
      total = calculateTotal(prices);
      totalPriceContainer.innerHTML = `<span class="total">Total: $${total.toFixed(
        2
      )}</span>`;
    } else {
      totalPriceContainer.innerHTML = '<span class="total">Total: $0</span>';
    }
  }

  function displayProducts() {
    // display all products in the cart

    // get contents from local storage
    const lsContent = getLSContent();
    let productMarkup = "";
    // if local storage is not empty, build the
    // cart items markup and the appropriate details
    if (lsContent !== null) {
      for (let product of lsContent) {
        productMarkup += `
          <tr>
          <td><img class="cart-image" src="${product.image}" alt="${
          product.name
        }" width="120"></td>
          <td>
            ${product.name}
          </td>
          <td>${product.price}</td>
          <td><a href="#" data-id="${product.id}" class="remove">X</a></td>
          </tr>
        `;
      }
    } else {
      // if no content is in local storage, alert user
      productMarkup = "Your cart is empty.";
    }
    // add markup to DOM
    cartContent.querySelector("tbody").innerHTML = productMarkup;
  }

  function saveProduct(clickedBtn) {
    // save selected product in local storage and display it in the cart together

    // vars
    const productId = clickedBtn.getAttribute("data-id");
    const card = clickedBtn.parentElement.parentElement;
    const cardInfo = clickedBtn.parentElement;
    const prodImage = card.querySelector("img").src;
    const prodName = cardInfo.querySelector("h4").textContent;
    const prodPrice = cardInfo.querySelector(".card__price").textContent;

    let isProductInCart = false;

    // get local storage array
    const lsContent = getLSContent();

    // to avoid user adds the same course twice, check
    // the product is not in LS already before adding it
    lsContent.forEach(function(product) {
      if (product.id === productId) {
        alert("This course is already in your cart.");
        isProductInCart = true;
      }
    });

    // only if the product is not already in the cart,
    // create an object representing selected product info
    // and push it into local storage array
    if (!isProductInCart) {
      lsContent.push({
        id: productId,
        image: prodImage,
        name: prodName,
        price: prodPrice
      });

      // add product into into local storage
      setLSContent(lsContent);
      // update the display of courses in the shopping cart
      displayProducts();
    }
  }

  function removeProduct(productId) {
    // remove product from cart (and from local storage)

    // retrieve list of products from LS
    const lsContent = getLSContent();

    // get the index of the product item to remove
    // inside the local storage content array
    let productIndex;
    lsContent.forEach(function(product, i) {
      if (product.id === productId) {
        productIndex = i;
      }
    });

    // modify the items in local storage array
    // to remove the selected product item

    lsContent.splice(productIndex, 1);
    // update local storage content
    setLSContent(lsContent);

    displayProducts();
  }

  function clearCart() {
    // clear all products from cart (and local storage)

    // retrieve list of products from LS
    const lsContent = getLSContent();
    // empty array in local storage
    lsContent.splice(0, lsContent.length);
    // update local storage
    setLSContent(lsContent);
    // display cart content again
    displayProducts();
  }

  function checkout() {
    // checkout: just clear the cart
    // after user confirms the checkout process
    const cartProducts = cartContent.querySelector("tbody").innerHTML;
    if (cartProducts !== "" && confirm("Are you sure you want to checkout?")) {
      clearCart();
    } else {
      return;
    }
  }

  // BIND EVENTS AND CALL FUNCTIONS

  // Page load:
  document.addEventListener("DOMContentLoaded", function(e) {
    // display list of products in cart, if any, on page load
    displayProducts();
    // display cart total
    displayCartTotal();
  });

  // open and close shopping cart
  // when cart button is clicked
  toggleCartBtn.addEventListener("click", function(e) {
    e.preventDefault();
    toggleCart();
  });

  // Save product in cart and Local Storage
  // when add to cart button is clicked
  productsContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
      e.preventDefault();
      const clickedBtn = e.target;
      saveProduct(clickedBtn);
    }
  });

  productsContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {
      displayCartTotal();
    }
  });

  // bind removeProduct to click event of the cartContent table
  cartContent.querySelector("tbody").addEventListener("click", function(e) {
    e.preventDefault();
    // identify the button that was clicked
    const clickedBtn = e.target;
    // if it's a remove button
    if (e.target.classList.contains("remove")) {
      // get the value of the data-id property, which contains the
      // id of the selected product
      const productId = clickedBtn.getAttribute("data-id");
      // use the id to remove the selected product
      removeProduct(productId);
      // display products in the cart again,
      // now the list should be displayed with 1 less product
      // or empty if no products are left in the cart

      // adjust the total
      displayCartTotal();
    }
  });

  // bind the button to clear the cart both to the function that
  // clears the cart and to the function that adjusts the total price
  clearCartBtn.addEventListener("click", function(e) {
    e.preventDefault();
    clearCart();
  });
  clearCartBtn.addEventListener("click", displayCartTotal);

  // bind the button that does the checkout both to the function that
  // controls the checkout and and to the function that adjusts the total price
  checkoutBtn.addEventListener("click", function(e) {
    e.preventDefault();
    checkout();
  });
  checkoutBtn.addEventListener("click", displayCartTotal);
})();















