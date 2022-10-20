import { NextPage } from "next";
import Link from "next/link";

const HomePage: NextPage = () => {
  return (
    <div>
      <h1>Computer Science and Maths</h1>

      <h2>Maths</h2>
      <Link href={"/maths/divisibility"}>Divisibility Rules</Link>
      <Link href={"/tom-binary"}>Tom Binary</Link>
    </div>
  );
};

export default HomePage;
