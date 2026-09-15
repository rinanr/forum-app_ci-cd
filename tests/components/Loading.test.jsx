import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from '../../src/components/Loading';

/*
 * Skenario pengujian:
 * 1. Memastikan komponen Loading menampilkan teks default
 *    "Memuat...".
 * 2. Memastikan komponen Loading dapat menampilkan teks
 *    sesuai props yang diberikan.
 */

describe('Loading Component', () => {
  it('harus menampilkan teks loading default', () => {
    render(<Loading />);

    expect(screen.getByText('Memuat...')).toBeInTheDocument();
  });

  it('harus menampilkan teks loading sesuai props', () => {
    render(<Loading text="Memuat data thread..." />);

    expect(
      screen.getByText('Memuat data thread...'),
    ).toBeInTheDocument();
  });
});