import { apiRequest } from "@/lib/api";
import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>(); const [interview, setInterview] = useState<Interview | null>(null); const [error, setError] = useState("");
  useEffect(() => { if (!interviewId) return; apiRequest<Interview>(`/interview/${interviewId}`).then(setInterview).catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Could not load feedback.")); }, [interviewId]);
  if (!interview && !error) return <LoaderPage className="h-[70vh] w-full" />;
  if (error) return <div className="py-20 text-center text-red-600">{error}</div>;
  return <div className="flex flex-col w-full gap-8 py-5"><Headings title="Interview feedback" description="Review your score, strengths, and next improvements." />{interview && <><div className="flex items-center gap-2 rounded-2xl border border-primary/10 bg-primary/5 p-4 w-fit"><Star className="fill-primary text-primary" /><span>Overall score:</span><strong className="text-xl text-primary">{interview.overallScore ?? 0} / 10</strong></div><div className="grid gap-4 md:grid-cols-2"><Card className="p-5"><CardTitle>Strengths</CardTitle><CardDescription className="mt-3">{interview.summary?.strengths?.join(" ") || "Keep building specific examples."}</CardDescription></Card><Card className="p-5"><CardTitle>Improvements</CardTitle><CardDescription className="mt-3">{interview.summary?.improvements?.join(" ") || "Practice concise, structured answers."}</CardDescription></Card></div><InterviewPin interview={interview} onMockPage /><Headings title="Answer feedback" isSubHeading />{interview.questions.map((question, index) => <Card key={question._id || index} className="space-y-3 p-5"><CardTitle>Question {index + 1}: {question.question}</CardTitle><CardDescription>Your answer: {question.answer || "No answer"}</CardDescription><CardDescription><strong>Rating:</strong> {question.rating ?? 0} / 10</CardDescription><CardDescription><strong>Feedback:</strong> {question.feedback || "No feedback returned."}</CardDescription>{question.idealAnswer && <CardDescription><strong>Ideal answer:</strong> {question.idealAnswer}</CardDescription>}</Card>)}</>}</div>;
};
