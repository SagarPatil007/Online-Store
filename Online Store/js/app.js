if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}



function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    console.log(removeCartItemButtons);
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', 'quantityChanged')
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClickded)
    }
}

function addToCartClickded(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)
    addTocart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItem = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItem.getElementsByClassName('cart-item-title')
    for(var i=0;i< cartItemNames.length;i++)
    {
        if(cartItemNames[i].innerText== title)
        {
            alert("This item is already in your cart ,please check your cart...")
            return
        }
    }
    var cartRowContent = `
            <div class="col-xs-6 col-md-4">
                <div class="card">
                    <img src="${imageSrc}" alt="Denim Jeans" style="width:100%" class="shop-item-image">
                    <h1= class="shop-item-title">${title}</h1>
                    <p class="shop-item-price">${price}</p>
                    <p>Some text about the jeans..</p>
                    <p><button onclick="popup()">Add to Cart</button></p>
                </div>
            </div> `
    cartRow.innerHTML =cartRowContent
    cartItem.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem())
    cartRow.getElementsByClassName('cart-quantity-input',)[0].addEventListener('change',quantityChanged())

}

function removeCartItem(event) {
    var buttonClicked = event.targert
    buttonClicked.parentElement.parentElement.remove();
    updateCArtTotal();
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCArtTotal();

}

function updateCArtTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRows = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        console.log(priceElement, quantityElement);
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
} 
