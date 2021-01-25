const App = () => {

    const etanolButton = document.querySelector("div#etanol.primary-button");
    const biodieselButton = document.querySelector("div#biodiesel.primary-button");

    etanolButton.onclick = function () { renderBiodieselInfos() }

    biodieselButton.onclick = function () { renderEtanolInfos() }

    const product = document.querySelector(".nav h2");
    function renderBiodieselInfos() {
        product.innerHTML = "Etanol";
        cleanDisplayEtanol();
        Etanol();
    }
    function renderEtanolInfos() {
        product.innerHTML = "Biodiesel";
        cleanDisplayBiodiesel();
        Biodiesel();
    }

    openSidebar();

};

const openSidebar = () => {
    const burger = document.querySelector('.burger');
    const sidebar = document.querySelector('.sidebar');

    burger.addEventListener('click', () => {
        sidebar.classList.toggle('tabbar-transition');
        burger.classList.toggle('toggle');
    });
};

App();
