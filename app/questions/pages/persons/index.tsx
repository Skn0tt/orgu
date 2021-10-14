import { BlitzPage, useQuery, useRouter, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import Box from "@mui/material/Box"
import getPersons from "app/questions/queries/getPersons"
import { Suspense } from "react"
import CircularProgress from "@mui/material/CircularProgress"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import { Person } from "db"
import Button from "@mui/material/Button"

const PersonCard = ({ person }: { person: Person }) => {
  const router = useRouter()
  return (
    <Card sx={{ mb: 1 }}>
      <CardActionArea
        sx={{ display: "flex", justifyContent: "flex-start" }}
        onClick={() => router.push("/persons/" + person.id)}
      >
        <CardMedia
          component="img"
          image="https://www.pmidpi.com/wp-content/uploads/2015/07/person-placeholder.jpg"
          alt={person.name}
          sx={{ width: 100 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {person.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {person.description.length < 100
              ? person.description
              : person.description.slice(0, 100) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const PersonsList = () => {
  const [persons] = useQuery(getPersons, null)
  return (
    <Box>
      {persons.map((person) => (
        <PersonCard key={person.id} person={person} />
      ))}
    </Box>
  )
}

const PersonsPage: BlitzPage = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>People</h1>
        <Link href="/persons/new" passHref>
          <Button variant="contained">New Person</Button>
        </Link>
      </Box>
      <Suspense fallback={<CircularProgress />}>
        <PersonsList />
      </Suspense>
    </Box>
  )
}

PersonsPage.suppressFirstRenderFlicker = true
PersonsPage.getLayout = (page) => <Layout>{page}</Layout>

export default PersonsPage
