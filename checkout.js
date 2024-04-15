let place_order = document.getElementById("place_order");
let name = document.getElementById("name");
let city = document.getElementById("city");
let num = document.getElementById("num");
let email = document.getElementById("email");
let sadress = document.getElementById("sadress");

function placeOrder() {
    if (name.value && city.value && num.value && email.value && sadress.value) {
        alert("Place Order Successfully");
        window.location.href = "index.html";
    } else {
        alert("Please Fill Out this All Fields");
    }
}

place_order.addEventListener("click", placeOrder);