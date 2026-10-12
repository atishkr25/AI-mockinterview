import { apiRequest } from "@/lib/api";
import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Button } from "@/components/ui/button";
import { InterviewPin } from "@/components/pin";
import { Sparkles } from "lucide-react";

export const MockLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>(); const navigate = useNavigate(); const [interview, setInterview] = useState<Interview | null>(null); const [error, setError] = useState("");
  useEffect(() => { if (!interviewId) { navigate("/generate", { replace: true }); return; } apiRequest<Interview>(`/interview/${interviewId}`).then(setInterview).catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Could not load interview.")); }, [interviewId, navigate]);
  if (!interview && !error) return <LoaderPage className="h-[70vh] w-full" />;
  if (error) return <div className="py-20 text-center text-red-600">{error}</div>;
  return <div className="flex flex-col w-full gap-6 py-5"><div className="flex items-center justify-between"><CustomBreadCrumb breadCrumbPage={interview?.role || "Interview"} breadCrumpItems={[{ label: "My Interviews", link: "/generate" }]} /><Link to={`/generate/interview/${interviewId}/start`}><Button size="sm">Start <Sparkles /></Button></Link></div>{interview && <InterviewPin interview={interview} onMockPage />}<div className="rounded-2xl bg-amber-50 p-5 text-amber-800">You will answer five questions by typing or using your microphone. Your video is never recorded.</div></div>;
};
