import React from 'react';
import { useState, useEffect } from "react";
import './AdminDashboard.scss';


export default function AdminDashboard() {

  const logout = () => {
      localStorage.clear();
      window.location.href = "/";
  };

  return(
    <div className="dashboard">
      <button onClick={logout}>Logout</button>
      <h1>Welcome to Admin Page </h1>
    </div>
  );
}