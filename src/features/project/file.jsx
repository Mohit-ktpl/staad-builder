import { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useAuth } from "@clerk/clerk-react";
import { div, h1 } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

// import TopToolbar from "../../../layout/TopToolbar";
// import LeftPanel from "../../../layout/LeftPanel";
// import RightPanel from "../../../layout/RightPanel";

// 🔹 Simple Box for Visualization
function Box() {
  return (
    <mesh rotation={[0.4, 0.2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00adee" />
    </mesh>
  );
}

// 🔹 Simple Grid Helper
function Grid() {
  return <gridHelper args={[10, 20, "#000000", "#d0d0d0"]} />;
}

// 🔹 Safe Gizmo Component (Prevents crash)
function SafeGizmo({ marginLeft = 280 }) {
  const { controls } = useThree();
  if (!controls) return null;

  return (
    <GizmoHelper alignment="bottom-left" margin={[marginLeft + 30, 80]}>
      <GizmoViewport
        axisColors={["#ff4040", "#00c853", "#2962ff"]}
        labelColor="black"
        hideNegativeAxes
      />
    </GizmoHelper>
  );
}

export default function ProjectPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isLoaded, isSignedIn, userId } = useAuth();
  const navigate = useNavigate();
  console.log("project page rendered");

  useEffect(() => {
    const saved = localStorage.getItem("sidebar");
    if (saved) setIsSidebarOpen(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar", isSidebarOpen);
  }, [isSidebarOpen]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center">Loading....</div>;
  }
  if (!isSignedIn) {
    navigate("/auth/sign-in");
  }
  console.log("hello", userId);

  return (
    <div
      style={{
        position: "absolute", // Break out of any flow issues
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* 🧭 Left Panel */}
      {/* <LeftPanel
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      /> */}

      {/* 🎥 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [3, 3, 3], fov: 60 }}
          style={{ background: "white" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 4]} />

          <Grid />
          {/* <Box /> */}

          <OrbitControls makeDefault enableDamping={true} />

          <SafeGizmo marginLeft={300} />
        </Canvas>
      </div>

      {/* 🧩 Top Toolbar */}
      {/* <TopToolbar /> */}

      {/* 🧩 Right Panel */}
      {/* <RightPanel /> */}

      {/* 💧 Watermark */}
      <div className="absolute bottom-[25px] right-[330px] text-[10px] text-gray-500 text-left leading-tight select-none">
        <div>Powered by Kosoku ❤️</div>
        <div>Engineered and developed in India 🇮🇳</div>
      </div>
    </div>
  );
}
