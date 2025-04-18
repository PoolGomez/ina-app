
import { Member } from "@/types-db"
import { GetMembersAction } from "@/actions/member-action"
import MemberClient from "./_components/client"
// import { Plus } from "lucide-react"
// import Link from "next/link"

// interface Member {
//   id: string
//   firstName: string
//   lastName: string
//   congregation: string
//   documentId: string
//   phone: string
//   email: string
// }

const MembersPage = async() => {
  // const [members, setMembers] = useState<Member[]>([])

  // useEffect(() => {
  //   const fetchMembers = async () => {
  //     const q = query(collection(db, "members"), orderBy("apellidos"))
  //     const querySnapshot = await getDocs(q)
  //     const membersData = querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     })) as Member[]
  //     setMembers(membersData)
  //   }

  //   fetchMembers()
  // }, [])

  const members = (await GetMembersAction()) as Member[]

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-5 p-4 pt-4">
        <MemberClient data={members} />
      </div>
    </div>
    // <div className="container mx-auto py-10">
    //   <Card>
    //     <CardHeader className="flex flex-row items-center justify-between">
    //       <CardTitle>Directorio de Miembros</CardTitle>
    //       {/* <Link href="/members/new">
    //         <Button>
    //           <Plus className="mr-2 h-4 w-4" />
    //           Nuevo Miembro
    //         </Button>
    //       </Link> */}
    //     </CardHeader>
    //     <CardContent>
    //       {
    //         members.length
    //       }

    //       <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHead>Apellidos</TableHead>
    //             <TableHead>Nombres</TableHead>
    //             <TableHead>Congregación</TableHead>
    //             <TableHead>Documento</TableHead>
    //             <TableHead>Teléfono</TableHead>
    //             <TableHead>Email</TableHead>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           {members.map((member) => (
    //             <TableRow key={member.id}>
    //               <TableCell>{member.apellidos}</TableCell>
    //               <TableCell>{member.nombres}</TableCell>
    //               <TableCell>{member.congregacion}</TableCell>
    //               <TableCell>{member.num_documento}</TableCell>
    //               <TableCell>{member.telefono}</TableCell>
    //               <TableCell>{member.email}</TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </CardContent>
    //   </Card>
    // </div>
  )
}

export default MembersPage