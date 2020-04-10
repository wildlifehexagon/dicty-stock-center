import React from "react"
import { useHistory, useParams } from "react-router-dom"
import { PageEditor } from "dicty-components-page-editor"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import InfoPageViewToolbar from "./InfoPageViewToolbar"

const useStyles = makeStyles(() => ({
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "90%",
    "@media (min-width: 1300px)": {
      width: "80%",
    },
  },
  editor: {
    "& a": {
      color: "#004080",
      textDecoration: "none",
    },
  },
}))

type Props = {
  /** Content API data */
  data: {
    id: string
    content: string
    slug: string
    name: string
    created_by: {
      id: string
      first_name: string
      last_name: string
      roles: Array<{
        role: string
      }>
    }
    /** User data for last person to update page */
    updated_by: {
      id: string
      first_name: string
      last_name: string
      updated_at: string
      roles: Array<{
        role: string
      }>
    }
  }
}

/** Displays the info page data that was fetched from the InfoPage component */

const InfoPageView = ({ data }: Props) => {
  const classes = useStyles()
  const history = useHistory()
  const { name } = useParams()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    history.push({
      pathname: `/information/${name}/edit`,
      state: {
        data: data,
      },
    })
  }

  return (
    <div className={classes.container} key={data.content}>
      <Grid container>
        <Grid item className={classes.editor}>
          <InfoPageViewToolbar
            handleClick={handleClick}
            data={data.updated_by}
          />
          <div>
            <PageEditor pageContent={data.content} readOnly />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default InfoPageView
