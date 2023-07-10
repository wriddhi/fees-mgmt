import AccountsDashboard from "@/components/Accounts";
import AdminDashboard from "@/components/Admin";
import Button from "@/components/ui/Button";
import { useAuth } from "@/contexts/auth";
import { User } from "@/types/db.types";
import { log } from "console";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

const views = new Map<User["role"], JSX.Element>([
  ["admin", <AdminDashboard key={"admin"} />],
  ["accountant", <AccountsDashboard key={"accountant"} />],
  ["parent", <div key={"parent"}>Guardian</div>],
]);

const getFirstLetter = (name: string) : string => {
  let firstLetter = "";
  
  const words = name.split(" ");
  
  for (const word of words) {
    firstLetter += word[0];
  }

  return firstLetter;

}


const Dashboard = () => {
  const { user, loading, logout } = useAuth();

  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Not logged in</div>;

  return (
    <main className="flex flex-col p-10 justify-start items-center w-full h-full min-h-screen">
      <section className="flex w-full items-center justify-between">
        <h1 className="text-white font-bold text-2xl lg:text-3xl capitalize">
          {user.role?.toLowerCase() + "'s "}Dashboard
        </h1>
        {/* <button
          onClick={() => {
            logout();
          }}
          className="lg:ml-auto bg-white font-bold p-2 flex justify-center items-center gap-2"
        >
          <span className="hidden lg:flex">Sign Out</span>
          <FiExternalLink />
        </button> */}
        <Button
          title="Sign Out"
          theme="light"
          loading={btnLoading}
          onClick={() => logout()}
        />
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <div className="avatar placeholder">
              <div className="bg-black text-white outline outline-1 rounded-full w-12">
                <span>{getFirstLetter(user.name)}</span>
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-white border text-black w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </section>
      {user.role && views.get(user.role)}
    </main>
  );
};

export default Dashboard;
