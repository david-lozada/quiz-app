import { Button } from "@/components/ui/button"
import { useLoaderData, Navigate, useNavigate,  } from "react-router"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Question } from "@/types/questions"
import useQuestions from "@/hooks/useQuestions"
import { useState } from "react"
import { ButtonGroup } from "@/components/ui/button-group"
import { getRandomInt } from "@/utils/helpers"

type LoaderData = { question?: Question } 

export function Game() {
  // Initialize score from localStorage or default to 0
  const answers = localStorage.getItem('answers') ? JSON.parse(localStorage.getItem('answers') || '{}') : {};
  const [score, setScore] = useState(answers['total_score'] || 0);
  // Get question from loader
  const data = useLoaderData() as LoaderData
  const { question } = data
  // Get selected answer function and display helper
  const { selectedAnswer, selectedColor } = useQuestions();
  const navigate = useNavigate();
  

  const handleOptionClick = (question: Question, optionKey: string): void => {
    const { totalScore } = selectedAnswer(question, optionKey)
    setScore(totalScore);
  }
  if (!question) {
    return <Navigate to="/" replace />
  }
  return (
    <div className="
        flex items-center justify-center flex-col
        bg-gray-900 text-white 
        p-4 sm:p-8
      ">
      <Card className="w-full max-w-sm bg-background text-foreground">
        <CardHeader>
          <CardTitle><h1>{question.question}</h1></CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4">
            <ul className="space-y-2">
              {question.options.map((opt) => (
                <Button
                  key={opt.key}
                  variant="outline"
                  className={`w-full ${selectedColor(question, opt.key)}`}
                  onClick={() => handleOptionClick(question, opt.key)}
                >
                  {opt.key}. {opt.value}
                </Button>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
            <div className="mt-4 text-sm text-gray-400"><h1>Current Score: <em>{score}</em></h1></div>
        </CardFooter>
      </Card>
      <ButtonGroup>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        <Button variant="outline" onClick={() => navigate('/game/' + getRandomInt(1, 20))}>Next</Button>
      </ButtonGroup>
    </div>
  )
}
export default Game