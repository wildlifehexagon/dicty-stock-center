import React from "react"
import { Helmet } from "react-helmet"
import { withRouter } from "react-router-dom"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"
import StrainDetailsHeader from "./StrainDetailsHeader"
import StrainDetailsList from "./StrainDetailsList"
import StrainDetailsLoader from "./StrainDetailsLoader"
import PhenotypeTable from "./Phenotypes/PhenotypeTable"
import GraphQLErrorPage from "../GraphQLErrorPage"

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.up(1300 + theme.spacing.unit * 3 * 2)]: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
  })

const GET_STRAIN = gql`
  query Strain($id: ID!) {
    strain(id: $id) {
      id
      descriptor
      names
      systematic_name
      characteristics
      summary
      genetic_modification
      genotypes
      mutagenesis_method
      species
      parent {
        id
        descriptor
      }
      depositor
      plasmid
      dbxrefs
      genes
      phenotypes {
        phenotype
        note
        assay
        environment
        publication {
          authors {
            last_name
          }
          id
          pub_date
          title
          journal
          volume
          pages
        }
      }
    }
  }
`

/**
 * StrainDetailsContainer is the main component for an individual strain details page.
 * It is responsible for fetching the data and passing it down to more specific components.
 */

export const StrainDetailsContainer = (props: Props) => {
  const { classes, match } = props
  let title

  return (
    <Query query={GET_STRAIN} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return <StrainDetailsLoader />
        if (error) return <GraphQLErrorPage error={error} />

        if (data.strain.phenotypes.length > 0) {
          title = `Phenotype and Strain Details for ${data.strain.descriptor}`
        } else {
          title = `Strain Details for ${data.strain.descriptor}`
        }

        return (
          <Grid container spacing={16} className={classes.layout}>
            <Helmet>
              <title>{title} - Dicty Stock Center</title>
              <meta
                name="description"
                content={`Dicty Stock Center strain details page for ${
                  data.strain.descriptor
                }`}
              />
            </Helmet>
            <Grid item xs={12}>
              <StrainDetailsHeader title={title} />
            </Grid>
            <Grid item xs={12}>
              {data.strain.phenotypes.length > 0 && (
                <PhenotypeTable data={data.strain.phenotypes} />
              )}
              <StrainDetailsList data={data.strain} />
            </Grid>
          </Grid>
        )
      }}
    </Query>
  )
}

export default withRouter(withStyles(styles)(StrainDetailsContainer))
