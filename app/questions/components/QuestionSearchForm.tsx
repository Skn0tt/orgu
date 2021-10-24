import { Button, TextField, Tooltip } from "@mui/material"
import TagsSelection from "app/questions/components/TagsSelection"
import Box from "@mui/material/Box"
import Autocomplete from "@mui/material/Autocomplete"
import { QuestionStatus } from "../types"

type LogicalOperator = "OR" | "AND"

export interface QuestionSearchParams {
  text: string
  tagIds: Set<number>
  statuses: Set<QuestionStatus>
  logicalOperator: LogicalOperator
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
      <Autocomplete
        multiple
        sx={{ mb: 1 }}
        options={["unanswered", "answered", "ongoing"]}
        value={Array.from(searchParams.statuses.values())}
        renderInput={(params) => {
          return <TextField {...params} label="Statuses" color="secondary" />
        }}
        onChange={(_event, values) => {
          if (Array.isArray(values)) {
            setSearchParams({ ...searchParams, statuses: new Set(values) as Set<QuestionStatus> })
          }
        }}
      />
      <TagsSelection
        tagIds={searchParams.tagIds}
        setTagIds={(tagIds: Set<number>) => setSearchParams({ ...searchParams, tagIds })}
        cascade={false}
      />
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
    </Box>
  )
}

export default QuestionSearchForm
