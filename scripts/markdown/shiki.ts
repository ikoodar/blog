// https://github.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts

import type { HtmlRendererOptions, IThemeRegistration } from 'shiki'
import {
  type Processor,
  addClass,
  createDiffProcessor,
  createFocusProcessor,
  createHighlightProcessor,
  createRangeProcessor,
  defineProcessor,
  getHighlighter,
} from 'shiki-processor'

type ThemeOptions =
  | IThemeRegistration
  | { light: IThemeRegistration; dark: IThemeRegistration }

/**
 * 2 steps:
 *
 * 1. convert attrs into line numbers:
 *    {4,7-13,16,23-27,40} -> [4,7,8,9,10,11,12,13,16,23,24,25,26,27,40]
 * 2. convert line numbers into line options:
 *    [{ line: number, classes: string[] }]
 */
function attrsToLines(attrs: string): HtmlRendererOptions['lineOptions'] {
  attrs = attrs.replace(/.*?([\d,-]+).*/, '$1').trim()

  const result: number[] = []
  if (!attrs)
    return []

  attrs
    .split(',')
    .map(v => v.split('-').map(v => Number.parseInt(v, 10)))
    .forEach(([start, end]) => {
      if (start && end) {
        result.push(
          ...Array.from({ length: end - start + 1 }, (_, i) => start + i),
        )
      }
      else {
        result.push(start)
      }
    })
  return result.map(v => ({
    line: v,
    classes: ['highlighted'],
  }))
}

const errorLevelProcessor = defineProcessor({
  name: 'error-level',
  handler: createRangeProcessor({
    error: ['highlighted', 'error'],
    warning: ['highlighted', 'warning'],
  }),
})

export async function shiki(
  theme: ThemeOptions = 'material-palenight',
  defaultLang = '',
): Promise<(str: string, lang: string, attrs: string) => string> {
  const hasSingleTheme = typeof theme === 'string' || 'name' in theme
  const getThemeName = (themeValue: IThemeRegistration) =>
    typeof themeValue === 'string' ? themeValue : themeValue.name

  const processors: Processor[] = [
    createFocusProcessor(),
    createHighlightProcessor({ hasHighlightClass: 'highlighted' }),
    createDiffProcessor(),
    errorLevelProcessor,
  ]

  const highlighter = await getHighlighter({
    themes: hasSingleTheme ? [theme] : [theme.dark, theme.light],
    processors,
  })

  const styleRE = /<pre[^>]*(style=".*?")/
  const preRE = /^<pre(.*?)>/
  const vueRE = /-vue$/

  return (str: string, lang: string, attrs: string) => {
    const vPre = vueRE.test(lang) ? '' : 'v-pre'
    lang = lang.replace(vueRE, '').toLowerCase() || defaultLang

    const lineOptions = attrsToLines(attrs)
    const cleanup = (str: string) =>
      str
        .replace(preRE, (_, attributes) => `<pre ${vPre}${attributes}>`)
        .replace(styleRE, (_, style) => _.replace(style, ''))

    if (hasSingleTheme) {
      return cleanup(
        highlighter.codeToHtml(str, {
          lang,
          lineOptions,
          theme: getThemeName(theme),
        }),
      )
    }

    const dark = addClass(
      cleanup(
        highlighter.codeToHtml(str, {
          lang,
          lineOptions,
          theme: getThemeName(theme.dark),
        }),
      ),
      'shiki-dark',
      'pre',
    )

    const light = addClass(
      cleanup(
        highlighter.codeToHtml(str, {
          lang,
          lineOptions,
          theme: getThemeName(theme.light),
        }),
      ),
      'shiki-light',
      'pre',
    )

    return dark + light
  }
}
