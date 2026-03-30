import katex from 'katex'

export function renderLatex(tex: string, displayMode = false): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
  })
}
