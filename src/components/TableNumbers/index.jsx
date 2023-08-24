import React from 'react'

const TableNumbers = ({data, title}) => {
  return (
    <div><div className="table">
    <table className="dash-table">
      <thead>
        <tr>
          <th>{title.first}</th>
          <th>{title.second}</th>
          <th>{title.third}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((value, key) => {
          return (
            <tr key={key}>
              <td>{value.TFN}</td>
              <td>{value.Verizon}</td>
              <td>{value.State}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  <div className="buttons">
    <button>Prev</button>
    <button>Next</button>
  </div></div>
  )
}

export default TableNumbers