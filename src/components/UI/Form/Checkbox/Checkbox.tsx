import { FunctionComponent } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onToggle?: () => void;
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({
    label,
    checked,
    onToggle,
}) => {
  return (
    <div className={styles.checkbox}>
      <input 
        type="checkbox"
        checked={checked} 
        onChange={onToggle}
      />
      {label && (
        <label className={styles.checkboxLabel}>
          <p>{label}</p>
        </label>
      )}
    </div>
  );
}
