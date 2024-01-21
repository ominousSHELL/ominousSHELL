FROM debian:latest

EXPOSE 22

RUN apt update && \
    apt install -y openssh-server xserver-xorg-video-amdgpu p7zip-full && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /var/run/sshd

#RUN useradd -ms /bin/bash youruser

#RUN echo 'youruser:yourpassword' | chpasswd

COPY ssh/ominous-cracker.pub /root/ominous-cracker.pub

RUN curl https://hashcat.net/files/hashcat-6.2.6.7z -o /tmp/hashcat.7z
RUN cd / && 7z x /tmp/hashcat.7z

RUN curl https://www.openwall.com/john/k/john-1.9.0-jumbo-1.tar.xz -o /tmp/john.tar.xz
RUN tar xJf /tmp/john.tar.xz -C /
RUN cd /john-1.9.0/src && make clean generic

RUN cat /root/ominous-cracker.pub >> /root/.ssh/authorized_keys && \
    chmod 700 /root/.ssh && \
    chmod 600 /root/.ssh/authorized_keys

#RUN sed -i 's/PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Start SSH server
CMD ["/usr/sbin/sshd", "-D"]

