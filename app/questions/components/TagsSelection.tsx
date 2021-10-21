import Box from "@mui/material/Box"
import React from "react"
import TreeView from "@mui/lab/TreeView"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Checkbox, FormControlLabel } from "@mui/material"
import TreeItem, { TreeItemProps, useTreeItem, TreeItemContentProps } from "@mui/lab/TreeItem"
import clsx from "clsx"
import { Tag, TagNode } from "../types"
import getTagsTrees from "../queries/getTagsTrees"
import { useQuery } from "blitz"
import getTagsMap from "../queries/getTagsMap"

export const getParentTagIds = (tagsMap: Map<number, Tag>, tagId: number): Set<number> => {
  const parentIds: Set<number> = new Set()
  let parentId = tagsMap.get(tagId)?.parentId
  while (parentId) {
    parentIds.add(parentId)
    parentId = tagsMap.get(parentId)?.parentId
  }
  return parentIds
}

export const getChildTagIds = (tagsMap: Map<number, Tag>, tagId: number): Set<number> => {
  const childIds: Set<number> = new Set()
  const tag = tagsMap.get(tagId)
  const remainingTags: Tag[] = tag ? [tag] : []
  while (remainingTags.length) {
    const remainingTag = remainingTags.pop()!
    childIds.add(remainingTag.id)
    for (const tag of Array.from(tagsMap.values())) {
      if (tag.parentId === remainingTag.id) {
        remainingTags.push(tag)
      }
    }
  }
  childIds.delete(tagId)
  return childIds
}

export const TagsSelection = ({
  tagIds,
  setTagIds,
  cascade,
}: {
  tagIds: Set<number>
  setTagIds: (v: Set<number>) => void
  cascade: boolean
}) => {
  const [tagsTrees] = useQuery(getTagsTrees, null)
  const [tagsMap] = useQuery(getTagsMap, null)

  const CustomTreeItem = (props: TreeItemProps) => (
    <TreeItem ContentComponent={CustomContent} {...props} />
  )

  const renderTree = (node: TagNode) => (
    <CustomTreeItem key={node.id} nodeId={node.id.toString()} label={node.name}>
      {node.children.length ? node.children.map((child) => renderTree(child)) : null}
    </CustomTreeItem>
  )

  const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
    const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props
    const { disabled, expanded, selected, handleExpansion, handleSelection } = useTreeItem(nodeId)
    const icon = iconProp || expansionIcon || displayIcon

    const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      handleExpansion(event)
    }

    return (
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.disabled]: disabled,
        })}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <Box ml={1}>
          <FormControlLabel
            label={label}
            control={<Checkbox checked={selected} onChange={handleSelection} color="secondary" />}
          />
        </Box>
      </div>
    )
  })

  return (
    <Box>
      {tagsTrees.map((tagsTree, i) => (
        <TreeView
          key={i}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={Array.from(tagsMap.values()).map((tag) => tag.id.toString())}
          defaultExpandIcon={<ChevronRightIcon />}
          selected={Array.from(tagIds).map((tagId) => tagId.toString())}
          multiSelect
          onNodeSelect={(event, nodeIds) => {
            if (nodeIds.length === 1) {
              const selectedTagId = parseInt(nodeIds[0]!)
              const newTagIds = new Set(tagIds.values())
              if (tagIds.has(selectedTagId)) {
                newTagIds.delete(selectedTagId)
                if (cascade) {
                  const childTagIds = getChildTagIds(tagsMap, selectedTagId)
                  childTagIds.forEach((childTagId) => newTagIds.delete(childTagId))
                }
              } else {
                newTagIds.add(selectedTagId)
                if (cascade) {
                  const parentTagIds = getParentTagIds(tagsMap, selectedTagId)
                  parentTagIds.forEach((parentTagId) => newTagIds.add(parentTagId))
                }
              }
              setTagIds(newTagIds)
            }
          }}
        >
          {renderTree(tagsTree)}
        </TreeView>
      ))}
    </Box>
  )
}
