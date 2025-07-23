import fs from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';

// 讀取public/mp3資料夾內的檔案 輸出一個檔案 格式為 <button class="sound" data-sound="{{檔案名稱}}.mp3">{{檔案名稱}}</button>
const dir = "public/mp3";

// 格式化時間為 MM:SS 格式
function formatDuration(duration) {
  if (!duration) return "00:00";
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 讀取 MP3 檔案長度
async function getAudioDuration(filePath) {
  try {
    const metadata = await parseFile(filePath);
    return {
      duration: metadata.format.duration || 0,
      formattedDuration: formatDuration(metadata.format.duration)
    };
  } catch (error) {
    console.error(`無法讀取 ${filePath} 的長度:`, error.message);
    return {
      duration: 0,
      formattedDuration: "00:00"
    };
  }
}

// 主要處理函數
async function processFiles() {
  const files = fs.readdirSync(dir);
  const fileInfos = [];

  // 收集所有檔案資訊
  for (const file of files) {
    if (file !== "." && file !== ".." && file.endsWith('.mp3')) {
      // 移除副檔名 - 使用正則表達式移除最後的 .mp3
      const fileName = file.replace(/\.mp3$/i, '');
      const filePath = path.join(dir, file);

      // 讀取音訊長度
      const durationInfo = await getAudioDuration(filePath);

      fileInfos.push({
        fileName,
        file,
        duration: durationInfo.duration,
        formattedDuration: durationInfo.formattedDuration
      });
    }
  }

  // 按時間長度排序（從長到短）
  fileInfos.sort((a, b) => b.duration - a.duration);

  // 輸出排序後的結果
  for (const fileInfo of fileInfos) {
    console.log(`<div class="sound-ipod" data-sound="${fileInfo.fileName}.mp3">
        <div class="info-ipod">
          <div class="title-ipod">${fileInfo.fileName}</div>
          <div class="time-ipod">${fileInfo.formattedDuration}</div>
        </div>
      </div>`);
  }
}

// 執行主函數
processFiles().catch(console.error);