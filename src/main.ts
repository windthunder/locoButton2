import './style.sass'
// import GUI from 'lil-gui';


interface AudioButtonElement extends HTMLElement {
  audio: HTMLAudioElement;
}

const targetClassName = '.sound-ipod'

// const gui = new GUI();

// const setting = {
//   volume: 1,
// };

// gui.add(setting, 'volume', 0, 1, 0.01);

function getMp3Url(fileName: string): string {
  return new URL(`../public/mp3/${fileName}`, import.meta.url).href
}

// perload all mp3
let total_count = document.querySelectorAll(targetClassName).length
let loaded_count = 0
const loading = document.getElementById('loading')
let now_playing: HTMLAudioElement | null = null

document.querySelectorAll(targetClassName).forEach((el) => {
  let el2 = el as AudioButtonElement
  const sound = el2.dataset.sound
  if (!sound) return
  const audio = new Audio(getMp3Url(sound))
  audio.addEventListener('canplaythrough', () => {
    loaded_count++
    if (loading instanceof HTMLElement) {
      loading.innerText = `Loading ${loaded_count}/${total_count}`
    }
  })
  audio.preload = 'auto'
  el2.audio = audio
})

// 當點擊.sound時 撥放 data-sound的音檔
document.querySelectorAll(targetClassName).forEach((el) => {
  console.log(el)
  let el2 = el as AudioButtonElement
  el2.addEventListener('click', () => {
    let audio = el2.audio
    console.log(audio)
    console.log(now_playing)
    if (now_playing === audio) {
      audio.pause()
      audio.currentTime = 0
      now_playing = null
      return
    } else {
      if (now_playing) {
        now_playing.pause()
        now_playing.currentTime = 0
      }
      now_playing = audio
      audio.volume = 1
      audio.play()
    }

  })
})