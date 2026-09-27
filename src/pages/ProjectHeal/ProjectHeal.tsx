import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
} from "motion/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionTransition from "../../components/animation/SectionTransition";

import "./project-heal.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   TYPES
========================================================= */

type HealProject = {
  id: string;
  number: string;
  year: string;
  label: string;
  location: string;
  accent:
    | "coral"
    | "gold"
    | "blue"
    | "purple";
  images: string[];
  paragraphs: ReactNode[];
  quote?: string;
  tags: string[];
};

type GalleryItem = {
  src: string;
  alt: string;
  size:
    | "normal"
    | "wide"
    | "tall";
};

/* =========================================================
   IMAGES
========================================================= */

const HERO_IMAGE =
  "https://static.wixstatic.com/media/98ecda_5109a8759c904a118b7f0ea155526479~mv2.jpg/v1/fill/w_940,h_600,al_c,q_85,enc_avif,quality_auto/98ecda_5109a8759c904a118b7f0ea155526479~mv2.jpg";

const FOUNDER_IMAGE =
  "https://static.wixstatic.com/media/521bf8_0506857373b34a04b48b15c7e9f50d01~mv2.jpg/v1/fill/w_600,h_800,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/521bf8_0506857373b34a04b48b15c7e9f50d01~mv2.jpg";

/* =========================================================
   FOUR PILLARS
========================================================= */

const PILLARS = [
  {
    letter: "H",
    word: "Help",
    description:
      "Providing practical help — food, resources, and essential materials — to those who need it most.",
    className:
      "heal-pillar--help",
  },
  {
    letter: "E",
    word: "Educate",
    description:
      "Empowering communities through education, workshops, and tools that open doors to a better future.",
    className:
      "heal-pillar--educate",
  },
  {
    letter: "A",
    word: "And",
    description:
      "A bridge between compassion and action — connecting our community to those who need care most.",
    className:
      "heal-pillar--and",
  },
  {
    letter: "L",
    word: "Love",
    description:
      "Every project is rooted in genuine, unconditional love — the kind that transforms lives and reflects Christ.",
    className:
      "heal-pillar--love",
  },
];

/* =========================================================
   TIMELINE
========================================================= */

const TIMELINE = [
  {
    label: "Nikasemɔ",
    year: "2017",
  },
  {
    label: "BRAVE",
    year: "2018",
  },
  {
    label: "Love Spectrum",
    year: "2021",
  },
  {
    label: "Project Care",
    year: "2023",
  },
];

/* =========================================================
   PROJECTS
========================================================= */

