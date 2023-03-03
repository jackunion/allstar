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
  interface ILocation extends Point {
    priority: number
  }

  class Location implements ILocation {
    x: number
    y: number
    key: number
    priority: number

    constructor(point: Point) {
      this.x = point.x
      this.y = point.y
      this.key = (this.y << 16) | this.x
      this.priority = 0
    }
  }

  const startLocation = new Location(start)
  const endLocation = new Location(end)

  const frontier = new PriorityQueue<Location>(
    (a, b) => a.priority - b.priority,
    [new Location(start)],
  )

  const visited: { [n: number]: Location } = {}
  const score: { [n: number]: number } = { [startLocation.key]: 0 }

  while (!frontier.isEmpty()) {
    const current: Location = frontier.pop()!

    if (current.key === endLocation.key) {
      break
    }

    getNeighbors(current, 10, 10).forEach((neighbor: Point) => {
      const next = new Location(neighbor)
      const nextScore = score[current.key]! + 1

      if (score[next.key] === undefined || nextScore < score[next.key]!) {
        visited[next.key] = current
        score[next.key] = nextScore
        next.priority = nextScore + manhattan(current, next)
        frontier.push(next)
      }
    })
  }

  return visited
}
