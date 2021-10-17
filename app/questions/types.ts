import * as z from "zod"
import { Answer as PrismaAnswer, Assignment as PrismaAssignment, Person as PrismaPerson } from "db"

export const id = z.number().int().positive()

export const CreatePersonSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export type CreatePerson = z.TypeOf<typeof CreatePersonSchema>

export const UpdatePersonSchema = CreatePersonSchema.extend({
  id: id,
})

export type UpdatePerson = z.TypeOf<typeof UpdatePersonSchema>

const QuestionStatusEnum = z.enum(["answered", "unanswered", "ongoing"])

export const CreateQuestionSchema = z.object({
  title: z.string().min(1),
  status: QuestionStatusEnum,
  assignedToPersonIds: z.set(id),
})

export type CreateQuestion = z.TypeOf<typeof CreateQuestionSchema>

export const UpdateQuestionSchema = CreateQuestionSchema.extend({
  id: id,
})

export type UpdateQuestion = z.TypeOf<typeof UpdateQuestionSchema>

export const CreateAnswerSchema = z.object({
  description: z.string().min(1),
  personId: id,
  questionId: id,
})

export type CreateAnswer = z.TypeOf<typeof CreateAnswerSchema>

export const UpdateAnswerSchema = CreateAnswerSchema.extend({
  id: id,
})

export type UpdateAnswer = z.TypeOf<typeof UpdateAnswerSchema>

export interface Answer extends PrismaAnswer {
  person: PrismaPerson
}

export type Assignment = PrismaAssignment

export interface CreateAssignment extends Omit<Assignment, "id"> {}
