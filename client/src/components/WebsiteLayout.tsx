import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function WebsiteLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default WebsiteLayout;
