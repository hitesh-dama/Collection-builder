import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputStep } from './InputStep';

describe('InputStep', () => {
  it('renders input and suggestion chips', () => {
    render(<InputStep onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText(/collecting a group gift/i)).toBeInTheDocument();
    expect(screen.getByText(/Christmas/i)).toBeInTheDocument();
    expect(screen.getByText(/Baby Shower/i)).toBeInTheDocument();
    expect(screen.getByText(/Retirement/i)).toBeInTheDocument();
    expect(screen.getByText(/Staff Giving/i)).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', async () => {
    const onSubmit = vi.fn();
    render(<InputStep onSubmit={onSubmit} />);
    const input = screen.getByPlaceholderText(/collecting a group gift/i);
    fireEvent.change(input, { target: { value: 'Wedding gift for Sarah' } });
    fireEvent.submit(input.closest('form')!);
    await screen.findByPlaceholderText(/collecting a group gift/i); // Wait for Formik
    expect(onSubmit).toHaveBeenCalledWith('Wedding gift for Sarah');
  });

  it('calls onSubmit with suggestion chip', () => {
    const onSubmit = vi.fn();
    render(<InputStep onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText(/Christmas/i));
    expect(onSubmit).toHaveBeenCalledWith(expect.stringContaining('christmas'), 'christmas');
  });
});
