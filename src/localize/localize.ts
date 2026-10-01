import en from './languages/en.json'
import fr from './languages/fr.json'

type Dictionary = { [key: string]: string | Dictionary }

const LANGUAGES: Record<string, Dictionary> = { en, fr }

function lookup (dictionary: Dictionary | undefined, key: string): string | undefined {
  let node: string | Dictionary | undefined = dictionary
  for (const part of key.split('.')) {
    if (node === undefined || typeof node === 'string') return undefined
    node = node[part]
  }
  return typeof node === 'string' ? node : undefined
}

/** Translate `key` (dot separated) and replace `{name}` placeholders with `vars`. */
export function localize (
  key: string,
  language: string,
  vars: Record<string, string | number> = {}
): string {
  const lang = language.split('-')[0]
  const template = lookup(LANGUAGES[lang], key) ?? lookup(LANGUAGES.en, key) ?? key
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match
  )
}
