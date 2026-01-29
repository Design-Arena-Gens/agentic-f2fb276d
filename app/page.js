'use client';

import { useState } from 'react';

export default function Home() {
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImages((prev) => [...prev, {
            src: e.target.result,
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB'
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '48px',
          marginBottom: '40px',
          fontWeight: '700',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          Image Uploader
        </h1>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '60px 40px',
            textAlign: 'center',
            border: dragActive ? '3px dashed #667eea' : '3px dashed #ddd',
            backgroundColor: dragActive ? '#f0f4ff' : 'white',
            transition: 'all 0.3s ease',
            marginBottom: '30px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}
        >
          <input
            type="file"
            id="file-upload"
            multiple
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />

          <div style={{
            fontSize: '64px',
            marginBottom: '20px'
          }}>📸</div>

          <h2 style={{
            fontSize: '24px',
            marginBottom: '10px',
            color: '#333'
          }}>
            Drop images here or click to upload
          </h2>

          <p style={{
            color: '#666',
            marginBottom: '20px'
          }}>
            Support for PNG, JPG, GIF, WebP and more
          </p>

          <label htmlFor="file-upload" style={{
            display: 'inline-block',
            padding: '12px 30px',
            background: '#667eea',
            color: 'white',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            border: 'none'
          }}
          onMouseOver={(e) => e.target.style.background = '#5568d3'}
          onMouseOut={(e) => e.target.style.background = '#667eea'}
          >
            Select Files
          </label>
        </div>

        {images.length > 0 && (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                Uploaded Images ({images.length})
              </h3>
              <button
                onClick={clearAll}
                style={{
                  padding: '10px 20px',
                  background: '#ff4757',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#ee5a6f'}
                onMouseOut={(e) => e.target.style.background = '#ff4757'}
              >
                Clear All
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {images.map((image, index) => (
                <div key={index} style={{
                  background: 'white',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    position: 'relative',
                    paddingBottom: '75%',
                    background: '#f5f5f5'
                  }}>
                    <img
                      src={image.src}
                      alt={image.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                  <div style={{
                    padding: '15px'
                  }}>
                    <p style={{
                      margin: '0 0 5px 0',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#333',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {image.name}
                    </p>
                    <p style={{
                      margin: '0 0 10px 0',
                      fontSize: '12px',
                      color: '#999'
                    }}>
                      {image.size}
                    </p>
                    <button
                      onClick={() => removeImage(index)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        background: '#ff4757',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#ee5a6f'}
                      onMouseOut={(e) => e.target.style.background = '#ff4757'}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
