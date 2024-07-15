// ReportReasons.jsx

import React from 'react';

const ReportReasons = ({ reportReasons }) => (
  <div>
    <h3>Report Reasons:</h3>
    <ul>
      {reportReasons.map((reason, index) => (
        <li key={index}>{reason}</li>
      ))}
    </ul>
  </div>
);

export default ReportReasons;
