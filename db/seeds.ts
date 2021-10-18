import {
  CreateAnswer,
  CreatePerson,
  CreateQuestion,
  CreateAssignment,
  CreateTag,
} from "app/questions/types"
import db from "./index"

interface SeedPerson extends CreatePerson {
  id: number
}

interface SeedQuestion extends Omit<CreateQuestion, "assignedToPersonIds"> {
  answers: Omit<CreateAnswer, "questionId">[]
}

interface SeedTag extends CreateTag {
  id: number
}

const persons: SeedPerson[] = [
  {
    id: 1,
    name: "Joe Campbell",
    description: "At vero eos et accusam et justo duo dolores et ea rebum.",
  },
  {
    id: 2,
    name: "Emma Müller",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
  },
]

const questions: SeedQuestion[] = [
  {
    title: "Why are there so many different health insurance companies?",
    status: "unanswered",
    answers: [],
  },
  {
    title: "What is your greatest success?",
    status: "ongoing",
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
    status: "answered",
    answers: [
      {
        personId: 2,
        description:
          "The 'Ortskrankenkassen' were founded in 1884 immediately after the introduction of statutory health insurance in 1883 by Otto von Bismarck.",
      },
    ],
  },
]

const assignments: CreateAssignment[] = [
  {
    personId: 1,
    questionId: 2,
  },
  {
    personId: 2,
    questionId: 2,
  },
  {
    personId: 2,
    questionId: 3,
  },
]

const tags: SeedTag[] = [
  {
    id: 1,
    name: "application",
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
]

const seedPersons = async () => {
  for (const person of persons) {
    await db.person.upsert({
      where: { id: person.id },
      create: { description: person.description, name: person.name },
      update: {},
    })
  }
}

const seedQuestions = async () => {
  for (const question of questions) {
    await db.question.create({
      data: {
        ...question,
        answers: {
          createMany: {
            data: question.answers,
          },
        },
      },
    })
  }
}

const seedAssignments = async () => {
  await db.assignment.createMany({
    data: assignments,
  })
}

const seedTags = async () => {
  for (const tag of tags) {
    await db.tag.upsert({
      where: { id: tag.id },
      create: { name: tag.name, parentId: tag.parentId },
      update: {},
    })
  }
}

// This seed function is executed when you run `blitz db seed`
const seed = async () => {
  await seedPersons()
  await seedQuestions()
  await seedAssignments()
  await seedTags()
}

export default seed
