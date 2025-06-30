// components/DeletePostDropdown.jsx

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import CreatePostModal from "./CreatePostModal";
import usePost from "../hooks/usePost";

const DeletePostDropdown = ({
  userId,
  postUserId,
  onDeletePost,
  postId,
  imageUrl,
//   open,
//   setOpen,
//   post
}) => {
//   const {
//     setIsSubmitting,
//     isSubmitting,
//     handlePost,
//     location,
//     setImageUrl,
//     setLocation,
//     user,
//     setCaption,
//     caption,
//   } = usePost();
  if (userId !== postUserId) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-100">
        <MoreVertical className="w-5 h-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="bg-white rounded shadow-sm">
        {/* <DropdownMenuItem
          onClick={() => {}}
          className="text-blue-600 cursor-pointer"
        >
          <CreatePostModal
            triger={
              <div
                className={`flex items-center space-x-2`}
              >
                <span className="hidden md:inline"> Edit Post</span>
              </div>
            }
            setIsSubmitting={setIsSubmitting}
            isSubmitting={isSubmitting}
            handlePost={handlePost}
            location={location}
            setImageUrl={setImageUrl}
            setLocation={setLocation}
            user={user}
            setCaption={setCaption}
            caption={caption}
            open={open}
            setOpen={setOpen}
            type={'edit'}
            post={post}
          />
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this post?"
            );
            if (confirmed) onDeletePost(postId, imageUrl);
          }}
          className="text-red-600 cursor-pointer"
        >
          Delete Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeletePostDropdown;
