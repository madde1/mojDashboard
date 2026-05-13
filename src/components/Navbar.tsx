import { useEffect, useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const links = [
    { name: "Vår dag", href: "#ourday" },
    { name: "Bra att veta", href: "#goodtoknow" },
    { name: "Bröllopsfoton", href: "#wedding-photos" },
    { name: "Musik", href: "#music" },
    { name: "Quiz", href: "#quiz" },
    { name: "OSA", href: "#osa" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ease-in-out ${
        scrolled ? "bg-white text-gray-900 shadow-md" : "bg-transparent text-black"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <a href="#hero" className="parisienne text-2xl font-bold z-50" >Madde & Jonas
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`relative pb-1 border-b-2 border-transparent transition-all duration-300 ${
                  scrolled
                    ? "hover:border-gray-900 text-gray-900"
                    : "hover:border-black text-black"
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Mobile Slide-in Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-center p-6 space-y-6 mt-16 pt-10">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-black hover:border-b-2 hover:border-gray-900 pb-1 transition-all duration-300 text-2xl "
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}