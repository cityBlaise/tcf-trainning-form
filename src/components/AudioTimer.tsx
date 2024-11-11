import { FC, memo, useEffect, useRef } from "react";

interface AudioTimer {
  play: boolean;
}
const AudioTimer: FC<AudioTimer> = memo(({ play }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.playbackRate = 5;
      audioRef.current.volume = 1;
      const play = async () => {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
        audioRef.current!.play();
      };
      play();
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [play]);

  return (
    <div className="absolute top-full">
      <audio ref={audioRef} src="/notification_o14egLP.mp3" loop />
    </div>
  );
});

export default AudioTimer;
