import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import Logo from "./Logo";
import uiConfigs from "../../configs/ui.configs";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import { useTranslation } from "react-i18next";
import { languageModes } from "../../configs/language.config";
import { setLanguageMode } from "../../redux/features/languageModeSlice";

import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const { languageMode } = useSelector((state) => state.languageMode);
  const { t } = useTranslation();

  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const onSwitchLanguage = () => {
    const newLanguage = languageMode === languageModes.en ? "vi" : "en";
    dispatch(setLanguageMode(newLanguage));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px" textTransform="uppercase">
          {t("sidebar.options.options")}
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "15px",
              marginY: 2,
              backgroundColor: appState.includes(item.state)
                ? "primary.main"
                : "unset",
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {t(`topbar.${item.display}`)}
                </Typography>
              }
            />
          </ListItemButton>
        ))}

        {user && (
          <>
            <Typography
              variant="h6"
              marginBottom="20px"
              textTransform="uppercase"
            >
              {t("sidebar.personal")}
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "15px",
                  marginY: 2,
                  backgroundColor: appState.includes(item.state)
                    ? "primary.main"
                    : "unset",
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {t(`user.${item.display}`)}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </>
        )}

        <Typography variant="h6" marginBottom="20px" textTransform="uppercase">
          {t("sidebar.theme.theme")}
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark ? (
              <WbSunnyOutlinedIcon />
            ) : (
              <DarkModeOutlinedIcon />
            )}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === themeModes.dark
                  ? t("sidebar.theme.light")
                  : t("sidebar.theme.dark")}
              </Typography>
            }
          />
        </ListItemButton>

        <Typography variant="h6" marginBottom="20px" textTransform="uppercase">
          {t("sidebar.language.language")}
        </Typography>
        <ListItemButton onClick={onSwitchLanguage}>
          <ListItemIcon>
            <img
              src={
                languageMode === "en"
                  ? "/Flag_of_Vietnam.svg"
                  : "/Flag_of_the_United_Kingdom.svg"
              }
              alt={languageMode === "vi" ? "Vietnam Flag" : "UK Flag"}
              width="24"
              height="24"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {languageMode === languageModes.en
                  ? t("sidebar.language.vietnamese")
                  : t("sidebar.language.english")}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </>
  );
  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: "0px",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
