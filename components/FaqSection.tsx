import { FaqItem } from '@/types/aeo'

interface Props { faqItems: FaqItem[] }

export default function FaqSection({ faqItems }: Props) {
  return (
    <div className="space-y-4">
      {faqItems.map((item, i) => (
        <div key={i} className="border-b border-white/10 pb-3 last:border-0">
          <p className="font-normal text-sm text-gray-200 break-words">{item.question}</p>
          <p className="text-gray-400 text-sm font-light mt-1 break-words">{item.answer}</p>
        </div>
      ))}
    </div>
  )
}
