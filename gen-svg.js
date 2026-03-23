import('./dist/parser.js').then(p => {
  import('./dist/layout.js').then(l => {
    import('./dist/svg.js').then(s => {
      const text = 'Cho đường tròn (O) có đường kính CD, tiếp tuyến tại C là đường thẳng Cx. Lấy điểm E thuộc đường tròn (O). Qua O kẻ đường thẳng vuông góc với CE, cắt Cx tại A. Qua D kẻ tiếp tuyến với đường tròn (O), tiếp tuyến này cắt AE tại B. Kẻ EH ⟂ CD tại H.';
      const parsed = p.parseGeometryProblem(text);
      const layout = l.buildLayout(parsed);
      const svg = s.renderSvg(layout);
      console.log(svg);
    });
  });
});
