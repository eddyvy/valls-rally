import { Button } from '@/components/button'
import styles from './from.module.css'
import { Input } from '@/components/input'

const fields = {
  user: 'user',
  password: 'password',
}

export const LoginForm = ({ handleSubmit, loading }) => {
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
      }}
    >
      <div>
        <br />
        <Input
          label="Usuario"
          name={fields.user}
          type="text"
          required
          disabled={loading}
        />
        <Input
          label="Contraseña"
          name={fields.password}
          type="password"
          required
          disabled={loading}
        />
      </div>
      <br />
      <Button type="submit" disabled={loading}>
        Acceder
      </Button>
    </form>
  )
}
