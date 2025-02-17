export const name = "Stefan Rush";
export const title = "Full Stack Developer";
export const githubUrl = "https://github.com/stefrushxyz";

export interface Project {
  title: string;
  description: string;
  link: string;
  preview?: string;
}

export const projects: Project[] = [
  {
    title: "AmaneChat",
    description:
      "A browser-based drawing application that lets users create animated characters by mapping their facial expressions and movements from webcam video to their drawings in real-time. Built with React, HTML Canvas, and a facial landmark detection model.",
    link: `${githubUrl}/amane.chat`,
    preview: "/previews/amane-chat.gif",
  },
  {
    title: "Gaussian Mixture Model Animation",
    description:
      "A visualization showing how Gaussian Mixture Models can model earthquake data. The animation demonstrates fitting multiple Gaussian distributions to earthquake locations near Fiji, helping visualize the clustering process. Built with Python, JupyterLab, NumPy, and Matplotlib.",
    link: `${githubUrl}/gmm-animation`,
    preview: "/previews/gmm-animation.gif",
  },
  {
    title: "mb9k",
    description:
      "A real-time video processing service that detects if people are wearing face masks in RTMP video streams. The service accepts live video feeds, processes each frame through a TensorFlow model, and provides instant mask detection results. Built with Python, Django, TensorFlow, FFmpeg, Docker, PostgreSQL, Redis, and JavaScript.",
    link: `${githubUrl}/mb9k`,
    preview: "/previews/mb9k.gif",
  },
  {
    title: "stefrush.xyz",
    description:
      "My personal website built with Next.js, TypeScript, and Tailwind CSS. Deployed to AWS using SST. Welcome!",
    link: `${githubUrl}/stefrush.xyz`,
  },
];