const PROJECTS: HealProject[] = [
  {
    id: "project-care",
    number: "01",
    year: "2023",
    label: "Project Care",
    location:
      "Nyamedua Children's Home",
    accent: "coral",

    images: [
      "https://static.wixstatic.com/media/3c82a7_0cb4093d7f5740adbfdeb0c6af537ce9~mv2.jpg/v1/fill/w_600,h_800,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202023-12-15%20at%2000_33_23_e0f1a76a.jpg",
    ],

    paragraphs: [
      <>
        As part of our ongoing
        Project HEAL initiative,
        this year, we had the
        privilege of visiting the{" "}
        <strong>
          Nyamedua Children's Home
          in Adenta
        </strong>
        . During our visit, we
        contributed essential
        educational materials such
        as books, pens, erasers,
        and more, aiming to support
        their learning endeavors.
      </>,

      <>
        Additionally, we provided
        much-needed food items to
        assist in meeting their
        nutritional needs.
      </>,

      <>
        This year's edition, termed{" "}
        <strong>
          'Project Care,'
        </strong>{" "}
        resonates deeply with our
        commitment to extend care
        and compassion to orphans.
        Our primary goal is to
        demonstrate heartfelt care
        through these contributions,
        furthering our mission to
        positively impact the lives
        of these children.
      </>,
    ],

    tags: [
      "Books & Pens",
      "Erasers",
      "Food Items",
      "Care & Love",
    ],
  },

  {
    id: "love-spectrum",
    number: "02",
    year: "2021",
    label: "Love Spectrum",
    location:
      "HopeSetters Autism Center, Tema",
    accent: "gold",

    images: [
      "https://static.wixstatic.com/media/521bf8_21fcb2f6a17d450991ab7560d54122c5~mv2.jpg/v1/fill/w_435,h_580,al_c,q_80,enc_avif,quality_auto/521bf8_21fcb2f6a17d450991ab7560d54122c5~mv2.jpg",

      "https://static.wixstatic.com/media/521bf8_0506857373b34a04b48b15c7e9f50d01~mv2.jpg/v1/fill/w_396,h_527,al_c,q_80,enc_avif,quality_auto/521bf8_0506857373b34a04b48b15c7e9f50d01~mv2.jpg",

      "https://static.wixstatic.com/media/521bf8_85b349b240614917885d2480f9fe582d~mv2.jpg/v1/fill/w_659,h_494,al_c,q_80,enc_avif,quality_auto/521bf8_85b349b240614917885d2480f9fe582d~mv2.jpg",
    ],

    paragraphs: [
      <>
        During the COVID period in
        2020, we had plans of
        assisting people with autism
        but we couldn't do so due to
        the restrictions. We then had
        to reschedule it.
      </>,

      <>
        In <strong>2021</strong>, we
        visited the{" "}
        <strong>
          HopeSetters Autism Center
          in Tema
        </strong>{" "}
        and donated educational
        materials to the institution.
        We also spent the day having
        fun with the kids and
        learning more about Autism
        and on how best we can be of
        help to people living with
        autism.
      </>,
    ],

    tags: [
      "Educational Materials",
      "Fun Activities",
      "Autism Awareness",
      "2021",
    ],
  },

  {
    id: "brave",
    number: "03",
    year: "2018",
    label: "BRAVE",
    location:
      "State School for Deaf, Ashaiman",
    accent: "blue",

    images: [
      "https://static.wixstatic.com/media/98ecda_0375a4192c7e43589cc065b7e7721a21~mv2.jpg/v1/fill/w_483,h_600,al_c,q_80,enc_avif,quality_auto/IMG_3886.jpg",

      "https://static.wixstatic.com/media/98ecda_3f4106faffd04ba3bdcf6e3ac858c1f9~mv2.jpg/v1/fill/w_390,h_260,al_c,q_80,enc_avif,quality_auto/IMG_3894.jpg",

      "https://static.wixstatic.com/media/98ecda_ef55ae332d6d46d3b9c160a7e873904f~mv2.jpg/v1/fill/w_390,h_260,al_c,q_80,enc_avif,quality_auto/IMG_3888.jpg",
    ],

    paragraphs: [
      <>
        In <strong>2018</strong>, we
        took the initiative once
        again, this time to help
        students who are deaf and
        dumb. We believe that,
        regardless of their
        limitation, they can still
        make impact and so must be
        heard.
      </>,

      <>
        We visited the{" "}
        <strong>
          State School for Deaf at
          Ashaiman
        </strong>{" "}
        and donated educational
        materials, food, toiletries,
        etc. to the school to help in
        their good work.
      </>,

      <>
        A student was also{" "}
        <strong>
          trained in poetry and was
          invited to perform a piece
          in sign language
        </strong>{" "}
        at our annual poetry event,
        Script on Scrolls.
      </>,
    ],

    quote:
      "Regardless of their limitation, they can still make impact — and so must be heard.",

    tags: [
      "Educational Materials",
      "Food",
      "Toiletries",
      "Poetry Training",
      "Sign Language Performance",
    ],
  },

  {
    id: "nikasemo",
    number: "04",
    year: "2017",
    label: "Nikasemɔ",
    location:
      "Street Children, Bukom — Accra",
    accent: "purple",

    images: [
      "https://static.wixstatic.com/media/98ecda_3c30f35296e746c8bc01a6f3931b2ffa~mv2.jpg/v1/fill/w_474,h_316,al_c,q_80,enc_avif,quality_auto/IMG_3845.jpg",

      "https://static.wixstatic.com/media/98ecda_ca0bad468f3c4ed2a61f1d2fc1acb0d2~mv2.jpg/v1/fill/w_366,h_244,al_c,q_80,enc_avif,quality_auto/IMG_3841.jpg",

      "https://static.wixstatic.com/media/98ecda_915b43721e064fdf9910313bed620c8a~mv2.jpg/v1/fill/w_562,h_375,al_c,q_80,enc_avif,quality_auto/IMG_3819.jpg",
    ],

    paragraphs: [
      <>
        In <strong>2017</strong>, we
        partnered with{" "}
        <strong>
          SCEF International (Street
          Children Empowerment Fund)
        </strong>{" "}
        to educate and help street
        children in and around Bukom,
        a suburb of Accra Central.
      </>,

      <>
        In this project, we taught
        the kids for a month,
        provided them with
        educational materials and
        other important items.
      </>,

      <>
        Finally, we{" "}
        <strong>
          trained two of the kids in
          poetry
        </strong>{" "}
        and invited them to our
        annual event (Scripts on
        Scrolls) to perform.
      </>,
    ],

    quote:
      "We taught, equipped, and then gave them a stage — because every voice deserves to be heard.",

    tags: [
      "SCEF International",
      "Monthly Teaching",
      "Educational Materials",
      "Poetry Training",
      "Scripts on Scrolls",
    ],
  },
];

/* =========================================================
   GALLERY
========================================================= */

