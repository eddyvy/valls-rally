import { forwardRef } from 'react'
import styles from './select.module.css'

export const Select = forwardRef(function Select({ options, ...props }, ref) {
  return (
    <div className={styles.customSelect}>
      <select ref={ref} {...props}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
})
