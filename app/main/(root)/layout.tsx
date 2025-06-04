import SideBar from "./_components/sidebar";

interface LayoutMainProp {
  children: React.ReactNode;
}

const MainLayout = ({ children }: LayoutMainProp) => {
  return (
  <SideBar>
    {children}
  </SideBar>
);
};
export default MainLayout;
