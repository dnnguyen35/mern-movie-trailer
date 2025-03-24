import { Grid, Box } from "@mui/material";
import StatCard from "./StatCard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StatsDashboard = ({ totalUsers, totalReviews, totalFavorites }) => {
  const statsData = [
    {
      icon: <PeopleIcon fontSize="large" color="primary" />,
      label: "Total Users",
      value: totalUsers,
    },
    {
      icon: <RateReviewIcon fontSize="large" color="secondary" />,
      label: "Total Reviews",
      value: totalReviews,
    },
    {
      icon: <FavoriteIcon fontSize="large" color="error" />,
      label: "Total Favorites",
      value: totalFavorites,
    },
  ];

  return (
    <Box
      sx={{
        width: "90%",
        mx: "auto",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard icon={stat.icon} label={stat.label} value={stat.value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsDashboard;
