document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const lastX = localStorage.getItem('lastMouseX');
  const lastY = localStorage.getItem('lastMouseY');

  if (lastX && lastY) {
    cursor.style.left = lastX + 'px';
    cursor.style.top = lastY + 'px';
  }
  
  // update cursor position
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  })

  // When the mouse moves, save the position:
  document.addEventListener('mousemove', e => {
    localStorage.setItem('lastMouseX', e.clientX);
    localStorage.setItem('lastMouseY', e.clientY);
    
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
})
