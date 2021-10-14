import { Box } from "@mui/material"
import { TextField } from "app/core/components/Fields"
import { Form } from "app/core/components/Form"
import React from "react"
import { CreateAnswer, CreateAnswerSchema, UpdateAnswer } from "../types"

type CreateUpdateAnswer = CreateAnswer | UpdateAnswer

export const AnswerForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: CreateUpdateAnswer
  onSubmit: (answer: CreateUpdateAnswer) => void
}) => {
  return (
    <Box>
      <Form
        submitText="Submit"
        schema={CreateAnswerSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <TextField name="description" label="Description" type="textarea" />
        <TextField name="personId" label="From person with ID" type="number" />
      </Form>
    </Box>
  )
}

export default AnswerForm
