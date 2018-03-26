// must have ffmpeg installed - if you have a mac, just use homebrew
const readline = require('readline');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

let videoID = 'c4G2sWk5jvM';

let stream = ytdl(videoID, {
  quality: 'highestaudio'
});

let start = Date.now();
ffmpeg(stream)
  .audioBitrate(128)
  .save(`${__dirname}/${videoID}.mp3`)
  .on('progress', p => {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${p.targetSize}kb downloaded`);
  })
  .on('end', () => {
    console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`)
  });
