import { BlitzPage } from "blitz"
import Layout, { authenticationRequired } from "app/core/layouts/Layout"
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
      <Typography mt={2}>
        {authenticationRequired
          ? "This orgu instance requires authentication. " +
            (session.userId
              ? session.role === "ADMIN"
                ? "You are currently logged in with full permissions. Have fun!"
                : "You are currently logged in, but you do not have enough permissions. Please contact the admin."
              : "Please login.")
          : "This orgu instance does not require authentication. Have fun!"}
      </Typography>
    </Box>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
