let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let products = [
    {
        "id": 1,
        "name": "Cartoon Astronaut T-shirt",
        "price": 998,
        "image": "image/products/f1.jpg"
    },
    {
        "id": 2,
        "name": "Men's T-shirt",
        "price": 689,
        "image": "image/products/f2.jpg"
    },
    {
        "id": 3,
        "name": "Beach T-shirt",
        "price": 758,
        "image": "image/products/f3.jpg"
    },
    {
        "id": 4,
        "name": "Monsoon T-shirt",
        "price": 845,
        "image": "image/products/f4.jpg"
    },
    {
        "id": 5,
        "name": "Crazy T-shirt",
        "price": 645,
        "image": "image/products/f5.jpg"
    },
    {
        "id": 6,
        "name": "Shirt with coat",
        "price": 4125,
        "image": "image/products/f6.jpg"
    },
    {
        "id": 7,
        "name": "plaza",
        "price": 2999,
        "image": "image/products/f7.jpg"
    },
    {
        "id": 8,
        "name": "Women's shirt",
        "price": 3565,
        "image": "image/products/f8.jpg"
    },
    {
        "id": 9,
        "name": "Formal T-shirt: Model 1",
        "price": 3214,
        "image": "image/products/n1.jpg"
    },
    {
        "id": 10,
        "name": "Formal T-shirt: Model 2",
        "price": 3213,
        "image": "image/products/n2.jpg"
    },
    {
        "id": 11,
        "name": "Classic T-shirt",
        "price": 1425,
        "image": "image/products/n3.jpg"
    },
    {
        "id": 12,
        "name": "T-shirt",
        "price":921,
        "image": "image/products/n4.jpg"
    },
    {
        "id": 13,
        "name": "Jeans T-shirt",
        "price": 1654,
        "image": "image/products/n5.jpg"
    },
    {
        "id": 14,
        "name": "Jeans short",
        "price": 987,
        "image": "image/products/n6.jpg"
    },
    {
        "id": 15,
        "name": "Formal T-shirt: Model 3",
        "price": 2999,
        "image": "image/products/n7.jpg"
    },
    {
        "id": 16,
        "name": "Black T-shirt",
        "price": 1999,
        "image": "image/products/n8.jpg"
    },
    
];

let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    // Clear existing HTML
    listProductHTML.innerHTML = '';

    // Add products
    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.dataset.id = product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML =
        `<img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart">
            Add to cart
        </button>`;
        listProductHTML.appendChild(newProduct);
    });
};

const addToCart = (product_id, size = 'M') => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id && value.size == size);
    if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1,
            size: size
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
    
            newItem.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">
                $${info.price * item.quantity}
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${item.quantity}</span>
                <span class="plus">></span>
            </div>
            <select class="sizeSelect">
                ${['S', 'M', 'L', 'XL'].map(size => `<option value="${size}" ${size === item.size ? 'selected' : ''}>${size}</option>`).join('')}
            </select>`;
            listCartHTML.appendChild(newItem);
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let size = positionClick.parentElement.parentElement.querySelector('.sizeSelect').value;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, size, type);
    }
});

listCartHTML.addEventListener('change', (event) => {
    let positionSelect = event.target;
    if(positionSelect.classList.contains('sizeSelect')){
        let product_id = positionSelect.parentElement.dataset.id;
        let newSize = positionSelect.value;
        changeSizeCart(product_id, newSize);
    }
});

const changeQuantityCart = (product_id, size, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id && value.size == size);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity += 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const changeSizeCart = (product_id, newSize) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        cart[positionItemInCart].size = newSize;
    }
    addCartToMemory();
};

const initApp = () => {
    addDataToHTML();
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
};

initApp();