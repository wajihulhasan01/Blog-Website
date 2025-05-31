// components/Blogspost.jsx
import React, { useState } from 'react';

const Blogspost = ({
  userName,
  postDate,
  postTitle,
  postContent,
  postImage,
  profilePic,
  onDelete,
  onEdit,
  canDelete,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex justify-center mt-6">
      <div className="max-w-2xl w-full border rounded p-4 bg-white shadow relative">
        {/* Edit/Delete Buttons */}
        {canDelete && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700"
              title="Edit Post"
            >
              ✏️
            </button>
            {/* <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
              title="Delete Post"
            >
              🗑️
            </button> */}
          </div>
        )}

        {/* Top Row: Avatar + Username + Date */}
        <div className="flex items-center gap-3 mb-3">
          <img
            className="w-10 h-10 rounded-full"
            src={profilePic || "https://www.w3schools.com/howto/img_avatar.png"}
            alt={`Avatar of ${userName}`}
          />
          <div>
            <p className="font-bold">{userName}</p>
            <p className="text-sm text-gray-500">{postDate}</p>
          </div>
        </div>

        {/* Post Content */}
        <div>
          <h3 className="text-xl font-semibold mb-1">{postTitle}</h3>

          <p className={`text-gray-700 mb-2 ${expanded ? '' : 'line-clamp-3'}`}>
            {postContent}
          </p>

          {postContent.length > 200 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-sm"
            >
              {expanded ? 'See less' : 'See more'}
            </button>
          )}

          {postImage && (
            <img
              src={postImage}
              alt="Post"
              className="w-full h-auto rounded mt-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogspost;
