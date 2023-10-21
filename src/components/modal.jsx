import { useEffect, useId } from 'react'
import styles from './modal.module.css'

export const Modal = ({ open, onClose, children }) => {
  const id = useId()

  useEffect(() => {
    if (open) {
      window[id].showModal()
    } else {
      window[id].close()
    }
  }, [open])

  return (
    <>
      <dialog id={id} className={styles.dialog}>
        {children}
        <button onClick={onClose} className={styles.x}>
          ❌
        </button>
      </dialog>
    </>
  )
}
