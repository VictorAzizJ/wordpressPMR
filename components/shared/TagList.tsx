interface TagListProps {
  tags: string[];
  className?: string;
}

export function TagList({ tags, className = "" }: TagListProps) {
  if (!tags.length) return null;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md border border-pmr-dark bg-pmr-offwhite px-2 py-0.5 text-xs font-medium text-pmr-charcoal"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
