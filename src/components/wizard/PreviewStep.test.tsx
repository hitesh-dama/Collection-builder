import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PreviewStep } from './PreviewStep';
import { useWizard } from '../../context/WizardContext';
import { Template } from '../../types';

// Mock the useWizard hook
vi.mock('../../context/WizardContext', () => ({
  useWizard: vi.fn(),
}));

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

  const mockHandleClearPrompt = vi.fn();

  beforeEach(() => {
    (useWizard as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      templates: [template],
      userPrompt: 'Wedding gift for Sarah',
      handleClearPrompt: mockHandleClearPrompt,
    });
    mockHandleClearPrompt.mockClear();
  });

  it('renders template title and description', () => {
    render(<PreviewStep />);
    expect(screen.getAllByText(/Wedding Gift/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/A special gift for Sarah/i)).toBeInTheDocument();
  });

  it('renders user prompt', () => {
    render(<PreviewStep />);
    expect(screen.getByText(/Wedding gift for Sarah/i)).toBeInTheDocument();
  });
});
