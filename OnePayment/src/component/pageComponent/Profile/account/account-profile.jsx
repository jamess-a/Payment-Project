import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

const AccountProfile = (user) => {
  const mockUser = {
    avatar: "/src/assets/avatars/avatar-anika-visser.png",
    city: "Los Angeles",
    country: "USA",
    jobTitle: "Senior Developer",
    name: "Anika Visser",
    timezone: "GTM-7",
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={user.user.photoURL ? user.user.photoURL : mockUser.avatar}
            sx={{
              height: 120,
              mb: 2,
              width: 120,
              margin: "auto",
              border: "3px solid #1976D2",
            }}
          />
          <Typography gutterBottom variant="h5">
            {user.user.displayName}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {mockUser.jobTitle}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
