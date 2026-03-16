interface Props { title: string; description: string }

export default function MetaTagsOutput({ title, description }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-light text-gray-500 mb-1">Title ({title.length}/60 Zeichen)</p>
        <p className="font-medium text-gray-200 break-words">{title}</p>
      </div>
      <div>
        <p className="text-xs font-light text-gray-500 mb-1">Description ({description.length}/155 Zeichen)</p>
        <p className="text-gray-300 text-sm font-light break-words">{description}</p>
      </div>
    </div>
  )
}
