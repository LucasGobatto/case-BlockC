const BASE_URL = 'https://fast-bayou-13171.herokuapp.com/';

const Biodiesel = async () => {
    await updateSelectorBiodiesel();
    await getStatisticDataBiodiesel();
    await updateRankBiodiesel();
};

async function updateSelectorBiodiesel() {
    let listOfNames;
    try {
        const response = await fetch(BASE_URL + 'company-names/biodiesel');
        listOfNames = (await response.json()).map(elem => elem.Usina);
    } catch (error) {
        console.warn(error);
        listOfNames = [];
    }

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

    async function updateCurrentCompanyData(name) {
        const NEEAComponent = document.querySelector(".NEEA");
        const elegComponent = document.querySelector(".eligibility");
        const prodComponent = document.querySelector(".production");
        const CBIOsComponent = document.querySelector(".CBIOs");
        const overCBIOsComponent = document.querySelector("p[name=overCBIOs]");
        document.querySelector(".company-name").innerHTML = name;

        let statisticData;
        try {
            const response = await fetch(BASE_URL + 'statistic-data/get-one/biodiesel&' + name);
            const data = await response.json();
            statisticData = data ?? { NEEA: null, Elegibilidade: null, Producao: null, CBIOs: null, overCBIOs: null };
        } catch (error) {
            console.warn(error);
        };

        NEEAComponent.innerHTML = statisticData.NEEA?.toFixed(2).toString() ?? "--";
        elegComponent.innerHTML = statisticData.Elegibilidade?.toString().concat("%") ?? "--";
        prodComponent.innerHTML = statisticData.Producao ?? "--";
        CBIOsComponent.innerHTML = statisticData.CBIOs ?? "--";
        overCBIOsComponent.innerHTML = statisticData.overCBIOs ?? "--";

        const burger = document.querySelector('.burger');
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('tabbar-transition');
        burger.classList.toggle('toggle');
    }
};

const getStatisticDataBiodiesel = async () => {
    const updateData = async (name) => {
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
            case 'NEEA':
                key = name;
                round = 2;
                break;
        };

        let min, max, average;
        try {
            const response = await fetch(BASE_URL + 'statistic-data/get-details/biodiesel/' + key);
            const data = await response.json();
            min = data.min;
            max = data.max;
            average = Number(data.average)?.toFixed(round);
        } catch (error) {
            console.log(error);
        };

        document.getElementById(`average-${name}`).innerHTML = average;
        document.getElementById(`max-${name}`).innerHTML = max;
        document.getElementById(`min-${name}`).innerHTML = min;

    };

    await updateData("NEEA");
    await updateData("eleg")
    await updateData("prod")
    await updateData("CBIOs")
};


const updateRankBiodiesel = async () => {
    const topCompaniesNames = document.querySelectorAll("p.top-item#name");
    const topCompaniesValues = document.querySelectorAll("p.top-item#value");

    let top = [];
    let bottom = [];
    try {
        const response = await fetch(BASE_URL + 'get-ranking/biodiesel');
        const data = await response.json();
        top = data.topNEEA;
        bottom = data.bottomNEEA;
    } catch (error) {
        console.log(error);
    }

    topCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = top[i].Usina;
    });

    topCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = top[i].NEEA.toFixed(2);
    });

    const bottomCompaniesNames = document.querySelectorAll("p.bottom-item#name");
    const bottomCompaniesValues = document.querySelectorAll("p.bottom-item#value");

    bottomCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = bottom[4 - i].Usina;
    });

    bottomCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = bottom[4 - i].NEEA.toFixed(2);
    });
};
