import {
  Box,
  Stack,
  Typography,
  IconButton,
  useTheme,
  Paper,
} from "@mui/material";
import { GitHub, LinkedIn, Email, Facebook } from "@mui/icons-material";
import Logo from "./Logo";
import Container from "./Container";

const Footer = () => {
  const theme = useTheme();

  return (
    <Paper
      square={true}
      sx={{ backgroundImage: "unset", padding: "2rem", marginTop: "11rem" }}
    >
      <Box
        sx={{
          py: 4,
          px: 2,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 2 }}>
          <Logo />
        </Box>

        {/* Navigation Links */}
        <Stack
          spacing={1.5}
          alignItems="center"
          sx={{
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" textTransform="uppercase">
            please hire meeeeee
          </Typography>
        </Stack>

        {/* Social Icons */}
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <IconButton
            sx={{ color: "inherit" }}
            href="https://github.com/dnnguyen35"
            target="_blank"
          >
            <GitHub />
          </IconButton>
          <IconButton
            sx={{ color: "inherit" }}
            href="https://linkedin.com/in/nguyen-duong-ngoc-720643353"
            target="_blank"
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            sx={{ color: "inherit" }}
            href="mailto:dnnguyeen2003@gmail.com"
          >
            <Email />
          </IconButton>
        </Stack>

        {/* Copyright */}
        <Box mt={3}>
          <Typography variant="body2" fontSize={12}>
            © 2025 dnnguyen - Sài Gòn - Việt Nam
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Footer;
