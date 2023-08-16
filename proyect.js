

function openCheckoutSection(){
    window.location = "checkout.html";
}

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else{
    ready();
}

function ready(){
    var addToCartButtons = document.getElementsByClassName('add_to_cart_button');
    for (var i = 0; i < addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    var quantityInputs = document.getElementsByClassName('quantity_input');
    for (var i = 0; i < quantityInputs.length; i++){
        var quantity_input = quantityInputs[i];
        quantity_input.addEventListener('change', quantityChanged);
    }

    var removeItemButtons = document.getElementsByClassName('remove_button');
    for (var i = 0; i < removeItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var tip_options = document.getElementsByName('tip_option');
    for (var i = 0; i < tip_options.length; i++){
        tip_option = tip_options[i];
        tip_option.addEventListener('click', returnTip);
    }

    var pickup_and_delivery = document.getElementsByName('pickup_and_delivery_options');
    for (var i = 0; i < pickup_and_delivery.length; i++){
        option = pickup_and_delivery[i];
        option.addEventListener('click',showDeliveryOption);
    }

    var login_button = document.getElementById('login_button');
    login_button.addEventListener('click', function(){
        window.location = 'login_page.html';
    })

    var payment_options = document.getElementsByName('payment_Options');
    for (var i = 0; i < payment_options; i++){
        payment = payment_options[i];
        payment.addEventListener('click', openCardSection);
    }

    document.getElementById('place_order_button').addEventListener(click, function(){
        window.alert("Your order has been placed. Thank you for your order")
    })
}

function openCardSection(event){
    console.log(event.target);
}


function addToCartClicked(event){
    var button = event.target;
    var menuItem = button.parentElement;
    var itemName = menuItem.getElementsByClassName('item_name')[0].innerText;
    var price;
    var sizes = menuItem.getElementsByClassName('size_options');
    var size_name = "";
    for (var i = 0; i < sizes.length; i++){
        if (sizes[i].checked){
            price = menuItem.getElementsByClassName('item_price')[i].innerText;

            switch (i){
                case 0:
                    size_name = "Small";    
                    break;          
                case 1:
                    size_name = "Medium";
                    break;
                default:
                    size_name = "Large";
            }
        }
        sizes[i].checked = false;
    }

    itemName = size_name + " " + itemName;
    addItemToCart(itemName, price);
    updateCartSubtotal();
}

function addItemToCart(item_name, price){
    var item_row = document.createElement('div');
    item_row.classList.add('item_row');
    var cartItems = document.getElementById('order_content');
    var cartItemNames = cartItems.getElementsByClassName('order_item_description');
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == item_name){
            alert('This item is already added to the cart');
            return
        }
    }

    var itemRowContent = `
    <div class="order_item_description">${item_name}</div>
    <div class="edit_item">
        <div class="quantity_container">
            Qty:<input class="quantity_input" type="number" value="1">
        </div>
        <div class="order_item_price">${price}</div>
        <div class="remove_button_container">
            <button class="remove_button">remove</button>
        </div>
    </div>`
    item_row.innerHTML = itemRowContent;
    cartItems.append(item_row);
    item_row.getElementsByClassName('remove_button')[0].addEventListener('click', removeCartItem)
    item_row.getElementsByClassName('quantity_input')[0].addEventListener('change',quantityChanged)
}

function removeCartItem(event){
    var button = event.target;
    button.parentElement.parentElement.parentElement.remove()
    updateCartSubtotal()
}

function returnTip(event){
    var val = event.target.value;
    var tip = 0;
    var tax = parseFloat(document.getElementById('tax_amount').innerText.replace('$', ''));
    var subtotal = parseFloat(document.getElementById('subtotal_price_amount').innerText.replace('$', ''));
    if (val == "custom_tip" && this.checked){
        document.getElementById('custom_tip_input_container').style.display = "block";
        document.getElementById('apply_custom_tip_button').addEventListener('click', function(){
            tip = parseFloat(document.getElementById('custom_tip_input').value);
            total = subtotal + tip + tax;
            document.getElementById('tip_amount').innerText = '$' + tip.toFixed(2);
            document.getElementById('total_amount').innerText = '$' + total.toFixed(2);
        })
    } else {
        document.getElementById('custom_tip_input_container').style.display = "none";
        if (val == "0.15" || val == "0.18" || val == "0.2"){
            tip = parseFloat(val) * subtotal;
            total = subtotal + tip + tax;
            document.getElementById('tip_amount').innerText = '$' + tip.toFixed(2);
            document.getElementById('total_amount').innerText = '$' + total.toFixed(2);
        } else{
            total = subtotal + tax
            document.getElementById('tip_amount').innerText = '$' + tip.toFixed(2);
            document.getElementById('total_amount').innerText = '$' + total.toFixed(2);
        }
    }
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartSubtotal();
}

function updateCartSubtotal(){
    var cart_item = document.getElementById('order_content');
    var item_rows = cart_item.getElementsByClassName('item_row');
    var subtotal = 0;
    var tip = 0;
    for (var i = 0; i < item_rows.length; i++){
        var item_row = item_rows[i];
        var price = parseFloat(item_row.getElementsByClassName('order_item_price')[0].innerText.replace('$', ''));
        var quantity = item_row.getElementsByClassName('quantity_input')[0].value;
        subtotal += (price * quantity)
    }
    var tax = getTax(subtotal);
    var total = subtotal + tax + tip;
    document.getElementById('subtotal_price_amount').innerText = '$' + subtotal.toFixed(2);
    document.getElementById('tip_amount').innerText = '$' + tip.toFixed(2);
    document.getElementById('tax_amount').innerText = '$' + tax.toFixed(2)
    document.getElementById('total_amount').innerText = '$' + total.toFixed(2);
}

function showDeliveryOption(event){
    if(event.target.value == "Delivery"){
        document.getElementById('delivery_address_container').style.display = "block";
    } else{
        document.getElementById('delivery_address_container').style.display = "none";
    }
}

function getTax(subtotal){
    return subtotal * 0.08875;
}

