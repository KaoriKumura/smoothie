let main = document.getElementById("main");

let generateMain = () => {
  return (main.innerHTML = mainItemData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
    <img width="300" src=${img} alt="">
    <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <img onclick="decrement(${id})" id="minus" src="images/minus.png" alt="minus">
          <div id=${id} class="quantity">
          ${search.item === undefined ? 0 : search.item}
          </div>
          <img onclick="increment(${id})" id="plus" src="images/plus.png" alt="plus">
        </div>
      </div>
    </div>
  </div>`;
    })
    .join(""));
};

let basket = JSON.parse(localStorage.getItem("data")) || [];

generateMain();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};
3
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search.item === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


const cartIcon = document.querySelector(".cart_icon");
const wholeCartWindow = document.querySelector(".whole-cart-window");
wholeCartWindow.inWindow = 0;

cartIcon.addEventListener("mouseover", () => {
  if (wholeCartWindow.classList.contains("hide"))
    wholeCartWindow.classList.remove("hide");
});

cartIcon.addEventListener("mouseleave", () => {
  //if (wholeCartWindow.classList.contains('hide'))
  setTimeout(() => {
    if (wholeCartWindow.inWindow === 0) {
      wholeCartWindow.classList.remove("hide");
    }
  }, 500);
});

wholeCartWindow.addEventListener("mouseover", () => {
  wholeCartWindow.inWindow = 1;
});

wholeCartWindow.addEventListener("mouseleave", () => {
  wholeCartWindow.inWindow = 0;
  wholeCartWindow.classList.add("hide");
});

wholeCartWindow.addEventListener("mouseleave", () => {
  wholeCartWindow.inWindow = 1;
  wholeCartWindow.classList.add("hide");
});

let ShoppingCart = document.getElementById("cart-wrapper");

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = mainItemData.find((y) => y.id === id) || [];
        return `
        <div class="cart-item" id="cart-item-${id}">
          <img src="${search.img}" alt="${search.name}">
          <div class="cart_details">
            <h3>${search.name} Smoothie</h3>
            <p>
              <div class="buttons">
                <p id="quantity-${id}" class="quantity">Quantity: ${item}</p>
                <button onclick="removeItem(${id})" class="removeBtn">Remove</button>
              </div>
              <span class="price">$${search.price * item}</span>
            </p>
          </div>
        </div>`;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = `
    <h6>Cart is Empty</h6>`;
  }
};

generateCartItems();

let incrementCart = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrementCart = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};


let updateCart = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation()
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

// let TotalAmount = () => {
//   if (basket.length !== 0) {
//     let amount = basket
//       .map((x) => {
//         let { item, id } = x;
//         let search =  mainItemData.find((y) => y.id === id) || [];

//         return item * search.price;
//       })
//       .reduce((x, y) => x + y, 0);
//     // console.log(amount);
//     ShoppingCart.innerHTML = `
//     <div class="subtotal">Subtotal $ ${amount}</div>
//      `;
//   } else return;
// };

// TotalAmount();

