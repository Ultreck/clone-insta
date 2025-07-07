import React from 'react'
import { FiBell, FiHome, FiLogOut, FiPlusSquare, FiUser } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import CreatePostModal from './CreatePostModal'

const SmallerScreenNavbar = ({
    user,
  onLogout,
  location,
  setLocation,
  handlePost,
  setCaption,
  caption,
  setImageUrl,
  isSubmitting,
  setIsSubmitting,
  open,
  setOpen
}) => {
     const cLocation = useLocation();
  const active = (path) =>
    cLocation.pathname === path ? "text-pink-600" : "text-gray-800";
  return (
   <aside className="fixed md:hidden left-0 right-0  bottom-0 h-12 border-t border-gray-200 w-full bg-white">
      <div className='w-full h-full'>
        <nav className="flex border w-full h-full justify-around items-center">
          <Link
            to="/"
            className={`flex items-center space-x-2 ${active(
              "/"
            )} hover:text-pink-600`}
          >
            <FiHome className="lg:text-2xl text-xl" />{" "}
            <span className="hidden md:inline">Home</span>
          </Link>
          {/* <Link to="/create" className={`flex items-center space-x-2 ${active('/create')} hover:text-pink-600`}>
            <FiPlusSquare className="lg:text-2xl text-xl" /> <span className="hidden md:inline">Create</span>
          </Link> */}
          <CreatePostModal
            triger={
              <div
                onClick={() => setOpen(true)}
                className={`flex items-center cursor-pointer space-x-2 ${active(
              "/create"
            )} hover:text-pink-600`}
              >
                <FiPlusSquare className="lg:text-2xl text-xl" />{" "}
                <span className="hidden md:inline">Create</span>
              </div>
            }
            setIsSubmitting={setIsSubmitting}
            isSubmitting={isSubmitting}
            handlePost={handlePost}
            location={location}
            setImageUrl={setImageUrl}
            setLocation={setLocation}
            user={user}
            setCaption={setCaption}
            caption={caption}
            open={open}
            setOpen={setOpen}
            type={'create'}
            post={''}
          />
          <Link
            to="/profile"
            className={`flex items-center space-x-2 ${active(
              "/profile"
            )} hover:text-pink-600`}
          >
            <FiUser className="lg:text-2xl text-xl" />{" "}
            <span className="hidden md:inline">Profile</span>
          </Link>
          <Link
            to="/notifications"
            className={`flex items-center space-x-2 ${active(
              "/notifications"
            )} hover:text-pink-600`}
          >
            <FiBell className="lg:text-2xl text-xl" />{" "}
            <span className="hidden md:inline">Notifications</span>
          </Link>
        </nav>
      </div>
      <div>
        {/* {user && (
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-800"
          >
            <FiLogOut className="lg:text-2xl text-xl" />{" "}
            <span className="hidden md:inline">Logout</span>
          </button>
        )} */}
      </div>
    </aside>
  )
}

export default SmallerScreenNavbar