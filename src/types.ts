/**
 * Core Types — Portfolio Application
 */

export interface ProjectMetric {
  label: string;
  value: number;
  valueLabel: string;
}

export interface Project {
  id: string;
  name: string;
  problem: string;
  solution: string;
  stack: string[];
  result: string;
  url?: string;
  metrics?: ProjectMetric[];
}
