import { useEffect, useState } from "react";
import { getErrors } from "../api/deviceService";
import formatDate from "../utils/formatDate";
const ROWS_PER_PAGE = 8;

const ErrorTable = () => {
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getErrors().then(setErrors);
  }, []);

  const totalPages = Math.ceil(errors.length / ROWS_PER_PAGE);

  const currentData = errors.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded-md ${
            i === currentPage
              ? "bg-blue-600 text-white"
              : "bg-blue-100 hover:bg-blue-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded p-4">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Device ID</th>
            <th className="px-4 py-2">Error Message</th>
            <th className="px-4 py-2">Last Attempt</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((d) => (
            <tr key={d.id} className="text-center border-b">
              <td className="px-4 py-2">{d.id}</td>
              <td className="px-4 py-2">{d.error || "Unknown Error"}</td>
              <td className="px-4 py-2">
                {/* {new Date(d.lastSync).toLocaleDateString()} */}
                {formatDate(d.lastSync)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination flex flex-wrap justify-center items-center gap-2 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Prev
          </button>

          {renderPageButtons()}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorTable;
