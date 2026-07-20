import { useState } from "react";
import { askAI } from "@/api/gemini";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fieldClasses } from "@/components/ui/field";

export function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAsk() {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const response = await askAI(question);
      setAnswer(response);
    } catch (error) {
      setAnswer("❌ Failed to get AI response.");
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <Card className="p-5 shadow-xl sm:p-7">
      <SectionHeader
        icon="🤖"
        title="AI Assistant"
        subtitle="Ask anything — plans, advice, ideas"
        gradient="from-violet-500 to-fuchsia-600"
      />

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything..."
        rows={4}
        className={`${fieldClasses} mt-5 resize-none rounded-xl p-4 focus:border-violet-500 focus:ring-violet-500/20`}
      />

      <Button
        variant="violet"
        onClick={handleAsk}
        disabled={loading}
        className="mt-4"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Thinking...
          </span>
        ) : (
          "Ask AI"
        )}
      </Button>

      {answer && (
        <div className="mt-6 whitespace-pre-wrap rounded-xl border border-edge bg-panel-light p-5 text-sm leading-relaxed text-slate-200 animate-fade-up">
          {answer}
        </div>
      )}
    </Card>
  );
}
