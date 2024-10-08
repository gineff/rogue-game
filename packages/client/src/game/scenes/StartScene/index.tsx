import { useEffect, useRef } from 'react'
import { BG_COLOR } from '@constants/ui'
import { useFonts } from '@hooks/useFonts'
import { useAppDispatch } from 'hooks/redux_typed_hooks'
import { startGame } from '@store/slices/game'
import { useWinSize } from '@hooks/useWinSize'
import { Text } from '@utils/fillCanvas'
import { calcCenter } from '@utils/game'
import './StartScene.scss'

// TODO unactual func for now, need work out a task and implement
function StartScene() {
  const winSize = useWinSize()
  const [width, height] = winSize
  const center = calcCenter(winSize)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fontLoaded = useFonts()

  const dispatch = useAppDispatch()
  const onGameStart = () => {
    dispatch(startGame())
  }
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      if (ctx) {
        const text = new Text({
          ctx,
          textBaseline: 'middle',
          fillStyle: 'white',
          textAlign: 'center',
          font: '700 48px Minecraft',
        })

        ctx.fillStyle = BG_COLOR
        ctx.fillRect(0, 0, width, height)
        text.fill('One Bit', center[0], center[1])
        text.fill('Dungeon', center[0], center[1] + 45, {
          font: '700 40px Minecraft',
        })
      }
    }
  }, [fontLoaded])

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <div className="start-scene__buttons">
        <a className="mx-auto text-white" onClick={onGameStart}>
          start game
        </a>
        {/* 
        TODO use game/component/QuitButton
        <a className="mx-auto text-white" onClick={onExit}>
          exit
        </a> */}
      </div>
    </>
  )
}

export default StartScene
