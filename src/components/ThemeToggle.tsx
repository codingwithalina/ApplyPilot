import React from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@/components/ui/switch'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Switch
      checked={theme === 'dark'}
      onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    />
  )
}
