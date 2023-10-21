import { Select } from '@/components/select'
import styles from './page.module.css'
import { useState, useMemo, useId, useCallback } from 'react'
import { Grid } from '@/components/grid'
import { calcularTramos } from '@/func/calculo'
import { Modal } from '@/components/modal'
import { Button } from '@/components/button'
import { ButtonSmall } from '@/components/button-small'
import { CarreraForm } from '@/forms/carrera-form'
import { TramoForm } from '@/forms/tramo-form'
import { TramoFormEdit } from '@/forms/tramo-form-edit'
import axios from 'axios'

/**
 * type Tramo = {
 *  nombre: string
 *  metro: number
 *  metroTeorico?: number | null
 * }
 *
 * type Carrera = {
 *  nombre: string
 *  tramos: Tramo[]
 * }
 *
 * type Datos = Carrera[]
 */

export function Rally({ datosIniciales, session }) {
  const [datos, setDatos] = useState(datosIniciales)
  const [carrera, setCarrera] = useState(datosIniciales.length - 1)

  const carreras = datos.map((d) => d.nombre)
  const tramos = datos[carrera]?.tramos
  const tramosCalculated = useMemo(
    () => (tramos ? calcularTramos(tramos) : undefined),
    [datos, carrera]
  )

  const [openModalCarrera, setOpenModalCarrera] = useState(false)
  const [openModalTramo, setOpenModalTramo] = useState(false)
  const [openModalTramoEdit, setOpenModalTramoEdit] = useState(false)
  const [tramoSelected, setTramoSelected] = useState(null)

  const gridId = useId()

  const handleUpdate = (d) => {
    axios
      .post('/api/carreras', d, {
        headers: { Authorization: 'Bearer ' + session },
      })
      .then(() => {})
      .catch(({ response: { data } }) => {
        alert(data?.message || 'Error haciendo login')
      })
  }

  const crearCarrera = (vals) => {
    const newDatos = [
      ...datos,
      {
        nombre: vals.nombre,
        tramos: [],
      },
    ]

    setDatos(newDatos)
    handleUpdate(newDatos)
    setCarrera(newDatos.length - 1)
  }

  const crearTramo = (vals) => {
    const newDatos = [...datos]
    newDatos[carrera].tramos.push({
      nombre: vals.nombre,
      metro: Number(vals.metro),
      ...(vals.metroTeorico ? { metroTeorico: Number(vals.metroTeorico) } : {}),
    })

    setDatos(newDatos)
    handleUpdate(newDatos)
  }

  const modificarTramo = (vals) => {
    if (tramoSelected?.index === undefined) return
    const newDatos = [...datos]
    newDatos[carrera].tramos = newDatos[carrera].tramos.map((d, idx) => {
      if (idx !== tramoSelected.index) return d
      return {
        nombre: vals.nombre,
        metro: Number(vals.metro),
        ...(vals.metroTeorico
          ? { metroTeorico: Number(vals.metroTeorico) }
          : {}),
      }
    })
    setDatos(newDatos)
    handleUpdate(newDatos)
  }

  const borrarTramo = () => {
    if (tramoSelected?.index === undefined) return
    const newDatos = [...datos]
    newDatos[carrera].tramos = newDatos[carrera].tramos.filter(
      (_, idx) => idx !== tramoSelected.index
    )

    setDatos(newDatos)
    handleUpdate(newDatos)
  }

  return (
    <>
      <div className={styles.botonera}>
        <div>
          <div className={styles.botoneraSmall}>
            <h4>Carrera</h4>
            <ButtonSmall onClick={() => setOpenModalCarrera(true)}>
              +
            </ButtonSmall>
          </div>
          <Select
            options={carreras.map((c, i) => ({ value: i, label: c }))}
            value={carrera}
            onChange={(e) => {
              setCarrera(e.target.value)
            }}
          />
        </div>
        <div className={styles.botoneraVarios}>
          <Button onClick={() => setOpenModalTramo(true)}>Añadir Tramo</Button>
          <Button
            onClick={() => setOpenModalTramoEdit(true)}
            disabled={!tramoSelected}
          >
            Modif. Tramo
          </Button>
        </div>
      </div>
      <Modal open={openModalCarrera} onClose={() => setOpenModalCarrera(false)}>
        <CarreraForm
          handleSubmit={(vals) => {
            setOpenModalCarrera(false)
            crearCarrera(vals)
          }}
        />
      </Modal>
      {tramos && (
        <>
          <Grid
            id={gridId}
            tramos={tramosCalculated}
            selectedRow={tramoSelected?.index}
            onRowClick={(idx) => {
              setTramoSelected({ tramo: tramos[idx], index: idx })
            }}
          />
          <div className={styles.botonera}>
            <Button
              onClick={() => {
                print(gridId)
              }}
            >
              Imprimir
            </Button>
          </div>
          <Modal open={openModalTramo} onClose={() => setOpenModalTramo(false)}>
            <TramoForm
              index={tramos.length}
              handleSubmit={(vals) => {
                setOpenModalTramo(false)
                crearTramo(vals)
              }}
            />
          </Modal>
          <Modal
            open={openModalTramoEdit}
            onClose={() => setOpenModalTramoEdit(false)}
          >
            {tramoSelected ? (
              <TramoFormEdit
                index={tramoSelected.index}
                tramo={tramoSelected.tramo}
                handleSubmit={(vals) => {
                  setOpenModalTramoEdit(false)
                  modificarTramo(vals)
                }}
                handleDelete={() => {
                  setOpenModalTramoEdit(false)
                  borrarTramo()
                }}
              />
            ) : (
              <p>cargando...</p>
            )}
          </Modal>
        </>
      )}
    </>
  )
}
