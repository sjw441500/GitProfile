import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReusableList from "../components/ReusableList";
import RootLayout from "../layout/RootLayout";
const FollowingPage = () => {
  const { state } = useLocation();

  const [followingList, setFollowingList] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const user = state?.user;
    fetch(`https://api.github.com/users/${user}/following`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          const error = (data && data.message) || res.status;
          return Promise.reject(error);
        } else {
          return data;
        }
      })
      .then((res) => setFollowingList(res))
      .catch((error) => setError(error));
  }, []);
  return error ? (
    <RootLayout>Error:{error}</RootLayout>
  ) : (
    <RootLayout>
      <ReusableList
        userList={followingList}
        showMoreText="show more followings"
      />
    </RootLayout>
  );
};

export default FollowingPage;
