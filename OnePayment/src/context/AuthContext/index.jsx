import React, { useEffect, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import { postRequest, getRequest } from "../../utils/requestUtil";
import Swal from "sweetalert2";
import GoogleLoginButton from "../../component/common/GoogleLoginButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
// import ForgotPassword from './components/ForgotPassword';
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from "../../assets/icons/CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const GoogleAuth = () => {
  const [signInWithGoogle, userCredential, loading, error, flowcancel] =
    useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      if (flowcancel) {
        Swal.fire({
          title: "Login Canceled",
          text: "You have canceled the login process.",
          icon: "warning",
          timer: 3000,
          showConfirmButton: false,
        });
        console.log("User canceled the login.");
        return;
      }
      const user = result.user;
      if (!user) return;

      const { email, displayName, photoURL, uid } = user;
      const response = await getRequest(`/auth/login?uid=${uid}`);
      const existingUser = response.user;
      console.log(existingUser)

      if (error && response.error.status === 404) {
        Swal.fire({
          title: "User is not registered yet",
          text: "Please contact us",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          setTimeout(() => {
            handleSignOut();
          });
        });
      }

      if (response.success) {
        Swal.fire({
          title: "Success",
          text: `Welcome back ${existingUser.username}`,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        });

        updateUser({
          uid: existingUser.uid,
          displayName: existingUser.username,
          photoURL: user.photoURL,
          email: existingUser.email,
          age: existingUser.ages,
          height: existingUser.height,
          phone: existingUser.phone,
          role: existingUser.role
        });
        console.log(user);
      }
    } catch (error) {
      console.error("❌ Error during login:", error);
    }
  };

  if (error) {
    Swal.fire({
      title: "Login Error",
      text:
        error.code === "auth/admin-restricted-operation"
          ? "This operation is restricted. Please contact the administrator."
          : error.message || "Something went wrong. Please try again.",
      icon: "error",
      confirmButtonText: "Retry",
      timer: 3000,
    }).then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });

    return null;
  }

  return (
    <div style={{ height: "90vh", display: "flex", alignItems: "center" }}>
      <Card variant="outlined">
        <SitemarkIcon />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign in
          </Button>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Forgot your password?
          </Link>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleGoogleLogin()}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Sign in with Facebook
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/material-ui/getting-started/templates/sign-in/"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default GoogleAuth;
