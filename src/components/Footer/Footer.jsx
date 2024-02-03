import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__block">
        <p className="footer__year">© 2020</p>
        <div className="footer__links">
          <a className="footer__link" href="#" target="_blank" rel="noreferrer">
            Яндекс.Практикум
          </a>
          <a className="footer__link" href="#" target="_blank" rel="noreferrer">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
