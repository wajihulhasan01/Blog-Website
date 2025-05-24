// components/Blogspost.jsx
import React from 'react';

const Blogspost = ({
  userName,
  postDate,
  postTitle,
  postContent,
  postImage,
  profilePic,
  onDelete,
  onEdit, // <- Accept edit handler
  canDelete,
}) => {
  return (
    <div className='flex justify-center mt-6'>
      <div className="max-w-2xl w-full flex border rounded p-4 bg-white shadow relative">
        {canDelete && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700"
              title="Edit Post"
            >
              ✏️
            </button>
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
              title="Delete Post"
            >
              🗑️
            </button>
          </div>
        )}
        <div className="flex-shrink-0 mr-4">
          <img
            className="w-10 h-10 rounded-full"
            src={profilePic || "https://www.w3schools.com/howto/img_avatar.png"}
            alt={`Avatar of ${userName}`}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="font-bold">{userName}</p>
              <p className="text-sm text-gray-500">{postDate}</p>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-1">{postTitle}</h3>
          <p className="text-gray-700 mb-2">{postContent}</p>
          {postImage && (
            <img src={postImage} alt="Post" className="w-full h-auto rounded mt-2" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogspost;
