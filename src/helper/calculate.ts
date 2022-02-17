import { Point, PointCalculated } from "../components/Distancias";

const PCT_1 = 0.33
const PCT_2 = 0.66
const PCT_3 = 1.00

const calculate = (points: Point[], totalTheoric: number): PointCalculated[] => {
  const pointsNum = points.length - 1 // not initial point
  const totalDiff = totalTheoric - points[pointsNum].distanceA
  const avgDiff = totalDiff / pointsNum

  let numOfLvl0 = 0
  let numOfLvl1 = 0
  let numOfLvl2 = 0
  let numOfLvl3 = 0
  
  points.forEach(({level}) => {
    switch (level) {
      case 0:
        numOfLvl0++
        break
      case 1:
        numOfLvl1++
        break
      case 2:
        numOfLvl2++
        break
      case 3:
        numOfLvl3++
        break
    }
  })

  const totalAvgForZeros =
    numOfLvl1 * avgDiff * PCT_1 // 33% of level 1 curves
    + numOfLvl2 * avgDiff * PCT_2 // 66% of level 2 curves
    + numOfLvl3 * avgDiff * PCT_3 // 100% of level 3 curves

  const avgFor0 = avgDiff + totalAvgForZeros / numOfLvl0
  const avgFor1 = avgDiff * (1 - PCT_1)
  const avgFor2 = avgDiff * (1 - PCT_2)
  const avgFor3 = avgDiff * (1 - PCT_3)

  return points.map(point => {

    const getAvg = (level: number): number => {
      switch (level) {
        case 1:
          return avgFor1
        case 2:
          return avgFor2
        case 3:
          return avgFor3
        default:
          return avgFor0
      }
    }

    const avg = getAvg(point.level)

    return {
      name: point.name,
      distanceA: point.distanceA,
      level: point.level,
      diff: Math.round(avg * 100) / 100,
      distanceB: point.distanceA + avg
    }
  })
}

export default calculate
