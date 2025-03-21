import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";
import usePrevious from "../hooks/usePrevious";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const MediaList = () => {
  const { mediaType } = useParams();
  const { languageMode } = useSelector((state) => state.languageMode);
  const [justLanguageChange, setJustLanguageChange] = useState(false);

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const prevMediaType = usePrevious(mediaType);

  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top_rated"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
    if (currentPage === 1) setJustLanguageChange(true);
  }, [languageMode]);

  useEffect(() => {
    const getMedias = async () => {
      if (currentPage === 1) dispatch(setGlobalLoading(true));

      setMediaLoading(true);

      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currentCategory],
        page: currentPage,
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));
      setJustLanguageChange(false);

      if (error) toast.error(error.message);

      if (response) {
        if (currentPage !== 1)
          setMedias((prevMedias) => [...prevMedias, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    if (mediaType !== prevMediaType) {
      setCurrentCategory(0);
      setCurrentPage(1);
    }

    getMedias();
  }, [
    mediaType,
    currentCategory,
    prevMediaType,
    currentPage,
    mediaCategories,
    justLanguageChange,
    dispatch,
  ]);

  const onCategoryChange = (categoryIndex) => {
    if (currentCategory === categoryIndex) return;

    setMedias([]);
    setCurrentPage(1);
    setCurrentCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrentPage(currentPage + 1);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currentCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography variant="h5" fontWeight={700} textTransform="uppercase">
            {mediaType === tmdbConfigs.mediaType.movie
              ? t("medialist.movies")
              : t("medialist.tv_series")}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currentCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currentCategory === index
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate === "popular"
                  ? t("medialist.popular")
                  : t("medialist.top_rated")}
              </Button>
            ))}
          </Stack>
        </Stack>

        <MediaGrid medias={medias} mediaType={mediaType} />

        <LoadingButton
          sx={{
            marginTop: 8,
          }}
          fullWidth
          loading={mediaLoading}
          onClick={onLoadMore}
          loadingIndicator={
            <CircularProgress size={20} sx={{ color: "primary.main" }} />
          }
        >
          {t("common.see_more")}
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
