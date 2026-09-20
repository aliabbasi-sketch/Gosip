import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore.js"
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import { MessageSquare, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";

function SignUpPage() {

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>

          <div className="w-full h-full flex flex-col md:flex-row">

            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 h-full p-10 flex flex-col items-center justify-center
                            md:border-r border-white/10
                            backdrop-blur-2xl bg-black/20">

              {/* HEADING */}
              <div className="text-center mb-10 w-full max-w-sm">
                <div className="w-14 h-14 mx-auto mb-5 rounded-xl border border-white/15
                                bg-white/5 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white/60" />
                </div>

                <h2 className="text-[25px] font-semibold text-white/90 tracking-tight mb-1">
                  Chat Archive
                </h2>
                <p className="text-white/40 text-[17px]">
                  Create your account to get started
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-sm">

                {/* FULL NAME */}
                <div className="space-y-1.5">
                  <label className="block text-[17px] text-white/50 tracking-wide">
                    Full Name
                  </label>
                  <div className="relative group">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                                        text-white/25 group-focus-within:text-white/55
                                        transition-colors duration-200" />
                    <input
                      type="text"
                      value={formData.fullname}
                      onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg
                                 bg-white/5 border border-white/10
                                 text-white/85 placeholder-white/20 text-[17px] 
                                 focus:outline-none focus:border-white/30 focus:bg-white/8
                                 hover:border-white/18
                                 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-1.5">
                  <label className="block text-[17px]  text-white/50 tracking-wide">
                    Email
                  </label>
                  <div className="relative group">
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                                        text-white/25 group-focus-within:text-white/55
                                        transition-colors duration-200" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="johndoe@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg
                                 bg-white/5 border border-white/10
                                 text-white/85 placeholder-white/20 text-[17px]
                                 focus:outline-none focus:border-white/30 focus:bg-white/8
                                 hover:border-white/18
                                 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-1.5">
                  <label className="block text-[17px] text-white/50 tracking-wide">
                    Password
                  </label>
                  <div className="relative group">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                                        text-white/25 group-focus-within:text-white/55
                                        transition-colors duration-200" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg
                                 bg-white/5 border border-white/10
                                 text-white/85 placeholder-white/20 text-[17px]
                                 focus:outline-none focus:border-white/30 focus:bg-white/8
                                 hover:border-white/18
                                 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isSigningUp}
                  className="w-full py-2.5 mt-1 rounded-lg
                             bg-white/10 border border-white/20
                             text-white/80 text-[17px] font-medium tracking-wide
                             hover:bg-white/15 hover:border-white/30 hover:text-white
                             active:scale-[0.99]
                             transition-all duration-200
                             disabled:opacity-40 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  {isSigningUp ? (
                    <LoaderIcon className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* FOOTER LINK */}
              <div className="mt-7 text-center w-full max-w-sm">
                <div className="h-px bg-white/8 mb-6" />
                <p className="text-[17px] text-white/30">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-white/55 hover:text-white/85 transition-colors duration-200 underline underline-offset-2"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - ILLUSTRATION */}
            <div className="hidden md:w-1/2 md:flex flex-col items-center justify-center p-10
                            bg-black/10 backdrop-blur-sm relative overflow-hidden">

              {/* Corner vignettes to ground it */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/30 pointer-events-none" />

              <img
                src="/signup.png"
                alt="Chat Archive illustration"
                className="w-full h-auto object-contain opacity-75 relative z-10"
              />

              <div className="mt-8 text-center relative z-10">
                <div className="h-px w-24 mx-auto bg-white/15 mb-6" />

                <h3 className="text-base font-medium text-white/55 tracking-wide mb-4">
                  Your conversations, preserved.
                </h3>

                <div className="flex justify-center gap-3">
                  {["Free", "Secure", "Private"].map((badge) => (
                    <span
                      key={badge}
                      className="px-3 py-1 text-[17px] border border-white/10
                                 text-white/30 rounded-md bg-white/5 tracking-wide"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;