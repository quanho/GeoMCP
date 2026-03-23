Promise.all([
  import('./dist/parser.js'),
  import('./dist/layout.js')
]).then(([p, l]) => {
  const text = 'Cho đường tròn (O) có đường kính CD, tiếp tuyến tại C là đường thẳng Cx. Lấy điểm E thuộc đường tròn (O). Qua O kẻ đường thẳng vuông góc với CE, cắt Cx tại A. Qua D kẻ tiếp tuyến với đường tròn (O), tiếp tuyến này cắt AE tại B. Kẻ EH ⟂ CD tại H.';
  
  const parsed = p.parseGeometryProblem(text);
  
  console.log('=== Before buildLayout ===');
  console.log('circlesByDiameter:', parsed.circlesByDiameter);
  console.log('pointsOnCircles:', parsed.pointsOnCircles);
  
  const layout = l.buildLayout(parsed);
  
  console.log('\n=== After buildLayout ===');
  console.log('pointsOnCircles:', parsed.pointsOnCircles);
  
  // Find positions of each point during layout
  const byId = Object.fromEntries(layout.points.map(pt => [pt.id, {x: Number(pt.x.toFixed(2)), y: Number(pt.y.toFixed(2))}]));
  console.log('\nFinal positions:');
  console.log('C:', byId.C);
  console.log('D:', byId.D);
  console.log('O:', byId.O);
  console.log('E:', byId.E);
});
