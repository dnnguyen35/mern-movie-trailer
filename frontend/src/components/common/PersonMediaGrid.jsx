import { Button, Grid, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import personApi from "../../api/modules/person.api";
import MediaItem from "./MediaItem";
import { toast } from "react-toastify";
import mediaApi from "../../api/modules/media.api";
import { useTranslation } from "react-i18next";

const PersonMediaGrid = ({ personId, languageMode }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMedias, setLoadingMedias] = useState(false);
  const { t } = useTranslation();
  const perPage = 8;

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await personApi.medias({ personId });

      if (error) toast.error(error.message);

      if (response) {
        const mediasSorted = response.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        );
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].splice(0, perPage));
        setPage(1);
      }
    };
    getMedias();
  }, [personId, languageMode]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * perPage, perPage),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>

      {filteredMedias.length < medias.length && (
        <Button
          onClick={() => {
            setLoadingMedias(true);
            setTimeout(() => {
              onLoadMore();
              setLoadingMedias(false);
            }, 1000);
          }}
          disabled={loadingMedias}
          startIcon={
            loadingMedias ? (
              <CircularProgress size={20} sx={{ color: "primary.main" }} />
            ) : null
          }
        >
          {loadingMedias ? "" : t("common.see_more")}
        </Button>
      )}
    </>
  );
};

export default PersonMediaGrid;
