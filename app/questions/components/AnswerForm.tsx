import { Box } from "@mui/material"
import { TextField } from "app/core/components/Fields"
import { Form } from "app/core/components/Form"
import React from "react"
import { CreateAnswer, CreateAnswerSchema, UpdateAnswer } from "../types"
import AutocompleteSelection, {
  AutocompleteOption,
} from "../../core/components/AutocompleteSelection"
import { useQuery } from "blitz"
import getPersons from "../queries/getPersons"
import { Person } from "../../../db"
import getQuestion from "../queries/getQuestion"

type CreateUpdateAnswer = CreateAnswer | UpdateAnswer

export const AnswerForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: CreateUpdateAnswer
  onSubmit: (answer: CreateUpdateAnswer) => void
  onCancel?: () => void
}) => {
  // create the options and getOptionDisabled
  const [persons] = useQuery(getPersons, null)
  const [question] = useQuery(getQuestion, initialValues.questionId)

  const options = persons.map((person: Person) => {
    return { label: person.name, id: person.id }
  })

  const existingAnswerIds = new Set(question.answers.map((ans) => ans.personId))
  const getOptionDisabled = (option: AutocompleteOption) => {
    return existingAnswerIds.has(option.id) && option.id !== initialValues.personId
  }

  return (
    <Box>
      <Form
        submitText="Submit"
        schema={CreateAnswerSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onCancel={onCancel}
      >
        <TextField name="description" label="Description" type="textarea" />
        <AutocompleteSelection
          name={"personId"}
          label={"From person"}
          options={options}
          allowMultiple={false}
          getOptionDisabled={getOptionDisabled}
        />
      </Form>
    </Box>
  )
}

export default AnswerForm
