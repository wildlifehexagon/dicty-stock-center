// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import AvailabilityCard from "components/Stocks/Details/common/AvailabilityCard"
import RelatedPlasmidsCard from "./RelatedPlasmidsCard"
import { PlasmidDetailsProps } from "components/Stocks/Details/types/props"

const PlasmidDetailsRightColumn = ({ data }: PlasmidDetailsProps) => (
  <Grid item xs={12} md={3} lg={2}>
    <AvailabilityCard data={data} stockType="plasmid" />
    <RelatedPlasmidsCard genes={data.genes} />
  </Grid>
)

export default PlasmidDetailsRightColumn
