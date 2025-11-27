import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomizeStep } from './CustomizeStep';
import { Template } from '../../types';

describe('CustomizeStep', () => {
  const template: Template = {
    id: '1',
    title: 'Wedding Gift',
    description: 'A special gift for Sarah',
    category: 'wedding',
    suggestedAmounts: [25, 50, 100, 200],
    customAmountEnabled: true,
    theme: { primaryColor: '#FF6B35', accentColor: '#F4A261' },
  };

  it('renders title, description, and suggested amounts', () => {
    render(
      <CustomizeStep
        template={template}
        onBack={vi.fn()}
        onComplete={vi.fn()}
      />
    );
    expect(screen.getByDisplayValue(/Wedding Gift/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/A special gift for Sarah/i)).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
  });
});
