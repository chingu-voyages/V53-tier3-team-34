"use client";
import { RegisterUser } from "@/actions/registerUser";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async () => {
  //   const res = await RegisterUser({
  //     email,
  //     password,
  //   });

  //   if (res.status !== 201) {
  //     return alert("Error creating user");
  //   }

  //   // const referer = (await headers()).get("referer");

  //   // if (referer?.includes("/create")) {
  //   //   return router.push(referer);
  //   // }
  //   // return router.push("/");
  // };

  const handleGoogleSignIn = async () => {
    signIn("google", { callbackUrl: "/events/create" });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await RegisterUser({ email, password });

      if (res.status === 201) {
        alert("User created successfully");
        return;
      }

      console.error("Server error:", res);
      alert(res.message || "Error creating user");
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
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
        <h2 className="font-semibold text-3xl">Register</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-5 w-[732px]"
        >
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="p-3 text-white bg-white bg-opacity-25 backdrop-blur-xl text-xl outline-none flex items-center h-[80px]"
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
            <span className="h-[px] border border-white w-full" />
            <p>Or</p>
            <span className="h-[1px] border border-white w-full" />
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
            type="submit"
            className="p-4 bg-[#084be7] text-white self-center"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        {/* <Link href="/api/auth/signin">Login</Link> */}
        <Link className="text-xl" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
