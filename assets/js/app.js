(function () {
    'use strict';

    svg4everybody();

    let video = document.querySelector('.hero__video-file');
    enableInlineVideo(video, {
        iPad: true
    });

    $(function(){
        $('.button-arrow-down').click(function () {
            let win = $(window).height();

            $('body,html').animate({
                scrollTop: win
            }, 800);

            return false;
        });

        $('.button-arrow-up').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);

            return false;
        });
    });
})();
(function () {
    'use strict';

    let hero = document.querySelector(".hero_welcome"),
        heroContainer = document.querySelector(".hero__container_welcome"),
        authButton = document.querySelector(".auth-button"),
        back = document.querySelector(".hero__container-back"),
        menuFlip = document.querySelector('.form-menu__item_flip a');

    let flip = function (e) {
        let c = heroContainer.classList;

        if (e.target == authButton) {
            authButton.style.display = 'none';
            c.toggle('flipped');
        } else {
            if ((authButton.style.display == 'none' && !back.contains(e.target)) || e.target == menuFlip) {
                authButton.style.display = 'block';
                c.toggle('flipped');
            }
        }
    };

    if (hero) {
        hero.addEventListener('click', flip);
    }
})();
(function () {
    'use strict';

    let ham = document.querySelector('.hamburger'),
        menu = document.querySelector('.menu');

    let openMenu = function () {
        ham.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    }

    if (ham) {
        ham.addEventListener('click', openMenu);
    }
})();

