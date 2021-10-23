import { TextField } from "@mui/material"
import TagsSelection from "app/questions/components/TagsSelection"
import Box from "@mui/material/Box"

export interface QuestionSearchParams {
  text: string
  tagIds: Set<number>
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
      <TextField
        label="Search Term"
        value={searchParams.text}
        fullWidth
        onChange={(e) => setSearchParams({ ...searchParams, text: e.target.value })}
        sx={{ mb: 1 }}
        color="secondary"
      />
      <TagsSelection
        tagIds={searchParams.tagIds}
        setTagIds={(tagIds: Set<number>) => setSearchParams({ ...searchParams, tagIds })}
        cascade={false}
      />
    </Box>
  )
}

export default QuestionSearchForm
