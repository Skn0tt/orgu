import Box from "@mui/material/Box"
import { Autocomplete, TextField } from "@mui/material"

export interface AutocompleteOption {
  label: string
  id: number
}

interface SingleSelectProps {
  value: number
  onChange // todo: add type
  label: string
  options: AutocompleteOption[]
  getOptionDisabled?: (option: AutocompleteOption) => boolean
}
interface MultiSelectProps {
  value: Set<number>
  onChange // todo: add type
  label: string
  options: AutocompleteOption[]
  getOptionDisabled?: (option: AutocompleteOption) => boolean
}

export const AutocompleteSingleSelect = ({
  value,
  onChange,
  label,
  options,
  getOptionDisabled = () => false,
}: SingleSelectProps) => {
  const optionMap = new Map(options.map((option) => [option.id, option]))

  // on change
  const onChangeAutocomplete = (event, value) => {
    // for single choice, value is a single options
    if (value === null) onChange(0)
    else onChange(value.id)
  }

  return (
    <Box>
      <Autocomplete
        options={options}
        value={optionMap.get(value) ?? null}
        getOptionDisabled={getOptionDisabled}
        renderInput={(params) => {
          return <TextField {...params} label={label} />
        }}
        onChange={onChangeAutocomplete}
      />
    </Box>
  )
}

export const AutocompleteMultiSelect = ({
  value,
  onChange,
  label,
  options,
  getOptionDisabled = () => false,
}: MultiSelectProps) => {
  const optionMap = new Map(options.map((option) => [option.id, option]))

  // on change
  const onChangeComplete = (event, value) => {
    // for multiple, value is an array of the selected options
    onChange(new Set(value.map((entry) => entry.id)))
  }

  return (
    <Box>
      <Autocomplete
        multiple
        options={options}
        getOptionDisabled={getOptionDisabled}
        value={Array.from(value.values()).map((id) => optionMap.get(id))}
        renderInput={(params) => {
          return <TextField {...params} label={label} />
        }}
        onChange={onChangeComplete}
      />
    </Box>
  )
}
