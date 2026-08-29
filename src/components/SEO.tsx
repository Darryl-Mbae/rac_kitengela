import { Helmet } from "react-helmet-async";
import type { SEOProps } from "../utils/seo";

interface SEOComponentProps extends SEOProps {}

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  schema,
}: SEOComponentProps) {
  const defaultTitle = "Rotaract Club of Kitengela - Building Leaders, Creating Impact";
  const defaultDescription =
    "Join a community of young leaders dedicated to service, leadership development, and creating positive change in Kitengela.";

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = ogImage || "/images/logo-wheel.png";
  const finalCanonical = canonical || "https://rotaractkitengela.org/";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={finalCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="Rotaract Club of Kitengela" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalCanonical} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />

      {/* Schema.org Structured Data */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
