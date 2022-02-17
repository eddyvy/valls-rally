import React, { useState, useEffect, useRef } from 'react'
import type { FC } from 'react'
import type { PointCalculated } from './Distancias'
import downloadElementAsPDF from '../helper/downloadElementAsPDF'


type Props = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  pointsCalculated: PointCalculated[]
  title: string
}

const CalculatedModal: FC<Props> = ({ showModal, setShowModal, pointsCalculated, title }: Props) => {

  const modalRef = useRef<HTMLDivElement>(null)
  const modalContentRef = useRef<HTMLDivElement>(null)
  const [ loading, setLoading ] = useState<boolean>(false)

  const closeModal = () => {
    setShowModal(false)
  }

  const handleDownload = () => {
    setLoading(true)
    downloadElementAsPDF(modalContentRef.current!, title).then(() => {
      setLoading(false)
      closeModal()
    })
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
        <div ref={modalContentRef}>
          <header className='d-flex justify-content-center'>
            <h4>{title}</h4>
          </header>
          <div className='tabla-container m-3' >
            <table className='tabla'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Punto</th>
                  <th>Distancia</th>
                  <th>Nivel</th>
                  <th>Diff</th>
                </tr> 
              </thead>
              <tbody>
                {
                  pointsCalculated.map((point, idx) => (
                    <tr key={idx}>
                      <th>{idx}</th>
                      <th>{point.name}</th>
                      <th>{point.distanceA}</th>
                      <th>{point.level}</th>
                      <th>{(point.diff >= 0) ? `+ ${point.diff}` : `- ${Math.abs(point.diff)}`} m</th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <button className="btn btn-primary me-3" onClick={handleDownload} disabled={loading}>Descargar</button>
          <button className="btn btn-secondary ms-3" onClick={closeModal} disabled={loading}>Cancelar</button>
          {
            loading && <p>Cargando...</p>
          }
        </div>
      </div>
    </div>
  )
}

export default CalculatedModal
