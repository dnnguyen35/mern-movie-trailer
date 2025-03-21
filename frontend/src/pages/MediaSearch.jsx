import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Fade,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import CircularProgress from "@mui/material/CircularProgress";
import MediaGridSkeleton from "../components/common/Skeletons/MediaGridSkeleton";
import { useTranslation } from "react-i18next";

const mediaTypes = ["movie", "tv", "people"];

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(debounceQuery);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [debounceQuery]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
      setOnSearch(false);
      return;
    }

    (async () => {
      setOnSearch(true);
      const { response, error } = await mediaApi.search({
        mediaType,
        query,
        page,
      });
      setOnSearch(false);

      if (error) toast.error(error.message);

      if (response) {
        if (page > 1)
          setMedias((prevMedias) => [...prevMedias, ...response.results]);
        else setMedias([...response.results]);
      }

      setTimeout(() => setOnSearch(false), 1000);
    })();
  }, [mediaType, query, page]);

  const onCategoryChange = (selectedCategory) => {
    setMediaType(selectedCategory);
    setMedias([]);
    setPage(1);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                key={index}
                size="large"
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color:
                    mediaType === item
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(item)}
              >
                {t(`mediasearch.${item}`)}
              </Button>
            ))}
          </Stack>

          <TextField
            color="success"
            placeholder={t("mediasearch.search_placeholder")}
            sx={{
              width: "100%",
            }}
            autoFocus
            onChange={(e) => setDebounceQuery(e.target.value)}
          />

          <Box position="relative">
            {(!query || !medias.length) && (
              <Fade in={!onSearch} timeout={500} unmountOnExit>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="50vh"
                >
                  <img
                    src="/ronaldo_siu_siu.png"
                    alt="Search Placeholder"
                    width="150"
                    style={{ maxWidth: "100%" }}
                  />
                  <Typography
                    mt={2}
                    fontSize={{ xs: "1.5rem", md: "1.7rem" }}
                    fontWeight={700}
                    sx={{
                      background:
                        "linear-gradient(90deg, #4ADE80, #14B8A6, #3B82F6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                    }}
                  >
                    {!query ? "Siuuuuu" : t("mediasearch.not_found")}
                  </Typography>
                </Box>
              </Fade>
            )}
            <Fade in={onSearch} timeout={500} unmountOnExit>
              <Box position="absolute" width="100%">
                <MediaGridSkeleton />
              </Box>
            </Fade>
            <Fade in={!onSearch} timeout={500} unmountOnExit>
              <Box>
                <MediaGrid medias={medias} mediaType={mediaType} />
              </Box>
            </Fade>
          </Box>

          {medias.length > 0 && (
            <LoadingButton
              sx={{
                marginTop: 8,
              }}
              fullWidth
              loading={onSearch}
              onClick={() => setPage(page + 1)}
              loadingIndicator={
                <CircularProgress size={20} sx={{ color: "primary.main" }} />
              }
            >
              {onSearch ? "" : t("common.see_more")}
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
