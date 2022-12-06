export function setupLauncher(element: HTMLButtonElement, reactive: any) {
  const launch = () => {
    reactive.send('launch');
  }
  element.addEventListener('click', () => launch())
}

export function setupCredits(element: HTMLButtonElement, reactive: any) {
  const launch = () => {
    reactive.send('credits');
  }
  element.addEventListener('click', () => launch())
}

export function setupOptions(element: HTMLButtonElement, reactive: any) {
  const launch = () => {
    reactive.send('options');
  }
  element.addEventListener('click', () => launch())
}
