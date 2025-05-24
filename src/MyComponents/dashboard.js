// components/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Blogspost from "./blogspost";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const navigate = useNavigate();

  const data = [
    { name: "Mon", views: 150 },
    { name: "Tue", views: 200 },
    { name: "Wed", views: 180 },
    { name: "Thu", views: 220 },
    { name: "Fri", views: 250 },
    { name: "Sat", views: 170 },
    { name: "Sun", views: 190 }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profilePicRef.current &&
        !profilePicRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [activeTab]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          profilePic: currentUser.photoURL,
        });
        fetchPosts();
      } else {
        setUser(null);
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const createNewPost = async () => {
    if (!user) {
      alert("You must be logged in to post.");
      return;
    }

    const newPost = {
      userId: user.email,
      userName: user.name,
      userEmail: user.email,
      postTitle: newTitle,
      postDate: new Date().toLocaleDateString("en-US", {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      postContent: newContent,
      postImage: newImage ? URL.createObjectURL(newImage) : null,
      profilePic: user.profilePic
    };

    try {
      await addDoc(collection(db, "posts"), newPost);
      fetchPosts();
      setActiveTab("posts");
      setNewTitle("");
      setNewContent("");
      setNewImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  };

  const updatePost = async () => {
    if (!editingPostId) return;

    try {
      const postRef = doc(db, "posts", editingPostId);
      const updatedPost = {
        postTitle: newTitle,
        postContent: newContent,
        postImage: newImage ? URL.createObjectURL(newImage) : null,
        postDate: new Date().toLocaleDateString("en-US", {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      };
      await updateDoc(postRef, updatedPost);
      fetchPosts();
      setEditingPostId(null);
      setActiveTab("posts");
      setNewTitle("");
      setNewContent("");
      setNewImage(null);
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post");
    }
  };

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setNewTitle(post.postTitle);
    setNewContent(post.postContent);
    setNewImage(null);
    setActiveTab("createPost");
  };

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "posts", postId));
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const dropdownRef = useRef(null);
  const profilePicRef = useRef(null);

  return (
    <>
      <nav className="sticky top-0 z-50 text-center flex justify-center semi-bold bg-blue-600 text-white">
        <div className="border border-white m-7 p-2 rounded-full flex justify-between items-center w-5/6">
          <div className="flex items-center gap-4">
            <img src="logo.jpg" className="h-8 w-8 rounded-full" alt="Logo" />
            <h1 className="font-bold text-xl">CodeCanvas</h1>
          </div>
          <div className="flex items-center gap-4 relative">
            <img
              ref={profilePicRef}
              src={user?.profilePic || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            {sidebarOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-16 mt-2 bg-white text-black rounded shadow-md py-2 w-48 z-50"
              >
                <div className="px-4 py-2 border-b">
                  <div className="font-semibold">{user?.name}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setActiveTab("dashboard")}>🏠 Dashboard</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setActiveTab("posts")}>📝 Posts</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => setActiveTab("settings")}>⚙️ Settings</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="min-h-screen flex bg-blue-600">
        <div className="flex-1 p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            {activeTab === "dashboard" && <h1 className="text-white font-semibold text-3xl">Dashboard</h1>}
            {activeTab === "posts" && (
              <button className="bg-orange-400 rounded px-4 py-2 text-white" onClick={() => setActiveTab("createPost")}>Create New Post</button>
            )}
          </div>

          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-gray-500">Total Posts</div>
                  <div className="text-2xl font-bold">{posts.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-gray-500">Drafts</div>
                  <div className="text-2xl font-bold">15</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-gray-500">Monthly Views</div>
                  <div className="text-2xl font-bold">8,400</div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Views This Week</h2>
                <div className="flex gap-4">
                  {data.map((day) => (
                    <div key={day.name} className="flex flex-col items-center">
                      <div className="bg-blue-500 w-6 rounded-t" style={{ height: `${day.views / 10}px` }}></div>
                      <div className="text-sm mt-2">{day.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "createPost" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{editingPostId ? "Edit Post" : "Create New Post"}</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newTitle || !newContent) {
                  alert("Title and content are required!");
                  return;
                }
                editingPostId ? updatePost() : createNewPost();
              }}>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Title *</label>
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full border px-3 py-2 rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Content *</label>
                  <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} rows="4" className="w-full border px-3 py-2 rounded" required />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Image (optional)</label>
                  <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
                  {newImage && <img src={URL.createObjectURL(newImage)} alt="Preview" className="mt-2 max-h-40 rounded" />}
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {editingPostId ? "Update Post" : "Post"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "posts" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">All Posts</h2>
              <div className="space-y-4">
                {posts.map((post) => (
                  <Blogspost
                    key={post.id}
                    userName={post.userName}
                    postTitle={post.postTitle}
                    postDate={post.postDate}
                    postContent={post.postContent}
                    postImage={post.postImage}
                    profilePic={post.profilePic}
                    canDelete={user?.email === post.userEmail}
                    onDelete={() => handleDeletePost(post.id)}
                    onEdit={() => handleEditPost(post)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              {user && (
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                  Log Out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}