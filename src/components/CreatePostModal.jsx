import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "../components/ui/dialog";
import { useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiX } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegFaceLaughBeam } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import LocationInput from "./LocationInputField";
import { AdvancedSettings } from "./AdvancedSettings";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { AddCollaborators } from "./AddCollaborators";
import ThreeColorSpinner from "./ThreeColorSpinner";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
// import usePost from "../hooks/usePost";

const MAX_LENGTH = 2200;

const CreatePostModal = ({
  user,
  setLocation,
  handlePost,
  setCaption,
  caption,
  setImageUrl,
  isSubmitting,
  triger,
  open,
  setOpen,
  //   type,
  //   post
}) => {
  // const {open, setOpen} = usePost();
  //   const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const textareaRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  //   const [open, setOpen] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isNext]);

  useEffect(() => {
    if (!isSubmitting) {
      setOpen(false);
      setLocation("");
      setTextareaValue("");
      setFiles([]);
    }
  }, [isSubmitting]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    // Add preview only for display
    const previewFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    setFiles([previewFile]);
    setImageUrl(file);
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

  const addEmoji = (emojiData) => {
    const cursorPosition = textareaRef.current.selectionStart;
    const newCaption =
      caption.substring(0, cursorPosition) +
      emojiData.emoji +
      caption.substring(cursorPosition);
    setCaption(newCaption);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCaption(textareaValue);
    }, 0);

    return () => clearTimeout(timeout);
  }, [textareaValue, setCaption]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onOpenAutoFocus={(e) => e.preventDefault()}
    >
      <form>
        <DialogTrigger asChild>
          <div onClick={() => setOpen(true)}>{triger}</div>
        </DialogTrigger>
        <DialogContent
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={`p-0 border-0 sm:max-w-lg ${
            isNext && !!files?.length && "md:max-w-2xl lg:max-w-3xl"
          } min-h-[80vh] bg-white`}
        >
          <VisuallyHidden>
            <DialogTitle>Profile Settings</DialogTitle>
          </VisuallyHidden>
          <div className="text w-full h-full md:h-full">
            {isSubmitting && (
              <div className="text fixed w-full h-full bg-gray-700/80 z-30 flex justify-center items-center">
                <ThreeColorSpinner />
              </div>
            )}
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
                  } ${!isNext? 'min-h-[80vh]' : 'md:max-h-[80vh] h-[50vh]'} group`}
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
                    className={`w-full ${
                      !isNext && "rounded-br-lg"
                    } ${!isNext? 'object-cover  h-[80vh] ' : 'md:h-[80vh] h-full md:object-cover object-fill'} rounded-bl-lg `}
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
              {!!files.length && (
                <h2 className="text-center z-20 absolute top-0 border-b w-full flex justify-between bg-white px-10 items-center h-12">
                  <FaArrowLeft
                    onClick={() => setIsNext(false)}
                    className="cursor-pointer"
                  />
                  <p className="text">{isNext ? "Create new post" : "Crop"}</p>
                  {isNext && (
                    <button
                      onClick={handlePost}
                      className="text-blue-600 z-30 font-semibold cursor-pointer pr-3"
                    >
                      Share
                    </button>
                  )}

                  {!isNext && (
                    <button
                      onClick={() => setIsNext(true)}
                      className="text-blue-600 font-semibold cursor-pointer pr-3"
                    >
                      Next
                    </button>
                  )}
                </h2>
              )}

              {isNext && !!files?.length && (
                <ScrollArea className="md:w-2/5 border max-h-[46vh] md:max-h-[80vh] space-y-4 overflow-y-auto">
                  <div className=" flex pb-10 flex-col border-gray-300">
                    <div className="flex items-center gap-3 p-4 md:mt-12">
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
                    <div className="mt-3 hidden md:block">
                      <textarea
                        ref={textareaRef}
                        id="caption"
                        rows={8}
                        value={textareaValue}
                        onChange={(e) => {
                          if (e.target.value.length <= MAX_LENGTH) {
                            setTextareaValue(e.target.value);
                          }
                        }}
                        // onKeyUp={handleMouseUp}
                        placeholder=""
                        // maxLength={MAX_LENGTH}
                        className="w-full  resize-none focus-visible:ring-0 outline-0 border-0 px-3 py-2 border-gray-300"
                      />
                    </div>

                    {/* Caption input */}
                    <div className="mt-3 md:hidden">
                      <textarea
                        ref={textareaRef}
                        id="caption"
                        rows={3}
                        value={textareaValue}
                        onChange={(e) => {
                          if (e.target.value.length <= MAX_LENGTH) {
                            setTextareaValue(e.target.value);
                          }
                        }}
                        // onKeyUp={handleMouseUp}
                        placeholder=""
                        // maxLength={MAX_LENGTH}
                        className="w-full  resize-none focus-visible:ring-0 outline-0 border-0 px-3 py-2 border-gray-300"
                      />
                    </div>
                    <div className="text flex border-b py-3 justify-between px-3">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className=" text-gray-500 hover:text-gray-700"
                      >
                        <FaRegFaceLaughBeam />
                      </button>

                      {showEmojiPicker && (
                        <div className="absolute bottom-12 right-0 z-10">
                          <EmojiPicker
                            onEmojiClick={addEmoji}
                            width={300}
                            height={400}
                          />
                        </div>
                      )}
                      <div className="text-gray-300">
                        {caption?.length}/2,200
                      </div>
                    </div>
                    <LocationInput setLocation={setLocation} />
                    <div className="text">
                      <AddCollaborators user={user} files={files} />
                    </div>
                    <div className="text">
                      <AdvancedSettings />
                    </div>
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreatePostModal;
