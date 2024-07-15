// Admin.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Unreport from '..//img/unreport.jpeg';
import { AuthContext } from '../context/authContext.js';
import { useReportContext } from '../context/ReportContext.js';

const Admin = () => {
  // State variables
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { removeReportedPost } = useReportContext();

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const res = await axios.get(`/posts${cat}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch data on component mount and whenever cat or currentUser changes
  useEffect(() => {
    fetchData();
  }, [cat, currentUser]);

  // Function to handle unreporting a post
  const handleUnreport = async (postId) => {
    try {
      const res = await axios.post(`/posts/unreportBlog/${postId}`);
      removeReportedPost(postId); // Remove the reported post from the global state
    } catch (err) {
      console.log(err);
    }
  };

  // Function to render a truncated version of the post content
  const getText = (html, maxLines = 4) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const lines = doc.body.textContent.split('\n');
    const truncatedContent = lines.slice(0, maxLines).join('\n');
    return truncatedContent;
  };

  // Function to filter reported posts
  const getReportedPosts = () => {
    if (Array.isArray(posts)) {
      return posts.filter((post) => post.reported);
    } else {
      return [];
    }
  };

  return (
    <div className='admin-page'>
      <div className='posts'>
        <center>
          <h1>ADMIN DASHBOARD</h1>
        </center>
        {getReportedPosts().map((post) => (
          <div className='post' key={post.id}>
            <div className='img'>
            <img
            src={`./uploads/${post.img}`}
             alt=''
             style={{ width: '50%', height: 'auto', borderRadius: '8px' }}
            />

            </div>
            <div className='content'>
              <h1>{post.title}</h1>
              <p>{getText(post.desc)}</p>
              <p><strong>Report Reason:</strong> {post.reportReason || 'No reason provided'}</p>
              <div className='edit'>
                {currentUser?.isAdmin && (
                  <>
                    <img onClick={() => handleUnreport(post.id)} src={Unreport} alt="" />
                    {/* Add additional buttons or functionality as needed */}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
