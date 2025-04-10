import React, { useState } from "react";
import { Phone, ShieldCheck, Lock } from "lucide-react";
import { sendOTP, updateUserProfile, verifyOTP } from "../utils/HandleAPIs";

function ForgotPassword() {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    const result = await sendOTP(number);
  
    if (result.success) {
      setStep(2);
      setTimeout(() => {
        setOtp(result.data);
      }, 2000);
    } else {
      setError("Failed to send OTP. Enter registered number!");
    }
  };
  
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    const success = await verifyOTP(number, otp);
    if (success) {
      setStep(3);
    } else {
      setError("Invalid OTP. Please try again.");
      setStep(1);
      setOtp("");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
  
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const updatedData = {
      password : newPassword,
      phone : number
    }
    updateUserProfile(updatedData)
    // TODO: Call your backend API to reset the password
    console.log("Password changed for:", number, newPassword);
    alert("Password successfully reset!");
  
    // 🔒 Close modal here
    if (typeof window !== "undefined") {
      // Close modal/pop-up logic (depends on your modal implementation)
      document.getElementById("modal-close-btn")?.click(); // Example
    }
  };
  

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-2xl backdrop-blur-lg bg-blue-500/20 shadow-2xl border border-blue-500 z-30">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Forgot Password</h2>
        <p className="text-sm text-blue-300">
          {step === 3
            ? "Set your new password"
            : "Recover access using your mobile"}
        </p>
      </div>

      {error && (
        <p className="text-center text-red-400 text-sm mb-4">{error}</p>
      )}

      {step === 1 && (
        <form onSubmit={handleSendOtp} className="space-y-6">
          <div className="relative">
            <Phone className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
            <input
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Mobile Number"
              required
              className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="relative">
            <ShieldCheck className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Verify OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordReset} className="space-y-6">
          <div className="relative">
            <Lock className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
              className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-2/4 left-3 transform -translate-y-1/2 text-blue-400" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="w-full pl-10 py-2 bg-blue-500/10 rounded-xl border border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 rounded-xl text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Set New Password
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
