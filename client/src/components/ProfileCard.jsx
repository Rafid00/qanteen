import React from "react";

const ProfileCard = ({ settingOn, setSettingOn, profileData }) => {
   return (
      <div className="card w-fit bg-base-100 shadow-xl">
         <div className="card-body flex flex-col justify-center items-center gap-5">
            <div className="avatar">
               <div className="w-24 rounded-full">
                  <img
                     src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?b=1&s=612x612&w=0&k=20&c=5QE_Qf5Vth9bCHcD5OpdZ1PoPhn36j3GtRVzaFAa22c="
                     alt="profile_picture"
                  />
               </div>
            </div>
            <div className="flex flex-col gap-3">
               <div className="flex flex-col items-center justify-center gap-3">
                  {profileData && <p className="font-medium text-xl capitalize">{profileData.name}</p>}
               </div>
               <div className="flex gap-3 justify-center">
                  <button className="badge badge-lg badge-outline text-zinc-800 rounded-md h-10 text-center text-xs w-16 px-9 overflow-hidden break-words">
                     Posts 5
                  </button>
                  <button className="badge badge-lg badge-outline text-zinc-800 rounded-md h-10 text-center text-xs w-16 px-9 overflow-hidden break-words">
                     Followers 25
                  </button>
                  <button className="badge badge-lg badge-outline text-zinc-800 rounded-md h-10 text-center text-xs w-16 px-9 overflow-hidden break-words">
                     Following 250
                  </button>
               </div>
               <div className="flex justify-center flex-col items-center mb-3">
                  <p className="font-medium">About</p>
                  <p className="text-sm w-64 text-center">{profileData?.biography ? profileData.biography : "No biography is set."}</p>
               </div>
               <div className="flex justify-center">
                  <button className="btn btn-outline btn-sm rounded-md w-full" onClick={() => setSettingOn(!settingOn)}>
                     Profile Settings
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileCard;
