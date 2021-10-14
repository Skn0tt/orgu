import { Form } from "app/core/components/Form"
import { TextField } from "app/core/components/Fields"
import { CreatePerson, UpdatePerson, CreatePersonSchema } from "../types"

type CreateUpdatePerson = CreatePerson | UpdatePerson

export const PersonForm = ({
  initialValues,
  onSubmit,
}: {
  initialValues: CreateUpdatePerson
  onSubmit: (person: CreateUpdatePerson) => void
}) => {
  return (
    <Form
      submitText="Submit"
      schema={CreatePersonSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <TextField name="name" label="Name" />
      <TextField name="description" label="Description" type="textarea" />
    </Form>
  )
}

export default PersonForm
