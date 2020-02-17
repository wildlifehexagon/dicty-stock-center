import React from "react"
import { BrowserRouter } from "react-router-dom"
import { MockedProvider, MockedResponse } from "@apollo/react-testing"
import { AuthContext, authReducer } from "components/authentication/AuthStore"

type Props = {
  children: any
  mocks: ReadonlyArray<MockedResponse>
}

const MockAuthProvider = ({ children, mocks }: Props) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA",
    user: {
      first_name: "Art",
      last_name: "Vandelay",
      email: "george@vandelayindustries.com",
    },
    provider: "google",
    isAuthenticated: true,
  })
  return (
    <AuthContext.Provider value={[state, dispatch]}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>{children}</BrowserRouter>
      </MockedProvider>
    </AuthContext.Provider>
  )
}

export { MockAuthProvider }
