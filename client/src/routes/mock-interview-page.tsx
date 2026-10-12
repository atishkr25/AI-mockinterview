import { apiRequest } from "@/lib/api";
import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { QuestionSection } from "@/components/question-section";

export const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>(); const [interview, setInterview] = useState<Interview | null>(null); const [error, setError] = useState("");
  useEffect(() => { if (!interviewId) return; apiRequest<Interview>(`/interview/${interviewId}`).then(setInterview).catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Could not load interview.")); }, [interviewId]);
  if (!interview && !error) return <LoaderPage className="h-[70vh] w-full" />;
  if (error) return <div className="py-20 text-center text-red-600">{error}</div>;
  return <div className="flex flex-col w-full gap-8 py-5"><CustomBreadCrumb breadCrumbPage="Interview" breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }, { label: interview?.role || "", link: `/generate/interview/${interviewId}` }]} />{interview && <QuestionSection questions={interview.questions} />}</div>;
};
