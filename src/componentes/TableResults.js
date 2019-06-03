import React from 'react';
import TableHeader from './Table-Header';
import ResultadoList from './Resultado-list';

class TableResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo: 'good',
            subtipo: 'insert',
            listado: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.archivo !== this.props.archivo) {
            this.setState((prevState) => ({
                listado: this.props.good_files
            }))
        }
    }

    selectGoodTable() {
        this.setState({
            tipo: 'good',
            subtipo: 'insert',
            listado: this.props.good_files
        })
    }
    selectBadTable() {
        this.setState({
            tipo: 'bad',
            listado: this.props.bad_files
        })
    }
    selectDuplexTable() {
        this.setState({
            tipo: 'good',
            subtipo: 'duplex',
            listado: this.props.good_files
        })
    }

    render() {
        if (!this.props.archivo) {
            if (this.props.select) {
                return (
                    <div>
                        <div className="container">
                            <div className="row center-xs">
                                Cargando...
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div></div>
                )
            }
        } else {
            if (this.props.tipo === "zip") {
                return (
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-md-4">
                                    <form>
                                        <label className="label-carga">
                                            Total registros procesados:
                                        </label>
                                        <label className="label-number">
                                            {this.props.total_registros_procesados}
                                        </label>
                                    </form>
                                    <form>
                                        <label className="label-carga">
                                            - Total registros insertados: {this.props.total_registros_insertados}
                                        </label>
                                    </form>
                                    <form>
                                        <label className="label-carga">
                                            - Total registros duplicados: {this.props.total_registros_excluidos}
                                        </label>
                                    </form>
                                    <hr />
                                    <p className="label-carga">Archivo: {this.props.archivo}</p>
                                </div>
                                <div className="col-xs-12 col-md-8">
                                    <br />
                                    <div className="row center-xs">
                                        <button
                                            className="myButtonLeft"
                                            onClick={() => this.selectGoodTable()}
                                        >Insertados</button>
                                        <button
                                            className="myButtonCenter"
                                            onClick={() => this.selectDuplexTable()}
                                        >Duplicados</button>
                                        <button
                                            className="myButtonRight"
                                            onClick={() => this.selectBadTable()}
                                        >Fallidos</button>
                                    </div>
                                    <br /><br />
                                    <table className="table">
                                        <TableHeader />
                                        <ResultadoList
                                            openModalDetalle={this.props.openModalDetalle}
                                            tipo={this.state.tipo}
                                            subtipo={this.state.subtipo}
                                            listado={this.state.listado}
                                        />
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <div className="row">
                            <div className="col-xs-12 col-md-4">
                                <form>
                                    <label className="label-carga">
                                        Total registros procesados:
                                        </label>
                                    <label className="label-number">
                                        {this.props.total_registros_procesados}
                                    </label>
                                </form>
                                <form>
                                    <label className="label-carga">
                                        - Total registros insertados: {this.props.total_registros_insertados}
                                    </label>
                                </form>
                                <form>
                                    <label className="label-carga">
                                        - Total registros duplicados: {this.props.total_registros_excluidos}
                                    </label>
                                </form>
                                <hr />
                                <p className="label-carga">Archivo: {this.props.archivo}</p>
                                <p className="label-carga">Estado: {this.props.status}</p>
                            </div>
                            <div className="col-xs-12 col-md-8">
                                <br /><br />
                                <div align="center">
                                    <button className="myButtonCenter" onClick={(e)=>this.props.openModalDetalle(this.props.lista_detalle)}>Ver Registros Duplicados</button>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        }
    }
}

export default TableResults;