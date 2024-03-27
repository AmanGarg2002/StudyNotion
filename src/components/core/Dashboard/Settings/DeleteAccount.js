import React, { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/SettingsApi";
import ConfirmationModal from "../../../common/ConfirmationModal";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state) => state.auth);

  const handleDeleteAccount = async () => {
    try {
      await dispatch(deleteAccount(token, navigate));
    } catch (error) {
      console.log("DELETE ACCOUNT ERROR:", error);
    }
  };

  return (
    <div className="flex bg-pink-900 border-pink-700  gap-6  w-[85%]  mx-auto  pb-0 border rounded-lg ">
      <div className=" p-6 flex flex-row gap-8 justify-between">
        <div className=" p-[14px] rounded-full bg-pink-700 h-[52px] w-[52px]">
          <RiDeleteBin6Fill className=" text-pink-200 w-[24px] h-[24px] " />
        </div>

        <div className=" flex flex-col gap-2">
          <p className=" text-lg font-bold text-pink-5">Delete Account</p>
          <div className=" w-[80%] flex flex-col gap-[2px]">
            <p className=" text-pink-25 text-sm font-medium">
              Would you like to delete account?
            </p>
            <p className=" text-pink-25 text-sm font-medium">
              This account contains Paid Courses. Deleting your account will
              remove all the contain associated with it.
            </p>
          </div>
          <button
            className=" text-left text-pink-300 italic font-medium text-base"
            type="submit"
            onClick={() =>
              setConfirmationModal({
                text1: "Would you like to delete account ?",
                text2:
                  "Deleting your account will remove all the contain associated with it",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  handleDeleteAccount();
                  setConfirmationModal(null);
                },
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            I want to delete my account.
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default DeleteAccount;
