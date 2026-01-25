import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Slider from 'react-slick';

const TrailerList = ({ videos }) => {
  if (!videos || videos.length === 0) return <p>등록된 영상이 없습니다.</p>;

  const [show, setShow] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleOpen = (video) => {
    setSelectedVideo(video);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div className='p-4'>
      <h3>예고편 / 영상</h3>
      <Slider {...settings}>
        {videos.map((video) => (
          <div key={video.id} style={{ padding: "0 8px" }}>
            <img src={`https://img.youtube.com/vi/${video.key}/0.jpg`} 
              alt={video.name}
              style={{ width: "100%", cursor: "pointer", borderRadius: "8px" }}
              onClick={() => handleOpen(video)}
            />
            <p style={{ textAlign: "center", fontSize: "0.9rem" }}>{video.name}</p>
          </div>
        ))}
      </Slider>

      <Modal show={show} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedVideo?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVideo && (
            <iframe width="100%" height="480"
              src={`https://www.youtube.com/embed/${selectedVideo.key}`}
              title={selectedVideo.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>닫기</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrailerList;