import DontHavePermission from "./components/DontHavePermission";
import Header from "./components/Header";
import StatsDashboard from "./components/StatsDashboard";
import TabsMenu from "./components/TabsMenu";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import adminApi from "../../api/modules/admin.api";
import { toast } from "react-toastify";

const AdminPage = () => {
  const { user } = useSelector((state) => state.user);

  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);
  const [totalFavsCount, setTotalFavsCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [listUsersData, setListUsersData] = useState([]);
  const [listReviewsData, setListReviewsData] = useState([]);
  const [listFavsData, setListFavsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const [usersRes, favsRes, reviewsRes] = await Promise.all([
        adminApi.getUsersStats(),
        adminApi.getMoviesStats(),
        adminApi.getReviewsStats(),
      ]);

      setIsLoading(false);

      if (usersRes.response) {
        setTotalUsersCount(usersRes.response.length);
        setListUsersData(usersRes.response);
      }
      if (reviewsRes.response) {
        setTotalReviewsCount(reviewsRes.response.length);
        setListReviewsData(reviewsRes.response);
      }
      if (favsRes.response) {
        setTotalFavsCount(favsRes.response.length);
        setListFavsData(favsRes.response);
      }

      if (usersRes.error) toast.error(usersRes.error.message);
      if (favsRes.error) toast.error(favsRes.error.message);
      if (reviewsRes.error) toast.error(reviewsRes.error.message);
    };

    fetchData();
  }, []);

  const onTotalReviewsChange = (reviewsNum) => setTotalReviewsCount(reviewsNum);

  if (!user || !user.isAdmin) return <DontHavePermission />;

  return (
    <>
      <Header displayName={user?.displayName} />
      <StatsDashboard
        totalUsers={totalUsersCount}
        totalReviews={totalReviewsCount}
        totalFavorites={totalFavsCount}
      />
      <TabsMenu
        onTotalReviewsChange={onTotalReviewsChange}
        listUsersData={listUsersData}
        listReviewsData={listReviewsData}
        listFavoritesData={listFavsData}
        isLoading={isLoading}
      />
    </>
  );
};
export default AdminPage;
