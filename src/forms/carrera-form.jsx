import { Button } from '@/components/button'
import styles from './from.module.css'
import { Input } from '@/components/input'

const fields = {
  nombre: 'nombre',
}

export const CarreraForm = ({ handleSubmit }) => {
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()

        let values = {}

        for (const [key, val] of Object.entries(fields)) {
          values[key] = e.target[val].value
        }

        handleSubmit(values)
        e.target.reset()
      }}
    >
      <div>
        <h3>Añadir nueva carrera</h3>
        <Input
          label="Nombre de la carrera"
          name={fields.nombre}
          placeholder="Mi carrera"
          type="text"
          required
        />
      </div>
      <div className={styles.btnBox}>
        <Button type="submit">Agregar</Button>
      </div>
    </form>
  )
}
