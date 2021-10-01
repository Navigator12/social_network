import socketIO from 'socket.io-client'

class Socket {
  static socket = null

  static initialize(id) {
    Socket.socket = socketIO.connect(process.env.REACT_APP_URL, {
      query: {
        userId: id,
      },
    })
  }

  static disconnect() {
    Socket.socket?.disconnect()
    Socket.socket = null
  }

  static getSocket() {
    return Socket.socket
  }
}

export default Socket
