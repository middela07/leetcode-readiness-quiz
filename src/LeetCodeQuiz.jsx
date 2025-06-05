import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What role are you targeting?",
    options: ["Frontend Engineer", "Backend Engineer", "AI/ML Engineer", "SWE Intern"],
  },
  {
    id: 2,
    question: "What languages are you comfortable with?",
    options: ["Python", "JavaScript", "Java", "C++", "None"],
  },
  {
    id: 3,
    question: "Which of these topics have you practiced?",
    options: ["Arrays", "Binary Search", "Graphs", "Dynamic Programming", "None"],
  },
  {
    id: 4,
    question: "What’s your goal?",
    options: ["Crack FAANG interview", "Land first internship", "Build problem-solving skills", "Understand DSA basics"],
  },
];

const LeetCodeQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionClick = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const calculateLevel = () => {
    const score = Object.values(answers).reduce((acc, val) => {
      if (val === "None") return acc;
      return acc + 1;
    }, 0);

    if (score <= 2) return "📘 Beginner – Start with Arrays & Two Pointers";
    if (score <= 3) return "📗 Intermediate – Try Trees, Backtracking, and Heaps";
    return "📙 Advanced – Time to crush DP, Graphs & System Design prep!";
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setShowResult(true);
    } else {
      alert("Please answer all questions.");
    }
  };

  const shareOnLinkedIn = () => {
    const text = encodeURIComponent(`🚀 Just took the LeetCode Readiness Quiz! My level: ${calculateLevel()} — Try it yourself!`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&text=${text}`, "_blank");
  };

  return (
    <div className="bg-white max-w-2xl mx-auto p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">🧠 LeetCode Readiness Quiz</h2>

      {!showResult ? (
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <p className="font-medium mb-2">{q.question}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionClick(q.id, opt)}
                    className={`px-3 py-2 rounded-md text-sm border ${
                      answers[q.id] === opt
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <Button onClick={handleSubmit} className="w-full mt-6">
            Submit
          </Button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">{calculateLevel()}</p>
          <Button onClick={shareOnLinkedIn} variant="outline" className="inline-flex gap-2 items-center">
            <Share2 className="w-4 h-4" /> Share on LinkedIn
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeetCodeQuiz;
