import React from 'react'
import "./userprofile.css";
import SideNavBar from '../../components/sidenav/SideNavbar';

const userDetails = [
  {
    name: "Aravind",
    block: "Block B",
    room: "B - 102",
    phone: "9909118099",
    email: "aravind198@gmail.com",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
  },
];

function UserProfile() {
  return (
    <div className="user-container">
        <SideNavBar />
        <div className="user-main-sec">
          <div className="profile-card">
            <div className="profile-left">
              <img
                src="https://randomuser.me/api/portraits/men/37.jpg"
                alt="User Avatar"
                className="avatar"
              />
              <div className="u-name-sec">
                <h2 className="i-name-head">{userDetails[0].name}</h2>
                <p>{userDetails[0].block}</p>
              </div>
            </div>
            <div className="profile-right">
              <h3 className="p-head">INFORMATION</h3>
              <hr className="line" />
              <div className="p-menu-item">
                <div className="p-menu-each-item">
                  <h4 className="p-m-head">Society Name</h4>
                  <p className="p-m-text">Example</p>
                </div>
                <div className="p-menu-each-item">
                  <h4 className="p-m-head">Name</h4>
                  <p className="p-m-text">Aravind</p>
                </div>
              </div>
              <div className="p-menu-item">
                <div className="p-menu-each-item">
                  <h4 className="p-m-head">Block</h4>
                  <p className="p-m-text">{userDetails[0].block}</p>
                </div>
                <div className="p-menu-each-item">
                  <h4 className="p-m-head">Flat No</h4>
                  <p className="p-m-text">{userDetails[0].room}</p>
                </div>
              </div>
              <div className="p-menu-item">
                <div className="p-menu-each-item">
                  <h4 className="p-m-head">Phone</h4>
                  <p className="p-m-text">{userDetails[0].phone}</p>
                </div>
                <div className="p-menu-each-item">
                  <h4 className="p-m-head">Email</h4>
                  <p className="p-m-text">{userDetails[0].email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserProfile
