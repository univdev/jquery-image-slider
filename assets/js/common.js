(function() {

    function on(event, selector, callback) {
        $(document).on(event, selector, callback);
    }

    var slider = {
        target: null,
        movement: null,
        duration: 600,
        current: 0,
        clock: 3000,
        interval: null,
        init() {
            this.target = $('.slider-container');
            this.movement = this.target.find('.slider-container__movement');
        },
        move(n) {
            clearTimeout(this.interval);

            n = this.filter(n);
            this.current = n;

            var left = -100 * n;
            this.movement.clearQueue().stop();

            this.movement.animate({
                left: `${left}%`
            }, {
                duration: this.duration,
                complete: () => {
                    slider.setActive();
                }
            });

            this.interval = setTimeout(() => {
                this.move(this.current + 1);
            }, this.clock);
        },
        filter(n) {
            var length = this.movement.find('.slider-container__child').length;

            return n < 0 ? length - 1 : n >= length ? 0 : n;
        },
        prev() {
            this.move(this.current - 1);
        },
        next() {
            this.move(this.current + 1);
        },
        setActive() {
            var child = this.movement.find('.slider-container__child');
            child.removeClass('__active');
            $(child[this.current]).addClass('__active');
        },
    };

    slider.init();
    slider.move(0);

    on('click', '.slider-container__options .slider-container__button.prev', function() {
        slider.prev();
    });

    on('click', '.slider-container__options .slider-container__button.next', function() {
        slider.next();
    });

    on('click', '.buttons .button', function() {
        var index = $(this).index();
        slider.move(index);
    })
})()