import './App.css'
import { GraphicShortTerm } from './ChartJs/GraphicShortTerm'
import { GraphicSimple } from './ChartJs/GraphicSimple'
import { GraphicSimpleWLine } from './ChartJs/GraphicSimpleWLine'

function App() {

  return (
    <>
      <h1>Graficos</h1>
      <div style={{ display: "flex", gap: '50px' }}>

        <div>
          <h2>Grafico Consumo "Visão padrão"</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <GraphicSimple />
          </div>
        </div>


        <div>
          <h2>Grafico Consumo "Visão grupo"</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <GraphicShortTerm obj={
              {
                values: [8, 15, 25, 30, 18, 15, 10, 27, 35, 19, 13, 12],
                max: 25,
                min: 15
              }
            } />
          </div>
        </div>

      </div>

      <div style={{ display: 'flex' }}>

        <div>

          <h2>Grafico Barra e Linha</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <GraphicSimpleWLine />
          </div>
        </div>

      </div>
    </>
  )
}

export default App
