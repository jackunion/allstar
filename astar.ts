import { PriorityQueue } from './PriorityQueue'

interface Point {
  x: number
  y: number
}

interface AStar {
  map: any
  start: Point
  end: Point
  getNeighbors: any
  walkFunction: any
}

const manhattan = (start: Point, end: Point) => {
  const { x: x0, y: y0 } = start
  const { x: x1, y: y1 } = end

  return Math.abs(x0 - x1) + Math.abs(y0 - y1)
}

const defaultGetNeighbors = (point: Point, width: number, height: number) => {
  const { x, y } = point
  const neighbors: Point[] = []

  if (x > 0) neighbors.push({ x: x - 1, y: y })
  if (y > 0) neighbors.push({ x: x, y: y - 1 })
  if (x < width - 1) neighbors.push({ x: x + 1, y: y })
  if (y < height - 1) neighbors.push({ x: x, y: y + 1 })

  return neighbors
}

export const astar = ({
  map,
  start,
  end,
  getNeighbors = defaultGetNeighbors,
  walkFunction,
}: AStar) => {
  return []
}
