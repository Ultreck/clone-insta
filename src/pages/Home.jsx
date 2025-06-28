// Home.jsx
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

function Home({ user, posts }) {
  return (
    <main className="ml-20 md:ml-64 pt-6 px-4 max-w-2xl mx-auto space-y-6">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded shadow p-4">
          <div className="flex items-center space-x-2 mb-2">
            {post.userPic ? (
              <img
                src={post.userPic}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-2xl text-gray-400" />
            )}
            <span className="font-semibold">{post.userName}</span>
          </div>
          <img
            src={post.imageUrl}
            alt="post"
            className="w-full h-64 object-cover rounded mb-2"
          />
          <div className="flex space-x-4 text-xl mb-2">
            <FiHeart />
            <FiMessageCircle />
          </div>
          <p className="text-sm">
            <span className="font-semibold mr-1">{post.userName}</span>
            {post.caption}
          </p>
        </div>
      ))}
    </main>
  );
}

export default Home;
