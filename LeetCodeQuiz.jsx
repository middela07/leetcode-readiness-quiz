// File: src/components/LeetCodeQuiz.jsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

const questions = [
  {
    question: "Two Sum: Given nums = [2, 7, 11, 15], target = 9. Return indices.",
    topic: "Arrays",
  },
  {
    question: "Merge Intervals: [[1,3],[2,6],[8,10],[15,18]]",
    topic: "Intervals",
  },
  {
    question: "Detect a cycle in a linked list. What's the approach?",
    topic: "Linked List",
  },
  {
    question: "How much water is trapped in [0,1,0,2,1,0,1,3,2,1,2,1]?",
    topic: "Stack",
  },
  {
    question: "Binary Tree Max Path Sum (root: -10, left: 9, right: 20 → 15, 7)",
    topic: "Trees",
  },
  {
    question: "Top 2 frequent elements in [1,1,1,2,2,3]",
    topic: "Heaps",
  },
  {
    question: "Can you complete a gas station circuit?",
    topic: "Greedy",
  },
];

const levels = [
  { min: 0, max: 2, label: "🐣 Beginner", recommendation: "Start with LeetCode Explore: Arrays, Strings, Hashing" },
  { min: 3, max: 5, label: "🚀 Intermediate", recommendation: "Work through LeetCode 75 or Blind 75" },
  { min: 6, max: 7, label: "🔥 Strong", recommendation: "Start NeetCode 150 or daily medium-hard grid" },
];

export default function LeetCodeQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (knows) => {
    if (knows) setScore(score + 1);
    if (current + 1 === questions.length) setShowResult(true);
    else setCurrent(current + 1);
  };

  const level = levels.find((l) => score >= l.min && score <= l.max);

  const shareText = encodeURIComponent(
    `I just took the LeetCode Readiness Quiz and got a ${level?.label}! 🚀💻\n\nTry it yourself: https://leetcode-readiness.vercel.app #LeetCode #CSStudents #TechCareers`
  );

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://leetcode-readiness.vercel.app&summary=${shareText}`;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 LeetCode Readiness Quiz</h1>
      {!showResult ? (
        <Card className="mb-4">
          <CardContent className="p-4">
            <p className="text-lg font-medium mb-2">{questions[current].topic}</p>
            <p className="mb-4">{questions[current].question}</p>
            <div className="flex gap-4">
              <Button onClick={() => handleAnswer(true)}>I can solve this in 1 min</Button>
              <Button variant="secondary" onClick={() => handleAnswer(false)}>Not confident</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 text-center">
            <h2 className="text-xl font-semibold mb-2">Your Level: {level?.label}</h2>
            <p className="mb-2">Score: {score} / {questions.length}</p>
            <p className="text-sm text-gray-700">{level?.recommendation}</p>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline justify-center"
            >
              <Linkedin size={18} /> Share on LinkedIn
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
