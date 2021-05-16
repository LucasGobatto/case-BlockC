const App = () => {
    const etanolButton = document.querySelector("#etanol.primary-button");
    const biodieselButton = document.querySelector("#biodiesel.primary-button");


    etanolButton.onclick = () => { renderEtanolInfos() }
    biodieselButton.onclick = () => { renderBiodieselInfos() }

    const product = document.querySelector(".nav h2");

    function renderEtanolInfos() {
        cleanDisplayEtanol();
        product.innerHTML = "Etanol";
        Etanol();
    };

    function renderBiodieselInfos() {
        cleanDisplayBiodiesel();
        product.innerHTML = "Biodiesel";
        Biodiesel();
    }

    openSidebar();

    const burger = document.querySelector('.burger');
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('tabbar-transition');
    burger.classList.toggle('toggle');

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
