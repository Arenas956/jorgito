import React from 'react';
import '../style/style.css';

class TableDuplicados extends React.Component {

    render() {
        let numbers = 0;
        return (
            <div>
                <table className="table" border="1">
                    <thead>
                        <tr>
                            <th className="th">#</th>
                            <th className="th">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista_detalle.map((content) => {
                                numbers = numbers + 1;
                                return (
                                    <tr key={numbers}>
                                        <td className="td otro">{numbers}</td>
                                        <td className="td otro">{content.registro}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TableDuplicados;