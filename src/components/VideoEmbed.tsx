import React from 'react';

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

export default function VideoEmbed({ url, title, className = '' }: VideoEmbedProps) {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Extract video ID from Vimeo URL
  const getVimeoId = (url: string) => {
    const regExp = /^.*(vimeo\.com\/)(\d+).*/;
    const match = url.match(regExp);
    return match ? match[2] : null;
  };

  const youtubeId = getYouTubeId(url);
  const vimeoId = getVimeoId(url);

  if (youtubeId) {
    return (
      <div className={`video-embed ${className}`}>
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title || 'YouTube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className={`video-embed ${className}`}>
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={title || 'Vimeo video player'}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  // Fallback for other video platforms
  return (
    <div className={`video-embed ${className}`}>
      <div className="relative overflow-hidden rounded-lg aspect-video">
        <iframe
          src={url}
          title={title || 'Video player'}
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
}
