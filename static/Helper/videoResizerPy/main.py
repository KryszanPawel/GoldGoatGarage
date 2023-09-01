import moviepy.editor as mp
clip = mp.VideoFileClip("video-Reels.mp4")
clip_resized = clip.resize(height=800)
clip_resized.write_videofile("resized.mp4")