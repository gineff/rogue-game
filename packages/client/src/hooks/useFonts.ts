import { useState } from 'react'

export const useFonts = (fonts?: (FontFace | boolean)[]) => {
  const [isLoaded, setIsLoaded] = useState(false)
  if (RENDERED_ON_SERVER) {
    return true
  }
  if (fonts) {
    Promise.all(
      fonts.map(font => {
        if (typeof font === 'boolean') {
          return font
        }
        document.fonts.add(font)
        font.load()
        return font.loaded
      })
    ).finally(() => setIsLoaded(true))
  } else
    document.fonts.onloadingerror = document.fonts.onloadingdone = () =>
      setIsLoaded(true)
  return isLoaded
}
