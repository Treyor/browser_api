class Slider extends HTMLElement {
    constructor() {
        super();

        this.items = ['pepesad.png','dev_moment.jpg','oh_shiiiii.jpg'];
        this.active_slide = 0;
    }

    hideSlides() {
        document.querySelectorAll('[data-slide-id]').forEach((slide, i) => {
            console.log(slide)
            slide.setAttribute('data-active', false)
        })
    }

    bindEvents() {
        const addBtn = document.querySelector('[data-action="add"]');
        const subtractBtn = document.querySelector('[data-action="subtract"]');

        console.log(addBtn)


        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideSlides();

            this.active_slide += 1;
         
            console.log(this.active_slide)
            const currentSlide = document.querySelector(`[data-slide-id="${this.active_slide}"]`);
            currentSlide.setAttribute('data-active', true)
        })

        subtractBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideSlides();

            this.active_slide -= 1;

            console.log(this.active_slide)

            const currentSlide = document.querySelector(`[data-slide-id="${this.active_slide}"]`);
            currentSlide.setAttribute('data-active', true)
        })

    }

    connectedCallback() {
        this.innerHTML = `
        <div style="width: 99vw; height: 98vh; display: flex;">
            <button style="width: 5%; margin: auto;" data-action="subtract">-</button>
            <div style="width: 90%; display: flex;">
                ${this.items.map((item, i) => {
                    return `<web-slide data-slide-id=${i} data-active=${this.active_slide == i ? true : false} data-img=${item}></web-slide>`
                })}

                <div data-slide-id=${this.items.length} data-active=${this.active_slide == this.items.length ? true : false}>
                    <div id="wrap">
                        <div class="container">
                            <div class="page-header">
                                <h3>Пузырьковая сортировка 50 тысяч элементов</h3>
                            </div>
                            <p class="lead" style="text-align: center;">
                                <button class="btn btn-large" onclick="javascript:nonWebWorker();">Without Web Worker</button>
                                <button class="btn btn-success btn-large" onclick="javascript:withWebWorker();">With Web Worker</button>
                            </p>
                            
                            <div id="progressbar" class="progress progress-striped active hide">
                                <div class="bar" style="width: 100%;"></div>
                            </div>
                    
                            <div id="resultBox" class="well well-large hide">
                                <p class="muted">
                                    Массив был отсортирован:
                                </p>
                                <h1 id="timespent"></h1>
                                <p id="withoutWW" style="font-size: 18px;font-weight: 200;line-height: 24px;color: inherit;margin-top:20px" class="hide">
                                    Как вы могли заметить, без веб-воркера браузер всё же смог отсортировать массив из 50 тысяч элементов, но в это время браузер не в состоянии обрабатывать другие задачи.
                                </p>
                                <p id="withWW" style="font-size: 18px;font-weight: 200;line-height: 24px;color: inherit;margin-top:20px" class="hide">
                                    Браузер отсортировал 50 тысяч элементов без каких-либо ошибок и тормозов, потому что скрипт, запущенный в веб-воркере, выполняется в другом потоке браузера.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button style="width: 5%; margin: auto;" data-action="add">+</button>
        </div>
        `

        this.bindEvents();
    }

    static get observedAttributes() {
        return ['data-active'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name)
        // вызывается при изменении одного из перечисленных выше атрибутов
    }
  }
  
  customElements.define("web-slider", Slider);