interface Props { content: string }

export default function AnswerBlock({ content }: Props) {
  return (
    <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-4 text-gray-200 font-light leading-relaxed break-words">
      {content}
    </div>
  )
}
