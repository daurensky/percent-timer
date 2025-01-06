import { useBgStore } from '@/store/use-bg-store'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu'
import { ChangeEvent } from 'react'

export default function BackgroundImage() {
  const { bg, setBg, defaultBgSettled, resetBg } = useBgStore()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onloadend = function () {
      const { result } = reader

      if (!result || result instanceof ArrayBuffer) {
        alert('Не удалось загрузить картинку')
        return
      }

      setBg(result)
    }

    reader.readAsDataURL(file)
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <img
            src={bg}
            alt=""
            className="fixed top-0 left-0 w-full h-full object-cover"
          />
        </ContextMenuTrigger>
        <ContextMenuContent>
          {!defaultBgSettled && (
            <ContextMenuItem onClick={resetBg}>
              Сбросить картинку
            </ContextMenuItem>
          )}
          <ContextMenuItem className="p-0">
            <label htmlFor="bg" className="py-1.5 px-2">
              Загрузить картинку
            </label>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <input type="file" id="bg" className="hidden" onChange={handleChange} />
    </>
  )
}
