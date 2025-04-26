"use server";

// import { getMeetingType } from "@/lib/data";
import { db } from "@/lib/firebase";
import { AsistenciaDetalle, Meeting, MeetingByGruup } from "@/types-db";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const collectionName = "meetings";

export const CreateMeetingAction = async (reunion: Meeting) => {
  try {
    await addDoc(collection(db, collectionName), reunion).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error CreateMeetingAction"
    );
  }
};
export const GetMeetingsAction = async () => {
  try {
    const q = query(collection(db, collectionName), orderBy("fecha"));
    const querySnapShot = await getDocs(q);
    const meetingsData = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Meeting[];

    return meetingsData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMeetingsAction"
    );
  }
};
export const GetMeetingsByCongregationAction = async (congregationId: string) => {
  try {
    const q = query(collection(db, collectionName), where("congregacion","==",congregationId));
    const querySnapShot = await getDocs(q);
    const meetingsData = querySnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Meeting[];

    return meetingsData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMeetingsByCongregationAction"
    );
  }
};
export const GetMeetingAction = async (meetingId: string) => {
  try {
    const docRef = doc(db, collectionName, meetingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const meetingData = {
        ...docSnap.data(),
        id: docSnap.id,
      };
      return meetingData as Meeting;
    } else {
      throw new Error("Documento no encontrado");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error GetMeetingAction"
    );
  }
};
export const DeleteMeetingAction = async (id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id)).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error DeleteMeetingAction"
    );
  }
};
export const UpdateMeetingAction = async (
  meeting: Meeting
  // id: string,
  // nombre: string,
  // detalle: AsistenciaDetalle[]
) => {
  try {
    await updateDoc(doc(db, collectionName, meeting.id), {
        // fecha: meeting.fecha,
        // congregacion: meeting.congregacion,
        // estado: meeting.estado,
        nombre: meeting.nombre,
        detalle: meeting.detalle
    }).catch((error) => {
      throw new Error(error);
    });
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Error UpdateMeetingAction"
    );
  }
};

export const fetchDashboardData = async() =>{
  const snapshot = await getDocs(collection(db, collectionName))
  const data: Meeting[]=[]

  snapshot.forEach((doc)=>{
    const d = doc.data();
    data.push({
      grupo: d.grupo,
      congregacion: d.congregacion,
      detalle: d.detalle || [],
      id: "",
      nombre: "",
      fecha: ""
    })
  })

  // Clasificar por tipo y sector
  const resumenPorGrupo: Record<string, number> = {};
  const resumenPorCongregacion: Record<string, number> = {};

  for (const reunion of data) {
    const asistencias = reunion.detalle.filter(a => a.valor === "A")
    resumenPorGrupo[reunion.grupo] = (resumenPorGrupo[reunion.grupo] || 0) + asistencias.length;
    resumenPorCongregacion[reunion.congregacion] = (resumenPorCongregacion[reunion.congregacion] || 0) + asistencias.length;
  }

  return { resumenPorGrupo, resumenPorCongregacion };


}

interface PeriodoFiltro {
  label: "este mes" | "ultimos 3 meses" | "ultimos 6 meses";
}
export const fetchDashboardData2 = async (
  periodo: PeriodoFiltro["label"],
  tipoReunion: string | null = null
) => {
  const snapshot = await getDocs(collection(db, collectionName));
  const now = new Date();

  const data: Meeting[] = [];

  snapshot.forEach((doc) => {
    const d = doc.data();
    data.push({
      id: doc.id,
      grupo: d.grupo,
      congregacion: d.congregacion,
      fecha: d.fecha,
      detalle: d.detalle || [],
      nombre: ""
    });
  });

  // 1. Filtrar por periodo
  const desde = (() => {
    switch (periodo) {
      case "este mes":
        return new Date(now.getFullYear(), now.getMonth(), 1);
      case "ultimos 3 meses":
        return new Date(now.getFullYear(), now.getMonth() - 2, 1);
      case "ultimos 6 meses":
        return new Date(now.getFullYear(), now.getMonth() - 5, 1);
    }
  })();

  const filtradas = data.filter((reunion) => {
    const fecha = new Date(reunion.fecha);
    const cumplePeriodo = fecha >= desde;
    const cumpleTipo = tipoReunion ? reunion.grupo === tipoReunion : true;
    return cumplePeriodo && cumpleTipo;
  });

  // 2. Formato para gráfico de barras: cada reunión es una barra
  const resumenPorReunion = filtradas.map((reunion) => {
    const totalA = reunion.detalle.filter((a) => a.valor === "A").length;
    return {
      reunionId: reunion.id,
      fecha: reunion.fecha,
      grupo: reunion.grupo,
      congregacion: reunion.congregacion,
      totalA,
    };
  });

  return resumenPorReunion;
};


interface MeetingDetails{
  grupo: string;
  congregacion: string;
  fecha: string;
  total_participantes: number,
  total_asistentes:number,
}


export const fetchMeetingsByGrupo = async () => {
  const snapshot = await getDocs(collection(db, collectionName));
  const data : MeetingDetails[] = []
  const agrupados: { [key: string]: MeetingByGruup } = {};
  snapshot.forEach((doc)=>{
    const d = doc.data();
    data.push({
      grupo: d.grupo,
      congregacion: d.congregacion,
      fecha: d.fecha,
      total_participantes: d.detalle.length,
      total_asistentes: d.detalle.filter((a : AsistenciaDetalle)=> a.valor === "A").length
    });
  })

  data.map((reunion) => {
    const { grupo, total_participantes, total_asistentes } = reunion;
    if (!agrupados[grupo]) {
      agrupados[grupo] = {
        grupo,
        cantidad_reuniones: 0,
        total_participantes: 0,
        total_asistentes: 0,
        porcentaje: 0,
      };
    }
    agrupados[grupo].cantidad_reuniones += 1;
    agrupados[grupo].total_participantes += total_participantes;
    agrupados[grupo].total_asistentes += total_asistentes;
  });

  // Calcular el porcentaje para cada grupo
  const resultados: MeetingByGruup[] = Object.values(agrupados).map(grupo => {
    const porcentaje = grupo.total_participantes > 0
      ? (grupo.total_asistentes / grupo.total_participantes) * 100
      : 0;
    return {
      ...grupo,
      porcentaje,
    };
  });

  return resultados;

}
