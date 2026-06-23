/**
 * useResumeData.js
 *
 * Custom hook — the only way components should access the resume context.
 *
 * Benefits of this abstraction:
 *   1. Components never import ResumeContext directly (loose coupling).
 *   2. We get a helpful runtime error if a component is accidentally
 *      rendered outside of <ResumeProvider>.
 *   3. If we ever swap the state library (e.g. Zustand), we only change
 *      this one file — all components stay untouched.
 *
 * Usage:
 *   import { useResumeData } from '../../hooks/useResumeData';
 *
 *   const { state, dispatch } = useResumeData();
 *   const { personalInfo, education, activeSection } = state;
 *
 *   dispatch({ type: ACTIONS.UPDATE_PERSONAL, payload: { fullName: 'Jane' } });
 */

import { useContext } from 'react';
import { ResumeContext } from '../context/ResumeContext';

export function useResumeData() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error(
      '[useResumeData] Hook must be called inside a <ResumeProvider>.\n' +
      'Make sure <ResumeProvider> wraps your <App /> in main.jsx.'
    );
  }

  return context;   /* { state, dispatch } */
}
