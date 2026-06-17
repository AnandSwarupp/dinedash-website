import { ImageResponse } from "next/og";

export const alt = "DineDash — Pay First. Eat Fast. Get Money Back.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFBF5",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "#DCFCE7",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "#DCFCE7",
            opacity: 0.5,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
          <div
            style={{
              width: 84,
              height: 84,
              background: "#16A34A",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 40, height: 40, background: "#fff", clipPath: "polygon(60% 0,0 60%,45% 60%,40% 100%,100% 40%,55% 40%)" }} />
          </div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, color: "#1C1917" }}>
            Dine<span style={{ color: "#16A34A" }}>Dash</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 46,
            fontWeight: 800,
            color: "#1C1917",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.25,
          }}
        >
          Pay First. Eat Fast. Get Money Back.
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#78716C", marginTop: 20 }}>
          Finish in under 15 minutes and get up to 30% back.
        </div>
      </div>
    ),
    { ...size }
  );
}
