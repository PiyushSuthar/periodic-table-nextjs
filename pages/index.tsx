import Head from "next/head";
import styles from "../styles/Home.module.css";
import PeriodicData from "../data/periodicTable.json";
import Link from "next/link";

var getContrast = function (hexcolor) {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "black" : "white";
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Periodic Table</title>
      </Head>
      <div className={styles.parent}>
        {PeriodicData.map((value, index) => (
          <Link key={index} href={`/element/${value.name}`}>
            <div
              className={[styles[`div${index + 1}`], "tilt"].join(" ")}
              key={index}
            >
              <div
                data-tilt
                data-tilt-glare
                data-tilt-scale="1.5"
                className={styles.symbol}
                style={{
                  backgroundColor: `#${value.cpkHexColor || "ffffff"}`,
                  color: getContrast(`#${value.cpkHexColor || "ffffff"}`),
                }}
              >
                <p
                  style={{
                    transform: "translateZ(20px)",
                  }}
                >
                  {value.symbol}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    transform: "translateZ(20px)",
                  }}
                >
                  {value.atomicNumber}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
