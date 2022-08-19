import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReusableList from "../components/ReusableList";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import RootLayout from "../layout/RootLayout";
const Home = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const onSearch = () => {
    navigate(`/users/${searchContent}`);
  };

  const onFollowingClick = () => {
    navigate(`/following`, { state: { user: user } });
  };

  const onRepoClick = () => {
    navigate(`/repos`, {
      state: {
        user: user,
        followers: userInfo?.followers,
        following: userInfo?.following,
      },
    });
  };
  const [userInfo, setUserInfo] = useState({});
  const [searchContent, setSearchContent] = useState("");
  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`https://api.github.com/users/${user}`)
        .then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          } else {
            return data;
          }
        })
        .then(
          (res) => setUserInfo(res),
          (err) => {
            setError(err);
          }
        )
        .catch((error) => {
          setError(error);
        });

      fetch(`https://api.github.com/users/${user}/followers`)
        .then(async (res) => {
          const data = await res.json();

          if (!res.ok) {
            const error = (data && data.message) || res.status;
            return Promise.reject(error);
          } else {
            return data;
          }
        })
        .then(
          (res) => setFollowers(res),
          (err) => {
            setError(err);
          }
        )
        .catch((error) => {
          setError(error);
        });
    }
  }, [user]);

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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            onChange={(e) => {
              setSearchContent(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              onSearch();
            }}
          >
            search
          </Button>
        </Box>
        {user && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar alt="Remy Sharp" src={userInfo?.avatar_url} />
            <Typography> {userInfo?.login}</Typography>
            <Typography> followers:{userInfo?.followers}</Typography>
            <Button
              variant="contained"
              onClick={() => {
                onFollowingClick();
              }}
            >
              Following Info
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onRepoClick();
              }}
            >
              Repos
            </Button>
          </Box>
        )}

        {user && (
          <ReusableList
            userList={followers}
            showMoreText="show more followers"
          ></ReusableList>
        )}
      </Box>
    </RootLayout>
  );
};

export default Home;
