'use client'

import { useEffect } from 'react'
import { log } from '../actions'

export default function AquariumMockLogger() {
  useEffect(() => {
    const interval = setInterval(async () => {
      await log()
    }, 15 * 1000)

    return () => clearInterval(interval)
  }, [])

  return <></>
}
