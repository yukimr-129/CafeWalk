document.addEventListener('DOMContentLoaded', function () {
    const main = new Main();
});

class Main{
    constructor(){
        this.header = document.querySelector('.header');
        this.sides = document.querySelectorAll('.side');
        this._observers = [];
        this.init();
    }

    set setObservers(val){
        this._observers.push(val);
    }

    get getObservers(){
        return this._observers;
    }

    init(){
        new MobileMenu();
        this.hero = new HeroSlider('.swiper-container');
        Pace.on('done', this.paceDone.bind(this));
    }

    paceDone(){
        this.scrollinit();
    }

    //スクロール時にテキストにアニメーション設定
    textAnimation(el, inview) {
        if(inview) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }
    
    //スクロール時にヘッダーの背景色を表示
    navAnimation(el, inview){
        if(inview){
            this.header.classList.remove('triggered');
        }else{
            this.header.classList.add('triggered');
        }
    }

    //両サイドのSNS・コピーライトのアニメーション
    sideAnimation(el, inview){
        if(inview){
            this.sides.forEach(side => {
                side.classList.add('inview');
            });
        }else{
            this.sides.forEach(side => {
                side.classList.remove('inview');
            });
        }
    }

    //スクロール時に画像をインさせる
    inviewAnimation = function(el, inview){
        if(inview){
            el.classList.add('inview');
        }else{
            el.classList.remove('inview');
        }
    }

    //画面内に入った時スライドアニメーション実行　画面外の時はストップ
    toggleSlideAnimation(el, inview){
        if(inview){
            this.hero.start();
        }else{
            this.hero.stop();
        }
    }

    //インスタンス生成
    scrollinit(){
        this.setObservers = new ScrollObserver('.tween-animate-title', this.textAnimation, {rootMargin: "-400px 0px"});
        this.setObservers = new ScrollObserver('.cover-slide', this.inviewAnimation);
        this.setObservers = new ScrollObserver('.nav-trigger', this.navAnimation.bind(this), {once: false});
        this.setObservers = new ScrollObserver('.swiper-container', this.toggleSlideAnimation.bind(this), {once: false});
        this.setObservers = new ScrollObserver('.appear', this.inviewAnimation);
        this.setObservers = new ScrollObserver('#main-content', this.sideAnimation.bind(this), {once: false, rootMargin: "-400px 0px"});
    }
}
