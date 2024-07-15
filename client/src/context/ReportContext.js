// ReportContext.js

import React, { createContext, useContext, useState } from 'react';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reportedPosts, setReportedPosts] = useState([]);

  const addReportedPost = (postId) => {
    setReportedPosts((prev) => [...prev, postId]);
  };

  const removeReportedPost = (postId) => {
    setReportedPosts((prev) => prev.filter((id) => id !== postId));
  };



  const isPostReported = (postId) => {
    return reportedPosts.includes(postId);
  };

  return (
    <ReportContext.Provider value={{ addReportedPost, removeReportedPost, isPostReported }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  return useContext(ReportContext);
};
