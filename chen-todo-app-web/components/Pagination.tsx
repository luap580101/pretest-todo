"use client";

import { useTaskContext } from "@/context/TaskContext";
import React from "react";

export default function Pagination() {
  const { currentPage, setCurrentPage, tasks } = useTaskContext();

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage <= 1}
        className="px-3 py-1 border rounded bg-white text-blue-600 border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        上一頁
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={tasks.length < 10}
        className="px-3 py-1 border rounded bg-white text-blue-600 border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        下一頁
      </button>
    </div>
  );
}
