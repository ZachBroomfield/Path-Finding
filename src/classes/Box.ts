enum BoxType {
  Blank,
  Barrier,
  Start,
  End,
  Path,
  Success
}

export default class Box {
  type: BoxType

  constructor(type: BoxType = BoxType.Blank) {
    this.type = type
  }

  getColour(): string {
    switch(this.type) {
      case(BoxType.Start):
        return 'green'
        break
      case(BoxType.End):
        return 'red'
        break
      case(BoxType.Path):
        return 'blue'
        break
      case(BoxType.Success):
        return 'gold'
        break
      default:
        return 'black'
    }
  }
}