import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import adminApi from "../../../api/modules/admin.api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ReviewsTable = ({ listReviewsData, onTotalReviewsChange }) => {
  const [listReviews, setListReviews] = useState([]);
  const [onRequest, setOnRequest] = useState(false);

  useEffect(() => {
    setListReviews(listReviewsData);
  }, [listReviewsData]);

  const onRemoveReviewClick = async (reviewId) => {
    if (onRequest) return;

    setOnRequest(true);
    const { response, error } = await adminApi.removeUserReview({ reviewId });
    setOnRequest(false);

    if (response) {
      toast.success("Deleted review successfully");
      const newListReviews = listReviews.filter(
        (review) => review.id !== reviewId
      );
      setListReviews([...newListReviews]);
      onTotalReviewsChange(newListReviews.length);
    }

    if (error) toast.error(error.message);
  };

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
              <TableCell>
                {" "}
                <Tooltip
                  title={review.content.length > 35 ? review.content : ""}
                  arrow
                >
                  <span>
                    {review.content.length > 35
                      ? `${review.content.substring(0, 35)}...`
                      : review.content}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>{review.mediaTitle}</TableCell>
              <TableCell>
                {new Date(review.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onRemoveReviewClick(review.id)}
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
