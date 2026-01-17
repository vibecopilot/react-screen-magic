import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, Line, Html } from "@react-three/drei";
import * as THREE from "three";

interface ModuleData {
  id: string;
  name: string;
  shortName: string;
  position: [number, number, number];
  tooltip: string;
}

const modules: ModuleData[] = [
  { id: "lead", name: "Lead Management", shortName: "Lead", position: [0, 2.5, 0], tooltip: "Capture and manage sales leads efficiently." },
  { id: "cp", name: "CP Management", shortName: "CP", position: [-2.2, 0.8, 0.5], tooltip: "Organize and track channel partner activities." },
  { id: "costsheet", name: "Cost Sheet", shortName: "Cost", position: [2.2, 0.8, 0.5], tooltip: "Create and control pricing and cost sheets." },
  { id: "booking", name: "Booking Approval", shortName: "Booking", position: [-1.8, -1.8, 0.3], tooltip: "Review and approve bookings with ease." },
  { id: "sales", name: "Sales Executive", shortName: "Sales", position: [1.8, -1.8, 0.3], tooltip: "Manage sales teams and assignments." },
];

// Animated data pulse along connection line
const DataPulse = ({ start, end, delay }: { start: [number, number, number]; end: [number, number, number]; delay: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame(({ clock }) => {
    if (ref.current && materialRef.current) {
      const t = ((clock.getElapsedTime() + delay) % 3) / 3;
      ref.current.position.x = start[0] + (end[0] - start[0]) * t;
      ref.current.position.y = start[1] + (end[1] - start[1]) * t;
      ref.current.position.z = start[2] + (end[2] - start[2]) * t;
      materialRef.current.opacity = Math.sin(t * Math.PI) * 0.8;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshBasicMaterial ref={materialRef} color="#60a5fa" transparent opacity={0.8} />
    </mesh>
  );
};

// Connection line between cubes
const ConnectionLine = ({ start, end, index }: { start: [number, number, number]; end: [number, number, number]; index: number }) => {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  
  return (
    <group>
      <Line
        points={points}
        color="#94a3b8"
        lineWidth={1}
        transparent
        opacity={0.4}
      />
      <DataPulse start={start} end={end} delay={index * 0.6} />
      <DataPulse start={end} end={start} delay={index * 0.6 + 1.5} />
    </group>
  );
};

// Central breathing cube
const CenterCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.8) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
    if (glowRef.current) {
      const opacity = 0.15 + Math.sin(clock.getElapsedTime() * 0.8) * 0.1;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Glow effect */}
        <mesh ref={glowRef} scale={1.3}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
        </mesh>
        
        {/* Main cube */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={0.85}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
        
        {/* Edge wireframe */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.02, 1.02, 1.02)]} />
          <lineBasicMaterial color="#60a5fa" transparent opacity={0.6} />
        </lineSegments>
        
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.18}
          color="#334155"
          anchorX="center"
          anchorY="top"
          font="/fonts/inter-medium.woff"
        >
          Pre Sales
        </Text>
      </group>
    </Float>
  );
};

// Module cube component
const ModuleCube = ({ module, index }: { module: ModuleData; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <Float 
      speed={1.2 + index * 0.2} 
      rotationIntensity={0.2} 
      floatIntensity={0.4}
    >
      <group position={module.position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.65, 0.65, 0.65]} />
          <meshStandardMaterial
            color={hovered ? "#3b82f6" : "#e2e8f0"}
            transparent
            opacity={hovered ? 0.9 : 0.75}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
        
        {/* Edge wireframe */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.67, 0.67, 0.67)]} />
          <lineBasicMaterial color={hovered ? "#3b82f6" : "#94a3b8"} transparent opacity={0.5} />
        </lineSegments>
        
        <Text
          position={[0, -0.55, 0]}
          fontSize={0.12}
          color="#475569"
          anchorX="center"
          anchorY="top"
        >
          {module.shortName}
        </Text>

        {/* Tooltip on hover */}
        {hovered && (
          <Html position={[0, 0.7, 0]} center>
            <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap max-w-[180px] text-center">
              <div className="font-medium mb-1">{module.name}</div>
              <div className="text-slate-300 text-[10px]">{module.tooltip}</div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
};

// Scene containing all elements
const Scene = () => {
  const centerPosition: [number, number, number] = [0, 0, 0];

  return (
    <>
      {/* Soft ambient lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {/* Center cube */}
      <CenterCube />
      
      {/* Connection lines */}
      {modules.map((module, index) => (
        <ConnectionLine
          key={`line-${module.id}`}
          start={centerPosition}
          end={module.position}
          index={index}
        />
      ))}
      
      {/* Module cubes */}
      {modules.map((module, index) => (
        <ModuleCube key={module.id} module={module} index={index} />
      ))}
    </>
  );
};

const PreSales3DVisualization = () => {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default PreSales3DVisualization;
