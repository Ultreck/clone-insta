const ThreeColorSpinner = () => {
  return (
   <div className="relative w-16 h-16">
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          background: 'conic-gradient(yellow, purple, pink, yellow)',
          WebkitMask: 'radial-gradient(farthest-side, transparent 80%, black)',
          mask: 'radial-gradient(farthest-side, transparent 70%, black)',
        }}
      ></div>
      {/* <div className="absolute inset-4 bg-white rounded-full"></div> */}
    </div>
  );
};

export default ThreeColorSpinner;
