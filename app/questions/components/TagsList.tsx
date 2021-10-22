import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import { TagWithIsLeaf } from "../types"
import Tooltip from "@mui/material/Tooltip"
import { useQuery } from "blitz"
import getTagsMap from "../queries/getTagsMap"

const TagsList = ({ tags }: { tags: TagWithIsLeaf[] }) => {
  const [tagsMap] = useQuery(getTagsMap, null)

  const getParentsString = (tagId: number): string => {
    const parentTagNames: string[] = []
    let tag = tagsMap.get(tagId)!
    while (tag?.parentId) {
      parentTagNames.unshift(tag.name)
      tag = tagsMap.get(tag.parentId)!
    }
    parentTagNames.unshift(tag.name)
    return parentTagNames.join(" > ")
  }

  return (
    <Box component="span">
      {tags
        .filter((tag) => tag.isLeaf)
        .map((tag) => (
          <Tooltip title={getParentsString(tag.id)} key={tag.id}>
            <Chip label={tag.name} color="secondary" size="small" />
          </Tooltip>
        ))}
    </Box>
  )
}

export default TagsList
