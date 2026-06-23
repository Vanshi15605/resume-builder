/**
 * App.jsx
 *
 * Root layout component — the two-panel shell.
 *
 * Tree:
 *   <App>
 *     <Header onDownload={handleDownload} />
 *     <div.app-body>
 *       <div.left-panel>
 *         <Sidebar />           ← section tab navigation
 *         <div.form-content>    ← Phase 2: active form rendered here
 *       <div.right-panel>
 *         <div.preview-scroll>
 *           <div.resume-paper>  ← Phase 3: ResumePreview rendered here
 *
 * Phase notes:
 *   Phase 2 — replace the left placeholder with a form-switcher
 *   Phase 3 — replace the right placeholder with <ResumePreview />
 *   Phase 4 — implement handleDownload using pdfExport.js
 */

import './App.css';
import Header  from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import { useResumeData } from './hooks/useResumeData';

function App() {
  const { state } = useResumeData();

  /* ── PDF download ────────────────────────────────────────────
   * Phase 4 will replace this stub with:
   *   import { exportToPdf } from './utils/pdfExport';
   *   exportToPdf('resume-paper');
   * ──────────────────────────────────────────────────────────── */
  function handleDownload() {
    console.info('[Phase 4] PDF export — not yet implemented.');
  }

  return (
    <div className="app">

      {/* ── Top bar ─────────────────────────────────────────── */}
      <Header onDownload={handleDownload} />

      {/* ── Two-panel body ──────────────────────────────────── */}
      <div className="app-body">

        {/* LEFT PANEL — editor */}
        <div className="left-panel">

          {/* Section tab navigation */}
          <Sidebar />

          {/* Form area ─── Phase 2 will render the active form here.
              Replace this placeholder block entirely in Phase 2:

              import FormSwitcher from './components/forms/FormSwitcher';
              <div className="form-content">
                <FormSwitcher activeSection={state.activeSection} />
              </div>
          */}
          <div className="form-content">
            <div className="phase-placeholder">
              <span className="phase-placeholder-icon" aria-hidden="true">🚧</span>
              <h2>Phase 2 — Forms</h2>
              <p>
                The{' '}
                <strong>
                  {/* Humanise the key for display */}
                  {state.activeSection.charAt(0).toUpperCase() +
                    state.activeSection.slice(1)}
                </strong>{' '}
                form will be built here in Phase 2.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL — resume preview */}
        <div className="right-panel">
          <div className="preview-scroll">

            {/*
             * id="resume-paper" — html2pdf.js targets this element in Phase 4.
             * Do NOT rename this id.
             */}
            <div className="resume-paper" id="resume-paper">

              {/* Phase 3 will replace this placeholder with <ResumePreview /> */}
              <div className="phase-placeholder phase-placeholder--preview">
                <span className="phase-placeholder-icon" aria-hidden="true">👁️</span>
                <h2>Live Preview</h2>
                <p>Your resume will appear here in Phase 3.</p>

                {/* Show pre-filled name so the user can confirm defaultData loaded */}
                {state.personalInfo.fullName && (
                  <p className="preview-name-hint">
                    Editing resume for:{' '}
                    <strong>{state.personalInfo.fullName}</strong>
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
