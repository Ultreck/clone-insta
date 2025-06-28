// Instagram Clone — Full Layout with Routing and Components
// Stack: React + Tailwind CSS + Firebase + React Router DOM

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './config/firebase';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const unsub = onSnapshot(collection(db, 'posts'), (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleSignOut = () => signOut(auth);

  const handlePost = async () => {
    if (caption && imageUrl) {
      await addDoc(collection(db, 'posts'), {
        caption,
        imageUrl,
        userName: user.displayName,
        createdAt: serverTimestamp(),
        userPic: user.photoURL
      });
      setCaption('');
      setImageUrl('');
    }
  };

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
  }

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen font-sans flex">
        <Sidebar user={user} onLogout={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={<Home user={user} posts={posts} />}
          />
          <Route
            path="/create"
            element={<Create
              user={user}
              caption={caption}
              imageUrl={imageUrl}
              setCaption={setCaption}
              setImageUrl={setImageUrl}
              handlePost={handlePost}
            />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} />}
          />
          <Route
            path="/notifications"
            element={<Notifications user={user} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
