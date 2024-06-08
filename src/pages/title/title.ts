import { create } from '../../helpers';
import { renderDraw } from '../draw/draw';

const DOEvent = DeviceOrientationEvent;

export const removeTitle = () => {
  document.querySelector('#title-page')?.remove();
  document.body.replaceChildren();
};

export const renderTitle = () => {
  const page = create('div', { id: 'title-page' });
  const title = create('h1', { innerText: 'Gyro', className: 'title-header' });
  const playButton = create('button', { innerText: 'Play', className: 'big-button', onclick: onClickPlay });
  page.append(title, playButton);
  document.body.appendChild(page);
};

const onClickPlay = async () => {
  if ('requestPermission' in DOEvent && typeof DOEvent['requestPermission'] === 'function') {
    const status: string = await DOEvent.requestPermission();
    // Stay on the page until permission is granted
    if (status !== 'granted') {
      return;
    }
  }
  removeTitle();
  renderDraw();
};
