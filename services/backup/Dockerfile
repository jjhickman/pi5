FROM alpine

ADD crontab.txt /crontab.txt
ADD src/backup.sh /backup.sh
RUN chmod 755 /backup.sh
RUN /usr/bin/crontab /crontab.txt

CMD ["/usr/sbin/crond", "-f", "-l", "8"]