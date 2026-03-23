Promise.all([
  import('./dist/parser.js'),
  import('./dist/layout.js')
]).then(([p, l]) => {
  const text = 'Cho đường tròn (O) có đường kính CD, tiếp tuyến tại C là đường thẳng Cx. Lấy điểm E thuộc đường tròn (O). Qua O kẻ đường thẳng vuông góc với CE, cắt Cx tại A. Qua D kẻ tiếp tuyến với đường tròn (O), tiếp tuyến này cắt AE tại B. Kẻ EH ⟂ CD tại H.';
  const parsed = p.parseGeometryProblem(text);
  const layout = l.buildLayout(parsed);
  
  const pts = Object.fromEntries(layout.points.map(pt => [pt.id, {x: Number(pt.x.toFixed(2)), y: Number(pt.y.toFixed(2))}]));
  
  console.log('=== Tangent Line Cx ===');
  console.log('C:', pts.C);
  console.log('X:', pts.X);
  console.log('A:', pts.A);
  console.log('O:', pts.O);
  
  console.log('\n=== Direction Analysis ===');
  const CX = {x: pts.X.x - pts.C.x, y: pts.X.y - pts.C.y};
  const CA = {x: pts.A.x - pts.C.x, y: pts.A.y - pts.C.y};
  console.log('Vector CX (dir to X):', CX);
  console.log('Vector CA (dir to A):', CA);
  
  const dotProduct = CX.x * CA.x + CX.y * CA.y;
  console.log('\nDot product CX·CA:', Number(dotProduct.toFixed(2)));
  console.log('A is in same direction as X?', dotProduct > 0 ? 'YES' : 'NO - OPPOSITE DIRECTION');
  
  // Check perpendicularity
  const OC = {x: pts.C.x - pts.O.x, y: pts.C.y - pts.O.y};
  const perpCheck = CX.x * OC.x + CX.y * OC.y;
  console.log('\nPerpendicular check (CX·OC should be 0):', Number(perpCheck.toFixed(4)));
});
