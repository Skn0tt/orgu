import { useField } from "react-final-form"
import Box from "@mui/material/Box"
import { useQuery } from "blitz"
import getPersons from "../queries/getPersons"
import { Autocomplete, TextField } from "@mui/material"
import { Person } from "db"

interface SelectProps {
  name: string
  label: string
  allowMultiple?: boolean
  canSelectPerson?: (person: Person) => boolean
}

interface AutocompleteOption {
  label: string
  id: number
}

interface SelectOptions {
  options: AutocompleteOption[]
  optionMap: Map<number, AutocompleteOption>
  getOptionDisabled: (option: AutocompleteOption) => boolean
}

const PersonSelectionSingleSelect = (
  { name, label }: SelectProps,
  { options, optionMap, getOptionDisabled }: SelectOptions
) => {
  const { input } = useField<number>(name)

  // on change
  const onChange = (event, value) => {
    // for single choice, value is a single boxOption
    if (value === null) input.onChange(null)
    else input.onChange(value.id)
  }

  return (
    <Box>
      <Autocomplete
        options={options}
        value={optionMap.get(input.value)}
        getOptionDisabled={getOptionDisabled}
        renderInput={(params) => {
          return <TextField {...params} label={label} />
        }}
        onChange={onChange}
      />
    </Box>
  )
}

const PersonSelectionMultiSelect = (
  { name, label }: SelectProps,
  { options, optionMap, getOptionDisabled }: SelectOptions
) => {
  const { input } = useField<Set<number>>(name)

  // on change
  const onChange = (event, value) => {
    // for multiple, value is an array of the selected boxOption-objects
    input.onChange(new Set(value.map((entry) => entry.id)))
  }

  return (
    <Box>
      <Autocomplete
        multiple
        options={options}
        getOptionDisabled={getOptionDisabled}
        value={Array.from(input.value.values()).map((id) => optionMap.get(id))}
        renderInput={(params) => {
          return <TextField {...params} label={label} />
        }}
        onChange={onChange}
      />
    </Box>
  )
}

// by default every person is accepted, unless a custom canSelectPerson is provided
const PersonSelection = ({
  name,
  label,
  allowMultiple = true,
  canSelectPerson = () => true,
}: SelectProps) => {
  const [persons] = useQuery(getPersons, null)

  // create the entries and a lookup of the entries and person objects
  const options = persons.map((person: Person) => {
    return { label: person.name, id: person.id }
  })
  const optionMap = new Map(options.map((option) => [option.id, option]))
  const personMap = new Map<number, Person>(persons.map((p) => [p.id, p]))

  // decide if option is disabled
  const getOptionDisabled = (option: AutocompleteOption) => {
    const person = personMap.get(option.id)
    if (person === undefined) {
      return true // always disable invalid options
    }
    return !canSelectPerson(person)
  }

  // create the params
  const selectProps: SelectProps = { name, label }
  const selectOptions: SelectOptions = { options, optionMap, getOptionDisabled }

  if (allowMultiple) return PersonSelectionMultiSelect(selectProps, selectOptions)
  else return PersonSelectionSingleSelect(selectProps, selectOptions)
}

export default PersonSelection
