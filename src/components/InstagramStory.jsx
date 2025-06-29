import React, { useEffect, useState } from 'react'

const InstagramStory = () => {
    const [stories, setStories] = useState([]);

  useEffect(() => {
    // Generate random stories data
    const randomStories = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      username: generateRandomUsername(),
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random().toString(36).substring(7)}`,
      hasUnseenStory: Math.random() > 0.5 // 50% chance of having an unseen story
    }));
    setStories(randomStories);
  }, []);

  // Random username generator
  const generateRandomUsername = () => {
    const prefixes = ['cool', 'super', 'lil', 'the_real', 'mr', 'queen', 'king'];
    const suffixes = ['_kay', '_baby', 'tron', 'zilla', 'dude', 'slayer', 'master'];
    const names = ['ali', 'sam', 'jess', 'taylor', 'jamie', 'casey', 'max'];
    
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${
      names[Math.floor(Math.random() * names.length)]
    }${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  };
  return (
       <div className="flex space-x-4 px-4 py-3 overflow-x-auto no-scrollbar">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
          {/* Gradient border for unseen stories */}
          <div className={`p-0.5 rounded-full ${
            story.hasUnseenStory 
              ? 'bg-gradient-to-tr from-yellow-400 to-pink-500' 
              : 'bg-gray-200'
          }`}>
            <div className="w-16 h-16 rounded-full bg-white p-0.5 flex items-center justify-center">
              <img 
                src={story.avatar} 
                alt={story.username}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs truncate w-16 text-center">
            {story.username}
          </span>
        </div>
      ))}
    </div>
  )
}

export default InstagramStory