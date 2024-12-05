import { useLocation } from "react-router-dom";
import { UserRooms } from "../types/UserRooms";
import SideBar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Rooms() {
  // @todo write error handling for this 
  const { user, rooms } = JSON.parse(useLocation().state.response) as UserRooms;

  console.log(JSON.parse(useLocation().state.response));

  console.log(user, rooms);

  const handleOnClick = () => {
    console.log("lmao");
  };

  return (
    <>
      <div>
        <SideBar />

        <div className="lg:pl-72">
          <Topbar />

          <main className="h-screen flex items-center justify-center">
            {rooms.length === 0 ? (
              <div className="px-4 sm:px-6 lg:px-8">
                <p>You currently have no rooms create one by pressing +</p>
              </div>
            ) : (
              <p> there are rooms</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
