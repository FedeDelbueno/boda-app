const SectionDivider = ({ bg = "#EFE7D7" }) => (
  <div
    className="flex items-center justify-center"
    style={{ background: bg, paddingTop: "10px", paddingBottom: "10px" }}
  >
    <div className="flex items-center" style={{ gap: "10px" }}>
      <div
        style={{
          width: "56px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, #B0813F)",
        }}
      />
      <span style={{ color: "#B0813F", fontSize: "9px", lineHeight: 1 }}>✦</span>
      <div style={{ width: "20px", height: "1px", background: "#8B6530" }} />
      <span style={{ color: "#8B6530", fontSize: "7px", lineHeight: 1 }}>✦</span>
      <div style={{ width: "20px", height: "1px", background: "#8B6530" }} />
      <span style={{ color: "#B0813F", fontSize: "9px", lineHeight: 1 }}>✦</span>
      <div
        style={{
          width: "56px",
          height: "1px",
          background: "linear-gradient(90deg, #B0813F, transparent)",
        }}
      />
    </div>
  </div>
);

export default SectionDivider;
