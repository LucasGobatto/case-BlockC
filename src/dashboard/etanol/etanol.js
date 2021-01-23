const rankedList = getRank("etanol");
console.log(rankedList)

const App = () => {
    updateSelector();
    getStatisticData();
    updateRank();
};

const updateSelector = () => {
    const listOfNames = staticData.etanol.map((elem) => elem.Usina);

    const selector = document.querySelector(".selector");
    listOfNames.forEach((elem) => {
        const button = document.createElement("button");
        button.innerHTML = elem;
        button.onclick = () => { updateCurrentCompanyData(elem) };
        selector.appendChild(button);
    });

    const updateCurrentCompanyData = (name) => {
        const NEEAComponent = {
            hidrat: document.querySelector("#NEEA-hidratado"),
            anidro: document.querySelector("#NEEA-anidro")
        };
        const elegComponent = document.querySelector(".eleg");
        const prodComponent = {
            hidrat: document.querySelector("#prod-hidratado"),
            anidro: document.querySelector("#prod-anidro")
        };
        const CBIOsComponent = {
            hidrat: document.querySelector("#CBIOs-hidratado"),
            anidro: document.querySelector("#CBIOs-anidro")
        };
        const overCBIOsComponent = {
            hidrat: document.querySelector("#overCBIOs-hidratado"),
            anidro: document.querySelector("#overCBIOs-anidro")
        };
        document.querySelector(".company-name").innerHTML = name;

        staticData.etanol.forEach((elem) => {
            if (elem.Usina === name) {
                NEEAComponent.hidrat.innerHTML = elem.Hidratado.NEEA?.toFixed(2) ?? "";
                NEEAComponent.anidro.innerHTML = elem.Anidro.NEEA?.toFixed(2) ?? "";
                elegComponent.innerHTML = elem.Elegibilidade?.toString().concat("%") ?? "";
                prodComponent.hidrat.innerHTML = elem.Hidratado.Producao?.toFixed(1) ?? "";
                prodComponent.anidro.innerHTML = elem.Anidro.Producao?.toFixed(1) ?? "";
                CBIOsComponent.hidrat.innerHTML = elem.Hidratado.CBIOs ?? "";
                CBIOsComponent.anidro.innerHTML = elem.Anidro.CBIOs ?? "";
                overCBIOsComponent.hidrat.innerHTML = elem.Hidratado.overCBIOs ?? "";
                overCBIOsComponent.anidro.innerHTML = elem.Anidro.overCBIOs ?? "";
            };
        });
    };
};

const getStatisticData = () => {
    const updateData = (name) => {
        let key;
        let round;
        switch (name) {
            case "NEEA":
                key = name;
                round = 2;
                break;
            case "prod":
                key = "Producao";
                round = 1;
                break;
            case "eleg":
                key = "Elegibilidade"
                round = 1;
                getStatisticOfElegility(key, round);
                return;
            case "CBIOs":
                key = name;
                rount = 0;
                break;
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

        document.getElementById(`average-${name}-hidratado`).innerHTML = average.hidrat;
        document.getElementById(`average-${name}-anidro`).innerHTML = average.anidro;
        document.getElementById(`max-${name}-hidratado`).innerHTML = max.hidrat;
        document.getElementById(`max-${name}-anidro`).innerHTML = max.anidro;
        document.getElementById(`min-${name}-hidratado`).innerHTML = min.hidrat;
        document.getElementById(`min-${name}-anidro`).innerHTML = min.anidro;
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



const updateRank = () => {
    const topCompaniesNames = document.querySelectorAll("p.top-item#name");
    const topCompaniesValues = document.querySelectorAll("p.top-item#value");


    topCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = rakedCompanies.etanol[i];
    });

    topCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = rankedList.rank[i]?.toFixed(2);
    });

    const bottomCompaniesNames = document.querySelectorAll("p.bottom-item#name");
    const bottomCompaniesValues = document.querySelectorAll("p.bottom-item#value");

    bottomCompaniesNames.forEach((elem, i) => {
        elem.innerHTML = rakedCompanies.etanol[rakedCompanies.etanol.length + (i - 5)];
    });

    bottomCompaniesValues.forEach((elem, i) => {
        elem.innerHTML = rankedList.rank[rankedList.rank.length + (i - 5)]?.toFixed(2);
    });
};

App();
