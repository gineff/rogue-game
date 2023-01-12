import { createSlice } from '@reduxjs/toolkit'
import * as SCENES from '../../constants/scenes'

export interface InitialState {
  currentScene: string
  level: 1
  levelStats: ResultsProps
}

export const initialState: InitialState = {
  currentScene: 'ResultScene',
  level: 1,
  levelStats: {
    levelNum: 1,
    killCount: 100,
    coins: 50,
    time: 60,
    steps: 1114,
  },
}

interface ResultsProps {
  levelNum: number
  killCount: number
  coins: number
  time: number
  steps: number
}

export enum ActionType {
  restartGame,
  startGame,
  nextLevel,
  showLoader,
  finishLevel,
  exit,
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    restartGame(state) {
      state.currentScene = SCENES.MAP_SCENE
    },
    startGame(state) {
      state.currentScene = SCENES.MAP_SCENE
    },
    nextLevel(state) {
      state.level += 1
      state.currentScene = SCENES.MAP_SCENE
    },
    showLoader(state) {
      state.currentScene = SCENES.LOAD_SCENE
    },
    finishLevel(state, action) {
      state.currentScene = SCENES.RESULT_SCENE
      state.levelStats = action.payload.stats
    },
    exit(state, action) {
      //navigate('/liderboard')
    },
  },
})

export default gameSlice
