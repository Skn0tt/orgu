import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import { Typography } from "@mui/material"
import { useSession } from "blitz"

const Home: BlitzPage = () => {
  const session: any = useSession({ suspense: false })

  return (
    <Box>
      <Typography component="h1" variant="h1">
        Welcome to Orgu{session.userId ? `, ${session.githubUsername}!` : "!"}
      </Typography>
      <Typography>On Orgu you can manage questions and people.</Typography>
    </Box>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
