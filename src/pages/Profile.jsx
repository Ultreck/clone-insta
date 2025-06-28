// src/pages/Profile.jsx
function Profile({ user }) {
  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="bg-white p-4 rounded shadow w-full max-w-md">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-semibold">{user.displayName}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}
export default Profile;
