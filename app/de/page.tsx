import Site from "../components/Site";
import PersonJsonLd from "../components/PersonJsonLd";
import { DE, DE_META } from "../locales/de";
import { DE_SITE_URL } from "../site";

// deu.theankitgupta.com: the German site for employers in Germany.
export default function GermanHome() {
  return (
    <>
      <PersonJsonLd url={DE_SITE_URL} description={DE_META.schemaDescription} />
      <Site copy={DE} />
    </>
  );
}
