import Link from "next/link";

const TomBinary = () => {
  return (
    <div>
      <h1>Tom Binary</h1>

      <Link href={"/"}>Home</Link>

      <table>
        <thead>
          <tr>
            {Array(4)
              .fill(true)
              .map((_, i) => (
                <th key={i}>{i}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(4)
            .fill(true)
            .map((_, row) => (
              <tr key={row}>
                {Array(4)
                  .fill(true)
                  .map((_, column) => (
                    <td key={column}>
                      {row},{column}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TomBinary;
