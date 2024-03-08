import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfileSidebar = (props) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleItemClick = (content) => {
      props.onItemClick(content);
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.mainOpacity,
        minHeight: "calc(100vh - 64px)",
        padding: "20px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Sidebar Content
      </Typography>
      <List>

        <ListItem button onClick={() => handleItemClick("profile")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          {isMd && <ListItemText primary="Profile" />}
        </ListItem>
        
      </List>
    </div>
  );
};

export default ProfileSidebar;
