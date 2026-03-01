fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@perempuanaman.or.id', password: 'admin_password_123' })
}).then(res => res.json()).then(data => {
  const token = data.token;
  fetch('http://localhost:5000/api/pustaka', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      title: 'Test Pustaka 500',
      description: 'Test',
      pdfUrl: 'http://example.com/test.pdf',
      publishedYear: 2026,
      pages: 10
    })
  }).then(r => r.text()).then(d => console.log('POST Pustaka Response:', d));
});
