import { calculateInvestmentResults, formatter } from '../util/investment.js';

//!El array es creado una vez y usando la función calculateInvestmentResults lo que hace es ir pusheando items dentro del mismo array en memoria. Esto es porque el array nunca se resetea porque está fuera de la función.
// const results = [];

export default function Results({ input }) {
  const results = [];

  calculateInvestmentResults(input, results);

  //! Al poner una duración negativa o igual a 0 lo que hace la función  calculateInvestmentResults es no mutar el array vacío, no hace el cálculo porque la condición no se cumple para entrar en el bucle for. Entonces ponemos una guarda si el array está vacío:
  //****************************** */
  if (results.length === 0) {
    return <p className="center">Invalid input data provided</p>;
  }
  //****************************** */

  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((yearData) => {
          const totalInterest =
            yearData.valueEndOfYear -
            yearData.annualInvestment * yearData.year -
            initialInvestment;
          const totalAmountInvested = yearData.valueEndOfYear - totalInterest;

          return (
            <tr key={yearData.year}>
              <td>{yearData.year}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
