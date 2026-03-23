Promise.all([
  import('./dist/parser.js'),
  import('./dist/layout.js'),
  import('./dist/svg.js')
]).then(([p, l, s]) => {
  const text = 'Cho đường tròn (O) có đường kính CD, tiếp tuyến tại C là đường thẳng Cx. Lấy điểm E thuộc đường tròn (O). Qua O kẻ đường thẳng vuông góc với CE, cắt Cx tại A. Qua D kẻ tiếp tuyến với đường tròn (O), tiếp tuyến này cắt AE tại B. Kẻ EH ⟂ CD tại H.';
  
  const parsed = p.parseGeometryProblem(text);
  const layout = l.buildLayout(parsed);
  const svg = s.renderSvg(layout);
  
  const byId = Object.fromEntries(layout.points.map(pt => [pt.id, {x: Number(pt.x.toFixed(2)), y: Number(pt.y.toFixed(2))}]));
  
  // Verify diameter
  const C = byId.C, D = byId.D, O = byId.O;
  const midC_D = {x: (C.x + D.x) / 2, y: (C.y + D.y) / 2};
  const dist_CD = Math.sqrt((C.x - D.x) ** 2 + (C.y - D.y) ** 2);
  const dist_OC = Math.sqrt((C.x - O.x) ** 2 + (C.y - O.y) ** 2);
  const dist_OD = Math.sqrt((D.x - O.x) ** 2 + (D.y - O.y) ** 2);
  
  console.log('=== Diameter CD Verification ===');
  console.log('C:', C);
  console.log('D:', D);
  console.log('O:', O);
  console.log('Midpoint of CD:', {x: Number(midC_D.x.toFixed(2)), y: Number(midC_D.y.toFixed(2))});
  console.log('Distance CD:', Number(dist_CD.toFixed(2)));
  console.log('Distance OC:', Number(dist_OC.toFixed(2)));
  console.log('Distance OD:', Number(dist_OD.toFixed(2)));
  console.log('Circle radius:', layout.circles[0]?.radius);
  console.log('Diameter is correct:', Math.abs(midC_D.x - O.x) < 0.1 && Math.abs(midC_D.y - O.y) < 0.1 && Math.abs(dist_OC - dist_OD) < 0.1);
  console.log('\n=== SVG Output (first 500 chars) ===');
  console.log(svg.substring(0, 500) + '...');
});
