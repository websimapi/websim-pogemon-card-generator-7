export function handleHover(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 20;
  const rotateY = -(x - centerX) / 20;
  
  card.style.transform = `
    perspective(2000px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    scale3d(1.02, 1.02, 1.02)
  `;
}

export function resetHover(e) {
  const card = e.currentTarget;
  card.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.5s ease';
  
  setTimeout(() => {
    card.style.transition = '';
  }, 500);
}