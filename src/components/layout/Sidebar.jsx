/**
 * Sidebar.jsx
 *
 * Horizontal scrollable tab-pill navigation bar at the top of the
 * left editor panel. Each pill represents one resume section.
 *
 * Behaviour:
 *   - Reads  `activeSection` from ResumeContext.
 *   - Writes `activeSection` via SET_ACTIVE_SECTION dispatch.
 *   - The form panel in App.jsx reads `activeSection` and renders
 *     the matching form component (Phase 2).
 *
 * To add a new section later:
 *   1. Add one entry to the SECTIONS array below.
 *   2. Create the form component in components/forms/.
 *   3. Add its case to the form-switcher in App.jsx.
 *   No changes needed in this file beyond step 1.
 */

import {
  FiUser,       /* Personal Info  */
  FiBookOpen,   /* Education      */
  FiZap,        /* Skills         */
  FiBriefcase,  /* Experience     */
  FiCode,       /* Projects       */
  FiAward,      /* Certifications */
  FiGlobe,      /* Languages      */
} from 'react-icons/fi';

import { useResumeData } from '../../hooks/useResumeData';
import { ACTIONS }       from '../../context/ResumeContext';

/* ================================================================
   SECTION REGISTRY
   Central list that drives both the nav tabs and (later) the
   form-switcher. key must match the state property names in
   ResumeContext (e.g. state.education, state.skills, …).
   ================================================================ */
const SECTIONS = [
  { key: 'personal',       label: 'Personal Info',  icon: FiUser      },
  { key: 'education',      label: 'Education',      icon: FiBookOpen  },
  { key: 'skills',         label: 'Skills',         icon: FiZap       },
  { key: 'experience',     label: 'Experience',     icon: FiBriefcase },
  { key: 'projects',       label: 'Projects',       icon: FiCode      },
  { key: 'certifications', label: 'Certifications', icon: FiAward     },
  { key: 'languages',      label: 'Languages',      icon: FiGlobe     },
];

/* ================================================================
   COMPONENT
   ================================================================ */
function Sidebar() {
  const { state, dispatch } = useResumeData();
  const { activeSection }   = state;

  /** Dispatch the section change — form panel reacts automatically. */
  function handleSelect(key) {
    if (key !== activeSection) {
      dispatch({ type: ACTIONS.SET_ACTIVE_SECTION, payload: key });
    }
  }

  return (
    <nav
      className="sidebar-nav"
      role="navigation"
      aria-label="Resume section navigation"
    >
      {/* Hidden heading for screen readers */}
      <p className="sidebar-label" aria-hidden="false">Sections</p>

      <ul className="sidebar-list" role="list">
        {SECTIONS.map(({ key, label, icon: Icon }) => {
          const isActive = activeSection === key;

          return (
            <li key={key} role="listitem">
              <button
                id={`sidebar-btn-${key}`}         /* testable unique id */
                type="button"
                className={`sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
                onClick={() => handleSelect(key)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Go to ${label} section`}
              >
                {/* Section icon */}
                <Icon
                  size={15}
                  className="sidebar-item-icon"
                  aria-hidden="true"
                />

                {/* Section label */}
                <span className="sidebar-item-label">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;
