import React from 'react';

interface YouTubeOrVideoProps {
  videoUrl: string;
  title: string;
}

const YouTubeOrVideo: React.FC<YouTubeOrVideoProps> = ({ videoUrl, title }) => {
  // Determine embed URL for YouTube (standard or Shorts)
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube') || url.includes('youtu.be')) {
      if (url.includes('/shorts/')) {
        return url.replace('/shorts/', '/embed/');
      }
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  };

  const isYouTube =
    videoUrl.includes('youtube') || videoUrl.includes('youtu.be');

  return (
    <div className='rounded overflow-hidden aspect-video'>
      {isYouTube ? (
        <iframe
          src={getEmbedUrl(videoUrl)}
          title={title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='w-full h-full'
        />
      ) : (
        <video
          controls
          src={videoUrl}
          className='w-full h-auto rounded'
          preload='metadata'
        />
      )}
    </div>
  );
};

export default YouTubeOrVideo;
