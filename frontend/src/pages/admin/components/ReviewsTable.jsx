import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import adminApi from "../../../api/modules/admin.api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ReviewsTable = () => {
  const [listReviews, setListReviews] = useState([]);

  useEffect(() => {
    const getReviewsStats = async () => {
      const { response, error } = await adminApi.getReviewsStats();

      if (response) setListReviews(response);
      if (error) toast.error(error.message);
    };

    getReviewsStats();
  }, []);

  const handleDeleteReview = async (reviewId) => {
    // const { response, error } = await adminApi.deleteReview(reviewId);

    // if (response) {
    //   toast.success("Review deleted successfully");
    //   setListReviews(listReviews.filter((review) => review.id !== reviewId));
    // }

    // if (error) toast.error(error.message);
    console.log("deleted :", reviewId);
    setListReviews(listReviews.filter((review) => review.id !== reviewId));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "primary.main" }}>User</TableCell>
            <TableCell sx={{ color: "primary.main" }}>Content</TableCell>
            <TableCell sx={{ color: "primary.main" }}>Movie Title</TableCell>
            <TableCell sx={{ color: "primary.main" }}>Created At</TableCell>
            <TableCell sx={{ color: "primary.main" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listReviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>{review.user.username}</TableCell>
              <TableCell>{review.content}</TableCell>
              <TableCell>{review.mediaTitle}</TableCell>
              <TableCell>
                {new Date(review.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDeleteReview(review.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReviewsTable;
