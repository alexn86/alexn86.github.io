(function () {
    'use strict';

    svg4everybody();

    let video = document.querySelector('.hero__video-file');
    enableInlineVideo(video, {
        iPad: true
    });

})();
(function () {
    'use strict';

    let hero = document.querySelector(".hero_welcome"),
        heroContainer = document.querySelector(".hero__container_welcome"),
        authButton = document.querySelector(".auth-button"),
        back = document.querySelector(".hero__container-back"),
        menuFlip = document.querySelector('.form-menu__item_flip a');

    let flip = e => {
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

    let openMenu = () => {
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
        let layer = document.querySelector('.hero__bg');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZsaXAuanMiLCJoYW0uanMiLCJwYXJhbGxheC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBzdmc0ZXZlcnlib2R5KCk7XHJcblxyXG4gICAgbGV0IHZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX3ZpZGVvLWZpbGUnKTtcclxuICAgIGVuYWJsZUlubGluZVZpZGVvKHZpZGVvLCB7XHJcbiAgICAgICAgaVBhZDogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGhlcm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fd2VsY29tZVwiKSxcclxuICAgICAgICBoZXJvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZXJvX19jb250YWluZXJfd2VsY29tZVwiKSxcclxuICAgICAgICBhdXRoQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRoLWJ1dHRvblwiKSxcclxuICAgICAgICBiYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZXJvX19jb250YWluZXItYmFja1wiKSxcclxuICAgICAgICBtZW51RmxpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLW1lbnVfX2l0ZW1fZmxpcCBhJyk7XHJcblxyXG4gICAgbGV0IGZsaXAgPSBlID0+IHtcclxuICAgICAgICBsZXQgYyA9IGhlcm9Db250YWluZXIuY2xhc3NMaXN0O1xyXG5cclxuICAgICAgICBpZiAoZS50YXJnZXQgPT0gYXV0aEJ1dHRvbikge1xyXG4gICAgICAgICAgICBhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGMudG9nZ2xlKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKChhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnICYmICFiYWNrLmNvbnRhaW5zKGUudGFyZ2V0KSkgfHwgZS50YXJnZXQgPT0gbWVudUZsaXApIHtcclxuICAgICAgICAgICAgICAgIGF1dGhCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICBjLnRvZ2dsZSgnZmxpcHBlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoaGVybykge1xyXG4gICAgICAgIGhlcm8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmbGlwKTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBoYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyJyksXHJcbiAgICAgICAgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XHJcblxyXG4gICAgbGV0IG9wZW5NZW51ID0gKCkgPT4ge1xyXG4gICAgICAgIGhhbS5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXJfYWN0aXZlJyk7XHJcbiAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51X2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChoYW0pIHtcclxuICAgICAgICBoYW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTWVudSk7XHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX3dlbGNvbWUnKTtcclxuXHJcbiAgICBsZXQgcGFyYWxsYXhNb3VzZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX2JnJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIChsYXllciwgcGFnZVgsIHBhZ2VZLCByYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFggPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIHBhZ2VYLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxZID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gcGFnZVksXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiByYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWSA9IGluaXRpYWxZICogcmF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtwb3NpdGlvblh9cHgsICR7cG9zaXRpb25ZfXB4LCAwKWA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChwYWdlWCwgcGFnZVkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShsYXllciwgcGFnZVgsIHBhZ2VZLCAwLjA1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgbGV0IHBhcmFsbGF4U2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fYmcnKSxcclxuICAgICAgICAgICAgcGljID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fX3NlY3Rpb24tcGljJyksXHJcbiAgICAgICAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcicpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb3ZlOiBmdW5jdGlvbiAobGF5ZXIsIHdTY3JvbGwsIHJhdGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzY3JvbGwgPSB3U2Nyb2xsIC8gcmF0ZSArICclJztcclxuXHJcbiAgICAgICAgICAgICAgICBsYXllci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgJHtzY3JvbGx9LCAwKWA7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmUoYmcsIHdTY3JvbGwsIDY1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShwaWMsIHdTY3JvbGwsIDQ1KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyLCB3U2Nyb2xsLCAxNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgICAgIHBhcmFsbGF4U2Nyb2xsLmluaXQod1Njcm9sbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xyXG4gICAgICAgICAgICBwYXJhbGxheE1vdXNlLmluaXQoZS5wYWdlWCwgZS5wYWdlWSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KSgpOyJdfQ==
