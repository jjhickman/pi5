FROM jjhickman/tensorflow-lite

WORKDIR /voice

RUN apt update \
    apt install -y python3 python3-pyaudio python3-numpy python3-scipy \
    python3-dev libsdl-image1.2-dev libsdl-mixer1.2-dev libsdl-ttf2.0-dev \
    libsdl1.2-dev libsmpeg-dev python-numpy subversion libportmidi-dev ffmpeg \
    libswscale-dev libavformat-dev libavcodec-dev  libfreetype6-dev \
    && mkdir -p example \
    && cd example \
    && git clone https://github.com/google-coral/project-keyword-spotter.git

CMD ["python3", "/voice/example/project-keyword-spotter/run_model.py"]