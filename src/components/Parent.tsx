import React, { useEffect, useState } from "react";
import type { FeesStructure, Student } from "@/types/db.types";
import Spinner from "./ui/spinner";
import { HiOutlineSelector } from "react-icons/hi";

const getDiscountedFees = (fees: number, discount: number): number => {
  const discountPercentage = discount / 100;
  const discountedAmount = fees * (1 - discountPercentage);
  const discountedFees = Number(discountedAmount.toFixed(2));
  return discountedFees;
};

const getTotalFees = (fees: number[]): number => {
  const totalFees = fees.reduce((accumulator, fee) => accumulator + fee, 0);
  return Number(totalFees.toFixed(2));
};

const ParentsDashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeStudent, setActiveStudent] = useState<Student | null>(null);
  const [activeStudentFees, setActiveStudentFees] =
    useState<FeesStructure | null>(null);

  const totalFees = getTotalFees([
    activeStudentFees?.late ?? 0.0,
    activeStudentFees?.tuition ?? 0.0,
    activeStudentFees?.library ?? 0.0,
  ]);

  const discountedFees = getDiscountedFees(
    totalFees,
    activeStudent?.scholarship ?? 0.0
  );

  useEffect(() => {
    const getFeesData = async () => {
      const res = await fetch(
        `/api/fees/?class=${activeStudent?.class}&stream=${activeStudent?.stream}`
      );
      const data: {
        error: boolean;
        message: string;
        fees: FeesStructure | null;
      } = await res.json();
      setActiveStudentFees(data.fees);
    };
    if (activeStudent) {
      getFeesData();
    }
  }, [activeStudent]);

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true);
      const res = await fetch("/api/children");
      const data: { message: string; error: boolean; children: Student[] } =
        await res.json();
      setStudents(data.children);
      setActiveStudent(data.children[0]);
      setLoading(false);
    };

    getStudents();
  }, []);

  return (
    <main className="bg-black w-full h-full flex-1 p-10 overflow-auto my-10 flex flex-col justify-start items-start relative">
      <div className="dropdown dropdown-bottom">
        <span className="absolute right-0 translate-x-36 font-bold text-2xl font-cirka">
          {activeStudent?.name}
        </span>
        <label
          tabIndex={0}
          className="bg-white cursor-pointer p-2 text-black font-bold m-1 w-32"
        >
          Select Student <HiOutlineSelector className="inline-block ml-2" />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-sm w-52"
        >
          {students.map((student) => (
            <li
              onClick={() => setActiveStudent(student)}
              key={student.student_id}
              className="text-black hover:bg-black hover:text-white cursor-pointer"
            >
              <span className="font-bold">{student.name}</span>
            </li>
          ))}
        </ul>
      </div>
      {loading ? (
        <div className="w-full grid place-items-center">
          <Spinner size={100} />
        </div>
      ) : (
        <div className="w-full overflow-x-auto my-10">
          <table className="table">
            {/* head */}
            <thead className="font-cirka font-bold text-white text-2xl">
              <tr>
                <th>S.No.</th>
                <th>Fees Name</th>
                <th>Fees Amount</th>
              </tr>
            </thead>
            <tbody className="text-lg text-white">
              <tr>
                <th>1.</th>
                <td>Tuition Fees</td>
                <td className="font-mono">
                  &#8377; {activeStudentFees?.tuition}
                </td>
              </tr>
              <tr>
                <th>2.</th>
                <td>Library Fees</td>
                <td className="font-mono">
                  &#8377; {activeStudentFees?.library}
                </td>
              </tr>
              <tr>
                <th>3.</th>
                <td>Late Fine</td>
                <td className="font-mono">&#8377; {activeStudentFees?.late}</td>
              </tr>
              <tr>
                <th>4.</th>
                <td>Total Basic Fees</td>
                <td className="font-mono">&#8377; {totalFees}</td>
              </tr>
              <tr>
                <th>5.</th>
                <td>Scholarship</td>
                <td className="font-mono">
                  &#8377; {totalFees * ((activeStudent?.scholarship ?? 0) / 100)}
                </td>
              </tr>
              <tr>
                <th>6.</th>
                <td>Total Payable Fees</td>
                <td className="font-mono">&#8377; {discountedFees}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default ParentsDashboard;
