// ===========================
// LOAD CART
// ===========================

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

// ===========================
// ADD TO CART
// ===========================

function addToCart(name, price){

    let item = {
        name: name,
        price: price,
        quantity: 1
    };

    let existingItem =
    cart.find(product =>
        product.name === name
    );

    if(existingItem){

        existingItem.quantity++;

    }else{

        cart.push(item);

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " Added To Cart!");

}

// ===========================
// DISPLAY CART
// ===========================

// ===========================
// DISPLAY CART
// ===========================

function displayCart(){

    let cartItems =
    document.getElementById("cartItems");

    let grandTotal =
    document.getElementById("grandTotal");

    if(!cartItems) return;

    if(cart.length === 0){

        cartItems.innerHTML = `
        <tr>
            <td colspan="5">
                <h4 class="text-muted">
                    Cart Is Empty
                </h4>
            </td>
        </tr>
        `;

        if(grandTotal){
            grandTotal.innerHTML = "₹0";
        }

        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        let itemTotal =
        item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `

        <tr>

            <td>${item.name}</td>

            <td>₹${item.price}</td>

            <td>
<div class="d-flex justify-content-center align-items-center">

<button
class="btn btn-sm btn-danger me-2"
onclick="decreaseQty(${index})">

-

</button>

<span>

${item.quantity}

</span>

<button
class="btn btn-sm btn-success ms-2"
onclick="increaseQty(${index})">

+

</button>

</div>

</td>

<td>

₹${itemTotal}

</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="removeItem(${index})">

Remove

</button>

</td>

</tr>

`;

});

if(grandTotal){

grandTotal.innerHTML =
"₹" + total;

}

}

// ===========================
// INCREASE QUANTITY
// ===========================

function increaseQty(index){

cart[index].quantity++;

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

displayCart();

}

// ===========================
// DECREASE QUANTITY
// ===========================

function decreaseQty(index){

if(cart[index].quantity > 1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

displayCart();

}

// ===========================
// REMOVE ITEM
// ===========================

function removeItem(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

displayCart();

}

// ===========================
// CLEAR CART
// ===========================

function clearCart(){

if(confirm(
"Are you sure you want to clear cart?"
)){

cart = [];

localStorage.removeItem("cart");

displayCart();

}

}

// ===========================
// LOAD CART ON PAGE LOAD
// ===========================

window.onload = function(){

displayCart();

};
   