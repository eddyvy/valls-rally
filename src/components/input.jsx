import { forwardRef, useId } from 'react'
import styles from './input.module.css'

export const Input = forwardRef(function Input({ label, ...props }, ref) {
  const id = props?.id ? props.id : useId()
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>{label}</label>
      <input ref={ref} {...props} id={id} />
    </div>
  )
})
