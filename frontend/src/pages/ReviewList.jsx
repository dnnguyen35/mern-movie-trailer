import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import reviewApi from "../api/modules/review.api";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { routesGen } from "../routes/routes";
import { useTranslation } from "react-i18next";

const ReviewItem = ({ review, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false);

  const { t } = useTranslation();

  const onRemove = async (params) => {
    if (onRequest) return;

    setOnRequest(true);
    const { response, error } = await reviewApi.remove({ reviewId: review.id });
    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      toast.success("Deleted review successfully");
      onRemoved(review.id);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 1,
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box sx={{ width: { xs: 0, md: "10%" } }}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <Box
            sx={{
              borderRadius: "2%",
              paddingTop: "160%",
              ...uiConfigs.style.backgroundImage(
                tmdbConfigs.posterPath(review.mediaPoster)
              ),
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Typography
              variant="h6"
              sx={{ ...uiConfigs.style.typoLines(1, "left") }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">
            {dayjs(review.createdAt).format("DD:MM:YYYY HH:mm:ss")}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      <LoadingButton
        variant="contained"
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "10px" },
          marginTop: { xs: 2, md: 0 },
          width: "max-content",
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        {" "}
        {t("reviewlist.delete")}
      </LoadingButton>
    </Box>
  );
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const perPage = 3;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await reviewApi.getList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);

      if (response) {
        setCount(response.length);
        setReviews([...response]);
        setFilteredReviews([...response].splice(0, perPage));
      }
    };

    getReviews();
  }, []);

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page * perPage, perPage),
    ]);
    setPage((prev) => prev + 1);
  };

  const onRemoved = (id) => {
    console.log({ reviews });
    const newReviews = [...reviews].filter((e) => e.id !== id);
    console.log({ newReviews });
    setReviews(newReviews);
    setFilteredReviews([...newReviews].splice(0, page * perPage));
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`${t("reviewlist.your_reviews")} (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={onRemoved} />{" "}
              <Divider sx={{ display: { xs: "block", md: "none" } }} />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && (
            <Button
              onClick={() => {
                setLoadingReviews(true);
                setTimeout(() => {
                  console.log("page: ", page);
                  onLoadMore();
                  setLoadingReviews(false);
                }, 1000);
              }}
              disabled={loadingReviews}
              startIcon={
                loadingReviews ? (
                  <CircularProgress size={20} sx={{ color: "primary.main" }} />
                ) : null
              }
            >
              {loadingReviews ? "" : t("common.see_more")}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default ReviewList;
