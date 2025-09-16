const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

const containerRect = container.getBoundingClientRect();

// Initialize each cube's CSS position & set them in a horizontal grid
cubes.forEach(cube => {
  cube.style.position = 'absolute';
});

cubes.forEach((cube, index) => {
  const rowCount = 5;  // 5 cubes per row
  const col = index % rowCount;
  const cubeWidth = 200; // width from CSS
  cube.style.left = (col * cubeWidth) + 'px';
  cube.style.top = '0px';
});

// Mouse down to start drag
container.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('item')) {
    activeCube = e.target;
    const rect = activeCube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    container.classList.add('active');
    activeCube.style.zIndex = 1000; // bring to front
  }
});

// Mouse move to drag cube
window.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  const maxLeft = container.clientWidth - activeCube.offsetWidth;
  const maxTop = container.clientHeight - activeCube.offsetHeight;

  // Constrain inside container
  newLeft = Math.min(Math.max(newLeft, 0), maxLeft);
  newTop = Math.min(Math.max(newTop, 0), maxTop);

  activeCube.style.left = newLeft + 'px';
  activeCube.style.top = newTop + 'px';
});

// Mouse up to drop cube
window.addEventListener('mouseup', () => {
  if (!activeCube) return;
  activeCube.style.zIndex = '';
  activeCube = null;
  container.classList.remove('active');
});
