import React from "react";
import { useAuth } from "../App";
import defaultAvatar from "../assets/avatar.jpeg"; // Import default avatar
import editIcon from "../assets/edit.png"; // Import edit icon
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-container">
      {/* Profile Picture Positioned Separately */}
      <div className="profile-header">
        <div className="profile-image-container">
        <img
            src={user.profilePicture || defaultAvatar}
            alt="Profile"
            className="profile-pic-large"
            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultAvatar;
                            }}
        />
        </div>

        {/* Personal Info Box */}
        <div className="profile-info-box">
          <div className="profile-title">
            <h2>PERSONAL INFORMATION</h2>
            <img src={editIcon} alt="Edit" className="edit-icon" />
          </div>
          <hr className="sections-divider" />
          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Phone:</strong> 9843369050</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      </div>

      {/* Shipping Address Section */}
      <div className="address-box">
        <h2 className="address-title">
          SHIPPING ADDRESS
          <img src={editIcon} alt="Edit" className="edit-icon" />
        </h2>
        <hr className="sections-divider" />
        <div className="address-details">
        <ul className="address-list">
          <li>📍 Sorhakhutte, Kathmandu</li>
          <li>Kathmandu Metro 16 - Nayabazar Area</li>
          <li>Bagmati Province</li>
          <li>Kathmandu Peace Guest House, Last House</li>
        </ul>
        </div>
      </div>

      {/* Order History Section */}
      <div className="order-history-box">
        <h2 className="order-title">
          ORDER HISTORY
          <img src={editIcon} alt="Edit" className="edit-icon" />
        </h2>
        <hr className="sections-divider" />
        <div className="order-group">
          <div className="order-date">Fri - Feb 21, 2025</div>
          <div className="order-items">
            <div className="order-item"></div>
            <div className="order-item"></div>
          </div>
        </div>
        <div className="order-group">
          <div className="order-date">Fri - Feb 21, 2024</div>
          <div className="order-items">
            <div className="order-item"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
