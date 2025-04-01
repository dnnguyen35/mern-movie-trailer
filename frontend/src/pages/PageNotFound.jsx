import { Box, Button, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: "blue.100" }}
    >
      <Typography
        fontSize="35vw"
        fontWeight="bold"
        color="gray.100"
        sx={{
          userSelect: "none",
          lineHeight: 1,
          marginBottom: "-3rem",
        }}
      >
        404
      </Typography>

      <Stack spacing={2} alignItems="center" marginTop={{ xs: "5rem" }}>
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
          Page not found
        </Typography>
        <Button variant="outlined" color="primary" component={Link} to="/">
          Go Back Home
        </Button>
      </Stack>
    </Box>
  );
};

export default PageNotFound;
