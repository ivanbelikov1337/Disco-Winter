// Burger Menu

const hamb = document.querySelector("#hamburger");
const popup = document.querySelector("#popup");
const body = document.body;
const menu = document.querySelector("#menu").cloneNode(1);
hamb.addEventListener("click", hambHandler);
function hambHandler(e) {
    e.preventDefault();
    popup.classList.toggle("open");
    hamb.classList.toggle("active");
    body.classList.toggle("noscroll");
    renderPopup();
}
function renderPopup() {
    popup.appendChild(menu);
}

const links = Array.from(menu.children);

links.forEach((link) => {
    link.addEventListener("click", closeOnClick);
});

function closeOnClick() {
    popup.classList.remove("open");
    hamb.classList.remove("active");
    body.classList.remove("noscroll");
}

// --------------------------------------------------------------------------------------------------------------------
// Scroll on top

const btnUp = {
    el: document.querySelector('.btn-up'),
    show() {
        this.el.classList.remove('btn-up_hide');
    },
    hide() {
        this.el.classList.add('btn-up_hide');
    },
    addEventListener() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollY > 400 ? this.show() : this.hide();
        });
        document.querySelector('.btn-up').onclick = () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}
btnUp.addEventListener();
// --------------------------------------------------------------------------------------------------------------------
// Navigation menu

const activeNavigation = {
    addEventListener() {
        document.querySelector('.active-navigation').onclick = () => {
            window.scrollTo({
                top: 280,
                behavior: 'smooth'
            });
        }
        document.querySelector('.active-navigation1').onclick = () => {
            window.scrollTo({
                top: 1080,
                behavior: 'smooth'
            });
        }
        document.querySelector('.active-navigation2').onclick = () => {
            window.scrollTo({
                top: 180,
                behavior: 'smooth'
            });
        }
        document.querySelector('.active-navigation3').onclick = () => {
            window.scrollTo({
                top: 2850,
                behavior: 'smooth'
            });
        }
        document.querySelector('.active-navigation4').onclick = () => {
            window.scrollTo({
                top: 2080,
                left: 0,
                behavior: 'smooth'
            });
        }
        document.querySelector('.active-navigation5').onclick = () => {
            window.scrollTo({
                top: 5100,
                behavior: 'smooth'
            });
        }
    }
}
activeNavigation.addEventListener();
// --------------------------------------------------------------------------------------------------------------------
// Sub menu

document.getElementById('submenuActive').onmouseover = function (event) {
    let target = event.target;
    if (target.className == "menu-list__items") {
        let s = target.getElementsByClassName("submenu")
        closeMenu();
        s[0].style.display = "block"
    }
}
document.onmouseover = function (event) {
    let target = event.target
    console.log(event.target)
    if (target.className != "menu-list__items" && target.className !="submenu") {
        closeMenu()
    }
}
function closeMenu() {
    let menu = document.getElementById("submenuActive")
    let subm = document.getElementsByClassName("submenu")
    for (let i = 0; i < subm.length; i++) {
        subm[i].style.display = "none"
    }
}
// ---------------------------------------------------------------------------------------------------------------------
// Preloader

function loadData() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 5000);
    })
}
loadData()
    .then(() => {
        let preloaderEl = document.getElementById('preloader');
        preloaderEl.classList.add('hidden');
        preloaderEl.classList.remove('visible');
    });
// ------------------------------------------------------------------------------------------------------------------
// Slide

let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides")
    let dots   = document.getElementsByClassName("dot")

    if (n >slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].cllasName = dots[i].className.replace("active", "")
    }
    slides[slideIndex- 1].style.display = "block";
}
// ------------------------------------------------------------------------------------------------------------------
// Basket

let d = document,
    itemBox = d.querySelectorAll('.item_box'),
    cartCont = d.getElementById('cart_content');
function addEvent(elem, type, handler){
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    } else {
        elem.attachEvent('on'+type, function(){ handler.call( elem ); });
    }
    return false;
}
function getCartData(){
    return JSON.parse(localStorage.getItem('cart'));
}
function setCartData(o){
    localStorage.setItem('cart', JSON.stringify(o));
    return false;
}
function addToCart(e){
    this.disabled = true;
    let cartData = getCartData() || {},
        parentBox = this.parentNode,
        itemId = this.getAttribute('data-id'), // ID товара
        itemTitle = parentBox.querySelector('.item_title').innerHTML,
        itemPrice = parentBox.querySelector('.item_price').innerHTML;
    if(cartData.hasOwnProperty(itemId)){
        cartData[itemId][2] += 1;
    } else {
        cartData[itemId] = [itemTitle, itemPrice, 1];
    }
    if(!setCartData(cartData)){
        this.disabled = false;
    }
    return false;
}
for(let i = 0; i < itemBox.length; i++){
    addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}
function openCart(e){
    let cartData = getCartData(),
        totalItems = '';
    if(cartData !== null){
        totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th><th>Кол-во</th></tr>';
        for(let items in cartData){
            totalItems += '<tr>';
            for(let i = 0; i < cartData[items].length; i++){
                totalItems += '<td>' + cartData[items][i] + '</td>';
            }
            totalItems += '</tr>';
        }
        totalItems += '</table>';
        cartCont.innerHTML = totalItems;
    } else {
        cartCont.innerHTML = 'В корзине пусто!';
    }
    return false;
}
addEvent(d.getElementById('checkout'), 'click', openCart);
addEvent(d.getElementById('clear_cart'), 'click', function(e){
    localStorage.removeItem('cart');
    cartCont.innerHTML = 'Корзина очишена.';
});
// ---------------------------------------------------------------------------------------------------------------------
// Modal
let open_modal = document.querySelectorAll('.open_modal');
let close_modal = document.getElementById('close_modal');
let modal = document.getElementById('modal');
for (let i = 0; i < open_modal.length; i++) {
    open_modal[i].onclick = function() { // клик на открытие
        modal.classList.add('modal_vis'); // добавляем видимость окна
        modal.classList.remove('bounceOutDown'); // удаляем эффект закрытия
        // body.classList.add('body_block'); // убираем прокрутку
    };
}
close_modal.onclick = function() { // клик на закрытие
    modal.classList.add('bounceOutDown'); // добавляем эффект закрытия
    window.setTimeout(function() { // удаляем окно через полсекунды (чтобы увидеть эффект закрытия).
        modal.classList.remove('modal_vis');
        body.classList.remove('body_block'); // возвращаем прокрутку
    }, 500);
};
