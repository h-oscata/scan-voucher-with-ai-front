import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { IoListSharp } from "react-icons/io5";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export const Header: React.FC = () => {
  return (
    <>
      <header>
        <div className="header-logo">
          <img src="./../assets/images/logo.png" alt="" />
          <p>SCAN IA</p>
        </div>
        <nav>
          <div className="nav-pages">
            <Link className="flex gap-2 items-center link-nav" to="/">
              <MdHome />
              <p className="mt-2">HOME</p>
            </Link>
            <Link className="link-nav gap-2 flex items-center" to="/history">
              <IoListSharp />
              <p className="mt-2">HISTORIAL</p>
            </Link>
            <Link className="link-nav gap-2 flex items-center" to="#">
              <BiSolidCommentDetail />
              <p className="mt-2">CONTACTO</p>
            </Link>
          </div>
          <div className="nav-social">
            <a
              target="_blank"
              className="link-nav social-link gap-2 flex items-center"
              href="https://github.com/h-oscata"
            >
              <FaGithub />
            </a>
            <a
              target="_blank"
              className="link-nav social-link gap-2 flex items-center"
              href="https://www.linkedin.com/in/luis-humberto-oscata/"
            >
              <FaLinkedin />
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};
