import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Container from "../components/common/Container";
import uiConfigs from "../configs/ui.configs";
import { useState } from "react";
import userApi from "../api/modules/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { useTranslation } from "react-i18next";

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(1, t("validation.password_min"))
        .required(t("validation.password_required")),
      newPassword: Yup.string()
        .min(1, t("validation.newPassword_min"))
        .required(t("validation.newPassword_required")),
      confirmNewPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword")],
          t("validation.confirmNewPassword_match")
        )
        .min(1, t("validation.confirmNewPassword_min"))
        .required(t("validation.confirmNewPassword_required")),
    }),
    onSubmit: async (values) => onUpdate(values),
  });

  const onUpdate = async (values) => {
    if (onRequest) return;

    setOnRequest(true);
    const { response, error } = await userApi.passwordUpdate(values);
    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      form.resetForm();
      navigate("/");
      dispatch(setUser(null));
      // dispatch(setAuthModalOpen(true));
      toast.success("Password changed successfully. Please login again ");
    }
  };

  return (
    <Box
      sx={{
        ...uiConfigs.style.mainContent,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <Container header={t("update_password")}>
        <Box
          component="form"
          maxWidth="900px"
          onSubmit={form.handleSubmit}
          sx={{ width: { md: "150%" } }}
        >
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.password && form.errors.password !== undefined
              }
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              placeholder="New password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.newPassword &&
                form.errors.newPassword !== undefined
              }
              helperText={form.touched.newPassword && form.errors.newPassword}
            />
            <TextField
              type="password"
              placeholder="Confirm new password"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword !== undefined
              }
              helperText={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              {t("update_password")}
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PasswordUpdate;
