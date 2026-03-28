import type React from 'react';
import styles from './errorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps): React.ReactElement {
  return (
    <div className={styles.error} role="alert">
      <span className={styles.message}>{message}</span>
      <button
        type="button"
        className={styles.dismiss}
        onClick={onDismiss}
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
}
