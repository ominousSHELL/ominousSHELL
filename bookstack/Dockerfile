FROM debian

RUN apt-get update && \
    apt-get install -y iproute2 vim tree && \
    rm -rf /var/lib/apt/lists/*

COPY bookstack-install.sh /

RUN bash /bookstack-install.sh
RUN rm -rf /bookstack*

CMD mysqld --user=root & \
	sleep 10 && \
	/etc/init.d/apache2 restart && tail -f /dev/null
