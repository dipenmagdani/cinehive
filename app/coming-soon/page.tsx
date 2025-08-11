"use client";

import { GridBackground } from "@/components/animated/grid-background";
import { motion } from "framer-motion";
import Logo from "@/app/assets/cinehive-logo.png";
import Image from "next/image";
export default function ComingSoonPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center" style={{ backgroundColor: "#0B0B0B" }}>
      <GridBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-5xl mx-auto"
      >
        {/* Logo mark with enhanced glow */}
        <motion.div 
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div 
            className="absolute -inset-4 rounded-full blur-lg"
            animate={{ 
              background: [
                "radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_60%)",
                "radial-gradient(ellipse_at_center,rgba(255,255,255,0.25),transparent_70%)",
                "radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_60%)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <Image src={Logo} alt="CineHive" width={200} height={200}  />
        </motion.div>

        {/* Enhanced title with shimmer effect */}
        <motion.h1
          className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500"
          initial={{ letterSpacing: "0.1em", scale: 0.9, opacity: 0 }}
          animate={{ letterSpacing: "0.02em", scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          style={{
            textShadow: "0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)"
          }}
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


