import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import InputStep from './InputStep';
import { useWizard } from '../../context/WizardContext';

// Mock the useWizard hook
vi.mock('../../context/WizardContext', () => ({
  useWizard: vi.fn(),
}));

describe('InputStep', () => {
  const mockHandleInputSubmit = vi.fn();
  const mockHandleRetry = vi.fn();

  beforeEach(() => {
    (useWizard as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      handleInputSubmit: mockHandleInputSubmit,
      userPrompt: '',
      error: null,
      handleRetry: mockHandleRetry,
      loadingPhase: 'idle',
    });
    mockHandleInputSubmit.mockClear();
    mockHandleRetry.mockClear();
  });

  it('renders input and suggestion chips', () => {
    render(<InputStep />);
    expect(screen.getByPlaceholderText(/collecting a group gift/i)).toBeInTheDocument();
    expect(screen.getByText(/Christmas/i)).toBeInTheDocument();
    expect(screen.getByText(/Baby Shower/i)).toBeInTheDocument();
    expect(screen.getByText(/Retirement/i)).toBeInTheDocument();
    expect(screen.getByText(/Staff Giving/i)).toBeInTheDocument();
  });

  it('calls handleInputSubmit when form is submitted', async () => {
    render(<InputStep />);
    const input = screen.getByPlaceholderText(/collecting a group gift/i);
    fireEvent.change(input, { target: { value: 'Wedding gift for Sarah' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(mockHandleInputSubmit).toHaveBeenCalledWith('Wedding gift for Sarah');
    });
  });

  it('calls handleInputSubmit with suggestion chip', () => {
    render(<InputStep />);
    fireEvent.click(screen.getByText(/Christmas/i));
    expect(mockHandleInputSubmit).toHaveBeenCalledWith(expect.stringContaining('christmas'), 'christmas');
  });
});
