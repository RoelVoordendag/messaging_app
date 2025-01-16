import { Button } from "@/components/ui/button";
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
import { fetch, Client } from "@tauri-apps/api/http";

interface CreateRoomDialog {
  triggerComponent: any;
  onsubmit: () => void;
}

export function CreateRoomDialog({
  triggerComponent,
  onsubmit,
}: CreateRoomDialog) {
  // @todo create state to track the input

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
            <Label htmlFor="roomName" className="text-right">
              Room name
            </Label>
            <Input
              id="roomName"
              defaultValue="new chat"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Search person..."
              className="col-span-3"
              onChange={(value) => {
                console.log(value.currentTarget.value);
                
                fetch('')
                
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onsubmit}>
            Create room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
