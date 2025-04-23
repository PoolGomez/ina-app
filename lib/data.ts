export const grupos = [
    {
        id: "ED",
        name: "Escuela Dominical",
        meetingName:"Escuela Dominical"
    },
    {
        id: "JV",
        name: "Juventud",
        meetingName:"Jovenes"
    },
    {
        id: "HE",
        name: "Hermano(a)",
        meetingName:"Hermanos"
    },
    {
        id: "MI",
        name: "Ministro",
        meetingName:"Ministros"
    },
]
export const typeMeeting = [
    {
        id: "ED",
        name: "Escuela Dominical"
    },
    {
        id: "JV",
        name: "Jovenes"
    },
    {
        id: "HE",
        name: "Hermanos"
    },
    {
        id: "MI",
        name: "Ministros"
    },
    {
        id:"ALL",
        name:"General"
    }
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
export const getMeetingName = (groupId: string) => {
    const meeting = typeMeeting.find((item) => item.id === groupId);
    if (meeting) {
    return meeting.name;
    } else {
    return "";
    }
}

