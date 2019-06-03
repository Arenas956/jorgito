import React from "react";
import "../style/style.css";
import "../style/table.css";
import "../style/button.css";
import "../style/fileInput.css";
import "../style/label.css";
import "../flexboxgrid.min.css";
import TableResults from "./TableResults";
import HelpModal from "./HelpModal";
import DetalleModal from "./DetalleModal";

//prueba
import pruebaExcel from "./pruebaExcel";
import pruebaZip from "./pruebaZip";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      excelUrl: "",
      select: false,
      usuario: "INVITADO",
      value: "",
      formato: "",
      archivo: null,
      total_registros_insertados: 0,
      total_registros_procesados: 0,
      total_registros_excluidos: 0,
      good_files: null,
      bad_files: null,
      status_excel: "",
      help: false,
      detalle: false,
      lista_detalle: []
    };
  }
  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      select: true
    });

    var data = new FormData();
    data.append("file", this.state.file);
    data.append("tipo", this.state.value);
    data.append("name", this.state.usuario);
    data.append("formato", this.state.formato);

    console.log(this.state.file);
    this.setState(prevState => ({ uniqueId: prevState.uniqueId + 1 }));

    let sentData = {
      method: "POST",
      //mode: 'no-cors',
      body: data
    };

    fetch("http://159.65.75.200:5000/upload", sentData)
      .then(response => {
        if (this.state.value === "zip") {
          response.json().then(json =>
            this.setState({
              archivo: json.file,
              total_registros_insertados:
                json.good_files.total_registros_insertados,
              total_registros_procesados:
                json.good_files.total_registros_procesados,
              total_registros_excluidos:
                json.good_files.total_registros_excluidos,
              good_files: json.good_files.lista_detalle,
              bad_files: json.bad_files
            })
          );
        } else {
          response.json().then(json =>
            this.setState({
              archivo: json.filename,
              status_excel: json.status,
              total_registros_insertados: json.registros_insertados,
              total_registros_procesados: json.registros_procesados,
              total_registros_excluidos: json.registros_excluidos,
              lista_detalle: json.registros_duplicados_detalle
            })
          );
        }
      })
      .catch(error => {
        alert(error);
        console.error(error);
      });
  };

  componentDidMount() {
    //captura del nombre de llegada
    var name = "nombre";
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(window.location.search);
    var usuario =
      results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    //muestra en consola
    console.log(usuario);
    //modificamos el usuario
    if (usuario !== "") {
      this.setState({
        usuario: usuario
      });
    }

    /*
                this.setState({
                    value: 'zip',
                    archivo: pruebaZip.file,
                    total_registros_insertados: pruebaZip.good_files.total_registros_insertados,
                    total_registros_procesados: pruebaZip.good_files.total_registros_procesados,
                    total_registros_excluidos: pruebaZip.good_files.total_registros_excluidos,
                    good_files: pruebaZip.good_files.lista_detalle,
                    bad_files: pruebaZip.bad_files
                })*/
    /*
                this.setState({
                    value: 'excel',
                    archivo: pruebaExcel.filename,
                    status_excel: pruebaExcel.status,
                    total_registros_insertados: pruebaExcel.registros_insertados,
                    total_registros_procesados: pruebaExcel.registros_procesados,
                    total_registros_excluidos: pruebaExcel.registros_excluidos,
                    lista_detalle: pruebaExcel.registros_duplicados_detalle
                })
                */
  }

  handleFileChange(e) {
    e.preventDefault();

    this.setState({
      archivo: null,
      total_inserciones: 0,
      good_files: [],
      bad_files: [],
      status_excel: "",
      select: false
    });

    try {
      let reader = new FileReader();
      let file = e.target.files[0];
      let tipoFile = "";
      if (file.name.endsWith(".xls")) {
        tipoFile = "excel";
      } else if (file.name.endsWith(".zip")) {
        tipoFile = "zip";
      }
      reader.onloadend = () => {
        this.setState({
          file: file,
          excelUrl: reader.result,
          value: tipoFile
        });
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
    }
  }

  handClearSelectedOption = () => {
    this.setState(() => ({ help: false }));
  };

  openModalDetalle = lista_detalle => {
    this.setState(() => ({
      lista_detalle: lista_detalle,
      detalle: true
    }));
  };
  closeModalDetalle = () => {
    this.setState(() => ({
      detalle: false
    }));
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-10">
            <h1 className="h1">MÃ³dulo Carga de Datos</h1>
          </div>
          <div className="col-xs-2">
            <a href="http://siga-fisi.herokuapp.com/dashboard">
              <img
                className="img"
                src="http://www.clker.com/cliparts/R/L/N/Y/N/e/house-logo-hi.png"
                alt="HOME"
                height="60"
                width="60"
                align="right"
              />
            </a>
          </div>
        </div>
        <div className="vista">
          <label className="label">USUARIO: {this.state.usuario}</label>
          <form>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <input
                  type="file"
                  className="fileInput"
                  pattern=".*[^ ].*"
                  required
                  accept=".xls, .zip"
                  onChange={e => this.handleFileChange(e)}
                />
              </div>
              <div className="col-xs-4 col-md-2">
                <input
                  className="labelinput"
                  value={this.state.value}
                  disabled
                />
              </div>
              <div className="col-xs-6 col-md-3">
                <select
                  className="input"
                  placeholder="Seleccione formato"
                  required
                  value={this.state.formato}
                  onChange={e => {
                    this.setState({ formato: e.target.value });
                  }}
                >
                  <option value="" disabled>
                    Tipo de Archivo
                  </option>
                  <option value="1">(1) Despues del 2010</option>
                  <option value="2">(2) Del 2010 o antes</option>
                </select>
              </div>
              <div className="col-xs-2 col-md-1">
                <input
                  className="myButton"
                  type="button"
                  onClick={e => {
                    this.setState({ help: true });
                  }}
                  value="?"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-0 col-md-9" />
              <div className="col-xs-12 col-md-3">
                <input
                  className="myButton"
                  type="submit"
                  value="CARGAR"
                  onClick={e => {
                    if (
                      this.state.excelUrl.trim() === "" ||
                      this.state.value === "" ||
                      this.state.formato === ""
                    ) {
                      console.log("Complete los campos.");
                    } else {
                      this.handleSubmit(e);
                    }
                  }}
                />
              </div>
            </div>
          </form>

          <HelpModal
            help={this.state.help}
            handClearSelectedOption={this.handClearSelectedOption}
          />
          <br />
          <hr />
          <br />
          <div>
            <TableResults
              archivo={this.state.archivo}
              total_registros_insertados={this.state.total_registros_insertados}
              total_registros_excluidos={this.state.total_registros_excluidos}
              total_registros_procesados={this.state.total_registros_procesados}
              good_files={this.state.good_files}
              bad_files={this.state.bad_files}
              status={this.state.status_excel}
              select={this.state.select}
              tipo={this.state.value}
              openModalDetalle={this.openModalDetalle}
              lista_detalle={this.state.lista_detalle}
            />
          </div>
          <DetalleModal
            detalle={this.state.detalle}
            closeModalDetalle={this.closeModalDetalle}
            lista_detalle={this.state.lista_detalle}
          />
        </div>
      </div>
    );
  }
}

export default App;
