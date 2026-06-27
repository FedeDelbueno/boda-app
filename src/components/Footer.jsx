const Footer = () => {
  return (
    <footer
      className="relative py-14 px-6 md:px-20 text-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #3D2800, #4A3000, #5C3A00)' }}
    >
      {/* Lavenders decorativos muy sutiles sobre el fondo oscuro */}
      <img src="/images/lavender.png" className="absolute top-0 left-0 w-24 md:w-36 opacity-[0.12] pointer-events-none scale-x-[-1]" alt="" />
      <img src="/images/lavender.png" className="absolute top-0 right-0 w-24 md:w-36 opacity-[0.12] pointer-events-none" alt="" />
      <p
        className="font-script mb-4 drop-shadow"
        style={{ color: '#FDE68A', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
      >
        Lucia &amp; Agustín
      </p>

      <div
        className="w-28 h-px mx-auto mb-6"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
      />

      <p className="font-body text-amber-200 mb-2">
        © {new Date().getFullYear()} Lucia & Agustín · Todos los derechos reservados.
      </p>
      <p className="font-body text-amber-300 mb-2">
        Diseñado y creado con ❤️ por <strong className="text-amber-100">Federico Delbueno</strong>
      </p>
      <p className="font-body text-amber-400">
        Usá nuestro hashtag{" "}
        <strong className="text-amber-200">#LUYAGUS2026</strong>{" "}
        para compartir tus fotos.
      </p>
    </footer>
  );
};

export default Footer;
