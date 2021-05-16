const Etanol = async () => {
    await getStatisticDataEtanol();
    await updateRankEtanol();
    await updateSelectorEtanol();
};

const updateSelectorEtanol = async () => {
    let listOfNames;
    try {
        const response = await fetch(BASE_URL + 'company-names/etanol');
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

    const updateCurrentCompanyData = async (name) => {
        const divHidrat = document.querySelectorAll("div#hidratado.statistic-data")
        const divAnidro = document.querySelectorAll("div#anidro.statistic-data");
        document.querySelector(".company-name").innerHTML = name;

        const NEEAComponent = {
            hidrat: divHidrat[0].childNodes,
            anidro: divAnidro[0].childNodes,
        };
        const prodComponent = {
            hidrat: divHidrat[1].childNodes,
            anidro: divAnidro[1].childNodes,
        };
        const CBIOsComponent = {
            hidrat: divHidrat[2].childNodes,
            anidro: divAnidro[2].childNodes,
        };
        const overCBIOsComponent = {
            hidrat: document.querySelector(".value-container").childNodes,
            anidro: document.querySelector(".value-container").childNodes,
        };

        const elegComponent = document.querySelector(".eligibility");

        let statisticData;
        try {
            const response = await fetch(BASE_URL + 'statistic-data/get-one/etanol&' + name);
            const data = await response.json();
            statisticData = data ?? {
                Elegibilidade: null,
                Hidratado: {
                    NEEA: null,
                    Producao: null,
                    CBIOs: null,
                    overCBIOs: null
                },
                Anidro: {
                    NEEA: null,
                    Producao: null,
                    CBIOs: null,
                    overCBIOs: null
                },
            };
        } catch (error) {
            console.warn(error);
        };

        NEEAComponent.hidrat[3].innerHTML = statisticData.Hidratado.NEEA?.toFixed(2) ?? "--";
        NEEAComponent.anidro[3].innerHTML = statisticData.Anidro.NEEA?.toFixed(2) ?? "--";
        prodComponent.hidrat[3].innerHTML = statisticData.Hidratado.Producao?.toFixed(1) ?? "--";
        prodComponent.anidro[3].innerHTML = statisticData.Anidro.Producao?.toFixed(1) ?? "--";
        CBIOsComponent.hidrat[3].innerHTML = statisticData.Hidratado.CBIOs ?? "--";
        CBIOsComponent.anidro[3].innerHTML = statisticData.Anidro.CBIOs ?? "--";
        overCBIOsComponent.hidrat[3].innerHTML = statisticData.Hidratado.overCBIOs ?? "--";
        overCBIOsComponent.anidro[5].innerHTML = statisticData.Anidro.overCBIOs ?? "--";

        elegComponent.innerHTML = statisticData.Elegibilidade?.toString().concat("%") ?? "--";

        const burger = document.querySelector('.burger');
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('tabbar-transition');
        burger.classList.toggle('toggle');
    };
};

const getStatisticDataEtanol = () => {
    const updateData = async (name) => {
        let key;
        let round;
        let position;
        switch (name) {
            case "NEEA":
                key = name;
                round = 2;
                position = 0;
                break;
            case "prod":
                key = "Producao";
                round = 1;
                position = 1;
                break;
            case "CBIOs":
                key = name;
                rount = 0;
                position = 2;
                break;
            case "eleg":
                round = 1;
                position = 3;
                getStatisticOfElegility(round);
                return;
        }

        let dataAnidro, dataHidrat;
        try {
            const resHidrat = await fetch(BASE_URL + 'statistic-data/get-details/etanol/Hidratado&' + key);
            dataHidrat = await resHidrat.json();
        } catch (error) {
            console.warn(error);
        };

        try {
            const resAndrido = await fetch(BASE_URL + 'statistic-data/get-details/etanol/Anidro&' + key);
            dataAnidro = await resAndrido.json();
        } catch (error) {
            console.warn(error);
        };

        const average = { hidrat: dataHidrat.average.toFixed(round), anidro: dataAnidro.average.toFixed(round) };
        const max = { hidrat: dataHidrat.max.toFixed(round), anidro: dataAnidro.max.toFixed(round) };
        const min = { hidrat: dataHidrat.min.toFixed(round), anidro: dataAnidro.min.toFixed(round) };

        const divHidrat = document.querySelectorAll("div#hidratado.statistic-data")
        const divAnidro = document.querySelectorAll("div#anidro.statistic-data");

        divHidrat[position].childNodes[7].innerHTML = average.hidrat;
        divHidrat[position].childNodes[11].innerHTML = max.hidrat;
        divHidrat[position].childNodes[15].innerHTML = min.hidrat;

        divAnidro[position].childNodes[7].innerHTML = average.anidro;
        divAnidro[position].childNodes[11].innerHTML = max.anidro;
        divAnidro[position].childNodes[15].innerHTML = min.anidro;
    };

    const getStatisticOfElegility = async (round) => {
        let data;
        try {
            const response = await fetch(BASE_URL + 'statistic-data/get-details/etanol/elegibilidade');
            data = await response.json();
        } catch (error) {
            console.warn(error);
        }

        document.getElementById("average-eleg").innerHTML = data.average.toFixed(round).concat("%");
        document.getElementById("max-eleg").innerHTML = data.max.toFixed(round).toString().concat("%");
        document.getElementById("min-eleg").innerHTML = data.min.toFixed(round).toString().concat("%");
    };

    updateData("NEEA");
    updateData("eleg");
    updateData("prod");
    updateData("CBIOs");
};



const updateRankEtanol = async () => {
    const topCompaniesNames = document.querySelectorAll("p.top-item#name");
    const topCompaniesValues = document.querySelectorAll("p.top-item#value");

    let topNEEA, bottomNEEA;
    try {
        const response = await fetch(BASE_URL + 'get-ranking/etanol');
        const data = await response.json();
        topNEEA = data.topNEEA;
        bottomNEEA = data.bottomNEEA;
    } catch (error) {
        console.warn(error);
    }

    topCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = topNEEA[i].Usina;
    });

    topCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = topNEEA[i].Hidratado.NEEA.toFixed(2);
    });

    const bottomCompaniesNames = document.querySelectorAll("p.bottom-item#name");
    const bottomCompaniesValues = document.querySelectorAll("p.bottom-item#value");

    bottomCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = bottomNEEA[4 - i].Usina;
    });

    bottomCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = bottomNEEA[4 - i].Hidratado.NEEA.toFixed(2);
    });
};
