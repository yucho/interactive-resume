// Test webpack here
import * as styles from './test.css';

document.addEventListener('DOMContentLoaded', () => {
  const div = document.createElement('div');
  div.innerText = 'Testing webpack!';
  div.classList.add(styles.composed);
  document.body.appendChild(div);
});
