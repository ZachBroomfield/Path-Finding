import Grid from './Grid.js'
import GridBoxes from './GridBoxes.js'
import GridLine from './GridLine.js'
import Vector2D from './Vector2D.js'

interface Dimensions {
  width: number
  height: number
}

interface Point {
  x: number
  y: number
}

interface CreateParams {
  dimensions: Dimensions
  canvasSize: Dimensions
}

export default class GridFactory {
  static create(params: CreateParams) {
    return this.#createGrid(params.dimensions, params.canvasSize)
  }

  static #createGrid(dimensions: Dimensions, canvasSize: Dimensions) {
    dimensions = this.#normaliseDimensions(dimensions)

    const midPoint = this.#calcMidPoint(canvasSize)

    const spacing = this.#calcSpacing(dimensions, canvasSize)

    const topLeft = this.#calcTopLeft(dimensions, spacing, midPoint)

    const gridLines = this.#createGridLines(dimensions, spacing, topLeft)

    const boxes = new GridBoxes(dimensions)

    const coordToPosition = this.#generateCoordToPosition(spacing, topLeft)

    const positionToCoord =
      this.#generatePositionToCoord(spacing, topLeft, dimensions)

    return new Grid({
      dimensions,
      topLeft,
      gridLines,
      boxes,
      spacing,
      coordToPosition,
      positionToCoord
    })
  }

  static #generateCoordToPosition(
    spacing: number,
    topLeft: Vector2D
    ): (arg: Point) => Point {

    const offset = (spacing) / 2

    return (coordinates: Point) => {
      return {
        x: topLeft.x + offset + (spacing * (coordinates.x - 1)),
        y: topLeft.y + offset + (spacing * (coordinates.y - 1)),
      }
    }
  }

  static #generatePositionToCoord(
    spacing: number,
    topLeft: Vector2D,
    dimensions: Dimensions
  ): (arg: Point) => Point | null {
    
    return (position: Point) => {
      if (!this.#checkPosInBounds(position, topLeft, dimensions, spacing)) {
        return null
      }

      return {
        x: Math.ceil((position.x - topLeft.x) / spacing),
        y: Math.ceil((position.y - topLeft.y) / spacing)
      }
    }
  }

  static #checkPosInBounds(
    position: Point,
    topLeft: Point,
    dimensions: Dimensions,
    spacing: number
  ) {
    return (
      position.x > topLeft.x &&
      position.y > topLeft.y &&
      position.x < topLeft.x + dimensions.width * spacing &&
      position.y < topLeft.y + dimensions.height * spacing
    )
  }

  static #normaliseDimensions(dimensions: Dimensions): Dimensions {
    return {
      width: Math.min(dimensions.width, 300),
      height: Math.min(dimensions.height, 200)
    }
  }

  static #calcMidPoint(canvasSize: Dimensions): Vector2D {
    return new Vector2D(canvasSize.width / 2, canvasSize.height / 2)
  }

  static #calcSpacing(
    dimensions: Dimensions,
    canvasSize: Dimensions,
    scale: number = 1
  ): number {

    const maxW = Math.floor(canvasSize.width * scale)
    const maxH = Math.floor(canvasSize.height * scale)
    const wSpacing = Math.floor((maxW - dimensions.width) / dimensions.width)
    const hSpacing = Math.floor((maxH - dimensions.height) / dimensions.height)

    return Math.min(wSpacing, hSpacing)
  }

  static #calcTopLeft(
    dimensions: Dimensions,
    spacing: number,
    midPoint: Vector2D
  ): Vector2D {

    return new Vector2D({
      x: Math.round(midPoint.x - (dimensions.width * spacing) / 2),
      y: Math.round(midPoint.y - (dimensions.height * spacing) / 2)
    })
  }

  static #createGridLines(
    dimensions: Dimensions,
    spacing: number,
    topLeft: Vector2D
  ): GridLine[] {
    
    const gridLines: GridLine[] = []
    const height = this.#calcHeight(dimensions, spacing)
    const width = this.#calcWidth(dimensions, spacing)

    for (let i = 0; i <= dimensions.width; i++) {
      gridLines.push(
        new GridLine({
          start: new Vector2D({
            x: topLeft.x + i * spacing,
            y: topLeft.y
          }),
          end: new Vector2D({
            x: topLeft.x + i * spacing,
            y: topLeft.y + height
          })
        })
      )
    }

    for (let i = 0; i <= dimensions.height; i++) {
      gridLines.push(
        new GridLine({
          start: new Vector2D({
            x: topLeft.x ,
            y: topLeft.y + i * spacing
          }),
          end: new Vector2D({
            x: topLeft.x + width,
            y: topLeft.y + i * spacing
          })
        })
      )
    }

    return gridLines
  }

  static #calcHeight(dimensions: Dimensions, spacing: number) {
    return dimensions.height * spacing
  }

  static #calcWidth(dimensions: Dimensions, spacing: number) {
    return dimensions.width * spacing
  }
}