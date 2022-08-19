import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import RootLayout from "../layout/RootLayout";
const RepoPage = () => {
  const { state } = useLocation();
  const [error, setError] = useState(null);

  const user = state?.user;
  const followers = state?.followers;
  const following = state?.following;
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`https://api.github.com/users/${user}/repos`)
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          } else {
            return data;
          }
        })
        .then((res) => setRepos(res))
        .catch((err) => setError(err));
    }
  }, []);
  return error ? (
    <RootLayout>Error:{error}</RootLayout>
  ) : (
    <RootLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {repos.length > 0 && (
          <Typography>{`User ${user} with ${followers} followers is following ${following},One repo for
            
            this user is ${repos[0]?.full_name}  and it is ${
            repos[0]?.private ? "private" : "not private"
          }`}</Typography>
        )}
      </Box>
    </RootLayout>
  );
};

export default RepoPage;
