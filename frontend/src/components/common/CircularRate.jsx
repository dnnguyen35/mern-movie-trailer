import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = ({ value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "max-content",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value * 10}
        sx={{ color: "primary.main" }}
        size={50}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          sx={{ marginTop: "-5px", color: "secondary.contrastText" }}
        >
          {Math.floor(value * 10) / 10}
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;
