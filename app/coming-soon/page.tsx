"use client";

import { GridBackground } from "@/components/animated/grid-background";
import { Loader } from "@/components/ui/loader";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/app/assets/cinehive-logo.png";

export default function ComingSoonPage() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center" style={{ backgroundColor: "#0B0B0B" }}>
      <GridBackground />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-5 px-6 text-center"
      >
        {/* Logo mark */}
        <div className="relative">

          <Image src={Logo} alt="CineHive" width={200} height={100} className="rounded-2xl" />
        </div>

        {/* Gradient title */}
        <motion.h1
          className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400"
          initial={{ letterSpacing: "0.06em", opacity: 0.9 }}
          animate={{ letterSpacing: "0.015em", opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          CineHive
        </motion.h1>
        
        {/* Enhanced subtitle and description */}
        <motion.div 
          className="space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Your Cinematic Universe Awaits
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl">
            Discover hidden gems, share passionate reviews, and connect with fellow film enthusiasts. 
            Our AI-powered recommendation engine learns your taste to curate the perfect watchlist.
          </p>
        </motion.div>

        {/* Enhanced feature highlights */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="space-y-3">
            <motion.div 
              className="w-3 h-3 bg-white rounded-full mx-auto"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div>
              <h3 className="text-white font-semibold text-sm">Smart Discovery</h3>
              <p className="text-gray-400 text-xs mt-1">AI-powered recommendations</p>
            </div>
          </div>
          <div className="space-y-3">
            <motion.div 
              className="w-3 h-3 bg-white rounded-full mx-auto"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <div>
              <h3 className="text-white font-semibold text-sm">Expert Reviews</h3>
              <p className="text-gray-400 text-xs mt-1">Professional film analysis</p>
            </div>
          </div>
          <div className="space-y-3">
            <motion.div 
              className="w-3 h-3 bg-white rounded-full mx-auto"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <div>
              <h3 className="text-white font-semibold text-sm">Community Hub</h3>
              <p className="text-gray-400 text-xs mt-1">Connect with cinephiles</p>
            </div>
          </div>
          <div className="space-y-3">
            <motion.div 
              className="w-3 h-3 bg-white rounded-full mx-auto"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
            <div>
              <h3 className="text-white font-semibold text-sm">Personal Lists</h3>
              <p className="text-gray-400 text-xs mt-1">Curated watchlists</p>
            </div>
          </div>
        </motion.div>
        
        {/* Coming soon with enhanced styling */}
        <motion.div 
          className="mt-12 text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.p 
            className="text-xl text-gray-300 font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Coming Soon
          </motion.p>
          <p className="text-sm text-gray-500">
            Building the ultimate destination for movie lovers
          </p>
        </motion.div>

        {/* Subtle background glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_50%)] blur-3xl" />
      </motion.div>
    </div>
  );
}
