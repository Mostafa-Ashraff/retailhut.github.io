basket = JSON.parse(localStorage.getItem("data")) || [];
let removeItem = ()=>{
    let removeSpan = document.querySelectorAll('.remove-item');
    removeSpan.forEach(btn => btn.addEventListener('click', ()=>{

        btn.parentElement.parentElement.remove();
    }))
} 
removeItem();

let increment = (id)=>{
    let selectedItem = id;
    //console.log(selectedItem);
    let ItemInBasket = basket.find((x) => x.id === selectedItem.id);
    ItemInBasket.quantity += 1;
    //console.log(ItemInBasket);
    quantity = ItemInBasket.quantity;
    localStorage.setItem("data", JSON.stringify(basket));
    cartItemsDiv.innerHTML = '';
    generateCartItems();
    calcTotalPrice();
    calcCartItems();
};

let decrement = (id)=>{
    
    let selectedItem = id;
    let ItemInBasket = basket.find((x) => x.id === selectedItem.id);
    
    if(ItemInBasket.quantity === 1){
        ItemInBasket.quantity -= 1;
        selectedItem.remove();
        
        basket = basket.filter((item)=>item.quantity !== 0)
        localStorage.setItem("data", JSON.stringify(basket));
        calcTotalPrice();
        calcCartItems();
        return;

        //document.getElementById(`${ItemInBasket.id}`).remove();
        console.log(selectedItem.id);
        return;
    }else if(ItemInBasket.quantity > 1){
        ItemInBasket.quantity -= 1;
        localStorage.setItem("data", JSON.stringify(basket));
        calcTotalPrice();
        calcCartItems();
        generateCartItems();
    }
    

    /*
    basket = basket.filter((item)=>{
        item.quantity !== 0;
    })
    */
    
    //console.log(basket);
    quantity = ItemInBasket.quantity;
    localStorage.setItem("data", JSON.stringify(basket));
    cartItemsDiv.innerHTML = '';
    generateCartItems();
    
};

let calcTotalPrice = () =>{
    let totalPrice = document.getElementById('total-price');
    let amount = basket.map(item=>{
        return item.price * item.quantity
    }).reduce((prev, curr)=> prev + curr, 0).toFixed(2);
    
    //console.log(amount);

    totalPrice.textContent = `$${amount}`
}
/*
let calcCartItems = () =>{
    let itemsDiv = document.querySelector('.items-no');
    console.log(itemsDiv)
    let numberOfItems = basket.map(item=>{
        return item.quantity
    }).reduce((prev, curr)=> prev + curr, 0);
    localStorage.setItem("cartItems", numberOfItems);
    itemsDiv.textContent = `${localStorage.getItem(cartItems)}`

    console.log(numberOfItems);

}*/


function generateCartItems(){
    basket.forEach((item)=>{
        //console.log(item);
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('id', `${item.id}`)
        cartItem.innerHTML = `
            <div>
            <img src="${item.img}" alt="">    
            </div>
            <div class="product-details">
                <h3 class="product-name">${item.name}</h3>
                <p class="product-price">$${item.price}</p>
            </div>
            <div class="cart-btns">
                <i onclick="decrement(${item.id})"  class="bi bi-dash-lg"></i>
                <div id="quantity" class="quantity">${item.quantity}</div>
                <i onclick="increment(${item.id})" class="bi bi-plus-lg"></i>
            </div>
            <p class="product-subtotal">$ ${(item.price * item.quantity).toFixed(2)}</p>
            <span><i  class="fa-solid fa-x remove-item"></i></span>
            </div>
        `
        //console.log(cartItem); 
    
        cartItemsDiv.appendChild(cartItem);
    
        removeItem();
    })
};
calcCartItems();
calcTotalPrice();
generateCartItems();

/*
let generateCartItem = ()=>{
    let cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div>
        <img src="${basket[0].img}" alt="">    
        </div>
        <div class="product-details">
            <h3 class="product-name">${basket[0].name}</h3>
            <p class="product-price">$${basket[0].price}</p>
        </div>
        <div class="cart-btns">
            <i class="bi bi-dash-lg"></i>
            <div id="" class="quantity">${basket[0].quantity}</div>
            <i class="bi bi-plus-lg"></i>
        </div>
        <p class="product-subtotal">$ ${basket[0].price * basket[0].quantity}</p>
        <span><i class="fa-solid fa-x remove-item"></i></span>
        </div>
    `
    console.log(cartItem);

    cartItemsDiv.appendChild(cartItem);

    removeItem();
}

generateCartItem();
*/


/*
let addItemsBtns = document.querySelectorAll('.bi-plus-lg');
addItemsBtns.forEach(btn => btn.addEventListener('click', increment(btn.parentElement.parentElement)));


let decreaseItemsBtns = Array.from(document.querySelectorAll('.bi-dash-lg'));
for(let btn of decreaseItemsBtns){
    btn.addEventListener('click', console.log(btn.parentElement.parentElement));
}
    console.log(decreaseItemsBtns);
//decreaseItemsBtn.forEach(btn => btn);


let update= ()=>{
    let selectedItem = id;


};*/


