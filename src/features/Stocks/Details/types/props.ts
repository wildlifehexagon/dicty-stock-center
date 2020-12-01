type PhenotypeData = {
  phenotype: string
  note: string
  assay?: string
  environment?: string
  publication: {
    doi: string
    id: string
  }
}

type StrainDetails = {
  type: "strain"
  id: string
  label: string
  names: Array<string>
  systematic_name: string
  characteristics: Array<string>
  summary: string
  editable_summary?: string
  genetic_modification: string
  genotypes: Array<string>
  mutagenesis_method: string
  species: string
  parent: {
    id: string
    label: string
  }
  depositor: string
  plasmid: string
  publications: Array<{
    doi: string
    id: string
  }>
  dbxrefs: Array<string>
  genes: Array<{
    name: string
  }>
  phenotypes: Array<PhenotypeData>
  in_stock: boolean
}

type StrainDetailsProps = {
  data: StrainDetails
}

type PlasmidDetails = {
  type: "plasmid"
  id: string
  name: string
  summary: string
  depositor: string
  publications: Array<{
    id: string
    doi: string
  }>
  dbxrefs: Array<string>
  genes: Array<{
    name: string
  }>
  image_map: string
  sequence: string
  keywords: Array<string>
  genbank_accession: string
  in_stock: boolean
}

type PlasmidDetailsProps = {
  data: PlasmidDetails
}

type PhenotypeProps = {
  /** Phenotype data */
  item: PhenotypeData
}

type StrainWithPhenotype = {
  id: string
  label: string
  genes: Array<{
    name: string
  }>
  publications: Array<Publication>
}

type Publication = {
  id: string
  pub_date: string
  title: string
  journal: string
  volume: string
  pages: string
  authors: Array<{
    last_name: string
  }>
}

export type {
  PhenotypeData,
  StrainDetails,
  StrainDetailsProps,
  PlasmidDetails,
  PlasmidDetailsProps,
  PhenotypeProps,
  StrainWithPhenotype,
  Publication,
}
