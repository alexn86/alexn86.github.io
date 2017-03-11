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
            let wMargin = Math.ceil($(window).height() / 2);
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

                    if (!inProcess) {
                        inProcess = true;
                        moveSlide($('.slider__btn_left'), 'down', -1);
                        moveSlide($('.slider__btn_right'), 'up', -1);
                        showSlide($('.slider__preview'), -1);
                        showDesc(-1);
                    }
                });
            }
        }
    }());

    $(function () {
        slider.init();
    });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZsaXAuanMiLCJoYW0uanMiLCJwYXJhbGxheC5qcyIsInNraWxscy5qcyIsInByZWxvYWRlci5qcyIsImJsb2cuanMiLCJzbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBzdmc0ZXZlcnlib2R5KCk7XHJcblxyXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX3ZpZGVvLWZpbGUnKTtcclxuICAgIGVuYWJsZUlubGluZVZpZGVvKHZpZGVvLCB7XHJcbiAgICAgICAgaVBhZDogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChmdW5jdGlvbigpe1xyXG4gICAgICAgICQoJy5idXR0b24tYXJyb3ctZG93bicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHdpbiA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiB3aW5cclxuICAgICAgICAgICAgfSwgODAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmJ1dHRvbi1hcnJvdy11cCcpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICAgICAgfSwgODAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGhlcm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fd2VsY29tZVwiKSxcclxuICAgICAgICBoZXJvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZXJvX19jb250YWluZXJfd2VsY29tZVwiKSxcclxuICAgICAgICBhdXRoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRoLWJ1dHRvblwiKSxcclxuICAgICAgICBiYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZXJvX19jb250YWluZXItYmFja1wiKSxcclxuICAgICAgICBtZW51RmxpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW1lbnVfX2l0ZW1fZmxpcCBhJyk7XHJcblxyXG4gICAgbGV0IGZsaXAgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCBjID0gaGVyb0NvbnRhaW5lci5jbGFzc0xpc3Q7XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldCA9PSBhdXRoQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGF1dGhCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYy50b2dnbGUoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoKGF1dGhCdXR0b24uc3R5bGUuZGlzcGxheSA9PSAnbm9uZScgJiYgIWJhY2suY29udGFpbnMoZS50YXJnZXQpKSB8fCBlLnRhcmdldCA9PSBtZW51RmxpcCkge1xyXG4gICAgICAgICAgICAgICAgYXV0aEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgICAgIGMudG9nZ2xlKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChoZXJvKSB7XHJcbiAgICAgICAgaGVyby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZsaXApO1xyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGhhbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXInKSxcclxuICAgICAgICBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcclxuXHJcbiAgICBsZXQgb3Blbk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaGFtLmNsYXNzTGlzdC50b2dnbGUoJ2hhbWJ1cmdlcl9hY3RpdmUnKTtcclxuICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21lbnVfYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhhbSkge1xyXG4gICAgICAgIGhhbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5NZW51KTtcclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fd2VsY29tZScpO1xyXG5cclxuICAgIGxldCBwYXJhbGxheE1vdXNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fYmcnKSxcclxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fd2VsY29tZScpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb3ZlOiBmdW5jdGlvbiAobGF5ZXIsIHBhZ2VYLCBwYWdlWSwgcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWCA9IGluaXRpYWxYICogcmF0ZSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIHJhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7cG9zaXRpb25YfXB4LCAke3Bvc2l0aW9uWX1weCwgMClgO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAocGFnZVgsIHBhZ2VZKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUobGF5ZXIsIHBhZ2VYLCBwYWdlWSwgMC4wNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGxldCBwYXJhbGxheFNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyksXHJcbiAgICAgICAgICAgIHBpYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19zZWN0aW9uLXBpYycpLFxyXG4gICAgICAgICAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXInKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gKGxheWVyLCB3U2Nyb2xsLCByYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsID0gd1Njcm9sbCAvIHJhdGUgKyAnJSc7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF5ZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKDAsICR7c2Nyb2xsfSwgMClgO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGJnLCB3U2Nyb2xsLCA2NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUocGljLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUodXNlciwgd1Njcm9sbCwgMTUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgIGxldCB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgICAgICBwYXJhbGxheFNjcm9sbC5pbml0KHdTY3JvbGwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGNvbnRhaW5lcikge1xyXG4gICAgICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcclxuICAgICAgICAgICAgcGFyYWxsYXhNb3VzZS5pbml0KGUucGFnZVgsIGUucGFnZVkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBhbmltYXRlU2tpbGxzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbiAoc2Nyb2xsVG9wLCBlbGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgbGV0IHRvcEJvcmRlciA9ICBvZmZzZXQgKyBlbGVtLmhlaWdodCgpIC0gc2Nyb2xsVG9wIC0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRvcEJvcmRlciA8PSAwO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW1zID0gJCgnLnNraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsZW0gPSAkdGhpcy5maW5kKCcuc2tpbGxfX2NpcmNsZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbGVtLmhhc0NsYXNzKCdza2lsbF9fY2lyY2xlX2FuaW1hdGVkJykgJiYgY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsICR0aGlzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRDbGFzcygnc2tpbGxfX2NpcmNsZV9hbmltYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwICogY291bnRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhbmltYXRlU2tpbGxzLmluaXQoKTtcclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHBlcmNlbnRzVG90YWwgPSAwO1xyXG4gICAgICAgIGxldCBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcblxyXG4gICAgICAgIGxldCBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKTtcclxuICAgICAgICAgICAgbGV0IGlzSW1nID0gJChlbGVtZW50KS5pcygnaW1nJyk7XHJcbiAgICAgICAgICAgIGxldCBpc1ZpZGVvID0gJChlbGVtZW50KS5pcygndmlkZW8nKTtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSAnJztcclxuXHJcbiAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzSW1nKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGlzVmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGg7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBwZXJjZW50cyA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG5cclxuICAgICAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudCcpLnRleHQocGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBlcmNlbnRzID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oaW1hZ2VzKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgICAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWcsIGksIGltYWdlcyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmFrZUltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0ciA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjIDogaW1nXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZmFrZUltYWdlLm9uKCdsb2FkIGVycm9yJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbWdzID0gaW1nUGF0aC50b0FycmF5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0oKSk7XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcHJlbG9hZGVyLmluaXQoKTtcclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGJsb2dNZW51ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgbmF2ID0gJCgnLmJsb2ctbmF2Jyk7XHJcbiAgICAgICAgbGV0IG5hdlRvcCA9IG5hdi5wYXJlbnQoKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgbGV0IHBvc3QgPSAkKCcucG9zdCcpO1xyXG4gICAgICAgIGxldCBwb3N0cyA9ICQoJy5ibG9nX19wb3N0cycpO1xyXG4gICAgICAgIGxldCBuYXZMaXN0ID0gJCgnLmJsb2ctbmF2X19saXN0Jyk7XHJcbiAgICAgICAgbGV0IG5hdkl0ZW1zID0gJCgnLmJsb2ctbmF2X19pdGVtJyk7XHJcbiAgICAgICAgbGV0IG5hdkxpbmtzID0gJCgnLmJsb2ctbmF2X19saW5rJyk7XHJcbiAgICAgICAgbGV0IHN3aXBlID0gJCgnLmJsb2dfX3N3aXBlLWFyZWEnKTtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrRGlzdGFuY2UgPSBmdW5jdGlvbiAoc2Nyb2xsVG9wLCBlbGVtKSB7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBlbGVtLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgbGV0IHdNYXJnaW4gPSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMik7XHJcbiAgICAgICAgICAgIGxldCB0b3BCb3JkZXIgPSBvZmZzZXQgLSBzY3JvbGxUb3AgLSB3TWFyZ2luO1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsRW5kID0gJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBib3R0b21FZGdlID0gZWxlbS5vdXRlckhlaWdodCgpICsgb2Zmc2V0O1xyXG4gICAgICAgICAgICAvLyBsZXQgYm90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgd01hcmdpbiAtIGJvdHRvbUVkZ2U7XHJcblxyXG4gICAgICAgICAgICAvL3JldHVybiB0b3BCb3JkZXIgPD0gMCAmJiBib3R0b21Cb3JkZXIgPD0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIHRvcEJvcmRlciA8PSAwIHx8IChzY3JvbGxUb3AgPT0gc2Nyb2xsRW5kICYmIGVsZW0ubmV4dCgpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9nQm90dG9tQm9yZGVyID0gc2Nyb2xsVG9wICsgJCh3aW5kb3cpLmhlaWdodCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC0gcG9zdHMub2Zmc2V0KCkudG9wIC0gcG9zdHMub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsTWF4ID0gc2Nyb2xsVG9wICsgbmF2TGlzdC5oZWlnaHQoKSAtIHBvc3RzLm9mZnNldCgpLnRvcCAtIHBvc3RzLm91dGVySGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChibG9nQm90dG9tQm9yZGVyIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXYub3V0ZXJIZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXYub3V0ZXJIZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpIC0gYmxvZ0JvdHRvbUJvcmRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgbmF2VG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmF2LmNzcygnbWFyZ2luLXRvcCcsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hdi5jc3MoJ3Bvc2l0aW9uJywgJ3N0YXRpYycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25hdi5jc3MoJ3RvcCcsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYXYuc3RvcCgpLmFuaW1hdGUoe3RvcDogMH0sIDMwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxNYXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hdi5jc3MoJ21hcmdpbi10b3AnLCBgJHtzY3JvbGxUb3AgLSBuYXZUb3B9cHhgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmF2LmNzcygndG9wJywgYCR7c2Nyb2xsVG9wIC0gbmF2VG9wfXB4YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXYuc3RvcCgpLmFuaW1hdGUoe3RvcDogYCR7c2Nyb2xsVG9wIC0gbmF2VG9wfWB9LCAzMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hdi5jc3MoJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBwb3N0LmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgJCh0aGlzKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdkl0ZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Jsb2ctbmF2X19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZJdGVtcy5lcShpbmRleCkuYWRkQ2xhc3MoJ2Jsb2ctbmF2X19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYmxvZy1uYXZfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gbmF2TGlua3MuaW5kZXgoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBwb3N0LmVxKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBzY3JvbGwgPSBwb3N0Lm9mZnNldCgpLnRvcCAtIE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAzKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsID0gcC5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYmxvZ19fc3dpcGUtYXJlYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYmxvZ19fY29sLWxlZnQsIC5ibG9nX19jb2wtcmlnaHQnKS50b2dnbGVDbGFzcygnc3dpcGUnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCgnLmJsb2ctbmF2JykubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGJsb2dNZW51KCkuaW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IHNsaWRlciA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IDMwMCxcclxuICAgICAgICAgICAgaW5Qcm9jZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCBnZXRSZXFJdGVtID0gZnVuY3Rpb24gKGl0ZW1zLCBhY3RpdmVJdGVtLCBzdGVwKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gYWN0aXZlSXRlbS5pbmRleCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gaXRlbXMubGVuZ3RoIC0gMSAmJiBzdGVwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY291bnRlciA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnRlciA9PSAwICYmIHN0ZXAgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIgPSBjb3VudGVyICsgc3RlcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmVxKGNvdW50ZXIpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBtb3ZlU2xpZGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBkaXJlY3Rpb24sIHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtX2FjdGl2ZScpLFxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uVmFsdWUgPSBkaXJlY3Rpb24gPT0gJ2Rvd24nID8gMTAwIDogLTEwMDtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXFJdGVtID0gZ2V0UmVxSXRlbShpdGVtcywgYWN0aXZlSXRlbSwgc3RlcCk7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCcgOiBkaXJlY3Rpb25WYWx1ZSArICclJ1xyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICByZXFJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgJ3RvcCcgOiAnMCdcclxuICAgICAgICAgICAgfSwgZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9faXRlbV9hY3RpdmUnKS5jc3MoJ3RvcCcsIC1kaXJlY3Rpb25WYWx1ZSArICclJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpblByb2Nlc3MgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dTbGlkZSA9IGZ1bmN0aW9uIChjb250YWluZXIsIHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gJCgnLnNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtID0gaXRlbXMuZmlsdGVyKCcuc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcUl0ZW0gPSBnZXRSZXFJdGVtKGl0ZW1zLCBhY3RpdmVJdGVtLCBzdGVwKTtcclxuXHJcbiAgICAgICAgICAgIHJlcUl0ZW0uZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygndG9wJywgMCk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVJdGVtLnJlbW92ZUNsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJykuY3NzKCd0b3AnLCAxMDAgKyAnJScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgcmVxSXRlbS5mYWRlSW4oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IHNob3dEZXNjID0gZnVuY3Rpb24gKHN0ZXApIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gJCgnLnNsaWRlcl9fZGVzYy1jb250YWluZXInKSxcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0gPSBpdGVtcy5maWx0ZXIoJy5zbGlkZXJfX2Rlc2MtY29udGFpbmVyX2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcUl0ZW0gPSBnZXRSZXFJdGVtKGl0ZW1zLCBhY3RpdmVJdGVtLCBzdGVwKTtcclxuICAgICAgICAgICAgcmVxSXRlbS5mYWRlT3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCd0b3AnLCAwKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW0ucmVtb3ZlQ2xhc3MoJ3NsaWRlcl9fZGVzYy1jb250YWluZXJfYWN0aXZlJykuY3NzKCd0b3AnLCAxMDAgKyAnJScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2xpZGVyX19kZXNjLWNvbnRhaW5lcl9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHJlcUl0ZW0uZmFkZUluKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19pdGVtJywgJy5zbGlkZXJfX2J0bl9sZWZ0JykubGFzdCgpLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19pdGVtJywgJy5zbGlkZXJfX2J0bl9yaWdodCcpLmVxKDEpLmFkZENsYXNzKCdzbGlkZXJfX2l0ZW1fYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19pdGVtJywgJy5zbGlkZXJfX3ByZXZpZXcnKS5lcSgwKS5hZGRDbGFzcygnc2xpZGVyX19pdGVtX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9fZGVzYy1jb250YWluZXInKS5maXJzdCgpLmFkZENsYXNzKCdzbGlkZXJfX2Rlc2MtY29udGFpbmVyX2FjdGl2ZScpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuc2xpZGVyX19idG5fcmlnaHQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZSgkKCcuc2xpZGVyX19idG5fbGVmdCcpLCAnZG93bicsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlU2xpZGUoJCgnLnNsaWRlcl9fYnRuX3JpZ2h0JyksICd1cCcsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93U2xpZGUoJCgnLnNsaWRlcl9fcHJldmlldycpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Rlc2MoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLnNsaWRlcl9fYnRuX2xlZnQnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaW5Qcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluUHJvY2VzcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVTbGlkZSgkKCcuc2xpZGVyX19idG5fbGVmdCcpLCAnZG93bicsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVNsaWRlKCQoJy5zbGlkZXJfX2J0bl9yaWdodCcpLCAndXAnLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dTbGlkZSgkKCcuc2xpZGVyX19wcmV2aWV3JyksIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0Rlc2MoLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzbGlkZXIuaW5pdCgpO1xyXG4gICAgfSk7XHJcbn0pKCk7Il19
