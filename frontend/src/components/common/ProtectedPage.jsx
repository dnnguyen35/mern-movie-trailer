import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { Fade, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PleaseLogin = () => {
  const { t } = useTranslation();

  return (
    <Box position="relative" sx={{ marginTop: "7rem" }}>
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
          alt=""
          width="150"
          style={{ maxWidth: "100%" }}
        />
        <Typography
          mt={2}
          fontSize={{ xs: "1.5rem", md: "1.7rem" }}
          fontWeight={700}
          sx={{
            background: "linear-gradient(90deg, #4ADE80, #14B8A6, #3B82F6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          {t("please_login")}
        </Typography>
      </Box>
    </Box>
  );
};

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
    console.log("protectetd rerender");
  }, [user, dispatch]);

  return user ? children : <PleaseLogin />;
};

export default ProtectedPage;
