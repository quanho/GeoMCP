// Instrument the layout to trace point placement
Promise.all([
  import('fs'),
  import('./dist/layout.ts')  // This won't work,  let me just read and parse the source manually
]).catch(() => {
  // Fallback - manually trace execution
  Promise.all([
    import('./dist/parser.js'),
    import('./dist/layout.js')
  ]).then(([p, l]) => {
    const text = 'Cho đường tròn (O) có đường kính CD, tiếp tuyến tại C là đường thẳng Cx. Lấy điểm E thuộc đường tròn (O). Qua O kẻ đường thẳng vuông góc với CE, cắt Cx tại A. Qua D kẻ tiếp tuyến với đường tròn (O), tiếp tuyến này cắt AE tại B. Kẻ EH ⟂ CD tại H.';
    
    const parsed = p.parseGeometryProblem(text);
    
    // Check if D is somehow being modified by constraints AFTER applySpecialCircles
    console.log('Checking parsed model for D-involving  constraints:');
    console.log('circlesByDiameter:', parsed.circlesByDiameter.filter(c => c.a === 'D' || c.b === 'D'));
    console.log('pointsOnCircles:', parsed.pointsOnCircles.filter(p => p.point === 'D'));
    console.log('tangentIntersections:', parsed.tangentIntersections.filter(t => t.at === 'D'));
    console.log('perpendiculars:', parsed.perpendiculars.filter(p => Object.values(p.line1).includes('D') || Object.values(p.line2).includes('D')));
    console.log('pointsOnSegments:', parsed.pointsOnSegments.filter(p => p.point === 'D' || p.a === 'D' || p.b === 'D'));
  });
});
