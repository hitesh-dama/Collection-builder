export const CubeLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 animate-cube-rotate" style={{ transformStyle: 'preserve-3d' }}>
          <div 
            className="absolute w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500" 
            style={{ transform: 'rotateY(0deg) translateZ(48px)' }}
          />
          <div 
            className="absolute w-24 h-24 bg-gradient-to-br from-orange-400 to-cheddar-orange" 
            style={{ transform: 'rotateY(90deg) translateZ(48px)' }}
          />
          <div 
            className="absolute w-24 h-24 bg-gradient-to-br from-teal-300 to-cheddar-teal" 
            style={{ transform: 'rotateY(180deg) translateZ(48px)' }}
          />
          <div 
            className="absolute w-24 h-24 bg-gradient-to-br from-blue-300 to-blue-400" 
            style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}
          />
          <div 
            className="absolute w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-300" 
            style={{ transform: 'rotateX(90deg) translateZ(48px)' }}
          />
          <div 
            className="absolute w-24 h-24 bg-gradient-to-br from-teal-200 to-blue-300" 
            style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}
          />
        </div>
      </div>
    </div>
  );
};
