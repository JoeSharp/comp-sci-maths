const decodeTomBinary = (number1s: number, number0s: number): string => {
  switch (number1s) {
    case 1:
      // A number
      return (number0s - 1).toString(10);
    case 2:
      // A negative number
      return (-1 * (number0s - 1)).toString(10);
    case 3:
      return String.fromCharCode("A".charCodeAt(0) + number0s - 1);
  }
  return "❌";
};

const TomBinary = () => {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>⬇️ Number 0's, ➡️ Number 1's</th>
            {[1, 2, 3].map((ones) => (
              <th key={ones}>{ones}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((zeros) => (
            <tr key={zeros}>
              <th>{zeros}</th>
              {[1, 2, 3].map((ones) => (
                <td key={ones}>{decodeTomBinary(ones, zeros)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TomBinary;
