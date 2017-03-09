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
                        nav.stop().animate({top: 0});

                    } else {
                        if (scrollMax < 0) {
                            //nav.css('margin-top', `${scrollTop - navTop}px`);
                            //nav.css('top', `${scrollTop - navTop}px`);
                            nav.stop().animate({top: `${scrollTop - navTop}`});
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZsaXAuanMiLCJoYW0uanMiLCJwYXJhbGxheC5qcyIsInNraWxscy5qcyIsInByZWxvYWRlci5qcyIsImJsb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHN2ZzRldmVyeWJvZHkoKTtcclxuXHJcbiAgICBsZXQgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fdmlkZW8tZmlsZScpO1xyXG4gICAgZW5hYmxlSW5saW5lVmlkZW8odmlkZW8sIHtcclxuICAgICAgICBpUGFkOiB0cnVlXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCgnLmJ1dHRvbi1hcnJvdy1kb3duJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgd2luID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHdpblxyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuYnV0dG9uLWFycm93LXVwJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgICAgICB9LCA4MDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgaGVybyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb193ZWxjb21lXCIpLFxyXG4gICAgICAgIGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fX2NvbnRhaW5lcl93ZWxjb21lXCIpLFxyXG4gICAgICAgIGF1dGhCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtYnV0dG9uXCIpLFxyXG4gICAgICAgIGJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fX2NvbnRhaW5lci1iYWNrXCIpLFxyXG4gICAgICAgIG1lbnVGbGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbWVudV9faXRlbV9mbGlwIGEnKTtcclxuXHJcbiAgICBsZXQgZmxpcCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IGMgPSBoZXJvQ29udGFpbmVyLmNsYXNzTGlzdDtcclxuXHJcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09IGF1dGhCdXR0b24pIHtcclxuICAgICAgICAgICAgYXV0aEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBjLnRvZ2dsZSgnZmxpcHBlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgoYXV0aEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID09ICdub25lJyAmJiAhYmFjay5jb250YWlucyhlLnRhcmdldCkpIHx8IGUudGFyZ2V0ID09IG1lbnVGbGlwKSB7XHJcbiAgICAgICAgICAgICAgICBhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgYy50b2dnbGUoJ2ZsaXBwZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGhlcm8pIHtcclxuICAgICAgICBoZXJvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmxpcCk7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgaGFtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpLFxyXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xyXG5cclxuICAgIGxldCBvcGVuTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBoYW0uY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyX2FjdGl2ZScpO1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudV9hY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGFtKSB7XHJcbiAgICAgICAgaGFtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1lbnUpO1xyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb193ZWxjb21lJyk7XHJcblxyXG4gICAgbGV0IHBhcmFsbGF4TW91c2UgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19iZycpLFxyXG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb193ZWxjb21lJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIChsYXllciwgcGFnZVgsIHBhZ2VZLCByYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiByYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogcmF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtwb3NpdGlvblh9cHgsICR7cG9zaXRpb25ZfXB4LCAwKWA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChwYWdlWCwgcGFnZVkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShsYXllciwgcGFnZVgsIHBhZ2VZLCAwLjA1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgbGV0IHBhcmFsbGF4U2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fYmcnKSxcclxuICAgICAgICAgICAgcGljID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX3NlY3Rpb24tcGljJyksXHJcbiAgICAgICAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcicpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb3ZlOiBmdW5jdGlvbiAobGF5ZXIsIHdTY3JvbGwsIHJhdGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGwgPSB3U2Nyb2xsIC8gcmF0ZSArICclJztcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgJHtzY3JvbGx9LCAwKWA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDY1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShwaWMsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAxNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICAgIHBhcmFsbGF4U2Nyb2xsLmluaXQod1Njcm9sbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xyXG4gICAgICAgICAgICBwYXJhbGxheE1vdXNlLmluaXQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGFuaW1hdGVTa2lsbHMgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICBsZXQgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uIChzY3JvbGxUb3AsIGVsZW0pIHtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGVsZW0ub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICBsZXQgdG9wQm9yZGVyID0gIG9mZnNldCArIGVsZW0uaGVpZ2h0KCkgLSBzY3JvbGxUb3AgLSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdG9wQm9yZGVyIDw9IDA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbXMgPSAkKCcuc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnRlciA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZWxlbSA9ICR0aGlzLmZpbmQoJy5za2lsbF9fY2lyY2xlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVsZW0uaGFzQ2xhc3MoJ3NraWxsX19jaXJjbGVfYW5pbWF0ZWQnKSAmJiBjaGVja0Rpc3RhbmNlKHNjcm9sbFRvcCwgJHRoaXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZENsYXNzKCdza2lsbF9fY2lyY2xlX2FuaW1hdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAgKiBjb3VudGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgICQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGFuaW1hdGVTa2lsbHMuaW5pdCgpO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBwcmVsb2FkZXIgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgcGVyY2VudHNUb3RhbCA9IDA7XHJcbiAgICAgICAgbGV0IHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuXHJcbiAgICAgICAgbGV0IGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xyXG4gICAgICAgICAgICBsZXQgaXNJbWcgPSAkKGVsZW1lbnQpLmlzKCdpbWcnKTtcclxuICAgICAgICAgICAgbGV0IGlzVmlkZW8gPSAkKGVsZW1lbnQpLmlzKCd2aWRlbycpO1xyXG4gICAgICAgICAgICBsZXQgcGF0aCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgICAgICBwYXRoID0gYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNJbWcpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNWaWRlbykge1xyXG4gICAgICAgICAgICAgICAgcGF0aCA9ICQoZWxlbWVudCkuYXR0cignc3JjJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHNldFBlcmNlbnRzID0gZnVuY3Rpb24odG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50JykudGV4dChwZXJjZW50cyArICclJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGVyY2VudHMgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVsb2FkZXIuZmFkZU91dCg1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGxvYWRJbWFnZXMgPSBmdW5jdGlvbihpbWFnZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltZywgaSwgaW1hZ2VzKXtcclxuICAgICAgICAgICAgICAgIGxldCBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyIDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmMgOiBpbWdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWFnZXMubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2FkSW1hZ2VzKGltZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSgpKTtcclxuXHJcbiAgICAkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwcmVsb2FkZXIuaW5pdCgpO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgYmxvZ01lbnUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBuYXYgPSAkKCcuYmxvZy1uYXYnKTtcclxuICAgICAgICBsZXQgbmF2VG9wID0gbmF2LnBhcmVudCgpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICBsZXQgcG9zdCA9ICQoJy5wb3N0Jyk7XHJcbiAgICAgICAgbGV0IHBvc3RzID0gJCgnLmJsb2dfX3Bvc3RzJyk7XHJcbiAgICAgICAgbGV0IG5hdkxpc3QgPSAkKCcuYmxvZy1uYXZfX2xpc3QnKTtcclxuICAgICAgICBsZXQgbmF2SXRlbXMgPSAkKCcuYmxvZy1uYXZfX2l0ZW0nKTtcclxuICAgICAgICBsZXQgbmF2TGlua3MgPSAkKCcuYmxvZy1uYXZfX2xpbmsnKTtcclxuICAgICAgICBsZXQgc3dpcGUgPSAkKCcuYmxvZ19fc3dpcGUtYXJlYScpO1xyXG5cclxuICAgICAgICBsZXQgY2hlY2tEaXN0YW5jZSA9IGZ1bmN0aW9uIChzY3JvbGxUb3AsIGVsZW0pIHtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGVsZW0ub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICBsZXQgd01hcmdpbiA9IE1hdGguY2VpbCgkKHdpbmRvdykuaGVpZ2h0KCkgLyAyKTtcclxuICAgICAgICAgICAgbGV0IHRvcEJvcmRlciA9IG9mZnNldCAtIHNjcm9sbFRvcCAtIHdNYXJnaW47XHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxFbmQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICAgICAgLy8gbGV0IGJvdHRvbUVkZ2UgPSBlbGVtLm91dGVySGVpZ2h0KCkgKyBvZmZzZXQ7XHJcbiAgICAgICAgICAgIC8vIGxldCBib3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyB3TWFyZ2luIC0gYm90dG9tRWRnZTtcclxuXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIHRvcEJvcmRlciA8PSAwICYmIGJvdHRvbUJvcmRlciA8PSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdG9wQm9yZGVyIDw9IDAgfHwgKHNjcm9sbFRvcCA9PSBzY3JvbGxFbmQgJiYgZWxlbS5uZXh0KCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2dCb3R0b21Cb3JkZXIgPSBzY3JvbGxUb3AgKyAkKHdpbmRvdykuaGVpZ2h0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLSBwb3N0cy5vZmZzZXQoKS50b3AgLSBwb3N0cy5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxNYXggPSBzY3JvbGxUb3AgKyBuYXZMaXN0LmhlaWdodCgpIC0gcG9zdHMub2Zmc2V0KCkudG9wIC0gcG9zdHMub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJsb2dCb3R0b21Cb3JkZXIgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5vdXRlckhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5vdXRlckhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkgLSBibG9nQm90dG9tQm9yZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxUb3AgPCBuYXZUb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uYXYuY3NzKCdtYXJnaW4tdG9wJywgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmF2LmNzcygncG9zaXRpb24nLCAnc3RhdGljJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmF2LmNzcygndG9wJywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdi5zdG9wKCkuYW5pbWF0ZSh7dG9wOiAwfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY3JvbGxNYXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25hdi5jc3MoJ21hcmdpbi10b3AnLCBgJHtzY3JvbGxUb3AgLSBuYXZUb3B9cHhgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmF2LmNzcygndG9wJywgYCR7c2Nyb2xsVG9wIC0gbmF2VG9wfXB4YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXYuc3RvcCgpLmFuaW1hdGUoe3RvcDogYCR7c2Nyb2xsVG9wIC0gbmF2VG9wfWB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXYuY3NzKCdwb3NpdGlvbicsICdmaXhlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdC5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tEaXN0YW5jZShzY3JvbGxUb3AsICQodGhpcykpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZJdGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdibG9nLW5hdl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2SXRlbXMuZXEoaW5kZXgpLmFkZENsYXNzKCdibG9nLW5hdl9faXRlbV9hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmJsb2ctbmF2X19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG5hdkxpbmtzLmluZGV4KCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwID0gcG9zdC5lcShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgc2Nyb2xsID0gcG9zdC5vZmZzZXQoKS50b3AgLSBNYXRoLmNlaWwoJCh3aW5kb3cpLmhlaWdodCgpIC8gMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNjcm9sbCA9IHAub2Zmc2V0KCkudG9wO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxcclxuICAgICAgICAgICAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmJsb2dfX3N3aXBlLWFyZWEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJsb2dfX2NvbC1sZWZ0LCAuYmxvZ19fY29sLXJpZ2h0JykudG9nZ2xlQ2xhc3MoJ3N3aXBlJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgJChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQoJy5ibG9nLW5hdicpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBibG9nTWVudSgpLmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSkoKTsiXX0=
