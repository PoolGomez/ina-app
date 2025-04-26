import { Book, BookOpen, Speaker, Activity, Users } from "lucide-react";

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
        id:"ALL",
        name:"General",
        icon: Users, //Users Speaker
        color:"bg-blue-500",
        textColor:"text-blue-500"
    },
    {
        id: "ED",
        name: "Escuela Dominical",
        icon: Book, //Child 
        color: 'bg-amber-500',
        textColor: 'text-amber-500',
    },
    {
        id: "HE",
        name: "Hermanos",
        icon: Speaker, // Speaker Users
        color:"bg-blue-500",
        textColor:"text-blue-500"
    },
    {
        id: "JV",
        name: "Jovenes",
        icon: Activity, 
        color: 'bg-emerald-500',
        textColor: 'text-emerald-500',
    },
    
    {
        id: "MI",
        name: "Ministros",
        icon: BookOpen, //Cross
        color: 'bg-purple-500',
        textColor: 'text-purple-500',
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
export const getMeetingName = (groupId: string) => {
    const meeting = typeMeeting.find((item) => item.id === groupId);
    if (meeting) {
    return meeting.name;
    } else {
    return "";
    }
}

export const getMeetingType = (grupoId: string) => {
    const meeting = typeMeeting.find((item) => item.id === grupoId);
    return meeting
}

export const getColorMeetingType = (grupoId: string) => {
    const meeting = typeMeeting.find((item) => item.id === grupoId);
    if (meeting) {
    return meeting.color;
    } else {
    return "";
    }
}
export const getTextColorMeetingType = (grupoId: string) => {
    const meeting = typeMeeting.find((item) => item.id === grupoId);
    if (meeting) {
    return meeting.textColor;
    } else {
    return "";
    }
}
export const getIconMeetingType = (grupoId: string) => {
    const meeting = typeMeeting.find((item) => item.id === grupoId);
    if (meeting) {
    return meeting.icon;
    } else {
    return "";
    }
}
