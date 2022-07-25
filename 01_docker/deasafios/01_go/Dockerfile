# Argument for old and small Go version
ARG GO_VERSION=1.15.6
 
# STAGE 1: building the executable
FROM golang:${GO_VERSION}-alpine AS build
 
WORKDIR /src

COPY ./ ./

ENV CGO_ENABLED=0
ENV GOOS=linux

# Build the executable - flags to remove the debug info
RUN go build \
    -ldflags='-s -w' \
    -a -installsuffix cgo \
    -o /app ./
 
# STAGE 2: build the container to run
FROM scratch AS final
 
# copy compiled app
COPY --from=build  /app /app
 
# run binary; use vector form
ENTRYPOINT ["/app"]