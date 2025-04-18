
import SideBar from "./_components/sidebar"

interface LayoutMainProp {
    children: React.ReactNode
}

const LayoutMain = ({children}:LayoutMainProp) => {

    return (
        
                <SideBar>
                  {children}
                </SideBar>
              
    )

}
export default LayoutMain