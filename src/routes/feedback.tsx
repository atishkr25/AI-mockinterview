import { db } from "@/config/firebase.config";
import { Interview, UserAnswer } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { InterviewPin } from "@/components/pin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CircleCheck, Star } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([]);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [activeFeed, setActiveFeed] = useState("");
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!interviewId) {
      navigate("/generate", { replace: true });
      return;
    }
    if (isLoaded && userId) {
      const fetchInterview = async () => {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists() && interviewDoc.data().userId === userId) {
            setInterview({ id: interviewDoc.id, ...interviewDoc.data() } as Interview);
          } else {
            throw new Error("Interview not found");
          }
        } catch {
          setError("We could not load this interview.");
        }
      };

      const fetchFeedbacks = async () => {
        setIsLoading(true);
        setError("");
        try {
          const querSanpRef = query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          );

          const querySnap = await getDocs(querSanpRef);

          const interviewData: UserAnswer[] = querySnap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as UserAnswer;
          });

          setFeedbacks(interviewData);
          setSummary(String(interviewData[0]?.summary || ""));
        } catch {
          setError("We could not load your feedback. Please try again.");
          toast.error("Could not load feedback");
        } finally {
          setIsLoading(false);
        }
      };
      fetchInterview();
      fetchFeedbacks();
    }
  }, [interviewId, isLoaded, navigate, userId]);

  //   calculate the ratings out of 10

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) return "0.0";

    const totalRatings = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );

    return (totalRatings / feedbacks.length).toFixed(1);
  }, [feedbacks]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  if (error) {
    return <div className="py-20 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={"Feedback"}
          breadCrumpItems={[
            { label: "My Interviews", link: "/generate" },
            { label: `${interview?.position}`, link: `/generate/interview/${interview?.id}` },
          ]}
        />
      </div>

      <Headings
        title="Congratulations!"
        description="Your personalized Lindy AI feedback is now available. Dive in to see your strengths and areas for improvement."
      />

      <div className="flex items-center gap-2 p-4 bg-primary/5 border border-primary/10 rounded-2xl w-fit">
        <Star className="w-5 h-5 text-primary fill-primary" />
        <span className="text-gray-700 text-sm font-medium">Overall Rating:</span>
        <span className="text-primary font-bold text-xl">{overAllRating} / 10</span>
      </div>

      {summary && (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 text-gray-600 shadow-sm">
          <p className="text-sm font-semibold text-navy">Overall summary</p>
          <p className="mt-2 leading-relaxed">{summary}</p>
        </div>
      )}

      {interview && <InterviewPin interview={interview} onMockPage />}

      <Headings title="Interview Feedback" isSubHeading />

      {feedbacks && (
        <Accordion type="single" collapsible className="space-y-4">
          {feedbacks.map((feed) => (
            <AccordionItem
              key={feed.id}
              value={feed.id}
              className="border border-gray-100 rounded-3xl shadow-sm overflow-hidden"
            >
              <AccordionTrigger
                onClick={() => setActiveFeed(feed.id)}
                className={cn(
                  "px-6 py-4 flex items-center justify-between text-base transition-colors hover:no-underline",
                  activeFeed === feed.id
                    ? "bg-primary/5"
                    : "hover:bg-gray-50"
                )}
              >
                <span className="text-left font-medium">{feed.question}</span>
              </AccordionTrigger>

              <AccordionContent className="px-6 py-6 bg-white space-y-4">
                <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  Rating: <span className="text-primary">{feed.score ?? feed.rating} / 10</span>
                </div>

                <Card className="border-none space-y-3 p-5 bg-emerald-50 rounded-2xl">
                  <CardTitle className="flex items-center text-base font-semibold text-emerald-800">
                    <CircleCheck className="mr-2 w-5 h-5 text-emerald-600" /> What went well
                  </CardTitle>
                  <CardDescription className="text-gray-700 leading-relaxed">{feed.wentWell || "No strengths returned."}</CardDescription>
                </Card>

                <Card className="border-none space-y-3 p-5 bg-amber-50 rounded-2xl">
                  <CardTitle className="flex items-center text-base font-semibold text-amber-800">
                    <CircleCheck className="mr-2 w-5 h-5 text-amber-600" /> Your Answer
                  </CardTitle>
                  <CardDescription className="text-gray-700 leading-relaxed">{feed.user_ans}</CardDescription>
                </Card>

                <Card className="border-none space-y-3 p-5 bg-primary/5 rounded-2xl">
                  <CardTitle className="flex items-center text-base font-semibold text-primary/80">
                    <CircleCheck className="mr-2 w-5 h-5 text-primary" /> AI Feedback
                  </CardTitle>
                  <CardDescription className="text-gray-700 leading-relaxed">{feed.improve || feed.feedback}</CardDescription>
                </Card>
                <Card className="border-none space-y-3 p-5 bg-sky-50 rounded-2xl">
                  <CardTitle className="text-base font-semibold text-sky-800">Ideal answer</CardTitle>
                  <CardDescription className="text-gray-700 leading-relaxed">{feed.idealAnswer || feed.correct_ans}</CardDescription>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};
