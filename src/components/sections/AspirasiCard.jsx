import React, { useState } from "react";
import aspirasiIlustrasi2 from "../../assets/images/ilustrasi_aspirasi2.png";

const AspirasiCard = ({ id, content, author, image }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const isLong = content.split(" ").length > 20;
  const shortContent = content.split(" ").slice(0, 20).join(" ") + "...";

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="text-left">
      <div className="bg-white rounded-xl p-6 mb-4 shadow-lg border-2 border-black relative transition-all duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col justify-between">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#FFE867] bg-gray-200 flex items-center justify-center">
          <img
            src={image && !imageError ? image : aspirasiIlustrasi2}
            alt="Aspirasi"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
        <p className="text-gray-700 text-sm font-medium mb-3">
          {isLong && !expanded ? shortContent : content}
          {isLong && (
            <button
              onClick={toggleExpand}
              className="text-[#10316B] font-semibold ml-1 hover:underline transition-all duration-200"
            >
              {expanded ? "Tutup" : "Baca selengkapnya"}
            </button>
          )}
        </p>
        <div className="text-sm text-right text-gray-500 mt-auto pt-4 border-t border-gray-200">
          ✍️ {author}
        </div>
      </div>
    </div>
  );
};

export default AspirasiCard;