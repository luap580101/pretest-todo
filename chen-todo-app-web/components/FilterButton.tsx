import React from 'react';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded ${isActive ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
