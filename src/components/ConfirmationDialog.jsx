import React from "react";

const ConfirmationDialog = ({ show, message, onCancel, onConfirm }) => (
  <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${show ? "block" : "hidden"}`}>
    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div className="text-center">
        <div className="text-yellow-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Konfirmasi Perubahan</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#10316B] text-white rounded-lg hover:bg-[#0d2654] transition duration-300"
          >
            Ya, Ubah
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ConfirmationDialog; 