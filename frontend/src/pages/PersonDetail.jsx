import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonMediaGrid from "../components/common/PersonMediaGrid";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import personApi from "../api/modules/person.api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { useTranslation } from "react-i18next";

const PersonDetail = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState();
  const dispatch = useDispatch();

  const { languageMode } = useSelector((state) => state.languageMode);

  const { t } = useTranslation();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await personApi.detail({ personId });
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId, languageMode]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "50%", md: "20%" },
                }}
              >
                <Box
                  sx={{
                    borderRadius: "2%",
                    overflow: "hidden",
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      person.profile_path
                    )})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${
                      person.birthday && person.birthday.split("-")[0]
                    }`}
                    {person.deathday &&
                      ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header={t("persondetail.movie")}>
              <PersonMediaGrid
                personId={personId}
                languageMode={languageMode}
              />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
