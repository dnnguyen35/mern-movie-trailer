import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import Container from "./Container";
import reviewApi from "../../api/modules/review.api";
import TextAvatar from "./TextAvatar";
import { useTranslation } from "react-i18next";

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const { t } = useTranslation();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const { response, error } = await reviewApi.remove({ reviewId: review.id });

    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) onRemoved(review.id);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* Avatar */}
        <TextAvatar text={review.user?.displayName} />
        {/* Avatar */}

        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight={700}>
              {review.user?.displayName}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: "absolute", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
              }}
            >
              {t("mediareview.delete")}
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }) => {
  const { user } = useSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const { t } = useTranslation();

  const reviewPerPage = 4;

  useEffect(() => {
    setPage(1);
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, reviewPerPage));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };

    const { response, error } = await reviewApi.add(body);

    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      toast.success(t("success.add_comment"));

      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * reviewPerPage, reviewPerPage),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * reviewPerPage));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);

    toast.success(t("success.delete_comment"));
  };

  return (
    <>
      <Container header={`${t("mediadetail.reviews")} (${reviewCount})`}>
        <Box
          sx={{
            maxHeight: { xs: 400, md: 500 },
            overflowY: "auto",
            padding: 1,
            width: "100%",
            minWidth: 0,
            "&::-webkit-scrollbar": {
              width: "6px",
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
          <Stack spacing={4} marginBottom={2}>
            {filteredReviews.map((item) =>
              item.user ? (
                <Box key={item.id}>
                  <ReviewItem review={item} onRemoved={onRemoved} />
                  <Divider sx={{ display: { xs: "block", md: "none" } }} />
                </Box>
              ) : null
            )}
            {filteredReviews.length < listReviews.length && (
              <Button
                onClick={() => {
                  setLoadingReviews(true);
                  setTimeout(() => {
                    onLoadMore();
                    setLoadingReviews(false);
                  }, 1000);
                }}
                disabled={loadingReviews}
                startIcon={
                  loadingReviews ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: "primary.main" }}
                    />
                  ) : null
                }
              >
                {loadingReviews ? "" : t("common.see_more")}
              </Button>
            )}
          </Stack>
        </Box>

        {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              <TextAvatar text={user.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight={700}>
                  {user.displayName}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={2}
                  placeholder={t("mediareview.mediareview_placeholder")}
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="lagre"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
                  disabled={!content.trim()}
                >
                  {t("mediareview.comment")}
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};

export default MediaReview;
