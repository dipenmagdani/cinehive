import { Star } from "lucide-react";

interface ReviewCardProps {
  author: string;
  rating: number;
  content: string;
  createdAt: string;
}

export function ReviewCard({
  author,
  rating,
  content,
  createdAt,
}: ReviewCardProps) {
  return (
    <div className="rounded-2xl bg-cine-surface p-5">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-cine-text-primary">{author}</div>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="h-4 w-4 fill-yellow-400" />
          <span className="text-sm text-cine-text-primary">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="mt-3 text-cine-text-secondary whitespace-pre-line">
        {content}
      </p>
      <div className="mt-4 text-xs text-cine-text-secondary">{createdAt}</div>
    </div>
  );
}
