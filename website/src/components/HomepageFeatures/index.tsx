import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Minimal by design",
    description:
      "Signux gives you just enough: state, events, reactivity. Nothing more, nothing hidden.",
  },
  {
    title: "Composable and testable",
    description:
      "Reactive logic is just code. Pure functions and small operators make everything predictable.",
  },
  {
    title: "Framework-agnostic",
    description:
      "Use it with React, Angular, or none at all. Signux doesn't care — it just reacts.",
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={"col col--4"}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
