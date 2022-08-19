import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReusableList from "../components/ReusableList";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const RootLayout = ({ children }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "colume",
          float: "left",
          alignItems: "start",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            onClick();
          }}
        >
          Home
        </Button>
        {children}
      </Box>
    </Box>
  );
};

export default RootLayout;
