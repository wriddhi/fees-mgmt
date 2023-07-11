import React, { useEffect, useState, useRef } from "react";
import type { FeesRecord, Student, FeesStructure } from "@/types/db.types";
import Spinner from "../ui/spinner";
import { HiOutlineSelector } from "react-icons/hi";

import { useReactToPrint } from "react-to-print";
import Pdf from "../invoice/pdf";

const FeesHistory = ({ students }: { students: Student[] }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [activeStudent, setActiveStudent] = useState<Student>(students[0]);

  const [fees, setFees] = useState<{
    structure: FeesStructure | null;
    records: FeesRecord[];
  }>({
    structure: null,
    records: [],
  });

  const pdfRef = useRef<React.ReactInstance>(null);
  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
    fonts: [
      {
        family: "Cirka",
        source: "../../../public/PPCirka-Bold.woff",
        weight: "400",
        style: "normal",
      },
    ],
  });

  const [printRecord, setPrintRecord] = useState<{
    student: Student;
    fees: FeesRecord;
    structure: FeesStructure;
  } | null>(null);

  useEffect(() => {
    const getFeesHistory = async () => {
      const fetchRecord = await fetch(
        `/api/history?student_id=${activeStudent?.student_id}`
      );
      const record: {
        error: boolean;
        message: string;
        history: FeesRecord[];
      } = await fetchRecord.json();

      const fetchStructure = await fetch(
        `/api/fees/?class=${activeStudent?.class}&stream=${activeStudent?.stream}`
      );
      const structure: {
        error: boolean;
        message: string;
        fees: FeesStructure | null;
      } = await fetchStructure.json();

      setLoading(false);

      console.log("Fees Structure: ", structure);
      console.log("Fees Record: ", record);

      setFees({
        structure: structure.fees,
        records: record.history,
      });
    };
    getFeesHistory();
  }, [activeStudent]);

  useEffect(() => {
    if (printRecord) {
      handlePrint();
    }
  }, [printRecord]);

  return (
    <main className="bg-black w-full h-full flex-1 overflow-auto flex flex-col justify-start items-start relative">
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
        <Spinner size={80} />
      ) : (
        fees.structure && (
          <div className="w-full overflow-x-auto my-10">
            <table className="table">
              {/* head */}
              <thead className="font-cirka font-bold text-white text-xl">
                <tr>
                  <th>S.No.</th>
                  <th>Transaction ID</th>
                  <th>Amount </th>
                  <th>Txn Date</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {fees.records?.map((record, index) => (
                  <tr key={record.transaction_id}>
                    <td>{index + 1}</td>
                    <td>{record.transaction_id}</td>
                    <td>{record.amount}</td>
                    <td>{record.payment_date}</td>
                    <td>
                      <button
                        onClick={() => {
                          if (fees.structure) {
                            setPrintRecord({
                              student: activeStudent,
                              fees: record,
                              structure: fees.structure,
                            });
                          }
                        }}
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
      <div className="hidden">
        {printRecord && <Pdf ref={pdfRef} {...printRecord} />}
      </div>
    </main>
  );
};

export default FeesHistory;
