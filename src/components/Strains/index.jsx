import React, { Component } from 'react'
import { Table } from 'reactabular'
import 'styles/custom.scss'

export default class Strains extends Component {
    displayName = 'strains list'
    componentDidMount() {
        const { stockCenterActions } = this.props
        stockCenterActions.fetchStrainList()
    }
    render() {
        const { stockCenter } = this.props
        const { data } = stockCenter.strainCatalog
        return (
          <div className="container">
              <h1 className="dicty-header text-center">Strain Catalog</h1>
              <div className="table-responsive">
                  { data &&
                    <Table.Provider
                      className="table table-hover"
                      columns={ data.columns }>
                        <Table.Header />
                        <Table.Body rows={ data.rows } rowKey="id" />
                    </Table.Provider>
                  }
              </div>
          </div>
        )
    }
}
