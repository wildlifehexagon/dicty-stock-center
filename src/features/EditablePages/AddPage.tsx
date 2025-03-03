import React from "react"
import { useHistory } from "react-router-dom"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import { PageEditor } from "dicty-components-page-editor"
import { useCreateContentMutation } from "dicty-graphql-schema"
import AddPageBanner from "./AddPageBanner"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import NAMESPACE from "common/constants/namespace"
import { theme } from "app/layout/AppProviders"

const newTheme = createMuiTheme({
  ...theme,
  overrides: {
    MuiOutlinedInput: {
      input: {
        padding: theme.spacing(1),
      },
    },
  },
})

/**
 * This is the view component so an authorized user can add a new page.
 */

const AddPage = () => {
  const {
    state: { token },
  } = useAuthStore()
  const { user } = useAuthorization()
  const history = useHistory()
  const [createContent] = useCreateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const [textValue, setTextValue] = React.useState("")
  const [textValueError, setTextValueError] = React.useState(false)

  const onSave = (value: any) => {
    if (textValue === "") {
      setTextValueError(true)
      return
    }
    createContent({
      variables: {
        input: {
          name: textValue,
          created_by: user.id,
          content: JSON.stringify(value.toJSON()),
          namespace: NAMESPACE,
        },
      },
    })
    setTimeout(() => {
      history.push(`/information/${textValue}`)
    }, 800)
  }

  const onCancel = () => {
    history.push("/information")
  }

  return (
    <ThemeProvider theme={newTheme}>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <AddPageBanner
          textValue={textValue}
          setTextValue={setTextValue}
          textValueError={textValueError}
          setTextValueError={setTextValueError}
        />
        <PageEditor onCancel={onCancel} onSave={onSave} newPage={true} />
      </Box>
    </ThemeProvider>
  )
}

export default AddPage
