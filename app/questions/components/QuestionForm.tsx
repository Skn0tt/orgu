import { Form } from "app/core/components/Form"
import { AutocompleteMultiSelectField, Select, TextField } from "app/core/components/Fields"
import { CreateQuestion, CreateQuestionSchema, UpdateQuestion } from "../types"
import { useQuery } from "blitz"
import getPersons from "../queries/getPersons"
import { Person } from "../../../db"

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
  // create the options
  const [persons] = useQuery(getPersons, null)
  const options = persons.map((person: Person) => {
    return { label: person.name, id: person.id }
  })

  return (
    <Form
      submitText="Submit"
      schema={CreateQuestionSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <TextField name="title" label="Title" />
      <AutocompleteMultiSelectField name="personIds" label="Assigned to people" options={options} />
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
