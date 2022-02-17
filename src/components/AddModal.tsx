import React, { useState, useEffect, useRef } from 'react'
import type { FC } from 'react'
import Swal from 'sweetalert2'
import type { Level, Point } from './Distancias'

type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  points: Point[]
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>
}

const AddModal: FC<Props> = ({ showModal, setShowModal, points, setPoints }: Props) => {

  const modalRef = useRef<HTMLDivElement>(null)
  const [ editingPoint, setEditingPoint ] = useState<Point>({
    name: 'Sin Nombre',
    distanceA: 0,
    level: 0,
  })

  const closeModal = () => {
    setShowModal(false)
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingPoint({
      ...editingPoint,
      name: e.target.value
    })
  }

  const handleDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingPoint({
      ...editingPoint,
      distanceA: parseInt(e.target.value) || 0
    })
  }

  const handleLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditingPoint({
      ...editingPoint,
      level: parseInt(e.target.value) as Level
    })
  }


  const handleSave = () => {
    if (editingPoint.distanceA <= points[points.length - 1].distanceA) {
      Swal.fire(
        '¡Distancia inválida!',
        'Escribe la distancia de nuevo',
        'warning'
      )
      return
    }
    setPoints([ ...points, editingPoint ])
    setShowModal(false)
  }

  useEffect(() => {
    window.onclick = function(event) {
      if (event.target == modalRef.current) {
        closeModal()
      }
    } 
  }, [])

  return (
    <div className={`modal ${showModal ? 'modal-show' : ''}`} ref={modalRef}>
      <div className="modal-content">
        <header className='d-flex justify-content-center'>
          <h4>Agrega el siguiente punto</h4>
        </header>
        <div>
          <div className='container m-3'>
            <div className="row">
              <div className="col">
                <p>#</p>
                <span>{points.length}</span>
              </div>
              <div className="col">
                <p>Punto</p>
                <input onChange={handleName} type="text" placeholder="Nombre" />
              </div>
              <div className="col">
                <p>Distancia</p>
                <input onChange={handleDistance} className='block' type="number" placeholder="Metros" />
              </div>
              <div className="col">
                <p>Nivel</p>
                <select onChange={handleLevel} placeholder='nivel' className='text-align-center'>
                  <option value={0} >0</option>
                  <option value={1} >1</option>
                  <option value={2} >2</option>
                  <option value={3} >3</option>
                </select>
              </div>
            </div>
          </div>
          <button className="btn btn-primary me-3" onClick={handleSave}>Guardar</button>
          <button className="btn btn-secondary ms-3" onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}

export default AddModal
