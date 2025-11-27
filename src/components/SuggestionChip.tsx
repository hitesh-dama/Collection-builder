interface SuggestionChipProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export const SuggestionChip: React.FC<SuggestionChipProps> = ({ label, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-5 py-3 bg-white border-2 border-cheddar-gray-200 rounded-full text-base text-cheddar-gray-700 hover:border-cheddar-orange hover:text-cheddar-orange hover:bg-orange-50 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cheddar-orange focus:ring-offset-2 shadow-sm hover:shadow-md"
      aria-label={`Suggest ${label}`}
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
      <span className="font-medium">{label}</span>
    </button>
  );
};
