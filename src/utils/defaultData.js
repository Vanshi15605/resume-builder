/**
 * defaultData.js
 *
 * Seed / initial state for the resume.
 * - personalInfo is pre-filled with Vanshika Sharma's details.
 * - All array sections start empty; entries are added via forms in Phase 2.
 *
 * Shape contract:
 *   Every array entry added later MUST include a unique `id` (from uuid).
 *   The reducer helpers (addItem / updateItem / removeItem) rely on `id`.
 */

export const defaultResumeData = {

  /* ── Single-object section ── */
  personalInfo: {
    fullName:  'Vanshika Sharma',
    jobTitle:  'Software Developer',
    email:     'vanshikasharma15605@gmail.com',
    phone:     '',
    location:  '',
    linkedin:  '',
    github:    '',
    website:   '',
    summary:   '',
  },

  /* ── Array sections ──────────────────────────────────────────
     Each item added via a form will follow this shape:
       education:      { id, institution, degree, field, gpa, startDate, endDate, current }
       skills:         { id, name, level }          level: 'beginner'|'intermediate'|'advanced'|'expert'
       experience:     { id, company, role, startDate, endDate, current, description }
       projects:       { id, name, techStack, link, description }
       certifications: { id, name, issuer, date, credentialUrl }
       languages:      { id, language, proficiency } proficiency: 'beginner'|'conversational'|'fluent'|'native'
     ──────────────────────────────────────────────────────────── */
  education:      [],
  skills:         [],
  experience:     [],
  projects:       [],
  certifications: [],
  languages:      [],
};
