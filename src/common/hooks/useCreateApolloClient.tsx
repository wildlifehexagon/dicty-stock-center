import React from "react"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist"
import localForage from "localforage"
import { mutationList } from "common/graphql/mutations"
import {
  listStrainsWithAnnotationPagination,
  listPlasmidsWithAnnotationPagination,
  listStrainsPagination,
  listPlasmidsPagination,
} from "common/graphql/pagination"
import { useAuthStore } from "features/Authentication/AuthStore"

// SCHEMA_VERSION needs to be manually updated when there is a breaking schema change.
// "1" is linked to https://github.com/dictyBase/graphql-schema/tree/17f3fda1bffe1c8348690ee9b9e4be6fc653d4f4
const SCHEMA_VERSION = "1" // Must be a string.
const SCHEMA_VERSION_KEY = "dsc-apollo-schema-version"
const DSC_CACHE_KEY = "dsc-apollo-cache-persist"
const DSC_AUTH_CACHE_KEY = "dsc-auth-apollo-cache-persist"

const isMutation = (value: string) => {
  if (mutationList.includes(value)) {
    return true
  }
  return false
}

const getGraphQLServer = (url: string, deployEnv: string, origin: string) => {
  if (deployEnv === "staging" && origin === "https://dictycr.org") {
    return process.env.REACT_APP_ALT_GRAPHQL_SERVER
  }
  return url
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        listPlasmids: listPlasmidsPagination(),
        listStrains: listStrainsPagination(),
        listStrainsWithAnnotation: listStrainsWithAnnotationPagination(),
        listPlasmidsWithAnnotation: listPlasmidsWithAnnotationPagination(),
      },
    },
  },
})

const authLink = setContext((request, { headers }) => {
  const mutation = isMutation(request.operationName || "")
  return {
    headers: {
      ...headers,
      "X-GraphQL-Method": mutation ? "Mutation" : "Query",
    },
  }
})

const server = getGraphQLServer(
  process.env.REACT_APP_GRAPHQL_SERVER,
  process.env.DEPLOY_ENV,
  window.location.origin,
)

const link = authLink.concat(
  createHttpLink({
    uri: `${server}/graphql`,
    credentials: "include",
  }),
)

const useCreateApolloClient = () => {
  const [{ isAuthenticated }] = useAuthStore()
  const [cacheInitializing, setCacheInitializing] = React.useState(true)

  React.useEffect(() => {
    const initializeCache = async () => {
      const persistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(localForage),
        key: isAuthenticated ? DSC_AUTH_CACHE_KEY : DSC_CACHE_KEY,
      })
      const currentVersion = await localForage.getItem(SCHEMA_VERSION_KEY)
      if (currentVersion === SCHEMA_VERSION) {
        // If the current version matches the latest version,
        // we're good to go and can restore the cache.
        await persistor.restore()
      } else {
        // Otherwise, we'll want to purge the outdated persisted cache
        // and mark ourselves as having updated to the latest version.
        await persistor.purge()
        await localForage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
      }
      setCacheInitializing(false)
    }

    initializeCache()
  }, [isAuthenticated])

  const client = new ApolloClient({
    cache,
    link,
  })

  return { client, cacheInitializing }
}

export { isMutation, getGraphQLServer }
export default useCreateApolloClient
