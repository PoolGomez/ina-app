import Navbar from "@/components/navbar";

interface LayoutMainProp {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: LayoutMainProp) => {
  return (
    <>
  <Navbar/>
  {children}
  </>
);
};
export default HomeLayout;
