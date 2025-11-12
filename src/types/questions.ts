export type Id = number

export type Option = { key: string; value: string }
export type Question = {
  id: number
  question: string
  options: Option[]
  answer: string
}