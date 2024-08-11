'use client'

import { useEffect } from 'react'
import { log } from '../actions'

export default function AquariumMockLogger() {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await log()
      } catch {}
    }, 15 * 1000)

    return () => clearInterval(interval)
  }, [])

  return <></>
}
