import type { Id, Question } from "@/types/questions"
import questionsJson from "@/store/questions.json"

const questions = (questionsJson as any).questions as Question[]

function mapRaw(q: Question): Question {
  // keep options as Option[]
  const options = q.options as unknown as Question["options"]
  const answerValue =
    q.options.find((o) => o.key === (q as any).answer)?.value ?? options[0]?.value ?? ""
  return {
    id: q.id as Id,
    question: q.question,
    options: options,
    // keep `answer` as the human readable value (not the key)
    answer: answerValue,
  }
}

function useQuestions() {
  const getAll = async (): Promise<Question[]> => {
    return questions.map(mapRaw)
  }

  const getById = async (id: Id): Promise<Question | undefined> => {
    const rq = questions.find((r) => r.id === (id as number))
    return rq ? mapRaw(rq) : undefined
  }

  const count = (): number => questions.length

  const getRandom = async (): Promise<Question> => {
    const idx = Math.floor(Math.random() * questions.length)
    return mapRaw(questions[idx])
  }

  const readAnswers = (): Record<string, any> => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("answers") : null
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  const writeAnswers = (answers: Record<string, any>) => {
    try {
      localStorage.setItem("answers", JSON.stringify(answers))
    } catch {
      // ignore storage errors (quota/SSR)
    }
  }

    /**
     * @param question The question object
     * @param selectedOptionKey The key of the selected option
     * Verify if the selected answer is correct and/or if the question exists
     * @returns boolean indicating if the answer is correct and not existing question saved already
     */
    const verifyAnswer = (question: Question, selectedOptionKey: string): boolean => {
        if (!question) return false
        const answers = readAnswers()
        if (answers[String(question.id)]) return false // already answered
        const selectedOption = question.options.find((opt) => opt.key === selectedOptionKey)
        return selectedOption ? selectedOption.value === question.answer : false
    }

    const selectedAnswer = (question: Question, selectedOptionKey: string) => {
        const answers = readAnswers()
        if (verifyAnswer(question, selectedOptionKey)) {
            const qKey = String(question.id)
            answers[qKey] = selectedOptionKey
            answers[`${qKey}_score`] = 1
            answers["total_score"] = (answers["total_score"] || 0) + answers[`${qKey}_score`]
            writeAnswers(answers)
        }
        return {
            totalScore: readAnswers()["total_score"] || 0,
        }
    }

  // Helper to test correctness without checking stored answers
  const isCorrect = (question: Question, selectedOptionKey: string): boolean => {
    const selectedOption = question.options.find((opt) => opt.key === selectedOptionKey)
    return selectedOption ? selectedOption.value === question.answer : false
  }

  // Pure function used during render to determine the display state for an option
  const selectedColor = (question: Question, selectedOptionKey: string): "correct" | "incorrect" | "neutral" => {
    const answers = readAnswers()
    const qKey = String(question.id)
    if (answers[qKey] === selectedOptionKey) {
      return isCorrect(question, selectedOptionKey) ? "correct" : "incorrect"
    }
    return "neutral"
  }
    return { getAll, getById, count, getRandom, selectedAnswer, selectedColor }
}
export default useQuestions
