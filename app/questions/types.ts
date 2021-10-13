import * as z from "zod"

const id = z.number().int().positive()

export const CreatePersonSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export type CreatePerson = z.TypeOf<typeof CreatePersonSchema>

const QuestionStatusEnum = z.enum(["answered", "unanswered", "ongoing"])

export const CreateQuestionSchema = z.object({
  title: z.string().min(1),
  status: QuestionStatusEnum,
  assignedToPersonId: id,
})

export type CreateQuestion = z.TypeOf<typeof CreateQuestionSchema>

export const CreateAnswerSchema = z.object({
  description: z.string().min(1),
  personId: id,
  questionId: id,
})

export type CreateAnswer = z.TypeOf<typeof CreateAnswerSchema>
