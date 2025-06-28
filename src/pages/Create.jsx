// Create.jsx
function Create({ user, caption, imageUrl, setCaption, setImageUrl, handlePost }) {
  return (
    <main className="ml-20 md:ml-64 pt-6 px-4 max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />
        <button
          onClick={handlePost}
          className="bg-pink-600 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>
    </main>
  );
}

export default Create;
