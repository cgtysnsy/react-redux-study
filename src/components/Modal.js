import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { allmodals } from "../Allmodals";
import { closeModal } from "../stores/modalstore";

export default function Modal() {
  const { name, data } = useSelector((state) => state.modal);
  const modal = allmodals.find((m) => m.name === name);
  const dispatch = useDispatch();
  const close = () => {
    dispatch(closeModal());
  };
  return (
    <div className="modal">
      <div className="modal-inner">
        <modal.element close={close} data={data} />
      </div>
    </div>
  );
}
