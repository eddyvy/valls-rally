import { forwardRef } from 'react'
import styles from './button-small.module.css'

export const ButtonSmall = forwardRef(function ButtonSmall({ ...props }, ref) {
  return <button className={styles.btn} ref={ref} {...props} />
})
