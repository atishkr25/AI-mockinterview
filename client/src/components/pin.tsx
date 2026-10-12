import { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { TooltipButton } from "./tooltip-button";
import { Eye, Newspaper, Sparkles } from "lucide-react";

export const InterviewPin = ({ interview, onMockPage = false }: { interview: Interview; onMockPage?: boolean }) => {
  const navigate = useNavigate();
  const date = interview.createdAt ? new Date(interview.createdAt).toLocaleDateString("en-US", { dateStyle: "long" }) : "";
  return <Card className="p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
    <CardTitle className="text-lg font-serif">{interview.role}</CardTitle>
    <CardDescription className="line-clamp-2">{interview.description}</CardDescription>
    <div className="flex flex-wrap gap-2">{interview.techStack.map((word) => <Badge key={word} variant="outline">{word}</Badge>)}</div>
    <CardFooter className="p-0 flex items-center justify-between"><p className="text-xs text-muted-foreground">{date}</p>{!onMockPage && <div className="flex"><TooltipButton content="View" buttonVariant="ghost" onClick={() => navigate(`/generate/${interview._id}`)} disbaled={false} buttonClassName="hover:text-sky-500" icon={<Eye />} loading={false} /><TooltipButton content="Feedback" buttonVariant="ghost" onClick={() => navigate(`/generate/feedback/${interview._id}`)} disbaled={false} buttonClassName="hover:text-primary" icon={<Newspaper />} loading={false} /><TooltipButton content="Start" buttonVariant="ghost" onClick={() => navigate(`/generate/interview/${interview._id}`)} disbaled={false} buttonClassName="hover:text-primary" icon={<Sparkles />} loading={false} /></div>}</CardFooter>
  </Card>;
};
