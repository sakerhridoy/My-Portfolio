import { useRef, useState } from 'react';
import { AlertCircle, FileText, ImagePlus, Link2, Loader2, Trash2, Video } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import api from '../api';

const inputClasses =
  'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition';

const KIND_CONFIG = {
  image: {
    accept: 'image/*',
    icon: ImagePlus,
    uploadLabel: 'Upload image',
    emptyLabel: 'No image',
    urlPlaceholder: '…or paste an image URL',
  },
  video: {
    accept: 'video/*',
    icon: Video,
    uploadLabel: 'Upload video',
    emptyLabel: 'No video',
    urlPlaceholder: '…or paste a video URL',
  },
  file: {
    accept: 'application/pdf',
    icon: FileText,
    uploadLabel: 'Upload file',
    emptyLabel: 'No file',
    urlPlaceholder: '…or paste a file URL',
  },
};

const MediaPreview = ({ kind, url, EmptyIcon, emptyLabel }) => {
  if (!url) {
    return (
      <div className="text-center text-gray-500">
        <EmptyIcon size={22} className="mx-auto" />
        <p className="text-[11px] mt-1">{emptyLabel}</p>
      </div>
    );
  }

  if (kind === 'video') {
    return <video src={url} controls className="h-full w-full object-cover" />;
  }

  if (kind === 'file') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="flex flex-col items-center gap-1 text-cyan-300 hover:text-cyan-200 px-3 text-center"
      >
        <FileText size={22} />
        <span className="text-[11px]">View file</span>
      </a>
    );
  }

  return <img src={url} alt="" className="h-full w-full object-cover" />;
};

const MediaUploadField = ({ value, onChange, label = 'Media', kind = 'image', accept, help }) => {
  const config = KIND_CONFIG[kind] || KIND_CONFIG.image;
  const Icon = config.icon;
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const url = value?.url || '';

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setUploading(true);
    let targetFile = file;

    // Compress image files
    if (kind === 'image' && file.type.startsWith('image/')) {
      try {
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp',
        };
        // Only compress if file is larger than 2MB
        if (file.size > options.maxSizeMB * 1024 * 1024) {
          targetFile = await imageCompression(file, options);
        }
      } catch (err) {
        console.error('Compression error:', err);
        // Fallback to original file if compression fails
      }
    }

    try {
      const uploaded = await api.uploads.upload(targetFile);
      onChange({ url: uploaded.url, publicId: uploaded.publicId || '' });
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    handleFile(file);
    event.target.value = '';
  };

  const handleUrlChange = (nextUrl) => {
    setError('');
    onChange({ url: nextUrl, publicId: '' });
  };

  const handleRemove = () => {
    setError('');
    onChange({ url: '', publicId: '' });
  };

  return (
    <div>
      <span className="block text-sm font-medium text-gray-300 mb-2">{label}</span>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="h-28 w-40 shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
          <MediaPreview kind={kind} url={url} EmptyIcon={Icon} emptyLabel={config.emptyLabel} />
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-all disabled:opacity-50"
            >
              {uploading ? <Loader2 className="animate-spin" size={16} /> : <Icon size={16} />}
              {uploading ? 'Uploading...' : config.uploadLabel}
            </button>
            {url && (
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 size={16} />
                Remove
              </button>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept={accept || config.accept}
            onChange={handleFileChange}
            className="sr-only"
          />

          <div className="relative">
            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder={config.urlPlaceholder}
              className={`${inputClasses} pl-11`}
            />
          </div>

          {help && <p className="text-xs text-gray-500">{help}</p>}
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          <AlertCircle size={14} className="shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
};

export default MediaUploadField;
