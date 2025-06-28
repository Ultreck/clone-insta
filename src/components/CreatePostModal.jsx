import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button"
import { FiPlusSquare } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const CreatePostModal = () => {
  const location = useLocation();
  const active = (path) =>
    location.pathname === path ? "text-pink-600" : "text-gray-800";
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Link to="/create" className={`flex items-center space-x-2 ${active('/create')} hover:text-pink-600`}>
            <FiPlusSquare className="text-2xl" /> <span className="hidden md:inline">Create</span>
          </Link>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore unde fuga, quisquam maiores magni atque ducimus sint numquam repellendus nihil molestiae velit ad pariatur amet earum dolorem voluptas, eos cum.
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreatePostModal;
