import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Edit from '..//img/edit.png';
import Delete from '..//img/delete.png';
import Report from '..//img/info.png';
import Menu from '../components/Menu.jsx';
import moment from 'moment';
import { AuthContext } from '../context/authContext.js';
import { useReportContext } from '../context/ReportContext.js';

const Single = () => {
  const [posts, setPosts] = useState({});
  const [reportReason, setReportReason] = useState('');
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { isPostReported, addReportedPost } = useReportContext();

  const postId = location.pathname.split('/')[2];
  const reported = isPostReported(postId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId, currentUser]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/posts/${postId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  const handleReport = async () => {
    setReportModalVisible(true);
  };

  const submitReport = async () => {
    try {
      const res = await axios.post(`/posts/${postId}/report`, { reason: reportReason });
      addReportedPost(postId);
      setReportModalVisible(false);
      setReportReason('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='single'>
      {reported ? (
        <div>
          <p>This post has been reported and is disabled.</p>
        </div>
      ) : (
        <div className='content'>
          <img src={`../uploads/${posts?.img}`} alt="" />
          <div className='user'>
            {posts.userImg && <img src={posts.userImg} alt="" />}
          </div>
          <div className='info'>
            <span>{posts.username}</span>
            <p>Posted {moment(posts.date).fromNow()}</p>
            <p>Views: {posts.views}</p>
          </div>
          {currentUser?.username === posts.username && (
            <div className='edit'>
              <Link to={`/write?edit=2`} state={posts}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
          {currentUser && !reported && (
            <div className='edit'>
              <img onClick={handleReport} src={Report} alt="" />
            </div>
          )}
          <h1>{posts.title}</h1>
          {getText(posts.desc)}
        </div>
      )}

      <div className='menu'>
        <Menu cat={posts.cat} />
      </div>

      {reportModalVisible && (
        <div className="report-modal">
          <textarea
            placeholder='Enter the reason for reporting...'
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
          />
          <button onClick={submitReport}>Submit Report</button>
        </div>
      )}
    </div>
  );
};

export default Single;
