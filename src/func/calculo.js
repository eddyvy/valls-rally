/**
 * type Tramo {
 *  nombre: string
 *  metro: number
 *  metroTeorico?: number | null
 * }
 *
 * type ReturnTramo {
 *  nombre: string
 *  metro: number
 *  esTeorico: boolean
 *  metroCalc: number
 *  dif: string
 * }
 *
 * type Bloque {
 *  metro: number
 *  metroTeorico: number
 * }
 */

export function calcularTramos(tramosDatos) {
  const tramosReturn = []
  const bloques = []

  for (let i = 0; i < tramosDatos.length; i++) {
    const tram = tramosDatos[i]

    tramosReturn[i] = {
      nombre: tram.nombre,
      metro: tram.metro,
      esTeorico: false,
      metroCalc: NaN,
      dif: NaN,
    }

    if (!tram.metroTeorico) continue

    bloques.push({
      metro: tram.metro,
      metroTeorico: tram.metroTeorico,
    })
  }

  if (bloques.length <= 0) return tramosReturn

  let b = 0
  let m = (0 - bloques[b].metroTeorico) / (0 - bloques[b].metro)
  let n = bloques[b].metroTeorico - m * bloques[b].metro

  for (let i = 0; i < tramosDatos.length; i++) {
    const tram = tramosDatos[i]
    if (!tram.metroTeorico) {
      const calc = Math.round(m * tram.metro + n)
      const dif = Math.round(calc - tram.metro)

      tramosReturn[i] = {
        nombre: tram.nombre,
        metro: tram.metro,
        esTeorico: false,
        metroCalc: calc,
        dif: dif >= 0 ? '+' + dif : dif,
      }
    }

    if (tram.metroTeorico) {
      const dif = Math.round(tram.metroTeorico - tram.metro)
      tramosReturn[i] = {
        nombre: tram.nombre,
        metro: tram.metro,
        esTeorico: true,
        metroCalc: tram.metroTeorico,
        dif: dif >= 0 ? '+' + dif : dif,
      }

      if (b < bloques.length - 1) {
        b++
        m =
          (bloques[b - 1].metroTeorico - bloques[b].metroTeorico) /
          (bloques[b - 1].metro - bloques[b].metro)
        n = bloques[b].metroTeorico - m * bloques[b].metro
      }
    }
  }

  return tramosReturn
}
