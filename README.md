# docker-log
This is a sample logging app using MQTT ready for Docker.

## Installation Steps
The following steps assume that you have Docker already installed on your machine (https://docs.docker.com/linux/):

1. open a terminal window and navigate to where your cloned this repository
2. build the image: `docker build -t <your username>/docker-log .`
3. verify you have a new image: `docker images`
4. run the image: `docker run -P --name docker-log --link docker-mosquitto:docker-mosquitto <your username>/docker-log`
5. open another terminal window
6. `mosquitto_pub -h localhost -p 1883 -t dc/send-log -m 'Test 123'`
7. verify the log was processed in the terminal window

If you want to kill the Docker process execute the following command in a terminal window:
`docker ps -a | grep docker-log`

You will be presented with any matching information. You can get the find the unique id of the prcess and execute the following command to stop it:
`docker stop <pid>`

You will also need to remove the named alias:
`docker rm docker-log`

### Sending an log
```
mosquitto_pub -t dc/send-log -m 'Testing 123'
```

### To run a local version of Mosquitto
```
/usr/local/sbin/mosquitto -c /usr/local//etc/mosquitto/mosquitto.conf 

```