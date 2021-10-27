import { Form } from "app/core/components/Form"
import {
  AutocompleteMultiSelectField,
  Select,
  TextField,
  TagsSelectionField,
} from "app/core/components/Fields"
import { CreateQuestion, CreateQuestionSchema, UpdateQuestion, PreviewPerson } from "../types"
import { useQuery } from "blitz"
import getPersons from "../queries/getPersons"

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
  const [persons] = useQuery(getPersons, null)
  const personOptions = persons.map((person: PreviewPerson) => {
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
      <TextField name="description" label="Description" />
      <AutocompleteMultiSelectField
        name="personIds"
        label="Assigned to people"
        options={personOptions}
        sx={{ mb: 1 }}
      />
      <TagsSelectionField name="tagIds" label="Tags" cascade={true} />
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
