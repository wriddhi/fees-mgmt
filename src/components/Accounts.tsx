import React, { useState } from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiTable } from "react-icons/pi";
import { AiOutlinePieChart } from "react-icons/ai";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { LiaHistorySolid } from "react-icons/lia";

type MenuItemType = {
  title: String;
  icon: React.JSX.Element;
  view: React.ReactNode;
};

const menuItems: MenuItemType[] = [
  {
    title: "Overview",
    icon: <AiOutlinePieChart className="text-2xl" />,
    view: <div>Overview</div>,
  },
  {
    title: "Fees Payment",
    icon: <RiSecurePaymentLine className="text-2xl" />,
    view: <div>Fees Payment</div>,
  },
  {
    title: "Approve Payment",
    icon: <HiOutlineBadgeCheck className="text-2xl" />,
    view: <div>Approve Payment</div>,
  },
  {
    title: "Payment History",
    icon: <LiaHistorySolid className="text-2xl" />,
    view: <div>Payment History</div>,
  },
  {
    title: "Payment Record",
    icon: <PiTable className="text-2xl" />,
    view: <div>Payment History</div>,
  },
];

const AccountsDashboard = () => {
  const [activeItem, setActiveItem] = useState<MenuItemType>(menuItems[0]);

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
        {activeItem.view}
      </section>
    </main>
  );
};

export default AccountsDashboard;
