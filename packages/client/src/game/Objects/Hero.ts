import GameObject from '@game/Objects/GameObject'
import * as Types from '@game/core/types'
import heroSrc from '@sprites/hero.png'
import { heroMotions } from '@game/animations/hero'
import UnitView from '@game/core/views/UnitView'

export default class Hero extends GameObject {
  declare view:UnitView
  constructor() {
    super()
    this.name = Types.GameUnitName.hero
    this.sprite = { source: heroSrc }
    this.motions = heroMotions
    this.crossable = false
    this.static = false
    this.animated = true
    this.destroyable = true
  }
}
