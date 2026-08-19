import { Play } from "lucide-react";
import { useState } from "react";
import vibeCodingVideo from "../../Vibe Coding 能把简历玩出什么花样？？.mp4";
import { profile } from "../content/profile";

export function CreativeLab() {
  const [isPlaying, setPlaying] = useState(false);

  return (
    <section className="creative-lab" aria-labelledby="creative-lab-title">
      <div className="creative-lab__media">
        {isPlaying ? (
          <video controls autoPlay playsInline preload="metadata" aria-label="Vibe Coding 三维动画实验视频">
            <source src={vibeCodingVideo} type="video/mp4" />
          </video>
        ) : (
          <button className="creative-lab__cover" type="button" onClick={() => setPlaying(true)} aria-label="播放 Vibe Coding 三维动画实验">
            <img src={profile.avatarUrl} alt="" aria-hidden="true" />
            <span className="creative-lab__scanline" aria-hidden="true"></span>
            <span className="creative-lab__duration">02:38 / MP4</span>
            <span className="creative-lab__play"><Play aria-hidden="true" /> 播放实验片段</span>
          </button>
        )}
      </div>
      <div className="creative-lab__copy">
        <span className="eyebrow">Side experiment / creative coding</span>
        <h2 id="creative-lab-title">数据之外，也在探索三维、动效与新的人机协作方式。</h2>
        <p>这段 Vibe Coding 实验记录了从建模到动画调试的过程。它不是数据项目，但补充了我对视觉表达、工具协同和快速原型的理解。</p>
        <ul aria-label="实验工具">
          <li>Blender</li>
          <li>3D Motion</li>
          <li>Vibe Coding</li>
        </ul>
      </div>
    </section>
  );
}
