import React from 'react';

export const GroundSuccess = ({ primary, secondary, actionText, actionClick }) => (
  <div className="alert alert-success new p-4">
    <strong>{primary}</strong>
    <p className="mb-0">{secondary} <a className="bold cursor" onClick={actionClick}>{actionText}</a></p>
  </div>
);
