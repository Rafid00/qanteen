import React from "react";

const EditProfile = ({ settingOn, profileData}) => {
   return (
      <div className={`bg-base-100 md:shadow-xl w-full transition-all ${settingOn? "md:card grid" : "hidden"}`}>
         <div className="card-body grid min-w-[300px] max-w-[450px] mx-auto">
            <div className=" mb-5 mt-2 font-medium divider text-zinc-800">Profile Settings</div>
            <div className="form-control h-fit w-full">
               <label className="input-group">
                  <span className="w-[120px] justify-center text-sm">Name</span>
                  <input type="text" value={profileData?.name} className="input input-bordered w-full" />
               </label>
            </div>
            <div className="form-control h-fit w-full">
               <label className="input-group">
                  <span className="w-[120px] justify-center text-sm">Email</span>
                  <input type="email" value={profileData?.email} className="input input-bordered w-full" />
               </label>
            </div>
            <div className="form-control h-fit w-full">
               <label className="input-group">
                  <span className="w-[120px] justify-center text-sm">Bio</span>
                  <textarea
                     type="text"
                     value={profileData?.biography ? profileData.biography : "No biography is set."}
                     className="input input-bordered w-full h-32 min-h-[7rem] py-3"
                  />
               </label>
            </div>
            <div className="divider text-sm text-zinc-500">Change Password</div>

            <div className="form-control h-fit w-full">
               <label className="input-group">
                  <span className="w-[120px] justify-center text-sm text-center leading-4">Current Password</span>
                  <input type="password" placeholder="Current Password" className="input input-bordered w-full" />
               </label>
            </div>
            <div className="form-control h-fit w-full">
               <label className="input-group">
                  <span className="w-[120px] justify-center text-sm text-center leading-4">New Password</span>
                  <input type="password" placeholder="New Password" className="input input-bordered w-full" />
               </label>
            </div>
            <div className="divider text-sm text-zinc-500">Verification</div>
            <div className="form-control h-fit w-full">
               <label className="input-group rounded-full" style={{ outline: "2px solid hsla(var(--bc) / 0.2)", outlineOffset: "2px" }}>
                  <span className="w-[120px] justify-center text-sm text-center leading-4">Confirm Password</span>
                  <input type="password" placeholder="Confirm Password" className="input input-bordered w-full" />
               </label>
               <label className="label">
                  <span className="label-text-alt invisible">Bottom Left label</span>
                  <span className="label-text-alt text-zinc-500">Insert the password for updating info</span>
               </label>
            </div>
            <button className="btn btn-success my-2">Update settings</button>
         </div>
      </div>
   );
};

export default EditProfile;
