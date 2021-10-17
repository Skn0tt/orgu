import { Box } from "@mui/material"
import { TextField } from "app/core/components/Fields"
import { Form } from "app/core/components/Form"
import React from "react"
import { CreateAnswer, CreateAnswerSchema, UpdateAnswer } from "../types"
import PersonSelection from "./PersonSelection"
import { Person } from "db"

type CreateUpdateAnswer = CreateAnswer | UpdateAnswer

export const AnswerForm = ({
  initialValues,
  onSubmit,
  onCancel,
  canSelectPerson,
}: {
  initialValues: CreateUpdateAnswer
  onSubmit: (answer: CreateUpdateAnswer) => void
  onCancel?: () => void
  canSelectPerson?: (person: Person) => boolean
}) => {
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
        <PersonSelection
          name={"personId"}
          label={"From person"}
          allowMultiple={false}
          canSelectPerson={canSelectPerson}
        />
      </Form>
    </Box>
  )
}

export default AnswerForm
