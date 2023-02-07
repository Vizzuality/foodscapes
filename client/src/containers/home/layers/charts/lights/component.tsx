export function LayerChart() {
  return (
    <>
      <ambientLight intensity={2.5} />
      <directionalLight
        color="white"
        position={[-1, 5, -1]}
        intensity={10}
        castShadow
        shadow-radius={8}
        shadow-mapSize={1024}
      />
    </>
  );
}

export default LayerChart;
