import Box from "@mui/material/Box"
import { Autocomplete, TextField } from "@mui/material"

export interface AutocompleteOption {
  label: string
  id: number
}

interface SelectProps {
  value: number | Set<number>
  onChange: (v: number | Set<number>) => void
  label: string
  options: AutocompleteOption[]
  multiple: boolean
  getOptionDisabled?: (option: AutocompleteOption) => boolean
}

export const AutocompleteSelect = ({
  value,
  onChange,
  label,
  options,
  multiple,
  getOptionDisabled = () => false,
}: SelectProps) => {
  const optionMap = new Map(options.map((option) => [option.id, option]))

  return (
    <Box>
      <Autocomplete
        multiple={multiple}
        options={options}
        value={
          multiple
            ? Array.from((value as Set<number>).values()).map((id) => optionMap.get(id))
            : optionMap.get(value as number) ?? null
        }
        getOptionDisabled={getOptionDisabled}
        renderInput={(params) => {
          return <TextField {...params} label={label} color="secondary" />
        }}
        onChange={
          multiple
            ? (_event, value) => {
                if (Array.isArray(value)) {
                  const v = new Set(value.map((entry) => entry?.id))
                  v.delete(undefined)
                  onChange(v as Set<number>)
                }
              }
            : (_event, value) => {
                if (!value) onChange(0)
                if (!Array.isArray(value) && value?.id) {
                  onChange(value.id)
                }
              }
        }
      />
    </Box>
  )
}
