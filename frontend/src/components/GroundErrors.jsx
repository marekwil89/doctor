import React from 'react';

export const GroundErrors = ({ errors, custom }) => (
  <div className="alert alert-danger new p-4 w-100">
    {!custom ? errors.map((elem, index) => (
      <div key={index}>
        <strong>{elem.param} - {elem.msg}</strong>
      </div>
    )) : (
      <strong>{custom}</strong>
    )}
  </div>
);
