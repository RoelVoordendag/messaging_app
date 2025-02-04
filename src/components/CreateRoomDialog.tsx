import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/types/User";
import { fetch } from "@tauri-apps/api/http";
import { useState } from "react";
import { Button } from "./ui/button";
import { invoke } from "@tauri-apps/api";

interface CreateRoomDialog {
  triggerComponent: any;
}

export function CreateRoomDialog({ triggerComponent }: CreateRoomDialog) {
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [roomName, setRoomName] = useState<String | undefined>(undefined);

  const createRoom = (): void => {
    if (!selectedUser?.id) return; // @todo error state?

    invoke('create_room', { roomName, userId: selectedUser.id }).then(e => console.log(e));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create room</DialogTitle>
          <DialogDescription>
            First name your room and then create search the person you wanna
            match with.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="roomName" className="text-left">
              Room name
            </Label>
            <Input
              id="roomName"
              placeholder="New chat"
              className="col-span-3"
              onChange={(value) => setRoomName(value.currentTarget.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Search person..."
              className="col-span-3"
              onChange={(value) => {
                if (!value.currentTarget.value) {
                  setUsers([]);
                  return;
                }

                fetch("http://localhost:4040/api/users", {
                  method: "GET",
                  query: {
                    username: value.currentTarget.value,
                  },
                })
                  .then((response) => {
                    const users = response.data as Array<User>;

                    setUsers(users);
                  })
                  .catch((error) => {
                    // @todo set error state
                    console.error(error);
                    setUsers([]);
                  });
              }}
              value={selectedUser?.name}
            />
            {users.length > 0 && (
              <div className="absolute z-10 mt-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedUser(user);
                      setUsers([]);
                    }}
                  >
                    {user.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={(e) => {
              // @ts-ignore
              e.target.disabled = true;

              createRoom();
            }}
          >
            Create room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
