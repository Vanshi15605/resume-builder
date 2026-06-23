/**
 * ResumeContext.jsx
 *
 * Global state management for the entire resume builder.
 *
 * Architecture:
 *   React Context  →  single context object shared app-wide
 *   useReducer     →  predictable, action-based state transitions
 *   localStorage   →  automatic persistence on every state change
 *
 * Three named exports:
 *   ACTIONS        →  object of action type string constants
 *   ResumeProvider →  wrap <App /> with this in main.jsx
 *   ResumeContext  →  consumed by useResumeData hook (not used directly)
 */

import { createContext, useReducer, useEffect } from 'react';
import { defaultResumeData } from '../utils/defaultData';

/* ================================================================
   ACTION TYPES
   Use these constants everywhere instead of raw strings to prevent
   typo bugs. Import { ACTIONS } wherever you call dispatch().
   ================================================================ */
export const ACTIONS = {

  /* UI navigation */
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',

  /* Personal info — single object, not an array */
  UPDATE_PERSONAL: 'UPDATE_PERSONAL',

  /* Education */
  ADD_EDUCATION:        'ADD_EDUCATION',
  UPDATE_EDUCATION:     'UPDATE_EDUCATION',
  REMOVE_EDUCATION:     'REMOVE_EDUCATION',

  /* Skills */
  ADD_SKILL:            'ADD_SKILL',
  UPDATE_SKILL:         'UPDATE_SKILL',
  REMOVE_SKILL:         'REMOVE_SKILL',

  /* Experience */
  ADD_EXPERIENCE:       'ADD_EXPERIENCE',
  UPDATE_EXPERIENCE:    'UPDATE_EXPERIENCE',
  REMOVE_EXPERIENCE:    'REMOVE_EXPERIENCE',

  /* Projects */
  ADD_PROJECT:          'ADD_PROJECT',
  UPDATE_PROJECT:       'UPDATE_PROJECT',
  REMOVE_PROJECT:       'REMOVE_PROJECT',

  /* Certifications */
  ADD_CERTIFICATION:    'ADD_CERTIFICATION',
  UPDATE_CERTIFICATION: 'UPDATE_CERTIFICATION',
  REMOVE_CERTIFICATION: 'REMOVE_CERTIFICATION',

  /* Languages */
  ADD_LANGUAGE:         'ADD_LANGUAGE',
  UPDATE_LANGUAGE:      'UPDATE_LANGUAGE',
  REMOVE_LANGUAGE:      'REMOVE_LANGUAGE',

  /* Wipe everything and restore to defaults */
  RESET_RESUME: 'RESET_RESUME',
};

/* ================================================================
   LOCAL STORAGE — key and helpers
   ================================================================ */
const STORAGE_KEY = 'resume_builder_v1';

/**
 * loadInitialState
 * Called once as the `init` argument to useReducer.
 * Tries to restore saved data from localStorage; falls back to defaults.
 * `activeSection` is runtime-only UI state — never persisted.
 */
function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      return { ...saved, activeSection: 'personal' };
    }
  } catch {
    /* JSON parse error or storage access blocked — use defaults */
  }
  return { ...defaultResumeData, activeSection: 'personal' };
}

/* ================================================================
   ARRAY HELPERS
   Pure functions used inside the reducer to avoid repetition.
   ================================================================ */

/** Append a new item to an array. */
const addItem = (arr, item) => [...arr, item];

/**
 * Merge `fields` into the element whose `id` matches.
 * dispatch({ type: ACTIONS.UPDATE_EDUCATION,
 *            payload: { id: '...', fields: { degree: 'B.Sc' } } })
 */
const updateItem = (arr, id, fields) =>
  arr.map(el => (el.id === id ? { ...el, ...fields } : el));

/** Remove the element with the given `id`. */
const removeItem = (arr, id) => arr.filter(el => el.id !== id);

/* ================================================================
   REDUCER
   Pure function — no side-effects. Maps (state, action) → newState.
   ================================================================ */
