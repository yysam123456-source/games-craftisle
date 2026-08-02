"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Grid3X3, ChevronRight } from "lucide-react";
import { getCategoryList } from "@/lib/categories";

export default function CategoriesPage() {
  const categories = getCategoryList();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-[300px] h-[300px] rounded-full bg-brand-cyan/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4"
          >
            <Grid3X3 className="w-4 h-4" /> BROWSE CATEGORIES
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary via-brand-cyan to-brand-pink bg-clip-text text-transparent">
              Game Categories
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Pick a genre and jump straight into the games you love.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="group relative flex items-center gap-5 rounded-2xl p-6 bg-card/60 backdrop-blur-sm border border-white/[0.06] hover:border-primary/30 transition-all duration-300 overflow-hidden h-full"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-transparent" />
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="relative z-10 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {cat.label}
                      </h3>
                      <span className="text-xs text-muted-foreground">{cat.count} games</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                  <ChevronRight className="relative z-10 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
