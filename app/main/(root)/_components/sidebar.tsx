
import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent, SidebarGroup, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from '@/components/ui/sidebar';
import { SideNav } from './sidenav';
import UserButton from './user-button';

interface SideBarProps {
    children: React.ReactNode,
    // company: CompanyWithOwnerUsers,
    // currentUserEmail: string,
    // currentUserId: string,
    // permissions:PermissionAction [],
    // myCompanies: Company[]
    // otherCompanies: Company[]

}

const SideBar = (
    {
        children, 
        // company,
        // currentUserEmail, 
        // currentUserId, 
        // permissions,
        // myCompanies,
        // otherCompanies
    }:SideBarProps
) => {

        // console.log("permissions: ", permissions)

    // const session = await auth();

    // if(!session?.user?.email){
    //     redirect("/login")
    // }

    // const myCompaniesSnap = await db.company.findMany({
    //     where:{
    //         ownerId: currentUserId
    //     }
    // });
    // const myCompanies = [] as Company[];
    // myCompaniesSnap.forEach(doc =>{
    //     myCompanies.push(doc)
    // });

    // const userData = await db.user.findUnique({
    //     where:{
    //         email: currentUserEmail
    //     }
    // })
    // if(!userData){
    //     redirect("/alzu")
    // }
    // const userPermissions = (await db.companyUser.findUnique({
    //     where:{
    //         userId_companyId:{
    //             userId: currentUserId,
    //             companyId: currentCompany.id
    //         } 
    //     },
    //     include:{
    //         permissions: true
    //     }
    // }) ) as CompanyUserWithPermissions

    // const othersCompanySnap = await db.companyUser.findMany({
    //     where:{
    //         userId : currentUserId
    //     },
    //     include:{
    //         company: true
    //     }
    // });

    // const othersCompanies = othersCompanySnap.map((item) => item.company);


    

  return (
    <SidebarProvider>
        <Sidebar collapsible='icon' className='pt-12'>
            <SidebarContent>
                <SidebarGroup>
                    {/* <ShowOnlyScreen screen='mobile'>
                        <CompanySwitcher myCompanies={myCompanies} sharedCompanies={otherCompanies} />
                    </ShowOnlyScreen> */}
                    
                    {/* <SidebarGroupLabel>Modulos</SidebarGroupLabel> */}
                    <SideNav />
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
        <SidebarInset>
            <header className="fixed top-0 left-0 w-full z-50 flex h-12 shrink-0 items-center justify-between gap-2 pr-2 gap-x-4 md:pr-6 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="p-2" />
                    <Separator orientation="vertical" className="mr-2 h-8" />
                    INA-APP
                    {/* <ShowOnlyScreen screen='desktop'>
                        <CompanySwitcher myCompanies={myCompanies} sharedCompanies={otherCompanies} />
                    </ShowOnlyScreen> */}
                    
                </div>
                <div className="flex gap-x-2 items-center">
                    {/* <ToggleTheme /> */}
                    {/* USER BUTTON */}
                    <UserButton username={"paul"} />
                </div>
            </header>
            <main className='pt-12'>
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default SideBar
