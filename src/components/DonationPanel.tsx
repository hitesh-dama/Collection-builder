import { useState } from 'react';
import { Trash2, Check, X } from 'lucide-react';

interface DonationPanelProps {
  id: string;
  title: string;
  description: string;
  onUpdate: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
}

export const DonationPanel: React.FC<DonationPanelProps> = ({
  id,
  title: initialTitle,
  description: initialDescription,
  onUpdate,
  onDelete,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isHovered, setIsHovered] = useState(false);

  const handleSaveTitle = () => {
    onUpdate(id, title, description);
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    setTitle(initialTitle);
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    onUpdate(id, title, description);
    setIsEditingDescription(false);
  };

  const handleCancelDescription = () => {
    setDescription(initialDescription);
    setIsEditingDescription(false);
  };

  return (
    <div
      className="relative border border-cheddar-gray-200 rounded-lg p-6 bg-white hover:shadow-sm transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <button
          onClick={() => onDelete(id)}
          className="absolute top-3 right-3 p-1.5 text-cheddar-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          title="Delete panel"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <div className="mb-4">
        {isEditingTitle ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-3 py-2 border border-cheddar-gray-300 rounded focus:outline-none focus:border-cheddar-orange text-base"
              autoFocus
            />
            <button
              onClick={handleSaveTitle}
              className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={handleCancelTitle}
              className="p-2 text-cheddar-gray-600 hover:bg-cheddar-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <h3
            onClick={() => setIsEditingTitle(true)}
            className="text-lg font-medium text-cheddar-gray-900 cursor-pointer hover:text-cheddar-orange transition-colors truncate"
          >
            {title}
          </h3>
        )}
      </div>

      <div className="mb-6">
        {isEditingDescription ? (
          <div className="space-y-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-cheddar-gray-300 rounded focus:outline-none focus:border-cheddar-orange text-sm resize-none"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveDescription}
                className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancelDescription}
                className="px-4 py-1.5 border border-cheddar-gray-300 text-cheddar-gray-700 text-sm rounded hover:bg-cheddar-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p
            onClick={() => setIsEditingDescription(true)}
            className="text-sm text-cheddar-gray-600 cursor-pointer hover:text-cheddar-gray-900 transition-colors"
          >
            {description}
          </p>
        )}
      </div>

      <button className="w-full px-6 py-2.5 bg-cheddar-teal hover:bg-cheddar-teal-dark text-cheddar-gray-800 rounded-lg transition-colors font-medium">
        Donate Now
      </button>
    </div>
  );
};
