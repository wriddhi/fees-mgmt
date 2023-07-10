import { useAuth } from "@/contexts/auth";
import { User } from "@/types/db.types";
import React, { useState } from "react";

const Login = () => {
  const { user, login } = useAuth();

  const [role, setRole] = useState<User["role"] | "">("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id || !password || !role) return alert("Please fill all the fields");

    const response = await login(id, password, role);

    if (response.success) {
      alert(response.message);
    } else {
      alert(response.message);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center text-white p-10 min-h-screen w-full gap-10">
      <h1 className="font-bold text-5xl font-cirka">Login</h1>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center items-center gap-5 bg-black p-20 w-5/6 lg:w-1/3"
      >
        <select
          defaultValue={""}
          required
          className="p-2 w-full bg-black border border-slate-400 border-solid"
          onChange={(e) => {
            setRole(e.target.value as User["role"]);
          }}
        >
          <option
            className="disabled:hover:bg-red-500"
            disabled
            defaultChecked
            value={""}
          >
            Select User Role
          </option>
          <option value="parent">Parent</option>
          <option value="accountant">Accountant</option>
          <option value="admin">Admin</option>
        </select>
        <input
          required
          className="p-2 w-full bg-black border border-slate-400 border-solid"
          type="text"
          placeholder="ID"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          required
          autoComplete="current-password"
          className="p-2 w-full bg-black border border-slate-400 border-solid"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="backlight p-2 w-full" type="submit">
          Login
        </button>
      </form>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </main>
  );
};

export default Login;
