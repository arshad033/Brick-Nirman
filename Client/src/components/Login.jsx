import React, { useContext, useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { loginUser } from "../utils/HandleAPIs";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser,setIsLoginOpen,setForgotPasswordOpen,setIsRegisterOpen} = useContext(AppContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };
    loginUser(loginData,setUser,setIsLoginOpen); // Assuming setUser is defined in your context or state management
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl backdrop-blur-lg bg-blue-500/20 shadow-2xl border border-blue-500 z-30">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Sign In</h2>
        <p className="text-sm text-blue-300">Access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
            className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="relative">
          <Lock className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-2/4 right-3 transform -translate-y-1/2 text-blue-400"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={()=>
            {
              setForgotPasswordOpen(true)
              setIsLoginOpen(false)
            }
            } className="text-sm text-blue-400 hover:text-blue-300">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors"
        >
          Sign In
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-blue-300">
          Don't have an account?{" "}
          <button onClick={()=>{
            setIsLoginOpen(false)
            setIsRegisterOpen(true)
          }} className="text-blue-400 hover:text-blue-300">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
