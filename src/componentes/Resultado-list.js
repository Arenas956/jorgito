import React from 'react'
import ResultadoRow from './Resultado-row'

class ResultadoList extends React.Component {

  render() {
    let numbers = 0;
    return (
      <tbody>
        {
          this.props.listado.map((content) => {
            numbers = numbers + 1;
            return <ResultadoRow
              openModalDetalle={this.props.openModalDetalle}
              number={numbers}
              tipo={this.props.tipo}
              subtipo={this.props.subtipo}
              key={content.filename}
              content={content} />
          })
        }
      </tbody>
    )
  }
}

export default ResultadoList