import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useState } from "react";
import { Portal } from "@radix-ui/react-portal";
import { formatDistanceToNow } from "date-fns";
import { BsSend } from "react-icons/bs";

export default function PostModal({
  post,
  user,
  onLike,
  onComment,
  trigger,
  onShare,
  onBookmark,
  bookmarks,
}) {
  const [comment, setComment] = useState("");
  const hasLiked = post?.likes?.includes(user.uid);

  const handleSubmit = (e) => {
    e.preventDefault();
    onComment(post.id, comment);
    setComment("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <Portal>
        <DialogContent className="p-0 border-0 sm:max-w-lg md:max-w-2xl lg:max-w-5xl min-h-[90vh] bg-gray-200">
          <div className="md:flex w-full h-full md:h-auto border-0">
            <div className=" bg-white md:w-1/2 min-h-[40vh] md:min-h-[90vh] overflow-hidden">
              <img
                src={post?.imageUrl}
                alt="Post"
                className="w-full object-center md:object-cover max-h-[40vh] md:min-h-[90vh]"
              />
            </div>

            <div className="md:w-1/2 bg-gray-200 flex flex-col border-l border-gray-300">
              <div className="flex items-center gap-3 p-4 border-b border-gray-700">
                <Avatar>
                  <AvatarImage src={post?.userPic} />
                  <AvatarFallback>{post?.userName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{post?.userName}</p>
                  <p className="text-xs text-gray-400">
                    Victoria Island, Lagos
                  </p>
                </div>
                <button className="text-gray-400 text-sm">•••</button>
              </div>

              <ScrollArea className="flex-1 px-4 py-8 max-h-[180px] overflow-y-auto lg:max-h-[200px] space-y-4">
                {post?.comments?.map((c, idx) => (
                  <div key={idx} className="text-sm my-3">
                    <span className="font-semibold">{c?.userName}</span>{" "}
                    <span>{c?.text}</span>
                    <p className="text-xs text-gray-400">
                      {c?.createdAt &&
                        formatDistanceToNow(c.createdAt.toDate(), {
                          addSuffix: true,
                        })}{" "}
                      • {post.likes.length} like{post.likes.length !== 1 && "s"}{" "}
                      • Reply
                    </p>
                  </div>
                ))}
              </ScrollArea>
              <div className="border-t bg-gray-200 border-gray-800 z-20 px-4 lg:py-3 py-1 space-y-3">
                {/* Action icons */}
                <div className="flex  bg-gray-200 justify-between items-center px-4 py-2 text-xl">
                  <div className="flex w-full space-x-4">
                    <button
                      className="cursor-pointer"
                      onClick={() => onLike(post.id, hasLiked)}
                    >
                      {hasLiked ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                    <button className="">
                      <FaRegComment />
                    </button>

                    <button
                      onClick={() => onShare(post.id)}
                      className="cursor-pointer"
                    >
                      <BsSend />
                    </button>
                  </div>
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      onBookmark(post.id, bookmarks?.includes(post.id))
                    }
                  >
                    {bookmarks?.includes(post.id) ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                </div>

                <p className="text-sm font-semibold">
                  {post?.likes?.length || 0} likes
                </p>

                <div className="text w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center mb-2 gap-2 justify-between w-full"
                  >
                    <Input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="bg-white focus-visible:ring border-0"
                    />
                    <Button
                      type="submit"
                      variant="ghost"
                      className="text-blue-500 bg-white hover:bg-gray-100 text-sm"
                    >
                      Post
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Portal>
    </Dialog>
  );
}
