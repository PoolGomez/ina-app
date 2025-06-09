"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { LogInAction } from "@/actions/authentication-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "nookies";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .nonempty("El correo electrónico es requerido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .nonempty("La contraseña es requerida"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const params = useSearchParams()
  const email =  params.get("email")
  const password =  params.get("password")

  // Efecto para manejar el inicio de sesión automático
  useEffect(() => {
    if (email && password) { // Verificar que query y sus propiedades existan
      form.setValue("email", email as string);
      form.setValue("password", password as string);
      handleLogin(email as string, password as string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  
  // const onSubmit = async (data: z.infer<typeof formSchema>) => {
  //   try {
  //     setIsLoading(true);
  //     const token = await LogInAction(data.email, data.password);
  //     setCookie(null, "token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
  //     toast.success("Bienvenido");
  //     router.push(`/main`);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       toast.error(error.message);
  //     } else {
  //       toast.error("Algo salió mal");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const token = await LogInAction(email, password);
      setCookie(null, "token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
      toast.success("Bienvenido");
      router.push(`/main`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Algo salió mal");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    handleLogin(data.email, data.password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <div className="flex items-center justify-center pb-8">
            <Image
              src={"/img/logo.png"}
              alt="imagen"
              className=""
              width={100}
              height={100}
            />
          </div>
          <CardTitle className="text-2xl text-center">INA APP</CardTitle>
          <CardDescription className="text-center pb-6">
            Ingrese sus credenciales para ingresar
          </CardDescription>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Ingrese su correo electrónico"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            placeholder="Ingrese su contraseña"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
                )}
                {isLoading ? "Iniciando Sesión" : "Iniciar Sesión"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/")}
                >
                  Regresar a la web
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
