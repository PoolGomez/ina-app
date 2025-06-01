"use client";
import { CreateMeetingAction } from "@/actions/meeting-action";
import { Heading } from "@/app/main/(root)/_components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { AsistenciaDetalle, Meeting, Member } from "@/types-db";
import { ArrowLeftCircleIcon, Loader, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AttendanceButton } from "../../_components/button-attendance";
import { congregaciones, typeMeeting } from "@/lib/data";
import { GetMembersByCongregationAndGroupAction } from "@/actions/member-action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";


// const AsistenciaDetalleSchema = z.object({
//   miembroId: z.string(),
//   valor: z.enum(['A', 'T', 'F']),
// });
const meetingFormSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerida"),
  fecha: z.string().min(1, "La fecha es requerida"),
  congregacion: z.string().min(1, "La congregación es requerida"),
  grupo: z.string().min(1, "El grupo es requerido"),
  // detalle: z.array(AsistenciaDetalleSchema),
});




export const CreateMeetingForm = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);

  const [miembros, setMiembros] = useState<Member[]>([]);
  // const [nombre, setNombre] = useState("");
  // const [grupo, setGrupo] = useState("");
  // const [congregacion, setCongregacion] = useState("");
  // const [fecha, setFecha] = useState("");
  const [participantes, setParticipantes] = useState<AsistenciaDetalle[]>([]);
  const [mensaje, setMensaje] = useState("")


 

  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      nombre: "",
      fecha: "",
      congregacion: "",
      grupo: "",
      // detalle: [] 
    },
  });



  const onSubmit = async (data: z.infer<typeof meetingFormSchema>) => {
    try {
      setIsLoading(true);
      const reunion = {
        nombre: data.nombre,
        fecha: data.fecha,
        congregacion: data.congregacion,
        grupo: data.grupo,
        // estado: true,
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
  const loadMembers = async () => {
    // console.log(form.getValues("congregacion"))
    // console.log(form.getValues("grupo"))
    if(form.getValues("congregacion") === "" || form.getValues("grupo") === ""){
      setMensaje("Seleccione una congregación y un grupo")
    }else{
      setMensaje("")
      getParticipantes(form.getValues("congregacion"), form.getValues("grupo"));
    }
    
  };
  const getParticipantes = async (cong: string, grup: string) => {
    const miembrosData = await GetMembersByCongregationAndGroupAction(cong, grup);

    setMiembros(miembrosData);
    const data = miembrosData.map((item) => {
      return {
        miembroId: item.id,
        apellidos: item.apellidos,
        nombres: item.nombres,
        valor: "F",
      };
    });
    setParticipantes(data as AsistenciaDetalle[]);
  };

  const mostrarNombresParticipante = (id: string) => {
    const result = miembros.find((item) => item.id === id);
    const nombre = result?.nombres;
    return nombre;
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
      

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Datos de la Reunión</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

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
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div> */}

            <FormField
                control={form.control}
                name="fecha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


            <FormField
                control={form.control}
                name="congregacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Congregación</FormLabel>
                    <Select
                      disabled={isLoading}
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
                          congregaciones.map((congregacion)=>(
                            <SelectItem key={congregacion.id} value={congregacion.id}>{congregacion.name}</SelectItem>    
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {/* <div className="space-y-2">
              <Label>Congregación</Label>
              <Select onValueChange={(e)=>setCongregacion(e)} defaultValue={congregacion}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CG9">Canto Grande 9</SelectItem>
                  <SelectItem value="HU">Huanta</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

              <FormField
                control={form.control}
                name="grupo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo</FormLabel>
                    <Select
                      disabled={isLoading}
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

            {/* <div className="space-y-2">
              <Label>Grupo</Label>
              <Select
                // onValueChange={field.onChange}
                onValueChange={(e)=>setGrupo(e)}
                // defaultValue={field.value}
                defaultValue={grupo}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                   {
                    grupos.map((grupo)=>
                      <SelectItem key={grupo.id} value={grupo.id}>{grupo.name}</SelectItem>  
                    )
                  }
                  
                </SelectContent>
              </Select>
            </div> */}

            
            <Button type="button" variant={"outline"} onClick={()=>loadMembers()} >Cargar Miembros</Button>
             <Label className="text-red-500">{mensaje}</Label>

            {/* <Button type="button" disabled={ (form.getValues("congregacion") === "" || form.getValues("grupo") === "" ) ? true : false } onClick={()=>loadMembers()}>Cargar Miembros</Button> */}
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
                {isLoading ? <Loader className="animate-spin" /> : <Save />} Guardar
                Reunión
              </Button>
           
          
        </div>
      </form>
      </Form>
    </>
  );
};
