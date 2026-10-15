import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const read = (path: string) => readFileSync(join(process.cwd(), path), 'utf8')

function cssFiles(directory: string): string[] {
  return readdirSync(join(process.cwd(), directory), {
    withFileTypes: true,
  }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return cssFiles(path)
    return entry.isFile() && entry.name.endsWith('.css') ? [path] : []
  })
}

function luminance(hex: string) {
  const channels = hex
    .match(/[\da-f]{2}/gi)
    ?.map((value) => Number.parseInt(value, 16) / 255)
  if (!channels || channels.length !== 3) throw new Error(`Invalid hex: ${hex}`)
  const linear = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  )
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722
}

function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  )
  return (values[0] + 0.05) / (values[1] + 0.05)
}

describe('Cobalt Blue & Porcelain design foundation', () => {
  it('declares every token from DESIGN.md §34 in the Tailwind theme or direction root', () => {
    const design = read('DESIGN.md')
    const css = read('app/globals.css')
    const section = design.slice(design.indexOf('## 34. Design Tokens'))
    const code = section.match(/```css\s+([\s\S]*?)```/)?.[1]
    expect(code).toBeTruthy()
    const names = [...new Set(code!.match(/--[\w-]+\s*:/g) ?? [])].map((name) =>
      name.replace(/\s*:/, ''),
    )

    for (const name of names)
      expect(css, `${name} is declared`).toContain(`${name}:`)
  })

  it('keeps the source palette in the approved cobalt and porcelain family', () => {
    const css = read('app/globals.css').toLowerCase()
    for (const forbidden of ['#000080', '#00ffff', '#0b0b0b', '#1a1a1a']) {
      expect(css).not.toContain(forbidden)
    }
    expect(css).toContain('#2453ff')
    expect(css).toContain('#f7f8fc')
  })

  it('uses only declared semantic color tokens in shared application CSS', () => {
    const globalCss = read('app/globals.css')
    const declarations = new Set(
      [...globalCss.matchAll(/(--color-[\w-]+)\s*:/g)].map((match) => match[1]),
    )
    const references = new Set(
      cssFiles('app')
        .concat(cssFiles('components'))
        .flatMap((path) =>
          [...read(path).matchAll(/var\((--color-[\w-]+)/g)].map(
            (match) => match[1],
          ),
        ),
    )

    expect([...references].sort()).toEqual(
      [...references].filter((token) => declarations.has(token)).sort(),
    )
  })

  it('meets text and interactive-boundary contrast targets on light surfaces', () => {
    const css = read('app/globals.css').toLowerCase()
    const value = (token: string) => {
      const match = css.match(new RegExp(`${token}:\\s*(#[0-9a-f]{6})`))
      if (!match) throw new Error(`Missing color token ${token}`)
      return match[1]
    }
    const surfaces = [
      '--color-bg-page',
      '--color-bg-section-tinted',
      '--color-surface-1',
    ]
    const text = [
      '--color-ink-primary',
      '--color-ink-secondary',
      '--color-ink-muted',
    ]

    for (const foreground of text) {
      for (const background of surfaces) {
        expect(
          contrast(value(foreground), value(background)),
          `${foreground} on ${background}`,
        ).toBeGreaterThanOrEqual(4.5)
      }
    }
    for (const background of surfaces) {
      expect(
        contrast(value('--color-border-interactive'), value(background)),
        `interactive border on ${background}`,
      ).toBeGreaterThanOrEqual(3)
    }
    expect(
      contrast('#ffffff', value('--color-cta-primary-bg')),
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      contrast('#ffffff', value('--color-bg-section-dark')),
    ).toBeGreaterThanOrEqual(4.5)
  })
})
