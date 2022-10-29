import fullAdder from "../fullAdder";
import halfAdder from "../halfAdder";

export default (a: boolean[], b: boolean[]) => {
  const { sum: sum0, carry: c0 } = halfAdder(a[0], b[0]);
  const { sum: sum1, carry: c1 } = fullAdder(a[1], b[1], c0);
  const { sum: sum2, carry: c2 } = fullAdder(a[2], b[2], c1);
  const { sum: sum3, carry: c3 } = fullAdder(a[3], b[3], c2);
  const { sum: sum4, carry: c4 } = fullAdder(a[4], b[4], c3);
  const { sum: sum5, carry: c5 } = fullAdder(a[5], b[5], c4);
  const { sum: sum6, carry: c6 } = fullAdder(a[6], b[6], c5);
  const { sum: sum7, carry: c7 } = fullAdder(a[7], b[7], c6);
  const { sum: sum8, carry: c8 } = fullAdder(a[8], b[8], c7);
  const { sum: sum9, carry: c9 } = fullAdder(a[9], b[9], c8);
  const { sum: sum10, carry: c10 } = fullAdder(a[10], b[10], c9);
  const { sum: sum11, carry: c11 } = fullAdder(a[11], b[11], c10);
  const { sum: sum12, carry: c12 } = fullAdder(a[12], b[12], c11);
  const { sum: sum13, carry: c13 } = fullAdder(a[13], b[13], c12);
  const { sum: sum14, carry: c14 } = fullAdder(a[14], b[14], c13);
  const { sum: sum15, carry: carry } = fullAdder(a[15], b[15], c14);

  return {
    sum: [
      sum0,
      sum1,
      sum2,
      sum3,
      sum4,
      sum5,
      sum6,
      sum7,
      sum8,
      sum9,
      sum10,
      sum11,
      sum12,
      sum13,
      sum14,
      sum15,
    ],
    carry,
  };
};
