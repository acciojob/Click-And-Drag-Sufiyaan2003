// Your code here.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Get the bounding rect of the container
const containerRect = container.getBoundingClientRect();

// Set position absolute for all cubes and arrange them initially in a horizontal grid
cubes.forEach(cube => {
  cube.style.position = 'absolute';
});

cubes.forEach((cube, index) => {
  const rowCount = 5; // 5 cubes per row implicitly for layout
  const col = index % rowCount;
  const row = Math.floor(index / rowCount);
  const cubeWidth = 200; // width from CSS
  const cubeHeight = containerRect.height - 40; // height from CSS container
  cube.style.left = (col * cubeWidth) + 'px';
  cube.style.top = '0px'; // top fixed since scrolling is horizontal
});

// On mouse down, activate dragging for the clicked cube
container.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('item')) {
    activeCube = e.target;
    const rect = activeCube.getBoundingClientRect();
    // Calculate offset between mouse and cube top-left corner
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    container.classList.add('active');
    // Bring the active cube to the front
    activeCube.style.zIndex = 1000;
  }
});

// On mouse move, if dragging, update cube position constrained inside container
window.addEventListener('mousemove', (e) => {
  if (!activeCube) return;

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  const maxLeft = container.clientWidth - activeCube.offsetWidth;
  const maxTop = container.clientHeight - activeCube.offsetHeight;

  // Boundary constraints
  if (newLeft < 0) newLeft = 0;
  else if (newLeft > maxLeft) newLeft = maxLeft;

  if (newTop < 0) newTop = 0;
  else if (newTop > maxTop) newTop = maxTop;

  activeCube.style.left = newLeft + 'px';
  activeCube.style.top = newTop + 'px';
});

// On mouse up, drop the cube and reset dragging state
window.addEventListener('mouseup', (e) => {
  if (!activeCube) return;
  activeCube.style.zIndex = '';
  activeCube = null;
  container.classList.remove('active');
});
