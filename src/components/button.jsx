import { forwardRef } from 'react'
import styles from './button.module.css'

export const Button = forwardRef(function Button({ ...props }, ref) {
  return <button className={styles.btn} ref={ref} {...props} />
})
