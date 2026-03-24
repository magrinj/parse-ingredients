import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const features = [
  {
    title: "Multi-Language",
    description:
      "6 languages built-in: English, French, Spanish, Italian, German, and Portuguese. Extensible locale system for adding more.",
  },
  {
    title: "Parse + Combine + Pretty",
    description:
      "Three complementary functions: parse ingredient strings into structured objects, combine duplicates, and format them back to readable text.",
  },
  {
    title: "Zero Dependencies",
    description:
      "Pure TypeScript, lightweight and fast. No external packages to audit or worry about. Tree-shakeable ESM and CJS builds.",
  },
];

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("heroBanner", styles.hero)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.installCommand}>
          <code>npm install @magrinj/parse-ingredients</code>
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started"
          >
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/api"
          >
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className={clsx("col col--4")}>
              <div className="text--center padding-horiz--md padding-vert--lg">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Demo() {
  return (
    <section className={styles.demos}>
      <div className="container">
        <h2 className="text--center margin-bottom--lg">See it in action</h2>
        <div className={styles.codeGrid}>
          <div className={styles.codeItem}>
            <h4>English</h4>
            <pre className={styles.codeBlock}>
              <code>{`import parse from '@magrinj/parse-ingredients';

parse('1 1/2 cups of flour');
// {
//   quantity: '1.5',
//   unit: 'cup',
//   ingredient: 'flour',
//   article: 'of',
//   minQty: '1.5',
//   maxQty: '1.5'
// }`}</code>
            </pre>
          </div>
          <div className={styles.codeItem}>
            <h4>French</h4>
            <pre className={styles.codeBlock}>
              <code>{`import parse from '@magrinj/parse-ingredients';
import '@magrinj/parse-ingredients/locale/fr';

parse('2 cuillères à soupe de sucre');
// {
//   quantity: '2',
//   unit: 'cuillère à soupe',
//   ingredient: 'sucre',
//   article: 'de',
//   minQty: '2',
//   maxQty: '2'
// }`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <Features />
        <Demo />
      </main>
    </Layout>
  );
}
