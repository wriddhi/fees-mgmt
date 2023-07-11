import React, { useEffect, useState } from "react";
import type { Student } from "@/types/db.types";
import Spinner from "./ui/spinner";
import {BsCashCoin} from "react-icons/bs";
import { LiaHistorySolid } from "react-icons/lia";
import PayFees from "./parent/PayFees";
import FeesHistory from "./parent/FeesHistory";


type MenuItemType = {
  title: String;
  icon: React.JSX.Element;
  view: (students: Student[]) => React.ReactNode;
};

const menuItems: MenuItemType[] = [
  {
    title: "Pay Fees",
    icon: <BsCashCoin className="text-2xl" />,
    view: (students: Student[]) => <PayFees students={students} />,
  },
  {
    title: "Fees History",
    icon: <LiaHistorySolid className="text-2xl" />,
    view: (students: Student[]) => <FeesHistory students={students} />,
  }
];


const ParentsDashboard = () => {

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeItem, setActiveItem] = useState<MenuItemType>(menuItems[0]);

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true);
      const res = await fetch("/api/children");
      const data: { message: string; error: boolean; children: Student[] } =
        await res.json();
      setStudents(data.children);
      setLoading(false);
    };

    getStudents();
  }, []);


  if(loading) return <Spinner size={100} />;

  return (
    <main className="bg-black w-full h-[35rem] overflow-auto my-10 flex justify-start items-start relative">
      <aside className="bg-white min-w-max max-w-max h-full flex-1 sticky top-0">
        <ul className="divide-y divide-slate-600">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveItem(item)}
              className={`text-black ${
                activeItem.title === item.title
                  ? "bg-black text-white"
                  : "text-black hover:bg-black/80 hover:text-white"
              } flex font-bold justify-start items-center gap-3 h-10 p-6 px-3
              cursor-pointer transition-all`}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </aside>
      <section className="overflow-auto w-full h-full flex flex-col justify-start items-start gap-2 text-white p-4">
        <h2 className="text-2xl font-cirka w-full border-solid border-b-2 py-2 border-white/5">
          {activeItem.title}
        </h2>
        {activeItem.view(students)}
      </section>
    </main>
  );
};

export default ParentsDashboard;
