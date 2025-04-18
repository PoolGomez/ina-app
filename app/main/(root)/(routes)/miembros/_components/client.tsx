
"use client"
import { Member } from "@/types-db"
import { Heading } from "../../../_components/heading"
import { Separator } from "@/components/ui/separator"
import TableMembers from "./table-members"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { UserPlus2 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface MemberClientProps {
    data: Member[]
}

const MemberClient = ({data}: MemberClientProps) => {
    
    const router = useRouter()
    const isMobile = useIsMobile()
    return(
        <>
        <div className="flex items-center justify-between">
            <Heading title="Directorio de Miembros" description="" />

            <Button onClick={()=>router.push(`/main/miembros/crear`)} className='cursor-pointer'>
                <UserPlus2 className="h-4 w-4" />
                {!isMobile && "Registro"}
            </Button>
        </div>    
        <Separator />

        <TableMembers data={data} />
            {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Directorio de Miembros</CardTitle>
                <Link href="/members/new">
                    <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Miembro
                    </Button>
                </Link>
                </CardHeader>
                <CardContent>
                {
                    data.length
                }

                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Apellidos</TableHead>
                        <TableHead>Nombres</TableHead>
                        <TableHead>Congregación</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {data.map((member) => (
                        <TableRow key={member.id}>
                        <TableCell>{member.apellidos}</TableCell>
                        <TableCell>{member.nombres}</TableCell>
                        <TableCell>{member.congregacion}</TableCell>
                        <TableCell>{member.num_documento}</TableCell>
                        <TableCell>{member.telefono}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card> */}
        
        </>
    )
}
export default MemberClient