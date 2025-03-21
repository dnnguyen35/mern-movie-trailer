import { Grid, Box, Skeleton } from "@mui/material";

const MediaGridSkeleton = ({ count = 12 }) => {
  return (
    <Grid container spacing={2}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Box sx={{ position: "relative", width: "100%", paddingTop: "150%" }}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGridSkeleton;
