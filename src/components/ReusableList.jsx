import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useEffect } from "react";
const ReusableList = ({ userList, showMoreText }) => {
  const [limitList, setLimitList] = useState([]);
  useEffect(() => {
    setLimitList(userList?.slice(0, 10));
  }, [userList]);
  const onAddMoreClick = () => {
    setLimitList([
      ...limitList,
      ...userList.slice(limitList.length, limitList.length + 10),
    ]);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          onAddMoreClick();
        }}
      >
        {showMoreText}
      </Button>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          maxHeight: 640,
          overflow: "auto",
          bgcolor: "background.paper",
        }}
      >
        {limitList?.map((user) => {
          return (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user?.avatar_url} />
              </ListItemAvatar>
              <ListItemText primary={user?.login} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ReusableList;
