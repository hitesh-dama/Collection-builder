import React, { useState } from 'react';
import { Template } from '../../types';
import { Button } from '../Button';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface CustomizeStepProps {
  template: Template;
  onBack: () => void;
  onComplete: (data: { title: string; description: string; amounts: number[] }) => void;
}

export const CustomizeStep: React.FC<CustomizeStepProps> = (props) => {
  const { template, onBack, onComplete } = props;
  const [title, setTitle] = useState(template.title);
  const [description, setDescription] = useState(template.description);
  const [amounts, setAmounts] = useState<number[]>(template.suggestedAmounts);
  const [newAmount, setNewAmount] = useState('');

  const handleAddAmount = () => {
    const amount = parseFloat(newAmount);
    if (!isNaN(amount) && amount > 0 && !amounts.includes(amount)) {
      setAmounts([...amounts, amount].sort((a, b) => a - b));
      setNewAmount('');
    }
  };

  const handleRemoveAmount = (amount: number) => {
    if (amounts.length > 1) {
      setAmounts(amounts.filter((a) => a !== amount));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ title, description, amounts });
  };

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-base text-cheddar-gray-600 hover:text-cheddar-orange transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-cheddar-gray-900 mb-4">
          Customize Your Collection
        </h2>
        <p className="text-xl text-cheddar-gray-600">
          Fine-tune the details to match your needs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="title" className="block text-lg font-semibold text-cheddar-gray-900 mb-3">
            Collection Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-5 py-4 text-base border-2 border-cheddar-gray-300 rounded-xl focus:border-cheddar-orange focus:outline-none focus:ring-4 focus:ring-cheddar-orange focus:ring-opacity-20 transition-all"
            required
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-cheddar-gray-900 mb-3">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-5 py-4 text-base border-2 border-cheddar-gray-300 rounded-xl focus:border-cheddar-orange focus:outline-none focus:ring-4 focus:ring-cheddar-orange focus:ring-opacity-20 transition-all resize-none"
            required
            maxLength={500}
          />
        </div>

        <div>
          <label htmlFor="amount-input" className="block text-lg font-semibold text-cheddar-gray-900 mb-3">
            Suggested Donation Amounts
          </label>
          <div className="flex flex-wrap gap-3 mb-4">
            {amounts.map((amount) => (
              <div
                key={amount}
                className="inline-flex items-center gap-2 px-4 py-3 bg-cheddar-orange text-white rounded-xl"
              >
                <span className="text-lg font-bold">${amount}</span>
                {amounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAmount(amount)}
                    className="hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              id="amount-input"
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Add amount"
              min="1"
              step="1"
              className="flex-1 px-4 py-3 text-base border-2 border-cheddar-gray-300 rounded-xl focus:border-cheddar-orange focus:outline-none"
            />
            <Button
              type="button"
              onClick={handleAddAmount}
              variant="outline"
              size="md"
              disabled={!newAmount || Number.parseFloat(newAmount) <= 0}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="pt-8">
          <Button type="submit" variant="primary" size="lg" fullWidth>
            Create Collection
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomizeStep;
