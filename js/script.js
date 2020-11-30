const body = document.querySelector('body');
const navCatItems = document.querySelectorAll('.nav-categories__item');
const navRubrMenu = document.querySelector('.nav-rubrics');
//listening nav-categories menu
for (let i = 0; i < navCatItems.length; i++) {
    const e = navCatItems[i];
    e.addEventListener('click',()=>{
        navCatMenu.checkClasses(e);
        navCatMenu.activeItem(e);
    });
};
//listening wrapper__nav-opener
const navOpener = document.querySelector('.wrapper__nav-opener');
const navContainer = document.querySelector('.wrapper__nav-container');
navOpener.addEventListener('click',()=>{
    if(navContainer.classList.contains('open')){
        navCatMenu.closeMenu(navContainer);
        navCatMenu.closeMenu(navOpener);
    }else{
        navCatMenu.activeMenu(navContainer);
        navCatMenu.activeMenu(navOpener);
    };
});
//methods for nav-categories menu
const navCatMenu = {
    //checking classes to avoid appearing of several active elements
    checkClasses(e){
        for (let i = 0; i < navCatItems.length; i++) {
            if(navCatItems[i] === e){
                if(e.classList.contains('active') && !navRubrMenu.classList.contains('open')){
                    this.activeMenu(navRubrMenu); 
                    continue; 
                }else if(e.classList.contains('active') && navRubrMenu.classList.contains('open')){
                    this.closeMenu(navRubrMenu); 
                    continue; 
                }
            };
            const a = navCatItems[i];
            if(a.classList.contains('active')){
                return a.classList.remove('active');
            };
        };
    },
    //adding active class to nav-categories item
    activeItem(e){
        if(e.classList.contains('active')){
            return;
        };
        e.classList.add('active');
        this.activeMenu(navRubrMenu);
    },
    //show nav-rubrics menu
    activeMenu(e){
        e.classList.add('open');
    },
    closeMenu(e){
        e.classList.remove('open');
    },
};
//removing class open from nav container if orinentation change
window.addEventListener('orientationchange',()=>{
    if(navContainer.classList.contains('open')){
        navCatMenu.closeMenu(navContainer);
        navCatMenu.closeMenu(navOpener);
        if (window.innerHeight < window.innerWidth) {
            
        };
    };
});

//nav-rubrics select
const navRubrMenuSelect = document.querySelector('.nav-rubrics__header');
const navRubrMenuSelectItems = document.querySelector('.nav-rubrics__list');
const navRubrMenuSelectItemsHEIGHT = navRubrMenuSelectItems.offsetHeight;
const navRubrMenuSelectImage = document.querySelector('.nav-rubrics__select-image');
//listening nav-rubrics select
navRubrMenuSelect.addEventListener('click',()=>{
    if(navRubrMenuSelectImage.classList.contains('active')){
        navRubrMethods.removeClass();
    }else if(!navRubrMenuSelectImage.classList.contains('active')){
        navRubrMethods.addClass();
    };

});
//nav-rubrics methods 
const navRubrMethods = {

    addClass(){
        navRubrMenuSelectImage.classList.add('active');
        navRubrMenuSelectItems.classList.add('active');
        this.removeMargin();
    },
    addMargin(){
        navRubrMenuSelectItems.style.margin = `0px 0px ${20 - navRubrMenuSelectItemsHEIGHT}px 0px`
    },

    removeClass(){
        navRubrMenuSelectImage.classList.remove('active');
        navRubrMenuSelectItems.classList.remove('active');
        this.addMargin();
    },
    removeMargin(){
        navRubrMenuSelectItems.style.margin = `0px 0px 30px 0px`
    },

};
//adding margin for correct initial display
navRubrMethods.addMargin();

//chat header menus opening logic
const menus = document.querySelectorAll('.menu');
for (let i = 0; i < menus.length; i++) {
    const menuContainer = menus[i];
    menuContainer.addEventListener('click',(e)=>{
        if(e.target.closest('.menu') || e.target.classList.contains('menu')){
            const severalMenus = headerMenusMethods.activeMenusCounter();
            const menu = menuContainer.querySelector('.menu-list');
            const triangle = menuContainer.querySelector('.triangle');
            if(e.target.classList.contains('closer') || e.target.classList.contains('menu-list__closer')){
                headerMenusMethods.closeMenu(triangle,menu);
                return
            };
            if(!menu.classList.contains('active')){
                if(severalMenus === 1){
                    headerMenusMethods.zindexRaise(menu);
                    headerMenusMethods.openMenu(triangle,menu);
                }else{
                    headerMenusMethods.openMenu(triangle,menu);
                }
                
            }else{
                if(severalMenus === 2 && menu.style.zIndex === '26'){
                    headerMenusMethods.zindexRaise(menu);
                }else{
                    headerMenusMethods.closeMenu(triangle,menu);
                }
                
            };
        };
    });
};

