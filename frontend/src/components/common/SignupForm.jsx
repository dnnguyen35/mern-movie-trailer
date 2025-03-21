import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";
import { useTranslation } from "react-i18next";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isSignupRequest, setIsSignupRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { t } = useTranslation();

  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, t("validation.username_min"))
        .required(t("validation.username_required")),
      password: Yup.string()
        .min(1, t("validation.password_min"))
        .required(t("validation.password_required")),
      displayName: Yup.string()
        .min(5, t("validation.displayName_min"))
        .required(t("validation.displayName_required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], t("validation.confirmPassword_match"))
        .min(1, t("validation.confirmPassword_min"))
        .required(t("validation.confirmPassword_required")),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsSignupRequest(true);
      const { response, error } = await userApi.signup(values);
      setIsSignupRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success(t("success.sign_up"));
      }

      if (error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="text"
          placeholder="Display name"
          name="displayName"
          fullWidth
          value={signinForm.values.displayName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.displayName &&
            signinForm.errors.displayName !== undefined
          }
          helperText={
            signinForm.touched.displayName && signinForm.errors.displayName
          }
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword !== undefined
          }
          helperText={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isSignupRequest}
      >
        {t("topbar.sign_up")}
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        {t("topbar.sign_in")}
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="warning" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
