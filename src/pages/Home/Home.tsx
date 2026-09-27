import Hero from "../../components/home/hero/Hero";

import FeaturedEvents from "../../components/home/events/FeaturedEvents";

import HomeVideoRows from "../../components/home/videos/HomeVideoRows";

import SocialStats from "../../components/home/social/SocialStats";
import InstagramShowcase from "../../components/home/social/InstagramShowcase";
import TikTokShowcase from "../../components/home/social/TikTokShowcase";
import YouTubeShowcase from "../../components/home/social/YouTubeShowcase";

import { useHomeData } from "../../hooks/home/useHomeData";

export default function Home() {
  const home = useHomeData();

  return (
    <main>
      <Hero />

      <FeaturedEvents
        events={home.events.data}
        loading={home.events.loading}
        error={home.events.error}
        onRetry={home.events.refetch}
      />

      <HomeVideoRows
        videos={home.videos.data}
        loading={home.videos.loading}
        error={home.videos.error}
        onRetry={home.videos.refetch}
      />

      <SocialStats
        stats={home.socialStats.data}
        loading={home.socialStats.loading}
        error={home.socialStats.error}
        onRetry={
          home.socialStats.refetch
        }
      />

      <InstagramShowcase
        posts={home.instagram.data}
        loading={home.instagram.loading}
        error={home.instagram.error}
        onRetry={
          home.instagram.refetch
        }
      />

      <TikTokShowcase
        videos={home.tiktok.data}
        loading={home.tiktok.loading}
        error={home.tiktok.error}
        onRetry={
          home.tiktok.refetch
        }
      />

      <YouTubeShowcase
        videos={home.youtube.data}
        loading={home.youtube.loading}
        error={home.youtube.error}
        onRetry={
          home.youtube.refetch
        }
      />
    </main>
  );
}