function getRank(product) {
    const aux = [];
    staticData[product].forEach((elem) => {
        switch (product) {
            case "biodiesel":
                elem.NEEA ? aux.push({ name: elem.Usina, value: elem.NEEA }) : null;
                break;
            default:
                elem.Hidratado.NEEA ? aux.push({ name: elem.Usina, value: elem.Hidratado.NEEA }) : null;
                break;
        }
    });

    aux.sort(function (a, b) {
        if (a.value < b.value) {
            return 1;
        }
        if (a.value > b.value) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    const rank = aux.map(elem => elem.value);
    const listOfNames = aux.map(elem => elem.name);

    return { listOfNames, rank }
};