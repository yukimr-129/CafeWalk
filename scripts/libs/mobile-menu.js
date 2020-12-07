class MobileMenu {
    constructor() {
        this.DOM = {};
        this.DOM.btn = document.querySelector('.mobile-menu__btn');
        this.DOM.cover = document.querySelector('.mobile-menu__cover');
        this.DOM.container = document.querySelector('#global-container');
        this.eventType = this.getEventType();
        this.addEvent();
    }

    getEventType() {
        return window.ontouchstart ? 'touchstart' : 'click';
    }

    toggle() {
        this.DOM.container.classList.toggle('menu-open');
    }

    addEvent() {
        this.DOM.btn.addEventListener(this.eventType, this.toggle.bind(this));
        this.DOM.cover.addEventListener(this.eventType, this.toggle.bind(this));
    }
}