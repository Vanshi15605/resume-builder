/**
 * main.jsx
 *
 * React entry point — mounts the app into <div id="root">.
 *
 * Wrapping order (outer → inner):
 *   StrictMode       →  highlights potential problems in development
 *   ResumeProvider   →  makes { state, dispatch } available everywhere
 *   App              →  the actual UI
 *
 * Note: index.css is imported here so it loads exactly once,
 * before any component renders.
 */

import { StrictMode }      from 'react';
import { createRoot }      from 'react-dom/client';
import { ResumeProvider }  from './context/ResumeContext';
import App                 from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ResumeProvider must be the outermost wrapper so that every
        component in the tree can call useResumeData() freely. */}
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </StrictMode>,
);
