import { Form } from "app/core/components/Form"
import { TextField, TagsSelectionField } from "app/core/components/Fields"
import { CreatePerson, CreatePersonSchema, UpdatePerson } from "../types"

type CreateUpdatePerson = CreatePerson | UpdatePerson

export const PersonForm = ({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: CreateUpdatePerson
  onSubmit: (person: CreateUpdatePerson) => void
  onCancel: () => void
}) => {
  return (
    <Form
      submitText="Submit"
      schema={CreatePersonSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <TextField name="name" label="Name" />
      <TextField name="description" label="Description" type="textarea" />
      <TagsSelectionField name="tagIds" label="Tags" cascade={false} />
    </Form>
  )
}

export default PersonForm
