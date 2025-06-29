// Instagram Clone — Full Layout with Routing and Components
// Stack: React + Tailwind CSS + Firebase + React Router DOM

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth, db } from "./config/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  setDoc,
  Timestamp,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ThreeColorSpinner from "./components/ThreeColorSpinner";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;
const apiUrl = import.meta.env.VITE_API_URL;
function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [progress, setProgress] = useState(0);
  // const [downloadUrl, setDownloadUrl] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      // if (user) setIsLoading(false);
      setUser(user);
    });

    const unsub = onSnapshot(collection(db, "instagram"), (snapshot) => {
      setIsLoading(false);
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleSignOut = () => signOut(auth);

  const handlePost = async () => {
    if (!caption || !imageUrl) return;

    try {
      const storage = getStorage();
      const filename = `instagram/${user.uid}/${Date.now()}`;
      const storageRef = ref(storage, filename);

      // ✅ Upload the real File object
      const uploadSnapshot = await uploadBytes(storageRef, imageUrl);

      // ✅ Get the download URL
      const downloadURL = await getDownloadURL(uploadSnapshot.ref);
      console.log(downloadURL);

      // ✅ Save this correct download URL to Firestore
      await addDoc(collection(db, "instagram"), {
        caption,
        imageUrl: downloadURL, // MUST match how you render it later
        userName: user.displayName,
        userId: user.uid,
        userPic: user.photoURL,
        createdAt: serverTimestamp(),
        location,
        likes: [],
        comments: [],
      });

      // ✅ Reset state
      setCaption("");
      setImageUrl(null);
      setLocation("");
    } catch (error) {
      console.error("❌ Upload failed:", error.message);
    }
  };

  const handleDeletePost = async (postId, imageUrl) => {
    try {
      await deleteDoc(doc(db, "instagram", postId));
      const storage = getStorage();
      const path = decodeURIComponent(imageUrl.split("/o/")[1].split("?")[0]);
      const imageRef = ref(storage, path);
      await deleteObject(imageRef);

      console.log("Post deleted");
    } catch (error) {
      console.error("Error deleting post:", error.message);
      alert("You are not authorized to delete this post.");
    }
  };

  const handleLike = async (postId, hasLiked) => {
    const postRef = doc(db, "instagram", postId);
    if (hasLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }
  };

  const handleAddComment = async (postId, text) => {
    if (!text.trim()) return;

    const postRef = doc(db, "instagram", postId);

    const comment = {
      userId: user.uid,
      userName: user.displayName,
      text,
      createdAt: Timestamp.now(),
    };

    await updateDoc(postRef, {
      comments: arrayUnion(comment),
    });
  };
  const handleShare = async (postId) => {
    const postUrl = `${window.location.origin}/instagram/${postId}`; // You can customize this route
    try {
      await navigator.clipboard.writeText(postUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link.");
    }
  };

  const handleBookmark = async (postId, isBookmarked) => {
    const userRef = doc(db, "users", user.uid);

    try {
      if (isBookmarked) {
        await setDoc(
          userRef,
          {
            bookmarks: arrayRemove(postId),
          },
          { merge: true }
        );
      } else {
        await setDoc(
          userRef,
          {
            bookmarks: arrayUnion(postId),
          },
          { merge: true }
        ); // ✅ This creates the doc if it doesn't exist
      }
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  useEffect(() => {
    if (!user) return;
      getUserIPAndTrack();
    const userRef = doc(db, "users", user.uid);
    const unsubUser = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setBookmarks(userData.bookmarks || []);
      }
    });

    return () => unsubUser();
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <button
          onClick={handleSignIn}
          className="bg-pink-600 text-white px-6 py-3 rounded text-lg"
        >
          Sign in with Google
        </button>
      </div>
    );
  };


  // useEffect(() => {
  //   getUserIPAndTrack();
  // }, []);

  const getUserIPAndTrack = async () => {
    try {
      const res = await fetch(`${apiUrl}`);
      if (!res.ok) return;

      const data = await res.json();

      const dataInfo = {
        ip: data?.ip,
        appName: appName,
        countryName: data?.country_name,
        countryCode: data?.country_code,
      };

      await axios.post(`${baseUrl}/app/tracking`, dataInfo);
      console.log("IP successfully posted");
      window.localStorage.setItem("visitedOnce", JSON.stringify("true"));
    } catch (error) {
      console.error("Tracking error:", error);
    };
  };

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-sans flex w-full">
        <div className="text w-1/4">
          <Sidebar
            handlePost={handlePost}
            setCaption={setCaption}
            caption={caption}
            location={location}
            setLocation={setLocation}
            user={user}
            onLogout={handleSignOut}
            setImageUrl={setImageUrl}
          />
        </div>
        {isLoading && (
          <div className="text fixed w-full h-full bg-gray-700/80 z-30 flex justify-center items-center">
            <ThreeColorSpinner />
          </div>
        )}
        <div className="text w-3/5">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  posts={posts}
                  onLike={handleLike}
                  onComment={handleAddComment}
                  onShare={handleShare}
                  onBookmark={handleBookmark}
                  bookmarks={bookmarks}
                  onDeletePost={handleDeletePost}
                />
              }
            />
            {/* <Route
              path="/create"
              element={
                <Create
                  user={user}
                  caption={caption}
                  imageUrl={imageUrl}
                  setCaption={setCaption}
                  setImageUrl={setImageUrl}
                  handlePost={handlePost}
                />
              }
            /> */}
            <Route path="/profile" element={<Profile user={user} />} />
            <Route
              path="/notifications"
              element={<Notifications user={user} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
