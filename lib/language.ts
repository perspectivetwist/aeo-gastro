export type Language = 'de' | 'en' | 'unknown'

export function detectLanguage(text: string): Language {
  const germanWords = (text.match(/\b(und|der|die|das|ist|für|mit|von|auf|ein|eine|nicht|auch|sich|an|zu|im|dem|des|bei|nach|wie|aus|durch|wenn|kann|wird|über|oder)\b/gi) || []).length
  const englishWords = (text.match(/\b(and|the|is|for|with|from|on|a|an|of|in|to|that|this|it|be|as|at|by|we|or|not|are|was|have|but|they|which|you|can|will|about)\b/gi) || []).length

  const total = germanWords + englishWords
  if (total < 10) return 'unknown'

  const germanRatio = germanWords / total
  if (germanRatio > 0.55) return 'de'
  if (germanRatio < 0.45) return 'en'
  return 'unknown'
}
