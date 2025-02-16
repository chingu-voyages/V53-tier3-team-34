"use client";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const referer = document.referrer;

    if (referer?.includes("/create")) {
      return signIn("google", { callbackUrl: "/events/create" });
    }
    return signIn("google", { callbackUrl: "/" });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);
      if (res?.status !== 200) {
        return alert("Invalid credentials. Please try again.");
      }

      const referer = document.referrer;

      if (referer?.includes("/events/create")) {
        return router.push(referer);
      }
      return router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error("Unexpected error:", error);
      alert("Something went wrong! Please try again.");
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
      </video>

      <div className="relative z-10 p-4 lg:p-20 flex flex-col gap-5 items-center justify-center h-full text-white">
        <h2 className="h-20 text-white text-5xl font-bold font-['Mona Sans'] leading-loose">
          Log In
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-5 items-center"
        >
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="p-3 text-white bg-white bg-opacity-25 backdrop-blur-xl text-xl outline-none flex items-center h-[80px] w-full md:min-w-[600px]"
          >
            <Image
              src="/assets/images/google.svg"
              alt="Google logo"
              width={25}
              height={25}
            />
            <p className="m-auto">Sign in with Google</p>
          </button>
          <div className="flex gap-2 items-center w-full">
            <span className="h-[px] border border-white w-full" />
            <p>Or</p>
            <span className="h-[1px] border border-white w-full" />
          </div>
          <input
            name="email"
            className="p-3 text-white bg-white bg-opacity-25 backdrop-blur-xl text-xl outline-none h-[80px] w-full md:min-w-[600px]"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              name="password"
              className="p-3 text-white bg-white bg-opacity-25 backdrop-blur-xl text-xl outline-none h-[80px] w-full md:min-w-[600px] pr-12"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
            >
              {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>
          <button
            type="submit"
            className="w-fit h-16 px-6 py-2 bg-[#084be7]/40 text-center text-white text-base font-medium font-['Mona Sans'] leading-normal"
            disabled={isLoading}
          >
            {isLoading ? (
              <Image
                src="/assets/images/spinner.svg"
                width={40}
                height={40}
                alt="Loading"
              />
            ) : (
              "LogIn"
            )}
          </button>
        </form>
        <p className="text-xl text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#084be7]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
