import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const roots = ['app', 'components', 'lib']
const files = []

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await collect(path)
    else if (['.css', '.tsx', '.ts'].includes(extname(path))) files.push(path)
  }
}

for (const root of roots) await collect(root)

const physicalLayout =
  /\b(?:margin|padding|inset|border)-(?:left|right)\b|(?:^|[;{\s])(?:left|right)\s*:/m
const physicalMotion = /translateX\((?!calc\(var\(--dir\)\s*\*|0(?:px|%)?\s*\))/
const violations = []

for (const file of files) {
  const source = await readFile(file, 'utf8')
  for (const [pattern, rule] of [
    [
      physicalLayout,
      'Use logical inline properties instead of physical left/right layout properties.',
    ],
    [
      physicalMotion,
      'Directional horizontal transforms must use translateX(calc(var(--dir) * ...)).',
    ],
  ]) {
    const match = pattern.exec(source)
    if (match) {
      const line = source.slice(0, match.index).split('\n').length
      violations.push(`${relative(process.cwd(), file)}:${line}: ${rule}`)
    }
  }
}

if (violations.length) {
  console.error(violations.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Logical CSS check passed (${files.length} source files).`)
}
