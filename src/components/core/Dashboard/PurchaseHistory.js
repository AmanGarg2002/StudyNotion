import React, { useEffect, useState } from "react";
import { getInvoicesOfUser } from "../../../services/operations/profileApi";
import { useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import { formatDate } from "../../../services/formatDate";
import { IoCopyOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const PurchaseHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const InvoiceDeatilsOfUser = async () => {
      setLoading(true);
      try {
        const response = await getInvoicesOfUser(token);

        if (response) {
          console.log("INVOICE RESPONSE:", response);
          setInvoiceData(response);
        } else {
          throw new Error("Unable to get purchase histor");
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    InvoiceDeatilsOfUser();
    // eslint-disable-next-line 
  }, []);

  const copyHandler = (data) => {
    console.log(data);
    const values = {
      orderId: data?._id,
      paymentId: data?.paymentId,
    };
    const valuesToCopied = Object.values(values).join("\n");
    copy(valuesToCopied);

    toast.success("Copied");
  };

  return (
    <div className=" relative flex flex-col text-richblack-5 gap-8 min-h-[calc(100vh-3.5rem)]">
      <h1 className=" text-3xl font-medium ">Purchase History</h1>

      {loading ? (
        <div className=" spinner absolute left-[45%] top-[35%]"></div>
      ) : (
        <>
          {invoiceData.length === 0 ? (
            <p className=" text-center text-3xl text-richblack-100  border-b border-richblack-400  pb-2">
              No Course Purchased Yet
            </p>
          ) : (
            <div className="flex flex-col gap-2 w-full truncate justify-between mx-auto p-4 md:p-6 border rounded-lg border-richblack-700 bg-richblack-800">
              {invoiceData.map((data, index, arr) => (
                <div
                  key={index}
                  className={`flex flex-row w-full   md:items-center  justify-between ${
                    arr.length - 1 === index
                      ? " border-none"
                      : "border-b border-richblack-400 mb-1 "
                  }`}
                >
                  <div className=" flex md:items-center p-2  gap-7 ">
                    <div className=" text-lg">{index + 1}.</div>
                    <div className=" flex flex-col gap-y-2 pb-2 justify-start">
                      <div className=" flex flex-col md:flex-row gap-2 md:items-center">
                        <p className="text-lg text-richblack-200  ">
                          Amount Paid:
                        </p>
                        <p className=" text-base text-caribbeangreen-100">
                          Rs. {data?.amount / 100}
                        </p>
                      </div>
                      <div className=" flex flex-col md:flex-row gap-2 md:items-center">
                        <p className="text-lg text-richblack-200  ">ID:</p>
                        <p className=" text-base text-caribbeangreen-100">
                          {data?._id}
                        </p>
                      </div>
                      <div className=" flex flex-col md:flex-row gap-2 md:items-center">
                        <p className="text-lg text-richblack-200  ">
                          Transaction ID:
                        </p>
                        <p className=" text-base text-caribbeangreen-100">
                          {data?.paymentId}
                        </p>
                      </div>
                      <div className=" flex flex-col md:flex-row md:items-center gap-2">
                        <p className="text-lg text-richblack-200  ">
                          Transaction Date:
                        </p>
                        <p className=" text-base text-caribbeangreen-100">
                          {formatDate(data?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className=" cursor-pointer flex justify-center md:items-center"
                    onClick={() => copyHandler(data)}
                  >
                    <IoCopyOutline className=" text-xl text-richblack-200" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PurchaseHistory;
