import { Button, TextField, Tooltip, Typography } from "@mui/material"
import TagsSelection from "app/questions/components/TagsSelection"
import Box from "@mui/material/Box"
import Autocomplete from "@mui/material/Autocomplete"
import { PreviewPerson, QuestionStatus } from "../types"
import { useQuery } from "blitz"
import getPersons from "../queries/getPersons"
import { AutocompleteOption } from "app/core/components/AutocompleteSelection"

type LogicalOperator = "OR" | "AND"

export interface QuestionSearchParams {
  text: string
  tagIds: Set<number>
  statuses: Set<QuestionStatus>
  personIds: Set<number>
  logicalOperator: LogicalOperator
}

const PersonsAutocomplete = ({
  personIds,
  setPersonIds,
}: {
  personIds: Set<number>
  setPersonIds: (v: Set<number>) => void
}) => {
  const [persons] = useQuery(getPersons, null)
  const options: AutocompleteOption[] = persons.map((person: PreviewPerson) => {
    return { label: person.name, id: person.id }
  })
  const optionMap = new Map(options.map((option) => [option.id, option]))

  return (
    <Autocomplete
      sx={{ mb: 1 }}
      multiple
      options={options}
      value={Array.from(personIds.values()).map((id) => optionMap.get(id))}
      renderInput={(params) => {
        return <TextField {...params} label="People" color="secondary" />
      }}
      isOptionEqualToValue={(option, value) => {
        return option?.id === value?.id
      }}
      onChange={(_event, values) => {
        if (Array.isArray(values)) {
          const newPersonIds = new Set(values.map((entry) => entry?.id))
          newPersonIds.delete(undefined)
          setPersonIds(newPersonIds as Set<number>)
        }
      }}
    />
  )
}

const QuestionSearchForm = ({
  searchParams,
  setSearchParams,
}: {
  searchParams: QuestionSearchParams
  setSearchParams: (v: QuestionSearchParams) => void
}) => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <TextField
          label="Text Search"
          value={searchParams.text}
          fullWidth
          onChange={(e) => setSearchParams({ ...searchParams, text: e.target.value })}
          sx={{ mb: 1, mr: 1 }}
          color="secondary"
        />
        <Tooltip title="Logical Operator applied between search fields">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setSearchParams({
                ...searchParams,
                logicalOperator: searchParams.logicalOperator === "AND" ? "OR" : "AND",
              })
            }}
          >
            {searchParams.logicalOperator}
          </Button>
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Autocomplete
            multiple
            sx={{ mb: 1 }}
            options={["unanswered", "answered", "ongoing"]}
            value={Array.from(searchParams.statuses.values())}
            renderInput={(params) => {
              return <TextField {...params} label="Status" color="secondary" />
            }}
            onChange={(_event, values) => {
              if (Array.isArray(values)) {
                setSearchParams({
                  ...searchParams,
                  statuses: new Set(values) as Set<QuestionStatus>,
                })
              }
            }}
          />
        </Box>
        <Typography align={"center"} textAlign={"center"} sx={{ ml: 1, mr: 1, mb: 1 }}>
          {searchParams.logicalOperator}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {" "}
          <TagsSelection
            tagIds={searchParams.tagIds}
            setTagIds={(tagIds: Set<number>) => setSearchParams({ ...searchParams, tagIds })}
            cascade={false}
          />
        </Box>
        <Typography align={"center"} textAlign={"center"} sx={{ ml: 1, mr: 1, mb: 1 }}>
          {searchParams.logicalOperator}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <PersonsAutocomplete
            personIds={searchParams.personIds}
            setPersonIds={(personIds: Set<number>) =>
              setSearchParams({ ...searchParams, personIds })
            }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default QuestionSearchForm
