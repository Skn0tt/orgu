import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import { QuestionStatus } from "../types"
import Tooltip from "@mui/material/Tooltip"

const StatusChip = ({ status }: { status: QuestionStatus }) => {
  return (
    <Box component="span">
      <Tooltip title="Status">
        <Chip label={status} color="primary" size="small" />
      </Tooltip>
    </Box>
  )
}

export default StatusChip
