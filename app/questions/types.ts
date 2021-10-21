import * as z from "zod"
import {
  Answer as PrismaAnswer,
  Person as PrismaPerson,
  Question as PrismaQuestion,
  Tag as PrismaTag,
} from "db"

export const id = z.number().int().positive()

export type Tag = PrismaTag

export interface TagNode {
  id: number
  name: string
  children: TagNode[]
}

export type PreviewPerson = PrismaPerson

export interface Answer extends PrismaAnswer {
  person: PreviewPerson
}

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

export interface PreviewQuestion extends PrismaQuestion {
  tags: Tag[]
}

export interface Question extends PreviewQuestion {
  persons: PreviewPerson[]
  answers: Answer[]
}

const QuestionStatusEnum = z.enum(["answered", "unanswered", "ongoing"])

export const CreateQuestionSchema = z.object({
  title: z.string().min(1),
  status: QuestionStatusEnum,
  personIds: z.set(id),
  tagIds: z.set(id),
})

export type CreateQuestion = z.TypeOf<typeof CreateQuestionSchema>

export const UpdateQuestionSchema = CreateQuestionSchema.extend({
  id: id,
})

export type UpdateQuestion = z.TypeOf<typeof UpdateQuestionSchema>

export interface Person extends PreviewPerson {
  tags: Tag[]
  questions: Question[]
}

export const CreatePersonSchema = z.object({
  name: z.string(),
  description: z.string(),
  tagIds: z.set(id),
})

export type CreatePerson = z.TypeOf<typeof CreatePersonSchema>

export const UpdatePersonSchema = CreatePersonSchema.extend({
  id: id,
})

export type UpdatePerson = z.TypeOf<typeof UpdatePersonSchema>