const GALLERY: GalleryItem[] = [
  {
    src:
      "https://static.wixstatic.com/media/521bf8_21fcb2f6a17d450991ab7560d54122c5~mv2.jpg/v1/fill/w_435,h_580,al_c,q_80,enc_avif,quality_auto/521bf8_21fcb2f6a17d450991ab7560d54122c5~mv2.jpg",
    alt: "H.E.A.L visit",
    size: "tall",
  },

  {
    src:
      "https://static.wixstatic.com/media/521bf8_0506857373b34a04b48b15c7e9f50d01~mv2.jpg/v1/fill/w_396,h_527,al_c,q_80,enc_avif,quality_auto/521bf8_0506857373b34a04b48b15c7e9f50d01~mv2.jpg",
    alt: "Community members",
    size: "normal",
  },

  {
    src:
      "https://static.wixstatic.com/media/521bf8_85b349b240614917885d2480f9fe582d~mv2.jpg/v1/fill/w_659,h_494,al_c,q_80,enc_avif,quality_auto/521bf8_85b349b240614917885d2480f9fe582d~mv2.jpg",
    alt: "Scribes members",
    size: "wide",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_0375a4192c7e43589cc065b7e7721a21~mv2.jpg/v1/fill/w_483,h_322,al_c,q_80,enc_avif,quality_auto/IMG_3886.jpg",
    alt: "BRAVE visit",
    size: "normal",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_3c30f35296e746c8bc01a6f3931b2ffa~mv2.jpg/v1/fill/w_474,h_316,al_c,q_80,enc_avif,quality_auto/IMG_3845.jpg",
    alt: "Nikasemɔ",
    size: "normal",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_3f4106faffd04ba3bdcf6e3ac858c1f9~mv2.jpg/v1/fill/w_390,h_260,al_c,q_80,enc_avif,quality_auto/IMG_3894.jpg",
    alt: "BRAVE school visit",
    size: "normal",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_ef55ae332d6d46d3b9c160a7e873904f~mv2.jpg/v1/fill/w_390,h_260,al_c,q_80,enc_avif,quality_auto/IMG_3888.jpg",
    alt: "School donation",
    size: "normal",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_ca0bad468f3c4ed2a61f1d2fc1acb0d2~mv2.jpg/v1/fill/w_366,h_244,al_c,q_80,enc_avif,quality_auto/IMG_3841.jpg",
    alt: "Street children",
    size: "normal",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_9fe2395ed97f4946b1578c9fb9b31e32~mv2.jpg/v1/fill/w_354,h_236,al_c,q_80,enc_avif,quality_auto/IMG_3850.jpg",
    alt: "Kids learning",
    size: "normal",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_94e76c6df3a44bb791f3b8c70df990f4~mv2.jpg/v1/fill/w_353,h_236,al_c,q_80,enc_avif,quality_auto/IMG_3840.jpg",
    alt: "Group activity",
    size: "normal",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_915b43721e064fdf9910313bed620c8a~mv2.jpg/v1/fill/w_562,h_375,al_c,q_80,enc_avif,quality_auto/IMG_3819.jpg",
    alt: "Poetry performance",
    size: "wide",
  },

  {
    src:
      "https://static.wixstatic.com/media/98ecda_7a99052261094830bc94e066aae2ea0c~mv2.jpg/v1/fill/w_478,h_318,al_c,q_80,enc_avif,quality_auto/IMG_3836.jpg",
    alt: "BRAVE group",
    size: "normal",
  },
];

/* =========================================================
   PROJECT H.E.A.L
========================================================= */

