const rankedListEtanol = getRank("etanol");

const Etanol = () => {
    getStatisticDataEtanol();
    updateRankEtanol();
    updateSelectorEtanol();
};

const updateSelectorEtanol = () => {
    const listOfNames = staticData.etanol.map((elem) => elem.Usina);

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

        staticData.etanol.forEach((elem) => {
            if (elem.Usina === name) {
                NEEAComponent.hidrat[3].innerHTML = elem.Hidratado.NEEA?.toFixed(2) ?? "--";
                NEEAComponent.anidro[3].innerHTML = elem.Anidro.NEEA?.toFixed(2) ?? "--";
                prodComponent.hidrat[3].innerHTML = elem.Hidratado.Producao?.toFixed(1) ?? "--";
                prodComponent.anidro[3].innerHTML = elem.Anidro.Producao?.toFixed(1) ?? "--";
                CBIOsComponent.hidrat[3].innerHTML = elem.Hidratado.CBIOs ?? "--";
                CBIOsComponent.anidro[3].innerHTML = elem.Anidro.CBIOs ?? "--";
                overCBIOsComponent.hidrat[3].innerHTML = elem.Hidratado.overCBIOs ?? "--";
                overCBIOsComponent.anidro[5].innerHTML = elem.Anidro.overCBIOs ?? "--";

                elegComponent.innerHTML = elem.Elegibilidade?.toString().concat("%") ?? "--";
            };
        });
        const burger = document.querySelector('.burger');
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('tabbar-transition');
        burger.classList.toggle('toggle');
    };
};

const getStatisticDataEtanol = () => {
    const updateData = (name) => {
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
                key = "Elegibilidade"
                round = 1;
                position = 3;
                getStatisticOfElegility(key, round);
                return;
        }

        let average = { hidrat: 0, anidro: 0 };
        let count = { hidrat: 0, anidro: 0 };
        const aux = { hidrat: [], anidro: [] };

        staticData.etanol.forEach((elem) => {
            const hidrat = elem.Hidratado[key]; // or elem.Hidratado[key] ?? null;
            const anidro = elem.Anidro[key];
            if (hidrat) {
                average.hidrat = average.hidrat + hidrat;
                count.hidrat = count.hidrat + 1;
                aux.hidrat.push(hidrat);
            };
            if (anidro) {
                average.anidro = average.anidro + anidro;
                count.anidro = count.anidro + 1;
                aux.anidro.push(anidro);
            };
        });

        average = {
            hidrat: (average.hidrat / count.hidrat).toFixed(round),
            anidro: (average.anidro / count.anidro).toFixed(round),
        };

        const max = {
            hidrat: Math.max(...aux.hidrat).toFixed(round),
            anidro: Math.max(...aux.anidro).toFixed(round),
        };
        const min = {
            hidrat: Math.min(...aux.hidrat).toFixed(round),
            anidro: Math.min(...aux.anidro).toFixed(round),
        };

        const divHidrat = document.querySelectorAll("div#hidratado.statistic-data")
        const divAnidro = document.querySelectorAll("div#anidro.statistic-data");

        divHidrat[position].childNodes[7].innerHTML = average.hidrat;
        divHidrat[position].childNodes[11].innerHTML = max.hidrat;
        divHidrat[position].childNodes[15].innerHTML = min.hidrat;

        divAnidro[position].childNodes[7].innerHTML = average.anidro;
        divAnidro[position].childNodes[11].innerHTML = max.anidro;
        divAnidro[position].childNodes[15].innerHTML = min.anidro;
    };

    const getStatisticOfElegility = (key, round) => {
        let average = 0;
        let count = 0;
        const aux = [];
        staticData.etanol.forEach((elem) => {
            if (elem[key]) {
                average += elem[key];
                count += 1;
                aux.push(elem[key])
            };
        });

        average = (average / count).toFixed(round);

        document.getElementById("average-eleg").innerHTML = average.toString().concat("%");
        document.getElementById("max-eleg").innerHTML = Math.max(...aux).toFixed(round).toString().concat("%");
        document.getElementById("min-eleg").innerHTML = Math.min(...aux).toFixed(round).toString().concat("%");
    };

    updateData("NEEA");
    updateData("eleg");
    updateData("prod");
    updateData("CBIOs");
};



const updateRankEtanol = () => {
    const topCompaniesNames = document.querySelectorAll("p.top-item#name");
    const topCompaniesValues = document.querySelectorAll("p.top-item#value");


    topCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = rakedCompanies.etanol[i];
    });

    topCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = rankedListBiodiesel.rank[i]?.toFixed(2);
    });

    const bottomCompaniesNames = document.querySelectorAll("p.bottom-item#name");
    const bottomCompaniesValues = document.querySelectorAll("p.bottom-item#value");

    bottomCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = rakedCompanies.etanol[rakedCompanies.etanol.length + (i - 5)];
    });

    bottomCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = rankedListBiodiesel.rank[rankedListBiodiesel.rank.length + (i - 5)]?.toFixed(2);
    });
};
