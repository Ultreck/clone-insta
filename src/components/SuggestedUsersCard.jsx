const suggested = [
  { id: 1, name: "judecodes", followedBy: "dprinceajetunmobi", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "obidevin", followedBy: "official_pamtel + 2 more", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "_nariels", followedBy: "0empress_b", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "softcodefx", followedBy: "shy_ley + 1 more", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "ikem_chinoso", followedBy: "0empress_b", avatar: "https://i.pravatar.cc/150?img=5" },
];

export default function SuggestedUsersCard({ user }) {
    
  return (
    <div className="bg-white hidden lg:block mt-5 h-[70vh] p-4 rounded-lg w-2/3 text-sm">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || ""}
            className="w-10 h-10 rounded-full"
            alt="profile"
          />
          <div>
            <p className="font-semibold text-black">{user?.displayName}</p>
            <button className="text-blue-500 text-xs font-medium">Switch</button>
          </div>
        </div>
      </div>

      {/* Suggested Users */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-500 font-semibold">Suggested for you</p>
        <button className="text-xs text-black font-medium">See All</button>
      </div>

      {suggested.map(user => (
        <div key={user.id} className="flex items-center justify-between py-2">
          <div className="flex gap-3 items-center">
            <img
              src={user.avatar}
              className="w-8 h-8 rounded-full"
              alt={user.name}
            />
            <div>
              <p className="font-medium text-black">{user.name}</p>
              <p className="text-gray-400 text-xs truncate">Followed by {user.followedBy}</p>
            </div>
          </div>
          <button className="text-blue-500 text-xs font-semibold">Follow</button>
        </div>
      ))}

      {/* Footer Links */}
      <div className="text-[11px] text-gray-400 mt-4 space-x-2 leading-4">
        <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
        <p>Locations · Language · Meta Verified</p>
        <p className="mt-2 text-gray-500 text-[10px]">© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
}
