export interface Member{
    id: string;

    congregacion: string;
    distrito: string;
    pais: string;
    apellidos: string;
    nombres: string;
    genero: string;
    fecha_nacimiento: string;
    lugar_nacimiento: string;
    fecha_bautismo: string;
    fecha_sellamiento: string;
    num_documento: string;
    estado_civil: string;
    fecha_matrimonio_civil: string
    direccion: string
    telefono: string;
    celular: string;
    ocupacion: string;
    actividad_ina: string;
    grupo: string;
    email: string;

}

export interface Meeting{
    id: string;
    nombre:string;
    fecha: string;
    congregacion: string;
    grupo: string;
    detalle: AsistenciaDetalle[]
}
export interface Attendance {
    id: string;
    meetingId: string;
    details: AttendanceDetails[];
}

export interface AttendanceDetails{
    memberId: string;
    value: 'A'|'T'|'F';
}

export interface AsistenciaDetalle{
    miembroId: string;
    valor: 'A'|'T'|'F'
  }