function resumeReducer(state, action) {
  switch (action.type) {

    /* ── UI ── */
    case ACTIONS.SET_ACTIVE_SECTION:
      return { ...state, activeSection: action.payload };

    /* ── Personal info ── */
    case ACTIONS.UPDATE_PERSONAL:
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };

    /* ── Education ── */
    case ACTIONS.ADD_EDUCATION:
      return { ...state, education: addItem(state.education, action.payload) };
    case ACTIONS.UPDATE_EDUCATION:
      return {
        ...state,
        education: updateItem(state.education, action.payload.id, action.payload.fields),
      };
    case ACTIONS.REMOVE_EDUCATION:
      return { ...state, education: removeItem(state.education, action.payload) };

    /* ── Skills ── */
    case ACTIONS.ADD_SKILL:
      return { ...state, skills: addItem(state.skills, action.payload) };
    case ACTIONS.UPDATE_SKILL:
      return {
        ...state,
        skills: updateItem(state.skills, action.payload.id, action.payload.fields),
      };
    case ACTIONS.REMOVE_SKILL:
      return { ...state, skills: removeItem(state.skills, action.payload) };

    /* ── Experience ── */
    case ACTIONS.ADD_EXPERIENCE:
      return { ...state, experience: addItem(state.experience, action.payload) };
    case ACTIONS.UPDATE_EXPERIENCE:
      return {
        ...state,
        experience: updateItem(state.experience, action.payload.id, action.payload.fields),
      };
    case ACTIONS.REMOVE_EXPERIENCE:
      return { ...state, experience: removeItem(state.experience, action.payload) };

    /* ── Projects ── */
    case ACTIONS.ADD_PROJECT:
      return { ...state, projects: addItem(state.projects, action.payload) };
    case ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: updateItem(state.projects, action.payload.id, action.payload.fields),
      };
    case ACTIONS.REMOVE_PROJECT:
      return { ...state, projects: removeItem(state.projects, action.payload) };

    /* ── Certifications ── */
    case ACTIONS.ADD_CERTIFICATION:
      return { ...state, certifications: addItem(state.certifications, action.payload) };
    case ACTIONS.UPDATE_CERTIFICATION:
      return {
        ...state,
        certifications: updateItem(state.certifications, action.payload.id, action.payload.fields),
      };
    case ACTIONS.REMOVE_CERTIFICATION:
      return { ...state, certifications: removeItem(state.certifications, action.payload) };

    /* ── Languages ── */
    case ACTIONS.ADD_LANGUAGE:
      return { ...state, languages: addItem(state.languages, action.payload) };
    case ACTIONS.UPDATE_LANGUAGE:
      return {
        ...state,
        languages: updateItem(state.languages, action.payload.id, action.payload.fields),
      };
    case ACTIONS.REMOVE_LANGUAGE:
      return { ...state, languages: removeItem(state.languages, action.payload) };

    /* ── Reset ── */
    case ACTIONS.RESET_RESUME:
      return { ...defaultResumeData, activeSection: 'personal' };

    default:
      /* Unknown action — return state unchanged (no crash) */
      return state;
  }
}

/* ================================================================
   CONTEXT
   Exported so useResumeData can reference it.
   Components should NOT import this directly — use useResumeData().
   ================================================================ */
export const ResumeContext = createContext(null);

/* ================================================================
   PROVIDER
   Place this at the top of the component tree (in main.jsx).
   Provides { state, dispatch } to all descendants.
   ================================================================ */
export function ResumeProvider({ children }) {
  /*
   * Pass `loadInitialState` as the third (init) argument so it only
   * runs once on mount — not on every re-render.
   */
  const [state, dispatch] = useReducer(resumeReducer, undefined, loadInitialState);

  /**
   * Persist to localStorage on every state change.
   * We deliberately omit `activeSection` from the saved object because
   * it is transient UI state — the user always starts on 'personal'.
   */
  useEffect(() => {
    const { activeSection, ...dataToSave } = state;  // eslint-disable-line no-unused-vars
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      /* Storage quota exceeded or private-mode restriction — fail silently */
    }
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}
