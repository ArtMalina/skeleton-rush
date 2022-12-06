import contentHtml from '@/content.html?raw'
import '@/style.css'
import { setupLauncher, setupCredits, setupOptions } from '@/launchActions'
import { setupScene } from '@/scene';
import reactive from '@/reactive';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 ${contentHtml}
`

setupLauncher(document.querySelector<HTMLButtonElement>('#launch')!, reactive)
setupCredits(document.querySelector<HTMLButtonElement>('#credits')!, reactive)
setupOptions(document.querySelector<HTMLButtonElement>('#options')!, reactive)

setupScene(document.querySelector<HTMLDivElement>('#game-container')!, reactive)