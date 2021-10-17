import { useField } from "react-final-form"
import Box from "@mui/material/Box"
import { useQuery } from "blitz"
import getPersons from "../queries/getPersons"
import { Autocomplete, TextField } from "@mui/material"

interface SelectProps {
  name: string
  label: string
  allowMultiple?: boolean
}

const PersonSelectionSingleSelect = ({ name, label }: SelectProps) => {
  const { input } = useField<number>(name)
  const [persons] = useQuery(getPersons, null)

  // create the entries and a lookup of the entries
  const boxOptions = persons.map((person) => {
    return { label: person.name, id: person.id }
  })
  const boxOptionsMap = new Map(boxOptions.map((option) => [option.id, option]))

  // on change
  const onChange = (event, value) => {
    // for single choice, value is a single boxOption
    if (value === null) input.onChange(null)
    else input.onChange(value.id)
  }

  return (
    <Box>
      <Autocomplete
        options={boxOptions}
        value={boxOptionsMap.get(input.value)}
        renderInput={(params) => {
          return <TextField {...params} label={label} />
        }}
        onChange={onChange}
      />
    </Box>
  )
}

const PersonSelectionMultiSelect = ({ name, label }: SelectProps) => {
  const { input } = useField<Set<number>>(name)
  const [persons] = useQuery(getPersons, null)

  // create the entries and a lookup of the entries
  const boxOptions = persons.map((person) => {
    return { label: person.name, id: person.id }
  })
  const boxOptionsMap = new Map(boxOptions.map((option) => [option.id, option]))

  // on change
  const onChange = (event, value) => {
    // for multiple, value is an array of the selected boxOption-objects
    input.onChange(new Set(value.map((entry) => entry.id)))
  }

  return (
    <Box>
      <Autocomplete
        multiple
        options={boxOptions}
        value={Array.from(input.value.values()).map((id) => boxOptionsMap.get(id))}
        renderInput={(params) => {
          return <TextField {...params} label={label} />
        }}
        onChange={onChange}
      />
    </Box>
  )
}

// Todo: allow disabling a person from picker options, e.g. if the person already has answered the question
const PersonSelection = ({ name, label, allowMultiple = true }: SelectProps) => {
  if (allowMultiple) return PersonSelectionMultiSelect({ name, label })
  else return PersonSelectionSingleSelect({ name, label })
}

export default PersonSelection
