import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getFeaturedEvents,
  getHomepageVideos,
  getInstagramPosts,
  getLatestPosts,
  getLatestYouTube,
  getSiteSettings,
  getSocialStats,
  getTikTokVideos,
} from "../../lib/supabase/queries";

type SectionState<T> = {
  data: T;
  loading: boolean;
  error: Error | null;
};

function createSectionState<T>(
  initialData: T,
): SectionState<T> {
  return {
    data: initialData,
    loading: true,
    error: null,
  };
}

export function useHomeData() {
  const [events, setEvents] = useState(
    createSectionState<
      NonNullable<
        Awaited<
          ReturnType<typeof getFeaturedEvents>
        >["data"]
      >
    >([]),
  );

  const [videos, setVideos] = useState(
    createSectionState<
      NonNullable<
        Awaited<
          ReturnType<typeof getHomepageVideos>
        >["data"]
      >
    >([]),
  );

  const [socialStats, setSocialStats] =
    useState(
      createSectionState<
        NonNullable<
          Awaited<
            ReturnType<typeof getSocialStats>
          >["data"]
        >
      >([]),
    );

  const [instagram, setInstagram] =
    useState(
      createSectionState<
        NonNullable<
          Awaited<
            ReturnType<typeof getInstagramPosts>
          >["data"]
        >
      >([]),
    );

  const [tiktok, setTikTok] = useState(
    createSectionState<
      NonNullable<
        Awaited<
          ReturnType<typeof getTikTokVideos>
        >["data"]
      >
    >([]),
  );

  const [youtube, setYouTube] = useState(
    createSectionState<
      NonNullable<
        Awaited<
          ReturnType<typeof getLatestYouTube>
        >["data"]
      >
    >([]),
  );

  const [posts, setPosts] = useState(
    createSectionState<
      NonNullable<
        Awaited<
          ReturnType<typeof getLatestPosts>
        >["data"]
      >
    >([]),
  );

  const [settings, setSettings] =
    useState<SectionState<unknown>>(
      createSectionState<unknown>(null),
    );

  const loadEvents = useCallback(async () => {
    setEvents((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    const { data, error } =
      await getFeaturedEvents();

    setEvents({
      data: data ?? [],
      loading: false,
      error: error
        ? new Error(error.message)
        : null,
    });
  }, []);

  const loadVideos = useCallback(async () => {
    setVideos((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    const { data, error } =
      await getHomepageVideos();

    setVideos({
      data: data ?? [],
      loading: false,
      error: error
        ? new Error(error.message)
        : null,
    });
  }, []);

  const loadSocialStats =
    useCallback(async () => {
      setSocialStats((current) => ({
        ...current,
        loading: true,
        error: null,
      }));

      const { data, error } =
        await getSocialStats();

      setSocialStats({
        data: data ?? [],
        loading: false,
        error: error
          ? new Error(error.message)
          : null,
      });
    }, []);

  const loadInstagram =
    useCallback(async () => {
      setInstagram((current) => ({
        ...current,
        loading: true,
        error: null,
      }));

      const { data, error } =
        await getInstagramPosts();

      setInstagram({
        data: (data ?? []).filter(
          (post) =>
            Boolean(post.post_url?.trim()),
        ),
        loading: false,
        error: error
          ? new Error(error.message)
          : null,
      });
    }, []);

  const loadTikTok = useCallback(async () => {
    setTikTok((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    const { data, error } =
      await getTikTokVideos();

    setTikTok({
      data: (data ?? []).filter(
        (video) =>
          Boolean(video.video_url?.trim()),
      ),
      loading: false,
      error: error
        ? new Error(error.message)
        : null,
    });
  }, []);

  const loadYouTube = useCallback(async () => {
    setYouTube((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    const { data, error } =
      await getLatestYouTube(6);

    setYouTube({
      data: data ?? [],
      loading: false,
      error: error
        ? new Error(error.message)
        : null,
    });
  }, []);

  const loadPosts = useCallback(async () => {
    setPosts((current) => ({
      ...current,
      loading: true,
      error: null,
    }));

    const { data, error } =
      await getLatestPosts(3);

    setPosts({
      data: data ?? [],
      loading: false,
      error: error
        ? new Error(error.message)
        : null,
    });
  }, []);

  const loadSettings =
    useCallback(async () => {
      setSettings((current) => ({
        ...current,
        loading: true,
        error: null,
      }));

      const { data, error } =
        await getSiteSettings();

      setSettings({
        data: data ?? null,
        loading: false,
        error: error
          ? new Error(error.message)
          : null,
      });
    }, []);

  const loadAll = useCallback(() => {
    void Promise.all([
      loadEvents(),
      loadVideos(),
      loadSocialStats(),
      loadInstagram(),
      loadTikTok(),
      loadYouTube(),
      loadPosts(),
      loadSettings(),
    ]);
  }, [
    loadEvents,
    loadVideos,
    loadSocialStats,
    loadInstagram,
    loadTikTok,
    loadYouTube,
    loadPosts,
    loadSettings,
  ]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return {
    events: {
      ...events,
      refetch: loadEvents,
    },

    videos: {
      ...videos,
      refetch: loadVideos,
    },

    socialStats: {
      ...socialStats,
      refetch: loadSocialStats,
    },

    instagram: {
      ...instagram,
      refetch: loadInstagram,
    },

    tiktok: {
      ...tiktok,
      refetch: loadTikTok,
    },

    youtube: {
      ...youtube,
      refetch: loadYouTube,
    },

    posts: {
      ...posts,
      refetch: loadPosts,
    },

    settings: {
      ...settings,
      refetch: loadSettings,
    },

    refetchAll: loadAll,
  };
}