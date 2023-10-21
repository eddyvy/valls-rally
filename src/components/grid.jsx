import styles from './grid.module.css'

/**
 * type ReturnTramo {
 *  nombre: string
 *  metro: number
 *  esTeorico: boolean
 *  metroCalc: number
 *  dif: number
 * }
 */

export const Grid = ({ tramos, onRowClick, selectedRow, id }) => {
  return (
    <div className={styles.grid} id={id}>
      <div className={`${styles.gridRow} ${styles.gridRowHead}`}>
        <span>Nº</span>
        <span>Nombre</span>
        <span>Metros</span>
        <span>Calc/Org</span>
        <span>Dif</span>
      </div>
      {tramos?.map((tram, idx) => (
        <div
          key={idx}
          className={`${styles.gridRow}${
            idx === tramos.length - 1 ? ` ${styles.gridRowLast}` : ''
          }${selectedRow === idx ? ` ${styles.gridRowSelected}` : ''}${
            tram.esTeorico ? ` ${styles.gridHighlight}` : ''
          }`}
          onClick={() => onRowClick(idx)}
        >
          <span
            className={`${styles.gridBold}${
              tram.esTeorico ? ` ${styles.gridUnderline}` : ''
            }`}
          >
            {idx + 1}
          </span>
          <span className={`${styles.gridText}`}>{tram.nombre}</span>
          <span
            className={`${tram.esTeorico ? ` ${styles.gridUnderline}` : ''}`}
          >
            {tram.metro.toString()}
          </span>
          <span
            className={`${styles.gridBold}${
              tram.esTeorico ? ` ${styles.gridUnderline}` : ''
            }`}
          >
            {tram.metroCalc.toString()}
          </span>
          <span className={`${styles.gridText}`}>{tram.dif.toString()}</span>
        </div>
      ))}
    </div>
  )
}
