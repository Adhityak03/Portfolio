import { Home, Skills, Projects, Resume, Contact } from "./sections";
import { Navbar, Footer } from "./components/layout";
import { GlobalStyles } from "./styles/GlobalStyles";

export default function Portfolio() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Home />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
