import { useField } from "react-final-form"
import Box from "@mui/material/Box"
import { Autocomplete, TextField } from "@mui/material"

export interface AutocompleteOption {
  label: string
  id: number
}

// public interface for the selection component
interface SelectProps {
  name: string
  label: string
  options: AutocompleteOption[]
  allowMultiple?: boolean
  getOptionDisabled?: (option: AutocompleteOption) => boolean
}

// private interface for the selection component
interface SelectPropsPrivate {
  name: string
  label: string
  options: AutocompleteOption[]
  optionMap: Map<number, AutocompleteOption>
  getOptionDisabled: (option: AutocompleteOption) => boolean
}

const AutocompleteSelectionSingleSelect = (props: SelectPropsPrivate) => {
  const { input } = useField<number>(props.name)

  // on change
  const onChange = (event, value) => {
    // for single choice, value is a single options
    if (value === null) input.onChange(0)
    else input.onChange(value.id)
  }

  return (
    <Box>
      <Autocomplete
        options={props.options}
        value={props.optionMap.get(input.value) ?? ""}
        getOptionDisabled={props.getOptionDisabled}
        renderInput={(params) => {
          return <TextField {...params} label={props.label} />
        }}
        onChange={onChange}
      />
    </Box>
  )
}

const AutocompleteSelectionMultiSelect = (props: SelectPropsPrivate) => {
  const { input } = useField<Set<number>>(props.name)

  // on change
  const onChange = (event, value) => {
    // for multiple, value is an array of the selected options
    input.onChange(new Set(value.map((entry) => entry.id)))
  }

  return (
    <Box>
      <Autocomplete
        multiple
        options={props.options}
        getOptionDisabled={props.getOptionDisabled}
        value={Array.from(input.value.values()).map((id) => props.optionMap.get(id))}
        renderInput={(params) => {
          return <TextField {...params} label={props.label} />
        }}
        onChange={onChange}
      />
    </Box>
  )
}

// by default every option is enabled, unless a custom getOptionDisabled is provided
const AutocompleteSelection = ({
  name,
  label,
  options,
  allowMultiple = true,
  getOptionDisabled = () => false,
}: SelectProps) => {
  // create params
  const optionMap = new Map(options.map((option) => [option.id, option]))
  const props: SelectPropsPrivate = { name, label, options, optionMap, getOptionDisabled }

  if (allowMultiple) return AutocompleteSelectionMultiSelect(props)
  else return AutocompleteSelectionSingleSelect(props)
}

export default AutocompleteSelection
