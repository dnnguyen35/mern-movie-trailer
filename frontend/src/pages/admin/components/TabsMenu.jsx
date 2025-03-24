import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FavoriteIcon from "@mui/icons-material/Favorite";

import UsersTable from "./UsersTable";
import ReviewsTable from "./ReviewsTable";
import FavoritesTable from "./FavoritesTable";

const tabsData = [
  { icon: <PeopleIcon />, label: "Users", component: <UsersTable /> },
  { icon: <RateReviewIcon />, label: "Reviews", component: <ReviewsTable /> },
  { icon: <FavoriteIcon />, label: "Favorites", component: <FavoritesTable /> },
];

const TabsMenu = ({
  onTotalReviewsChange,
  listUsersData,
  listReviewsData,
  listFavoritesData,
  isLoading,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "90%",
        bgcolor: "background.default",
        borderRadius: 2,
        mx: "auto",
        marginTop: "2rem",
      }}
    >
      {/* Tabs Header */}
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          bgcolor: "grey.900",
          borderRadius: 2,
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        {tabsData.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            label={tab.label}
            sx={{
              color: "white",
              "&.Mui-selected": { bgcolor: "grey.800", borderRadius: 1 },
            }}
          />
        ))}
      </Tabs>

      {/* Tabs Content */}
      <Box sx={{ mt: 2 }}>
        {value === 0 && (
          <UsersTable listUsersData={listUsersData} isLoading={isLoading} />
        )}
        {value === 1 && (
          <ReviewsTable
            onTotalReviewsChange={onTotalReviewsChange}
            listReviewsData={listReviewsData}
          />
        )}
        {value === 2 && (
          <FavoritesTable listFavoritesData={listFavoritesData} />
        )}
      </Box>
    </Box>
  );
};

export default TabsMenu;
