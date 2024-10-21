import { Room } from "./Room";
import { User } from "./User";

export interface UserRooms {
  user: User;
  rooms: Array<Room>;
}
