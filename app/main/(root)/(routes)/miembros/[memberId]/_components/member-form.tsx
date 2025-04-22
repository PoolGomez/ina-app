"use client"
import { UpdateMemberAction } from "@/actions/member-action";
import { Heading } from "@/app/main/(root)/_components/heading"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { grupos } from "@/lib/data";
import { Member } from "@/types-db";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircleIcon, Loader, Save } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface MemberFormProps {
    data: Member | null
}
const memberFormSchema = z.object({
    id: z.string(),
    congregacion: z.string().min(1, "La congregación es requerida"),
    distrito: z.string().min(1, "El distrito es requerido"),
    pais: z.string().min(1, "El país es requerido"),
    apellidos: z.string().min(1, "Los apellidos son requeridos"),
    nombres: z.string().min(1, "Los nombres son requeridos"),
    genero: z.string().min(1, "El género es requerido"),
    fecha_nacimiento: z.string().min(1, "La fecha de nacimiento es requerida"),
    lugar_nacimiento: z.string(),
    fecha_bautismo: z.string(),
    fecha_sellamiento: z.string(),
    num_documento: z.string().min(1, "El documento de identidad es requerido"),
    estado_civil: z.string(),
    fecha_matrimonio_civil: z.string(),
    direccion: z.string(),
    telefono: z.string(),
    celular: z.string(),
    ocupacion: z.string(),
    actividad_ina: z.string(),
    grupo: z.string(),
    email: z
      .string()
      .email("Correo electrónico inválido")
      .or(z.string().length(0)),
  });

export const MemberForm = ({data}:MemberFormProps) => {
    const router = useRouter()
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
        id: data?.id,
        congregacion: data?.congregacion,
        distrito: data?.distrito,
        pais: data?.pais,
        apellidos: data?.apellidos,
        nombres: data?.nombres,
        genero: data?.genero,
        fecha_nacimiento: data?.fecha_nacimiento,
        lugar_nacimiento: data?.lugar_nacimiento,
        fecha_bautismo: data?.fecha_bautismo,
        fecha_sellamiento: data?.fecha_sellamiento,
        num_documento: data?.num_documento,
        estado_civil: data?.estado_civil,
        fecha_matrimonio_civil: data?.fecha_matrimonio_civil,
        direccion: data?.direccion,
        telefono: data?.telefono,
        celular: data?.celular,
        ocupacion: data?.ocupacion,
        actividad_ina: data?.actividad_ina,
        grupo: data?.grupo,
        email: data?.email,
    },
    });

    const onSubmit = async (data: z.infer<typeof memberFormSchema>) => {
        try {
            setIsLoading(true);
            await UpdateMemberAction(data as Member);

            toast.success("Miembro actualizado correctamente");
            setIsLoading(false);
            router.push(`/main/miembros`);
        } catch (error) {
            if (error instanceof Error) {
            toast.error(error.message);
            } else {
            toast.error("Algo salió mal");
            }
            setTimeout(() => {
            setIsLoading(false);
            router.push(`/main/miembros`);
            }, 2000);
        }finally{
          router.refresh();
        }
    };
    

    const handleClickBack = () => {
        router.push(`/main/miembros`);
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
          <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Datos de la Congregación</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                
                <FormField
                  control={form.control}
                  name="congregacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Congregación</FormLabel>
                      <Select
                        disabled={isLoading}
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
                          <SelectItem value="CG9">
                            Canto Grande 9
                          </SelectItem>
                          <SelectItem value="HU">Huanta</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
  
                <FormField
                  control={form.control}
                  name="distrito"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distrito</FormLabel>
                      <Select
                        disabled={isLoading}
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
                          <SelectItem value="L4">Lima 4</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="pais"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <Select
                        disabled={isLoading}
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
                          <SelectItem value="PE">Perú</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
  
            <Separator />
  
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Datos Personales</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="apellidos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nombres"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="genero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Género</FormLabel>
                      <Select
                      disabled={isLoading}
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
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Femenina</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fecha_nacimiento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Nacimiento</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lugar_nacimiento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lugar de Nacimiento</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="num_documento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Documento de Identidad</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="estado_civil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado Civil</FormLabel>
                      <Select
                      disabled={isLoading}
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
                        <SelectItem value="M">Menor de Edad</SelectItem>
                          <SelectItem value="S">Soltero(a)</SelectItem>
                          <SelectItem value="C">Casado(a)</SelectItem>
                          <SelectItem value="D">
                            Divorciado(a)
                          </SelectItem>
                          <SelectItem value="V">Viudo(a)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="fecha_matrimonio_civil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Matrimonio Civil</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="ocupacion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ocupación</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                
              </div>
            </div>
  
            <Separator />
  
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Datos de la Iglesia</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="fecha_bautismo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Bautismo</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fecha_sellamiento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Sellamiento</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="actividad_ina"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Actividad en INA</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

<FormField
                control={form.control}
                name="grupo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo</FormLabel>
                    <Select
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
                        grupos.map((grupo)=>
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
  
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Datos de Contacto</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="direccion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domicilio</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} className="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isLoading}
                          {...field}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="celular"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Celular</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
  
            <div className="flex justify-end space-x-4">
              <Button type="submit">
                {" "}
                {isLoading ? <Loader className="animate-spin" /> : <Save />}{" "}
                Guardar Miembro
              </Button>
            </div>
          </form>
        </Form>
      </>
    )
}