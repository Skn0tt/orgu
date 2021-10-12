export type QuestionStatus = "answered" | "unanswered" | "ongoing"

export interface Person {
  id: number
  name: string
  description: string
  assignedQuestions: Question[]
}

export interface NewPerson extends Omit<Person, "id" | "assignedQuestions"> {}

export interface Question {
  id: number
  title: string
  status: QuestionStatus
  assignedToPersonId: number
  assignedToPerson: Omit<Person, "assignedQuestions">
  answers: Omit<Answer, "question" | "person">[]
}

export interface NewQuestion extends Omit<Question, "id" | "assignedToPerson" | "answers"> {}

export interface Answer {
  id: number
  description: string
  questionId: number
  question: Question
  personId: number
  person: Person
}

export interface NewAnswer extends Omit<Answer, "id" | "person" | "question"> {}
