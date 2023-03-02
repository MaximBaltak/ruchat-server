export interface Message {
    id: number,
    socketId: string,
    body: string,
    isFrom: boolean
}