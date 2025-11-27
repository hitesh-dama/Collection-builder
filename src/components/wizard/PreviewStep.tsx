import React, { useState, useEffect } from 'react';
import { Template } from '../../types';
import { X, Check, Plus } from 'lucide-react';
import { DonationPanel as DonationPanelComponent } from '../DonationPanel';
import { storage, type DonationPanel as DonationPanelType } from '../../lib/storage';

interface PreviewStepProps {
  templates: Template[];
  userPrompt: string;
  onClearPrompt: () => void;
}

export const PreviewStep: React.FC<PreviewStepProps> = (props) => {
  const { templates, userPrompt, onClearPrompt } = props;
  const defaultTemplate: Template = {
    id: '',
    title: '',
    description: '',
    category: 'wedding',
    suggestedAmounts: [25, 50, 100],
    customAmountEnabled: true,
    theme: { primaryColor: '#FF6B35', accentColor: '#F4A261' },
  };
  // Defensive: fallback to defaults if any field is missing
  const raw = templates && Array.isArray(templates) && templates[0] ? templates[0] : defaultTemplate;
  const template: Template = {
    ...defaultTemplate,
    ...raw,
    suggestedAmounts: Array.isArray(raw.suggestedAmounts) ? raw.suggestedAmounts : defaultTemplate.suggestedAmounts,
    customAmountEnabled: typeof raw.customAmountEnabled === 'boolean' ? raw.customAmountEnabled : defaultTemplate.customAmountEnabled,
    theme: raw.theme && typeof raw.theme.primaryColor === 'string' && typeof raw.theme.accentColor === 'string'
      ? raw.theme
      : defaultTemplate.theme,
  };

  const defaultDescription = `Hey everyone!\n\nI'd appreciate your help in giving the couple a special gift for their big day! Any contribution you can make would be wonderful.`;

  const [collectionId, setCollectionId] = useState<string>('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState(template.description || defaultDescription);
  const [donationPanels, setDonationPanels] = useState<DonationPanelType[]>([]);

  useEffect(() => {
    const collection = storage.collections.create({
      userPrompt,
      title: template.title,
      description: description,
      heroImageUrl: 'https://picsum.photos/seed/wedding/800/600',
      category: template.category || 'wedding',
    });
    setCollectionId(collection.id);

    const existingPanels = storage.donationPanels.getByCollectionId(collection.id);
    setDonationPanels(existingPanels);
  }, []);

  // Fallback UI after hooks
  if (!templates || !Array.isArray(templates) || !templates[0]) {
    return (
      <div className="max-w-4xl mx-auto animate-slide-up text-center py-24">
        <h2 className="text-2xl font-bold text-cheddar-gray-900 mb-4">No template found</h2>
        <p className="text-base text-cheddar-gray-700 mb-8">Please go back and select a template or try again.</p>
        <button
          onClick={onClearPrompt}
          className="px-6 py-2 bg-cheddar-orange hover:bg-cheddar-orange-hover text-white rounded-lg transition-colors font-medium"
        >
          Back
        </button>
      </div>
    );
  }

  const handleSaveTitle = () => {
    if (collectionId) {
      storage.collections.update(collectionId, { title });
    }
    setIsEditingTitle(false);
  };

  const handleCancelTitle = () => {
    if (collectionId) {
      const collection = storage.collections.get(collectionId);
      if (collection) setTitle(collection.title);
    }
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    if (collectionId) {
      storage.collections.update(collectionId, { description });
    }
    setIsEditingDescription(false);
  };

  const handleCancelDescription = () => {
    if (collectionId) {
      const collection = storage.collections.get(collectionId);
      if (collection) setDescription(collection.description);
    }
    setIsEditingDescription(false);
  };

  const handleAddDonationPanel = () => {
    if (!collectionId) return;

    const newPanel = storage.donationPanels.create({
      collectionId,
      title: 'Donation Title',
      description: 'Donation description',
      orderIndex: donationPanels.length,
    });

    setDonationPanels([...donationPanels, newPanel]);
  };

  const handleUpdatePanel = (id: string, newTitle: string, newDescription: string) => {
    storage.donationPanels.update(id, {
      title: newTitle,
      description: newDescription,
    });

    setDonationPanels(
      donationPanels.map((p) =>
        p.id === id ? { ...p, title: newTitle, description: newDescription } : p
      )
    );
  };

  const handleDeletePanel = (id: string) => {
    storage.donationPanels.delete(id);
    setDonationPanels(donationPanels.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <div className="mb-8 flex items-center justify-center">
        <div className="relative bg-white border border-cheddar-gray-300 rounded-lg px-6 py-3 shadow-sm">
          <span className="text-sm text-cheddar-gray-700">{userPrompt}</span>
          <button
            onClick={onClearPrompt}
            className="absolute -right-2 -top-2 w-6 h-6 bg-cheddar-gray-700 hover:bg-cheddar-gray-900 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Clear prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-base text-cheddar-gray-700">
          Here is an example of a group gift collection for a wedding gift
        </p>
      </div>

      <div className="bg-white border border-cheddar-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
          <picture>
            <img
              src="https://picsum.photos/seed/wedding/800/600"
              alt="Wedding"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        <div className="p-8">
          <h1 className="mb-4">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 text-3xl font-serif px-3 py-2 border border-cheddar-gray-300 rounded focus:outline-none focus:border-cheddar-orange"
                  autoFocus
                />
                <button
                  onClick={handleSaveTitle}
                  className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                  aria-label="Save"
                >
                  <Check className="w-6 h-6" />
                </button>
                <button
                  onClick={handleCancelTitle}
                  className="p-2 text-cheddar-gray-600 hover:bg-cheddar-gray-100 rounded transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingTitle(true)}
                className="text-3xl font-serif text-cheddar-gray-900 cursor-pointer hover:text-cheddar-orange transition-colors bg-transparent border-none p-0 text-left"
                aria-label="Edit title"
              >
                {title}
              </button>
            )}
          </h1>

          <div className="mb-8">
            {isEditingDescription ? (
              <div className="space-y-3">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-cheddar-gray-300 rounded focus:outline-none focus:border-cheddar-orange text-base resize-none"
                  rows={4}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveDescription}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelDescription}
                    className="px-4 py-2 border border-cheddar-gray-300 text-cheddar-gray-700 rounded hover:bg-cheddar-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingDescription(true)}
                className="text-base text-cheddar-gray-600 cursor-pointer hover:text-cheddar-gray-900 transition-colors whitespace-pre-wrap bg-transparent border-none p-0"
                aria-label="Edit description"
              >
                {description}
              </button>
            )}
          </div>

          <div className="flex gap-4 mb-8">
            <button className="px-6 py-2 border border-cheddar-gray-300 text-cheddar-gray-700 rounded-lg hover:bg-cheddar-gray-50 transition-colors">
              Preview
            </button>
            <button className="px-6 py-2 bg-cheddar-orange hover:bg-cheddar-orange-hover text-white rounded-lg transition-colors font-medium">
              Try this out
            </button>
          </div>

          {donationPanels.length > 0 && (
            <div className="space-y-4 mb-8">
              {donationPanels.map((panel) => (
                <DonationPanelComponent
                  key={panel.id}
                  id={panel.id}
                  title={panel.title}
                  description={panel.description}
                  onUpdate={handleUpdatePanel}
                  onDelete={handleDeletePanel}
                />
              ))}
            </div>
          )}

          <div className="pt-6 border-t border-cheddar-gray-200">
            <button
              onClick={handleAddDonationPanel}
              className="flex items-center gap-2 text-cheddar-orange hover:text-cheddar-orange-hover text-sm font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add custom donation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;
