import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { AlertCircle } from 'lucide-react';
import { useWizard } from '../../context/WizardContext';

const suggestions = [
  { label: 'Christmas', category: 'christmas' },
  { label: 'Baby Shower', category: 'baby' },
  { label: 'Retirement', category: 'retirement' },
  { label: 'Staff Giving', category: 'giving' },
];

const InputStep: React.FC = () => {
  const { handleInputSubmit, userPrompt, error, handleRetry, loadingPhase } = useWizard();
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = loadingPhase !== 'idle' && loadingPhase !== 'result';

  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSubmit = (values: { prompt: string }) => {
    if (values.prompt.trim()) {
      handleInputSubmit(values.prompt.trim());
    }
  };

  const handleSuggestionClick = (suggestion: typeof suggestions[0], setFieldValue: (field: string, value: any) => void) => {
    const value = `Create a collection for ${suggestion.label.toLowerCase()}`;
    setFieldValue('prompt', value);
    handleInputSubmit(value, suggestion.category);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-2xl text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif text-cheddar-gray-900 mb-4">
          Welcome! Let's get your collection started.
        </h1>
        <p className="text-lg text-cheddar-gray-600 mb-8">
          Describe the group gift or event you're collecting for:
        </p>

        {error && (
          <div className="mb-6 mx-auto max-w-lg p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
            <button
              type="button"
              onClick={handleRetry}
              className="px-3 py-1.5 bg-white border border-red-200 text-red-700 text-sm font-medium rounded hover:bg-red-50 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <Formik
          initialValues={{ prompt: userPrompt }}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form className="mb-8">
              <Field
                innerRef={inputRef}
                name="prompt"
                type="text"
                placeholder="I'm collecting a group gift for..."
                className={`w-full px-6 py-4 text-base text-cheddar-gray-900 border rounded-lg focus:outline-none focus:ring-1 transition-colors ${error
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-cheddar-gray-300 focus:border-cheddar-orange focus:ring-cheddar-orange'
                  }`}
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
