import { useAuth } from "@clerk/clerk-react";
import { doc, getDocs, collection, query, setDoc, where, serverTimestamp } from "firebase/firestore";
import { ArrowLeft, ArrowRight, Check, Loader, Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { generateJson, InterviewAnalysis } from "@/scripts";
import { db } from "@/config/firebase.config";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

interface SpeechRecognitionResultEvent {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionFactory = new () => SpeechRecognitionLike;

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [mediaMessage, setMediaMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentIndex] || "";
  const isLastQuestion = currentIndex === questions.length - 1;

  useEffect(() => {
    if (!isLoaded || !userId || !interviewId) return;
    const loadAnswers = async () => {
      try {
        const answerSnapshot = await getDocs(
          query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          )
        );
        const savedAnswers: Record<number, string> = {};
        answerSnapshot.docs.forEach((answerDoc) => {
          const data = answerDoc.data();
          const index = Number(data.questionIndex);
          if (Number.isInteger(index)) savedAnswers[index] = data.user_ans || "";
        });
        setAnswers(savedAnswers);
      } catch {
        toast.error("Could not load saved answers.");
      }
    };
    void loadAnswers();
  }, [interviewId, isLoaded, userId]);

  useEffect(() => {
    const browserWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionFactory;
      webkitSpeechRecognition?: SpeechRecognitionFactory;
    };
    const SpeechRecognitionApi = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;
    setSpeechSupported(Boolean(SpeechRecognitionApi));
    if (!SpeechRecognitionApi) return;
    const recognition = new SpeechRecognitionApi();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let transcript = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }
      setAnswers((previous) => ({ ...previous, [currentIndex]: `${previous[currentIndex] || ""} ${transcript}`.trim() }));
    };
    recognition.onerror = () => {
      setIsRecording(false);
      setMediaMessage("Speech recognition stopped. You can continue typing your answer.");
    };
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [currentIndex]);

  useEffect(() => () => stopMedia(), []);

  const stopMedia = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsCameraOn(false);
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      stopMedia();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setMediaMessage("Camera and microphone are not supported here. Text mode is available.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraOn(true);
      setMediaMessage("");
    } catch {
      stopMedia();
      setMediaMessage("Camera or microphone permission was denied. Text mode is available.");
    }
  };

  const toggleSpeech = () => {
    if (!recognitionRef.current) {
      setMediaMessage("Speech recognition is unavailable in this browser. Chrome is recommended.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const playQuestion = () => {
    if (!("speechSynthesis" in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const speech = new SpeechSynthesisUtterance(currentQuestion.question);
    speech.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(speech);
    setIsPlaying(true);
  };

  const persistAnswer = async (index: number, answer: string) => {
    if (!userId || !interviewId) throw new Error("Your session is not ready yet.");
    await setDoc(doc(db, "userAnswers", `${interviewId}_${index}`), {
      mockIdRef: interviewId,
      questionIndex: index,
      questionId: String(index),
      question: questions[index].question,
      correct_ans: questions[index].answer,
      user_ans: answer,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  };

  const moveNext = async (skip = false) => {
    if (isSubmitting) return;
    const answer = skip ? "" : currentAnswer.trim();
    if (!skip && !answer) return;
    try {
      setIsSubmitting(true);
      await persistAnswer(currentIndex, answer);
      setAnswers((previous) => ({ ...previous, [currentIndex]: answer }));
      setCurrentIndex((index) => index + 1);
    } catch {
      toast.error("Could not save this answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitInterview = async (skip = false) => {
    if (isSubmitting || (!skip && !currentAnswer.trim())) return;
    if (!userId || !interviewId) {
      toast.error("Your account is still loading. Please try again.");
      return;
    }
    setIsSubmitting(true);
    setIsAnalyzing(true);
    try {
      const finalAnswers = { ...answers, [currentIndex]: skip ? "" : currentAnswer.trim() };
      await persistAnswer(currentIndex, finalAnswers[currentIndex]);
      const prompt = `Analyze this mock interview. Return only JSON with overallScore (0-10), summary, and answers. Each answers item must contain questionId, score (0-10), wentWell, improve, idealAnswer. Be fair: short or empty answers should score lower than specific answers.\n\n${questions.map((question, index) => `Question ${index + 1} (id ${index}): ${question.question}\nIdeal: ${question.answer}\nCandidate: ${finalAnswers[index] || "Skipped"}`).join("\n\n")}`;
      const analysis = await generateJson<InterviewAnalysis>(prompt);
      if (!analysis || !Array.isArray(analysis.answers) || typeof analysis.summary !== "string") {
        throw new Error("Gemini returned invalid feedback");
      }
      await Promise.all(questions.map((question, index) => {
        const result = analysis.answers.find((item) => item.questionId === String(index)) || analysis.answers[index];
        return setDoc(doc(db, "userAnswers", `${interviewId}_${index}`), {
          mockIdRef: interviewId,
          questionIndex: index,
          questionId: String(index),
          question: question.question,
          correct_ans: question.answer,
          user_ans: finalAnswers[index] || "",
          feedback: result?.improve || "No feedback returned.",
          rating: Number(result?.score ?? 0),
          score: Number(result?.score ?? 0),
          wentWell: result?.wentWell || "No strengths returned.",
          improve: result?.improve || "No improvement returned.",
          idealAnswer: result?.idealAnswer || question.answer,
          overallScore: Number(analysis.overallScore ?? 0),
          summary: analysis.summary,
          userId,
          updatedAt: serverTimestamp(),
        }, { merge: true });
      }));
      stopMedia();
      navigate(`/generate/feedback/${interviewId}`);
    } catch {
      toast.error("Analysis failed. Check your connection and retry.");
    } finally {
      setIsAnalyzing(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-md border p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-navy">Question {currentIndex + 1} of {questions.length}</p>
        <div className="h-2 w-full rounded-full bg-gray-100 sm:w-48"><div className="h-2 rounded-full bg-brand transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} /></div>
      </div>
      <div className="mt-8 flex items-start justify-between gap-4">
        <p className="text-lg leading-relaxed text-neutral-700">{currentQuestion.question}</p>
        <Button type="button" size="icon" variant="ghost" onClick={playQuestion} aria-label="Read question aloud">{isPlaying ? <VolumeX /> : <Volume2 />}</Button>
      </div>
      <div className="mt-6 overflow-hidden rounded-xl border bg-gray-50">
        {isCameraOn ? <video ref={videoRef} muted playsInline className="h-56 w-full object-cover" /> : <div className="flex h-24 items-center justify-center text-sm text-gray-500">Text mode is ready</div>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => void toggleCamera}>{isCameraOn ? <VideoOff /> : <Video />}{isCameraOn ? "Turn camera off" : "Camera + mic"}</Button>
        <Button type="button" variant="outline" size="sm" onClick={toggleSpeech}>{isRecording ? <MicOff /> : <Mic />}{isRecording ? "Stop dictation" : "Dictate answer"}</Button>
        {mediaMessage && <p className="w-full text-sm text-amber-700">{mediaMessage}</p>}
        {!speechSupported && <p className="w-full text-sm text-gray-500">Speech recognition is unavailable. Chrome is recommended.</p>}
      </div>
      <Textarea value={currentAnswer} onChange={(event) => setAnswers((previous) => ({ ...previous, [currentIndex]: event.target.value }))} placeholder="Type your answer or use dictation..." className="mt-5 min-h-40" />
      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0 || isSubmitting}><ArrowLeft />Previous</Button>
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={() => isLastQuestion ? void submitInterview(true) : void moveNext(true)} disabled={isSubmitting}>Skip</Button>
          {isLastQuestion ? <Button type="button" onClick={() => void submitInterview()} disabled={isSubmitting || !currentAnswer.trim()}>{isAnalyzing ? <Loader className="animate-spin" /> : <Check />} {isAnalyzing ? "Analyzing your answers…" : "Submit Interview"}</Button> : <Button type="button" onClick={() => void moveNext()} disabled={isSubmitting || !currentAnswer.trim()}>{isSubmitting ? <Loader className="animate-spin" /> : <ArrowRight />}Next</Button>}
        </div>
      </div>
    </div>
  );
};
