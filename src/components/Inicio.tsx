import React, { useState } from 'react'
import type { FC, ChangeEvent } from 'react'
import Distancias from './Distancias'

const Inicio: FC = () => {

  const [ dataSaved, setDataSaved ] = useState<boolean>(false)
  const [ title, setTitle ] = useState<string>('Sin Titulo')
  const [ totalTheoric, setTotalTheoric ] = useState<number>(0)

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handletotalTheoric = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalTheoric(parseInt(e.target.value) || 0);
  }

  const handleSave = () => {
    if (totalTheoric <= 0) {
      alert('¡Debes poner bien los metros!')
      return
    }
    setDataSaved(true)
  }

  if (dataSaved) return <Distancias title={title} totalTheoric={totalTheoric} />

  return (
    <>
      <h3 className='m-3'>¿Cómo se llama el tramo?</h3>
      <input className='mb-3' type="text" onChange={handleTitle}/>
      <h3 className='m-3'>¿Cuál es la distancia total teórica?</h3>
      <input className='mb-3' type="number"  onChange={handletotalTheoric}/>
      <span className='m-3'> metros</span>
      <div className='m-3'>
        <button className='btn btn-primary btn-lg' onClick={handleSave}>Comenzar</button>
      </div>
    </>
  )
}

export default Inicio;
