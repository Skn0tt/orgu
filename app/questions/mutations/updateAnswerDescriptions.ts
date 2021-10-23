import { resolver } from "blitz"
import db from "db"
import * as z from "zod"
import { id } from "../types"
import authorize from "app/auth/utils/authorize"

const Request = z.object({
  answerDescriptions: z.map(z.number(), z.string()),
  personId: id,
})

export default resolver.pipe(
  authorize(),
  resolver.zod(Request),
  async ({ answerDescriptions, personId }) => {
    try {
      for (const [questionId, description] of answerDescriptions.entries()) {
        const answer = await db.answer.findFirst({ where: { personId, questionId } })
        if (answer) {
          if (description) {
            await db.answer.update({ where: { id: answer.id }, data: { description } })
          } else {
            await db.answer.delete({ where: { id: answer.id } })
          }
        } else {
          if (description) {
            await db.answer.create({ data: { questionId, personId, description } })
          }
        }
      }
      return { success: true }
    } catch (e) {
      console.log(e)
      return { success: false }
    }
  }
)
