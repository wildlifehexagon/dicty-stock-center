// @flow
import React from "react"
import { Helmet } from "react-helmet"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/styles"
import StockDetailsHeader from "components/Stocks/DetailsPageItems/StockDetailsHeader"
import StockDetailsLoader from "components/Stocks/DetailsPageItems/StockDetailsLoader"
import GraphQLErrorPage from "components/Errors/GraphQLErrorPage"
import StrainCatalogList from "components/Stocks/Strains/Catalog/StrainCatalogList"
import StrainCatalogAppBar from "components/Stocks/Strains/Catalog/StrainCatalogAppBar"

export const GET_STRAIN_LIST = gql`
  query StrainList($cursor: Int!) {
    listStrains(input: { cursor: $cursor, limit: 10 }) {
      nextCursor
      strains {
        id
        label
        summary
        in_stock
      }
    }
  }
`

const useStyles = makeStyles({
  layout: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    "& a": {
      textDecoration: "none",
    },
  },
})

/**
 * StrainCatalogContainer is the main component for the strain catalog page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

export const StrainCatalogContainer = () => {
  const classes = useStyles()

  return (
    <Query query={GET_STRAIN_LIST} variables={{ cursor: 0 }}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <StockDetailsLoader />
        if (error) return <GraphQLErrorPage error={error} />

        return (
          <Grid container className={classes.layout}>
            <Helmet>
              <title>Strain Catalog - Dicty Stock Center</title>
              <meta
                name="description"
                content={"Dicty Stock Center strain catalog"}
              />
            </Helmet>
            <Grid item xs={12}>
              <StockDetailsHeader title="Strain Catalog" />
            </Grid>
            <Grid item xs={12}>
              <StrainCatalogAppBar />
            </Grid>
            <Grid item xs={12}>
              <StrainCatalogList
                data={data.listStrains.strains}
                fetchMore={fetchMore}
                cursor={data.listStrains.nextCursor}
              />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export default StrainCatalogContainer
