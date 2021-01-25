const App = () => {


    const etanolButton = document.querySelector("#etanol.primary-button");
    const biodieselButton = document.querySelector("#biodiesel.primary-button");

    window.onload = () => {
        etanolButton.onclick = () => { renderEtanolInfos() }
        biodieselButton.onclick = () => { renderBiodieselInfos() }
    };

    const product = document.querySelector(".nav h2");

    function renderEtanolInfos() {
        try {
            cleanDisplayEtanol();
            product.innerHTML = "Etanol";
            Etanol();
        } catch (error) {
            alert(error)
        }
    };

    function renderBiodieselInfos() {
        try {
            cleanDisplayBiodiesel();
            product.innerHTML = "Biodiesel";
            Biodiesel();
        } catch (error) {
            alert(error)
        }
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
