import React from 'react'

const blog = () => {
  return (
    <div>blog</div>
  )
}

export default blog

/*import React, { useEffect, useState } from 'react';
import '../style.scss';

function Blog() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalReportedPosts, setTotalReportedPosts] = useState(0);
  const [reportedPosts, setReportedPosts] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:8800/admin')
      .then(response => response.json())
      .then(data => {
        setTotalPosts(data.total_posts);
        setTotalReportedPosts(data.reported_posts.length);
        setReportedPosts(data.reported_posts);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <p>Total Number of Posts: {totalPosts}</p>
      <p>Total Number of Reported Posts: {totalReportedPosts}</p>

      <h2>Reported Posts</h2>
      <ul>
        {reportedPosts.map(post => (
          <li key={post.id}>
            <strong>ID:</strong> {post.id}, <strong>Title:</strong> {post.title}, <strong>Description:</strong> {post.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;*/
