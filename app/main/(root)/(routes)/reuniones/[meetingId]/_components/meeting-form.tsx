"use client";
import { Heading } from "@/app/main/(root)/_components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { AsistenciaDetalle, Meeting, Member } from "@/types-db";
import { ArrowLeftCircleIcon, Loader, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AttendanceButton } from "../../_components/button-attendance";
import { UpdateMeetingAction } from "@/actions/meeting-action";
import toast from "react-hot-toast";
import { congregaciones, typeMeeting } from "@/lib/data";
import { GetMembersByCongregationAndGroupAction } from "@/actions/member-action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MeetingFormProps {
  data: Meeting | null;
}

const meetingFormSchema = z.object({
  id: z.string(),
  nombre: z.string().min(1, "El nombre es requerida"),
  fecha: z.string().min(1, "La fecha es requerida"),
  congregacion: z.string().min(1, "La congregación es requerida"),
  grupo: z.string().min(1, "El grupo es requerido"),
});

export const MeetingForm = ({ data }: MeetingFormProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);

  const [miembros, setMiembros] = useState<Member[]>([]);
  // const [congregacion, setCongregacion] = useState(data?.congregacion);
  // const [nombre, setNombre] = useState(data?.nombre);
  // const [fecha, setFecha] = useState(data?.fecha);
  const [participantes, setParticipantes] = useState<AsistenciaDetalle[]>(
    data?.detalle || []
  );


  const form = useForm<z.infer<typeof meetingFormSchema>>({
      resolver: zodResolver(meetingFormSchema),
      defaultValues: {
          id: data?.id,
          nombre: data?.nombre,
          fecha:data?.fecha,
          congregacion: data?.congregacion,
          grupo: data?.grupo
          
      },
  });


  useEffect(() => {

    const getParticipantes = async () => {
      const miembrosData = await GetMembersByCongregationAndGroupAction(data?.congregacion as string,data?.grupo as string);
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
  }, [data?.congregacion, data?.detalle, data?.grupo]);

  const onSubmit = async (dataForm: z.infer<typeof meetingFormSchema>) => {
    try {
      setIsLoading(true);
      await UpdateMeetingAction({
        id: dataForm.id,
        nombre: dataForm.nombre,
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
            // apellidos: participante.apellidos,
            // nombres: participante.nombres,
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

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Datos de la Reunión</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            {/* <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div> */}
            <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />


            {/* <div className="space-y-2">
              <Label>Fecha</Label>
              <Input
                type="date"
                disabled
                value={data?.fecha}
                // onChange={(e) => setFecha(e.target.value)}
              />
            </div> */}

                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha</FormLabel>
                      <FormControl>
                        <Input disabled type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



            {/* <div className="space-y-2">
              <Label>Congregación</Label>
              <Input
                type="text"
                disabled
                value={getCongregationName(data?.congregacion || "")}
                // onChange={(e) => setCongregacion(e.target.value)}
              />
            </div> */}

              <FormField
                  control={form.control}
                  name="congregacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Congregación</FormLabel>
                      <Select
                        disabled
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {congregaciones.map((congregacion)=>(
                            <SelectItem key={congregacion.id} value={congregacion.id}>{congregacion.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


            {/* <div className="space-y-2">
              <Label>Grupo</Label>
              <Input
                type="text"
                disabled
                value={getGroupName(data?.grupo || "")}
                // onChange={(e) => setCongregacion(e.target.value)}
              />
            </div> */}

              <FormField
                control={form.control}
                name="grupo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo</FormLabel>
                    <Select
                    disabled
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                        typeMeeting.map((grupo)=>
                          <SelectItem key={grupo.id} value={grupo.id}>{grupo.name}</SelectItem>  
                        )
                      }
                        
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

          </div>
        </div>

        <Separator />

        <div>
          {participantes
          // .sort((a: AsistenciaDetalle, b: AsistenciaDetalle)=> a.apellidos.localeCompare(b.apellidos))
          .map((participante) => (
            
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
          <Button>
            {" "}
            {isLoading ? <Loader className="animate-spin" /> : <Save />} Guardar
            Cambios
          </Button>
        </div>
      </form>
      </Form>
    </>
  );
};
