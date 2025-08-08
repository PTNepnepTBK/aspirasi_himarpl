import React from "react";
import ReactDOM from "react-dom";

const DeleteConfirmationDialog = ({ show, message, onCancel, onConfirm }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1050]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">Hapus Data</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteConfirmationDialog;