const cleanDisplayEtanol = () => {
    const title = document.querySelectorAll(".title-etanol");
    title.forEach((elem) => {
        elem.style.display = "block";
    });

    const infoCards = document.querySelector("div#info-etanol-anidro.info-container");
    if (document.body.clientWidth <= 860) {
        infoCards.style.display = "grid";
    }
    else {
        infoCards.style.display = "flex";
    };

    const divider = document.querySelector("div#divider-anidro.divider");
    divider.style.display = "block";

    const selector = document.querySelector(".selector").childNodes;
    if (selector.length > 1) {
        selector.forEach((e, index) => {
            if (index >= 1) {
                e.style.display = "none";
            }
        });
    };

    const overCBIOs = document.querySelector(".value-container").childNodes;
    overCBIOs[3].style.width = "100px";
    overCBIOs[3].innerHTML = "0000";
    overCBIOs[5].style.display = "block";
    overCBIOs[5].innerHTML = "0000";


    document.querySelectorAll("div#hidratado.statistic-data").forEach((elem) => {
        elem.childNodes[3].innerHTML = "0000";
    });
    document.querySelectorAll("div#anidro.statistic-data").forEach((elem) => {
        elem.childNodes[3].innerHTML = "0000";
    });
    document.querySelector(".company-name").innerHTML = "Selecione uma Empresa";
};

const cleanDisplayBiodiesel = () => {
    // clean all divs that are not about biodiesel informations.
    const title = document.querySelectorAll(".title-etanol");
    title.forEach((elem) => {
        elem.style.display = "none";
    });

    const infoCards = document.querySelector("div#info-etanol-anidro.info-container");
    infoCards.style.display = "none";

    const divider = document.querySelector("div#divider-anidro.divider");
    divider.style.display = "none";

    const selector = document.querySelector(".selector").childNodes;
    if (selector.length > 1) {
        selector.forEach((e, index) => {
            if (index >= 1) {
                e.style.display = "none";
            }
        });
    }

    const overCBIOs = document.querySelector(".value-container").childNodes;
    overCBIOs[3].style.width = "200px";
    overCBIOs[3].innerHTML = "0000";
    overCBIOs[5].style.display = "none";
    overCBIOs[5].innerHTML = "0000";

    document.querySelector(".NEEA").innerHTML = "0000";
    document.querySelector(".eligibility").innerHTML = "0000";
    document.querySelector(".production").innerHTML = "0000";
    document.querySelector(".CBIOs").innerHTML = "0000";
    document.querySelector("p[name=overCBIOs]").innerHTML = "0000";
    document.querySelector(".company-name").innerHTML = "Selecione uma Empresa";
};
