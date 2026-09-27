import {
  useEffect,
  useRef,
} from "react";

import gsap from "gsap";

import { useHeroInteraction } from "./HeroInteraction";

export default function HeroVisual() {
  const visualRef =
    useRef<HTMLDivElement>(null);

  const orbPrimaryRef =
    useRef<HTMLDivElement>(null);

  const orbSecondaryRef =
    useRef<HTMLDivElement>(null);

  const orbTertiaryRef =
    useRef<HTMLDivElement>(null);

  const { pointer } = useHeroInteraction();

  useEffect(() => {
    const visual = visualRef.current;
    const primary = orbPrimaryRef.current;
    const secondary = orbSecondaryRef.current;
    const tertiary = orbTertiaryRef.current;

    if (
      !visual ||
      !primary ||
      !secondary ||
      !tertiary
    ) {
      return;
    }

    const primaryX = gsap.quickTo(
      primary,
      "x",
      {
        duration: 1.4,
        ease: "power3.out",
      },
    );

    const primaryY = gsap.quickTo(
      primary,
      "y",
      {
        duration: 1.4,
        ease: "power3.out",
      },
    );

    const secondaryX = gsap.quickTo(
      secondary,
      "x",
      {
        duration: 1.8,
        ease: "power3.out",
      },
    );

    const secondaryY = gsap.quickTo(
      secondary,
      "y",
      {
        duration: 1.8,
        ease: "power3.out",
      },
    );

    const tertiaryX = gsap.quickTo(
      tertiary,
      "x",
      {
        duration: 2.1,
        ease: "power3.out",
      },
    );

    const tertiaryY = gsap.quickTo(
      tertiary,
      "y",
      {
        duration: 2.1,
        ease: "power3.out",
      },
    );

    let frame = 0;

    const animate = () => {
      const {
        normalizedX,
        normalizedY,
      } = pointer.current;

      primaryX(normalizedX * 38);
      primaryY(normalizedY * 28);

      secondaryX(normalizedX * -28);
      secondaryY(normalizedY * -34);

      tertiaryX(normalizedX * 18);
      tertiaryY(normalizedY * -20);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [pointer]);

  return (
    <div
      ref={visualRef}
      className="home-hero__visual"
      aria-hidden="true"
    >
      <div className="home-hero__visual-grid" />

      <div
        ref={orbPrimaryRef}
        className="
          home-hero__orb
          home-hero__orb--primary
        "
      />

      <div
        ref={orbSecondaryRef}
        className="
          home-hero__orb
          home-hero__orb--secondary
        "
      />

      <div
        ref={orbTertiaryRef}
        className="
          home-hero__orb
          home-hero__orb--tertiary
        "
      />

      <div className="home-hero__halo">
        <div className="home-hero__halo-ring home-hero__halo-ring--1" />
        <div className="home-hero__halo-ring home-hero__halo-ring--2" />
        <div className="home-hero__halo-ring home-hero__halo-ring--3" />

        <span className="home-hero__halo-core" />
      </div>

      <div className="home-hero__noise" />
    </div>
  );
}