import { createPerson } from "app/questions/mutations/createPerson"
import { createQuestion } from "app/questions/mutations/createQuestion"
import { CreateAnswer, CreatePerson, CreateQuestion, Tag } from "app/questions/types"
import db from "./index"

interface SeedPerson extends CreatePerson {
  id: number
}

interface SeedQuestion extends CreateQuestion {
  answers: Omit<CreateAnswer, "questionId">[]
}

export const tags: Tag[] = [
  {
    id: 1,
    name: "application",
    parentId: null,
  },
  {
    id: 2,
    name: "mobile",
    parentId: 1,
  },
  {
    id: 3,
    name: "web",
    parentId: 1,
  },
  {
    id: 4,
    name: "ios",
    parentId: 2,
  },
  {
    id: 5,
    name: "android",
    parentId: 2,
  },
  {
    id: 6,
    name: "python",
    parentId: null,
  },
]

const persons: SeedPerson[] = [
  {
    id: 1,
    name: "Joe Campbell",
    description: "At vero eos et accusam et justo duo dolores et ea rebum.",
    tagIds: new Set([1, 3]),
  },
  {
    id: 2,
    name: "Emma Müller",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    tagIds: new Set([1, 2, 4, 6]),
  },
]

const questions: SeedQuestion[] = [
  {
    title: "Why are there so many different health insurance companies?",
    description: "There is really no point in all this inefficiency",
    status: "unanswered",
    answers: [],
    tagIds: new Set(),
    personIds: new Set(),
  },
  {
    title: "What is your greatest success?",
    description: "And don't say \"I don't know\" :)",
    status: "ongoing",
    tagIds: new Set([1, 3, 6]),
    personIds: new Set([1, 2]),
    answers: [
      {
        personId: 1,
        description: "I have founded a successful company.",
      },
      {
        personId: 2,
        description: "I traveled around the world.",
      },
    ],
  },
  {
    title: "When was the AOK established?",
    description: "Hint: judging by the ePA probably in 5 BC",
    status: "answered",
    tagIds: new Set([1, 2, 5]),
    personIds: new Set([2]),
    answers: [
      {
        personId: 2,
        description:
          "The 'Ortskrankenkassen' were founded in 1884 immediately after the introduction of statutory health insurance in 1883 by Otto von Bismarck.",
      },
    ],
  },
]

const seedTags = async () => {
  for (const tag of tags) {
    await db.tag.upsert({
      where: { id: tag.id },
      create: { name: tag.name, parentId: tag.parentId },
      update: {},
    })
  }
}

const seedPersons = async () => {
  for (const person of persons) {
    await createPerson(person)
  }
}

const seedQuestions = async () => {
  for (const question of questions) {
    const createdQuestion = await createQuestion(question)
    await db.answer.createMany({
      data: question.answers.map((answer) => {
        return { ...answer, questionId: createdQuestion.id }
      }),
    })
  }
}

// This seed function is executed when you run `blitz db seed`
const seed = async () => {
  await seedTags()
  await seedPersons()
  await seedQuestions()
}

export default seed
