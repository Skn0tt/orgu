import * as z from "zod"

export type QuestionStatus = "answered" | "unanswered" | "ongoing"

export const CreateQuestion = z.object({
  title: z.string().min(1),
  status: z.string(),
  assignedToPersonId: z.number().int().positive(),
})
