export function LayerChart() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight
        color="white"
        position={[-1, 5, 1]}
        intensity={5}
        castShadow
        shadow-radius={8}
        shadow-mapSize={2048}
      />
    </>
  );
}

export default LayerChart;
