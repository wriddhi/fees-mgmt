import { FeesRecord, Student, FeesStructure } from "@/types/db.types";
import React, { forwardRef } from "react";

function numberToWordsIndianSystem(number: number) {
  const units = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const getWords = (num: number) => {
    let words = "";
    if (num >= 100) {
      words += units[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }
    if (num >= 20) {
      words += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }
    if (num > 10 && num < 20) {
      words += teens[num % 10] + " ";
      num = 0;
    }
    if (num > 0) {
      words += units[num] + " ";
    }
    return words;
  };

  if (number === 0) {
    return "Zero";
  }

  let words = "";
  if (number >= 1e7) {
    words += getWords(Math.floor(number / 1e7)) + "Crore ";
    number %= 1e7;
  }
  if (number >= 1e5) {
    words += getWords(Math.floor(number / 1e5)) + "Lakh ";
    number %= 1e5;
  }
  if (number >= 1e3) {
    words += getWords(Math.floor(number / 1e3)) + "Thousand ";
    number %= 1e3;
  }
  if (number > 0) {
    words += getWords(number);
  }

  return words.trim() + " Only";
}

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

type Props = {
  student: Student;
  fees: FeesRecord;
  structure: FeesStructure | null;
};

const Pdf = forwardRef((props: Props, ref: any) => {
  console.log(props);
  if (!props.fees) return null;
  if (!props.student) return null;
  if (!ref) return null;
  if (!props.structure) return null;

  const student = {
    Student_Name: props.student.name,
    Student_ID: props.student.student_id,
    Class: props.student.class,
    Stream: props.student.stream,
    Transaction_ID: props.fees.transaction_id,
    Transaction_Date: props.fees.payment_date,
    Receipt_ID: `REC-${
      props.student.student_id
    }-${new Date().getDay()}${new Date().getMonth()}${new Date().getFullYear()}`,
    Receipt_Date: new Date().toLocaleDateString("en-US", {
      timeZone: "Asia/Kolkata",
    }),
    Status: props.fees.status,
  };

  const fees = {
    Tuition: getDiscountedFees(
      props.structure.tuition,
      props.student.scholarship
    ),
    Library: props.structure.library,
    Late: props.structure.late,
  };

  const total = getTotalFees([
    getDiscountedFees(props.structure.tuition, props.student.scholarship),
    props.structure.library,
    props.structure.late,
  ]);

  return (
    <main
      className="w-full h-full flex flex-col justify-center items-center bg-white outline p-10"
      ref={ref}
    >
      <header className="w-full flex justify-between items-center py-10 border-b-4 border-solid border-black">
        <h1 className="font-bold text-3xl font-cirka">INVOICE</h1>
        <span className="text-lg italic font-semibold">ABC School</span>
      </header>
      <section className="grid grid-cols-2 mr-auto justify-start items-center gap-1 my-5">
        <strong>Date</strong>
        <span>
          {new Date().toLocaleDateString("en-US", {
            timeZone: "Asia/Kolkata",
          })}
        </span>
        <strong>Time</strong>
        <span>
          {new Date().toLocaleTimeString("en-US", {
            hour12: false,
            timeZone: "Asia/Kolkata",
          })}
        </span>
      </section>
      <section className="w-full border-2 border-solid border-spacing-0 border-black">
        <div className="w-full p-3 grid grid-cols-4 gap-2 justify-start items-center">
          {Object.entries(student).map(([key, value]) => (
            <span
              className="col-span-2 w-full grid grid-cols-2 flex-1"
              key={key}
            >
              <strong className="w-full flex-1">
                {key.split("_").join(" ")}
              </strong>
              <span className="w-full flex-1">{value}</span>
            </span>
          ))}
        </div>
        <table className="w-full border-y border-solid border-black">
          <thead className="w-full border-y-2 border-solid border-black bg-black text-white">
            <tr className="text-left font-bold divide-x-2 divide-white">
              <th className="p-2">Particulars</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody className="w-full border-y-2 border-solid border-black">
            {Object.entries(fees).map(([key, value], index) => (
              <tr className="w-full divide-x-2 divide-black" key={index}>
                <td className="capitalize p-2 font-semibold">{key}</td>
                <td className="p-2 font-semibold">{value ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="w-full border-y-2 border-solid border-black font-bold">
            <tr className="w-full divide-x-2 divide-black">
              <td className="p-2">Total</td>
              <td className="p-2">{total}</td>
            </tr>
          </tfoot>
        </table>
        <div className="w-full flex justify-start items-center gap-3 p-3">
          <strong>Amount in words:</strong>
          <span>{numberToWordsIndianSystem(total)}</span>
        </div>
      </section>
      <section className="w-full flex flex-col justify-start items-start mt-5">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <div className="grid grid-cols-2 border-2 border-black border-solid w-1/2">
          <strong className="p-3">Payment Mode : </strong>
          <span className="p-3 capitalize">{props.fees.mode}</span>
          {(props.fees.mode === "cheque" || props.fees.mode == "draft") && (
            <>
              <strong className="p-3 capitalize">{props.fees.mode} No. </strong>
              <span className="p-3">
                {props.fees.mode == "cheque"
                  ? props.fees.cheque_number
                  : props.fees.draft_number}
              </span>
              <strong className="p-3">Bank</strong>
              <span className="p-3">{props.fees.bank_name}</span>
            </>
          )}
        </div>
      </section>
      <section className="mt-10">
        <strong>Note : </strong>
        <span className="underline">
          This is a computer generated invoice and hence no signature is
          required.
        </span>
      </section>
    </main>
  );
});

export default Pdf;
