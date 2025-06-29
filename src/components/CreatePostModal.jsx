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
import { Button } from "../components/ui/button";
import { FiPlusSquare } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiImage } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { FaArrowLeft, FaRegComment } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
const CreatePostModal = ({ user, onPostSubmit, post }) => {
  const location = useLocation();
  const active = (path) =>
    location.pathname === path ? "text-pink-600" : "text-gray-800";
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if(textareaRef.current){
            textareaRef.current.focus();
        }
    }, [isNext]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Simulate upload
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call parent component with post data
      onPostSubmit({
        caption,
        imageUrl: files[0]?.preview || null,
      });

      // Reset form
      setCaption("");
      setFiles([]);
    } finally {
      setIsUploading(false);
    }
  };

  console.log(user);

  return (
    <Dialog onOpenAutoFocus={(e) => e.preventDefault()}>
      <form>
        <DialogTrigger asChild>
          <div
            className={`flex items-center cursor-pointer space-x-2 ${active(
              "/create"
            )} hover:text-pink-600`}
          >
            <FiPlusSquare className="text-2xl" />{" "}
            <span className="hidden md:inline">Create</span>
          </div>
        </DialogTrigger>
        <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
          className={`p-0 border-0 sm:max-w-lg ${
            isNext && !!files?.length && "md:max-w-2xl lg:max-w-3xl"
          } min-h-[80vh] bg-white`}
        >
          <div className="text w-full h-full md:h-full">
            {/* <h2 className="text-center h-10">Create new post</h2> */}
            <div className="md:flex w-full h-full md:h-full border-0">
              {/* Drag and drop area */}
              {files.length === 0 ? (
                <div
                  {...getRootProps()}
                  className={`flex justify-center relative h-full border-0 items-center ${
                    isNext && !!files?.length ? "md:w-3/5" : "w-full"
                  } rounded-lg text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-300 hover:border-pink-400"
                  }`}
                >
                  <h2 className="text-center absolute top-0 border-b w-full flex justify-center items-center h-12">
                    Create new post
                  </h2>
                  <input {...getInputProps()} />
                  <div
                    className={`flex flex-col items-center justify-center space-y-2`}
                  >
                    {/* <FiUpload className="w-8 h-8 text-gray-400" /> */}
                    <img src="/assets/media.png" alt="" className="text" />
                    <p className="text-sm text-gray-500">
                      {isDragActive
                        ? "Drop the photo here"
                        : "Drag & drop a photo, or click to select"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Supports: JPG, PNG, GIF
                    </p>
                  </div>
                </div>
              ) : (
                // Image preview
                <div
                  className={`relative ${
                    isNext && !!files?.length ? "md:w-3/5" : "w-full"
                  } h-[80vh] group`}
                >
                  <h2
                    className={`text-center absolute top-0 border-b ${
                      isNext && "hidden"
                    } w-full flex justify-between bg-white px-10 items-center h-12`}
                  >
                    <FaArrowLeft
                      onClick={() => setIsNext(false)}
                      className="cursor-pointer"
                    />
                    <button
                      onClick={() => setIsNext(true)}
                      className="text-blue-600 font-semibold cursor-pointer pr-3"
                    >
                      Next
                    </button>
                  </h2>
                  <img
                    src={files[0].preview}
                    alt="Preview"
                    className={`w-full h-full ${
                      !isNext && "rounded-br-lg"
                    } object-cover rounded-bl-lg `}
                    onLoad={() => URL.revokeObjectURL(files[0].preview)}
                  />
                  <button
                    onClick={removeFile}
                    className={`absolute ${"top-16 right-2"}  bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-opacity opacity-0 group-hover:opacity-100`}
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}
              <h2 className="text-center absolute top-0 border-b w-full flex justify-between bg-white px-10 items-center h-12">
                <FaArrowLeft
                  onClick={() => setIsNext(false)}
                  className="cursor-pointer"
                />
                <button
                  onClick={() => setIsNext(true)}
                  className="text-blue-600 font-semibold cursor-pointer pr-3"
                >
                  Next
                </button>
              </h2>

              {isNext && !!files?.length && (
                <div className="md:w-2/5 flex flex-col border-l border-gray-300">
                  <div className="flex items-center gap-3 p-4 mt-12">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.photoURL}
                        alt="user"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex items-center gap-2 space-x-1">
                        <span className="font-semibold">
                          {user.displayName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Caption input */}
                  <div className="mt-3">
                    <textarea
                    ref={textareaRef}
                      id="caption"
                      rows={8}
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder=""
                      className="w-full  resize-none focus-visible:ring-0 outline-0 border-0 px-3 py-2 border-gray-300"
                                   />
                  </div>
                  <div className="text"></div>

                  <ScrollArea className="flex-1 px-4 py-8 space-y-4">
                    {post?.comments?.map((c, idx) => (
                      <div key={idx} className="text-sm my-3">
                        <span className="font-semibold">{c?.userName}</span>{" "}
                        <span>{c?.text}</span>
                        <p className="text-xs text-gray-400">
                          {c?.createdAt &&
                            formatDistanceToNow(c.createdAt.toDate(), {
                              addSuffix: true,
                            })}{" "}
                          • {post.likes.length} like
                          {post.likes.length !== 1 && "s"} • Reply
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="border-t border-gray-800 px-4 py-3 space-y-3">
                    <div className="flex justify-between items-center px-4 py-2 text-xl">
                      <div className="flex w-full space-x-4">
                        <button
                          className="cursor-pointer"
                          onClick={() => onLike(post.id, hasLiked)}
                        ></button>
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
                    </div>

                    <p className="text-sm font-semibold">
                      {post?.likes?.length || 0} likes
                    </p>

                    <div className="text w-full">
                      <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-2 justify-between w-full"
                      ></form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreatePostModal;
