import { useLocation } from "react-router-dom";
import { UserRooms } from "../types/UserRooms";
import CreateNewRoomButton from "../components/CreateNewRoomButton";

export default function Rooms() {
  // @todo write error handling for this - Wtf is happening when there are no connected rooms?
  const { user, rooms } = JSON.parse(useLocation().state.response) as UserRooms;

  const handleOnClick = () => {
    console.log("lmao");
  };

  return (
    <>
      <p>hallo: {user.name}</p>
      <div
        className="bg-green-500"
        style={{
          width: "100vw",
          height: "100vh",
          /* Center the contents */
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
    >
        {rooms.length == 0 && (
          <>
            <CreateNewRoomButton handleOnclick={handleOnClick} />
          </>
        )}
      </div>
    </>
  );
}
