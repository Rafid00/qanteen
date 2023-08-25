import React from "react";
import { useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import PostManagement from "../components/PostManagement";
import SettingsProfile from "../components/SettingsProfile";

const Profile = () => {
   const [settingOn, setSettingOn] = React.useState(false);
   const [profileData, setProfileData] = React.useState();
   const isLoggedIn = localStorage.getItem("loggedIn");

   if (!isLoggedIn) {
      window.location.href = "/login";
   }

   useEffect(() => {
      fetch("http://localhost:5000/profile", {
         method: "POST",
         crossDomain: true,
         headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify({
            token: window.localStorage.getItem("token"),
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            setProfileData(data.user);
         });
   }, []);

   return (
      <div className="px-4 py-16 md:px-24 gap-10 flex flex-col lg:flex-row justify-center items-center lg:items-start">
         <ProfileCard settingOn={settingOn} setSettingOn={setSettingOn} profileData = {profileData}/>
         <SettingsProfile settingOn={settingOn}  profileData = {profileData}/>
         <PostManagement />
      </div>
   );
};

export default Profile;
