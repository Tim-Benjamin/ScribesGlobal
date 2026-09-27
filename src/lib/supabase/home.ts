import type {
  HomepageVideoItem,
} from "./queries";

export interface HomepageVideoGroup {
  title: string;
  videos: HomepageVideoItem[];
}

export function groupHomepageVideos(
  videos: HomepageVideoItem[],
): HomepageVideoGroup[] {
  const groups =
    new Map<
      string,
      HomepageVideoItem[]
    >();

  for (const video of videos) {
    const title =
      video.row_title?.trim() ||
      "Featured Videos";

    const current =
      groups.get(title) ?? [];

    current.push(video);

    groups.set(
      title,
      current,
    );
  }

  return Array.from(
    groups.entries(),
  ).map(
    ([
      title,
      groupedVideos,
    ]) => ({
      title,
      videos: groupedVideos,
    }),
  );
}