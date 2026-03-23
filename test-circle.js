// Patch console.log to track point movements
const logs = [];
const originalLog = console.log;
let testMode = false;

Promise.all([
  import('./dist/parser.js'),
  import('./dist/layout.js')
]).then(([p, l]) => {
  const text = 'Cho đường tròn (O) có đường kính CD, tiếp tuyến tại C là đường thẳng Cx. Lấy điểm E thuộc đường tròn (O). Qua O kẻ đường thẳng vuông góc với CE, cắt Cx tại A. Qua D kẻ tiếp tuyến với đường tròn (O), tiếp tuyến này cắt AE tại B. Kẻ EH ⟂ CD tại H.';
  
  const parsed = p.parseGeometryProblem(text);
  const layout = l.buildLayout(parsed);
  
  const byId = Object.fromEntries(layout.points.map(pt => [pt.id, {x: Number(pt.x.toFixed(2)), y: Number(pt.y.toFixed(2)), r: Number(Math.sqrt(pt.x * pt.x + pt.y * pt.y).toFixed(2))}]));
  
  console.log('=== Circle Info ===');
  console.log('Center O:', byId.O);
  console.log('Radius:', layout.circles[0]?.radius);
  
  console.log('\n=== Diameter Points ===');
  console.log('C:', byId.C, '- distance from O:', Number(Math.sqrt((byId.C.x)** 2 + (byId.C.y)**2).toFixed(2)));
  console.log('D:', byId.D, '- distance from O:', Number(Math.sqrt((byId.D.x)**2 + (byId.D.y)**2).toFixed(2)));
  console.log('E:', byId.E, '- distance from O:', Number(Math.sqrt((byId.E.x)**2 + (byId.E.y)**2).toFixed(2)));
  
  console.log('\n=== Verify Diameter ===');
  const midCD_x = (byId.C.x + byId.D.x) / 2;
  const midCD_y = (byId.C.y + byId.D.y) / 2;
  const distCD = Math.sqrt((byId.C.x - byId.D.x)**2 + (byId.C.y - byId.D.y)**2);
  console.log('Midpoint of CD:', {x: Number(midCD_x.toFixed(2)), y: Number(midCD_y.toFixed(2))});
  console.log('Distance CD:', Number(distCD.toFixed(2)));
  console.log('Should equal 2 * radius = 6? Actual:', distCD);
  
  // Check if all circle points are on the circle
  console.log('\n=== All Points on Circle ===');
  for (const [id, coords] of Object.entries(byId)) {
    if (layout.circles[0]) {
      const dist = Math.sqrt(coords.x ** 2 + coords.y ** 2);
      const isOn = Math.abs(dist - layout.circles[0].radius) < 0.2;
      if (id === 'C' || id === 'D' || id === 'E' || id === 'O') {
        console.log(`${id}: distance=${Number(dist.toFixed(2))}, on circle=${isOn}`);
      }
    }
  }
});
