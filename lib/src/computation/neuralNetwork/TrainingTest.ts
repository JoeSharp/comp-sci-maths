export interface TrainingTest {
    inputs: number[];
    desired: number;
}

export type TrainingTestGenerator = () => TrainingTest;

export default TrainingTest;