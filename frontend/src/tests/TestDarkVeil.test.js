// src/pages/TestDarkVeil.js
import DarkVeil from "../components/DarkVeil";

export default function TestDarkVeil() {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        background: "#000",
      }}
    >
      <DarkVeil
        hueShift={40}
        noiseIntensity={0.1}
        scanlineIntensity={0.4}
        scanlineFrequency={2.0}
        warpAmount={0.5}
        speed={0.8}
      />
    </div>
  );
}
