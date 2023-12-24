FROM debian:latest

EXPOSE 22

RUN apt update && \
    apt install -y openssh-server && \
	apt install -y xserver-xorg-video-amdgpu && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /var/run/sshd

#RUN useradd -ms /bin/bash youruser

#RUN echo 'youruser:yourpassword' | chpasswd

COPY ssh/ominous-cracker.pub /root/ominous-cracker.pub

RUN cat /root/ominous-cracker.pub >> /root/.ssh/authorized_keys && \
    chmod 700 /root/.ssh && \
    chmod 600 /root/.ssh/authorized_keys

#RUN sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Start SSH server
CMD ["/usr/sbin/sshd", "-D"]

