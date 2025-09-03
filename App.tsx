import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const BG = "#14162b";          // Base surface (midnight indigo)
const LIGHT = "#1e2142";       // Light surface
const DARK = "#0d0f22";        // Dark surface
const ACCENT = "#ff2bd1";      // Neon magenta
const ACCENT_2 = "#00f5ff";    // Neon cyan

export default function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Neon ambient glow */}
      <LinearGradient
        colors={["rgba(255,43,209,0.18)", "rgba(0,245,255,0.10)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.neonBackdrop}
      />

      {/* Header / Title */}
      <Text style={styles.screenTitle}>NOW PLAYING</Text>

      {/* Album Art inside a neumorphic card */}
      <NeoCard radius={28} style={{ padding: 14 }}>
        <Image
          source={{
            // EDM-friendly album art (Unsplash, stable link)
            uri: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
          }}
          style={styles.albumArt}
        />
      </NeoCard>

      {/* Track info */}
      <View style={{ alignItems: "center", marginTop: 18 }}>
        <Text style={styles.songTitle}>Night Pulse (EDM Mix)</Text>
        <Text style={styles.artist}>Neon Skyline</Text>
      </View>

      {/* Progress Bar (neumorphic rail + neon fill) */}
      <NeoCard radius={20} style={styles.progressRail}>
        <View style={styles.progressFillWrap}>
          <LinearGradient
            colors={[ACCENT, ACCENT_2]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.progressFill}
          />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>1:24</Text>
          <Text style={styles.timeText}>3:56</Text>
        </View>
      </NeoCard>

      {/* Controls: Prev | Play/Pause | Next */}
      <View style={styles.controlsRow}>
        <NeoButton radius={22} size={58}>
          <FontAwesome name="backward" size={20} color="#e9ebff" />
        </NeoButton>

        <NeoButton radius={36} size={78} glow>
          <FontAwesome
            name={isPlaying ? "pause" : "play"}
            size={26}
            color="#ffffff"
            onPress={() => setIsPlaying(!isPlaying)}
          />
        </NeoButton>

        <NeoButton radius={22} size={58}>
          <FontAwesome name="forward" size={20} color="#e9ebff" />
        </NeoButton>
      </View>

      {/* Extra controls: Like, Shuffle, Repeat */}
      <View style={styles.extrasRow}>
        <NeoButton radius={18} size={48}>
          <FontAwesome name="heart-o" size={18} color="#e9ebff" />
        </NeoButton>
        <NeoButton radius={18} size={48}>
          <FontAwesome name="random" size={18} color="#e9ebff" />
        </NeoButton>
        <NeoButton radius={18} size={48}>
          <FontAwesome name="repeat" size={18} color="#e9ebff" />
        </NeoButton>
      </View>
    </SafeAreaView>
  );
}

/** -----------------------
 *  Neumorphic building blocks
 *  ----------------------- */
const NeoCard: React.FC<{
  children: React.ReactNode;
  radius?: number;
  style?: any;
}> = ({ children, radius = 20, style }) => {
  return (
    <View style={[shadowLight(radius), style]}>
      <View style={shadowDark(radius)}>
        <View style={[neoSurface(radius)]}>{children}</View>
      </View>
    </View>
  );
};

const NeoButton: React.FC<{
  children: React.ReactNode;
  radius?: number;
  size?: number;
  glow?: boolean;
}> = ({ children, radius = 20, size = 56, glow = false }) => {
  return (
    <View style={[shadowLight(radius)]}>
      <View style={shadowDark(radius)}>
        <View
          style={[
            neoSurface(radius),
            {
              width: size,
              height: size,
              borderRadius: radius,
              alignItems: "center",
              justifyContent: "center",
            },
            glow && styles.glowRing,
          ]}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

// Move these OUTSIDE of StyleSheet.create
const neoSurface = (radius: number) => ({
  backgroundColor: BG,
  borderRadius: radius,
  padding: 10,
  ...Platform.select({
    android: { elevation: 6 },
    ios: { shadowColor: "transparent" },
  }),
});
const shadowLight = (radius: number) => ({
  backgroundColor: BG,
  borderRadius: radius,
  ...Platform.select({
    ios: {
      shadowColor: LIGHT,
      shadowOpacity: 0.9,
      shadowRadius: 12,
      shadowOffset: { width: -8, height: -8 },
    },
    android: { elevation: 0 },
  }),
});
const shadowDark = (radius: number) => ({
  backgroundColor: "transparent",
  borderRadius: radius,
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.6,
      shadowRadius: 14,
      shadowOffset: { width: 8, height: 8 },
    },
    android: { elevation: 8 },
  }),
});

/** -----------------------
 *  Styles
 *  ----------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  neonBackdrop: {
    position: "absolute",
    top: -80,
    left: -60,
    right: -60,
    bottom: -120,
  },
  screenTitle: {
    color: "#cfd4ff",
    opacity: 0.8,
    letterSpacing: 4,
    fontSize: 12,
    marginTop: 10,
  },
  albumArt: {
    width: 260,
    height: 260,
    borderRadius: 20,
  },
  songTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  artist: {
    color: "#b7bce7",
    fontSize: 14,
    marginTop: 4,
  },
  // Progress
  progressRail: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  progressFillWrap: {
    width: "100%",
    height: 8,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  progressFill: {
    width: "48%", // static fill; hook up to real progress if needed
    height: "100%",
    borderRadius: 6,
  },
  timeRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    color: "#9aa0d5",
    fontSize: 12,
  },
  // Controls
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 26,
  },
  extrasRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "56%",
    marginTop: 20,
  },
  glowRing: {
    // subtle neon rim light on main Play button
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
});


