"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flower2, PenLine, Sparkles } from "lucide-react";
import { FlowerHead } from "@/components/bouquet/FlowerHead";
import { StatCard } from "@/components/shared/StatCard";
import { FLOWER_TYPES } from "@/data/bouquetOptions";

const STEPS = [
  {
    icon: Flower2,
    title: "Pick your flowers",
    description: "Choose from roses, tulips, sunflowers, lilies, and daisies in your favorite colors.",
  },
  {
    icon: Sparkles,
    title: "Shape the bouquet",
    description: "Set the size, arrangement style, stem length, wrap, and ribbon to match the moment.",
  },
  {
    icon: PenLine,
    title: "Add a message",
    description: "Write a personal note and sender name, then download or share your finished bouquet.",
  },
];

export function LandingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-rose-500">
            Bouquet Studio
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
            Build a custom bouquet, wrapped in your own words
          </h1>
          <p className="mt-5 max-w-xl text-lg text-stone-600">
            Choose every flower, color, and finishing touch, then pair it with
            a personal message. Preview it live and download it as a
            shareable digital bouquet.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800"
            >
              <Flower2 className="h-4 w-4" />
              Start building
            </Link>
            <Link
              href="/result"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-6 py-3 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              View an example
            </Link>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            <StatCard value="5" label="Flower types" />
            <StatCard value="3" label="Styles & sizes" />
            <StatCard value="∞" label="Combinations" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-[32px] bg-[linear-gradient(180deg,#fffdfa_0%,#f8efe8_100%)] p-8 shadow-[0_10px_50px_rgba(15,23,42,0.08)]"
        >
          <div className="grid grid-cols-3 gap-6">
            {FLOWER_TYPES.map((flower) => {
              const color = Object.values(flower.petal)[0];
              return (
                <div
                  key={flower.id}
                  className="flex flex-col items-center gap-2 rounded-2xl bg-white/70 p-4 shadow-sm"
                >
                  <svg viewBox="-40 -40 80 80" className="h-16 w-16 overflow-visible">
                    <FlowerHead type={flower.id} color={color} />
                  </svg>
                  <p className="text-sm font-medium text-stone-700">{flower.name}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.title}
            className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <step.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-stone-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-stone-600">{step.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
