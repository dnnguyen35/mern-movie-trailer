import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography
      fontWeight="700"
      fontSize="1.7rem"
      sx={{
        background: "linear-gradient(90deg, #4ADE80, #14B8A6, #3B82F6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
      }}
    >
      phimCủaTôi
    </Typography>
  );
};

export default Logo;
