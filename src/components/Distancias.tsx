import React, { useState } from 'react'
import type { FC } from 'react'
import Swal from 'sweetalert2'
import AddModal from './AddModal'
import fakePoints from '../assets/fakePoints'
import CalculatedModal from './CalculatedModal'
import calculate from '../helper/calculate'

export type Level = 0 | 1 | 2 | 3

export type Point = {
  name: string
  level: Level
  distanceA: number
}

export type PointCalculated = Point & {
  distanceB: number
  diff: number
}

type Props = {
  title: string
  totalTheoric: number
}

const Distancias: FC<Props> = ({ title, totalTheoric }: Props) => {

  const initialPoint: Point = {
    name: 'Punto Inicial',
    level: 0,
    distanceA: 0
  }

  const [ points, setPoints ] = useState<Point[]>([ initialPoint ])
  const [ pointsCalculated, setPointsCalculated ] = useState<PointCalculated[]>([])
  const [ showAddModal, setShowAddModal ] = useState<boolean>(false)
  const [ showCalculateModal, setShowCalculateModal ] = useState<boolean>(false)

  const handleAdd = () => {
    setShowAddModal(true)
  }

  const handleRemove = () => {
    Swal.fire({
      title: '¿Seguro?',
      text: "Borrarás el último punto",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setPoints(points.filter((_, idx) => idx !== points.length - 1))
      }
    })
  }

  const handleCalculate = () => {
    setPointsCalculated(calculate(points, totalTheoric))
    setShowCalculateModal(true)
  }

  return (
    <>
      <AddModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        points={points}
        setPoints={setPoints}
      />
      <CalculatedModal
        showModal={showCalculateModal}
        setShowModal={setShowCalculateModal}
        pointsCalculated={pointsCalculated}
        title={title}
      />
      <h1 className='m-3'>{title}</h1>
      <h3 className='mb-3'>Distancia total teórica: {totalTheoric} m</h3>
      <div className='tabla-container' >
        <table className='tabla'>
          <thead>
            <tr>
              <th>#</th>
              <th>Punto</th>
              <th>Distancia</th>
              <th>Nivel</th>
            </tr> 
          </thead>
          <tbody>
            {
              points.map((point, idx) => (
                <tr key={idx}>
                  <th>{idx}</th>
                  <td>{point.name}</td>
                  <td>{point.distanceA} m</td>
                  <td>{point.level}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='container mt-5 mb-5'>
        <button className='btn btn-success me-3' onClick={handleAdd}>Añadir Punto</button>
        <button className='btn btn-danger ms-3 me-5' onClick={handleRemove}>Eliminar Punto</button>
        <button className='btn btn-primary btn-lg ms-5' onClick={handleCalculate}>Calcular</button>
      </div>
    </>
  )
}

export default Distancias
