import { TextField } from "@mui/material"
import TagsSelection from "app/questions/components/TagsSelection"
import Box from "@mui/material/Box"
import Autocomplete from "@mui/material/Autocomplete"
import { QuestionStatus } from "../types"

export interface QuestionSearchParams {
  text: string
  tagIds: Set<number>
  statuses: Set<QuestionStatus>
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
      <TextField
        label="Text Search"
        value={searchParams.text}
        fullWidth
        onChange={(e) => setSearchParams({ ...searchParams, text: e.target.value })}
        sx={{ mb: 1 }}
        color="secondary"
      />
    </Box>
  )
}

export default QuestionSearchForm
