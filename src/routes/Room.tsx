import { useLocation } from "react-router-dom";
import { User } from "../types/User";

export default function Rooms() {
    const user = useLocation().state.response as User;

    return (
        <>
            <p>hallo user: {user.name}</p>
        </>
    )
}