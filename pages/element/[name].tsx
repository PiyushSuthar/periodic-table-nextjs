import { GetStaticPaths, GetStaticProps } from "next";
import periodicData from "../../data/periodicTable.json";

interface Data {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: string;
  cpkHexColor: string;
  electronicConfiguration: string;
  electronegativity: number;
  atomicRadius: number;
  ionRadius: string;
  vanDerWaalsRadius: number;
  ionizationEnergy: number;
  electronAffinity: number;
  oxidationStates: string;
  standardState: string;
  bondingType: string;
  meltingPoint: number;
  boilingPoint: number;
  density: number;
  groupBlock: string;
  yearDiscovered: number;
}

const ElementPage = ({ data }: { data: Data }) => {
  return (
    <div>
      {data.name}
      {data.oxidationStates}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = periodicData.map(({ name }) => ({
    params: {
      name,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = periodicData.find(({ name }) => {
    return name === params.name;
  });
  if (data) {
    return {
      props: {
        data,
      },
      notFound: false,
    };
  }

  return {
    notFound: true,
  };
};

export default ElementPage;
