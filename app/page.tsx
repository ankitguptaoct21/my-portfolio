import Site from "./components/Site";
import PersonJsonLd from "./components/PersonJsonLd";
import { EN } from "./locales/en";
import { PROFILE } from "./content";
import { SITE_URL } from "./site";

// theankitgupta.com: the English site for employers in India.
export default function Home() {
  return (
    <>
      <PersonJsonLd url={SITE_URL} description={PROFILE.summary} />
      <Site copy={EN} />
    </>
  );
}
