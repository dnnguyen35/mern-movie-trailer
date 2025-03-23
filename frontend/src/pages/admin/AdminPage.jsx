import DontHavePermission from "./components/DontHavePermission";
import Header from "./components/Header";
import StatsDashboard from "./components/StatsDashboard";
import TabsMenu from "./components/TabsMenu";
import { useSelector } from "react-redux";

const AdminPage = () => {
  const { user } = useSelector((state) => state.user);

  if (!user || !user.isAdmin) return <DontHavePermission />;

  return (
    <>
      <Header />
      <StatsDashboard />
      <TabsMenu />
    </>
  );
};
export default AdminPage;
