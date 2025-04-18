"use client"
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { BookOpenTextIcon, CalendarClock, CheckCheck, House, Users2 } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export const SideNav = () => {
    const pathname = usePathname()
    const params = useParams()
    const routes = [
        // {
        //     href : `/main/registro`,
        //     label :"Registro",
        //     active : pathname === `/main/registro`,
        //     icon: UserPlus2,
        // },
        {
            href : `/main/miembros`,
            label :"Miembros",
            active : pathname === `/main/miembros`,
            icon: Users2,
        },
        {
            href : `/main/reuniones`,
            label :"Reuniones",
            active : pathname === `/main/reuniones`,
            icon: CalendarClock,
        },
        {
            href : `/main/reportes`,
            label :"Reportes",
            active : pathname === `/main/reportes`,
            icon: BookOpenTextIcon,
        },
        
    ]
 
    return (
        <>
        <SidebarMenu>
            
            <Collapsible asChild defaultOpen={pathname === `/alzu/${params.companyId}`} className="group/collapsible">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip="Inicio">
                            <Link 
                                href={`/main`}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary w-full",
                                    pathname === `/main` 
                                        ? "text-black dark:text-white" 
                                        : "text-muted-foreground"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center justify-start">
                                        <House className="h-4 w-4" />
                                        <p className="text-sm ml-4">Inicio</p>
                                    </div>
                                    <div>
                                        {pathname === `/main` && <CheckCheck className="w-4 h-4"/>}
                                    </div>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                </SidebarMenuItem>
            </Collapsible>
            <SidebarGroupLabel>Modulos</SidebarGroupLabel>
            {routes.map((route)=>(
                        <Collapsible 
                            key={route.label}
                            asChild
                            defaultOpen={route.active}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={route.label}>
                                        
                                            <Link 
                                                href={route.href}
                                                className={cn(
                                                    "text-sm font-medium transition-colors hover:text-primary w-full",
                                                    route.active 
                                                        ? "text-black dark:text-white" 
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center justify-start">
                                                        {route.icon && <route.icon className="h-4 w-4" />}
                                                        <p className="text-sm ml-4">{route.label}</p>
                                                    </div>
                                                    <div>
                                                        {route.active && <CheckCheck className="w-4 h-4"/>}
                                                    </div>
                                                </div>
                                            </Link>
                                        
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>
                        
                        </Collapsible>
                    )
                
            
        
            )}
        </SidebarMenu>
        {/* <SidebarSeparator />
        { currentCompany && userId === currentCompany.ownerId && (
            <>
            <SidebarGroupLabel>Administrar</SidebarGroupLabel>
                <SidebarMenu>
                    {routesAdmin.map((route)=>(
                        <Collapsible key={route.label}
                        asChild
                        defaultOpen={route.active}
                        className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={route.label}>
                                        
                                            <Link 
                                                href={route.href}
                                                className={cn(
                                                    "text-sm font-medium transition-colors hover:text-primary w-full",
                                                    route.active 
                                                        ? "text-black dark:text-white" 
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center justify-start">
                                                        {route.icon && <route.icon className="h-4 w-4" />}
                                                        <p className="text-sm ml-4">{route.label}</p>
                                                    </div>
                                                    <div>
                                                        {route.active && <CheckCheck className="w-4 h-4"/>}
                                                    </div>
                                                </div>
                                            </Link>
                                        
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            </SidebarMenuItem>
                        </Collapsible>
                        
                    
                    ))}
                </SidebarMenu>
            </>
        )
        

        } */}
        
        </>
    )
}