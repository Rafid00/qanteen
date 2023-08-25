import React from "react";

const Login = () => {
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");
   const isLoggedIn = localStorage.getItem("loggedIn");

   if(isLoggedIn) {
      window.location.href = "/profile";
   }

   function handleSubmit(e) {
      e.preventDefault();
      console.log(email, password);
      fetch("http://localhost:5000/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email: email,
            password: password,
         }),
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.status === "ok") {
               localStorage.setItem("token", data.token);
               localStorage.setItem("loggedIn", true);
               window.location.href = "/";
            } else {
               alert(data.error);
            }
         });
   }

   return (
      <form className="h-[750px] flex justify-center items-start py-24" onSubmit={handleSubmit}>
         <div className="container sm:w-[400px] w-[80vw]">
            <div className="flex flex-col w-full border-opacity-50">
               <div className="grid h-16 rounded-box items-center">
                  <div className="form-control h-fit">
                     <label className="input-group">
                        <span className="w-[120px] justify-center text-sm">Email</span>
                        <input
                           type="email"
                           placeholder="info@site.com"
                           className="input input-bordered w-full"
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </label>
                  </div>
               </div>
               <div className="grid h-16 rounded-box items-center">
                  <div className="form-control h-fit">
                     <label className="input-group">
                        <span className="w-[120px] justify-center text-sm">Password</span>
                        <input
                           type="password"
                           placeholder="***********"
                           className="input input-bordered w-full"
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </label>
                  </div>
               </div>
               <div className="grid rounded-box items-center">
                  <div className="form-control h-fit">
                     <label className="label cursor-pointer justify-start gap-3">
                        <input type="checkbox" className="checkbox" />
                        <span className="label-text">Remember me</span>
                     </label>
                  </div>
               </div>
               <button className="btn my-3">SIGN IN</button>
               <div className="divider">OR</div>
               <div className="grid h-16 rounded-box mt-3">
                  <button className="btn btn-outline btn-warning">
                     <img className="w-[20px] mr-3" src="/images/google.png" alt="" />
                     Continue with google
                  </button>
               </div>
               <div className="grid h-16 rounded-box">
                  <button class="btn btn-outline btn-info">
                     <img className="w-[20px] mr-3" src="/images/twitter.png" alt="" />
                     Continue with twitter
                  </button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default Login;
