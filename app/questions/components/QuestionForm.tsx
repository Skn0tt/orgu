import { Form } from "app/core/components/Form"
import { TextField, Select } from "app/core/components/Fields"
import { CreateQuestion, UpdateQuestion, CreateQuestionSchema } from "../types"

type CreateUpdateQuestion = CreateQuestion | UpdateQuestion

export const QuestionForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: CreateUpdateQuestion
  onSubmit: (question: CreateUpdateQuestion) => void
  onCancel: () => void
}) => {
  return (
    <Form
      submitText="Submit"
      schema={CreateQuestionSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <TextField name="title" label="Title" />
      <TextField name="assignedToPersonId" label="Assigned to Person with Id" type="number" />
      <Select
        name="status"
        label="Status"
        items={[
          {
            value: "unanswered",
            label: "unanswered",
          },
          {
            value: "answered",
            label: "answered",
          },
          {
            value: "ongoing",
            label: "ongoing",
          },
        ]}
      />
    </Form>
  )
}

export default QuestionForm
