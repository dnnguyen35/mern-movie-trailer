import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import themeModeSlice from "./features/themeModeSlice";
import authModalSlice from "./features/authModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";
import appStateSlice from "./features/appStateSlice";
import languageModeSlice from "./features/languageModeSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    languageMode: languageModeSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice,
  },
});

export default store;
