FROM getsandbox/worker-cli
ENV WATCH=false
RUN mkdir -p ~/state \
    && apt-get update -yqq \
    && apt-get install curl -yqq
CMD ["/bin/sh", "-c", "/sandbox-worker-cli ${MEMORY_OPTS:--Xmx128m -Xmx128m -Xss128k} ${JAVA_OPTS:--Dmicronaut.server.netty.worker.threads=2} --base=/base --port=${PORT:-80} --watch=${WATCH} --metadataPort=90 --state=/state/${STATEFILE} ${JAVA_PARAMS} run"]" 
