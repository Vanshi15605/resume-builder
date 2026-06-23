/**
 * Header.jsx
 *
 * Full-width application header.
 *
 * Left  → Logo mark + app name + "by Vanshika Sharma" byline
 * Right → "Built for Digital Heroes" ghost link
 *         "Download PDF" primary button  (wired to pdfExport in Phase 4)
 *
 * Props:
 *   onDownload  {Function}  Called when the Download PDF button is clicked.
 *                           Defined in App.jsx and passed down here.
 */

import { FiDownload, FiExternalLink } from 'react-icons/fi';

function Header({ onDownload }) {
  return (
    <header className="app-header" role="banner">

      {/* ── Left: Branding ───────────────────────────────────── */}
      <div className="header-brand">

        {/* Logo mark + app name */}
        <div className="header-logo">
          {/* ✦ decorative diamond — acts as the logo icon */}
          <span className="header-logo-icon" aria-hidden="true">✦</span>
          <span className="header-logo-text">ResumeBuilder</span>
        </div>

        {/* Author credit — always visible */}
        <span className="header-tagline">by Vanshika Sharma</span>
      </div>

      {/* ── Right: Call-to-action buttons ────────────────────── */}
      <div className="header-actions">

        {/*
         * "Built for Digital Heroes" link
         * Opens in a new tab with proper security attributes.
         * id="digital-heroes-btn" for easy targeting in tests.
         */}
        <a
          id="digital-heroes-btn"
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          aria-label="Visit Digital Heroes Co — opens in new tab"
        >
          <FiExternalLink size={14} aria-hidden="true" />
          Built for Digital Heroes
        </a>

        {/*
         * Download PDF button
         * onClick is wired to App.jsx → pdfExport.js in Phase 4.
         * id="download-pdf-btn" for easy targeting in tests.
         */}
        <button
          id="download-pdf-btn"
          type="button"
          className="btn btn-primary"
          onClick={onDownload}
          aria-label="Download resume as PDF"
        >
          <FiDownload size={15} aria-hidden="true" />
          Download PDF
        </button>

      </div>
    </header>
  );
}

export default Header;
