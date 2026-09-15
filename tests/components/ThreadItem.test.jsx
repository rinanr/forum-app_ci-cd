import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../../src/components/ThreadItem';

/*
 * Skenario pengujian:
 * 1. Memastikan ThreadItem menampilkan informasi thread,
 *    seperti nama pemilik, judul, isi, dan jumlah komentar.
 * 2. Memastikan judul thread memiliki link menuju halaman
 *    detail thread berdasarkan id thread.
 */

describe('ThreadItem Component', () => {
  const mockThread = {
    id: 'thread-1',
    title: 'Belajar React untuk Pemula',
    body: 'Saya ingin belajar React dari dasar.',
    owner: {
      id: 'user-1',
      name: 'Rina',
    },
    createdAt: '2026-01-01T10:00:00.000Z',
    totalComments: 5,
  };

  it('harus menampilkan informasi thread', () => {
    render(
      <MemoryRouter>
        <ThreadItem thread={mockThread} />
      </MemoryRouter>,
    );

    expect(
      screen.getByText('Belajar React untuk Pemula'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Saya ingin belajar React dari dasar.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('Rina')).toBeInTheDocument();

    expect(screen.getByText('5 komentar')).toBeInTheDocument();
  });

  it('harus memiliki link menuju detail thread', () => {
    render(
      <MemoryRouter>
        <ThreadItem thread={mockThread} />
      </MemoryRouter>,
    );

    const threadLink = screen.getByRole('link', {
      name: 'Belajar React untuk Pemula',
    });

    expect(threadLink).toHaveAttribute(
      'href',
      '/threads/thread-1',
    );
  });
});