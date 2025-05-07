"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import toast from "react-hot-toast"
import { useState } from "react"
import { LogInAction } from "@/actions/authentication-actions"
import { useRouter } from "next/navigation"
import { setCookie } from "nookies"

const formSchema = z.object({
  email: z.string()
    .email('El correo electrónico no es válido')
    .nonempty('El correo electrónico es requerido'),
  password: z.string()
    .min(6,"La contraseña debe tener al menos 6 caracteres")
    .nonempty('La contraseña es requerida'),
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
  const onSubmit =async (data: z.infer<typeof formSchema>)=>{
    try {
      setIsLoading(true);
      const token = await LogInAction(data.email,data.password);
      setCookie(null, "token", token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
      toast.success("Bienvenido");
      router.push(`/main`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Algo salió mal");
      }
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      
      <Card>
        {/* <CardHeader>
          <CardTitle className="text-2xl text-center">INA APP</CardTitle>
          <CardDescription className="text-center">
            Ingrese sus credenciales para ingresar
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <div className="flex items-center justify-center pb-8">
            <Image src={"/img/logo.png"} alt='imagen' className='' width={100} height={100} />
          </div>
          <CardTitle className="text-2xl text-center">INA APP</CardTitle>
          <CardDescription className="text-center pb-6">
            {/* Enter your email below to login to your account */}
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
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
              <Button variant="outline" className="w-full" onClick={()=>router.push("/")}>
                Regresar a la web
              </Button>
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </form>
          </Form>
          
        </CardContent>
      </Card>
    </div>
  )
}
