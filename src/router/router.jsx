import Home from "../views/Home";
import FollowingPage from "../views/FollowingPage";
import RepoPage from "../views/RepoPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} element={<Navigate to="/users/" />}></Route>
        <Route exact path={"/users/:user"} element={<Home />}></Route>
        <Route exact path={"/users/"} element={<Home />}></Route>
        <Route exact path={"/following"} element={<FollowingPage />}></Route>
        <Route exact path={"/repos"} element={<RepoPage />}></Route>
        <Route path={"/*"} element={<Navigate to="/users/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
