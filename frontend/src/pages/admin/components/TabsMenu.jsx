import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FavoriteIcon from "@mui/icons-material/Favorite";

import UsersTable from "./UsersTable";
import ReviewsTable from "./ReviewsTable";
import FavoritesTable from "./FavoritesTable";

const TabsMenu = () => {
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
        <Tab
          icon={<PeopleIcon />}
          label="Users"
          sx={{
            color: "white",
            "&.Mui-selected": { bgcolor: "grey.800", borderRadius: 1 },
          }}
        />
        <Tab
          icon={<RateReviewIcon />}
          label="Reviews"
          sx={{
            color: "white",
            "&.Mui-selected": { bgcolor: "grey.800", borderRadius: 1 },
          }}
        />
        <Tab
          icon={<FavoriteIcon />}
          label="Favorites"
          sx={{
            color: "white",
            "&.Mui-selected": { bgcolor: "grey.800", borderRadius: 1 },
          }}
        />
      </Tabs>

      {/* Tabs Content */}
      <Box sx={{ mt: 2 }}>
        {value === 0 && <UsersTable />}
        {value === 1 && <ReviewsTable />}
        {value === 2 && <FavoritesTable />}
      </Box>
    </Box>
  );
};

export default TabsMenu;
