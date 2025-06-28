// Instagram Clone Starter
// Stack: React + Tailwind CSS + Firebase (for Auth & Posts)

import { useState, useEffect } from 'react';
import { auth, db } from './firebase'; // Firebase config setup separately
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

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

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handlePost = async () => {
    if (caption && imageUrl) {
      await addDoc(collection(db, 'posts'), {
        caption,
        imageUrl,
        userName: user.displayName,
        createdAt: serverTimestamp()
      });
      setCaption('');
      setImageUrl('');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Instagram Clone</h1>

      {!user ? (
        <button
          onClick={signIn}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Create a Post</h2>
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border w-full p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="border w-full p-2 mb-2"
            />
            <button
              onClick={handlePost}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </div>

          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded shadow">
                <img src={post.imageUrl} alt="Post" className="w-full h-60 object-cover rounded" />
                <p className="mt-2 font-semibold">{post.userName}</p>
                <p>{post.caption}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
