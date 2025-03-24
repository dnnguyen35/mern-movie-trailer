import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import adminApi from "../../../api/modules/admin.api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FavoritesTable = ({ listFavoritesData }) => {
  const [listFavorites, setListFavorites] = useState([]);

  useEffect(() => {
    setListFavorites(listFavoritesData);
  }, [listFavoritesData]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: { xs: 300, md: 500 },
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "primary.main" }}>Media ID</TableCell>
            <TableCell sx={{ color: "primary.main" }}>Movie Title</TableCell>
            <TableCell sx={{ color: "primary.main" }}>Total Reviews</TableCell>
            <TableCell sx={{ color: "primary.main" }}>Average Rating</TableCell>
            <TableCell sx={{ color: "primary.main" }}>
              Total Favorites
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listFavorites.map((favorite) => (
            <TableRow key={favorite.mediaId}>
              <TableCell>{favorite.mediaId}</TableCell>
              <TableCell>{favorite.mediaTitle}</TableCell>
              <TableCell>{favorite.totalReviews}</TableCell>
              <TableCell>
                {favorite.mediaRate ? favorite.mediaRate.toFixed(1) : "N/A"}
              </TableCell>
              <TableCell>{favorite.totalFavorites}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FavoritesTable;
