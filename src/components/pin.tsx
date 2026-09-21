import { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Eye, Newspaper, Sparkles } from "lucide-react";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] cursor-pointer transition-all space-y-4 bg-white">
      <CardTitle className="text-lg font-serif tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{interview?.position}</CardTitle>
      <CardDescription className="text-sm text-gray-500 leading-relaxed">{interview?.description}</CardDescription>
      <div className="w-full flex items-center gap-2 flex-wrap">
        {interview?.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary rounded-full"
          >
            {word}
          </Badge>
        ))}
      </div>

      <CardFooter
        className={cn(
          "w-full flex items-center p-0",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
          {`${new Date(interview?.createdAt.toDate()).toLocaleDateString(
            "en-US",
            { dateStyle: "long" }
          )} - ${new Date(interview?.createdAt.toDate()).toLocaleTimeString(
            "en-US",
            { timeStyle: "short" }
          )}`}
        </p>

        {!onMockPage && (
          <div className="flex items-center justify-center">
            <TooltipButton
              content="View"
              buttonVariant={"ghost"}
              onClick={() => { navigate(`/generate/${interview?.id}`, { replace: true }); }}
              disbaled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Eye />}
              loading={false}
            />
            <TooltipButton
              content="Feedback"
              buttonVariant={"ghost"}
              onClick={() => { navigate(`/generate/feedback/${interview?.id}`, { replace: true }); }}
              disbaled={false}
              buttonClassName="hover:text-primary"
              icon={<Newspaper />}
              loading={false}
            />
            <TooltipButton
              content="Start"
              buttonVariant={"ghost"}
              onClick={() => { navigate(`/generate/interview/${interview?.id}`, { replace: true }); }}
              disbaled={false}
              buttonClassName="hover:text-primary"
              icon={<Sparkles />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
