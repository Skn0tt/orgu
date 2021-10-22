import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TagsTree from "app/questions/components/TagsTree"

const TagsPage: BlitzPage = () => {
  return (
    <Box>
      <Typography variant="h1" component="h1">
        Tags
      </Typography>
      <TagsTree />
    </Box>
  )
}

TagsPage.suppressFirstRenderFlicker = true
TagsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TagsPage
