export const triggerResumeDownload = (resumeUrl, filename = 'Resume.pdf') => {
  if (!resumeUrl) return;
  // For Cloudinary URLs, insert fl_attachment to force direct clean download:
  let downloadUrl = resumeUrl;
  if (downloadUrl.includes('/upload/')) {
    downloadUrl = downloadUrl.replace('/upload/', `/upload/fl_attachment:${filename.replace(/\.pdf$/i, '')}/`);
  }
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', filename);
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