// functions for header menus opening
const headerMenusMethods = {
    openMenu(triangle,menu){
        if(window.matchMedia("(min-width: 450px)").matches){
            menu.classList.add('active');
            this.styleEditor(true,triangle);
        }else{
            menu.classList.add('active');
        }
    },
    closeMenu(triangle,menu){
        if(window.matchMedia("(min-width: 450px)").matches){
        menu.classList.remove('active');
        this.styleEditor(false,triangle);
        }else{
            menu.classList.remove('active');
            this.styleEditor(false,triangle);
        }
    },
    styleEditor(e,triangle){
        if(e === true){
            triangle.style.transition = `all 1.5s ease 0s`;
            triangle.style.opacity = '1';
            triangle.style.visibility = 'visible';
        }else{
            triangle.style.transition = `all 0.4s ease 0s`;
            triangle.style.opacity = '0';
            triangle.style.visibility = 'hidden';
        }
    },
    activeMenusCounter(){
        let counter = 0;
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i].querySelector('.menu-list');
            if(menu.classList.contains('active'))counter++;  
        };
        return counter;
    },
    zindexRaise(menu){
        for (let i = 0; i < menus.length; i++) {
            const e = menus[i].querySelector('.menu-list');
            if (e === menu) {
                e.style.zIndex = '27';
            }else{
                e.style.zIndex = '26';
            }
        }
    },
    closeAllMenus(){
        for (let i = 0; i < menus.length; i++) {
            const menu = menus[i].querySelector('.menu-list');
            const triangle = menus[i].querySelector('.triangle');
            menu.classList.remove('active');
            this.styleEditor(false,triangle);
        }
    },
};

// opening user info sidebar
const person = document.querySelectorAll('#person');
const personInfoMenu = document.querySelector('.person-info');
const contentInner = document.querySelector('.content__inner');
const closeUserInfoButton = document.querySelector('.person-info__close-button');
const personInfoBackground = document.querySelector('.person-info__background');

for (let i = 0; i < person.length; i++) {
    const e = person[i];
    e.addEventListener('click',()=>{
        personInfoMethods.open(personInfoMenu,contentInner);
    });
};

closeUserInfoButton.addEventListener('click',()=>{
    personInfoMethods.close(personInfoMenu,contentInner);
});
personInfoBackground.addEventListener('click',()=>{
    personInfoMethods.close(personInfoMenu,contentInner);
});

//functions for opening user info sidebar
const personInfoMethods = {
    open(sidebar,chatContent){
        sidebar.classList.add('open');
        if (window.matchMedia("(min-width: 830px)").matches) {
            chatContent.classList.add('person');
        }else if(window.matchMedia("(max-width: 526px)").matches){
            personInfoBackground.classList.add('open');
        };
    },
    close(sidebar,chatContent){
        sidebar.classList.remove('open');
        chatContent.classList.remove('person');
        personInfoBackground.classList.remove('open');
    },
    backgroundListening(){

    },
};

//content__chat-inner height fix
const chatInner = document.querySelector('.content__chat-inner');
const chat = document.querySelector('.content__chat');

chatInner.style.minHeight = `${chat.offsetHeight}px`;

//search opening for < 590px screens / listening header menu items
const menuItems = document.querySelectorAll('.header__menu-item');
const menuSearch = document.querySelector('.header__search');
for (let i = 0; i < menuItems.length; i++) {
        const menuItem = menuItems[i];
        menuItem.addEventListener('click',()=>{
            if (window.matchMedia("(max-width: 590px)").matches) {
                if(menuItem.querySelector('p').textContent === 'Search'){
                    headerMenusMethods.closeAllMenus();
                    menuItemsMethods.openSearch(menuSearch);
                    menuItemsMethods.listening();
                    if(navContainer.classList.contains('open')){
                        navCatMenu.closeMenu(navContainer);
                        navCatMenu.closeMenu(navOpener);
                    }
                }
            } 
        });
}
const menuItemsMethods = {
    openSearch(e){
        e.classList.add('open');
    },
    closeSearch(e){
        e.classList.remove('open');
    }, 
    listening(){
        function searchCloser(event){
            if(event.target.closest('.header__search')){
                return
            }else{
                menuItemsMethods.closeSearch(menuSearch);
                body.removeEventListener('click',searchCloser,false);
            }
        }
        setTimeout(() => {
            body.addEventListener('click',searchCloser,false);
        }, 1000);
    }   
};

//images opening
const chatImages = document.querySelectorAll('.message__message-pic');
const imageWindow = document.querySelector('.single-photo');
const imageWindowClosers = document.querySelectorAll('.single-photo-closer');
const imageWindowBackground = document.querySelector('.single-photo__background');
for (let i = 0; i < chatImages.length; i++) {
    const chatImage = chatImages[i].querySelector('img');
    chatImage.addEventListener('click',()=>{
        chatImagesMethods.openImage(imageWindow,imageWindowBackground);
    });
};
imageWindowClosers.forEach(element => {
    element.addEventListener('click',()=>{
        chatImagesMethods.closeImage(imageWindow,imageWindowBackground);
    });
});

//methods for opening any chat image
const chatImagesMethods = {
    openImage(imageWindow,imageBackground){
        imageWindow.classList.add('open');
        imageBackground.classList.add('open');

    },
    closeImage(imageWindow,imageBackground){
        imageWindow.classList.remove('open');
        imageBackground.classList.remove('open');
    },
}; 

//polyphill( for closest) for stupid ie 
(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));