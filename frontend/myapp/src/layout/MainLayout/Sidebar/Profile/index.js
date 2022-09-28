import LogoutIcon from "@mui/icons-material/Logout";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions/actionAuth";
import { selectRole } from "../../../../utils/selectRole";
import ProfileAvatar from "./ProfileAvatar";

const ProfileSection = ({ drawerOpen, user }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Card>
      <CardContent sx={{ p: "16px 2px 16px 12px !important" }}>
        <List sx={{ p: 0, m: 0 }}>
          <ListItem alignItems='flex-start' disableGutters sx={{ p: 0 }}>
            <ListItemAvatar>
              <ProfileAvatar name={user?.username} />
            </ListItemAvatar>
            <ListItemText
              sx={{ ml: 1 }}
              primary={
                <Typography
                  variant='subtitle1'
                  sx={{ color: theme.palette.primary[800] }}
                >
                  {user?.username ? <>{user.username}</> : <>Tên Của Bạn</>}
                </Typography>
              }
              secondary={
                <Typography variant='caption'>
                  {user?.roles ? (
                    <>{selectRole(user.roles)}</>
                  ) : (
                    <>Không Xác Định</>
                  )}
                </Typography>
              }
            />
            <ListItemIcon sx={{ mt: "10px" }}>
              {user && drawerOpen && (
                <Button
                  onClick={() => {
                    localStorage.removeItem("user");
                    dispatch(logout());
                  }}
                >
                  <LogoutIcon />
                </Button>
              )}
            </ListItemIcon>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
