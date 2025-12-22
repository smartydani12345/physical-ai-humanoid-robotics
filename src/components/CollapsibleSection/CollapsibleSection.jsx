import React, { useState } from 'react';
import styles from './CollapsibleSection.module.css';

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.collapsibleSection}>
      <button
        className={`${styles.toggleButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span className={styles.title}>{title}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;