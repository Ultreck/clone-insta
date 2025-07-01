// src/pages/Home.jsx
import PostModal from "../components/PostModal";
import { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import SuggestedUsersCard from "../components/SuggestedUsersCard";
import InstagramStory from "../components/InstagramStory";
import InstagramSuggestionsHeader from "../components/InstagramSuggestionsHeader";
import DeletePostDropdown from "../components/DeletePostDropdown ";

function Home({
  user,
  posts,
  onLike,
  onComment,
  onShare,
  onBookmark,
  bookmarks,
  onDeletePost,
  open,
  setOpen,
}) {
  const [commentText, setCommentText] = useState({});

  const handleCommentChange = (postId, value) => {
    setCommentText((prev) => ({ ...prev, [postId]: value }));
  };

  return (
    <div className="flex ">
      <div className="w-full lg:px-10 py-2">
        <InstagramStory />
        <InstagramSuggestionsHeader />
        {posts.map((post) => {
          const hasLiked = post.likes?.includes(user.uid);
          return (
            <div
              key={post.id}
              className="bg-white mb-8 rounded-md border border-gray-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={post?.userPic}
                    alt="user"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex items-center gap-2 space-x-1">
                    <span className="font-semibold">{post.userName}</span>
                    {post?.createdAt &&
                      formatDistanceToNow(post.createdAt.toDate(), {
                        addSuffix: true,
                      })}
                  </div>
                </div>
                {/* {user?.uid === post.userId && ( */}
                  <div className="text">
                    <DeletePostDropdown post={post} open={open} setOpen={setOpen} imageUrl={post?.imageUrl} postId={post?.id} onDeletePost={onDeletePost} />
                  </div>
                {/* )} */}
              </div>

              {/* Image */}
              <img
                src={post?.imageUrl}
                alt="post"
                className="w-full object-cover min-h-[50vh] lg:min-h-[75vh]"
              />

              {/* Action icons */}
              <div className="flex justify-between items-center px-4 py-2 text-xl">
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

                  <PostModal
                    post={post}
                    user={user}
                    onLike={onLike}
                    onComment={onComment}
                    onShare={onShare}
                    onBookmark={onBookmark}
                    bookmarks={bookmarks}
                    trigger={
                      <button className="cursor-pointer">
                        <FaRegComment />
                      </button>
                    }
                  />

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
                    onBookmark(post.id, bookmarks.includes(post.id))
                  }
                >
                  {bookmarks.includes(post.id) ? (
                    <FaBookmark />
                  ) : (
                    <FaRegBookmark />
                  )}
                </button>
              </div>

              {/* Likes */}
              <p className="px-4 text-sm font-semibold">
                {post.likes?.length || 0} likes
              </p>

              {/* Caption */}
              <p className="px-4 py-1 text-sm">
                <span className="font-semibold mr-1">{post.userName}</span>
                {post.caption}
              </p>

              {/* Comment Count */}
              <PostModal
                post={post}
                user={user}
                onLike={onLike}
                onComment={onComment}
                onBookmark={onBookmark}
                bookmarks={bookmarks}
                trigger={
                  <p className="px-4 cursor-pointer text-sm text-gray-500 mb-3">
                    View all {post.comments?.length || 0} comments
                  </p>
                }
              />

              {/* Comment Input */}
              <div className="px-4 py-2 border-t border-gray-800">
                <input
                  type="text"
                  value={commentText[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onComment(post.id, commentText[post.id]);
                      setCommentText((prev) => ({ ...prev, [post.id]: "" }));
                    }
                  }}
                  placeholder="Add a comment..."
                  className="bg-white w-full outline-none text-sm"
                />
              </div>
            </div>
          );
        })}
      </div>
      <SuggestedUsersCard user={user} />
    </div>
  );
}

export default Home;
