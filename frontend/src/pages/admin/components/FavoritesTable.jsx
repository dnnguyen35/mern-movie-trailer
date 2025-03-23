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

const FavoritesTable = () => {
  const [listFavorites, setListFavorites] = useState([]);

  useEffect(() => {
    const getMoviesStats = async () => {
      const { response, error } = await adminApi.getMoviesStats();

      if (response) setListFavorites(response);
      if (error) toast.error(error.message);
    };

    getMoviesStats();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
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
