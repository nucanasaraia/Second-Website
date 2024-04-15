let searchInput = document.querySelector('.form-control');
let searchButton = document.querySelector('.btn-outline-dark');
let renderData = document.querySelector(".renderData");
let renderCartData = document.querySelector(".renderCartData");
let dynamic_count = document.querySelector(".dynamic-count");
let tContainer = document.querySelector(".tContainer");
let line = document.querySelector(".line");
let total_price = document.getElementById("total_price");
let emptyCart = document.querySelector(".emptyCart");
let cItems = document.querySelector(".cItems");

let emptyC = false;
let arrr = [];
let calculateTotal = [];


function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('show');
}


async function fetchData() {
    const res = await fetch(" https://dummyjson.com/products");
    const data = await res.json();
    console.log(data);
    return data.products;
}


async function renderProducts(products) {
    renderData.innerHTML = ""; 
    products.forEach(product => {

        let productMainDiv = document.createElement("div");
        let createImgEle = document.createElement("img");
        let createTitle = document.createElement("p");
        let creatPriceEle = document.createElement("p");
        let btnEle = document.createElement("button");
        let btnText = document.createTextNode("Add to cart");
        let creatPriceText = document.createTextNode(`Price: ${product.price}$`);
        let createTextTitle = document.createTextNode(`${product.title.slice(0, 40)}...`);
        createImgEle.setAttribute("src", product.images[0]);
        createImgEle.setAttribute("class", "myImages");
        productMainDiv.setAttribute("class", "box-main");
        createTitle.appendChild(createTextTitle);
        creatPriceEle.setAttribute("class", 'price-element');
        btnEle.setAttribute("class", "btn-element");
        creatPriceEle.appendChild(creatPriceText);
        createTitle.setAttribute("class", 'productTitle');
        btnEle.appendChild(btnText);
        productMainDiv.appendChild(createImgEle);
        productMainDiv.appendChild(createTitle);
        productMainDiv.appendChild(creatPriceEle);
        productMainDiv.appendChild(btnEle);
        renderData.appendChild(productMainDiv);

        createImgEle.addEventListener("click", () => {
    
            window.location.href = `product_detail.html?productId=${product.id}`;
        });


        btnEle.addEventListener("click", (event) => {
            event.stopPropagation(); 
            addToCart(product.images[0], product.price, product);
        });

        createImgEle.addEventListener("click", () => {
            viewProductDetail(product);
        });
    });

}



async function getData() {
    const data = await fetchData();
    renderProducts(data);
}

getData();

document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector('.d-flex'); 
    let input = form.querySelector('.form-control'); 

    form.addEventListener("input", async function () { 
        const searchTerm = input.value.toLowerCase();
        const data = await fetchData();
        const filteredData = data.filter(product => product.title.toLowerCase().includes(searchTerm));
        renderProducts(filteredData);
    });
});




function addToCart(img, price, product) {
    let cartItem = { ii: img, pp: price, quantity: 1 }; 
    arrr.push(cartItem);
    alert("Product Added to Cart");
    dynamic_count.innerHTML++;
    emptyC = true;
    if (emptyC) {
        cItems.style.display = "flex";
        emptyCart.style.display = "none";
    }

    let cartMDiv = document.createElement("div");
    let cartImgEle = document.createElement("img");
    let cartTrashBtn = document.createElement("i");
    let quantityContainer = document.createElement("div");
    let quantityDisplay = document.createElement("span");
    let decreaseButton = document.createElement("button");
    let increaseButton = document.createElement("button");
    decreaseButton.setAttribute("class", "quantity-button");
    increaseButton.setAttribute("class", "quantity-button");
    quantityDisplay.setAttribute("class", "quantity-display");


    cartTrashBtn.setAttribute("class", "fa-solid fa-trash");
    tContainer.style.display = "flex";
    line.style.display = "block";

    function deleteItem() {
        const index = arrr.findIndex(item => item.ii === cartItem.ii);
        arrr.splice(index, 1);
        this.parentNode.remove();
        dynamic_count.innerHTML--;

        let myTotal = arrr.reduce((accum, curVal) => {
            return accum + (curVal.pp * curVal.quantity);
        }, 0);

        total_price.innerHTML = `Total Price: ${myTotal}$`;

        if (arrr.length === 0) {
            tContainer.style.display = "none";
            line.style.display = "none";
            emptyC = false;
            cItems.style.display = "none";
            emptyCart.style.display = "block";
        }
        cartImgEle.setAttribute("src", img);
    }

    function decreaseQuantity() {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
            quantityDisplay.textContent = cartItem.quantity;
            updateTotalPrice();
        }
    }

    function increaseQuantity() {
        cartItem.quantity++;
        quantityDisplay.textContent = cartItem.quantity;
        updateTotalPrice();
    }

    function updateTotalPrice() {
        let myTotal = arrr.reduce((accum, curVal) => {
            return accum + (curVal.pp * curVal.quantity);
        }, 0);
        total_price.innerHTML = `Total Price : ${myTotal}$`;
    }

    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", decreaseQuantity);

    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", increaseQuantity);

    cartTrashBtn.addEventListener("click", deleteItem);
    cartImgEle.setAttribute("src", product.images[0]);
    cartImgEle.setAttribute("class", "cartImgElement");
    cartMDiv.setAttribute("class", "cart-styling");

    let cartPriceEle = document.createElement("p");
    let cartPriceText = document.createTextNode(`${price}$`);
    cartPriceEle.setAttribute("class", "cart-pprice");
    cartPriceEle.appendChild(cartPriceText);

    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityDisplay);
    quantityContainer.appendChild(increaseButton);

    cartMDiv.appendChild(cartImgEle);
    cartMDiv.appendChild(cartPriceEle);
    cartMDiv.appendChild(quantityContainer);
    cartMDiv.appendChild(cartTrashBtn);
    renderCartData.appendChild(cartMDiv);

    calculateTotal.push(price * cartItem.quantity);

    updateTotalPrice();
}


