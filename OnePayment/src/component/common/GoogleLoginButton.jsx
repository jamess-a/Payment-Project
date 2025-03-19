import { Button, Box } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

const GoogleLoginButton = ({ handleGoogleLogin }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "120vh",
      }}
    >
      <Button
        variant="contained"
        onClick={handleGoogleLogin}
        startIcon={<GoogleIcon />}
        sx={{
          backgroundColor: "#DB4437",
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#C1351D",
          },
        }}
      >
        Login with Google
      </Button>
    </Box>
  );
};

export default GoogleLoginButton;
