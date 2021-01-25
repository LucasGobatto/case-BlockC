const rankedListBiodiesel = getRank("biodiesel");

const Biodiesel = () => {
    updateSelectorBiodiesel();
    getStatisticDataBiodiesel();
    updateRankBiodiesel();
};

function updateSelectorBiodiesel() {
    const listOfNames = staticData.biodiesel.map((elem) => elem.Usina);

    const selector = document.querySelector(".selector");
    listOfNames.forEach((elem) => {
        const button = document.createElement("button");
        const divider = document.createElement("div");
        divider.classList.add("divider");
        button.innerHTML = elem;
        button.onclick = () => { updateCurrentCompanyData(elem) };
        selector.appendChild(button);
        selector.appendChild(divider)
    });

    const updateCurrentCompanyData = (name) => {
        const NEEAComponent = document.querySelector(".NEEA");
        const elegComponent = document.querySelector(".eligibility");
        const prodComponent = document.querySelector(".production");
        const CBIOsComponent = document.querySelector(".CBIOs");
        const overCBIOsComponent = document.querySelector("p[name=overCBIOs]");
        document.querySelector(".company-name").innerHTML = name;

        staticData.biodiesel.forEach((elem) => {
            if (elem.Usina === name) {
                NEEAComponent.innerHTML = elem.NEEA?.toFixed(2).toString() ?? "--";
                elegComponent.innerHTML = elem.Elegibilidade?.toString().concat("%") ?? "--";
                prodComponent.innerHTML = elem.Producao ?? "--";
                CBIOsComponent.innerHTML = elem.CBIOs ?? "--";
                overCBIOsComponent.innerHTML = elem.overCBIOs ?? "--";
            }
        });
        const burger = document.querySelector('.burger');
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('tabbar-transition');
        burger.classList.toggle('toggle');
    }
};

const getStatisticDataBiodiesel = () => {
    const NEEA = () => {
        let average = 0;
        let count = 0;
        rankedListBiodiesel.rank.forEach((valeu) => {
            if (valeu) {
                average += valeu;
                count += 1;
            }
        });

        average = (average / count).toFixed(2);

        document.getElementById("average-NEEA").innerHTML = average;
        document.getElementById("max-NEEA").innerHTML = Math.max(...rankedListBiodiesel.rank).toFixed(2);
        document.getElementById("min-NEEA").innerHTML = Math.min(...rankedListBiodiesel.rank).toFixed(2);
    };

    const updateData = (name) => {
        let key;
        let round;
        switch (name) {
            case "prod":
                key = "Producao";
                round = 0;
                break;
            case "eleg":
                key = "Elegibilidade";
                round = 2;
                break;
            case "CBIOs":
                key = name;
                round = 0;
                break;
        };

        const aux = [];
        let average = 0;
        let index = 0;
        staticData.biodiesel.forEach((elem) => {
            const value = elem[key];
            if (value) {
                average += value;
                index += 1;
                aux.push(value)
            };
        });

        average = (average / index).toFixed(round);

        const maximun = Math.max(...aux).toFixed(round);
        const minimun = Math.min(...aux).toFixed(round);

        document.getElementById(`average-${name}`).innerHTML = average;
        document.getElementById(`max-${name}`).innerHTML = maximun;
        document.getElementById(`min-${name}`).innerHTML = minimun;

    };

    NEEA();
    updateData("eleg")
    updateData("prod")
    updateData("CBIOs")
};


const updateRankBiodiesel = () => {
    const topCompaniesNames = document.querySelectorAll("p.top-item#name");
    const topCompaniesValues = document.querySelectorAll("p.top-item#value");

    topCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = rakedCompanies.biodiesel[i];
    });

    topCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = rankedListBiodiesel.rank[i]?.toFixed(2);
    });

    const bottomCompaniesNames = document.querySelectorAll("p.bottom-item#name");
    const bottomCompaniesValues = document.querySelectorAll("p.bottom-item#value");

    bottomCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = rakedCompanies.biodiesel[rakedCompanies.biodiesel.length + (i - 5)];
    });

    bottomCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = rankedListBiodiesel.rank[rankedListBiodiesel.rank.length + (i - 5)]?.toFixed(2);
    });
};
