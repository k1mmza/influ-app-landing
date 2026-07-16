import { ImageResponse } from "next/og";

// ponytail: placeholder mark — swap for a real logo file once brand assets are finalized.
export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F0512E",
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 7,
        }}
      >
        I
      </div>
    ),
    { ...size },
  );
}
