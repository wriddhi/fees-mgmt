import React, { useState } from "react";
import { Student } from "@/types/Student.types";
import data from "@/lib/data.json" assert { type: "json" };
import { PieChart } from "react-minimal-pie-chart";
import type { PieChartProps } from "react-minimal-pie-chart";
import { PiWarningDiamondBold } from "react-icons/pi";

const AdminDashboard = () => {
  const [filter, setFilter] = useState("all");
  const students: Student[] = data;
  const totalCollectable = students
    .map((student) => student.fees)
    .reduce((a, b) => a + b);
  const totalPaid = students
    .filter((student) => student.paid)
    .reduce((a, b) => a + b.fees, 0);
  const totalDue = students
    .filter((student) => !student.paid)
    .reduce((a, b) => a + b.fees, 0);
  const totalStudents = students.length;
  const totalPaidStudents = students.filter((student) => student.paid).length;
  const totalDueStudents = students.filter((student) => !student.paid).length;

  const classes = [...new Set(students.map((student) => student.class))];
  const sections = [...new Set(students.map((student) => student.section))];

  const pieChartData: PieChartProps["data"] = [
    {
      title: `Paid`,
      value: students.filter((student) => student.paid).length,
      color: "rgb(52, 211, 153)",
    },
    {
      title: `Due`,
      value: students.filter((student) => !student.paid).length,
      color: "rgb(248, 113, 113)",
    },
  ];

  return (
    <main className="w-full h-full my-auto text-white flex flex-col-reverse lg:flex-row justify-between items-center">
      <section className="flex flex-col justify-center items-center lg:grid lg:place-items-start lg:grid-cols-2 gap-2">
        {/* <select className="bg-black p-4 col-span-2 w-full outline-1 outline outline-slate-700">
          <option value="all">All</option>
          <option value="class">Class</option>
          <option value="class">Section</option>
        </select> */}
        <div className="bg-black p-10 col-span-2 w-full outline-1 outline outline-slate-700 h-full">
          <h2 className="font-cirka text-2xl text-blue-400">
            Total Collectable Fees {`(${totalStudents})`}
          </h2>
          <p className="font-mono bg-white/10 p-2 w-fit rounded-xl">
            {" "}
            &#8377; {totalCollectable}
          </p>
        </div>
        <div className="bg-black p-10 w-full outline-1 outline outline-slate-700 h-full">
          <h2 className="font-cirka text-2xl text-emerald-400">
            Total Received Fees {`(${totalPaidStudents})`}
          </h2>
          <p className="font-mono bg-white/10 p-2 w-fit rounded-xl">
            &#8377; {totalPaid}
          </p>
        </div>
        <div className="bg-black p-10 w-full outline-1 outline outline-slate-700 h-full">
          <h2 className="font-cirka text-2xl text-red-400">
            Total Due Fees {`(${totalDueStudents})`}
          </h2>
          <p className="font-mono bg-white/10 p-2 w-fit rounded-xl">
          &#8377; {totalDue}
          </p>
        </div>
      </section>
      <PieChart
        animate
        segmentsTabIndex={0}
        label={({ dataEntry }) => `${dataEntry.title} ${Math.round(dataEntry.percentage)} %`}
        totalValue={totalStudents}
        labelStyle={{
          fontFamily: "var(--font-cirka)",
          fontSize: "0.75rem",
          fontWeight: "bold",
        }}
        onMouseOver={(e, index) => {
          console.log(`Mouse over on index ${index}`);
        }}
        onFocus={(e, index) => {
          console.log(`Focused on index ${index}`);
        }}
        
        className="w-2/3 lg:w-1/4 mx-auto my-4"
        data={pieChartData}
      />
    </main>
  );
};

export default AdminDashboard;
