import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Valentine invitation page', () => {
  it('renders the main heading', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          couple: 'Kishore ❤️ Sai Swaroopa',
          relationshipStartDate: '2022-06-02',
          title: 'Every Love Story Is Beautiful, But Ours Is My Favorite.',
          invitation: 'Sai, Will You Be My Valentine?',
        }),
      }),
    );

    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Every Love Story Is Beautiful, But Ours Is My Favorite.',
      }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Backend connected')).toBeInTheDocument();
    });
  });

  it('handles invitation button responses', async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          couple: 'Kishore ❤️ Sai Swaroopa',
          relationshipStartDate: '2022-06-02',
          title: 'Every Love Story Is Beautiful, But Ours Is My Favorite.',
          invitation: 'Sai, Will You Be My Valentine?',
        }),
      }),
    );

    render(<App />);

    await user.click(screen.getByRole('button', { name: /Yes, Absolutely!/i }));
    expect(screen.getByText(/You just made my day, Sai!/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Accepted with Love/i })).toBeDisabled();
  });

  it('still renders when the backend is unavailable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: 'Every Love Story Is Beautiful, But Ours Is My Favorite.',
      }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/Backend unavailable — showing static content/i),
      ).toBeInTheDocument();
    });
  });
});
