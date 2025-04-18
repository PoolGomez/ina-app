"use client";
import { GetMembersByCongregationAction } from "@/actions/member-action";
import { Heading } from "@/app/main/(root)/_components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { AsistenciaDetalle, Meeting, Member } from "@/types-db";
import { ArrowLeftCircleIcon, Loader, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AttendanceButton } from "../../_components/button-attendance";
import { UpdateMeetingAction } from "@/actions/meeting-action";
import toast from "react-hot-toast";

interface MeetingFormProps {
  data: Meeting | null;
}

export const MeetingForm = ({ data }: MeetingFormProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);

  const [miembros, setMiembros] = useState<Member[]>([]);
  const [congregacion, setCongregacion] = useState(data?.congregacion);
  const [fecha, setFecha] = useState(data?.fecha);
  const [participantes, setParticipantes] = useState<AsistenciaDetalle[]>(
    data?.detalle || []
  );

  useEffect(() => {

    const getParticipantes = async () => {
      const miembrosData = await GetMembersByCongregationAction(data?.congregacion as string);
      setMiembros(miembrosData);
      const datos = miembrosData.map((item) => {
        const result = data?.detalle.find((value) => value.miembroId === item.id);
        if (result !== undefined) {
          return {
            miembroId: item.id,
            valor: result.valor,
          };
        } else {
          return {
            miembroId: item.id,
            valor: "F",
          };
        }
      });
      setParticipantes(datos as AsistenciaDetalle[]);
    };

    getParticipantes();
  }, [data?.congregacion]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await UpdateMeetingAction({
        id: data?.id,
        fecha,
        congregacion,
        estado: true,
        detalle: participantes,
      } as Meeting);
      toast.success("Reunion actualizado correctamente");
      setIsLoading(false);
      router.push(`/main/reuniones`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Algo salió mal");
      }
      setTimeout(() => {
        setIsLoading(false);
        router.push(`/main/reuniones`);
      }, 2000);
    }
  };

  const mostrarNombresParticipante = (id: string) => {
    const result = miembros.find((item) => item.id === id);
    const nombres = result?.nombres;
    return nombres;
  };
  const mostrarApellidosParticipante = (id: string) => {
    const result = miembros.find((item) => item.id === id);
    const apellidos = result?.apellidos;
    return apellidos;
  };

  const updateAttendanceStatus = (
    id: string,
    value: AsistenciaDetalle["valor"]
  ) => {
    setParticipantes(
      participantes.map((participante) => {
        if (participante.miembroId === id) {
          return {
            miembroId: id,
            valor: value,
          };
        }

        return participante;
      })
    );
  };

  

  const handleClickBack = () => {
    router.push(`/main/reuniones`);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Heading
          title={"Editar Registro"}
          description={"Editar los datos de un miembro"}
        />
        <ArrowLeftCircleIcon
          className={` ${
            isMobile ? "mx-2 w-8 h-8" : "mx-4 w-12 h-12"
          } cursor-pointer `}
          onClick={() => handleClickBack()}
        />
      </div>

      <Separator />

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Datos de la Reunión</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label>Fecha</Label>
              <Input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div>
              <Label>Congregación</Label>
              <Input
                type="text"
                disabled
                value={congregacion}
                onChange={(e) => setCongregacion(e.target.value)}
              />
            </div>

          </div>
        </div>

        <Separator />

        <div>
          {participantes.map((participante) => (
            
            <div
              key={participante.miembroId}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
            >
              <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  {mostrarApellidosParticipante(participante.miembroId)}
                </span>
                <span className="text-sm text-gray-500">
                  {mostrarNombresParticipante(participante.miembroId)}
                </span>
              </div>

              <div className="flex gap-2">
                <AttendanceButton
                  status="A"
                  selected={participante.valor === "A"}
                  onClick={() =>
                    updateAttendanceStatus(participante.miembroId, "A")
                  }
                />
                <AttendanceButton
                  status="T"
                  selected={participante.valor === "T"}
                  onClick={() =>
                    updateAttendanceStatus(participante.miembroId, "T")
                  }
                />
                <AttendanceButton
                  status="F"
                  selected={participante.valor === "F"}
                  onClick={() =>
                    updateAttendanceStatus(participante.miembroId, "F")
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={onSubmit}>
            {" "}
            {isLoading ? <Loader className="animate-spin" /> : <Save />} Guardar
            Cambios
          </Button>
        </div>
      </div>
    </>
  );
};
