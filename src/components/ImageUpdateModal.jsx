import React from "react";

const ImageUpdateModal = ({
  show,
  onCancel,
  onConfirm,
  selectedItem,
  getImageUrl,
  previewImage,
  onFileChange,
  onUpdateClick,
  isUpdateMode
}) => {
  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${show ? "block" : "hidden"}`}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-blue-500 text-4xl mb-4">🖼️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Ilustrasi</h3>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Aspirasi:</p>
            <p className="text-sm text-gray-800 bg-gray-100 p-2 rounded max-h-20 overflow-y-auto">
              {selectedItem?.aspirasi}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Ilustrasi baru:</p>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview Ilustrasi Baru"
                className="w-20 h-20 object-cover rounded-lg border mx-auto"
              />
            ) : selectedItem?.ilustrasi ? (
              <img
                src={getImageUrl(selectedItem.ilustrasi)}
                alt="Ilustrasi saat ini"
                className="w-20 h-20 object-cover rounded-lg border mx-auto"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-gray-500 text-xs">No Image</span>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-2">Ukuran maksimal gambar: 200KB</p>
          </div>
          <p className="text-gray-600 mb-6">{isUpdateMode ? "Pastikan gambar sudah benar sebelum update." : "Apakah Anda ingin mengubah ilustrasi untuk aspirasi ini?"}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Batal
            </button>
            {isUpdateMode ? (
              <button
                onClick={onUpdateClick}
                className="px-4 py-2 bg-[#10316B] text-white rounded-lg hover:bg-[#0d2654] transition duration-300"
              >
                Update
              </button>
            ) : (
              <label className="px-4 py-2 bg-[#10316B] text-white rounded-lg hover:bg-[#0d2654] transition duration-300 cursor-pointer">
                Pilih Gambar
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onFileChange}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpdateModal; 