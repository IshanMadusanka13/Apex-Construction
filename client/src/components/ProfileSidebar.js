import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from 'react-redux';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Lock } from '@mui/icons-material';
import { userTypes } from "../utils.js";

const ProfileSidebar = (props) => {
  const theme = useTheme();
  const [selectedContent, setSelectedContent] = useState("profile");

  const handleItemClick = (content) => {
    props.onItemClick(content);
    setSelectedContent(content);
  };


  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.mainOpacity,
        height: '100%',
        padding: "20px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Sidebar Content
      </Typography>
      <List>

        <SideBarListItem
          onClick={() => handleItemClick("profile")}
          selected={selectedContent === "profile"}
          primary="Profile"
          icon={<AccountCircleIcon />}
        />

        <SideBarListItem
          onClick={() => handleItemClick("review")}
          selected={selectedContent === "review"}
          primary="Review"
          icon={<AccountCircleIcon />}
        />

        <SetSideBarLists handleItemClick={handleItemClick} />

        <SideBarListItem
          onClick={() => handleItemClick("changePassword")}
          selected={selectedContent === "changePassword"}
          primary="Change Password"
          icon={<Lock />}
        />

      </List>
    </div>
  );
};

export default ProfileSidebar;

function SideBarListItem({ onClick, selected, primary, icon }) {

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ListItem button onClick={onClick} sx={{ backgroundColor: selected ? "rgba(0, 0, 0, 0.08)" : "" }}>
      <ListItemIcon>{icon}</ListItemIcon>
      {isMd && <ListItemText primary={primary} />}
    </ListItem>
  )
};

function SetSideBarLists({ handleItemClick, selectedContent }) {

  const theme = useTheme();
  const loggedUser = useSelector((state) => state.user);

  switch (loggedUser.userType) {

    case userTypes.ADMIN:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("addEmployee")}
            selected={selectedContent === "addEmployee"}
            primary="Add Employee"
            icon={<PersonAddAlt1Icon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewEmployee")}
            selected={selectedContent === "viewEmployee"}
            primary="View Employee"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("addSite")}
            selected={selectedContent === "addSite"}
            primary="Add Site"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewSite")}
            selected={selectedContent === "viewSite"}
            primary="View Site"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("StockReq")}
            selected={selectedContent === "StockReq"}
            primary="Request Stock"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("stock")}
            selected={selectedContent === "stock"}
            primary="Stock"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("buyStock")}
            selected={selectedContent === "buyStock"}
            primary="Stock Replenish"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("biller")}
            selected={selectedContent === "biller"}
            primary="Biller"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("makePayment")}
            selected={selectedContent === "makePayment"}
            primary="Make Transaction"
            icon={<CreditCardIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("LogReport")}
            selected={selectedContent === "LogReport"}
            primary="Log Report"
            icon={<PersonAddAlt1Icon />}
          />
        </span>
      )

    case userTypes.HR_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("addEmployee")}
            selected={selectedContent === "addEmployee"}
            primary="Add Employee"
            icon={<PersonAddAlt1Icon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewEmployee")}
            selected={selectedContent === "viewEmployee"}
            primary="View Employee"
            icon={<VisibilityIcon />}
          />

        </span>
      )

    case userTypes.STOCK_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("stock")}
            selected={selectedContent === "stock"}
            primary="Stock"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("buyStock")}
            selected={selectedContent === "buyStock"}
            primary="Stock Replenish"
            icon={<VisibilityIcon />}
          />

        </span>
      )

    case userTypes.SITE_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("addSite")}
            selected={selectedContent === "addSite"}
            primary="Add Site"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("viewSite")}
            selected={selectedContent === "viewSite"}
            primary="View Site"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("StockReq")}
            selected={selectedContent === "StockReq"}
            primary="Request Stock"
            icon={<VisibilityIcon />}
          />

        </span>
      )

    case userTypes.FINANCE_MANAGER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("biller")}
            selected={selectedContent === "biller"}
            primary="Biller"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("makePayment")}
            selected={selectedContent === "makePayment"}
            primary="Make Transaction"
            icon={<CreditCardIcon />}
          />

        </span>
      )

    case userTypes.CUSTOMER:
      return (
        <span>

          <SideBarListItem
            onClick={() => handleItemClick("viewSite")}
            selected={selectedContent === "viewSite"}
            primary="View Site"
            icon={<VisibilityIcon />}
          />

          <SideBarListItem
            onClick={() => handleItemClick("customerInstallment")}
            selected={selectedContent === "customerInstallment"}
            primary="Customer Installment"
            icon={<VisibilityIcon />}
          />

        </span>
      )

    default:
      break;
  }
}