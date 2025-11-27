import React from 'react';
import { render, screen } from '@testing-library/react';
import { PreviewStep } from './PreviewStep';
import { Template } from '../../types';

describe('PreviewStep', () => {
  const template: Template = {
    id: '1',
    title: 'Wedding Gift',
    description: 'A special gift for Sarah',
    category: 'wedding',
    suggestedAmounts: [25, 50, 100, 200],
    customAmountEnabled: true,
    theme: { primaryColor: '#FF6B35', accentColor: '#F4A261' },
  };

  it('renders template title and description', () => {
    render(
      <PreviewStep
        templates={[template]}
        userPrompt="Wedding gift for Sarah"
        feedback="Here's a wedding gift collection for Sarah"
        selectedTemplateId={template.id}
        onSelectTemplate={vi.fn()}
        onBack={vi.fn()}
        onContinue={vi.fn()}
        onClearPrompt={vi.fn()}
      />
    );
    expect(screen.getAllByText(/Wedding Gift/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/A special gift for Sarah/i)).toBeInTheDocument();
  });
});
