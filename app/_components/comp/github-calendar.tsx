'use client';

import { GitHubCalendar, type Activity } from "react-github-calendar";

const lastSixMonths = (contributions: Activity[]) => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 26 * 7);
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  return contributions.filter((day) => day.date >= cutoffStr);
};

export default function Calendar({ username }: { username: string }) {
  return (
    <GitHubCalendar
        username={username}
        labels={{ totalCount: "{{count}} contributions in the last 6 months" }}
        colorScheme="dark"
        blockSize={13}
        blockMargin={2}
        fontSize={12}
        transformData={lastSixMonths}
        theme={{ dark: ["#2a2a2a", "#14803c", "#22b858", "#2fe06d", "#3dff7a"] }}
        />
  );
}