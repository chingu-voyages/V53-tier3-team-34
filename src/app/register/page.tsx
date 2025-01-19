"use client";
import { headers } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterUser } from "./action";

const Register = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await RegisterUser({
      email,
      password,
    });

    if (res.status !== 201) {
      return alert("Error creating user");
    }

    const referer = (await headers()).get("referer");

    if (referer?.includes("/create")) {
      return router.push(referer);
    }
    return router.push("/");
  };

  return (
    <div className="p-24 flex flex-col gap-8 items-center">
      <h2 className="font-semibold text-3xl">Register</h2>
      <div className="flex flex-col gap-4">
        <input
          name="email"
          className="p-1 rounded-md text-slate-900"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col gap-4">
          <input
            name="password"
            className="p-1 rounded-md text-slate-900"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"} password
          </button>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="p-2 rounded-md bg-primary text-white"
        >
          Register
        </button>
      </div>
      <Link href="/api/auth/signin">Login</Link>
    </div>
  );
};

export default Register;
