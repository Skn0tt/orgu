import { NewAnswer, NewPerson, NewQuestion } from "app/questions/types"
import db from "./index"

interface SeedPerson extends NewPerson {
  id: number
}
interface SeedQuestion extends Omit<NewQuestion, "answers"> {
  answers: Omit<NewAnswer, "questionId">[]
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
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
  },
]

const questions: SeedQuestion[] = [
  {
    title: "Why are there so many different health insurance companies?",
    status: "unanswered",
    assignedToPersonId: 1,
    answers: [],
  },
  {
    title: "What is your greatest success?",
    status: "ongoing",
    assignedToPersonId: 1,
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
    assignedToPersonId: 2,
    answers: [
      {
        personId: 2,
        description:
          "The 'Ortskrankenkassen' were founded in 1884 immediately after the introduction of statutory health insurance in 1883 by Otto von Bismarck.",
      },
    ],
  },
]

const seedPersons = async () => {
  await db.person.createMany({
    data: persons,
  })
}

const seedQuestions = async () => {
  questions.forEach(
    async (question) =>
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
  )
}

// This seed function is executed when you run `blitz db seed`
const seed = async () => {
  await seedPersons()
  await seedQuestions()
}

export default seed
