"use client";
import { CreateMeetingAction } from "@/actions/meeting-action";
import { GetMembersByCongregationAction } from "@/actions/member-action";
import { Heading } from "@/app/main/(root)/_components/heading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Meeting, Member } from "@/types-db";
import { ArrowLeftCircleIcon, Loader, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AttendanceButton } from "../../_components/button-attendance";

interface AsistenciaDetalle {
  miembroId: string;
  valor: "A" | "T" | "F";
}

export const CreateMeetingForm = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);

  const [miembros, setMiembros] = useState<Member[]>([]);
  const [congregacion, setCongregacion] = useState("");
  const [fecha, setFecha] = useState("");
  const [participantes, setParticipantes] = useState<AsistenciaDetalle[]>([]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const reunion = {
        fecha,
        congregacion,
        estado: true,
        detalle: participantes,
      };
      await CreateMeetingAction(reunion as Meeting);

      toast.success("Reunion creado correctamente");
      setIsLoading(false);
      router.push(`/main/reuniones`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Algo salió mal");
      }
      setIsLoading(false);
    }
  };

  const handleClickBack = () => {
    router.push(`/main/reuniones`);
  };
  const selectCongregacion = (value: string) => {
    setCongregacion(value);
    getParticipantes(value);
  };
  const getParticipantes = async (cong: string) => {
    const miembrosData = await GetMembersByCongregationAction(cong);
    setMiembros(miembrosData);
    const data = miembrosData.map((item) => {
      return {
        miembroId: item.id,
        valor: "F",
      };
    });
    setParticipantes(data as AsistenciaDetalle[]);
  };

  const mostrarNombreParticipante = (id: string) => {
    const result = miembros.find((item) => item.id === id);
    const nombre = result?.apellidos + " " + result?.nombres;
    return nombre;
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

  return (
    <>
      <div className="flex items-center justify-center">
        <Heading
          title={"Nueva Reunión"}
          description={"Registrar una nueva reunión"}
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <Select
                // onValueChange={field.onChange}
                onValueChange={selectCongregacion}
                // defaultValue={field.value}
                defaultValue={congregacion}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CG9">Canto Grande 9</SelectItem>
                  <SelectItem value="HU">Huanta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
              <Checkbox
              // checked={field.value}
              // onCheckedChange={field.onChange}
              />
              <div className="space-y-1 leading-none">
                <Label>Disponible</Label>
                <Label>Esta reeunion estará disponible</Label>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          {participantes.map((participante) => (
            // <h1 key={participante.miembroId}>{mostrarNombreParticipante(participante.miembroId)}</h1>
            <div
              key={participante.miembroId}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white"
            >
              <span className="text-lg">
                {mostrarNombreParticipante(participante.miembroId)}
              </span>
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
            Reunión
          </Button>
        </div>
      </div>
    </>
  );
};
