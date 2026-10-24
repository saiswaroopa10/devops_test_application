import { useEffect, useState } from 'react';
import { calculateDuration, formatDuration } from './duration';

interface InvitationMessage {
  couple: string;
  relationshipStartDate: string;
  title: string;
  invitation: string;
}

type BackendStatus = 'loading' | 'connected' | 'unavailable';
type RsvpResponse = 'yes' | 'no' | null;

const RELATIONSHIP_START = new Date(2022, 5, 2);
const FALLBACK_TITLE = 'Every Love Story Is Beautiful, But Ours Is My Favorite.';
const FALLBACK_COUPLE = 'Kishore ❤️ Sai Swaroopa';
const LOVE_LETTER = `My dearest Sai,

If I could go back to June 2, 2022, I would still choose to begin this journey with you.

Thank you for being a special part of my life. I want us to keep growing together, understanding each other, sharing beautiful moments, and making memories that we will cherish for years to come.

With all my love,
Kishore ❤️`;

function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${8 + (i * 7.5) % 85}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${10 + (i % 5)}s`,
            fontSize: `${0.8 + (i % 4) * 0.25}rem`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export default function App() {
  const [message, setMessage] = useState<InvitationMessage | null>(null);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('loading');
  const [letterOpen, setLetterOpen] = useState(false);
  const [rsvp, setRsvp] = useState<RsvpResponse>(null);
  const [celebrate, setCelebrate] = useState(false);

  const duration = calculateDuration(RELATIONSHIP_START);
  const title = message?.title ?? FALLBACK_TITLE;
  const couple = message?.couple ?? FALLBACK_COUPLE;

  useEffect(() => {
    let cancelled = false;

    async function loadMessage() {
      try {
        const response = await fetch('/api/message');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = (await response.json()) as InvitationMessage;
        if (!cancelled) {
          setMessage(data);
          setBackendStatus('connected');
        }
      } catch {
        if (!cancelled) {
          setBackendStatus('unavailable');
        }
      }
    }

    loadMessage();
    return () => {
      cancelled = true;
    };
  }, []);

  function scrollToInvitation() {
    document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleYes() {
    setRsvp('yes');
    setCelebrate(true);
    window.setTimeout(() => setCelebrate(false), 2800);
  }

  function handleNo() {
    setRsvp('no');
    setCelebrate(false);
  }

  return (
    <div className="page">
      <FloatingHearts />

      <div className={`status-pill status-${backendStatus}`} role="status">
        {backendStatus === 'loading' && 'Connecting to server…'}
        {backendStatus === 'connected' && 'Backend connected'}
        {backendStatus === 'unavailable' &&
          'Backend unavailable — showing static content'}
      </div>

      <section className="hero" id="hero">
        <p className="eyebrow">For My Favorite Person</p>
        <h1 className="couple-name">{couple}</h1>
        <p className="since">Since June 02, 2022</p>

        <figure className="heart-portrait">
          <div className="heart-frame" aria-label="Kishore and Sai Swaroopa together">
            <svg
              className="heart-svg"
              viewBox="0 0 300 280"
              role="img"
              aria-label="Kishore and Sai Swaroopa together"
            >
              <defs>
                <clipPath id="couple-heart-clip">
                  <path d="M150 262 C42 178 18 98 78 48 C110 24 136 40 150 68 C164 40 190 24 222 48 C282 98 258 178 150 262 Z" />
                </clipPath>
                <linearGradient id="heart-border" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7c9d4" />
                  <stop offset="50%" stopColor="#c45c7a" />
                  <stop offset="100%" stopColor="#7a1f3d" />
                </linearGradient>
              </defs>
              <path
                d="M150 270 C32 180 4 92 72 38 C108 10 138 28 150 60 C162 28 192 10 228 38 C296 92 268 180 150 270 Z"
                fill="url(#heart-border)"
              />
              <image
                href="/couple.jpg"
                x="18"
                y="12"
                width="264"
                height="248"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#couple-heart-clip)"
              />
            </svg>
          </div>
          <figcaption className="heart-caption">Our favorite forever ❤️</figcaption>
        </figure>

        <h2 className="headline">{title}</h2>
        <p className="supporting">
          From June 2, 2022, to all the beautiful memories still waiting for us.
        </p>
        <button type="button" className="btn btn-primary" onClick={scrollToInvitation}>
          Open Your Invitation 💌
        </button>
      </section>

      <section className="section story" id="story">
        <h2 className="section-title">Where Our Story Began</h2>
        <p className="story-date">June 02, 2022</p>
        <p className="section-text">
          One special date. Two hearts. A story that continues.
        </p>
        <div className="duration-card">
          <p className="duration-label">Together for</p>
          <p className="duration-value">{formatDuration(duration)}</p>
        </div>
      </section>

      <section className="section letter" id="letter">
        <h2 className="section-title">A Little Something From My Heart</h2>
        {!letterOpen ? (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setLetterOpen(true)}
          >
            Read My Letter
          </button>
        ) : (
          <article className="letter-card letter-reveal" aria-live="polite">
            <pre className="letter-body">{LOVE_LETTER}</pre>
          </article>
        )}
      </section>

      <section className="section invitation" id="invitation">
        <div className="invite-card">
          <h2 className="section-title">
            {message?.invitation ?? 'Sai, Will You Be My Valentine?'} ❤️
          </h2>
          <p className="section-text">I have a little question for my favorite person.</p>
          <p className="section-text invite-question">
            Would you spend this Valentine&apos;s Day creating another beautiful memory
            with me?
          </p>

          <div className="rsvp-actions">
            <button
              type="button"
              className={`btn btn-primary ${rsvp === 'yes' ? 'btn-accepted' : ''}`}
              onClick={handleYes}
              disabled={rsvp === 'yes'}
            >
              {rsvp === 'yes' ? 'Accepted with Love ❤️' : 'Yes, Absolutely! ❤️'}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleNo}
              disabled={rsvp === 'yes'}
            >
              Not This Time
            </button>
          </div>

          {rsvp === 'yes' && (
            <p className="rsvp-message rsvp-yes" role="status">
              You just made my day, Sai! ❤️
            </p>
          )}
          {rsvp === 'no' && (
            <p className="rsvp-message rsvp-no" role="status">
              That&apos;s okay, Sai. You can always share what&apos;s on your mind. ❤️
            </p>
          )}
          <p className="rsvp-note">
            Your choice stays on this device only and resets if you reload the page.
          </p>
        </div>
      </section>

      {celebrate && (
        <div className="celebration" aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <span
              key={i}
              className="burst-heart"
              style={{
                left: `${10 + (i * 4.2) % 80}%`,
                animationDelay: `${(i % 8) * 0.08}s`,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      )}

      <footer className="footer">
        <p>Kishore ❤️ Sai Swaroopa · Since June 02, 2022</p>
      </footer>
    </div>
  );
}