(function () {
    'use strict';

    let container = document.querySelector('.hero_welcome');

    let parallaxMouse = (function () {
        let layer = document.querySelector('.hero__bg'),
            container = document.querySelector('.hero_welcome');

        return {
            move: function (layer, pageX, pageY, rate) {
                let initialX = (window.innerWidth / 2) - pageX,
                    initialY = (window.innerHeight / 2) - pageY,
                    positionX = initialX * rate,
                    positionY = initialY * rate;

                layer.style.transform = `translate3d(${positionX}px, ${positionY}px, 0)`;
            },
            init: function (pageX, pageY) {
                this.move(layer, pageX, pageY, 0.05);
            }
        }
    })();

    let parallaxScroll = (function () {
        let bg = document.querySelector('.hero__bg'),
            pic = document.querySelector('.hero__section-pic'),
            user = document.querySelector('.user');

        return {
            move: function (layer, wScroll, rate) {
                let scroll = wScroll / rate + '%';

                layer.style.transform = `translate3d(0, ${scroll}, 0)`;
            },
            init: function (wScroll) {
                this.move(bg, wScroll, 65);
                this.move(pic, wScroll, 45);
                this.move(user, wScroll, 15);
            }
        }
    })();

    window.addEventListener('scroll', () => {
        let wScroll = window.pageYOffset;

        parallaxScroll.init(wScroll);
    });

    if (container) {
        container.addEventListener('mousemove', e => {
            parallaxMouse.init(e.pageX, e.pageY);
        });
    }

})();
(function () {
    'use strict';

    let animateSkills = (function () {

        let checkDistance = function (scrollTop, elem) {
            let offset = elem.offset().top;
            let topBorder =  offset + elem.height() - scrollTop - $(window).height();

            return topBorder <= 0;
        };

        return {
            init: function () {
                $(window).on('scroll', function () {
                    let scrollTop = $(window).scrollTop();
                    let elems = $('.skill');
                    let counter = 0;

                    elems.each(function () {
                        let $this = $(this);
                        let elem = $this.find('.skill__circle');

                        if (!elem.hasClass('skill__circle_animated') && checkDistance(scrollTop, $this)) {
                            counter++;
                            setTimeout(function () {
                                elem.addClass('skill__circle_animated');
                            }, 200 * counter);

                        }
                    });
                })
            }
        }
    })();

    $(function () {
        animateSkills.init();
    });
})();
(function () {
    let preloader = (function(){
        let percentsTotal = 0;
        let preloader = $('.preloader');

        let imgPath = $('*').map(function (ndx, element) {
            let background = $(element).css('background-image');
            let isImg = $(element).is('img');
            let isVideo = $(element).is('video');
            let path = '';

            if (background != 'none') {
                path = background.replace('url("', '').replace('")', '');
            }

            if (isImg) {
                path = $(element).attr('src');
            }

            if (isVideo) {
                path = $(element).attr('src');
            }

            if (path) return path;
        });

        let setPercents = function(total, current) {
            let percents = Math.ceil(current / total * 100);

            $('.preloader__percent').text(percents + '%');

            if (percents >= 100) {
                preloader.fadeOut(500);
            }
        };

        let loadImages = function(images) {

            if (!images.length) preloader.fadeOut();

            images.forEach(function(img, i, images){
                let fakeImage = $('<img>', {
                    attr : {
                        src : img
                    }
                });

                fakeImage.on('load error', function(){
                    percentsTotal++;
                    setPercents(images.length, percentsTotal);
                });
            });

        };

        return {
            init: function () {
                let imgs = imgPath.toArray();

                loadImages(imgs);
            }
        }
    }());

    $(function () {
        preloader.init();
    });
})();
(function () {
    'use strict';

    let blogMenu = function () {

        let nav = $('.blog-nav');
        let navTop = nav.parent().offset().top;
        let post = $('.post');
        let posts = $('.blog__posts');
        let navList = $('.blog-nav__list');
        let navItems = $('.blog-nav__item');
        let navLinks = $('.blog-nav__link');
        let swipe = $('.blog__swipe-area');

        let checkDistance = function (scrollTop, elem) {
            let offset = elem.offset().top;
            let wMargin = Math.ceil($(window).height() / 3);
            let topBorder = offset - scrollTop - wMargin;
            let scrollEnd = $(document).height() - $(window).height();
            // let bottomEdge = elem.outerHeight() + offset;
            // let bottomBorder = scrollTop + wMargin - bottomEdge;

            //return topBorder <= 0 && bottomBorder <= 0;
            return topBorder <= 0 || (scrollTop == scrollEnd && elem.next());
        };

        return {
            init: function () {
                $(window).on('scroll', function () {
                    let scrollTop = $(window).scrollTop();
                    let blogBottomBorder = scrollTop + $(window).height()
                        - posts.offset().top - posts.outerHeight();
                    let scrollMax = scrollTop + navList.height() - posts.offset().top - posts.outerHeight();

                    if (blogBottomBorder < 0) {
                        nav.outerHeight($(window).height());
                    } else {
                        nav.outerHeight($(window).height() - blogBottomBorder);
                    }

                    if (scrollTop < navTop) {
                        //nav.css('margin-top', 0)
                        // nav.css('position', 'static');
                        //nav.css('top', 0);
                        nav.stop().animate({top: 0}, 300);

                    } else {
                        if (scrollMax < 0) {
                            //nav.css('margin-top', `${scrollTop - navTop}px`);
                            //nav.css('top', `${scrollTop - navTop}px`);
                            nav.stop().animate({top: `${scrollTop - navTop}`}, 300);
                        }
                        // nav.css('position', 'fixed');
                    }

                    post.each(function (index) {
                        if (checkDistance(scrollTop, $(this))) {
                            navItems.each(function () {
                                $(this).removeClass('blog-nav__item_active');
                            });
                            navItems.eq(index).addClass('blog-nav__item_active');
                        }
                    });
                });

                $('.blog-nav__link').on('click', function (e) {
                    e.preventDefault();

                    let index = navLinks.index($(this));
                    let p = post.eq(index);
                    //let scroll = post.offset().top - Math.ceil($(window).height() / 3);
                    let scroll = p.offset().top;

                    $('body,html').animate({
                        scrollTop: scroll
                    }, 800);
                });

                $('.blog__swipe-area').on('click', function () {
                    $('.blog__col-left, .blog__col-right').toggleClass('swipe');
                });
            }
        }
    };

    $(function () {
        if ($('.blog-nav').length) {
            blogMenu().init();
        }
    });
})();
(function () {
    'use strict';

    let slider = (function(){
        let duration = 300,
            inProcess = false;

        let getReqItem = function (items, activeItem, step) {
            let counter = activeItem.index();

            if (counter >= items.length - 1 && step > 0) {
                counter = 0;
            } else if (counter == 0 && step < 0) {
                counter = items.length - 1;
            } else {
                counter = counter + step;
            }

            return items.eq(counter);
        };

        let moveSlide = function (container, direction, step) {
            let items = $('.slider__item', container),
                activeItem = items.filter('.slider__item_active'),
                directionValue = direction == 'down' ? 100 : -100;

            let reqItem = getReqItem(items, activeItem, step);

            activeItem.animate({
                'top' : directionValue + '%'
            }, duration);

            reqItem.animate({
                'top' : '0'
            }, duration, function () {
                activeItem.removeClass('slider__item_active').css('top', -directionValue + '%');
                $(this).addClass('slider__item_active');
                inProcess = false;
            });
        };

        let showSlide = function (container, step) {
            let items = $('.slider__item', container),
                activeItem = items.filter('.slider__item_active');

            let reqItem = getReqItem(items, activeItem, step);

            reqItem.fadeOut(function () {
                $(this).css('top', 0);
                activeItem.removeClass('slider__item_active').css('top', 100 + '%');
                $(this).addClass('slider__item_active');
                reqItem.fadeIn();
                inProcess = false;
            });
        };

        let showDesc = function (step) {
            let items = $('.slider__desc-container'),
                activeItem = items.filter('.slider__desc-container_active');

            let reqItem = getReqItem(items, activeItem, step);
            reqItem.fadeOut(function () {
                $(this).css('top', 0);
                activeItem.removeClass('slider__desc-container_active').css('top', 100 + '%');
                $(this).addClass('slider__desc-container_active');
                reqItem.fadeIn();
                inProcess = false;
            });
        };

        return {
            init: function () {

                $('.slider__item', '.slider__btn_left').last().addClass('slider__item_active');
                $('.slider__item', '.slider__btn_right').eq(1).addClass('slider__item_active');
                $('.slider__item', '.slider__preview').eq(0).addClass('slider__item_active');
                $('.slider__desc-container').first().addClass('slider__desc-container_active');


                $('.slider__btn_right').on('click', function(e){
                    e.preventDefault();

                    // clearInterval(moveUp);

                    if (!inProcess) {
                        inProcess = true;
                        moveSlide($('.slider__btn_left'), 'down', 1);
                        moveSlide($('.slider__btn_right'), 'up', 1);
                        showSlide($('.slider__preview'), 1);
                        showDesc(1);
                    }
                });

                $('.slider__btn_left').on('click', function(e){
                    e.preventDefault();

                    // clearInterval(moveUp);

                    if (!inProcess) {
                        inProcess = true;
                        moveSlide($('.slider__btn_left'), 'down', -1);
                        moveSlide($('.slider__btn_right'), 'up', -1);
                        showSlide($('.slider__preview'), -1);
                        showDesc(-1);
                    }
                });

                // let moveUp = setInterval(function () {
                //     moveSlide($('.slider__btn_left'), 'down', 1);
                //     moveSlide($('.slider__btn_right'), 'up', 1);
                //     showSlide($('.slider__preview'), 1);
                //     showDesc(1);
                // }, 5000);
                //
                // $('.slider__btn').on('mouseout', function () {
                //
                // })
            }
        }
    }());

    $(function () {
        slider.init();
    });
})();
(function () {
    'use strict';

    let form = (function () {
        let form = $('form');

        let validateForm = function () {
            let inputs = $('.form__field', form),
                isError = false;

            inputs.each(function () {
                let err = '';

                if (!$(this).val().length) {
                    err = 'Вы не ввели ' + $(this).data('field');
                }

                $(this).removeClass('form__field_error');
                if (err.length) {
                    isError = true;
                    $(this).addClass('form__field_error');

                    if (!$(this).siblings('.form__error').length) {
                        showError($(this), err);
                    }
                }
            });

            return !isError;
        };

        let showError = function(elem, errorText) {
            let errorTag = '<span class="form__error">' + errorText + '</span>';
            let error = elem.parent().append(errorTag).find('.form__error');

            error.css({
                'top': elem.outerHeight() + 14 + 'px',
                'left': elem.outerWidth() / 2 - error.outerWidth() / 2
            });
        };

        return {
            init: function () {

                $(document).on('click', function (event) {
                    if (event.target.closest('.form-menu__item_submit')) {
                        event.preventDefault();

                        if (validateForm()) {
                            form.submit();
                        }
                    } else {
                        $('.form__error').each(function () {
                            $(this).remove();
                        });
                    }
                });

                form.on('submit', function (event) {
                    event.preventDefault();

                    if (form.hasClass('hero__form')) {
                        // console.log('hero');
                    } else if (form.hasClass('reviews__form')) {
                        // console.log('reviews');
                    }
                });

                $('.form-menu__item_reset').on('click', function (event) {
                    event.preventDefault();
                    form.trigger('reset');
                });
            }
        }
    })();

    $(function () {
        form.init();
    });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZsaXAuanMiLCJoYW0uanMiLCJwYXJhbGxheC5qcyIsInNraWxscy5qcyIsInByZWxvYWRlci5qcyIsImJsb2cuanMiLCJzbGlkZXIuanMiLCJmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgc3ZnNGV2ZXJ5Ym9keSgpO1xyXG5cclxuICAgIGxldCB2aWRlbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX192aWRlby1maWxlJyk7XHJcbiAgICBlbmFibGVJbmxpbmVWaWRlbyh2aWRlbywge1xyXG4gICAgICAgIGlQYWQ6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgICQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcuYnV0dG9uLWFycm93LWRvd24nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB3aW4gPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogd2luXHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5idXR0b24tYXJyb3ctdXAnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBoZXJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZXJvX3dlbGNvbWVcIiksXHJcbiAgICAgICAgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fY29udGFpbmVyX3dlbGNvbWVcIiksXHJcbiAgICAgICAgYXV0aEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idXR0b25cIiksXHJcbiAgICAgICAgYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fY29udGFpbmVyLWJhY2tcIiksXHJcbiAgICAgICAgbWVudUZsaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1tZW51X19pdGVtX2ZsaXAgYScpO1xyXG5cclxuICAgIGxldCBmbGlwID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgYyA9IGhlcm9Db250YWluZXIuY2xhc3NMaXN0O1xyXG5cclxuICAgICAgICBpZiAoZS50YXJnZXQgPT0gYXV0aEJ1dHRvbikge1xyXG4gICAgICAgICAgICBhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGMudG9nZ2xlKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKChhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnICYmICFiYWNrLmNvbnRhaW5zKGUudGFyZ2V0KSkgfHwgZS50YXJnZXQgPT0gbWVudUZsaXApIHtcclxuICAgICAgICAgICAgICAgIGF1dGhCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICBjLnRvZ2dsZSgnZmxpcHBlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaGVybykge1xyXG4gICAgICAgIGhlcm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmbGlwKTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBoYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJyksXHJcbiAgICAgICAgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XHJcblxyXG4gICAgbGV0IG9wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGhhbS5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51X2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChoYW0pIHtcclxuICAgICAgICBoYW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTWVudSk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX3dlbGNvbWUnKTtcclxuXHJcbiAgICBsZXQgcGFyYWxsYXhNb3VzZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyksXHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX3dlbGNvbWUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gKGxheWVyLCBwYWdlWCwgcGFnZVksIHJhdGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIHJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiByYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3Bvc2l0aW9uWH1weCwgJHtwb3NpdGlvbll9cHgsIDApYDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHBhZ2VYLCBwYWdlWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGxheWVyLCBwYWdlWCwgcGFnZVksIDAuMDUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBsZXQgcGFyYWxsYXhTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19iZycpLFxyXG4gICAgICAgICAgICBwaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fc2VjdGlvbi1waWMnKSxcclxuICAgICAgICAgICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIChsYXllciwgd1Njcm9sbCwgcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbCA9IHdTY3JvbGwgLyByYXRlICsgJyUnO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwLCAke3Njcm9sbH0sIDApYDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNjUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHBpYywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDE1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICBsZXQgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgcGFyYWxsYXhTY3JvbGwuaW5pdCh3U2Nyb2xsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjb250YWluZXIpIHtcclxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XHJcbiAgICAgICAgICAgIHBhcmFsbGF4TW91c2UuaW5pdChlLnBhZ2VYLCBlLnBhZ2VZKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgYW5pbWF0ZVNraWxscyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBjaGVja0Rpc3RhbmNlID0gZnVuY3Rpb24gKHNjcm9sbFRvcCwgZWxlbSkge1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgIGxldCB0b3BCb3JkZXIgPSAgb2Zmc2V0ICsgZWxlbS5oZWlnaHQoKSAtIHNjcm9sbFRvcCAtICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0b3BCb3JkZXIgPD0gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtcyA9ICQoJy5za2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbGVtID0gJHRoaXMuZmluZCgnLnNraWxsX19jaXJjbGUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWxlbS5oYXNDbGFzcygnc2tpbGxfX2NpcmNsZV9hbmltYXRlZCcpICYmIGNoZWNrRGlzdGFuY2Uoc2Nyb2xsVG9wLCAkdGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkQ2xhc3MoJ3NraWxsX19jaXJjbGVfYW5pbWF0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMCAqIGNvdW50ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgYW5pbWF0ZVNraWxscy5pbml0KCk7XHJcbiAgICB9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHByZWxvYWRlciA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBwZXJjZW50c1RvdGFsID0gMDtcclxuICAgICAgICBsZXQgcHJlbG9hZGVyID0gJCgnLnByZWxvYWRlcicpO1xyXG5cclxuICAgICAgICBsZXQgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24gKG5keCwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICBsZXQgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyk7XHJcbiAgICAgICAgICAgIGxldCBpc0ltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpO1xyXG4gICAgICAgICAgICBsZXQgaXNWaWRlbyA9ICQoZWxlbWVudCkuaXMoJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIGxldCBwYXRoID0gJyc7XHJcblxyXG4gICAgICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc0ltZykge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpc1ZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhdGgpIHJldHVybiBwYXRoO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgc2V0UGVyY2VudHMgPSBmdW5jdGlvbih0b3RhbCwgY3VycmVudCkge1xyXG4gICAgICAgICAgICBsZXQgcGVyY2VudHMgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuXHJcbiAgICAgICAgICAgICQoJy5wcmVsb2FkZXJfX3BlcmNlbnQnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50cyA+PSAxMDApIHtcclxuICAgICAgICAgICAgICAgIHByZWxvYWRlci5mYWRlT3V0KDUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKGltYWdlcykge1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbWFnZXMubGVuZ3RoKSBwcmVsb2FkZXIuZmFkZU91dCgpO1xyXG5cclxuICAgICAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1nLCBpLCBpbWFnZXMpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHIgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYyA6IGltZ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KCkpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHByZWxvYWRlci5pbml0KCk7XHJcbiAgICB9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBibG9nTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IG5hdiA9ICQoJy5ibG9nLW5hdicpO1xyXG4gICAgICAgIGxldCBuYXZUb3AgPSBuYXYucGFyZW50KCkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIGxldCBwb3N0ID0gJCgnLnBvc3QnKTtcclxuICAgICAgICBsZXQgcG9zdHMgPSAkKCcuYmxvZ19fcG9zdHMnKTtcclxuICAgICAgICBsZXQgbmF2TGlzdCA9ICQoJy5ibG9nLW5hdl9fbGlzdCcpO1xyXG4gICAgICAgIGxldCBuYXZJdGVtcyA9ICQoJy5ibG9nLW5hdl9faXRlbScpO1xyXG4gICAgICAgIGxldCBuYXZMaW5rcyA9ICQoJy5ibG9nLW5hdl9fbGluaycpO1xyXG4gICAgICAgIGxldCBzd2lwZSA9ICQoJy5ibG9nX19zd2lwZS1hcmVhJyk7XHJcblxyXG4gICAgICAgIGxldCBjaGVja0Rpc3RhbmNlID0gZnVuY3Rpb24gKHNjcm9sbFRvcCwgZWxlbSkge1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gZWxlbS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgIGxldCB3TWFyZ2luID0gTWF0aC5jZWlsKCQod2luZG93KS5oZWlnaHQoKSAvIDMpO1xyXG4gICAgICAgICAgICBsZXQgdG9wQm9yZGVyID0gb2Zmc2V0IC0gc2Nyb2xsVG9wIC0gd01hcmdpbjtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbEVuZCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAvLyBsZXQgYm90dG9tRWRnZSA9IGVsZW0ub3V0ZXJIZWlnaHQoKSArIG9mZnNldDtcclxuICAgICAgICAgICAgLy8gbGV0IGJvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArIHdNYXJnaW4gLSBib3R0b21FZGdlO1xyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gdG9wQm9yZGVyIDw9IDAgJiYgYm90dG9tQm9yZGVyIDw9IDA7XHJcbiAgICAgICAgICAgIHJldHVybiB0b3BCb3JkZXIgPD0gMCB8fCAoc2Nyb2xsVG9wID09IHNjcm9sbEVuZCAmJiBlbGVtLm5leHQoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYmxvZ0JvdHRvbUJvcmRlciA9IHNjcm9sbFRvcCArICQod2luZG93KS5oZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAtIHBvc3RzLm9mZnNldCgpLnRvcCAtIHBvc3RzLm91dGVySGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbE1heCA9IHNjcm9sbFRvcCArIG5hdkxpc3QuaGVpZ2h0KCkgLSBwb3N0cy5vZmZzZXQoKS50b3AgLSBwb3N0cy5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYmxvZ0JvdHRvbUJvcmRlciA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2Lm91dGVySGVpZ2h0KCQod2luZG93KS5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2Lm91dGVySGVpZ2h0KCQod2luZG93KS5oZWlnaHQoKSAtIGJsb2dCb3R0b21Cb3JkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRvcCA8IG5hdlRvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25hdi5jc3MoJ21hcmdpbi10b3AnLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXYuY3NzKCdwb3NpdGlvbicsICdzdGF0aWMnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uYXYuY3NzKCd0b3AnLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2LnN0b3AoKS5hbmltYXRlKHt0b3A6IDB9LCAzMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsTWF4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uYXYuY3NzKCdtYXJnaW4tdG9wJywgYCR7c2Nyb2xsVG9wIC0gbmF2VG9wfXB4YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hdi5jc3MoJ3RvcCcsIGAke3Njcm9sbFRvcCAtIG5hdlRvcH1weGApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2LnN0b3AoKS5hbmltYXRlKHt0b3A6IGAke3Njcm9sbFRvcCAtIG5hdlRvcH1gfSwgMzAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXYuY3NzKCdwb3NpdGlvbicsICdmaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdC5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsICQodGhpcykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZJdGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdibG9nLW5hdl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2SXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKCdibG9nLW5hdl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmJsb2ctbmF2X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG5hdkxpbmtzLmluZGV4KCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwID0gcG9zdC5lcShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgc2Nyb2xsID0gcG9zdC5vZmZzZXQoKS50b3AgLSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbCA9IHAub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxcclxuICAgICAgICAgICAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmJsb2dfX3N3aXBlLWFyZWEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJsb2dfX2NvbC1sZWZ0LCAuYmxvZ19fY29sLXJpZ2h0JykudG9nZ2xlQ2xhc3MoJ3N3aXBlJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJy5ibG9nLW5hdicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBibG9nTWVudSgpLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBzbGlkZXIgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgZHVyYXRpb24gPSAzMDAsXHJcbiAgICAgICAgICAgIGluUHJvY2VzcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgZ2V0UmVxSXRlbSA9IGZ1bmN0aW9uIChpdGVtcywgYWN0aXZlSXRlbSwgc3RlcCkge1xyXG4gICAgICAgICAgICBsZXQgY291bnRlciA9IGFjdGl2ZUl0ZW0uaW5kZXgoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IGl0ZW1zLmxlbmd0aCAtIDEgJiYgc3RlcCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ZXIgPT0gMCAmJiBzdGVwIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlciA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gY291bnRlciArIHN0ZXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtcy5lcShjb3VudGVyKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgbW92ZVNsaWRlID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgZGlyZWN0aW9uLCBzdGVwKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtcyA9ICQoJy5zbGlkZXJfX2l0ZW0nLCBjb250YWluZXIpLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLnNsaWRlcl9faXRlbV9hY3RpdmUnKSxcclxuICAgICAgICAgICAgICAgIGRpcmVjdGlvblZhbHVlID0gZGlyZWN0aW9uID09ICdkb3duJyA/IDEwMCA6IC0xMDA7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVxSXRlbSA9IGdldFJlcUl0ZW0oaXRlbXMsIGFjdGl2ZUl0ZW0sIHN0ZXApO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICd0b3AnIDogZGlyZWN0aW9uVmFsdWUgKyAnJSdcclxuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICd0b3AnIDogJzAnXHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJykuY3NzKCd0b3AnLCAtZGlyZWN0aW9uVmFsdWUgKyAnJScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBzaG93U2xpZGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBzdGVwKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtcyA9ICQoJy5zbGlkZXJfX2l0ZW0nLCBjb250YWluZXIpLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbSA9IGl0ZW1zLmZpbHRlcignLnNsaWRlcl9faXRlbV9hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXFJdGVtID0gZ2V0UmVxSXRlbShpdGVtcywgYWN0aXZlSXRlbSwgc3RlcCk7XHJcblxyXG4gICAgICAgICAgICByZXFJdGVtLmZhZGVPdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIDApO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlSXRlbS5yZW1vdmVDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpLmNzcygndG9wJywgMTAwICsgJyUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHJlcUl0ZW0uZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dEZXNjID0gZnVuY3Rpb24gKHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gJCgnLnNsaWRlcl9fZGVzYy1jb250YWluZXInKSxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5zbGlkZXJfX2Rlc2MtY29udGFpbmVyX2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcUl0ZW0gPSBnZXRSZXFJdGVtKGl0ZW1zLCBhY3RpdmVJdGVtLCBzdGVwKTtcclxuICAgICAgICAgICAgcmVxSXRlbS5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCAwKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9fZGVzYy1jb250YWluZXJfYWN0aXZlJykuY3NzKCd0b3AnLCAxMDAgKyAnJScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2xpZGVyX19kZXNjLWNvbnRhaW5lcl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHJlcUl0ZW0uZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5zbGlkZXJfX2l0ZW0nLCAnLnNsaWRlcl9fYnRuX2xlZnQnKS5sYXN0KCkuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJy5zbGlkZXJfX2l0ZW0nLCAnLnNsaWRlcl9fYnRuX3JpZ2h0JykuZXEoMSkuYWRkQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoJy5zbGlkZXJfX2l0ZW0nLCAnLnNsaWRlcl9fcHJldmlldycpLmVxKDApLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19kZXNjLWNvbnRhaW5lcicpLmZpcnN0KCkuYWRkQ2xhc3MoJ3NsaWRlcl9fZGVzYy1jb250YWluZXJfYWN0aXZlJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICQoJy5zbGlkZXJfX2J0bl9yaWdodCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXJJbnRlcnZhbChtb3ZlVXApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWluUHJvY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpblByb2Nlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGUoJCgnLnNsaWRlcl9fYnRuX2xlZnQnKSwgJ2Rvd24nLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlKCQoJy5zbGlkZXJfX2J0bl9yaWdodCcpLCAndXAnLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NsaWRlKCQoJy5zbGlkZXJfX3ByZXZpZXcnKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dEZXNjKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5zbGlkZXJfX2J0bl9sZWZ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjbGVhckludGVydmFsKG1vdmVVcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZSgkKCcuc2xpZGVyX19idG5fbGVmdCcpLCAnZG93bicsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlKCQoJy5zbGlkZXJfX2J0bl9yaWdodCcpLCAndXAnLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dTbGlkZSgkKCcuc2xpZGVyX19wcmV2aWV3JyksIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Rlc2MoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxldCBtb3ZlVXAgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbW92ZVNsaWRlKCQoJy5zbGlkZXJfX2J0bl9sZWZ0JyksICdkb3duJywgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbW92ZVNsaWRlKCQoJy5zbGlkZXJfX2J0bl9yaWdodCcpLCAndXAnLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBzaG93U2xpZGUoJCgnLnNsaWRlcl9fcHJldmlldycpLCAxKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBzaG93RGVzYygxKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sIDUwMDApO1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vICQoJy5zbGlkZXJfX2J0bicpLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzbGlkZXIuaW5pdCgpO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgZm9ybSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGZvcm0gPSAkKCdmb3JtJyk7XHJcblxyXG4gICAgICAgIGxldCB2YWxpZGF0ZUZvcm0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dHMgPSAkKCcuZm9ybV9fZmllbGQnLCBmb3JtKSxcclxuICAgICAgICAgICAgICAgIGlzRXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBlcnIgPSAnJztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISQodGhpcykudmFsKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyID0gJ9CS0Ysg0L3QtSDQstCy0LXQu9C4ICcgKyAkKHRoaXMpLmRhdGEoJ2ZpZWxkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZm9ybV9fZmllbGRfZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZm9ybV9fZmllbGRfZXJyb3InKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEkKHRoaXMpLnNpYmxpbmdzKCcuZm9ybV9fZXJyb3InKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Vycm9yKCQodGhpcyksIGVycik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAhaXNFcnJvcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsZXQgc2hvd0Vycm9yID0gZnVuY3Rpb24oZWxlbSwgZXJyb3JUZXh0KSB7XHJcbiAgICAgICAgICAgIGxldCBlcnJvclRhZyA9ICc8c3BhbiBjbGFzcz1cImZvcm1fX2Vycm9yXCI+JyArIGVycm9yVGV4dCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgbGV0IGVycm9yID0gZWxlbS5wYXJlbnQoKS5hcHBlbmQoZXJyb3JUYWcpLmZpbmQoJy5mb3JtX19lcnJvcicpO1xyXG5cclxuICAgICAgICAgICAgZXJyb3IuY3NzKHtcclxuICAgICAgICAgICAgICAgICd0b3AnOiBlbGVtLm91dGVySGVpZ2h0KCkgKyAxNCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAnbGVmdCc6IGVsZW0ub3V0ZXJXaWR0aCgpIC8gMiAtIGVycm9yLm91dGVyV2lkdGgoKSAvIDJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xvc2VzdCgnLmZvcm0tbWVudV9faXRlbV9zdWJtaXQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlRm9ybSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZvcm1fX2Vycm9yJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3JtLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9ybS5oYXNDbGFzcygnaGVyb19fZm9ybScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoZXJvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb3JtLmhhc0NsYXNzKCdyZXZpZXdzX19mb3JtJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Jldmlld3MnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuZm9ybS1tZW51X19pdGVtX3Jlc2V0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtLnRyaWdnZXIoJ3Jlc2V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZm9ybS5pbml0KCk7XHJcbiAgICB9KTtcclxufSkoKTsiXX0=
