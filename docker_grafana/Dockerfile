FROM grafana/grafana:7.5.17

EXPOSE 3000

COPY ./*.js /usr/share/grafana/public/build/
COPY ./*.css /usr/share/grafana/public/build/
COPY ./*.png /usr/share/grafana/public/img/
COPY ./*.svg /usr/share/grafana/public/img/
COPY ./fonts/* /usr/share/grafana/public/build/themes/default/assets/fonts/
COPY ./index.html /usr/share/grafana/public/views/index.html

USER grafana
ENTRYPOINT [ "/run.sh" ]

