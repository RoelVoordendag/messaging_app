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
                <p>Create a new room</p>
                <div className="flex justify-center items-center pt-2 cursor-pointer" onClick={handleOnClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <p>There are rooms</p>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