export default function ProjectHeal() {
  const pageRef =
    useRef<HTMLElement>(null);

  const heroRef =
    useRef<HTMLElement>(null);

  const heroImageRef =
    useRef<HTMLDivElement>(null);

  const heroTitleRef =
    useRef<HTMLHeadingElement>(null);

  const [lightboxImage, setLightboxImage] =
    useState<{
      src: string;
      alt: string;
    } | null>(null);

  /* =======================================================
     SCROLL CHOREOGRAPHY
  ======================================================= */

  useLayoutEffect(() => {
    const page =
      pageRef.current;

    if (!page) {
      return;
    }

    const mm =
      gsap.matchMedia();

    const ctx =
      gsap.context(() => {
        /* =================================================
           DESKTOP
        ================================================= */

        mm.add(
          "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
          () => {
            /* ---------------------------------------------
               HERO
            --------------------------------------------- */

            if (
              heroRef.current &&
              heroImageRef.current
            ) {
              gsap.to(
                heroImageRef.current,
                {
                  scale: 1.16,
                  yPercent: 9,

                  ease: "none",

                  scrollTrigger: {
                    trigger:
                      heroRef.current,

                    start:
                      "top top",

                    end:
                      "bottom top",

                    scrub: 1.1,
                  },
                },
              );
            }

            if (
              heroRef.current &&
              heroTitleRef.current
            ) {
              gsap.to(
                heroTitleRef.current,
                {
                  yPercent: -16,
                  scale: 1.035,
                  opacity: 0.17,

                  ease: "none",

                  scrollTrigger: {
                    trigger:
                      heroRef.current,

                    start:
                      "top top",

                    end:
                      "bottom top",

                    scrub: 1,
                  },
                },
              );
            }

            /* ---------------------------------------------
               SECTION OPENINGS
            --------------------------------------------- */

            const scenes =
              gsap.utils.toArray<HTMLElement>(
                ".heal-scene",
                page,
              );

            scenes.forEach(
              (
                scene,
                index,
              ) => {
                const inner =
                  scene.querySelector<HTMLElement>(
                    ".heal-scene__inner",
                  );

                const curtain =
                  scene.querySelector<HTMLElement>(
                    ".section-transition__curtain",
                  );

                if (
                  index > 0
                ) {
                  gsap.fromTo(
                    scene,
                    {
                      clipPath:
                        "inset(7% 2% 0% 2% round 2.5rem 2.5rem 0 0)",
                    },

                    {
                      clipPath:
                        "inset(0% 0% 0% 0% round 0rem)",

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          scene,

                        start:
                          "top 96%",

                        end:
                          "top 35%",

                        scrub: 1,
                      },
                    },
                  );
                }

                if (inner) {
                  gsap.fromTo(
                    inner,
                    {
                      y: 75,
                    },

                    {
                      y: 0,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          scene,

                        start:
                          "top 95%",

                        end:
                          "top 45%",

                        scrub: 1,
                      },
                    },
                  );
                }

                if (curtain) {
                  gsap.fromTo(
                    curtain,
                    {
                      scaleY: 1,
                    },

                    {
                      scaleY: 0,

                      transformOrigin:
                        "top",

                      ease:
                        "power3.inOut",

                      scrollTrigger: {
                        trigger:
                          scene,

                        start:
                          "top 93%",

                        end:
                          "top 50%",

                        scrub: 1,
                      },
                    },
                  );
                }
              },
            );

            /* ---------------------------------------------
               PILLARS
            --------------------------------------------- */

            const pillars =
              gsap.utils.toArray<HTMLElement>(
                ".heal-pillar",
                page,
              );

            pillars.forEach(
              (
                pillar,
                index,
              ) => {
                const letter =
                  pillar.querySelector<HTMLElement>(
                    ".heal-pillar__letter",
                  );

                const copy =
                  pillar.querySelector<HTMLElement>(
                    ".heal-pillar__copy",
                  );

                gsap.fromTo(
                  pillar,
                  {
                    x:
                      index % 2 ===
                      0
                        ? -55
                        : 55,

                    opacity: 0.25,
                  },

                  {
                    x: 0,
                    opacity: 1,

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        pillar,

                      start:
                        "top 90%",

                      end:
                        "top 58%",

                      scrub: 0.8,
                    },
                  },
                );

                if (letter) {
                  gsap.fromTo(
                    letter,
                    {
                      scale: 0.55,

                      rotate:
                        index %
                          2 ===
                        0
                          ? -20
                          : 20,
                    },

                    {
                      scale: 1,
                      rotate: 0,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          pillar,

                        start:
                          "top 88%",

                        end:
                          "top 58%",

                        scrub: 0.8,
                      },
                    },
                  );
                }

                if (copy) {
                  gsap.fromTo(
                    copy,
                    {
                      opacity: 0,
                      y: 30,
                    },

                    {
                      opacity: 1,
                      y: 0,

                      scrollTrigger: {
                        trigger:
                          pillar,

                        start:
                          "top 85%",

                        end:
                          "top 57%",

                        scrub: true,
                      },
                    },
                  );
                }
              },
            );

            /* ---------------------------------------------
               INITIATIVE IMAGE
            --------------------------------------------- */

            const founderVisual =
              page.querySelector<HTMLElement>(
                ".heal-initiative__visual",
              );

            if (
              founderVisual
            ) {
              gsap.fromTo(
                founderVisual,
                {
                  clipPath:
                    "inset(14% 14% 14% 14% round 3rem)",
                  scale: 0.95,
                },

                {
                  clipPath:
                    "inset(0% 0% 0% 0% round 1.8rem)",
                  scale: 1,

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      founderVisual,

                    start:
                      "top 88%",

                    end:
                      "center 52%",

                    scrub: 1,
                  },
                },
              );
            }

            const founderImage =
              page.querySelector<HTMLElement>(
                ".heal-initiative__visual img",
              );

            if (
              founderImage
            ) {
              gsap.fromTo(
                founderImage,
                {
                  scale: 1.14,
                },

                {
                  scale: 1,

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      founderVisual,

                    start:
                      "top 90%",

                    end:
                      "bottom 20%",

                    scrub: 1.2,
                  },
                },
              );
            }

            /* ---------------------------------------------
               TIMELINE
            --------------------------------------------- */

            const timelineItems =
              gsap.utils.toArray<HTMLElement>(
                ".heal-timeline__item",
                page,
              );

            timelineItems.forEach(
              (
                item,
                index,
              ) => {
                const year =
                  item.querySelector<HTMLElement>(
                    ".heal-timeline__year",
                  );

                gsap.fromTo(
                  item,
                  {
                    opacity: 0.15,
                    x: 45,
                  },

                  {
                    opacity: 1,
                    x: 0,

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        item,

                      start:
                        "top 88%",

                      end:
                        "top 65%",

                      scrub:
                        0.6 +
                        index *
                          0.04,
                    },
                  },
                );

                if (year) {
                  gsap.fromTo(
                    year,
                    {
                      scale: 0.7,
                      opacity: 0,
                    },

                    {
                      scale: 1,
                      opacity: 1,

                      scrollTrigger: {
                        trigger:
                          item,

                        start:
                          "top 83%",

                        end:
                          "top 64%",

                        scrub: true,
                      },
                    },
                  );
                }
              },
            );

            /* ---------------------------------------------
               PROJECT CHAPTERS
            --------------------------------------------- */

            const projects =
              gsap.utils.toArray<HTMLElement>(
                ".heal-project",
                page,
              );

            projects.forEach(
              (
                project,
                index,
              ) => {
                const visual =
                  project.querySelector<HTMLElement>(
                    ".heal-project__visual",
                  );

                const content =
                  project.querySelector<HTMLElement>(
                    ".heal-project__content",
                  );

                const number =
                  project.querySelector<HTMLElement>(
                    ".heal-project__massive-number",
                  );

                if (visual) {
                  gsap.fromTo(
                    visual,
                    {
                      clipPath:
                        index %
                          2 ===
                        0
                          ? "inset(0% 100% 0% 0% round 2rem)"
                          : "inset(0% 0% 0% 100% round 2rem)",
                    },

                    {
                      clipPath:
                        "inset(0% 0% 0% 0% round 1.5rem)",

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          project,

                        start:
                          "top 85%",

                        end:
                          "top 35%",

                        scrub: 1,
                      },
                    },
                  );
                }

                if (content) {
                  gsap.fromTo(
                    content,
                    {
                      y: 100,
                      opacity: 0.2,
                    },

                    {
                      y: 0,
                      opacity: 1,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          project,

                        start:
                          "top 82%",

                        end:
                          "top 34%",

                        scrub: 1,
                      },
                    },
                  );
                }

                if (number) {
                  gsap.fromTo(
                    number,
                    {
                      xPercent:
                        index %
                          2 ===
                        0
                          ? -20
                          : 20,
                    },

                    {
                      xPercent:
                        index %
                          2 ===
                        0
                          ? 12
                          : -12,

                      ease:
                        "none",

                      scrollTrigger: {
                        trigger:
                          project,

                        start:
                          "top bottom",

                        end:
                          "bottom top",

                        scrub: 1.4,
                      },
                    },
                  );
                }

                const images =
                  project.querySelectorAll<HTMLElement>(
                    ".heal-project__image-button",
                  );

                images.forEach(
                  (
                    image,
                    imageIndex,
                  ) => {
                    gsap.fromTo(
                      image,
                      {
                        y:
                          20 +
                          imageIndex *
                            30,
                      },

                      {
                        y:
                          imageIndex ===
                          0
                            ? -20
                            : -45,

                        ease:
                          "none",

                        scrollTrigger: {
                          trigger:
                            project,

                          start:
                            "top bottom",

                          end:
                            "bottom top",

                          scrub:
                            1 +
                            imageIndex *
                              0.16,
                        },
                      },
                    );
                  },
                );
              },
            );

            /* ---------------------------------------------
               GALLERY PORTAL
            --------------------------------------------- */

            const gallery =
              page.querySelector<HTMLElement>(
                ".heal-gallery",
              );

            if (gallery) {
              gsap.fromTo(
                gallery,
                {
                  clipPath:
                    "inset(10% 0% 0% 0% round 5rem 5rem 0 0)",
                },

                {
                  clipPath:
                    "inset(0% 0% 0% 0% round 0rem)",

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      gallery,

                    start:
                      "top 96%",

                    end:
                      "top 34%",

                    scrub: 1,
                  },
                },
              );
            }

            const galleryItems =
              gsap.utils.toArray<HTMLElement>(
                ".heal-gallery__item",
                page,
              );

            galleryItems.forEach(
              (
                item,
                index,
              ) => {
                gsap.fromTo(
                  item,
                  {
                    opacity: 0,
                    y:
                      45 +
                      (index % 4) *
                        18,

                    scale:
                      index % 3 ===
                      0
                        ? 0.88
                        : 0.94,
                  },

                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,

                    ease:
                      "none",

                    scrollTrigger: {
                      trigger:
                        item,

                      start:
                        "top 94%",

                      end:
                        "top 68%",

                      scrub: 0.65,
                    },
                  },
                );
              },
            );

            /* ---------------------------------------------
               FINAL CTA
            --------------------------------------------- */

            const finalCta =
              page.querySelector<HTMLElement>(
                ".heal-final-cta",
              );

            if (finalCta) {
              gsap.fromTo(
                finalCta,
                {
                  clipPath:
                    "circle(10% at 50% 50%)",
                },

                {
                  clipPath:
                    "circle(100% at 50% 50%)",

                  ease:
                    "none",

                  scrollTrigger: {
                    trigger:
                      finalCta,

                    start:
                      "top 96%",

                    end:
                      "top 24%",

                    scrub: 1,
                  },
                },
              );
            }
          },
        );

        /* =================================================
           MOBILE + TABLET
        ================================================= */

        mm.add(
          "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
          () => {
            const scenes =
              gsap.utils.toArray<HTMLElement>(
                ".heal-scene",
                page,
              );

            scenes.forEach(
              (
                scene,
                index,
              ) => {
                gsap.fromTo(
                  scene,
                  {
                    opacity:
                      index === 0
                        ? 1
                        : 0,

                    y:
                      index === 0
                        ? 0
                        : 40,
                  },

                  {
                    opacity: 1,
                    y: 0,

                    duration: 0.85,

                    ease:
                      "power3.out",

                    scrollTrigger: {
                      trigger:
                        scene,

                      start:
                        "top 90%",

                      toggleActions:
                        "play none none none",
                    },
                  },
                );
              },
            );

            const visuals =
              gsap.utils.toArray<HTMLElement>(
                ".heal-project__visual",
                page,
              );

            visuals.forEach(
              (visual) => {
                gsap.fromTo(
                  visual,
                  {
                    opacity: 0,
                    scale: 0.95,
                  },

                  {
                    opacity: 1,
                    scale: 1,

                    duration: 0.85,

                    ease:
                      "power3.out",

                    scrollTrigger: {
                      trigger:
                        visual,

                      start:
                        "top 88%",

                      toggleActions:
                        "play none none none",
                    },
                  },
                );
              },
            );

            const pillars =
              gsap.utils.toArray<HTMLElement>(
                ".heal-pillar",
                page,
              );

            pillars.forEach(
              (
                pillar,
                index,
              ) => {
                gsap.fromTo(
                  pillar,
                  {
                    opacity: 0,
                    x:
                      index % 2 ===
                      0
                        ? -25
                        : 25,
                  },

                  {
                    opacity: 1,
                    x: 0,

                    duration: 0.7,

                    ease:
                      "power3.out",

                    scrollTrigger: {
                      trigger:
                        pillar,

                      start:
                        "top 90%",

                      toggleActions:
                        "play none none none",
                    },
                  },
                );
              },
            );
          },
        );
      }, page);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  /* =======================================================
     LIGHTBOX
  ======================================================= */

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setLightboxImage(
          null,
        );
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
    };
  }, [lightboxImage]);

  return (
    <main
      ref={pageRef}
      className="project-heal"
    >
      {/* ===================================================
          HERO
      =================================================== */}

      <section
        ref={heroRef}
        className="heal-real-hero heal-scene"
      >
        <div
          ref={heroImageRef}
          className="heal-real-hero__image"
          style={{
            backgroundImage:
              `url("${HERO_IMAGE}")`,
          }}
          aria-hidden="true"
        />

        <div className="heal-real-hero__overlay" />

        <div className="heal-real-hero__grain" />

        <div
          className="heal-real-hero__orb heal-real-hero__orb--one"
          aria-hidden="true"
        />

        <div
          className="heal-real-hero__orb heal-real-hero__orb--two"
          aria-hidden="true"
        />

        <div className="heal-real-hero__meta">
          <span>
            Scribes Global
          </span>

          <span>
            Outreach Initiative
          </span>

          <span>
            H.E.A.L
          </span>
        </div>

        <div className="heal-real-hero__content">
          <motion.div
            className="heal-real-hero__badge"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          >
            <span>
              ♥
            </span>

            Scribes Global Initiative
          </motion.div>

          <h1
            ref={heroTitleRef}
            className="heal-real-hero__title"
          >
            <span className="heal-title-mask">
              <motion.span
                initial={{
                  y: "110%",
                }}
                animate={{
                  y: "0%",
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.2,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                PROJECT
              </motion.span>
            </span>

            <span className="heal-title-mask">
              <motion.span
                className="heal-real-hero__title-accent"
                initial={{
                  y: "110%",
                }}
                animate={{
                  y: "0%",
                }}
                transition={{
                  duration: 1.1,
                  delay: 0.34,
                  ease: [
                    0.16,
                    1,
                    0.3,
                    1,
                  ],
                }}
              >
                H.E.A.L
              </motion.span>
            </span>
          </h1>

          <motion.div
            className="heal-real-hero__meaning"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.72,
            }}
          >
            <span>
              <strong>
                H
              </strong>
              elp
            </span>

            <i>·</i>

            <span>
              <strong>
                E
              </strong>
              ducate
            </span>

            <i>·</i>

            <span>
              <strong>
                A
              </strong>
              nd
            </span>

            <i>·</i>

            <span>
              <strong>
                L
              </strong>
              ove
            </span>
          </motion.div>

          <motion.p
            className="heal-real-hero__description"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.85,
              delay: 0.86,
            }}
          >
            An initiative borne by{" "}
            <strong>
              Aseye Adonu
            </strong>
            , a member of Scribes.
            The aim is to extend
            love to all — by helping
            the less privileged with
            gifts and resources, and
            empowering them through
            education.
          </motion.p>

          <motion.div
            className="heal-real-hero__actions"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.85,
              delay: 1,
            }}
          >
            <Link
              to="/give"
              className="heal-real-button heal-real-button--gold"
              data-cursor="VIEW"
            >
              <span>
                Give to H.E.A.L
              </span>

              <span>
                ↗
              </span>
            </Link>

            <a
              href="#projects"
              className="heal-real-button heal-real-button--glass"
              data-cursor="EXPLORE"
            >
              <span>
                See Our Projects
              </span>

              <span>
                ↓
              </span>
            </a>
          </motion.div>
        </div>

        <div className="heal-real-hero__scroll">
          <span>
            Scroll
          </span>

          <span className="heal-real-hero__scroll-line">
            <span />
          </span>
        </div>
      </section>

      {/* ===================================================
          FOUR PILLARS
      =================================================== */}

      <section className="heal-pillars heal-scene">
        <SectionTransition label="H.E.A.L" />

        <div className="heal-scene__inner">
          <div className="heal-real-container">
            <div className="heal-section-heading">
              <div className="heal-section-heading__meta">
                <span className="heal-section-number">
                  01
                </span>

                <p>
                  What H.E.A.L Means
                </p>
              </div>

              <h2>
                Our Four
                <span>
                  Pillars.
                </span>
              </h2>
            </div>

            <div className="heal-pillars__list">
              {PILLARS.map(
                (
                  pillar,
                  index,
                ) => (
                  <article
                    key={
                      pillar.word
                    }
                    className={`heal-pillar ${pillar.className}`}
                  >
                    <span className="heal-pillar__index">
                      {String(
                        index +
                          1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <div className="heal-pillar__letter">
                      {
                        pillar.letter
                      }
                    </div>

                    <h3>
                      {
                        pillar.word
                      }
                    </h3>

                    <p className="heal-pillar__copy">
                      {
                        pillar.description
                      }
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          INITIATIVE
      =================================================== */}

      <section className="heal-initiative heal-scene">
        <SectionTransition label="THE INITIATIVE" />

        <div className="heal-scene__inner">
          <div className="heal-real-container heal-initiative__layout">
            <div className="heal-initiative__visual">
              <img
                src={
                  FOUNDER_IMAGE
                }
                alt="Project H.E.A.L community visit"
                loading="lazy"
              />

              <div className="heal-initiative__image-index">
                <span>
                  H.E.A.L
                </span>

                <span>
                  2017—2023
                </span>
              </div>

              <div className="heal-initiative__founder">
                <span className="heal-initiative__founder-mark">
                  ✦
                </span>

                <div>
                  <strong>
                    Aseye Adonu
                  </strong>

                  <span>
                    Founder, H.E.A.L
                  </span>
                </div>
              </div>
            </div>

            <div className="heal-initiative__content">
              <p className="heal-kicker">
                The Initiative
              </p>

              <h2>
                Extending Love
                <span>
                  to All
                </span>
              </h2>

              <div className="heal-initiative__copy">
                <p>
                  Project H.E.A.L
                  stands for{" "}
                  <strong>
                    Help, Educate,
                    and Love
                  </strong>{" "}
                  — an initiative
                  borne by{" "}
                  <strong>
                    Aseye Adonu
                  </strong>
                  , a member of
                  Scribes Global.
                </p>

                <p>
                  The aim is to
                  extend love to
                  all; by helping
                  the less
                  privileged with
                  the gifts and
                  resources, and
                  empowering them
                  through
                  education.
                </p>

                <p>
                  Through each
                  project under
                  H.E.A.L, we go
                  beyond words —
                  we act. From
                  visiting
                  children's homes
                  and autism
                  centres to
                  empowering the
                  deaf and
                  supporting
                  street children,
                  every initiative
                  is driven by
                  Christ's love in
                  action.
                </p>
              </div>

              <div className="heal-timeline">
                {TIMELINE.map(
                  (
                    item,
                    index,
                  ) => (
                    <div
                      key={
                        item.label
                      }
                      className="heal-timeline__item"
                    >
                      <span>
                        {String(
                          index +
                            1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <strong>
                        {
                          item.label
                        }
                      </strong>

                      <em className="heal-timeline__year">
                        {
                          item.year
                        }
                      </em>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PROJECTS INTRO
      =================================================== */}

      <section
        id="projects"
        className="heal-projects-intro heal-scene"
      >
        <SectionTransition label="THE PROJECTS" />

        <div className="heal-scene__inner">
          <div className="heal-real-container">
            <div className="heal-section-heading heal-section-heading--projects">
              <div className="heal-section-heading__meta">
                <span className="heal-section-number">
                  02
                </span>

                <p>
                  What We've Done
                </p>
              </div>

              <div>
                <h2>
                  Our
                  <span>
                    Projects.
                  </span>
                </h2>

                <p className="heal-projects-intro__copy">
                  Each sub-project
                  under H.E.A.L
                  targets a
                  specific
                  community in need
                  — bringing
                  education,
                  resources, and
                  most importantly,
                  love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          PROJECT CHAPTERS
      =================================================== */}

      <section className="heal-projects">
        {PROJECTS.map(
          (
            project,
            index,
          ) => (
            <article
              key={
                project.id
              }
              className={`heal-project heal-project--${project.accent} heal-scene`}
            >
              <SectionTransition
                label={`${project.number} — ${project.label}`}
              />

              <div className="heal-scene__inner heal-project__scene-inner">
                <div className="heal-project__massive-number">
                  {
                    project.number
                  }
                </div>

                <div className="heal-real-container heal-project__layout">
                  <div className="heal-project__visual">
                    {project.images
                      .length ===
                    1 ? (
                      <button
                        type="button"
                        className="heal-project__image-button heal-project__single-image"
                        onClick={() =>
                          setLightboxImage(
                            {
                              src:
                                project
                                  .images[0],
                              alt:
                                project.location,
                            },
                          )
                        }
                        data-cursor="VIEW"
                      >
                        <img
                          src={
                            project
                              .images[0]
                          }
                          alt={
                            project.location
                          }
                          loading="lazy"
                        />

                        <span className="heal-image-hover-label">
                          View image
                        </span>
                      </button>
                    ) : (
                      <div className="heal-project__image-grid">
                        {project.images.map(
                          (
                            image,
                            imageIndex,
                          ) => (
                            <button
                              key={
                                image
                              }
                              type="button"
                              className={`heal-project__image-button heal-project__image heal-project__image--${
                                imageIndex +
                                1
                              }`}
                              onClick={() =>
                                setLightboxImage(
                                  {
                                    src:
                                      image,

                                    alt:
                                      `${project.label} ${imageIndex + 1}`,
                                  },
                                )
                              }
                              data-cursor="VIEW"
                            >
                              <img
                                src={
                                  image
                                }
                                alt={`${project.label} ${imageIndex + 1}`}
                                loading="lazy"
                              />

                              <span className="heal-image-hover-label">
                                View
                              </span>
                            </button>
                          ),
                        )}
                      </div>
                    )}

                    <span className="heal-project__year-badge">
                      {
                        project.year
                      }
                    </span>
                  </div>

                  <div className="heal-project__content">
                    <div className="heal-project__meta">
                      <span>
                        {
                          project.number
                        }
                      </span>

                      <span>
                        {
                          project.year
                        }
                      </span>
                    </div>

                    <p className="heal-project__label">
                      {
                        project.label
                      }
                    </p>

                    <h3>
                      {
                        project.location
                      }
                    </h3>

                    <div className="heal-project__copy">
                      {project.paragraphs.map(
                        (
                          paragraph,
                          paragraphIndex,
                        ) => (
                          <p
                            key={
                              paragraphIndex
                            }
                          >
                            {
                              paragraph
                            }
                          </p>
                        ),
                      )}
                    </div>

                    {project.quote && (
                      <blockquote>
                        “
                        {
                          project.quote
                        }
                        ”
                      </blockquote>
                    )}

                    <div className="heal-project__tags">
                      {project.tags.map(
                        (tag) => (
                          <span
                            key={
                              tag
                            }
                          >
                            <i>
                              ✓
                            </i>

                            {
                              tag
                            }
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="heal-project__chapter-marker">
                  <span>
                    {
                      project.label
                    }
                  </span>

                  <span>
                    {String(
                      index +
                        1,
                    ).padStart(
                      2,
                      "0",
                    )}
                    /04
                  </span>
                </div>
              </div>
            </article>
          ),
        )}
      </section>

      {/* ===================================================
          GALLERY
      =================================================== */}

      <section className="heal-gallery heal-scene">
        <SectionTransition label="MOMENTS IN ACTION" />

        <div className="heal-scene__inner">
          <div className="heal-real-container heal-gallery__header">
            <div className="heal-gallery__eyebrow">
              <span className="heal-section-number">
                03
              </span>

              <p>
                Moments in Action
              </p>
            </div>

            <h2>
              PHOTO
              <span>
                GALLERY.
              </span>
            </h2>

            <p className="heal-gallery__hint">
              Click any image to
              enlarge
            </p>
          </div>

          <div className="heal-gallery__grid">
            {GALLERY.map(
              (
                image,
                index,
              ) => (
                <button
                  key={
                    image.src
                  }
                  type="button"
                  className={`heal-gallery__item heal-gallery__item--${image.size}`}
                  onClick={() =>
                    setLightboxImage(
                      {
                        src:
                          image.src,

                        alt:
                          image.alt,
                      },
                    )
                  }
                  data-cursor="VIEW"
                >
                  <img
                    src={
                      image.src
                    }
                    alt={
                      image.alt
                    }
                    loading="lazy"
                  />

                  <span className="heal-gallery__number">
                    {String(
                      index +
                        1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <span className="heal-gallery__view">
                    View
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="heal-final-cta heal-scene">
        <div className="heal-scene__inner">
          <div
            className="heal-final-cta__rings"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          <div
            className="heal-final-cta__glow"
            aria-hidden="true"
          />

          <div className="heal-real-container">
            <div className="heal-final-cta__content">
              <p className="heal-final-cta__eyebrow">
                Every Gift Matters
              </p>

              <h2>
                HELP US
                <span>
                  HELP, EDUCATE
                  <br />
                  & LOVE.
                </span>
              </h2>

              <p className="heal-final-cta__description">
                Your support
                enables us to
                reach more
                children, more
                communities, and
                more lives with
                the love of Christ
                in practical,
                tangible ways.
              </p>

              <div className="heal-final-cta__actions">
                <Link
                  to="/give"
                  className="heal-real-button heal-real-button--gold"
                  data-cursor="VIEW"
                >
                  <span>
                    Give to
                    H.E.A.L
                  </span>

                  <span>
                    ↗
                  </span>
                </Link>

                <Link
                  to="/volunteer"
                  className="heal-real-button heal-real-button--glass"
                  data-cursor="EXPLORE"
                >
                  <span>
                    Volunteer
                  </span>

                  <span>
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          LIGHTBOX
      =================================================== */}

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="heal-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setLightboxImage(
                null,
              )
            }
          >
            <motion.button
              type="button"
              className="heal-lightbox__close"
              onClick={() =>
                setLightboxImage(
                  null,
                )
              }
              initial={{
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
              }}
              aria-label="Close image preview"
            >
              ×
            </motion.button>

            <motion.figure
              className="heal-lightbox__figure"
              initial={{
                opacity: 0,
                scale: 0.92,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.45,
                ease: [
                  0.16,
                  1,
                  0.3,
                  1,
                ],
              }}
              onClick={(
                event,
              ) =>
                event.stopPropagation()
              }
            >
              <img
                src={
                  lightboxImage.src
                }
                alt={
                  lightboxImage.alt
                }
              />

              <figcaption>
                {
                  lightboxImage.alt
                }
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}