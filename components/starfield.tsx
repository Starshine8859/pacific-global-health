"use client"

import { useEffect, useRef } from "react"

export function Starfield({ fillBlack = true }: { fillBlack?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const starsRef = useRef<any[]>([])
  const settingsRef = useRef({ hue: 217, maxStars: 1400 })
  const offscreenRef = useRef<{ canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let w = 0
    let h = 0
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))

    const initOffscreen = () => {
      const canvas2 = document.createElement("canvas")
      canvas2.width = 100
      canvas2.height = 100
      const ctx2 = canvas2.getContext("2d")!
      const half = canvas2.width / 2
      const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half)
      const hue = settingsRef.current.hue
      gradient2.addColorStop(0.025, "#fff")
      gradient2.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`)
      gradient2.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`)
      gradient2.addColorStop(1, "transparent")
      ctx2.fillStyle = gradient2
      ctx2.beginPath()
      ctx2.arc(half, half, half, 0, Math.PI * 2)
      ctx2.fill()
      offscreenRef.current = { canvas: canvas2, ctx: ctx2 }
    }

    const random = (min: number, max?: number) => {
      if (max === undefined) {
        max = min
        min = 0
      }
      if (min > max) {
        const hold = max
        max = min
        min = hold
      }
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const maxOrbit = (x: number, y: number) => {
      const max = Math.max(x, y)
      const diameter = Math.round(Math.sqrt(max * max + max * max))
      return diameter / 2
    }

    function createStars() {
      const stars: any[] = []
      const maxStars = settingsRef.current.maxStars
      for (let i = 0; i < maxStars; i++) {
        const orbitRadius = random(maxOrbit(w, h))
        const star = {
          orbitRadius,
          radius: random(60, orbitRadius) / 12,
          orbitX: w / 2,
          orbitY: h / 2,
          timePassed: random(0, maxStars),
          speed: random(orbitRadius) / 50000,
          alpha: random(2, 10) / 10,
        }
        stars.push(star)
      }
      starsRef.current = stars
    }

    const resize = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      w = vw * dpr
      h = vh * dpr
      canvas.width = w
      canvas.height = h
      canvas.style.width = `${vw}px`
      canvas.style.height = `${vh}px`
      initOffscreen()
      createStars()
    }

    const draw = () => {
      if (!offscreenRef.current) return
      const { canvas: starImg } = offscreenRef.current
      // background
      ctx.globalCompositeOperation = "source-over"
      if (fillBlack) {
        ctx.globalAlpha = 1
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, w, h)
      } else {
        ctx.clearRect(0, 0, w, h)
      }

      // stars
      ctx.globalCompositeOperation = "lighter"
      const stars = starsRef.current
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const x = Math.sin(s.timePassed) * s.orbitRadius + s.orbitX
        const y = Math.cos(s.timePassed) * s.orbitRadius + s.orbitY
        const twinkle = random(10)
        if (twinkle === 1 && s.alpha > 0) s.alpha -= 0.05
        else if (twinkle === 2 && s.alpha < 1) s.alpha += 0.05
        ctx.globalAlpha = s.alpha
        ctx.drawImage(starImg, x - s.radius / 2, y - s.radius / 2, s.radius, s.radius)
        s.timePassed += s.speed
      }

      animationRef.current = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-[100] block w-full h-full" />
}


