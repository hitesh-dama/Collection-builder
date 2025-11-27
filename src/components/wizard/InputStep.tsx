import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';

interface InputStepProps {
  onSubmit: (prompt: string, category?: string) => void;
  isLoading?: boolean;
  initialPrompt?: string;
}

const suggestions = [
  { label: 'Christmas', category: 'christmas' },
  { label: 'Baby Shower', category: 'baby' },
  { label: 'Retirement', category: 'retirement' },
  { label: 'Staff Giving', category: 'giving' },
];

export const InputStep: React.FC<InputStepProps> = ({
  onSubmit,
  isLoading,
  initialPrompt = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (values: { prompt: string }) => {
    if (values.prompt.trim()) {
      onSubmit(values.prompt.trim());
    }
  };

  const handleSuggestionClick = (suggestion: typeof suggestions[0], setFieldValue: (field: string, value: any) => void) => {
    const value = `I need a page that will help me collect donations for a ${suggestion.label.toLowerCase()}`;
    setFieldValue('prompt', value);
    onSubmit(value, suggestion.category);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-2xl text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif text-cheddar-gray-900 mb-4">
          Hi Molly, I'll help you get started!
        </h1>
        <p className="text-lg text-cheddar-gray-600 mb-8">
          Tell us about the group gift you're collecting for:
        </p>
        <Formik
          initialValues={{ prompt: initialPrompt }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="mb-8">
              <Field
                innerRef={inputRef}
                name="prompt"
                type="text"
                placeholder="I'm collecting a group gift for..."
                className="w-full px-6 py-4 text-base text-cheddar-gray-900 border border-cheddar-gray-300 rounded-lg focus:outline-none focus:border-cheddar-orange focus:ring-1 focus:ring-cheddar-orange transition-colors"
                disabled={isLoading}
              />
              <button type="submit" className="hidden" />
              <div className="flex flex-wrap gap-3 justify-center mt-6">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion, setFieldValue)}
                    className="px-5 py-2.5 bg-cheddar-teal hover:bg-cheddar-teal-dark text-cheddar-gray-800 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cheddar-orange focus:ring-offset-2"
                    disabled={isLoading}
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InputStep;
