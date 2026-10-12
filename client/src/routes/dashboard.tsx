import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api";
import { Interview } from "@/types";
import { Plus } from "lucide-react";

export const Dashboard = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState("");
  useEffect(() => { apiRequest<{ interviews: Interview[] }>("/interview").then((result) => setInterviews(result.interviews)).catch((requestError) => setError(requestError instanceof Error ? requestError.message : "Could not load interviews.")).finally(() => setLoading(false)); }, []);
  return <><div className="flex w-full items-center justify-between"><Headings title="Dashboard" description="Create and start your AI mock interview" /><Link to="/generate/create"><Button size="sm"><Plus /> Add New</Button></Link></div><Separator className="my-8" /><div className="md:grid md:grid-cols-3 gap-3 py-4">{loading ? Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="h-32 rounded-md" />) : error ? <div className="md:col-span-3 py-20 text-center text-red-600">{error}</div> : interviews.length ? interviews.map((interview) => <InterviewPin key={interview._id} interview={interview} />) : <div className="md:col-span-3 py-20 text-center"><p>No interviews yet.</p><Link to="/generate/create"><Button className="mt-4"><Plus /> Add New</Button></Link></div>}</div></>;
};
