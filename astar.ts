interface Point {
  x: number
  y: number
}

const manhattan = ({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

export const astar = () => {}
