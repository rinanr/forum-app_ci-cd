import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';

import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import VoteButton from '../../src/components/VoteButton';

describe('VoteButton Component', () => {
  /**
   * Skenario pengujian:
   * Memastikan tombol up vote menampilkan jumlah vote
   * dan dapat menjalankan callback ketika diklik.
   */
  it('harus menampilkan jumlah up vote dan menjalankan onClick', () => {
    const handleClick = vi.fn();

    render(
      <VoteButton
        type="up"
        count={10}
        active={false}
        onClick={handleClick}
        disabled={false}
      />,
    );

    expect(screen.getByText('10')).toBeInTheDocument();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Skenario pengujian:
   * Memastikan tombol yang disabled tidak dapat
   * menjalankan callback ketika diklik.
   */
  it('harus menonaktifkan tombol ketika disabled', () => {
    const handleClick = vi.fn();

    render(
      <VoteButton
        type="down"
        count={3}
        active={true}
        onClick={handleClick}
        disabled={true}
      />,
    );

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});