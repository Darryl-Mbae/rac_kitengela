import { useState } from "react";

export interface Resource {
  id: string;
  title: string;
  content: string;
  description?: string;
}

const DEFAULT_RESOURCES: Resource[] = [
  {
    id: "four-way-test",
    title: "Four Way Test",
    description: "The Rotary Four Way Test",
    content: `The Four Way Test is a tool to guide Rotarians in their ethical decision-making and behavior. Rotarians pledge to apply it in their professional lives, volunteer work, and personal relationships.

The Four Way Test asks of the things we think, say, or do:

1. Is it the TRUTH?
2. Is it FAIR to all concerned?
3. Will it build GOODWILL and BETTER FRIENDSHIPS?
4. Will it be BENEFICIAL to all concerned?

These four simple questions have guided Rotarians for over 100 years in making ethical decisions and conducting honest business practices.`,
  },
  {
    id: "rotary-grace",
    title: "Rotary Grace",
    description: "Grace said before Rotary meetings",
    content:`Oh Lord and Giver of all Good
We thank thee for our daily food
May Rotary friends and Rotary ways
Help us to serve thee all our days.

This traditional Rotary Grace is often recited at the beginning of Rotary meetings. It reflects the values of service, community, and gratitude that are central to Rotary's mission.`,
  },

];

export function useResources() {
  const [resources, setResources] = useState<Resource[]>(DEFAULT_RESOURCES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  return { resources, loading, error, setError, setLoading, setResources };
}
