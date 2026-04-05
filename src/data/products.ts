export interface Product {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  tags: string[];
  available: boolean;
}

export const products: Product[] = [
  {
    id: "bbs",
    title: "Brothers Bond Banking System",
    description:
      "Build a complete banking data pipeline — ingest transactions, process incremental loads, detect anomalies, and generate real-time reports.",
    difficulty: "Intermediate",
    duration: "30 Days",
    tags: ["SQL", "Python", "Airflow", "Postgres"],
    available: true,
  },
  {
    id: "ecommerce",
    title: "E-commerce Pipeline",
    description:
      "Process orders, inventory, and customer events at scale using streaming and batch architectures.",
    difficulty: "Intermediate",
    duration: "30 Days",
    tags: ["Kafka", "Spark", "dbt", "Snowflake"],
    available: false,
  },
  {
    id: "streaming",
    title: "Streaming Data Pipeline",
    description:
      "Real-time ingestion and processing of high-velocity event streams with exactly-once semantics.",
    difficulty: "Advanced",
    duration: "45 Days",
    tags: ["Kafka", "Flink", "Delta Lake"],
    available: false,
  },
  {
    id: "healthcare",
    title: "Healthcare Data Platform",
    description:
      "Design a HIPAA-compliant data platform handling patient records, lab results, and clinical data.",
    difficulty: "Advanced",
    duration: "45 Days",
    tags: ["FHIR", "Spark", "AWS Glue"],
    available: false,
  },
];
