import { navbarLinks } from "../constants/navbar-links";
const Navbar = () => {
  return (
    <header>
      <nav>
        {/* logo */}
        <img src="/logo.svg" alt="Apple Logo" />
        {/* Nav Links */}
        <div>
          <ul className="flex gap-3 text-sm">
            {navbarLinks.map((item) => (
              <li key={item}>
                <a href={item}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Search Icon */}
        <div className="flex-center gap-2">
          <button>
            <img src="/search.svg" alt="Apple search" />
          </button>
          <button>
            <img src="/cart.svg" alt="Apple cart" />
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
