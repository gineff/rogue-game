import resources from '@game/mocks/resources'
import * as Types from '@type/game'

export default class GameObject implements Types.GameObjectDef {
  name!: Types.GameObjectName
  view!: Types.GameObjectViewDef
  spriteImage = resources.images['tileset']
  spritePos?: Types.Coords
  motions?: Types.CellSpriteMotions
  cell?: Types.LevelMapCell
  crossable = false
  static = true
  animated = false
  destroyable = false // DEPRICATED, use Destroyable behavior delegate
  remove(): Types.GameObjectDef {
    this.view.toggle(false)
    this.cell?.extract(this)
    return this
  }
  get isOnMap() {
    return !!this.cell
  }
}
