(function () {
    'use strict';

    svg4everybody();

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZsaXAuanMiLCJoYW0uanMiLCJwYXJhbGxheC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHN2ZzRldmVyeWJvZHkoKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgaGVybyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb193ZWxjb21lXCIpLFxyXG4gICAgICAgIGhlcm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fX2NvbnRhaW5lcl93ZWxjb21lXCIpLFxyXG4gICAgICAgIGF1dGhCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtYnV0dG9uXCIpLFxyXG4gICAgICAgIGJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlcm9fX2NvbnRhaW5lci1iYWNrXCIpLFxyXG4gICAgICAgIG1lbnVGbGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tbWVudV9faXRlbV9mbGlwIGEnKTtcclxuXHJcbiAgICBsZXQgZmxpcCA9IGUgPT4ge1xyXG4gICAgICAgIGxldCBjID0gaGVyb0NvbnRhaW5lci5jbGFzc0xpc3Q7XHJcblxyXG4gICAgICAgIGlmIChlLnRhcmdldCA9PSBhdXRoQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGF1dGhCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYy50b2dnbGUoJ2ZsaXBwZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoKGF1dGhCdXR0b24uc3R5bGUuZGlzcGxheSA9PSAnbm9uZScgJiYgIWJhY2suY29udGFpbnMoZS50YXJnZXQpKSB8fCBlLnRhcmdldCA9PSBtZW51RmxpcCkge1xyXG4gICAgICAgICAgICAgICAgYXV0aEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgICAgIGMudG9nZ2xlKCdmbGlwcGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChoZXJvKSB7XHJcbiAgICAgICAgaGVyby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZsaXApO1xyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgbGV0IGhhbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXInKSxcclxuICAgICAgICBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcclxuXHJcbiAgICBsZXQgb3Blbk1lbnUgPSAoKSA9PiB7XHJcbiAgICAgICAgaGFtLmNsYXNzTGlzdC50b2dnbGUoJ2hhbWJ1cmdlcl9hY3RpdmUnKTtcclxuICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21lbnVfYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhhbSkge1xyXG4gICAgICAgIGhhbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5NZW51KTtcclxuICAgIH1cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlcm9fd2VsY29tZScpO1xyXG5cclxuICAgIGxldCBwYXJhbGxheE1vdXNlID0gKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fYmcnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW92ZTogZnVuY3Rpb24gKGxheWVyLCBwYWdlWCwgcGFnZVksIHJhdGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIHJhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiByYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3Bvc2l0aW9uWH1weCwgJHtwb3NpdGlvbll9cHgsIDApYDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHBhZ2VYLCBwYWdlWSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKGxheWVyLCBwYWdlWCwgcGFnZVksIDAuMDUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBsZXQgcGFyYWxsYXhTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19iZycpLFxyXG4gICAgICAgICAgICBwaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fc2VjdGlvbi1waWMnKSxcclxuICAgICAgICAgICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vdmU6IGZ1bmN0aW9uIChsYXllciwgd1Njcm9sbCwgcmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbCA9IHdTY3JvbGwgLyByYXRlICsgJyUnO1xyXG5cclxuICAgICAgICAgICAgICAgIGxheWVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwLCAke3Njcm9sbH0sIDApYDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZShiZywgd1Njcm9sbCwgNjUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHBpYywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDE1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICBsZXQgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICAgICAgcGFyYWxsYXhTY3JvbGwuaW5pdCh3U2Nyb2xsKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChjb250YWluZXIpIHtcclxuICAgICAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XHJcbiAgICAgICAgICAgIHBhcmFsbGF4TW91c2UuaW5pdChlLnBhZ2VYLCBlLnBhZ2VZKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0pKCk7Il19
