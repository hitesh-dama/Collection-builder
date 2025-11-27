import { Template } from '../types';
import { Check, Sparkles } from 'lucide-react';

interface CollectionCardProps {
  template: Template;
  isSelected?: boolean;
  onSelect: (templateId: string) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  template,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(template.id)}
      className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        isSelected
          ? 'border-cheddar-orange bg-gradient-to-br from-orange-50 to-white shadow-xl scale-[1.02]'
          : 'border-cheddar-gray-200 bg-white hover:border-cheddar-orange'
      }`}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select ${template.title} template`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(template.id);
        }
      }}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-cheddar-orange rounded-full flex items-center justify-center shadow-lg animate-scale-in z-10">
          <Check className="w-5 h-5 text-white" strokeWidth={3} />
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${template.theme.primaryColor}20, ${template.theme.accentColor}20)`,
          }}
        >
          <Sparkles
            className="w-5 h-5"
            style={{ color: template.theme.primaryColor }}
          />
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
          style={{
            background: `${template.theme.primaryColor}15`,
            color: template.theme.primaryColor,
          }}
        >
          {template.category}
        </span>
      </div>

      <h3 className="text-xl font-bold text-cheddar-gray-900 mb-2 font-heading truncate">
        {template.title}
      </h3>
      <p className="text-base text-cheddar-gray-600 mb-6 line-clamp-2">
        {template.description}
      </p>

      <div className="space-y-2">
        <p className="text-sm font-medium text-cheddar-gray-500 uppercase tracking-wide">
          Suggested Amounts
        </p>
        <div className="flex flex-wrap gap-2">
          {template.suggestedAmounts.map((amount) => (
            <span
              key={amount}
              className="px-3 py-1.5 bg-cheddar-gray-100 text-cheddar-gray-800 text-sm font-semibold rounded-lg"
            >
              ${amount}
            </span>
          ))}
          {template.customAmountEnabled && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-cheddar-orange to-orange-400 text-white text-sm font-semibold rounded-lg">
              Custom
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
