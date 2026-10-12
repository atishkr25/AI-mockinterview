import { cn } from "@/lib/utils";

interface HeadingsProps {
  title: string;
  description?: string;
  isSubHeading?: boolean;
}

export const Headings = ({
  title,
  description,
  isSubHeading = false,
}: HeadingsProps) => {
  return (
    <div>
      <h2
        className={cn(
          "text-2xl md:text-3xl text-gray-800 font-semibold font-serif tracking-tight",
          isSubHeading && "text-lg md:text-xl"
        )}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
