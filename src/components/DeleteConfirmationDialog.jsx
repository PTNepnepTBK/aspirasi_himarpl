import React from "react";

const DeleteConfirmationDialog = ({ show, message, onCancel, onConfirm }) => (
  <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${show ? "block" : "hidden"}`}>
    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border-2 border-red-400 shadow-2xl">
      <div className="text-center">
        <div className="text-red-500 text-5xl mb-4">🗑️</div>
        <h3 className="text-lg font-bold text-red-700 mb-2">Konfirmasi Hapus Data</h3>
        <p className="text-red-600 font-semibold mb-4">PERINGATAN: Data yang dihapus tidak dapat dikembalikan!</p>
        <p className="text-gray-700 mb-6 whitespace-pre-line">{message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-bold shadow"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DeleteConfirmationDialog; 