import React, { useState } from "react";
import API from "../api";

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (isRegister && !name.trim()) {
      return alert("Name is required");
    }

    if (!email.trim()) {
      return alert("Email is required");
    }

    if (!password.trim()) {
      return alert("Password is required");
    }

    try {
      if (isRegister) {
        await API.post("/api/auth/register", {
          name,
          email,
          password
        });

        alert("Registration successful! Please login now.");

        setIsRegister(false);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        const res = await API.post("/api/auth/login", {
          email,
          password
        });

        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);

      const message =
        err.response?.data?.message ||
        "Server request failed";

      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Team Task Manager
        </h1>

        <h2 className="text-xl font-semibold text-center mb-6">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border p-3 rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className={`w-full text-white py-3 rounded ${
            isRegister ? "bg-green-600" : "bg-blue-600"
          }`}
        >
          {isRegister ? "Sign Up" : "Login"}
        </button>

        <p className="text-center mt-5">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="w-full mt-2 text-blue-600 font-semibold"
        >
          {isRegister ? "Login Here" : "Sign Up Here"}
        </button>
      </div>
    </div>
  );
}

export default Login;