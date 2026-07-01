const Footer = () => {
  return (
    <footer
      className="relative py-14 px-6 md:px-20 text-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #172420, #20302A, #20302A)' }}
    >
      {/* Lavenders decorativos */}
      <img src="/images/lavender.png" className="absolute top-0 left-0 w-24 md:w-36 opacity-[0.1] pointer-events-none scale-x-[-1]" alt="" />
      <img src="/images/lavender.png" className="absolute top-0 right-0 w-24 md:w-36 opacity-[0.1] pointer-events-none" alt="" />

      {/*  <p
        className="font-script mb-4 drop-shadow"
        style={{ color: '#F6F1E7', fontSize: 'clamp(2.8rem, 7vw, 4rem)' }}
      >
        Lucia &amp; Agustín
      </p>
      */}
      
      <div
        className="w-28 h-px mx-auto mb-6"
        style={{ background: 'linear-gradient(90deg, transparent, #B0813F, transparent)' }}
      />

      <p className="font-body text-lg mb-2" style={{ color: "rgba(246,241,231,0.7)" }}>
        © {new Date().getFullYear()} Lucia & Agustín · Todos los derechos reservados.
      </p>
      <p className="font-body text-lg mb-2" style={{ color: "rgba(199,160,99,0.85)" }}>
        Hecho con ❤ para nuestro gran día
      </p>
      <p className="font-body text-lg" style={{ color: "rgba(199,160,99,0.7)" }}>
        Usá nuestro hashtag{" "}
        <strong style={{ color: "#C7A063" }}>#LUYAGUS2026</strong>{" "}
        para compartir tus fotos.
      </p>
    </footer>
  );
};

export default Footer;
