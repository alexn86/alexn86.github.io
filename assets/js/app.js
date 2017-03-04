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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZsaXAuanMiLCJoYW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgc3ZnNGV2ZXJ5Ym9keSgpO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBoZXJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZXJvX3dlbGNvbWVcIiksXHJcbiAgICAgICAgaGVyb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fY29udGFpbmVyX3dlbGNvbWVcIiksXHJcbiAgICAgICAgYXV0aEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idXR0b25cIiksXHJcbiAgICAgICAgYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVyb19fY29udGFpbmVyLWJhY2tcIiksXHJcbiAgICAgICAgbWVudUZsaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1tZW51X19pdGVtX2ZsaXAgYScpO1xyXG5cclxuICAgIGxldCBmbGlwID0gZSA9PiB7XHJcbiAgICAgICAgbGV0IGMgPSBoZXJvQ29udGFpbmVyLmNsYXNzTGlzdDtcclxuXHJcbiAgICAgICAgaWYgKGUudGFyZ2V0ID09IGF1dGhCdXR0b24pIHtcclxuICAgICAgICAgICAgYXV0aEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBjLnRvZ2dsZSgnZmxpcHBlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgoYXV0aEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID09ICdub25lJyAmJiAhYmFjay5jb250YWlucyhlLnRhcmdldCkpIHx8IGUudGFyZ2V0ID09IG1lbnVGbGlwKSB7XHJcbiAgICAgICAgICAgICAgICBhdXRoQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgYy50b2dnbGUoJ2ZsaXBwZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKGhlcm8pIHtcclxuICAgICAgICBoZXJvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZmxpcCk7XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBsZXQgaGFtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhhbWJ1cmdlcicpLFxyXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xyXG5cclxuICAgIGxldCBvcGVuTWVudSA9ICgpID0+IHtcclxuICAgICAgICBoYW0uY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyX2FjdGl2ZScpO1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnbWVudV9hY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGFtKSB7XHJcbiAgICAgICAgaGFtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1lbnUpO1xyXG4gICAgfVxyXG59KSgpO1xyXG4iXX0=
