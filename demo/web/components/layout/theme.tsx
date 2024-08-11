import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FaMoon } from 'react-icons/fa'
import { LuSun } from 'react-icons/lu'

export default function ThemeSelector() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button variant={'secondary'} onClick={toggleTheme} className="w-10 p-0">
      {theme === 'light' ? <FaMoon className="text-lg" /> : <LuSun className="text-xl" />}
    </Button>
  )
}
