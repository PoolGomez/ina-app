export const grupos = [
    {
        id: "ED",
        name: "Escuela Dominical"
    },
    {
        id: "JV",
        name: "Juventud"
    },
    {
        id: "HE",
        name: "Hermano(a)"
    },
    {
        id: "MI",
        name: "Ministro"
    },
]

export const congregaciones = [
    {
        id: "CG9",
        name: "Canto Grande 9"
    },
    {
        id: "HU",
        name: "Huanta"
    },
]

export const getCongregationName = (congregacionId: string) => {
    const congregacion = congregaciones.find((item) => item.id === congregacionId);
    if (congregacion) {
    return congregacion.name;
    } else {
    return "";
    }
}
export const getGroupName = (groupId: string) => {
    const group = grupos.find((item) => item.id === groupId);
    if (group) {
    return group.name;
    } else {
    return "";
    }
}

