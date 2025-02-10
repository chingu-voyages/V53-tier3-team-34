"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000/events/create" });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid credentials. Please try again.");
      setIsLoading(false);
    } else {
      window.location.href = "/events/create"; // Redirect after login
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/images/signupBackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 p-20 flex flex-col gap-5 items-center h-full text-white">
        <h2 className="font-semibold text-3xl">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-5 w-[732px]"
        >
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="p-3 h-[80px] text-white bg-white bg-opacity-25 backdrop-blur-xl text-xl outline-none flex items-center"
          >
            <Image
              src="/assets/images/google.svg"
              alt="Google logo"
              width={25}
              height={25}
            />
            <p className="m-auto">Sign in with google</p>
          </button>
          <div className="flex gap-2 items-center">
            <span className="border border-white w-full" />
            <p>Or</p>
            <span className="border border-white w-full" />
          </div>
          <input
            name="email"
            className="p-3 text-white bg-white bg-opacity-25 backdrop-blur-xl text-xl outline-none h-[80px]"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col gap-4">
            <input
              name="password"
              className="p-3 text-white bg-white bg-opacity-25 backdrop-blur-xl text-xl outline-none h-[80px]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"} password
            </button>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="p-4 bg-[#084be7] text-white self-center"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        {/* <Link href="/api/auth/signin">Login</Link> */}
        <Link className="text-xl" href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
